from flask import Flask, jsonify, request
from flask_cors import CORS
from flask_migrate import Migrate
import logging
import os
from dotenv import load_dotenv
from flask_restx import Api, Resource
from src.helpers.constant.http_status import STATUS_CODE
from werkzeug.exceptions import HTTPException, NotFound
from config import Config
from src.models import db, init_db
from flask_mail import Mail
from flask_jwt_extended import JWTManager
import pymysql

app = Flask(__name__)
CORS(app)

load_dotenv()

pymysql.install_as_MySQLdb()
app.config.from_object(Config)

logging.basicConfig(level=logging.DEBUG)

# Initialize the database
init_db(app)
migrate = Migrate(app, db)
mail = Mail(app)
jwt = JWTManager(app)

@app.route('/')
def home():
    return jsonify(message='Great, Server it Work! 🐻')

# Register the blueprint for API routes
from src.routes.api_routes import api_blueprint
app.register_blueprint(api_blueprint, url_prefix='/api')

# Error handling for 404 errors
# @app.errorhandler(Exception)
# def handle_exception(e):
#     if isinstance(e, HTTPException):  # type: ignore
#         response = e.get_response()
#         response.data = jsonify({
#             "status_code": STATUS_CODE['INTERNAL_SERVER_ERROR'],  # Sesuaikan dengan kunci yang benar
#             "message": e.description,
#         }).data
#         response.content_type = "application/json"
#         return response
#     else:
#         return jsonify({
#             "status_code": STATUS_CODE['INTERNAL_SERVER_ERROR'],  # Sesuaikan dengan kunci yang benar
#             "message": str(e)
#         }), STATUS_CODE['INTERNAL_SERVER_ERROR']


# @app.errorhandler(NotFound)
# def handle_404(e):
#     return jsonify({
#         "status_code": STATUS_CODE['STATUS_NOT_FOUND'],
#         "message": "Resource not found"
#     }), STATUS_CODE['STATUS_NOT_FOUND']

if __name__ == '__main__':  
    port = int(os.getenv('PORT', 3000))
    app.run(host='0.0.0.0', port=port, debug=True)
