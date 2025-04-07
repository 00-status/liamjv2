import { useRouteError } from "react-router-dom";

import './route-error-boundary.css';
import { TauntIcon } from "../SharedComponents/Icons/TauntIcon";
import { Button } from "../SharedComponents/Button/Button";
import { HomeIcon } from "../SharedComponents/Icons/HomeIcon";

export const RouterErrorBoundary = () => {
    const error = useRouteError();

    console.log(error);
    return <div className="route-error-boundary">
        <div className="route-error-boundary__title">
            <TauntIcon />
            <h1>Something Went Wrong...</h1>
        </div>
        <div className="route-error-boundary__content">
            <p>An unexpected error occured.</p>
            <Button><HomeIcon />To homepage</Button>
        </div>
    </div>;
}