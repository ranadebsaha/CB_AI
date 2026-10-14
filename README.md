# CB-AI | Debris & Garbage Detection

Computer vision system that detects debris/garbage in images, videos, and live streams using a YOLO model. Full-stack setup: Flask backend (Ultralytics YOLO + OpenCV) and a Vite React TypeScript frontend for uploads and visualizations.

## About The Project

CB-AI provides an end-to-end pipeline to identify waste/debris from various sources and return annotated media and detection summaries.

- **What problem does it solve?** Automates debris/garbage detection from camera feeds and uploaded content to aid monitoring and cleanup workflows.
- **What makes it unique?** Unified support for image, video, and live stream inputs; annotated outputs and summaries; simple REST endpoints; and a lightweight React UI.
- **What was learned?** Model inference with Ultralytics YOLO, OpenCV video handling, Flask API design, and React + Vite app structure with MUI/Tailwind.

## Built With

- Backend: Flask, Flask-CORS, Ultralytics YOLO, OpenCV, PyTorch, NumPy, Pillow
- Frontend: React (Vite + TypeScript), React Router, MUI, Tailwind CSS, Lucide icons
- Tooling: ESLint, TypeScript, PostCSS

## Getting Started

Instructions on setting up the project locally.

### Prerequisites

- Python 3.10+ and `pip`
- Node.js 18+ and `npm`
- A YOLO weights file at `backend/best.pt` (provided)

### Installation

1. Clone the repo

   ```bash
   git clone https://github.com/tumansutradhar/cb-ai-main.git
   cd cb-ai-main
   ```

2. Backend setup

   ```bash
   cd backend
   python -m venv venv
   venv\Scripts\activate  # Windows
   pip install -r requirements.txt
   python app.py
   ```

   Backend runs at `http://localhost:7860`.

3. Frontend setup

   ```bash
   cd ../frontend
   npm install
   npm run dev
   ```

   Frontend runs at `http://localhost:5173`.

## Usage

### Upload Image

```bash
curl -X POST -F "file=@sample.jpg" http://localhost:7860/upload/image
```

Response:

```json
{ "result": { "detected": true }, "image_url": "/get_image/sample_detected.jpg" }
```

### Upload Video

```bash
curl -X POST -F "file=@sample.mp4" http://localhost:7860/upload/video
```

Response:

```json
{
  "video_url": "/get_video/sample_detected.mp4",
  "summary": { "total_frames": 1234, "detections": 87, "status": "done" }
}
```

### Live Stream

```bash
curl -X POST -d "url=rtsp://your-stream-url" http://localhost:7860/stream/live
```

Response:

```json
{ "total_frames": 100, "detections": 12, "status": "stream complete" }
```

## Features

- YOLO-based detection of `Debris` and `Garbage` classes with confidence thresholds
- Annotated outputs for images and videos
- REST API endpoints for image, video, and stream processing
- Detection summary with frame counts and total detections
- React frontend for user-friendly uploads and viewing results

## Roadmap

- [x] Image and video processing endpoints
- [x] Live stream processing (limited window)
- [x] React UI with uploads and previews
- [ ] Batch processing and scheduling
- [ ] Multi-class support and retraining tools
- [ ] Export reports and CSV summaries
- [ ] Authentication and role-based access

See the [open issues](https://github.com/tumansutradhar/cb-ai-main/issues) for planned work and known issues.

## Contributing

Contributions are what make the open source community amazing. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

Distributed under the MIT License. See `LICENSE.md` for more information.

## Contact

Tuman Sutradhar

- GitHub: [@tumansutradhar](https://github.com/tumansutradhar)
- Email: [connect.tuman@gmail.com](mailto:connect.tuman@gmail.com)
- LinkedIn: [Tuman Sutradhar](https://www.linkedin.com/in/tumansutradhar/)

Project Link: [https://github.com/tumansutradhar/cb-ai-main](https://github.com/tumansutradhar/cb-ai-main)

## Acknowledgments

- Ultralytics YOLO
- OpenCV
- Flask
- React + Vite + TypeScript
- MUI + Tailwind CSS