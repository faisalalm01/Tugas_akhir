# import cv2
# import torch
# import numpy as np
# import threading
# import os
# import time
# import cv2
# import torch
# import pathlib
# from flask import Flask, request, jsonify
# from threading import Thread
# from queue import Queue
# from uuid import uuid4
# from src.models import db, Cctv, Report

# # Inisialisasi variabel untuk menyimpan IP CCTV
# cctv_ips = ["rtsp://your_cctv_ip1", "rtsp://your_cctv_ip2"]  # Ganti dengan IP CCTV Anda

# # Load PyTorch model
# model = torch.load("path_to_your_model.pt")
# model.eval()

# def preprocess_image(image):
#     # Fungsi untuk memproses gambar sebelum prediksi
#     image = cv2.resize(image, (416, 416))  # Ubah ukuran sesuai model
#     image = image.transpose((2, 0, 1))  # Ubah dimensi ke [C, H, W]
#     image = image.astype('float32')
#     image = torch.from_numpy(image)
#     image = image.unsqueeze(0)  # Tambahkan batch dimension
#     image = (image - 127.5) / 127.5  # Normalisasi
#     return image

# def detect_objects(frame):
#     # Preprocess the image
#     input_data = preprocess_image(frame)

#     # Run the model
#     with torch.no_grad():
#         output_data = model(input_data)

#     # Post-process the output
#     # Misalnya: jika output model adalah bounding boxes dan classes
#     detections = output_data[0].numpy()
#     return detections

# def generate_frames(cctv_ip):
#     cap = cv2.VideoCapture(cctv_ip)
#     while cap.isOpened():
#         success, frame = cap.read()
#         if not success:
#             break
#         else:
#             # Lakukan deteksi objek pada frame
#             detections = detect_objects(frame)

#             # Render hasil deteksi pada frame (ini hanya contoh sederhana)
#             for detection in detections:
#                 # Anda mungkin perlu memproses `detection` sesuai dengan keluaran model Anda
#                 # Asumsikan `detection` memiliki format [x1, y1, x2, y2, confidence, class]
#                 x1, y1, x2, y2, conf, cls = detection
#                 cv2.rectangle(frame, (int(x1), int(y1)), (int(x2), int(y2)), (0, 255, 0), 2)
#                 cv2.putText(frame, f'{cls}: {conf:.2f}', (int(x1), int(y1)-10), cv2.FONT_HERSHEY_SIMPLEX, 0.5, (0, 255, 0), 2)

#             ret, buffer = cv2.imencode('.jpg', frame)
#             frame = buffer.tobytes()
#             yield (b'--frame\r\n'
#                    b'Content-Type: image/jpeg\r\n\r\n' + frame + b'\r\n')
            
##############################################################################
################################## beda yaa ##################################
##############################################################################

# temp = pathlib.PosixPath
# pathlib.PosixPath = pathlib.WindowsPath
# model = torch.hub.load("ultralytics/yolov5", "custom", path="best.pt", force_reload=True)

# def allowed_file(filename):
#     return '.' in filename and filename.rsplit('.', 1)[1].lower() in {'jpg', 'jpeg', 'png'}

# def preprocess(img):
#     height, width = img.shape[:2]
#     ratio = height / width
#     img = cv2.resize(img, (640, int(640 * ratio)))
#     return img

# def draw_bounding_boxes(frame, results):
#     target_classes = ['Normal', 'Penembakan', 'Pencurian', 'Perkelahian', 'Vandalisme']
#     save_frame = False
#     detected_names = []
#     for index, row in results.pandas().xyxy[0].iterrows():
#         if row['name'] in target_classes:
#             save_frame = True
#             name = str(row['name'])
#             detected_names.append(name)
#             x1 = int(row['xmin'])
#             y1 = int(row['ymin'])
#             x2 = int(row['xmax'])
#             y2 = int(row['ymax'])

#             # Menambahkan bounding box dan label pada frame
#             cv2.rectangle(frame, (x1, y1), (x2, y2), (255, 255, 0), 3)
#             cv2.putText(frame, name, (x1, y1), cv2.FONT_HERSHEY_SIMPLEX, 1, (255, 255, 0), 2)

#     return save_frame, detected_names

# def save_detected_image(frame_detected, detected_names, user_id, ip):
#     # if not os.path.exists('Detected_Photos'):
#     #     os.makedirs('Detected_Photos')
    
#     image_path = request.image_url if request.image_url else None
#     cv2.imwrite(image_path, frame_detected)

#     try:
#         cctv = Cctv.query.filter_by(id=ip).first()
#         if not cctv:
#             return jsonify({'msg': 'CCTV not found', 'code': 404}), 404
#         lokasi = cctv.lokasi.namaLokasi

#         for name in detected_names:
#             id = str(uuid4())
#             post_history = Report(
#                 id=id,
#                 image=image_path,
#                 ip=ip,
#                 nama=name,
#                 lokasiRumah="Lokasi Rumah",
#                 lokasi=lokasi,
#                 userId=user_id
#             )
#             db.session.add(post_history)
#         db.session.commit()
#     except Exception as e:
#         print(f"Error saving detection result: {e}")

# def capture_and_detect(cctv, user_id):
#     stream_url = f"rtsp://{cctv.userIp}:{cctv.passwordUser}@{cctv.ip}:{cctv.port}/{cctv.path}"
#     cap = cv2.VideoCapture(stream_url, cv2.CAP_FFMPEG)
#     cap.set(cv2.CAP_PROP_BUFFERSIZE, 1)
#     cap.set(cv2.CAP_PROP_OPEN_TIMEOUT_MSEC, 30000)
#     cap.set(cv2.CAP_PROP_READ_TIMEOUT_MSEC, 30000)

