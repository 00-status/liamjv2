import { useState } from "react";

import { Page } from "../../SharedComponents/Page/Page";
import { TextInput } from "../../SharedComponents/TextInput/TextInput";

type WeaponEffect = {
    name: string;
    description: string;
    rarities: Array<string>;
    tags: Array<string>;
};

export const WeaponEffectForm = () => {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    // Modal for tags
    // Modal for rarities

    return <Page routes={[{ route: "/", isHomeLink: true, label: "Landing" }]} title="Weapon Effect Form">
        <div>
            <h1>Weapon Effects</h1>
            <div>
                <TextInput id="weapon-effect-name" value={name} label="Effect Name"
                    onChange={(newValue) => {
                        setName(newValue ?? "");
                    }}
                />
                <div>
                    <label htmlFor="weapon-effect-description">Description</label>
                    <textarea id="weapon-effect-description" value={description}
                        onChange={(event) => {
                            setDescription(event.target.value ?? "");
                        }}
                    />
                </div>
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
