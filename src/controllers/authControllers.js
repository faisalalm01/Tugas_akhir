const authService = require('../services/authService');

exports.Login = async (req, res) => {
    try {
        return await authService.signIn(req, res)
    } catch (error) {
        console.log("error di sini");
    }
}

exports.Register = async (req, res) => {
    try {
        return await authService.signUp(req, res)
    } catch (error) {
        console.log(error);
    }
}