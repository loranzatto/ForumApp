import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TopicListFormComponent } from './topic-list-form.component';

describe('TopicListFormComponent', () => {
  let component: TopicListFormComponent;
  let fixture: ComponentFixture<TopicListFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TopicListFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TopicListFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
