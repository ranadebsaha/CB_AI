from flask import Flask, request, jsonify, send_file
from detector import process_image, process_video, process_live_stream
import os
from flask_cors import CORS
import cv2

app = Flask(__name__)
CORS(app)
UPLOAD_FOLDER = "static/uploads"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)


@app.route("/upload/image", methods=["POST"])
def upload_image():
    if "file" not in request.files:
        return jsonify({"error": "No file provided"}), 400

    file = request.files["file"]
    filepath = os.path.join(UPLOAD_FOLDER, file.filename)
    file.save(filepath)

    result, output_path = process_image(filepath)
    return jsonify(
        {"result": result, "image_url": f"/get_image/{os.path.basename(output_path)}"}
    )


@app.route("/get_image/<filename>", methods=["GET"])
def get_image(filename):
    return send_file(os.path.join(UPLOAD_FOLDER, filename), mimetype="image/jpeg")


@app.route("/upload/video", methods=["POST"])
def upload_video():
    if "file" not in request.files:
        return jsonify({"error": "No file provided"}), 400

    file = request.files["file"]
    filepath = os.path.join(UPLOAD_FOLDER, file.filename)
    file.save(filepath)

    processed_video_path, summary = process_video(filepath)

    if not os.path.exists(processed_video_path):
        return jsonify({"error": "Processed video not found"}), 500

    processed_filename = os.path.basename(processed_video_path)

    return jsonify(
        {"video_url": f"/get_video/{processed_filename}", "summary": summary}
    )


@app.route("/stream/live", methods=["POST"])
def stream_live():
    stream_url = request.form.get("url")
    if not stream_url:
        return jsonify({"error": "Stream URL required"}), 400

    result = process_live_stream(stream_url)
    return jsonify(result)


@app.route("/get_video/<filename>", methods=["GET"])
def get_video(filename):
    return send_file(os.path.join(UPLOAD_FOLDER, filename), mimetype="video/mp4")


@app.route("/download_video/<filename>", methods=["GET"])
def download_video(filename):
    return send_file(
        os.path.join(UPLOAD_FOLDER, filename), mimetype="video/mp4", as_attachment=True
    )


@app.route("/download_image/<filename>", methods=["GET"])
def download_image(filename):
    return send_file(
        os.path.join(UPLOAD_FOLDER, filename), mimetype="image/jpeg", as_attachment=True
    )


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=7860, debug=False)
