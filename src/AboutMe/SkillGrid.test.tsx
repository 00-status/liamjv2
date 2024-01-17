import { render } from "@testing-library/react";
import { SkillGrid } from "./SkillGrid";

describe('SkillGrid', () => {
    it('should render a lilst of skills', () => {
        const { getByText } = render(<SkillGrid />);

        getByText('React');
        getByText('TypeScript');
        getByText('Flow');
        getByText('Vue');
        getByText('Webpack');
    });
});
