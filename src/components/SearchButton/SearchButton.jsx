import css from "./SearchButton.module.css";
function SearchButton() {
  return (
    <div className={css.container}>
      <button to="/catalog/:id" className={css.btn} type="submit">
        Search
      </button>
    </div>
  );
}

export default SearchButton;
