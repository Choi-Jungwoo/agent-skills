# CTP trader SPI bank-path asynchronous errors

This reference covers asynchronous error callbacks emitted by bank-transfer and bank-balance flows.

| Entry | Kind |
| --- | --- |
| OnErrRtnBankToFutureByFuture | callback |
| OnErrRtnFutureToBankByFuture | callback |
| OnErrRtnQueryBankBalanceByFuture | callback |
| OnErrRtnRepealBankToFutureByFutureManual | callback |
| OnErrRtnRepealFutureToBankByFutureManual | callback |

## OnErrRtnBankToFutureByFuture

`OnErrRtnBankToFutureByFuture` is an event callback that reports state back from the CTP runtime into the client application.

- Kind: callback
- Owning interface: `CThostFtdcTraderSpi`
- Related symbols: `ReqFromBankToFutureByFuture`

**When to use it**

- Drive event-based application state updates as server data arrives.
- Wake request waiters or publish the event into a higher-level message bus.

**How to apply it**

1. Validate the payload and error object before updating application state.
2. Correlate the event with the original request or subscription when a request id is present.
3. Persist the important identifiers and keep handler logic short so the SPI thread stays responsive.

**Callback and outcome model**

- This callback signals an asynchronous failure after the original request has already been accepted locally.
- Keep it separate from the immediate request return code because both can be present in the same business flow.

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

**Field guide for `CThostFtdcRspInfoField`**

| Field | Type | Purpose |
| --- | --- | --- |
| `ErrorID` | `TThostFtdcErrorIDType` | Numeric error code returned by the API. |
| `ErrorMsg` | `TThostFtdcErrorMsgType` | Human-readable error message returned by the API. |

**Structure layout**

```cpp
struct CThostFtdcRspInfoField
{

    TThostFtdcErrorIDType ErrorID;

    TThostFtdcErrorMsgType ErrorMsg;
};
```

**Usage example**

```cpp
void MySpi::OnErrRtnBankToFutureByFuture() {
    // Mark the event in your session state machine and send the next step if needed.
}
```

**Implementation notes**

- Make callback handlers idempotent because reconnect and replay semantics can surface the same business object more than once.
- Do not block the SPI thread with long business logic; hand the event to a worker queue when processing becomes expensive.

## OnErrRtnFutureToBankByFuture

`OnErrRtnFutureToBankByFuture` is an event callback that reports state back from the CTP runtime into the client application.

- Kind: callback
- Owning interface: `CThostFtdcTraderSpi`
- Related symbols: `ReqFromFutureToBankByFuture`

**When to use it**

- Drive event-based application state updates as server data arrives.
- Wake request waiters or publish the event into a higher-level message bus.

**How to apply it**

1. Validate the payload and error object before updating application state.
2. Correlate the event with the original request or subscription when a request id is present.
3. Persist the important identifiers and keep handler logic short so the SPI thread stays responsive.

**Callback and outcome model**

- This callback signals an asynchronous failure after the original request has already been accepted locally.
- Keep it separate from the immediate request return code because both can be present in the same business flow.

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

**Field guide for `CThostFtdcRspInfoField`**

| Field | Type | Purpose |
| --- | --- | --- |
| `ErrorID` | `TThostFtdcErrorIDType` | Numeric error code returned by the API. |
| `ErrorMsg` | `TThostFtdcErrorMsgType` | Human-readable error message returned by the API. |

**Structure layout**

```cpp
struct CThostFtdcRspInfoField
{

    TThostFtdcErrorIDType ErrorID;

    TThostFtdcErrorMsgType ErrorMsg;
};
```

**Usage example**

```cpp
void MySpi::OnErrRtnFutureToBankByFuture() {
    // Mark the event in your session state machine and send the next step if needed.
}
```

**Implementation notes**

- Make callback handlers idempotent because reconnect and replay semantics can surface the same business object more than once.
- Do not block the SPI thread with long business logic; hand the event to a worker queue when processing becomes expensive.

## OnErrRtnQueryBankBalanceByFuture

`OnErrRtnQueryBankBalanceByFuture` is an event callback that reports state back from the CTP runtime into the client application.

