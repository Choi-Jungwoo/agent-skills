# CTP trader SPI bank notifications

This reference covers asynchronous bank-side notifications, account changes, repeal flows, and balance feedback callbacks.

| Entry | Kind |
| --- | --- |
| OnRtnCancelAccountByBank | callback |
| OnRtnCFMMCTradingAccountToken | callback |
| OnRtnChangeAccountByBank | callback |
| OnRtnFromBankToFutureByBank | callback |
| OnRtnFromBankToFutureByFuture | callback |
| OnRtnFromFutureToBankByBank | callback |
| OnRtnFromFutureToBankByFuture | callback |
| OnRtnOpenAccountByBank | callback |
| OnRtnQueryBankBalanceByFuture | callback |
| OnRtnRepealFromBankToFutureByBank | callback |
| OnRtnRepealFromBankToFutureByFuture | callback |
| OnRtnRepealFromBankToFutureByFutureManual | callback |
| OnRtnRepealFromFutureToBankByBank | callback |
| OnRtnRepealFromFutureToBankByFuture | callback |
| OnRtnRepealFromFutureToBankByFutureManual | callback |

## OnRtnCancelAccountByBank

`OnRtnCancelAccountByBank` is an event callback that reports state back from the CTP runtime into the client application.

- Kind: callback
- Owning interface: `CThostFtdcTraderSpi`

**When to use it**

- Drive event-based application state updates as server data arrives.
- Wake request waiters or publish the event into a higher-level message bus.

**How to apply it**

1. Validate the payload and error object before updating application state.
2. Correlate the event with the original request or subscription when a request id is present.
3. Persist the important identifiers and keep handler logic short so the SPI thread stays responsive.

**Callback and outcome model**

- This callback belongs to the asynchronous notification path and may arrive without a matching waiting request.
- Treat the payload as the newest server view and update local state idempotently.

**Field guide for `CThostFtdcCancelAccountField`**

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
| `Gender` | `TThostFtdcGenderType` | Carries the gender for the current request or response. |
| `CountryCode` | `TThostFtdcCountryCodeType` | Carries the country code for the current request or response. |
| `CustType` | `TThostFtdcCustTypeType` | Carries the cust type for the current request or response. |
| `Address` | `TThostFtdcAddressType` | Carries the address for the current request or response. |
| `ZipCode` | `TThostFtdcZipCodeType` | Carries the zip code for the current request or response. |
| `Telephone` | `TThostFtdcTelephoneType` | Carries the telephone for the current request or response. |
| `MobilePhone` | `TThostFtdcMobilePhoneType` | Carries the mobile phone for the current request or response. |
| `Fax` | `TThostFtdcFaxType` | Carries the fax for the current request or response. |
| `EMail` | `TThostFtdcEMailType` | Carries the e mail for the current request or response. |
| `MoneyAccountStatus` | `TThostFtdcMoneyAccountStatusType` | Carries the money account status for the current request or response. |
| `BankAccount` | `TThostFtdcBankAccountType` | Bank account number used by the linked transfer relationship. |
| `BankPassWord` | `TThostFtdcPasswordType` | Bank-side password used during bank-futures transfer. |
| `AccountID` | `TThostFtdcAccountIDType` | Futures-side account identifier. |
| `Password` | `TThostFtdcPasswordType` | Trading password or user password carried by the request. |
| `InstallID` | `TThostFtdcInstallIDType` | Carries the install identifier for the current request or response. |
| `VerifyCertNoFlag` | `TThostFtdcYesNoIndicatorType` | Carries the verify cert no flag for the current request or response. |
| `CurrencyID` | `TThostFtdcCurrencyIDType` | Currency code used for balance and transfer values. |
| `CashExchangeCode` | `TThostFtdcCashExchangeCodeType` | Carries the cash exchange code for the current request or response. |
| `Digest` | `TThostFtdcDigestType` | Carries the digest for the current request or response. |
| `BankAccType` | `TThostFtdcBankAccTypeType` | Carries the bank acc type for the current request or response. |
| `DeviceID` | `TThostFtdcDeviceIDType` | Client device identifier collected for compliance or risk control. |
| `BankSecuAccType` | `TThostFtdcBankAccTypeType` | Carries the bank secu acc type for the current request or response. |
| `BrokerIDByBank` | `TThostFtdcBankCodingForFutureType` | Carries the broker identifier by bank for the current request or response. |
| `BankSecuAcc` | `TThostFtdcBankAccountType` | Carries the bank secu acc for the current request or response. |
| `BankPwdFlag` | `TThostFtdcPwdFlagType` | Carries the bank pwd flag for the current request or response. |
| `SecuPwdFlag` | `TThostFtdcPwdFlagType` | Carries the secu pwd flag for the current request or response. |
| `OperNo` | `TThostFtdcOperNoType` | Carries the oper no for the current request or response. |
| `TID` | `TThostFtdcTIDType` | Carries the tid for the current request or response. |
| `UserID` | `TThostFtdcUserIDType` | User code associated with the current login identity. |
| `ErrorID` | `TThostFtdcErrorIDType` | Numeric error code returned by the API. |
| `ErrorMsg` | `TThostFtdcErrorMsgType` | Human-readable error message returned by the API. |
| `LongCustomerName` | `TThostFtdcLongIndividualNameType` | Carries the long customer name for the current request or response. |

