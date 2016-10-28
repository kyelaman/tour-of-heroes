import { autoinject } from 'aurelia-framework';
import { EventAggregator, Subscription } from 'aurelia-event-aggregator';
import { Router } from 'aurelia-router';

import { Hero } from './hero';
import { HeroService } from './hero-service';

@autoinject()
export class Heroes {
  heroes: Hero[];
  selectedHero: Hero;
  addingHero = false;
  error: any;
  subscription: Subscription;

  constructor(
    private router: Router,
    private ea: EventAggregator,
    private heroService: HeroService) { }

  getHeroes(): void {
    this.heroService
      .getHeroes()
      .then(heroes => this.heroes = heroes)
      .catch(error => this.error = error);
  }

  addHero(): void {
    this.addingHero = true;
    this.selectedHero = null;
  }

  close(savedHero: Hero): void {
    this.addingHero = false;
    if (savedHero) { this.getHeroes(); }
  }

  deleteHero(hero: Hero): void {
    this.heroService
      .delete(hero)
      .then(res => {
        this.heroes = this.heroes.filter(h => h !== hero);
        if (this.selectedHero === hero) { this.selectedHero = null; }
      })
      .catch(error => this.error = error);
  }

  activate(): void {
    this.subscription = this.ea.subscribe('hero-detail-closed', newHero => {
      this.addingHero = false;
      if (newHero) {
        this.getHeroes();
      }
    });
    return this.getHeroes();
  }

  deactivate(): void {
    this.subscription.dispose();
  }

  onSelect(hero: Hero): void {
    this.selectedHero = hero;
    this.addingHero = false;
  }

  gotoDetail(): void {
    this.router.navigateToRoute('hero-detail', { id: this.selectedHero.id });
  }
}

export class UppercaseValueConverter {
  public toView(value) {
    return value && value.toUpperCase();
  }
}
