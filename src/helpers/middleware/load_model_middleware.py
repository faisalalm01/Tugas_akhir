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
from flask_socketio import SocketIO, emit

# class Detection:
#     def run_detection():
#         # Mengambil data CCTV dari endpoint Flask
#         response = requests.get('http://localhost:3000/api/cctv_all')
#         if response.status_code != 200:
#             print("Failed to get CCTV data.")
#             return

#         cctvs = response.json()['data']
#         if not cctvs:
#             print("No CCTV available.")
#             return

#         # Menggunakan CCTV pertama yang tersedia
#         cctv = cctvs[0]
#         ip = cctv['ip']
#         username = cctv['userIp']
#         password = cctv['passwordUser']
#         port = cctv['port']
#         path = cctv['path']
#         stream_url = f"rtsp://{username}:{password}@{ip}:{port}/{path}"

#         print(f"Trying to open stream: {stream_url}")

#         cap = cv2.VideoCapture(stream_url, cv2.CAP_FFMPEG)
#         cap.set(cv2.CAP_PROP_BUFFERSIZE, 3)
#         cap.set(cv2.CAP_PROP_OPEN_TIMEOUT_MSEC, 30000)
#         cap.set(cv2.CAP_PROP_READ_TIMEOUT_MSEC, 30000)

#         if not cap.isOpened():
#             print("Gagal membuka stream video.")
#             return

#         # Memuat model YOLO
#         temp = pathlib.PosixPath
#         pathlib.PosixPath = pathlib.WindowsPath
#         model = torch.hub.load("ultralytics/yolov5", "custom", path="best.pt", force_reload=True)

#         target_classes = ['Normal', 'Penembakan', 'Pencurian', 'Perkelahian', 'Vandalisme']

#         def preprocess(img):
#             height, width = img.shape[:2]
#             ratio = height / width
#             img = cv2.resize(img, (640, int(640 * ratio)))
#             return img

#         def draw_bounding_boxes(frame, results):
#             save_frame = False
#             for index, row in results.pandas().xyxy[0].iterrows():
#                 if row['name'] in target_classes:
#                     save_frame = True
#                     name = str(row['name'])
#                     x1 = int(row['xmin'])
#                     y1 = int(row['ymin'])
#                     x2 = int(row['xmax'])
#                     y2 = int(row['ymax'])

#                     cv2.rectangle(frame, (x1, y1), (x2, y2), (255, 255, 0), 3)
#                     cv2.putText(frame, name, (x1, y1), cv2.FONT_HERSHEY_SIMPLEX, 1, (255, 255, 0), 2)
#             return save_frame

#         def save_detected_image(frame_detected):
#             # image_path = f"Detected_Photos/detected_{datetime.now().strftime('%Y%m%d_%H%M%S')}.jpg"
#             image_path = request.image_url
#             cv2.imwrite(image_path, frame_detected)

#             # Upload ke Cloudinary
#             # cloudinary_response = cloudinary.uploader.upload(image_path)
#             # image_url = cloudinary_response['secure_url']

#             # Mengirim data ke endpoint Flask
#             data = {
#                 'image': image_path,
#                 'ip': ip,
#                 'nama': 'Pencurian',  # Sesuaikan dengan data yang sesuai
#                 'lokasiRumah': 'Tegal',  # Sesuaikan dengan data yang sesuai
#             }
#             response = requests.post('http://localhost:3000/api/history', data=data)
#             if response.status_code != 200:
#                 print("Failed to save detection to history.")

#         frame_queue = Queue(maxsize=1)

#         def capture_frames():
#             while True:
#                 ret, frame = cap.read()
#                 if not ret:
#                     print("Gagal membaca frame dari stream.")
#                     time.sleep(1)
#                     continue
#                 if frame_queue.full():
#                     continue
#                 frame_queue.put(frame)

#         capture_thread = Thread(target=capture_frames)
#         capture_thread.start()

#         while True:
#             if frame_queue.empty():
#                 continue
#             frame = frame_queue.get()
#             frame_detected = frame.copy()
#             frame = preprocess(frame)

#             results = model(frame)
#             save_frame = draw_bounding_boxes(frame_detected, results)
#             if save_frame:
#                 save_detected_image(frame_detected)

