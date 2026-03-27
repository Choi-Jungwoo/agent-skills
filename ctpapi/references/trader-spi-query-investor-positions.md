# CTP trader SPI investor and position query callbacks

This reference covers callbacks for investor identity, positions, investment units, and product-group margin state.

| Entry | Kind |
| --- | --- |
| OnRspQryInvestor | callback |
| OnRspQryInvestorPosition | callback |
| OnRspQryInvestorPositionCombineDetail | callback |
| OnRspQryInvestorPositionDetail | callback |
| OnRspQryInvestorProductGroupMargin | callback |
| OnRspQryInvestUnit | callback |
| OnRspQryNotice | callback |

## OnRspQryInvestor

`OnRspQryInvestor` is an event callback that reports state back from the CTP runtime into the client application.

- Kind: callback
- Owning interface: `CThostFtdcTraderSpi`
- Related symbols: `ReqQryInvestor`

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

**Field guide for `CThostFtdcInvestorField`**

| Field | Type | Purpose |
| --- | --- | --- |
| `InvestorID` | `TThostFtdcInvestorIDType` | Investor code used by the trading account. |
| `BrokerID` | `TThostFtdcBrokerIDType` | Broker code that scopes the request or identifies the response owner. |
| `InvestorGroupID` | `TThostFtdcInvestorIDType` | Carries the investor group identifier for the current request or response. |
| `InvestorName` | `TThostFtdcPartyNameType` | Carries the investor name for the current request or response. |
| `IdentifiedCardType` | `TThostFtdcIdCardTypeType` | Carries the identified card type for the current request or response. |
| `IdentifiedCardNo` | `TThostFtdcIdentifiedCardNoType` | Carries the identified card no for the current request or response. |
| `IsActive` | `TThostFtdcBoolType` | Carries the is active for the current request or response. |
| `Telephone` | `TThostFtdcTelephoneType` | Carries the telephone for the current request or response. |
| `Address` | `TThostFtdcAddressType` | Carries the address for the current request or response. |
| `OpenDate` | `TThostFtdcDateType` | Carries the open date for the current request or response. |
| `Mobile` | `TThostFtdcMobileType` | Carries the mobile for the current request or response. |
| `CommModelID` | `TThostFtdcInvestorIDType` | Carries the comm model identifier for the current request or response. |
| `MarginModelID` | `TThostFtdcInvestorIDType` | Carries the margin model identifier for the current request or response. |
| `IsOrderFreq` | `TThostFtdcEnumBoolType` | Carries the is order freq for the current request or response. |
| `IsOpenVolLimit` | `TThostFtdcEnumBoolType` | Carries the is open vol limit for the current request or response. |

**Structure layout**

```cpp
struct CThostFtdcInvestorField
{

    TThostFtdcInvestorIDType InvestorID;

    TThostFtdcBrokerIDType BrokerID;

    TThostFtdcInvestorIDType InvestorGroupID;

    TThostFtdcPartyNameType InvestorName;

    TThostFtdcIdCardTypeType IdentifiedCardType;

    TThostFtdcIdentifiedCardNoType IdentifiedCardNo;

    TThostFtdcBoolType IsActive;

    TThostFtdcTelephoneType Telephone;

    TThostFtdcAddressType Address;

    TThostFtdcDateType OpenDate;

    TThostFtdcMobileType Mobile;

    TThostFtdcInvestorIDType CommModelID;

    TThostFtdcInvestorIDType MarginModelID;

    TThostFtdcEnumBoolType  IsOrderFreq;

    TThostFtdcEnumBoolType  IsOpenVolLimit;
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
void MySpi::OnRspQryInvestor() {
    // Mark the event in your session state machine and send the next step if needed.
}
```

**Implementation notes**

- Make callback handlers idempotent because reconnect and replay semantics can surface the same business object more than once.
- Do not block the SPI thread with long business logic; hand the event to a worker queue when processing becomes expensive.

## OnRspQryInvestorPosition

`OnRspQryInvestorPosition` is an event callback that reports state back from the CTP runtime into the client application.

- Kind: callback
- Owning interface: `CThostFtdcTraderSpi`
- Related symbols: `ReqQryInvestorPosition`

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

**Field guide for `CThostFtdcInvestorPositionField`**

