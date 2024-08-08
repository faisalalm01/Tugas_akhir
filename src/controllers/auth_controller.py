from flask import request, jsonify
from sqlalchemy.exc import IntegrityError
import bcrypt
from uuid import uuid4
from src.models import db, User
from src.helpers.send_mail import send_verification_email
from src.helpers.token import generate_token

class AuthController:
    @staticmethod
    def sign_in():
        if request.is_json:
            data = request.get_json()
            email = data.get('email')
            password = data.get('password')
        else:
            email = request.form.get('email')
            password = request.form.get('password')


        if not email or not password:
            return jsonify({'message': 'Missing email or password', 'code': 400}), 400

        user = User.query.filter_by(email=email).first()

        if not user or not bcrypt.checkpw(password.encode('utf-8'), user.password.encode('utf-8')):
            return jsonify({'message': 'Invalid email or password', 'code': 401}), 401

        token = generate_token(user.email, user.id)
        response = {'access_token': token, 'user': user.username}

        return jsonify({'message': 'Login successful', 'code': 200, 'data': response}), 200

    @staticmethod
    def sign_up():
        # data = request.get_json()
        # username = data.get('username')
        # email = data.get('email')
        # notelp = data.get('notelp')
        # password = bcrypt.hashpw(data.get('password').encode('utf-8'), bcrypt.gensalt()).decode('utf-8')
        # id = str(uuid4())
        # otp = send_verification_email(email, username)
        if request.is_json:
            data = request.get_json()
            username = data.get('username')
            email = data.get('email')
            notelp = data.get('notelp')
            password = data.get('password')
        else:
            username = request.form.get('username')
            email = request.form.get('email')
            notelp = request.form.get('notelp')
            password = request.form.get('password')
        id = str(uuid4())

        if not username or not email or not notelp or not password:
            return jsonify({'message': 'All fields are required', 'code': 400}), 400
        
        hashed_password = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')
        otp = send_verification_email(email, username)

        try:
            user = User(id=id, username=username, email=email, password=hashed_password, notelp=notelp, otp=otp)
            db.session.add(user)
            db.session.commit()
            return {'message': 'User registered successfully', "code": 200, 'data': user.email}
        except IntegrityError as u:
            db.session.rollback()
            return jsonify({'message': 'Email already exists', "code": 401, 'error': u}), 401
        except Exception as e:
            return jsonify({'message': 'Internal server error', "code": 500, 'error': str(e)})

    def verify():
        if request.is_json:
            data = request.get_json()
            email = data.get('email')
            otp = data.get('otp')
        else:
            email = request.form.get('email')
            otp = request.form.get('otp')
        try:
            user = User.query.filter_by(email=email).first()
            print(user)
            if not user:
                return jsonify({'message': 'User not found', 'code': 404}), 404

            if user.otp != otp:
                return jsonify({'message': 'Invalid OTP', 'code': 400}), 400

            user.isVerif = True
            user.otp = None
            db.session.commit()
            return jsonify({'message': 'User verified successfully', 'code': 200, 'data': user.username}), 200
        
        except Exception as e:

            return jsonify({'message': 'Internal server error', "code": 500, 'error': str(e)})

    @staticmethod
    def resend_otp():
        # data = request.get_json()
        # email = data.get('email')
        if request.is_json:
            data = request.get_json()
            email = data.get('email')
        else:
            email = request.form.get('email')

        user = User.query.filter_by(email=email).first()

        if user.isVerif:
            return jsonify({'message': 'User already verified', 'code': 400}), 400

        otp = send_verification_email(email, user.username)
        user.otp = otp
        db.session.commit()

        return jsonify({'message': 'OTP resent successfully', 'code': 200, 'data': {'email': email, 'otp': otp}}), 200
