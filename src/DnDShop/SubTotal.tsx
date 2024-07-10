import { CartSlot } from "./DnDShop";
import { Currency, Item } from "./types";

type Props = {
    cartItems: CartSlot[];
};

export const SubTotal = (props: Props) => {
    const { cartItems } = props;

    // Reduce each item, with a initial value of { gold: 0, silver: 0, copper: 0 }
    //      Add the item's cost to the appropriate "bucket"
    // convert all possible copper into silver, and the silver into gold.
    // i.e., one should have a result like this: { gold: 12, silver: 7, copper: 4 }

    const filteredCartItems: Item[] = cartItems
        .map((item) => item.item)
        .filter((item) => {
            return item !== null;
        }
    );

    const itemTotalsByCurrency: Currency = filteredCartItems.reduce((carry, item) => {
        switch (item.currency) {
            case 'gold':
                carry.gold += item.cost;
                break;
            case 'silver':
                carry.silver += item.cost;
                break;
            case 'copper':
                carry.copper += item.cost;
                break;
            default:
                break;

        }

        return carry;
    }, { gold: 0, silver: 0, copper: 0 });

    const normalizedTotalsByCurrency = normalizeTotals(itemTotalsByCurrency);

    const totalWeight = filteredCartItems.reduce((carry, item) => {
        return carry += item.weight ? item.weight : 0;
    }, 0);

    return <div>
        <h2>Subtotal</h2>
        <div>
            Total Weight: {totalWeight}
        </div>
        <div>
            Gold: {normalizedTotalsByCurrency.gold} | Silver: {normalizedTotalsByCurrency.silver} | Copper: {normalizedTotalsByCurrency.copper}
        </div>
    </div>;
};

const normalizeTotals = (itemTotalsByCurrency: Currency): Currency => {
    const remainingCopper = itemTotalsByCurrency.copper % 10;
    const newSilver = Math.trunc(itemTotalsByCurrency.copper / 10);

    const silver = newSilver + itemTotalsByCurrency.silver;
    const remainingSilver = silver % 10;
    const newGold = Math.trunc(silver / 10);

    return { gold: itemTotalsByCurrency.gold + newGold, silver: remainingSilver, copper: remainingCopper };
};
