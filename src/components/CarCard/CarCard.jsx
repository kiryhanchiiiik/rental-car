import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  selectBrand,
  selectPrice,
  selectMileage,
} from "../../redux/filterCars/filterSelectors";
import { axiosInstance } from "../../api/axiosInstance";
import CarItem from "../CarItem/CarItem";
import Loader from "../Loader/Loader";
import css from "./CarCard.module.css";

function CarCard() {
  const selectedBrand = useSelector(selectBrand);
  const selectedPrice = useSelector(selectPrice);
  const selectedMileage = useSelector(selectMileage);
  const [cars, setCars] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchCars = async (page, reset = false) => {
    setLoading(true);
    setError(null);
    try {
      const params = {
        page,
        limit: 12,
        brand: selectedBrand,
        rentalPrice: selectedPrice,
        minMileage: selectedMileage?.from || "",
        maxMileage: selectedMileage?.to || "",
      };

      const { data } = await axiosInstance.get("cars", { params });

      setCars((prevCars) =>
        reset ? data.cars : [...(prevCars || []), ...data.cars]
      );
      setTotalPages(data.totalPages);
    } catch (error) {
      setError("Failed to load vehicles. Please try again later.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setCurrentPage(1);
    fetchCars(1, true);
  }, [selectedBrand, selectedPrice, selectedMileage]);

  const toggleLike = (carId) => {
    setCars((prevCars) =>
      prevCars.map((car) =>
        car.id === carId ? { ...car, isLiked: !car.isLiked } : car
      )
    );
  };

  const loadMoreCars = () => {
    if (currentPage < totalPages && !loading) {
      const nextPage = currentPage + 1;
      setCurrentPage(nextPage);
      fetchCars(nextPage);
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
      ) : cars && cars.length > 0 ? (
        <>
          <ul className={css.list}>
            {cars.map((car) => (
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
                >
                  Load more
                </button>
              )}
            </div>
          )}
        </>
      ) : !loading && cars?.length === 0 ? (
        <div className={css.notFound}>
          <div className={css.notFoundContainer}>
            <p>No cars found for the selected filter.</p>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default CarCard;
