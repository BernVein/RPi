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

@app.route("/", defaults={"path": ""})
@app.route("/<path:path>")
def serve_react(path):
    if path != "" and os.path.exists(os.path.join(app.static_folder, path)):
        return send_from_directory(app.static_folder, path)
    else:
        return send_from_directory(app.static_folder, "index.html")



CORS(app)

picam2 = Picamera2()

# --- PREVIEW CONFIG (fast streaming) ---
preview_config = picam2.create_preview_configuration(
    main={"size": (3280 // 3, 1845 // 3)}
)

# --- STILL CONFIG (full resolution) ---
still_config = picam2.create_still_configuration(
    main={"size": (3280, 1845)}
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

#Inference code (commented out for now, can be enabled when model is ready)

# import numpy as np
# import tensorflow as tf
# from tensorflow.keras.preprocessing import image
# from tensorflow.keras.applications.mobilenet_v2 import preprocess_input

# # Load model once (important for performance)
# model = tf.keras.models.load_model("rice_bran_adulteration_mobilenetv2.h5")

# def predict_image(img_path):
#     """
#     Accepts one image path and returns:
#     - label (Adulterated / Unadulterated)
#     - confidence score
#     """

#     # Load and preprocess image
#     img = image.load_img(img_path, target_size=(224, 224))
#     img_array = image.img_to_array(img)
#     img_array = np.expand_dims(img_array, axis=0)
#     img_array = preprocess_input(img_array)

#     # Predict
#     prediction = model.predict(img_array, verbose=0)[0][0]

#     # Interpret result
#     if prediction >= 0.5:
#         label = "Unadulterated"
#         confidence = float(prediction)
#     else:
#         label = "Adulterated"
#         confidence = float(1 - prediction)

#     return label, confidence


# # ---------------------------
# # Example usage
# # ---------------------------
# if __name__ == "__main__":
#     img_path = "test_image.jpg"  # Change to your image path
#     label, confidence = predict_image(img_path)

#     print(f"Prediction: {label}")
#     print(f"Confidence: {confidence:.4f}")




if __name__ == "__main__":
    threading.Timer(1, open_browser).start()
    app.run(host="0.0.0.0", port=5000)
