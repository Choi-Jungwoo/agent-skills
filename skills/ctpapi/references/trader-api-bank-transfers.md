# CTP trader API bank transfer requests

This reference covers the request-side flows that move funds between bank and futures accounts and query live bank-side balance information.

| Entry | Kind |
| --- | --- |
| ReqFromBankToFutureByFuture | request |
| ReqFromFutureToBankByFuture | request |
| ReqQueryBankAccountMoneyByFuture | request |

## ReqFromBankToFutureByFuture

`ReqFromBankToFutureByFuture` is an asynchronous request entry point used to drive a business operation through the CTP runtime.

- Kind: request
- Owning interface: `CThostFtdcTraderApi`
- Related symbols: `OnRspFromBankToFutureByFuture`, `OnRtnFromBankToFutureByFuture`

**When to use it**

- Move funds between the bank side and the futures side.
- Reconcile balances and transfer records during treasury operations.

**How to apply it**

1. Ensure the API instance is initialized and the session has reached the state required for this request.
2. Fill the request object with the identifiers and business fields expected by the server.
3. Call the API, inspect the local return code, then complete the workflow through later SPI callbacks.

**Prototype**

```cpp
virtual int ReqFromBankToFutureByFuture(CThostFtdcReqTransferField *pReqTransfer, int nRequestID) = 0;
```

**Parameters**

| Name | Type | Purpose |
| --- | --- | --- |
| `pReqTransfer` | `CThostFtdcReqTransferField *` | Pointer to the request object `CThostFtdcReqTransferField *`. |
| `nRequestID` | `int` | Request correlation id provided by the caller. |

**Callback and outcome model**

- Success path: `OnRspFromBankToFutureByFuture`, `OnRtnFromBankToFutureByFuture`.

**Return semantics**

- `0` means the request was accepted by the local API runtime and will continue asynchronously through SPI callbacks.
- `-1` means the client is not in a state where the request can be submitted, typically because the connection is unavailable.
- `-2` means too many outstanding requests remain unprocessed on the local side.
- `-3` means the local request-rate limit was hit and the caller should retry later.

**Field guide for `CThostFtdcReqTransferField`**

