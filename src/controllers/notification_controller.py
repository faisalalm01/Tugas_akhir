from flask import Flask, request, jsonify
import requests
import json
from google.oauth2 import service_account
from google.auth.transport.requests import Request

# Daftar untuk menyimpan device tokens (sebaiknya disimpan di database untuk skala produksi)
device_tokens = []

# Path ke file service account
SERVICE_ACCOUNT_FILE = '********.json'

# Scope yang diperlukan
SCOPES = ['https://www.googleapis.com/auth/firebase.messaging']

# FCM endpoint
fcm_endpoint = 'https://fcm.googleapis.com/v1/projects/id_project/messages:send'

# Inisialisasi credentials dari service account
credentials = service_account.Credentials.from_service_account_file(
    SERVICE_ACCOUNT_FILE, scopes=SCOPES)

class NotificationController:
    @staticmethod
    def send_push_notification(registration_ids, title, body):
        # Refresh token dan mendapatkan akses token
        credentials.refresh(Request())
        access_token = credentials.token

        # Header untuk permintaan HTTP
        headers = {
            'Authorization': 'Bearer ' + access_token,
            'Content-Type': 'application/json; UTF-8',
        }

        # Payload untuk notifikasi
        notification_payload = {
            "message": {
                "notification": {
                    "title": title,
                    "body": body
                },
                "android": {
                    "priority": "high"
                },
                "token": registration_ids[0]  # Jika hanya mengirim ke satu device
                # Atau jika ingin mengirim ke beberapa device, gunakan loop atau buat panggilan terpisah
            }
        }

        # Mengirimkan permintaan POST ke FCM
        response = requests.post(fcm_endpoint, headers=headers, data=json.dumps(notification_payload))

        if response.status_code == 200:
            print("Notifikasi terkirim:", response.json())
            return response.json()
        else:
            print("Gagal mengirim notifikasi:", response.status_code, response.text)
            return {"error": response.text}, response.status_code

    @staticmethod
    def register_token():
        data = request.get_json()
        token = data.get('token')

        if token and token not in device_tokens:
            device_tokens.append(token)
            print(f"Token terdaftar: {token}")
            return jsonify({'message': 'Token saved'}), 200
        else:
            return jsonify({'message': 'Token already exists or invalid'}), 400

    @staticmethod
    def send_notification():
        detection = request.json.get('detection')
        message_title = "Peringatan Deteksi"
        message_body = f"Terindikasi jenis tindak: {detection}, di sekitar area CCTV"

        if not device_tokens:
            return jsonify({'message': 'No tokens available to send notification'}), 400

        result = NotificationController.send_push_notification(device_tokens, message_title, message_body)
        return jsonify({'message': 'Notification sent', 'result': result}), 200
