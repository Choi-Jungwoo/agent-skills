# CTP trader SPI instrument and cost query callbacks

This reference covers instrument metadata, market snapshot, and cost or margin related query callbacks.

| Entry | Kind |
| --- | --- |
| OnRspQryDepthMarketData | callback |
| OnRspQryEWarrantOffset | callback |
| OnRspQryInstrument | callback |
| OnRspQryInstrumentCommissionRate | callback |
| OnRspQryInstrumentMarginRate | callback |
| OnRspQryInstrumentOrderCommRate | callback |
| OnRspQryMMInstrumentCommissionRate | callback |
| OnRspQryMMOptionInstrCommRate | callback |
| OnRspQryOptionInstrCommRate | callback |
| OnRspQryOptionInstrTradeCost | callback |

## OnRspQryDepthMarketData

`OnRspQryDepthMarketData` is an event callback that reports state back from the CTP runtime into the client application.

- Kind: callback
- Owning interface: `CThostFtdcTraderSpi`
- Related symbols: `ReqQryDepthMarketData`

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

**Field guide for `CThostFtdcDepthMarketDataField`**

| Field | Type | Purpose |
| --- | --- | --- |
| `TradingDay` | `TThostFtdcDateType` | Trading date visible to the current trading system session. |
| `reserve1` | `TThostFtdcOldInstrumentIDType` | Carries the reserve1 for the current request or response. |
| `ExchangeID` | `TThostFtdcExchangeIDType` | Exchange code that disambiguates the target venue. |
| `reserve2` | `TThostFtdcOldExchangeInstIDType` | Carries the reserve2 for the current request or response. |
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
| `InstrumentID` | `TThostFtdcInstrumentIDType` | Instrument symbol for the target contract. |
| `ExchangeInstID` | `TThostFtdcExchangeInstIDType` | Carries the exchange inst identifier for the current request or response. |
| `BandingUpperPrice` | `TThostFtdcPriceType` | Carries the banding upper price for the current request or response. |
| `BandingLowerPrice` | `TThostFtdcPriceType` | Carries the banding lower price for the current request or response. |

**Structure layout**

```cpp
struct CThostFtdcDepthMarketDataField
{

    TThostFtdcDateType  TradingDay;

    TThostFtdcOldInstrumentIDType   reserve1;

    TThostFtdcExchangeIDType    ExchangeID;

    TThostFtdcOldExchangeInstIDType reserve2;

    TThostFtdcPriceType LastPrice;

    TThostFtdcPriceType PreSettlementPrice;

    TThostFtdcPriceType PreClosePrice;

    TThostFtdcLargeVolumeType   PreOpenInterest;

    TThostFtdcPriceType OpenPrice;

    TThostFtdcPriceType HighestPrice;

    TThostFtdcPriceType LowestPrice;

    TThostFtdcVolumeType    Volume;

    TThostFtdcMoneyType Turnover;

    TThostFtdcLargeVolumeType   OpenInterest;

    TThostFtdcPriceType ClosePrice;

    TThostFtdcPriceType SettlementPrice;

    TThostFtdcPriceType UpperLimitPrice;

    TThostFtdcPriceType LowerLimitPrice;

    TThostFtdcRatioType PreDelta;

    TThostFtdcRatioType CurrDelta;

    TThostFtdcTimeType  UpdateTime;

    TThostFtdcMillisecType  UpdateMillisec;

    TThostFtdcPriceType BidPrice1;

    TThostFtdcVolumeType    BidVolume1;

    TThostFtdcPriceType AskPrice1;

    TThostFtdcVolumeType    AskVolume1;

    TThostFtdcPriceType BidPrice2;

    TThostFtdcVolumeType    BidVolume2;

    TThostFtdcPriceType AskPrice2;

    TThostFtdcVolumeType    AskVolume2;

    TThostFtdcPriceType BidPrice3;

    TThostFtdcVolumeType    BidVolume3;

    TThostFtdcPriceType AskPrice3;

    TThostFtdcVolumeType    AskVolume3;

    TThostFtdcPriceType BidPrice4;

    TThostFtdcVolumeType    BidVolume4;

    TThostFtdcPriceType AskPrice4;

    TThostFtdcVolumeType    AskVolume4;

    TThostFtdcPriceType BidPrice5;

    TThostFtdcVolumeType    BidVolume5;

    TThostFtdcPriceType AskPrice5;

    TThostFtdcVolumeType    AskVolume5;

    TThostFtdcPriceType AveragePrice;

    TThostFtdcDateType  ActionDay;

    TThostFtdcInstrumentIDType  InstrumentID;

    TThostFtdcExchangeInstIDType    ExchangeInstID;

    TThostFtdcPriceType BandingUpperPrice;

    TThostFtdcPriceType BandingLowerPrice;
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
void MySpi::OnRspQryDepthMarketData() {
    // Mark the event in your session state machine and send the next step if needed.
}
```