| Field | Type | Purpose |
| --- | --- | --- |
| `TradeCode` | `TThostFtdcTradeCodeType` | Carries the trade code for the current request or response. |
| `BankID` | `TThostFtdcBankIDType` | Bank identifier for bank-futures transfer workflows. |
| `BankBranchID` | `TThostFtdcBankBrchIDType` | Bank branch identifier used for transfer routing. |
| `BrokerID` | `TThostFtdcBrokerIDType` | Broker code that scopes the request or identifies the response owner. |
| `BrokerBranchID` | `TThostFtdcFutureBranchIDType` | Broker branch identifier used for transfer routing. |
| `TradeDate` | `TThostFtdcTradeDateType` | Business date attached to the transfer or trade record. |
| `TradeTime` | `TThostFtdcTradeTimeType` | Business time attached to the transfer or trade record. |
| `BankSerial` | `TThostFtdcBankSerialType` | Carries the bank serial number for the current request or response. |
| `TradingDay` | `TThostFtdcTradeDateType` | Trading date visible to the current trading system session. |
| `PlateSerial` | `TThostFtdcSerialType` | Carries the plate serial number for the current request or response. |
| `LastFragment` | `TThostFtdcLastFragmentType` | Carries the last fragment for the current request or response. |
| `SessionID` | `TThostFtdcSessionIDType` | Session identifier assigned by the server for the current login session. |
| `CustomerName` | `TThostFtdcIndividualNameType` | Carries the customer name for the current request or response. |
| `IdCardType` | `TThostFtdcIdCardTypeType` | Carries the id card type for the current request or response. |
| `IdentifiedCardNo` | `TThostFtdcIdentifiedCardNoType` | Carries the identified card no for the current request or response. |
| `CustType` | `TThostFtdcCustTypeType` | Carries the cust type for the current request or response. |
| `BankAccount` | `TThostFtdcBankAccountType` | Bank account number used by the linked transfer relationship. |
| `BankPassWord` | `TThostFtdcPasswordType` | Bank-side password used during bank-futures transfer. |
| `AccountID` | `TThostFtdcAccountIDType` | Futures-side account identifier. |
| `Password` | `TThostFtdcPasswordType` | Trading password or user password carried by the request. |
| `InstallID` | `TThostFtdcInstallIDType` | Carries the install identifier for the current request or response. |
| `FutureSerial` | `TThostFtdcFutureSerialType` | Carries the future serial number for the current request or response. |
| `UserID` | `TThostFtdcUserIDType` | User code associated with the current login identity. |
| `VerifyCertNoFlag` | `TThostFtdcYesNoIndicatorType` | Carries the verify cert no flag for the current request or response. |
| `CurrencyID` | `TThostFtdcCurrencyIDType` | Currency code used for balance and transfer values. |
| `TradeAmount` | `TThostFtdcTradeAmountType` | Amount of funds moved by the transfer request. |
| `FutureFetchAmount` | `TThostFtdcTradeAmountType` | Amount available to be fetched from the futures side. |
| `FeePayFlag` | `TThostFtdcFeePayFlagType` | Carries the fee pay flag for the current request or response. |
| `CustFee` | `TThostFtdcCustFeeType` | Carries the cust fee for the current request or response. |
| `BrokerFee` | `TThostFtdcFutureFeeType` | Carries the broker fee for the current request or response. |
| `Message` | `TThostFtdcAddInfoType` | Carries the message for the current request or response. |
| `Digest` | `TThostFtdcDigestType` | Carries the digest for the current request or response. |
| `BankAccType` | `TThostFtdcBankAccTypeType` | Carries the bank acc type for the current request or response. |
| `DeviceID` | `TThostFtdcDeviceIDType` | Client device identifier collected for compliance or risk control. |
| `BankSecuAccType` | `TThostFtdcBankAccTypeType` | Carries the bank secu acc type for the current request or response. |
| `BrokerIDByBank` | `TThostFtdcBankCodingForFutureType` | Carries the broker identifier by bank for the current request or response. |
| `BankSecuAcc` | `TThostFtdcBankAccountType` | Carries the bank secu acc for the current request or response. |
| `BankPwdFlag` | `TThostFtdcPwdFlagType` | Carries the bank pwd flag for the current request or response. |
| `SecuPwdFlag` | `TThostFtdcPwdFlagType` | Carries the secu pwd flag for the current request or response. |
| `OperNo` | `TThostFtdcOperNoType` | Carries the oper no for the current request or response. |
| `RequestID` | `TThostFtdcRequestIDType` | Client-generated request identifier used for response correlation. |
| `TID` | `TThostFtdcTIDType` | Carries the tid for the current request or response. |
| `TransferStatus` | `TThostFtdcTransferStatusType` | Carries the transfer status for the current request or response. |
| `LongCustomerName` | `TThostFtdcLongIndividualNameType` | Carries the long customer name for the current request or response. |

**Structure layout**

