import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectBrand } from "../../redux/filterCars/filterSelectors";
import { axiosInstance } from "./../../api/axiosInstance";
import CarItem from "../CarItem/CarItem";
import Loader from "../Loader/Loader";
import css from "./CarCard.module.css";

function CarCard() {
  const selectedBrand = useSelector(selectBrand);
  const [cars, setCars] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchCars = async (page) => {
    setLoading(true);
    setError(null);
    try {
      const params = {
        page,
        limit: 12,
      };

      if (selectedBrand) {
        params.brand = selectedBrand;
      }

      const { data } = await axiosInstance.get("cars", { params });

      setCars((prevCars) =>
        page === 1 ? data.cars : [...prevCars, ...data.cars]
      );
      setTotalPages(data.totalPages);
    } catch (error) {
      setError("Failed to load vehicles. Please try again later.");
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCars(currentPage);
  }, [currentPage, selectedBrand]);

  const toggleLike = (carId) => {
    setCars((prevCars) =>
      prevCars.map((car) =>
        car.id === carId ? { ...car, isLiked: !car.isLiked } : car
      )
    );
  };

  const loadMoreCars = () => {
    if (currentPage < totalPages && !loading) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  return (
    <div>
      {loading && cars === null ? (
        <div className={css.loaderContainer}>
          <Loader />
        </div>
      ) : error ? (
        <div className={css.errorContainer}>
          <p className={css.errorMessage}>{error}</p>
        </div>
      ) : (
        <>
          <ul className={css.list}>
            {cars?.map((car) => (
              <CarItem key={car.id} car={car} toggleLike={toggleLike} />
            ))}
          </ul>
          {currentPage < totalPages && (
            <div className={css.btnContainer}>
              {loading ? (
                <Loader />
              ) : (
                <button
                  type="button"
                  className={css.loadMore}
                  onClick={loadMoreCars}
                  disabled={currentPage >= totalPages}
                >
                  {loading ? "Загрузка..." : "Load more"}
                </button>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default CarCard;
