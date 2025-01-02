import { useContext, useEffect, useState } from "react";

import './directory-editor.css';
import { Button } from "../../SharedComponents/Button/Button";
import { PlusIcon } from "../../SharedComponents/Icons/PlusIcon";
import { TextInput } from "../../SharedComponents/TextInput/TextInput";
import { Directory } from "./hooks/directories/useDirectories";
import { Card } from "../../SharedComponents/Card/Card";
import { EditFileIcon } from "../../SharedComponents/Icons/EditFileIcon";
import { ToastMessageContext } from "../../SharedComponents/Toast/ToastMessageContext";

type Props = {
    directory: Directory;
    updateDirectory: (directory: Directory) => void;
};

export const DirectoryEditor = (props: Props) => {
    const { directory, updateDirectory } = props;

    const [serverId, setServerId] = useState<number|null>(directory.serverId);
    const [name, setName] = useState<string>(directory.name);
    const [dateCreated, setDateCreated] = useState<string>(directory.dateCreated);
    const [parentDirectory, setParentDirectory] = useState<number|null>(directory.parentDirectory);
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

    const {setMessageList} = useContext(ToastMessageContext);

    const addSubDirectory = () => {
        if (!currentSubDirectoryId) {
            return;
        }

        const isAlreadyInList = subDirectories.find(subDirectoryId => subDirectoryId == Number(currentSubDirectoryId));

        if (isAlreadyInList) {
            return;
        }

        setSubDirectories((subDirectories) => [...subDirectories, Number(currentSubDirectoryId)])
    };

    const onSave = () => {
        if (!serverId) {
            setMessageList(state => [...state, { message: "Error: Must set a server ID!"}]);

            return;
        }

        const newDirectory: Directory = {
            id: directory.id,
            serverId: serverId,
            name: name,
            dateCreated: dateCreated,
            parentDirectory: parentDirectory,
            subDirectories: subDirectories,
            files: directory.files
        };

        updateDirectory(newDirectory);
    };

    const saveButton = <Button onClick={onSave}>Save Directory <EditFileIcon /></Button>;

    return <Card title={name} button={saveButton}>
        <div className="directory-editor">
            <TextInput
                placeholder="server ID"
                value={serverId || ""}
                onChange={value => setServerId(value ? Number(value) : null)}
            />
            <TextInput
                placeholder="name"
                value={name}
                onChange={value => setName(value || "")}
            />
            <TextInput
                placeholder="date created: 2024-01-01 00:00:00"
                value={dateCreated}
                onChange={value => setDateCreated(value || "")}
            />
            <TextInput
                placeholder="parent directory ID"
                value={parentDirectory || ""}
                onChange={value => setParentDirectory(value ? Number(value) : null)}
            />
            <div className="directory-editor__inline-form">
                <TextInput
                    placeholder="sub-directory ID"
                    value={currentSubDirectoryId}
                    onChange={value => setCurrentSubDirectoryId(value || "")}
                />
                <Button onClick={addSubDirectory}>
                    Add ID <PlusIcon />
                </Button>
            </div>
            <div>
                {subDirectories.map((directoryId: number) => <div>{directoryId}</div>)}
            </div>
            <hr className="divider" />
            <div>
                Files
            </div>
        </div>
    </Card>;
};
