import { useLocation, useNavigate } from "react-router-dom";

import './horizontal-nav.css';
import { PageLink } from "./domain";

type Props = {
    routes: Array<PageLink>;
};

export const HorizontalNav = (props: Props) => {
    const { routes } = props;

    const navigate = useNavigate();
    const location = useLocation();

    const goToRoute = (newPath: string) => {
        if (newPath !== location.pathname) {
            console.log("PING!");
            setTimeout(() => navigate(newPath), 150);
            console.log("PONG!");
        }
    };

    return <div className="horizontal-nav">
        {routes.map((route) => {
            return <a key={route.route} className="horizontal-nav__item" onClick={() => goToRoute(route.route)}>
                {route.label}
            </a>;
        })}
    </div>;
};
