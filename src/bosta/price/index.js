import { ErrorHandler } from "../../utils/core/error.js";

const errorHandler = new ErrorHandler();

export class Price {
  /**
   * Creates an instance of the Price class.
   * @param {Object} apiClient - The API client for making requests.
   */
  constructor(apiClient) {
    this.apiClient = apiClient;
  }

  /**
   * Get price based on provided data.
   * @param {Object} data - The data for the price calculation.
   * @param {number} data.dropoffSectorId - The dropoff sector ID.
   * @param {string} data.type - The type of service.
   * @param {boolean} data.vatIncluded - Whether VAT is included.
   * @param {number} data.pickupSectorId - The pickup sector ID.
   * @param {string} data.tierIdSelector - The tier ID selector.
   * @returns {Promise<Object|null>} The result data or null if an error occurred.
   */
  async get(data) {
    try {
      this.validateGetData(data);

      const queryParams = new URLSearchParams({
        dropoffSectorId: data.dropoffSectorId,
        type: data.type,
        vatIncluded: data.vatIncluded,
        pickupSectorId: data.pickupSectorId,
        tierIdSelector: data.tierIdSelector,
      }).toString();

      const result = await this.apiClient.send(
        "GET",
        `pricing/calculator?${queryParams}`,
        null
      );

      if (!result.data?.success) {
        errorHandler.log(`Failed to get price: ${result.message}`);
      }

      return result.data;
    } catch (error) {
      errorHandler.handleApi(error);
      return null;
    }
  }

  /**
   * Validate data for the get method.
   * @param {Object} data - The data to validate.
   * @throws Will throw an error if validation fails.
   */
  validateGetData(data) {
    if (typeof data.dropoffSectorId !== "number") {
      errorHandler.log("Invalid dropoffSectorId: must be a number");
    }
    if (
      typeof data.type !== "string" ||
      ![
        "SEND",
        "CASH_COLLECTION",
        "RTO",
        "CUSTOMER_RETURN_PICKUP",
        "EXCHANGE",
        "INTERNATIONAL",
        "SIGN_AND_RETURN",
      ].includes(data.type)
    ) {
      errorHandler.log("Invalid type: must be one of the specified types");
    }
    if (typeof data.vatIncluded !== "boolean") {
      errorHandler.log("Invalid vatIncluded: must be a boolean");
    }
    if (typeof data.pickupSectorId !== "number") {
      errorHandler.log("Invalid pickupSectorId: must be a number");
    }
    if (
      typeof data.tierIdSelector !== "string" ||
      !["c__CT4DU9I", "yiqKg_aGM1"].includes(data.tierIdSelector)
    ) {
      errorHandler.log(
        "Invalid tierIdSelector: must be one of the specified values"
      );
    }
  }

  /**
   * Get shipping price based on provided data.
   * @param {Object} data - The data for the shipping price calculation.
   * @param {number} data.cod - The cash on delivery amount.
   * @param {string} data.dropOffCity - The drop-off city.
   * @param {string} data.pickupCity - The pickup city.
   * @param {string} data.size - The size of the shipment.
   * @param {string} data.type - The type of service.
   * @returns {Promise<Object|null>} The result data or null if an error occurred.
   */
  async getShippingPrice(data) {
    try {
      this.validateShippingPriceData(data);

      const queryParams = new URLSearchParams({
        cod: data.cod,
        dropOffCity: data.dropOffCity,
        pickupCity: data.pickupCity,
        size: data.size,
        type: data.type,
      }).toString();

      const result = await this.apiClient.send(
        "GET",
        `pricing/shipment/calculator?${queryParams}`,
        null
      );

      if (!result.data?.success) {
        errorHandler.log(`Failed to get shipping price: ${result.message}`);
      }

      return result.data;
    } catch (error) {
      errorHandler.handleApi(error);
      return null;
    }
  }

  /**
   * Validate data for the getShippingPrice method.
   * @param {Object} data - The data to validate.
   * @throws Will throw an error if validation fails.
   */
  validateShippingPriceData(data) {
    if (typeof data.cod !== "number") {
      errorHandler.log("Invalid cod: must be a number");
    }
    if (typeof data.dropOffCity !== "string") {
      errorHandler.log("Invalid dropOffCity: must be a string");
    }
    if (typeof data.pickupCity !== "string") {
      errorHandler.log("Invalid pickupCity: must be a string");
    }
    if (
      typeof data.size !== "string" ||
      !["Normal", "Light Bulky", "Heavy Bulky"].includes(data.size)
    ) {
      errorHandler.log("Invalid size: must be one of the specified values");
    }
    if (
      typeof data.type !== "string" ||
      ![
        "SEND",
        "CASH_COLLECTION",
        "CUSTOMER_RETURN_PICKUP",
        "EXCHANGE",
        "SIGN_AND_RETURN",
      ].includes(data.type)
    ) {
      errorHandler.log("Invalid type: must be one of the specified types");
    }
  }
}
