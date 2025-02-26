import { useEffect, useState } from "react";
import { axiosInstance } from "../../api/axiosInstance";

import css from "./FilterForm.module.css";

function FilterForm() {
  const [brands, setBrands] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const fetchBrands = async () => {
      const res = await axiosInstance.get("brands");
      setBrands(res.data);
    };
    fetchBrands();
  }, []);

  const handleToggle = () => setIsOpen((prev) => !prev);

  return (
    <div>
      <form>
        <div className={css.wrapper}>
          <label className={css.label}>Car brand</label>
          <div className={css.customSelect}>
            <select onClick={handleToggle}>
              <option value="" disabled selected>
                Choose a Brand
              </option>
              {brands &&
                brands.map((brand) => (
                  <option key={brand} value={brand}>
                    {brand}
                  </option>
                ))}
            </select>
            <div className={`${css.arrow} ${isOpen ? css.arrowUp : ""}`}>
              <svg width="20" height="20">
                <use href="/assets/img/catalog/sprite.svg#down"></use>
              </svg>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default FilterForm;
