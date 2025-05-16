import CategoryItem from "./CategoryItem";
import styles from "./styles/SearchResults.module.css";

function SearchResults() {
    let categories = [
        {
            title: "Fotbal",
            results: [
                {
                    title: "FC Barcelona",
                    image: "https://www.livesport.cz/res/image/data/8dhw5vxS-fcDVLdrL.png",
                },
                {
                    title: "Manchester United",
                    image: "https://www.livesport.cz/res/image/data/nwSRlyWg-h2pPXz3k.png",
                },
            ],
        },
        {
            title: "Hokej",
            results: [],
        },
        {
            title: "Tenis",
            results: [
                {
                    title: "Novak Djokovic",
                    image: "https://www.livesport.cz/res/image/data/tSfwGCdM-0rY6MEPI.png",
                },
            ],
        },
    ];

    return (
        <section>
            {categories.map((category, index) => (
                <div className={styles["category-container"]} key={index}>
                    <div className={styles["category-header"]}>
                        <h2>{category.title}</h2>
                    </div>
                    <ul className={styles["results-list"]}>
                        {category.results.length > 0 ? (
                            category.results.map((result, index) => (
                                <CategoryItem key={index} />
                            ))
                        ) : (
                            <li className={styles["no-results"]}>
                                Žádné výsledky
                            </li>
                        )}
                    </ul>
                </div>
            ))}
        </section>
    );
}

export default SearchResults;
