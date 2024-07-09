from flask import Blueprint, request, jsonify, render_template
from uuid import uuid4
from src.models import db
from src.models import Report, Cctv
from threading import Thread
from src.helpers.middleware.load_model_middleware import capture_and_detect

class HistoryController:
    def input_history_report():
        try:
            # id = str(uuid4())
            # ip = request.form.get('ip')
            # nama = request.form.get('nama')
            # lokasiRumah = request.form.get('lokasiRumah')
            # userId = request.token
            # image = request.image_url

            # cctv = Cctv.query.filter_by(id=ip).first()
            # if not cctv:
            #     return jsonify({'msg': 'CCTV not found', 'code': 404}), 404

            # lokasi = cctv.lokasi.namaLokasi

            # post_history = Report(
            #     id=id,
            #     image=image,
            #     ip=ip,
            #     nama=nama,
            #     lokasiRumah=lokasiRumah,
            #     lokasi=lokasi,
            #     userId=userId
            # )
            # db.session.add(post_history)
            # db.session.commit()

            # response_data = {
            #     'id': post_history.id,
            #     'image': post_history.image,
            #     'ip': post_history.ip,
            #     'lokasi': post_history.lokasi,
            #     'nama': post_history.nama,
            #     'lokasiRumah': post_history.lokasiRumah,
            #     'userId': post_history.userId,
            #     }
            idUser = request.token
            get_camera_cctv = Cctv.query.filter_by(idUser=idUser, isDelete=False).all()
            for cctv in get_camera_cctv:
            # Mulai proses capture dan deteksi dalam thread terpisah
                Thread(target=capture_and_detect, args=(cctv, idUser), daemon=True).start()
            # return {'message': 'success', 'code': 200, 'data': response_data}
            return jsonify({'message': 'success', 'code': 200})
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
                "lokasiRumah": item.lokasiRumah,
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

    def view_cctvs():
        try:
            # idUser = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImZhaXNhbGFsbTgyQGdtYWlsLmNvbSIsImlkIjoiNWQ0ZjhiZWUtY2FlOC00NTQ2LWJmZGItYWNhNzhmNjQ1MGZhIiwiZXhwIjoxNzIwNTM2MjYzfQ.NhGIcszyMbmSrxdtv5eedM3GW8CHsPCvOxw3ebcEoi8'
            cctvs = Cctv.query.filter_by(isDelete=False).all()
            cctv_list = [
                {
                    'ip': cctv.ip,
                    'image': cctv.image,
                    'lokasiCamera': cctv.lokasiCamera,
                    'stream_url': f"rtsp://{cctv.userIp}:{cctv.passwordUser}@{cctv.ip}:{cctv.port}/{cctv.path}"
                }
            for cctv in cctvs]
            return render_template('cctv_view.html', cctvs=cctv_list)
        except Exception as e:
            print(e)
            return {'message': 'failed', 'code': 500, 'error': str(e)}

    
    def start_detection():
        try:
            idUser = request.token
            cctvs = Cctv.query.filter_by(idUser=idUser, isDelete=False).all()
            for cctv in cctvs:
                detection_thread = Thread(target=capture_and_detect, args=(cctv,))
                detection_thread.start()
            return jsonify({'message': 'Detection started for all CCTV cameras.'}), 200
        except Exception as e:
            print(e)
            return jsonify({'message': 'Failed to start detection.', 'error': str(e)}), 500
