import { PLATFORM } from 'aurelia-pal';
export class App {

  //method configure
  configureRouter(config, router) {
    config.map([      //we make an object and saying when the url and route matchs then what to do
      //line below in list '','list' means show whatver is in root or if u find router named list then do the rest
      //moduleId says to aurelia which router shoul load
      { route: ['', 'list'], moduleId: PLATFORM.moduleName('./module/list/list'), title: 'List', nav: true, name: 'list' },
      { route: 'about', moduleId: PLATFORM.moduleName('./module/about/about'), title: 'about', nav: true },
      { route: 'details/:id', moduleId: PLATFORM.moduleName('./module/details/details'), name: 'details' },
      {route: 'edit', moduleId: PLATFORM.moduleName('./module/edit/edit'), name: 'edit' }
      //{route: 'create', moduleId: PLATFORM.moduleName('./module/edit/edit'), name: 'edit' }
    ]);
    this.router = router;
    console.log('ROUTEr', this.router);
  }

}

