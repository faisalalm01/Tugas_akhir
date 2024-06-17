const { PrismaClient } = require("@prisma/client");
const { STATUS_CODE } = require("../helpers/constant/http_status");
const { SUCCESS, ERROR } = require("../helpers/constant/http_message");
const prisma = new PrismaClient();
// const uuid4 = require('uuid').v4;

exports.getUserDataById = async (req, res) => {
  try {
    const id = req.token;
    const userData = await prisma.user.findUnique({
      where: {
        id: id,
      },
    });
    const newUserData = {
      id: userData.id,
      image: userData.image,
      username: userData.username,
      email: userData.email,
      notelp: userData.notelp,
      isVerif: userData.isVerif,
      createdAt: userData.createdAt,
      updatedAt: userData.updatedAt,
    };
    return MSG.sendResponse(
      res,
      STATUS_CODE.STATUS_OK,
      SUCCESS.SUCCESS_GET_EXAMPLE_BYID,
      newUserData
    );
  } catch (error) {
    return MSG.sendResponse(
      res,
      STATUS_CODE.STATUS_NOT_FOUND,
      ERROR.ERROR_EXAMPLE,
      error
    );
  }
};

exports.updateUserDetail = async (req, res) => {
  try {
    const id = req.token;
    const { username, notelp } = req.body;
    const image = req.Image.url;
    const userData = await prisma.user.update({
      where: {
        id: id,
      },
      data: {
        image: image,
        username: username,
        notelp: notelp
      }
    });


    const newUserDetail = {
      image: userData.image,
      username: userData.username,
      notelp: userData.notelp,
    };
    return MSG.sendResponse(
      res,
      STATUS_CODE.STATUS_OK,
      SUCCESS.SUCCESS_EXAMPLE,
      newUserDetail
    );
  } catch (error) {
    console.log(error);
    return MSG.sendResponse(
      res,
      STATUS_CODE.STATUS_BAD_REQUEST,
      ERROR.ERROR_EXAMPLE,
      "asdasdasd"
    );
  }
};
