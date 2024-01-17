import { ReactElement } from "react";
import { SkillGrid } from "./SkillGrid";
import { Page } from "../SharedComponents/Page/Page";

export const AboutMe = (): ReactElement => {
    return <Page title="Liam Johnson">
        <div>
            <div>
                <h1>About Me</h1>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer congue risus vitae dolor tempus accumsan. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Curabitur eget condimentum felis. Morbi scelerisque augue tellus. Ut in pharetra massa. Sed placerat urna a tortor efficitur dignissim at quis ex. Fusce nec metus et tellus pulvinar maximus. Donec turpis ex, facilisis et lectus non, pretium eleifend orci.</p>
                <p>Morbi mollis urna id suscipit suscipit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus est odio, ultrices nec quam sit amet, hendrerit tempus ligula. Fusce mollis, sem nec dapibus rutrum, metus mauris posuere mi, sed dictum diam purus et ante. Nunc nibh sem, fermentum id diam finibus, vulputate accumsan eros. Aliquam ultrices enim ut sem aliquet, mollis auctor odio lacinia. Aliquam sit amet dui sit amet diam elementum egestas. Suspendisse malesuada id leo ut egestas.</p>
                <p>Nullam lobortis est orci, nec egestas arcu pharetra nec. Phasellus nec nulla elit. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Proin luctus nunc ex, nec commodo ante rutrum vitae. Mauris nec faucibus leo. In interdum velit neque, et facilisis quam semper volutpat. Nunc sodales magna a justo convallis fringilla. Ut ac nibh ac nibh consequat dictum a in sapien. Donec vitae tortor ac nulla lobortis blandit. Pellentesque non pharetra ante. In facilisis, ex nec tristique vulputate, velit nisi auctor magna, quis dapibus justo lectus in est. Nulla aliquam facilisis auctor. Praesent finibus dui a diam posuere pellentesque at vel justo.</p>
                <p>Duis at risus consectetur, molestie nisl vitae, placerat dolor. Sed leo nulla, dapibus a tellus non, ultrices aliquet mauris. Phasellus quis tempor neque, et ultricies lacus. Nullam malesuada lorem eget odio hendrerit commodo. Phasellus finibus ex mi, id tincidunt ipsum facilisis quis. Vivamus eget erat tortor. Mauris vel semper nibh. Fusce facilisis ac justo nec fermentum. Cras sollicitudin facilisis lacus convallis ullamcorper. Fusce aliquam, lectus at ultrices viverra, lectus lectus posuere enim, in fringilla dolor massa sit amet est. Sed semper iaculis velit, non gravida risus feugiat eget. Maecenas dignissim augue facilisis, ornare arcu quis, pharetra ligula.</p>
            </div>
            <div>
                <h1>Cards</h1>
                <SkillGrid />
            </div>
        </div>
    </Page>;
};
