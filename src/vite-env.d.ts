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
}

declare module "@hooks/*" {
    const hook: any;
    export default hook;
}

declare module "@types/*" {
    const type: any;
    export default type;
}
