const mongoose = require('mongoose');

// Define the Menu schema with additional fields
const menuSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  salePrice: {
    type: Number,
    min: 0,
    default: null // Default to null if no sale price is provided
  },
  category: {
    type: String,
    required: true,
    trim: true
  },
  isDrink: {
    type: Boolean,
    default: false
  },
  taste: {
    type: String,
    enum:['sweet','spicy','sour'],
    required: true
  },
  ingredient: {
    type: [String], // Array of strings to list ingredients
    default: []
  },
  isAvailable: {
    type: Boolean,
    default: false
  },
  num_sales: {
    type: Number,
    default: 0
  }
});

// Create and export the Menu model
const Menu = mongoose.model('Menu', menuSchema);

module.exports = Menu;
