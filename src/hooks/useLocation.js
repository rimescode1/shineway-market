// import { useState, useEffect } from "react";

// export const useLocation = () => {
//   const [state, setState] = useState({
//     location: null,
//     loading: true,
//     error: null,
//     hasPermission: false,
//   });
//   console.log(state.location, "Location");

//   const requestLocation = async () => {
//     setState((prev) => ({ ...prev, loading: true, error: null }));

//     if (!navigator.geolocation) {
//       setState((prev) => ({
//         ...prev,
//         loading: false,
//         error: "Geolocation is not supported by this browser.",
//       }));
//       return;
//     }

//     navigator.geolocation.getCurrentPosition(
//       async (position) => {
//         try {
//           const { latitude, longitude } = position.coords;

//           const countryData = await getCountryFromCoords(latitude, longitude);
//           console.log(countryData, "iuytrewrtyuiopiuytr");

//           setState({
//             location: {
//               latitude,
//               longitude,
//               country: countryData.country,
//               currency: countryData.currency,
//             },
//             loading: false,
//             error: null,
//             hasPermission: true,
//           });
//         } catch (error) {
//           setState((prev) => ({
//             ...prev,
//             loading: false,
//             error: "Failed to get location data.",
//           }));
//         }
//       },
//       (error) => {
//         setState((prev) => ({
//           ...prev,
//           loading: false,
//           error: getLocationErrorMessage(error.code),
//           hasPermission: false,
//         }));
//       },
//       {
//         enableHighAccuracy: true,
//         timeout: 10000,
//         maximumAge: 300000, // 5 minutes
//       }
//     );
//   };

//   useEffect(() => {
//     requestLocation();
//   }, []);

//   return { ...state, requestLocation };
// };

// const getCountryFromCoords = async (lat, lng) => {
//   const apiKey = "9d0a8b9687ef4edfa8292eb694fd4b31";
//   const response = await fetch(
//     `https://api.opencagedata.com/geocode/v1/json?q=${lat}+${lng}&key=${apiKey}`
//   );

//   console.log(response, "HSHJSHJSHJ");

//   if (!response.ok) {
//     throw new Error("Failed to fetch location data");
//   }

//   const data = await response.json();
//   const components = data.results[0]?.components || {};

//   return {
//     country: components.country || "Unknown",
//     currency: getCurrencyForCountry(components.country_code),
//   };
// };

// // Simple helper to map ISO country codes to currency
// const getCurrencyForCountry = (countryCode) => {
//   const currencyMap = {
//     us: "USD",
//     gb: "GBP",
//     ng: "NGN",
//     ca: "CAD",
//     eu: "EUR",
//     in: "INR",
//   };
//   return currencyMap[countryCode?.toLowerCase()] || "Unknown";
// };

// const getLocationErrorMessage = (code) => {
//   switch (code) {
//     case 1:
//       return "Location access denied. Please enable location permissions.";
//     case 2:
//       return "Location unavailable. Please check your connection.";
//     case 3:
//       return "Location request timeout. Please try again.";
//     default:
//       return "An unknown error occurred while getting your location.";
//   }
// };
import axios from "axios";
import { getCountriesByName } from "@yusifaliyevpro/countries";
import { useState, useEffect } from "react";

export const useLocation = () => {
  const [countryName, setcountryName] = useState(null);
  const [country, setcountry] = useState(null);
  const [currency, setcurrency] = useState({
    currencyName: null,
    currencyCode: null,
    currencySymbol: null,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser.");
      setLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const apiKey = "9d0a8b9687ef4edfa8292eb694fd4b31";
        const response = await axios.get(
          `https://api.opencagedata.com/geocode/v1/json?q=${position.coords.latitude}+${position.coords.longitude}&key=${apiKey}`
        );
        // console.log(response.data, "syhuiophgfdsasdfgh");

        const countryName =
          response.data.results[0].components.country.toLowerCase();
        const country =
          response.data.results[0].components.country_code.toLowerCase();
        const my_currency = response.data.results[0];

        if (response.data) {
          setcountry(country);
          setcountryName(countryName);
          setcurrency({
            currencyCode: my_currency.annotations.currency.iso_code,
            currencyName: my_currency.annotations.currency.name,
            currencySymbol: my_currency.annotations.currency.symbol,
          });
        }

        setLoading(false);
      },

      (err) => {
        setError(err.message);
        setLoading(false);
      }
    );
  }, []);

  // console.log(countryName, country, currency, "ALLLDKDKDKADKDDK");

  return { countryName, currency, country, loading, error };
};
