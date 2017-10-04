import {ChangeDetectionStrategy, Component, HostListener, Input, OnInit} from '@angular/core';

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
  }

  ngOnInit() {
  }

  @HostListener('window:hashchange')
  onHashChange() {
    const hashValue = location.hash;
    this.tableContent.map(content => {
      content.isActive = false;
      return content;
    });

    const activeContent = this.tableContent.filter(content => content.link.indexOf(hashValue) > 0).pop();
    if (activeContent) {
      activeContent.isActive = true;
    }
  }
}
