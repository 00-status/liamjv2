import { ArmyToken } from './ArmyToken';
import './armies.css';

type Props = { armyCount: number; maxArmyCount: number };

export const Armies = ({ armyCount, maxArmyCount }: Props) => {
    const missingArmyCount = maxArmyCount - armyCount;

    const armyArray = Array(armyCount).fill(0);
    const missingArmyArray = Array(missingArmyCount).fill(0);

    return (
        <div className="armies">
            {armyArray.map((value, index) => (
                <div key={`army-token-${index}`} className="armies__item">
                    <ArmyToken key={`army-token-${index}`} />
                </div>
            ))}
            {missingArmyArray.map((value, index) => (
                <div key={`disabled-army-token-${index}`} className="armies__item">
                    <ArmyToken isDisabled={true} />
                </div>
            ))}
        </div>
    );
};
