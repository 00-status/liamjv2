
import { DragIcon } from '../../../SharedComponents/Icons/DragIcon';
import './inventory-item.css';
import { useDraggable } from "@dnd-kit/core";

type Props = {
    name: string,
    cost: number,
    currency: string
};

export const InventoryItem = (props: Props) => {
    const {attributes, listeners, setNodeRef} = useDraggable({
        id: props.name,
        data: { name: props.name, cost: props.cost, currency: props.currency }
    });

    return <div className='inventory-item' ref={setNodeRef}>
        <div className='inventory-item__icon' {...listeners} {...attributes}>
            <DragIcon />
        </div>
        <div className='inventory-item__body'>
            <div>
                {props.name}
            </div>
            <div className='inventory-item__cost'>
                {props.cost} {props.currency}
            </div>
        </div>
    </div>;
};


