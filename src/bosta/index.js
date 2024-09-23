import axios from "axios";

import { deliveryStates } from "../utils/delivery-states.js";
import { deliveryTypes } from "../utils/delivery-types.js";
import { pickupStates } from "../utils/pickup-states.js";
import { pickupTimeSlots } from "../utils/pickup-time-slots.js";
import { Delivery } from "./deliveries/index.js";
import { City } from "./cities/index.js";
import { ErrorHandler } from "../utils/core/error.js";
import { Price } from "./price/index.js";
const errorHandler = new ErrorHandler();
/**
 * Bosta API client
 */
export class Bosta {
  /**
   * @param {string} apiKey - The API key for authentication.
   * @param {string} baseUrl - The base URL for the API.
   * @param {Object} options - Additional options for the client.
   * @param {Object} options.auth - Authentication options.
   * @param {string} options.auth.type - The type of authentication ('API' or 'ACCOUNT').
   * @param {string} [options.auth.email] - The email for account authentication.
   * @param {string} [options.auth.password] - The password for account authentication.
   * @param {string} [options.auth.key] - The API key for API authentication.
   */
  constructor(apiKey, baseUrl, options) {
    this.apiKey = apiKey;
    this.auth = options.auth;
    this.baseUrl = baseUrl || "https://app.bosta.co/api/v2";
    this.options = options || {};
    this.deliveryStates = deliveryStates;
    this.deliveryTypes = deliveryTypes;
    this.pickupStates = pickupStates;
    this.pickupTimeSlots = pickupTimeSlots;
    this.delivery = new Delivery(this);
    this.city = new City(this);
    this.price = new Price(this);

    if (this.auth.type === "ACCOUNT") {
      if (this.auth.email && this.auth.password) {
        this.login(this.auth.email, this.auth.password);
      } else {
        errorHandler.log(
          "Email and password are required for ACCOUNT authentication."
        );
      }
    } else if (this.auth.type === "API") {
      if (this.auth.key) {
        this.apiKey = this.auth.key;
      } else {
        errorHandler.log("API key is required for API authentication.");
      }
    }
  }

  /**
   * Logs in with email and password to get a bearer token.
   * @param {string} email - The email for login.
   * @param {string} password - The password for login.
   */
  async login(email, password) {
    try {
      const response = await axios.post(`${this.baseUrl}/users/login`, {
        email,
        password,
      });
      this.apiKey = response.data.token;
    } catch (error) {
      errorHandler.log(
        `Login failed: ${error.response?.data?.message || error.message}`
      );
    }
  }

  /**
   * Sends a request to the Bosta API.
   * @param {string} method - The HTTP method (GET, POST, etc.).
   * @param {string} path - The API endpoint path.
   * @param {Object} [data] - The request payload.
   * @returns {Promise<Object>} - The API response.
   */
  async send(method, path, data) {
    try {
      const auth =
        this.auth.type === "Bearer" ? `Bearer ${this.apiKey}` : this.apiKey;
      const result = await axios({
        method: method,
        url: `${this.baseUrl}/${path}`,
        data: data ? data : undefined,
        headers: {
          Authorization: auth,
          contentType: "application/json",
        },
        timeout: 30000,
      });

      return result.data;
    } catch (error) {
      errorHandler.log(
        `API request failed: ${error.response?.data?.message || error.message}`
      );
    }
  }
}
