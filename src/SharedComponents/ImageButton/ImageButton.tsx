import './image-button.css';

type Props = {
    url: string;
};

export const ImageButton = (props: Props) => {
    return <a href="https://github.com/00-status" target="_blank" rel="noopener noreferrer">
        <img className="image-button__image"src={props.url} />
    </a>;
};
