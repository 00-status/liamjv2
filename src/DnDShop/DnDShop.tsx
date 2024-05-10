import { DndContext } from "@dnd-kit/core";

import { Page } from "../SharedComponents/Page/Page";
import items from '../assets/items.json';
import { ShopItem } from "./ShopItem";
import { Inventory } from "./Inventory";
import { useState } from "react";

export const DndShop = () => {
    const [itemList, setItemList] = useState(items);
    const [cartSlots, setCartSlots] = useState([
        { droppableID: 'droppable|1', item: null },
        { droppableID: 'droppable|2', item: null },
    ]);
    
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

    const onDragEnd = (event) => {
        // A list representing the inventory
        // Example [ { droppableID: string, item: null|Item } ]
        // If the item is null, then it is an empty cart slot.
        // If the item is not null, then it is a full cart slot.
        // When an item is dropped on a cart slot
        //      replace the item property on the itemList with the dropped item
        //      splice out the item from the items itemList

        const {over, active} = event;

        const cartSlotsCopy = [...cartSlots];
        const droppedSlotIndex = cartSlotsCopy.findIndex((slot) => {
            return slot.droppableID === over.id;
        });

        const droppedItem = items.find((item) => {
            return item.name === active.id;
        });

        if (!droppedItem) {
            return;
        }

        cartSlotsCopy[droppedSlotIndex] = {
            droppableID: over,
            item: droppedItem
        };

        setCartSlots(cartSlotsCopy);
    };

    return <Page title="The Shop">
        <div>
            <div>
                <DndContext onDragEnd={onDragEnd}>
                    {cartSlots.map((slot) => {
                        return <Inventory id={slot.droppableID} item={slot.item} />;
                    })}
                    <div>
                    {items.map((item) => {
                        return <ShopItem name={item.name} cost={item.cost} currency={item.currency} />;
                    })}
            </div>
                </DndContext>
            </div>
            <div>
                <h1>The Cart</h1>
                <div>
                    The Cart
                </div>
            </div>
        </div>
    </Page>;
};
