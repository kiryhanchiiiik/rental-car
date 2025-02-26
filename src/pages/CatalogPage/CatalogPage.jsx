import CarCard from "../../components/CarCard/CarCard";
import FilterForm from "../../components/FilterForm/FilterForm";
import css from "./CatalogPage.module.css";
function Catalog() {
  return (
    <div className={css.container}>
      {" "}
      <CarCard />
    </div>
  );
}

export default Catalog;
