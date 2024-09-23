import chalk from "chalk";

/**
 * ErrorHandler class for managing and displaying error messages.
 */
export class ErrorHandler {
  /**
   * Creates an instance of ErrorHandler.
   * Initializes a gradient color for error messages.
   */
  constructor() {
    this.gradient = chalk.bgGradient([
      "#FF0000",
      "#FF7F00",
      "#FFFF00",
      "#00FF00",
      "#0000FF",
      "#8B00FF",
    ]);
  }

  /**
   * Handles API errors by logging detailed information and throwing an error.
   * @param {Error} error - The error object to handle.
   * @throws {Error} Throws an error with the formatted error message.
   */
  handleApi(error) {
    let errorMessage = this.getErrorMessage(error);

    console.error(this.gradient(errorMessage));
    console.error(this.gradient("Error details:"), error.message);

    if (error.response?.data) {
      console.error(
        this.gradient("Server response:"),
        JSON.stringify(error.response.data, null, 2)
      );
    }

    if (error.config) {
      console.error(this.gradient("Request details:"), {
        method: error.config.method,
        url: error.config.url,
        headers: error.config.headers,
      });
    }

    throw new Error(errorMessage);
  }

  /**
   * Logs an error message using the gradient color.
   * @param {string|Error} error - The error message or object to log.
   */
  log(error) {
    console.error(this.gradient(error));
  }

  /**
   * Gets a formatted error message based on the HTTP status code.
   * @param {Error} error - The error object containing response information.
   * @returns {string} A formatted error message.
   */
  getErrorMessage(error) {
    switch (error.response?.status) {
      case 200:
        return "Success: The request was successful.";
      case 400:
        return "Bad Request: The request was invalid or cannot be served. Please check your input and try again.";
      case 401:
        return "Unauthorized: Authentication failed or user does not have permissions for the requested operation.";
      case 403:
        return "Forbidden: The server understood the request but refuses to authorize it.";
      case 404:
        return "Not Found: The requested resource could not be found on the server.";
      case 408:
        return "Request Timeout: The server timed out waiting for the request.";
      case 429:
        return "Too Many Requests: You have sent too many requests in a given amount of time.";
      case 500:
        return "Internal Server Error: The server encountered an unexpected condition that prevented it from fulfilling the request.";
      default:
        return `Unknown Error: An unexpected error occurred. Status code: ${
          error.response?.status || "Unknown"
        }`;
    }
  }
}
