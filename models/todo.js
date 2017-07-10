const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
    title: { type: String, required: true },
    order:  Number,
    completed: { type: Boolean, default:false}
    
});

const todo = mongoose.model('todo', todoSchema);

module.exports = todo;