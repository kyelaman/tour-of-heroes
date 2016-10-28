import { autoinject } from 'aurelia-framework';
import { Router } from 'aurelia-router';

import { HeroSearchService } from './hero-search-service';
import { Hero } from './hero';

@autoinject()
export class HeroSearchCustomElement {
  heroes: Hero[] = [];
  private searchTerms = '';

  constructor(
    private heroSearchService: HeroSearchService,
    private router: Router) { }

  search(term: string): void {
    // Push a search term into the observable stream.
    this.heroSearchService.search(term)
      .then(results => this.heroes = results);
  }

  gotoDetail(hero: Hero): void {
    this.router.navigateToRoute('hero-detail', { id: hero.id });
  }
}
