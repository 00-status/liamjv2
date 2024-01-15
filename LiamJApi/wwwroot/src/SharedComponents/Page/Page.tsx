import { ReactElement, ReactNode } from "react";

type Props = {
    title: string;
    children: ReactNode;
};

export const Page = (props: Props): ReactElement => {
    return <div className="page">
        <div className="page-title-container">
            <div className="page-title">{props.title}</div>
            <div className="page-title-cards">
                <div>Card 1</div>
                <div>Card 2</div>
                <div>Card 3</div>
            </div>
        </div>
        <div className="page-content-container">
            {props.children}
        </div>
    </div>;
};