**Implementation notes**

- Make callback handlers idempotent because reconnect and replay semantics can surface the same business object more than once.
- Do not block the SPI thread with long business logic; hand the event to a worker queue when processing becomes expensive.

## OnRspQryEWarrantOffset

`OnRspQryEWarrantOffset` is an event callback that reports state back from the CTP runtime into the client application.

- Kind: callback
- Owning interface: `CThostFtdcTraderSpi`
- Related symbols: `ReqQryEWarrantOffset`

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

**Field guide for `CThostFtdcEWarrantOffsetField`**

| Field | Type | Purpose |
| --- | --- | --- |
| `TradingDay` | `TThostFtdcTradeDateType` | Trading date visible to the current trading system session. |
| `BrokerID` | `TThostFtdcBrokerIDType` | Broker code that scopes the request or identifies the response owner. |
| `InvestorID` | `TThostFtdcInvestorIDType` | Investor code used by the trading account. |
| `ExchangeID` | `TThostFtdcExchangeIDType` | Exchange code that disambiguates the target venue. |
| `reserve1` | `TThostFtdcOldInstrumentIDType` | Carries the reserve1 for the current request or response. |
| `Direction` | `TThostFtdcDirectionType` | Buy or sell direction of the trading instruction. |
| `HedgeFlag` | `TThostFtdcHedgeFlagType` | Carries the hedge flag for the current request or response. |
| `Volume` | `TThostFtdcVolumeType` | Carries the volume for the current request or response. |
| `InvestUnitID` | `TThostFtdcInvestUnitIDType` | Investment unit identifier used by the account model. |
| `InstrumentID` | `TThostFtdcInstrumentIDType` | Instrument symbol for the target contract. |

**Structure layout**

```cpp
struct CThostFtdcEWarrantOffsetField
{

    TThostFtdcTradeDateType TradingDay;

    TThostFtdcBrokerIDType  BrokerID;

    TThostFtdcInvestorIDType    InvestorID;

    TThostFtdcExchangeIDType    ExchangeID;

    TThostFtdcOldInstrumentIDType   reserve1;

    TThostFtdcDirectionType Direction;

    TThostFtdcHedgeFlagType HedgeFlag;

    TThostFtdcVolumeType    Volume;

    TThostFtdcInvestUnitIDType  InvestUnitID;

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
void MySpi::OnRspQryEWarrantOffset() {
    // Mark the event in your session state machine and send the next step if needed.
}
```

**Implementation notes**

- Make callback handlers idempotent because reconnect and replay semantics can surface the same business object more than once.
- Do not block the SPI thread with long business logic; hand the event to a worker queue when processing becomes expensive.

## OnRspQryInstrument

`OnRspQryInstrument` is an event callback that reports state back from the CTP runtime into the client application.

