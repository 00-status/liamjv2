import { CartSlot } from "./DnDShop";
import { Currency, Item } from "./types";

type Props = {
    cartItems: CartSlot[];
};

export const SubTotal = (props: Props) => {
    const { cartItems } = props;

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
            Total Weight: {totalWeight}lbs
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
