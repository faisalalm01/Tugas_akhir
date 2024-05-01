const router = require('express').Router();
const xampleController = require('../controllers/xampleController');
const authMiddleware = require('../helpers/middleware/authMiddleware');
const authController = require('../controllers/authControllers');

router.get('/', async (req, res, next) => {
    res.send({ message: 'Ok api is working 🚀' });
});

router.get('/xample', xampleController.xampleData);
router.post('/xample', authMiddleware.checkToken, xampleController.xampleCreate);
router.get('/xample/:id', xampleController.xampleGetId);

router.post('/register', authController.Register);
router.post('/login', authController.Login);

module.exports = router;