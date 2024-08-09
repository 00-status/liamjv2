import { ReactElement } from "react";
import { Page } from "../SharedComponents/Page/Page";
import { Skill, skills } from "./domain";
import { SkillCard } from "./SkillCard";

export const AboutMe = (): ReactElement => {
    const routes = [
        { label: 'About', route: '/' },
        { label: 'Dice Roller', route: '/dice_roller' },
        { label: 'Weapon Maker', route: '/weapon_maker' },
    ];
    return <Page title="Liam Johnson" routes={routes}>
        <div>
            <div>
                <h1>About Me</h1>
                <p>Hey, I'm Liam Johnson. Welcome! Have a seat. Take a look around.</p>
                <p>I'm a full-stack developer from Saskatoon, Saskatchewan with a little more than five years of industry experience. On a technical level, I'm familiar with a spread of languages and frameworks ranging from React and TypeScript to PHP and SQL. I've noodled with endpoints, architected data models, applied various programming patterns practically, and wrestled with the serpentine beast that is storing temporal data.</p>
                <p>Working in Saskatchewan, I've had the pleasure of learning from a host of talented people over the years, and have gained experience researching, pitching, and leading both product and engineering projects. Feel free to check out the repository for <a target="_blank" rel="noopener noreferrer" href="https://github.com/00-status/liamjv2">this website</a> if you're curious about my technical work.</p>
                <p>Outside of software development, I have a great interest both in creating stories and experiencing them; Movies, books, tv-shows, table-top games, writing, and video games all have a special place in my - deeply nerdy - heart.</p>
                <p>If you're interested in getting in touch with me, feel free to shoot me a message on <a target="_blank" rel="noopener noreferrer" href="https://www.linkedin.com/in/liam-johnson-36791915a/">LinkedIn</a>.</p>
            </div>
            <div>
                <h2>Skills</h2>
                <div className="skill-grid">
                    {skills.map((skill: Skill) => <SkillCard key={skill.name} {...skill} />)}
                </div>
            </div>
        </div>
    </Page>;
};
