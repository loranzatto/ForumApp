import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommentListFormComponent } from './comment-list-form.component';

describe('CommentListFormComponent', () => {
  let component: CommentListFormComponent;
  let fixture: ComponentFixture<CommentListFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommentListFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommentListFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
