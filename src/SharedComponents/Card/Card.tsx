import { ReactNode } from "react";

import './card.css';
import { Button } from "../Button/Button";

type Props = {
    title: string;
    button?: ReactNode;
    children: ReactNode;
};

export const Card = (props: Props) => {
    return <div className="card">
        <div className="card__title">
            <h3>{props.title}</h3>
            {props.button}
        </div>
        {props.children}
    </div>
};
