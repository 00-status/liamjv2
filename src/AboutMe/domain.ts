import { SkillLevel } from "./SkillCard";

export type Skill = {
    name: string;
    src: string;
    skillLevel: SkillLevel;
};

export const skills: Array<Skill> = [
    { name: 'React', src: require('../assets/imaages/react-icon.svg.png'), skillLevel: SkillLevel.expert },
    { name: 'TypeScript', src: '#a02e2f', skillLevel: SkillLevel.expert },
    { name: 'Flow', src: '#a02e2f', skillLevel: SkillLevel.working },
    { name: 'Vue', src: '#a02e2f', skillLevel: SkillLevel.working },
    { name: 'Webpack', src: '#a02e2f', skillLevel: SkillLevel.working },
    { name: 'PHP', src: '#708694', skillLevel: SkillLevel.working },
    { name: 'SlimPHP', src: '#708694', skillLevel: SkillLevel.working },
    { name: 'Test-driven Development', src: '#d6a840', skillLevel: SkillLevel.working }
];