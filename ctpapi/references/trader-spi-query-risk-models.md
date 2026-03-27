# CTP trader SPI risk-model query callbacks

This reference covers the SPBM, SPMM, RCAMS, RULE, offset-setting, and related portfolio query callbacks.

| Entry | Kind |
| --- | --- |
| OnRspQrySPBMFutureParameter | callback |
| OnRspQrySPBMOptionParameter | callback |
| OnRspQrySPBMIntraParameter | callback |
| OnRspQrySPBMInterParameter | callback |
| OnRspQrySPBMPortfDefinition | callback |
| OnRspQrySPBMInvestorPortfDef | callback |
| OnRspQryInvestorPortfMarginRatio | callback |
| OnRspQryInvestorProdSPBMDetail | callback |
| OnRspQryInvestorCommoditySPMMMargin | callback |
| OnRspQryInvestorCommodityGroupSPMMMargin | callback |
| OnRspQrySPMMInstParam | callback |
| OnRspQrySPMMProductParam | callback |
| OnRspQrySPBMAddOnInterParameter | callback |
| OnRspQryRCAMSCombProductInfo | callback |
| OnRspQryRCAMSInstrParameter | callback |
| OnRspQryRCAMSIntraParameter | callback |
| OnRspQryRCAMSInterParameter | callback |
| OnRspQryRCAMSShortOptAdjustParam | callback |
| OnRspQryRCAMSInvestorCombPosition | callback |
| OnRspQryInvestorProdRCAMSMargin | callback |
| OnRspQryRULEInstrParameter | callback |
| OnRspQryRULEIntraParameter | callback |
| OnRspQryRULEInterParameter | callback |
| OnRspQryInvestorProdRULEMargin | callback |
| OnRspQryInvestorPortfSetting | callback |
| OnRspQryInvestorInfoCommRec | callback |
| OnRspQryCombLeg | callback |
| OnRspQryOffsetSetting | callback |

## OnRspQrySPBMFutureParameter

`OnRspQrySPBMFutureParameter` is an event callback that reports state back from the CTP runtime into the client application.

- Kind: callback
- Owning interface: `CThostFtdcTraderSpi`
- Related symbols: `ReqQrySPBMFutureParameter`

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

**Field guide for `CThostFtdcSPBMFutureParameterField`**

| Field | Type | Purpose |
| --- | --- | --- |
| `TradingDay` | `TThostFtdcDateType` | Trading date visible to the current trading system session. |
| `ExchangeID` | `TThostFtdcExchangeIDType` | Exchange code that disambiguates the target venue. |
| `InstrumentID` | `TThostFtdcInstrumentIDType` | Instrument symbol for the target contract. |
| `ProdFamilyCode` | `TThostFtdcInstrumentIDType` | Carries the prod family code for the current request or response. |
| `Cvf` | `TThostFtdcVolumeMultipleType` | Carries the cvf for the current request or response. |
| `TimeRange` | `TThostFtdcTimeRangeType` | Carries the time range for the current request or response. |
| `MarginRate` | `TThostFtdcRatioType` | Carries the margin rate for the current request or response. |
| `LockRateX` | `TThostFtdcRatioType` | Carries the lock rate x for the current request or response. |
| `AddOnRate` | `TThostFtdcRatioType` | Carries the add on rate for the current request or response. |
| `PreSettlementPrice` | `TThostFtdcPriceType` | Carries the pre settlement price for the current request or response. |
| `AddOnLockRateX2` | `TThostFtdcRatioType` | Carries the add on lock rate x2 for the current request or response. |

**Structure layout**

```cpp
struct CThostFtdcSPBMFutureParameterField
{

    TThostFtdcDateType  TradingDay;

    TThostFtdcExchangeIDType    ExchangeID;

    TThostFtdcInstrumentIDType  InstrumentID;

    TThostFtdcInstrumentIDType  ProdFamilyCode;

    TThostFtdcVolumeMultipleType    Cvf;

    TThostFtdcTimeRangeType TimeRange;

    TThostFtdcRatioType MarginRate;

    TThostFtdcRatioType LockRateX;

    TThostFtdcRatioType AddOnRate;

    TThostFtdcPriceType PreSettlementPrice;

    TThostFtdcRatioType AddOnLockRateX2;
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
void MySpi::OnRspQrySPBMFutureParameter() {
    // Mark the event in your session state machine and send the next step if needed.
}
```

**Implementation notes**

- Make callback handlers idempotent because reconnect and replay semantics can surface the same business object more than once.
- Do not block the SPI thread with long business logic; hand the event to a worker queue when processing becomes expensive.

## OnRspQrySPBMOptionParameter

`OnRspQrySPBMOptionParameter` is an event callback that reports state back from the CTP runtime into the client application.

- Kind: callback
- Owning interface: `CThostFtdcTraderSpi`
- Related symbols: `ReqQrySPBMOptionParameter`

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

**Field guide for `CThostFtdcSPBMOptionParameterField`**

| Field | Type | Purpose |
| --- | --- | --- |
| `TradingDay` | `TThostFtdcDateType` | Trading date visible to the current trading system session. |
| `ExchangeID` | `TThostFtdcExchangeIDType` | Exchange code that disambiguates the target venue. |
| `InstrumentID` | `TThostFtdcInstrumentIDType` | Instrument symbol for the target contract. |
| `ProdFamilyCode` | `TThostFtdcInstrumentIDType` | Carries the prod family code for the current request or response. |
| `Cvf` | `TThostFtdcVolumeMultipleType` | Carries the cvf for the current request or response. |
| `DownPrice` | `TThostFtdcPriceType` | Carries the down price for the current request or response. |
| `Delta` | `TThostFtdcDeltaType` | Carries the delta for the current request or response. |
| `SlimiDelta` | `TThostFtdcDeltaType` | Carries the slimi delta for the current request or response. |
| `PreSettlementPrice` | `TThostFtdcPriceType` | Carries the pre settlement price for the current request or response. |

**Structure layout**

```cpp
struct CThostFtdcSPBMOptionParameterField
{

    TThostFtdcDateType  TradingDay;

    TThostFtdcExchangeIDType    ExchangeID;

    TThostFtdcInstrumentIDType  InstrumentID;

    TThostFtdcInstrumentIDType  ProdFamilyCode;

    TThostFtdcVolumeMultipleType    Cvf;

    TThostFtdcPriceType DownPrice;

    TThostFtdcDeltaType Delta;

    TThostFtdcDeltaType SlimiDelta;

    TThostFtdcPriceType PreSettlementPrice;
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
void MySpi::OnRspQrySPBMOptionParameter() {
    // Mark the event in your session state machine and send the next step if needed.
}
```

**Implementation notes**

- Make callback handlers idempotent because reconnect and replay semantics can surface the same business object more than once.
- Do not block the SPI thread with long business logic; hand the event to a worker queue when processing becomes expensive.

## OnRspQrySPBMIntraParameter

`OnRspQrySPBMIntraParameter` is an event callback that reports state back from the CTP runtime into the client application.

- Kind: callback
- Owning interface: `CThostFtdcTraderSpi`
- Related symbols: `ReqQrySPBMIntraParameter`

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

**Field guide for `CThostFtdcSPBMIntraParameterField`**

| Field | Type | Purpose |
| --- | --- | --- |
| `TradingDay` | `TThostFtdcDateType` | Trading date visible to the current trading system session. |
| `ExchangeID` | `TThostFtdcExchangeIDType` | Exchange code that disambiguates the target venue. |
| `ProdFamilyCode` | `TThostFtdcInstrumentIDType` | Carries the prod family code for the current request or response. |
| `IntraRateY` | `TThostFtdcRatioType` | Carries the intra rate y for the current request or response. |

**Structure layout**

```cpp
struct CThostFtdcSPBMIntraParameterField
{

    TThostFtdcDateType  TradingDay;

    TThostFtdcExchangeIDType    ExchangeID;

    TThostFtdcInstrumentIDType  ProdFamilyCode;

    TThostFtdcRatioType IntraRateY;
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
void MySpi::OnRspQrySPBMIntraParameter() {
    // Mark the event in your session state machine and send the next step if needed.
}
```

**Implementation notes**

- Make callback handlers idempotent because reconnect and replay semantics can surface the same business object more than once.
- Do not block the SPI thread with long business logic; hand the event to a worker queue when processing becomes expensive.

## OnRspQrySPBMInterParameter

`OnRspQrySPBMInterParameter` is an event callback that reports state back from the CTP runtime into the client application.

- Kind: callback
- Owning interface: `CThostFtdcTraderSpi`
- Related symbols: `ReqQrySPBMInterParameter`

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

**Field guide for `CThostFtdcSPBMInterParameterField`**

| Field | Type | Purpose |
| --- | --- | --- |
| `TradingDay` | `TThostFtdcDateType` | Trading date visible to the current trading system session. |
| `ExchangeID` | `TThostFtdcExchangeIDType` | Exchange code that disambiguates the target venue. |
| `SpreadId` | `TThostFtdcSpreadIdType` | Carries the spread id for the current request or response. |
| `InterRateZ` | `TThostFtdcRatioType` | Carries the inter rate z for the current request or response. |
| `Leg1ProdFamilyCode` | `TThostFtdcInstrumentIDType` | Carries the leg1 prod family code for the current request or response. |
| `Leg2ProdFamilyCode` | `TThostFtdcInstrumentIDType` | Carries the leg2 prod family code for the current request or response. |

