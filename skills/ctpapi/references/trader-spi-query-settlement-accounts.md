# CTP trader SPI settlement and account query callbacks

This reference covers settlement, trading-account, trading-code, trading-notice, and secondary-agent account query callbacks.

| Entry | Kind |
| --- | --- |
| OnRspQrySecAgentACIDMap | callback |
| OnRspQrySecAgentCheckMode | callback |
| OnRspQrySecAgentTradeInfo | callback |
| OnRspQrySecAgentTradingAccount | callback |
| OnRspQrySettlementInfo | callback |
| OnRspQrySettlementInfoConfirm | callback |
| OnRspQryTradingAccount | callback |
| OnRspQryTradingCode | callback |
| OnRspQryTradingNotice | callback |
| OnRspQryRiskSettleInvstPosition | callback |
| OnRspQryRiskSettleProductStatus | callback |
| OnRspQryUserSession | callback |

## OnRspQrySecAgentACIDMap

`OnRspQrySecAgentACIDMap` is an event callback that reports state back from the CTP runtime into the client application.

- Kind: callback
- Owning interface: `CThostFtdcTraderSpi`
- Related symbols: `ReqQrySecAgentACIDMap`

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

**Field guide for `CThostFtdcSecAgentACIDMapField`**

| Field | Type | Purpose |
| --- | --- | --- |
| `BrokerID` | `TThostFtdcBrokerIDType` | Broker code that scopes the request or identifies the response owner. |
| `UserID` | `TThostFtdcUserIDType` | User code associated with the current login identity. |
| `AccountID` | `TThostFtdcAccountIDType` | Futures-side account identifier. |
| `CurrencyID` | `TThostFtdcCurrencyIDType` | Currency code used for balance and transfer values. |
| `BrokerSecAgentID` | `TThostFtdcAccountIDType` | Carries the broker sec agent identifier for the current request or response. |

**Structure layout**

```cpp
struct CThostFtdcSecAgentACIDMapField
{

    TThostFtdcBrokerIDType BrokerID;

    TThostFtdcUserIDType UserID;

    TThostFtdcAccountIDType AccountID;

    TThostFtdcCurrencyIDType CurrencyID;

    TThostFtdcAccountIDType BrokerSecAgentID;
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
void MySpi::OnRspQrySecAgentACIDMap() {
    // Mark the event in your session state machine and send the next step if needed.
}
```

**Implementation notes**

- Make callback handlers idempotent because reconnect and replay semantics can surface the same business object more than once.
- Do not block the SPI thread with long business logic; hand the event to a worker queue when processing becomes expensive.

## OnRspQrySecAgentCheckMode

`OnRspQrySecAgentCheckMode` is an event callback that reports state back from the CTP runtime into the client application.

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

**Field guide for `CThostFtdcSecAgentCheckModeField`**

| Field | Type | Purpose |
| --- | --- | --- |
| `InvestorID` | `TThostFtdcInvestorIDType` | Investor code used by the trading account. |
| `BrokerID` | `TThostFtdcBrokerIDType` | Broker code that scopes the request or identifies the response owner. |
| `CurrencyID` | `TThostFtdcCurrencyIDType` | Currency code used for balance and transfer values. |
| `BrokerSecAgentID` | `TThostFtdcAccountIDType` | Carries the broker sec agent identifier for the current request or response. |
| `CheckSelfAccount` | `TThostFtdcBoolType` | Carries the check self account for the current request or response. |

**Structure layout**

```cpp
struct CThostFtdcSecAgentCheckModeField
{

    TThostFtdcInvestorIDType InvestorID;

    TThostFtdcBrokerIDType BrokerID;

    TThostFtdcCurrencyIDType CurrencyID;

    TThostFtdcAccountIDType BrokerSecAgentID;

    TThostFtdcBoolType CheckSelfAccount;
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
void MySpi::OnRspQrySecAgentCheckMode() {
    // Mark the event in your session state machine and send the next step if needed.
}
```

**Implementation notes**

- Make callback handlers idempotent because reconnect and replay semantics can surface the same business object more than once.
- Do not block the SPI thread with long business logic; hand the event to a worker queue when processing becomes expensive.

## OnRspQrySecAgentTradeInfo

`OnRspQrySecAgentTradeInfo` is an event callback that reports state back from the CTP runtime into the client application.

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

**Field guide for `CThostFtdcSecAgentTradeInfoField`**

| Field | Type | Purpose |
| --- | --- | --- |
| `BrokerID` | `TThostFtdcBrokerIDType` | Broker code that scopes the request or identifies the response owner. |
| `BrokerSecAgentID` | `TThostFtdcAccountIDType` | Carries the broker sec agent identifier for the current request or response. |
| `InvestorID` | `TThostFtdcInvestorIDType` | Investor code used by the trading account. |
| `LongCustomerName` | `TThostFtdcLongIndividualNameType` | Carries the long customer name for the current request or response. |

**Structure layout**

```cpp
struct CThostFtdcSecAgentTradeInfoField
{

    TThostFtdcBrokerIDType BrokerID;

    TThostFtdcAccountIDType BrokerSecAgentID;

    TThostFtdcInvestorIDType InvestorID;

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
void MySpi::OnRspQrySecAgentTradeInfo() {
    // Mark the event in your session state machine and send the next step if needed.
}
```

**Implementation notes**

- Make callback handlers idempotent because reconnect and replay semantics can surface the same business object more than once.
- Do not block the SPI thread with long business logic; hand the event to a worker queue when processing becomes expensive.

