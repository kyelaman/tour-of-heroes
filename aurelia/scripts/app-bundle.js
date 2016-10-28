define('app-routes',["require", "exports"], function (require, exports) {
    "use strict";
    exports.routes = [
        { route: ['', 'dashboard'], name: 'dashboard', moduleId: 'dashboard', nav: true, title: 'Dashboard' },
        { route: 'heroes', name: 'heroes', moduleId: 'heroes', nav: true, title: 'Heroes' },
        { route: 'detail/:id?', name: 'hero-detail', moduleId: 'hero-detail', nav: false }
    ];
});

define('app',["require", "exports", './app-routes'], function (require, exports, app_routes_1) {
    "use strict";
    var App = (function () {
        function App() {
            this.title = 'Tour of Heroes';
        }
        App.prototype.configureRouter = function (config, router) {
            config.title = 'Aurelia Tour of Heroes';
            config.map(app_routes_1.routes);
            this.router = router;
        };
        return App;
    }());
    exports.App = App;
});

define('hero',["require", "exports"], function (require, exports) {
    "use strict";
    var Hero = (function () {
        function Hero() {
        }
        return Hero;
    }());
    exports.Hero = Hero;
});

define('hero-service',["require", "exports"], function (require, exports) {
    "use strict";
    var HeroService = (function () {
        function HeroService() {
        }
        HeroService.prototype.getHeroes = function () {
            var heroesCopy = heroes.map(function (hero) { return Object.assign({}, hero); });
            return new Promise(function (resolve) { return resolve(heroesCopy); });
        };
        HeroService.prototype.getHero = function (id) {
            return this.getHeroes()
                .then(function (heroes) {
                var foundHero = heroes.find(function (hero) { return hero.id === id; });
                return Object.assign({}, foundHero);
            });
        };
        HeroService.prototype.save = function (hero) {
            var _this = this;
            return new Promise(function (resolve) {
                if (hero.id) {
                    resolve(_this.put(hero));
                }
                resolve(_this.post(hero));
            });
        };
        HeroService.prototype.delete = function (hero) {
            return new Promise(function (resolve) {
                var index = heroes.findIndex(function (h) { return h.id === hero.id; });
                heroes.splice(index, 1);
                resolve();
            });
        };
        HeroService.prototype.post = function (hero) {
            return new Promise(function (resolve) {
                var newHero = {
                    id: Math.max.apply(Math, heroes.map(function (hero) { return hero.id; })) + 1,
                    name: hero.name
                };
                heroes.push(newHero);
                resolve(newHero);
            });
        };
        HeroService.prototype.put = function (hero) {
            return new Promise(function (resolve) {
                var foundHero = heroes.find(function (h) { return h.id === hero.id; });
                foundHero.name = hero.name;
                resolve(foundHero);
            });
        };
        return HeroService;
    }());
    exports.HeroService = HeroService;
    var heroes = [
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
});

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
define('dashboard',["require", "exports", 'aurelia-framework', 'aurelia-router', './hero-service'], function (require, exports, aurelia_framework_1, aurelia_router_1, hero_service_1) {
    "use strict";
    var DashboardComponent = (function () {
        function DashboardComponent(router, heroService) {
            this.router = router;
            this.heroService = heroService;
            this.heroes = [];
        }
        DashboardComponent.prototype.activate = function () {
            var _this = this;
            this.heroService.getHeroes()
                .then(function (heroes) {
                _this.heroes = heroes.slice(1, 5);
            });
        };
        DashboardComponent.prototype.gotoDetail = function (hero) {
            this.router.navigateToRoute('hero-detail', { id: hero.id });
        };
        DashboardComponent = __decorate([
            aurelia_framework_1.autoinject(), 
            __metadata('design:paramtypes', [aurelia_router_1.Router, hero_service_1.HeroService])
        ], DashboardComponent);
        return DashboardComponent;
    }());
    exports.DashboardComponent = DashboardComponent;
});

define('environment',["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = {
        debug: true,
        testing: true
    };
});

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
define('hero-detail',["require", "exports", 'aurelia-framework', 'aurelia-event-aggregator', 'aurelia-router', './hero', './hero-service'], function (require, exports, aurelia_framework_1, aurelia_event_aggregator_1, aurelia_router_1, hero_1, hero_service_1) {
    "use strict";
    var HeroDetail = (function () {
        function HeroDetail(router, ea, heroService) {
            this.router = router;
            this.ea = ea;
            this.heroService = heroService;
            this.hero = new hero_1.Hero();
            this.navigated = false;
        }
        HeroDetail.prototype.activate = function (params) {
            var _this = this;
            this.navigated = true;
            if (params.id) {
                var id = Number(params.id);
                return this.heroService.getHero(id)
                    .then(function (hero) {
                    _this.hero = hero;
                });
            }
            else {
                this.hero = new hero_1.Hero();
            }
        };
        HeroDetail.prototype.save = function () {
            var _this = this;
            this.heroService
                .save(this.hero)
                .then(function (hero) {
                _this.hero = hero;
                _this.close(hero);
            })
                .catch(function (error) { return _this.error = error; });
        };
        HeroDetail.prototype.close = function (savedHero) {
            if (savedHero === void 0) { savedHero = null; }
            this.ea.publish('hero-detail-closed', savedHero);
            if (this.navigated) {
                this.router.navigateBack();
            }
        };
        __decorate([
            aurelia_framework_1.bindable, 
            __metadata('design:type', hero_1.Hero)
        ], HeroDetail.prototype, "hero", void 0);
        HeroDetail = __decorate([
            aurelia_framework_1.autoinject(),
            aurelia_framework_1.customElement('my-hero-detail'), 
            __metadata('design:paramtypes', [aurelia_router_1.Router, aurelia_event_aggregator_1.EventAggregator, hero_service_1.HeroService])
        ], HeroDetail);
        return HeroDetail;
    }());
    exports.HeroDetail = HeroDetail;
});

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
define('hero-search-service',["require", "exports", 'aurelia-framework', './hero-service'], function (require, exports, aurelia_framework_1, hero_service_1) {
    "use strict";
    var HeroSearchService = (function () {
        function HeroSearchService(heroService) {
            this.heroService = heroService;
        }
        HeroSearchService.prototype.search = function (term) {
            return this.heroService
                .getHeroes()
                .then(function (heroes) { return heroes.filter(function (h) { return h.name.toUpperCase().includes(term.toUpperCase()); }); });
        };
        HeroSearchService = __decorate([
            aurelia_framework_1.autoinject(), 
            __metadata('design:paramtypes', [hero_service_1.HeroService])
        ], HeroSearchService);
        return HeroSearchService;
    }());
    exports.HeroSearchService = HeroSearchService;
});

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
define('hero-search',["require", "exports", 'aurelia-framework', 'aurelia-router', './hero-search-service'], function (require, exports, aurelia_framework_1, aurelia_router_1, hero_search_service_1) {
    "use strict";
    var HeroSearchCustomElement = (function () {
        function HeroSearchCustomElement(heroSearchService, router) {
            this.heroSearchService = heroSearchService;
            this.router = router;
            this.heroes = [];
            this.searchTerms = '';
        }
        HeroSearchCustomElement.prototype.search = function (term) {
            var _this = this;
            this.heroSearchService.search(term)
                .then(function (results) { return _this.heroes = results; });
        };
        HeroSearchCustomElement.prototype.gotoDetail = function (hero) {
            this.router.navigateToRoute('hero-detail', { id: hero.id });
        };
        HeroSearchCustomElement = __decorate([
            aurelia_framework_1.autoinject(), 
            __metadata('design:paramtypes', [hero_search_service_1.HeroSearchService, aurelia_router_1.Router])
        ], HeroSearchCustomElement);
        return HeroSearchCustomElement;
    }());
    exports.HeroSearchCustomElement = HeroSearchCustomElement;
});

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
define('heroes',["require", "exports", 'aurelia-framework', 'aurelia-event-aggregator', 'aurelia-router', './hero-service'], function (require, exports, aurelia_framework_1, aurelia_event_aggregator_1, aurelia_router_1, hero_service_1) {
    "use strict";
    var Heroes = (function () {
        function Heroes(router, ea, heroService) {
            this.router = router;
            this.ea = ea;
            this.heroService = heroService;
            this.addingHero = false;
        }
        Heroes.prototype.getHeroes = function () {
            var _this = this;
            this.heroService
                .getHeroes()
                .then(function (heroes) { return _this.heroes = heroes; })
                .catch(function (error) { return _this.error = error; });
        };
        Heroes.prototype.addHero = function () {
            this.addingHero = true;
            this.selectedHero = null;
        };
        Heroes.prototype.close = function (savedHero) {
            this.addingHero = false;
            if (savedHero) {
                this.getHeroes();
            }
        };
        Heroes.prototype.deleteHero = function (hero) {
            var _this = this;
            this.heroService
                .delete(hero)
                .then(function (res) {
                _this.heroes = _this.heroes.filter(function (h) { return h !== hero; });
                if (_this.selectedHero === hero) {
                    _this.selectedHero = null;
                }
            })
                .catch(function (error) { return _this.error = error; });
        };
        Heroes.prototype.activate = function () {
            var _this = this;
            this.subscription = this.ea.subscribe('hero-detail-closed', function (newHero) {
                _this.addingHero = false;
                if (newHero) {
                    _this.getHeroes();
                }
            });
            return this.getHeroes();
        };
        Heroes.prototype.deactivate = function () {
            this.subscription.dispose();
        };
        Heroes.prototype.onSelect = function (hero) {
            this.selectedHero = hero;
            this.addingHero = false;
        };
        Heroes.prototype.gotoDetail = function () {
            this.router.navigateToRoute('hero-detail', { id: this.selectedHero.id });
        };
        Heroes = __decorate([
            aurelia_framework_1.autoinject(), 
            __metadata('design:paramtypes', [aurelia_router_1.Router, aurelia_event_aggregator_1.EventAggregator, hero_service_1.HeroService])
        ], Heroes);
        return Heroes;
    }());
    exports.Heroes = Heroes;
    var UppercaseValueConverter = (function () {
        function UppercaseValueConverter() {
        }
        UppercaseValueConverter.prototype.toView = function (value) {
            return value && value.toUpperCase();
        };
        return UppercaseValueConverter;
    }());
    exports.UppercaseValueConverter = UppercaseValueConverter;
});

