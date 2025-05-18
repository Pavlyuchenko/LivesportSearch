import { useEffect, useState } from "react";
import { useLocation, Link, useNavigate } from "react-router-dom";

import styles from "./styles/DetailComponent.module.css";

import arrow from "@assets/arrow.svg";
import qm from "@assets/qm.svg";
import useDebounceSearch from "@hooks/useDebounceSearch";
import { IMAGE_PATH_API, SEARCH_API_URL } from "../../utils/constants";

function DetailComponent() {
    const location = useLocation();
    const navigate = useNavigate();

    // this gets passed from the search component to minimize api calls
    const [item, setItem] = useState(location.state?.obj);
    const [searchTerm, setSearchTerm] = useState(location.state?.searchTerm);
    let { debounceSearch, results } = useDebounceSearch();

    // If the item is not found in the state, we need to fetch it from the URL params
    // since no detail API route is provided, we try to use the same search and filter
    // this is a hack, I don't think we are supposed to do this
    useEffect(() => {
        if (!item) {
            // get q from URL params
            const q = new URLSearchParams(location.search).get("q");
            if (!q) {
                navigate("/");
                return;
            }

            setSearchTerm(q);

            debounceSearch(q, [1, 2, 3, 4], 0);
        }
    }, []);

    useEffect(() => {
        if (results) {
            const id = location.pathname.split("/").pop();

            for (const category of results) {
                for (const item of category.entries) {
                    if (item.id === id) {
                        setItem(item.obj);
                        break;
                    }
                }
            }
        }
    }, [results]);

    return (
        <>
            {!item ? (
                <div className={styles["loading"]}>
                    <button
                        onClick={() => {
                            console.log(results);
                        }}
                    >
                        Loading...
                    </button>
                </div>
            ) : (
                <section className={styles["detail-container"]}>
                    <Link
                        to={`/?q=${searchTerm}`}
                        className={styles["back-button"]}
                    >
                        <span>&lt; Back to search</span>
                    </Link>
                    <div className={styles["breadcrumbs"]}>
                        <span>{item.sport.name}</span>
                        <img
                            src={arrow}
                            alt=""
                            className={styles["arrow-icon"]}
                        />
                        <img
                            src={`${IMAGE_PATH_API}/${item.defaultCountry?.images[0]?.path}`}
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
                                        ? `${IMAGE_PATH_API}${item.images[0].path}`
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
            )}
        </>
    );
}

export default DetailComponent;
