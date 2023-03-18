const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    id: {
        type: Number,
        required: true
    },
    t1: {
        type: Number
    },
    t2: {
        type: Number
    },
    t3: {
        type: Number
    },
    score: {
        type: Number
    },
    name: {
        type: String
    },
    uname: {
        type: String
    }
}, {timestamps: true});

const user_data = mongoose.model('botdb', userSchema);

module.exports = user_data;

