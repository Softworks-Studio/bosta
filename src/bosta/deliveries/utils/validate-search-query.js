export function validateSearchQuery(query) {
  const validFields = [
    "type",
    "trackingNumbers",
    "numberOfAttempts",
    "customersFirstNames",
    "customersLastNames",
    "customersFullNames",
    "mobilePhones",
    "notes",
    "businessReference",
    "state",
    "pickupZoneIds",
    "pickupCityIds",
    "pickupDistrict",
    "dropOffZoneIds",
    "dropOffCityIds",
    "dropOffDistrict",
    "customerCityIds",
    "customerZoneIds",
  ];

  const validTypes = [
    "SEND",
    "CASH_COLLECTION",
    "Return",
    "RTO",
    "EXCHANGE",
    "CUSTOMER_RETURN_PICKUP",
  ];

  const validatedQuery = {};

  for (const [key, value] of Object.entries(query)) {
    if (validFields.includes(key)) {
      if (key === "type" && !validTypes.includes(value)) {
        errorHandler.log(
          `Invalid type: ${value}. Must be one of ${validTypes.join(", ")}`
        );
        return null;
      }
      validatedQuery[key] = value;
    } else {
      errorHandler.log(`Invalid search parameter: ${key}`);
      return null;
    }
  }

  if (Object.keys(validatedQuery).length === 0) {
    errorHandler.log("No valid search parameters provided.");
    return null;
  }

  return validatedQuery;
}
