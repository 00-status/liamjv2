import { useDndContext, useDraggable } from '@dnd-kit/core';
import './inventory.css';
import { InventoryItem } from "./InventoryItem";
import { Item } from "./domain/types";

type Props = {
    items: Item[];
};

export const Inventory = (props: Props) => {
    const { items } = props;

    const dndContext = useDndContext();
    const styling = dndContext.active ? {overflow: "hidden"} : undefined;

    return <div style={styling} className="inventory">
        {items.map((item) => {
            return <InventoryItem key={item.name} name={item.name} cost={item.cost} currency={item.currency} />;
        })}
    </div>;
};
