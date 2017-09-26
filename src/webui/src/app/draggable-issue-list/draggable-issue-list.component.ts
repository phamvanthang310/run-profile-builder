import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-draggable-issue-list',
  templateUrl: './draggable-issue-list.component.html',
  styleUrls: ['./draggable-issue-list.component.scss']
})
export class DraggableIssueListComponent implements OnInit {
  @Input() issues: Array<any>;

  constructor() {
    this.issues = [];
  }

  ngOnInit() {
  }

}
