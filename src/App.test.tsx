import { render } from "@testing-library/react";
import { App } from "./App";

describe('App', () => {
    it('should render the base page', () => {
        const { getByText } = render(<App />);

        getByText("Liam Johnson");
        getByText("Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer congue risus vitae dolor tempus accumsan. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Curabitur eget condimentum felis. Morbi scelerisque augue tellus. Ut in pharetra massa. Sed placerat urna a tortor efficitur dignissim at quis ex. Fusce nec metus et tellus pulvinar maximus. Donec turpis ex, facilisis et lectus non, pretium eleifend orci.");
    });
});
