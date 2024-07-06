# from . import db
# from datetime import datetime

# class User(db.Model):
#     id = db.Column(db.String, primary_key=True, unique=True)
#     image = db.Column(db.String, nullable=True)
#     username = db.Column(db.String, nullable=False)
#     email = db.Column(db.String, unique=True, nullable=False)
#     password = db.Column(db.String, nullable=False)
#     notelp = db.Column(db.String, nullable=False)
#     isVerif = db.Column(db.Boolean, default=False)
#     otp = db.Column(db.String, nullable=True)
#     reportUser = db.relationship('Report', backref='user', lazy=True)
#     cctv = db.relationship('Cctv', backref='user', lazy=True)
#     createdAt = db.Column(db.DateTime, default=datetime.utcnow)
#     updatedAt = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

from . import db
from flask_bcrypt import Bcrypt

bcrypt = Bcrypt()

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

    def check_password(self, password):
        return bcrypt.check_password_hash(self.password, password)

    def to_dict(self):
        return {
            "id": self.id,
            "username": self.username,
            "email": self.email,
            "notelp": self.notelp,
            "isVerif": self.isVerif,
            "otp": self.otp,
        }
