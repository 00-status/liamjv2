import { useDroppable } from "@dnd-kit/core";

import './inventory-item.css';
import { Item } from "./types";

type Props = {
    id: string;
    item: Item | null;
};

export const InventoryItem = (props: Props) => {
    const { id, item } = props;
    const {isOver, setNodeRef} = useDroppable({id: id});

    return <div className="inventory-item" ref={setNodeRef}>
        <div>
            {isOver ? 'OVER' : 'NOT OVER'}
        </div>
        <div>
            {item?.name} | {item?.cost}
        </div>
    </div>;
};
