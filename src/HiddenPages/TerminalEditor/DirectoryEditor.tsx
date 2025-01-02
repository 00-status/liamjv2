import { useEffect, useState } from "react";

import { Button } from "../../SharedComponents/Button/Button";
import { PlusIcon } from "../../SharedComponents/Icons/PlusIcon";
import { TextInput } from "../../SharedComponents/TextInput/TextInput";
import { Directory } from "./hooks/directories/useDirectories";
import { Card } from "../../SharedComponents/Card/Card";
import { EditFileIcon } from "../../SharedComponents/Icons/EditFileIcon";

type Props = {
    directory: Directory;
    updateDirectory: (directory: Directory) => void;
};

export const DirectoryEditor = (props: Props) => {
    const { directory } = props;

    const [serverId, setServerId] = useState<number>(directory.serverId);
    const [name, setName] = useState<string>(directory.name);
    const [dateCreated, setDateCreated] = useState<string>(directory.dateCreated);
    const [parentDirectory, setParentDirectory] = useState<number>(directory.parentDirectory);
    const [subDirectories, setSubDirectories] = useState<Array<number>>(directory.subDirectories);

    const [currentSubDirectoryId, setCurrentSubDirectoryId ] = useState("");

    useEffect(() => {
        setServerId(directory.id)
        setName(directory.name)
        setDateCreated(directory.dateCreated)
        setParentDirectory(directory.parentDirectory)
        setSubDirectories(directory.subDirectories)
    }, [
        setServerId,
        setName,
        setDateCreated,
        setParentDirectory,
        setSubDirectories,
        directory
    ]);

    const saveButton = <Button>Save Directory <EditFileIcon /></Button>;

    return <Card title={name} button={saveButton}>
        <div>
            <TextInput placeholder="server ID" value={serverId} />
            <TextInput placeholder="name" value={name} />
            <TextInput placeholder="date created: 2024-01-01 00:00:00" value={dateCreated} />
        </div>
        <div>
            <TextInput placeholder="parent directory ID" value={parentDirectory} />
            <div>
                <TextInput placeholder="child directory ID" value={currentSubDirectoryId} />
                <Button>
                    <PlusIcon />
                </Button>
            </div>
        </div>
        <div>
            <div>
                {subDirectories.map((directoryId: number) => <div>{directoryId}</div>)}
            </div>
        </div>
        <hr className="divider" />
        <div>
            Files
        </div>
    </Card>;
};
