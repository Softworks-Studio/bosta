# 📦 Bosta Delivery API

[![npm version](https://img.shields.io/npm/v/bosta)](https://www.npmjs.com/package/bosta)
[![License](https://github.com/Softworks-Studio/bosta/blob/main/LICENSE)](LICENSE)
[![Issues](https://github.com/Softworks-Studio/bosta/issues)](https://github.com/your-repo/bosta/issues)

A comprehensive wrapper for the Bosta API, enabling seamless integration and interaction with Bosta's delivery services.

---

## 🚀 Getting Started

### Prerequisites

To use this package, ensure you have the following:

- **Node.js** (v12 or higher)
- **npm** (v6 or higher)

### Installation

You can install the Bosta Delivery API wrapper with npm:

```bash
npm install bosta
```

## 📚 Documentation

### Bosta API Client

#### Initialization

```javascript
import { Bosta } from "bosta";

const apiKey = "your-api-key";
const baseUrl = "https://app.bosta.co/api/v2"; // Optional, defaults to Bosta's API URL
const options = {
  auth: {
    type: "API", // or 'ACCOUNT'
    key: "your-api-key", // Required if type is 'API'
    email: "your-email", // Required if type is 'ACCOUNT'
    password: "your-password", // Required if type is 'ACCOUNT'
  },
};

const bostaClient = new Bosta(apiKey, baseUrl, options);
```

### Delivery Class

#### Create a Delivery

```javascript
const deliveryData = {
  type: "delivery",
  state: "pending",
  recipient: {
    name: "John Doe",
    phone: "0123456789",
    email: "john.doe@example.com",
    address: {
      city: "Cairo",
      street: "123 Main St",
      building: "10",
      floor: "2",
      apartment: "5",
    },
  },
  package: {
    weight: 2.5,
    dimensions: {
      length: 30,
      width: 20,
      height: 10,
    },
    content: "Books",
  },
  notes: "Handle with care",
};

bostaClient.delivery
  .createDelivery(deliveryData)
  .then((response) => {
    console.log("Delivery created:", response);
  })
  .catch((error) => {
    console.error("Error creating delivery:", error);
  });
```

#### Terminate a Delivery

```javascript
const trackingNumber = "1234567890";

bostaClient.delivery
  .terminateDelivery(trackingNumber)
  .then((response) => {
    console.log("Delivery terminated:", response);
  })
  .catch((error) => {
    console.error("Error terminating delivery:", error);
  });
```

#### Search Deliveries

```javascript
const searchQuery = {
  state: "delivered",
  dateFrom: "2023-01-01",
  dateTo: "2023-12-31",
};

bostaClient.delivery
  .searchDeliveries(searchQuery)
  .then((response) => {
    console.log("Search results:", response);
  })
  .catch((error) => {
    console.error("Error searching deliveries:", error);
  });
```

#### Get a Delivery

```javascript
const trackingNumber = "1234567890";

bostaClient.delivery
  .getDelivery(trackingNumber)
  .then((response) => {
    console.log("Delivery details:", response);
  })
  .catch((error) => {
    console.error("Error getting delivery:", error);
  });
```

#### Update a Delivery

```javascript
const trackingNumber = "1234567890";
const updatedData = {
  state: "in_transit",
  notes: "Updated notes",
};

bostaClient.delivery
  .updateDelivery(trackingNumber, updatedData)
  .then((response) => {
    console.log("Delivery updated:", response);
  })
  .catch((error) => {
    console.error("Error updating delivery:", error);
  });
```

#### Get Delivery Analytics

```javascript
bostaClient.delivery
  .getAnalytics()
  .then((response) => {
    console.log("Analytics data:", response);
  })
  .catch((error) => {
    console.error("Error getting analytics data:", error);
  });
```

## 🛠️ Error Handling

The Bosta API client uses an `ErrorHandler` class to log and handle errors. You can customize the error handling by modifying the `ErrorHandler` class in `utils/core/error.js`.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](https://github.com/Softworks-Studio/bosta/blob/main/LICENSE) file for details.

## 📞 Support

For support, open an issue on the [GitHub repository](https://github.com/Softworks-Studio/bosta/issues).
