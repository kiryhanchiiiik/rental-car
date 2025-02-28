import { InfinitySpin } from "react-loader-spinner";
function Loader() {
  return (
    <div>
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
      />
    </div>
  );
}

export default Loader;