**Structure layout**

```cpp
struct CThostFtdcCancelAccountField
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

    TThostFtdcGenderType Gender;

    TThostFtdcCountryCodeType CountryCode;

    TThostFtdcCustTypeType CustType;

    TThostFtdcAddressType Address;

    TThostFtdcZipCodeType ZipCode;

    TThostFtdcTelephoneType Telephone;

    TThostFtdcMobilePhoneType MobilePhone;

    TThostFtdcFaxType Fax;

    TThostFtdcEMailType EMail;

    TThostFtdcMoneyAccountStatusType MoneyAccountStatus;

    TThostFtdcBankAccountType BankAccount;

    TThostFtdcPasswordType BankPassWord;

    TThostFtdcAccountIDType AccountID;

    TThostFtdcPasswordType Password;

    TThostFtdcInstallIDType InstallID;

    TThostFtdcYesNoIndicatorType VerifyCertNoFlag;

    TThostFtdcCurrencyIDType CurrencyID;

    TThostFtdcCashExchangeCodeType CashExchangeCode;

    TThostFtdcDigestType Digest;

    TThostFtdcBankAccTypeType BankAccType;

    TThostFtdcDeviceIDType DeviceID;

    TThostFtdcBankAccTypeType BankSecuAccType;

    TThostFtdcBankCodingForFutureType BrokerIDByBank;

    TThostFtdcBankAccountType BankSecuAcc;

    TThostFtdcPwdFlagType BankPwdFlag;

    TThostFtdcPwdFlagType SecuPwdFlag;

    TThostFtdcOperNoType OperNo;

    TThostFtdcTIDType TID;

    TThostFtdcUserIDType UserID;

    TThostFtdcErrorIDType ErrorID;

    TThostFtdcErrorMsgType ErrorMsg;

    TThostFtdcLongIndividualNameType LongCustomerName;
};
```

**Usage example**

```cpp
void MySpi::OnRtnCancelAccountByBank() {
    // Mark the event in your session state machine and send the next step if needed.
}
```

**Implementation notes**

- Make callback handlers idempotent because reconnect and replay semantics can surface the same business object more than once.
- Do not block the SPI thread with long business logic; hand the event to a worker queue when processing becomes expensive.

## OnRtnCFMMCTradingAccountToken

`OnRtnCFMMCTradingAccountToken` is an event callback that reports state back from the CTP runtime into the client application.

- Kind: callback
- Owning interface: `CThostFtdcTraderSpi`
- Related symbols: `ReqQueryCFMMCTradingAccountToken`

**When to use it**

- Drive event-based application state updates as server data arrives.
- Wake request waiters or publish the event into a higher-level message bus.

**How to apply it**

1. Validate the payload and error object before updating application state.
2. Correlate the event with the original request or subscription when a request id is present.
3. Persist the important identifiers and keep handler logic short so the SPI thread stays responsive.

**Callback and outcome model**

- This callback belongs to the asynchronous notification path and may arrive without a matching waiting request.
- Treat the payload as the newest server view and update local state idempotently.

**Field guide for `CThostFtdcCFMMCTradingAccountTokenField`**

| Field | Type | Purpose |
| --- | --- | --- |
| `BrokerID` | `TThostFtdcBrokerIDType` | Broker code that scopes the request or identifies the response owner. |
| `ParticipantID` | `TThostFtdcParticipantIDType` | Carries the participant identifier for the current request or response. |
| `AccountID` | `TThostFtdcAccountIDType` | Futures-side account identifier. |
| `KeyID` | `TThostFtdcSequenceNoType` | Carries the key identifier for the current request or response. |
| `Token` | `TThostFtdcCFMMCTokenType` | Carries the token for the current request or response. |

**Structure layout**

```cpp
struct CThostFtdcCFMMCTradingAccountTokenField
{

    TThostFtdcBrokerIDType BrokerID;

    TThostFtdcParticipantIDType ParticipantID;

    TThostFtdcAccountIDType AccountID;

    TThostFtdcSequenceNoType KeyID;

    TThostFtdcCFMMCTokenType Token;
};
```

**Usage example**

```cpp
void MySpi::OnRtnCFMMCTradingAccountToken() {
    // Mark the event in your session state machine and send the next step if needed.
}
```

**Implementation notes**

- Make callback handlers idempotent because reconnect and replay semantics can surface the same business object more than once.
- Do not block the SPI thread with long business logic; hand the event to a worker queue when processing becomes expensive.

## OnRtnChangeAccountByBank

`OnRtnChangeAccountByBank` is an event callback that reports state back from the CTP runtime into the client application.

- Kind: callback
- Owning interface: `CThostFtdcTraderSpi`

**When to use it**

- Drive event-based application state updates as server data arrives.
- Wake request waiters or publish the event into a higher-level message bus.

**How to apply it**

