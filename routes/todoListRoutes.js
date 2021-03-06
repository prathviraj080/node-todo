'use strict';
module.exports = function(app) {
  var todoList = require('../controllers/todoListController');

  app.route('/api/todos')
    .get(todoList.list_all_tasks)
    .post(todoList.create_a_task);


  app.route('/api/todos/:taskId')
    .get(todoList.read_a_task)
    .put(todoList.update_a_task)
    .delete(todoList.delete_a_task);

  app.route('/api/todos/search/:query')
    .get(todoList.search);


  app.route('/api/todos/get/name')
    .get(todoList.get_task_names);
    
};
