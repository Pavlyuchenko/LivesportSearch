import styles from "./styles/SearchResults.module.css";

import type { SearchStateType, SportCategory } from "../types/apiTypes";
import ResultCategory from "./ResultCategory";
import noResults from "@assets/no_results.svg";

interface ResultProps {
    results: SportCategory[];
    state: SearchStateType;
    searchTerm: string;
}

function SearchResults({ results, state, searchTerm }: ResultProps) {
    return (
        <section className={styles["results-container"]}>
            {state === "ENTER_TEXT" ? (
                <p className={styles["message"]}>
                    Enter at least 2 characters.
                </p>
            ) : state === "NOT_FOUND" ? (
                <div className={styles["message"]}>
                    <img src={noResults} alt="No results found" />
                    <p>No results found.</p>
                </div>
            ) : state === "LOADING" ? (
                <ResultCategory />
            ) : (
                results.map((result, index) => (
                    <ResultCategory
                        key={index}
                        category={result}
                        searchTerm={searchTerm}
                    />
                ))
            )}
        </section>
    );
}

export default SearchResults;
