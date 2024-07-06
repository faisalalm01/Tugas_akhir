# from . import db
# from datetime import datetime

# class Report(db.Model):
#     id = db.Column(db.String, primary_key=True, unique=True)
#     image = db.Column(db.String, nullable=False)
#     ip = db.Column(db.String, db.ForeignKey('cctv.id'), nullable=False)
#     nama = db.Column(db.String, nullable=False)
#     lokasi = db.Column(db.String, nullable=False)
#     lokasiRumah = db.Column(db.String, nullable=False)
#     userId = db.Column(db.String, db.ForeignKey('user.id'), nullable=False)
#     createdAt = db.Column(db.DateTime, default=datetime.utcnow)
#     updatedAt = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

from . import db

class Report(db.Model):
    id = db.Column(db.String, primary_key=True, unique=True)
    image = db.Column(db.String)
    ip = db.Column(db.String, db.ForeignKey('cctv.id'))
    nama = db.Column(db.String)
    lokasi = db.Column(db.String)
    lokasiRumah = db.Column(db.String)
    userId = db.Column(db.String, db.ForeignKey('user.id'))
    isDelete = db.Column(db.Boolean, default=False)
    createdAt = db.Column(db.DateTime, default=db.func.now())
    updatedAt = db.Column(db.DateTime, default=db.func.now(), onupdate=db.func.now())

    cctv = db.relationship('Cctv', backref='reports', lazy=True)
    user = db.relationship('User', backref='reports', lazy=True)

    def to_dict(self):
            return {
                'id': self.id,
                'image': self.image,
                'ip': self.cctv.ip if self.cctv else None,
                'nama': self.nama,
                'lokasi': self.lokasi,
                'lokasiRumah': self.lokasiRumah,
                'userId': self.userId,
                'createdAt': self.createdAt,
                'updatedAt': self.updatedAt
            }
    
    def soft_delete(self):
        self.isDelete = True
        db.session.commit()