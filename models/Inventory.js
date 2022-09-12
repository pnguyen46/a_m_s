const mongoose = require('mongoose');

const InventorySchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  brand: {
    type: String,
    required: true,
  },
  location: {
    type: String,
  },
  identifier: {
    type:String,
    default:'inventory'
  }
});

module.exports = mongoose.model('Inventory', InventorySchema,'inventory');
