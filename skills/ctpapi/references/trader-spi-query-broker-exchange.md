# CTP trader SPI broker and exchange query callbacks

This reference covers query-response callbacks for broker-side, exchange-side, and product-level metadata.

| Entry | Kind |
| --- | --- |
| OnRspQryBrokerTradingAlgos | callback |
| OnRspQryBrokerTradingParams | callback |
| OnRspQryExchange | callback |
| OnRspQryExchangeMarginRate | callback |
| OnRspQryExchangeMarginRateAdjust | callback |
| OnRspQryExchangeRate | callback |
| OnRspQryProduct | callback |
| OnRspQryProductExchRate | callback |
| OnRspQryProductGroup | callback |
| OnRspQryClassifiedInstrument | callback |
| OnRspQryCombPromotionParam | callback |
| OnRspQryTraderOffer | callback |

## OnRspQryBrokerTradingAlgos

`OnRspQryBrokerTradingAlgos` is an event callback that reports state back from the CTP runtime into the client application.

- Kind: callback
- Owning interface: `CThostFtdcTraderSpi`
- Related symbols: `ReqQryBrokerTradingAlgos`

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

**Field guide for `CThostFtdcBrokerTradingAlgosField`**

| Field | Type | Purpose |
| --- | --- | --- |
| `BrokerID` | `TThostFtdcBrokerIDType` | Broker code that scopes the request or identifies the response owner. |
| `ExchangeID` | `TThostFtdcExchangeIDType` | Exchange code that disambiguates the target venue. |
| `reserve1` | `TThostFtdcOldInstrumentIDType` | Carries the reserve1 for the current request or response. |
| `HandlePositionAlgoID` | `TThostFtdcHandlePositionAlgoIDType` | Carries the handle position algo identifier for the current request or response. |
| `FindMarginRateAlgoID` | `TThostFtdcFindMarginRateAlgoIDType` | Carries the find margin rate algo identifier for the current request or response. |
| `InstrumentID` | `TThostFtdcInstrumentIDType` | Instrument symbol for the target contract. |

**Structure layout**

```cpp
struct CThostFtdcBrokerTradingAlgosField
{

    TThostFtdcBrokerIDType  BrokerID;

    TThostFtdcExchangeIDType    ExchangeID;

    TThostFtdcOldInstrumentIDType   reserve1;

    TThostFtdcHandlePositionAlgoIDType  HandlePositionAlgoID;

    TThostFtdcFindMarginRateAlgoIDType  FindMarginRateAlgoID;

    TThostFtdcHandleTradingAccountAlgoIDType
HandleTradingAccountAlgoID;

    TThostFtdcInstrumentIDType  InstrumentID;
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
void MySpi::OnRspQryBrokerTradingAlgos() {
    // Mark the event in your session state machine and send the next step if needed.
}
```

**Implementation notes**

- Make callback handlers idempotent because reconnect and replay semantics can surface the same business object more than once.
- Do not block the SPI thread with long business logic; hand the event to a worker queue when processing becomes expensive.

## OnRspQryBrokerTradingParams

`OnRspQryBrokerTradingParams` is an event callback that reports state back from the CTP runtime into the client application.

- Kind: callback
- Owning interface: `CThostFtdcTraderSpi`
- Related symbols: `ReqQryBrokerTradingParams`

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

**Field guide for `CThostFtdcBrokerTradingParamsField`**

| Field | Type | Purpose |
| --- | --- | --- |
| `BrokerID` | `TThostFtdcBrokerIDType` | Broker code that scopes the request or identifies the response owner. |
| `InvestorID` | `TThostFtdcInvestorIDType` | Investor code used by the trading account. |
| `MarginPriceType` | `TThostFtdcMarginPriceTypeType` | Carries the margin price type for the current request or response. |
| `Algorithm` | `TThostFtdcAlgorithmType` | Carries the algorithm for the current request or response. |
| `AvailIncludeCloseProfit` | `TThostFtdcIncludeCloseProfitType` | Carries the avail include close profit for the current request or response. |
| `CurrencyID` | `TThostFtdcCurrencyIDType` | Currency code used for balance and transfer values. |
| `OptionRoyaltyPriceType` | `TThostFtdcOptionRoyaltyPriceTypeType` | Carries the option royalty price type for the current request or response. |
| `AccountID` | `TThostFtdcAccountIDType` | Futures-side account identifier. |

**Structure layout**

