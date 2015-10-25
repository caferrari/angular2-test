/// <reference path="../typings/tsd.d.ts" />

import {bootstrap, Component, View} from 'angular2/angular2';

@Component({
    selector: 'app'
})

@View({
    template: `Leeroy {{ name }}!`
})

class App {

    name: string = 'jenkins'

}

bootstrap(App);
