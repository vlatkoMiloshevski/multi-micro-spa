
import { Action, createStore, Store } from 'redux';

export interface IAppState {
    helloMessage: string;
}

export const INITIAL_STATE: IAppState = {
    helloMessage: "No Regards"
};

export class CounterActions {
    static SAY_HELLO = 'SAY_HELLO';
    static HELLO_FROM_THE_OTHER_SIDE = 'HELLO_FROM_THE_OTHER_SIDE';

    sayHello(): Action {
        return { type: CounterActions.SAY_HELLO };
    }

    helloFromTheOtherSide(): Action {
        return { type: CounterActions.HELLO_FROM_THE_OTHER_SIDE };
    }
}

export function rootReducer(lastState: IAppState, action: Action): IAppState {
    switch (action.type) {
        case CounterActions.SAY_HELLO:
            return {
                ...lastState,
                helloMessage: "SAY_HELLO"
            };
        case CounterActions.HELLO_FROM_THE_OTHER_SIDE:
            return {
                ...lastState,
                helloMessage: "HELLO_FROM_THE_OTHER_SIDE"
            };
    }

    return lastState;
}

export const storeInstance: Store<IAppState> = createStore(rootReducer, INITIAL_STATE);