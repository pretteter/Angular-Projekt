import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { from } from 'rxjs';
import { EventPing } from 'src/app/_interface/eventping';
import { ToDo } from "../../_interface/todo";

@Component({
  selector: 'app-template-todo-form',
  templateUrl: './template-todo-form.component.html',
  styleUrls: ['./template-todo-form.component.scss']
})
export class TemplateTodoFormComponent implements OnInit {

  public toDo: ToDo;
  @Output() ping: EventEmitter<ToDo> = new EventEmitter<ToDo>();

  constructor() {
    this.toDo = {
      _id: undefined,
      label: undefined,
      status: false,
      position: undefined
    }
  }

  ngOnInit(): void {

  }

  public createToDo(event?: any): void {
    console.log("createToDo");
    this.ping.emit(this.toDo);

    this.toDo = {
      _id: undefined,
      label: undefined,
      status: false,
      position: undefined
    }

  }



}
