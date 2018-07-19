import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  todos: any[];
  todoInput: string;

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.dataService.getAllTodos().subscribe(todos => {
      this.todos = todos;
    });
  }

  addTodo() {
    console.log(this.todoInput);
    let newTodo = {
      title: this.todoInput,
      isDone: false
    }

    this.dataService.addTodo(newTodo).subscribe(res => {
      console.log('added');
      this.todos.push(res);
      this.todoInput = '';
    });
  }


  removeTodo(id) {
    this.dataService.removeTodo(id).subscribe(res => {
      console.log('deleted', res);
      this.todos.forEach((todo, i) => {
        if(todo._id === id) {
          this.todos.splice(i, 1);
        }
      });
    });
  }


  updateStatus(todo) {

    let _todo = {
      _id: todo._id,
      title: todo.title,
      isDone: !todo.isDone
    };

    console.log(_todo);

    this.dataService.updateStatus(_todo).subscribe(res => {
      console.log('updated', res);
      todo.isDone = !todo.isDone;
    });    

  }

}
