
import './player-currency.css';
import { CurrencyEnum, PlayerCurrency as PlayerCurrencyType } from './domain/types';

type Props = {
    playerCurrency: PlayerCurrencyType;
    setPlayerCurrency: (currency: PlayerCurrencyType) => void;
};

export const PlayerCurrency = (props: Props) => {
    const { playerCurrency, setPlayerCurrency } = props;

    const onChangeCurrency = (type: CurrencyEnum, newValue?: string): void => {
        const playerCurrencyCopy = { ...playerCurrency };
        playerCurrencyCopy[type] = newValue ? Number(newValue) : "";

        setPlayerCurrency(playerCurrencyCopy);
    };

    return <div className="player-currency">
        <div className="player-currency__input-container">
            <label>Gold</label>
            <input
                className='player-currency__input'
                value={props.playerCurrency.gold}
                type="number"
                onChange={(event) => onChangeCurrency(CurrencyEnum.Gold, event.target.value)}
            />
        </div>
        <div className="player-currency__input-container">
            <label>Silver</label>
            <input
                className='player-currency__input'
                value={props.playerCurrency.silver}
                type="number"
                onChange={(event) => onChangeCurrency(CurrencyEnum.Silver, event.target.value)}
            />
        </div>
        <div className="player-currency__input-container">
            <label>Copper</label>
            <input
                className='player-currency__input'
                value={props.playerCurrency.copper}
                type="number"
                onChange={(event) => onChangeCurrency(CurrencyEnum.Copper, event.target.value)}
            />
        </div>
    </div>;
};
