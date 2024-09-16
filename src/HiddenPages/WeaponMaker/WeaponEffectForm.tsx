import { useState } from "react";

import './weapon-effect-form.css';
import { Page } from "../../SharedComponents/Page/Page";
import { TextInput } from "../../SharedComponents/TextInput/TextInput";
import { Button } from "../../SharedComponents/Button/Button";
import { Dropdown } from "../../SharedComponents/Dropdown/Dropdown";
import { WeaponEffectTag } from "./WeaponEffectTag";
import { Card } from "../../SharedComponents/Card/Card";

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

    const onDeleteRarity = (tag: string) => {
        const rarityListCopy = [...rarityList];

        const rarityToDeleteIndex = rarityListCopy.indexOf(tag);
        rarityListCopy.splice(rarityToDeleteIndex, 1);

        setRarityList(rarityListCopy);
    };

    const onDeleteTag = (tag: string) => {
        const tagListCopy = [...tagList];

        const tagToDeleteIndex = tagListCopy.indexOf(tag);
        tagListCopy.splice(tagToDeleteIndex, 1);

        setTagList(tagListCopy);
    };

    return <Page routes={[{ route: "/", isHomeLink: true, label: "Landing" }]} title="Weapon Effect Form">
        <div className="weapon-effect-form">
            <h1>Weapon Effects</h1>
            <Card title="Form" buttonName="Submit effect" buttonAction={() => {}}>
                <div>
                    <TextInput id="weapon-effect-name" value={name} label="Name"
                        onChange={(newValue) => {
                            setName(newValue ?? "");
                        }}
                    />
                    <div className="weapon-effect-form__description">
                        <label htmlFor="weapon-effect-description">Description</label>
                        <textarea
                            className="weapon-effect-form__text-area"
                            id="weapon-effect-description"
                            value={description}
                            onChange={(event) => {
                                setDescription(event.target.value ?? "");
                            }}
                        />
                    </div>
                </div>
                <div>
                    <div className="weapon-effect-form__dropdown">
                        <Dropdown defaultValue="" options={rarityOptions}
                            onOptionSelect={(optionValue) => {
                                if (optionValue && !rarityList.includes(optionValue)) {
                                    setRarityList((state) => [...state, optionValue])
                                }
                            }}
                        />
                    </div>
                    <div className="weapon-effect-form__tag-list">
                        {rarityList.map(rarity => <WeaponEffectTag key={rarity} tag={rarity} onDeleteTag={onDeleteRarity} />)}
                    </div>
                </div>
                <div>
                    <div className="weapon-effect-form__tag-form">
                        <TextInput placeholder="Tag name" value={currentTag}
                            onChange={(newValue) => {
                                setCurrentTag(newValue ?? "");
                            }}
                        />
                        <Button onClick={() => {
                            if (currentTag && !tagList.includes(currentTag)) {
                                setTagList((state) => [...state, currentTag]);
                                setCurrentTag("");
                            }
                        }}>
                            Add tag
                        </Button>
                    </div>
                    <div className="weapon-effect-form__tag-list">
                        {tagList.map((tag) => <WeaponEffectTag key={tag} tag={tag} onDeleteTag={onDeleteTag} />)}
                    </div>
                </div>
            </Card>
        </div>
    </Page>;
};
