import { useDroppable } from "@dnd-kit/core";

import './cart-item.css';
import { Item } from "../domain/types";
import { Button, ButtonTheme } from "../../../SharedComponents/Button/Button";
import { TrashIcon } from "../../../SharedComponents/Icons/TrashIcon";

type Props = {
    id: string;
    item: Item | null;
};

export const CartItem = (props: Props) => {
    const { id, item } = props;
    const {setNodeRef} = useDroppable({id: id});

    if (!item) {
        return <div className="cart-item" ref={setNodeRef} />
    }

    return <div className="cart-item" ref={setNodeRef}>
        <div className="cart-item__header">
            <h3>
                {item?.name}
            </h3>
            <div>
                <Button buttonTheme={ButtonTheme.Subtle} onClick={() => {}} >
                    <TrashIcon />
                </Button>
            </div>
        </div>
        <div className="cart-item__body">
            <div>
                Cost: {item?.cost} {item?.currency}
            </div>
            <div>
                weight: {item?.weight}lb{Number(item.weight) > 1 ? "s" : ""}
            </div>
        </div>
    </div>;
};