## OnRspQrySecAgentTradingAccount

`OnRspQrySecAgentTradingAccount` is an event callback that reports state back from the CTP runtime into the client application.

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

**Field guide for `CThostFtdcTradingAccountField`**

| Field | Type | Purpose |
| --- | --- | --- |
| `BrokerID` | `TThostFtdcBrokerIDType` | Broker code that scopes the request or identifies the response owner. |
| `AccountID` | `TThostFtdcAccountIDType` | Futures-side account identifier. |
| `PreMortgage` | `TThostFtdcMoneyType` | Carries the pre mortgage for the current request or response. |
| `PreCredit` | `TThostFtdcMoneyType` | Carries the pre credit for the current request or response. |
| `PreDeposit` | `TThostFtdcMoneyType` | Carries the pre deposit for the current request or response. |
| `PreBalance` | `TThostFtdcMoneyType` | Carries the pre balance for the current request or response. |
| `PreMargin` | `TThostFtdcMoneyType` | Carries the pre margin for the current request or response. |
| `InterestBase` | `TThostFtdcMoneyType` | Carries the interest base for the current request or response. |
| `Interest` | `TThostFtdcMoneyType` | Carries the interest for the current request or response. |
| `Deposit` | `TThostFtdcMoneyType` | Carries the deposit for the current request or response. |
| `Withdraw` | `TThostFtdcMoneyType` | Carries the withdraw for the current request or response. |
| `FrozenMargin` | `TThostFtdcMoneyType` | Carries the frozen margin for the current request or response. |
| `FrozenCash` | `TThostFtdcMoneyType` | Carries the frozen cash for the current request or response. |
| `FrozenCommission` | `TThostFtdcMoneyType` | Carries the frozen commission for the current request or response. |
| `CurrMargin` | `TThostFtdcMoneyType` | Carries the curr margin for the current request or response. |
| `CashIn` | `TThostFtdcMoneyType` | Carries the cash in for the current request or response. |
| `Commission` | `TThostFtdcMoneyType` | Carries the commission for the current request or response. |
| `CloseProfit` | `TThostFtdcMoneyType` | Carries the close profit for the current request or response. |
| `PositionProfit` | `TThostFtdcMoneyType` | Carries the position profit for the current request or response. |
| `Balance` | `TThostFtdcMoneyType` | Carries the balance for the current request or response. |
| `Available` | `TThostFtdcMoneyType` | Carries the available for the current request or response. |
| `WithdrawQuota` | `TThostFtdcMoneyType` | Carries the withdraw quota for the current request or response. |
| `Reserve` | `TThostFtdcMoneyType` | Carries the reserve for the current request or response. |
| `TradingDay` | `TThostFtdcDateType` | Trading date visible to the current trading system session. |
| `SettlementID` | `TThostFtdcSettlementIDType` | Carries the settlement identifier for the current request or response. |
| `Credit` | `TThostFtdcMoneyType` | Carries the credit for the current request or response. |
| `Mortgage` | `TThostFtdcMoneyType` | Carries the mortgage for the current request or response. |
| `ExchangeMargin` | `TThostFtdcMoneyType` | Carries the exchange margin for the current request or response. |
| `DeliveryMargin` | `TThostFtdcMoneyType` | Carries the delivery margin for the current request or response. |
| `ExchangeDeliveryMargin` | `TThostFtdcMoneyType` | Carries the exchange delivery margin for the current request or response. |
| `ReserveBalance` | `TThostFtdcMoneyType` | Carries the reserve balance for the current request or response. |
| `CurrencyID` | `TThostFtdcCurrencyIDType` | Currency code used for balance and transfer values. |
| `PreFundMortgageIn` | `TThostFtdcMoneyType` | Carries the pre fund mortgage in for the current request or response. |
| `PreFundMortgageOut` | `TThostFtdcMoneyType` | Carries the pre fund mortgage out for the current request or response. |
| `FundMortgageIn` | `TThostFtdcMoneyType` | Carries the fund mortgage in for the current request or response. |
| `FundMortgageOut` | `TThostFtdcMoneyType` | Carries the fund mortgage out for the current request or response. |
| `FundMortgageAvailable` | `TThostFtdcMoneyType` | Carries the fund mortgage available for the current request or response. |
| `MortgageableFund` | `TThostFtdcMoneyType` | Carries the mortgageable fund for the current request or response. |
| `SpecProductMargin` | `TThostFtdcMoneyType` | Carries the spec product margin for the current request or response. |
| `SpecProductFrozenMargin` | `TThostFtdcMoneyType` | Carries the spec product frozen margin for the current request or response. |
| `SpecProductCommission` | `TThostFtdcMoneyType` | Carries the spec product commission for the current request or response. |
| `SpecProductFrozenCommission` | `TThostFtdcMoneyType` | Carries the spec product frozen commission for the current request or response. |
| `SpecProductPositionProfit` | `TThostFtdcMoneyType` | Carries the spec product position profit for the current request or response. |
| `SpecProductCloseProfit` | `TThostFtdcMoneyType` | Carries the spec product close profit for the current request or response. |
| `SpecProductPositionProfitByAlg` | `TThostFtdcMoneyType` | Carries the spec product position profit by alg for the current request or response. |
| `SpecProductExchangeMargin` | `TThostFtdcMoneyType` | Carries the spec product exchange margin for the current request or response. |
| `BizType` | `TThostFtdcBizTypeType` | Carries the biz type for the current request or response. |
| `FrozenSwap` | `TThostFtdcMoneyType` | Carries the frozen swap for the current request or response. |
| `RemainSwap` | `TThostFtdcMoneyType` | Carries the remain swap for the current request or response. |
| `OptionValue` | `TThostFtdcMoneyType` | Carries the option value for the current request or response. |

