import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TemplateTodoHeaderComponent } from './template-todo-header.component';

describe('TemplateTodoHeaderComponent', () => {
  let component: TemplateTodoHeaderComponent;
  let fixture: ComponentFixture<TemplateTodoHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TemplateTodoHeaderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TemplateTodoHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
