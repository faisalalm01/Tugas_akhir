from flask_mail import Message
from flask import current_app, render_template
import random

def send_verification_email(email, username):
    otp = str(random.randint(100000, 999999))
    try:
        mail = current_app.extensions.get('mail')
        msg = Message(subject="Email Verification",
                      sender=current_app.config['MAIL_USERNAME'],
                      recipients=[email])
        # msg.html = render_template('emailverif.html', otp=otp, username=username)
        msg.html = f'<div style="text-align: center;"><h1>Kode Otp:</h1><b style="font-size: 24px">{otp}</b></div>'
        # msg.body = f'{otp}'
        mail.send(msg)
    except Exception as e:
        print(f'Error sending email: {e}')
    return otp