```cpp
struct CThostFtdcBrokerTradingParamsField
{

    TThostFtdcBrokerIDType BrokerID;

    TThostFtdcInvestorIDType InvestorID;

    TThostFtdcMarginPriceTypeType MarginPriceType;

    TThostFtdcAlgorithmType Algorithm;

    TThostFtdcIncludeCloseProfitType AvailIncludeCloseProfit;

    TThostFtdcCurrencyIDType CurrencyID;

    TThostFtdcOptionRoyaltyPriceTypeType OptionRoyaltyPriceType;

    TThostFtdcAccountIDType AccountID;
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
void MySpi::OnRspQryBrokerTradingParams() {
    // Mark the event in your session state machine and send the next step if needed.
}
```

**Implementation notes**

- Make callback handlers idempotent because reconnect and replay semantics can surface the same business object more than once.
- Do not block the SPI thread with long business logic; hand the event to a worker queue when processing becomes expensive.

## OnRspQryExchange

`OnRspQryExchange` is an event callback that reports state back from the CTP runtime into the client application.

- Kind: callback
- Owning interface: `CThostFtdcTraderSpi`
- Related symbols: `ReqQryExchange`

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

**Field guide for `CThostFtdcExchangeField`**

| Field | Type | Purpose |
| --- | --- | --- |
| `ExchangeID` | `TThostFtdcExchangeIDType` | Exchange code that disambiguates the target venue. |
| `ExchangeName` | `TThostFtdcExchangeNameType` | Carries the exchange name for the current request or response. |
| `ExchangeProperty` | `TThostFtdcExchangePropertyType` | Carries the exchange property for the current request or response. |

**Structure layout**

```cpp
struct CThostFtdcExchangeField
{

    TThostFtdcExchangeIDType ExchangeID;

    TThostFtdcExchangeNameType ExchangeName;

    TThostFtdcExchangePropertyType ExchangeProperty;
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
void MySpi::OnRspQryExchange() {
    // Mark the event in your session state machine and send the next step if needed.
}
```

**Implementation notes**

- Make callback handlers idempotent because reconnect and replay semantics can surface the same business object more than once.
- Do not block the SPI thread with long business logic; hand the event to a worker queue when processing becomes expensive.

## OnRspQryExchangeMarginRate

`OnRspQryExchangeMarginRate` is an event callback that reports state back from the CTP runtime into the client application.

- Kind: callback
- Owning interface: `CThostFtdcTraderSpi`
- Related symbols: `ReqQryExchangeMarginRate`

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

**Field guide for `CThostFtdcExchangeMarginRateField`**

| Field | Type | Purpose |
| --- | --- | --- |
| `BrokerID` | `TThostFtdcBrokerIDType` | Broker code that scopes the request or identifies the response owner. |
| `reserve1` | `TThostFtdcOldInstrumentIDType` | Carries the reserve1 for the current request or response. |
| `HedgeFlag` | `TThostFtdcHedgeFlagType` | Carries the hedge flag for the current request or response. |
| `LongMarginRatioByMoney` | `TThostFtdcRatioType` | Carries the long margin ratio by money for the current request or response. |
| `LongMarginRatioByVolume` | `TThostFtdcMoneyType` | Carries the long margin ratio by volume for the current request or response. |
| `ShortMarginRatioByMoney` | `TThostFtdcRatioType` | Carries the short margin ratio by money for the current request or response. |
| `ShortMarginRatioByVolume` | `TThostFtdcMoneyType` | Carries the short margin ratio by volume for the current request or response. |
| `ExchangeID` | `TThostFtdcExchangeIDType` | Exchange code that disambiguates the target venue. |
| `InstrumentID` | `TThostFtdcInstrumentIDType` | Instrument symbol for the target contract. |

**Structure layout**

```cpp
struct CThostFtdcExchangeMarginRateField
{

    TThostFtdcBrokerIDType  BrokerID;

    TThostFtdcOldInstrumentIDType   reserve1;

    TThostFtdcHedgeFlagType HedgeFlag;

    TThostFtdcRatioType LongMarginRatioByMoney;

    TThostFtdcMoneyType LongMarginRatioByVolume;

    TThostFtdcRatioType ShortMarginRatioByMoney;

    TThostFtdcMoneyType ShortMarginRatioByVolume;

    TThostFtdcExchangeIDType    ExchangeID;

    TThostFtdcInstrumentIDType  InstrumentID;
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
void MySpi::OnRspQryExchangeMarginRate() {
    // Mark the event in your session state machine and send the next step if needed.
}
```

