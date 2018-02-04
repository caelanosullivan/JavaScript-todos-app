var todoList = {
  
    todos: [],
    
    displayTodos: function() {
       if (this.todos.length === 0) {
        console.log('Your todo list is empty');
       } else {
          console.log('My Todos:');
          for (var i = 0; i < this.todos.length; i++) {
            if (this.todos[i].completed === true) {
              console.log('(x)', this.todos[i].todoText);
            } else {
                console.log('( )', this.todos[i].todoText);
            }
          }
       }
    },
    
    addTodo: function(todoText) {
      this.todos.push({
        todoText: todoText,
        completed: false
      });
      this.displayTodos();
    },
    
    changeTodo: function(position, todoText) {
      //this.todos[position] = todoText;
      // change just the property todoText
      this.todos[position].todoText = todoText
      this.displayTodos();
    },
    
    deleteTodo: function(position) {
      this.todos.splice(position, 1);
      this.displayTodos();
    },
    
    toggleCompleted: function(position) {
      // this todo variable just saves typing two lines down (see below)
      var todo = this.todos[position];
      todo.completed = !todo.completed;
      // var flower = this.todos[position];
      // flower.completed = !flower.completed;
      this.displayTodos();
    },
    
    toggleAll: function() {
      var totalTodos = this.todos.length;
      var completedTodos = 0;
      
      //Get number of completed todos
      for (var i = 0; i < totalTodos; i++) {
        if (this.todos[i].completed === true) {
          completedTodos++;
        }
        
      // Case 1: If all true (complete), make all false (incomplete)
      if (completedTodos === totalTodos) {
        for (var i = 0; i < totalTodos; i++) {
          this.todos[i].completed = false;
        }
      // Case 2:else: make all true (compl) 
      } else {
        for (var i = 0; i < totalTodos; i++) {
          this.todos[i].completed = true;
        }
      }
      this.displayTodos();
    }
  }
  }

// Select button using getElementById method (using HTML id)
  var displayTodosButton = document.getElementById('displayTodosButton');

// Add click event listener to run display function
  displayTodosButton.addEventListener('click', function() {
    todoList.displayTodos();
  });