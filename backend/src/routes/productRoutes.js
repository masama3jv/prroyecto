const express = require('express');
const router = express.Router();
const { getProducts, getProductById, createProduct } = require('../controllers/productController');

/**
 * @swagger
 * /api/products:
 *   get:
 *     summary: Obtenir tots els productes
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: Llista de productes obtinguda amb èxit
 *   post:
 *     summary: Crear un nou producte (requereix possibles permisos)
 *     tags: [Products]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               price:
 *                 type: number
 *               description:
 *                 type: string
 *     responses:
 *       201:
 *         description: Producte creat amb èxit
 * 
 * /api/products/{id}:
 *   get:
 *     summary: Obtenir detalls d'un producte
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del producte
 *     responses:
 *       200:
 *         description: Detalls del producte
 *       404:
 *         description: Producte no trobat
 */
router.get('/', getProducts);
router.get('/:id', getProductById);
router.post('/', createProduct);

module.exports = router;
