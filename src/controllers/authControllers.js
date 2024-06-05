const authService = require('../services/authService');

exports.Login = async (req, res) => {
    try {
        return await authService.signIn(req, res)
    } catch (error) {
        console.log(error);
    }
}

exports.Register = async (req, res) => {
    try {
        return await authService.signUp(req, res)
    } catch (error) {
        console.log(error);
    }
}

exports.verify = async (req, res) => {
    try {
        return await authService.verify(req, res)
    } catch (error) {
        console.log(error);
    }
}

exports.resendOtp = async (req, res) => {
    try {
        return await authService.resendOtp(req, res)
    } catch (error) {
        console.log(error);
    }
}