const express = require('express');
const router = express.Router();
const { getUsers } = require('../controllers/userController');
const auth = require('../middleware/authMiddleware');
const admin = require('../middleware/adminMiddleware');

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Obtenir tots els usuaris
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Llista d'usuaris
 *       401:
 *         description: No autoritzat
 *       403:
 *         description: Accés denegat (només admin)
 */
router.get('/', auth, admin, getUsers);

module.exports = router;
