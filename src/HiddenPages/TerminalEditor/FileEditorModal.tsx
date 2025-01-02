import { useState } from "react";
import { Modal } from "../../SharedComponents/Modal/Modal";
import { File } from "./hooks/files/useFiles";
import { TextInput } from "../../SharedComponents/TextInput/TextInput";

type Props = {
    isOpen: boolean;
    onClose: () => void;
    file: File;
};

export const FileEditorModal = (props: Props) => {
    const { isOpen, onClose, file } = props;

    const [id, setId] = useState(file.id);
    const [directoryId, setDirectoryId] = useState(file.directoryId);
    const [name, setName] = useState(file.name);
    const [contents, setContents] = useState(file.contents);
    const [encryptionCode, setEncryptionCode] = useState(file.encryptionCode);
    const [creatorUserName, setCreatorUserName] = useState(file.creatorUserName);
    const [dateCreated, setDateCreated] = useState(file.dateCreated);
    const [dateModified, setDateModified] = useState(file.dateModified);

    return <Modal title={id + " | " + name} isOpen={isOpen} onClose={onClose}>
        <div>
            <div>
                <TextInput label="Directory ID" value={directoryId} />
                <TextInput label="Name" value={name} />
            </div>
            <textarea value={contents} />
            <TextInput label="Encryption code" value={encryptionCode} />
            <TextInput label="Creator user name" value={creatorUserName} />
            <TextInput label="Date created" value={dateCreated} />
            <TextInput label="Date modified" value={dateModified} />
        </div>
    </Modal>;
};
