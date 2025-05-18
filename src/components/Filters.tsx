import { TYPE_IDS_MAP } from "../utils/constants";
import styles from "./styles/Filters.module.css";

interface FiltersProps {
    typeIds: number[];
    setTypeIds: (typeIds: number[]) => void;
}

function Filters({ typeIds, setTypeIds }: FiltersProps) {
    return (
        <section className={styles["filters-container"]}>
            {Object.entries(TYPE_IDS_MAP).map(([key, { text }]) => (
                <button
                    key={key}
                    className={
                        typeIds === TYPE_IDS_MAP[key].value
                            ? `${styles["filter-button"]} ${styles["filter-button-active"]}`
                            : styles["filter-button"]
                    }
                    onClick={() => {
                        setTypeIds(TYPE_IDS_MAP[key].value);
                    }}
                >
                    {text}
                </button>
            ))}
        </section>
    );
}

export default Filters;