**Implementation notes**

- Make callback handlers idempotent because reconnect and replay semantics can surface the same business object more than once.
- Do not block the SPI thread with long business logic; hand the event to a worker queue when processing becomes expensive.

## OnRspQryExchangeMarginRateAdjust

`OnRspQryExchangeMarginRateAdjust` is an event callback that reports state back from the CTP runtime into the client application.

- Kind: callback
- Owning interface: `CThostFtdcTraderSpi`
- Related symbols: `ReqQryExchangeMarginRateAdjust`

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

**Field guide for `CThostFtdcExchangeMarginRateAdjustField`**

| Field | Type | Purpose |
| --- | --- | --- |
| `BrokerID` | `TThostFtdcBrokerIDType` | Broker code that scopes the request or identifies the response owner. |
| `reserve1` | `TThostFtdcOldInstrumentIDType` | Carries the reserve1 for the current request or response. |
| `HedgeFlag` | `TThostFtdcHedgeFlagType` | Carries the hedge flag for the current request or response. |
| `LongMarginRatioByMoney` | `TThostFtdcRatioType` | Carries the long margin ratio by money for the current request or response. |
| `LongMarginRatioByVolume` | `TThostFtdcMoneyType` | Carries the long margin ratio by volume for the current request or response. |
| `ShortMarginRatioByMoney` | `TThostFtdcRatioType` | Carries the short margin ratio by money for the current request or response. |
| `ShortMarginRatioByVolume` | `TThostFtdcMoneyType` | Carries the short margin ratio by volume for the current request or response. |
| `ExchLongMarginRatioByMoney` | `TThostFtdcRatioType` | Carries the exch long margin ratio by money for the current request or response. |
| `ExchLongMarginRatioByVolume` | `TThostFtdcMoneyType` | Carries the exch long margin ratio by volume for the current request or response. |
| `ExchShortMarginRatioByMoney` | `TThostFtdcRatioType` | Carries the exch short margin ratio by money for the current request or response. |
| `ExchShortMarginRatioByVolume` | `TThostFtdcMoneyType` | Carries the exch short margin ratio by volume for the current request or response. |
| `NoLongMarginRatioByMoney` | `TThostFtdcRatioType` | Carries the no long margin ratio by money for the current request or response. |
| `NoLongMarginRatioByVolume` | `TThostFtdcMoneyType` | Carries the no long margin ratio by volume for the current request or response. |
| `NoShortMarginRatioByMoney` | `TThostFtdcRatioType` | Carries the no short margin ratio by money for the current request or response. |
| `NoShortMarginRatioByVolume` | `TThostFtdcMoneyType` | Carries the no short margin ratio by volume for the current request or response. |
| `InstrumentID` | `TThostFtdcInstrumentIDType` | Instrument symbol for the target contract. |

**Structure layout**

```cpp
struct CThostFtdcExchangeMarginRateAdjustField
{

    TThostFtdcBrokerIDType  BrokerID;

    TThostFtdcOldInstrumentIDType   reserve1;

    TThostFtdcHedgeFlagType HedgeFlag;

    TThostFtdcRatioType LongMarginRatioByMoney;

    TThostFtdcMoneyType LongMarginRatioByVolume;

    TThostFtdcRatioType ShortMarginRatioByMoney;

    TThostFtdcMoneyType ShortMarginRatioByVolume;

    TThostFtdcRatioType ExchLongMarginRatioByMoney;

    TThostFtdcMoneyType ExchLongMarginRatioByVolume;

    TThostFtdcRatioType ExchShortMarginRatioByMoney;

    TThostFtdcMoneyType ExchShortMarginRatioByVolume;

    TThostFtdcRatioType NoLongMarginRatioByMoney;

    TThostFtdcMoneyType NoLongMarginRatioByVolume;

    TThostFtdcRatioType NoShortMarginRatioByMoney;

    TThostFtdcMoneyType NoShortMarginRatioByVolume;

    TThostFtdcInstrumentIDType  InstrumentID;
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
void MySpi::OnRspQryExchangeMarginRateAdjust() {
    // Mark the event in your session state machine and send the next step if needed.
}
```

**Implementation notes**

- Make callback handlers idempotent because reconnect and replay semantics can surface the same business object more than once.
- Do not block the SPI thread with long business logic; hand the event to a worker queue when processing becomes expensive.

## OnRspQryExchangeRate

