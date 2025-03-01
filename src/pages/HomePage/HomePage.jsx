import { Link } from "react-router-dom";
import css from "./HomePage.module.css";
function HomePage() {
  return (
    <main>
      <div className={css.container}>
        <div className={css.wrapper}>
          <h1 className={css.title}>Find your perfect rental car</h1>
          <p className={css.subTitle}>
            Reliable and budget-friendly rentals for any journey
          </p>
          <button className={css.btn} type="button">
            <Link to="/catalog">View Catalog</Link>
          </button>
        </div>
      </div>
    </main>
  );
}

export default HomePage;
