import { render } from "@testing-library/react";
import { App } from "./App";

describe('App', () => {
    it('should render hellow world', () => {
        const { getByText } = render(<App />);

        getByText("Hello world! 2");
    });
});
