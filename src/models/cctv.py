# from . import db
# from datetime import datetime

# class Cctv(db.Model):
#     id = db.Column(db.String, primary_key=True, unique=True)
#     idUser = db.Column(db.String, db.ForeignKey('user.id'), nullable=False)
#     image = db.Column(db.String, nullable=True)
#     passwordUser = db.Column(db.String, nullable=True)
#     userIp = db.Column(db.String, nullable=True)
#     ip = db.Column(db.String, unique=True, nullable=False)
#     port = db.Column(db.String, nullable=True)
#     path = db.Column(db.String, nullable=True)
#     lokasiCamera = db.Column(db.String, db.ForeignKey('lokasi.namaLokasi'), nullable=False)
#     isDelete = db.Column(db.Boolean, default=False)
#     report = db.relationship('Report', backref='cctv', lazy=True)
#     createdAt = db.Column(db.DateTime, default=datetime.utcnow)
#     updatedAt = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

from . import db

class Cctv(db.Model):
    id = db.Column(db.String, primary_key=True, unique=True)
    protocol = db.Column(db.String)
    idUser = db.Column(db.String, db.ForeignKey('user.id'))
    image = db.Column(db.String)
    passwordUser = db.Column(db.String)
    userIp = db.Column(db.String)
    ip = db.Column(db.String, nullable=False)
    port = db.Column(db.String)
    path = db.Column(db.String)
    lokasiCamera = db.Column(db.String, db.ForeignKey('lokasi.namaLokasi'))
    isDelete = db.Column(db.Boolean, default=False)
    createdAt = db.Column(db.DateTime, default=db.func.now())
    updatedAt = db.Column(db.DateTime, default=db.func.now(), onupdate=db.func.now())

    lokasi = db.relationship('Lokasi', back_populates='cctvs')

    def to_dict(self):
        return {
            'id': self.id,
            'protocol': self.protocol,
            'userIp': self.userIp,
            'passwordUser': self.passwordUser,
            'ip': self.ip,
            'path': self.path,
            'idUser': self.idUser,
            'port': self.port,
            'lokasiCamera': self.lokasiCamera,
            'image': self.image,
            'isDelete': self.isDelete
        }
    
    def soft_delete(self):
        self.isDelete = True
        db.session.commit()