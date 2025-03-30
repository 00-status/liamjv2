import { Button, ButtonTheme } from "../../SharedComponents/Button/Button";

type Props = {
    name: string;
    nextNodeID: number;
    onClick: (nextNodeID: number, description: string) => void;
};

export const ChoiceButton = (props: Props) => {
    const { name, nextNodeID, onClick } = props;
    return <Button onClick={() => onClick(nextNodeID, name)} buttonTheme={ButtonTheme.Default}>
        {name}
    </Button>;
};