- Kind: callback
- Owning interface: `CThostFtdcTraderSpi`
- Related symbols: `ReqQueryBankAccountMoneyByFuture`

**When to use it**

- Drive event-based application state updates as server data arrives.
- Wake request waiters or publish the event into a higher-level message bus.

**How to apply it**

1. Validate the payload and error object before updating application state.
2. Correlate the event with the original request or subscription when a request id is present.
3. Persist the important identifiers and keep handler logic short so the SPI thread stays responsive.

**Callback and outcome model**

- This callback signals an asynchronous failure after the original request has already been accepted locally.
- Keep it separate from the immediate request return code because both can be present in the same business flow.

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

**Field guide for `CThostFtdcRspInfoField`**

| Field | Type | Purpose |
| --- | --- | --- |
| `ErrorID` | `TThostFtdcErrorIDType` | Numeric error code returned by the API. |
| `ErrorMsg` | `TThostFtdcErrorMsgType` | Human-readable error message returned by the API. |

**Structure layout**

```cpp
struct CThostFtdcRspInfoField
{

    TThostFtdcErrorIDType ErrorID;

    TThostFtdcErrorMsgType ErrorMsg;
};
```

**Usage example**

```cpp
void MySpi::OnErrRtnQueryBankBalanceByFuture() {
    // Mark the event in your session state machine and send the next step if needed.
}
```

**Implementation notes**

- Make callback handlers idempotent because reconnect and replay semantics can surface the same business object more than once.
- Do not block the SPI thread with long business logic; hand the event to a worker queue when processing becomes expensive.

## OnErrRtnRepealBankToFutureByFutureManual

`OnErrRtnRepealBankToFutureByFutureManual` is an event callback that reports state back from the CTP runtime into the client application.

- Kind: callback
- Owning interface: `CThostFtdcTraderSpi`
- Related symbols: `OnErrRtnRepealBankToFutureByFutur`

**When to use it**

- Drive event-based application state updates as server data arrives.
- Wake request waiters or publish the event into a higher-level message bus.

**How to apply it**

1. Validate the payload and error object before updating application state.
2. Correlate the event with the original request or subscription when a request id is present.
3. Persist the important identifiers and keep handler logic short so the SPI thread stays responsive.

**Callback and outcome model**

- This callback signals an asynchronous failure after the original request has already been accepted locally.
- Keep it separate from the immediate request return code because both can be present in the same business flow.

**Field guide for `CThostFtdcReqRepealField`**

| Field | Type | Purpose |
| --- | --- | --- |
| `RepealTimeInterval` | `TThostFtdcRepealTimeIntervalType` | Carries the repeal time interval for the current request or response. |
| `RepealedTimes` | `TThostFtdcRepealedTimesType` | Carries the repealed times for the current request or response. |
| `BankRepealFlag` | `TThostFtdcBankRepealFlagType` | Carries the bank repeal flag for the current request or response. |
| `BrokerRepealFlag` | `TThostFtdcBrokerRepealFlagType` | Carries the broker repeal flag for the current request or response. |
| `PlateRepealSerial` | `TThostFtdcPlateSerialType` | Carries the plate repeal serial number for the current request or response. |
| `BankRepealSerial` | `TThostFtdcBankSerialType` | Carries the bank repeal serial number for the current request or response. |
| `FutureRepealSerial` | `TThostFtdcFutureSerialType` | Carries the future repeal serial number for the current request or response. |
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
struct CThostFtdcReqRepealField
{

    TThostFtdcRepealTimeIntervalType RepealTimeInterval;

    TThostFtdcRepealedTimesType RepealedTimes;

    TThostFtdcBankRepealFlagType BankRepealFlag;

    TThostFtdcBrokerRepealFlagType BrokerRepealFlag;

    TThostFtdcPlateSerialType PlateRepealSerial;

    TThostFtdcBankSerialType BankRepealSerial;

