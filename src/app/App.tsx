import "./App.module.css";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import SearchComponent from "../components/SearchComponent";
import styles from "./App.module.css";
import DetailComponent from "../components/DetailComponent";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route
                    path="/"
                    element={
                        <main className={styles["main"]}>
                            <SearchComponent />
                        </main>
                    }
                />
                <Route
                    path="/detail/:id"
                    element={
                        <main className={styles["main"]}>
                            <DetailComponent />
                        </main>
                    }
                />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
