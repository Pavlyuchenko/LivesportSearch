import type { SportCategory } from "../types/apiTypes";
import ResultCategory from "./ResultCategory";
import type { SearchStateType } from "./SearchComponent";
import styles from "./styles/SearchResults.module.css";
import noResults from "@assets/no_results.svg";

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
                <div className={styles["message"]}>
                    <img src={noResults} alt="No results found" />
                    <p>No results found.</p>
                </div>
            ) : state === "LOADING" ? (
                <ResultCategory />
            ) : (
                results.map((result, index) => (
                    <ResultCategory key={index} category={result} />
                ))
            )}
        </section>
    );
}

export default SearchResults;
