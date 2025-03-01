import { axiosInstance } from "./axiosInstance";

export const fetchBrands = async () => {
  try {
    const response = await axiosInstance.get("brands");
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const fetchPrices = async () => {
  try {
    const response = await axiosInstance.get("cars");
    if (Array.isArray(response.data?.cars)) {
      const allPrices = response.data.cars.map((car) => car.rentalPrice);
      const uniquePrices = [...new Set(allPrices)].sort((a, b) => a - b);
      return uniquePrices;
    } else {
      throw new Error("No valid cars data found.");
    }
  } catch (error) {
    console.error(error);
  }
};

export const fetchCars = async (
  page,
  selectedBrand,
  selectedPrice,
  selectedMileage
) => {
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
    return data;
  } catch (error) {
    console.error(error);
  }
};
