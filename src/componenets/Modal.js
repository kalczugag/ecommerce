import ReactDOM from "react-dom";
import { useEffect } from "react";

const Modal = ({ onClose, children }) => {
    useEffect(() => {
        document.body.classList.add("overflow-hidden");
        return () => document.body.classList.remove("overflow-hidden");
    }, []);

    return ReactDOM.createPortal(
        <div>
            <div
                onClick={onClose}
                className="fixed inset-0 bg-gray-300 opacity-80"
            ></div>
            <div className="fixed left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 max-w-full p-10 bg-white">
                <div className="flex flex-col justify-between h-full">
                    {children}
                </div>
            </div>
        </div>,
        document.querySelector(".modal-container")
    );
};

export default Modal;
