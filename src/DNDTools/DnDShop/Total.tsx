import { CartSlot } from "./DnDShop";
import { Currency, Item } from "./domain/types";

type Props = {
    cartItems: CartSlot[];
};

export const Total = (props: Props) => {
    // List all items and their price / weight
    // Calculate a total
    // Calculate change remaining

    const { cartItems } = props;

    const filteredCartItems: Item[] = cartItems
        .map((item) => item.item)
        .filter((item) => {
            return item !== null;
        }
    );

    const itemTotalsByCurrency: Currency = getItemTotalsByCurrency(filteredCartItems);
    const normalizedTotalsByCurrency = normalizeTotals(itemTotalsByCurrency);

    const totalWeight = filteredCartItems.reduce((carry, item) => {
        return carry += item.weight ? item.weight : 0;
    }, 0);

    return <div>
        <h2>Subtotal</h2>
        <div>
            Total Weight: {totalWeight}lbs
        </div>
        <div>
            Gold: {normalizedTotalsByCurrency.gold} | Silver: {normalizedTotalsByCurrency.silver} | Copper: {normalizedTotalsByCurrency.copper}
        </div>
    </div>;
};

const getItemTotalsByCurrency = (items: Item[]): Currency => {
    return items.reduce((carry: Currency, item) => {
        carry[item.currency] += item.cost;

        return carry;
    }, { gold: 0, silver: 0, copper: 0 });
};

const normalizeTotals = (itemTotalsByCurrency: Currency): Currency => {
    const remainingCopper = itemTotalsByCurrency.copper % 10;
    const newSilver = Math.trunc(itemTotalsByCurrency.copper / 10);

    const silver = newSilver + itemTotalsByCurrency.silver;
    const remainingSilver = silver % 10;
    const newGold = Math.trunc(silver / 10);

    return { gold: itemTotalsByCurrency.gold + newGold, silver: remainingSilver, copper: remainingCopper };
};