| Field | Type | Purpose |
| --- | --- | --- |
| `reserve1` | `TThostFtdcOldInstrumentIDType` | Carries the reserve1 for the current request or response. |
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
| `InstrumentID` | `TThostFtdcInstrumentIDType` | Instrument symbol for the target contract. |
| `OptionValue` | `TThostFtdcMoneyType` | Carries the option value for the current request or response. |

**Structure layout**

```cpp
struct CThostFtdcInvestorPositionField
{

    TThostFtdcOldInstrumentIDType   reserve1;

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

    TThostFtdcInstrumentIDType  InstrumentID;

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
void MySpi::OnRspQryInvestorPosition() {
    // Mark the event in your session state machine and send the next step if needed.
}
```

**Implementation notes**

- Make callback handlers idempotent because reconnect and replay semantics can surface the same business object more than once.
- Do not block the SPI thread with long business logic; hand the event to a worker queue when processing becomes expensive.

## OnRspQryInvestorPositionCombineDetail

`OnRspQryInvestorPositionCombineDetail` is an event callback that reports state back from the CTP runtime into the client application.

- Kind: callback
- Owning interface: `CThostFtdcTraderSpi`
- Related symbols: `OnRspQryInvestorPositionCombineDet`, `ReqQryInvestorPositionCombineDetail`

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

**Field guide for `CThostFtdcInvestorPositionCombineDetailField`**

| Field | Type | Purpose |
| --- | --- | --- |
| `TradingDay` | `TThostFtdcDateType` | Trading date visible to the current trading system session. |
| `OpenDate` | `TThostFtdcDateType` | Carries the open date for the current request or response. |
| `ExchangeID` | `TThostFtdcExchangeIDType` | Exchange code that disambiguates the target venue. |
| `SettlementID` | `TThostFtdcSettlementIDType` | Carries the settlement identifier for the current request or response. |
| `BrokerID` | `TThostFtdcBrokerIDType` | Broker code that scopes the request or identifies the response owner. |
| `InvestorID` | `TThostFtdcInvestorIDType` | Investor code used by the trading account. |
| `ComTradeID` | `TThostFtdcTradeIDType` | Carries the com trade identifier for the current request or response. |
| `TradeID` | `TThostFtdcTradeIDType` | Carries the trade identifier for the current request or response. |
| `reserve1` | `TThostFtdcOldInstrumentIDType` | Carries the reserve1 for the current request or response. |
| `HedgeFlag` | `TThostFtdcHedgeFlagType` | Carries the hedge flag for the current request or response. |
| `Direction` | `TThostFtdcDirectionType` | Buy or sell direction of the trading instruction. |
| `TotalAmt` | `TThostFtdcVolumeType` | Carries the total amt for the current request or response. |
| `Margin` | `TThostFtdcMoneyType` | Carries the margin for the current request or response. |
| `ExchMargin` | `TThostFtdcMoneyType` | Carries the exch margin for the current request or response. |
| `MarginRateByMoney` | `TThostFtdcRatioType` | Carries the margin rate by money for the current request or response. |
| `MarginRateByVolume` | `TThostFtdcRatioType` | Carries the margin rate by volume for the current request or response. |
| `LegID` | `TThostFtdcLegIDType` | Carries the leg identifier for the current request or response. |
| `LegMultiple` | `TThostFtdcLegMultipleType` | Carries the leg multiple for the current request or response. |
| `reserve2` | `TThostFtdcOldInstrumentIDType` | Carries the reserve2 for the current request or response. |
| `TradeGroupID` | `TThostFtdcTradeGroupIDType` | Carries the trade group identifier for the current request or response. |
| `InvestUnitID` | `TThostFtdcInvestUnitIDType` | Investment unit identifier used by the account model. |
| `InstrumentID` | `TThostFtdcInstrumentIDType` | Instrument symbol for the target contract. |
| `CombInstrumentID` | `TThostFtdcInstrumentIDType` | Carries the comb instrument identifier for the current request or response. |

**Structure layout**

