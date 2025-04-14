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
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
};

// TODO:
//      Consider adding full nav tree to the navbar
//          // That is, consider doing an accordion type sitch for nav sub-items.
//      Create terminal theme
//      Update page tests.
//      Consider updating the border on menu items to look a bit nicer/fancier.
//      Make the sidebar take up more of the screen width on mobile.
//      Have the menu button follow the user when they scroll on mobile.

export const VerticalNav = (props: Props) => {
    const { routes, isOpen, setIsOpen } = props;

    const navigate = useNavigate();
    const location = useLocation();

    const goToRoute = (newPath: string) => {
        setIsOpen(false);

        if (newPath !== location.pathname) {
            setTimeout(() => navigate(newPath), 150);
        }
    };

    return <>
        <div
            className={"vertical-nav__overlay" + (isOpen ? " vertical-nav__overlay--open" : "")}
            onClick={() => setIsOpen(false)}
        />
        <div className={"vertical-nav" + (isOpen ? " vertical-nav--open" : "")}>
            <div className="vertical-nav__header">
                <div className="vertical-nav__header-button" onClick={() => setIsOpen(false)}>
                    <Icon iconType={IconType.MENU} iconTheme={IconTheme.DARK} />
                </div>
                <h3>Liam Johnson</h3>
            </div>
            <nav className="vertical-nav__list">
                {routes.map((route) => {
                    const isCurrentRoute = location.pathname === route.route;

                    const classNames = "vertical-nav__item" + (isCurrentRoute ? " vertical-nav__item--current" : "");

                    return <a key={route.route} className={classNames} onClick={() => goToRoute(route.route)}>
                        {route.label}
                        {route.isHomeLink && <Icon iconType={IconType.HOME} iconTheme={IconTheme.DARK} />}
                    </a>;
                })}
            </nav>
        </div>
    </>;
};