**Structure layout**

```cpp
struct CThostFtdcTradingAccountField
{

    TThostFtdcBrokerIDType BrokerID;

    TThostFtdcAccountIDType AccountID;

    TThostFtdcMoneyType PreMortgage;

    TThostFtdcMoneyType PreCredit;

    TThostFtdcMoneyType PreDeposit;

    TThostFtdcMoneyType PreBalance;

    TThostFtdcMoneyType PreMargin;

    TThostFtdcMoneyType InterestBase;

    TThostFtdcMoneyType Interest;

    TThostFtdcMoneyType Deposit;

    TThostFtdcMoneyType Withdraw;

    TThostFtdcMoneyType FrozenMargin;

    TThostFtdcMoneyType FrozenCash;

    TThostFtdcMoneyType FrozenCommission;

    TThostFtdcMoneyType CurrMargin;

    TThostFtdcMoneyType CashIn;

    TThostFtdcMoneyType Commission;

    TThostFtdcMoneyType CloseProfit;

    TThostFtdcMoneyType PositionProfit;

    TThostFtdcMoneyType Balance;

    TThostFtdcMoneyType Available;

    TThostFtdcMoneyType WithdrawQuota;

    TThostFtdcMoneyType Reserve;

    TThostFtdcDateType TradingDay;

    TThostFtdcSettlementIDType SettlementID;

    TThostFtdcMoneyType Credit;

    TThostFtdcMoneyType Mortgage;

    TThostFtdcMoneyType ExchangeMargin;

    TThostFtdcMoneyType DeliveryMargin;

    TThostFtdcMoneyType ExchangeDeliveryMargin;

    TThostFtdcMoneyType ReserveBalance;

    TThostFtdcCurrencyIDType CurrencyID;

    TThostFtdcMoneyType PreFundMortgageIn;

    TThostFtdcMoneyType PreFundMortgageOut;

    TThostFtdcMoneyType FundMortgageIn;

    TThostFtdcMoneyType FundMortgageOut;

    TThostFtdcMoneyType FundMortgageAvailable;

    TThostFtdcMoneyType MortgageableFund;

    TThostFtdcMoneyType SpecProductMargin;

    TThostFtdcMoneyType SpecProductFrozenMargin;

    TThostFtdcMoneyType SpecProductCommission;

    TThostFtdcMoneyType SpecProductFrozenCommission;

    TThostFtdcMoneyType SpecProductPositionProfit;

    TThostFtdcMoneyType SpecProductCloseProfit;

    TThostFtdcMoneyType SpecProductPositionProfitByAlg;

    TThostFtdcMoneyType SpecProductExchangeMargin;

    TThostFtdcBizTypeType BizType;

    TThostFtdcMoneyType FrozenSwap;

    TThostFtdcMoneyType RemainSwap;

    TThostFtdcMoneyType OptionValue;
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
void MySpi::OnRspQrySecAgentTradingAccount() {
    // Mark the event in your session state machine and send the next step if needed.
}
```

**Implementation notes**

- Make callback handlers idempotent because reconnect and replay semantics can surface the same business object more than once.
- Do not block the SPI thread with long business logic; hand the event to a worker queue when processing becomes expensive.

## OnRspQrySettlementInfo

`OnRspQrySettlementInfo` is an event callback that reports state back from the CTP runtime into the client application.

- Kind: callback
- Owning interface: `CThostFtdcTraderSpi`
- Related symbols: `ReqQrySettlementInfo`

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

**Field guide for `CThostFtdcSettlementInfoField`**

| Field | Type | Purpose |
| --- | --- | --- |
| `TradingDay` | `TThostFtdcDateType` | Trading date visible to the current trading system session. |
| `SettlementID` | `TThostFtdcSettlementIDType` | Carries the settlement identifier for the current request or response. |
| `BrokerID` | `TThostFtdcBrokerIDType` | Broker code that scopes the request or identifies the response owner. |
| `InvestorID` | `TThostFtdcInvestorIDType` | Investor code used by the trading account. |
| `SequenceNo` | `TThostFtdcSequenceNoType` | Carries the sequence no for the current request or response. |
| `Content` | `TThostFtdcContentType` | Carries the content for the current request or response. |
| `AccountID` | `TThostFtdcAccountIDType` | Futures-side account identifier. |
| `CurrencyID` | `TThostFtdcCurrencyIDType` | Currency code used for balance and transfer values. |

**Structure layout**

```cpp
struct CThostFtdcSettlementInfoField
{

    TThostFtdcDateType TradingDay;

    TThostFtdcSettlementIDType SettlementID;

    TThostFtdcBrokerIDType BrokerID;

    TThostFtdcInvestorIDType InvestorID;

    TThostFtdcSequenceNoType SequenceNo;

    TThostFtdcContentType Content;

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
void MySpi::OnRspQrySettlementInfo() {
    // Mark the event in your session state machine and send the next step if needed.
}
```

**Implementation notes**

- Make callback handlers idempotent because reconnect and replay semantics can surface the same business object more than once.
- Do not block the SPI thread with long business logic; hand the event to a worker queue when processing becomes expensive.

