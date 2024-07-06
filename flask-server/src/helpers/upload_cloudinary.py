import os
from uuid import uuid4
from flask import request, jsonify
import cloudinary.uploader
from src.models import db, Cctv

cloudinary.config(
    cloud_name=os.getenv('CLOUDINARY_CLOUD_NAME'),
    api_key=os.getenv('CLOUDINARY_API_KEY'),
    api_secret=os.getenv('CLOUDINARY_API_SECRET')
)

def upload_cloudinary(next_func):
    def wrappers():
        try:
            if 'image' not in request.files:
                return jsonify({'msg': 'No file part', 'status': 400}), 400

            file = request.files['image']
            if file.filename == '':
                return jsonify({'msg': 'No selected file', 'status': 400}), 400

            # Simpan file sementara di server (opsional, tergantung kebutuhan)
            temp_filename = f"{uuid4().hex}-{file.filename}"
            temp_path = os.path.join('./temp', temp_filename)
            file.save(temp_path)

            # Upload ke Cloudinary
            result = cloudinary.uploader.upload(
                temp_path,
                folder='crime-capture/',
                tags=['crime-capture']
            )

            # Hapus file sementara dari server
            os.remove(temp_path)

            # Menambahkan URL gambar dari Cloudinary ke request untuk digunakan di fungsi selanjutnya
            request.image_url = result['secure_url']

            return next_func()
        except Exception as e:
            print(e)
            return jsonify({'msg': 'Failed to upload to Cloudinary', 'status': 500, "error": e}), 500

    return wrappers