- Kind: callback
- Owning interface: `CThostFtdcTraderSpi`
- Related symbols: `ReqQryInstrument`, `OnRspQryExchangeMarginRate`, `OnRspQryExchangeMarginRateAdjust`

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
void MySpi::OnRspQryInstrument() {
    // Mark the event in your session state machine and send the next step if needed.
}
```

**Implementation notes**

- Make callback handlers idempotent because reconnect and replay semantics can surface the same business object more than once.
- Do not block the SPI thread with long business logic; hand the event to a worker queue when processing becomes expensive.

## OnRspQryInstrumentCommissionRate

`OnRspQryInstrumentCommissionRate` is an event callback that reports state back from the CTP runtime into the client application.

- Kind: callback
- Owning interface: `CThostFtdcTraderSpi`
- Related symbols: `ReqQryInstrumentCommissionRate`

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

**Field guide for `CThostFtdcInstrumentCommissionRateField`**

| Field | Type | Purpose |
| --- | --- | --- |
| `reserve1` | `TThostFtdcOldInstrumentIDType` | Carries the reserve1 for the current request or response. |
| `InvestorRange` | `TThostFtdcInvestorRangeType` | Carries the investor range for the current request or response. |
| `BrokerID` | `TThostFtdcBrokerIDType` | Broker code that scopes the request or identifies the response owner. |
| `InvestorID` | `TThostFtdcInvestorIDType` | Investor code used by the trading account. |
| `OpenRatioByMoney` | `TThostFtdcRatioType` | Carries the open ratio by money for the current request or response. |
| `OpenRatioByVolume` | `TThostFtdcRatioType` | Carries the open ratio by volume for the current request or response. |
| `CloseRatioByMoney` | `TThostFtdcRatioType` | Carries the close ratio by money for the current request or response. |
| `CloseRatioByVolume` | `TThostFtdcRatioType` | Carries the close ratio by volume for the current request or response. |
| `CloseTodayRatioByMoney` | `TThostFtdcRatioType` | Carries the close today ratio by money for the current request or response. |
| `CloseTodayRatioByVolume` | `TThostFtdcRatioType` | Carries the close today ratio by volume for the current request or response. |
| `ExchangeID` | `TThostFtdcExchangeIDType` | Exchange code that disambiguates the target venue. |
| `BizType` | `TThostFtdcBizTypeType` | Carries the biz type for the current request or response. |
| `InvestUnitID` | `TThostFtdcInvestUnitIDType` | Investment unit identifier used by the account model. |
| `InstrumentID` | `TThostFtdcInstrumentIDType` | Instrument symbol for the target contract. |

**Structure layout**

```cpp
struct CThostFtdcInstrumentCommissionRateField
{

    TThostFtdcOldInstrumentIDType   reserve1;

    TThostFtdcInvestorRangeType InvestorRange;

    TThostFtdcBrokerIDType  BrokerID;

    TThostFtdcInvestorIDType    InvestorID;

    TThostFtdcRatioType OpenRatioByMoney;

    TThostFtdcRatioType OpenRatioByVolume;

    TThostFtdcRatioType CloseRatioByMoney;

    TThostFtdcRatioType CloseRatioByVolume;

    TThostFtdcRatioType CloseTodayRatioByMoney;

    TThostFtdcRatioType CloseTodayRatioByVolume;

    TThostFtdcExchangeIDType    ExchangeID;

    TThostFtdcBizTypeType   BizType;

    TThostFtdcInvestUnitIDType  InvestUnitID;

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
void MySpi::OnRspQryInstrumentCommissionRate() {
    // Mark the event in your session state machine and send the next step if needed.
}
```

**Implementation notes**

- Make callback handlers idempotent because reconnect and replay semantics can surface the same business object more than once.
- Do not block the SPI thread with long business logic; hand the event to a worker queue when processing becomes expensive.

## OnRspQryInstrumentMarginRate

`OnRspQryInstrumentMarginRate` is an event callback that reports state back from the CTP runtime into the client application.

- Kind: callback
- Owning interface: `CThostFtdcTraderSpi`
- Related symbols: `ReqQryInstrumentMarginRate`

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

**Field guide for `CThostFtdcInstrumentMarginRateField`**

| Field | Type | Purpose |
| --- | --- | --- |
| `reserve1` | `TThostFtdcOldInstrumentIDType` | Carries the reserve1 for the current request or response. |
| `InvestorRange` | `TThostFtdcInvestorRangeType` | Carries the investor range for the current request or response. |
| `BrokerID` | `TThostFtdcBrokerIDType` | Broker code that scopes the request or identifies the response owner. |
| `InvestorID` | `TThostFtdcInvestorIDType` | Investor code used by the trading account. |
| `HedgeFlag` | `TThostFtdcHedgeFlagType` | Carries the hedge flag for the current request or response. |
| `LongMarginRatioByMoney` | `TThostFtdcRatioType` | Carries the long margin ratio by money for the current request or response. |
| `LongMarginRatioByVolume` | `TThostFtdcMoneyType` | Carries the long margin ratio by volume for the current request or response. |
| `ShortMarginRatioByMoney` | `TThostFtdcRatioType` | Carries the short margin ratio by money for the current request or response. |
| `ShortMarginRatioByVolume` | `TThostFtdcMoneyType` | Carries the short margin ratio by volume for the current request or response. |
| `IsRelative` | `TThostFtdcBoolType` | Carries the is relative for the current request or response. |
| `ExchangeID` | `TThostFtdcExchangeIDType` | Exchange code that disambiguates the target venue. |
| `InvestUnitID` | `TThostFtdcInvestUnitIDType` | Investment unit identifier used by the account model. |
| `InstrumentID` | `TThostFtdcInstrumentIDType` | Instrument symbol for the target contract. |

**Structure layout**

```cpp
struct CThostFtdcInstrumentMarginRateField
{

