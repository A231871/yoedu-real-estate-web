import {
  Configuration,
  ListingControllerApi,
  AmenityControllerApi,
  LocationControllerApi,
  PropertyTypeControllerApi,
  AuthenticationApi,
} from "./openapi-generated";
import globalAxios from "axios";

// Request interceptor to attach JWT Access Token
globalAxios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('yoedu_access_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor to handle unauthorized errors
globalAxios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Clear token and user session on 401 Unauthorized if not on /auth path
      if (!window.location.pathname.startsWith('/auth')) {
        localStorage.removeItem('yoedu_access_token');
        localStorage.removeItem('yoedu_user');
        window.location.href = '/auth';
      }
    }
    return Promise.reject(error);
  }
);

// Configure the global Axios instance
const configuration = new Configuration({
  basePath: "http://localhost:8080/api"
});
globalAxios.defaults.withCredentials = true

// Export API controllers
export const authenticationApi = new AuthenticationApi(configuration);
export const listingControllerApi = new ListingControllerApi(configuration);
export const amenityControllerApi = new AmenityControllerApi(configuration);
export const locationControllerApi = new LocationControllerApi(configuration);
export const propertyTypeControllerApi = new PropertyTypeControllerApi(configuration);
