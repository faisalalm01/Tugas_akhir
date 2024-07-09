const { PrismaClient } = require("@prisma/client");
const { STATUS_CODE } = require("../helpers/constant/http_status");
const { ERROR, SUCCESS } = require("../helpers/constant/http_message");
const prisma = new PrismaClient();
const uuid4 = require("uuid").v4;

exports.inputIpCctvCamera = async (req, res) => {
  try {
    const id = uuid4();
    const idUser = req.token;
    const { ip, lokasiCamera, userIp, passwordUser, path, port } = req.body;
    const image = req.Image.url;
    const postCamera = await prisma.cctv.create({
      data: {
        id: id,
        userIp: userIp,
        passwordUser: passwordUser,
        ip: ip,
        path: path,
        idUser: idUser,
        port: port,
        lokasiCamera: lokasiCamera,
        image: image,
      }
    });
    return MSG.sendResponse(
      res,
      STATUS_CODE.STATUS_OK,
      SUCCESS.SUCCESS_GET_EXAMPLE_BYID,
      postCamera
    );
  } catch (error) {
    console.log(error)
    return MSG.sendResponse(
      res,
      STATUS_CODE.STATUS_NOT_FOUND,
      ERROR.ERROR_EXAMPLE,
      ""
    );
  }
};

exports.getIpCctvCamera = async (req, res) => {
  try {
    const idUser = req.token;
    const getCameraCctv = await prisma.cctv.findMany({
      where: {
        idUser: idUser,
        isDelete: false
      },
      include: {
        user: {}
      }
    });
    console.log(idUser);
    return MSG.sendResponse(
      res,
      STATUS_CODE.STATUS_OK,
      SUCCESS.SUCCESS_GET_EXAMPLE_BYID,
      getCameraCctv
    );
  } catch (error) {
    console.log(error);
    return MSG.sendResponse(
      res,
      STATUS_CODE.STATUS_NOT_FOUND,
      ERROR.ERROR_EXAMPLE,
      "ererer"
    );
  }
};

exports.getIpCctvCameraById = async (req, res) => {
  try {
    const id = req.params.id;
    const getCameraId = await prisma.cctv.findUnique({
      where: {
        id: id,
      },
    });
    return MSG.sendResponse(
      res,
      STATUS_CODE.STATUS_OK,
      SUCCESS.SUCCESS_GET_EXAMPLE_BYID,
      getCameraId
    );
  } catch (error) {
    return MSG.sendResponse(
      res,
      STATUS_CODE.STATUS_NOT_FOUND,
      ERROR.ERROR_EXAMPLE,
      ""
    );
  }
};

exports.deleteIpCctvCamera = async (req, res) => {
  try {
    const id = req.params.id;
    const deleteCamera = await prisma.cctv.update({
      where: {
        id: id,
      },
      data: {
        isDelete: true
      }
    });
    return MSG.sendResponse(
      res,
      STATUS_CODE.STATUS_OK,
      SUCCESS.SUCCESS_GET_EXAMPLE_BYID,
      deleteCamera
    );
  } catch (error) {
    console.log(error);
    return MSG.sendResponse(
      res,
      STATUS_CODE.STATUS_NOT_FOUND,
      ERROR.ERROR_EXAMPLE,
      ""
    );
  }
};


// model 
// const cv = require('opencv4nodejs');
// const torch = require('torch');
// const path = require('path');

// // Path to your YOLOv5 model
// const modelPath = path.resolve(__dirname, 'path_to_your_model/best.pt');
// const model = torch.hub.load('ultralytics/yolov5', 'custom', { path: modelPath, force_reload: true });

// // Define your target classes
// const target_classes = ['Normal', 'Penembakan', 'Pencurian', 'Perkelahian', 'Vandalisme'];

// exports.processVideoStream = async (req, res) => {
//   const ip = req.params.ip;
//   const streamUrl = `http://${ip}/video`;
//   const cap = new cv.VideoCapture(streamUrl);

//   const preprocess = (img) => {
//     const height = img.rows;
//     const width = img.cols;
//     const ratio = height / width;
//     return img.resizeToMax(640, Math.floor(640 * ratio));
//   };

//   const drawBoundingBoxes = (frame, results) => {
//     let saveFrame = false;
//     results.forEach(result => {
//       if (target_classes.includes(result.name)) {
//         saveFrame = true;
//         const { xmin, ymin, xmax, ymax, name } = result;
//         frame.drawRectangle(
//           new cv.Rect(xmin, ymin, xmax - xmin, ymax - ymin),
//           new cv.Vec(255, 255, 0),
//           3,
//           cv.LINE_8
//         );
//         frame.putText(
//           name,
//           new cv.Point2(xmin, ymin - 10),
//           cv.FONT_HERSHEY_SIMPLEX,
//           1,
//           new cv.Vec(255, 255, 0),
//           2
//         );
//       }
//     });
//     return saveFrame;
//   };

//   while (true) {
//     const frame = cap.read();
//     if (!frame) {
//       break;
//     }
//     const preprocessedFrame = preprocess(frame);
//     const results = model(preprocessedFrame);

//     const saveFrame = drawBoundingBoxes(frame, results);

//     if (saveFrame) {
//       cv.imwrite(`Detected_Photos/detected${Date.now()}.jpg`, frame);
//     }

//     res.writeHead(200, { 'Content-Type': 'image/jpeg' });
//     res.write(frame.toBuffer());
//   }

//   res.end();
// };