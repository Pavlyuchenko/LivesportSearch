import styles from "./styles/Filters.module.css";

interface FiltersProps {
    typeIds: number[];
    setTypeIds: (typeIds: number[]) => void;
    typeIdsMap: {
        [key: string]: {
            text: string;
            value: number[];
        };
    };
}

function Filters({ typeIds, setTypeIds, typeIdsMap }: FiltersProps) {
    return (
        <section className={styles["filters-container"]}>
            {Object.entries(typeIdsMap).map(([key, { text }]) => (
                <button
                    key={key}
                    className={
                        typeIds === typeIdsMap[key].value
                            ? `${styles["filter-button"]} ${styles["filter-button-active"]}`
                            : styles["filter-button"]
                    }
                    onClick={() => {
                        setTypeIds(typeIdsMap[key].value);
                    }}
                >
                    {text}
                </button>
            ))}
        </section>
    );
}

export default Filters;
