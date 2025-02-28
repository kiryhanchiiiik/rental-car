import { useState } from "react";
import css from "./SelectMileage.module.css";

function SelectMileage() {
  // Local state for mileage (from and to)
  const [mileage, setMileage] = useState({
    from: "",
    to: "",
  });

  const handleChange = (e) => {
    let { name, value } = e.target;

    // Clean the value from any non-digit characters
    value = value.replace(/[^0-9]/g, "");

    // Add thousand separators
    value = value.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

    // Update local state
    setMileage((prevMileage) => ({
      ...prevMileage,
      [name]: value,
    }));
  };

  return (
    <div className={css.wrapper}>
      <label className={css.label}>Car mileage / km</label>
      <div className={css.kmInputs}>
        <div className={css.kmInputWrapper}>
          <label className={css.kmLabel}>From</label>
          <input
            type="text"
            name="from"
            value={mileage.from}
            onChange={handleChange}
            className={`${css.kmInput} ${css.kmInputWithBorder}`}
          />
        </div>
        <div className={css.kmInputWrapper}>
          <label className={css.kmLabel}>To</label>
          <input
            type="text"
            name="to"
            value={mileage.to}
            onChange={handleChange}
            className={`${css.kmInput} ${css.padding}`}
          />
        </div>
      </div>
    </div>
  );
}

export default SelectMileage;
