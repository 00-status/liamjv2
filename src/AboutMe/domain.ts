import { SkillLevel } from "./SkillCard";

export type Skill = {
    name: string;
    type: string;
    src: string|null;
    skillLevel: SkillLevel;
};

export const skills: Array<Skill> = [
    { type: 'Front-end', name: 'React', src: 'https://liamj.b-cdn.net/assets/images/react-icon.svg.png', skillLevel: SkillLevel.expert },
    { type: 'Front-end', name: 'TypeScript', src: 'https://liamj.b-cdn.net/assets/images/typescript.svg.png', skillLevel: SkillLevel.expert },
    { type: 'Back-end', name: 'PHP', src: 'https://liamj.b-cdn.net/assets/images/php_logo.png', skillLevel: SkillLevel.working },
    { type: 'Front-end', name: 'Webpack', src: 'https://liamj.b-cdn.net/assets/images/webpack_icon.png', skillLevel: SkillLevel.working },
    { type: 'Tool', name: 'Jira', src: 'https://liamj.b-cdn.net/assets/images/jira_logo_icon.png', skillLevel: SkillLevel.working },
    { type: 'Process', name: 'TDD', src: null, skillLevel: SkillLevel.working },
    { type: 'Tool', name: 'Git', src: 'https://liamj.b-cdn.net/assets/images/git-icon.png', skillLevel: SkillLevel.working },
    { type: 'Back-end', name: 'SlimPHP', src: 'https://liamj.b-cdn.net/assets/images/slim_php_logo.jpeg', skillLevel: SkillLevel.working },
    { type: 'Process', name: 'Command/Handler', src: null, skillLevel: SkillLevel.working },
    { type: 'Process', name: 'Onion Architecture', src: null, skillLevel: SkillLevel.working },
    { type: 'Back-end', name: 'GraphQL', src: 'https://liamj.b-cdn.net/assets/images/graphql_icon.svg.png', skillLevel: SkillLevel.working },
    { type: 'Front-end', name: 'Flow', src: 'https://liamj.b-cdn.net/assets/images/flow_logo.png', skillLevel: SkillLevel.working },
    { type: 'Database', name: 'MySQL', src: 'https://liamj.b-cdn.net/assets/images/my_sql_logo.png', skillLevel: SkillLevel.working },
    { type: 'Tool', name: 'Slack', src: 'https://liamj.b-cdn.net/assets/images/slack_icon.png', skillLevel: SkillLevel.working },
    { type: 'Front-end', name: 'Vue', src: 'https://liamj.b-cdn.net/assets/images/vue_icon.png', skillLevel: SkillLevel.working },
    { type: 'Process', name: 'Builder', src: null, skillLevel: SkillLevel.working },
];