import { ReactNode } from "react";
import ReactModal from "react-modal";

import './modal.css';
import { Button, ButtonTheme } from "../Button/Button";
import { CloseIcon } from "../Icons/CloseIcon";

type Props = {
    title: string;
    children: ReactNode;
    footer?: ReactNode;
    isOpen: boolean;
    onClose: () => void;
};

ReactModal.setAppElement("#app");

export const Modal = (props: Props) => {
    return <ReactModal className="modal" overlayClassName="modal-overlay" isOpen={props.isOpen}>
        <div className="modal__contents">
            <div className="modal__title">
                <h2>{props.title}</h2>
                <Button buttonTheme={ButtonTheme.Subtle} onClick={props.onClose}><CloseIcon /></Button>
            </div>
            <div className="modal__body">
                {props.children}
            </div>
            <div className="modal__footer">
                {props.footer}
            </div>
        </div>
    </ReactModal>;
};
