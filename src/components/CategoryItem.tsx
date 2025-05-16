import styles from "./styles/CategoryItem.module.css";

function CategoryItem() {
    return (
        <li className={styles["result-item"]}>
            <div className={styles["result-image-wrappper"]}>
                <img
                    src="https://www.livesport.cz/res/image/data/8dhw5vxS-fcDVLdrL.png"
                    alt="Alt"
                />
            </div>
            <div className={styles["result-text"]}>
                <h3>FC Barcelona</h3>
                <p>Klub</p>
            </div>
        </li>
    );
}

export default CategoryItem;
