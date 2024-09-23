import { Card } from "../../SharedComponents/Card/Card";
import { Weapon, WeaponDamage } from "./domain/types";

type Props = {
    weapon: Weapon;
};

export const WeaponCard = (props: Props) => {
    const { weapon } = props;

    const formattedWeaponProperties = formatWeaponProperties(weapon.properties);

    return <Card title={weapon.name || weapon.defaultName}>
        <div>
            <div>
                <div>
                    <b>Type: </b>{weapon.defaultName}
                </div>
                <div>
                    <b>Rarity: </b>{weapon.rarity}
                </div>
                {formattedWeaponProperties && <div>
                    <b>Properties: </b> {formattedWeaponProperties}
                </div>}
                <div className="weapon-maker--damage">
                    <b>Damage: </b> {formatDamage(weapon.baseDamage)} + {formatDamage(weapon.extraDamage)}
                </div>
            </div>
            <hr className="divider" />
            <div>
                <b>{weapon.weaponEffect.name}: </b>{weapon.weaponEffect.description}
            </div>
        </div>
    </Card>
};

const formatWeaponProperties = (weaponProperties: string[]): string => {
    if (weaponProperties.length <= 0) {
        return '';
    }

    return weaponProperties.join(', ');
};

const formatDamage = (damage: WeaponDamage | null): string => {
    if (!damage) {
        return '';
    }

    return damage.diceCount + 'd' + damage.diceType + ' ' + damage.damageType;
};
