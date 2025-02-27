import { useState, useEffect, useRef } from "react";
import css from "./SelectBrand.module.css";

function SelectBrand({ brands }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(null);

  const dropdownRef = useRef(null);

  const handleToggle = () => setIsOpen((prev) => !prev);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className={css.wrapper}>
      <label className={css.label}>Car brand</label>
      <div className={css.customSelect} ref={dropdownRef}>
        <button
          type="button"
          onClick={handleToggle}
          className={css.selectButton}
        >
          {selected || "Choose a Brand"}
          <div className={`${css.arrow} ${isOpen ? css.arrowUp : ""}`}>
            <svg width="20" height="20">
              <use href="/public/sprite.svg#down"></use>
            </svg>
          </div>
        </button>
        {isOpen && (
          <ul className={css.dropdownList}>
            {brands.map((brand) => (
              <li
                key={brand}
                className={css.dropdownItem}
                onClick={() => {
                  setSelected(brand);
                  setIsOpen(false);
                }}
              >
                {brand}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default SelectBrand;
