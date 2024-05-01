const message = {
    sendResponse: (res,code, message, data) => {
      console.log("============>",code, message)
      const response = {
        code : code,
        message : message,
        data : data
      }
      return res.status(code).send(response);
  
    },
  
    sendResponsePaginate: (res,code, message, page, limit, data) => {
      console.log("============>",code, message)
      const response = {
        code : code,
        message : message,
        page,
        limit,
        data : data
      }
      return res.status(code).send(response);
  
    },
  
    sendResponseWithCookie: (res,code, message, data) => {
      console.log("============>",code, message)
      const response = {
        code : code,
        message : message,
        data : data
      }
      return res.cookie("access_token", response.data.access_token)
        .status(code).send(response);
  
    }
  };
  
  module.exports = message;