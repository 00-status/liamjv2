import { render } from "@testing-library/react";
import { Page } from "./Page";

describe('Page', () => {
    it('should render the contents', () => {
        const {getByText} = render(<Page title="Test">Banana</Page>);

        getByText("Banana");
    });

    it('should render the passed in title', () => {
        const {getByText} = render(<Page title="This is a test title">Test</Page>);

        getByText("This is a test title");
    });
});
