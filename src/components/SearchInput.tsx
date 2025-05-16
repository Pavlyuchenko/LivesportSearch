import { useState } from "react";
import styles from "./styles/SearchInput.module.css";
import searchIcon from "@assets/search-icon.svg";
import cancelButton from "@assets/cancel.svg";

function SearchInput() {
    const [searchTerm, setSearchTerm] = useState("");

    const handleClear = () => {
        setSearchTerm("");
    };

    return (
        <div className={styles["search-container"]}>
            <div className={styles["search-icon"]}>
                <img src={searchIcon} alt="Search Icon" />
            </div>

            <input
                type="text"
                className={styles["search-input"]}
                placeholder="Hledat..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />

            {searchTerm && (
                <button
                    className={styles["clear-button"]}
                    onClick={handleClear}
                >
                    <img src={cancelButton} alt="Clear Search" />
                </button>
            )}
        </div>
    );
}

export default SearchInput;
