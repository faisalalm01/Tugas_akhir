const { PrismaClient } = require("@prisma/client");
const { ERROR, SUCCESS } = require("../helpers/constant/http_message");
const { STATUS_CODE } = require("../helpers/constant/http_status");
const prisma = new PrismaClient();
const uuid4 = require("uuid").v4;

exports.inputReport = async (req, res) => {
  try {
  } catch (error) {}
};

exports.getReport = async (req, res) => {
  try {
    const dataReportAll = await prisma.report.findMany();
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
