import './inventory.css';
import { ShopItem } from "./InventoryItem";
import { Item } from "./types";

type Props = {
    items: Item[];
};

export const Inventory = (props: Props) => {
    const { items } = props;

    return <div className="inventory">
        {items.map((item) => {
            return <ShopItem key={item.name} name={item.name} cost={item.cost} currency={item.currency} />;
        })}
    </div>;
};
