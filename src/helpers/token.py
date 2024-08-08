import jwt
import datetime
from config import Config

def generate_token(email, user_id):
    token = jwt.encode({
        'email': email, 
        'id': user_id, 
        # 'exp': datetime.datetime.utcnow() + datetime.timedelta(hours=1)}, 
        },
        Config.SECRET_KEY)
    return token
