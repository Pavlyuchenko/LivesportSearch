import "./App.module.css";

import SearchComponent from "../components/SearchComponent";
import styles from "./App.module.css";

function App() {
    return (
        <main className={styles["main"]}>
            <SearchComponent />
        </main>
    );
}

export default App;
