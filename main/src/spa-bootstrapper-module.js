import 'zone.js';
import * as singleSpaBootstrapper from 'single-spa';
import { SpaGlobalCommunicator } from './spa-intra-communicator'

(async function () {
    const loadingPromises = [];
    const spaGlobalCommunicator = new SpaGlobalCommunicator();

    // name, redirect/routing hash, application URL, store provider, URL, global event distributer
    loadingPromises.push(bootstrapSPA('angularjs', '/angularjs', '/angularjs/spaModule.js'));
    loadingPromises.push(bootstrapSPA('ng6', '/ng6', '/ng6/spaModule.js', '/ng6/store.js', spaGlobalCommunicator));
    loadingPromises.push(bootstrapSPA('app6', '/app6', '/app6/spaModule.js', '/app6/store.js', spaGlobalCommunicator));
    loadingPromises.push(bootstrapSPA('react', '/react', '/react/spaModule.js'));
    loadingPromises.push(bootstrapSPA('prebuypacing', '/prebuypacing', '/prebuypacing/spaModule.js'));
    loadingPromises.push(bootstrapSPA('prebuyassist', '/prebuyassist', '/prebuyassist/spaModule.js', '/prebuyassist/store.js', spaGlobalCommunicator));
    // wait until all stores are loaded and all apps are registered with singleSpaBootstrapper
    await Promise.all(loadingPromises);
    singleSpaBootstrapper.start();
})();

// helpers
async function bootstrapSPA(name, hash, appURL, storeURL, globalEventDistributor) {
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
    // register the app with singleSPA
    singleSpaBootstrapper.registerApplication(name, () => SystemJS.import(appURL), () => location.hash.startsWith(`#${hash}`), customProps);
}

