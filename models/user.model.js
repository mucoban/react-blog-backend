const mongoose = require("mongoose");
const Schema = require('mongoose').Schema

const userSchema = new Schema({
    username: { type: String },
    password: { type: String },
    token: { type: String },
    status: { type: Boolean },
}, { timestamps: true })

const User = mongoose.model('User', userSchema)

module.exports = User