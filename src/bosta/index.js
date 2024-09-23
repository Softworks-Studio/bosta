import axios from "axios";

import { deliveryStates } from "../utils/delivery-states.js";
import { deliveryTypes } from "../utils/delivery-types.js";
import { pickupStates } from "../utils/pickup-states.js";
import { pickupTimeSlots } from "../utils/pickup-time-slots.js";

export class Bosta {
  constructor(apiKey, baseUrl, options) {
    this.apiKey = apiKey;
    this.authType = options.authType === "Bearer" ? "Bearer" : "API";
    this.baseUrl = baseUrl || "https://app.bosta.co/api/v2";
    this.options = options || {};
    this.deliveryStates = deliveryStates;
    this.deliveryTypes = deliveryTypes;
    this.pickupStates = pickupStates;
    this.pickupTimeSlots = pickupTimeSlots;
  }
  async send(method, path, data) {
    try {
      const auth =
        this.authType === "Bearer" ? `Bearer ${this.apiKey}` : this.apiKey;
      const result = await axios({
        method: method,
        url: `${this.baseUrl}/${path}`,
        data: body ? body : undefined,
        headers: {
          Authorization: auth,
          contentType: "application/json",
        },
        timeout: 30000,
      });

      return result;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
}
