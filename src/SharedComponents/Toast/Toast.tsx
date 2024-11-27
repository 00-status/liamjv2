import { useContext, useEffect } from "react";

import "./toast.css";
import { ToastMessageContext } from "./ToastMessageContext";

export const Toast = () => {
    const { messageList, setMessageList } = useContext(ToastMessageContext);

    useEffect(() => {
        const messageListCopy = [...messageList];
        messageListCopy.shift();

        const timeoutID = setTimeout(() => setMessageList(messageListCopy), 2000);

        return () => clearTimeout(timeoutID);
    }, [messageList]);

    if (!messageList[0]) {
        return null;
    }

    return <div className={"toast " + (messageList[0] ? "toast__visible" : "")}>
        {messageList[0].message}
    </div>;
};
