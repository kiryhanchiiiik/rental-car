import { useState, useEffect, useRef } from "react";
import css from "./SelectPrice.module.css";

function SelectPrice({ prices, onChange }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedPrice, setSelectedPriceState] = useState(null);
  const dropdownRef = useRef(null);

  const handleToggle = () => setIsOpen((prev) => !prev);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handlePriceClick = (price) => {
    setSelectedPriceState(price);
    onChange(price.toString());
    setIsOpen(false);
  };

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
        {isOpen && (
          <ul className={css.dropdownList}>
            {prices.map((price) => (
              <li
                key={price}
                className={css.dropdownItem}
                onClick={() => handlePriceClick(price)}
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
