import CategoryItem from "./CategoryItem";
import styles from "./styles/ResultCategory.module.css";

import arrow from "@assets/arrow.svg";
import americky_fotbal from "@assets/americky_fotbal.svg";
import basebal from "@assets/basebal.svg";
import basketbal from "@assets/basketbal.svg";
import fotbal from "@assets/fotbal.svg";
import florbal from "@assets/hokej.svg";
import hazena from "@assets/hazena.svg";
import hokej from "@assets/hokej.svg";
import rugby from "@assets/rugby.svg";
import tenis from "@assets/tenis.svg";

const SPORT_ICONS = {
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

type SportId = keyof typeof SPORT_ICONS;

function SearchCategory() {
    let category = {
        title: "Fotbal",
        sport: {
            id: 1,
        },
        results: [
            {
                title: "FC Barcelona",
                image: "https://www.livesport.cz/res/image/data/8dhw5vxS-fcDVLdrL.png",
            },
            {
                title: "Manchester United",
                image: "https://www.livesport.cz/res/image/data/nwSRlyWg-h2pPXz3k.png",
            },
        ],
    };

    function mapSportNameToIcon(sportId: number): string {
        const icon = SPORT_ICONS[sportId as SportId];
        return icon ? icon : fotbal;
    }

    return (
        <div className={styles["category-container"]}>
            <div className={styles["category-header"]}>
                <div className={styles["category-title"]}>
                    <img
                        src={mapSportNameToIcon(category.sport.id)}
                        alt="Sport Icon"
                        className={styles["category-icon"]}
                    />
                    <h2>{category.title}</h2>
                </div>
                <img src={arrow} alt="Arrow" />
            </div>
            <ul className={styles["results-list"]}>
                {category.results.map((result, index) => (
                    <CategoryItem key={index} />
                ))}
            </ul>
        </div>
    );
}

export default SearchCategory;
