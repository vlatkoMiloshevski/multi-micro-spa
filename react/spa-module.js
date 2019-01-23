import React from 'react';
import ReactDOM from 'react-dom';
import App from './src/app.component';
import singleSpaReact from 'single-spa-react';

const reactLifecycles = singleSpaReact({
    React,
    ReactDOM,
    appComponent: App,
    getDomElement
});

export function bootstrap(props) {
    return reactLifecycles.bootstrap(props);
}

export function mount(props) {
    return reactLifecycles.mount(props);
}

export function unmount(props) {
    return reactLifecycles.unmount(props);
}

export function getDomElement() {
    let el = document.getElementById('approot');
    if (!el) {
        el = document.createElement('div');
        el.id = 'react';
    }
    return el;
}
