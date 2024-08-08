from flask import Blueprint, jsonify, Flask
# from flask_restful import Api
from src.controllers.cctv_controller import CctvController
from src.controllers.auth_controller import AuthController
from src.controllers.history_controller import HistoryController
from src.controllers.user_controller import UserController
from src.controllers.lokasi_contreoller import LokasiController
from src.controllers.xample_controller import XampleController
from src.helpers.middleware.auth_middleware import check_token
# from src.helpers.middleware.multer_middleware import upload_middleware
from src.helpers.middleware.upload_cloudinary import upload_cloudinary

app = Flask(__name__)

api_blueprint = Blueprint('api', __name__)
# api = Api(app, title="CRIME DETECT")

@api_blueprint.route('/', methods=['GET'])
def home():
    return jsonify(message='Ok api is working 🚀')


api_blueprint.route('/login', methods=['POST'])(AuthController.sign_in)
api_blueprint.route('/register', methods=['POST'])(AuthController.sign_up)
api_blueprint.add_url_rule('verify', 'post_verify', AuthController.verify, methods=['POST'])
api_blueprint.route('/resend-otp', methods=['POST'])(AuthController.resend_otp)

api_blueprint.route('/user/detail', methods=['GET'])(check_token(UserController.get_detail_user))
api_blueprint.add_url_rule('/user/update', 'update_user', check_token(upload_cloudinary(UserController.update_user_detail)), methods=['PUT'])

api_blueprint.route('/cctv', methods=['GET'])(check_token(CctvController.get_ip_cctv_camera))
api_blueprint.add_url_rule('/cctv', 'post_cctv', check_token(upload_cloudinary(CctvController.input_ip_cctv_camera)), methods=['POST'])
api_blueprint.route('/cctv/<string:id>', methods=['GET'])(check_token(CctvController.get_ip_cctv_camera_by_id))
api_blueprint.route('/cctv/<string:id>', methods=['DELETE'])(check_token(CctvController.delete_ip_cctv_camera))

api_blueprint.route('/history', methods=['GET'])(check_token(HistoryController.get_historyReport))
api_blueprint.route('/history/detail/<string:id>', methods=['GET'])(check_token(HistoryController.get_histry_report_detail))
api_blueprint.route('/history', methods=['POST'])(upload_cloudinary(HistoryController.input_history_report))
api_blueprint.route('/history/<string:id>', methods=['DELETE'])(check_token(HistoryController.delete_history_report))

api_blueprint.route('/lokasi', methods=['GET'])(LokasiController.get_Lokasi)
api_blueprint.route('/lokasi', methods=['POST'])(LokasiController.input_lokasi)


# trash
# api_blueprint.add_url_rule('/start_detection', 'post_history', check_token(upload_cloudinary(XampleController.start_detection)), methods=['POST'])
api_blueprint.route('/cctv_view')(XampleController.index)
api_blueprint.add_url_rule('/cctv_all', 'get_cctv', XampleController.get_all_cctv, methods=['GET'])
api_blueprint.add_url_rule('/video_feed/<id>', 'video_feed', XampleController.video_feed, methods=['GET'])
api_blueprint.add_url_rule('/register-device', 'register-device', XampleController.register_device, methods=['GET'])
api_blueprint.add_url_rule('/get_user', 'get_user', XampleController.get_all_users, methods=['GET'])