1. Validate the payload and error object before updating application state.
2. Correlate the event with the original request or subscription when a request id is present.
3. Persist the important identifiers and keep handler logic short so the SPI thread stays responsive.

**Callback and outcome model**

- This callback belongs to the asynchronous notification path and may arrive without a matching waiting request.
- Treat the payload as the newest server view and update local state idempotently.

**Field guide for `CThostFtdcChangeAccountField`**

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
| `Gender` | `TThostFtdcGenderType` | Carries the gender for the current request or response. |
| `CountryCode` | `TThostFtdcCountryCodeType` | Carries the country code for the current request or response. |
| `CustType` | `TThostFtdcCustTypeType` | Carries the cust type for the current request or response. |
| `Address` | `TThostFtdcAddressType` | Carries the address for the current request or response. |
| `ZipCode` | `TThostFtdcZipCodeType` | Carries the zip code for the current request or response. |
| `Telephone` | `TThostFtdcTelephoneType` | Carries the telephone for the current request or response. |
| `MobilePhone` | `TThostFtdcMobilePhoneType` | Carries the mobile phone for the current request or response. |
| `Fax` | `TThostFtdcFaxType` | Carries the fax for the current request or response. |
| `EMail` | `TThostFtdcEMailType` | Carries the e mail for the current request or response. |
| `MoneyAccountStatus` | `TThostFtdcMoneyAccountStatusType` | Carries the money account status for the current request or response. |
| `BankAccount` | `TThostFtdcBankAccountType` | Bank account number used by the linked transfer relationship. |
| `BankPassWord` | `TThostFtdcPasswordType` | Bank-side password used during bank-futures transfer. |
| `NewBankAccount` | `TThostFtdcBankAccountType` | Carries the new bank account for the current request or response. |
| `NewBankPassWord` | `TThostFtdcPasswordType` | Carries the new bank pass word for the current request or response. |
| `AccountID` | `TThostFtdcAccountIDType` | Futures-side account identifier. |
| `Password` | `TThostFtdcPasswordType` | Trading password or user password carried by the request. |
| `BankAccType` | `TThostFtdcBankAccTypeType` | Carries the bank acc type for the current request or response. |
| `InstallID` | `TThostFtdcInstallIDType` | Carries the install identifier for the current request or response. |
| `VerifyCertNoFlag` | `TThostFtdcYesNoIndicatorType` | Carries the verify cert no flag for the current request or response. |
| `CurrencyID` | `TThostFtdcCurrencyIDType` | Currency code used for balance and transfer values. |
| `BrokerIDByBank` | `TThostFtdcBankCodingForFutureType` | Carries the broker identifier by bank for the current request or response. |
| `BankPwdFlag` | `TThostFtdcPwdFlagType` | Carries the bank pwd flag for the current request or response. |
| `SecuPwdFlag` | `TThostFtdcPwdFlagType` | Carries the secu pwd flag for the current request or response. |
| `TID` | `TThostFtdcTIDType` | Carries the tid for the current request or response. |
| `Digest` | `TThostFtdcDigestType` | Carries the digest for the current request or response. |
| `ErrorID` | `TThostFtdcErrorIDType` | Numeric error code returned by the API. |
| `ErrorMsg` | `TThostFtdcErrorMsgType` | Human-readable error message returned by the API. |
| `LongCustomerName` | `TThostFtdcLongIndividualNameType` | Carries the long customer name for the current request or response. |

**Structure layout**

```cpp
struct CThostFtdcChangeAccountField
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

    TThostFtdcGenderType Gender;

    TThostFtdcCountryCodeType CountryCode;

    TThostFtdcCustTypeType CustType;

    TThostFtdcAddressType Address;

    TThostFtdcZipCodeType ZipCode;

    TThostFtdcTelephoneType Telephone;

    TThostFtdcMobilePhoneType MobilePhone;

    TThostFtdcFaxType Fax;

    TThostFtdcEMailType EMail;

    TThostFtdcMoneyAccountStatusType MoneyAccountStatus;

    TThostFtdcBankAccountType BankAccount;

    TThostFtdcPasswordType BankPassWord;

    TThostFtdcBankAccountType NewBankAccount;

    TThostFtdcPasswordType NewBankPassWord;

    TThostFtdcAccountIDType AccountID;

    TThostFtdcPasswordType Password;

    TThostFtdcBankAccTypeType BankAccType;

    TThostFtdcInstallIDType InstallID;

    TThostFtdcYesNoIndicatorType VerifyCertNoFlag;

    TThostFtdcCurrencyIDType CurrencyID;

    TThostFtdcBankCodingForFutureType BrokerIDByBank;

    TThostFtdcPwdFlagType BankPwdFlag;

    TThostFtdcPwdFlagType SecuPwdFlag;

    TThostFtdcTIDType TID;

    TThostFtdcDigestType Digest;

    TThostFtdcErrorIDType ErrorID;

    TThostFtdcErrorMsgType ErrorMsg;

    TThostFtdcLongIndividualNameType LongCustomerName;
};
```

**Usage example**

```cpp
void MySpi::OnRtnChangeAccountByBank() {
    // Mark the event in your session state machine and send the next step if needed.
}
```

**Implementation notes**

