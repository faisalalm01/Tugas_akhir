from flask import Flask, jsonify, request
from flask_cors import CORS
from flask_migrate import Migrate
import logging
import os
from dotenv import load_dotenv
# from flask_restx import Api, Resource
# from src.helpers.constant.http_status import STATUS_CODE
# from werkzeug.exceptions import HTTPException, NotFound
from config import Config
from src.models import db, init_db
from flask_mail import Mail
from flask_jwt_extended import JWTManager
from src.helpers.middleware.load_model_middleware import Detection
import pymysql
import threading
from flask_socketio import SocketIO, emit

app = Flask(__name__)
# socketio = SocketIO(app, cors_allowed_origins="*")
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

if __name__ == '__main__':  
    port = int(os.getenv('PORT', 3000))
    detection_thread = threading.Thread(target=Detection.run_detection)
    detection_thread.start()
    app.run(host='0.0.0.0', port=port, debug=True)
