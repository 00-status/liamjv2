
import './player-currency.css';
import { Currency, CurrencyEnum } from './domain/types';

type Props = {
    playerCurrency: Currency;
    setPlayerCurrency: (currency: Currency) => void;
};

export const PlayerCurrency = (props: Props) => {
    const { playerCurrency, setPlayerCurrency } = props;

    const onChangeCurrency = (type: CurrencyEnum, newValue?: string): void => {
        if (Number(newValue) < 0) {
            return;
        }

        const playerCurrencyCopy = { ...playerCurrency };
        playerCurrencyCopy[type] = newValue ? Number(newValue) : 0;

        setPlayerCurrency(playerCurrencyCopy);
    };

    return <div className="player-currency">
        <div className="player-currency__input-container">
            <label>Gold</label>
            <input
                className='player-currency__input'
                placeholder='Gold'
                value={playerCurrency.gold !== 0 ? playerCurrency.gold : ""}
                type="number"
                onChange={(event) => onChangeCurrency(CurrencyEnum.Gold, event.target.value)}
            />
        </div>
        <div className="player-currency__input-container">
            <label>Silver</label>
            <input
                className='player-currency__input'
                placeholder='Silver'
                value={playerCurrency.silver !== 0 ? playerCurrency.silver : ""}
                type="number"
                onChange={(event) => onChangeCurrency(CurrencyEnum.Silver, event.target.value)}
            />
        </div>
        <div className="player-currency__input-container">
            <label>Copper</label>
            <input
                className='player-currency__input'
                placeholder='Copper'
                value={playerCurrency.copper !== 0 ? playerCurrency.copper : ""}
                type="number"
                onChange={(event) => onChangeCurrency(CurrencyEnum.Copper, event.target.value)}
            />
        </div>
    </div>;
};