- Make callback handlers idempotent because reconnect and replay semantics can surface the same business object more than once.
- Do not block the SPI thread with long business logic; hand the event to a worker queue when processing becomes expensive.

## OnRtnFromBankToFutureByBank

`OnRtnFromBankToFutureByBank` is an event callback that reports state back from the CTP runtime into the client application.

- Kind: callback
- Owning interface: `CThostFtdcTraderSpi`

**When to use it**

- Drive event-based application state updates as server data arrives.
- Wake request waiters or publish the event into a higher-level message bus.

**How to apply it**

1. Validate the payload and error object before updating application state.
2. Correlate the event with the original request or subscription when a request id is present.
3. Persist the important identifiers and keep handler logic short so the SPI thread stays responsive.

**Callback and outcome model**

- This callback belongs to the asynchronous notification path and may arrive without a matching waiting request.
- Treat the payload as the newest server view and update local state idempotently.

**Field guide for `CThostFtdcRspTransferField`**

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
| `ErrorID` | `TThostFtdcErrorIDType` | Numeric error code returned by the API. |
| `ErrorMsg` | `TThostFtdcErrorMsgType` | Human-readable error message returned by the API. |
| `LongCustomerName` | `TThostFtdcLongIndividualNameType` | Carries the long customer name for the current request or response. |

**Structure layout**

```cpp
struct CThostFtdcRspTransferField
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

    TThostFtdcErrorIDType ErrorID;

    TThostFtdcErrorMsgType ErrorMsg;

    TThostFtdcLongIndividualNameType LongCustomerName;
};
```

**Usage example**

```cpp
void MySpi::OnRtnFromBankToFutureByBank() {
    // Mark the event in your session state machine and send the next step if needed.
}
```

**Implementation notes**

- Make callback handlers idempotent because reconnect and replay semantics can surface the same business object more than once.
- Do not block the SPI thread with long business logic; hand the event to a worker queue when processing becomes expensive.

## OnRtnFromBankToFutureByFuture

`OnRtnFromBankToFutureByFuture` is an event callback that reports state back from the CTP runtime into the client application.

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

- This callback belongs to the asynchronous notification path and may arrive without a matching waiting request.
- Treat the payload as the newest server view and update local state idempotently.

**Field guide for `CThostFtdcRspTransferField`**

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
| `ErrorID` | `TThostFtdcErrorIDType` | Numeric error code returned by the API. |
| `ErrorMsg` | `TThostFtdcErrorMsgType` | Human-readable error message returned by the API. |
| `LongCustomerName` | `TThostFtdcLongIndividualNameType` | Carries the long customer name for the current request or response. |

**Structure layout**

```cpp
struct CThostFtdcRspTransferField
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

    TThostFtdcErrorIDType ErrorID;

    TThostFtdcErrorMsgType ErrorMsg;

    TThostFtdcLongIndividualNameType LongCustomerName;
};
```

**Usage example**

```cpp
void MySpi::OnRtnFromBankToFutureByFuture() {
    // Mark the event in your session state machine and send the next step if needed.
}
```

**Implementation notes**

- Make callback handlers idempotent because reconnect and replay semantics can surface the same business object more than once.
- Do not block the SPI thread with long business logic; hand the event to a worker queue when processing becomes expensive.

## OnRtnFromFutureToBankByBank

`OnRtnFromFutureToBankByBank` is an event callback that reports state back from the CTP runtime into the client application.

- Kind: callback
- Owning interface: `CThostFtdcTraderSpi`

**When to use it**

- Drive event-based application state updates as server data arrives.
- Wake request waiters or publish the event into a higher-level message bus.

**How to apply it**

1. Validate the payload and error object before updating application state.
2. Correlate the event with the original request or subscription when a request id is present.
3. Persist the important identifiers and keep handler logic short so the SPI thread stays responsive.

**Callback and outcome model**

- This callback belongs to the asynchronous notification path and may arrive without a matching waiting request.
- Treat the payload as the newest server view and update local state idempotently.

**Field guide for `CThostFtdcRspTransferField`**

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
| `ErrorID` | `TThostFtdcErrorIDType` | Numeric error code returned by the API. |
| `ErrorMsg` | `TThostFtdcErrorMsgType` | Human-readable error message returned by the API. |
| `LongCustomerName` | `TThostFtdcLongIndividualNameType` | Carries the long customer name for the current request or response. |

**Structure layout**

```cpp
struct CThostFtdcRspTransferField
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

    TThostFtdcErrorIDType ErrorID;

    TThostFtdcErrorMsgType ErrorMsg;

    TThostFtdcLongIndividualNameType LongCustomerName;
};
```

**Usage example**

```cpp
void MySpi::OnRtnFromFutureToBankByBank() {
    // Mark the event in your session state machine and send the next step if needed.
}
```

**Implementation notes**

- Make callback handlers idempotent because reconnect and replay semantics can surface the same business object more than once.
- Do not block the SPI thread with long business logic; hand the event to a worker queue when processing becomes expensive.

## OnRtnFromFutureToBankByFuture

`OnRtnFromFutureToBankByFuture` is an event callback that reports state back from the CTP runtime into the client application.

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

