import { ReactElement, ReactNode, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { gtag } from "ga-gtag";

import "./app.css";
import { ImageButton } from "../ImageButton/ImageButton";
import { HomeIcon, HomeThemes } from "../Icons/HomeIcon";
import { ToastMessage, ToastMessageContext } from "../Toast/ToastMessageContext";
import { Toast } from "../Toast/Toast";

type Link = {
    label: string;
    route: string;
    isHomeLink?: boolean;
};

type Props = {
    title: string;
    routes: Array<Link>;
    children: ReactNode;
    footer?: ReactElement;
};

export const Page = (props: Props): ReactElement => {
    const { title, routes, children, footer } = props;

    const [messageList, setMessageList] = useState<Array<ToastMessage>>([]);

    const navigate = useNavigate();
    const location = useLocation();

    const goToRoute = (newPath: string) => {
        if (newPath !== location.pathname) {
            navigate(newPath);
        }
    };

    useEffect(() => {
        const currentRoute = routes.find((route) => route.route === location.pathname);

        if (currentRoute) {
            gtag("event", "page_view", {
                "page_location": currentRoute.route,
                "page_title": currentRoute.label
            });
        }
    }, [routes, location]);

    return <ToastMessageContext.Provider value={{ messageList, setMessageList }}>
        <div className="page">
            <div className="page-title-container">
                <div className="page-title">
                    {title}
                    <div className="icon-list">
                        <ImageButton
                            locationUrl={"https://github.com/00-status"}
                            imageUrl={"https://liamj.b-cdn.net/assets/images/github_cat_icon.svg"}
                        />
                        <ImageButton
                            locationUrl={'https://linkedin.com/in/liam-johnson-36791915a'}
                            imageUrl={'https://liamj.b-cdn.net/assets/images/linkedin_icon.png'}
                        />
                    </div>
                </div>
                <nav className="nav-list" >
                    {routes.map((route) => {
                        const isCurrentRoute = location.pathname === route.route;

                        const classNames = 'nav-item' + (isCurrentRoute ? ' nav-item__current' : '');

                        return <a key={route.route} className={classNames} onClick={() => goToRoute(route.route)}>
                            { route.isHomeLink && <HomeIcon theme={HomeThemes.DARK} /> }
                            {route.label}
                        </a>;
                    })}
                </nav>
            </div>
            <div className="page-content-container">
                {children}
            </div>
            <div className="footer">
                <hr className="divider" />
                {footer}
            </div>
            <Toast />
        </div>
    </ToastMessageContext.Provider>;
};
