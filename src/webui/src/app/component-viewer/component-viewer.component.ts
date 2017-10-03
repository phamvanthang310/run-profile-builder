import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-component-viewer',
  templateUrl: './component-viewer.component.html',
  styleUrls: ['./component-viewer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ComponentViewerComponent implements OnInit {
  @Input() componentName;
  @Input() tableContent: any = null;

  constructor() {
    this.tableContent = {};
  }

  ngOnInit() {
  }

}
