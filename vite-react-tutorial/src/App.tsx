/*

Chapters 12 to 17 of:
"Typescript Full Course for Beginners | Complete All-in-One Tutorial | 8 Hours",
by Dave Gray
https://www.youtube.com/watch?v=gieEQFIfgYc&ab_channel=DaveGray

Made by doing the command:
npm create vite@latest,
and choosing React + Typescript

*/

/**
 * React Hooks are functions that let you "hook into" React features, such
 * as its state management, lifecycle and context, while inside of functional components
 * 
 * Hooks let you: manage state, run side effects (e.g. API calls), access context and reuse 
 * logic across componenets.
 * 
 * Common hooks include useState, useEffect, 
 */

import { useCallback, useEffect, useMemo, useRef, useState, type KeyboardEvent, type MouseEvent } from "react";
import Counter from "./components/Counter";
import Heading from "./components/Heading";
import { Section } from "./components/Section";
import List from "./components/List";
import ReducerCounter from "./components/ReducerCounter";
import { CounterProvider, initState } from "./context/CounterContext";

function App() {

  // Use state is used track states (e.g. count), which is used
  // and updated for one or more components during use

  // useState usually does not need <Type>, it can infer it
  // We then put in the default value as the parameter
  const [count, setCount] = useState<number>(1);
  const [incrementValue, _] = useState<number>(1);
  const [myValue, setMyValue] = useState<number>(20);

  /**
   * useRef creates a reference, which are values that when changed DOES NOT 
   * trigger re-rendering 
   * 
   * They are then accessed via referenceName.current
   *  
   */

  const inputRef = useRef<HTMLInputElement>(null);
  console.log(inputRef.current);

  /**
   * useEffect deals with side effects
   * 
   * Side effects are any operation that isn't simply calculating and returning JSX
   * These include: fetching data via API, updating DOM manually, setting timers
   * (e.g. setTimeout, setInterval), subscribing/unsubscribing to events, writing to
   * storage, and logging
   * 
   */ 

  useEffect(() => {

    // When using Strict mode, it mounts->unmounts->mounts the contents of useEffect
    // This means that the contents will be ran twice

    console.log("Mounting");
    console.log(count);

    // Note: useEffect returns an anonymous function that is called, which can be void
    return () => console.log("Unmounting");
    //return;

    /**
     *                      !!!!!!IMPORTANT!!!!!
     * 
     * The below array is called the dependency array
     * useEffect will always run on the first render
     * 
     * useEffect will re-run only if the states set in the array is edited
     * If [] is empty, the useEffect runs after every render instead
     * 
     * In this case, count will be logged on first render and to the console every 
     * time it is updated
     * 
     */

  }, [count]);

  /**
   * useCallback memoises functions so that it does not need to be recreated every render
   * 
   * It is useful when passing functions to memoised children, and for functions that
   * use dependency arrays.
   * 
   * useCallback has its own dependency array. It will only update the function if the states
   * in that dependency array changes.
   * 
   * We would also, e.g. for useEffect, put the used callback function in its dependency array
   * 
   */

  // The below callback function will only be reevaluated if incrementValue changes
  // If [] was empty, it would never be reevaluated and be kept in memory as initially defined
  // Note: Using MouseEvent and KeyboardEvent is a bit extra here!
  const incrementCount = useCallback(
    (e: MouseEvent<HTMLButtonElement> | KeyboardEvent<HTMLButtonElement>): void => 
      setMyValue(prev => prev + incrementValue), [incrementValue]
  );

  /**
   * useMemo memoises a value
   * This is used for storing the results of an expensive calculation, that we
   * do not want to have to recalculate again for each render
   * 
   * Once again, we have a dependency array where the result is recalculated only
   * if the states in the array change
   */

  const fib = (n: number): number => {
    if (n<2) return n;
    return fib(n - 1) + fib(n - 2);
  }

  const result: number = useMemo<number>(() => fib(myValue), [myValue]);

  return (
    // Note: You can only return one element at a time
    // Hence, we wrap everything in a React Fragment <></>
    <>  
      <Heading title="We are learning React!" />
      
      <Section>
        Hi! <p> My name is Jesse </p>
      </Section>

      <Counter setCount={setCount}>Count is {count}</Counter>
      
      <List items={["Coffee","Tacos","Code"]} 
        render={(item: string) =>  <span className="gold bold">{item}</span>} />

      <h3>{myValue}! = {result}</h3>
      <button onClick={incrementCount}>Increment Fib Number Value</button>

      { /* Reducer+Context User Example */ }
      <CounterProvider count={initState.count} text={initState.text}>
        <ReducerCounter></ReducerCounter>
      </CounterProvider>
      

    </>
  );
  
}

export default App
