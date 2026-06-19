import cv2
from ultralytics import YOLO
import os

model = YOLO("best.pt")
TARGET_CLASSES = ["Debris", "Garbage"]
CONFIDENCE_THRESHOLD = 0.5


def detect_from_frame(frame):
    results = model.predict(frame)
    detected = any(
        model.names[int(box.cls[0])] in TARGET_CLASSES
        and float(box.conf[0]) >= CONFIDENCE_THRESHOLD
        for box in results[0].boxes
    )
    annotated = results[0].plot()
    return detected, annotated


def process_image(image_path):
    frame = cv2.imread(image_path)
    detected, annotated = detect_from_frame(frame)
    output_path = image_path.replace(".jpg", "_detected.jpg")
    cv2.imwrite(output_path, annotated)
    return {"detected": detected}, output_path


def debris_detected(results):
    for box in results[0].boxes:
        conf = float(box.conf[0].item())
        cls_id = int(box.cls[0].item())
        class_name = model.names[cls_id]
        if class_name in TARGET_CLASSES and conf >= CONFIDENCE_THRESHOLD:
            return True
    return False


def process_video(video_path):
    cap = cv2.VideoCapture(video_path)
    if not cap.isOpened():
        raise FileNotFoundError("Could not open the input video")

    fourcc = cv2.VideoWriter_fourcc(*"mp4v")
    fps = int(cap.get(cv2.CAP_PROP_FPS)) or 20
    width = int(cap.get(cv2.CAP_PROP_FRAME_WIDTH))
    height = int(cap.get(cv2.CAP_PROP_FRAME_HEIGHT))

    output_path = video_path.replace(".mp4", "_detected.mp4")
    out = cv2.VideoWriter(output_path, fourcc, fps, (width, height))

    total_frames = 0
    detections = 0

    while cap.isOpened():
        success, frame = cap.read()
        if not success:
            break

        results = model.track(frame, persist=True)
        annotated_frame = results[0].plot()

        if debris_detected(results):
            detections += 1

        out.write(annotated_frame)
        total_frames += 1

    cap.release()
    out.release()

    return output_path, {
        "total_frames": total_frames,
        "detections": detections,
        "status": "done",
    }


def process_live_stream(stream_url):
    cap = cv2.VideoCapture(stream_url)
    if not cap.isOpened():
        return {"error": "Stream not accessible"}

    detected_frames = 0
    frame_count = 0

    while frame_count < 100:  # Limit processing
        ret, frame = cap.read()
        if not ret:
            break
        detected, _ = detect_from_frame(frame)
        detected_frames += int(detected)
        frame_count += 1

    cap.release()
    return {
        "total_frames": frame_count,
        "detections": detected_frames,
        "status": "stream complete",
    }
