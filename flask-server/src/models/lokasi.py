# from . import db
# from datetime import datetime

# class Lokasi(db.Model):
#     id = db.Column(db.String, primary_key=True, unique=True)
#     namaLokasi = db.Column(db.String, unique=True, nullable=False)
#     cctv = db.relationship('Cctv', backref='lokasi', lazy=True)
#     createdAt = db.Column(db.DateTime, default=datetime.utcnow)
#     updatedAt = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
from . import db

class Lokasi(db.Model):
    id = db.Column(db.String, primary_key=True, unique=True)
    namaLokasi = db.Column(db.String, unique=True, nullable=False)
    createdAt = db.Column(db.DateTime, default=db.func.now())
    updatedAt = db.Column(db.DateTime, default=db.func.now(), onupdate=db.func.now())
    cctvs = db.relationship('Cctv', back_populates='lokasi')

def to_dict(self):
        return {
            'id': self.id,
            'namaLokasi': self.namaLokasi,
            'createdAt': self.createdAt,
            'updatedAt': self.updatedAt,
        }