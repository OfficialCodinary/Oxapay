

# Oxapay Node.js Client Library Documentation

## Introduction

The Oxapay Node.js Client Library provides a convenient way to interact with the Oxapay API for various cryptocurrency-related operations. This library allows you to create invoices, inquire about payments, retrieve payment history, and perform other related tasks.

## Installation

You can install the library via npm:

```bash
npm install oxapay
```

## Usage

### Importing the Library

To use the Oxapay Node.js Client Library in your application, import it as follows:

```javascript
const { Merchant } = require("oxapay");
```

### Creating an Instance

To get started, create an instance of the `Merchant` class by providing your API key:

```javascript
const apiKey = "your-api-key";
const oxapay = new Merchant(apiKey);
```

## Parameters
All the parameters are as same as the oxapay documentation, Please refer to their [Documentation](https://docs.oxapay.com/) for further details on the parameters

## Methods

### Create Invoice

Create an invoice for a transaction.

```javascript
const invoiceData = {
	amount: 'Your amount',
	currency: 'Your currency',
	lifeTime: 'Your lifeTime',
	feePaidByPayer: 'Your feePaidByPayer',
	underPaidCover: 'Your underPaidCover',
	callbackUrl: 'Your callbackUrl',
	returnUrl: 'Your returnUrl',
	description: 'Your description',
	orderId: 'Your orderId',
	email: 'Your email'
};

try {
	const invoiceResponse = await oxapay.createInvoice(invoiceData);
	console.log("Invoice created successfully:", invoiceResponse);
} catch (error) {
	console.error("Error creating invoice:", error.message);
}
```

### White Label

Request white-label services from Oxapay.

```javascript
const whiteLabelData = {
	amount: 'Your amount',
	currency: 'Your currency',
	lifeTime: 'Your lifeTime',
	feePaidByPayer: 'Your feePaidByPayer',
	underPaidCover: 'Your underPaidCover',
	callbackUrl: 'Your callbackUrl',
	returnUrl: 'Your returnUrl',
	description: 'Your description',
	orderId: 'Your orderId',
	email: 'Your email'
}

try {
	const whiteLabelResponse = await oxapay.whiteLabel(whiteLabelData);
	console.log("White-label request successful:", whiteLabelResponse);
} catch (error) {
	console.error("Error requesting white label:", error.message);
}
```

### Create Static Address

Create a static cryptocurrency address.

```javascript
const staticAddressData = {
	currency: 'Your currency',
	network: 'Your network',
	callbackUrl: 'Your callbackUrl'
}

try {
	const staticAddressResponse = await oxapay.createStaticAddress(staticAddressData);
	console.log("Static address created successfully:", staticAddressResponse);
} catch (error) {
	console.error("Error creating static address:", error.message);
}
```

### Revoke Static Address

Revoke a previously created static cryptocurrency address.

```javascript
const revokeStaticAddressData = { 
	address: 'Your address'
};

try {
	const revokeStaticAddressResponse = await oxapay.revokeStaticAddress(revokeStaticAddressData);
	console.log("Static address revoked successfully:", revokeStaticAddressResponse);
} catch (error) {
	console.error("Error revoking static address:", error.message);
}
```

### Payment Info

Inquire about a payment using a reference ID.

```javascript
const paymentInfoData = {
		trackId: 'Your trackId'
}

try {
	const paymentInfoResponse = await oxapay.paymentInfo(paymentInfoData);
	console.log("Payment inquiry successful:", paymentInfoResponse);
} catch (error) {
	console.error("Error inquiring about payment:", error.message);
}
```

### Payment History

Retrieve a list of payment transactions.

```javascript
const paymentHistoryData = {
	fromDate: 'Your fromDate',
	toDate: 'Your toDate',
	fromAmount: 'Your fromAmount',
	toAmount: 'Your toAmount',
	currency: 'Your currency',
	payCurrency: 'Your payCurrency',
	network: 'Your network',
	address: 'Your address',
	type: 'Your type',
	feePaidByPayer: 'Your feePaidByPayer',
	size: 'Your size',
	page: 'Your page',
	trackId: 'Your trackId',
	sortBy: 'Your sortBy',
	orderBy: 'Your orderBy'
}

try {
	const paymentHistoryResponse = await oxapay.paymentHistory(paymentHistoryData);
	console.log("Payment history retrieved successfully:", paymentHistoryResponse);
} catch (error) {
	console.error("Error retrieving payment history:", error.message);
}
```

### Allowed Coins

Retrieve a list of allowed cryptocurrencies for your merchant account.

```javascript
try {
	const allowedCoinsResponse = await oxapay.allowedCoins();
	console.log("Allowed coins retrieved successfully:", allowedCoinsResponse);
} catch (error) {
	console.error("Error retrieving allowed coins:", error.message);
}
```

### Exchange Rate

Retrieve the exchange rate for a specific cryptocurrency.

```javascript
const exchangeRateData = {
	fromCurrency: 'Your fromCurrency',
	toCurrency: 'Your toCurrency'
}

try {
	const exchangeRateResponse = await oxapay.exchangeRate(exchangeRateData);
	console.log("Exchange rate retrieved successfully:", exchangeRateResponse);
} catch (error) {
	console.error("Error retrieving exchange rate:", error.message);
}
```

## Contributing

If you'd like to contribute to the development of this library, please follow the [contributing guidelines](CONTRIBUTING.md).

## License

This library is distributed under the MIT License. See the [LICENSE](LICENSE) file for details.

---