```cpp
struct CThostFtdcReqTransferField
{

    TThostFtdcTradeCodeType TradeCode;

    TThostFtdcBankIDType BankID;

    TThostFtdcBankBrchIDType BankBranchID;

    TThostFtdcBrokerIDType BrokerID;

    TThostFtdcFutureBranchIDType BrokerBranchID;

    TThostFtdcTradeDateType TradeDate;

    TThostFtdcTradeTimeType TradeTime;

    TThostFtdcBankSerialType BankSerial;

    TThostFtdcTradeDateType TradingDay;

    TThostFtdcSerialType PlateSerial;

    TThostFtdcLastFragmentType LastFragment;

    TThostFtdcSessionIDType SessionID;

    TThostFtdcIndividualNameType CustomerName;

    TThostFtdcIdCardTypeType IdCardType;

    TThostFtdcIdentifiedCardNoType IdentifiedCardNo;

    TThostFtdcCustTypeType CustType;

    TThostFtdcBankAccountType BankAccount;

    TThostFtdcPasswordType BankPassWord;

    TThostFtdcAccountIDType AccountID;

    TThostFtdcPasswordType Password;

    TThostFtdcInstallIDType InstallID;

    TThostFtdcFutureSerialType FutureSerial;

    TThostFtdcUserIDType UserID;

    TThostFtdcYesNoIndicatorType VerifyCertNoFlag;

    TThostFtdcCurrencyIDType CurrencyID;

    TThostFtdcTradeAmountType TradeAmount;

    TThostFtdcTradeAmountType FutureFetchAmount;

    TThostFtdcFeePayFlagType FeePayFlag;

    TThostFtdcCustFeeType CustFee;

    TThostFtdcFutureFeeType BrokerFee;

    TThostFtdcAddInfoType Message;

    TThostFtdcDigestType Digest;

    TThostFtdcBankAccTypeType BankAccType;

    TThostFtdcDeviceIDType DeviceID;

    TThostFtdcBankAccTypeType BankSecuAccType;

    TThostFtdcBankCodingForFutureType BrokerIDByBank;

    TThostFtdcBankAccountType BankSecuAcc;

    TThostFtdcPwdFlagType BankPwdFlag;

    TThostFtdcPwdFlagType SecuPwdFlag;

    TThostFtdcOperNoType OperNo;

    TThostFtdcRequestIDType RequestID;

    TThostFtdcTIDType TID;

    TThostFtdcTransferStatusType TransferStatus;

    TThostFtdcLongIndividualNameType LongCustomerName;
};
```

**Usage example**

```cpp
CThostFtdcReqTransferField a = { 0 };
strcpy_s(a.TradeCode, "202001");///
strcpy_s(a.BankID, "1");
strcpy_s(a.BankBranchID, "0000");///
strcpy_s(a.BrokerID, "9999");
a.LastFragment = THOST_FTDC_LF_Yes;///         '0'=
```

**Implementation notes**

- Treat the immediate return code and the later callbacks as two different stages of the same business operation.
- Preserve the identifiers sent in the request because later callbacks often reference them instead of your local in-memory object.

## ReqFromFutureToBankByFuture

`ReqFromFutureToBankByFuture` is an asynchronous request entry point used to drive a business operation through the CTP runtime.

- Kind: request
- Owning interface: `CThostFtdcTraderApi`
- Related symbols: `OnRspFromFutureToBankByFuture`, `OnRtnFromFutureToBankByFuture`

**When to use it**

- Move funds between the bank side and the futures side.
- Reconcile balances and transfer records during treasury operations.

**How to apply it**

1. Ensure the API instance is initialized and the session has reached the state required for this request.
2. Fill the request object with the identifiers and business fields expected by the server.
3. Call the API, inspect the local return code, then complete the workflow through later SPI callbacks.

**Prototype**

```cpp
virtual int ReqFromFutureToBankByFuture(CThostFtdcReqTransferField *pReqTransfer, int nRequestID) = 0;
```

**Parameters**

| Name | Type | Purpose |
| --- | --- | --- |
| `pReqTransfer` | `CThostFtdcReqTransferField *` | Pointer to the request object `CThostFtdcReqTransferField *`. |
| `nRequestID` | `int` | Request correlation id provided by the caller. |

**Callback and outcome model**

- Success path: `OnRspFromFutureToBankByFuture`, `OnRtnFromFutureToBankByFuture`.

**Return semantics**

- `0` means the request was accepted by the local API runtime and will continue asynchronously through SPI callbacks.
- `-1` means the client is not in a state where the request can be submitted, typically because the connection is unavailable.
- `-2` means too many outstanding requests remain unprocessed on the local side.
- `-3` means the local request-rate limit was hit and the caller should retry later.

**Field guide for `CThostFtdcReqTransferField`**

