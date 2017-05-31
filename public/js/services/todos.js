var todoApp = angular.module('todo');

	// super simple service
	// each function returns a promise object 
todoApp.factory('Todos', ['$http',function($http) {
    return {
        get : function() {
            return $http.get('/api/todos');
        },
        create : function(todoData) {
            return $http.post('/api/todos', todoData);
        },
        update : function(id,todoData) {
            return $http.put('/api/todos/' + id, todoData);
        },
        search : function(name) {
            return $http.get('/api/todos/search/' + name);
        },
        delete : function(id) {
            return $http.delete('/api/todos/' + id);
        },
        getNames : function() {
            return $http.get('/api/todos/get/name');
        }
    }
}]);


todoApp.factory('Tasks',function(){
    var tasks = {};

    tasks.list = [];

    tasks.add = function(task) {
        tasks.list.push(task);
    };

    return tasks;
});

