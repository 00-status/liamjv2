import './tile.css';

type Props = {
    type: string;
    onClick: () => void;
};

export const Tile = (props: Props) => {
    const { type, onClick } = props;

    const classNames = "tile " + "tile--" + type.toLowerCase();

    return <div className={classNames} onClick={onClick}>
        {""}
    </div>
};