## OnRspQrySettlementInfoConfirm

`OnRspQrySettlementInfoConfirm` is an event callback that reports state back from the CTP runtime into the client application.

- Kind: callback
- Owning interface: `CThostFtdcTraderSpi`
- Related symbols: `ReqQrySettlementInfoConfirm`

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
void MySpi::OnRspQrySettlementInfoConfirm() {
    // Mark the event in your session state machine and send the next step if needed.
}
```

**Implementation notes**

- Make callback handlers idempotent because reconnect and replay semantics can surface the same business object more than once.
- Do not block the SPI thread with long business logic; hand the event to a worker queue when processing becomes expensive.

## OnRspQryTradingAccount

`OnRspQryTradingAccount` is an event callback that reports state back from the CTP runtime into the client application.

- Kind: callback
- Owning interface: `CThostFtdcTraderSpi`
- Related symbols: `ReqQryTradingAccount`

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

**Field guide for `CThostFtdcTradingAccountField`**

| Field | Type | Purpose |
| --- | --- | --- |
| `BrokerID` | `TThostFtdcBrokerIDType` | Broker code that scopes the request or identifies the response owner. |
| `AccountID` | `TThostFtdcAccountIDType` | Futures-side account identifier. |
| `PreMortgage` | `TThostFtdcMoneyType` | Carries the pre mortgage for the current request or response. |
| `PreCredit` | `TThostFtdcMoneyType` | Carries the pre credit for the current request or response. |
| `PreDeposit` | `TThostFtdcMoneyType` | Carries the pre deposit for the current request or response. |
| `PreBalance` | `TThostFtdcMoneyType` | Carries the pre balance for the current request or response. |
| `PreMargin` | `TThostFtdcMoneyType` | Carries the pre margin for the current request or response. |
| `InterestBase` | `TThostFtdcMoneyType` | Carries the interest base for the current request or response. |
| `Interest` | `TThostFtdcMoneyType` | Carries the interest for the current request or response. |
| `Deposit` | `TThostFtdcMoneyType` | Carries the deposit for the current request or response. |
| `Withdraw` | `TThostFtdcMoneyType` | Carries the withdraw for the current request or response. |
| `FrozenMargin` | `TThostFtdcMoneyType` | Carries the frozen margin for the current request or response. |
| `FrozenCash` | `TThostFtdcMoneyType` | Carries the frozen cash for the current request or response. |
| `FrozenCommission` | `TThostFtdcMoneyType` | Carries the frozen commission for the current request or response. |
| `CurrMargin` | `TThostFtdcMoneyType` | Carries the curr margin for the current request or response. |
| `CashIn` | `TThostFtdcMoneyType` | Carries the cash in for the current request or response. |
| `Commission` | `TThostFtdcMoneyType` | Carries the commission for the current request or response. |
| `CloseProfit` | `TThostFtdcMoneyType` | Carries the close profit for the current request or response. |
| `PositionProfit` | `TThostFtdcMoneyType` | Carries the position profit for the current request or response. |
| `Balance` | `TThostFtdcMoneyType` | Carries the balance for the current request or response. |
| `Available` | `TThostFtdcMoneyType` | Carries the available for the current request or response. |
| `WithdrawQuota` | `TThostFtdcMoneyType` | Carries the withdraw quota for the current request or response. |
| `Reserve` | `TThostFtdcMoneyType` | Carries the reserve for the current request or response. |
| `TradingDay` | `TThostFtdcDateType` | Trading date visible to the current trading system session. |
| `SettlementID` | `TThostFtdcSettlementIDType` | Carries the settlement identifier for the current request or response. |
| `Credit` | `TThostFtdcMoneyType` | Carries the credit for the current request or response. |
| `Mortgage` | `TThostFtdcMoneyType` | Carries the mortgage for the current request or response. |
| `ExchangeMargin` | `TThostFtdcMoneyType` | Carries the exchange margin for the current request or response. |
| `DeliveryMargin` | `TThostFtdcMoneyType` | Carries the delivery margin for the current request or response. |
| `ExchangeDeliveryMargin` | `TThostFtdcMoneyType` | Carries the exchange delivery margin for the current request or response. |
| `ReserveBalance` | `TThostFtdcMoneyType` | Carries the reserve balance for the current request or response. |
| `CurrencyID` | `TThostFtdcCurrencyIDType` | Currency code used for balance and transfer values. |
| `PreFundMortgageIn` | `TThostFtdcMoneyType` | Carries the pre fund mortgage in for the current request or response. |
| `PreFundMortgageOut` | `TThostFtdcMoneyType` | Carries the pre fund mortgage out for the current request or response. |
| `FundMortgageIn` | `TThostFtdcMoneyType` | Carries the fund mortgage in for the current request or response. |
| `FundMortgageOut` | `TThostFtdcMoneyType` | Carries the fund mortgage out for the current request or response. |
| `FundMortgageAvailable` | `TThostFtdcMoneyType` | Carries the fund mortgage available for the current request or response. |
| `MortgageableFund` | `TThostFtdcMoneyType` | Carries the mortgageable fund for the current request or response. |
| `SpecProductMargin` | `TThostFtdcMoneyType` | Carries the spec product margin for the current request or response. |
| `SpecProductFrozenMargin` | `TThostFtdcMoneyType` | Carries the spec product frozen margin for the current request or response. |
| `SpecProductCommission` | `TThostFtdcMoneyType` | Carries the spec product commission for the current request or response. |
| `SpecProductFrozenCommission` | `TThostFtdcMoneyType` | Carries the spec product frozen commission for the current request or response. |
| `SpecProductPositionProfit` | `TThostFtdcMoneyType` | Carries the spec product position profit for the current request or response. |
| `SpecProductCloseProfit` | `TThostFtdcMoneyType` | Carries the spec product close profit for the current request or response. |
| `SpecProductPositionProfitByAlg` | `TThostFtdcMoneyType` | Carries the spec product position profit by alg for the current request or response. |
| `SpecProductExchangeMargin` | `TThostFtdcMoneyType` | Carries the spec product exchange margin for the current request or response. |
| `BizType` | `TThostFtdcBizTypeType` | Carries the biz type for the current request or response. |
| `FrozenSwap` | `TThostFtdcMoneyType` | Carries the frozen swap for the current request or response. |
| `RemainSwap` | `TThostFtdcMoneyType` | Carries the remain swap for the current request or response. |
| `OptionValue` | `TThostFtdcMoneyType` | Carries the option value for the current request or response. |

**Structure layout**

```cpp
struct CThostFtdcTradingAccountField
{

