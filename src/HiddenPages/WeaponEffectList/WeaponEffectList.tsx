import { Page } from "../../SharedComponents/Page/Page";

export const WeaponEffectList = () => {
    // Fetch list of Weapon Effects
    // When the user clicks on a particular effect.
    //      Route to that weapon effect's page.
    // Have a "Create new" button that routes to the weapon_effect page.

    return <Page title="Weapon Effects" routes={[{label: "Landing", route: "/", isHomeLink: true}]}>
        <div>
            <h1>Weapon Effect List</h1>
            <div>
                List
            </div>
        </div>
    </Page>
};
