import styles from "./styles/CategoryItem.module.css";
import qm from "@assets/qm.svg";

interface ItemProps {
    title: string;
    image: string;
    type: string;
}

function CategoryItem({ title, image, type }: ItemProps) {
    return (
        <li className={styles["result-item"]}>
            <div className={styles["result-image-wrappper"]}>
                <img
                    src={
                        image
                            ? `${import.meta.env.VITE_IMAGE_PATH}${image}`
                            : qm
                    }
                    alt={title}
                />
            </div>
            <div className={styles["result-text"]}>
                <h3>{title}</h3>
                <p>{type}</p>
            </div>
        </li>
    );
}

export default CategoryItem;
