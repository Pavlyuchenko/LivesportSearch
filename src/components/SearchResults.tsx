import type { SportCategory } from "../types/apiTypes";
import ResultCategory from "./ResultCategory";
import type { SearchStateType } from "./SearchComponent";
import styles from "./styles/SearchResults.module.css";

interface ResultProps {
    results: SportCategory[];
    state: SearchStateType;
}

function SearchResults({ results, state }: ResultProps) {
    return (
        <section className={styles["results-container"]}>
            {state === "ENTER_TEXT" ? (
                <p className={styles["message"]}>
                    Enter at least 2 characters.
                </p>
            ) : state === "NOT_FOUND" ? (
                <p className={styles["message"]}>No results found.</p>
            ) : state === "LOADING" ? (
                <p className={styles["message"]}>Loading...</p>
            ) : (
                results.map((result, index) => (
                    <ResultCategory key={index} category={result} />
                ))
            )}
        </section>
    );
}

export default SearchResults;