```cpp
struct CThostFtdcInvestorPositionCombineDetailField
{

    TThostFtdcDateType  TradingDay;

    TThostFtdcDateType  OpenDate;

    TThostFtdcExchangeIDType    ExchangeID;

    TThostFtdcSettlementIDType  SettlementID;

    TThostFtdcBrokerIDType  BrokerID;

    TThostFtdcInvestorIDType    InvestorID;

    TThostFtdcTradeIDType   ComTradeID;

    TThostFtdcTradeIDType   TradeID;

    TThostFtdcOldInstrumentIDType   reserve1;

    TThostFtdcHedgeFlagType HedgeFlag;

    TThostFtdcDirectionType Direction;

    TThostFtdcVolumeType    TotalAmt;

    TThostFtdcMoneyType Margin;

    TThostFtdcMoneyType ExchMargin;

    TThostFtdcRatioType MarginRateByMoney;

    TThostFtdcRatioType MarginRateByVolume;

    TThostFtdcLegIDType LegID;

    TThostFtdcLegMultipleType   LegMultiple;

    TThostFtdcOldInstrumentIDType   reserve2;

    TThostFtdcTradeGroupIDType  TradeGroupID;

    TThostFtdcInvestUnitIDType  InvestUnitID;

    TThostFtdcInstrumentIDType  InstrumentID;

    TThostFtdcInstrumentIDType  CombInstrumentID;
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
void MySpi::OnRspQryInvestorPositionCombineDetail() {
    // Mark the event in your session state machine and send the next step if needed.
}
```

**Implementation notes**

- Make callback handlers idempotent because reconnect and replay semantics can surface the same business object more than once.
- Do not block the SPI thread with long business logic; hand the event to a worker queue when processing becomes expensive.

## OnRspQryInvestorPositionDetail

`OnRspQryInvestorPositionDetail` is an event callback that reports state back from the CTP runtime into the client application.

- Kind: callback
- Owning interface: `CThostFtdcTraderSpi`
- Related symbols: `ReqQryInvestorPositionDetail`

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

**Field guide for `CThostFtdcInvestorPositionDetailField`**

| Field | Type | Purpose |
| --- | --- | --- |
| `reserve1` | `TThostFtdcOldInstrumentIDType` | Carries the reserve1 for the current request or response. |
| `BrokerID` | `TThostFtdcBrokerIDType` | Broker code that scopes the request or identifies the response owner. |
| `InvestorID` | `TThostFtdcInvestorIDType` | Investor code used by the trading account. |
| `HedgeFlag` | `TThostFtdcHedgeFlagType` | Carries the hedge flag for the current request or response. |
| `Direction` | `TThostFtdcDirectionType` | Buy or sell direction of the trading instruction. |
| `OpenDate` | `TThostFtdcDateType` | Carries the open date for the current request or response. |
| `TradeID` | `TThostFtdcTradeIDType` | Carries the trade identifier for the current request or response. |
| `Volume` | `TThostFtdcVolumeType` | Carries the volume for the current request or response. |
| `OpenPrice` | `TThostFtdcPriceType` | Carries the open price for the current request or response. |
| `TradingDay` | `TThostFtdcDateType` | Trading date visible to the current trading system session. |
| `SettlementID` | `TThostFtdcSettlementIDType` | Carries the settlement identifier for the current request or response. |
| `TradeType` | `TThostFtdcTradeTypeType` | Carries the trade type for the current request or response. |
| `reserve2` | `TThostFtdcOldInstrumentIDType` | Carries the reserve2 for the current request or response. |
| `ExchangeID` | `TThostFtdcExchangeIDType` | Exchange code that disambiguates the target venue. |
| `CloseProfitByDate` | `TThostFtdcMoneyType` | Carries the close profit by date for the current request or response. |
| `CloseProfitByTrade` | `TThostFtdcMoneyType` | Carries the close profit by trade for the current request or response. |
| `PositionProfitByDate` | `TThostFtdcMoneyType` | Carries the position profit by date for the current request or response. |
| `PositionProfitByTrade` | `TThostFtdcMoneyType` | Carries the position profit by trade for the current request or response. |
| `Margin` | `TThostFtdcMoneyType` | Carries the margin for the current request or response. |
| `ExchMargin` | `TThostFtdcMoneyType` | Carries the exch margin for the current request or response. |
| `MarginRateByMoney` | `TThostFtdcRatioType` | Carries the margin rate by money for the current request or response. |
| `MarginRateByVolume` | `TThostFtdcRatioType` | Carries the margin rate by volume for the current request or response. |
| `LastSettlementPrice` | `TThostFtdcPriceType` | Carries the last settlement price for the current request or response. |
| `SettlementPrice` | `TThostFtdcPriceType` | Carries the settlement price for the current request or response. |
| `CloseVolume` | `TThostFtdcVolumeType` | Carries the close volume for the current request or response. |
| `CloseAmount` | `TThostFtdcMoneyType` | Carries the close amount for the current request or response. |
| `TimeFirstVolume` | `TThostFtdcVolumeType` | Carries the time first volume for the current request or response. |
| `InvestUnitID` | `TThostFtdcInvestUnitIDType` | Investment unit identifier used by the account model. |
| `SpecPosiType` | `TThostFtdcSpecPosiTypeType` | Carries the spec posi type for the current request or response. |
| `InstrumentID` | `TThostFtdcInstrumentIDType` | Instrument symbol for the target contract. |
| `CombInstrumentID` | `TThostFtdcInstrumentIDType` | Carries the comb instrument identifier for the current request or response. |

