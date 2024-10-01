import { Card } from "../../SharedComponents/Card/Card";
import { Weapon, WeaponDamage } from "./domain/types";

type Props = {
    weapon: Weapon;
};

export const WeaponCard = (props: Props) => {
    const { weapon } = props;

    const hasRange = !!weapon.effectiveRange && !!weapon.ineffectiveRange;
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
                <div>
                    <b>Damage: </b> {formatDamage(weapon.baseDamage, weapon.extraDamage)}
                </div>
                {hasRange && <div>
                    <b>Range (feet): </b> {weapon.effectiveRange + "/" + weapon.ineffectiveRange}
                </div>}
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

const formatDamage = (damage: WeaponDamage, extraDamage: WeaponDamage): string => {
    if (damage.damageType === extraDamage.damageType && damage.diceType === extraDamage.diceType) {
        const totalDiceCount = damage.diceCount + extraDamage.diceCount;

        return totalDiceCount + 'd' + damage.diceType + ' ' + damage.damageType;
    }

    const regularDamageString = damage.diceCount + 'd' + damage.diceType + ' ' + damage.damageType;
    const extraDamageString = extraDamage.diceCount + 'd' + extraDamage.diceType + ' ' + extraDamage.damageType;

    return regularDamageString + " + " + extraDamageString;
};
