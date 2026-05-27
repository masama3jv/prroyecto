const Order = require('../models/Order');

// Carreguem la llibreria de Stripe, però si no hi ha variable d'entorn no petem el servidor d'immediat
const getStripe = () => {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) {
    throw new Error("STRIPE_SECRET_KEY no està configurada a les variables d'entorn");
  }
  return require('stripe')(key);
};

exports.createSession = async (req, res) => {
  try {
    const stripe = getStripe();
    const { orderId } = req.body;
    
    const order = await Order.findById(orderId).populate('products.productId');
    
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    // Calcular el preu i mapejar productes pel llistat de Stripe
    const line_items = order.products.map(p => ({
      price_data: {
        currency: 'eur',
        product_data: {
          name: p.name,
          images: p.imageUrl ? [p.imageUrl] : [],
        },
        unit_amount: Math.round(p.price * 100), // Stripe funciona amb cèntims
      },
      quantity: p.quantity,
    }));

    // Creació de la sessió d'Stripe
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card', 'paypal'],
      line_items,
      mode: 'payment',
      success_url: `${process.env.FRONTEND_URL || 'http://localhost:5173'}/checkout/success`,
      cancel_url: `${process.env.FRONTEND_URL || 'http://localhost:5173'}/checkout/cancel`,
      client_reference_id: order._id.toString(), // Ho necessitarem al webhook!
    });

    // Guardar la sessió generada al nostre Order
    order.stripeSessionId = session.id;
    await order.save();

    req.log.info({
      orderId: order._id,
      userId: req.user?.id || null,
      total: order.total
    }, 'Stripe checkout session started');

    res.json({ sessionId: session.id, url: session.url });

  } catch (error) {
    req.log.error({
      orderId: req.body?.orderId,
      userId: req.user?.id || null,
      error: error.message
    }, 'Payment failed');
    console.error("Error Stripe Session:", error);
    res.status(500).json({ message: error.message || "Error al processar el pagament" });
  }
};

exports.webhook = async (req, res) => {
  let stripe;
  let event;
  try {
    stripe = getStripe();
    const sig = req.headers['stripe-signature'];
    const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

    if (!endpointSecret) {
      throw new Error("STRIPE_WEBHOOK_SECRET no configurada");
    }

    // req.body ha de ser RAW original (Buffer). Ho garantim des de server.js
    event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
  } catch (err) {
    console.error(`Webhook Error: ${err.message}`);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Processar l'esdeveniment
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;
    
    // Trobar la comanda i actualitzar estats
    const orderId = session.client_reference_id;
    try {
      const order = await Order.findById(orderId);
      if (order) {
        order.status = 'paid';
        await order.save();
        req.log.info({
          orderId: order._id,
          stripeSessionId: session.id
        }, 'Payment confirmed');
      } else {
        req.log.warn({ orderId }, 'Order not found for payment session');
      }
    } catch (err) {
      req.log.error({
        orderId,
        error: err.message
      }, 'Error updating order status after payment');
    }
  }

  // Retornar 200 a Stripe per aturar reintents
  res.json({ received: true });
};