**Structure layout**

```cpp
struct CThostFtdcSPBMInterParameterField
{

    TThostFtdcDateType  TradingDay;

    TThostFtdcExchangeIDType    ExchangeID;

    TThostFtdcSpreadIdType  SpreadId;

    TThostFtdcRatioType InterRateZ;

    TThostFtdcInstrumentIDType  Leg1ProdFamilyCode;

    TThostFtdcInstrumentIDType  Leg2ProdFamilyCode;
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
void MySpi::OnRspQrySPBMInterParameter() {
    // Mark the event in your session state machine and send the next step if needed.
}
```

**Implementation notes**

- Make callback handlers idempotent because reconnect and replay semantics can surface the same business object more than once.
- Do not block the SPI thread with long business logic; hand the event to a worker queue when processing becomes expensive.

## OnRspQrySPBMPortfDefinition

`OnRspQrySPBMPortfDefinition` is an event callback that reports state back from the CTP runtime into the client application.

- Kind: callback
- Owning interface: `CThostFtdcTraderSpi`
- Related symbols: `ReqQrySPBMInterParameter`

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

**Field guide for `CThostFtdcSPBMPortfDefinitionField`**

| Field | Type | Purpose |
| --- | --- | --- |
| `ExchangeID` | `TThostFtdcExchangeIDType` | Exchange code that disambiguates the target venue. |
| `PortfolioDefID` | `TThostFtdcPortfolioDefIDType` | Carries the portfolio def identifier for the current request or response. |
| `ProdFamilyCode` | `TThostFtdcInstrumentIDType` | Carries the prod family code for the current request or response. |
| `IsSPBM` | `TThostFtdcBoolType` | Carries the is spbm for the current request or response. |

**Structure layout**

```cpp
struct CThostFtdcSPBMPortfDefinitionField
{

    TThostFtdcExchangeIDType    ExchangeID;

    TThostFtdcPortfolioDefIDType    PortfolioDefID;

    TThostFtdcInstrumentIDType  ProdFamilyCode;

    TThostFtdcBoolType  IsSPBM;
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
void MySpi::OnRspQrySPBMPortfDefinition() {
    // Mark the event in your session state machine and send the next step if needed.
}
```

**Implementation notes**

- Make callback handlers idempotent because reconnect and replay semantics can surface the same business object more than once.
- Do not block the SPI thread with long business logic; hand the event to a worker queue when processing becomes expensive.

## OnRspQrySPBMInvestorPortfDef

`OnRspQrySPBMInvestorPortfDef` is an event callback that reports state back from the CTP runtime into the client application.

- Kind: callback
- Owning interface: `CThostFtdcTraderSpi`
- Related symbols: `ReqQrySPBMInvestorPortfDef`

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

**Field guide for `CThostFtdcSPBMInvestorPortfDefField`**

| Field | Type | Purpose |
| --- | --- | --- |
| `ExchangeID` | `TThostFtdcExchangeIDType` | Exchange code that disambiguates the target venue. |
| `BrokerID` | `TThostFtdcBrokerIDType` | Broker code that scopes the request or identifies the response owner. |
| `InvestorID` | `TThostFtdcInvestorIDType` | Investor code used by the trading account. |
| `PortfolioDefID` | `TThostFtdcPortfolioDefIDType` | Carries the portfolio def identifier for the current request or response. |

**Structure layout**

```cpp
struct CThostFtdcSPBMInvestorPortfDefField
{

    TThostFtdcExchangeIDType    ExchangeID;

    TThostFtdcBrokerIDType  BrokerID;

    TThostFtdcInvestorIDType    InvestorID;

    TThostFtdcPortfolioDefIDType    PortfolioDefID;
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
void MySpi::OnRspQrySPBMInvestorPortfDef() {
    // Mark the event in your session state machine and send the next step if needed.
}
```

**Implementation notes**

- Make callback handlers idempotent because reconnect and replay semantics can surface the same business object more than once.
- Do not block the SPI thread with long business logic; hand the event to a worker queue when processing becomes expensive.

## OnRspQryInvestorPortfMarginRatio

`OnRspQryInvestorPortfMarginRatio` is an event callback that reports state back from the CTP runtime into the client application.

- Kind: callback
- Owning interface: `CThostFtdcTraderSpi`
- Related symbols: `ReqQryInvestorPortfMarginRatio`

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

**Field guide for `CThostFtdcInvestorPortfMarginRatioField`**

| Field | Type | Purpose |
| --- | --- | --- |
| `InvestorRange` | `TThostFtdcInvestorRangeType` | Carries the investor range for the current request or response. |
| `BrokerID` | `TThostFtdcBrokerIDType` | Broker code that scopes the request or identifies the response owner. |
| `InvestorID` | `TThostFtdcInvestorIDType` | Investor code used by the trading account. |
| `ExchangeID` | `TThostFtdcExchangeIDType` | Exchange code that disambiguates the target venue. |
| `MarginRatio` | `TThostFtdcRatioType` | Carries the margin ratio for the current request or response. |
| `ProductGroupID` | `TThostFtdcProductIDType` | Carries the product group identifier for the current request or response. |

**Structure layout**

```cpp
struct CThostFtdcInvestorPortfMarginRatioField
{

    TThostFtdcInvestorRangeType InvestorRange;

    TThostFtdcBrokerIDType  BrokerID;

    TThostFtdcInvestorIDType    InvestorID;

    TThostFtdcExchangeIDType    ExchangeID;

    TThostFtdcRatioType MarginRatio;

    TThostFtdcProductIDType ProductGroupID;
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
void MySpi::OnRspQryInvestorPortfMarginRatio() {
    // Mark the event in your session state machine and send the next step if needed.
}
```

**Implementation notes**

- Make callback handlers idempotent because reconnect and replay semantics can surface the same business object more than once.
- Do not block the SPI thread with long business logic; hand the event to a worker queue when processing becomes expensive.

## OnRspQryInvestorProdSPBMDetail

`OnRspQryInvestorProdSPBMDetail` is an event callback that reports state back from the CTP runtime into the client application.

- Kind: callback
- Owning interface: `CThostFtdcTraderSpi`
- Related symbols: `ReqQryInvestorProdSPBMDetail`

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

**Field guide for `CThostFtdcInvestorProdSPBMDetailField`**

| Field | Type | Purpose |
| --- | --- | --- |
| `ExchangeID` | `TThostFtdcExchangeIDType` | Exchange code that disambiguates the target venue. |
| `BrokerID` | `TThostFtdcBrokerIDType` | Broker code that scopes the request or identifies the response owner. |
| `InvestorID` | `TThostFtdcInvestorIDType` | Investor code used by the trading account. |
| `ProdFamilyCode` | `TThostFtdcInstrumentIDType` | Carries the prod family code for the current request or response. |
| `IntraInstrMargin` | `TThostFtdcMoneyType` | Carries the intra instr margin for the current request or response. |
| `BCollectingMargin` | `TThostFtdcMoneyType` | Carries the b collecting margin for the current request or response. |
| `SCollectingMargin` | `TThostFtdcMoneyType` | Carries the s collecting margin for the current request or response. |
| `IntraProdMargin` | `TThostFtdcMoneyType` | Carries the intra prod margin for the current request or response. |
| `NetMargin` | `TThostFtdcMoneyType` | Carries the net margin for the current request or response. |
| `InterProdMargin` | `TThostFtdcMoneyType` | Carries the inter prod margin for the current request or response. |
| `SingleMargin` | `TThostFtdcMoneyType` | Carries the single margin for the current request or response. |
| `AddOnMargin` | `TThostFtdcMoneyType` | Carries the add on margin for the current request or response. |
| `DeliveryMargin` | `TThostFtdcMoneyType` | Carries the delivery margin for the current request or response. |
| `CallOptionMinRisk` | `TThostFtdcMoneyType` | Carries the call option minimum risk for the current request or response. |
| `PutOptionMinRisk` | `TThostFtdcMoneyType` | Carries the put option minimum risk for the current request or response. |
| `OptionMinRisk` | `TThostFtdcMoneyType` | Carries the option minimum risk for the current request or response. |
| `OptionValueOffset` | `TThostFtdcMoneyType` | Carries the option value offset for the current request or response. |
| `OptionRoyalty` | `TThostFtdcMoneyType` | Carries the option royalty for the current request or response. |
| `RealOptionValueOffset` | `TThostFtdcMoneyType` | Carries the real option value offset for the current request or response. |
| `Margin` | `TThostFtdcMoneyType` | Carries the margin for the current request or response. |
| `ExchMargin` | `TThostFtdcMoneyType` | Carries the exch margin for the current request or response. |

**Structure layout**

```cpp
struct CThostFtdcInvestorProdSPBMDetailField
{

    TThostFtdcExchangeIDType    ExchangeID;

    TThostFtdcBrokerIDType  BrokerID;

    TThostFtdcInvestorIDType    InvestorID;

    TThostFtdcInstrumentIDType  ProdFamilyCode;

    TThostFtdcMoneyType IntraInstrMargin;

    TThostFtdcMoneyType BCollectingMargin;

    TThostFtdcMoneyType SCollectingMargin;

    TThostFtdcMoneyType IntraProdMargin;

    TThostFtdcMoneyType NetMargin;

    TThostFtdcMoneyType InterProdMargin;

    TThostFtdcMoneyType SingleMargin;

    TThostFtdcMoneyType AddOnMargin;

    TThostFtdcMoneyType DeliveryMargin;

    TThostFtdcMoneyType CallOptionMinRisk;

    TThostFtdcMoneyType PutOptionMinRisk;

    TThostFtdcMoneyType OptionMinRisk;

    TThostFtdcMoneyType OptionValueOffset;

    TThostFtdcMoneyType OptionRoyalty;

    TThostFtdcMoneyType RealOptionValueOffset;

    TThostFtdcMoneyType Margin;

    TThostFtdcMoneyType ExchMargin;
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
void MySpi::OnRspQryInvestorProdSPBMDetail() {
    // Mark the event in your session state machine and send the next step if needed.
}
```

