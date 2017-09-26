import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {DraggableIssueListComponent} from './draggable-issue-list.component';

describe('DraggableIssueListComponent', () => {
  let component: DraggableIssueListComponent;
  let fixture: ComponentFixture<DraggableIssueListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DraggableIssueListComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DraggableIssueListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
