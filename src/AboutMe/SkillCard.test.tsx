import { render } from "@testing-library/react";
import { SkillCard, SkillLevel } from "./SkillCard";

describe('SkillCard', () => {
    it('Should render the skill name', () => {
        const { getByAltText } = render(
            <SkillCard src="http://example.com" name="Banana" skillLevel={SkillLevel.expert} />
        );

        getByAltText('Banana');
    });
});
