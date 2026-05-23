const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const checkoutController = require('../controllers/checkoutController');

router.post('/create-session', auth, checkoutController.createSession);
// El webhook no requereix auth, Stripe se n'encarrega enviant la signatura correcta
router.post('/webhook', checkoutController.webhook);

module.exports = router;
    