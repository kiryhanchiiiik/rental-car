import { useEffect, useState } from "react";
import { axiosInstance } from "./../../api/axiosInstance";
import CarItem from "../CarItem/CarItem";
import css from "./CarCard.module.css";

function CarCard() {
  const [cars, setCars] = useState(null);

  useEffect(() => {
    const fetchCars = async () => {
      const { data } = await axiosInstance.get("cars");
      setCars(Array.isArray(data) ? data : data.cars || []);
    };

    fetchCars();
  }, []);

  const toggleLike = (carId) => {
    setCars((prevCars) =>
      prevCars.map((car) =>
        car.id === carId ? { ...car, isLiked: !car.isLiked } : car
      )
    );
  };

  return (
    <div>
      <ul className={css.list}>
        {cars &&
          cars.map((car) => (
            <CarItem key={car.id} car={car} toggleLike={toggleLike} />
          ))}
      </ul>
      <div className={css.btnContainer}>
        <button type="button" className={css.loadMore}>
          Load more
        </button>
      </div>
    </div>
  );
}

export default CarCard;
