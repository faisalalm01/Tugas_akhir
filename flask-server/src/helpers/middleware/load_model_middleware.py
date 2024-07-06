import cv2
import torch
import numpy as np
import threading

# Inisialisasi variabel untuk menyimpan IP CCTV
cctv_ips = ["rtsp://your_cctv_ip1", "rtsp://your_cctv_ip2"]  # Ganti dengan IP CCTV Anda

# Load PyTorch model
model = torch.load("path_to_your_model.pt")
model.eval()

def preprocess_image(image):
    # Fungsi untuk memproses gambar sebelum prediksi
    image = cv2.resize(image, (416, 416))  # Ubah ukuran sesuai model
    image = image.transpose((2, 0, 1))  # Ubah dimensi ke [C, H, W]
    image = image.astype('float32')
    image = torch.from_numpy(image)
    image = image.unsqueeze(0)  # Tambahkan batch dimension
    image = (image - 127.5) / 127.5  # Normalisasi
    return image

def detect_objects(frame):
    # Preprocess the image
    input_data = preprocess_image(frame)

    # Run the model
    with torch.no_grad():
        output_data = model(input_data)

    # Post-process the output
    # Misalnya: jika output model adalah bounding boxes dan classes
    detections = output_data[0].numpy()
    return detections

def generate_frames(cctv_ip):
    cap = cv2.VideoCapture(cctv_ip)
    while cap.isOpened():
        success, frame = cap.read()
        if not success:
            break
        else:
            # Lakukan deteksi objek pada frame
            detections = detect_objects(frame)

            # Render hasil deteksi pada frame (ini hanya contoh sederhana)
            for detection in detections:
                # Anda mungkin perlu memproses `detection` sesuai dengan keluaran model Anda
                # Asumsikan `detection` memiliki format [x1, y1, x2, y2, confidence, class]
                x1, y1, x2, y2, conf, cls = detection
                cv2.rectangle(frame, (int(x1), int(y1)), (int(x2), int(y2)), (0, 255, 0), 2)
                cv2.putText(frame, f'{cls}: {conf:.2f}', (int(x1), int(y1)-10), cv2.FONT_HERSHEY_SIMPLEX, 0.5, (0, 255, 0), 2)

            ret, buffer = cv2.imencode('.jpg', frame)
            frame = buffer.tobytes()
            yield (b'--frame\r\n'
                   b'Content-Type: image/jpeg\r\n\r\n' + frame + b'\r\n')