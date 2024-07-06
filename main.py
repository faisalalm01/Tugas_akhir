import os
import jwt
import requests
from flask import Flask, Blueprint, request, jsonify, Response
from flask_cors import  CORS
from flask_restx import Resource, Api, reqparse
from flask_sqlalchemy import SQLAlchemy
from flask_mail import Mail, Message
import numpy as np
import cv2
# from ultralytics import YOLO
from werkzeug.security import generate_password_hash, check_password_hash
from datetime import datetime, timedelta
from middleware.token import generateOTP
import pymysql

app = Flask(__name__)
CORS(app)
app.config.SWAGGER_UI_OAUTH_APP_NAME = 'CRIME DETECTION'
api = Api(app, title=app.config.SWAGGER_UI_OAUTH_APP_NAME)

pymysql.install_as_MySQLdb()

############################
##### BEGIN: Database #####
##########################
SECRET_KEY= os.getenv('SECRET_KEY')
app.config["SQLALCHEMY_DATABASE_URI"] = "mysql://root:@127.0.0.1:3307/otsutsuki"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"]= False
app.config["SQLALCHEMY_ECHO"] = True
app.config["MAIL_SERVER"] = os.getenv('MAIL_SERVER')
app.config["MAIL_PORT"] = os.getenv('MAIL_PORT')
app.config["MAIL_USERNAME"] = os.getenv('MAIL_USERNAME')
app.config["MAIL_PASSWORD"] = os.getenv('MAIL_PASSWORD')
app.config["MAIL_USE_TLS"] = os.getenv('MAIL_USE_TLS')

mail = Mail(app)

db = SQLAlchemy(app)

# api_blueprint = Blueprint('api', api)

class User(db.Model):
    id = db.Column(db.String, primary_key=True, unique=True)
    image = db.Column(db.String)
    username = db.Column(db.String, nullable=False)
    email = db.Column(db.String, unique=True, nullable=False)
    password = db.Column(db.String, nullable=False)
    notelp = db.Column(db.String)
    isVerif = db.Column(db.Boolean, default=False)
    otp = db.Column(db.String)
    createdAt = db.Column(db.DateTime, default=db.func.now())
    updatedAt = db.Column(db.DateTime, default=db.func.now(), onupdate=db.func.now())

class Cctv(db.Model):
    id = db.Column(db.String, primary_key=True, unique=True)
    idUser = db.Column(db.String, db.ForeignKey('user.id'))
    image = db.Column(db.String)
    passwordUser = db.Column(db.String)
    userIp = db.Column(db.String)
    ip = db.Column(db.String, unique=True, nullable=False)
    port = db.Column(db.String)
    path = db.Column(db.String)
    lokasiCamera = db.Column(db.String, db.ForeignKey('lokasi.nama_lokasi'))
    isDelete = db.Column(db.Boolean, default=False)
    createdAt = db.Column(db.DateTime, default=db.func.now())
    updatedAt = db.Column(db.DateTime, default=db.func.now(), onupdate=db.func.now())
    
class Lokasi(db.Model):
    id = db.Column(db.String, primary_key=True, unique=True)
    namaLokasi = db.Column(db.String, unique=True, nullable=False)
    createdAt = db.Column(db.DateTime, default=db.func.now())
    updatedAt = db.Column(db.DateTime, default=db.func.now(), onupdate=db.func.now())

class Report(db.Model):
    id = db.Column(db.String, primary_key=True, unique=True)
    image = db.Column(db.String)
    ip = db.Column(db.String, db.ForeignKey('cctv.id'))
    nama = db.Column(db.String)
    lokasi = db.Column(db.String)
    lokasiRumah = db.Column(db.String)
    userId = db.Column(db.String, db.ForeignKey('user.id'))
    createdAt = db.Column(db.DateTime, default=db.func.now())
    updatedAt = db.Column(db.DateTime, default=db.func.now(), onupdate=db.func.now())

parser4Reg = reqparse.RequestParser()
parser4Reg.add_argument('email', type=str, help='Email', location='form', required=True)
parser4Reg.add_argument('name', type=str, help='Name', location='form', required=True)
parser4Reg.add_argument('password', type=str, help='Password', location='form', required=True)
parser4Reg.add_argument('notelp', type=str, help='Notelp', location='form', required=True)

parser4LogIn = reqparse.RequestParser()
parser4LogIn.add_argument('email', type=str, help='Email', location='form', required=True)
parser4LogIn.add_argument('password', type=str, help='Password', location='form', required=True)

parser4Otp = reqparse.RequestParser()
parser4Otp.add_argument('email', type=str, help='Email', location='form', required=True)
parser4Otp.add_argument('otp', type=str, help='Otp', location='form', required=True)

parser4ReOtp = reqparse.RequestParser()
parser4ReOtp.add_argument('email', type=str, help='Email', location='form', required=True)

@api.route('/api/sign-in')
class Login(Resource):
    @api.expect(parser4LogIn)
    def post(self):
        args = parser4LogIn.parse_args()
        email = args['email']
        password = args['password']

        if not email or not password:
           return jsonify({'message': 'Missing email or password'}), 400
        
        user = db.session.execute(db.select(User).filter_by(email=email)).first()

        if not user:
            return {
                'message': 'The email or password is wrong!'
            }, 400
        else:
            user = user[0]
        
        if check_password_hash(user.password, password):
            payload = {
                'id': user.id,
                'email': user.email,
                'exp': datetime.utcnow() + timedelta(hours=2)
            }
            token = jwt.encode(payload, SECRET_KEY)
            return {
                'message': 'Login Successful!',
                'token': token,
                'username': user.username,
            }, 200
        else:
            return {
                'message': 'Wrong email or password!'
            }, 400
    
if __name__ == '__main__':  
    port = int(os.getenv('PORT', 3000))
    app.run(host='0.0.0.0', port=port, debug=True)
