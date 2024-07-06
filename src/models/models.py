from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

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
    lokasiCamera = db.Column(db.String, db.ForeignKey('lokasi.namaLokasi'))
    isDelete = db.Column(db.Boolean, default=False)
    createdAt = db.Column(db.DateTime, default=db.func.now())
    updatedAt = db.Column(db.DateTime, default=db.func.now(), onupdate=db.func.now())

    user = db.relationship('User', backref=db.backref('cctvs', lazy=True))

    def to_dict(self):
        return {
            'id': self.id,
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


def init_relationships():
    # Define the relationships here after all models are imported
    User.reports = db.relationship('Report', back_populates='user')
    User.cctvs = db.relationship('Cctv', back_populates='user')

    Cctv.reports = db.relationship('Report', back_populates='cctv')
    Cctv.lokasi = db.relationship('Lokasi', back_populates='cctvs')

    Report.cctv = db.relationship('Cctv', back_populates='reports')
    Report.user = db.relationship('User', back_populates='reports')

    Lokasi.cctvs = db.relationship('Cctv', back_populates='lokasi')