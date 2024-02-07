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
        const { getByText, getByTitle } = render(<DiceRoller />);

        getByText('Dice Roller');
        getByText('Result');
        getByText('Dice Rolled');
        getByText('Log');

        getByTitle('dice 4');
        getByTitle('dice 6');
        getByTitle('dice 8');
        getByTitle('dice 10');
        getByTitle('dice 12');
        getByTitle('dice 20');
    });

    it('should render each component', async () => {
        const { queryByText, getByTitle, getByText } = render(<DiceRoller />);

        expect(queryByText('1d20')).toBeNull;
        await userEvent.click(getByTitle('dice 20'));
        getByText('1d20');
    });
});
