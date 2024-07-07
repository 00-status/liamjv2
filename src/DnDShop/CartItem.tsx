import { useDroppable } from "@dnd-kit/core";

import './cart-item.css';
import { Item } from "./types";

type Props = {
    id: string;
    item: Item | null;
};

export const CartItem = (props: Props) => {
    const { id, item } = props;
    const {isOver, setNodeRef} = useDroppable({id: id});

    return <div className="cart-item" ref={setNodeRef}>
        <div className="cart-item__cost-container">
            <div className="cart-item__cost">
                {item?.cost}
            </div>
            {item?.currency}
        </div>
        {item?.name}
    </div>;
};
