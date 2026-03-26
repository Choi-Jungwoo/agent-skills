# CTP market data SPI streaming callbacks

This reference covers the live push callbacks that deliver depth market data and for-quote events.

| Entry | Kind |
| --- | --- |
| OnRtnDepthMarketData | callback |
| OnRtnForQuoteRsp | callback |

## OnRtnDepthMarketData

`OnRtnDepthMarketData` is an event callback that reports state back from the CTP runtime into the client application.

- Kind: callback
- Owning interface: `CThostFtdcMdSpi`

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

**Field guide for `CThostFtdcDepthMarketDataField`**

| Field | Type | Purpose |
| --- | --- | --- |
| `TradingDay` | `TThostFtdcDateType` | Trading date visible to the current trading system session. |
| `InstrumentID` | `TThostFtdcInstrumentIDType` | Instrument symbol for the target contract. |
| `ExchangeID` | `TThostFtdcExchangeIDType` | Exchange code that disambiguates the target venue. |
| `ExchangeInstID` | `TThostFtdcExchangeInstIDType` | Carries the exchange inst identifier for the current request or response. |
| `LastPrice` | `TThostFtdcPriceType` | Carries the last price for the current request or response. |
| `PreSettlementPrice` | `TThostFtdcPriceType` | Carries the pre settlement price for the current request or response. |
| `PreClosePrice` | `TThostFtdcPriceType` | Carries the pre close price for the current request or response. |
| `PreOpenInterest` | `TThostFtdcLargeVolumeType` | Carries the pre open interest for the current request or response. |
| `OpenPrice` | `TThostFtdcPriceType` | Carries the open price for the current request or response. |
| `HighestPrice` | `TThostFtdcPriceType` | Carries the highest price for the current request or response. |
| `LowestPrice` | `TThostFtdcPriceType` | Carries the lowest price for the current request or response. |
| `Volume` | `TThostFtdcVolumeType` | Carries the volume for the current request or response. |
| `Turnover` | `TThostFtdcMoneyType` | Carries the turnover for the current request or response. |
| `OpenInterest` | `TThostFtdcLargeVolumeType` | Carries the open interest for the current request or response. |
| `ClosePrice` | `TThostFtdcPriceType` | Carries the close price for the current request or response. |
| `SettlementPrice` | `TThostFtdcPriceType` | Carries the settlement price for the current request or response. |
| `UpperLimitPrice` | `TThostFtdcPriceType` | Carries the upper limit price for the current request or response. |
| `LowerLimitPrice` | `TThostFtdcPriceType` | Carries the lower limit price for the current request or response. |
| `PreDelta` | `TThostFtdcRatioType` | Carries the pre delta for the current request or response. |
| `CurrDelta` | `TThostFtdcRatioType` | Carries the curr delta for the current request or response. |
| `UpdateTime` | `TThostFtdcTimeType` | Carries the update time for the current request or response. |
| `UpdateMillisec` | `TThostFtdcMillisecType` | Carries the update millisec for the current request or response. |
| `BidPrice1` | `TThostFtdcPriceType` | Carries the bid price1 for the current request or response. |
| `BidVolume1` | `TThostFtdcVolumeType` | Carries the bid volume1 for the current request or response. |
| `AskPrice1` | `TThostFtdcPriceType` | Carries the ask price1 for the current request or response. |
| `AskVolume1` | `TThostFtdcVolumeType` | Carries the ask volume1 for the current request or response. |
| `BidPrice2` | `TThostFtdcPriceType` | Carries the bid price2 for the current request or response. |
| `BidVolume2` | `TThostFtdcVolumeType` | Carries the bid volume2 for the current request or response. |
| `AskPrice2` | `TThostFtdcPriceType` | Carries the ask price2 for the current request or response. |
| `AskVolume2` | `TThostFtdcVolumeType` | Carries the ask volume2 for the current request or response. |
| `BidPrice3` | `TThostFtdcPriceType` | Carries the bid price3 for the current request or response. |
| `BidVolume3` | `TThostFtdcVolumeType` | Carries the bid volume3 for the current request or response. |
| `AskPrice3` | `TThostFtdcPriceType` | Carries the ask price3 for the current request or response. |
| `AskVolume3` | `TThostFtdcVolumeType` | Carries the ask volume3 for the current request or response. |
| `BidPrice4` | `TThostFtdcPriceType` | Carries the bid price4 for the current request or response. |
| `BidVolume4` | `TThostFtdcVolumeType` | Carries the bid volume4 for the current request or response. |
| `AskPrice4` | `TThostFtdcPriceType` | Carries the ask price4 for the current request or response. |
| `AskVolume4` | `TThostFtdcVolumeType` | Carries the ask volume4 for the current request or response. |
| `BidPrice5` | `TThostFtdcPriceType` | Carries the bid price5 for the current request or response. |
| `BidVolume5` | `TThostFtdcVolumeType` | Carries the bid volume5 for the current request or response. |
| `AskPrice5` | `TThostFtdcPriceType` | Carries the ask price5 for the current request or response. |
| `AskVolume5` | `TThostFtdcVolumeType` | Carries the ask volume5 for the current request or response. |
| `AveragePrice` | `TThostFtdcPriceType` | Carries the average price for the current request or response. |
| `ActionDay` | `TThostFtdcDateType` | Carries the action day for the current request or response. |
| `BandingUpperPrice` | `TThostFtdcPriceType` | Carries the banding upper price for the current request or response. |
| `BandingLowerPrice` | `TThostFtdcPriceType` | Carries the banding lower price for the current request or response. |

