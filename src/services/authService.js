const {PrismaClient, Prisma} = require('@prisma/client');
const { STATUS_CODE } = require('../helpers/constant/http_status');
const { SUCCESS, ERROR } = require('../helpers/constant/http_message');
const prisma = new PrismaClient();
const uuid4 = require('uuid').v4;
const bcrypt = require('bcrypt');
const { PrismaClientKnownRequestError } = require('@prisma/client/runtime/library');
const saltRounds = 10
const generateToken = require('../helpers/token')

exports.signIn = async (req, res) => {
    try {
        const { email, password} = req.body;
        if (!email || !password) {
            return MSG.sendResponse(
                res,
                STATUS_CODE.STATUS_BAD_REQUEST,
                ERROR.MISSING_ARGS,
            )
        }
        const userData = await prisma.user.findUnique({
            where : {
                email : email
            }
        })
        const validPassword = await bcrypt.compare(password, userData.password);
        if (!userData || !validPassword) {
            return MSG.sendResponse(
                res,
                STATUS_CODE.STATUS_NOT_AUTHORIZED,
                ERROR.INVALID_EMAIL_PASS
            )
        }

        const token = generateToken(userData.email, userData.id);
        const response = {access_token: token, ...userData};
        
        return MSG.sendResponse(
            res,
            STATUS_CODE.STATUS_OK,
            SUCCESS.SUCCESS_LOGIN,
            response
        )
    } catch (error) {
        console.log(error);
        return MSG.sendResponse(
            res,
            STATUS_CODE.STATUS_BAD_REQUEST,
            error,
            req.body
        )
    }
}

exports.signUp = async (req, res) => {
    try {
        const { username, email, notelp } = req.body;
        const password = bcrypt.hashSync(req.body.password, saltRounds);
        const id = uuid4();
        const users = await prisma.user.create({
            data: {
                id: id,
                username: username,
                email: email,
                password: password,
                notelp: notelp,
            }
            // isVerif
        })
        return MSG.sendResponse(
            res,
            STATUS_CODE.STATUS_OK,
            SUCCESS.SUCCESS_REGISTER,
            users
        )
    } catch (error) {
        console.log(error);
        if (error instanceof PrismaClientKnownRequestError) {
            if (error.code === 'P2002') {
                return MSG.sendResponse(
                    res,
                    STATUS_CODE.STATUS_BAD_REQUEST,
                    ERROR.EMAIL_EXIST,
                    ''
                )
            }
            throw error;
        } else if (error instanceof Prisma.PrismaClientValidationError) {
            return MSG.sendResponse(
                res,
                STATUS_CODE.STATUS_BAD_REQUEST,
                ERROR.MISSING_ARGS,
                ''
            )
        } else {
            return MSG.sendResponse(
                res,
                STATUS_CODE.STATUS_BAD_REQUEST,
                ERROR.INTERNAL_SERVER,
                ''
            )
        }
    }
}
