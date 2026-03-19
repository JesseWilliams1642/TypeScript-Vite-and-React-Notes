/**
 * Here we use the CounterContext to create hooks to grab count, text and the functions
 * ReducerCounter will get its state and functions through using these hooks
 */

import { useContext, type ChangeEvent } from "react";
import { CounterContext } from "../context/CounterContext";

type UseCounterHookType = {
    count: number,
    increment: () => void,
    decrement: () => void
}

export const useCounter = (): UseCounterHookType => {
    const { state: {count}, increment, decrement } = useContext(CounterContext);
    return { count, increment, decrement };
};

type UseCounterTextHookType = {
    text: string,
    handleTextInput: (e: ChangeEvent<HTMLInputElement>) => void
};

export const useCounterText = (): UseCounterTextHookType => {
    const { state: {text}, handleTextInput } = useContext(CounterContext);
    return { text, handleTextInput };
}