import { ReactElement } from "react";

import './skill-card.css';
export enum SkillLevel { "working", "expert" };

type Props = {
    name: string;
    src: string;
    skillLevel: SkillLevel;
};

export const SkillCard = (props: Props): ReactElement => {
    return <div className="skill-card">
        <img className="skill-card--image" src={props.src} alt={props.name} />
    </div>;
};
