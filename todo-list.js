var todoList = {

    todos: [],

    addTodo: function(todoText) {
        this.todos.push({
        todoText: todoText,
        completed: false
        });
    },

    changeTodo: function(position, todoText) {
        //this.todos[position] = todoText;
        // change just the property todoText
        this.todos[position].todoText = todoText;
    },

    deleteTodo: function(position) {
        this.todos.splice(position, 1);
    },

    toggleCompleted: function(position) {
        var todo = this.todos[position];
        todo.completed = !todo.completed;
    },

    toggleAll: function() {
        var totalTodos = this.todos.length;
        var completedTodos = 0;
        
        //Get number of completed todos
        for (var i = 0; i < totalTodos; i++) {
            if (this.todos[i].completed === true) {
                completedTodos++;
            }
        }
        
        // Case 1: If all true (completed), make all false (not completed)
        if (completedTodos === totalTodos) {
            for (var i = 0; i < totalTodos; i++) {
            this.todos[i].completed = false;
            }
        // Case 2: Else make all true (completed) 
        } else {
        for (var i = 0; i < totalTodos; i++) {
            this.todos[i].completed = true;
            }
        }
        }
    }

  // Handlers to call functions on button click and/or input entry
  var handlers = {
    addTodo: function() {
        var addTodoTextInput = document.getElementById('addTodoTextInput');
        todoList.addTodo(addTodoTextInput.value);
        addTodoTextInput.value = '';
        view.displayTodos();
    },
    changeTodo: function() {
        var changeTodoPositionInput = document.getElementById('changeTodoPositionInput');
        var changeTodoTextInput = document.getElementById('changeTodoTextInput');
        todoList.changeTodo(changeTodoPositionInput.valueAsNumber, changeTodoTextInput.value);
        changeTodoPositionInput.value = '';
        changeTodoTextInput.value = '';
        view.displayTodos();
    },
    deleteTodo: function() {
        var deleteTodoPositionInput = document.getElementById('deleteTodoPositionInput');
        todoList.deleteTodo(deleteTodoPositionInput.valueAsNumber);
        deleteTodoPositionInput.value = '';
        view.displayTodos();
    },
    toggleCompleted: function() {
        var toggleCompletedPositionInput = document.getElementById('toggleCompletedPositionInput');
        todoList.toggleCompleted(toggleCompletedPositionInput.valueAsNumber);
        toggleCompletedPositionInput.value = '';
        view.displayTodos();
    },
    toggleAll: function() {
        todoList.toggleAll();
        view.displayTodos();
    }
  };

// New object responsible for what the user sees
  var view = {
        displayTodos: function() {
            var todosUl = document.querySelector('ul');

            // Clear the unordered list before adding li elements
            todosUl.innerHTML = '';

            // Loop through each item in todos array and display it
            for (var i = 0; i < todoList.todos.length; i++) {
                var todoLi = document.createElement('li');
                var todo = todoList.todos[i]
                var todoTextWithCompletion = '';

                if (todo.completed === true) {
                    todoTextWithCompletion = '(x) ' + todo.todoText;
                } else {
                    todoTextWithCompletion = '( ) ' + todo.todoText;
                }

                // DOM manipulation
                // Set li element's textContent property equal to new string
                todoLi.textContent = todoTextWithCompletion;
                todosUl.appendChild(todoLi);
            }
        }
  }