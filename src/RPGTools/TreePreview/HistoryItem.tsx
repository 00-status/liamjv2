
import "./history-item.css";
import { DialogueHistory } from "./TreePreviewPage";

type Props = {
    history: DialogueHistory;
};

export const HistoryItem = (props: Props) => {
    const { description, character, isCentered } = props.history;

    const styles = character ? {color: character.nameColor} : undefined;

    const classes = "history-item" + (isCentered ? " history-item--centered" : "");

    return <div className={classes}>
        {character
            ? <div className="history-item__character" style={styles}>
                {`[${character?.name}]`}
            </div>
            : null
        }
        <div>
            {description}
        </div>
    </div>;
};