    TThostFtdcBrokerIDType BrokerID;

    TThostFtdcAccountIDType AccountID;

    TThostFtdcMoneyType PreMortgage;

    TThostFtdcMoneyType PreCredit;

    TThostFtdcMoneyType PreDeposit;

    TThostFtdcMoneyType PreBalance;

    TThostFtdcMoneyType PreMargin;

    TThostFtdcMoneyType InterestBase;

    TThostFtdcMoneyType Interest;

    TThostFtdcMoneyType Deposit;

    TThostFtdcMoneyType Withdraw;

    TThostFtdcMoneyType FrozenMargin;

    TThostFtdcMoneyType FrozenCash;

    TThostFtdcMoneyType FrozenCommission;

    TThostFtdcMoneyType CurrMargin;

    TThostFtdcMoneyType CashIn;

    TThostFtdcMoneyType Commission;

    TThostFtdcMoneyType CloseProfit;

    TThostFtdcMoneyType PositionProfit;

    TThostFtdcMoneyType Balance;

    TThostFtdcMoneyType Available;

    TThostFtdcMoneyType WithdrawQuota;

    TThostFtdcMoneyType Reserve;

    TThostFtdcDateType TradingDay;

    TThostFtdcSettlementIDType SettlementID;

    TThostFtdcMoneyType Credit;

    TThostFtdcMoneyType Mortgage;

    TThostFtdcMoneyType ExchangeMargin;

    TThostFtdcMoneyType DeliveryMargin;

    TThostFtdcMoneyType ExchangeDeliveryMargin;

    TThostFtdcMoneyType ReserveBalance;

    TThostFtdcCurrencyIDType CurrencyID;

    TThostFtdcMoneyType PreFundMortgageIn;

    TThostFtdcMoneyType PreFundMortgageOut;

    TThostFtdcMoneyType FundMortgageIn;

    TThostFtdcMoneyType FundMortgageOut;

    TThostFtdcMoneyType FundMortgageAvailable;

    TThostFtdcMoneyType MortgageableFund;

    TThostFtdcMoneyType SpecProductMargin;

    TThostFtdcMoneyType SpecProductFrozenMargin;

    TThostFtdcMoneyType SpecProductCommission;

    TThostFtdcMoneyType SpecProductFrozenCommission;

    TThostFtdcMoneyType SpecProductPositionProfit;

    TThostFtdcMoneyType SpecProductCloseProfit;

    TThostFtdcMoneyType SpecProductPositionProfitByAlg;

    TThostFtdcMoneyType SpecProductExchangeMargin;

    TThostFtdcBizTypeType BizType;

    TThostFtdcMoneyType FrozenSwap;

    TThostFtdcMoneyType RemainSwap;

    TThostFtdcMoneyType OptionValue;
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
void MySpi::OnRspQryTradingAccount() {
    // Mark the event in your session state machine and send the next step if needed.
}
```

**Implementation notes**

- Make callback handlers idempotent because reconnect and replay semantics can surface the same business object more than once.
- Do not block the SPI thread with long business logic; hand the event to a worker queue when processing becomes expensive.

## OnRspQryTradingCode

`OnRspQryTradingCode` is an event callback that reports state back from the CTP runtime into the client application.

- Kind: callback
- Owning interface: `CThostFtdcTraderSpi`
- Related symbols: `ReqQryTradingCode`

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

**Field guide for `CThostFtdcTradingCodeField`**

| Field | Type | Purpose |
| --- | --- | --- |
| `InvestorID` | `TThostFtdcInvestorIDType` | Investor code used by the trading account. |
| `BrokerID` | `TThostFtdcBrokerIDType` | Broker code that scopes the request or identifies the response owner. |
| `ExchangeID` | `TThostFtdcExchangeIDType` | Exchange code that disambiguates the target venue. |
| `ClientID` | `TThostFtdcClientIDType` | Client identifier supplied by the brokerage environment. |
| `IsActive` | `TThostFtdcBoolType` | Carries the is active for the current request or response. |
| `ClientIDType` | `TThostFtdcClientIDTypeType` | Carries the client identifier type for the current request or response. |
| `BranchID` | `TThostFtdcBranchIDType` | Carries the branch identifier for the current request or response. |
| `BizType` | `TThostFtdcBizTypeType` | Carries the biz type for the current request or response. |
| `InvestUnitID` | `TThostFtdcInvestUnitIDType` | Investment unit identifier used by the account model. |

**Structure layout**

```cpp
struct CThostFtdcTradingCodeField
{

