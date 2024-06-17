const { PrismaClient, Prisma } = require("@prisma/client");
const { STATUS_CODE } = require("../helpers/constant/http_status");
const { SUCCESS, ERROR } = require("../helpers/constant/http_message");
const prisma = new PrismaClient();
const uuid4 = require("uuid").v4;
const bcrypt = require("bcrypt");
const {
  PrismaClientKnownRequestError,
} = require("@prisma/client/runtime/library");
const saltRounds = 10;
const generateToken = require("../helpers/token");
const send = require("../helpers/sendEmail");
const crypto = require('crypto')

exports.signIn = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return MSG.sendResponse(
        res,
        STATUS_CODE.STATUS_BAD_REQUEST,
        ERROR.MISSING_ARGS
      );
    }
    const userData = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });
    const validPassword = await bcrypt.compare(password, userData.password);
    if (!userData || !validPassword) {
      return MSG.sendResponse(
        res,
        STATUS_CODE.STATUS_NOT_AUTHORIZED,
        ERROR.INVALID_EMAIL_PASS
      );
    }

    const token = generateToken(userData.email, userData.id);
    const response = { access_token: token, ...userData };

    return MSG.sendResponse(
      res,
      STATUS_CODE.STATUS_OK,
      SUCCESS.SUCCESS_LOGIN,
      response
    );
  } catch (error) {
    console.log(error);
    return MSG.sendResponse(
      res,
      STATUS_CODE.STATUS_BAD_REQUEST,
      error,
      req.body
    );
  }
};

exports.signUp = async (req, res) => {
  try {
    const { username, email, notelp } = req.body;
    const password = bcrypt.hashSync(req.body.password, saltRounds);
    const id = uuid4();
    const otp = await sendVerification({ email, username });
    // const users = await prisma.user.create({
    //   data: {
    //     id: id,
    //     username: username,
    //     email: email,
    //     password: password,
    //     otp: otp,
    //     notelp: notelp,
    //   },
    //   // isVerif
    // });
    const users = await prisma.user.create({
      data: {
        id: id,
        username,
        email,
        password: password,
        notelp,
        otp,
      }
    });
    return MSG.sendResponse(
      res,
      STATUS_CODE.STATUS_OK,
      SUCCESS.SUCCESS_REGISTER,
      users
    );
    // return MSG.sendResponse(
    //     res,
    //     STATUS_CODE.STATUS_OK,
    //     SUCCESS.SUCCESS_REGISTER,
    //     users
    // )
  } catch (error) {
    console.log(error);
    if (error instanceof PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
        return MSG.sendResponse(
          res,
          STATUS_CODE.STATUS_BAD_REQUEST,
          ERROR.EMAIL_EXIST,
          ""
        );
      }
      throw error;
    } else if (error instanceof Prisma.PrismaClientValidationError) {
      return MSG.sendResponse(
        res,
        STATUS_CODE.STATUS_BAD_REQUEST,
        ERROR.MISSING_ARGS,
        ""
      );
    } else {
      return MSG.sendResponse(
        res,
        STATUS_CODE.STATUS_BAD_REQUEST,
        ERROR.INTERNAL_SERVER,
        ""
      );
    }
  }
};

const generateOtp = () => {
  return crypto.randomInt(100000, 999999).toString();
};

sendVerification = async (data) => {
  try {
    console.log("sending email...");
    // const token = generateToken(data.email, data.id);
    const otp = generateOtp();
    const payload = {
      email: data.email,
      urlLink: otp,
      name: data.username,
      title: "Email Verification",
    };
    const template = "verifikasi";
    await send.sendMailRegister(template, payload);
    return otp
  } catch (error) {
    console.log("error sending email", error);
  }
};

exports.verify = async (req, res) => {
  const { email, otp } = req.body;

  try {
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      return MSG.sendResponse(
        res,
        STATUS_CODE.STATUS_NOT_FOUND,
        ERROR.MISSING_ARGS,
        ""
      );
    }

    if (user.otp !== otp || new Date() > user.otpExpiresAt) {
      return MSG.sendResponse(
        res,
        STATUS_CODE.STATUS_BAD_REQUEST,
        ERROR.MISSING_ARGS,
        ""
      );
    }

    const otpUpdate = await prisma.user.update({
      where: { email },
      data: {
        isVerif: true,
        otp: null,
      }
    });

    return MSG.sendResponse(
      res,
      STATUS_CODE.STATUS_OK,
      SUCCESS.SUCCESS_REGISTER,
      otpUpdate,
      "otp success"
    );
  } catch (error) {
    console.error("Verification error", error);
    return MSG.sendResponse(
      res,
      STATUS_CODE.STATUS_BAD_REQUEST,
      ERROR.INTERNAL_SERVER,
      ""
    );
  }
}

exports.resendOtp = async (req, res) => {
  try {
    const {email} = req.body
    
    const user = await prisma.user.findUnique({ where: { email } });

    if (user.isVerif === true) {
      return MSG.sendResponse(
        res,
        STATUS_CODE.STATUS_BAD_REQUEST,
        ERROR.INTERNAL_SERVER,
        "akun sudah terverifikasi"
      );
    }

    const otp = await sendVerification({ email });
    
    const otpUpdate = await prisma.user.update({
      where: {
        email: email
      },
      data: {
        otp: otp
      }
    })

    const responseView = {
      email: email,
      otp: otpUpdate.otp
    }
    return MSG.sendResponse(
      res,
      STATUS_CODE.STATUS_OK,
      SUCCESS.SUCCESS_REGISTER,
      responseView,
      "otp success"
    );
  } catch (error) {
    console.log(error);
    return MSG.sendResponse(
      res,
      STATUS_CODE.STATUS_BAD_REQUEST,
      ERROR.INTERNAL_SERVER,
      ""
    );
  }
}