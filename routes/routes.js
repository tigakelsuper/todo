var express = require("express");
var Todo = require("../models/todo");
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../swagger.json');
var router = express.Router();


router.get("/", function(req, res, next) {
Todo.find()
.exec(function(err, todos) {
    if (err) { return next(err); }
    res.send(todos);
});
});


router.get("/:id", function(req, res, next) {
    Todo.findOne({ _id: req.params.id }, function(err, todo) {
        if (err) { return next(err); }
        if (!todo) { 
            res.status(404).send({"message":"todo not found"}); 
            return;
        }
        res.json(todo);
    });
});

router.post("/", function(req, res, next) {
    var todoText = req.body.todo;
    Todo.findOne({ todo: todoText }, function(err, todo) {
        if (err) { return next(err); }
        if (todo) {
            res.json({"message":"Todo is already exist"});
        }
        
        var newTodo = new Todo({
            todo: todoText
        });
        newTodo.save(function(err){
            if(err){
                return next(err); 
            };
            res.status(201).send({"message":"created"});
        });
    });
});

router.put("/", function(req, res, next) {
    var id = req.body.id;
    var todoText = req.body.todo;
    Todo.findOneAndUpdate({ _id: id },{$set:{todo:todoText}}, function(err, todo) {
        if (err) { return next(err); }
        if (!todo) { return next(404); }
        res.json(todo);
    });
});

router.delete("/:id", function(req, res, next) {
    
    Todo.findOneAndDelete({ _id: req.params.id }, function(err, todo) {
        if (err) { return next(err); }
        if (!todo) { return next(404); }
        res.json({"message":"Deleted"});
    });
});

router.use('/documentation', swaggerUi.serve);
router.get('/documentation', swaggerUi.setup(swaggerDocument));

module.exports = router;