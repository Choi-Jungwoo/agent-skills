# CTP trader SPI bank and configuration responses

This reference covers response callbacks for bank-transfer, token, settlement-confirm, and offset-setting requests.

| Entry | Kind |
| --- | --- |
| OnRspFromBankToFutureByFuture | callback |
| OnRspFromFutureToBankByFuture | callback |
| OnRspQueryBankAccountMoneyByFuture | callback |
| OnRspQueryCFMMCTradingAccountToken | callback |
| OnRspSettlementInfoConfirm | callback |
| OnRspOffsetSetting | callback |
| OnRspCancelOffsetSetting | callback |

## OnRspFromBankToFutureByFuture

`OnRspFromBankToFutureByFuture` is an event callback that reports state back from the CTP runtime into the client application.

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

- This callback belongs to the synchronous response path for a request issued earlier.
- Use `pRspInfo` to detect business or validation failures when that parameter is present.
- Use `nRequestID` and `bIsLast` to correlate and complete the waiting request state when those parameters are present.

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
void MySpi::OnRspFromBankToFutureByFuture() {
    // Mark the event in your session state machine and send the next step if needed.
}
```

**Implementation notes**

- Make callback handlers idempotent because reconnect and replay semantics can surface the same business object more than once.
- Do not block the SPI thread with long business logic; hand the event to a worker queue when processing becomes expensive.

## OnRspFromFutureToBankByFuture

`OnRspFromFutureToBankByFuture` is an event callback that reports state back from the CTP runtime into the client application.

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

- This callback belongs to the synchronous response path for a request issued earlier.
- Use `pRspInfo` to detect business or validation failures when that parameter is present.
- Use `nRequestID` and `bIsLast` to correlate and complete the waiting request state when those parameters are present.

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
void MySpi::OnRspFromFutureToBankByFuture() {
    // Mark the event in your session state machine and send the next step if needed.
}
```

**Implementation notes**

- Make callback handlers idempotent because reconnect and replay semantics can surface the same business object more than once.
- Do not block the SPI thread with long business logic; hand the event to a worker queue when processing becomes expensive.

## OnRspQueryBankAccountMoneyByFuture

`OnRspQueryBankAccountMoneyByFuture` is an event callback that reports state back from the CTP runtime into the client application.

- Kind: callback
- Owning interface: `CThostFtdcTraderSpi`
- Related symbols: `OnRspQueryBankAccountMoneyByFut`, `ReqQueryBankAccountMoneyByFuture`

**When to use it**

- Drive event-based application state updates as server data arrives.
- Wake request waiters or publish the event into a higher-level message bus.

**How to apply it**

1. Validate the payload and error object before updating application state.
2. Correlate the event with the original request or subscription when a request id is present.
3. Persist the important identifiers and keep handler logic short so the SPI thread stays responsive.

**Callback and outcome model**

- This callback belongs to the synchronous response path for a request issued earlier.
- Use `pRspInfo` to detect business or validation failures when that parameter is present.
- Use `nRequestID` and `bIsLast` to correlate and complete the waiting request state when those parameters are present.

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
void MySpi::OnRspQueryBankAccountMoneyByFuture() {
    // Mark the event in your session state machine and send the next step if needed.
}
```

**Implementation notes**

- Make callback handlers idempotent because reconnect and replay semantics can surface the same business object more than once.
- Do not block the SPI thread with long business logic; hand the event to a worker queue when processing becomes expensive.

## OnRspQueryCFMMCTradingAccountToken

`OnRspQueryCFMMCTradingAccountToken` is an event callback that reports state back from the CTP runtime into the client application.

- Kind: callback
- Owning interface: `CThostFtdcTraderSpi`
- Related symbols: `OnRspQueryCFMMCTradingAccountT`, `ReqQueryCFMMCTradingAccountToken`

**When to use it**

- Drive event-based application state updates as server data arrives.
- Wake request waiters or publish the event into a higher-level message bus.

**How to apply it**

1. Validate the payload and error object before updating application state.
2. Correlate the event with the original request or subscription when a request id is present.
3. Persist the important identifiers and keep handler logic short so the SPI thread stays responsive.

**Callback and outcome model**

- This callback belongs to the synchronous response path for a request issued earlier.
- Use `pRspInfo` to detect business or validation failures when that parameter is present.
- Use `nRequestID` and `bIsLast` to correlate and complete the waiting request state when those parameters are present.

**Field guide for `CThostFtdcQueryCFMMCTradingAccountTokenField`**

| Field | Type | Purpose |
| --- | --- | --- |
| `BrokerID` | `TThostFtdcBrokerIDType` | Broker code that scopes the request or identifies the response owner. |
| `InvestorID` | `TThostFtdcInvestorIDType` | Investor code used by the trading account. |
| `InvestUnitID` | `TThostFtdcInvestUnitIDType` | Investment unit identifier used by the account model. |

**Structure layout**

```cpp
struct CThostFtdcQueryCFMMCTradingAccountTokenField
{

    TThostFtdcBrokerIDType BrokerID;

    TThostFtdcInvestorIDType InvestorID;

