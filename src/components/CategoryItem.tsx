import { Link } from "react-router-dom";
import styles from "./styles/CategoryItem.module.css";
import qm from "@assets/qm.svg";
import type { SearchResponse } from "../types/apiTypes";

interface ItemProps {
    title: string;
    image: string;
    type: string;
    id: string;
    obj?: SearchResponse;
}

function CategoryItem({ title, image, type, id, obj }: ItemProps) {
    return (
        <Link
            to={`/detail/${id}`}
            className={styles["result-item"]}
            state={{ obj }}
        >
            <div
                className={`${styles["result-image-wrapper"]} ${
                    image == "loading" ? styles["loading-image-wrapper"] : ""
                }`}
            >
                {image != "loading" && (
                    <img
                        src={
                            image
                                ? `${import.meta.env.VITE_IMAGE_PATH}${image}`
                                : qm
                        }
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
