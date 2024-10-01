import { useCallback, useState } from "react";
import { Weapon } from "./domain/types";

type UseGenerateWeapon = {
    weapon: Weapon | null;
    generateWeapon: (rarity: string) => void;
};

export const useGenerateWeapon = (): UseGenerateWeapon => {
    const [weapon, setWeapon] = useState<Weapon|null>(null);

    const generateWeapon = useCallback((rarity: string) => {
        fetch("/api/1/generate_weapon?rarity=" + rarity)
            .then((response: Response) => response.json())
            .then(json => {
                setWeapon(json)
            });
    }, [setWeapon]);

    return {
        weapon,
        generateWeapon
    };
};
