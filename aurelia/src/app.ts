import { Router, RouterConfiguration } from 'aurelia-router';
import {routes} from './app-routes';

export class App {
  public title = 'Tour of Heroes';
  public router: Router;

  public configureRouter(config: RouterConfiguration, router: Router) {
    config.title = 'Aurelia Tour of Heroes';
    config.map(routes);

    this.router = router;
  }
}
