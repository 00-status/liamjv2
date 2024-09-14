import { useState } from "react";

import { Page } from "../../SharedComponents/Page/Page";
import { TextInput } from "../../SharedComponents/TextInput/TextInput";
import { Modal } from "../../SharedComponents/Modal/Modal";
import { Button } from "../../SharedComponents/Button/Button";

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
