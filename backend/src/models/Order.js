const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  products: [
    {
      productId: mongoose.Schema.Types.ObjectId, // Storage for reference
      name: String,
      price: Number,
      quantity: Number,
      imageUrl: String
    }
  ],
  total: { type: Number, required: true },
  paymentMethod: { type: String, enum: ['card', 'paypal'], default: 'card' },
  status: { type: String, default: 'pending', enum: ['pending', 'paid', 'cancelled'] },
  stripeSessionId: { type: String },
  shippingAddress: {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    address: { type: String, required: true },
    city: { type: String, required: true },
    zipCode: { type: String, required: true }
  },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Order', orderSchema);
