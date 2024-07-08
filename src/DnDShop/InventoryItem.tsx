
import './inventory-item.css';
import { useDraggable } from "@dnd-kit/core";

type Props = {
    name: string,
    cost: number,
    currency: string
};

export const InventoryItem = (props: Props) => {
    const {attributes, listeners, setNodeRef, transform} = useDraggable({
        id: props.name,
        data: { name: props.name, cost: props.cost, currency: props.currency }
    });

    return <div className='inventory-item' ref={setNodeRef} {...listeners} {...attributes}>
    	<div>
            {props.name}
        </div>
        <div className='inventory-item__cost-container'>
            <div className='inventory-item__cost'>
                {props.cost}
            </div>
            {props.currency}
        </div>
    </div>;
};