**Structure layout**

```cpp
struct CThostFtdcInvestorPositionDetailField
{

    TThostFtdcOldInstrumentIDType   reserve1;

    TThostFtdcBrokerIDType  BrokerID;

    TThostFtdcInvestorIDType    InvestorID;

    TThostFtdcHedgeFlagType HedgeFlag;

    TThostFtdcDirectionType Direction;

    TThostFtdcDateType  OpenDate;

    TThostFtdcTradeIDType   TradeID;

    TThostFtdcVolumeType    Volume;

    TThostFtdcPriceType OpenPrice;

    TThostFtdcDateType  TradingDay;

    TThostFtdcSettlementIDType  SettlementID;

    TThostFtdcTradeTypeType TradeType;

    TThostFtdcOldInstrumentIDType   reserve2;

    TThostFtdcExchangeIDType    ExchangeID;

    TThostFtdcMoneyType CloseProfitByDate;

    TThostFtdcMoneyType CloseProfitByTrade;

    TThostFtdcMoneyType PositionProfitByDate;

    TThostFtdcMoneyType PositionProfitByTrade;

    TThostFtdcMoneyType Margin;

    TThostFtdcMoneyType ExchMargin;

    TThostFtdcRatioType MarginRateByMoney;

    TThostFtdcRatioType MarginRateByVolume;

    TThostFtdcPriceType LastSettlementPrice;

    TThostFtdcPriceType SettlementPrice;

    TThostFtdcVolumeType    CloseVolume;

    TThostFtdcMoneyType CloseAmount;

    TThostFtdcVolumeType    TimeFirstVolume;

    TThostFtdcInvestUnitIDType  InvestUnitID;

    TThostFtdcSpecPosiTypeType  SpecPosiType;

    TThostFtdcInstrumentIDType  InstrumentID;

    TThostFtdcInstrumentIDType  CombInstrumentID;
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
void MySpi::OnRspQryInvestorPositionDetail() {
    // Mark the event in your session state machine and send the next step if needed.
}
```

**Implementation notes**

- Make callback handlers idempotent because reconnect and replay semantics can surface the same business object more than once.
- Do not block the SPI thread with long business logic; hand the event to a worker queue when processing becomes expensive.

## OnRspQryInvestorProductGroupMargin

`OnRspQryInvestorProductGroupMargin` is an event callback that reports state back from the CTP runtime into the client application.

- Kind: callback
- Owning interface: `CThostFtdcTraderSpi`
- Related symbols: `OnRspQryInvestorProductGroupMargi`, `ReqQryInvestorProductGroupMargin`

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

**Field guide for `CThostFtdcInvestorProductGroupMarginField`**

