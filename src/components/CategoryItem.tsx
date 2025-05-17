import styles from "./styles/CategoryItem.module.css";

interface ItemProps {
    title: string;
    image: string;
    type: string;
}

function CategoryItem({ title, image, type }: ItemProps) {
    return (
        <li className={styles["result-item"]}>
            <div className={styles["result-image-wrappper"]}>
                <img src={image} alt={title} />
            </div>
            <div className={styles["result-text"]}>
                <h3>{title}</h3>
                <p>{type}</p>
            </div>
        </li>
    );
}

export default CategoryItem;
