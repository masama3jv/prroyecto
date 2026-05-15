const express = require('express');
const router = express.Router();
const { createOrder, getOrders, getAllOrders } = require('../controllers/orderController');
const auth = require('../middleware/authMiddleware');
const admin = require('../middleware/adminMiddleware');

/**
 * @swagger
 * /api/orders:
 *   post:
 *     summary: Executar una nova comanda a partir del carretó de compra
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       201:
 *         description: Comanda processada i creada
 *       401:
 *         description: No autoritzat
 *   get:
 *     summary: Recuperar un llistat de les comandes de l'usuari actual
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Retorna un vector llistant totes les ordres d'aquest Client
 *       401:
 *         description: No autoritzat
 */
router.post('/', auth, createOrder);
router.get('/', auth, getOrders);
router.get('/all', auth, admin, getAllOrders);

module.exports = router;