**Implementation notes**

- Make callback handlers idempotent because reconnect and replay semantics can surface the same business object more than once.
- Do not block the SPI thread with long business logic; hand the event to a worker queue when processing becomes expensive.

## OnRspQryInvestorCommoditySPMMMargin

`OnRspQryInvestorCommoditySPMMMargin` is an event callback that reports state back from the CTP runtime into the client application.

- Kind: callback
- Owning interface: `CThostFtdcTraderSpi`
- Related symbols: `OnRspQryInvestorCommoditySPMMM`, `ReqQryInvestorCommoditySPMMMargin`, `OnRspQryInvestorProdSPBMDetail`

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

**Field guide for `CThostFtdcInvestorCommoditySPMMMarginField`**

| Field | Type | Purpose |
| --- | --- | --- |
| `ExchangeID` | `TThostFtdcExchangeIDType` | Exchange code that disambiguates the target venue. |
| `BrokerID` | `TThostFtdcBrokerIDType` | Broker code that scopes the request or identifies the response owner. |
| `InvestorID` | `TThostFtdcInvestorIDType` | Investor code used by the trading account. |
| `CommodityID` | `TThostFtdcSPMMProductIDType` | Carries the commodity identifier for the current request or response. |
| `MarginBeforeDiscount` | `TThostFtdcMoneyType` | Carries the margin before discount for the current request or response. |
| `MarginNoDiscount` | `TThostFtdcMoneyType` | Carries the margin no discount for the current request or response. |
| `LongPosRisk` | `TThostFtdcMoneyType` | Carries the long pos risk for the current request or response. |
| `LongOpenFrozenRisk` | `TThostFtdcMoneyType` | Carries the long open frozen risk for the current request or response. |
| `LongCloseFrozenRisk` | `TThostFtdcMoneyType` | Carries the long close frozen risk for the current request or response. |
| `ShortPosRisk` | `TThostFtdcMoneyType` | Carries the short pos risk for the current request or response. |
| `ShortOpenFrozenRisk` | `TThostFtdcMoneyType` | Carries the short open frozen risk for the current request or response. |
| `ShortCloseFrozenRisk` | `TThostFtdcMoneyType` | Carries the short close frozen risk for the current request or response. |
| `IntraCommodityRate` | `TThostFtdcSPMMDiscountRatioType` | Carries the intra commodity rate for the current request or response. |
| `OptionDiscountRate` | `TThostFtdcSPMMDiscountRatioType` | Carries the option discount rate for the current request or response. |
| `PosDiscount` | `TThostFtdcMoneyType` | Carries the pos discount for the current request or response. |
| `OpenFrozenDiscount` | `TThostFtdcMoneyType` | Carries the open frozen discount for the current request or response. |
| `NetRisk` | `TThostFtdcMoneyType` | Carries the net risk for the current request or response. |
| `CloseFrozenMargin` | `TThostFtdcMoneyType` | Carries the close frozen margin for the current request or response. |
| `FrozenCommission` | `TThostFtdcMoneyType` | Carries the frozen commission for the current request or response. |
| `Commission` | `TThostFtdcMoneyType` | Carries the commission for the current request or response. |
| `FrozenCash` | `TThostFtdcMoneyType` | Carries the frozen cash for the current request or response. |
| `CashIn` | `TThostFtdcMoneyType` | Carries the cash in for the current request or response. |
| `StrikeFrozenMargin` | `TThostFtdcMoneyType` | Carries the strike frozen margin for the current request or response. |

**Structure layout**

```cpp
struct CThostFtdcInvestorCommoditySPMMMarginField
{

    TThostFtdcExchangeIDType    ExchangeID;

    TThostFtdcBrokerIDType  BrokerID;

    TThostFtdcInvestorIDType    InvestorID;

    TThostFtdcSPMMProductIDType CommodityID;

    TThostFtdcMoneyType MarginBeforeDiscount;

    TThostFtdcMoneyType MarginNoDiscount;

    TThostFtdcMoneyType LongPosRisk;

    TThostFtdcMoneyType LongOpenFrozenRisk;

    TThostFtdcMoneyType LongCloseFrozenRisk;

    TThostFtdcMoneyType ShortPosRisk;

    TThostFtdcMoneyType ShortOpenFrozenRisk;

    TThostFtdcMoneyType ShortCloseFrozenRisk;

    TThostFtdcSPMMDiscountRatioType IntraCommodityRate;

    TThostFtdcSPMMDiscountRatioType OptionDiscountRate;

    TThostFtdcMoneyType PosDiscount;

    TThostFtdcMoneyType OpenFrozenDiscount;

    TThostFtdcMoneyType NetRisk;

    TThostFtdcMoneyType CloseFrozenMargin;

    TThostFtdcMoneyType FrozenCommission;

    TThostFtdcMoneyType Commission;

    TThostFtdcMoneyType FrozenCash;

    TThostFtdcMoneyType CashIn;

    TThostFtdcMoneyType StrikeFrozenMargin;
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
void MySpi::OnRspQryInvestorCommoditySPMMMargin() {
    // Mark the event in your session state machine and send the next step if needed.
}
```

**Implementation notes**

- Make callback handlers idempotent because reconnect and replay semantics can surface the same business object more than once.
- Do not block the SPI thread with long business logic; hand the event to a worker queue when processing becomes expensive.

## OnRspQryInvestorCommodityGroupSPMMMargin

`OnRspQryInvestorCommodityGroupSPMMMargin` is an event callback that reports state back from the CTP runtime into the client application.

- Kind: callback
- Owning interface: `CThostFtdcTraderSpi`
- Related symbols: `OnRspQryInvestorCommodityGroupSP`, `ReqQryInvestorCommodityGroupSPMMMargin`

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

**Field guide for `CThostFtdcInvestorCommodityGroupSPMMMarginField`**

| Field | Type | Purpose |
| --- | --- | --- |
| `ExchangeID` | `TThostFtdcExchangeIDType` | Exchange code that disambiguates the target venue. |
| `BrokerID` | `TThostFtdcBrokerIDType` | Broker code that scopes the request or identifies the response owner. |
| `InvestorID` | `TThostFtdcInvestorIDType` | Investor code used by the trading account. |
| `CommodityGroupID` | `TThostFtdcSPMMProductIDType` | Carries the commodity group identifier for the current request or response. |
| `MarginBeforeDiscount` | `TThostFtdcMoneyType` | Carries the margin before discount for the current request or response. |
| `MarginNoDiscount` | `TThostFtdcMoneyType` | Carries the margin no discount for the current request or response. |
| `LongRisk` | `TThostFtdcMoneyType` | Carries the long risk for the current request or response. |
| `ShortRisk` | `TThostFtdcMoneyType` | Carries the short risk for the current request or response. |
| `CloseFrozenMargin` | `TThostFtdcMoneyType` | Carries the close frozen margin for the current request or response. |
| `InterCommodityRate` | `TThostFtdcSPMMDiscountRatioType` | Carries the inter commodity rate for the current request or response. |
| `MiniMarginRatio` | `TThostFtdcSPMMDiscountRatioType` | Carries the mini margin ratio for the current request or response. |
| `AdjustRatio` | `TThostFtdcRatioType` | Carries the adjust ratio for the current request or response. |
| `IntraCommodityDiscount` | `TThostFtdcMoneyType` | Carries the intra commodity discount for the current request or response. |
| `InterCommodityDiscount` | `TThostFtdcMoneyType` | Carries the inter commodity discount for the current request or response. |
| `ExchMargin` | `TThostFtdcMoneyType` | Carries the exch margin for the current request or response. |
| `InvestorMargin` | `TThostFtdcMoneyType` | Carries the investor margin for the current request or response. |
| `FrozenCommission` | `TThostFtdcMoneyType` | Carries the frozen commission for the current request or response. |
| `Commission` | `TThostFtdcMoneyType` | Carries the commission for the current request or response. |
| `FrozenCash` | `TThostFtdcMoneyType` | Carries the frozen cash for the current request or response. |
| `CashIn` | `TThostFtdcMoneyType` | Carries the cash in for the current request or response. |
| `StrikeFrozenMargin` | `TThostFtdcMoneyType` | Carries the strike frozen margin for the current request or response. |

**Structure layout**

