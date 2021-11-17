import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-demo-menu',
  templateUrl: './demo-menu.component.html',
  styleUrls: ['./demo-menu.component.scss'],
})
export class DemoMenuComponent implements OnInit {
  routes: any[];

  constructor(private router: Router) {}


  ngOnInit(): void {
    this.routes = this.router.config
      .filter((i) => i.path && i.path !== 'home')
      .map((i) => ({
          uri: i.path,
          label: i.component.name.replace('DemoComponent', ''),
          title: i.data ? i.data.title : '',
          description: i.data ? i.data.description : '',
        }));
  }
}
