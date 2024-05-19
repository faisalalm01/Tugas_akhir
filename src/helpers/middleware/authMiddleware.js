const jwt = require('jsonwebtoken');
const { STATUS_CODE } = require('../constant/http_status');
const { ERROR } = require('../constant/http_message');

exports.checkToken = (req, res, next) => {
    const bearer = req.header("access_token");
    if (!bearer) {
        MSG.sendResponse(
            res,
            STATUS_CODE.STATUS_NOT_AUTHORIZED,
            ERROR.UNAUTHORIZED,
            "eror di header bearer"
        );
    } else {
        const token = bearer.split(" ")[1];
        try {
            const decodedToken = jwt.verify(token, process.env.JWT_ACCESS_TOKEN);
            req.token = decodedToken.guid;
            next();
        } catch (error) {
            MSG.sendResponse(
                res,
                STATUS_CODE.STATUS_NOT_AUTHORIZED,
                ERROR.UNAUTHORIZED,
                "eror di token"
            )
        }
    }
};