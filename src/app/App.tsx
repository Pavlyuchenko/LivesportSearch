import { BrowserRouter, Routes, Route } from "react-router-dom";

import styles from "./App.module.css";

import SearchComponent from "./routes/SearchComponent";
import DetailComponent from "./routes/DetailComponent";

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
