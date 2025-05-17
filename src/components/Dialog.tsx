import { useEffect, useState } from "react";
import styles from "./styles/Dialog.module.css";

interface DialogProps {
    message: string;
    isOpen: boolean;
    onClose: () => void;
    onRefresh: () => void;
}

function Dialog({ message, isOpen, onClose, onRefresh }: DialogProps) {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        if (isOpen) {
            setVisible(true);
        } else {
            setVisible(false);
        }
    }, [isOpen]);

    if (!visible) return null;

    return (
        <div
            className={`${styles["dialog-overlay"]} ${
                isOpen ? styles["open"] : styles["closing"]
            }`}
        >
            <div className={styles["dialog-container"]}>
                <div className={styles["dialog-content"]}>
                    <h2>Error</h2>
                    <p>{message}</p>
                    <p>Clicking the button below will refresh the page.</p>
                    <div className={styles["dialog-actions"]}>
                        <button
                            onClick={onRefresh}
                            className={styles["refresh-button"]}
                        >
                            Refresh
                        </button>
                        <button
                            onClick={onClose}
                            className={styles["close-button"]}
                        >
                            Close
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Dialog;