    TThostFtdcInvestUnitIDType InvestUnitID;
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
void MySpi::OnRspQueryCFMMCTradingAccountToken() {
    // Mark the event in your session state machine and send the next step if needed.
}
```

**Implementation notes**

- Make callback handlers idempotent because reconnect and replay semantics can surface the same business object more than once.
- Do not block the SPI thread with long business logic; hand the event to a worker queue when processing becomes expensive.

## OnRspSettlementInfoConfirm

`OnRspSettlementInfoConfirm` is an event callback that reports state back from the CTP runtime into the client application.

- Kind: callback
- Owning interface: `CThostFtdcTraderSpi`
- Related symbols: `ReqSettlementInfoConfirm`

**When to use it**

- Drive event-based application state updates as server data arrives.
- Wake request waiters or publish the event into a higher-level message bus.

**How to apply it**

1. Validate the payload and error object before updating application state.
2. Correlate the event with the original request or subscription when a request id is present.
3. Persist the important identifiers and keep handler logic short so the SPI thread stays responsive.

**Callback and outcome model**

- This callback belongs to the synchronous response path for a request issued earlier.
- Use `pRspInfo` to detect business or validation failures when that parameter is present.
- Use `nRequestID` and `bIsLast` to correlate and complete the waiting request state when those parameters are present.

**Field guide for `CThostFtdcSettlementInfoConfirmField`**

| Field | Type | Purpose |
| --- | --- | --- |
| `BrokerID` | `TThostFtdcBrokerIDType` | Broker code that scopes the request or identifies the response owner. |
| `InvestorID` | `TThostFtdcInvestorIDType` | Investor code used by the trading account. |
| `ConfirmDate` | `TThostFtdcDateType` | Carries the confirm date for the current request or response. |
| `ConfirmTime` | `TThostFtdcTimeType` | Carries the confirm time for the current request or response. |
| `SettlementID` | `TThostFtdcSettlementIDType` | Carries the settlement identifier for the current request or response. |
| `AccountID` | `TThostFtdcAccountIDType` | Futures-side account identifier. |
| `CurrencyID` | `TThostFtdcCurrencyIDType` | Currency code used for balance and transfer values. |

**Structure layout**

```cpp
struct CThostFtdcSettlementInfoConfirmField
{

    TThostFtdcBrokerIDType BrokerID;

    TThostFtdcInvestorIDType InvestorID;

    TThostFtdcDateType ConfirmDate;

    TThostFtdcTimeType ConfirmTime;

    TThostFtdcSettlementIDType SettlementID;

    TThostFtdcAccountIDType AccountID;

    TThostFtdcCurrencyIDType CurrencyID;
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
void MySpi::OnRspSettlementInfoConfirm() {
    // Mark the event in your session state machine and send the next step if needed.
}
```

**Implementation notes**

- Make callback handlers idempotent because reconnect and replay semantics can surface the same business object more than once.
- Do not block the SPI thread with long business logic; hand the event to a worker queue when processing becomes expensive.

## OnRspOffsetSetting

`OnRspOffsetSetting` is an event callback that reports state back from the CTP runtime into the client application.

- Kind: callback
- Owning interface: `CThostFtdcTraderSpi`
- Related symbols: `ReqOffsetSetting`

**When to use it**

- Drive event-based application state updates as server data arrives.
- Wake request waiters or publish the event into a higher-level message bus.

**How to apply it**

1. Validate the payload and error object before updating application state.
2. Correlate the event with the original request or subscription when a request id is present.
3. Persist the important identifiers and keep handler logic short so the SPI thread stays responsive.

**Callback and outcome model**

- This callback belongs to the synchronous response path for a request issued earlier.
- Use `pRspInfo` to detect business or validation failures when that parameter is present.
- Use `nRequestID` and `bIsLast` to correlate and complete the waiting request state when those parameters are present.

**Field guide for `CThostFtdcInputOffsetSettingField`**

| Field | Type | Purpose |
| --- | --- | --- |
| `BrokerID` | `TThostFtdcBrokerIDType` | Broker code that scopes the request or identifies the response owner. |
| `InvestorID` | `TThostFtdcInvestorIDType` | Investor code used by the trading account. |
| `InstrumentID` | `TThostFtdcInstrumentIDType` | Instrument symbol for the target contract. |
| `UnderlyingInstrID` | `TThostFtdcInstrumentIDType` | Carries the underlying instr identifier for the current request or response. |
| `ProductID` | `TThostFtdcProductIDType` | Carries the product identifier for the current request or response. |
| `OffsetType` | `TThostFtdcOffsetTypeType` | Carries the offset type for the current request or response. |
| `Volume` | `TThostFtdcVolumeType` | Carries the volume for the current request or response. |
| `IsOffset` | `TThostFtdcBoolType` | Carries the is offset for the current request or response. |
| `RequestID` | `TThostFtdcRequestIDType` | Client-generated request identifier used for response correlation. |
| `UserID` | `TThostFtdcUserIDType` | User code associated with the current login identity. |
| `ExchangeID` | `TThostFtdcExchangeIDType` | Exchange code that disambiguates the target venue. |
| `IPAddress` | `TThostFtdcIPAddressType` | Client IP address reported to the server. |
| `MacAddress` | `TThostFtdcMacAddressType` | Client MAC address reported to the server. |

**Structure layout**

```cpp
struct CThostFtdcInputOffsetSettingField
{

