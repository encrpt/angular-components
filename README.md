## git setup

add modules as git subtree to **src/core-modules** in an angular project

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
