from flask import Flask, Response, jsonify, send_from_directory
from flask_cors import CORS
from picamera2 import Picamera2
import cv2
import os
from datetime import datetime
import webbrowser
import threading

def open_browser():
    webbrowser.open("http://localhost:5000")

app = Flask(__name__, static_folder="dist", static_url_path="")
CORS(app)

@app.route("/")
def serve():
    return send_from_directory(app.static_folder, "index.html")


CORS(app)

picam2 = Picamera2()

# --- PREVIEW CONFIG (fast streaming) ---
preview_config = picam2.create_preview_configuration(
    main={"size": (3280 // 3, 2464 // 3)}
)

# --- STILL CONFIG (full resolution) ---
still_config = picam2.create_still_configuration(
    main={"size": (3280, 2464)}
)

picam2.configure(preview_config)
picam2.start()


def generate_frames():
    while True:
        frame = picam2.capture_array()

        frame = cv2.cvtColor(frame, cv2.COLOR_RGB2BGR)

        ret, buffer = cv2.imencode('.jpg', frame)
        frame = buffer.tobytes()

        yield (b'--frame\r\n'
               b'Content-Type: image/jpeg\r\n\r\n' + frame + b'\r\n')


@app.route('/video_feed')
def video_feed():
    return Response(generate_frames(),
                    mimetype='multipart/x-mixed-replace; boundary=frame')


@app.route('/capture')
def capture():
    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
    filename = f"capture_{timestamp}.jpg"

    current_dir = os.path.dirname(os.path.abspath(__file__))
    filepath = os.path.join(current_dir, filename)

    # 🔥 Switch to high-res still mode
    picam2.switch_mode_and_capture_file(still_config, filepath)

    # 🔥 Switch back to preview mode
    picam2.configure(preview_config)
    picam2.start()

    return jsonify({
        "status": "success",
        "message": "High quality image captured",
        "filename": filename
    })



if __name__ == "__main__":
    threading.Timer(1, open_browser).start()
    app.run(host="0.0.0.0", port=5000)
