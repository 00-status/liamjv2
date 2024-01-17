import { ReactElement } from "react";

import './skill-grid.css';
import { SkillCard, SkillLevel } from "./SkillCard";

export const SkillGrid = (): ReactElement => {
    return <div className="skill-grid">
        {skills.map((skill: Skill) => <SkillCard key={skill.name} {...skill} />)}
    </div>;
};

type Skill = {
    name: string;
    color: string;
    skillLevel: SkillLevel;
};

const skills: Array<Skill> = [
    { name: 'React', color: '#a02e2f', skillLevel: SkillLevel.expert },
    { name: 'TypeScript', color: '#a02e2f', skillLevel: SkillLevel.expert },
    { name: 'Flow', color: '#a02e2f', skillLevel: SkillLevel.working },
    { name: 'Vue', color: '#a02e2f', skillLevel: SkillLevel.working },
    { name: 'Webpack', color: '#a02e2f', skillLevel: SkillLevel.working },
    { name: 'PHP', color: '#708694', skillLevel: SkillLevel.working },
    { name: 'SlimPHP', color: '#708694', skillLevel: SkillLevel.working },
    { name: 'Test-driven Development', color: '#d6a840', skillLevel: SkillLevel.working }
];
