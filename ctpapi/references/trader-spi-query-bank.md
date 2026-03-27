# CTP trader SPI bank query callbacks

This reference covers query callbacks for bank linkage, contract bank data, transfer banks, and transfer serials.

| Entry | Kind |
| --- | --- |
| OnRspQryAccountregister | callback |
| OnRspQryCFMMCTradingAccountKey | callback |
| OnRspQryContractBank | callback |
| OnRspQryTransferBank | callback |
| OnRspQryTransferSerial | callback |

## OnRspQryAccountregister

`OnRspQryAccountregister` is an event callback that reports state back from the CTP runtime into the client application.

- Kind: callback
- Owning interface: `CThostFtdcTraderSpi`
- Related symbols: `ReqQryAccountregister`

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

**Field guide for `CThostFtdcAccountregisterField`**

| Field | Type | Purpose |
| --- | --- | --- |
| `TradeDay` | `TThostFtdcTradeDateType` | Carries the trade day for the current request or response. |
| `BankID` | `TThostFtdcBankIDType` | Bank identifier for bank-futures transfer workflows. |
| `BankBranchID` | `TThostFtdcBankBrchIDType` | Bank branch identifier used for transfer routing. |
| `BankAccount` | `TThostFtdcBankAccountType` | Bank account number used by the linked transfer relationship. |
| `BrokerID` | `TThostFtdcBrokerIDType` | Broker code that scopes the request or identifies the response owner. |
| `BrokerBranchID` | `TThostFtdcFutureBranchIDType` | Broker branch identifier used for transfer routing. |
| `AccountID` | `TThostFtdcAccountIDType` | Futures-side account identifier. |
| `IdCardType` | `TThostFtdcIdCardTypeType` | Carries the id card type for the current request or response. |
| `IdentifiedCardNo` | `TThostFtdcIdentifiedCardNoType` | Carries the identified card no for the current request or response. |
| `CustomerName` | `TThostFtdcIndividualNameType` | Carries the customer name for the current request or response. |
| `CurrencyID` | `TThostFtdcCurrencyIDType` | Currency code used for balance and transfer values. |
| `OpenOrDestroy` | `TThostFtdcOpenOrDestroyType` | Carries the open or destroy for the current request or response. |
| `RegDate` | `TThostFtdcTradeDateType` | Carries the reg date for the current request or response. |
| `OutDate` | `TThostFtdcTradeDateType` | Carries the out date for the current request or response. |
| `TID` | `TThostFtdcTIDType` | Carries the tid for the current request or response. |
| `CustType` | `TThostFtdcCustTypeType` | Carries the cust type for the current request or response. |
| `BankAccType` | `TThostFtdcBankAccTypeType` | Carries the bank acc type for the current request or response. |
| `LongCustomerName` | `TThostFtdcLongIndividualNameType` | Carries the long customer name for the current request or response. |

**Structure layout**

```cpp
struct CThostFtdcAccountregisterField
{

    TThostFtdcTradeDateType TradeDay;

    TThostFtdcBankIDType BankID;

    TThostFtdcBankBrchIDType BankBranchID;

    TThostFtdcBankAccountType BankAccount;

    TThostFtdcBrokerIDType BrokerID;

    TThostFtdcFutureBranchIDType BrokerBranchID;

    TThostFtdcAccountIDType AccountID;

    TThostFtdcIdCardTypeType IdCardType;

    TThostFtdcIdentifiedCardNoType IdentifiedCardNo;

    TThostFtdcIndividualNameType CustomerName;

    TThostFtdcCurrencyIDType CurrencyID;

    TThostFtdcOpenOrDestroyType OpenOrDestroy;

    TThostFtdcTradeDateType RegDate;

    TThostFtdcTradeDateType OutDate;

    TThostFtdcTIDType TID;

    TThostFtdcCustTypeType CustType;

    TThostFtdcBankAccTypeType BankAccType;

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
void MySpi::OnRspQryAccountregister() {
    // Mark the event in your session state machine and send the next step if needed.
}
```

**Implementation notes**

- Make callback handlers idempotent because reconnect and replay semantics can surface the same business object more than once.
- Do not block the SPI thread with long business logic; hand the event to a worker queue when processing becomes expensive.

## OnRspQryCFMMCTradingAccountKey

`OnRspQryCFMMCTradingAccountKey` is an event callback that reports state back from the CTP runtime into the client application.

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

- This callback belongs to the synchronous response path for a request issued earlier.
- Use `pRspInfo` to detect business or validation failures when that parameter is present.
- Use `nRequestID` and `bIsLast` to correlate and complete the waiting request state when those parameters are present.

**Field guide for `CThostFtdcCFMMCTradingAccountKeyField`**

