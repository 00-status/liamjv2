import { ReactElement } from "react";

export enum SkillLevel { "working", "expert" };

type Props = {
    name: string;
    color: string;
    skillLevel: SkillLevel;
};

export const SkillCard = (props: Props): ReactElement => {
    return <div>{props.name}</div>;
};
