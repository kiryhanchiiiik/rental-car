import css from "./SelectMileage.module.css";

function SelectMileage({ mileage, onChange }) {
  const handleChange = (e) => {
    let { name, value } = e.target;

    value = value.replace(/[^0-9]/g, "");

    onChange(name, value);
  };

  const formatMileage = (value) => {
    if (!value) return value;
    return value.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
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
            value={formatMileage(mileage.from)}
            onChange={handleChange}
            className={`${css.kmInput} ${css.kmInputWithBorder}`}
          />
        </div>
        <div className={css.kmInputWrapper}>
          <label className={css.kmLabel}>To</label>
          <input
            type="text"
            name="to"
            value={formatMileage(mileage.to)}
            onChange={handleChange}
            className={`${css.kmInput} ${css.padding}`}
          />
        </div>
      </div>
    </div>
  );
}

export default SelectMileage;
