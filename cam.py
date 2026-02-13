from flask import Flask, Response, jsonify
from flask_cors import CORS
from picamera2 import Picamera2
import cv2
from datetime import datetime
import os

app = Flask(__name__)
CORS(app)

# Initialize camera
picam2 = Picamera2()

# --- PREVIEW CONFIG (low-res for streaming) ---
preview_config = picam2.create_preview_configuration(
    main={"size": (640, 368)}  # smaller resolution for fast streaming
)
picam2.configure(preview_config)
picam2.start()

# --- STILL CONFIG (full-res capture) ---
still_config = picam2.create_still_configuration(
    main={"size": (3280, 1845)}  # full resolution
)

# --- STREAM GENERATOR ---
def generate_frames():
    while True:
        frame = picam2.capture_array()  # capture preview frame
        frame = cv2.cvtColor(frame, cv2.COLOR_RGB2BGR)
        ret, buffer = cv2.imencode(".jpg", frame)
        frame_bytes = buffer.tobytes()
        yield (b"--frame\r\n"
               b"Content-Type: image/jpeg\r\n\r\n" + frame_bytes + b"\r\n")

@app.route("/video_feed")
def video_feed():
    return Response(
        generate_frames(),
        mimetype="multipart/x-mixed-replace; boundary=frame"
    )

@app.route("/capture")
def capture():
    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
    filename = f"capture_{timestamp}.jpg"
    filepath = os.path.join(os.path.dirname(os.path.abspath(__file__)), filename)

    # Capture full-res still
    picam2.switch_mode_and_capture_file(still_config, filepath)

    # Switch back to preview mode
    picam2.configure(preview_config)
    picam2.start()

    return jsonify({
        "status": "success",
        "message": "High-res image captured",
        "filename": filename
    })

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