```cpp
struct CThostFtdcInvestorCommodityGroupSPMMMarginField
{

    TThostFtdcExchangeIDType    ExchangeID;

    TThostFtdcBrokerIDType  BrokerID;

    TThostFtdcInvestorIDType    InvestorID;

    TThostFtdcSPMMProductIDType CommodityGroupID;

    TThostFtdcMoneyType MarginBeforeDiscount;

    TThostFtdcMoneyType MarginNoDiscount;

    TThostFtdcMoneyType LongRisk;

    TThostFtdcMoneyType ShortRisk;

    TThostFtdcMoneyType CloseFrozenMargin;

    TThostFtdcSPMMDiscountRatioType InterCommodityRate;

    TThostFtdcSPMMDiscountRatioType MiniMarginRatio;

    TThostFtdcRatioType AdjustRatio;

    TThostFtdcMoneyType IntraCommodityDiscount;

    TThostFtdcMoneyType InterCommodityDiscount;

    TThostFtdcMoneyType ExchMargin;

    TThostFtdcMoneyType InvestorMargin;

    TThostFtdcMoneyType FrozenCommission;

    TThostFtdcMoneyType Commission;

    TThostFtdcMoneyType FrozenCash;

    TThostFtdcMoneyType CashIn;

    TThostFtdcMoneyType StrikeFrozenMargin;
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
void MySpi::OnRspQryInvestorCommodityGroupSPMMMargin() {
    // Mark the event in your session state machine and send the next step if needed.
}
```

**Implementation notes**

- Make callback handlers idempotent because reconnect and replay semantics can surface the same business object more than once.
- Do not block the SPI thread with long business logic; hand the event to a worker queue when processing becomes expensive.

## OnRspQrySPMMInstParam

`OnRspQrySPMMInstParam` is an event callback that reports state back from the CTP runtime into the client application.

- Kind: callback
- Owning interface: `CThostFtdcTraderSpi`
- Related symbols: `ReqQrySPMMInstParam`

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

**Field guide for `CThostFtdcSPMMInstParamField`**

| Field | Type | Purpose |
| --- | --- | --- |
| `ExchangeID` | `TThostFtdcExchangeIDType` | Exchange code that disambiguates the target venue. |
| `InstrumentID` | `TThostFtdcInstrumentIDType` | Instrument symbol for the target contract. |
| `InstMarginCalID` | `TThostFtdcInstMarginCalIDType` | Carries the inst margin cal identifier for the current request or response. |
| `CommodityID` | `TThostFtdcSPMMProductIDType` | Carries the commodity identifier for the current request or response. |
| `CommodityGroupID` | `TThostFtdcSPMMProductIDType` | Carries the commodity group identifier for the current request or response. |

**Structure layout**

```cpp
struct CThostFtdcSPMMInstParamField
{

    TThostFtdcExchangeIDType    ExchangeID;

    TThostFtdcInstrumentIDType  InstrumentID;

    TThostFtdcInstMarginCalIDType   InstMarginCalID;

    TThostFtdcSPMMProductIDType CommodityID;

    TThostFtdcSPMMProductIDType CommodityGroupID;
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
void MySpi::OnRspQrySPMMInstParam() {
    // Mark the event in your session state machine and send the next step if needed.
}
```

**Implementation notes**

- Make callback handlers idempotent because reconnect and replay semantics can surface the same business object more than once.
- Do not block the SPI thread with long business logic; hand the event to a worker queue when processing becomes expensive.

## OnRspQrySPMMProductParam

`OnRspQrySPMMProductParam` is an event callback that reports state back from the CTP runtime into the client application.

- Kind: callback
- Owning interface: `CThostFtdcTraderSpi`
- Related symbols: `ReqQrySPMMProductParam`

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

**Field guide for `CThostFtdcSPMMProductParamField`**

| Field | Type | Purpose |
| --- | --- | --- |
| `ExchangeID` | `TThostFtdcExchangeIDType` | Exchange code that disambiguates the target venue. |
| `ProductID` | `TThostFtdcSPMMProductIDType` | Carries the product identifier for the current request or response. |
| `CommodityID` | `TThostFtdcSPMMProductIDType` | Carries the commodity identifier for the current request or response. |
| `CommodityGroupID` | `TThostFtdcSPMMProductIDType` | Carries the commodity group identifier for the current request or response. |

**Structure layout**

```cpp
struct CThostFtdcSPMMProductParamField
{

    TThostFtdcExchangeIDType    ExchangeID;

    TThostFtdcSPMMProductIDType ProductID;

    TThostFtdcSPMMProductIDType CommodityID;

    TThostFtdcSPMMProductIDType CommodityGroupID;
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
void MySpi::OnRspQrySPMMProductParam() {
    // Mark the event in your session state machine and send the next step if needed.
}
```

**Implementation notes**

- Make callback handlers idempotent because reconnect and replay semantics can surface the same business object more than once.
- Do not block the SPI thread with long business logic; hand the event to a worker queue when processing becomes expensive.

## OnRspQrySPBMAddOnInterParameter

`OnRspQrySPBMAddOnInterParameter` is an event callback that reports state back from the CTP runtime into the client application.

- Kind: callback
- Owning interface: `CThostFtdcTraderSpi`
- Related symbols: `ReqQrySPBMAddOnInterParameter`

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

**Field guide for `CThostFtdcSPBMAddOnInterParameterField`**

| Field | Type | Purpose |
| --- | --- | --- |
| `TradingDay` | `TThostFtdcDateType` | Trading date visible to the current trading system session. |
| `ExchangeID` | `TThostFtdcExchangeIDType` | Exchange code that disambiguates the target venue. |
| `SpreadId` | `TThostFtdcSpreadIdType` | Carries the spread id for the current request or response. |
| `AddOnInterRateZ2` | `TThostFtdcRatioType` | Carries the add on inter rate z2 for the current request or response. |
| `Leg1ProdFamilyCode` | `TThostFtdcInstrumentIDType` | Carries the leg1 prod family code for the current request or response. |
| `Leg2ProdFamilyCode` | `TThostFtdcInstrumentIDType` | Carries the leg2 prod family code for the current request or response. |

**Structure layout**

```cpp
struct CThostFtdcSPBMAddOnInterParameterField
{

    TThostFtdcDateType  TradingDay;

    TThostFtdcExchangeIDType    ExchangeID;

    TThostFtdcSpreadIdType  SpreadId;

    TThostFtdcRatioType AddOnInterRateZ2;

    TThostFtdcInstrumentIDType  Leg1ProdFamilyCode;

    TThostFtdcInstrumentIDType  Leg2ProdFamilyCode;
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
void MySpi::OnRspQrySPBMAddOnInterParameter() {
    // Mark the event in your session state machine and send the next step if needed.
}
```

**Implementation notes**

- Make callback handlers idempotent because reconnect and replay semantics can surface the same business object more than once.
- Do not block the SPI thread with long business logic; hand the event to a worker queue when processing becomes expensive.

## OnRspQryRCAMSCombProductInfo

`OnRspQryRCAMSCombProductInfo` is an event callback that reports state back from the CTP runtime into the client application.

- Kind: callback
- Owning interface: `CThostFtdcTraderSpi`
- Related symbols: `ReqQryRCAMSCombProductInfo`, `OnRspQrySPBMAddOnInterParameter`

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

**Field guide for `CThostFtdcSPBMAddOnInterParameterField`**

| Field | Type | Purpose |
| --- | --- | --- |
| `TradingDay` | `TThostFtdcDateType` | Trading date visible to the current trading system session. |
| `ExchangeID` | `TThostFtdcExchangeIDType` | Exchange code that disambiguates the target venue. |
| `SpreadId` | `TThostFtdcSpreadIdType` | Carries the spread id for the current request or response. |
| `AddOnInterRateZ2` | `TThostFtdcRatioType` | Carries the add on inter rate z2 for the current request or response. |
| `Leg1ProdFamilyCode` | `TThostFtdcInstrumentIDType` | Carries the leg1 prod family code for the current request or response. |
| `Leg2ProdFamilyCode` | `TThostFtdcInstrumentIDType` | Carries the leg2 prod family code for the current request or response. |

**Structure layout**

```cpp
struct CThostFtdcSPBMAddOnInterParameterField
{

    TThostFtdcDateType  TradingDay;

    TThostFtdcExchangeIDType    ExchangeID;

    TThostFtdcSpreadIdType  SpreadId;

    TThostFtdcRatioType AddOnInterRateZ2;

    TThostFtdcInstrumentIDType  Leg1ProdFamilyCode;

    TThostFtdcInstrumentIDType  Leg2ProdFamilyCode;
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
void MySpi::OnRspQryRCAMSCombProductInfo() {
    // Mark the event in your session state machine and send the next step if needed.
}
```

**Implementation notes**

- Make callback handlers idempotent because reconnect and replay semantics can surface the same business object more than once.
- Do not block the SPI thread with long business logic; hand the event to a worker queue when processing becomes expensive.

## OnRspQryRCAMSInstrParameter

`OnRspQryRCAMSInstrParameter` is an event callback that reports state back from the CTP runtime into the client application.

- Kind: callback
- Owning interface: `CThostFtdcTraderSpi`
- Related symbols: `ReqQryRCAMSInstrParameter`

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

**Field guide for `CThostFtdcRCAMSInstrParameterField`**

| Field | Type | Purpose |
| --- | --- | --- |
| `TradingDay` | `TThostFtdcDateType` | Trading date visible to the current trading system session. |
| `ExchangeID` | `TThostFtdcExchangeIDType` | Exchange code that disambiguates the target venue. |
| `ProductID` | `TThostFtdcProductIDType` | Carries the product identifier for the current request or response. |
| `HedgeRate` | `TThostFtdcHedgeRateType` | Carries the hedge rate for the current request or response. |

**Structure layout**

