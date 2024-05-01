const {PrismaClient} = require('@prisma/client');
const prisma = new PrismaClient();
const uuid4 = require('uuid').v4;
const { STATUS_CODE } = require('../helpers/constant/http_status');
const { SUCCESS, ERROR } = require('../helpers/constant/http_message')

exports.xampleGetAllData = async (req, res) => {
    try {
        const xample = await prisma.xample.findMany({
            where: {
                isDelete: false
            }
        })
        const newXample = xample.map((a) => {
            return {
                // id : a.id,
                ...a,
                isDelete: a.isDelete ? "kehapus" : "masih ada"
            }
        })
        return MSG.sendResponse(
            res,
            STATUS_CODE.STATUS_OK,
            SUCCESS.SUCCESS_EXAMPLE,
            newXample
        )
    } catch (error) {
        return MSG.sendResponse(
            res,
            STATUS_CODE.STATUS_BAD_REQUEST,
            ERROR.ERROR_EXAMPLE,
            ""
        )
    }
}

exports.xampleGetById = async (req, res) => {
    try {
        const id = req.params.id;
        const xample = await prisma.xample.findFirst({
            where: {
                id: id
            }
        })
        return MSG.sendResponse(
            res,
            STATUS_CODE.STATUS_OK,
            SUCCESS.SUCCESS_GET_EXAMPLE_BYID,
            xample
        )
    } catch (error) {
        return MSG.sendResponse(
            res,
            STATUS_CODE.STATUS_BAD_REQUEST,
            ERROR.ERROR_EXAMPLE,
            ""
        )
    }
}

exports.examplePostData = async (req, res) => {
    try {
        const id = uuid4();
        const {
            user
        } = req.body;
        
        const createExample = await prisma.xample.create({
            data: {
                id: id,
                user: user
            }
        })
        return MSG.sendResponse(
            res,
            STATUS_CODE.STATUS_OK,
            SUCCESS.SUCCESS_POST_EXAMPLE,
            createExample
        )
    } catch (error) {
        return MSG.sendResponse(
            res,
            STATUS_CODE.STATUS_BAD_REQUEST,
            ERROR.ERROR_EXAMPLE,
            ""
        )
    }
}

// exports.xampleUpdateData = async (req, res) => {
//     try {
//         const id = req.params.id;
//     } catch (error) {
        
//     }
// }