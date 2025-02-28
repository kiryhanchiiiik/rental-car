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
  setBrands,
  setSelectedBrands,
} from "../../redux/filterCars/filterSlice";

function FilterForm() {
  const dispatch = useDispatch();
  const { brands } = useSelector(selectFilter);
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [prices, setPrices] = useState(null);
  const [mileage, setMileage] = useState({ min: "", max: "" });
  const [selectedPrice, setSelectedPrice] = useState(null);
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
        if (Array.isArray(res.data.cars)) {
          const allPrices = res.data.cars.map((car) => car.rentalPrice);
          setPrices([...new Set(allPrices)]);
        } else {
          console.error("No cars data found.");
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

  const handleBrandChange = (brand) => {
    setSelectedBrand(brand);
  };

  const handleSearch = async () => {
    if (selectedBrand) {
      dispatch(setSelectedBrands(selectedBrand));
    }
  };

  const handleMileageChange = (e) => {
    const { name, value } = e.target;
    setMileage((prevMileage) => ({
      ...prevMileage,
      [name]: value,
    }));
  };

  const handlePriceChange = (price) => {
    setSelectedPrice(price);
  };

  return (
    <div className={css.container}>
      <form className={css.form}>
        {error && (
          <div className={css.errorMessage}>
            <p>{error}</p>
          </div>
        )}
        <SelectBrand brands={brands} onChange={handleBrandChange} />
        <SelectPrice
          prices={prices}
          selectedPrice={selectedPrice}
          onChange={handlePriceChange}
        />
        <SelectMileage mileage={mileage} onChange={handleMileageChange} />
        <SearchButton onClick={handleSearch} />
      </form>
    </div>
  );
}

export default FilterForm;
