import { createContext, useCallback, useReducer, type ChangeEvent, type ReactElement } from "react";

/**
 *                      REDUCER CODE
 */

type StateType = {
    count: number;
    text: string;
}

export const initState: StateType = { 
    count: 0,
    text: '',
};


// Note: Using literals over enum because enum builds JS code at runtime,
// unlike with TypeScript types
// This increases bundle size, adding extra JS code to builds
// Enums also conflict with type stripping tools (esbuild)
type ReducerActionType = 'INCREMENT' | 'DECREMENT' | 'NEW_INPUT';

type ReducerAction = {
    type: ReducerActionType,
    payload?: string,
};

const reducer = (state: StateType, action: ReducerAction): StateType => {
    switch (action.type) {
        case 'INCREMENT':
            return { ...state, count: state.count + 1 };
        case 'DECREMENT':
            return { ...state, count: state.count - 1 };
        case 'NEW_INPUT':
            return { ...state, text: action.payload ?? '' }
        default: 
            throw new Error();
    }
}

/* Last of the reducer code, that would be in ReducerCounter if not using a context

const [state, dispatch] = useReducer(reducer, initState);

const increment = useCallback(() => dispatch({ type: 'INCREMENT' }),[]);
const decrement = useCallback(() => dispatch({ type: 'DECREMENT' }),[]);
const handleTextInput = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: 'NEW_INPUT', payload: e.target.value })
},[]);
*/

/**
 *                          CONTEXT CODE
 */

const useCounterContext = (initState: StateType) => {
    const [state, dispatch] = useReducer(reducer, initState);

    const increment = useCallback(() => dispatch({ type: 'INCREMENT' }),[]);
    const decrement = useCallback(() => dispatch({ type: 'DECREMENT' }),[]);
    const handleTextInput = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        dispatch({ type: 'NEW_INPUT', payload: e.target.value })
    },[]);

    return { state, increment, decrement, handleTextInput };
}

type UseCounterContextType = ReturnType<typeof useCounterContext>;

const initContextState: UseCounterContextType = {
    state: initState,
    increment: () => {},
    decrement: () => {},
    handleTextInput: (e: ChangeEvent<HTMLInputElement>) => {}
}

export const CounterContext = createContext<UseCounterContextType>(initContextState);

type ChildrenType = {
    children?: ReactElement | undefined;
}

export const CounterProvider = ({
    children, 
    ...initState
}: ChildrenType & StateType): ReactElement => {
    return (
        <CounterContext.Provider value={useCounterContext(initState)}>
            {children}
        </CounterContext.Provider>
    )
}