import { useDroppable } from "@dnd-kit/core";

import { Item } from "./types";

type Props = {
    id: string;
    item: Item | null
};

export const Inventory = (props: Props) => {
    const {isOver, setNodeRef} = useDroppable({id: props.id});

    return <div style={{backgroundColor: 'red', height: '100px'}} ref={setNodeRef}>
        Droppable | {isOver ? 'OVER' : 'NOT OVER'}
        {props.item?.name} | {props.item?.cost}
    </div>;
};
