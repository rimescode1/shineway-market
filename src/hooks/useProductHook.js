import React from "react";
import { useLocation } from "./useLocation";
import { mockProducts } from "@/constant/productList";

const useProductHook = () => {
  const { countryName, country, loading, error, currency } = useLocation();

  const availableProducts = mockProducts.filter(
    (product) => product.countrySupport?.[country?.toLowerCase()]
  );

  if (availableProducts.length === 0) {
    console.log("No products found for", country);
  } else {
    availableProducts.forEach((product) => {
      const priceInfo = product.countrySupport[country?.toLowerCase()];
    });
  }
  return { loading, error, country, availableProducts, currency, countryName };
};

export default useProductHook;