```cpp
struct CThostFtdcRCAMSInstrParameterField
{

    TThostFtdcDateType  TradingDay;

    TThostFtdcExchangeIDType    ExchangeID;

    TThostFtdcProductIDType ProductID;

    TThostFtdcHedgeRateType HedgeRate;
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
void MySpi::OnRspQryRCAMSInstrParameter() {
    // Mark the event in your session state machine and send the next step if needed.
}
```

**Implementation notes**

- Make callback handlers idempotent because reconnect and replay semantics can surface the same business object more than once.
- Do not block the SPI thread with long business logic; hand the event to a worker queue when processing becomes expensive.

## OnRspQryRCAMSIntraParameter

`OnRspQryRCAMSIntraParameter` is an event callback that reports state back from the CTP runtime into the client application.

- Kind: callback
- Owning interface: `CThostFtdcTraderSpi`
- Related symbols: `ReqQryRCAMSIntraParameter`

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

**Field guide for `CThostFtdcRCAMSIntraParameterField`**

| Field | Type | Purpose |
| --- | --- | --- |
| `TradingDay` | `TThostFtdcDateType` | Trading date visible to the current trading system session. |
| `ExchangeID` | `TThostFtdcExchangeIDType` | Exchange code that disambiguates the target venue. |
| `CombProductID` | `TThostFtdcProductIDType` | Carries the comb product identifier for the current request or response. |
| `HedgeRate` | `TThostFtdcHedgeRateType` | Carries the hedge rate for the current request or response. |

**Structure layout**

```cpp
struct CThostFtdcRCAMSIntraParameterField
{

    TThostFtdcDateType  TradingDay;

    TThostFtdcExchangeIDType    ExchangeID;

    TThostFtdcProductIDType CombProductID;

    TThostFtdcHedgeRateType HedgeRate;
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
void MySpi::OnRspQryRCAMSIntraParameter() {
    // Mark the event in your session state machine and send the next step if needed.
}
```

**Implementation notes**

- Make callback handlers idempotent because reconnect and replay semantics can surface the same business object more than once.
- Do not block the SPI thread with long business logic; hand the event to a worker queue when processing becomes expensive.

## OnRspQryRCAMSInterParameter

`OnRspQryRCAMSInterParameter` is an event callback that reports state back from the CTP runtime into the client application.

- Kind: callback
- Owning interface: `CThostFtdcTraderSpi`
- Related symbols: `ReqQryRCAMSInterParameter`

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

**Field guide for `CThostFtdcRCAMSInterParameterField`**

| Field | Type | Purpose |
| --- | --- | --- |
| `TradingDay` | `TThostFtdcDateType` | Trading date visible to the current trading system session. |
| `ExchangeID` | `TThostFtdcExchangeIDType` | Exchange code that disambiguates the target venue. |
| `ProductGroupID` | `TThostFtdcProductIDType` | Carries the product group identifier for the current request or response. |
| `Priority` | `TThostFtdcRCAMSPriorityType` | Carries the priority for the current request or response. |
| `CreditRate` | `TThostFtdcHedgeRateType` | Carries the credit rate for the current request or response. |
| `CombProduct1` | `TThostFtdcProductIDType` | Carries the comb product1 for the current request or response. |
| `CombProduct2` | `TThostFtdcProductIDType` | Carries the comb product2 for the current request or response. |

**Structure layout**

```cpp
struct CThostFtdcRCAMSInterParameterField
{

    TThostFtdcDateType  TradingDay;

    TThostFtdcExchangeIDType    ExchangeID;

    TThostFtdcProductIDType ProductGroupID;

    TThostFtdcRCAMSPriorityType Priority;

    TThostFtdcHedgeRateType CreditRate;

    TThostFtdcProductIDType CombProduct1;

    TThostFtdcProductIDType CombProduct2;
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
void MySpi::OnRspQryRCAMSInterParameter() {
    // Mark the event in your session state machine and send the next step if needed.
}
```

**Implementation notes**

- Make callback handlers idempotent because reconnect and replay semantics can surface the same business object more than once.
- Do not block the SPI thread with long business logic; hand the event to a worker queue when processing becomes expensive.

## OnRspQryRCAMSShortOptAdjustParam

`OnRspQryRCAMSShortOptAdjustParam` is an event callback that reports state back from the CTP runtime into the client application.

- Kind: callback
- Owning interface: `CThostFtdcTraderSpi`
- Related symbols: `OnRspQryRCAMSShortOptAdjustPara`, `ReqQryRCAMSShortOptAdjustParam`

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

**Field guide for `CThostFtdcRCAMSShortOptAdjustParamField`**

| Field | Type | Purpose |
| --- | --- | --- |
| `TradingDay` | `TThostFtdcDateType` | Trading date visible to the current trading system session. |
| `ExchangeID` | `TThostFtdcExchangeIDType` | Exchange code that disambiguates the target venue. |
| `CombProductID` | `TThostFtdcProductIDType` | Carries the comb product identifier for the current request or response. |
| `HedgeFlag` | `TThostFtdcHedgeFlagType` | Carries the hedge flag for the current request or response. |
| `AdjustValue` | `TThostFtdcAdjustValueType` | Carries the adjust value for the current request or response. |

**Structure layout**

```cpp
struct CThostFtdcRCAMSShortOptAdjustParamField
{

    TThostFtdcDateType  TradingDay;

    TThostFtdcExchangeIDType    ExchangeID;

    TThostFtdcProductIDType CombProductID;

    TThostFtdcHedgeFlagType HedgeFlag;

    TThostFtdcAdjustValueType   AdjustValue;
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
void MySpi::OnRspQryRCAMSShortOptAdjustParam() {
    // Mark the event in your session state machine and send the next step if needed.
}
```

**Implementation notes**

- Make callback handlers idempotent because reconnect and replay semantics can surface the same business object more than once.
- Do not block the SPI thread with long business logic; hand the event to a worker queue when processing becomes expensive.

## OnRspQryRCAMSInvestorCombPosition

`OnRspQryRCAMSInvestorCombPosition` is an event callback that reports state back from the CTP runtime into the client application.

- Kind: callback
- Owning interface: `CThostFtdcTraderSpi`
- Related symbols: `OnRspQryRCAMSInvestorCombPositio`, `ReqQryRCAMSInvestorCombPosition`

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

**Field guide for `CThostFtdcRCAMSInvestorCombPositionField`**

| Field | Type | Purpose |
| --- | --- | --- |
| `ExchangeID` | `TThostFtdcExchangeIDType` | Exchange code that disambiguates the target venue. |
| `BrokerID` | `TThostFtdcBrokerIDType` | Broker code that scopes the request or identifies the response owner. |
| `InvestorID` | `TThostFtdcInvestorIDType` | Investor code used by the trading account. |
| `InstrumentID` | `TThostFtdcInstrumentIDType` | Instrument symbol for the target contract. |
| `HedgeFlag` | `TThostFtdcHedgeFlagType` | Carries the hedge flag for the current request or response. |
| `PosiDirection` | `TThostFtdcPosiDirectionType` | Carries the posi direction for the current request or response. |
| `CombInstrumentID` | `TThostFtdcInstrumentIDType` | Carries the comb instrument identifier for the current request or response. |
| `LegID` | `TThostFtdcLegIDType` | Carries the leg identifier for the current request or response. |
| `ExchangeInstID` | `TThostFtdcExchangeInstIDType` | Carries the exchange inst identifier for the current request or response. |
| `TotalAmt` | `TThostFtdcVolumeType` | Carries the total amt for the current request or response. |
| `ExchMargin` | `TThostFtdcMoneyType` | Carries the exch margin for the current request or response. |
| `Margin` | `TThostFtdcMoneyType` | Carries the margin for the current request or response. |

**Structure layout**

```cpp
struct CThostFtdcRCAMSInvestorCombPositionField
{

    TThostFtdcExchangeIDType    ExchangeID;

    TThostFtdcBrokerIDType  BrokerID;

    TThostFtdcInvestorIDType    InvestorID;

    TThostFtdcInstrumentIDType  InstrumentID;

    TThostFtdcHedgeFlagType HedgeFlag;

    TThostFtdcPosiDirectionType PosiDirection;

    TThostFtdcInstrumentIDType  CombInstrumentID;

    TThostFtdcLegIDType LegID;

    TThostFtdcExchangeInstIDType    ExchangeInstID;

    TThostFtdcVolumeType    TotalAmt;

    TThostFtdcMoneyType ExchMargin;

    TThostFtdcMoneyType Margin;
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
void MySpi::OnRspQryRCAMSInvestorCombPosition() {
    // Mark the event in your session state machine and send the next step if needed.
}
```

**Implementation notes**

- Make callback handlers idempotent because reconnect and replay semantics can surface the same business object more than once.
- Do not block the SPI thread with long business logic; hand the event to a worker queue when processing becomes expensive.

## OnRspQryInvestorProdRCAMSMargin

`OnRspQryInvestorProdRCAMSMargin` is an event callback that reports state back from the CTP runtime into the client application.

- Kind: callback
- Owning interface: `CThostFtdcTraderSpi`
- Related symbols: `ReqQryInvestorProdRCAMSMargin`

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

**Field guide for `CThostFtdcInvestorProdRCAMSMarginField`**

