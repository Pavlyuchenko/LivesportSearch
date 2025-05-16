import { useState } from "react";
import styles from "./styles/Filters.module.css";

function Filters() {
    let filters = ["Vše", "Soutěže", "Týmy"];
    let [selected, setSelected] = useState(0);

    return (
        <section className={styles["filters-container"]}>
            {filters.map((filter, index) => (
                <button
                    key={index}
                    className={
                        selected === index
                            ? `${styles["filter-button"]} ${styles["filter-button-active"]}`
                            : styles["filter-button"]
                    }
                    onClick={() => {
                        setSelected(index);
                    }}
                >
                    {filter}
                </button>
            ))}
        </section>
    );
}

export default Filters;
