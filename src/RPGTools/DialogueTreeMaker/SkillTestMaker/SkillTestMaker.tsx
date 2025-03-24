import { TextInput } from "../../../SharedComponents/TextInput/TextInput";
import { SkillTest } from "../domain/types";

type Props = {
    currentSkillTest: SkillTest;
    onSave: (skillTest: SkillTest) => void;
    onDelete: () => void;
};

export const SkillTestMaker = (props: Props) => {
    const { currentSkillTest, onSave, onDelete } = props;

    return <div>
        <div>
            <h2>{currentSkillTest.name}</h2>
        </div>
        <div>
            <TextInput
                id="skill-test-id"
                label="Skill Test ID"
                value={currentSkillTest.id}
                readonly
            />
            <TextInput
                id="skill-test-name"
                label="Skill Test Name"
                value={currentSkillTest.name}
                onChange={(value) => value ? onSave({...currentSkillTest, name: value}) : null}
            />
        </div>
    </div>
};
