import { Hero } from './hero';

export class HeroService {
  getHeroes(): Promise<Hero[]> {
    let heroesCopy = heroes.map(hero => Object.assign({}, hero));

    return new Promise(resolve => resolve(heroesCopy));
  }

  getHero(id: number): Promise<Hero> {
    return this.getHeroes()
      .then(heroes => {
        const foundHero = heroes.find(hero => hero.id === id);

        return Object.assign({}, foundHero);
      });
  }

  save(hero: Hero): Promise<Hero> {
    return new Promise(resolve => {
      if (hero.id) {
        resolve(this.put(hero));
      }
      resolve(this.post(hero));
    });
  }

  delete(hero: Hero): Promise<null> {
    return new Promise(resolve => {
      const index = heroes.findIndex(h => h.id === hero.id);

      heroes.splice(index, 1);

      resolve();
    });
  }

  // Add new Hero
  private post(hero: Hero): Promise<Hero> {
    return new Promise(resolve => {
      const newHero = {
        id: Math.max(...heroes.map(hero => hero.id)) + 1,
        name: hero.name
      };

      heroes.push(newHero);

      resolve(newHero);
    });
  }

  // Update existing Hero
  private put(hero: Hero): Promise<Hero> {
    return new Promise(resolve => {
      const foundHero = heroes.find(h => h.id === hero.id);
      foundHero.name = hero.name;

      resolve(foundHero);
    });
  }
}

let heroes = [
  { id: 11, name: 'Mr. Nice' },
  { id: 12, name: 'Narco' },
  { id: 13, name: 'Bombasto' },
  { id: 14, name: 'Celeritas' },
  { id: 15, name: 'Magneta' },
  { id: 16, name: 'RubberMan' },
  { id: 17, name: 'Dynama' },
  { id: 18, name: 'Dr IQ' },
  { id: 19, name: 'Magma' },
  { id: 20, name: 'Tornado' }
];