- This callback belongs to the asynchronous notification path and may arrive without a matching waiting request.
- Treat the payload as the newest server view and update local state idempotently.

**Field guide for `CThostFtdcRspTransferField`**

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
| `ErrorID` | `TThostFtdcErrorIDType` | Numeric error code returned by the API. |
| `ErrorMsg` | `TThostFtdcErrorMsgType` | Human-readable error message returned by the API. |
| `LongCustomerName` | `TThostFtdcLongIndividualNameType` | Carries the long customer name for the current request or response. |

**Structure layout**

```cpp
struct CThostFtdcRspTransferField
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

    TThostFtdcErrorIDType ErrorID;

    TThostFtdcErrorMsgType ErrorMsg;

    TThostFtdcLongIndividualNameType LongCustomerName;
};
```

**Usage example**

```cpp
void MySpi::OnRtnFromFutureToBankByFuture() {
    // Mark the event in your session state machine and send the next step if needed.
}
```

**Implementation notes**

- Make callback handlers idempotent because reconnect and replay semantics can surface the same business object more than once.
- Do not block the SPI thread with long business logic; hand the event to a worker queue when processing becomes expensive.

## OnRtnOpenAccountByBank

`OnRtnOpenAccountByBank` is an event callback that reports state back from the CTP runtime into the client application.

- Kind: callback
- Owning interface: `CThostFtdcTraderSpi`

**When to use it**

- Drive event-based application state updates as server data arrives.
- Wake request waiters or publish the event into a higher-level message bus.

**How to apply it**

1. Validate the payload and error object before updating application state.
2. Correlate the event with the original request or subscription when a request id is present.
3. Persist the important identifiers and keep handler logic short so the SPI thread stays responsive.

**Callback and outcome model**

- This callback belongs to the asynchronous notification path and may arrive without a matching waiting request.
- Treat the payload as the newest server view and update local state idempotently.

**Field guide for `CThostFtdcOpenAccountField`**

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
| `Gender` | `TThostFtdcGenderType` | Carries the gender for the current request or response. |
| `CountryCode` | `TThostFtdcCountryCodeType` | Carries the country code for the current request or response. |
| `CustType` | `TThostFtdcCustTypeType` | Carries the cust type for the current request or response. |
| `Address` | `TThostFtdcAddressType` | Carries the address for the current request or response. |
| `ZipCode` | `TThostFtdcZipCodeType` | Carries the zip code for the current request or response. |
| `Telephone` | `TThostFtdcTelephoneType` | Carries the telephone for the current request or response. |
| `MobilePhone` | `TThostFtdcMobilePhoneType` | Carries the mobile phone for the current request or response. |
| `Fax` | `TThostFtdcFaxType` | Carries the fax for the current request or response. |
| `EMail` | `TThostFtdcEMailType` | Carries the e mail for the current request or response. |
| `MoneyAccountStatus` | `TThostFtdcMoneyAccountStatusType` | Carries the money account status for the current request or response. |
| `BankAccount` | `TThostFtdcBankAccountType` | Bank account number used by the linked transfer relationship. |
| `BankPassWord` | `TThostFtdcPasswordType` | Bank-side password used during bank-futures transfer. |
| `AccountID` | `TThostFtdcAccountIDType` | Futures-side account identifier. |
| `Password` | `TThostFtdcPasswordType` | Trading password or user password carried by the request. |
| `InstallID` | `TThostFtdcInstallIDType` | Carries the install identifier for the current request or response. |
| `VerifyCertNoFlag` | `TThostFtdcYesNoIndicatorType` | Carries the verify cert no flag for the current request or response. |
| `CurrencyID` | `TThostFtdcCurrencyIDType` | Currency code used for balance and transfer values. |
| `CashExchangeCode` | `TThostFtdcCashExchangeCodeType` | Carries the cash exchange code for the current request or response. |
| `Digest` | `TThostFtdcDigestType` | Carries the digest for the current request or response. |
| `BankAccType` | `TThostFtdcBankAccTypeType` | Carries the bank acc type for the current request or response. |
| `DeviceID` | `TThostFtdcDeviceIDType` | Client device identifier collected for compliance or risk control. |
| `BankSecuAccType` | `TThostFtdcBankAccTypeType` | Carries the bank secu acc type for the current request or response. |
| `BrokerIDByBank` | `TThostFtdcBankCodingForFutureType` | Carries the broker identifier by bank for the current request or response. |
| `BankSecuAcc` | `TThostFtdcBankAccountType` | Carries the bank secu acc for the current request or response. |
| `BankPwdFlag` | `TThostFtdcPwdFlagType` | Carries the bank pwd flag for the current request or response. |
| `SecuPwdFlag` | `TThostFtdcPwdFlagType` | Carries the secu pwd flag for the current request or response. |
| `OperNo` | `TThostFtdcOperNoType` | Carries the oper no for the current request or response. |
| `TID` | `TThostFtdcTIDType` | Carries the tid for the current request or response. |
| `UserID` | `TThostFtdcUserIDType` | User code associated with the current login identity. |
| `ErrorID` | `TThostFtdcErrorIDType` | Numeric error code returned by the API. |
| `ErrorMsg` | `TThostFtdcErrorMsgType` | Human-readable error message returned by the API. |
| `LongCustomerName` | `TThostFtdcLongIndividualNameType` | Carries the long customer name for the current request or response. |

