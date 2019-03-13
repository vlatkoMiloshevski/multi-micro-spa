import { createStore } from 'redux';

const INITIAL_STATE = {
    helloMessage: ""
};

function reducer(lastState = INITIAL_STATE, action) {    switch (action.type) {
        case 'SAY_HELLO':
            return {
                ...lastState,
                helloMessage: "SAY_HELLO"
            };
        case 'HELLO_FROM_THE_OTHER_SIDE':
            return {
                ...lastState,
                helloMessage: "HELLO_FROM_THE_OTHER_SIDE"
            };
        default:
            return lastState;
    }
}

export const storeInstance = createStore(reducer);