import { useRouteError } from "react-router-dom";

import './route-error-boundary.css';
import { TauntIcon } from "../SharedComponents/Icons/TauntIcon";
import { Button } from "../SharedComponents/Button/Button";
import { HomeIcon, HomeThemes } from "../SharedComponents/Icons/HomeIcon";

export const RouterErrorBoundary = () => {
    const error = useRouteError();

    console.error(error);
    return <div className="route-error-boundary">
        <div className="route-error-boundary__title">
            <TauntIcon />
            <h1>Something Went Wrong...</h1>
        </div>
        <div className="route-error-boundary__content">
            <p>An unexpected error occured.</p>
            <Button onClick={() => {
                window.location.href = "/";
            }}>
                <HomeIcon theme={HomeThemes.LIGHT} />To homepage
            </Button>
        </div>
    </div>;
}