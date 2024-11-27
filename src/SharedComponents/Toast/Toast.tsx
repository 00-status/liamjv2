import { useContext, useEffect, useState } from "react";
import "./toast.css";
import { ToastMessageContext } from "./ToastMessageContext";

export const Toast = () => {
    const messsage = useContext(ToastMessageContext);
    const [isVisible, setIsVisible] = useState<boolean>(false);

    useEffect(() => {
        if (messsage?.message) {
            setIsVisible(true);
        }

        const timeoutID = setTimeout(() => setIsVisible(false), 2000);

        return () => clearTimeout(timeoutID);
    }, [messsage?.message]);

    return <div className={"toast " + (isVisible ? "toast__visible" : "")}>
        {messsage?.message}
    </div>;
};
