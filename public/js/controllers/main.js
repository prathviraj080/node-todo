var todoApp = angular.module('todo', ['ui.bootstrap']);



    // inject the Todo service factory into our controller
todoApp.controller('mainController', ['$scope', '$http', 'Todos','Tasks', function ($scope, $http, Todos,Tasks) {
        $scope.formData = {};
        $scope.loading = true;
        
        if(Tasks && Tasks.list.length)
            $scope.todos = Tasks.list;
        // GET =====================================================================
        // when landing on the page, get all todos and show them
        // use the service to get all the todos
        Todos.get().then(function success(response) {
            $scope.todos = response.data;
            $scope.loading = false;
        }, function error(params) {
            $scope.loading = false;
        });

        // CREATE ==================================================================
        // when submitting the add form, send the text to the node API
        $scope.createTodo = function () {

            // validate the formData to make sure that something is there
            // if form is empty, nothing will happen
            if ($scope.formData.name != undefined) {
                $scope.loading = true;
                // call the create function from our service (returns a promise object)
                Todos.create($scope.formData).then(function successCallback(respose) {
                    $scope.loading = false;
                    $scope.formData = {}; // clear the form so our user is ready to enter another
                    $scope.todos = respose.data; // assign our new list of todos
                }, function errorCallback(response) {
                    $scope.loading = false;
                })
            }
        };

        // DELETE ==================================================================
        // delete a todo after checking it
        $scope.deleteTodo = function (id) {
            $scope.loading = true;

            Todos.delete(id).then(function success(response) {
                $scope.loading = false;
                $scope.todos = response.data;
            }, function error(response) {
                $scope.loading = false;
            });
        };

        $scope.moment = function(date) {
            return moment(date).calendar();
        }

        $scope.updateStatus = function(id,index) {
            $scope.loading = true;
            delete $scope.todos[index]._id;
            $scope.todos[index].updated_date = new Date();
            Todos.update(id,$scope.todos[index]).then(function success(response){
                $scope.loading = false;
                $scope.todos = response.data;
            }, function error(response){
                $scope.loading = false;
            });
        }


        $scope.$watch(function () { return Tasks.list }, function (newVal, oldVal) {
            if (typeof newVal !== 'undefined') {
                $scope.todos = Tasks.list;
            }
        });

        $scope.$watch(function () { return $scope.todos }, function (newVal, oldVal) {
            if (typeof newVal !== 'undefined') {
                var pending = 0;
                for(var i=0;i<$scope.todos.length;i++) {
                    if($scope.todos[i].status == 'pending')
                        ++pending;
                }
                var msg = {};
                msg.pending = pending;
                msg.total = $scope.todos.length;
                $scope.$parent.$broadcast('count', { message: msg });
            }
        });

        
    }]);


todoApp.controller('headerController',['$scope','Todos','Tasks',function($scope,Todos,Tasks){
    $scope.query = '';
    $scope.todos = '';
    $scope.error = false;
    Todos.get().then(function success(response) {
        $scope.total = response.data.length;
        var pending=0;
        response.data.forEach(function(ele){
            if(ele.status == 'pending')
                ++pending;
        });
        $scope.pending = pending;
        $scope.loading = false;
    }, function error(params) {
        $scope.loading = false;
    });



    Todos.getNames().then(function success(response) {
        $scope.taskNames = response.data;
        $scope.name="";
        $scope.loading = false;
    }, function error(params) {
        $scope.loading = false;
    });


    $scope.$on('count', function (event, args) {
        $scope.total = args.message.total;
        $scope.pending = args.message.pending;

        Todos.getNames().then(function success(response) {
            $scope.taskNames = response.data;
            $scope.name="";
            $scope.loading = false;
        }, function error(params) {
            $scope.loading = false;
        });

    });

    $scope.closeError = function() {
         $scope.error = false;
    }


    $scope.onItemSelected = function(args){
        $scope.error = false;
        if(args == '') {
            Todos.get().then(function success(response) {
                Tasks.list = [];
                response.data.forEach(function(task){
                    Tasks.add(task);
                });
                $scope.loading = false;
            }, function error(params) {
                $scope.loading = false;
            });
        } else if(args == 'badData') {
            Tasks.list = [];
            $scope.error = true;
        } else {
            Todos.search(args).then(function success(response){
                Tasks.list = [];
                response.data.forEach(function(task){
                    Tasks.add(task);
                });
            }, function error(response){

            });
        }
    }

    

  $scope.isNavCollapsed = true;
  $scope.isCollapsed = false;
  $scope.isCollapsedHorizontal = false;
}]);


todoApp.controller('pageController',['$scope',function($scope){
    $scope.$on('count', function (event, args) {
        //$scope.$broadcast('count',{message:args});
    });
}]);