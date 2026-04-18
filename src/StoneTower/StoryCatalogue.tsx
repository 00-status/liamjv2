import { Button } from '../SharedComponents/Button/Button';

import { storyNames } from './domain/constants';

type Props = { updateCurrentStory: (storyName: string) => void };

export const StoryCatalogue = ({ updateCurrentStory }: Props) => {
    return (
        <div>
            {storyNames.map((story) => (
                <Button key={story} onClick={() => updateCurrentStory(story)}>
                    {story}
                </Button>
            ))}
        </div>
    );
};
