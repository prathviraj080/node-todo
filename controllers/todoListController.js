'use strict';


var mongoose = require('mongoose'),
    Task = mongoose.model('TaskList');

exports.list_all_tasks = function (req, res) {
    Task.find({}).sort({updated_date: -1}).exec(function (err, task) {
        if (err)
            res.send(err);
        res.json(task);
    });
};




exports.create_a_task = function (req, res) {
    var new_task = new Task(req.body);
    new_task.save(function (err, task) {
        if (err)
            res.send(err);

        //Return all
        Task.find({}).sort({updated_date: -1}).exec(function (err, task) {
            if (err)
                res.send(err);
            res.json(task);
        });


    });
};


exports.read_a_task = function (req, res) {
    Task.findById(req.params.taskId).sort({updated_date: -1}).exec(function (err, task) {
        if (err)
            res.send(err);
        res.json(task);
    });
};


exports.update_a_task = function (req, res) {
    console.log(req.params.taskId);
        console.log(req.body);
    Task.findOneAndUpdate({_id:req.params.taskId}, req.body, { new: true }, function (err, task) {
        if (err)
            res.send(err);
            

        Task.find({}).sort({updated_date: -1}).exec(function (err, task) {
            if (err)
                res.send(err);
            res.json(task);
        });



    });
};


exports.delete_a_task = function (req, res) {
    Task.remove({
        _id: req.params.taskId
    }, function (err, task) {
        if (err)
            res.send(err);
            


        //Return all
        Task.find({}).sort({updated_date: -1}).exec(function (err, task) {
            if (err)
                res.send(err);
            res.json(task);
        });
    });
};


exports.search = function(req, res) {
    Task.find({$text: {$search: req.params.query}}).sort({updated_date: -1}).exec(function (err, task) {
        if (err)
            res.send(err);
        res.json(task);
    });
}
/*

var Todos = require('../models/todoModel');

module.exports = function(app) {
    
   app.get('/api/setupTodos', function(req, res) {
       
       // seed database
       var starterTodos = [
           {
               username: 'test',
               todo: 'Buy milk',
               isDone: false,
               hasAttachment: false
           },
           {
               username: 'test',
               todo: 'Feed dog',
               isDone: false,
               hasAttachment: false
           },
           {
               username: 'test',
               todo: 'Learn Node',
               isDone: false,
               hasAttachment: false
           }
       ];
       Todos.create(starterTodos, function(err, results) {
           res.send(results);
       }); 
   });
    
}

*/