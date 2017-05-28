angular.module('todoController', [])

    // inject the Todo service factory into our controller
    .controller('mainController', ['$scope', '$http', 'Todos', function ($scope, $http, Todos) {
        $scope.formData = {};
        $scope.loading = true;

        // GET =====================================================================
        // when landing on the page, get all todos and show them
        // use the service to get all the todos
        Todos.get().then(function success(response) {
            console.log(response.data);
            $scope.todos = response.data;
            $scope.loading = false;
        }, function error(params) {
            $scope.loading = false;
            console.log(params);
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
                    console.log(response);
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
                console.log(response);
            });
        };

        $scope.moment = function(date) {
            return moment(date).calendar();
        }
    }]);