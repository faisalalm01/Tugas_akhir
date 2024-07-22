from flask import Blueprint, request, jsonify, render_template
from uuid import uuid4
from src.models import db
from src.models import Report, Cctv
# from threading import Thread
# from src.helpers.middleware.load_model_middleware import capture_and_detect

class HistoryController:
    def input_history_report():
        try:
            id = str(uuid4())
            ip = request.form.get('ip')
            nama = request.form.get('nama')
            lokasiRumah = request.form.get('lokasiRumah')
            # userId = request.token
            image = request.image_url

            cctv = Cctv.query.filter_by(id=ip).first()
            if not cctv:
                return jsonify({'msg': 'CCTV not found', 'code': 404}), 404

            userId = cctv.idUser
            lokasi = cctv.lokasi.namaLokasi

            post_history = Report(
                id=id,
                image=image,
                ip=ip,
                nama=nama,
                lokasi=lokasi,
                userId=userId
            )
            db.session.add(post_history)
            db.session.commit()

            response_data = {
                'id': post_history.id,
                'image': post_history.image,
                'ip': post_history.ip,
                'lokasi': post_history.lokasi,
                'nama': post_history.nama,
                'userId': post_history.userId,
                }
            return {'message': 'success', 'code': 200, 'data': response_data}
            # return jsonify({'message': 'success', 'code': 200})
        except Exception as e:
            print(e)
            return {'message': 'failed', 'code': 500, 'error': e}
    
    def get_historyReport():
        try:
            idUser = request.token
            get_history = Report.query.filter_by(userId=idUser).order_by(Report.createdAt.desc()).all()
            response_data = [report.to_dict() for report in get_history]
            return {'message': 'success', 'code': 200, 'data': response_data}
        except Exception as e:
            print(e)
            return {'message': 'failed', 'code': 400, 'error': e}

    def get_histry_report_detail(id):
        try:
            item = Report.query.filter_by(id=id).first()
            report = {
                "id": item.id,
                "image": item.image,
                "ip": item.cctv.ip,
                "nama": item.nama,
                "lokasi": item.lokasi,
                "user": item.user.username,
                "createdAt": item.createdAt
            }
            return {'message': 'success', 'code': 200, 'data': report}
        except Exception as e:
            print(e)
            return {'message': 'failed', 'code': 400, 'error': e}

    def delete_history_report(id):
        try:
            item = Report.query.filter_by(id=id, isDelete=False).first()
            if item:
                    item.soft_delete()
            return {'message': 'success', 'code': 200}
        except Exception as e:
            print(e)
            return {'message': 'failed', 'code': 400, 'error': e}

    