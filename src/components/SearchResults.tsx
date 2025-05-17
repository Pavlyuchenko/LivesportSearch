import ResultCategory from "./ResultCategory";

function SearchResults() {
    let categories = [
        {
            title: "Fotbal",
            results: [
                {
                    title: "FC Barcelona",
                    image: "https://www.livesport.cz/res/image/data/8dhw5vxS-fcDVLdrL.png",
                    type: "Klub",
                },
                {
                    title: "Manchester United",
                    image: "https://www.livesport.cz/res/image/data/nwSRlyWg-h2pPXz3k.png",
                    type: "Klub",
                },
            ],
            sport: {
                id: 1,
            },
        },
        {
            title: "Hokej",
            results: [],
            sport: {
                id: 4,
            },
        },
        {
            title: "Tenis",
            results: [
                {
                    title: "Novak Djokovic",
                    image: "https://www.livesport.cz/res/image/data/tSfwGCdM-0rY6MEPI.png",
                    type: "Hráč",
                },
            ],
            sport: {
                id: 3,
            },
        },
    ];

    return (
        <section>
            {categories.map(
                (category, index) =>
                    category.results.length > 0 && (
                        <ResultCategory key={index} category={category} />
                    )
            )}
        </section>
    );
}

export default SearchResults;
