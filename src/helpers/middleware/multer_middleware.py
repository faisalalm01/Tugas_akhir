import os
import time
from flask import jsonify, request
from werkzeug.utils import secure_filename

UPLOAD_FOLDER = './public/image'
ALLOWED_EXTENSIONS = {'jpg', 'jpeg', 'png'}
MAX_CONTENT_LENGTH = 5 * 1000 * 1000  # 2 MB limit

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

def upload_middleware(next_func):
    def wrapper():
        if 'image' not in request.files:
            request.image_url = None
            return next_func()

        file = request.files['image']
        if file.filename == '':
            return jsonify({'msg': 'No selected file', 'status': 400}), 400

        if file and allowed_file(file.filename):
            filename = secure_filename(f"{int(time.time())}-{file.filename}")
            file.save(os.path.join(UPLOAD_FOLDER, filename))
            request.image_url = os.path.join(UPLOAD_FOLDER, filename)
            return next_func()
        else:
            return jsonify({'msg': 'Unsupported file type!', 'status': 400}), 400

    return wrapper