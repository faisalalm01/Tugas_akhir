from flask import Blueprint, request, jsonify
from uuid import uuid4
from src.models import db
from src.models import Lokasi
from flask_restx import Resource, Api, reqparse
from src.helpers.response import send_response
from src.helpers.constant.http_status import STATUS_CODE
from src.helpers.constant.http_message import SUCCESS, ERROR
from src.helpers.token import generate_token

class LokasiController:
    def input_lokasi():
        try:
            id = str(uuid4())
            if request.is_json:
                data = request.get_json()
                namaLokasi = data.get('namaLokasi')
            else:
                namaLokasi = request.form.get('namaLokasi')

            post_lokasi = Lokasi(
                id=id,
                namaLokasi=namaLokasi,
            )
            db.session.add(post_lokasi)
            db.session.commit()

            response_data = {
                'id': post_lokasi.id,
                'namaLokasi': post_lokasi.namaLokasi,
                }

            return {'message': 'success', 'status': 200, 'data': response_data}
        except Exception as e:
            print(e)
            return {'message': 'failed', 'status': 500, 'error': e}
    
    def get_Lokasi():
        try:
            # idUser = request.token
            get_lokasi = Lokasi.query.all()
            response_data = [
                {
                    'id': response_data.id,
                    'namaLokasi': response_data.namaLokasi,
                    'createdAt': response_data.createdAt,
                    'updatedAt': response_data.updatedAt,
                } for response_data in get_lokasi
            ]
            return {'message': 'success', 'code': 200, 'data': response_data}
        except Exception as e:
            print(e)
            return {'message': 'failed', 'code': 400, 'error': e}
