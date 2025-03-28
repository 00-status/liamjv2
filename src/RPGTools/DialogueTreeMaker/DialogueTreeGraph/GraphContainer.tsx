import { SigmaContainer } from "@react-sigma/core";

import { defaultCircleDrawHover } from "./DefaultDrawHover";
import { CustomNodeSquareProgram } from "./CustomNodeSquareProgram";
import { ReactNode } from "react";

const sigmaSettings = {
    nodeProgramClasses: { square: CustomNodeSquareProgram },
    defaultEdgeType: 'arrow',
    defaultDrawNodeHover: defaultCircleDrawHover
};

type Props = {
    children: ReactNode;
};

export const GraphContainer = (props: Props) => {
    const { children } = props;

    return <SigmaContainer
        settings={sigmaSettings}
        style={{ height: '350px', backgroundColor: '#3b3b40', color: '#FCFEFF' }}
    >
        {children}
    </SigmaContainer>
};
