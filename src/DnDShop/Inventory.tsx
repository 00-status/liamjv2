import { useDroppable } from "@dnd-kit/core";

export const Inventory = () => {
    const {isOver, setNodeRef} = useDroppable({id: 'inventory'});

    console.log(isOver);

    return <div style={{backgroundColor: 'red', height: '300px'}} ref={setNodeRef}>
        Droppable | {isOver ? 'OVER' : 'NOT OVER'}
    </div>;
};
