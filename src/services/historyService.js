const { PrismaClient } = require("@prisma/client");
const { ERROR, SUCCESS } = require("../helpers/constant/http_message");
const { STATUS_CODE } = require("../helpers/constant/http_status");
const prisma = new PrismaClient();
const uuid4 = require("uuid").v4;

exports.inputReport = async (req, res) => {
  try {
    const id = uuid4();
    const { ip, nama, lokasiRumah } = req.body;
    const userId = req.token;
    const image = req.Image.url;
    const cctv = await prisma.cctv.findUnique({
      where: { id: ip },
      include: { lokasi: true },
    });

    if (!cctv) {
      return res.status(404).json({ error: "CCTV not found" });
    }

    const lokasi = cctv.lokasi.namaLokasi;

    const newData = await prisma.report.create({
      data: {
        id: id,
        image: image,
        ip: ip,
        nama: nama,
        lokasiRumah: lokasiRumah,
        lokasi: lokasi,
        userId: userId,
      },
    });

    return MSG.sendResponse(
      res,
      STATUS_CODE.STATUS_OK,
      SUCCESS.SUCCESS_GET_EXAMPLE_BYID,
      newData
    );
  } catch (error) {
    console.log(error);
    return MSG.sendResponse(
      res,
      STATUS_CODE.STATUS_NOT_FOUND,
      ERROR.ERROR_EXAMPLE,
      ""
    );
  }
};

exports.getReport = async (req, res) => {
  try {
    // const getLokasiCamera = await prisma.cctv.findUnique({
    //   where: {
    //     ip: ipCamera
    //   },
    //   include: {
    //     lokasi: {}
    //   }
    // })
    // console.log(getLokasiCamera);
    const idUser = req.token;
    const { lokasi, page = 1, limit = 7 } = req.query;
    const dataReportAll = await prisma.report.findMany({
      // include: {
      //   cctv: {
      //     include: {
      //       lokasi: true,
      //     },
      //   },
      // },
      where: {
        userId: idUser,
        ...(lokasi && {
          lokasi: {
            contains: lokasi,
          }
        }),
      },
      skip: (page - 1) * limit,
      take: parseInt(limit),
    });
    return MSG.sendResponse(
      res,
      STATUS_CODE.STATUS_OK,
      SUCCESS.SUCCESS_GET_EXAMPLE_BYID,
      dataReportAll
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

exports.getReportById = async (req, res) => {
  try {
    const id = req.params.id;
    const dataReport = await prisma.report.findUnique({
      where: {
        id: id,
      },
      include: {
        cctv: true,
      },
    });
    return MSG.sendResponse(
      res,
      STATUS_CODE.STATUS_OK,
      SUCCESS.SUCCESS_GET_EXAMPLE_BYID,
      dataReport
    );
  } catch (error) {
    console.log(error);
    return MSG.sendResponse(
      res,
      STATUS_CODE.STATUS_NOT_FOUND,
      ERROR.ERROR_EXAMPLE,
      "disini"
    );
  }
};
