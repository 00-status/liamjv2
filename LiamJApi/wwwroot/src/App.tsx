import { ReactElement } from "react";

import { Page } from "./SharedComponents/Page/Page";
import { AboutMe } from "./AboutMe/AboutMe";

export const App = (): ReactElement => {
    return <Page title="Liam Johnson"><AboutMe /></Page>;
};
