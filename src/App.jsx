import { Route, Routes } from "react-router-dom";
import Header from "./components/Header/Header";
import HomePage from "./pages/HomePage/HomePage";
import Catalog from "./pages/CatalogPage/CatalogPage";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";
import "./App.css";
import CarDetailsPage from "./pages/CarDetailsPage/CarDetailsPage";

function App() {
  return (
    <div>
      <Header />

      <Routes>
        <Route path="/" element={<HomePage />}>
          Home
        </Route>
        <Route path="/catalog" element={<Catalog />}>
          Catalog
        </Route>
        <Route path="/catalog/:id" element={<CarDetailsPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  );
}

export default App;
