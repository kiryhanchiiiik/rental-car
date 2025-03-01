import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  setCarList,
  resetCarList,
  setLoading,
  setError,
  setTotalPages,
} from "../../redux/likedCar/carSlice";
import {
  selectBrand,
  selectPrice,
  selectMileage,
} from "../../redux/filterCars/filterSelectors";
import {
  selectCars,
  selectLoading,
  selectError,
  selectTotalPages,
} from "../../redux/likedCar/carSelectors";
import { fetchCars } from "../../api/carApi";
import CarItem from "../CarItem/CarItem";
import Loader from "../Loader/Loader";
import css from "./CarCard.module.css";

function CarCard() {
  const dispatch = useDispatch();
  const cars = useSelector(selectCars);
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);
  const totalPages = useSelector(selectTotalPages);
  const selectedBrand = useSelector(selectBrand);
  const selectedPrice = useSelector(selectPrice);
  const selectedMileage = useSelector(selectMileage);
  const [currentPage, setCurrentPage] = useState(1);

  const loadCars = async (page, reset = false) => {
    dispatch(setLoading(true));
    dispatch(setError(null));

    if (reset) {
      dispatch(resetCarList());
    }

    try {
      const data = await fetchCars(
        page,
        selectedBrand,
        selectedPrice,
        selectedMileage
      );

      if (reset) {
        dispatch(setCarList({ cars: data.cars }));
      } else {
        dispatch(setCarList({ cars: [...cars, ...data.cars] }));
      }

      dispatch(setTotalPages(data.totalPages));
    } catch (error) {
      dispatch(setError("Failed to load vehicles. Please try again later."));
      console.error(error);
    } finally {
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    setCurrentPage(1);
    loadCars(1, true);
  }, [selectedBrand, selectedPrice, selectedMileage]);

  const loadMoreCars = () => {
    if (currentPage < totalPages && !loading) {
      const nextPage = currentPage + 1;
      setCurrentPage(nextPage);
      loadCars(nextPage);
    }
  };

  return (
    <div>
      {loading && cars.length === 0 ? (
        <div className={css.loaderContainer}>
          <Loader />
        </div>
      ) : error ? (
        <div className={css.errorContainer}>
          <p className={css.errorMessage}>{error}</p>
        </div>
      ) : cars.length > 0 ? (
        <>
          <ul className={css.list}>
            {cars.map((car) => (
              <CarItem key={car.id} car={car} />
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
                >
                  Load more
                </button>
              )}
            </div>
          )}
        </>
      ) : (
        <div className={css.notFound}>
          <p>No cars found for the selected filter.</p>
        </div>
      )}
    </div>
  );
}

export default CarCard;
