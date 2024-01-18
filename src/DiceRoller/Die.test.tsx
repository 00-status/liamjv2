import { render } from "@testing-library/react";
import { Die } from "./Die";
import userEvent from "@testing-library/user-event";

describe('Die', () => {
    it('should generate a number when the button is clicked', async () => {
        const testCallback = jest.fn();

        const { getByText } = render(<Die diceType={20} callback={testCallback} />);

        await userEvent.click(getByText(20));

        expect(testCallback).toHaveBeenCalledTimes(1);
    });
});
