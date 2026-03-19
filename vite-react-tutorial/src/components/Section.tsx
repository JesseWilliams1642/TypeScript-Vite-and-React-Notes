/**
 * In previous versions, React required you to use the React.FunctionalComponent, a.k.a. React.FC,
 * to create a component. This can be seen below.
 * 
 * Also, before React V18, children did not require an explicit type definition; it was implicitly defined prior.
 */

/*
import React from "react";

export const Section: React.FC<{ title: string }> = ({children, title}) => {
    return (
        <section>
            <h2>{title}</h2>
            <p>{children}</p>
        </section>
    );
}
*/

// We can now enjoy what we used before in Heading.tsx

// Children represents any React Node (basically ANY kind of content, really)
// that may be passed through to be displayed. This is the content that goes
// in between the componenent node:
//      <Section title="Blah blah"> CHILDREN CONTENT THAT IS PASSED THROUGH </Section>

import type { ReactNode } from "react";

type SectionProps = {
    title?: string;
    children: ReactNode;
}

export const Section = ({ children, title = "Default Heading" }: SectionProps) => {
    return (
        <section>
            <h2>{title}</h2>
            <p>{children}</p>
        </section>
    );
};

// Note: Section.defaultProps use to be used to set default values for components
// This has been deprecated