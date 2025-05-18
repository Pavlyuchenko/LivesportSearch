import { useState } from "react";
import type { SearchResponse, SportCategory } from "../../types/apiTypes";
import { getPathFromParams } from "../../utils/apiUtils";
import type { SearchStateType } from "../SearchComponent";
import { transformData } from "../../utils/transformData";

export const useDebounceSearch = () => {
    const [debounceTimeout, setDebounceTimeout] =
        useState<NodeJS.Timeout | null>(null);
    const [searchState, setSearchState] =
        useState<SearchStateType>("ENTER_TEXT");
    const [results, setResults] = useState<SportCategory[]>([]);

    function fetchData(
        searchTerm: string,
        typeIds: number[]
    ): Promise<SearchResponse[]> {
        let route = getPathFromParams({
            q: searchTerm,
            "type-ids": typeIds,
            "sport-ids": [1, 2, 3, 4, 5, 6, 7, 8, 9],
        });

        return fetch(route).then((response) => {
            if (!response.ok) {
                return response.json().then((error) => {
                    throw error;
                });
            }
            return response.json() as Promise<SearchResponse[]>;
        });
    }

    function debounceSearch(
        value: string,
        typeIds: number[],
        delay: number = 250
    ): void {
        if (value.length <= 1) {
            setResults([]);
            setSearchState("ENTER_TEXT");
            return;
        }

        if (debounceTimeout) {
            clearTimeout(debounceTimeout);
        }
        setSearchState("LOADING");

        setDebounceTimeout(
            setTimeout(() => {
                fetchData(value, typeIds).then((data) => {
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

    return {
        debounceSearch,
        searchState,
        results,
    };
};
