import { render } from "@testing-library/react";
import { SkillGrid } from "./SkillGrid";

describe('SkillGrid', () => {
    it('should render a lilst of skills', () => {
        const { getByAltText } = render(<SkillGrid />);

        getByAltText('React');
        getByAltText('TypeScript');
        getByAltText('Flow');
        getByAltText('Vue');
        getByAltText('Webpack');
    });
});
