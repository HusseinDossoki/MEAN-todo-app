const router = require('express').Router();
const Todo   = require('../models/Todo');



// get all todos
router.get('/todos', (req, res) => {
  Todo.find({}, (err, todos) => {
    if(err) {
      res.status(404).json(err);
    }

    res.json(todos);
  });
});


// get single todo
router.get('/todos/:id', (req, res) => {
  Todo.find({_id: req.params.id}, (err, todo) => {
    if(err) {
      res.status(404).json(err);
    }

    res.json(todo);
  });
});


// add todo to the database
router.post('/todo', (req, res) => {
  
  let todo = req.body;
  if(!todo.title || todo.title === '') {
    res.status(404).json({error: 'bad data'});
  } else {
    todo_doc = new Todo();
    todo_doc.title = todo.title;
    todo_doc.isDone = todo.isDone;

    todo_doc.save((err, doc) => {
      if(err) {
        res.json(err);
      }
      res.json(doc);
    });
  }

});



// remove todo
router.delete('/todo/:id', (req, res) => {

  Todo.remove({_id: req.params.id}, (err) => {
    if(err) {
      res.status(404).json(err);
    } else {
      res.status(200).json({msg: 'deleted succeffly'});
    }
  });

});



// update status
router.put('/todo/:id', (req, res) => {
  
  let todo = req.body;
  if(!todo.title || todo.title === '') {
    res.status(404).json({error: 'bad data'});
  } else {
    Todo.update({_id: req.params.id}, todo, (err) => {
      if(err) {
        res.json(err);
      }
      res.json({msg: 'updated'});
    });
  }

});



module.exports = router;