| Field | Type | Purpose |
| --- | --- | --- |
| `TradeCode` | `TThostFtdcTradeCodeType` | Carries the trade code for the current request or response. |
| `BankID` | `TThostFtdcBankIDType` | Bank identifier for bank-futures transfer workflows. |
| `BankBranchID` | `TThostFtdcBankBrchIDType` | Bank branch identifier used for transfer routing. |
| `BrokerID` | `TThostFtdcBrokerIDType` | Broker code that scopes the request or identifies the response owner. |
| `BrokerBranchID` | `TThostFtdcFutureBranchIDType` | Broker branch identifier used for transfer routing. |
| `TradeDate` | `TThostFtdcTradeDateType` | Business date attached to the transfer or trade record. |
| `TradeTime` | `TThostFtdcTradeTimeType` | Business time attached to the transfer or trade record. |
| `BankSerial` | `TThostFtdcBankSerialType` | Carries the bank serial number for the current request or response. |
| `TradingDay` | `TThostFtdcTradeDateType` | Trading date visible to the current trading system session. |
| `PlateSerial` | `TThostFtdcSerialType` | Carries the plate serial number for the current request or response. |
| `LastFragment` | `TThostFtdcLastFragmentType` | Carries the last fragment for the current request or response. |
| `SessionID` | `TThostFtdcSessionIDType` | Session identifier assigned by the server for the current login session. |
| `CustomerName` | `TThostFtdcIndividualNameType` | Carries the customer name for the current request or response. |
| `IdCardType` | `TThostFtdcIdCardTypeType` | Carries the id card type for the current request or response. |
| `IdentifiedCardNo` | `TThostFtdcIdentifiedCardNoType` | Carries the identified card no for the current request or response. |
| `CustType` | `TThostFtdcCustTypeType` | Carries the cust type for the current request or response. |
| `BankAccount` | `TThostFtdcBankAccountType` | Bank account number used by the linked transfer relationship. |
| `BankPassWord` | `TThostFtdcPasswordType` | Bank-side password used during bank-futures transfer. |
| `AccountID` | `TThostFtdcAccountIDType` | Futures-side account identifier. |
| `Password` | `TThostFtdcPasswordType` | Trading password or user password carried by the request. |
| `InstallID` | `TThostFtdcInstallIDType` | Carries the install identifier for the current request or response. |
| `FutureSerial` | `TThostFtdcFutureSerialType` | Carries the future serial number for the current request or response. |
| `UserID` | `TThostFtdcUserIDType` | User code associated with the current login identity. |
| `VerifyCertNoFlag` | `TThostFtdcYesNoIndicatorType` | Carries the verify cert no flag for the current request or response. |
| `CurrencyID` | `TThostFtdcCurrencyIDType` | Currency code used for balance and transfer values. |
| `TradeAmount` | `TThostFtdcTradeAmountType` | Amount of funds moved by the transfer request. |
| `FutureFetchAmount` | `TThostFtdcTradeAmountType` | Amount available to be fetched from the futures side. |
| `FeePayFlag` | `TThostFtdcFeePayFlagType` | Carries the fee pay flag for the current request or response. |
| `CustFee` | `TThostFtdcCustFeeType` | Carries the cust fee for the current request or response. |
| `BrokerFee` | `TThostFtdcFutureFeeType` | Carries the broker fee for the current request or response. |
| `Message` | `TThostFtdcAddInfoType` | Carries the message for the current request or response. |
| `Digest` | `TThostFtdcDigestType` | Carries the digest for the current request or response. |
| `BankAccType` | `TThostFtdcBankAccTypeType` | Carries the bank acc type for the current request or response. |
| `DeviceID` | `TThostFtdcDeviceIDType` | Client device identifier collected for compliance or risk control. |
| `BankSecuAccType` | `TThostFtdcBankAccTypeType` | Carries the bank secu acc type for the current request or response. |
| `BrokerIDByBank` | `TThostFtdcBankCodingForFutureType` | Carries the broker identifier by bank for the current request or response. |
| `BankSecuAcc` | `TThostFtdcBankAccountType` | Carries the bank secu acc for the current request or response. |
| `BankPwdFlag` | `TThostFtdcPwdFlagType` | Carries the bank pwd flag for the current request or response. |
| `SecuPwdFlag` | `TThostFtdcPwdFlagType` | Carries the secu pwd flag for the current request or response. |
| `OperNo` | `TThostFtdcOperNoType` | Carries the oper no for the current request or response. |
| `RequestID` | `TThostFtdcRequestIDType` | Client-generated request identifier used for response correlation. |
| `TID` | `TThostFtdcTIDType` | Carries the tid for the current request or response. |
| `TransferStatus` | `TThostFtdcTransferStatusType` | Carries the transfer status for the current request or response. |
| `LongCustomerName` | `TThostFtdcLongIndividualNameType` | Carries the long customer name for the current request or response. |

