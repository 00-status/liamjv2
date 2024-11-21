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
        <div className="skill-card__gradient">
            <div className="skill-card__title">
                {props.name}
            </div>
        </div>
        <div className="skill-card__container">
            <div>{props.type}</div>
        </div>
    </div>;
};
