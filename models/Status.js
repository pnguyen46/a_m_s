const mongoose = require('mongoose');
const StatusSchema = new mongoose.Schema({
    userName: { type: String, unique: true },
    email: { type: String, unique: true },
    password: String,
});

module.exports = mongoose.model("User", StatusSchema);
