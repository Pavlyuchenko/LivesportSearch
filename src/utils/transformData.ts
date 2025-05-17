import type { SearchResponse, SportCategory } from "../types/apiTypes";

export const transformData = (data: SearchResponse[]): SportCategory[] => {
    const sportMap: Map<
        number,
        {
            sportName: string;
            items: Array<{
                id: string;
                name: string;
                type: string;
                image: string;
            }>;
        }
    > = new Map();

    for (const item of data) {
        const sportId = item.sport.id;

        if (!sportMap.has(sportId)) {
            sportMap.set(sportId, {
                sportName: item.sport.name,
                items: [],
            });
        }

        const image = item.images.length > 0 ? item.images[0].path : "";

        sportMap.get(sportId)?.items.push({
            id: item.id,
            name: item.name,
            type: item.type.name,
            image: image,
        });
    }

    const transformedData: SportCategory[] = [];

    sportMap.forEach((value, sportId) => {
        transformedData.push({
            title: value.sportName,
            sport: {
                id: sportId,
            },
            entries: value.items.map((item) => ({
                title: item.name,
                image: item.image,
                type: item.type,
            })),
        });
    });

    return transformedData;
};
