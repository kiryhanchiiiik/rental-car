import { Route, Routes } from "react-router-dom";
import Header from "./components/Header/Header";
import { Suspense, lazy } from "react";

const HomePage = lazy(() => import("./pages/HomePage/HomePage"));
const Catalog = lazy(() => import("./pages/CatalogPage/CatalogPage"));
const NotFoundPage = lazy(() => import("./pages/NotFoundPage/NotFoundPage"));
const CarDetailsPage = lazy(() =>
  import("./pages/CarDetailsPage/CarDetailsPage")
);

import "./App.css";

function App() {
  return (
    <div>
      <Header />
      <Suspense fallback={null}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/catalog" element={<Catalog />} />
          <Route path="/catalog/:id" element={<CarDetailsPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;
