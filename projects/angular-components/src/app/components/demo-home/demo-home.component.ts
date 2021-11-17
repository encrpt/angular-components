import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Converter } from 'showdown';

@Component({
  selector: 'app-demo-home',
  templateUrl: './demo-home.component.html',
  styleUrls: ['./demo-home.component.scss'],
})
export class DemoHomeComponent implements OnInit {
  msg = `
## git setup

add modules as git subtree to __src/core-modules__ in an angular project

    # bash
    # add remote
    git remote add modules http://***.git

    # create core-modules directory in your src directory
    md core-modules

    # only once
    git subtree add --prefix=src/core-modules modules master

    # pull
    git subtree pull --prefix=src/core-modules modules master
    # add material
    "@angular/material": "^10.1.3",
    "@angular/material-moment-adapter": "^10.1.3",
    # check other addtional peerDependencies in subdirs of projects (except angular-components, wich demonstrates the modules)

## component-projects

- /projects/matx - extends material.angular.io components
- /projects/ng-encrpt - mark search text using mark.js

## How this repo was initialized
    ng angular-components --create-application=false
    cd angular-components
    ng generate library matx
    ng generate application angular-components
    ng add @angular/material
          `;
  msgHtml: string;

  routes: any[];
  constructor(private router: Router) {}

  ngOnInit(): void {
    this.routes = this.router.config
      .filter((i) => i.component && i.path !== 'home')
      .map((i) => ({
        uri: i.path,
        label: i.component.name.replace('DemoComponent', ''),
        title: i.data ? i.data.title : '',
        description: i.data ? i.data.description : '',
      }));

    const converter = new Converter();
    this.msgHtml = converter.makeHtml(this.msg);
  }
}
