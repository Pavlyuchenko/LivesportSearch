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
import qm from "@assets/qm.svg";
import { useState } from "react";
import type { SportCategory } from "../types/apiTypes";

const SPORT_ICONS = {
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

type SportId = keyof typeof SPORT_ICONS;

function SearchCategory({
    category,
    searchTerm,
}: {
    category?: SportCategory;
    searchTerm?: string;
}) {
    function mapSportNameToIcon(sportId: number): string {
        const icon = SPORT_ICONS[sportId as SportId];
        return icon ? icon : fotbal;
    }

    let [collapsed, setCollapsed] = useState(true);
    function toggleCollapse() {
        setCollapsed(!collapsed);
    }

    return (
        <div
            className={`${styles["category-container"]} ${
                !category ? styles["category-placeholder"] : ""
            }`}
        >
            <div className={styles["category-header"]}>
                <div className={styles["category-title"]}>
                    {category && (
                        <img
                            src={mapSportNameToIcon(category.sport.id)}
                            alt="Sport Icon"
                            className={styles["category-icon"]}
                        />
                    )}
                    <h2>{category?.title || "Loading"}</h2>
                </div>
                {category && (
                    <button
                        onClick={toggleCollapse}
                        className={styles["category-toggle-button"]}
                    >
                        <img
                            src={arrow}
                            alt="Arrow"
                            className={`${styles["category-arrow"]} ${
                                collapsed ? styles["category-arrow-rotate"] : ""
                            }`}
                        />
                    </button>
                )}
            </div>
            {collapsed && (
                <ul className={styles["results-list"]}>
                    {category ? (
                        <>
                            {category.entries.map((result, index) => (
                                <CategoryItem
                                    key={index}
                                    title={result.title}
                                    image={result.image}
                                    type={result.type}
                                    id={result.id}
                                    obj={result.obj}
                                    searchTerm={searchTerm}
                                />
                            ))}
                        </>
                    ) : (
                        <div className={styles["loading-placeholder"]}>
                            <CategoryItem
                                title=""
                                image="loading"
                                type=""
                                id=""
                            />
                            <CategoryItem
                                title=""
                                image="loading"
                                type=""
                                id=""
                            />
                        </div>
                    )}
                </ul>
            )}
        </div>
    );
}

export default SearchCategory;
