import './story-card.css';
import { Button } from '../../SharedComponents/Button/Button';

type Props = {
    label: string;
    description: string;
    onStorySelect: () => void;
};

export const StoryCard = ({ label, description, onStorySelect }: Props) => {
    return (
        <div className="story-card">
            <h3>{label}</h3>
            <div className="story-card__contents">
                <div>{description}</div>
                <Button onClick={onStorySelect}>Venture Forth!</Button>
            </div>
        </div>
    );
};
