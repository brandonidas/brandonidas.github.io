var app = angular.module('app', ['components']);
 
app.controller('BeerCounter', function($scope, $locale) {
  $scope.beers = [0, 1, 2, 3, 4, 5, 6];
  if ($locale.id == 'en-us') {
    $scope.beerForms = {
      0: 'no beers',
      one: '{} beer',
      other: '{} beers'
    };
  } else {
    $scope.beerForms = {
      0: 'žiadne pivo',
      one: '{} pivo',
      few: '{} pivá',
      other: '{} pív'
    };
  }
});

app.controller('TodoListController', function() {
    var todoList = this;
    todoList.todos = [
      {text:'buy banana cake', done:true},
      {text:'eat banana cake', done:false}];
 
    todoList.addTodo = function() {
      todoList.todos.push({text:todoList.todoText, done:false});
      todoList.todoText = '';
    };
 
    todoList.remaining = function() {
      var count = 0;
      angular.forEach(todoList.todos, function(todo) {
        count += todo.done ? 0 : 1;
      });
      return count;
    };
 
    todoList.archive = function() {
      var oldTodos = todoList.todos;
      todoList.todos = [];
      angular.forEach(oldTodos, function(todo) {
        if (!todo.done) todoList.todos.push(todo);
      });
    };

    todoList.removeItem = function(i){
      todoList.todos.splice(i,1);

    }
  });

// FUTURE AUDIO FUNCTIONALITY
    // $scope.playAudio = function() {
    //     var audio = new Audio('audio/song.mp3');
    //     audio.play();
    // };