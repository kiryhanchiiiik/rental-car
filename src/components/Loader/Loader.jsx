import { InfinitySpin } from "react-loader-spinner";
import css from "./Loader.module.css";
function Loader() {
  return (
    <div className={css.loaderContainer}>
      <InfinitySpin
        visible={true}
        width="200"
        color="#3470FF"
        ariaLabel="infinity-spin-loading"
        wrapperStyle={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginTop: "20px",
        }}
        className={css.loader}
      />
    </div>
  );
}

export default Loader;
