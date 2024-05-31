const { PrismaClient } = require("@prisma/client");
const { STATUS_CODE } = require("../helpers/constant/http_status");
const { ERROR, SUCCESS } = require("../helpers/constant/http_message");
const prisma = new PrismaClient();
const uuid4 = require("uuid").v4;

exports.inputIpCctvCamera = async (req, res) => {
  try {
    const id = uuid4();
    const idUser = req.token;
    const { ip, lokasiCamera } = req.body;
    const postCamera = await prisma.cctv.create({
      data: {
        id: id,
        ip: ip,
        idUser: idUser,
        lokasiCamera: lokasiCamera,
      }
    });
    return MSG.sendResponse(
      res,
      STATUS_CODE.STATUS_OK,
      SUCCESS.SUCCESS_GET_EXAMPLE_BYID,
      postCamera
    );
  } catch (error) {
    console.log(error)
    return MSG.sendResponse(
      res,
      STATUS_CODE.STATUS_NOT_FOUND,
      ERROR.ERROR_EXAMPLE,
      ""
    );
  }
};

exports.getIpCctvCamera = async (req, res) => {
  try {
    const idUser = req.token;
    const getCameraCctv = await prisma.cctv.findMany({
      where: {
        idUser: idUser
      },
      include: {
        user: {}
      }
    });
    console.log(idUser);
    return MSG.sendResponse(
      res,
      STATUS_CODE.STATUS_OK,
      SUCCESS.SUCCESS_GET_EXAMPLE_BYID,
      getCameraCctv
    );
  } catch (error) {
    console.log(error);
    return MSG.sendResponse(
      res,
      STATUS_CODE.STATUS_NOT_FOUND,
      ERROR.ERROR_EXAMPLE,
      "ererer"
    );
  }
};

exports.getIpCctvCameraById = async (req, res) => {
  try {
    const id = req.params.id;
    const getCameraId = await prisma.cctv.findUnique({
      where: {
        id: id,
      },
    });
    return MSG.sendResponse(
      res,
      STATUS_CODE.STATUS_OK,
      SUCCESS.SUCCESS_GET_EXAMPLE_BYID,
      getCameraId
    );
  } catch (error) {
    return MSG.sendResponse(
      res,
      STATUS_CODE.STATUS_NOT_FOUND,
      ERROR.ERROR_EXAMPLE,
      ""
    );
  }
};

exports.deleteIpCctvCamera = async (req, res) => {
  try {
    const id = req.params.id;
    const deleteCamera = await prisma.cctv.delete({
      where: {
        id: id,
      },
    });
    return MSG.sendResponse(
      res,
      STATUS_CODE.STATUS_OK,
      SUCCESS.SUCCESS_GET_EXAMPLE_BYID,
      deleteCamera
    );
  } catch (error) {
    return MSG.sendResponse(
      res,
      STATUS_CODE.STATUS_NOT_FOUND,
      ERROR.ERROR_EXAMPLE,
      ""
    );
  }
};
