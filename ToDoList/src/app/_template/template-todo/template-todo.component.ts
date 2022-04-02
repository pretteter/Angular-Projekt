import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Data } from '@angular/router';
import { from } from 'rxjs';
import { EventPing } from 'src/app/_interface/eventping';
import { ToDo } from "../../_interface/todo";
import { DataService } from "../../_service/data.service"

@Component({
  selector: 'app-template-todo',
  templateUrl: './template-todo.component.html',
  styleUrls: ['./template-todo.component.scss']
})
export class TemplateTodoComponent implements OnInit {

  @Input() toDo$: ToDo;
  @Output() ping: EventEmitter<any> = new EventEmitter<any>();

  constructor(public _dataService: DataService) { }


  ngOnInit(): void {
  }

  public changeCheck(event?: any): void {
    this.toDo$.status = !this.toDo$.status;
    this._dataService.putToDo(this.toDo$).subscribe((data: ToDo) => {
      const eventObject: EventPing = {
        label: "check",
        object: this.toDo$
      };
      this.ping.emit(eventObject);
    }, error => {
      console.log(`%cERROR: ${error.message}`);

    });


  }

  public changeLabel(event?: any): void {

    this._dataService.putToDo(this.toDo$).subscribe((data: ToDo) => {
      const eventObject: EventPing = {
        label: "label",
        object: this.toDo$
      };
      this.ping.emit(eventObject);
    }, error => {
      console.log(`%cERROR: ${error.message}`);

    });
  }



  public deleteToDo(event?: any): void {

    this._dataService.deleteToDo(this.toDo$).subscribe((data: ToDo) => {
      const eventObject: EventPing = {
        label: "delete",
        object: this.toDo$
      };
      this.ping.emit(eventObject);
    }, error => {

      console.log(`%cERROR: ${error.message}`);

    });
    window.location.reload();
  }
}
