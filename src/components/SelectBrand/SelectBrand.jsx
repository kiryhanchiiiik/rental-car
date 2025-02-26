import { useState } from "react";
import css from "./SelectBrand.module.css";
function SelectBrand({ brands }) {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => setIsOpen((prev) => !prev);
  return (
    <div>
      {" "}
      <div className={css.wrapper}>
        <label className={css.label}>Car brand</label>
        <div className={css.customSelect}>
          <select onClick={handleToggle} placeholder="Choose a Brand">
            <option value="">Choose a Brand</option>
            {brands &&
              brands.map((brand) => (
                <option key={brand} value={brand}>
                  {brand}
                </option>
              ))}
          </select>
          <div
            onClick={handleToggle}
            className={`${css.arrow} ${isOpen ? css.arrowUp : ""}`}
          >
            <svg width="20" height="20">
              <use href="/public/sprite.svg#down"></use>
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SelectBrand;
