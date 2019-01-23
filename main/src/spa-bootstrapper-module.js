import 'zone.js';
import * as singleSpaBootstrapper from 'single-spa';

(async function () {
    const loadingPromises = [];
    loadingPromises.push(bootstrapSPA('angularjs', '/angularjs', '/angularjs/spaModule.js'));
    loadingPromises.push(bootstrapSPA('angular6', '/angular6', '/angular6/spaModule.js'));
    loadingPromises.push(bootstrapSPA('react', '/react', '/react/spaModule.js'));
    // wait until all stores are loaded and all apps are registered with singleSpaBootstrapper
    await Promise.all(loadingPromises);
    singleSpaBootstrapper.start();
})();

// helpers
function bootstrapSPA(name, hash, appURL) {
    // register the app with singleSPA
    singleSpaBootstrapper.registerApplication(name, () => SystemJS.import(appURL), () => location.hash.startsWith(`#${hash}`));
}

