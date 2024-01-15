import { render } from "@testing-library/react";
import { SkillCard, SkillLevel } from "./SkillCard";

describe('SkillCard', () => {
    it('Should render the skill name', () => {
        const { getByText } = render(<SkillCard name="Banana" color="#F3A712" skillLevel={SkillLevel.expert} />);

        getByText('Banana');
    });
});
