import { ReactElement } from "react";

import './skill-grid.css';
import { SkillCard, SkillLevel } from "./SkillCard";

export const SkillGrid = (): ReactElement => {
    return <div className="skill-grid">
        {skills.map((skill: Skill) => <SkillCard {...skill} />)}
    </div>;
};

type Skill = {
    name: string;
    color: string;
    skillLevel: SkillLevel;
};

const skills: Array<Skill> = [
    { name: 'React', color: '#F3A712', skillLevel: SkillLevel.expert },
    { name: 'TypeScript', color: '#F3A712', skillLevel: SkillLevel.expert },
    { name: 'Flow', color: '#F3A712', skillLevel: SkillLevel.working },
    { name: 'Vue', color: '#F3A712', skillLevel: SkillLevel.working },
    { name: 'Webpack', color: '#F3A712', skillLevel: SkillLevel.working },
];
