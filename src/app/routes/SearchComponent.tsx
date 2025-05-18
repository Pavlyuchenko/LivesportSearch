import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import styles from "./styles/SearchComponent.module.css";

import SearchInput from "@components/SearchInput";
import SearchResults from "@components/SearchResults";
import Filters from "@components/Filters";
import Dialog from "@components/Dialog";
import useDebounceSearch from "@hooks/useDebounceSearch";
import { TYPE_IDS_MAP } from "@utils/constants";

function SearchComponent() {
    const [error, setError] = useState<string | null>(null);

    const { debounceSearch, searchState, results } = useDebounceSearch({
        onError: (errorMessage: string) => setError(errorMessage),
    });

    const [searchParams, setSearchParams] = useSearchParams();
    let [searchTerm, setSearchTerm] = useState<string>(
        searchParams.get("q") || ""
    );

    // typeIDs are API parameters for filtering (1, 2, 3, 4)
    let [typeIds, setTypeIds] = useState<number[]>(TYPE_IDS_MAP.ALL.value);
    let [hasInitialLoad, setHasInitialLoad] = useState(false);

    // Load initial results based on URL parameters
    // load results if typeIds changes
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
            <Filters typeIds={typeIds} setTypeIds={setTypeIds} />
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
