import {RouteConfig} from 'aurelia-router';

export const routes : RouteConfig[] = [
  { route: ['', 'dashboard'], name: 'dashboard', moduleId: 'dashboard', nav: true, title: 'Dashboard'},
  { route: 'heroes', name: 'heroes', moduleId: 'heroes', nav: true, title: 'Heroes'},
  { route: 'detail/:id?', name: 'hero-detail', moduleId: 'hero-detail', nav: false}
];
