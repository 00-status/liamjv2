import { DndContext, DragEndEvent, DragOverlay, DragStartEvent } from "@dnd-kit/core";
import { useState } from "react";

import './dnd-shop.css';
import items from '../../assets/items.json';
import { Page } from "../../SharedComponents/Page/Page";
import { Item, PlayerCurrency as PlayerCurrencyType } from "./domain/types";
import { SubTotal } from "./SubTotal";
import { generateEmptyCartSlots } from "./domain/util";
import { PlayerCurrency } from "./PlayerCurrency";
import { Inventory } from "./Inventory/Inventory";
import { InventoryItem } from "./Inventory/InventoryItem";
import { Cart } from "./Cart/Cart";
import { dndRoutes } from "../domain";

export type CartSlot = { droppableID: string, item: null | Item };

export const DndShop = () => {
    const [playerCurrency, setPlayerCurrency] = useState<PlayerCurrencyType>({ gold: 0, silver: 0, copper: 0 });
    const [cartSlots, setCartSlots] = useState<CartSlot[]>(generateEmptyCartSlots(0, 9));
    const [currentItem, setCurrentItem] = useState<{ name: string, cost: number, currency: string } | null>(null);
    
    const onDragStart = (event: DragStartEvent) => {
        const data = event.active.data;

        if (data && data?.current) {
            setCurrentItem({
                name: data.current.name,
                cost: data.current.cost,
                currency: data.current.currency
            });
        }
    };

    const onDragEnd = (event: DragEndEvent) => {
        const {over, active} = event;

        setCurrentItem(null);

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

    return <Page title="D&D Tools" routes={dndRoutes}>
        <div className="dnd-shop">
            <h1>The Shop</h1>
            <PlayerCurrency playerCurrency={playerCurrency} setPlayerCurrency={setPlayerCurrency} />
            <DndContext onDragStart={onDragStart} onDragEnd={onDragEnd}>
                <div className="dnd-shop__container">
                    <div>
                        <Cart cartSlots={cartSlots} setCartSlots={setCartSlots} />
                        <SubTotal cartItems={cartSlots} />
                    </div>
                    <div>
                        <Inventory items={items} />
                    </div>
                </div>
                <DragOverlay>
                    {currentItem &&
                        <InventoryItem
                            name={currentItem.name}
                            cost={currentItem.cost}
                            currency={currentItem.currency}
                        />
                    }
                </DragOverlay>
            </DndContext>
        </div>
    </Page>;
};

    // ToDo
    // Track Player Currency
    //      Create a BalanceRemaining component
    //      Takes in the player's currency and the player's cart and calculates what the player oews and their remaining balance.
    // Display Total cart Weight
    // Set inventory overflow to hidden when dragging somehow.
    // Add a drag icon to inventory items.
