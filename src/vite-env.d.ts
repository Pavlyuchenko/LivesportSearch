/// <reference types="vite/client" />

declare module "@components/*" {
    const component: any;
    export default component;
}

declare module "@assets/*" {
    const asset: string;
    export default asset;
}
