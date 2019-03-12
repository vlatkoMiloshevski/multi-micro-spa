import singleSpaAngular1 from 'single-spa-angular1';
import angular from 'angular';

import './src/app.module.js';
import './src/routes.js';

const angularLifecycles = singleSpaAngular1({
    angular,
    domElementGetter,
    mainAngularModule: 'app',
    uiRouter: true,
    preserveGlobal: false,
});

export function bootstrap(props) {
    return angularLifecycles.bootstrap(props);
}

export function mount(props) {
    return angularLifecycles.mount(props);
}

export function unmount(props) {
    return angularLifecycles.unmount(props);
}

function domElementGetter() {
    let el = document.getElementById('angularjs');
    if (!el) {
        el = document.createElement('div');
        el.id = 'angularjs';
        document.getElementById('main-container').appendChild(el);
    }

    return el;
}