| Field | Type | Purpose |
| --- | --- | --- |
| `BrokerID` | `TThostFtdcBrokerIDType` | Broker code that scopes the request or identifies the response owner. |
| `ParticipantID` | `TThostFtdcParticipantIDType` | Carries the participant identifier for the current request or response. |
| `AccountID` | `TThostFtdcAccountIDType` | Futures-side account identifier. |
| `KeyID` | `TThostFtdcSequenceNoType` | Carries the key identifier for the current request or response. |
| `CurrentKey` | `TThostFtdcCFMMCKeyType` | Carries the current key for the current request or response. |

**Structure layout**

```cpp
struct CThostFtdcCFMMCTradingAccountKeyField
{

    TThostFtdcBrokerIDType BrokerID;

    TThostFtdcParticipantIDType ParticipantID;

    TThostFtdcAccountIDType AccountID;

    TThostFtdcSequenceNoType KeyID;

    TThostFtdcCFMMCKeyType CurrentKey;
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
void MySpi::OnRspQryCFMMCTradingAccountKey() {
    // Mark the event in your session state machine and send the next step if needed.
}
```

**Implementation notes**

- Make callback handlers idempotent because reconnect and replay semantics can surface the same business object more than once.
- Do not block the SPI thread with long business logic; hand the event to a worker queue when processing becomes expensive.

## OnRspQryContractBank

`OnRspQryContractBank` is an event callback that reports state back from the CTP runtime into the client application.

- Kind: callback
- Owning interface: `CThostFtdcTraderSpi`
- Related symbols: `ReqQryContractBank`

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

**Field guide for `CThostFtdcContractBankField`**

| Field | Type | Purpose |
| --- | --- | --- |
| `BrokerID` | `TThostFtdcBrokerIDType` | Broker code that scopes the request or identifies the response owner. |
| `BankID` | `TThostFtdcBankIDType` | Bank identifier for bank-futures transfer workflows. |
| `BankBrchID` | `TThostFtdcBankBrchIDType` | Carries the bank brch identifier for the current request or response. |
| `BankName` | `TThostFtdcBankNameType` | Carries the bank name for the current request or response. |

**Structure layout**

```cpp
struct CThostFtdcContractBankField
{

    TThostFtdcBrokerIDType BrokerID;

    TThostFtdcBankIDType BankID;

    TThostFtdcBankBrchIDType BankBrchID;

    TThostFtdcBankNameType BankName;
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
void MySpi::OnRspQryContractBank() {
    // Mark the event in your session state machine and send the next step if needed.
}
```

**Implementation notes**

- Make callback handlers idempotent because reconnect and replay semantics can surface the same business object more than once.
- Do not block the SPI thread with long business logic; hand the event to a worker queue when processing becomes expensive.

## OnRspQryTransferBank

`OnRspQryTransferBank` is an event callback that reports state back from the CTP runtime into the client application.

- Kind: callback
- Owning interface: `CThostFtdcTraderSpi`
- Related symbols: `ReqQryTransferBank`

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

**Field guide for `CThostFtdcTransferBankField`**

| Field | Type | Purpose |
| --- | --- | --- |
| `BankID` | `TThostFtdcBankIDType` | Bank identifier for bank-futures transfer workflows. |
| `BankBrchID` | `TThostFtdcBankBrchIDType` | Carries the bank brch identifier for the current request or response. |
| `BankName` | `TThostFtdcBankNameType` | Carries the bank name for the current request or response. |
| `IsActive` | `TThostFtdcBoolType` | Carries the is active for the current request or response. |

**Structure layout**

```cpp
struct CThostFtdcTransferBankField
{

    TThostFtdcBankIDType BankID;

    TThostFtdcBankBrchIDType BankBrchID;

    TThostFtdcBankNameType BankName;

    TThostFtdcBoolType IsActive;
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
void MySpi::OnRspQryTransferBank() {
    // Mark the event in your session state machine and send the next step if needed.
}
```

**Implementation notes**

- Make callback handlers idempotent because reconnect and replay semantics can surface the same business object more than once.
- Do not block the SPI thread with long business logic; hand the event to a worker queue when processing becomes expensive.

## OnRspQryTransferSerial

`OnRspQryTransferSerial` is an event callback that reports state back from the CTP runtime into the client application.

- Kind: callback
- Owning interface: `CThostFtdcTraderSpi`
- Related symbols: `ReqQryTransferSerial`

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

**Field guide for `CThostFtdcTransferSerialField`**

