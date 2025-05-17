import ResultCategory from "./ResultCategory";

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
            {categories.map(
                (category, index) =>
                    category.results.length > 0 && (
                        <ResultCategory key={index} />
                    )
            )}
        </section>
    );
}

export default SearchResults;