    TThostFtdcFutureSerialType FutureRepealSerial;

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

**Field guide for `CThostFtdcRspInfoField`**

| Field | Type | Purpose |
| --- | --- | --- |
| `ErrorID` | `TThostFtdcErrorIDType` | Numeric error code returned by the API. |
| `ErrorMsg` | `TThostFtdcErrorMsgType` | Human-readable error message returned by the API. |

**Structure layout**

```cpp
struct CThostFtdcRspInfoField
{

    TThostFtdcErrorIDType ErrorID;

    TThostFtdcErrorMsgType ErrorMsg;
};
```

**Usage example**

```cpp
void MySpi::OnErrRtnRepealBankToFutureByFutureManual() {
    // Mark the event in your session state machine and send the next step if needed.
}
```

**Implementation notes**

- Make callback handlers idempotent because reconnect and replay semantics can surface the same business object more than once.
- Do not block the SPI thread with long business logic; hand the event to a worker queue when processing becomes expensive.

## OnErrRtnRepealFutureToBankByFutureManual

`OnErrRtnRepealFutureToBankByFutureManual` is an event callback that reports state back from the CTP runtime into the client application.

- Kind: callback
- Owning interface: `CThostFtdcTraderSpi`
- Related symbols: `OnErrRtnRepealFutureToBankByFutur`

**When to use it**

- Drive event-based application state updates as server data arrives.
- Wake request waiters or publish the event into a higher-level message bus.

**How to apply it**

1. Validate the payload and error object before updating application state.
2. Correlate the event with the original request or subscription when a request id is present.
3. Persist the important identifiers and keep handler logic short so the SPI thread stays responsive.

**Callback and outcome model**

- This callback signals an asynchronous failure after the original request has already been accepted locally.
- Keep it separate from the immediate request return code because both can be present in the same business flow.

**Field guide for `CThostFtdcReqRepealField`**

| Field | Type | Purpose |
| --- | --- | --- |
| `RepealTimeInterval` | `TThostFtdcRepealTimeIntervalType` | Carries the repeal time interval for the current request or response. |
| `RepealedTimes` | `TThostFtdcRepealedTimesType` | Carries the repealed times for the current request or response. |
| `BankRepealFlag` | `TThostFtdcBankRepealFlagType` | Carries the bank repeal flag for the current request or response. |
| `BrokerRepealFlag` | `TThostFtdcBrokerRepealFlagType` | Carries the broker repeal flag for the current request or response. |
| `PlateRepealSerial` | `TThostFtdcPlateSerialType` | Carries the plate repeal serial number for the current request or response. |
| `BankRepealSerial` | `TThostFtdcBankSerialType` | Carries the bank repeal serial number for the current request or response. |
| `FutureRepealSerial` | `TThostFtdcFutureSerialType` | Carries the future repeal serial number for the current request or response. |
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
struct CThostFtdcReqRepealField
{

    TThostFtdcRepealTimeIntervalType RepealTimeInterval;

    TThostFtdcRepealedTimesType RepealedTimes;

    TThostFtdcBankRepealFlagType BankRepealFlag;

    TThostFtdcBrokerRepealFlagType BrokerRepealFlag;

    TThostFtdcPlateSerialType PlateRepealSerial;

    TThostFtdcBankSerialType BankRepealSerial;

    TThostFtdcFutureSerialType FutureRepealSerial;

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

**Field guide for `CThostFtdcRspInfoField`**

| Field | Type | Purpose |
| --- | --- | --- |
| `ErrorID` | `TThostFtdcErrorIDType` | Numeric error code returned by the API. |
| `ErrorMsg` | `TThostFtdcErrorMsgType` | Human-readable error message returned by the API. |

**Structure layout**

```cpp
struct CThostFtdcRspInfoField
{

    TThostFtdcErrorIDType ErrorID;

    TThostFtdcErrorMsgType ErrorMsg;
};
```

**Usage example**

```cpp
void MySpi::OnErrRtnRepealFutureToBankByFutureManual() {
    // Mark the event in your session state machine and send the next step if needed.
}
```

**Implementation notes**

- Make callback handlers idempotent because reconnect and replay semantics can surface the same business object more than once.
- Do not block the SPI thread with long business logic; hand the event to a worker queue when processing becomes expensive.
