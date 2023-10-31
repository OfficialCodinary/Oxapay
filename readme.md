

# **Oxapay Documentation**

Oxapay is a Node.js library for interacting with the Oxapay Merchant API. This documentation provides comprehensive information on how to install, use, and contribute to this library.

## Table of content
- [Oxapay Documentation](#oxapay-documentation)
  - [Installation](#installation)
  - [Available Classes](#available-classes)
  - [Important Note](#important-note)
  - [Available Methods](#available-methods)
    - [ClientGeneral Methods](#clientgeneral-methods)
      - [`supportedNetworks()`](#supportednetworks)
      - [`supportedCurrencies()`](#supportedcurrencies)
      - [`cryptoPrices()`](#cryptoPrices)
      - [`systemStatus()`](#systemstatus)
    - [ClientMerchant Methods](#clientmerchant-methods)
      - [`allowedCoins()`](#allowedcoins)
      - [`createInvoice(reqData)`](#createinvoice)
      - [`whiteLabel(reqData)`](#whitelabel)
      - [`createStaticAddress(reqData)`](#createstaticaddress)
      - [`revokeStaticAddress(reqData)`](#revokestaticaddress)
      - [`paymentInfo(reqData)`](#paymentinfo)
      - [`paymentHistory(reqData)`](#paymenthistory)
      - [`exchangeRate(reqData)`](#exchangerate)
    - [ClientPayout Methods](#clientpayout-methods)
      - [`createPayout(reqData)`](#createpayout)
      - [`payoutHistory(reqData)`](#payouthistory)
      - [`accountBalance(reqData)`](#accountbalance)
      - [`payoutInquiry(reqData)`](#payoutInquiry)
  - [Credits](#credits)
  - [Contributions](#contributions)

## Installation

To use the oxapay library, follow these installation steps:

1. **Install Node.js**: Ensure you have Node.js installed on your system. You can download it from [https://nodejs.org/](https://nodejs.org/).

2. **Create a Node.js project**: If you don't already have a Node.js project, create one by running the following commands in your terminal:

   ```shell
   mkdir my-oxapay-project
   cd my-oxapay-project
   npm init -y
   ```

3. **Install the oxapay library**: Run the following command to install the oxapay library as a dependency in your project:

   ```shell
   npm install oxapay
   ```

Now, you can start using the oxapay library in your Node.js project.

## Available Classes

The oxapay library provides the following classes:

- `General`: A client for interacting with general Oxapay API methods.
- `Merchant`: A client for interacting with merchant-specific Oxapay API methods.
- `Payout`: A client for interacting with payout-related Oxapay API methods.

## Important Note

For detailed descriptions of the parameters and methods, refer to the official Oxapay API documentation. You can find the latest Oxapay API documentation at [https://docs.oxapay.com](https://docs.oxapay.com).

## Available Methods

### `General` Methods
---
#### `supportedNetworks()`

**Description:** Returns a list of allowed networks.

**Example:**

```javascript
const { General } = require('oxapay');

const client = new General();

client.supportedNetworks()
  .then((response) => {
    console.log('Supported Networks:', response);
  })
  .catch((error) => {
    console.error('Error fetching supported networks:', error.message);
  });
```

#### `supportedCurrencies()`

**Description:** Returns a list of allowed currencies.

**Example:**

```javascript
const { General } = require('oxapay');

const client = new General();

client.supportedCurrencies()
  .then((response) => {
    console.log('Supported Currencies:', response);
  })
  .catch((error) => {
    console.error('Error fetching supported currencies:', error.message);
  });
```

#### `cryptoPrices()`

**Description:** Retrieves payout information using a track ID.

**Example:**

```javascript
const { General } = require('oxapay');

const client = new General();

client.cryptoPrices()
  .then((response) => {
    console.log('CryptoCurrency\'s prices:', response);
  })
  .catch((error) => {
    console.error('Error fetching prices:', error.message);
  });
```

#### `systemStatus()`

**Description:** Returns the status of the Oxapay server.

**Example:**

```javascript
const { General } = require('oxapay');

const client = new General();

client.systemStatus()
  .then((response) => {
    console.log('Oxapay Server Status:', response);
  })
  .catch((error) => {
    console.error('Error fetching server status:', error.message);
  });
```

### `Merchant` Methods
---
#### `allowedCoins()`

**Description:** Returns a list of allowed coins in the merchant API.

**Example:**

```javascript
const { Merchant } = require('oxapay');

const apiKey = 'sandbox';
const client = new Merchant(apiKey);

client.allowedCoins()
  .then((response) => {
    console.log('Allowed Coins:', response);
  })
  .catch((error) => {
    console.error('Error fetching allowed coins:', error.message);
  });
```

#### `createInvoice(reqData)`

**Description:** Creates an invoice.

**Parameters:**

- `reqData` (Object): The request data for the invoice.

   - `amount` (Number): Amount to be requested in the invoice.
   - `currency` (String): Currency of the request amount.
   - `lifeTime` (Number): Lifetime or duration of the invoice.
   - `feePaidByPayer` (Number): Fee paid by the payer.
   - `underPaidCover` (Number): Underpaid coverage.
   - `callbackUrl` (String): URL for callback notifications.
   - `returnUrl` (String): URL for redirection after completion.
   - `description` (String): Description of the invoice.
   - `orderId` (String): Order identifier.
   - `email` (String): Email address.

**Example:**

```javascript
const { Merchant } = require('oxapay');

const apiKey = 'sandbox';
const client = new Merchant(apiKey);

const invoiceData = {
  amount: 100,
  currency: 'USD',
  lifeTime: 3600,
  feePaidByPayer: 0.1,
  underPaidCover: 0.2,
  callbackUrl: 'https://example.com/callback',
  returnUrl: 'https://example.com/success',
  description: 'Payment for order #123',
  orderId: '12345',
  email: 'customer@example.com',
};

client.createInvoice(invoiceData)
  .then((response) => {
    console.log('Invoice created:', response);
  })
  .catch((error) => {
    console.error('Error creating invoice:', error.message);
  });
```

#### `whiteLabel(reqData)`

**Description:** Creates a white-labeled invoice with detailed information.

**Parameters:**

- `reqData` (Object): The request data for the white-labeled invoice.

   - `amount` (Number): Amount to be requested in the invoice.
   - `currency` (String): Currency of the request amount.
   - `payCurrency` (String): Currency for payment.
   - `lifeTime` (Number): Lifetime or duration of the invoice.
   - `feePaidByPayer` (Number): Fee paid by the payer.
   - `underPaidCover` (Number): Underpaid coverage.
   - `callbackUrl` (String): URL for callback notifications.
   - `returnUrl` (String): URL for redirection after completion.
   - `description` (String): Description of the invoice.
   - `orderId` (String): Order identifier.
   - `email` (String): Email address.

**Example:**

```javascript
const { Merchant } = require('oxapay');

const apiKey = 'sandbox';
const client = new Merchant(apiKey);

const whiteLabelData = {
  amount: 100,
  currency: 'USD',
  payCurrency: 'BTC',
  lifeTime: 3600,
  feePaidByPayer: 0.1,
  underPaidCover: 0.2,
  callbackUrl: 'https://example.com/callback',
  returnUrl: 'https://example.com/success',
  description: 'Payment for order #123',
  orderId: '12345',
  email: 'customer@example.com',
};

client.whiteLabel(whiteLabelData)
  .then((response) => {
    console.log('White-labeled invoice created:', response);
  })
  .catch((error) => {
    console.error('Error creating white-labeled invoice:', error.message);
  });
```

#### `createStaticAddress(reqData)`

**Description:** Creates a static address for a merchant.

**Parameters:**

- `

reqData` (Object): The request data for creating a static address.

   - `currency` (String): The currency used for the static address.
   - `Network` (String): The name or identifier of the network.
   - `callbackUrl` (String): The URL for callback notifications.

**Example:**

```javascript
const { Merchant } = require('oxapay');

const apiKey = 'sandbox';
const client = new Merchant(apiKey);

const staticAddressData = {
  currency: 'BTC',
  Network: 'Bitcoin',
  callbackUrl: 'https://example.com/static-address-callback',
};

client.createStaticAddress(staticAddressData)
  .then((response) => {
    console.log('Static address created:', response);
  })
  .catch((error) => {
    console.error('Error creating static address:', error.message);
  });
```

#### `revokeStaticAddress(reqData)`

**Description:** Revokes a static address for a merchant.

**Parameters:**

- `reqData` (Object): The request data for revoking a static address.

   - `address` (String): The address to be revoked.

**Example:**

```javascript
const { Merchant } = require('oxapay');

const apiKey = 'sandbox';
const client = new Merchant(apiKey);

const revokeData = {
  address: '1ABCXYZ1234',
};

client.revokeStaticAddress(revokeData)
  .then((response) => {
    console.log('Static address revoked:', response);
  })
  .catch((error) => {
    console.error('Error revoking static address:', error.message);
  });
```

#### `paymentInfo(reqData)`

**Description:** Retrieves payment information using a track ID.

**Parameters:**

- `reqData` (Object): The request data for retrieving payment information.

   - `trackId` (Number): The track ID associated with the payment.

**Example:**

```javascript
const { Merchant } = require('oxapay');

const apiKey = 'sandbox';
const client = new Merchant(apiKey);

const paymentInfoData = {
  trackId: 123456,
};

client.paymentInfo(paymentInfoData)
  .then((response) => {
    console.log('Payment information:', response);
  })
  .catch((error) => {
    console.error('Error fetching payment information:', error.message);
  });
```

#### `paymentHistory(reqData)`

**Description:** Retrieves payment history with optional filtering and pagination.

**Parameters:**

- `reqData` (Object): The request data for retrieving payment history.

   - `fromDate` (String): Start date for filtering payments.
   - `toDate` (String): End date for filtering payments.
   - `fromAmount` (Number): Minimum payment amount for filtering.
   - `toAmount` (Number): Maximum payment amount for filtering.
   - `currency` (String): Currency for payment filtering.
   - `payCurrency` (String): Payment currency for filtering.
   - `network` (String): Network name for filtering.
   - `address` (String): Address for filtering.
   - `type` (String): Payment type for filtering.
   - `feePaidByPayer` (Number): Fee paid by the payer for filtering.
   - `status` (String): Payment status for filtering.
   - `orderId` (String): Order identifier for filtering.
   - `size` (Number): Number of results per page.
   - `page` (Number): Page number for pagination.
   - `trackId` (Number): Track ID for filtering.
   - `sortBy` (String): Field to sort by.
   - `orderBy` (String): Sorting order.

**Example:**

```javascript
const { Merchant } = require('oxapay');

const apiKey = 'sandbox';
const client = new Merchant(apiKey);

const paymentHistoryFilter = {
  fromDate: '2023-01-01',
  toDate: '2023-12-31',
  currency: 'USD',
  status: 'completed',
  size: 10,
  page: 1,
};

client.paymentHistory(paymentHistoryFilter)
  .then((response) => {
    console.log('Payment history:', response);
  })
  .catch((error) => {
    console.error('Error fetching payment history:', error.message);
  });
```

#### `exchangeRate(reqData)`

**Description:** Retrieves the exchange rate between two currencies.

**Parameters:**

- `reqData` (Object): The request data for retrieving the exchange rate.

   - `fromCurrency` (String): The source currency for the exchange rate.
   - `toCurrency` (String): The target currency for the exchange rate.

**Example:**

```javascript
const { Merchant } = require('oxapay');

const apiKey = 'sandbox';
const client = new Merchant(apiKey);

const exchangeRateData = {
  fromCurrency: 'USD',
  toCurrency: 'BTC',
};

client.exchangeRate(exchangeRateData)
  .then((response) => {
    console.log('Exchange rate:', response);
  })
  .catch((error) => {
    console.error('Error fetching exchange rate:', error.message);
  });
```

### `Payout` Methods
---
#### `createPayout(reqData)`

**Description:** Creates a payout transaction.

**Parameters:**

- `reqData` (Object): The request data for creating a payout.

   - `address` (String): The recipient's address for the payout.
   - `amount` (Number): The amount to be paid out.
   - `currency` (String): The currency of the payout amount.
   - `callbackUrl` (String): The URL for callback notifications.
   - `description` (String): Description of the payout.

**Example:**

```javascript
const { Payout } = require('oxapay');

const apiKey = 'sandbox';
const client = new Payout(apiKey);

const payoutData = {
  address: '1XYZABC2345',
  amount: 0.05,
  currency: 'BTC',
  callbackUrl: 'https://example.com/payout-callback',
  description: 'Payout for services',
};

client.createPayout(payoutData)
  .then((response) => {
    console.log('Payout transaction created:', response);
  })
  .catch((error) => {
    console.error('Error creating payout transaction:', error.message);
  });
```

#### `payoutHistory(reqData)`

**Description:** Retrieves payout transaction history with optional filtering and pagination.

**Parameters:**

- `reqData` (Object): The request data for retrieving payout transaction history.

   - `fromDate` (String): Start date for filtering payouts.
   - `toDate` (String): End date for filtering payouts.
   - `fromAmount` (Number): Minimum payout amount for filtering.
   - `toAmount` (Number): Maximum payout amount for filtering.
   - `currency` (String): Currency for payout filtering.
   - `type` (String): Payout type for filtering.
   - `network` (String): Network name for filtering.
   - `status` (String): Payout status for filtering.
   - `size` (Number): Number of results per page.
   - `

page` (Number): Page number for pagination.
   - `sortBy` (String): Field to sort by.
   - `orderBy` (String): Sorting order.

**Example:**

```javascript
const { Payout } = require('oxapay');

const apiKey = 'sandbox';
const client = new Payout(apiKey);

const payoutHistoryFilter = {
  fromDate: '2023-01-01',
  toDate: '2023-12-31',
  currency: 'USD',
  status: 'completed',
  size: 10,
  page: 1,
};

client.payoutHistory(payoutHistoryFilter)
  .then((response) => {
    console.log('Payout transaction history:', response);
  })
  .catch((error) => {
    console.error('Error fetching payout transaction history:', error.message);
  });
```

#### `accountBalance(reqData)`

**Description:** Retrieves the account balance for a specific currency.

**Parameters:**

- `reqData` (Object): The request data for retrieving the account balance.

   - `currency` (String): The currency for which the balance is requested.

**Example:**

```javascript
const { Payout } = require('oxapay');

const apiKey = 'sandbox';
const client = new Payout(apiKey);

const balanceData = {
  currency: 'BTC',
};

client.accountBalance(balanceData)
  .then((response) => {
    console.log('Account balance:', response);
  })
  .catch((error) => {
    console.error('Error fetching account balance:', error.message);
  });
```

#### `payoutInquiry(reqData)`

**Description:** Retrieves payout information using a track ID.

**Parameters:**

- `reqData` (Object): The request data for retrieving payout information.

   - `trackId` (Number): The track ID associated with the payout.

**Example:**

```javascript
const { Merchant } = require('oxapay');

const apiKey = 'sandbox';
const client = new Merchant(apiKey);

const payoutInquiryData = {
  trackId: 987654,
};

client.payoutInquiry(payoutInquiryData)
  .then((response) => {
    console.log('Payout information:', response);
  })
  .catch((error) => {
    console.error('Error fetching payout information:', error.message);
  });
```

## Credits

This oxapay library is developed and maintained by ROBBING GAMER from Codinary. It is officially affiliated with Oxapay.

## Contributions

Contributions to this library are welcome. If you would like to contribute, please hit us a dm in [telegram](https://t.me/ROBBING_GAMER)

For more information and detailed API documentation, refer to the official Oxapay API documentation at [https://docs.oxapay.com](https://docs.oxapay.com).

---

This documentation provides comprehensive information on using the oxapay library to interact with the Oxapay Merchant API. If you have any questions or need further assistance, please refer to the official Oxapay documentation or reach out to [@ROBBING_GAMER](https://t.me/ROBBING_GAMER) On telegram Or Reach out to oxapay official support team.
