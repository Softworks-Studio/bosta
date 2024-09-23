import { ErrorHandler } from "../../utils/core/error.js";
import { deliverySchema } from "./schemas/create-delivery.schema.js";
import { validateSearchQuery } from "./utils/validate-search-query.js";

const errorHandler = new ErrorHandler();

/**
 * Delivery class for managing delivery-related operations.
 */
export class Delivery {
  /**
   * Creates an instance of the Delivery class.
   * @param {Object} apiClient - The API client for making requests.
   */
  constructor(apiClient) {
    this.apiClient = apiClient;
  }

  /**
   * Creates a new delivery.
   * @param {Object} data - The delivery data.
   * @returns {Promise<Object|null>} The created delivery data or null if an error occurs.
   */
  async createDelivery(data) {
    try {
      const { error, value } = deliverySchema.validate(data);
      if (error) {
        throw new Error(`Invalid delivery data: ${error.details[0].message}`);
      }

      const result = await this.apiClient.send("POST", "deliveries", value);
      if (!result.data?.success) {
        throw new Error(`Failed to create delivery: ${result.message}`);
      }

      return result.data;
    } catch (error) {
      errorHandler.handleApi(error.message);
      return null;
    }
  }

  /**
   * Terminates a delivery.
   * @param {string} trackingNumber - The tracking number of the delivery to terminate.
   * @returns {Promise<Object|null>} The termination result or null if an error occurs.
   */
  async terminateDelivery(trackingNumber) {
    try {
      if (!trackingNumber) {
        throw new Error("Tracking number is required to terminate a delivery.");
      }

      const result = await this.apiClient.send(
        "DELETE",
        `deliveries/business/${trackingNumber}/terminate`
      );
      if (!result.data?.success) {
        throw new Error(`Failed to terminate delivery: ${result.message}`);
      }

      return result.data;
    } catch (error) {
      errorHandler.handleApi(error.message);
      return null;
    }
  }

  /**
   * Searches for deliveries based on the provided query.
   * @param {Object} query - The search query object.
   * @returns {Promise<Object|null>} The search results or null if an error occurs.
   */
  async searchDeliveries(query) {
    try {
      const validatedQuery = validateSearchQuery(query);
      if (!validatedQuery) {
        throw new Error("Invalid search query");
      }

      const result = await this.apiClient.send(
        "GET",
        "deliveries/search",
        validatedQuery
      );
      if (!result.data?.success) {
        throw new Error(`Failed to search deliveries: ${result.message}`);
      }

      return result.data;
    } catch (error) {
      errorHandler.handleApi(error.message);
      return null;
    }
  }

  /**
   * Retrieves a delivery by its tracking number.
   * @param {string} trackingNumber - The tracking number of the delivery.
   * @returns {Promise<Object|null>} The delivery data or null if an error occurs.
   */
  async getDelivery(trackingNumber) {
    try {
      if (!trackingNumber) {
        throw new Error("Tracking number is required to get a delivery.");
      }

      const result = await this.apiClient.send(
        "GET",
        `deliveries/business/${trackingNumber}`
      );
      if (!result.data?.success) {
        throw new Error(`Failed to get delivery: ${result.message}`);
      }

      return result.data;
    } catch (error) {
      errorHandler.handleApi(error.message);
      return null;
    }
  }

  /**
   * Updates a delivery.
   * @param {string} trackingNumber - The tracking number of the delivery to update.
   * @param {Object} data - The updated delivery data.
   * @returns {Promise<Object|null>} The updated delivery data or null if an error occurs.
   */
  async updateDelivery(trackingNumber, data) {
    try {
      if (!trackingNumber) {
        throw new Error("Tracking number is required to update a delivery.");
      }

      const { error, value } = deliverySchema.validate(data);
      if (error) {
        throw new Error(`Invalid delivery data: ${error.details[0].message}`);
      }

      const delivery = await this.getDelivery(trackingNumber);
      if (!delivery) {
        throw new Error("Delivery tracking number not found.");
      }

      const allowedStatesToUpdate = [10, 11, 20, 21, 22, 24, 30, 41, 47];
      if (!allowedStatesToUpdate.includes(delivery.state?.code)) {
        throw new Error("Delivery cannot be updated in its current state.");
      }

      const result = await this.apiClient.send(
        "PUT",
        `deliveries/business/${trackingNumber}`,
        value
      );
      if (!result.data?.success) {
        throw new Error(`Failed to update delivery: ${result.message}`);
      }

      return result.data;
    } catch (error) {
      errorHandler.handleApi(error.message);
      return null;
    }
  }

  /**
   * Retrieves analytics data for total deliveries.
   * @returns {Promise<Object|null>} The analytics data or null if an error occurs.
   */
  async getAnalytics() {
    try {
      const result = await this.apiClient.send(
        "GET",
        "analytics/total-deliveries"
      );
      if (!result.data?.success) {
        throw new Error(`Failed to get analytics data: ${result.message}`);
      }

      return result.data;
    } catch (error) {
      errorHandler.handleApi(error.message);
      return null;
    }
  }
}
