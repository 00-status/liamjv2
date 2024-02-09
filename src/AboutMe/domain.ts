import { SkillLevel } from "./SkillCard";

export type Skill = {
    name: string;
    type: string;
    src: string|null;
    skillLevel: SkillLevel;
};

export const skills: Array<Skill> = [
    { type: 'Front-end', name: 'React', src: require('../assets/imaages/react-icon.svg.png'), skillLevel: SkillLevel.expert },
    { type: 'Front-end', name: 'TypeScript', src: require('../assets/imaages/typescript.svg.png'), skillLevel: SkillLevel.expert },
    { type: 'Front-end', name: 'Flow', src: require('../assets/imaages/flow_logo.png'), skillLevel: SkillLevel.working },
    { type: 'Front-end', name: 'Vue', src: require('../assets/imaages/vue_icon.png'), skillLevel: SkillLevel.working },
    { type: 'Front-end', name: 'Webpack', src: require('../assets/imaages/webpack_icon.png'), skillLevel: SkillLevel.working },
    { type: 'Back-end', name: 'PHP', src: require('../assets/imaages/php_logo.png'), skillLevel: SkillLevel.working },
    { type: 'Back-end', name: 'SlimPHP', src: require('../assets/imaages/slim_php_logo.jpeg'), skillLevel: SkillLevel.working },
    { type: 'Back-end', name: 'GraphQL', src: require('../assets/imaages/graphql_icon.svg.png'), skillLevel: SkillLevel.working },
    { type: 'Database', name: 'MySQL', src: require('../assets/imaages/my_sql_logo.png'), skillLevel: SkillLevel.working },
    { type: 'Tool', name: 'Slack', src: require('../assets/imaages/slack_icon.png'), skillLevel: SkillLevel.working },
    { type: 'Tool', name: 'Git', src: require('../assets/imaages/git-icon.png'), skillLevel: SkillLevel.working },
    { type: 'Tool', name: 'Jira', src: require('../assets/imaages/jira_logo_icon.png'), skillLevel: SkillLevel.working },
    { type: 'Process', name: 'TDD', src: null, skillLevel: SkillLevel.working },
    { type: 'Process', name: 'Command/Handler', src: null, skillLevel: SkillLevel.working },
    { type: 'Process', name: 'Onion Architecture', src: null, skillLevel: SkillLevel.working },
    { type: 'Process', name: 'Builder', src: null, skillLevel: SkillLevel.working },
];