| Field | Type | Purpose |
| --- | --- | --- |
| `reserve1` | `TThostFtdcOldInstrumentIDType` | Carries the reserve1 for the current request or response. |
| `BrokerID` | `TThostFtdcBrokerIDType` | Broker code that scopes the request or identifies the response owner. |
| `InvestorID` | `TThostFtdcInvestorIDType` | Investor code used by the trading account. |
| `TradingDay` | `TThostFtdcDateType` | Trading date visible to the current trading system session. |
| `SettlementID` | `TThostFtdcSettlementIDType` | Carries the settlement identifier for the current request or response. |
| `FrozenMargin` | `TThostFtdcMoneyType` | Carries the frozen margin for the current request or response. |
| `LongFrozenMargin` | `TThostFtdcMoneyType` | Carries the long frozen margin for the current request or response. |
| `ShortFrozenMargin` | `TThostFtdcMoneyType` | Carries the short frozen margin for the current request or response. |
| `UseMargin` | `TThostFtdcMoneyType` | Carries the use margin for the current request or response. |
| `LongUseMargin` | `TThostFtdcMoneyType` | Carries the long use margin for the current request or response. |
| `ShortUseMargin` | `TThostFtdcMoneyType` | Carries the short use margin for the current request or response. |
| `ExchMargin` | `TThostFtdcMoneyType` | Carries the exch margin for the current request or response. |
| `LongExchMargin` | `TThostFtdcMoneyType` | Carries the long exch margin for the current request or response. |
| `ShortExchMargin` | `TThostFtdcMoneyType` | Carries the short exch margin for the current request or response. |
| `CloseProfit` | `TThostFtdcMoneyType` | Carries the close profit for the current request or response. |
| `FrozenCommission` | `TThostFtdcMoneyType` | Carries the frozen commission for the current request or response. |
| `Commission` | `TThostFtdcMoneyType` | Carries the commission for the current request or response. |
| `FrozenCash` | `TThostFtdcMoneyType` | Carries the frozen cash for the current request or response. |
| `CashIn` | `TThostFtdcMoneyType` | Carries the cash in for the current request or response. |
| `PositionProfit` | `TThostFtdcMoneyType` | Carries the position profit for the current request or response. |
| `OffsetAmount` | `TThostFtdcMoneyType` | Carries the offset amount for the current request or response. |
| `LongOffsetAmount` | `TThostFtdcMoneyType` | Carries the long offset amount for the current request or response. |
| `ShortOffsetAmount` | `TThostFtdcMoneyType` | Carries the short offset amount for the current request or response. |
| `ExchOffsetAmount` | `TThostFtdcMoneyType` | Carries the exch offset amount for the current request or response. |
| `LongExchOffsetAmount` | `TThostFtdcMoneyType` | Carries the long exch offset amount for the current request or response. |
| `ShortExchOffsetAmount` | `TThostFtdcMoneyType` | Carries the short exch offset amount for the current request or response. |
| `HedgeFlag` | `TThostFtdcHedgeFlagType` | Carries the hedge flag for the current request or response. |
| `ExchangeID` | `TThostFtdcExchangeIDType` | Exchange code that disambiguates the target venue. |
| `InvestUnitID` | `TThostFtdcInvestUnitIDType` | Investment unit identifier used by the account model. |
| `ProductGroupID` | `TThostFtdcInstrumentIDType` | Carries the product group identifier for the current request or response. |

**Structure layout**

```cpp
struct CThostFtdcInvestorProductGroupMarginField
{

    TThostFtdcOldInstrumentIDType   reserve1;

    TThostFtdcBrokerIDType  BrokerID;

    TThostFtdcInvestorIDType    InvestorID;

    TThostFtdcDateType  TradingDay;

    TThostFtdcSettlementIDType  SettlementID;

    TThostFtdcMoneyType FrozenMargin;

    TThostFtdcMoneyType LongFrozenMargin;

    TThostFtdcMoneyType ShortFrozenMargin;

    TThostFtdcMoneyType UseMargin;

    TThostFtdcMoneyType LongUseMargin;

    TThostFtdcMoneyType ShortUseMargin;

    TThostFtdcMoneyType ExchMargin;

    TThostFtdcMoneyType LongExchMargin;

    TThostFtdcMoneyType ShortExchMargin;

    TThostFtdcMoneyType CloseProfit;

    TThostFtdcMoneyType FrozenCommission;

    TThostFtdcMoneyType Commission;

    TThostFtdcMoneyType FrozenCash;

    TThostFtdcMoneyType CashIn;

    TThostFtdcMoneyType PositionProfit;

    TThostFtdcMoneyType OffsetAmount;

    TThostFtdcMoneyType LongOffsetAmount;

    TThostFtdcMoneyType ShortOffsetAmount;

    TThostFtdcMoneyType ExchOffsetAmount;

    TThostFtdcMoneyType LongExchOffsetAmount;

    TThostFtdcMoneyType ShortExchOffsetAmount;

    TThostFtdcHedgeFlagType HedgeFlag;

    TThostFtdcExchangeIDType    ExchangeID;

    TThostFtdcInvestUnitIDType  InvestUnitID;

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
void MySpi::OnRspQryInvestorProductGroupMargin() {
    // Mark the event in your session state machine and send the next step if needed.
}
```

