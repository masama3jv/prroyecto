require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

// Middlewares
app.use(cors());
// Webhook Stripe necessita raw body
app.use('/api/checkout/webhook', express.raw({ type: 'application/json' }));

// Middlewares per la resta
app.use(express.json());

const requestId = require('./middleware/requestId');
const httpLogger = require('./middleware/httpLogger');
app.use(requestId);
app.use(httpLogger);

// Connexió amb MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connectat"))
  .catch((err) => console.error("Error de connexió Mongo:", err));

// Integració d'Swagger
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./docs/swagger');
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Rutes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/products", require("./routes/productRoutes"));
app.use("/api/cart", require("./routes/cartRoutes"));
app.use("/api/orders", require("./routes/orderRoutes"));
app.use("/api/checkout", require("./routes/checkoutRoutes"));
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api", require("./routes/healthRoutes"));

// Ruta arrel perquè no surti "Cannot GET /"
app.get('/', (req, res) => {
  res.json({ status: 'online', message: 'La API del Backend funciona correctament!' });
});

// Ruta temporal per simulació d'error
app.get('/api/debug/error', (req, res, next) => {
  next(new Error('Error de prova per observabilitat'));
});

const errorHandler = require('./middleware/errorHandler');
app.use(errorHandler);

// Port
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor funcionant a http://localhost:${PORT}`));
