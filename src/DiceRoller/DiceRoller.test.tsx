import { render } from "@testing-library/react";
import { Children } from "react";
import { DiceRoller } from "./DiceRoller";
import userEvent from "@testing-library/user-event";

jest.mock('../SharedComponents/Page/Page', () => {
    return {
        Page: ({ children }: {children: typeof Children}) => <>{children}</>
    };
});

describe('DiceRoller.tsx', () => {
    it('should render each component', () => {
        const { getByText } = render(<DiceRoller />);

        getByText('Dice Roller');
        getByText('Result');
        getByText('Dice Rolled');
        getByText('Log');

        getByText('4');
        getByText('6');
        getByText('8');
        getByText('10');
        getByText('12');
        getByText('20');

        getByText('Custom Dice Rolling');
    });

    it('should render each component', async () => {
        const { queryByText, getByText } = render(<DiceRoller />);

        expect(queryByText('1d20')).toBeNull;
        await userEvent.click(getByText('20'));
        getByText('1d20');
    });
});
