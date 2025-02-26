import { useState } from "react";
import css from "./SelectPrice.module.css";
function SelectPrice({ prices }) {
  const [isOpen, setIsOpen] = useState(false);
  const handleToggle = () => setIsOpen((prev) => !prev);
  return (
    <div>
      <div className={css.wrapper}>
        <label className={css.label}>Price/ 1 hour</label>
        <div className={css.customSelect}>
          <select onClick={handleToggle} placeholder="Choose a Price">
            <option value="">Choose a Price</option>
            {prices &&
              prices.map((price) => (
                <option key={price} value={price}>
                  {price}$
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

export default SelectPrice;