    TThostFtdcBrokerIDType  BrokerID;

    TThostFtdcInvestorIDType    InvestorID;

    TThostFtdcInstrumentIDType  InstrumentID;

    TThostFtdcInstrumentIDType  UnderlyingInstrID;

    TThostFtdcProductIDType ProductID;

    TThostFtdcOffsetTypeType    OffsetType;

    TThostFtdcVolumeType    Volume;

    TThostFtdcBoolType  IsOffset;

    TThostFtdcRequestIDType RequestID;

    TThostFtdcUserIDType    UserID;

    TThostFtdcExchangeIDType    ExchangeID;

    TThostFtdcIPAddressType IPAddress;

    TThostFtdcMacAddressType    MacAddress;
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

    TThostFtdcErrorIDType   ErrorID;

    TThostFtdcErrorMsgType  ErrorMsg;
};
```

**Usage example**

```cpp
void MySpi::OnRspOffsetSetting() {
    // Mark the event in your session state machine and send the next step if needed.
}
```

**Implementation notes**

- Make callback handlers idempotent because reconnect and replay semantics can surface the same business object more than once.
- Do not block the SPI thread with long business logic; hand the event to a worker queue when processing becomes expensive.

## OnRspCancelOffsetSetting

`OnRspCancelOffsetSetting` is an event callback that reports state back from the CTP runtime into the client application.

- Kind: callback
- Owning interface: `CThostFtdcTraderSpi`
- Related symbols: `ReqCancelOffsetSetting`

**When to use it**

- Drive event-based application state updates as server data arrives.
- Wake request waiters or publish the event into a higher-level message bus.

**How to apply it**

1. Validate the payload and error object before updating application state.
2. Correlate the event with the original request or subscription when a request id is present.
3. Persist the important identifiers and keep handler logic short so the SPI thread stays responsive.

**Callback and outcome model**

- This callback belongs to the synchronous response path for a request issued earlier.
- Use `pRspInfo` to detect business or validation failures when that parameter is present.
- Use `nRequestID` and `bIsLast` to correlate and complete the waiting request state when those parameters are present.

**Field guide for `CThostFtdcInputOffsetSettingField`**

| Field | Type | Purpose |
| --- | --- | --- |
| `BrokerID` | `TThostFtdcBrokerIDType` | Broker code that scopes the request or identifies the response owner. |
| `InvestorID` | `TThostFtdcInvestorIDType` | Investor code used by the trading account. |
| `InstrumentID` | `TThostFtdcInstrumentIDType` | Instrument symbol for the target contract. |
| `UnderlyingInstrID` | `TThostFtdcInstrumentIDType` | Carries the underlying instr identifier for the current request or response. |
| `ProductID` | `TThostFtdcProductIDType` | Carries the product identifier for the current request or response. |
| `OffsetType` | `TThostFtdcOffsetTypeType` | Carries the offset type for the current request or response. |
| `Volume` | `TThostFtdcVolumeType` | Carries the volume for the current request or response. |
| `IsOffset` | `TThostFtdcBoolType` | Carries the is offset for the current request or response. |
| `RequestID` | `TThostFtdcRequestIDType` | Client-generated request identifier used for response correlation. |
| `UserID` | `TThostFtdcUserIDType` | User code associated with the current login identity. |
| `ExchangeID` | `TThostFtdcExchangeIDType` | Exchange code that disambiguates the target venue. |
| `IPAddress` | `TThostFtdcIPAddressType` | Client IP address reported to the server. |
| `MacAddress` | `TThostFtdcMacAddressType` | Client MAC address reported to the server. |

**Structure layout**

```cpp
struct CThostFtdcInputOffsetSettingField
{

    TThostFtdcBrokerIDType  BrokerID;

    TThostFtdcInvestorIDType    InvestorID;

    TThostFtdcInstrumentIDType  InstrumentID;

    TThostFtdcInstrumentIDType  UnderlyingInstrID;

    TThostFtdcProductIDType ProductID;

    TThostFtdcOffsetTypeType    OffsetType;

    TThostFtdcVolumeType    Volume;

    TThostFtdcBoolType  IsOffset;

    TThostFtdcRequestIDType RequestID;

    TThostFtdcUserIDType    UserID;

    TThostFtdcExchangeIDType    ExchangeID;

    TThostFtdcIPAddressType IPAddress;

    TThostFtdcMacAddressType    MacAddress;
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

    TThostFtdcErrorIDType   ErrorID;

    TThostFtdcErrorMsgType  ErrorMsg;
};
```

**Usage example**

```cpp
void MySpi::OnRspCancelOffsetSetting() {
    // Mark the event in your session state machine and send the next step if needed.
}
```

**Implementation notes**

- Make callback handlers idempotent because reconnect and replay semantics can surface the same business object more than once.
- Do not block the SPI thread with long business logic; hand the event to a worker queue when processing becomes expensive.
