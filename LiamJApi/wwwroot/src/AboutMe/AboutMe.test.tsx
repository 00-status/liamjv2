import { render } from "@testing-library/react";
import { AboutMe } from "./AboutMe";

describe('AboutMe', () => {
    it('should render the paragraphs section', () => {
        const { getByText } = render(<AboutMe />);

        getByText('About Me');
        getByText('Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer congue risus vitae dolor tempus accumsan. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Curabitur eget condimentum felis. Morbi scelerisque augue tellus. Ut in pharetra massa. Sed placerat urna a tortor efficitur dignissim at quis ex. Fusce nec metus et tellus pulvinar maximus. Donec turpis ex, facilisis et lectus non, pretium eleifend orci.');
    });

    it('should render Cards section', () => {
        const { getByText } = render(<AboutMe />);

        getByText('Cards');
    });
});
