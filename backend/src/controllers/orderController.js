const Order = require('../models/Order');
const Cart = require('../models/Cart');
const Product = require('../models/Product');

exports.createOrder = async (req, res) => {
  try {
    const { paymentMethod, shippingAddress } = req.body;
    const cart = await Cart.findOne({ userId: req.user.id }).populate('products.productId');
    
    if (!cart || cart.products.length === 0) {
      return res.status(400).json({ message: 'Cart is empty' });
    }

    if (!shippingAddress) {
      return res.status(400).json({ message: 'Shipping address is required' });
    }

    let total = 0;
    const orderProducts = cart.products.map(item => {
      const subtotal = item.productId.price * item.quantity;
      total += subtotal;
      return {
        productId: item.productId._id,
        name: item.productId.name,
        price: item.productId.price,
        quantity: item.quantity,
        imageUrl: item.productId.imageUrl
      };
    });

    const order = new Order({
      userId: req.user.id,
      products: orderProducts,
      total,
      paymentMethod: paymentMethod || 'card',
      shippingAddress,
      status: 'pending' // Default status is pending
    });

    await order.save();
    
    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getOrders = async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.user.id }).sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate('userId', 'name email')
      .sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
