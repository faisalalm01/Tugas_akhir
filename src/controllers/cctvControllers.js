const cctvService = require('../services/cctvService');

exports.getCctvCamera = async (req, res) => {
    try {
        const result = await cctvService.getIpCctvCamera(req, res)
        return result;
    } catch (error) {
        console.log(error);
    }
}

exports.inputCctvCamera = async (req, res) => {
    try {
        const result = await cctvService.inputIpCctvCamera(req, res)
        return result;
    } catch (error) {
        console.log(error);
    }
}

exports.getCctvCameraById = async (req, res) => {
    try {
        const result = await cctvService.getIpCctvCameraById(req, res)
        return result;
    } catch (error) {
        console.log(error);
    }
}

exports.deleteCameraCctv = async (req, res) => {
    try {
        const result = await cctvService.deleteIpCctvCamera(req, res)
        return result;
    } catch (error) {
        console.log(error);
    }
}