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
        getByText('Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer congue risus vitae dolor tempus accumsan. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Curabitur eget condimentum felis. Morbi scelerisque augue tellus. Ut in pharetra massa. Sed placerat urna a tortor efficitur dignissim at quis ex. Fusce nec metus et tellus pulvinar maximus. Donec turpis ex, facilisis et lectus non, pretium eleifend orci.');
    });

    it('should render Cards section', () => {
        const { getByText } = render(<AboutMe />);

        getByText('Cards');
    });
});
