import CategoryItem from "./CategoryItem";
import styles from "./styles/ResultCategory.module.css";

import arrow from "@assets/arrow.svg";

import { useState } from "react";
import type { SportCategory } from "../types/apiTypes";
import { SPORT_ICONS, type SportId } from "@utils/constants";
import qm from "@assets/qm.svg";

function SearchCategory({
    category,
    searchTerm,
}: {
    category?: SportCategory;
    searchTerm?: string;
}) {
    // This function takes a sport ID and returns the corresponding icon.
    function mapSportNameToIcon(sportId: number): string {
        const icon = SPORT_ICONS[sportId as SportId];
        return icon ? icon : qm;
    }

    // collapsed is a state variable that determines whether the category is collapsed or expanded.
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
