// https://s.livesport.services/api/v2/search?type-ids=2,3&project-type-id=1&project-id=602&lang-id=1&q=dj&sport-ids=1,2,3,4,5,6,7,8,9
export interface SearchParams {
    q: string;
    "type-ids": number[];
    "project-type-id"?: number;
    "project-id"?: number;
    "lang-id"?: number;
    "sport-ids": number[];
}

export interface SearchResponse {
    id: string;
    url: string;
    gender: {
        id: number;
        name: string;
    };
    name: string;
    type: {
        id: number;
        name: string;
    };
    participantTypes: Array<{
        id: number;
        name: string;
    }>;
    sport: {
        id: number;
        name: string;
    };
    favouriteKey: {
        web: string;
        portable: string;
    };
    flagId: null | string;
    defaultCountry: {
        id: number;
        name: string;
    };
    images: Array<{
        path: string;
        usageId: number;
        variantTypeId: number;
    }>;
    teams: any[];
    defaultTournament: null | any;
    superTemplate: null | any;
}

export interface SportCategory {
    title: string;
    sport: {
        id: number;
    };
    entries: Array<{
        title: string;
        image: string;
        type: string;
    }>;
}