`OnRspQryExchangeRate` is an event callback that reports state back from the CTP runtime into the client application.

- Kind: callback
- Owning interface: `CThostFtdcTraderSpi`
- Related symbols: `ReqQryExchangeRate`

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

**Field guide for `CThostFtdcExchangeRateField`**

| Field | Type | Purpose |
| --- | --- | --- |
| `BrokerID` | `TThostFtdcBrokerIDType` | Broker code that scopes the request or identifies the response owner. |
| `FromCurrencyID` | `TThostFtdcCurrencyIDType` | Carries the from currency identifier for the current request or response. |
| `FromCurrencyUnit` | `TThostFtdcCurrencyUnitType` | Carries the from currency unit for the current request or response. |
| `ToCurrencyID` | `TThostFtdcCurrencyIDType` | Carries the to currency identifier for the current request or response. |
| `ExchangeRate` | `TThostFtdcExchangeRateType` | Carries the exchange rate for the current request or response. |

**Structure layout**

```cpp
struct CThostFtdcExchangeRateField
{

    TThostFtdcBrokerIDType BrokerID;

    TThostFtdcCurrencyIDType FromCurrencyID;

    TThostFtdcCurrencyUnitType FromCurrencyUnit;

    TThostFtdcCurrencyIDType ToCurrencyID;

    TThostFtdcExchangeRateType ExchangeRate;
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
void MySpi::OnRspQryExchangeRate() {
    // Mark the event in your session state machine and send the next step if needed.
}
```

**Implementation notes**

- Make callback handlers idempotent because reconnect and replay semantics can surface the same business object more than once.
- Do not block the SPI thread with long business logic; hand the event to a worker queue when processing becomes expensive.

## OnRspQryProduct

`OnRspQryProduct` is an event callback that reports state back from the CTP runtime into the client application.

- Kind: callback
- Owning interface: `CThostFtdcTraderSpi`
- Related symbols: `ReqQryProduct`

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

**Field guide for `CThostFtdcProductField`**

| Field | Type | Purpose |
| --- | --- | --- |
| `reserve1` | `TThostFtdcOldInstrumentIDType` | Carries the reserve1 for the current request or response. |
| `ProductName` | `TThostFtdcProductNameType` | Carries the product name for the current request or response. |
| `ExchangeID` | `TThostFtdcExchangeIDType` | Exchange code that disambiguates the target venue. |
| `ProductClass` | `TThostFtdcProductClassType` | Carries the product class for the current request or response. |
| `VolumeMultiple` | `TThostFtdcVolumeMultipleType` | Carries the volume multiple for the current request or response. |
| `PriceTick` | `TThostFtdcPriceType` | Carries the price tick for the current request or response. |
| `MaxMarketOrderVolume` | `TThostFtdcVolumeType` | Carries the maximum market order volume for the current request or response. |
| `MinMarketOrderVolume` | `TThostFtdcVolumeType` | Carries the minimum market order volume for the current request or response. |
| `MaxLimitOrderVolume` | `TThostFtdcVolumeType` | Carries the maximum limit order volume for the current request or response. |
| `MinLimitOrderVolume` | `TThostFtdcVolumeType` | Carries the minimum limit order volume for the current request or response. |
| `PositionType` | `TThostFtdcPositionTypeType` | Carries the position type for the current request or response. |
| `PositionDateType` | `TThostFtdcPositionDateTypeType` | Carries the position date type for the current request or response. |
| `CloseDealType` | `TThostFtdcCloseDealTypeType` | Carries the close deal type for the current request or response. |
| `TradeCurrencyID` | `TThostFtdcCurrencyIDType` | Carries the trade currency identifier for the current request or response. |
| `MortgageFundUseRange` | `TThostFtdcMortgageFundUseRangeType` | Carries the mortgage fund use range for the current request or response. |
| `reserve2` | `TThostFtdcOldInstrumentIDType` | Carries the reserve2 for the current request or response. |
| `UnderlyingMultiple` | `TThostFtdcUnderlyingMultipleType` | Carries the underlying multiple for the current request or response. |
| `ProductID` | `TThostFtdcInstrumentIDType` | Carries the product identifier for the current request or response. |
| `ExchangeProductID` | `TThostFtdcInstrumentIDType` | Carries the exchange product identifier for the current request or response. |
| `OpenLimitControlLevel` | `TThostFtdcOpenLimitControlLevelType` | Carries the open limit control level for the current request or response. |
| `OrderFreqControlLevel` | `TThostFtdcOrderFreqControlLevelType` | Carries the order freq control level for the current request or response. |

