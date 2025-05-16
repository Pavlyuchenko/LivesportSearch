import SearchInput from "@components/SearchInput";
import SearchResults from "@components/SearchResults";
import Filters from "@components/Filters";
import styles from "./styles/SearchComponent.module.css";

function SearchComponent() {
    return (
        <section className={styles["search-component"]}>
            <h1>Vyhledávání</h1>
            <SearchInput />
            <hr />
            <Filters />
            <SearchResults />
        </section>
    );
}

export default SearchComponent;
