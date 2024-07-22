from flask import Blueprint, request, jsonify, render_template
from uuid import uuid4
from src.models import db
from src.models import Report, Cctv
from threading import Thread
# from src.helpers.middleware.load_model_middleware import capture_and_detect
from flask import Flask, jsonify, request, Response, render_template
import cv2
import torch
import pathlib

# RTSP_URL = "rtsp://admin:RETCMV@192.168.169.1:554/H.264"

class XampleController:
        
    def index():
        return render_template('cctv_view.html')

    def video_feed(id):
        cctv = Cctv.query.get(id)
        if cctv:
            username = cctv.userIp
            password = cctv.passwordUser
            if username and password:
                rtsp_url = f"{cctv.protocol}{username}:{password}@{cctv.ip}/{cctv.path}"
            else:
                rtsp_url = f"{cctv.protocol}{cctv.ip}/{cctv.path}"
            return Response(gen_frames(rtsp_url), mimetype='multipart/x-mixed-replace; boundary=frame')
        else:
            return "CCTV not found", 404
        
    def get_all_cctv():
        try:
            get_camera_cctv = Cctv.query.filter_by(isDelete=False).all()
            response_data = [cctv.to_dict() for cctv in get_camera_cctv]
            return {'message': 'success', 'code': 200, 'data': response_data}
        except Exception as e:
            print(e)
            return {'message': 'failed', 'code': 400, 'error': e}

#        
def gen_frames(rtsp_url):
    cap = cv2.VideoCapture(rtsp_url)
    cap.set(cv2.CAP_PROP_BUFFERSIZE, 1)
    while True:
        success, frame = cap.read()
        if not success:
            print("Failed to read frame from stream")
            break
        else:
            try:
                ret, buffer = cv2.imencode('.jpg', frame)
                frame = buffer.tobytes()
                yield (b'--frame\r\n'
                       b'Content-Type: image/jpeg\r\n\r\n' + frame + b'\r\n')
            except Exception as e:
                print(f"Error encoding frame: {e}")