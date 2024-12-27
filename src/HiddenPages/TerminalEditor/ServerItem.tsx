
import "./server-item.css";
import { Button, ButtonTheme } from "../../SharedComponents/Button/Button";
import { TrashIcon } from "../../SharedComponents/Icons/TrashIcon";
import { Server } from "./hooks/server/useServers";

type Props = {
    server: Server;
    onServerDelete: (serverId: number) => void;
    onServerClick: () => void;
};

export const ServerItem = (props: Props) => {
    const { server, onServerDelete, onServerClick } = props;

    return <div className="server-item">
        <div className="server-item__text" onClick={onServerClick}>
            {server.name}
        </div>
        <Button buttonTheme={ButtonTheme.Delete} onClick={() => onServerDelete(server.id)}>
            <TrashIcon />
        </Button>
    </div>
};
