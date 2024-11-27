import { createContext } from "react";

type MessageContext = {
    message: string;
    setMessage: (newMessage: string) => void;
};

export const ToastMessageContext = createContext<MessageContext | null>({
    message: "",
    setMessage: (newMessage: String) => {}
});
