
import './cart.css';
import { CartSlot } from "./DnDShop";
import { CartItem } from "./CartItem";
import { useEffect } from 'react';
import { generateEmptyCartSlots } from './domain/util';

type Props = {
    cartSlots: CartSlot[];
    setCartSlots: (slot: CartSlot[]) => void;
};

export const Cart = (props: Props) => {
    const {cartSlots, setCartSlots} = props;

    useEffect(() => {
        const lastThreeItems = cartSlots.slice(-3);

        const hasAnItemInLastRow = lastThreeItems.find((cartSlot: CartSlot) => {
            return !!cartSlot.item;
        });

        if (!!hasAnItemInLastRow) {
            const emptyCartSlots = generateEmptyCartSlots(cartSlots.length, 3);
            setCartSlots([...cartSlots, ...emptyCartSlots]);
        }
    }, [cartSlots, setCartSlots]);

    return <div className="cart">
        {props.cartSlots.map((slot) => {
            return <CartItem key={slot.droppableID} id={slot.droppableID} item={slot.item} />;
        })}
    </div>;
};
