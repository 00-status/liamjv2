type Props = {
    theme?: HomeThemes;
};

export enum HomeThemes {
    DARK = "dark",
    GREEN = "green"
};

export const HomeIcon = (props: Props) => {
    return <svg className={props.theme === HomeThemes.GREEN ? 'icon-green' : "icon-dark"} role="img" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368">
        <title>Home</title>
        <path d="M240-200h120v-240h240v240h120v-360L480-740 240-560v360Zm-80 80v-480l320-240 320 240v480H520v-240h-80v240H160Zm320-350Z"/>
    </svg>;
};
