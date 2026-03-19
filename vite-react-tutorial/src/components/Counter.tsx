import { type ReactNode } from 'react';
// import useState from 'react';

type CounterProps = {
    children: ReactNode;
    setCount: React.Dispatch<React.SetStateAction<number>>
}






// UP TO CH 14 5:41:39








const Counter = ({ children, setCount }: CounterProps) => {

    // If we wanted the state used only within this component, we would simply add
    // it directly to that component instead

    // const [count, setCount] = useState<number>(1);

    const increment = () => setCount(prev => prev + 1);
    const decrement = () => setCount(prev => (prev === 0) ? 0 : prev - 1);

    return (
        <>
            {/* <h1>Count is {count}</h1> */}
            {children}
            <button onClick={increment}>+</button>
            <button onClick={decrement}>-</button>
        </>
    );
}

export default Counter;