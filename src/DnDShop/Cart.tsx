
import './cart.css';
import { CartSlot } from "./DnDShop";
import { CartItem } from "./CartItem";

type Props = {
    cartSlots: CartSlot[];
};

export const Cart = (props: Props) => {
    return <div className="cart">
        {props.cartSlots.map((slot) => {
            return <CartItem key={slot.droppableID} id={slot.droppableID} item={slot.item} />;
        })}
    </div>;
};
