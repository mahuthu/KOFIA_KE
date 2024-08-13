const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    firstName: {type: String, required: true},  // Ensure this field name matches
    lastName: {type: String, required: true},   // Ensure this field name matches
    username: {type: String, required: true, unique: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    isAdmin: {type: Boolean, default: false},
    phoneNumber: {type: String, required: true}  // Changed
}, {timestamps: true});

module.exports = mongoose.model("User", UserSchema);
