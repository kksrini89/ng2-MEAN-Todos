import { Component, OnInit } from '@angular/core';

import { TodoService } from './../services/todos.service';
import { Todo } from './../todo.model';

@Component({
  moduleId: module.id,
  selector: 'todos',
  templateUrl: 'todos.component.html',
  styles: [
    `
    .add-todo-form{
      margin-top :70px;
    }
    `
  ]
})

export class TodosComponent implements OnInit {
  todos: Todo[] = [];
  constructor(private todoService: TodoService) { }

  ngOnInit() {
    this.todoService.getTodos().subscribe(todos => {
      this.todos = todos;
    });
  }

  addTodo(event, todotext) {
    let newTodo = {
      text: todotext.value,
      isCompleted: false
    };
    this.todoService.saveTodos(newTodo)
      .subscribe(res => {
        this.todos.push(newTodo);
        todotext.value = '';
      });
  }

  setEditState(todo, state) {
    if (state) {
      todo.isEditMode = state;
    } else {
      delete todo.isEditMode;
    }
  }

  updateStatus(todo) {
    let _todo = {
      _id: todo._id,
      text: todo.text,
      isCompleted: !todo.isCompleted
    };
    return this.todoService.updateTodos(_todo)
      .subscribe(res => {
        todo.isCompleted = !todo.isCompleted;
      });
  }

  updateTodoText(event, todo) {
    if (event.which === 13) {
      todo.text = event.target.value;
      var _todo = {
        _id: todo._id,
        text: todo.text,
        isCompleted: todo.isCompleted
      }

      this.todoService.updateTodos(_todo).subscribe(res => {
        this.setEditState(todo, false);
      });
    }
  }

  /**
   * Delete Todos
   */
  public deleteTodo(todo) {
    this.todoService.deleteTodo(todo._id)
      .subscribe(data => {
        let existingTodo = this.todos.filter((item) => {
          if (item._id === todo._id) {
            return item;
          }
        });
        this.todos.splice(this.todos.indexOf(todo), 1);
      });
  }
}