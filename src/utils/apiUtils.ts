import type { SearchParams } from "../types/apiTypes";
import { SEARCH_API_URL } from "./constants";

export const getPathFromParams = (params: SearchParams): string => {
    const {
        q,
        "type-ids": typeIds,
        "project-type-id": projectTypeId = 1, // Provided by the task
        "project-id": projectId = 602, // Provided by the task
        "lang-id": langId = 1, // Provided by the task
        "sport-ids": sportIds,
    } = params;

    const queryParams = new URLSearchParams({
        q,
        "type-ids": typeIds.join(","),
        ...(projectTypeId && { "project-type-id": projectTypeId.toString() }),
        ...(projectId && { "project-id": projectId.toString() }),
        ...(langId && { "lang-id": langId.toString() }),
        "sport-ids": sportIds.join(","),
    });

    const apiPath = SEARCH_API_URL;

    return `${apiPath}?${queryParams.toString()}`;
};