    TThostFtdcOldInstrumentIDType   reserve1;

    TThostFtdcInvestorRangeType InvestorRange;

    TThostFtdcBrokerIDType  BrokerID;

    TThostFtdcInvestorIDType    InvestorID;

    TThostFtdcHedgeFlagType HedgeFlag;

    TThostFtdcRatioType LongMarginRatioByMoney;

    TThostFtdcMoneyType LongMarginRatioByVolume;

    TThostFtdcRatioType ShortMarginRatioByMoney;

    TThostFtdcMoneyType ShortMarginRatioByVolume;

    TThostFtdcBoolType  IsRelative;

    TThostFtdcExchangeIDType    ExchangeID;

    TThostFtdcInvestUnitIDType  InvestUnitID;

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
void MySpi::OnRspQryInstrumentMarginRate() {
    // Mark the event in your session state machine and send the next step if needed.
}
```

**Implementation notes**

- Make callback handlers idempotent because reconnect and replay semantics can surface the same business object more than once.
- Do not block the SPI thread with long business logic; hand the event to a worker queue when processing becomes expensive.

## OnRspQryInstrumentOrderCommRate

`OnRspQryInstrumentOrderCommRate` is an event callback that reports state back from the CTP runtime into the client application.

- Kind: callback
- Owning interface: `CThostFtdcTraderSpi`
- Related symbols: `ReqQryInstrumentOrderCommRate`

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

**Field guide for `CThostFtdcInstrumentOrderCommRateField`**

| Field | Type | Purpose |
| --- | --- | --- |
| `reserve1` | `TThostFtdcOldInstrumentIDType` | Carries the reserve1 for the current request or response. |
| `InvestorRange` | `TThostFtdcInvestorRangeType` | Carries the investor range for the current request or response. |
| `BrokerID` | `TThostFtdcBrokerIDType` | Broker code that scopes the request or identifies the response owner. |
| `InvestorID` | `TThostFtdcInvestorIDType` | Investor code used by the trading account. |
| `HedgeFlag` | `TThostFtdcHedgeFlagType` | Carries the hedge flag for the current request or response. |
| `OrderCommByVolume` | `TThostFtdcRatioType` | Carries the order comm by volume for the current request or response. |
| `OrderActionCommByVolume` | `TThostFtdcRatioType` | Carries the order action comm by volume for the current request or response. |
| `ExchangeID` | `TThostFtdcExchangeIDType` | Exchange code that disambiguates the target venue. |
| `InvestUnitID` | `TThostFtdcInvestUnitIDType` | Investment unit identifier used by the account model. |
| `InstrumentID` | `TThostFtdcInstrumentIDType` | Instrument symbol for the target contract. |
| `OrderCommByTrade` | `TThostFtdcRatioType` | Carries the order comm by trade for the current request or response. |
| `OrderActionCommByTrade` | `TThostFtdcRatioType` | Carries the order action comm by trade for the current request or response. |

**Structure layout**

```cpp
struct CThostFtdcInstrumentOrderCommRateField
{

    TThostFtdcOldInstrumentIDType   reserve1;

    TThostFtdcInvestorRangeType InvestorRange;

    TThostFtdcBrokerIDType  BrokerID;

    TThostFtdcInvestorIDType    InvestorID;

    TThostFtdcHedgeFlagType HedgeFlag;

    TThostFtdcRatioType OrderCommByVolume;

    TThostFtdcRatioType OrderActionCommByVolume;

    TThostFtdcExchangeIDType    ExchangeID;

    TThostFtdcInvestUnitIDType  InvestUnitID;

    TThostFtdcInstrumentIDType  InstrumentID;

