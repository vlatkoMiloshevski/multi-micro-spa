import 'zone.js';
import * as singleSpa from 'single-spa';
import { SpaGlobalCommunicator } from './spa-intra-communicator'

(async function init() {
    const spaGlobalCommunicator = new SpaGlobalCommunicator();
    const loadingPromises = [];

    loadingPromises.push(bootstrapSpa('angularjs', '/angularjs', '/angularjs/spaModule.js', null, null));
    loadingPromises.push(bootstrapSpa('angular6', '/angular6', '/angular6/spaModule.js', '/angular6/store.js', spaGlobalCommunicator)); //, '/angular6/store.js', globalEventDistributor));
    loadingPromises.push(bootstrapSpa('ag6doubler', '/ag6doubler', '/ag6doubler/spaModule.js', '/ag6doubler/store.js', spaGlobalCommunicator));
    // wait until all stores are loaded and all apps are registered with singleSpa
    await Promise.all(loadingPromises);

    singleSpa.start();
})();



async function bootstrapSpa(name, hash, appURL, storeURL, globalEventDistributor) {
    let storeModule = {}, customProps = { globalEventDistributor: globalEventDistributor };

    // try to import the store module
    try {
        storeModule = storeURL ? await SystemJS.import(storeURL) : { storeInstance: null };
    } catch (e) {
        console.log(`Could not load store of app ${name}.`, e);
    }

    if (storeModule.storeInstance && globalEventDistributor) {
        // add a reference of the store to the customProps
        customProps.store = storeModule.storeInstance;
        // register the store with the globalEventDistributor
        globalEventDistributor.registerStore(storeModule.storeInstance);
    }

    // register the app with singleSPA and pass a reference to the store of the app as well as a reference to the globalEventDistributor
    singleSpa.registerApplication(name, () => SystemJS.import(appURL), hashPrefix(hash), customProps);
}


export function hashPrefix(prefix) {
    return function (location) {
        return location.hash.startsWith(`#${prefix}`);
    }
}