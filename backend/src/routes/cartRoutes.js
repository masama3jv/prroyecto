const express = require('express');
const router = express.Router();
const { getCart, addToCart, removeFromCart } = require('../controllers/cartController');
const auth = require('../middleware/authMiddleware');

/**
 * @swagger
 * /api/cart:
 *   get:
 *     summary: Obtenir el carretó de l'usuari autènticat
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Carretó obtingut
 *       401:
 *         description: No autoritzat
 */
router.get('/', auth, getCart);

/**
 * @swagger
 * /api/cart/add:
 *   post:
 *     summary: Afegir un producte al carretó
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               productId:
 *                 type: string
 *               quantity:
 *                 type: number
 *     responses:
 *       200:
 *         description: Producte afegit correctament
 *       401:
 *         description: No autoritzat
 */
router.post('/add', auth, addToCart);

/**
 * @swagger
 * /api/cart/{productId}:
 *   delete:
 *     summary: Eliminar un producte del carretó
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: productId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del producte a esborrar
 *     responses:
 *       200:
 *         description: Producte eliminat del carretó
 *       401:
 *         description: No autoritzat
 */
router.delete('/:productId', auth, removeFromCart);

module.exports = router;
