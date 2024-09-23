import { useCallback, useState } from "react";
import { Weapon } from "./domain/types";

type UseGenerateWeapon = {
    weapon: Weapon | null;
    generateWeapon: () => void;
};

export const useGenerateWeapon = (): UseGenerateWeapon => {
    const [weapon, setWeapon] = useState<Weapon|null>(null);

    const generateWeapon = useCallback(() => {
        fetch("/api/1/generate_weapon")
            .then((response: Response) => response.json())
            .then(json => {
                console.log(json);

                setWeapon(json)
            });
    }, [setWeapon]);

    return {
        weapon,
        generateWeapon
    };
};
