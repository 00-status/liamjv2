
import './inventory.css';
import { CartSlot } from "./DnDShop";
import { InventoryItem } from "./InventoryItem";

type Props = {
    cartSlots: CartSlot[];
};

export const Inventory = (props: Props) => {
    return <div className="inventory">
        {props.cartSlots.map((slot) => {
            return <InventoryItem id={slot.droppableID} item={slot.item} />;
        })}
    </div>;
};
