import { render } from "@testing-library/react";
import { SkillCard, SkillLevel } from "./SkillCard";

describe('SkillCard', () => {
    it('Should render the skill name', () => {
        const { getByAltText, getByText } = render(
            <SkillCard src="http://example.com" name="Banana" type="Fruit" skillLevel={SkillLevel.expert} />
        );

        getByAltText('Banana');
        getByText('Banana');
        getByText('Fruit');
    });
});
