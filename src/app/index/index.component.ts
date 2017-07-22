import {Component, OnInit} from '@angular/core';
import {Title} from '@angular/platform-browser';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {
  baserUrl: string;
  stories = [
    {
      name: 'Ability to navigate back to resolution screen from link repair',
      code: 'MAS-123',
    },
    {
      name: 'Recipes',
      code: 'MAS-456',
    },
    {
      name: 'Work',
      code: 'MAS-789',
    }
  ];

  constructor(private title: Title) {
    this.baserUrl = 'ci01.dolphin.lexisnexisrisk.com';
  }

  ngOnInit() {
    this.title.setTitle('Generate Release');
  }

}
