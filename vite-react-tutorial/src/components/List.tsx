import type { ReactNode } from "react";

interface ListProps<T> {
    items: T[],
    render: (item: T) => ReactNode
};

// For generic componenets, we must put T, for the type
// else it does not recognise it as a generic and error
const List = <T,>({ items, render }: ListProps<T>) => {
    return (
        <ul>
            {items.map((item, i) => (
                <li key={i}>
                    {render(item)}
                </li>
            ))}
        </ul>
    );
};

export default List;