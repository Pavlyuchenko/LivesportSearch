import SearchInput from "@components/SearchInput";
import SearchResults from "@components/SearchResults";
import Filters from "@components/Filters";
import styles from "./styles/SearchComponent.module.css";
import { getPathFromParams } from "../utils/apiUtils";
import { handleApiError } from "./errors/errors";
import type { SearchResponse, SportCategory } from "../types/apiTypes";
import { useState } from "react";
import { transformData } from "../utils/transformData";

// as specified in the documentation
const typeIdsMap = {
    ALL: {
        text: "Vše",
        value: [1, 2, 3, 4],
    },
    SOUTEZE: {
        text: "Soutěže",
        value: [1],
    },
    TYMY: {
        text: "Týmy",
        value: [2, 3, 4],
    },
};

function SearchComponent() {
    let [results, setResults] = useState<SportCategory[]>([]);

    let [typeIds, setTypeIds] = useState<number[]>(typeIdsMap.ALL.value);

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
    function debounceSearch(value: string): void {
        if (value.length <= 1) {
            // set results to empty
            console.log("Search term too short");
            return;
        }

        // debounce the search
        if (debounceTimeout) {
            console.log("Clearing timeout");
            clearTimeout(debounceTimeout);
        }
        setDebounceTimeout(
            setTimeout(() => {
                fetchData(value).then((data) => {
                    const transformedData = transformData(data);
                    console.log("Transformed data:", transformedData);
                    setResults(transformedData);
                });
                setDebounceTimeout(null);
            }, 300)
        );
    }

    return (
        <section className={styles["search-component"]}>
            <h1>Vyhledávání</h1>
            <SearchInput debounceSearch={debounceSearch} />
            <hr />
            <Filters
                typeIds={typeIds}
                setTypeIds={setTypeIds}
                typeIdsMap={typeIdsMap}
            />
            <SearchResults results={results} />
        </section>
    );
}

export default SearchComponent;
