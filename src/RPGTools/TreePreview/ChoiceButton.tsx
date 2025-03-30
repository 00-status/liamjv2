import { Button, ButtonTheme } from "../../SharedComponents/Button/Button";

type Props = {
    name: string;
    nextNodeID: number;
    type: string;
};

export const ChoiceButton = (props: Props) => {
    const { name, nextNodeID } = props;
    return <Button buttonTheme={ButtonTheme.Default}>
        {name}
    </Button>;
};
