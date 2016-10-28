import { autoinject } from 'aurelia-framework';
import { HeroService } from './hero-service';

import { Hero } from './hero';

@autoinject()
export class HeroSearchService {
  constructor(private heroService: HeroService) { }

  public search(term: string): Promise<Hero[]> {
    return this.heroService
      .getHeroes()
      .then(heroes => heroes.filter( h => h.name.toUpperCase().includes(term.toUpperCase())));
  }
}
