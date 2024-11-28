
import "./total.css";
import { CartSlot } from "./DnDShop";
import { Currency, CurrencyEnum, Item } from "./domain/types";

type Props = {
    cartItems: CartSlot[];
};

export const Total = (props: Props) => {
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

    return <div className="total">
        <div className="total__list--fixed">
            {filteredCartItems.map((item) => <div className="total__list-item"><div>{item.name}</div> <div>{item.cost} {item.currency}</div></div>)}
        </div>
        <h2>Total</h2>
        <div className="total__list">
            <div className="total__list-item">
                <div>
                    Weight (lbs):
                </div>
                <div>
                    {totalWeight}
                </div>
            </div>
            {Object.entries(CurrencyEnum).map(([key, value]) => {
                return <div className="total__list-item">
                    <div>
                        {key}:
                    </div>
                    <div>
                        {normalizedTotalsByCurrency[value]}
                    </div>
                </div>;
            })}
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