**Structure layout**

```cpp
struct CThostFtdcOpenAccountField
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

    TThostFtdcGenderType Gender;

    TThostFtdcCountryCodeType CountryCode;

    TThostFtdcCustTypeType CustType;

    TThostFtdcAddressType Address;

    TThostFtdcZipCodeType ZipCode;

    TThostFtdcTelephoneType Telephone;

    TThostFtdcMobilePhoneType MobilePhone;

    TThostFtdcFaxType Fax;

    TThostFtdcEMailType EMail;

    TThostFtdcMoneyAccountStatusType MoneyAccountStatus;

    TThostFtdcBankAccountType BankAccount;

    TThostFtdcPasswordType BankPassWord;

    TThostFtdcAccountIDType AccountID;

    TThostFtdcPasswordType Password;

    TThostFtdcInstallIDType InstallID;

    TThostFtdcYesNoIndicatorType VerifyCertNoFlag;

    TThostFtdcCurrencyIDType CurrencyID;

    TThostFtdcCashExchangeCodeType CashExchangeCode;

    TThostFtdcDigestType Digest;

    TThostFtdcBankAccTypeType BankAccType;

    TThostFtdcDeviceIDType DeviceID;

    TThostFtdcBankAccTypeType BankSecuAccType;

    TThostFtdcBankCodingForFutureType BrokerIDByBank;

    TThostFtdcBankAccountType BankSecuAcc;

    TThostFtdcPwdFlagType BankPwdFlag;

    TThostFtdcPwdFlagType SecuPwdFlag;

    TThostFtdcOperNoType OperNo;

    TThostFtdcTIDType TID;

    TThostFtdcUserIDType UserID;

    TThostFtdcErrorIDType ErrorID;

    TThostFtdcErrorMsgType ErrorMsg;

    TThostFtdcLongIndividualNameType LongCustomerName;
};
```

**Usage example**

```cpp
void MySpi::OnRtnOpenAccountByBank() {
    // Mark the event in your session state machine and send the next step if needed.
}
```

**Implementation notes**

- Make callback handlers idempotent because reconnect and replay semantics can surface the same business object more than once.
- Do not block the SPI thread with long business logic; hand the event to a worker queue when processing becomes expensive.

## OnRtnQueryBankBalanceByFuture

`OnRtnQueryBankBalanceByFuture` is an event callback that reports state back from the CTP runtime into the client application.

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

- This callback belongs to the asynchronous notification path and may arrive without a matching waiting request.
- Treat the payload as the newest server view and update local state idempotently.

**Field guide for `CThostFtdcNotifyQueryAccountField`**

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
| `BankUseAmount` | `TThostFtdcTradeAmountType` | Carries the bank use amount for the current request or response. |
| `BankFetchAmount` | `TThostFtdcTradeAmountType` | Carries the bank fetch amount for the current request or response. |
| `ErrorID` | `TThostFtdcErrorIDType` | Numeric error code returned by the API. |
| `ErrorMsg` | `TThostFtdcErrorMsgType` | Human-readable error message returned by the API. |
| `LongCustomerName` | `TThostFtdcLongIndividualNameType` | Carries the long customer name for the current request or response. |

**Structure layout**

```cpp
struct CThostFtdcNotifyQueryAccountField
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

    TThostFtdcTradeAmountType BankUseAmount;

    TThostFtdcTradeAmountType BankFetchAmount;

    TThostFtdcErrorIDType ErrorID;

    TThostFtdcErrorMsgType ErrorMsg;

    TThostFtdcLongIndividualNameType LongCustomerName;
};
```

**Usage example**

```cpp
void MySpi::OnRtnQueryBankBalanceByFuture() {
    // Mark the event in your session state machine and send the next step if needed.
}
```

**Implementation notes**

- Make callback handlers idempotent because reconnect and replay semantics can surface the same business object more than once.
- Do not block the SPI thread with long business logic; hand the event to a worker queue when processing becomes expensive.

## OnRtnRepealFromBankToFutureByBank

`OnRtnRepealFromBankToFutureByBank` is an event callback that reports state back from the CTP runtime into the client application.

- Kind: callback
- Owning interface: `CThostFtdcTraderSpi`
- Related symbols: `OnRtnRepealFromBankToFutureByBan`

**When to use it**

- Drive event-based application state updates as server data arrives.
- Wake request waiters or publish the event into a higher-level message bus.

**How to apply it**

1. Validate the payload and error object before updating application state.
2. Correlate the event with the original request or subscription when a request id is present.
3. Persist the important identifiers and keep handler logic short so the SPI thread stays responsive.

**Callback and outcome model**

- This callback belongs to the asynchronous notification path and may arrive without a matching waiting request.
- Treat the payload as the newest server view and update local state idempotently.