**Implementation notes**

- Make callback handlers idempotent because reconnect and replay semantics can surface the same business object more than once.
- Do not block the SPI thread with long business logic; hand the event to a worker queue when processing becomes expensive.

## OnRspQryInvestUnit

`OnRspQryInvestUnit` is an event callback that reports state back from the CTP runtime into the client application.

- Kind: callback
- Owning interface: `CThostFtdcTraderSpi`
- Related symbols: `ReqQryInvestUnit`

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

**Field guide for `CThostFtdcInvestUnitField`**

| Field | Type | Purpose |
| --- | --- | --- |
| `BrokerID` | `TThostFtdcBrokerIDType` | Broker code that scopes the request or identifies the response owner. |
| `InvestorID` | `TThostFtdcInvestorIDType` | Investor code used by the trading account. |
| `InvestUnitID` | `TThostFtdcInvestUnitIDType` | Investment unit identifier used by the account model. |
| `InvestorUnitName` | `TThostFtdcPartyNameType` | Carries the investor unit name for the current request or response. |
| `InvestorGroupID` | `TThostFtdcInvestorIDType` | Carries the investor group identifier for the current request or response. |
| `CommModelID` | `TThostFtdcInvestorIDType` | Carries the comm model identifier for the current request or response. |
| `MarginModelID` | `TThostFtdcInvestorIDType` | Carries the margin model identifier for the current request or response. |
| `AccountID` | `TThostFtdcAccountIDType` | Futures-side account identifier. |
| `CurrencyID` | `TThostFtdcCurrencyIDType` | Currency code used for balance and transfer values. |

**Structure layout**

```cpp
struct CThostFtdcInvestUnitField
{

    TThostFtdcBrokerIDType BrokerID;

    TThostFtdcInvestorIDType InvestorID;

    TThostFtdcInvestUnitIDType InvestUnitID;

    TThostFtdcPartyNameType InvestorUnitName;

    TThostFtdcInvestorIDType InvestorGroupID;

    TThostFtdcInvestorIDType CommModelID;

    TThostFtdcInvestorIDType MarginModelID;

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
void MySpi::OnRspQryInvestUnit() {
    // Mark the event in your session state machine and send the next step if needed.
}
```

**Implementation notes**

- Make callback handlers idempotent because reconnect and replay semantics can surface the same business object more than once.
- Do not block the SPI thread with long business logic; hand the event to a worker queue when processing becomes expensive.

## OnRspQryNotice

`OnRspQryNotice` is an event callback that reports state back from the CTP runtime into the client application.

- Kind: callback
- Owning interface: `CThostFtdcTraderSpi`
- Related symbols: `ReqQryNotice`

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

**Field guide for `CThostFtdcNoticeField`**

| Field | Type | Purpose |
| --- | --- | --- |
| `BrokerID` | `TThostFtdcBrokerIDType` | Broker code that scopes the request or identifies the response owner. |
| `Content` | `TThostFtdcContentType` | Carries the content for the current request or response. |
| `SequenceLabel` | `TThostFtdcSequenceLabelType` | Carries the sequence label for the current request or response. |

**Structure layout**

```cpp
struct CThostFtdcNoticeField
{

    TThostFtdcBrokerIDType BrokerID;

    TThostFtdcContentType Content;

    TThostFtdcSequenceLabelType SequenceLabel;
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
void MySpi::OnRspQryNotice() {
    // Mark the event in your session state machine and send the next step if needed.
}
```

**Implementation notes**

- Make callback handlers idempotent because reconnect and replay semantics can surface the same business object more than once.
- Do not block the SPI thread with long business logic; hand the event to a worker queue when processing becomes expensive.