**Structure layout**

```cpp
struct CThostFtdcProductField
{

    TThostFtdcOldInstrumentIDType   reserve1;

    TThostFtdcProductNameType   ProductName;

    TThostFtdcExchangeIDType    ExchangeID;

    TThostFtdcProductClassType  ProductClass;

    TThostFtdcVolumeMultipleType    VolumeMultiple;

    TThostFtdcPriceType PriceTick;

    TThostFtdcVolumeType    MaxMarketOrderVolume;

    TThostFtdcVolumeType    MinMarketOrderVolume;

    TThostFtdcVolumeType    MaxLimitOrderVolume;

    TThostFtdcVolumeType    MinLimitOrderVolume;

    TThostFtdcPositionTypeType  PositionType;

    TThostFtdcPositionDateTypeType  PositionDateType;

    TThostFtdcCloseDealTypeType CloseDealType;

    TThostFtdcCurrencyIDType    TradeCurrencyID;

    TThostFtdcMortgageFundUseRangeType  MortgageFundUseRange;

    TThostFtdcOldInstrumentIDType   reserve2;

    TThostFtdcUnderlyingMultipleType    UnderlyingMultiple;

    TThostFtdcInstrumentIDType  ProductID;

    TThostFtdcInstrumentIDType  ExchangeProductID;

    TThostFtdcOpenLimitControlLevelType OpenLimitControlLevel;

    TThostFtdcOrderFreqControlLevelType OrderFreqControlLevel;
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
void MySpi::OnRspQryProduct() {
    // Mark the event in your session state machine and send the next step if needed.
}
```

**Implementation notes**

- Make callback handlers idempotent because reconnect and replay semantics can surface the same business object more than once.
- Do not block the SPI thread with long business logic; hand the event to a worker queue when processing becomes expensive.

## OnRspQryProductExchRate

`OnRspQryProductExchRate` is an event callback that reports state back from the CTP runtime into the client application.

- Kind: callback
- Owning interface: `CThostFtdcTraderSpi`
- Related symbols: `ReqQryProductExchRate`

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

**Field guide for `CThostFtdcProductExchRateField`**

| Field | Type | Purpose |
| --- | --- | --- |
| `reserve1` | `TThostFtdcOldInstrumentIDType` | Carries the reserve1 for the current request or response. |
| `QuoteCurrencyID` | `TThostFtdcCurrencyIDType` | Carries the quote currency identifier for the current request or response. |
| `ExchangeRate` | `TThostFtdcExchangeRateType` | Carries the exchange rate for the current request or response. |
| `ExchangeID` | `TThostFtdcExchangeIDType` | Exchange code that disambiguates the target venue. |
| `ProductID` | `TThostFtdcInstrumentIDType` | Carries the product identifier for the current request or response. |

**Structure layout**

```cpp
struct CThostFtdcProductExchRateField
{

    TThostFtdcOldInstrumentIDType   reserve1;

    TThostFtdcCurrencyIDType    QuoteCurrencyID;

    TThostFtdcExchangeRateType  ExchangeRate;

    TThostFtdcExchangeIDType    ExchangeID;

    TThostFtdcInstrumentIDType  ProductID;
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
void MySpi::OnRspQryProductExchRate() {
    // Mark the event in your session state machine and send the next step if needed.
}
```

**Implementation notes**

- Make callback handlers idempotent because reconnect and replay semantics can surface the same business object more than once.
- Do not block the SPI thread with long business logic; hand the event to a worker queue when processing becomes expensive.

## OnRspQryProductGroup

`OnRspQryProductGroup` is an event callback that reports state back from the CTP runtime into the client application.

- Kind: callback
- Owning interface: `CThostFtdcTraderSpi`
- Related symbols: `ReqQryProductGroup`

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

**Field guide for `CThostFtdcProductGroupField`**

| Field | Type | Purpose |
| --- | --- | --- |
| `reserve1` | `TThostFtdcOldInstrumentIDType` | Carries the reserve1 for the current request or response. |
| `ExchangeID` | `TThostFtdcExchangeIDType` | Exchange code that disambiguates the target venue. |
| `reserve2` | `TThostFtdcOldInstrumentIDType` | Carries the reserve2 for the current request or response. |
| `ProductID` | `TThostFtdcInstrumentIDType` | Carries the product identifier for the current request or response. |
| `ProductGroupID` | `TThostFtdcInstrumentIDType` | Carries the product group identifier for the current request or response. |

