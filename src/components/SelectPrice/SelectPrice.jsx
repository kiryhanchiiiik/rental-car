import { useState, useEffect, useRef } from "react";
import css from "./SelectPrice.module.css";

function SelectPrice({ prices, selectedPrice, onChange }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleToggle = () => setIsOpen((prev) => !prev);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!dropdownRef.current?.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className={css.wrapper}>
      <label className={css.label}>Price / 1 hour</label>
      <div className={css.customSelect} ref={dropdownRef}>
        <button
          type="button"
          onClick={handleToggle}
          className={css.selectButton}
        >
          {selectedPrice ? `To $${selectedPrice}` : "Choose a Price"}
          <div className={`${css.arrow} ${isOpen ? css.arrowUp : ""}`}>
            <svg width="20" height="20">
              <use href="/sprite.svg#down"></use>
            </svg>
          </div>
        </button>
        {isOpen && prices?.length > 0 && (
          <ul className={css.dropdownList}>
            {prices.map((price) => (
              <li
                key={price}
                className={css.dropdownItem}
                onClick={() => {
                  onChange(price);
                  setIsOpen(false);
                }}
              >
                {price}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default SelectPrice;
