import { useEffect, useState } from "react";
import { axiosInstance } from "../../api/axiosInstance";

import SelectBrand from "../SelectBrand/SelectBrand";
import SelectPrice from "../SelectPrice/SelectPrice";

import css from "./FilterForm.module.css";
import SelectMileage from "../SelectMileage/SelectMileage";
import SearchButton from "../SearchButton/SearchButton";

function FilterForm() {
  const [brands, setBrands] = useState(null);
  const [prices, setPrices] = useState(null);
  const [mileage, setMileage] = useState({ from: "", to: "" });

  useEffect(() => {
    const fetchBrands = async () => {
      const res = await axiosInstance.get("brands");
      setBrands(res.data);
    };
    fetchBrands();

    const fetchPrices = async () => {
      const res = await axiosInstance.get("cars");

      if (Array.isArray(res.data.cars)) {
        const allPrices = res.data.cars.map((car) => car.rentalPrice);
        setPrices([...new Set(allPrices)]);
      } else {
        console.error("No cars data found.");
      }
    };
    fetchPrices();
  }, []);

  const handleMileageChange = (e) => {
    const { name, value } = e.target;
    setMileage((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className={css.container}>
      <form className={css.form}>
        <SelectBrand brands={brands} />
        <SelectPrice prices={prices} />
        <SelectMileage mileage={mileage} onChange={handleMileageChange} />
        <SearchButton />
      </form>
    </div>
  );
}

export default FilterForm;
