import { ReactElement, ReactNode } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import "./app.css";
import { ImageButton } from "../ImageButton/ImageButton";

type Props = {
    title: string;
    children: ReactNode;
    footer?: ReactElement;
};

export const Page = (props: Props): ReactElement => {
    const navigate = useNavigate();
    const location = useLocation();

    const goToRoute = (newPath: string) => {
        if (newPath !== location.pathname) {
            navigate(newPath);
        }
    };

    return <div className="page">
        <div className="page-title-container">
            <div className="page-title">{props.title}</div>
            <div className="icon-list">
                <ImageButton url={require('../../assets/images/github_cat_icon.svg')} />
                <a href="https://linkedin.com/in/liam-johnson-36791915a" target="_blank" rel="noopener noreferrer">
                    <ImageButton url={require('../../assets/images/linkedin_icon.png')} />
                </a>
            </div>
            <nav className="nav-list" >
                <a className="nav-item" onClick={() => goToRoute('/')}>About Me</a>
                <a className="nav-item" onClick={() => goToRoute('/dice_roller')} >Dice Roller</a>
                <a className="nav-item" onClick={() => goToRoute('/weapon_maker')} >Weapon Maker</a>
            </nav>
        </div>
        <div className="page-content-container">
            {props.children}
        </div>
        <div className="footer">
            <hr className="divider" />
            {props.footer}
        </div>
    </div>;
};
