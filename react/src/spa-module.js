import React from 'react';
import ReactDOM from 'react-dom';
import App from './app.component';
import singleSpaReact from 'single-spa-react';

const reactLifecycles = singleSpaReact({
    React,
    ReactDOM,
    rootComponent: App,
    domElementGetter
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

export function domElementGetter() {
    let el = document.getElementById('react');
    if (!el) {
        el = document.createElement('div');
        el.id = 'react';
        document.getElementById('main-container').appendChild(el);
    }
    return el;
}
