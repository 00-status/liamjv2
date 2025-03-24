
import "./skill-test-maker.css";
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
        <div className="skill-test-maker__form">
            <TextInput
                id="skill-test-id"
                label="ID"
                value={currentSkillTest.id}
                readonly
            />
            <TextInput
                id="skill-test-name"
                label="Name"
                value={currentSkillTest.name}
                onChange={(value) => value ? onSave({...currentSkillTest, name: value}) : null}
            />
            <TextInput
                id="skill-test-skill-id"
                label="Skill ID"
                value={currentSkillTest.skillID}
                onChange={(value) => value ? onSave({...currentSkillTest, skillID: value}) : null}
            />
            <TextInput
                id="skill-test-next-dialogue-id"
                label="Next Dialogue ID"
                value={currentSkillTest.nextDialogueID ?? ""}
                onChange={(value) => onSave({...currentSkillTest, nextDialogueID: value ? Number(value) : null})}
                numbersOnly={true}
            />
        </div>
    </div>
};
