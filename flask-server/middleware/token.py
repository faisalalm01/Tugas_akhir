import random

def generateOTP(otp_size=6):
    final_otp = ''
    for i in range(otp_size):
        final_otp = final_otp + str(random.randint(0, 9))
    return final_otp