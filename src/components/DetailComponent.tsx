import { useLocation, Navigate, Link } from "react-router-dom";
import styles from "./styles/DetailComponent.module.css";
import arrow from "@assets/arrow.svg";
import qm from "@assets/qm.svg";

function DetailComponent() {
    const location = useLocation();
    const item = location.state?.obj;
    console.log("Item from location state:", item);

    if (!item) {
        return <Navigate to="/" />;
    }

    return (
        <section className={styles["detail-container"]}>
            <Link to="/" className={styles["back-button"]}>
                <span>&lt; Back to search</span>
            </Link>
            <div className={styles["breadcrumbs"]}>
                <span>{item.sport.name}</span>
                <img src={arrow} alt="" className={styles["arrow-icon"]} />
                <img
                    src={`${import.meta.env.VITE_IMAGE_PATH}${
                        item.defaultCountry?.images[0]?.path
                    }`}
                    alt="Country Flag"
                    className={styles["country-flag"]}
                />
                <span>{item.defaultCountry?.name}</span>
            </div>
            <div className={styles["team-info"]}>
                <div className={styles["team-logo-wrapper"]}>
                    <img
                        src={
                            item.images.length > 0
                                ? `${import.meta.env.VITE_IMAGE_PATH}${
                                      item.images[0].path
                                  }`
                                : qm
                        }
                        alt="Team Logo"
                    />
                </div>
                <div className={styles["team-info-text"]}>
                    <h1>{item.name}</h1>
                    <p>{item.type.name}</p>
                </div>
            </div>

            <a
                href={`https://www.livesport.cz/tym/${item.url}/${item.id}/`}
                target="_blank"
                className={styles["more-info-button"]}
            >
                More information &gt;
            </a>
        </section>
    );
}

export default DetailComponent;
