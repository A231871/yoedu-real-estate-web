import {
  Configuration,
  ListingControllerApi,
  AmenityControllerApi,
  LocationControllerApi,
  PropertyTypeControllerApi
} from "./openapi-generated";
import globalAxios from "axios";


globalAxios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // TODO: Handle unauthorized
    }

    return Promise.reject(error);
  }
);

const configuration = new Configuration({
  basePath: "http://localhost:8080/api"
});

// Export API controllers
export const listingControllerApi = new ListingControllerApi(configuration);
export const amenityControllerApi = new AmenityControllerApi(configuration);
export const locationControllerApi = new LocationControllerApi(configuration);
export const propertyTypeControllerApi = new PropertyTypeControllerApi(configuration);