    TThostFtdcRatioType OrderCommByTrade;

    TThostFtdcRatioType OrderActionCommByTrade;
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
void MySpi::OnRspQryInstrumentOrderCommRate() {
    // Mark the event in your session state machine and send the next step if needed.
}
```

**Implementation notes**

- Make callback handlers idempotent because reconnect and replay semantics can surface the same business object more than once.
- Do not block the SPI thread with long business logic; hand the event to a worker queue when processing becomes expensive.

## OnRspQryMMInstrumentCommissionRate

`OnRspQryMMInstrumentCommissionRate` is an event callback that reports state back from the CTP runtime into the client application.

- Kind: callback
- Owning interface: `CThostFtdcTraderSpi`
- Related symbols: `OnRspQryMMInstrumentCommissionR`, `ReqQryMMInstrumentCommissionRate`

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

**Field guide for `CThostFtdcMMInstrumentCommissionRateField`**

| Field | Type | Purpose |
| --- | --- | --- |
| `reserve1` | `TThostFtdcOldInstrumentIDType` | Carries the reserve1 for the current request or response. |
| `InvestorRange` | `TThostFtdcInvestorRangeType` | Carries the investor range for the current request or response. |
| `BrokerID` | `TThostFtdcBrokerIDType` | Broker code that scopes the request or identifies the response owner. |
| `InvestorID` | `TThostFtdcInvestorIDType` | Investor code used by the trading account. |
| `OpenRatioByMoney` | `TThostFtdcRatioType` | Carries the open ratio by money for the current request or response. |
| `OpenRatioByVolume` | `TThostFtdcRatioType` | Carries the open ratio by volume for the current request or response. |
| `CloseRatioByMoney` | `TThostFtdcRatioType` | Carries the close ratio by money for the current request or response. |
| `CloseRatioByVolume` | `TThostFtdcRatioType` | Carries the close ratio by volume for the current request or response. |
| `CloseTodayRatioByMoney` | `TThostFtdcRatioType` | Carries the close today ratio by money for the current request or response. |
| `CloseTodayRatioByVolume` | `TThostFtdcRatioType` | Carries the close today ratio by volume for the current request or response. |
| `InstrumentID` | `TThostFtdcInstrumentIDType` | Instrument symbol for the target contract. |

**Structure layout**

```cpp
struct CThostFtdcMMInstrumentCommissionRateField
{

    TThostFtdcOldInstrumentIDType   reserve1;

    TThostFtdcInvestorRangeType InvestorRange;

    TThostFtdcBrokerIDType  BrokerID;

    TThostFtdcInvestorIDType    InvestorID;

    TThostFtdcRatioType OpenRatioByMoney;

    TThostFtdcRatioType OpenRatioByVolume;

    TThostFtdcRatioType CloseRatioByMoney;

    TThostFtdcRatioType CloseRatioByVolume;

    TThostFtdcRatioType CloseTodayRatioByMoney;

    TThostFtdcRatioType CloseTodayRatioByVolume;

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
void MySpi::OnRspQryMMInstrumentCommissionRate() {
    // Mark the event in your session state machine and send the next step if needed.
}
```

**Implementation notes**

- Make callback handlers idempotent because reconnect and replay semantics can surface the same business object more than once.
- Do not block the SPI thread with long business logic; hand the event to a worker queue when processing becomes expensive.

## OnRspQryMMOptionInstrCommRate

`OnRspQryMMOptionInstrCommRate` is an event callback that reports state back from the CTP runtime into the client application.

- Kind: callback
- Owning interface: `CThostFtdcTraderSpi`
- Related symbols: `ReqQryMMOptionInstrCommRate`

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

**Field guide for `CThostFtdcMMOptionInstrCommRateField`**

| Field | Type | Purpose |
| --- | --- | --- |
| `reserve1` | `TThostFtdcOldInstrumentIDType` | Carries the reserve1 for the current request or response. |
| `InvestorRange` | `TThostFtdcInvestorRangeType` | Carries the investor range for the current request or response. |
| `BrokerID` | `TThostFtdcBrokerIDType` | Broker code that scopes the request or identifies the response owner. |
| `InvestorID` | `TThostFtdcInvestorIDType` | Investor code used by the trading account. |
| `OpenRatioByMoney` | `TThostFtdcRatioType` | Carries the open ratio by money for the current request or response. |
| `OpenRatioByVolume` | `TThostFtdcRatioType` | Carries the open ratio by volume for the current request or response. |
| `CloseRatioByMoney` | `TThostFtdcRatioType` | Carries the close ratio by money for the current request or response. |
| `CloseRatioByVolume` | `TThostFtdcRatioType` | Carries the close ratio by volume for the current request or response. |
| `CloseTodayRatioByMoney` | `TThostFtdcRatioType` | Carries the close today ratio by money for the current request or response. |
| `CloseTodayRatioByVolume` | `TThostFtdcRatioType` | Carries the close today ratio by volume for the current request or response. |
| `StrikeRatioByMoney` | `TThostFtdcRatioType` | Carries the strike ratio by money for the current request or response. |
| `StrikeRatioByVolume` | `TThostFtdcRatioType` | Carries the strike ratio by volume for the current request or response. |
| `InstrumentID` | `TThostFtdcInstrumentIDType` | Instrument symbol for the target contract. |

**Structure layout**

```cpp
struct CThostFtdcMMOptionInstrCommRateField
{