**Structure layout**

```cpp
struct CThostFtdcProductGroupField
{

    TThostFtdcOldInstrumentIDType   reserve1;

    TThostFtdcExchangeIDType    ExchangeID;

    TThostFtdcOldInstrumentIDType   reserve2;

    TThostFtdcInstrumentIDType  ProductID;

    TThostFtdcInstrumentIDType  ProductGroupID;
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
void MySpi::OnRspQryProductGroup() {
    // Mark the event in your session state machine and send the next step if needed.
}
```

**Implementation notes**

- Make callback handlers idempotent because reconnect and replay semantics can surface the same business object more than once.
- Do not block the SPI thread with long business logic; hand the event to a worker queue when processing becomes expensive.

## OnRspQryClassifiedInstrument

`OnRspQryClassifiedInstrument` is an event callback that reports state back from the CTP runtime into the client application.

- Kind: callback
- Owning interface: `CThostFtdcTraderSpi`
- Related symbols: `ReqQryClassifiedInstrument`

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

**Field guide for `CThostFtdcInstrumentField`**

| Field | Type | Purpose |
| --- | --- | --- |
| `reserve1` | `TThostFtdcOldInstrumentIDType` | Carries the reserve1 for the current request or response. |
| `ExchangeID` | `TThostFtdcExchangeIDType` | Exchange code that disambiguates the target venue. |
| `InstrumentName` | `TThostFtdcInstrumentNameType` | Carries the instrument name for the current request or response. |
| `reserve2` | `TThostFtdcOldExchangeInstIDType` | Carries the reserve2 for the current request or response. |
| `reserve3` | `TThostFtdcOldInstrumentIDType` | Carries the reserve3 for the current request or response. |
| `ProductClass` | `TThostFtdcProductClassType` | Carries the product class for the current request or response. |
| `DeliveryYear` | `TThostFtdcYearType` | Carries the delivery year for the current request or response. |
| `DeliveryMonth` | `TThostFtdcMonthType` | Carries the delivery month for the current request or response. |
| `MaxMarketOrderVolume` | `TThostFtdcVolumeType` | Carries the maximum market order volume for the current request or response. |
| `MinMarketOrderVolume` | `TThostFtdcVolumeType` | Carries the minimum market order volume for the current request or response. |
| `MaxLimitOrderVolume` | `TThostFtdcVolumeType` | Carries the maximum limit order volume for the current request or response. |
| `MinLimitOrderVolume` | `TThostFtdcVolumeType` | Carries the minimum limit order volume for the current request or response. |
| `VolumeMultiple` | `TThostFtdcVolumeMultipleType` | Carries the volume multiple for the current request or response. |
| `PriceTick` | `TThostFtdcPriceType` | Carries the price tick for the current request or response. |
| `CreateDate` | `TThostFtdcDateType` | Carries the create date for the current request or response. |
| `OpenDate` | `TThostFtdcDateType` | Carries the open date for the current request or response. |
| `ExpireDate` | `TThostFtdcDateType` | Carries the expire date for the current request or response. |
| `StartDelivDate` | `TThostFtdcDateType` | Carries the start deliv date for the current request or response. |
| `EndDelivDate` | `TThostFtdcDateType` | Carries the end deliv date for the current request or response. |
| `InstLifePhase` | `TThostFtdcInstLifePhaseType` | Carries the inst life phase for the current request or response. |
| `IsTrading` | `TThostFtdcBoolType` | Carries the is trading for the current request or response. |
| `PositionType` | `TThostFtdcPositionTypeType` | Carries the position type for the current request or response. |
| `PositionDateType` | `TThostFtdcPositionDateTypeType` | Carries the position date type for the current request or response. |
| `LongMarginRatio` | `TThostFtdcRatioType` | Carries the long margin ratio for the current request or response. |
| `ShortMarginRatio` | `TThostFtdcRatioType` | Carries the short margin ratio for the current request or response. |
| `reserve4` | `TThostFtdcOldInstrumentIDType` | Carries the reserve4 for the current request or response. |
| `StrikePrice` | `TThostFtdcPriceType` | Carries the strike price for the current request or response. |
| `OptionsType` | `TThostFtdcOptionsTypeType` | Carries the options type for the current request or response. |
| `UnderlyingMultiple` | `TThostFtdcUnderlyingMultipleType` | Carries the underlying multiple for the current request or response. |
| `CombinationType` | `TThostFtdcCombinationTypeType` | Carries the combination type for the current request or response. |
| `InstrumentID` | `TThostFtdcInstrumentIDType` | Instrument symbol for the target contract. |
| `ExchangeInstID` | `TThostFtdcExchangeInstIDType` | Carries the exchange inst identifier for the current request or response. |
| `ProductID` | `TThostFtdcInstrumentIDType` | Carries the product identifier for the current request or response. |
| `UnderlyingInstrID` | `TThostFtdcInstrumentIDType` | Carries the underlying instr identifier for the current request or response. |

