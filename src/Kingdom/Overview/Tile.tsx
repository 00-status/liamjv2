import './tile.css';

type Props = {
    type: string;
};

export const Tile = (props: Props) => {
    const { type } = props;

    const classNames = "tile " + "tile--" + type.toLowerCase();

    return <div className={classNames}>
        {type}
    </div>
};
