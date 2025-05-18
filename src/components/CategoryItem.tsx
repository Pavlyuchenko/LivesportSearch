import { Link } from "react-router-dom";

import styles from "./styles/CategoryItem.module.css";

import qm from "@assets/qm.svg";
import type { SearchResponse } from "../types/apiTypes";
import { IMAGE_PATH_API } from "../utils/constants";

interface ItemProps {
    title: string;
    image: string;
    type: string;
    id: string;
    obj?: SearchResponse; // for passing the object to the detail page
    searchTerm?: string; // for passing the search term to the detail page
}

function CategoryItem({ title, image, type, id, obj, searchTerm }: ItemProps) {
    return (
        <Link
            to={`/detail/${id}?q=${searchTerm}`}
            className={styles["result-item"]}
            state={{ obj, searchTerm }}
        >
            <div
                className={`${styles["result-image-wrapper"]} ${
                    image == "loading" ? styles["loading-image-wrapper"] : ""
                }`}
            >
                {image != "loading" && (
                    <img
                        src={image ? `${IMAGE_PATH_API}${image}` : qm}
                        alt={title}
                    />
                )}
            </div>
            <div className={styles["result-text"]}>
                <h3 className={!title ? styles["loading"] : ""}>
                    {title ? title : "Loading..."}
                </h3>
                <p className={!type ? styles["loading"] : ""}>
                    {type ? type : "Loading..."}
                </p>
            </div>
        </Link>
    );
}

export default CategoryItem;