| Field | Type | Purpose |
| --- | --- | --- |
| `PlateSerial` | `TThostFtdcPlateSerialType` | Carries the plate serial number for the current request or response. |
| `TradeDate` | `TThostFtdcTradeDateType` | Business date attached to the transfer or trade record. |
| `TradingDay` | `TThostFtdcDateType` | Trading date visible to the current trading system session. |
| `TradeTime` | `TThostFtdcTradeTimeType` | Business time attached to the transfer or trade record. |
| `TradeCode` | `TThostFtdcTradeCodeType` | Carries the trade code for the current request or response. |
| `SessionID` | `TThostFtdcSessionIDType` | Session identifier assigned by the server for the current login session. |
| `BankID` | `TThostFtdcBankIDType` | Bank identifier for bank-futures transfer workflows. |
| `BankBranchID` | `TThostFtdcBankBrchIDType` | Bank branch identifier used for transfer routing. |
| `BankAccType` | `TThostFtdcBankAccTypeType` | Carries the bank acc type for the current request or response. |
| `BankAccount` | `TThostFtdcBankAccountType` | Bank account number used by the linked transfer relationship. |
| `BankSerial` | `TThostFtdcBankSerialType` | Carries the bank serial number for the current request or response. |
| `BrokerID` | `TThostFtdcBrokerIDType` | Broker code that scopes the request or identifies the response owner. |
| `BrokerBranchID` | `TThostFtdcFutureBranchIDType` | Broker branch identifier used for transfer routing. |
| `FutureAccType` | `TThostFtdcFutureAccTypeType` | Carries the future acc type for the current request or response. |
| `AccountID` | `TThostFtdcAccountIDType` | Futures-side account identifier. |
| `InvestorID` | `TThostFtdcInvestorIDType` | Investor code used by the trading account. |
| `FutureSerial` | `TThostFtdcFutureSerialType` | Carries the future serial number for the current request or response. |
| `IdCardType` | `TThostFtdcIdCardTypeType` | Carries the id card type for the current request or response. |
| `IdentifiedCardNo` | `TThostFtdcIdentifiedCardNoType` | Carries the identified card no for the current request or response. |
| `CurrencyID` | `TThostFtdcCurrencyIDType` | Currency code used for balance and transfer values. |
| `TradeAmount` | `TThostFtdcTradeAmountType` | Amount of funds moved by the transfer request. |
| `CustFee` | `TThostFtdcCustFeeType` | Carries the cust fee for the current request or response. |
| `BrokerFee` | `TThostFtdcFutureFeeType` | Carries the broker fee for the current request or response. |
| `AvailabilityFlag` | `TThostFtdcAvailabilityFlagType` | Carries the availability flag for the current request or response. |
| `OperatorCode` | `TThostFtdcOperatorCodeType` | Carries the operator code for the current request or response. |
| `BankNewAccount` | `TThostFtdcBankAccountType` | Carries the bank new account for the current request or response. |
| `ErrorID` | `TThostFtdcErrorIDType` | Numeric error code returned by the API. |
| `ErrorMsg` | `TThostFtdcErrorMsgType` | Human-readable error message returned by the API. |

**Structure layout**

```cpp
struct CThostFtdcTransferSerialField
{

    TThostFtdcPlateSerialType PlateSerial;

    TThostFtdcTradeDateType TradeDate;

    TThostFtdcDateType TradingDay;

    TThostFtdcTradeTimeType TradeTime;

    TThostFtdcTradeCodeType TradeCode;

    TThostFtdcSessionIDType SessionID;

    TThostFtdcBankIDType BankID;

    TThostFtdcBankBrchIDType BankBranchID;

    TThostFtdcBankAccTypeType BankAccType;

    TThostFtdcBankAccountType BankAccount;

    TThostFtdcBankSerialType BankSerial;

    TThostFtdcBrokerIDType BrokerID;

    TThostFtdcFutureBranchIDType BrokerBranchID;

    TThostFtdcFutureAccTypeType FutureAccType;

    TThostFtdcAccountIDType AccountID;

    TThostFtdcInvestorIDType InvestorID;

    TThostFtdcFutureSerialType FutureSerial;

    TThostFtdcIdCardTypeType IdCardType;

    TThostFtdcIdentifiedCardNoType IdentifiedCardNo;

    TThostFtdcCurrencyIDType CurrencyID;

    TThostFtdcTradeAmountType TradeAmount;

    TThostFtdcCustFeeType CustFee;

    TThostFtdcFutureFeeType BrokerFee;

    TThostFtdcAvailabilityFlagType AvailabilityFlag;

    TThostFtdcOperatorCodeType OperatorCode;

    TThostFtdcBankAccountType BankNewAccount;

    TThostFtdcErrorIDType ErrorID;

    TThostFtdcErrorMsgType ErrorMsg;
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
void MySpi::OnRspQryTransferSerial() {
    // Mark the event in your session state machine and send the next step if needed.
}
```

**Implementation notes**

- Make callback handlers idempotent because reconnect and replay semantics can surface the same business object more than once.
- Do not block the SPI thread with long business logic; hand the event to a worker queue when processing becomes expensive.
