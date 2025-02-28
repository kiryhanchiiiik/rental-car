import { useEffect, useState } from "react";
import { axiosInstance } from "../../api/axiosInstance";

import SelectBrand from "./../SelectBrand/SelectBrand";
import css from "./FilterForm.module.css";
import SelectPrice from "./../SelectPrice/SelectPrice";
import SelectMileage from "./../SelectMileage/SelectMileage";
import SearchButton from "./../SearchButton/SearchButton";

function FilterForm() {
  // Local state for brands, prices, mileage, and selected price
  const [brands, setBrands] = useState(null);
  const [prices, setPrices] = useState(null);
  const [mileage, setMileage] = useState({ min: "", max: "" });
  const [selectedPrice, setSelectedPrice] = useState(null);

  useEffect(() => {
    // Fetch brands
    const fetchBrands = async () => {
      try {
        const res = await axiosInstance.get("brands");
        setBrands(res.data);
      } catch (error) {
        console.error("Failed to fetch brands:", error);
      }
    };

    // Fetch prices
    const fetchPrices = async () => {
      try {
        const res = await axiosInstance.get("cars");
        if (Array.isArray(res.data.cars)) {
          const allPrices = res.data.cars.map((car) => car.rentalPrice);
          setPrices([...new Set(allPrices)]);
        } else {
          console.error("No cars data found.");
        }
      } catch (error) {
        console.error("Failed to fetch prices:", error);
      }
    };

    fetchBrands();
    fetchPrices();
  }, []);

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
        <SelectBrand brands={brands} />
        <SelectPrice
          prices={prices}
          selectedPrice={selectedPrice}
          onChange={handlePriceChange}
        />
        <SelectMileage mileage={mileage} onChange={handleMileageChange} />
        <SearchButton />
      </form>
    </div>
  );
}

export default FilterForm;
