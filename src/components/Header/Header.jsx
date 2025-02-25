import Logo from "../Logo/Logo";
import Navigation from "../Navigation/Navigation";
import css from "./Header.module.css";
function Header() {
  return (
    <header>
      <div className={css.container}>
        <Logo />
        <Navigation />
      </div>
    </header>
  );
}

export default Header;
