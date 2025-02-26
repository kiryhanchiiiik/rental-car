import css from "./SelectMileage.module.css";

function SelectMileage({ mileage, onChange }) {
  const handleInput = (e) => {
    let value = e.target.value;

    value = value.replace(/[^0-9]/g, "");

    value = value.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

    e.target.value = value;
  };

  return (
    <div className={css.wrapper}>
      <label className={css.label}>Сar mileage / km</label>
      <div className={css.kmInputs}>
        <div className={css.kmInputWrapper}>
          <label className={css.kmLabel}>From</label>
          <input
            type="text"
            name="from"
            value={mileage.from}
            onChange={onChange}
            onInput={handleInput}
            className={`${css.kmInput} ${css.kmInputWithBorder}`}
          />
        </div>
        <div className={css.kmInputWrapper}>
          <label className={css.kmLabel}>To</label>
          <input
            type="text"
            name="to"
            value={mileage.to}
            onChange={onChange}
            onInput={handleInput}
            className={`${css.kmInput} ${css.padding}`}
          />
        </div>
      </div>
    </div>
  );
}

export default SelectMileage;
