const mongoose = require('mongoose');

let todoSchema = mongoose.Schema({

  title:  { type: String, required: true },
  isDone: { type: Boolean, required: true }

});


const Todo = module.exports = mongoose.model('Todo', todoSchema);