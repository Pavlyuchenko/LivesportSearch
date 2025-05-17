import SearchInput from "@components/SearchInput";
import SearchResults from "@components/SearchResults";
import Filters from "@components/Filters";
import styles from "./styles/SearchComponent.module.css";
import { getPathFromParams } from "../utils/apiUtils";
import { handleApiError } from "./errors/errors";
import type { SearchResponse, SportCategory } from "../types/apiTypes";
import { useEffect, useState } from "react";
import { transformData } from "../utils/transformData";
import { useSearchParams, useNavigate } from "react-router-dom";

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
    const navigate = useNavigate();

    let [searchState, setSearchState] = useState<SearchStateType>("ENTER_TEXT");
    let [searchTerm, setSearchTerm] = useState<string>(
        searchParams.get("q") || ""
    );
    let [results, setResults] = useState<SportCategory[]>([]);

    let [typeIds, setTypeIds] = useState<number[]>(typeIdsMap.ALL.value);

    // Initial load from URL parameters
    useEffect(() => {
        if (searchParams.get("q") && searchParams.get("q")!.length > 1) {
            debounceSearch(searchParams.get("q") || "", 0);
        }
    }, []);

    useEffect(() => {
        debounceSearch(searchTerm, 0);
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

    function fetchData(searchTerm: string): Promise<SearchResponse[]> {
        let route = getPathFromParams({
            q: searchTerm,
            "type-ids": typeIds,
            "sport-ids": [1, 2, 3, 4, 5, 6, 7, 8, 9],
        });

        return fetch(route).then((response) => {
            if (!response.ok) {
                return response.json().then((error) => {
                    handleApiError(error);
                    throw error;
                });
            }
            return response.json() as Promise<SearchResponse[]>;
        });
    }

    let [debounceTimeout, setDebounceTimeout] = useState<NodeJS.Timeout | null>(
        null
    );
    function debounceSearch(value: string, delay: number = 250): void {
        if (value.length <= 1) {
            // set results to empty
            setResults([]);
            setSearchState("ENTER_TEXT");
            return;
        }

        // debounce the search
        if (debounceTimeout) {
            clearTimeout(debounceTimeout);
        }
        setSearchState("LOADING");

        setDebounceTimeout(
            setTimeout(() => {
                fetchData(value).then((data) => {
                    const transformedData = transformData(data);
                    setResults(transformedData);

                    if (transformedData.length === 0) {
                        setSearchState("NOT_FOUND");
                        return;
                    }
                    setSearchState("LOADED");
                });
                setDebounceTimeout(null);
            }, delay)
        );
    }

    return (
        <section className={styles["search-component"]}>
            <SearchInput
                debounceSearch={debounceSearch}
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
        </section>
    );
}

export default SearchComponent;
