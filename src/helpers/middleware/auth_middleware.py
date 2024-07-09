from functools import wraps
from flask import request, jsonify
import jwt
from config import Config

# def check_token(f):
#     bearer = request.headers('Authorization')
#     if not bearer:
#         return jsonify({
#             "status": "fail",
#             "message": "Unauthorized access, missing token",
#             "error": "eror di header bearer"
#         }), 401
#     try:
#         token = bearer.split(" ")[1]
#         decoded_token = decode_token(token, current_app.config['JWT_SECRET_KEY'])
#         request.token = decoded_token.get('id')
#     except Exception as e:
#         return jsonify({
#             "status": "fail",
#             "message": "Unauthorized access, invalid token",
#             "error": f"eror di token {e}"
#         }), 401
from functools import wraps

import jwt

def check_token(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        bearer = request.headers.get('Authorization', None)
        if not bearer:
            return jsonify({
                "status": "fail",
                "message": "Unauthorized access, missing token",
                "error": "eror di header bearer"
            }), 401
        
        try:
            token = bearer.split(" ")[1]
            decoded_token = jwt.decode(token,
                               Config.SECRET_KEY,
                               algorithms=['HS256'],
                               )
            request.token = decoded_token.get('id')  
        except jwt.ExpiredSignatureError:
            return jsonify({
                "status": "fail",
                "message": "Unauthorized access, token expired",
                "error": "eror di token, token expired"
            }), 401
        except jwt.InvalidTokenError as e:
            return jsonify({
                "status": "fail",
                "message": "Unauthorized access, invalid token",
                "error": f"eror di token {e}"
            }), 401
        return f(*args, **kwargs)
    return decorated_function

from flask_jwt_extended import create_access_token

def generate_token(guid):
    return create_access_token(identity=guid)
