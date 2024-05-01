const xampleDataService = require('../services/xample');

exports.xampleData = async (req, res) => {
    try {
        return await xampleDataService.xampleGetAllData(req, res);
    } catch (error) {
        console.log(error);
    }
}

exports.xampleCreate = async (req, res) => {
    try {
        return await xampleDataService.examplePostData(req, res);
    } catch (error) {
        console.log(error);
    }
}

exports.xampleGetId = async (req, res) => {
    try {
        return await xampleDataService.xampleGetById(req, res);
    } catch (error) {
        console.log(error);
    }
}