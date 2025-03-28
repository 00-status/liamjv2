
import './hidden-info-item.css';
import { Button, ButtonTheme } from "../../../../SharedComponents/Button/Button";
import { TrashIcon } from "../../../../SharedComponents/Icons/TrashIcon";
import { HiddenInfo } from "../../domain/types";
import { PencilIcon } from '../../../../SharedComponents/Icons/PencilIcon';

type Props = {
    hiddenInfo: HiddenInfo;
    onDelete: (id: string) => void;
    onEdit: () => void;
};

export const HiddenInfoItem = (props: Props) => {
    const { hiddenInfo, onEdit, onDelete } = props;
    return <div className="hidden-info-item">
        <div className="hidden-info-item__segment">
            {hiddenInfo.conditionIDs.map((condition) => {
                return <div key={condition.id}>
                    {condition.name}
                </div>;
            })}
        </div>
        <div className='hidden-info-item__segment'>
            {hiddenInfo.description}
        </div>
        <div className="hidden-info-item__segment--actions">
            <Button onClick={onEdit}><PencilIcon /></Button>
            <Button onClick={() => onDelete(hiddenInfo.id)} buttonTheme={ButtonTheme.Delete}><TrashIcon /></Button>
        </div>
    </div>;
};