| Field | Type | Purpose |
| --- | --- | --- |
| `ExchangeID` | `TThostFtdcExchangeIDType` | Exchange code that disambiguates the target venue. |
| `BrokerID` | `TThostFtdcBrokerIDType` | Broker code that scopes the request or identifies the response owner. |
| `InvestorID` | `TThostFtdcInvestorIDType` | Investor code used by the trading account. |
| `CombProductID` | `TThostFtdcProductIDType` | Carries the comb product identifier for the current request or response. |
| `HedgeFlag` | `TThostFtdcHedgeFlagType` | Carries the hedge flag for the current request or response. |
| `ProductGroupID` | `TThostFtdcProductIDType` | Carries the product group identifier for the current request or response. |
| `RiskBeforeDiscount` | `TThostFtdcMoneyType` | Carries the risk before discount for the current request or response. |
| `IntraInstrRisk` | `TThostFtdcMoneyType` | Carries the intra instr risk for the current request or response. |
| `BPosRisk` | `TThostFtdcMoneyType` | Carries the b pos risk for the current request or response. |
| `SPosRisk` | `TThostFtdcMoneyType` | Carries the s pos risk for the current request or response. |
| `IntraProdRisk` | `TThostFtdcMoneyType` | Carries the intra prod risk for the current request or response. |
| `NetRisk` | `TThostFtdcMoneyType` | Carries the net risk for the current request or response. |
| `InterProdRisk` | `TThostFtdcMoneyType` | Carries the inter prod risk for the current request or response. |
| `ShortOptRiskAdj` | `TThostFtdcMoneyType` | Carries the short opt risk adj for the current request or response. |
| `OptionRoyalty` | `TThostFtdcMoneyType` | Carries the option royalty for the current request or response. |
| `MMSACloseFrozenMargin` | `TThostFtdcMoneyType` | Carries the mmsa close frozen margin for the current request or response. |
| `CloseCombFrozenMargin` | `TThostFtdcMoneyType` | Carries the close comb frozen margin for the current request or response. |
| `CloseFrozenMargin` | `TThostFtdcMoneyType` | Carries the close frozen margin for the current request or response. |
| `MMSAOpenFrozenMargin` | `TThostFtdcMoneyType` | Carries the mmsa open frozen margin for the current request or response. |
| `DeliveryOpenFrozenMargin` | `TThostFtdcMoneyType` | Carries the delivery open frozen margin for the current request or response. |
| `OpenFrozenMargin` | `TThostFtdcMoneyType` | Carries the open frozen margin for the current request or response. |
| `UseFrozenMargin` | `TThostFtdcMoneyType` | Carries the use frozen margin for the current request or response. |
| `MMSAExchMargin` | `TThostFtdcMoneyType` | Carries the mmsa exch margin for the current request or response. |
| `DeliveryExchMargin` | `TThostFtdcMoneyType` | Carries the delivery exch margin for the current request or response. |
| `CombExchMargin` | `TThostFtdcMoneyType` | Carries the comb exch margin for the current request or response. |
| `ExchMargin` | `TThostFtdcMoneyType` | Carries the exch margin for the current request or response. |
| `UseMargin` | `TThostFtdcMoneyType` | Carries the use margin for the current request or response. |

**Structure layout**

```cpp
struct CThostFtdcInvestorProdRCAMSMarginField
{

    TThostFtdcExchangeIDType    ExchangeID;

    TThostFtdcBrokerIDType  BrokerID;

    TThostFtdcInvestorIDType    InvestorID;

    TThostFtdcProductIDType CombProductID;

    TThostFtdcHedgeFlagType HedgeFlag;

    TThostFtdcProductIDType ProductGroupID;

    TThostFtdcMoneyType RiskBeforeDiscount;

    TThostFtdcMoneyType IntraInstrRisk;

    TThostFtdcMoneyType BPosRisk;

    TThostFtdcMoneyType SPosRisk;

    TThostFtdcMoneyType IntraProdRisk;

    TThostFtdcMoneyType NetRisk;

    TThostFtdcMoneyType InterProdRisk;

    TThostFtdcMoneyType ShortOptRiskAdj;

    TThostFtdcMoneyType OptionRoyalty;

    TThostFtdcMoneyType MMSACloseFrozenMargin;

    TThostFtdcMoneyType CloseCombFrozenMargin;

    TThostFtdcMoneyType CloseFrozenMargin;

    TThostFtdcMoneyType MMSAOpenFrozenMargin;

    TThostFtdcMoneyType DeliveryOpenFrozenMargin;

    TThostFtdcMoneyType OpenFrozenMargin;

    TThostFtdcMoneyType UseFrozenMargin;

    TThostFtdcMoneyType MMSAExchMargin;

    TThostFtdcMoneyType DeliveryExchMargin;

    TThostFtdcMoneyType CombExchMargin;

    TThostFtdcMoneyType ExchMargin;

    TThostFtdcMoneyType UseMargin;
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
void MySpi::OnRspQryInvestorProdRCAMSMargin() {
    // Mark the event in your session state machine and send the next step if needed.
}
```

**Implementation notes**

- Make callback handlers idempotent because reconnect and replay semantics can surface the same business object more than once.
- Do not block the SPI thread with long business logic; hand the event to a worker queue when processing becomes expensive.

## OnRspQryRULEInstrParameter

`OnRspQryRULEInstrParameter` is an event callback that reports state back from the CTP runtime into the client application.

- Kind: callback
- Owning interface: `CThostFtdcTraderSpi`
- Related symbols: `ReqQryRULEInstrParameter`

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

**Field guide for `CThostFtdcRULEInstrParameterField`**

| Field | Type | Purpose |
| --- | --- | --- |
| `TradingDay` | `TThostFtdcDateType` | Trading date visible to the current trading system session. |
| `ExchangeID` | `TThostFtdcExchangeIDType` | Exchange code that disambiguates the target venue. |
| `InstrumentID` | `TThostFtdcInstrumentIDType` | Instrument symbol for the target contract. |
| `InstrumentClass` | `TThostFtdcInstrumentClassType` | Carries the instrument class for the current request or response. |
| `StdInstrumentID` | `TThostFtdcInstrumentIDType` | Carries the std instrument identifier for the current request or response. |
| `BSpecRatio` | `TThostFtdcRatioType` | Carries the b spec ratio for the current request or response. |
| `SSpecRatio` | `TThostFtdcRatioType` | Carries the s spec ratio for the current request or response. |
| `BHedgeRatio` | `TThostFtdcRatioType` | Carries the b hedge ratio for the current request or response. |
| `SHedgeRatio` | `TThostFtdcRatioType` | Carries the s hedge ratio for the current request or response. |
| `BAddOnMargin` | `TThostFtdcMoneyType` | Carries the b add on margin for the current request or response. |
| `SAddOnMargin` | `TThostFtdcMoneyType` | Carries the s add on margin for the current request or response. |
| `CommodityGroupID` | `TThostFtdcCommodityGroupIDType` | Carries the commodity group identifier for the current request or response. |

**Structure layout**

```cpp
struct CThostFtdcRULEInstrParameterField
{

    TThostFtdcDateType  TradingDay;

    TThostFtdcExchangeIDType    ExchangeID;

    TThostFtdcInstrumentIDType  InstrumentID;

    TThostFtdcInstrumentClassType   InstrumentClass;

    TThostFtdcInstrumentIDType  StdInstrumentID;

    TThostFtdcRatioType BSpecRatio;

    TThostFtdcRatioType SSpecRatio;

    TThostFtdcRatioType BHedgeRatio;

    TThostFtdcRatioType SHedgeRatio;

    TThostFtdcMoneyType BAddOnMargin;

    TThostFtdcMoneyType SAddOnMargin;

    TThostFtdcCommodityGroupIDType  CommodityGroupID;
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
void MySpi::OnRspQryRULEInstrParameter() {
    // Mark the event in your session state machine and send the next step if needed.
}
```

**Implementation notes**

- Make callback handlers idempotent because reconnect and replay semantics can surface the same business object more than once.
- Do not block the SPI thread with long business logic; hand the event to a worker queue when processing becomes expensive.

## OnRspQryRULEIntraParameter

`OnRspQryRULEIntraParameter` is an event callback that reports state back from the CTP runtime into the client application.

- Kind: callback
- Owning interface: `CThostFtdcTraderSpi`
- Related symbols: `ReqQryRULEIntraParameter`

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

**Field guide for `CThostFtdcRULEIntraParameterField`**

| Field | Type | Purpose |
| --- | --- | --- |
| `TradingDay` | `TThostFtdcDateType` | Trading date visible to the current trading system session. |
| `ExchangeID` | `TThostFtdcExchangeIDType` | Exchange code that disambiguates the target venue. |
| `ProdFamilyCode` | `TThostFtdcInstrumentIDType` | Carries the prod family code for the current request or response. |
| `StdInstrumentID` | `TThostFtdcInstrumentIDType` | Carries the std instrument identifier for the current request or response. |
| `StdInstrMargin` | `TThostFtdcMoneyType` | Carries the std instr margin for the current request or response. |
| `UsualIntraRate` | `TThostFtdcRatioType` | Carries the usual intra rate for the current request or response. |
| `DeliveryIntraRate` | `TThostFtdcRatioType` | Carries the delivery intra rate for the current request or response. |

**Structure layout**

```cpp
struct CThostFtdcRULEIntraParameterField
{

    TThostFtdcDateType  TradingDay;

    TThostFtdcExchangeIDType    ExchangeID;

    TThostFtdcInstrumentIDType  ProdFamilyCode;

    TThostFtdcInstrumentIDType  StdInstrumentID;

    TThostFtdcMoneyType StdInstrMargin;

    TThostFtdcRatioType UsualIntraRate;

    TThostFtdcRatioType DeliveryIntraRate;
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
void MySpi::OnRspQryRULEIntraParameter() {
    // Mark the event in your session state machine and send the next step if needed.
}
```

