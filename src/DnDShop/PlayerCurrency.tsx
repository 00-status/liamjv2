
import './player-currency.css';

type Props = {

};

export const PlayerCurrency = (props: Props) => {
    return <div className="player-currency">
        <div className="player-currency__input-container">
            <label>Gold</label>
            <input className='player-currency__input' value="" type="number" />
        </div>
        <div className="player-currency__input-container">
            <label>Silver</label>
            <input className='player-currency__input' value="" type="number" />
        </div>
        <div className="player-currency__input-container">
            <label>Copper</label>
            <input className='player-currency__input' value="" type="number" />
        </div>
    </div>;
};
