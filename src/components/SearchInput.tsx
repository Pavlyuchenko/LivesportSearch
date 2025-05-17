import { useState } from "react";
import styles from "./styles/SearchInput.module.css";
import searchIcon from "@assets/search-icon.svg";
import cancelButton from "@assets/cancel.svg";

interface SearchInputProps {
    debounceSearch: (value: string) => void;
    searchTerm: string;
    setSearchTerm: (value: string) => void;
}

function SearchInput({
    debounceSearch,
    searchTerm,
    setSearchTerm,
}: SearchInputProps) {
    const handleClear = () => {
        setSearchTerm("");
        debounceSearch("");
    };

    return (
        <div className={styles["search-input-container"]}>
            <h1>Search</h1>
            <div className={styles["search-container"]}>
                <div className={styles["search-icon"]}>
                    <img src={searchIcon} alt="Search Icon" />
                </div>

                <input
                    type="text"
                    className={styles["search-input"]}
                    placeholder="Hledat..."
                    value={searchTerm}
                    onChange={(e) => {
                        setSearchTerm(e.target.value);
                        debounceSearch(e.target.value);
                    }}
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
            <hr />
        </div>
    );
}

export default SearchInput;
