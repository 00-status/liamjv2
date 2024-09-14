import { useState } from "react";

import { Page } from "../../SharedComponents/Page/Page";
import { TextInput } from "../../SharedComponents/TextInput/TextInput";
import { Button } from "../../SharedComponents/Button/Button";
import { Dropdown } from "../../SharedComponents/Dropdown/Dropdown";

type WeaponEffect = {
    name: string;
    description: string;
    rarities: Array<string>;
    tags: Array<string>;
};

export const WeaponEffectForm = () => {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");

    const [currentTag, setCurrentTag] = useState("");
    const [tagList, setTagList] = useState<Array<string>>([]);
    
    const [rarityList, setRarityList] = useState<Array<string>>([]);

    const rarityOptions = [
        { value: "", label: "" },
        { value: "Uncommon", label: "Uncommon" },
        { value: "Rare", label: "Rare" },
        { value: "Very Rare", label: "Very Rare" },
        { value: "Legendary", label: "Legendary" }
    ];

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
                <Dropdown defaultValue="" options={rarityOptions}
                    onOptionSelect={(optionValue) => {
                        if (optionValue && !rarityList.includes(optionValue)) {
                            setRarityList((state) => [...state, optionValue])
                        }
                    }}
                />
                <div>
                    {rarityList.map(rarity => <div key={rarity}>{rarity}</div>)}
                </div>
            </div>
            <div>
                <div>
                    <TextInput placeholder="Tag" value={currentTag}
                        onChange={(newValue) => {
                            setCurrentTag(newValue ?? "");
                        }}
                    />
                    <Button onClick={() => {
                        if (currentTag) {
                            setTagList((state) => [...state, currentTag]);
                            setCurrentTag("");
                        }
                    }}>
                        Add tag
                    </Button>
                </div>
                <div>
                    {tagList.map((tag) => <div key={tag}>{tag}</div>)}
                </div>
            </div>
        </div>
    </Page>;
};