**Structure layout**

```cpp
struct CThostFtdcReqTransferField
{

    TThostFtdcTradeCodeType TradeCode;

    TThostFtdcBankIDType BankID;

    TThostFtdcBankBrchIDType BankBranchID;

    TThostFtdcBrokerIDType BrokerID;

    TThostFtdcFutureBranchIDType BrokerBranchID;

    TThostFtdcTradeDateType TradeDate;

    TThostFtdcTradeTimeType TradeTime;

    TThostFtdcBankSerialType BankSerial;

    TThostFtdcTradeDateType TradingDay;

    TThostFtdcSerialType PlateSerial;

    TThostFtdcLastFragmentType LastFragment;

    TThostFtdcSessionIDType SessionID;

    TThostFtdcIndividualNameType CustomerName;

    TThostFtdcIdCardTypeType IdCardType;

    TThostFtdcIdentifiedCardNoType IdentifiedCardNo;

    TThostFtdcCustTypeType CustType;

    TThostFtdcBankAccountType BankAccount;

    TThostFtdcPasswordType BankPassWord;

    TThostFtdcAccountIDType AccountID;

    TThostFtdcPasswordType Password;

    TThostFtdcInstallIDType InstallID;

    TThostFtdcFutureSerialType FutureSerial;

    TThostFtdcUserIDType UserID;

    TThostFtdcYesNoIndicatorType VerifyCertNoFlag;

    TThostFtdcCurrencyIDType CurrencyID;

    TThostFtdcTradeAmountType TradeAmount;

    TThostFtdcTradeAmountType FutureFetchAmount;

    TThostFtdcFeePayFlagType FeePayFlag;

    TThostFtdcCustFeeType CustFee;

    TThostFtdcFutureFeeType BrokerFee;

    TThostFtdcAddInfoType Message;

    TThostFtdcDigestType Digest;

    TThostFtdcBankAccTypeType BankAccType;

    TThostFtdcDeviceIDType DeviceID;

    TThostFtdcBankAccTypeType BankSecuAccType;

    TThostFtdcBankCodingForFutureType BrokerIDByBank;

    TThostFtdcBankAccountType BankSecuAcc;

    TThostFtdcPwdFlagType BankPwdFlag;

    TThostFtdcPwdFlagType SecuPwdFlag;

    TThostFtdcOperNoType OperNo;

    TThostFtdcRequestIDType RequestID;

    TThostFtdcTIDType TID;

    TThostFtdcTransferStatusType TransferStatus;

    TThostFtdcLongIndividualNameType LongCustomerName;
};
```

**Usage example**

```cpp
CThostFtdcReqTransferField a = { 0 };
strcpy_s(a.TradeCode, "202002");///
strcpy_s(a.BankID, "1");
strcpy_s(a.BankBranchID, "0000");///
strcpy_s(a.BrokerID, "9999");
a.LastFragment = THOST_FTDC_LF_Yes;///         '0'=
```

**Implementation notes**

- Treat the immediate return code and the later callbacks as two different stages of the same business operation.
- Preserve the identifiers sent in the request because later callbacks often reference them instead of your local in-memory object.

## ReqQueryBankAccountMoneyByFuture

`ReqQueryBankAccountMoneyByFuture` is an asynchronous request entry point used to drive a business operation through the CTP runtime.

- Kind: request
- Owning interface: `CThostFtdcTraderApi`
- Related symbols: `OnRspQueryBankAccountMoneyByFuture`, `OnRtnQueryBankBalanceByFuture`

**When to use it**

- Warm up local caches after login.
- Fetch on-demand operational data for UI, reconciliation, or risk checks.

