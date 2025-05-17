import "./App.module.css";

import SearchComponent from "../components/SearchComponent";
import styles from "./App.module.css";

function App() {
    return (
        <main className={styles["app-container"]}>
            <SearchComponent />
        </main>
    );
}

export default App;
