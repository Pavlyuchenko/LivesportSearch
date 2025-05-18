import americky_fotbal from "@assets/americky_fotbal.svg";
import basebal from "@assets/basebal.svg";
import basketbal from "@assets/basketbal.svg";
import fotbal from "@assets/fotbal.svg";
import florbal from "@assets/hokej.svg";
import hazena from "@assets/hazena.svg";
import hokej from "@assets/hokej.svg";
import rugby from "@assets/rugby.svg";
import tenis from "@assets/tenis.svg";
import qm from "@assets/qm.svg";

// as specified in the documentation
export const TYPE_IDS_MAP: Record<string, { text: string; value: number[] }> = {
    ALL: {
        text: "All",
        value: [1, 2, 3, 4],
    },
    COMPETITIONS: {
        text: "Competitions",
        value: [1],
    },
    TEAMS: {
        text: "Teams",
        value: [2, 3, 4],
    },
};

export const SPORT_ICONS: Record<number, string> = {
    0: qm,
    1: fotbal,
    2: tenis,
    3: basketbal,
    4: hokej,
    5: americky_fotbal,
    6: basebal,
    7: hazena,
    8: rugby,
    9: florbal,
} as const;

export type SportId = keyof typeof SPORT_ICONS;

export const SEARCH_API_URL = "https://s.livesport.services/api/v2/search";
export const IMAGE_PATH_API = "https://www.livesport.cz/res/image/data/";
