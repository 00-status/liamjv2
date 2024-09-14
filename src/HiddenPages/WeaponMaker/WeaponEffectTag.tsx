import { Button, ButtonTheme } from "../../SharedComponents/Button/Button";
import { TrashIcon } from "../../SharedComponents/Icons/TrashIcon";

type Props = {
    tag: string;
    onDeleteTag: (tag: string) => void;
};

export const WeaponEffectTag = (props: Props) => {
    return <div>
        {props.tag}
        <Button buttonTheme={ButtonTheme.Delete} onClick={() => props.onDeleteTag(props.tag)}>
            <TrashIcon />
        </Button>
    </div>;
};