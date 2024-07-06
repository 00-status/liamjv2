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
        <div>
            {isOver ? 'OVER' : 'NOT OVER'}
        </div>
        <div>
            {item?.name} | {item?.cost}
        </div>
    </div>;
};
