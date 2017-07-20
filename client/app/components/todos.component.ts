import { Component, OnInit } from '@angular/core';

import { TodoService } from './../services/todos.service';
import { Todo } from './../todo.model';

@Component({
  moduleId: module.id,
  selector: 'todos',
  templateUrl: 'todos.component.html'
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
}