    TThostFtdcInvestorIDType InvestorID;

    TThostFtdcBrokerIDType BrokerID;

    TThostFtdcExchangeIDType ExchangeID;

    TThostFtdcClientIDType ClientID;

    TThostFtdcBoolType IsActive;

    TThostFtdcClientIDTypeType ClientIDType;

    TThostFtdcBranchIDType BranchID;

    TThostFtdcBizTypeType BizType;

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
void MySpi::OnRspQryTradingCode() {
    // Mark the event in your session state machine and send the next step if needed.
}
```

**Implementation notes**

- Make callback handlers idempotent because reconnect and replay semantics can surface the same business object more than once.
- Do not block the SPI thread with long business logic; hand the event to a worker queue when processing becomes expensive.

## OnRspQryTradingNotice

`OnRspQryTradingNotice` is an event callback that reports state back from the CTP runtime into the client application.

- Kind: callback
- Owning interface: `CThostFtdcTraderSpi`
- Related symbols: `ReqQryTradingNotice`

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

**Field guide for `CThostFtdcTradingNoticeField`**

| Field | Type | Purpose |
| --- | --- | --- |
| `BrokerID` | `TThostFtdcBrokerIDType` | Broker code that scopes the request or identifies the response owner. |
| `InvestorRange` | `TThostFtdcInvestorRangeType` | Carries the investor range for the current request or response. |
| `InvestorID` | `TThostFtdcInvestorIDType` | Investor code used by the trading account. |
| `SequenceSeries` | `TThostFtdcSequenceSeriesType` | Carries the sequence series for the current request or response. |
| `UserID` | `TThostFtdcUserIDType` | User code associated with the current login identity. |
| `SendTime` | `TThostFtdcTimeType` | Carries the send time for the current request or response. |
| `SequenceNo` | `TThostFtdcSequenceNoType` | Carries the sequence no for the current request or response. |
| `FieldContent` | `TThostFtdcContentType` | Carries the field content for the current request or response. |
| `InvestUnitID` | `TThostFtdcInvestUnitIDType` | Investment unit identifier used by the account model. |

**Structure layout**

```cpp
struct CThostFtdcTradingNoticeField
{

    TThostFtdcBrokerIDType BrokerID;

    TThostFtdcInvestorRangeType InvestorRange;

    TThostFtdcInvestorIDType InvestorID;

    TThostFtdcSequenceSeriesType SequenceSeries;

    TThostFtdcUserIDType UserID;

    TThostFtdcTimeType SendTime;

    TThostFtdcSequenceNoType SequenceNo;

