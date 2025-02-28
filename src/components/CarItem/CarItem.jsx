import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { toggleLike } from "../../redux/likedCar/carSlice";
import { selectLikedCar } from "../../redux/likedCar/carSelectors";
import css from "./CarItem.module.css";

function CarItem({ car }) {
  const dispatch = useDispatch();
  const likedCars = useSelector(selectLikedCar);

  const isLiked = likedCars.includes(car.id);

  const handleToggleLike = () => {
    dispatch(toggleLike(car.id));
  };

  const addressParts = car.address.split(", ");
  const city = addressParts[addressParts.length - 2];
  const country = addressParts[addressParts.length - 1];

  return (
    <li className={css.listItem} key={car.id}>
      <img className={css.image} src={car.img} alt={car.model} />

      <svg
        className={`${css.svg} ${isLiked ? css.liked : ""}`}
        width="16"
        height="16"
        onClick={handleToggleLike}
      >
        {isLiked ? (
          <use href="sprite.svg#icon-heart-filled"></use>
        ) : (
          <use href="sprite.svg#icon-heart"></use>
        )}
      </svg>

      <div className={css.wrapper}>
        <h3 className={css.title}>
          {car.brand} <span className={css.blueTitle}>{car.model}</span>,{" "}
          {car.year}
        </h3>
        <p className={css.price}>${car.rentalPrice}</p>
      </div>
      <p className={css.info}>
        {city} | {country} | {car.rentalCompany} |
      </p>
      <p className={css.infoTwo}>
        {car.type} | {car.mileage.toLocaleString().replace(/,/g, " ")} km
      </p>
      <Link to={`/catalog/${car.id}`} type="button" className={css.btn}>
        Read more
      </Link>
    </li>
  );
}

export default CarItem;
