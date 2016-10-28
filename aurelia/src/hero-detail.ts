import { autoinject, bindable, customElement } from 'aurelia-framework';
import { EventAggregator } from 'aurelia-event-aggregator';
import { Router } from 'aurelia-router';
import { Hero } from './hero';
import { HeroService } from './hero-service';

@autoinject()
@customElement('my-hero-detail')
export class HeroDetail {
  @bindable hero: Hero = new Hero();
  error: any;
  navigated = false; // true if navigated here

  constructor(
    private router: Router,
    private ea: EventAggregator,
    private heroService: HeroService) {
  }

  activate(params): void | Promise<any> {
    this.navigated = true;
    if (params.id) {
      const id = Number(params.id);
      return this.heroService.getHero(id)
        .then(hero => {
          this.hero = hero;
        });
    } else {
      this.hero = new Hero();
    }
  }

  save(): void {
    this.heroService
      .save(this.hero)
      .then(hero => {
        this.hero = hero; // saved hero, w/ id if new
        this.close(hero);
      })
      .catch(error => this.error = error); // TODO: Display error message
  }

  close(savedHero: Hero = null): void {
    this.ea.publish('hero-detail-closed', savedHero);

    if (this.navigated) {
      this.router.navigateBack();
    }
  }
}