    TThostFtdcContentType FieldContent;

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
void MySpi::OnRspQryTradingNotice() {
    // Mark the event in your session state machine and send the next step if needed.
}
```

**Implementation notes**

- Make callback handlers idempotent because reconnect and replay semantics can surface the same business object more than once.
- Do not block the SPI thread with long business logic; hand the event to a worker queue when processing becomes expensive.

## OnRspQryRiskSettleInvstPosition

`OnRspQryRiskSettleInvstPosition` is an event callback that reports state back from the CTP runtime into the client application.

- Kind: callback
- Owning interface: `CThostFtdcTraderSpi`
- Related symbols: `ReqQryRiskSettleInvstPosition`

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

**Field guide for `CThostFtdcRiskSettleInvstPositionField`**

| Field | Type | Purpose |
| --- | --- | --- |
| `InstrumentID` | `TThostFtdcInstrumentIDType` | Instrument symbol for the target contract. |
| `BrokerID` | `TThostFtdcBrokerIDType` | Broker code that scopes the request or identifies the response owner. |
| `InvestorID` | `TThostFtdcInvestorIDType` | Investor code used by the trading account. |
| `PosiDirection` | `TThostFtdcPosiDirectionType` | Carries the posi direction for the current request or response. |
| `HedgeFlag` | `TThostFtdcHedgeFlagType` | Carries the hedge flag for the current request or response. |
| `PositionDate` | `TThostFtdcPositionDateType` | Carries the position date for the current request or response. |
| `YdPosition` | `TThostFtdcVolumeType` | Carries the yd position for the current request or response. |
| `Position` | `TThostFtdcVolumeType` | Carries the position for the current request or response. |
| `LongFrozen` | `TThostFtdcVolumeType` | Carries the long frozen for the current request or response. |
| `ShortFrozen` | `TThostFtdcVolumeType` | Carries the short frozen for the current request or response. |
| `LongFrozenAmount` | `TThostFtdcMoneyType` | Carries the long frozen amount for the current request or response. |
| `ShortFrozenAmount` | `TThostFtdcMoneyType` | Carries the short frozen amount for the current request or response. |
| `OpenVolume` | `TThostFtdcVolumeType` | Carries the open volume for the current request or response. |
| `CloseVolume` | `TThostFtdcVolumeType` | Carries the close volume for the current request or response. |
| `OpenAmount` | `TThostFtdcMoneyType` | Carries the open amount for the current request or response. |
| `CloseAmount` | `TThostFtdcMoneyType` | Carries the close amount for the current request or response. |
| `PositionCost` | `TThostFtdcMoneyType` | Carries the position cost for the current request or response. |
| `PreMargin` | `TThostFtdcMoneyType` | Carries the pre margin for the current request or response. |
| `UseMargin` | `TThostFtdcMoneyType` | Carries the use margin for the current request or response. |
| `FrozenMargin` | `TThostFtdcMoneyType` | Carries the frozen margin for the current request or response. |
| `FrozenCash` | `TThostFtdcMoneyType` | Carries the frozen cash for the current request or response. |
| `FrozenCommission` | `TThostFtdcMoneyType` | Carries the frozen commission for the current request or response. |
| `CashIn` | `TThostFtdcMoneyType` | Carries the cash in for the current request or response. |
| `Commission` | `TThostFtdcMoneyType` | Carries the commission for the current request or response. |
| `CloseProfit` | `TThostFtdcMoneyType` | Carries the close profit for the current request or response. |
| `PositionProfit` | `TThostFtdcMoneyType` | Carries the position profit for the current request or response. |
| `PreSettlementPrice` | `TThostFtdcPriceType` | Carries the pre settlement price for the current request or response. |
| `SettlementPrice` | `TThostFtdcPriceType` | Carries the settlement price for the current request or response. |
| `TradingDay` | `TThostFtdcDateType` | Trading date visible to the current trading system session. |
| `SettlementID` | `TThostFtdcSettlementIDType` | Carries the settlement identifier for the current request or response. |
| `OpenCost` | `TThostFtdcMoneyType` | Carries the open cost for the current request or response. |
| `ExchangeMargin` | `TThostFtdcMoneyType` | Carries the exchange margin for the current request or response. |
| `CombPosition` | `TThostFtdcVolumeType` | Carries the comb position for the current request or response. |
| `CombLongFrozen` | `TThostFtdcVolumeType` | Carries the comb long frozen for the current request or response. |
| `CombShortFrozen` | `TThostFtdcVolumeType` | Carries the comb short frozen for the current request or response. |
| `CloseProfitByDate` | `TThostFtdcMoneyType` | Carries the close profit by date for the current request or response. |
| `CloseProfitByTrade` | `TThostFtdcMoneyType` | Carries the close profit by trade for the current request or response. |
| `TodayPosition` | `TThostFtdcVolumeType` | Carries the today position for the current request or response. |
| `MarginRateByMoney` | `TThostFtdcRatioType` | Carries the margin rate by money for the current request or response. |
| `MarginRateByVolume` | `TThostFtdcRatioType` | Carries the margin rate by volume for the current request or response. |
| `StrikeFrozen` | `TThostFtdcVolumeType` | Carries the strike frozen for the current request or response. |
| `StrikeFrozenAmount` | `TThostFtdcMoneyType` | Carries the strike frozen amount for the current request or response. |
| `AbandonFrozen` | `TThostFtdcVolumeType` | Carries the abandon frozen for the current request or response. |
| `ExchangeID` | `TThostFtdcExchangeIDType` | Exchange code that disambiguates the target venue. |
| `YdStrikeFrozen` | `TThostFtdcVolumeType` | Carries the yd strike frozen for the current request or response. |
| `InvestUnitID` | `TThostFtdcInvestUnitIDType` | Investment unit identifier used by the account model. |
| `PositionCostOffset` | `TThostFtdcMoneyType` | Carries the position cost offset for the current request or response. |
| `TasPosition` | `TThostFtdcVolumeType` | Carries the tas position for the current request or response. |
| `TasPositionCost` | `TThostFtdcMoneyType` | Carries the tas position cost for the current request or response. |

**Structure layout**

```cpp
struct CThostFtdcRiskSettleInvstPositionField
{

    TThostFtdcInstrumentIDType  InstrumentID;

    TThostFtdcBrokerIDType  BrokerID;

    TThostFtdcInvestorIDType    InvestorID;

    TThostFtdcPosiDirectionType PosiDirection;

    TThostFtdcHedgeFlagType HedgeFlag;

    TThostFtdcPositionDateType  PositionDate;

    TThostFtdcVolumeType    YdPosition;

    TThostFtdcVolumeType    Position;

    TThostFtdcVolumeType    LongFrozen;

    TThostFtdcVolumeType    ShortFrozen;

    TThostFtdcMoneyType LongFrozenAmount;

    TThostFtdcMoneyType ShortFrozenAmount;

    TThostFtdcVolumeType    OpenVolume;

    TThostFtdcVolumeType    CloseVolume;

    TThostFtdcMoneyType OpenAmount;

    TThostFtdcMoneyType CloseAmount;

    TThostFtdcMoneyType PositionCost;

    TThostFtdcMoneyType PreMargin;

    TThostFtdcMoneyType UseMargin;

    TThostFtdcMoneyType FrozenMargin;

    TThostFtdcMoneyType FrozenCash;

    TThostFtdcMoneyType FrozenCommission;

    TThostFtdcMoneyType CashIn;

    TThostFtdcMoneyType Commission;

    TThostFtdcMoneyType CloseProfit;

    TThostFtdcMoneyType PositionProfit;

    TThostFtdcPriceType PreSettlementPrice;

    TThostFtdcPriceType SettlementPrice;

    TThostFtdcDateType  TradingDay;

    TThostFtdcSettlementIDType  SettlementID;

    TThostFtdcMoneyType OpenCost;

    TThostFtdcMoneyType ExchangeMargin;

    TThostFtdcVolumeType    CombPosition;

    TThostFtdcVolumeType    CombLongFrozen;

