# CB-AI Backend

Flask-based REST API backend for debris and garbage detection using YOLOv11. Provides endpoints for image processing, video analysis, and live stream detection with OpenCV and PyTorch.

## About

The backend service handles all AI processing and media manipulation for the CB-AI application. It uses a custom-trained YOLOv11 model to detect debris and garbage in images, videos, and live streams, returning annotated results with bounding boxes and detection statistics.

Key features:
- RESTful API endpoints for multiple media types
- YOLOv11 object detection integration
- Real-time video frame processing
- Live stream support (RTSP, HTTP, webcam)
- File upload and serving
- CORS enabled for frontend integration
- Detection confidence thresholding

## Built With

- Python 3.x
- Flask - Web framework
- Flask-CORS - Cross-origin resource sharing
- OpenCV (opencv-python) - Computer vision library
- PyTorch - Deep learning framework
- Torchvision - PyTorch vision utilities
- Ultralytics YOLOv11 - Object detection model
- Pillow - Image processing
- NumPy - Numerical computing

## Getting Started

### Prerequisites

```bash
python --version  # v3.8 or higher recommended
pip --version     # Latest version
```

### Installation

1. Navigate to the backend directory
   ```bash
   cd cb-ai/backend
   ```

2. Create a virtual environment (recommended)
   ```bash
   python -m venv venv
   
   # Activate on Windows
   venv\Scripts\activate
   
   # Activate on macOS/Linux
   source venv/bin/activate
   ```

3. Install dependencies
   ```bash
   pip install -r requirements.txt
   ```

4. Verify model file exists
   ```bash
   # Ensure best.pt is present in the backend directory
   ls best.pt  # or dir best.pt on Windows
   ```

5. Start the Flask server
   ```bash
   python app.py
   ```

   Server will start at `http://localhost:5000`

## Usage

### Running the Server

```bash
# Development mode with auto-reload
python app.py

# The server runs on http://localhost:5000
# Debug mode is enabled by default in app.py
```

### API Endpoints

#### Upload Image
```http
POST /upload/image
Content-Type: multipart/form-data

Parameters:
  file: Image file (JPG, JPEG, PNG)

Response:
{
  "result": { "detected": true },
  "image_url": "/get_image/filename_detected.jpg"
}
```

#### Upload Video
```http
POST /upload/video
Content-Type: multipart/form-data

Parameters:
  file: Video file (MP4 recommended)

Response:
{
  "video_url": "/get_video/filename_detected.mp4",
  "summary": {
    "total_frames": 1200,
    "detections": 45,
    "status": "done"
  }
}
```

#### Live Stream Processing
```http
POST /stream/live
Content-Type: application/x-www-form-urlencoded

Parameters:
  url: Stream URL (RTSP/HTTP) or webcam index (0, 1, etc.)

Response:
{
  "total_frames": 100,
  "detections": 12,
  "status": "stream complete"
}
```

#### Get Processed Image
```http
GET /get_image/<filename>

Returns: Image file (JPEG)
```

#### Get Processed Video
```http
GET /get_video/<filename>

Returns: Video file (MP4)
```

#### Download Image
```http
GET /download_image/<filename>

Returns: Image file as attachment
```

#### Download Video
```http
GET /download_video/<filename>

Returns: Video file as attachment
```

### Testing Endpoints

```bash
# Test image upload with curl
curl -X POST -F "file=@test_image.jpg" http://localhost:5000/upload/image

# Test video upload
curl -X POST -F "file=@test_video.mp4" http://localhost:5000/upload/video

# Test live stream (webcam)
curl -X POST -d "url=0" http://localhost:5000/stream/live

# Test live stream (RTSP)
curl -X POST -d "url=rtsp://camera.example.com/stream" http://localhost:5000/stream/live
```

## Project Structure

```
backend/
├── app.py              # Flask application and route handlers
├── detector.py         # YOLO detection logic and processing functions
├── best.pt             # Trained YOLOv11 model weights
├── requirements.txt    # Python dependencies
├── static/             # Auto-created for file storage
│   └── uploads/        # Uploaded and processed files
└── __pycache__/        # Python bytecode cache (auto-generated)
```

## Core Modules

### app.py
Main Flask application containing:
- Route definitions for all API endpoints
- File upload handling
- CORS configuration
- Static file serving
- Error handling