**Implementation notes**

- Make callback handlers idempotent because reconnect and replay semantics can surface the same business object more than once.
- Do not block the SPI thread with long business logic; hand the event to a worker queue when processing becomes expensive.

## OnRspQryRULEInterParameter

`OnRspQryRULEInterParameter` is an event callback that reports state back from the CTP runtime into the client application.

- Kind: callback
- Owning interface: `CThostFtdcTraderSpi`
- Related symbols: `ReqQryRULEInterParameter`

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

**Field guide for `CThostFtdcRULEInterParameterField`**

| Field | Type | Purpose |
| --- | --- | --- |
| `TradingDay` | `TThostFtdcDateType` | Trading date visible to the current trading system session. |
| `ExchangeID` | `TThostFtdcExchangeIDType` | Exchange code that disambiguates the target venue. |
| `SpreadId` | `TThostFtdcSpreadIdType` | Carries the spread id for the current request or response. |
| `InterRate` | `TThostFtdcRatioType` | Carries the inter rate for the current request or response. |
| `Leg1ProdFamilyCode` | `TThostFtdcInstrumentIDType` | Carries the leg1 prod family code for the current request or response. |
| `Leg2ProdFamilyCode` | `TThostFtdcInstrumentIDType` | Carries the leg2 prod family code for the current request or response. |
| `Leg1PropFactor` | `TThostFtdcCommonIntType` | Carries the leg1 prop factor for the current request or response. |
| `Leg2PropFactor` | `TThostFtdcCommonIntType` | Carries the leg2 prop factor for the current request or response. |
| `CommodityGroupID` | `TThostFtdcCommodityGroupIDType` | Carries the commodity group identifier for the current request or response. |
| `CommodityGroupName` | `TThostFtdcInstrumentNameType` | Carries the commodity group name for the current request or response. |

**Structure layout**

```cpp
struct CThostFtdcRULEInterParameterField
{

    TThostFtdcDateType  TradingDay;

    TThostFtdcExchangeIDType    ExchangeID;

    TThostFtdcSpreadIdType  SpreadId;

    TThostFtdcRatioType InterRate;

    TThostFtdcInstrumentIDType  Leg1ProdFamilyCode;

    TThostFtdcInstrumentIDType  Leg2ProdFamilyCode;

    TThostFtdcCommonIntType Leg1PropFactor;

    TThostFtdcCommonIntType Leg2PropFactor;

    TThostFtdcCommodityGroupIDType  CommodityGroupID;

    TThostFtdcInstrumentNameType    CommodityGroupName;
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
void MySpi::OnRspQryRULEInterParameter() {
    // Mark the event in your session state machine and send the next step if needed.
}
```

**Implementation notes**

- Make callback handlers idempotent because reconnect and replay semantics can surface the same business object more than once.
- Do not block the SPI thread with long business logic; hand the event to a worker queue when processing becomes expensive.

## OnRspQryInvestorProdRULEMargin

`OnRspQryInvestorProdRULEMargin` is an event callback that reports state back from the CTP runtime into the client application.

- Kind: callback
- Owning interface: `CThostFtdcTraderSpi`
- Related symbols: `ReqQryInvestorProdRULEMargin`

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

**Field guide for `CThostFtdcInvestorProdRULEMarginField`**

| Field | Type | Purpose |
| --- | --- | --- |
| `ExchangeID` | `TThostFtdcExchangeIDType` | Exchange code that disambiguates the target venue. |
| `BrokerID` | `TThostFtdcBrokerIDType` | Broker code that scopes the request or identifies the response owner. |
| `InvestorID` | `TThostFtdcInvestorIDType` | Investor code used by the trading account. |
| `ProdFamilyCode` | `TThostFtdcInstrumentIDType` | Carries the prod family code for the current request or response. |
| `InstrumentClass` | `TThostFtdcInstrumentClassType` | Carries the instrument class for the current request or response. |
| `CommodityGroupID` | `TThostFtdcCommodityGroupIDType` | Carries the commodity group identifier for the current request or response. |
| `BStdPosition` | `TThostFtdcStdPositionType` | Carries the b std position for the current request or response. |
| `SStdPosition` | `TThostFtdcStdPositionType` | Carries the s std position for the current request or response. |
| `BStdOpenFrozen` | `TThostFtdcStdPositionType` | Carries the b std open frozen for the current request or response. |
| `SStdOpenFrozen` | `TThostFtdcStdPositionType` | Carries the s std open frozen for the current request or response. |
| `BStdCloseFrozen` | `TThostFtdcStdPositionType` | Carries the b std close frozen for the current request or response. |
| `SStdCloseFrozen` | `TThostFtdcStdPositionType` | Carries the s std close frozen for the current request or response. |
| `IntraProdStdPosition` | `TThostFtdcStdPositionType` | Carries the intra prod std position for the current request or response. |
| `NetStdPosition` | `TThostFtdcStdPositionType` | Carries the net std position for the current request or response. |
| `InterProdStdPosition` | `TThostFtdcStdPositionType` | Carries the inter prod std position for the current request or response. |
| `SingleStdPosition` | `TThostFtdcStdPositionType` | Carries the single std position for the current request or response. |
| `IntraProdMargin` | `TThostFtdcMoneyType` | Carries the intra prod margin for the current request or response. |
| `InterProdMargin` | `TThostFtdcMoneyType` | Carries the inter prod margin for the current request or response. |
| `SingleMargin` | `TThostFtdcMoneyType` | Carries the single margin for the current request or response. |
| `NonCombMargin` | `TThostFtdcMoneyType` | Carries the non comb margin for the current request or response. |
| `AddOnMargin` | `TThostFtdcMoneyType` | Carries the add on margin for the current request or response. |
| `ExchMargin` | `TThostFtdcMoneyType` | Carries the exch margin for the current request or response. |
| `AddOnFrozenMargin` | `TThostFtdcMoneyType` | Carries the add on frozen margin for the current request or response. |
| `OpenFrozenMargin` | `TThostFtdcMoneyType` | Carries the open frozen margin for the current request or response. |
| `CloseFrozenMargin` | `TThostFtdcMoneyType` | Carries the close frozen margin for the current request or response. |
| `Margin` | `TThostFtdcMoneyType` | Carries the margin for the current request or response. |
| `FrozenMargin` | `TThostFtdcMoneyType` | Carries the frozen margin for the current request or response. |

**Structure layout**

```cpp
struct CThostFtdcInvestorProdRULEMarginField
{

    TThostFtdcExchangeIDType    ExchangeID;

    TThostFtdcBrokerIDType  BrokerID;

    TThostFtdcInvestorIDType    InvestorID;

    TThostFtdcInstrumentIDType  ProdFamilyCode;

    TThostFtdcInstrumentClassType   InstrumentClass;

    TThostFtdcCommodityGroupIDType  CommodityGroupID;

    TThostFtdcStdPositionType   BStdPosition;

    TThostFtdcStdPositionType   SStdPosition;

    TThostFtdcStdPositionType   BStdOpenFrozen;

    TThostFtdcStdPositionType   SStdOpenFrozen;

    TThostFtdcStdPositionType   BStdCloseFrozen;

    TThostFtdcStdPositionType   SStdCloseFrozen;

    TThostFtdcStdPositionType   IntraProdStdPosition;

    TThostFtdcStdPositionType   NetStdPosition;

    TThostFtdcStdPositionType   InterProdStdPosition;

    TThostFtdcStdPositionType   SingleStdPosition;

    TThostFtdcMoneyType IntraProdMargin;

    TThostFtdcMoneyType InterProdMargin;

    TThostFtdcMoneyType SingleMargin;

    TThostFtdcMoneyType NonCombMargin;

    TThostFtdcMoneyType AddOnMargin;

    TThostFtdcMoneyType ExchMargin;

    TThostFtdcMoneyType AddOnFrozenMargin;

    TThostFtdcMoneyType OpenFrozenMargin;

    TThostFtdcMoneyType CloseFrozenMargin;

    TThostFtdcMoneyType Margin;

    TThostFtdcMoneyType FrozenMargin;
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
void MySpi::OnRspQryInvestorProdRULEMargin() {
    // Mark the event in your session state machine and send the next step if needed.
}
```

**Implementation notes**

- Make callback handlers idempotent because reconnect and replay semantics can surface the same business object more than once.
- Do not block the SPI thread with long business logic; hand the event to a worker queue when processing becomes expensive.

## OnRspQryInvestorPortfSetting

`OnRspQryInvestorPortfSetting` is an event callback that reports state back from the CTP runtime into the client application.

- Kind: callback
- Owning interface: `CThostFtdcTraderSpi`
- Related symbols: `ReqQryInvestorPortfSetting`

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

**Field guide for `CThostFtdcInvestorPortfSettingField`**

| Field | Type | Purpose |
| --- | --- | --- |
| `ExchangeID` | `TThostFtdcExchangeIDType` | Exchange code that disambiguates the target venue. |
| `BrokerID` | `TThostFtdcBrokerIDType` | Broker code that scopes the request or identifies the response owner. |
| `InvestorID` | `TThostFtdcInvestorIDType` | Investor code used by the trading account. |
| `HedgeFlag` | `TThostFtdcHedgeFlagType` | Carries the hedge flag for the current request or response. |
| `UsePortf` | `TThostFtdcBoolType` | Carries the use portf for the current request or response. |

