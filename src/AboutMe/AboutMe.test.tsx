import { render } from "@testing-library/react";
import { AboutMe } from "./AboutMe";
import { Children } from "react";

jest.mock('../SharedComponents/Page/Page', () => {
    return {
        Page: ({ children }: {children: typeof Children}) => <>{children}</>
    };
});

describe('AboutMe', () => {
    it('should render the paragraphs section', () => {
        const { getByText, getAllByText } = render(<AboutMe />);

        getAllByText('About Me');
        getByText('Hey, I\'m Liam Johnson. Welcome! Have a seat. Take a look around.');
    });

    it('should render a lilst of skills', () => {
        const { getByAltText } = render(<AboutMe />);

        getByAltText('React');
        getByAltText('TypeScript');
        getByAltText('Flow');
        getByAltText('Vue');
        getByAltText('Webpack');
    });
});
