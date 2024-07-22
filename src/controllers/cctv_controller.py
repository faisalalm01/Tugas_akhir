from flask import Blueprint, request, jsonify
from uuid import uuid4
from src.models import db
from src.models import Cctv
from flask_restx import Resource, Api, reqparse
from src.helpers.response import send_response
from src.helpers.constant.http_status import STATUS_CODE
from src.helpers.constant.http_message import SUCCESS, ERROR
from src.helpers.token import generate_token

class CctvController:
    def input_ip_cctv_camera():
        try:
            id = str(uuid4())
            idUser = request.token
            ip = request.form.get('ip')
            lokasiCamera = request.form.get('lokasiCamera')
            userIp = request.form.get('userIp')
            passwordUser = request.form.get('passwordUser')
            path = request.form.get('path')
            port = request.form.get('port')
            protocol = request.form.get('protocol')
            image = request.image_url if request.image_url else None
            # image = request.form.get('Image').get('url')
            # image = request.form.get('image_url') if request.form.get('image_url') else None

            post_camera = Cctv(
                id=id, 
                idUser=idUser, 
                protocol=protocol,
                ip=ip, 
                lokasiCamera=lokasiCamera,
                userIp=userIp, 
                passwordUser=passwordUser, 
                path=path, 
                image=image,
                port=port, 
                )
            db.session.add(post_camera)
            db.session.commit()

            response_data = {
                'id': post_camera.id,
                'idUser': post_camera.idUser,
                'ip': post_camera.ip,
                'lokasiCamera': post_camera.lokasiCamera,
                'userIp': post_camera.userIp,
                'passwordUser': post_camera.passwordUser,
                'path': post_camera.path,
                'image': post_camera.image,
                'port': post_camera.port,
                }

            return {'message': 'success', 'code': 200, 'data': response_data}
        except Exception as e:
            print(e)
            return {'message': 'failed', 'code': 500, 'error': e}
    
    def get_ip_cctv_camera():
        try:
            idUser = request.token
            get_camera_cctv = Cctv.query.filter_by(idUser=idUser, isDelete=False).all()
            response_data = [cctv.to_dict() for cctv in get_camera_cctv]
            return {'message': 'success', 'code': 200, 'data': response_data}
        except Exception as e:
            print(e)
            return {'message': 'failed', 'code': 400, 'error': e}

    def get_ip_cctv_camera_by_id(id):
        try:
            item = Cctv.query.filter_by(id=id).first()
            cctvData = {
                "id": item.id,
                "protocol": item.protocol,
                "image": item.image,
                "usercctv": item.userIp,
                "passcctv": item.passwordUser,
                "ip": item.ip,
                "port": item.port,
                "path": item.path,
                "lokasi": item.lokasiCamera
            }
            return {'message': 'success', 'code': 200, 'data': cctvData}
        except Exception as e:
            print(e)
            return {'message': 'failed', 'code': 400, 'error': e}

    def delete_ip_cctv_camera(id):
        try:
            item = Cctv.query.filter_by(id=id, isDelete=False).first()
            if item:
                    item.soft_delete()
            return {'message': 'success', 'code': 200}
        except Exception as e:
            print(e)
            return {'message': 'failed', 'code': 400, 'error': e}