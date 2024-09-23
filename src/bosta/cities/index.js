import { ErrorHandler } from "../../utils/core/error.js";

const errorHandler = new ErrorHandler();

/**
 * @typedef {Object} ApiResponse
 * @property {boolean} success - Indicates if the API call was successful
 * @property {*} data - The data returned by the API
 * @property {string} [message] - An optional error message
 */

/**
 * Class representing city-related operations
 */
export class City {
  /**
   * @param {Object} apiClient - The API client for making requests
   */
  constructor(apiClient) {
    this.apiClient = apiClient;
    this.validCountryIds = ["60e4482c7cb7d4bc4849c4d5", "eF-3f9FZr"];
  }

  /**
   * Validate country ID
   * @param {string} countryId - The country ID to validate
   * @throws {Error} If the country ID is invalid
   */
  validateCountryId(countryId) {
    if (!countryId || !this.validCountryIds.includes(countryId)) {
      throw new Error(
        "Invalid countryId. Must be either '60e4482c7cb7d4bc4849c4d5' for Egypt or 'eF-3f9FZr' for KSA."
      );
    }
  }

  /**
   * Handle API response
   * @param {ApiResponse} result - The API response
   * @param {string} errorMessage - The error message to log if the request fails
   * @returns {*|null} The data if successful, null otherwise
   */
  handleApiResponse(result, errorMessage) {
    if (!result.data?.success) {
      errorHandler.log(`${errorMessage}: ${result.message}`);
      return null;
    }
    return result.data;
  }

  /**
   * Get cities for a given country
   * @param {string} countryId - The ID of the country
   * @returns {Promise<ApiResponse|null>} The cities data or null if an error occurs
   */
  async getCities(countryId) {
    try {
      this.validateCountryId(countryId);
      const result = await this.apiClient.send(
        "GET",
        `cities?countryId=${countryId}`
      );
      return this.handleApiResponse(result, "Failed to get cities");
    } catch (error) {
      return errorHandler.handleApi(error);
    }
  }

  /**
   * Get a specific city by ID
   * @param {string} cityId - The ID of the city
   * @returns {Promise<ApiResponse|null>} The city data or null if an error occurs
   */
  async get(cityId) {
    try {
      if (!cityId) throw new Error("City ID is required to get a city.");
      const result = await this.apiClient.send("GET", `cities/${cityId}`);
      return this.handleApiResponse(result, "Failed to get city");
    } catch (error) {
      return errorHandler.handleApi(error);
    }
  }

  /**
   * Get zones information for a specific city
   * @param {string} cityId - The ID of the city
   * @returns {Promise<ApiResponse|null>} The zones data or null if an error occurs
   */
  async getZonesInfo(cityId) {
    try {
      if (!cityId) throw new Error("City ID is required to get zones info.");
      const result = await this.apiClient.send("GET", `cities/${cityId}/zones`);
      return this.handleApiResponse(result, "Failed to get zones info");
    } catch (error) {
      return errorHandler.handleApi(error);
    }
  }

  /**
   * Get districts information for a specific city
   * @param {string} cityId - The ID of the city
   * @returns {Promise<ApiResponse|null>} The districts data or null if an error occurs
   */
  async getDistrictsInfo(cityId) {
    try {
      if (!cityId)
        throw new Error("City ID is required to get districts info.");
      const result = await this.apiClient.send(
        "GET",
        `cities/${cityId}/districts`
      );
      return this.handleApiResponse(result, "Failed to get districts info");
    } catch (error) {
      return errorHandler.handleApi(error);
    }
  }

  /**
   * Get all districts for a given country
   * @param {string} countryId - The ID of the country
   * @returns {Promise<ApiResponse|null>} The districts data or null if an error occurs
   */
  async getAllDistricts(countryId) {
    try {
      this.validateCountryId(countryId);
      const result = await this.apiClient.send(
        "GET",
        `cities?countryId=${countryId}`
      );
      return this.handleApiResponse(result, "Failed to get all districts");
    } catch (error) {
      return errorHandler.handleApi(error);
    }
  }

  /**
   * Get district from latitude and longitude
   * @param {number} lat - Latitude
   * @param {number} long - Longitude
   * @returns {Promise<ApiResponse|null>} The district data or null if an error occurs
   */
  async getDistrictFromLatLong(lat, long) {
    try {
      if (!lat || !long) {
        throw new Error("Latitude and Longitude are required to get district.");
      }
      const result = await this.apiClient.send(
        "GET",
        `cities/districts?lat=${lat}&lng=${long}`
      );
      return this.handleApiResponse(result, "Failed to get district");
    } catch (error) {
      return errorHandler.handleApi(error);
    }
  }
}
