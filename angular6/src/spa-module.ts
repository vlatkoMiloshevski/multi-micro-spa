import 'core-js/es7/reflect';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { enableProdMode } from '@angular/core';
import { MainModule } from './main-module';
import { environment } from '../environments/environment';
import { Router } from '@angular/router';

if (environment.production) {
    enableProdMode();
}

const spaProps = {
    bootstrappedModule: null,
    Router: Router
};

// This lifecycle function will be called by singleSPA exactly once, right before the registered application is mounted for the first time.
/* @ngInject */
export function bootstrap(props) {
    return Promise.resolve();
}


// This lifecycle function is called by singleSPA every time the route for this app is active and the app should be rendered.
/* @ngInject */
export function mount(props) {
    getDomElement();

    return platformBrowserDynamic([
        { provide: 'localStoreRef', useValue: props.store },
        { provide: 'globalEventDispatcherRef', useValue: props.globalEventDistributor }
    ]).bootstrapModule(MainModule).then(module => {
        return spaProps.bootstrappedModule = module;
    });
}

// This lifecycle function will be called when the user navigates away from this apps route.
/* @ngInject */
export function unmount(props) {
    
    return new Promise((resolve, reject) => {
        if (spaProps.Router) {
            const routerRef = spaProps.bootstrappedModule.injector.get(spaProps.Router);
            routerRef.dispose();
        }
        spaProps.bootstrappedModule.destroy();
        delete spaProps.bootstrappedModule;
        document.getElementById('approot6').innerHTML='';
        resolve();
    });
}

/* @ngInject */
function getDomElement() {
    // Make sure there is a div for us to render into
    let el = document.getElementById('approot6');
    if (!el) {
        el = document.createElement('approot6');
        el.id = 'approot6';
        document.getElementById('main-container').appendChild(el);
    }

    return el;
}