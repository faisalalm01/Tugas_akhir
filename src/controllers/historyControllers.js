const reportService = require('../services/historyService')

exports.getReport = async (req, res) => {
    try {
        const result = await reportService.getReport(req, res)
        return result;
    } catch (error) {
        console.log(error);
    }
}

exports.getReportById = async (req, res) => {
    try {
        const result = await reportService.getReportById(req, res)
        return result;
    } catch (error) {
        console.error(error);
    }
}

exports.inputReport = async (req, res) => {
    try {
        const result = await reportService.inputReport(req, res)
        return result
    } catch (error) {
        console.log(error);
    }
}