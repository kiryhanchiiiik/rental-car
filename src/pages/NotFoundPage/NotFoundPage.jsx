import css from "./NotFoundPage.module.css";

function NotFoundPage() {
  return (
    <div className={css.notFoundContainer}>
      <div className={css.notFoundTitle}>404</div>
      <div className={css.notFoundMessage}>
        Oops! The page youre looking for doesnt exist.
      </div>
      <button
        className={css.notFoundButton}
        onClick={() => (window.location.href = "/")}
      >
        Go to Home
      </button>
    </div>
  );
}

export default NotFoundPage;