#             cap.release()
#             # cv2.imshow("Video", frame_detected)
#             # if cv2.waitKey(1) & 0xFF == ord('q'):
#             #     break

#         # cv2.destroyAllWindows()

# import cv2
# import torch
# import pathlib
# from threading import Thread
# from queue import Queue
# import os
# from datetime import datetime
# import requests
# from werkzeug.utils import secure_filename
# from socketio import Client

# class Detection:
#     def run_detection():
#         # Menangani konversi path untuk Windows
#         temp = pathlib.PosixPath
#         pathlib.PosixPath = pathlib.WindowsPath

#         # Memuat model YOLO
#         model = torch.hub.load("ultralytics/yolov5", "custom", path="best.pt", force_reload=True)

#         # sio = Client()
#         # sio.connect('http://localhost:3000') 

#         # ip = "192.168.169.1"
#         # port = "554"
#         # path = "H.264"
#         # username = "admin"
#         # password = "RETCMV"
#         # stream_url = f"rtsp://{username}:{password}@{ip}:{port}/{path}"

#         # print(f"Trying to open stream: {stream_url}")
#         response = requests.get('http://localhost:3000/api/cctv_all')
#         if response.status_code != 200:
#             print("Failed to get CCTV data.")
#             return

#         cctvs = response.json()['data']
#         if not cctvs:
#             print("No CCTV available.")
#             return

#         # Menggunakan CCTV pertama yang tersedia
#         cctv = cctvs[0]
#         id = cctv['id']
#         ip = cctv['ip']
#         username = cctv['userIp']
#         password = cctv['passwordUser']
#         port = cctv['port']
#         path = cctv['path']
#         stream_url = f"rtsp://{username}:{password}@{ip}:{port}/{path}"

#         print(f"Trying to open stream: {stream_url}")

#         # Membuka stream video
#         cap = cv2.VideoCapture(stream_url, cv2.CAP_FFMPEG)

#         cap.set(cv2.CAP_PROP_BUFFERSIZE, 1)
#         cap.set(cv2.CAP_PROP_OPEN_TIMEOUT_MSEC, 30000)
#         cap.set(cv2.CAP_PROP_READ_TIMEOUT_MSEC, 30000)

#         if not cap.isOpened():
#             print("Gagal membuka stream video.")
#             exit()

#         # Daftar kelas target
#         target_classes = ['Normal', 'Penembakan', 'Pencurian', 'Perkelahian', 'Vandalisme']

#         # Fungsi untuk memproses gambar
#         def preprocess(img):
#             height, width = img.shape[:2]
#             ratio = height / width
#             img = cv2.resize(img, (640, int(640 * ratio)))
#             return img

#         # Fungsi untuk menggambar bounding box
#         def draw_bounding_boxes(frame, results):
#             save_frame = False
#             detection_data = []
#             nama_deteksi = None
#             for index, row in results.pandas().xyxy[0].iterrows():
#                 if row['name'] in target_classes:
#                     save_frame = True
#                     name = str(row['name'])
#                     x1 = int(row['xmin'])
#                     y1 = int(row['ymin'])
#                     x2 = int(row['xmax'])
#                     y2 = int(row['ymax'])

#                     # Menambahkan bounding box dan label pada frame
#                     cv2.rectangle(frame, (x1, y1), (x2, y2), (255, 255, 0), 3)
#                     cv2.putText(frame, name, (x1, y1), cv2.FONT_HERSHEY_SIMPLEX, 1, (255, 255, 0), 2)
                    
#                     detection_data.append({
#                         "name": name,
#                         "x1": x1,
#                         "y1": y1,
#                         "x2": x2,
#                         "y2": y2
#                     })
                    
#                     nama_deteksi = name

#             return save_frame, detection_data, nama_deteksi

#         # Fungsi untuk mengirim data ke API
#         def send_data_to_api(image_path, detection_data, nama_deteksi):
#             api_url = 'http://127.0.0.1:3000/api/history'  # Ganti dengan URL endpoint API Anda
            
#             with open(image_path, 'rb') as image_file:
#                 files = {'image': (secure_filename(os.path.basename(image_path)), image_file, 'image/jpeg')}
#                 payload = {
#                     'ip': id,
#                     'nama': nama_deteksi,
#                     'lokasiRumah': 'Lokasi Rumah',
#                 }
                