#     if not cap.isOpened():
#         print(f"Gagal membuka stream video dari {cctv.ip}")
#         return

#     frame_queue = Queue(maxsize=1)

#     def capture_frames():
#         while True:
#             ret, frame = cap.read()
#             if not ret:
#                 break
#             if frame_queue.full():
#                 continue
#             frame_queue.put(frame)

#     # Memulai thread untuk capture frames
#     capture_thread = Thread(target=capture_frames, daemon=True)
#     capture_thread.start()

#     while True:
#         if frame_queue.empty():
#             continue
#         frame = frame_queue.get()
#         frame_detected = frame.copy()
#         frame = preprocess(frame)

#         results = model(frame)
#         save_frame, detected_names = draw_bounding_boxes(frame_detected, results)
#         if save_frame:
#             save_detected_image(frame_detected, detected_names, user_id, cctv.ip)

#         cv2.imshow("Video", frame_detected)
#         if cv2.waitKey(1) & 0xFF == ord('q'):
#             break

#     cap.release()
#     cv2.destroyAllWindows()

import time
from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from uuid import uuid4
from datetime import datetime
import threading
import cv2
import torch
import pathlib
from queue import Queue
import requests
from threading import Thread

class Detection:
    def run_detection():
        # Mengambil data CCTV dari endpoint Flask
        response = requests.get('http://localhost:3000/api/cctv_all')
        if response.status_code != 200:
            print("Failed to get CCTV data.")
            return

        cctvs = response.json()['data']
        if not cctvs:
            print("No CCTV available.")
            return

        # Menggunakan CCTV pertama yang tersedia
        cctv = cctvs[0]
        ip = cctv['ip']
        username = cctv['userIp']
        password = cctv['passwordUser']
        port = cctv['port']
        path = cctv['path']
        stream_url = f"rtsp://{username}:{password}@{ip}:{port}/{path}"

        print(f"Trying to open stream: {stream_url}")

        cap = cv2.VideoCapture(stream_url, cv2.CAP_FFMPEG)
        cap.set(cv2.CAP_PROP_BUFFERSIZE, 3)
        cap.set(cv2.CAP_PROP_OPEN_TIMEOUT_MSEC, 30000)
        cap.set(cv2.CAP_PROP_READ_TIMEOUT_MSEC, 30000)

        if not cap.isOpened():
            print("Gagal membuka stream video.")
            return

        # Memuat model YOLO
        temp = pathlib.PosixPath
        pathlib.PosixPath = pathlib.WindowsPath
        model = torch.hub.load("ultralytics/yolov5", "custom", path="best.pt", force_reload=True)

        target_classes = ['Normal', 'Penembakan', 'Pencurian', 'Perkelahian', 'Vandalisme']

        def preprocess(img):
            height, width = img.shape[:2]
            ratio = height / width
            img = cv2.resize(img, (640, int(640 * ratio)))
            return img

        def draw_bounding_boxes(frame, results):
            save_frame = False
            for index, row in results.pandas().xyxy[0].iterrows():
                if row['name'] in target_classes:
                    save_frame = True
                    name = str(row['name'])
                    x1 = int(row['xmin'])
                    y1 = int(row['ymin'])
                    x2 = int(row['xmax'])
                    y2 = int(row['ymax'])

                    cv2.rectangle(frame, (x1, y1), (x2, y2), (255, 255, 0), 3)
                    cv2.putText(frame, name, (x1, y1), cv2.FONT_HERSHEY_SIMPLEX, 1, (255, 255, 0), 2)
            return save_frame

        def save_detected_image(frame_detected):
            # image_path = f"Detected_Photos/detected_{datetime.now().strftime('%Y%m%d_%H%M%S')}.jpg"
            image_path = request.image_url
            cv2.imwrite(image_path, frame_detected)

            # Upload ke Cloudinary
            # cloudinary_response = cloudinary.uploader.upload(image_path)
            # image_url = cloudinary_response['secure_url']

            # Mengirim data ke endpoint Flask
            data = {
                'image': image_path,
                'ip': ip,
                'nama': 'Pencurian',  # Sesuaikan dengan data yang sesuai
                'lokasiRumah': 'Tegal',  # Sesuaikan dengan data yang sesuai
            }
            response = requests.post('http://localhost:3000/api/history', data=data)
            if response.status_code != 200:
                print("Failed to save detection to history.")

        frame_queue = Queue(maxsize=1)

        def capture_frames():
            while True:
                ret, frame = cap.read()
                if not ret:
                    print("Gagal membaca frame dari stream.")
                    time.sleep(1)
                    continue
                if frame_queue.full():
                    continue
                frame_queue.put(frame)

        capture_thread = Thread(target=capture_frames)
        capture_thread.start()

        while True:
            if frame_queue.empty():
                continue
            frame = frame_queue.get()
            frame_detected = frame.copy()
            frame = preprocess(frame)

            results = model(frame)
            save_frame = draw_bounding_boxes(frame_detected, results)
            if save_frame:
                save_detected_image(frame_detected)

            cap.release()
            # cv2.imshow("Video", frame_detected)
            # if cv2.waitKey(1) & 0xFF == ord('q'):
            #     break

        # cv2.destroyAllWindows()