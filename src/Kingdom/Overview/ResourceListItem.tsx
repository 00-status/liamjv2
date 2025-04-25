
import './resource-list-item.css';
import { Resource } from "./domain/types";

type Props = {
    resource: Resource;
};

export const ResourceListItem = (props: Props) => {
    const {label, count} = props.resource;

    return <div className="resource-list-item">
        <h4 className="resource-list-item__label">
            {label}
        </h4>
        <div>
            {count}
        </div>
    </div>;
};
