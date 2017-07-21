"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var todos_service_1 = require("./../services/todos.service");
var TodosComponent = (function () {
    function TodosComponent(todoService) {
        this.todoService = todoService;
        this.todos = [];
    }
    TodosComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.todoService.getTodos().subscribe(function (todos) {
            _this.todos = todos;
        });
    };
    TodosComponent.prototype.addTodo = function (event, todotext) {
        var _this = this;
        var newTodo = {
            text: todotext.value,
            isCompleted: false
        };
        this.todoService.saveTodos(newTodo)
            .subscribe(function (res) {
            _this.todos.push(newTodo);
            todotext.value = '';
        });
    };
    TodosComponent.prototype.setEditState = function (todo, state) {
        if (state) {
            todo.isEditMode = state;
        }
        else {
            delete todo.isEditMode;
        }
    };
    TodosComponent.prototype.updateStatus = function (todo) {
        var _todo = {
            _id: todo._id,
            text: todo.text,
            isCompleted: !todo.isCompleted
        };
        return this.todoService.updateTodos(_todo)
            .subscribe(function (res) {
            todo.isCompleted = !todo.isCompleted;
        });
    };
    TodosComponent.prototype.updateTodoText = function (event, todo) {
        var _this = this;
        if (event.which === 13) {
            todo.text = event.target.value;
            var _todo = {
                _id: todo._id,
                text: todo.text,
                isCompleted: todo.isCompleted
            };
            this.todoService.updateTodos(_todo).subscribe(function (res) {
                _this.setEditState(todo, false);
            });
        }
    };
    /**
     * Delete Todos
     */
    TodosComponent.prototype.deleteTodo = function (todo) {
        var _this = this;
        this.todoService.deleteTodo(todo._id)
            .subscribe(function (data) {
            var existingTodo = _this.todos.filter(function (item) {
                if (item._id === todo._id) {
                    return item;
                }
            });
            _this.todos.splice(_this.todos.indexOf(todo), 1);
        });
    };
    TodosComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'todos',
            templateUrl: 'todos.component.html',
            styles: [
                "\n    .add-todo-form{\n      margin-top :70px;\n    }\n    "
            ]
        }),
        __metadata("design:paramtypes", [todos_service_1.TodoService])
    ], TodosComponent);
    return TodosComponent;
}());
exports.TodosComponent = TodosComponent;
//# sourceMappingURL=todos.component.js.map