### detector.py
Detection logic including:
- `detect_from_frame()` - Single frame detection
- `process_image()` - Image file processing
- `process_video()` - Video file processing with tracking
- `process_live_stream()` - Live stream analysis
- `debris_detected()` - Confidence-based detection validation

## Configuration

### Model Settings
```python
# In detector.py
TARGET_CLASSES = ['Debris', 'Garbage']
CONFIDENCE_THRESHOLD = 0.5

# Modify these values to adjust detection behavior
```

### Server Settings
```python
# In app.py
app.run(debug=True)  # Change debug=False for production
```

### Stream Processing Limit
```python
# In detector.py - process_live_stream()
while frame_count < 100:  # Adjust frame limit as needed
```

## Detection Algorithm

```python
# Detection flow
1. Load YOLOv11 model with custom weights (best.pt)
2. Process input frame/image
3. Run model prediction
4. Filter results by:
   - Target classes: ['Debris', 'Garbage']
   - Confidence threshold: 0.5 (50%)
5. Generate annotated output with bounding boxes
6. Return detection status and annotated media
```

## File Storage

Uploaded and processed files are stored in:
```
backend/static/uploads/
├── original_file.jpg
├── original_file_detected.jpg
├── video.mp4
└── video_detected.mp4
```

Files persist until manually deleted or server restart (depending on configuration).

## Error Handling

Common errors and solutions:

**Error: Model file not found**
```
Solution: Ensure best.pt is in the backend directory
```

**Error: Could not open input video**
```
Solution: Check video file format and codec compatibility
```

**Error: Stream not accessible**
```
Solution: Verify stream URL, network connectivity, and credentials
```

**Error: No file provided**
```
Solution: Ensure 'file' field is included in form-data request
```

## Development

### Adding New Detection Classes

1. Retrain YOLOv11 model with new classes
2. Update `TARGET_CLASSES` in detector.py:
   ```python
   TARGET_CLASSES = ['Debris', 'Garbage', 'NewClass']
   ```

### Adjusting Confidence Threshold

Edit `CONFIDENCE_THRESHOLD` in detector.py:
```python
CONFIDENCE_THRESHOLD = 0.7  # More strict (70%)
# or
CONFIDENCE_THRESHOLD = 0.3  # More lenient (30%)
```

### Adding New Endpoints

Add routes in app.py:
```python
@app.route("/new_endpoint", methods=["POST"])
def new_handler():
    # Implementation
    return jsonify(result)
```

## Dependencies

```
flask               # Web framework
numpy               # Array operations
opencv-python       # Computer vision
torch               # PyTorch deep learning
torchvision         # PyTorch vision utilities
pillow              # Image processing
ultralytics         # YOLOv11 (auto-installed)
flask-cors          # CORS support (install separately if needed)
```

## Performance Optimization

### For Video Processing
- Adjust FPS for faster processing (may reduce quality)
- Use GPU if available (PyTorch CUDA)
- Reduce input video resolution before processing

### For Live Streams
- Increase/decrease frame limit based on requirements
- Use hardware acceleration when available
- Consider frame skipping for faster processing

## Production Deployment

### Security Considerations
```python
# In app.py for production
app.run(debug=False, host='0.0.0.0', port=5000)

# Add file size limits
app.config['MAX_CONTENT_LENGTH'] = 100 * 1024 * 1024  # 100MB limit

# Implement authentication middleware
# Add rate limiting
# Validate file types strictly
```

### Environment Variables
```bash
export FLASK_ENV=production
export MODEL_PATH=/path/to/best.pt
export UPLOAD_FOLDER=/path/to/uploads
```

## Troubleshooting

**Issue: Slow video processing**
- Solution: Use GPU acceleration, reduce video resolution, or process fewer frames

**Issue: High memory usage**
- Solution: Implement batch processing limits, clear processed files regularly

**Issue: CORS errors**
- Solution: Verify CORS configuration in app.py, ensure Flask-CORS is installed

## License

This project is available for use under standard open-source practices.

## Contact

For backend-specific issues, refer to the main project repository.

## Acknowledgments

- [Ultralytics YOLOv11](https://github.com/ultralytics/ultralytics) - Object detection framework
- [Flask](https://flask.palletsprojects.com/) - Web framework
- [OpenCV](https://opencv.org/) - Computer vision library
- [PyTorch](https://pytorch.org/) - Deep learning platform
