import { ReactElement, ReactNode } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import "./app.css";
import { ImageButton } from "../ImageButton/ImageButton";

type Link = {
    label: string;
    route: string;
};

type Props = {
    title: string;
    routes: Array<Link>;
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
                <ImageButton
                    locationUrl={"https://github.com/00-status"}
                    imageUrl={require('../../assets/images/github_cat_icon.svg')}
                />
                <ImageButton
                    locationUrl={'https://linkedin.com/in/liam-johnson-36791915a'}
                    imageUrl={require('../../assets/images/linkedin_icon.png')}
                />
            </div>
            <nav className="nav-list" >
                {props.routes.map((route) => {
                    return <a className="nav-item" onClick={() => goToRoute(route.route)}>{route.label}</a>;
                })}
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
