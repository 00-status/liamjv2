
import './not-found-page.css';
import { Page } from "../SharedComponents/Page/Page";

const NotFoundPage = () => {
    const routes = [
        { label: 'Landing', route: '/', isHomeLink: true }
    ];
    return <Page title="Liam Johnson" routes={routes}>
        <div className="not-found-page">
            <h1>Page Not Found!</h1>
        </div>
    </Page>;
};

export default NotFoundPage;
