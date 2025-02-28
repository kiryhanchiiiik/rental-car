import css from "./SearchButton.module.css";
function SearchButton({ onClick }) {
  return (
    <div className={css.container}>
      <button className={css.btn} type="button" onClick={onClick}>
        Search
      </button>
    </div>
  );
}

export default SearchButton;
