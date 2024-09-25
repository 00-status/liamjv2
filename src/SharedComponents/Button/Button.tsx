import { ReactNode } from "react";

import './button.css';

type Props = {
    buttonTheme?: ButtonTheme;
    hasSheen?: boolean;
    children: ReactNode;
    onClick?: () => void;
    disabled?: boolean;
};

export enum ButtonTheme {
    Default = 'default-button',
    Delete = 'delete-button',
    Subtle = 'subtle-button'
};

export const Button = (props: Props) => {
    const buttonTheme = props.buttonTheme ?? ButtonTheme.Default;

    return <button
        data-theme={buttonTheme}
        className={"custom-button " + (props.hasSheen ? " button-sheen" : "")}
        disabled={props?.disabled}
        onClick={props.onClick}
    >
        {props.children}
    </button>;
};