**Field guide for `CThostFtdcRspRepealField`**

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
| `ErrorID` | `TThostFtdcErrorIDType` | Numeric error code returned by the API. |
| `ErrorMsg` | `TThostFtdcErrorMsgType` | Human-readable error message returned by the API. |
| `LongCustomerName` | `TThostFtdcLongIndividualNameType` | Carries the long customer name for the current request or response. |

**Structure layout**

```cpp
struct CThostFtdcRspRepealField
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

    TThostFtdcErrorIDType ErrorID;

    TThostFtdcErrorMsgType ErrorMsg;

    TThostFtdcLongIndividualNameType LongCustomerName;
};
```

**Usage example**

```cpp
void MySpi::OnRtnRepealFromBankToFutureByBank() {
    // Mark the event in your session state machine and send the next step if needed.
}
```

**Implementation notes**

- Make callback handlers idempotent because reconnect and replay semantics can surface the same business object more than once.
- Do not block the SPI thread with long business logic; hand the event to a worker queue when processing becomes expensive.

## OnRtnRepealFromBankToFutureByFuture

`OnRtnRepealFromBankToFutureByFuture` is an event callback that reports state back from the CTP runtime into the client application.

- Kind: callback
- Owning interface: `CThostFtdcTraderSpi`
- Related symbols: `OnRtnRepealFromBankToFutureByFut`

**When to use it**

- Drive event-based application state updates as server data arrives.
- Wake request waiters or publish the event into a higher-level message bus.

**How to apply it**

1. Validate the payload and error object before updating application state.
2. Correlate the event with the original request or subscription when a request id is present.
3. Persist the important identifiers and keep handler logic short so the SPI thread stays responsive.

**Callback and outcome model**

- This callback belongs to the asynchronous notification path and may arrive without a matching waiting request.
- Treat the payload as the newest server view and update local state idempotently.

**Field guide for `CThostFtdcRspRepealField`**

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
| `ErrorID` | `TThostFtdcErrorIDType` | Numeric error code returned by the API. |
| `ErrorMsg` | `TThostFtdcErrorMsgType` | Human-readable error message returned by the API. |
| `LongCustomerName` | `TThostFtdcLongIndividualNameType` | Carries the long customer name for the current request or response. |

**Structure layout**

```cpp
struct CThostFtdcRspRepealField
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

    TThostFtdcErrorIDType ErrorID;

    TThostFtdcErrorMsgType ErrorMsg;

    TThostFtdcLongIndividualNameType LongCustomerName;
};
```

**Usage example**

```cpp
void MySpi::OnRtnRepealFromBankToFutureByFuture() {
    // Mark the event in your session state machine and send the next step if needed.
}
```

**Implementation notes**

- Make callback handlers idempotent because reconnect and replay semantics can surface the same business object more than once.
- Do not block the SPI thread with long business logic; hand the event to a worker queue when processing becomes expensive.

## OnRtnRepealFromBankToFutureByFutureManual

`OnRtnRepealFromBankToFutureByFutureManual` is an event callback that reports state back from the CTP runtime into the client application.

- Kind: callback
- Owning interface: `CThostFtdcTraderSpi`
- Related symbols: `OnRtnRepealFromBankToFutureByFut`

**When to use it**

- Drive event-based application state updates as server data arrives.
- Wake request waiters or publish the event into a higher-level message bus.

**How to apply it**

1. Validate the payload and error object before updating application state.
2. Correlate the event with the original request or subscription when a request id is present.
3. Persist the important identifiers and keep handler logic short so the SPI thread stays responsive.

**Callback and outcome model**

- This callback belongs to the asynchronous notification path and may arrive without a matching waiting request.
- Treat the payload as the newest server view and update local state idempotently.

**Field guide for `CThostFtdcRspRepealField`**

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
| `ErrorID` | `TThostFtdcErrorIDType` | Numeric error code returned by the API. |
| `ErrorMsg` | `TThostFtdcErrorMsgType` | Human-readable error message returned by the API. |
| `LongCustomerName` | `TThostFtdcLongIndividualNameType` | Carries the long customer name for the current request or response. |

**Structure layout**

```cpp
struct CThostFtdcRspRepealField
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

    TThostFtdcErrorIDType ErrorID;

    TThostFtdcErrorMsgType ErrorMsg;

    TThostFtdcLongIndividualNameType LongCustomerName;
};
```

**Usage example**

```cpp
void MySpi::OnRtnRepealFromBankToFutureByFutureManual() {
    // Mark the event in your session state machine and send the next step if needed.
}
```

**Implementation notes**

- Make callback handlers idempotent because reconnect and replay semantics can surface the same business object more than once.
- Do not block the SPI thread with long business logic; hand the event to a worker queue when processing becomes expensive.

## OnRtnRepealFromFutureToBankByBank

`OnRtnRepealFromFutureToBankByBank` is an event callback that reports state back from the CTP runtime into the client application.

- Kind: callback
- Owning interface: `CThostFtdcTraderSpi`
- Related symbols: `OnRtnRepealFromFutureToBankByBan`

**When to use it**

- Drive event-based application state updates as server data arrives.
- Wake request waiters or publish the event into a higher-level message bus.