**Structure layout**

```cpp
struct CThostFtdcDepthMarketDataField
{

    TThostFtdcDateType   TradingDay;

    TThostFtdcInstrumentIDType  InstrumentID;

    TThostFtdcExchangeIDType ExchangeID;

    TThostFtdcExchangeInstIDType    ExchangeInstID;

    TThostFtdcPriceType  LastPrice;

    TThostFtdcPriceType  PreSettlementPrice;

    TThostFtdcPriceType  PreClosePrice;

    TThostFtdcLargeVolumeType   PreOpenInterest;

    TThostFtdcPriceType  OpenPrice;

    TThostFtdcPriceType  HighestPrice;

    TThostFtdcPriceType  LowestPrice;

    TThostFtdcVolumeType Volume;

    TThostFtdcMoneyType  Turnover;

    TThostFtdcLargeVolumeType   OpenInterest;

    TThostFtdcPriceType  ClosePrice;

    TThostFtdcPriceType  SettlementPrice;

    TThostFtdcPriceType  UpperLimitPrice;

    TThostFtdcPriceType  LowerLimitPrice;

    TThostFtdcRatioType  PreDelta;

    TThostFtdcRatioType  CurrDelta;

    TThostFtdcTimeType   UpdateTime;

    TThostFtdcMillisecType   UpdateMillisec;

    TThostFtdcPriceType  BidPrice1;

    TThostFtdcVolumeType BidVolume1;

    TThostFtdcPriceType  AskPrice1;

    TThostFtdcVolumeType AskVolume1;

    TThostFtdcPriceType  BidPrice2;

    TThostFtdcVolumeType BidVolume2;

    TThostFtdcPriceType  AskPrice2;

    TThostFtdcVolumeType AskVolume2;

    TThostFtdcPriceType  BidPrice3;

    TThostFtdcVolumeType BidVolume3;

    TThostFtdcPriceType  AskPrice3;

    TThostFtdcVolumeType AskVolume3;

    TThostFtdcPriceType  BidPrice4;

    TThostFtdcVolumeType BidVolume4;

    TThostFtdcPriceType  AskPrice4;

    TThostFtdcVolumeType AskVolume4;

    TThostFtdcPriceType  BidPrice5;

    TThostFtdcVolumeType BidVolume5;

    TThostFtdcPriceType  AskPrice5;

    TThostFtdcVolumeType AskVolume5;

    TThostFtdcPriceType  AveragePrice;

    TThostFtdcDateType   ActionDay;

    TThostFtdcPriceType BandingUpperPrice;

    TThostFtdcPriceType BandingLowerPrice;
};
```

**Usage example**

```cpp
void MySpi::OnRtnDepthMarketData() {
    // Mark the event in your session state machine and send the next step if needed.
}
```

**Implementation notes**

- Make callback handlers idempotent because reconnect and replay semantics can surface the same business object more than once.
- Do not block the SPI thread with long business logic; hand the event to a worker queue when processing becomes expensive.

## OnRtnForQuoteRsp

`OnRtnForQuoteRsp` is an event callback that reports state back from the CTP runtime into the client application.

- Kind: callback
- Owning interface: `CThostFtdcMdSpi`

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

**Field guide for `CThostFtdcForQuoteRspField`**

| Field | Type | Purpose |
| --- | --- | --- |
| `TradingDay` | `TThostFtdcDateType` | Trading date visible to the current trading system session. |
| `InstrumentID` | `TThostFtdcInstrumentIDType` | Instrument symbol for the target contract. |
| `ForQuoteSysID` | `TThostFtdcOrderSysIDType` | Carries the for quote sys identifier for the current request or response. |
| `ForQuoteTime` | `TThostFtdcTimeType` | Carries the for quote time for the current request or response. |
| `ActionDay` | `TThostFtdcDateType` | Carries the action day for the current request or response. |
| `ExchangeID` | `TThostFtdcExchangeIDType` | Exchange code that disambiguates the target venue. |

**Structure layout**

```cpp
struct CThostFtdcForQuoteRspField
{

    TThostFtdcDateType TradingDay;

    TThostFtdcInstrumentIDType InstrumentID;

    TThostFtdcOrderSysIDType ForQuoteSysID;

    TThostFtdcTimeType ForQuoteTime;

    TThostFtdcDateType ActionDay;

    TThostFtdcExchangeIDType ExchangeID;
};
```

**Usage example**

```cpp
void MySpi::OnRtnForQuoteRsp() {
    // Mark the event in your session state machine and send the next step if needed.
}
```

**Implementation notes**

- Make callback handlers idempotent because reconnect and replay semantics can surface the same business object more than once.
- Do not block the SPI thread with long business logic; hand the event to a worker queue when processing becomes expensive.
