import { DndContext, DragEndEvent } from "@dnd-kit/core";
import { useState } from "react";

import './dnd-shop.css';
import { Page } from "../SharedComponents/Page/Page";
import items from '../assets/items.json';
import { ShopItem } from "./ShopItem";
import { Inventory } from "./Inventory";
import { Item } from "./types";

export type CartSlot = { droppableID: string, item: null | Item };

export const DndShop = () => {
    const [itemList, setItemList] = useState(items);
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

    return <Page title="The Shop">
        <div className="dnd-shop">
            <h1>The Cart</h1>
            <DndContext onDragEnd={onDragEnd}>
                <Inventory cartSlots={cartSlots} />
                <div>
                    {itemList.map((item) => {
                        return <ShopItem name={item.name} cost={item.cost} currency={item.currency} />;
                    })}
                </div>
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
    // Listing Items:
    //      Create a ShopInventory Component
    //      Create a ShopIntentoryItem component - this will be the list item 
    //      Put the ShopInventory component on the right-hand side of the page.
    // Shopping Cart
    //      Create a ShoppingCart Component that will take in an array of ShoppingCartItems
    //      ShoppingCartItems have name, currency, cost, weight, row, and column properties.
    //      The ShoppingCart will display the ShoppingCartItems based on their row and column.
    //      The DnDShop Component will be in charge of managing the state of the ShoppingCartItems array.
    //          One just has to pass down the setShoppingCartItems function to whatever child needs it.
    // Tracking Total Cost and Weight
    //      Create a new TotalCost component that takes in the list of ShoppingCartItems
    //          Total up the cost of all of the items
    //          Display the least amount of coins needed to make the transaction.
    //          That is, if we have 12 total copper, then we should convert that to 1 silver and 2 copper
    // Tracking the Player's leftover Change
    //      Create A PlayerChangeComponent
