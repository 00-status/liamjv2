import { SkillLevel } from "./SkillCard";

export type Skill = {
    name: string;
    type: string;
    src: string;
    skillLevel: SkillLevel;
};

export const skills: Array<Skill> = [
    { type: 'Front-end', name: 'React', src: require('../assets/imaages/react-icon.svg.png'), skillLevel: SkillLevel.expert },
    { type: 'Front-end', name: 'TypeScript', src: '#a02e2f', skillLevel: SkillLevel.expert },
    { type: 'Front-end', name: 'Flow', src: '#a02e2f', skillLevel: SkillLevel.working },
    { type: 'Front-end', name: 'Vue', src: '#a02e2f', skillLevel: SkillLevel.working },
    { type: 'Front-end', name: 'Webpack', src: '#a02e2f', skillLevel: SkillLevel.working },
    { type: 'Back-end', name: 'PHP', src: '#708694', skillLevel: SkillLevel.working },
    { type: 'Back-end', name: 'SlimPHP', src: '#708694', skillLevel: SkillLevel.working },
    { type: 'Process', name: 'Test-driven Development', src: '#d6a840', skillLevel: SkillLevel.working }
];