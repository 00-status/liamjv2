import { Page } from "../../SharedComponents/Page/Page";
import { TextInput } from "../../SharedComponents/TextInput/TextInput";

type WeaponEffect = {
    name: string;
    description: string;
    rarities: Array<string>;
    tags: Array<string>;
};

export const WeaponEffectForm = () => {
    // Modal for tags
    // Modal for rarities

    return <Page routes={[{ route: "/", isHomeLink: true, label: "Landing" }]} title="Weapon Effect Form">
        <div>
            <h1>Weapon Effects</h1>
            <div>
                <TextInput value="" label="Effect Name" />
                <textarea />
            </div>
            <div>
                rarities
            </div>
            <div>
                tags
            </div>
        </div>
    </Page>;
};