**Structure layout**

```cpp
struct CThostFtdcInvestorPortfSettingField
{

    TThostFtdcExchangeIDType    ExchangeID;

    TThostFtdcBrokerIDType  BrokerID;

    TThostFtdcInvestorIDType    InvestorID;

    TThostFtdcHedgeFlagType HedgeFlag;

    TThostFtdcBoolType  UsePortf;
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
void MySpi::OnRspQryInvestorPortfSetting() {
    // Mark the event in your session state machine and send the next step if needed.
}
```

**Implementation notes**

- Make callback handlers idempotent because reconnect and replay semantics can surface the same business object more than once.
- Do not block the SPI thread with long business logic; hand the event to a worker queue when processing becomes expensive.

## OnRspQryInvestorInfoCommRec

`OnRspQryInvestorInfoCommRec` is an event callback that reports state back from the CTP runtime into the client application.

- Kind: callback
- Owning interface: `CThostFtdcTraderSpi`
- Related symbols: `ReqQryInvestorInfoCommRec`

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

**Field guide for `CThostFtdcInvestorInfoCommRecField`**

| Field | Type | Purpose |
| --- | --- | --- |
| `ExchangeID` | `TThostFtdcExchangeIDType` | Exchange code that disambiguates the target venue. |
| `BrokerID` | `TThostFtdcBrokerIDType` | Broker code that scopes the request or identifies the response owner. |
| `InvestorID` | `TThostFtdcInvestorIDType` | Investor code used by the trading account. |
| `InstrumentID` | `TThostFtdcInstrumentIDType` | Instrument symbol for the target contract. |
| `OrderCount` | `TThostFtdcVolumeType` | Carries the order count for the current request or response. |
| `OrderActionCount` | `TThostFtdcVolumeType` | Carries the order action count for the current request or response. |
| `ForQuoteCnt` | `TThostFtdcVolumeType` | Carries the for quote cnt for the current request or response. |
| `InfoComm` | `TThostFtdcMoneyType` | Carries the information comm for the current request or response. |
| `IsOptSeries` | `TThostFtdcBoolType` | Carries the is opt series for the current request or response. |
| `ProductID` | `TThostFtdcProductIDType` | Carries the product identifier for the current request or response. |
| `InfoCnt` | `TThostFtdcVolumeType` | Carries the information cnt for the current request or response. |

**Structure layout**

```cpp
struct CThostFtdcInvestorInfoCommRecField
{

    TThostFtdcExchangeIDType    ExchangeID;

    TThostFtdcBrokerIDType  BrokerID;

    TThostFtdcInvestorIDType    InvestorID;

    TThostFtdcInstrumentIDType  InstrumentID;

    TThostFtdcVolumeType    OrderCount;

    TThostFtdcVolumeType    OrderActionCount;

    TThostFtdcVolumeType    ForQuoteCnt;

    TThostFtdcMoneyType InfoComm;

    TThostFtdcBoolType  IsOptSeries;

    TThostFtdcProductIDType ProductID;

    TThostFtdcVolumeType    InfoCnt;
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
void MySpi::OnRspQryInvestorInfoCommRec() {
    // Mark the event in your session state machine and send the next step if needed.
}
```

**Implementation notes**

- Make callback handlers idempotent because reconnect and replay semantics can surface the same business object more than once.
- Do not block the SPI thread with long business logic; hand the event to a worker queue when processing becomes expensive.

## OnRspQryCombLeg

`OnRspQryCombLeg` is an event callback that reports state back from the CTP runtime into the client application.

- Kind: callback
- Owning interface: `CThostFtdcTraderSpi`
- Related symbols: `ReqQryCombLeg`

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

**Field guide for `CThostFtdcCombLegField`**

| Field | Type | Purpose |
| --- | --- | --- |
| `CombInstrumentID` | `TThostFtdcInstrumentIDType` | Carries the comb instrument identifier for the current request or response. |
| `LegID` | `TThostFtdcLegIDType` | Carries the leg identifier for the current request or response. |
| `LegInstrumentID` | `TThostFtdcInstrumentIDType` | Carries the leg instrument identifier for the current request or response. |
| `Direction` | `TThostFtdcDirectionType` | Buy or sell direction of the trading instruction. |
| `LegMultiple` | `TThostFtdcLegMultipleType` | Carries the leg multiple for the current request or response. |
| `ImplyLevel` | `TThostFtdcImplyLevelType` | Carries the imply level for the current request or response. |

**Structure layout**

```cpp
struct CThostFtdcCombLegField
{

    TThostFtdcInstrumentIDType  CombInstrumentID;

    TThostFtdcLegIDType LegID;

    TThostFtdcInstrumentIDType  LegInstrumentID;

    TThostFtdcDirectionType Direction;

    TThostFtdcLegMultipleType   LegMultiple;

    TThostFtdcImplyLevelType    ImplyLevel;
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
void MySpi::OnRspQryCombLeg() {
    // Mark the event in your session state machine and send the next step if needed.
}
```

**Implementation notes**

- Make callback handlers idempotent because reconnect and replay semantics can surface the same business object more than once.
- Do not block the SPI thread with long business logic; hand the event to a worker queue when processing becomes expensive.

## OnRspQryOffsetSetting

`OnRspQryOffsetSetting` is an event callback that reports state back from the CTP runtime into the client application.

- Kind: callback
- Owning interface: `CThostFtdcTraderSpi`
- Related symbols: `ReqQryOffsetSetting`

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

**Field guide for `CThostFtdcOffsetSettingField`**

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
| `ExchangeInstID` | `TThostFtdcExchangeInstIDType` | Carries the exchange inst identifier for the current request or response. |
| `ExchangeSerialNo` | `TThostFtdcExchangeInstIDType` | Carries the exchange serial number no for the current request or response. |
| `ExchangeProductID` | `TThostFtdcProductIDType` | Carries the exchange product identifier for the current request or response. |
| `ParticipantID` | `TThostFtdcParticipantIDType` | Carries the participant identifier for the current request or response. |
| `ClientID` | `TThostFtdcClientIDType` | Client identifier supplied by the brokerage environment. |
| `TraderID` | `TThostFtdcTraderIDType` | Carries the trader identifier for the current request or response. |
| `InstallID` | `TThostFtdcInstallIDType` | Carries the install identifier for the current request or response. |
| `OrderSubmitStatus` | `TThostFtdcOrderSubmitStatusType` | Carries the order submit status for the current request or response. |
| `TradingDay` | `TThostFtdcDateType` | Trading date visible to the current trading system session. |
| `SettlementID` | `TThostFtdcSettlementIDType` | Carries the settlement identifier for the current request or response. |
| `InsertDate` | `TThostFtdcDateType` | Carries the insert date for the current request or response. |
| `InsertTime` | `TThostFtdcTimeType` | Carries the insert time for the current request or response. |
| `CancelTime` | `TThostFtdcTimeType` | Carries the cancel time for the current request or response. |
| `ExecResult` | `TThostFtdcExecResultType` | Carries the exercise or exec-order result for the current request or response. |
| `SequenceNo` | `TThostFtdcSequenceNoType` | Carries the sequence no for the current request or response. |
| `FrontID` | `TThostFtdcFrontIDType` | Front identifier assigned by the server for the current login session. |
| `SessionID` | `TThostFtdcSessionIDType` | Session identifier assigned by the server for the current login session. |
| `StatusMsg` | `TThostFtdcErrorMsgType` | Carries the status msg for the current request or response. |
| `ActiveUserID` | `TThostFtdcUserIDType` | Carries the active user identifier for the current request or response. |
| `BrokerOffsetSettingSeq` | `TThostFtdcSequenceNoType` | Carries the broker offset setting sequence for the current request or response. |
| `ApplySrc` | `TThostFtdcApplySrcType` | Carries the apply src for the current request or response. |

**Structure layout**

```cpp
struct CThostFtdcOffsetSettingField
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

    TThostFtdcExchangeInstIDType    ExchangeInstID;

    TThostFtdcExchangeInstIDType    ExchangeSerialNo;

    TThostFtdcProductIDType ExchangeProductID;

    TThostFtdcParticipantIDType ParticipantID;

    TThostFtdcClientIDType  ClientID;

    TThostFtdcTraderIDType  TraderID;

    TThostFtdcInstallIDType InstallID;

    TThostFtdcOrderSubmitStatusType OrderSubmitStatus;

    TThostFtdcDateType  TradingDay;

    TThostFtdcSettlementIDType  SettlementID;

    TThostFtdcDateType  InsertDate;

    TThostFtdcTimeType  InsertTime;

    TThostFtdcTimeType  CancelTime;

    TThostFtdcExecResultType    ExecResult;

    TThostFtdcSequenceNoType    SequenceNo;

    TThostFtdcFrontIDType   FrontID;

    TThostFtdcSessionIDType SessionID;

    TThostFtdcErrorMsgType  StatusMsg;

    TThostFtdcUserIDType    ActiveUserID;

    TThostFtdcSequenceNoType    BrokerOffsetSettingSeq;

    TThostFtdcApplySrcType  ApplySrc;
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
void MySpi::OnRspQryOffsetSetting() {
    // Mark the event in your session state machine and send the next step if needed.
}
```

**Implementation notes**

- Make callback handlers idempotent because reconnect and replay semantics can surface the same business object more than once.
- Do not block the SPI thread with long business logic; hand the event to a worker queue when processing becomes expensive.
