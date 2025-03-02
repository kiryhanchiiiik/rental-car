import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setMileage,
  setBrands,
  setPrices,
  setSelectedBrands,
  setSelectedPrices,
  resetFilters,
  setError,
} from "../../redux/filterCars/filterSlice";
import { selectFilter } from "../../redux/filterCars/filterSelectors";
import { fetchBrands, fetchPrices } from "../../api/carApi";
import SelectBrand from "../SelectBrand/SelectBrand";
import SelectPrice from "../SelectPrice/SelectPrice";
import SelectMileage from "../SelectMileage/SelectMileage";
import SearchButton from "../SearchButton/SearchButton";
import css from "./FilterForm.module.css";

function FilterForm() {
  const dispatch = useDispatch();
  const { brands, prices, mileage, error } = useSelector(selectFilter);
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [selectedPrice, setSelectedPrice] = useState(null);
  const [localMileage, setLocalMileage] = useState(mileage);

  useEffect(() => {
    const loadBrands = async () => {
      try {
        const data = await fetchBrands();
        dispatch(setBrands(data));
      } catch (error) {
        dispatch(setError("Failed to load brands. Please try again later."));
        console.error(error);
      }
    };

    const loadPrices = async () => {
      try {
        const data = await fetchPrices();
        dispatch(setPrices(data));
      } catch (error) {
        dispatch(setError("Failed to load prices. Please try again later."));
        console.error(error);
      }
    };

    loadBrands();
    loadPrices();
  }, [dispatch]);

  const handleSearch = (e) => {
    e.preventDefault();

    dispatch(resetFilters());

    if (selectedBrand) {
      dispatch(setSelectedBrands(selectedBrand));
    }
    if (selectedPrice) {
      dispatch(setSelectedPrices(selectedPrice.toString()));
    }
    if (localMileage.from || localMileage.to) {
      dispatch(setMileage(localMileage));
    }
  };

  const handleMileageChange = (name, value) => {
    setLocalMileage((prev) => ({ ...prev, [name]: value }));
  };

  const handleBrandChange = (brand) => {
    setSelectedBrand(brand);
  };

  const handlePriceChange = (price) => {
    setSelectedPrice(price);
  };

  return (
    <div className={css.container}>
      <form className={css.form} onSubmit={handleSearch}>
        {error && (
          <div className={css.errorMessage}>
            <p>{error}</p>
          </div>
        )}
        <SelectBrand brands={brands} onChange={handleBrandChange} />
        <SelectPrice prices={prices} onChange={handlePriceChange} />
        <SelectMileage mileage={localMileage} onChange={handleMileageChange} />
        <SearchButton />
      </form>
    </div>
  );
}

export default FilterForm;
