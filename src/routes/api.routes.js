const router = require("express").Router();
const xampleController = require("../controllers/xampleController");
const authMiddleware = require("../helpers/middleware/authMiddleware");
const authController = require("../controllers/authControllers");
const userController = require("../controllers/userControllers");
const reportController = require("../controllers/historyControllers");
const cameraController = require("../controllers/cctvControllers");
const uploadCloudinary = require("../helpers/uploadCloudinary");
const uploadFile = require("../helpers/middleware/multerMiddleware");

router.get("/", async (req, res, next) => {
  res.send({ message: "Ok api is working 🚀" });
});


router.get("/xample", xampleController.xampleData);
router.post(
  "/xample",
  authMiddleware.checkToken,
  xampleController.xampleCreate
);
router.get("/xample/:id", xampleController.xampleGetId);

router.post("/register", authController.Register);
router.post("/login", authController.Login);
router.post("/verify", authController.verify);
router.put("/resend-otp", authController.resendOtp);

router.get(
  "/user/detail",
  authMiddleware.checkToken,
  userController.userDataById
);
router.put(
  "/user/update",
  uploadFile, uploadCloudinary,
  authMiddleware.checkToken,
  userController.updateUserDetail
);

router.group("/history", authMiddleware.checkToken, (router) => {
  router.post("", uploadFile, uploadCloudinary, reportController.inputReport);
  router.get("", reportController.getReport);
  router.get("/detail/:id", reportController.getReportById);
});

router.group("/cctv", authMiddleware.checkToken, (router) => {
  router.get("", cameraController.getCctvCamera);
  router.get("/:id", cameraController.getCctvCameraById);
  router.post("", uploadFile, uploadCloudinary, cameraController.inputCctvCamera);
  router.delete("/:id", cameraController.deleteCameraCctv);
});


router.get("/*", async (req, res, next) => {
  res.send({ message: "Not Found Respond", status: 404 });
});


module.exports = router;
