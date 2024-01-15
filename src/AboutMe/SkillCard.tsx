import { ReactElement } from "react";

import './skill-card.css';
export enum SkillLevel { "working", "expert" };

type Props = {
    name: string;
    color: string;
    skillLevel: SkillLevel;
};

export const SkillCard = (props: Props): ReactElement => {
    return <div style={ {backgroundColor: props.color} } className="skill-card">
        {props.name}
    </div>;
};
