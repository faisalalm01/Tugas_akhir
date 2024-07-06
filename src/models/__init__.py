from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

from .user import User
from .cctv import Cctv
from .report import Report
from .lokasi import Lokasi

def init_relationships():
    # Define the relationships here after all models are imported
    User.reports = db.relationship('Report', back_populates='user')
    User.cctvs = db.relationship('Cctv', back_populates='user')

    Cctv.reports = db.relationship('Report', back_populates='cctv')
    Cctv.lokasi = db.relationship('Lokasi', back_populates='cctvs')

    Report.cctv = db.relationship('Cctv', back_populates='reports')
    Report.user = db.relationship('User', back_populates='reports')

    Lokasi.cctvs = db.relationship('Cctv', back_populates='lokasi')

def init_db(app):
    db.init_app(app)
    with app.app_context():
        db.create_all()