    TThostFtdcOldInstrumentIDType   reserve1;

    TThostFtdcInvestorRangeType InvestorRange;

    TThostFtdcBrokerIDType  BrokerID;

    TThostFtdcInvestorIDType    InvestorID;

    TThostFtdcRatioType OpenRatioByMoney;

    TThostFtdcRatioType OpenRatioByVolume;

    TThostFtdcRatioType CloseRatioByMoney;

    TThostFtdcRatioType CloseRatioByVolume;

    TThostFtdcRatioType CloseTodayRatioByMoney;

    TThostFtdcRatioType CloseTodayRatioByVolume;

    TThostFtdcRatioType StrikeRatioByMoney;

    TThostFtdcRatioType StrikeRatioByVolume;

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
void MySpi::OnRspQryMMOptionInstrCommRate() {
    // Mark the event in your session state machine and send the next step if needed.
}
```

**Implementation notes**

- Make callback handlers idempotent because reconnect and replay semantics can surface the same business object more than once.
- Do not block the SPI thread with long business logic; hand the event to a worker queue when processing becomes expensive.

## OnRspQryOptionInstrCommRate

`OnRspQryOptionInstrCommRate` is an event callback that reports state back from the CTP runtime into the client application.

- Kind: callback
- Owning interface: `CThostFtdcTraderSpi`
- Related symbols: `ReqQryOptionInstrCommRate`

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

**Field guide for `CThostFtdcOptionInstrCommRateField`**

| Field | Type | Purpose |
| --- | --- | --- |
| `reserve1` | `TThostFtdcOldInstrumentIDType` | Carries the reserve1 for the current request or response. |
| `InvestorRange` | `TThostFtdcInvestorRangeType` | Carries the investor range for the current request or response. |
| `BrokerID` | `TThostFtdcBrokerIDType` | Broker code that scopes the request or identifies the response owner. |
| `InvestorID` | `TThostFtdcInvestorIDType` | Investor code used by the trading account. |
| `OpenRatioByMoney` | `TThostFtdcRatioType` | Carries the open ratio by money for the current request or response. |
| `OpenRatioByVolume` | `TThostFtdcRatioType` | Carries the open ratio by volume for the current request or response. |
| `CloseRatioByMoney` | `TThostFtdcRatioType` | Carries the close ratio by money for the current request or response. |
| `CloseRatioByVolume` | `TThostFtdcRatioType` | Carries the close ratio by volume for the current request or response. |
| `CloseTodayRatioByMoney` | `TThostFtdcRatioType` | Carries the close today ratio by money for the current request or response. |
| `CloseTodayRatioByVolume` | `TThostFtdcRatioType` | Carries the close today ratio by volume for the current request or response. |
| `StrikeRatioByMoney` | `TThostFtdcRatioType` | Carries the strike ratio by money for the current request or response. |
| `StrikeRatioByVolume` | `TThostFtdcRatioType` | Carries the strike ratio by volume for the current request or response. |
| `ExchangeID` | `TThostFtdcExchangeIDType` | Exchange code that disambiguates the target venue. |
| `InvestUnitID` | `TThostFtdcInvestUnitIDType` | Investment unit identifier used by the account model. |
| `InstrumentID` | `TThostFtdcInstrumentIDType` | Instrument symbol for the target contract. |

**Structure layout**

```cpp
struct CThostFtdcOptionInstrCommRateField
{

