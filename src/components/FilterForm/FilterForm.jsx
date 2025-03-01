import { useEffect, useState } from "react";
import { axiosInstance } from "../../api/axiosInstance";
import SelectBrand from "./../SelectBrand/SelectBrand";
import css from "./FilterForm.module.css";
import SelectPrice from "./../SelectPrice/SelectPrice";
import SelectMileage from "./../SelectMileage/SelectMileage";
import SearchButton from "./../SearchButton/SearchButton";
import { useDispatch, useSelector } from "react-redux";
import { selectFilter } from "../../redux/filterCars/filterSelectors";
import {
  setMileage,
  setBrands,
  setPrices,
  setSelectedBrands,
  setSelectedPrices,
} from "../../redux/filterCars/filterSlice";

function FilterForm() {
  const dispatch = useDispatch();
  const { brands, prices, mileage } = useSelector(selectFilter);
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [selectedPrice, setSelectedPrice] = useState(null);
  const [localMileage, setLocalMileage] = useState(mileage);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const res = await axiosInstance.get("brands");
        dispatch(setBrands(res.data));
      } catch (error) {
        console.error("Failed to fetch brands:", error);
        setError("Failed to load brands. Please try again later.");
      }
    };

    const fetchPrices = async () => {
      try {
        const res = await axiosInstance.get("cars");
        if (Array.isArray(res.data?.cars)) {
          const allPrices = res.data.cars.map((car) => car.rentalPrice);
          const uniquePrices = [...new Set(allPrices)].sort((a, b) => a - b);
          dispatch(setPrices(uniquePrices));
        } else {
          console.error("No valid cars data found.");
          setError("Failed to load prices. Please try again later.");
        }
      } catch (error) {
        console.error("Failed to fetch prices:", error);
        setError("Failed to load prices. Please try again later.");
      }
    };

    fetchBrands();
    fetchPrices();
  }, [dispatch]);

  const handleSearch = (e) => {
    e.preventDefault();

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
