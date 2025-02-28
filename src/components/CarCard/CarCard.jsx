import { useEffect, useState } from "react";
import { axiosInstance } from "./../../api/axiosInstance";
import CarItem from "../CarItem/CarItem";
import css from "./CarCard.module.css";
import { useSelector } from "react-redux";

function CarCard() {
  const selectedBrand = useSelector((state) => state.filter.selectedBrands);
  const [cars, setCars] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  const fetchCars = async (page) => {
    setLoading(true);
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
      setLoading(false);
    } catch (error) {
      console.log(error);
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
      <ul className={css.list}>
        {cars &&
          cars.map((car) => (
            <CarItem key={car.id} car={car} toggleLike={toggleLike} />
          ))}
      </ul>
      {currentPage < totalPages && (
        <div className={css.btnContainer}>
          <button
            type="button"
            className={css.loadMore}
            onClick={loadMoreCars}
            disabled={loading}
          >
            {loading ? "Loading..." : "Load more"}
          </button>
        </div>
      )}
    </div>
  );
}

export default CarCard;