define('main',["require", "exports", './environment'], function (require, exports, environment_1) {
    "use strict";
    Promise.config({
        warnings: {
            wForgottenReturn: false
        }
    });
    function configure(aurelia) {
        aurelia.use
            .standardConfiguration()
            .feature('resources');
        if (environment_1.default.debug) {
            aurelia.use.developmentLogging();
        }
        if (environment_1.default.testing) {
            aurelia.use.plugin('aurelia-testing');
        }
        aurelia.start().then(function () { return aurelia.setRoot(); });
    }
    exports.configure = configure;
});

define('resources/index',["require", "exports"], function (require, exports) {
    "use strict";
    function configure(config) {
    }
    exports.configure = configure;
});

define('text!app.html', ['module'], function(module) { module.exports = "<template>\n    <require from=\"./app.css\"></require>\n    <h1>${title}</h1>\n    <div class=\"header-bar\"></div>\n    <nav>\n      <a repeat.for=\"route of router.navigation\" href.bind=\"route.href\">${route.title}</a>\n    </nav>\n    <router-view></router-view>\n</template>\n"; });
define('text!app.css', ['module'], function(module) { module.exports = "h2 { color: #444; font-weight: lighter; }\nbody { margin: 2em; }\nbody, input[text], button { color: #888; font-family: Cambria, Georgia; }\nbutton { padding: 0.2em; font-size: 14px}\n* { font-family: Arial; }\n\n\nh1 {\n  font-size: 1.2em;\n  color: #999;\n  color: #555;\n  margin-bottom: 0;\n}\nh2 {\n  font-size: 2em;\n  margin-top: 0;\n  padding-top: 0;\n}\nnav a {\n  padding: 5px 10px;\n  text-decoration: none;\n  margin-top: 10px;\n  display: inline-block;\n  background-color: #eee;\n  border-radius: 4px;\n}\nnav a:visited, a:link {\n  color: #607D8B;\n}\nnav a:hover {\n  color: #039be5;\n  background-color: #CFD8DC;\n}\nnav a.router-link-active {\n  color: #039be5;\n}\n.header-bar {\n  background-color: rgb(0,120,215);\n  height: 4px;\n  margin-top: 10px;\n  margin-bottom: 10px;\n}\n"; });
define('text!dashboard.html', ['module'], function(module) { module.exports = "<template>\n  <require from=\"./dashboard.css\"></require>\n  <require from=\"./hero-search\"></require>\n\t<h3>Top Heroes</h3>\n\t<div class=\"grid grid-pad\">\n\t\t<div repeat.for=\"hero of heroes\" click.delegate=\"gotoDetail(hero)\" class=\"col-1-4\">\n\t\t\t<div class=\"module hero\">\n\t\t\t\t<h4>${hero.name}</h4>\n\t\t\t</div>\n\t\t</div>\n\t</div>\n\t<hero-search></hero-search>\n</template>\n"; });
define('text!dashboard.css', ['module'], function(module) { module.exports = "[class*='col-'] {\n  float: left;\n}\n*, *:after, *:before {\n\t-webkit-box-sizing: border-box;\n\t-moz-box-sizing: border-box;\n\tbox-sizing: border-box;\n}\nh3 {\n  text-align: center; margin-bottom: 0;\n}\n[class*='col-'] {\n  padding-right: 20px;\n  padding-bottom: 20px;\n}\n[class*='col-']:last-of-type {\n  padding-right: 0;\n}\n.grid {\n  margin: 0;\n  display: inline-block;\n}\n.col-1-4 {\n  width: 25%;\n}\n.module {\n\tpadding: 20px;\n\ttext-align: center;\n\tcolor: #eee;\n\tmax-height: 120px;\n\tmin-width: 120px;\n\tbackground-color: #607D8B;\n  background-color: rgb(0,120,215);\n\tborder-radius: 2px;\n}\nh4 {\n  position: relative;\n}\n.module:hover {\n  background-color: #EEE;\n  background-color: #CCC;\n  cursor: pointer;\n  color: #607d8b;\n}\n.grid-pad {\n  padding: 10px 0;\n}\n.grid-pad > [class*='col-']:last-of-type {\n  padding-right: 20px;\n}\n@media (max-width: 600px) {\n\t.module {\n\t  font-size: 10px;\n\t  max-height: 75px;\n  }\n  .col-1-4 {\n    width: 50%;\n  }\n}\n@media (max-width: 1024px) {\n\t.grid {\n\t  margin: 0;\n\t}\n\t.module {\n\t  min-width: 60px;\n\t}\n}\n"; });
define('text!hero-detail.html', ['module'], function(module) { module.exports = "<template>\n  <require from=\"hero-detail.css\"></require>\n\t<div if.bind=\"hero\" class=\"hero-details\">\n\t\t<h2>${hero.name} details!</h2>\n\t\t<div>\n\t\t\t<label>id: </label>${hero.id}</div>\n\t\t<div>\n\t\t\t<label>name: </label>\n\t\t\t<input value.bind=\"hero.name\" placeholder=\"name\" />\n\t\t</div>\n\t\t<button click.delegate=\"goBack()\">Back</button>\n\t\t<button click.delegate=\"save()\">Save</button>\n\t</div>\n</template>\n"; });
define('text!hero-detail.css', ['module'], function(module) { module.exports = ".hero-details label {\n  display: inline-block;\n  width: 3em;\n  margin: .5em 0;\n  color: #607D8B;\n  color: rgb(0,120,215);\n  font-weight: bold;\n}\n.hero-details input {\n  height: 2em;\n  font-size: 1em;\n  padding-left: .4em;\n}\n.hero-details button {\n  margin-top: 20px;\n  font-family: Arial;\n  background-color: #eee;\n  border: none;\n  padding: 5px 10px;\n  border-radius: 4px;\n  cursor: pointer; cursor: hand;\n}\n.hero-details button:hover {\n  background-color: #cfd8dc;\n}\n.hero-details button:disabled {\n  background-color: #eee;\n  color: #ccc;\n  cursor: auto;\n}\n"; });
define('text!hero-search.html', ['module'], function(module) { module.exports = "<template>\n  <require from=\"./hero-search.css\"></require>\n\t<div>\n\t\t<h4>Hero Search</h4>\n\t\t<input ref=\"searchBox\" keyup.delegate=\"search(searchBox.value) & debounce:300\" />\n\t\t<div>\n\t\t\t<div repeat.for=\"hero of heroes\" click.delegate=\"gotoDetail(hero)\" class=\"search-result\">\n\t\t\t\t${hero.name}\n\t\t\t</div>\n\t\t</div>\n\t</div>\n</template>\n"; });
define('text!hero-search.css', ['module'], function(module) { module.exports = ".search-result{\n  border-bottom: 1px solid gray;\n  border-left: 1px solid gray;\n  border-right: 1px solid gray;\n  width:195px;\n  height: 20px;\n  padding: 5px;\n  background-color: white;\n  cursor: pointer;\n}\n\n#search-box{\n  width: 200px;\n  height: 20px;\n  border: 1px solid lightgray;\n}\n"; });
define('text!heroes.html', ['module'], function(module) { module.exports = "<template>\n  <require from=\"./heroes.css\"></require>\n  <require from=\"./hero-detail\"></require>\n\t<h2>My Heroes</h2>\n\t<ul class=\"heroes\">\n\t\t<li repeat.for=\"hero of heroes\" click.delegate=\"onSelect(hero)\" class=\"${hero === selectedHero ? 'selected' : '' }\">\n\t\t\t<span class=\"hero-element\">\n      <span class=\"badge\">${hero.id}</span> ${hero.name}\n\t\t\t</span>\n\t\t\t<button class=\"delete-button\" click.delegate=\"deleteHero(hero, $event)\">Delete</button>\n\t\t</li>\n\t</ul>\n\n\t<div class=\"error\" if.bind=\"error\">${error}</div>\n\t<button click.delegate=\"addHero()\">Add New Hero</button>\n\t<div if.bind=\"addingHero\">\n\t\t<my-hero-detail></my-hero-detail>\n\t</div>\n\n\t<div if.bind=\"selectedHero\">\n\t\t<h2>\n\t\t\t${selectedHero.name | uppercase} is my hero\n\t\t</h2>\n\t\t<button click.delegate=\"gotoDetail()\">View Details</button>\n\t</div>\n</template>\n"; });
define('text!heroes.css', ['module'], function(module) { module.exports = ".selected {\n  background-color: #CFD8DC !important;\n  background-color: rgb(0,120,215) !important;\n  color: white;\n}\n.heroes {\n  margin: 0 0 2em 0;\n  list-style-type: none;\n  padding: 0;\n  width: 15em;\n}\n.heroes li {\n  cursor: pointer;\n  position: relative;\n  left: 0;\n  background-color: #EEE;\n  margin: .5em;\n  padding: .3em 0;\n  height: 1.6em;\n  border-radius: 4px;\n}\n.heroes li:hover {\n  color: #607D8B;\n  color: rgb(0,120,215);\n  background-color: #DDD;\n  left: .1em;\n}\n.heroes li.selected:hover {\n  /*background-color: #BBD8DC !important;*/\n  color: white;\n}\n.heroes .text {\n  position: relative;\n  top: -3px;\n}\n.heroes .badge {\n  display: inline-block;\n  font-size: small;\n  color: white;\n  padding: 0.8em 0.7em 0 0.7em;\n  background-color: #607D8B;\n  background-color: rgb(0,120,215);\n  line-height: 1em;\n  position: relative;\n  left: -1px;\n  top: -4px;\n  height: 1.8em;\n  margin-right: .8em;\n  border-radius: 4px 0 0 4px;\n}\nbutton {\n  font-family: Arial;\n  background-color: #eee;\n  border: none;\n  padding: 5px 10px;\n  border-radius: 4px;\n  cursor: pointer;\n  cursor: hand;\n}\nbutton:hover {\n  background-color: #cfd8dc;\n}\n.error {color:red;}\nbutton.delete-button{\n  float:right;\n  background-color: gray !important;\n  background-color: rgb(216,59,1) !important;\n  color:white;\n}\n"; });
//# sourceMappingURL=app-bundle.js.map