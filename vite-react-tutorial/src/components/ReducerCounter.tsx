/**
 * useReducer manages complex state logic by using a dispatch() function to perform actions
 * on the states.
 * 
 * The use of dispatch() calls a reducer() function, which takes in its corresponding state
 * and an action defined when calling dispatch()
 * 
 * const [state, dispatch] = useReducer(reducer, initState);
 * 
 * Here, reducer is some function that takes in the state and an action, This action is what
 * is passed to dispatch() when it is called.
 * 
 * dispatch(action) = { return reducer(state,action); }         <-- General idea
 * 
 * This means we have detailed control over the state through a set of defined actions.
 * With useReducer, we can combine multiple useStates into a single state
 * 
 * We could simply have the reducer inside of this component, but then we could not share this
 * state globally with other components. In such a case, we use Contexts (see CounterContext).
 * 
 * We must wrap the component we want to use the state in a CounterProvider <CounterProvider></CounterProvider>,
 * which also helps define its initial state.
 * 
 * To use this state, we then create a hook (see UseCounter) to access the state variables and functionss.
 * These hooks can be seen used below to get count, text, increment, decrement and handleTextInput.
 */

import { type ReactNode } from 'react';
import { useCounter, useCounterText } from '../hooks/UseCounter';

type CounterProps = {
    children?: ReactNode;
}

const ReducerCounter = ({ children }: CounterProps) => {

    const { count, increment, decrement } = useCounter();
    const { text, handleTextInput } = useCounterText();

    return (
        <>
            <h1>Count is {count}</h1>
            {children}
            <button onClick={increment}>+</button>
            <button onClick={decrement}>-</button> <br />
            <input type = "text" onChange={handleTextInput} />
            <h2>{text}</h2>
        </>
    );
}

export default ReducerCounter;