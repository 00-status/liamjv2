import { DndContext, DragEndEvent, DragOverlay } from "@dnd-kit/core";
import { useState } from "react";

import './dnd-shop.css';
import { Page } from "../SharedComponents/Page/Page";
import items from '../assets/items.json';
import { Item } from "./types";
import { Inventory } from "./Inventory";
import { Cart } from "./Cart";
import { SubTotal } from "./SubTotal";

export type CartSlot = { droppableID: string, item: null | Item };

// ToDo:
// Make Drop Areas: brighter, dashed border, darken when holding item

export const DndShop = () => {
    const [cartSlots, setCartSlots] = useState<CartSlot[]>(generateInitialCartSlots());
    
    const onDragEnd = (event: DragEndEvent) => {
        const {over, active} = event;

        if (!over || !active) {
            return;
        }

        const cartSlotsCopy = [...cartSlots];
        const droppedSlotIndex = cartSlotsCopy.findIndex((slot) => {
            return slot.droppableID === over.id;
        });

        const droppedItem: Item | undefined = items.find((item) => {
            return item.name === active.id;
        });

        if (!droppedItem) {
            return;
        }

        cartSlotsCopy[droppedSlotIndex] = {
            droppableID: String(over.id),
            item: droppedItem
        };

        setCartSlots(cartSlotsCopy);
    };

    return <Page title="Liam Johnson">
        <div className="dnd-shop">
            <h1>The Shop</h1>
            <DndContext onDragEnd={onDragEnd}>
                <div className="dnd-shop__container">
                    <div>
                        <Cart cartSlots={cartSlots} />
                        <SubTotal cartItems={cartSlots} />
                    </div>
                    <div>
                        <Inventory items={items} />
                    </div>
                </div>
                <DragOverlay>BANANA</DragOverlay>
            </DndContext>
        </div>
    </Page>;
};

const generateInitialCartSlots = (): CartSlot[] => {
    const emptyCartSlots = [];

    for (let count = 0; count < 9; count++) {
        const emptyCartSlot = { droppableID: 'droppable|' + count, item: null };
        emptyCartSlots.push(emptyCartSlot);
    }

    return emptyCartSlots;
};

    // ToDo
    // Tracking Player Currency:
    //      In the DnDShop Component,
    //          Create a local state object that will track the amount of Platinum, Gold,
    //          silver, and copper coins that the player has.
    //      Create a PlayerCurrency Component that will receive the Currency object as props and display the money.    
    // Tracking Total Cost and Weight
    //      Create a new TotalCost component that takes in the list of ShoppingCartItems
    //          Total up the cost of all of the items
    //          Display the least amount of coins needed to make the transaction.
    //          That is, if we have 12 total copper, then we should convert that to 1 silver and 2 copper
    // Tracking the Player's leftover balance
    //      Create A PlayerChangeComponent