**How to apply it**

1. Validate the payload and error object before updating application state.
2. Correlate the event with the original request or subscription when a request id is present.
3. Persist the important identifiers and keep handler logic short so the SPI thread stays responsive.

**Callback and outcome model**

- This callback belongs to the asynchronous notification path and may arrive without a matching waiting request.
- Treat the payload as the newest server view and update local state idempotently.

**Field guide for `CThostFtdcRspRepealField`**

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
| `ErrorID` | `TThostFtdcErrorIDType` | Numeric error code returned by the API. |
| `ErrorMsg` | `TThostFtdcErrorMsgType` | Human-readable error message returned by the API. |
| `LongCustomerName` | `TThostFtdcLongIndividualNameType` | Carries the long customer name for the current request or response. |

**Structure layout**

```cpp
struct CThostFtdcRspRepealField
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

    TThostFtdcErrorIDType ErrorID;

    TThostFtdcErrorMsgType ErrorMsg;

    TThostFtdcLongIndividualNameType LongCustomerName;
};
```

**Usage example**

```cpp
void MySpi::OnRtnRepealFromFutureToBankByBank() {
    // Mark the event in your session state machine and send the next step if needed.
}
```

**Implementation notes**

- Make callback handlers idempotent because reconnect and replay semantics can surface the same business object more than once.
- Do not block the SPI thread with long business logic; hand the event to a worker queue when processing becomes expensive.

## OnRtnRepealFromFutureToBankByFuture

`OnRtnRepealFromFutureToBankByFuture` is an event callback that reports state back from the CTP runtime into the client application.

- Kind: callback
- Owning interface: `CThostFtdcTraderSpi`
- Related symbols: `OnRtnRepealFromFutureToBankByFut`

**When to use it**

- Drive event-based application state updates as server data arrives.
- Wake request waiters or publish the event into a higher-level message bus.

**How to apply it**

1. Validate the payload and error object before updating application state.
2. Correlate the event with the original request or subscription when a request id is present.
3. Persist the important identifiers and keep handler logic short so the SPI thread stays responsive.

**Callback and outcome model**

- This callback belongs to the asynchronous notification path and may arrive without a matching waiting request.
- Treat the payload as the newest server view and update local state idempotently.

**Field guide for `CThostFtdcRspRepealField`**

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
| `ErrorID` | `TThostFtdcErrorIDType` | Numeric error code returned by the API. |
| `ErrorMsg` | `TThostFtdcErrorMsgType` | Human-readable error message returned by the API. |
| `LongCustomerName` | `TThostFtdcLongIndividualNameType` | Carries the long customer name for the current request or response. |

**Structure layout**

```cpp
struct CThostFtdcRspRepealField
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

    TThostFtdcErrorIDType ErrorID;

    TThostFtdcErrorMsgType ErrorMsg;

    TThostFtdcLongIndividualNameType LongCustomerName;
};
```

**Usage example**

```cpp
void MySpi::OnRtnRepealFromFutureToBankByFuture() {
    // Mark the event in your session state machine and send the next step if needed.
}
```

**Implementation notes**

- Make callback handlers idempotent because reconnect and replay semantics can surface the same business object more than once.
- Do not block the SPI thread with long business logic; hand the event to a worker queue when processing becomes expensive.

## OnRtnRepealFromFutureToBankByFutureManual

`OnRtnRepealFromFutureToBankByFutureManual` is an event callback that reports state back from the CTP runtime into the client application.

- Kind: callback
- Owning interface: `CThostFtdcTraderSpi`
- Related symbols: `OnRtnRepealFromFutureToBankByFut`

**When to use it**

- Drive event-based application state updates as server data arrives.
- Wake request waiters or publish the event into a higher-level message bus.

**How to apply it**

1. Validate the payload and error object before updating application state.
2. Correlate the event with the original request or subscription when a request id is present.
3. Persist the important identifiers and keep handler logic short so the SPI thread stays responsive.

**Callback and outcome model**

- This callback belongs to the asynchronous notification path and may arrive without a matching waiting request.
- Treat the payload as the newest server view and update local state idempotently.

**Field guide for `CThostFtdcRspRepealField`**

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
| `ErrorID` | `TThostFtdcErrorIDType` | Numeric error code returned by the API. |
| `ErrorMsg` | `TThostFtdcErrorMsgType` | Human-readable error message returned by the API. |
| `LongCustomerName` | `TThostFtdcLongIndividualNameType` | Carries the long customer name for the current request or response. |

**Structure layout**

```cpp
struct CThostFtdcRspRepealField
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

    TThostFtdcErrorIDType ErrorID;

    TThostFtdcErrorMsgType ErrorMsg;

    TThostFtdcLongIndividualNameType LongCustomerName;
};
```

**Usage example**

```cpp
void MySpi::OnRtnRepealFromFutureToBankByFutureManual() {
    // Mark the event in your session state machine and send the next step if needed.
}
```

**Implementation notes**

- Make callback handlers idempotent because reconnect and replay semantics can surface the same business object more than once.
- Do not block the SPI thread with long business logic; hand the event to a worker queue when processing becomes expensive.
