const jwt = require('jsonwebtoken');
const { STATUS_CODE } = require('../constant/http_status');

exports.checkToken = (req, res, next) => {
    const bearer = req.header("access_token");
    if (!bearer) {
        res.send({
            msg: "unauthorized",
            status: STATUS_CODE.STATUS_NOT_AUTHORIZED,
            error: "error get token"
        })
    } else {
        const token = bearer.split(" ")[1];
        try {
            const decodedToken = jwt.verify(token, process.env.JWT_ACCESS_TOKEN);
            req.token = decodedToken.guid;
            next();
        } catch (error) {
            res.send({
                msg: "unauthorized",
                status: STATUS_CODE.STATUS_NOT_AUTHORIZED,
                error: "error get token"
            })
        }
    }
};