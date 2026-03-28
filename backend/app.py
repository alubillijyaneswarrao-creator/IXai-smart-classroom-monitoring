from flask import Flask, jsonify
from flask_cors import CORS
import cv2
from datetime import datetime

from face_recognition_model import recognize_face
from emotion_model import detect_emotion

app = Flask(__name__)
CORS(app)

camera = cv2.VideoCapture(0)

attendance_log = []
marked_names = set()

# ---------------------------
# ROOT
# ---------------------------
@app.route("/")
def home():
    return "Backend Running ✅"

@app.route("/start")
def start_camera():

    print("🚀 START ROUTE HIT")

    if not camera.isOpened():
        return "❌ Camera not accessible"

    frame_count = 0

    while True:
        ret, frame = camera.read()

        if not ret:
            print("❌ Frame not captured")
            continue

        print("🎥 Frame captured")

        # resize for speed
        frame = cv2.resize(frame, (320, 240))

        frame_count += 1

        # skip frames
        if frame_count % 5 != 0:
            cv2.imshow("Camera", frame)
            if cv2.waitKey(1) & 0xFF == ord('q'):
                break
            continue

        names = recognize_face(frame)
        print("Detected:", names)

        for name in names:
            emotion = detect_emotion(frame)

            if name not in marked_names:
                entry = {
                    "name": name,
                    "time": datetime.now().strftime("%H:%M:%S"),
                    "emotion": emotion
                }

                attendance_log.append(entry)
                marked_names.add(name)

                print("✅ Attendance Marked:", entry)

     
        cv2.imshow("Camera", frame)

        if cv2.waitKey(1) & 0xFF == ord('q'):
            break

    camera.release()
    cv2.destroyAllWindows()

    return "Session Ended"


@app.route("/data")
def get_data():
    return jsonify({"attendance": attendance_log})

# ---------------------------
# RUN
# ---------------------------
if __name__ == "__main__":
    app.run(debug=True)