    TThostFtdcVolumeType    CombShortFrozen;

    TThostFtdcMoneyType CloseProfitByDate;

    TThostFtdcMoneyType CloseProfitByTrade;

    TThostFtdcVolumeType    TodayPosition;

    TThostFtdcRatioType MarginRateByMoney;

    TThostFtdcRatioType MarginRateByVolume;

    TThostFtdcVolumeType    StrikeFrozen;

    TThostFtdcMoneyType StrikeFrozenAmount;

    TThostFtdcVolumeType    AbandonFrozen;

    TThostFtdcExchangeIDType    ExchangeID;

    TThostFtdcVolumeType    YdStrikeFrozen;

    TThostFtdcInvestUnitIDType  InvestUnitID;

    TThostFtdcMoneyType PositionCostOffset;

    TThostFtdcVolumeType    TasPosition;

    TThostFtdcMoneyType TasPositionCost;
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
void MySpi::OnRspQryRiskSettleInvstPosition() {
    // Mark the event in your session state machine and send the next step if needed.
}
```

**Implementation notes**

- Make callback handlers idempotent because reconnect and replay semantics can surface the same business object more than once.
- Do not block the SPI thread with long business logic; hand the event to a worker queue when processing becomes expensive.

## OnRspQryRiskSettleProductStatus

`OnRspQryRiskSettleProductStatus` is an event callback that reports state back from the CTP runtime into the client application.

- Kind: callback
- Owning interface: `CThostFtdcTraderSpi`
- Related symbols: `ReqQryRiskSettleProductStatus`

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

**Field guide for `CThostFtdcRiskSettleProductStatusField`**

| Field | Type | Purpose |
| --- | --- | --- |
| `ExchangeID` | `TThostFtdcExchangeIDType` | Exchange code that disambiguates the target venue. |
| `ProductID` | `TThostFtdcInstrumentIDType` | Carries the product identifier for the current request or response. |
| `ProductStatus` | `TThostFtdcProductStatusType` | Carries the product status for the current request or response. |

**Structure layout**

```cpp
struct CThostFtdcRiskSettleProductStatusField
{

    TThostFtdcExchangeIDType    ExchangeID;

    TThostFtdcInstrumentIDType  ProductID;

    TThostFtdcProductStatusType ProductStatus;
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
void MySpi::OnRspQryRiskSettleProductStatus() {
    // Mark the event in your session state machine and send the next step if needed.
}
```

**Implementation notes**

- Make callback handlers idempotent because reconnect and replay semantics can surface the same business object more than once.
- Do not block the SPI thread with long business logic; hand the event to a worker queue when processing becomes expensive.

## OnRspQryUserSession

`OnRspQryUserSession` is an event callback that reports state back from the CTP runtime into the client application.

- Kind: callback
- Owning interface: `CThostFtdcTraderSpi`
- Related symbols: `ReqQryUserSession`

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

**Field guide for `CThostFtdcUserSessionField`**

| Field | Type | Purpose |
| --- | --- | --- |
| `FrontID` | `TThostFtdcFrontIDType` | Front identifier assigned by the server for the current login session. |
| `SessionID` | `TThostFtdcSessionIDType` | Session identifier assigned by the server for the current login session. |
| `BrokerID` | `TThostFtdcBrokerIDType` | Broker code that scopes the request or identifies the response owner. |
| `UserID` | `TThostFtdcUserIDType` | User code associated with the current login identity. |
| `LoginDate` | `TThostFtdcDateType` | Carries the login date for the current request or response. |
| `LoginTime` | `TThostFtdcTimeType` | Server-side login timestamp. |
| `reserve1` | `TThostFtdcOldIPAddressType` | Carries the reserve1 for the current request or response. |
| `UserProductInfo` | `TThostFtdcProductInfoType` | Client product string used during authentication or login. |
| `InterfaceProductInfo` | `TThostFtdcProductInfoType` | Carries the interface product information for the current request or response. |
| `ProtocolInfo` | `TThostFtdcProtocolInfoType` | Carries the protocol information for the current request or response. |
| `MacAddress` | `TThostFtdcMacAddressType` | Client MAC address reported to the server. |
| `LoginRemark` | `TThostFtdcLoginRemarkType` | Carries the login remark for the current request or response. |
| `IPAddress` | `TThostFtdcIPAddressType` | Client IP address reported to the server. |

**Structure layout**

```cpp
struct CThostFtdcUserSessionField
{

    TThostFtdcFrontIDType   FrontID;

    TThostFtdcSessionIDType SessionID;

    TThostFtdcBrokerIDType  BrokerID;

    TThostFtdcUserIDType    UserID;

    TThostFtdcDateType  LoginDate;

    TThostFtdcTimeType  LoginTime;

    TThostFtdcOldIPAddressType  reserve1;

    TThostFtdcProductInfoType   UserProductInfo;

    TThostFtdcProductInfoType   InterfaceProductInfo;

    TThostFtdcProtocolInfoType  ProtocolInfo;

    TThostFtdcMacAddressType    MacAddress;

    TThostFtdcLoginRemarkType   LoginRemark;

    TThostFtdcIPAddressType IPAddress;
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
void MySpi::OnRspQryUserSession() {
    // Mark the event in your session state machine and send the next step if needed.
}
```

**Implementation notes**

- Make callback handlers idempotent because reconnect and replay semantics can surface the same business object more than once.
- Do not block the SPI thread with long business logic; hand the event to a worker queue when processing becomes expensive.
