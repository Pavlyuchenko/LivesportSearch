import SearchInput from "@components/SearchInput";
import SearchResults from "@components/SearchResults";
import Filters from "@components/Filters";
import styles from "./styles/SearchComponent.module.css";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Dialog from "./Dialog";
import { useDebounceSearch } from "./hooks/useDebounceSearch";

// as specified in the documentation
const typeIdsMap = {
    ALL: {
        text: "All",
        value: [1, 2, 3, 4],
    },
    SOUTEZE: {
        text: "Competitions",
        value: [1],
    },
    TYMY: {
        text: "Teams",
        value: [2, 3, 4],
    },
};

export type SearchStateType = "LOADED" | "LOADING" | "NOT_FOUND" | "ENTER_TEXT";

function SearchComponent() {
    const [searchParams, setSearchParams] = useSearchParams();
    const { debounceSearch, searchState, results } = useDebounceSearch();

    const [error, setError] = useState<string | null>(null);
    let [searchTerm, setSearchTerm] = useState<string>(
        searchParams.get("q") || ""
    );
    let [typeIds, setTypeIds] = useState<number[]>(typeIdsMap.ALL.value);
    let [hasInitialLoad, setHasInitialLoad] = useState(false);

    useEffect(() => {
        if (!hasInitialLoad) {
            if (searchParams.get("q") && searchParams.get("q")!.length > 1) {
                debounceSearch(searchParams.get("q") || "", typeIds, 0);
            }
            setHasInitialLoad(true);
        } else {
            debounceSearch(searchTerm, typeIds, 0);
        }
    }, [typeIds]);

    // Update URL when search term changes
    useEffect(() => {
        if (searchTerm.length > 1) {
            setSearchParams({ q: searchTerm });
        } else if (searchTerm.length === 0 && searchParams.has("q")) {
            // Clear the query parameter if search is empty
            searchParams.delete("q");
            setSearchParams(searchParams);
        }
    }, [searchTerm, setSearchParams]);

    return (
        <section className={styles["search-component"]}>
            <SearchInput
                debounceSearch={(searchTerm: string) =>
                    debounceSearch(searchTerm, typeIds)
                }
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
            />
            <Filters
                typeIds={typeIds}
                setTypeIds={setTypeIds}
                typeIdsMap={typeIdsMap}
            />
            <SearchResults
                results={results}
                state={searchState}
                searchTerm={searchTerm}
            />

            {error && (
                <Dialog
                    message={error}
                    isOpen={!!error}
                    onClose={() => setError(null)}
                    onRefresh={() => {
                        setError(null);
                        window.location.href = "/";
                    }}
                />
            )}
        </section>
    );
}

export default SearchComponent;
