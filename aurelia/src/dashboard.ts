import {autoinject } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { HeroService } from './hero-service';
import { Hero } from './hero';

@autoinject()
export class DashboardComponent {
  heroes: Hero[] = [];

  constructor(
    private router: Router,
    private heroService: HeroService) {
  }

  activate(): void {
    this.heroService.getHeroes()
      .then(heroes => {
        this.heroes = heroes.slice(1, 5)
      });
  }

  gotoDetail(hero: Hero): void {
    this.router.navigateToRoute('hero-detail', { id: hero.id });
  }
}
