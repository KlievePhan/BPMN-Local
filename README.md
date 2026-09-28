# BPMN Web Editor

A simple and interactive web-based BPMN (Business Process Model and Notation) editor built with [bpmn-js](https://bpmn.io/toolkit/bpmn-js/) and [Vite](https://vitejs.dev/).

*(Một trình chỉnh sửa sơ đồ BPMN (Business Process Model and Notation) trên nền tảng web đơn giản và trực quan, được xây dựng bằng bpmn-js và Vite).*

## Features (Tính năng)

- 🎨 **Create & Edit BPMN Diagrams**: Draw and design your business processes using the native bpmn-js toolkit.
  *(Tạo & Chỉnh sửa Sơ đồ BPMN: Vẽ và thiết kế quy trình kinh doanh bằng bộ công cụ gốc của bpmn-js).*
- 📥 **Import BPMN/XML**: Support loading diagrams by clicking the Import button or simply Drag and Drop `.bpmn` / `.xml` files onto the canvas.
  *(Nhập sơ đồ: Hỗ trợ tải sơ đồ bằng cách nhấn nút Import hoặc Kéo Thả trực tiếp file `.bpmn` / `.xml` vào màn hình).*
- 📤 **Export Capabilities**: Easily export your work in multiple formats:
  *(Xuất sơ đồ: Dễ dàng xuất sơ đồ ra nhiều định dạng):*
  - **BPMN**: Standard XML format for business processes. *(Định dạng chuẩn XML của BPMN)*
  - **SVG**: Scalable vector graphics for high-quality images. *(Định dạng ảnh vector SVG chất lượng cao)*
  - **PNG**: Standard image format with a white background. *(Định dạng ảnh PNG nền trắng phổ thông)*

## Getting Started (Hướng dẫn Cài đặt & Sử dụng)

### 1. Requirements (Yêu cầu)
- [Node.js](https://nodejs.org/) installed on your machine. 
  *(Máy tính đã được cài đặt Node.js).*

### 2. Installation (Cài đặt thư viện)
Install the required dependencies:
*(Chạy lệnh sau để cài đặt các thư viện cần thiết)*
```bash
npm install
```

### 3. Run Development Server (Chạy dự án)
Start the Vite development server:
*(Khởi động server chạy cục bộ bằng Vite)*
```bash
npx vite
```
Then, open your browser and navigate to: `http://localhost:5173`
*(Sau đó, mở trình duyệt và truy cập vào đường dẫn trên để xem dự án).*

## Tech Stack (Công nghệ sử dụng)
- **bpmn-js**: Core library for rendering and modeling BPMN 2.0 diagrams in the browser.
- **Vite**: Next Generation Frontend Tooling for fast development.
- **Vanilla JavaScript / HTML / CSS**: No heavy frameworks attached.
