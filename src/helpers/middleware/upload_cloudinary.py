import os
import time
from flask import jsonify, request
from werkzeug.utils import secure_filename
import cloudinary.uploader
from uuid import uuid4

UPLOAD_FOLDER = './public/image'
ALLOWED_EXTENSIONS = {'jpg', 'jpeg', 'png'}
MAX_CONTENT_LENGTH = 5 * 1000 * 1000  # 5 MB limit

cloudinary.config(
    cloud_name=os.getenv('CLOUDINARY_CLOUD_NAME'),
    api_key=os.getenv('CLOUDINARY_API_KEY'),
    api_secret=os.getenv('CLOUDINARY_API_SECRET')
)

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

def upload_cloudinary(next_func):
    def wrapper():
        if 'image' not in request.files:
            request.image_url = None
            return next_func()

        file = request.files['image']
        print(file)
        if file.filename == '':
            return jsonify({'msg': 'No selected file', 'status': 400}), 400

        if file and allowed_file(file.filename):
            if not os.path.exists(UPLOAD_FOLDER):
                os.makedirs(UPLOAD_FOLDER)

            # Save the file locally
            filename = secure_filename(f"{int(time.time())}-{file.filename}")
            local_path = os.path.join(UPLOAD_FOLDER, filename)
            file.save(local_path)

            try:
                # Upload to Cloudinary
                result = cloudinary.uploader.upload(
                    local_path,
                    folder='crime-image-upload/',
                    tags=['crime-detection']
                )

                # resultCctv = cloudinary.uploader.upload(
                #     local_path,
                #     folder='crime-banner-cctv/',
                #     tags=['crime-detection']
                # )

                # resultHistory = cloudinary.uploader.upload(
                #     local_path,
                #     folder='crime-history/',
                #     tags=['crime-detection']
                # )

                # resultProfile = cloudinary.uploader.upload(
                #     local_path,
                #     folder='crime-profile/',
                #     tags=['crime-detection']
                # )

                # Remove local file after uploading to Cloudinary
                os.remove(local_path)

                # Set the Cloudinary URL to request object
                request.image_url = result['secure_url']
                # request.image_cctv = resultCctv['secure_url']
                # request.image_history = resultHistory['secure_url']
                # request.image_profile = resultProfile['secure_url']
                return next_func()

            except Exception as e:
                print(e)
                return jsonify({'msg': 'Failed to upload to Cloudinary', 'status': 500, "error": str(e)}), 500

        else:
            return jsonify({'msg': 'Unsupported file type!', 'status': 400}), 400

    return wrapper