#                 try:
#                     response = requests.post(api_url, files=files, data=payload)
#                     if response.status_code == 200:
#                         print("Data berhasil dikirim ke API")
#                     else:
#                         print(f"Gagal mengirim data ke API: {response.status_code}")
#                 except Exception as e:
#                     print(f"Error saat mengirim data ke API: {e}")

#         # def send_data_to_client(image_path, detection_data):
#         #     with open(image_path, 'rb') as image_file:
#         #         image_data = image_file.read()
#         #     sio.emit('detection', {'image': image_data, 'detections': detection_data})


#         frame_queue = Queue(maxsize=1)

#         # Fungsi untuk menangkap frame
#         def capture_frames():
#             while True:
#                 ret, frame = cap.read()
#                 if not ret:
#                     print("Gagal membaca frame dari stream.")
#                     continue
#                 if frame_queue.full():
#                     continue
#                 frame_queue.put(frame)

#         # Memulai thread untuk capture frames
#         capture_thread = Thread(target=capture_frames)
#         capture_thread.start()

#         while True:
#             if frame_queue.empty():
#                 continue
#             frame = frame_queue.get()
#             frame_detected = frame.copy()
#             frame = preprocess(frame)

#             results = model(frame)
#             save_frame, detection_data, nama_deteksi = draw_bounding_boxes(frame_detected, results)
#             if save_frame:
#                 image_path = f"detected_{datetime.now().strftime('%Y%m%d_%H%M%S')}.jpg"
#                 cv2.imwrite(image_path, frame_detected)
#                 send_data_to_api(image_path, detection_data, nama_deteksi)
#                 # send_data_to_client(image_path, detection_data)
#                 os.remove(image_path)

#             if cv2.waitKey(1) & 0xFF == ord('q'):
#                 break

#         cap.release()
#         cv2.destroyAllWindows()



import requests
import cv2
import threading

class Detection:
    @staticmethod
    def run_detection():
        response = requests.get('http://localhost:3000/api/cctv_all')
        if response.status_code != 200:
            print("Failed to get CCTV data.")
            return

        cctvs = response.json()['data']
        if not cctvs:
            print("No CCTV available.")
            return

        threads = []

        for i, cctv in enumerate(cctvs):
            protocol = cctv['protocol']
            ip = cctv['ip']
            username = cctv.get('userIp')
            password = cctv.get('passwordUser')
            port = cctv['port']
            path = cctv['path']

            if username and password:
                rtsp_url = f"{protocol}{username}:{password}@{ip}:{port}/{path}"
            else:
                rtsp_url = f"{protocol}{ip}/{path}"

            print(f"Trying to open stream: {rtsp_url}")

            thread = threading.Thread(target=Detection.stream_cctv, args=(rtsp_url, f"{i}_stream"))
            
            threads.append(thread)
            thread.start()

        for thread in threads:
            thread.join()

    @staticmethod
    def stream_cctv(rtsp_url, label):
        cap = cv2.VideoCapture(rtsp_url, cv2.CAP_FFMPEG)

        cap.set(cv2.CAP_PROP_BUFFERSIZE, 3)
        cap.set(cv2.CAP_PROP_OPEN_TIMEOUT_MSEC, 30000)
        cap.set(cv2.CAP_PROP_READ_TIMEOUT_MSEC, 30000)

        if not cap.isOpened():
            print(f"Error: Tidak bisa membuka stream video untuk {rtsp_url}. Pastikan URL dan koneksi jaringan benar.")
            return

        print(f"Koneksi berhasil, memulai stream untuk {rtsp_url}...")

        while True:
            ret, frame = cap.read()

            if not ret:
                print(f"Error: Tidak bisa membaca frame dari stream video untuk {rtsp_url}.")
                break

            # Menampilkan frame video
            cv2.imshow(f'DroidCam Stream {label}', frame)

            # Keluar dari loop jika tombol 'q' ditekan
            if cv2.waitKey(1) & 0xFF == ord('q'):
                break

        # Membersihkan
        cap.release()
        cv2.destroyAllWindows()

# Contoh penggunaan:
# Detection.run_detection()