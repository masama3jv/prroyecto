require('dotenv').config();
const mongoose = require('mongoose');
const Product = require('./models/Product');

const products = [
  {
    name: "Laptop HP Pavilion",
    description: "Laptop potenta per a treball i entreteniment amb processador Intel Core i7.",
    price: 899.99,
    category: "Electrònica",
    imageUrl: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=500&auto=format&fit=crop&q=60",
    stock: 10
  },
  {
    name: "Auriculars Sony WH-1000XM4",
    description: "Auriculars sense fils amb cancel·lació de soroll líder al sector.",
    price: 249.00,
    category: "Àudio",
    imageUrl: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&auto=format&fit=crop&q=60",
    stock: 25
  },
  {
    name: "Càmera Canon EOS R5",
    description: "Càmera mirrorless per a professionals amb vídeo 8K.",
    price: 3499.00,
    category: "Fotografia",
    imageUrl: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=500&auto=format&fit=crop&q=60",
    stock: 5
  },
  {
    name: "Monitor Gaming Samsung Odyssey",
    description: "Monitor corbat de 27 polzades amb 144Hz de refresc.",
    price: 399.50,
    category: "Electrònica",
    imageUrl: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=500&auto=format&fit=crop&q=60",
    stock: 15
  }
];

mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    console.log("Connectat a MongoDB per a la sembra...");
    await Product.deleteMany({});
    await Product.insertMany(products);
    console.log("Productes inserits amb èxit!");
    process.exit();
  })
  .catch(err => {
    console.error("Error durant la sembra:", err);
    process.exit(1);
  });
