import { useLocation, useNavigate } from "react-router-dom";

import './vertical-nav.css';
import { IconTheme, IconType } from "../Icon/domain";
import { Icon } from "../Icon/Icon";

export type PageLink = {
    label: string;
    route: string;
    isHomeLink?: boolean;
};

type Props = {
    routes: Array<PageLink>;
};

export const VerticalNav = (props: Props) => {
    const { routes } = props;

    const navigate = useNavigate();
    const location = useLocation();

    const goToRoute = (newPath: string) => {
        if (newPath !== location.pathname) {
            navigate(newPath);
        }
    };
    return <div className="vertical-nav">
        <nav className="vertical-nav__list">
            {routes.map((route) => {
                const isCurrentRoute = location.pathname === route.route;

                const classNames = `vertical-nav__item' ${isCurrentRoute ? ' vertical-nav__item--current' : ''}`;

                return <a key={route.route} className={classNames} onClick={() => goToRoute(route.route)}>
                    {route.isHomeLink && <Icon iconType={IconType.HOME} iconTheme={IconTheme.DARK} />}
                    {route.label}
                </a>;
            })}
        </nav>
    </div>;
};
