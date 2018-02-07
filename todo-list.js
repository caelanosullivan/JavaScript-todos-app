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
        
        // Get number of completed todos
        this.todos.forEach(function(todo) {
            if (todo.completed === true) {
                completedTodos++;
            }
        });

        this.todos.forEach(function (todo) {
            // Case 1: If all true (completed), make all false
            if (completedTodos === totalTodos) {
                todo.completed = false;
            // Case 2: Else make all true (completed)
            } else {
                todo.completed = true;
            }
        });
    }
};

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
    deleteTodo: function(position) {
        todoList.deleteTodo(position);
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
            todoList.todos.forEach(function(todo, position) {
                var todoLi = document.createElement('li');
                var todoTextWithCompletion = '';

                if (todo.completed === true) {
                    todoTextWithCompletion = '(x) ' + todo.todoText;
                } else {
                    todoTextWithCompletion = '( ) ' + todo.todoText;
                }

                // Access element id by 'id' property
                todoLi.id = position;

                // DOM manipulation
                // Set li element's textContent property equal to new string
                todoLi.textContent = todoTextWithCompletion;

                // Append a delete button to each to-do item
                todoLi.appendChild(this.createDeleteButton());

                // Append the li element to the ul
                todosUl.appendChild(todoLi);
            }, this);

        },

        // Instead of adding event listeners on every delete button, we can add a single listener on the UL
        createDeleteButton: function() {
            //Create and return button per item
            var deleteButton = document.createElement('button');
            deleteButton.textContent = 'Delete';
            deleteButton.className = 'deleteButton';
            return deleteButton;
        },
        
        // Event delegation section for event listeners on the list
        setUpEventListeners: function() {
            var todosUl = document.querySelector('ul');
            
            todosUl.addEventListener('click', function (event) {
                
                // Get element clicked with 'target'; 'parentNode' gives li element
                //   console.log(event.target.parentNode.id);

                // Get the element that was clicked on.
                var elementClicked = event.target;

                // Check if element clicked is a delete button
                // parseInt argument grabs id from iteration off li
                if (elementClicked.className === 'deleteButton') {
                    handlers.deleteTodo(parseInt(elementClicked.parentNode.id));
                }
            });
        }
  };

  view.setUpEventListeners();