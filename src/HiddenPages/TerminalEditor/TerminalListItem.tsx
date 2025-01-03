
import "./server-item.css";
import { Button, ButtonTheme } from "../../SharedComponents/Button/Button";
import { TrashIcon } from "../../SharedComponents/Icons/TrashIcon";

type Props = {
    label: string
    onDelete: () => void;
    onClick: () => void;
};

export const TerminalListItem = (props: Props) => {
    const {label, onDelete, onClick } = props;

    return <div className="server-item">
        <div className="server-item__text" onClick={onClick}>
            {label}
        </div>
        <Button buttonTheme={ButtonTheme.Delete} onClick={onDelete}>
            <TrashIcon />
        </Button>
    </div>
};
