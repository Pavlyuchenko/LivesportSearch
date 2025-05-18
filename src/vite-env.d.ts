/// <reference types="vite/client" />

declare module "@components/*" {
    const component: any;
    export default component;
}

declare module "@assets/*" {
    const asset: string;
    export default asset;
}

declare module "@utils/*" {
    const util: any;
    export default util;
    export const TYPE_IDS_MAP: Record<
        string,
        { text: string; value: number[] }
    >;
    export const SPORT_ICONS: Record<number, string>;
    export type SportId = keyof typeof SPORT_ICONS;
    export const SEARCH_API_URL: string;
    export const IMAGE_PATH_API: string;
}

declare module "@hooks/*" {
    const hook: any;
    export default hook;
}

declare module "@types/*" {
    const type: any;
    export default type;
}