**How to apply it**

1. Ensure the API instance is initialized and the session has reached the state required for this request.
2. Fill the request object with the identifiers and business fields expected by the server.
3. Call the API, inspect the local return code, then complete the workflow through later SPI callbacks.

**Prototype**

```cpp
virtual int ReqQueryBankAccountMoneyByFuture(CThostFtdcReqQueryAccountF ield *pReqQueryAccount, int nRequestID) = 0;
```

**Parameters**

| Name | Type | Purpose |
| --- | --- | --- |
| `pReqQueryAccount` | `CThostFtdcReqQueryAccountF ield *` | Pointer to the request object `CThostFtdcReqQueryAccountF ield *`. |
| `nRequestID` | `int` | Request correlation id provided by the caller. |

**Callback and outcome model**

- Success path: `OnRspQueryBankAccountMoneyByFuture`, `OnRtnQueryBankBalanceByFuture`.

**Return semantics**

- `0` means the request was accepted by the local API runtime and will continue asynchronously through SPI callbacks.
- `-1` means the client is not in a state where the request can be submitted, typically because the connection is unavailable.
- `-2` means too many outstanding requests remain unprocessed on the local side.
- `-3` means the local request-rate limit was hit and the caller should retry later.

**Field guide for `CThostFtdcReqQueryAccountField`**

| Field | Type | Purpose |
| --- | --- | --- |
| `TradeCode` | `TThostFtdcTradeCodeType` | Carries the trade code for the current request or response. |
| `BankID` | `TThostFtdcBankIDType` | Bank identifier for bank-futures transfer workflows. |
| `BankBranchID` | `TThostFtdcBankBrchIDType` | Bank branch identifier used for transfer routing. |
| `BrokerID` | `TThostFtdcBrokerIDType` | Broker code that scopes the request or identifies the response owner. |
| `BrokerBranchID` | `TThostFtdcFutureBranchIDType` | Broker branch identifier used for transfer routing. |
| `TradeDate` | `TThostFtdcTradeDateType` | Business date attached to the transfer or trade record. |
| `TradeTime` | `TThostFtdcTradeTimeType` | Business time attached to the transfer or trade record. |
| `BankSerial` | `TThostFtdcBankSerialType` | Carries the bank serial number for the current request or response. |
| `TradingDay` | `TThostFtdcTradeDateType` | Trading date visible to the current trading system session. |
| `PlateSerial` | `TThostFtdcSerialType` | Carries the plate serial number for the current request or response. |
| `LastFragment` | `TThostFtdcLastFragmentType` | Carries the last fragment for the current request or response. |
| `SessionID` | `TThostFtdcSessionIDType` | Session identifier assigned by the server for the current login session. |
| `CustomerName` | `TThostFtdcIndividualNameType` | Carries the customer name for the current request or response. |
| `IdCardType` | `TThostFtdcIdCardTypeType` | Carries the id card type for the current request or response. |
| `IdentifiedCardNo` | `TThostFtdcIdentifiedCardNoType` | Carries the identified card no for the current request or response. |
| `CustType` | `TThostFtdcCustTypeType` | Carries the cust type for the current request or response. |
| `BankAccount` | `TThostFtdcBankAccountType` | Bank account number used by the linked transfer relationship. |
| `BankPassWord` | `TThostFtdcPasswordType` | Bank-side password used during bank-futures transfer. |
| `AccountID` | `TThostFtdcAccountIDType` | Futures-side account identifier. |
| `Password` | `TThostFtdcPasswordType` | Trading password or user password carried by the request. |
| `FutureSerial` | `TThostFtdcFutureSerialType` | Carries the future serial number for the current request or response. |
| `InstallID` | `TThostFtdcInstallIDType` | Carries the install identifier for the current request or response. |
| `UserID` | `TThostFtdcUserIDType` | User code associated with the current login identity. |
| `VerifyCertNoFlag` | `TThostFtdcYesNoIndicatorType` | Carries the verify cert no flag for the current request or response. |
| `CurrencyID` | `TThostFtdcCurrencyIDType` | Currency code used for balance and transfer values. |
| `Digest` | `TThostFtdcDigestType` | Carries the digest for the current request or response. |
| `BankAccType` | `TThostFtdcBankAccTypeType` | Carries the bank acc type for the current request or response. |
| `DeviceID` | `TThostFtdcDeviceIDType` | Client device identifier collected for compliance or risk control. |
| `BankSecuAccType` | `TThostFtdcBankAccTypeType` | Carries the bank secu acc type for the current request or response. |
| `BrokerIDByBank` | `TThostFtdcBankCodingForFutureType` | Carries the broker identifier by bank for the current request or response. |
| `BankSecuAcc` | `TThostFtdcBankAccountType` | Carries the bank secu acc for the current request or response. |
| `BankPwdFlag` | `TThostFtdcPwdFlagType` | Carries the bank pwd flag for the current request or response. |
| `SecuPwdFlag` | `TThostFtdcPwdFlagType` | Carries the secu pwd flag for the current request or response. |
| `OperNo` | `TThostFtdcOperNoType` | Carries the oper no for the current request or response. |
| `RequestID` | `TThostFtdcRequestIDType` | Client-generated request identifier used for response correlation. |
| `TID` | `TThostFtdcTIDType` | Carries the tid for the current request or response. |
| `LongCustomerName` | `TThostFtdcLongIndividualNameType` | Carries the long customer name for the current request or response. |