**Structure layout**

```cpp
struct CThostFtdcInstrumentField
{

    TThostFtdcOldInstrumentIDType   reserve1;

    TThostFtdcExchangeIDType    ExchangeID;

    TThostFtdcInstrumentNameType    InstrumentName;

    TThostFtdcOldExchangeInstIDType reserve2;

    TThostFtdcOldInstrumentIDType   reserve3;

    TThostFtdcProductClassType  ProductClass;

    TThostFtdcYearType  DeliveryYear;

    TThostFtdcMonthType DeliveryMonth;

    TThostFtdcVolumeType    MaxMarketOrderVolume;

    TThostFtdcVolumeType    MinMarketOrderVolume;

    TThostFtdcVolumeType    MaxLimitOrderVolume;

    TThostFtdcVolumeType    MinLimitOrderVolume;

    TThostFtdcVolumeMultipleType    VolumeMultiple;

    TThostFtdcPriceType PriceTick;

    TThostFtdcDateType  CreateDate;

    TThostFtdcDateType  OpenDate;

    TThostFtdcDateType  ExpireDate;

    TThostFtdcDateType  StartDelivDate;

    TThostFtdcDateType  EndDelivDate;

    TThostFtdcInstLifePhaseType InstLifePhase;

    TThostFtdcBoolType  IsTrading;

    TThostFtdcPositionTypeType  PositionType;

    TThostFtdcPositionDateTypeType  PositionDateType;

    TThostFtdcRatioType LongMarginRatio;

    TThostFtdcRatioType ShortMarginRatio;

    TThostFtdcMaxMarginSideAlgorithmType
MaxMarginSideAlgorithm;

    TThostFtdcOldInstrumentIDType   reserve4;

    TThostFtdcPriceType StrikePrice;

    TThostFtdcOptionsTypeType   OptionsType;

    TThostFtdcUnderlyingMultipleType    UnderlyingMultiple;

    TThostFtdcCombinationTypeType   CombinationType;

    TThostFtdcInstrumentIDType  InstrumentID;

    TThostFtdcExchangeInstIDType    ExchangeInstID;

    TThostFtdcInstrumentIDType  ProductID;

    TThostFtdcInstrumentIDType  UnderlyingInstrID;
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
void MySpi::OnRspQryClassifiedInstrument() {
    // Mark the event in your session state machine and send the next step if needed.
}
```

**Implementation notes**

- Make callback handlers idempotent because reconnect and replay semantics can surface the same business object more than once.
- Do not block the SPI thread with long business logic; hand the event to a worker queue when processing becomes expensive.

## OnRspQryCombPromotionParam

`OnRspQryCombPromotionParam` is an event callback that reports state back from the CTP runtime into the client application.

- Kind: callback
- Owning interface: `CThostFtdcTraderSpi`
- Related symbols: `ReqQryCombPromotionParam`

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

**Field guide for `CThostFtdcCombPromotionParamField`**

| Field | Type | Purpose |
| --- | --- | --- |
| `ExchangeID` | `TThostFtdcExchangeIDType` | Exchange code that disambiguates the target venue. |
| `InstrumentID` | `TThostFtdcInstrumentIDType` | Instrument symbol for the target contract. |
| `CombHedgeFlag` | `TThostFtdcCombHedgeFlagType` | Hedge classification for the instruction. |
| `Xparameter` | `TThostFtdcDiscountRatioType` | Carries the xparameter for the current request or response. |

**Structure layout**

```cpp
struct CThostFtdcCombPromotionParamField
{

    TThostFtdcExchangeIDType    ExchangeID;

    TThostFtdcInstrumentIDType  InstrumentID;

    TThostFtdcCombHedgeFlagType CombHedgeFlag;

    TThostFtdcDiscountRatioType Xparameter;
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
void MySpi::OnRspQryCombPromotionParam() {
    // Mark the event in your session state machine and send the next step if needed.
}
```

