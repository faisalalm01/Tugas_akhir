from flask import jsonify

def send_response(message, status_code, data):
    response = {
        'data': data,
        'status_code': status_code,
        'message': message,
    }
    return response