const userService = require('../services/userService')

exports.userDataById = async (req, res) => {
    try {
        const result = await userService.getUserDataById(req, res)
        return result;
    } catch (error) {
        console.error(error, "asasdasjhdgasj");
    }
}

exports.updateUserDetail = async (req, res) => {
    try {
        const userData = await userService.updateUserDetail(req, res)
        return userData;
    } catch (error) {
        console.log(error);
    }
}