**Structure layout**

```cpp
struct CThostFtdcReqQueryAccountField
{

    TThostFtdcTradeCodeType TradeCode;

    TThostFtdcBankIDType BankID;

    TThostFtdcBankBrchIDType BankBranchID;

    TThostFtdcBrokerIDType BrokerID;

    TThostFtdcFutureBranchIDType BrokerBranchID;

    TThostFtdcTradeDateType TradeDate;

    TThostFtdcTradeTimeType TradeTime;

    TThostFtdcBankSerialType BankSerial;

    TThostFtdcTradeDateType TradingDay;

    TThostFtdcSerialType PlateSerial;

    TThostFtdcLastFragmentType LastFragment;

    TThostFtdcSessionIDType SessionID;

    TThostFtdcIndividualNameType CustomerName;

    TThostFtdcIdCardTypeType IdCardType;

    TThostFtdcIdentifiedCardNoType IdentifiedCardNo;

    TThostFtdcCustTypeType CustType;

    TThostFtdcBankAccountType BankAccount;

    TThostFtdcPasswordType BankPassWord;

    TThostFtdcAccountIDType AccountID;

    TThostFtdcPasswordType Password;

    TThostFtdcFutureSerialType FutureSerial;

    TThostFtdcInstallIDType InstallID;

    TThostFtdcUserIDType UserID;

    TThostFtdcYesNoIndicatorType VerifyCertNoFlag;

    TThostFtdcCurrencyIDType CurrencyID;

    TThostFtdcDigestType Digest;

    TThostFtdcBankAccTypeType BankAccType;

    TThostFtdcDeviceIDType DeviceID;

    TThostFtdcBankAccTypeType BankSecuAccType;

    TThostFtdcBankCodingForFutureType BrokerIDByBank;

    TThostFtdcBankAccountType BankSecuAcc;

    TThostFtdcPwdFlagType BankPwdFlag;

    TThostFtdcPwdFlagType SecuPwdFlag;

    TThostFtdcOperNoType OperNo;

    TThostFtdcRequestIDType RequestID;

    TThostFtdcTIDType TID;

    TThostFtdcLongIndividualNameType LongCustomerName;
};
```

**Usage example**

```cpp
CThostFtdcReqQueryAccountF ield reqQueryAccount = {};
// Fill the required identifiers and business fields before sending the request.
int rc = api->ReqQueryBankAccountMoneyByFuture(&reqQueryAccount, requestId++);
if (rc != 0) {
    // Handle the local submission failure before waiting for callbacks.
}
```

**Implementation notes**

- Treat the immediate return code and the later callbacks as two different stages of the same business operation.
- Preserve the identifiers sent in the request because later callbacks often reference them instead of your local in-memory object.
