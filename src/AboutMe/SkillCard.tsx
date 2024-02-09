import { ReactElement } from "react";

import './skill-card.css';
export enum SkillLevel { "working", "expert" };

type Props = {
    name: string;
    type: string;
    src: string | null;
    skillLevel: SkillLevel;
};

export const SkillCard = (props: Props): ReactElement => {
    return <div className="skill-card">
        {props.src
            ? <img className="skill-card--image" src={props.src} alt={props.name} />
            : <div className="skill-card--placeholder-circle" />
        }
        <div className="skill-card--container">
            <b>{props.name}</b>
            <div>{props.type}</div>
        </div>
    </div>;
};
