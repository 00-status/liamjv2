import { useDroppable } from "@dnd-kit/core";

type Props = {
    id: string;
    item: null|object
};

export const Inventory = (props: Props) => {
    const {isOver, setNodeRef} = useDroppable({id: props.id});

    console.log(props.item);

    return <div style={{backgroundColor: 'red', height: '300px'}} ref={setNodeRef}>
        Droppable | {isOver ? 'OVER' : 'NOT OVER'}
        {props.item?.name} | {props.item?.cost}
    </div>;
};
