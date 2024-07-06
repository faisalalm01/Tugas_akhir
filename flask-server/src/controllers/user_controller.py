from flask import Blueprint, request, jsonify
from uuid import uuid4
from src.models import db
from src.models import User
from flask_restx import Resource, Api, reqparse
from src.helpers.response import send_response
from src.helpers.constant.http_status import STATUS_CODE
from src.helpers.constant.http_message import SUCCESS, ERROR
from src.helpers.token import generate_token

class UserController:
     def get_detail_user():
        try:
            idUser = request.token
            item = User.query.filter_by(id=idUser).first()
            userData = {
                "id": item.id,
                "image": item.image,
                "username": item.username,
                "email": item.email,
                "notelp": item.notelp,
                "isVerif": item.isVerif,
                "otp": item.otp
            }
            return {'message': 'success', 'code': 200, 'data': userData}
        except Exception as e:
            print(e)
            return {'message': 'failed', 'code': 400, 'error': e}