    TThostFtdcOldInstrumentIDType   reserve1;

    TThostFtdcInvestorRangeType InvestorRange;

    TThostFtdcBrokerIDType  BrokerID;

    TThostFtdcInvestorIDType    InvestorID;

    TThostFtdcRatioType OpenRatioByMoney;

    TThostFtdcRatioType OpenRatioByVolume;

    TThostFtdcRatioType CloseRatioByMoney;

    TThostFtdcRatioType CloseRatioByVolume;

    TThostFtdcRatioType CloseTodayRatioByMoney;

    TThostFtdcRatioType CloseTodayRatioByVolume;

    TThostFtdcRatioType StrikeRatioByMoney;

    TThostFtdcRatioType StrikeRatioByVolume;

    TThostFtdcExchangeIDType    ExchangeID;

    TThostFtdcInvestUnitIDType  InvestUnitID;

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
void MySpi::OnRspQryOptionInstrCommRate() {
    // Mark the event in your session state machine and send the next step if needed.
}
```

**Implementation notes**

- Make callback handlers idempotent because reconnect and replay semantics can surface the same business object more than once.
- Do not block the SPI thread with long business logic; hand the event to a worker queue when processing becomes expensive.

## OnRspQryOptionInstrTradeCost

`OnRspQryOptionInstrTradeCost` is an event callback that reports state back from the CTP runtime into the client application.

- Kind: callback
- Owning interface: `CThostFtdcTraderSpi`
- Related symbols: `ReqQryOptionInstrTradeCost`

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

**Field guide for `CThostFtdcOptionInstrTradeCostField`**

| Field | Type | Purpose |
| --- | --- | --- |
| `BrokerID` | `TThostFtdcBrokerIDType` | Broker code that scopes the request or identifies the response owner. |
| `InvestorID` | `TThostFtdcInvestorIDType` | Investor code used by the trading account. |
| `reserve1` | `TThostFtdcOldInstrumentIDType` | Carries the reserve1 for the current request or response. |
| `HedgeFlag` | `TThostFtdcHedgeFlagType` | Carries the hedge flag for the current request or response. |
| `FixedMargin` | `TThostFtdcMoneyType` | Carries the fixed margin for the current request or response. |
| `MiniMargin` | `TThostFtdcMoneyType` | Carries the mini margin for the current request or response. |
| `Royalty` | `TThostFtdcMoneyType` | Carries the royalty for the current request or response. |
| `ExchFixedMargin` | `TThostFtdcMoneyType` | Carries the exch fixed margin for the current request or response. |
| `ExchMiniMargin` | `TThostFtdcMoneyType` | Carries the exch mini margin for the current request or response. |
| `ExchangeID` | `TThostFtdcExchangeIDType` | Exchange code that disambiguates the target venue. |
| `InvestUnitID` | `TThostFtdcInvestUnitIDType` | Investment unit identifier used by the account model. |
| `InstrumentID` | `TThostFtdcInstrumentIDType` | Instrument symbol for the target contract. |

**Structure layout**

```cpp
struct CThostFtdcOptionInstrTradeCostField
{

    TThostFtdcBrokerIDType  BrokerID;

    TThostFtdcInvestorIDType    InvestorID;

    TThostFtdcOldInstrumentIDType   reserve1;

    TThostFtdcHedgeFlagType HedgeFlag;

    TThostFtdcMoneyType FixedMargin;

    TThostFtdcMoneyType MiniMargin;

    TThostFtdcMoneyType Royalty;

    TThostFtdcMoneyType ExchFixedMargin;

    TThostFtdcMoneyType ExchMiniMargin;

    TThostFtdcExchangeIDType    ExchangeID;

    TThostFtdcInvestUnitIDType  InvestUnitID;

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
void MySpi::OnRspQryOptionInstrTradeCost() {
    // Mark the event in your session state machine and send the next step if needed.
}
```

**Implementation notes**

- Make callback handlers idempotent because reconnect and replay semantics can surface the same business object more than once.
- Do not block the SPI thread with long business logic; hand the event to a worker queue when processing becomes expensive.
