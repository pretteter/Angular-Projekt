import { Component, OnInit, OnDestroy } from '@angular/core';
import { ToDo } from '../_interface/todo';
import { EventPing } from '../_interface/eventping';
import { TestBed } from '@angular/core/testing';
import { DataService } from '../_service/data.service';
import { Subscription } from 'rxjs';
//import { read } from 'fs';
//import { Console } from 'console';
// import { analyzeAndValidateNgModules } from '@angular/compiler';
import { DragulaService } from 'ng2-dragula';

@Component({
  selector: 'app-page-list',
  templateUrl: './page-list.component.html',
  styleUrls: ['./page-list.component.scss'],
})
export class PageListComponent implements OnInit, OnDestroy {
  public toDoShow: boolean;
  public toDoDoneShow: boolean;
  public todos: ToDo[];
  public todosdone: ToDo[];
  public subs = new Subscription();

  constructor(
    public _dataService: DataService,
    public _dragulaService: DragulaService
  ) {
    this.toDoShow = true;
    this.toDoDoneShow = false;
    this.todos = [];
    this.todosdone = [];

    this.loadData();

    this._dragulaService.createGroup('todos', { removeOnSpill: false });

    this.subs.add(
      _dragulaService.drop('todos').subscribe(({ el }) => {
        this.position();
      })
    );
  }

  ngOnInit(): void {}

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

  public position(): void {
    let position = 0;
    this.todos.forEach((todo: ToDo) => {
      position += 1;
      todo.position = position;
      this._dataService.putToDo(todo).subscribe({
        next: () => {},
        error: (err) => {
          console.log(err);
        },
        complete: () => {
          console.log('position completed');
        },
      });
    });
  }

  public loadData(): void {
    this.todos = [];
    this.todosdone = [];
    this._dataService.getToDo().subscribe({
      next: (data: ToDo[]) => {
        data.forEach((toDo: ToDo) => {
          if (toDo.status === true) {
            this.todosdone.push(toDo);
          } else {
            this.todos.push(toDo);
          }
        });
        this.todos.sort((obj1, obj2) => {
          return obj1.position - obj2.position;
        });
      },
      error: (err) => {
        console.log(err);
      },
      complete: () => {
        console.log('load completed');
      },
    });

    // this._dataService.getStats().subscribe({

    //   next: (stats) => {
    //     console.log(stats)
    //     console.log("Anzahl an Einträgen " + stats?.count)
    //     console.log("Größe aller Einträge in bites " + stats.size)
    //     console.log("Durchschnittliche Größe eines Eintrages " + stats.avgObjSize)
    //     console.log("Scale-Faktor " + stats.scaleFactor)
    //     console.log("Speicherplatz insgesammt " + stats.storageSize)
    //     console.log("Freier Speicher " + stats.freeStorageSize)
    //   },
    //   error: (err) => { console.log(err) },
    //   complete: () => { console.log("stats completed") }

    // })
  }

  public create(event: ToDo): void {
    event.position = this.todos.length + 1;
    this._dataService.postToDo(event).subscribe({
      next: (data: ToDo) => {
        console.log(`%cSUC: "${data.label}" wurde erfolgreich erstellt`);
        this.todos.push(data);
        this.position();
      },
      error: (err) => {
        console.log('error while creating');
        console.log(err);
      },
      complete: () => {
        console.log('created completed');
      },
    });
  }

  public update(event: EventPing): void {
    if ('check' === event.label) {
      if (!event.object.status) {
        this.todosdone.splice(this.todosdone.indexOf(event.object), 1);
        this.todos.push(event.object);
      } else {
        this.todos.splice(this.todos.indexOf(event.object), 1);
        this.todosdone.push(event.object);
      }
    }

    if ('label' === event.label) {
      if (event.object.status) {
        this.todosdone.forEach((toDo: ToDo) => {
          if (toDo._id === event.object._id) {
            toDo.label = event.object.label;
          }
        });
      } else {
        this.todos.forEach((toDo: ToDo) => {
          if (toDo._id === event.object._id) {
            toDo.label = event.object.label;
          }
        });
      }
    }
    if ('delete' === event.label) {
      this.loadData();
    }
  }
}
