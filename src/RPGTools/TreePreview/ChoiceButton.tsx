import { Button, ButtonTheme } from "../../SharedComponents/Button/Button";
import { ConditionOutcome } from "../DialogueTreeMaker/domain/types";

type Props = {
    name: string;
    nextNodeID: number;
    conditionOutcomes: Array<ConditionOutcome>;
    onClick: (nextNodeID: number, description: string, conditionOutcomes: Array<ConditionOutcome>) => void;
};

export const ChoiceButton = (props: Props) => {
    const { name, nextNodeID, conditionOutcomes, onClick } = props;
    return <Button onClick={() => onClick(nextNodeID, name, conditionOutcomes)} buttonTheme={ButtonTheme.Default}>
        {name}
    </Button>;
};
