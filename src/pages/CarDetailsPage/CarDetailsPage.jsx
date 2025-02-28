import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { axiosInstance } from "../../api/axiosInstance";

import css from "./CarDetailsPage.module.css";
import CarDetailForm from "../../components/CarDetailForm/CarDetailForm";

function CarDetailsPage() {
  const { id } = useParams();
  const [car, setCar] = useState(null);

  useEffect(() => {
    const fetchCarDetail = async () => {
      const res = await axiosInstance.get(`cars/${id}`);
      setCar(res.data);
    };
    fetchCarDetail();
  }, [id]);

  if (!car) {
    return <div>Автомобиль не найден</div>;
  }

  const addressParts = car.address?.split(", ") || [];
  const city = addressParts[addressParts.length - 2] || "";
  const country = addressParts[addressParts.length - 1] || "";

  return (
    <div className={css.container}>
      <div className={css.formContainer}>
        <img className={css.image} src={car.img} alt={car.model} />
        <CarDetailForm />
      </div>
      <div className={css.carInfo}>
        <div className={css.carDetails}>
          <h3>
            {car.brand} {car.model}, {car.year}
          </h3>
          <span className={css.span}>Id:{car.id}</span>
        </div>
        <div className={css.location}>
          <svg width="16" height="16">
            <use href="/sprite.svg#location"></use>
          </svg>
          <p>
            {city}, {country}
          </p>
          <p className={css.mileage}>
            Mileage: {car.mileage.toLocaleString().replace(/,/g, " ")} km
          </p>
        </div>
        <div className={css.rentalDetails}>
          <p className={css.price}>${car.rentalPrice}</p>
          <p>{car.description}</p>
        </div>
        <div className={css.condition}>
          <h4 className={css.conditionTitle}>Rental Conditions:</h4>
          <ul className={css.conditionList}>
            {car.rentalConditions.map((condition) => (
              <li className={css.conditionListItem} key={condition}>
                <svg className={css.svg} width="16" height="16">
                  <use href="/sprite.svg#check-circle"></use>
                </svg>{" "}
                <p>{condition}</p>
              </li>
            ))}
          </ul>
        </div>
        <div className={css.specification}>
          <h4 className={css.specificationTitle}>Car Specifications:</h4>
          <ul className={css.conditionList}>
            <li className={css.specificationListItem}>
              <svg width="16" height="16">
                <use href="/sprite.svg#calendar"></use>
              </svg>
              <p>Year: {car.year}</p>
            </li>
            <li className={css.specificationListItem}>
              <svg width="16" height="16">
                <use href="/sprite.svg#car"></use>
              </svg>
              <p>Type: {car.type}</p>
            </li>
            <li className={css.specificationListItem}>
              <svg width="16" height="16">
                <use href="/sprite.svg#fuel-pump"></use>
              </svg>
              <p>Fuel Consumption: {car.fuelConsumption}</p>
            </li>
            <li className={css.specificationListItem}>
              <svg width="16" height="16">
                <use href="/sprite.svg#gear"></use>
              </svg>
              <p>Engine Size: {car.engineSize}</p>
            </li>
          </ul>
        </div>

        <div className={css.accessories}>
          <h4 className={css.accessoriesTitle}>
            Accessories and functionalities:
          </h4>
          <ul className={css.accessoriesList}>
            {car.accessories.map((condition) => (
              <li className={css.accessoriesListItem} key={condition}>
                <svg className={css.svg} width="16" height="16">
                  <use href="/sprite.svg#check-circle"></use>
                </svg>{" "}
                {condition}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default CarDetailsPage;