**Implementation notes**

- Make callback handlers idempotent because reconnect and replay semantics can surface the same business object more than once.
- Do not block the SPI thread with long business logic; hand the event to a worker queue when processing becomes expensive.

## OnRspQryTraderOffer

`OnRspQryTraderOffer` is an event callback that reports state back from the CTP runtime into the client application.

- Kind: callback
- Owning interface: `CThostFtdcTraderSpi`
- Related symbols: `ReqQryTraderOffer`

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

**Field guide for `CThostFtdcTraderOfferField`**

| Field | Type | Purpose |
| --- | --- | --- |
| `ExchangeID` | `TThostFtdcExchangeIDType` | Exchange code that disambiguates the target venue. |
| `TraderID` | `TThostFtdcTraderIDType` | Carries the trader identifier for the current request or response. |
| `ParticipantID` | `TThostFtdcParticipantIDType` | Carries the participant identifier for the current request or response. |
| `Password` | `TThostFtdcPasswordType` | Trading password or user password carried by the request. |
| `InstallID` | `TThostFtdcInstallIDType` | Carries the install identifier for the current request or response. |
| `OrderLocalID` | `TThostFtdcOrderLocalIDType` | Carries the order local identifier for the current request or response. |
| `TraderConnectStatus` | `TThostFtdcTraderConnectStatusType` | Carries the trader connect status for the current request or response. |
| `ConnectRequestDate` | `TThostFtdcDateType` | Carries the connect request date for the current request or response. |
| `ConnectRequestTime` | `TThostFtdcTimeType` | Carries the connect request time for the current request or response. |
| `LastReportDate` | `TThostFtdcDateType` | Carries the last report date for the current request or response. |
| `LastReportTime` | `TThostFtdcTimeType` | Carries the last report time for the current request or response. |
| `ConnectDate` | `TThostFtdcDateType` | Carries the connect date for the current request or response. |
| `ConnectTime` | `TThostFtdcTimeType` | Carries the connect time for the current request or response. |
| `StartDate` | `TThostFtdcDateType` | Carries the start date for the current request or response. |
| `StartTime` | `TThostFtdcTimeType` | Carries the start time for the current request or response. |
| `TradingDay` | `TThostFtdcDateType` | Trading date visible to the current trading system session. |
| `BrokerID` | `TThostFtdcBrokerIDType` | Broker code that scopes the request or identifies the response owner. |
| `MaxTradeID` | `TThostFtdcTradeIDType` | Carries the maximum trade identifier for the current request or response. |
| `MaxOrderMessageReference` | `TThostFtdcReturnCodeType` | Carries the maximum order message reference for the current request or response. |
| `OrderCancelAlg` | `TThostFtdcOrderCancelAlgType` | Carries the order cancel alg for the current request or response. |

**Structure layout**

```cpp
struct CThostFtdcTraderOfferField
{

    TThostFtdcExchangeIDType    ExchangeID;

    TThostFtdcTraderIDType  TraderID;

    TThostFtdcParticipantIDType ParticipantID;

    TThostFtdcPasswordType  Password;

    TThostFtdcInstallIDType InstallID;

    TThostFtdcOrderLocalIDType  OrderLocalID;

    TThostFtdcTraderConnectStatusType   TraderConnectStatus;

    TThostFtdcDateType  ConnectRequestDate;

    TThostFtdcTimeType  ConnectRequestTime;

    TThostFtdcDateType  LastReportDate;

    TThostFtdcTimeType  LastReportTime;

    TThostFtdcDateType  ConnectDate;

    TThostFtdcTimeType  ConnectTime;

    TThostFtdcDateType  StartDate;

    TThostFtdcTimeType  StartTime;

    TThostFtdcDateType  TradingDay;

    TThostFtdcBrokerIDType  BrokerID;

    TThostFtdcTradeIDType   MaxTradeID;

    TThostFtdcReturnCodeType    MaxOrderMessageReference;

    TThostFtdcOrderCancelAlgType    OrderCancelAlg;
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
void MySpi::OnRspQryTraderOffer() {
    // Mark the event in your session state machine and send the next step if needed.
}
```

**Implementation notes**

- Make callback handlers idempotent because reconnect and replay semantics can surface the same business object more than once.
- Do not block the SPI thread with long business logic; hand the event to a worker queue when processing becomes expensive.
