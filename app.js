import BpmnModeler from 'bpmn-js/lib/Modeler';

// 1. Khởi tạo Modeler và gắn vào DOM container
const modeler = new BpmnModeler({
  container: '#canvas',
  keyboard: {
    bindTo: window // Kích hoạt phím tắt (Ctrl+Z, Del, v.v.)
  }
});

// 2. Mở một diagram mới
async function openNewDiagram() {
  try {
    await modeler.createDiagram();
    
    // Zoom vừa vặn màn hình
    const canvas = modeler.get('canvas');
    canvas.zoom('fit-viewport');
    
    console.log('Khởi tạo canvas thành công!');
  } catch (err) {
    console.error('Lỗi khởi tạo sơ đồ:', err);
  }
}

openNewDiagram();

// 1. Xuất file XML sau khi vẽ xong
export async function exportDiagram() {
  try {
    const { xml } = await modeler.saveXML({ format: true });
    console.log(xml);
    return xml;
  } catch (err) {
    console.error('Không thể xuất XML:', err);
  }
}

// 2. Truy cập trực tiếp moddle từ modeler để tạo phần tử bằng code nếu cần:
const moddle = modeler.get('moddle');
const elementFactory = modeler.get('elementFactory');
const modeling = modeler.get('modeling');

// Gắn các hàm xuất để có thể gọi từ console
window.exportDiagram = exportDiagram;

// 3. Hàm tải file xuống
function download(filename, content, type) {
  const blob = new Blob([content], { type: type });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

// 4. Xử lý chức năng Import (Click & Kéo thả)
async function loadDiagram(xml) {
  try {
    await modeler.importXML(xml);
    const canvas = modeler.get('canvas');
    canvas.zoom('fit-viewport');
    console.log('Import sơ đồ thành công!');
  } catch (err) {
    console.error('Lỗi khi import sơ đồ:', err);
    alert('Không thể import sơ đồ BPMN. Xem log console để biết chi tiết.');
  }
}

// Xử lý sự kiện click chọn file
const btnImport = document.getElementById('btn-import-bpmn');
const inputImport = document.getElementById('input-import-bpmn');

btnImport.addEventListener('click', () => {
  inputImport.click();
});

inputImport.addEventListener('change', (e) => {
  const file = e.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (event) => {
      loadDiagram(event.target.result);
    };
    reader.readAsText(file);
    // Reset lại giá trị input để có thể chọn lại cùng một file
    e.target.value = '';
  }
});

// Xử lý sự kiện kéo thả (Drag and Drop)
const dropZone = document.body;

dropZone.addEventListener('dragover', (e) => {
  e.preventDefault();
  e.stopPropagation();
  e.dataTransfer.dropEffect = 'copy';
});

dropZone.addEventListener('drop', (e) => {
  e.preventDefault();
  e.stopPropagation();
  
  const file = e.dataTransfer.files[0];
  if (file && (file.name.endsWith('.bpmn') || file.name.endsWith('.xml'))) {
    const reader = new FileReader();
    reader.onload = (event) => {
      loadDiagram(event.target.result);
    };
    reader.readAsText(file);
  } else {
    alert('Vui lòng kéo thả file định dạng .bpmn hoặc .xml hợp lệ');
  }
});

// 5. Gắn sự kiện cho các nút Export
document.getElementById('btn-export-bpmn').addEventListener('click', async () => {
  try {
    const { xml } = await modeler.saveXML({ format: true });
    download('diagram.bpmn', xml, 'application/xml');
  } catch (err) {
    console.error('Lỗi export BPMN', err);
  }
});

document.getElementById('btn-export-svg').addEventListener('click', async () => {
  try {
    const { svg } = await modeler.saveSVG();
    download('diagram.svg', svg, 'image/svg+xml');
  } catch (err) {
    console.error('Lỗi export SVG', err);
  }
});

document.getElementById('btn-export-png').addEventListener('click', async () => {
  try {
    const { svg } = await modeler.saveSVG();
    
    // Tạo image từ SVG để có thể vẽ lên canvas
    const img = new Image();
    // Mã hóa SVG để sử dụng trong Data URL hoặc Blob một cách an toàn
    const svgBlob = new Blob([svg], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(svgBlob);
    
    img.onload = function() {
      const canvas = document.createElement('canvas');
      
      // Mặc định lấy theo kích thước của SVG, nếu không có fallback
      canvas.width = img.naturalWidth || 800;
      canvas.height = img.naturalHeight || 600;
      
      const ctx = canvas.getContext('2d');
      
      // Tô nền trắng vì mặc định SVG/Canvas có thể trong suốt
      ctx.fillStyle = 'white';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0);
      
      // Chuyển sang định dạng base64 PNG
      const pngUrl = canvas.toDataURL('image/png');
      const a = document.createElement('a');
      a.href = pngUrl;
      a.download = 'diagram.png';
      a.click();
      
      URL.revokeObjectURL(url);
    };
    img.src = url;

  } catch (err) {
    console.error('Lỗi export PNG', err);
  }
});
