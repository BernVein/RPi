from flask import Flask, Response, jsonify, send_from_directory
from flask_cors import CORS
from picamera2 import Picamera2
import cv2
import os
from datetime import datetime
import webbrowser
import threading
import subprocess
import time

# ----------------------------
# WiFi Hotspot Setup via nmcli
# ----------------------------
def create_hotspot(ssid="RiceBranAI", password="ricebran123", iface="wlan0"):
    """
    Creates a WiFi hotspot on the Raspberry Pi using nmcli.
    Default hotspot IP will be 192.168.42.1
    """
    try:
        # Delete existing hotspot connection if it exists
        subprocess.run(["nmcli", "connection", "delete", ssid], check=False)

        # Create hotspot
        subprocess.run([
            "nmcli", "device", "wifi", "hotspot",
            "ifname", iface,
            "con-name", ssid,
            "ssid", ssid,
            "password", password
        ], check=True)

        print(f"✅ Hotspot '{ssid}' created! Connect at http://192.168.42.1:5000")
        # Give hotspot a moment to initialize
        time.sleep(5)
    except subprocess.CalledProcessError as e:
        print("❌ Failed to create hotspot:", e)

# ----------------------------
# Open Browser Function
# ----------------------------
def open_browser():
    # On a device connected to the Pi hotspot, use 192.168.42.1
    webbrowser.open("http://192.168.42.1:5000")

# ----------------------------
# Flask App Setup
# ----------------------------
app = Flask(__name__, static_folder="dist", static_url_path="")
CORS(app)

@app.route("/", defaults={"path": ""})
@app.route("/<path:path>")
def serve_react(path):
    if path != "" and os.path.exists(os.path.join(app.static_folder, path)):
        return send_from_directory(app.static_folder, path)
    else:
        return send_from_directory(app.static_folder, "index.html")

# ----------------------------
# Camera Setup
# ----------------------------
picam2 = Picamera2()

preview_config = picam2.create_preview_configuration(
    main={"size": (3280 // 3, 2464 // 3)}
)

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

    picam2.switch_mode_and_capture_file(still_config, filepath)
    picam2.configure(preview_config)
    picam2.start()

    return jsonify({
        "status": "success",
        "message": "High quality image captured",
        "filename": filename
    })

# ----------------------------
# Main
# ----------------------------
if __name__ == "__main__":
    # Step 1: Start hotspot
    create_hotspot()

    # Step 2: Start Flask + open browser
    threading.Timer(1, open_browser).start()
    app.run(host="0.0.0.0", port=5000)
