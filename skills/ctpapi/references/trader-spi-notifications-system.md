# CTP trader SPI system notifications

This reference covers bulletin, instrument-status, and trading-notice notifications that affect trader-side runtime state.

| Entry | Kind |
| --- | --- |
| OnRtnBulletin | callback |
| OnRtnInstrumentStatus | callback |
| OnRtnTradingNotice | callback |

## OnRtnBulletin

`OnRtnBulletin` is an event callback that reports state back from the CTP runtime into the client application.

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

**Field guide for `CThostFtdcBulletinField`**

| Field | Type | Purpose |
| --- | --- | --- |
| `ExchangeID` | `TThostFtdcExchangeIDType` | Exchange code that disambiguates the target venue. |
| `TradingDay` | `TThostFtdcDateType` | Trading date visible to the current trading system session. |
| `BulletinID` | `TThostFtdcBulletinIDType` | Carries the bulletin identifier for the current request or response. |
| `SequenceNo` | `TThostFtdcSequenceNoType` | Carries the sequence no for the current request or response. |
| `NewsType` | `TThostFtdcNewsTypeType` | Carries the news type for the current request or response. |
| `NewsUrgency` | `TThostFtdcNewsUrgencyType` | Carries the news urgency for the current request or response. |
| `SendTime` | `TThostFtdcTimeType` | Carries the send time for the current request or response. |
| `Abstract` | `TThostFtdcAbstractType` | Carries the abstract for the current request or response. |
| `ComeFrom` | `TThostFtdcComeFromType` | Carries the come from for the current request or response. |
| `Content` | `TThostFtdcContentType` | Carries the content for the current request or response. |
| `URLLink` | `TThostFtdcURLLinkType` | Carries the url link for the current request or response. |
| `MarketID` | `TThostFtdcMarketIDType` | Carries the market identifier for the current request or response. |

**Structure layout**

```cpp
struct CThostFtdcBulletinField
{

    TThostFtdcExchangeIDType ExchangeID;

    TThostFtdcDateType TradingDay;

    TThostFtdcBulletinIDType BulletinID;

    TThostFtdcSequenceNoType SequenceNo;

    TThostFtdcNewsTypeType NewsType;

    TThostFtdcNewsUrgencyType NewsUrgency;

    TThostFtdcTimeType SendTime;

    TThostFtdcAbstractType Abstract;

    TThostFtdcComeFromType ComeFrom;

    TThostFtdcContentType Content;

    TThostFtdcURLLinkType URLLink;

    TThostFtdcMarketIDType MarketID;
};
```

**Usage example**

```cpp
void MySpi::OnRtnBulletin() {
    // Mark the event in your session state machine and send the next step if needed.
}
```

**Implementation notes**

- Make callback handlers idempotent because reconnect and replay semantics can surface the same business object more than once.
- Do not block the SPI thread with long business logic; hand the event to a worker queue when processing becomes expensive.

## OnRtnInstrumentStatus

`OnRtnInstrumentStatus` is an event callback that reports state back from the CTP runtime into the client application.

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

**Field guide for `CThostFtdcInstrumentStatusField`**

| Field | Type | Purpose |
| --- | --- | --- |
| `ExchangeID` | `TThostFtdcExchangeIDType` | Exchange code that disambiguates the target venue. |
| `reserve1` | `TThostFtdcOldExchangeInstIDType` | Carries the reserve1 for the current request or response. |
| `SettlementGroupID` | `TThostFtdcSettlementGroupIDType` | Carries the settlement group identifier for the current request or response. |
| `reserve2` | `TThostFtdcOldInstrumentIDType` | Carries the reserve2 for the current request or response. |
| `InstrumentStatus` | `TThostFtdcInstrumentStatusType` | Carries the instrument status for the current request or response. |
| `TradingSegmentSN` | `TThostFtdcTradingSegmentSNType` | Carries the trading segment sn for the current request or response. |
| `EnterTime` | `TThostFtdcTimeType` | Carries the enter time for the current request or response. |
| `EnterReason` | `TThostFtdcInstStatusEnterReasonType` | Carries the enter reason for the current request or response. |
| `ExchangeInstID` | `TThostFtdcExchangeInstIDType` | Carries the exchange inst identifier for the current request or response. |
| `InstrumentID` | `TThostFtdcInstrumentIDType` | Instrument symbol for the target contract. |

**Structure layout**

```cpp
struct CThostFtdcInstrumentStatusField
{

    TThostFtdcExchangeIDType    ExchangeID;

    TThostFtdcOldExchangeInstIDType reserve1;

    TThostFtdcSettlementGroupIDType SettlementGroupID;

    TThostFtdcOldInstrumentIDType   reserve2;

    TThostFtdcInstrumentStatusType  InstrumentStatus;

    TThostFtdcTradingSegmentSNType  TradingSegmentSN;

    TThostFtdcTimeType  EnterTime;

    TThostFtdcInstStatusEnterReasonType EnterReason;

    TThostFtdcExchangeInstIDType    ExchangeInstID;

    TThostFtdcInstrumentIDType  InstrumentID;
};
```

**Usage example**

```cpp
void MySpi::OnRtnInstrumentStatus() {
    // Mark the event in your session state machine and send the next step if needed.
}
```

**Implementation notes**

- Make callback handlers idempotent because reconnect and replay semantics can surface the same business object more than once.
- Do not block the SPI thread with long business logic; hand the event to a worker queue when processing becomes expensive.

## OnRtnTradingNotice

`OnRtnTradingNotice` is an event callback that reports state back from the CTP runtime into the client application.

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

**Field guide for `CThostFtdcTradingNoticeInfoField`**

| Field | Type | Purpose |
| --- | --- | --- |
| `BrokerID` | `TThostFtdcBrokerIDType` | Broker code that scopes the request or identifies the response owner. |
| `InvestorID` | `TThostFtdcInvestorIDType` | Investor code used by the trading account. |
| `SendTime` | `TThostFtdcTimeType` | Carries the send time for the current request or response. |
| `FieldContent` | `TThostFtdcContentType` | Carries the field content for the current request or response. |
| `SequenceSeries` | `TThostFtdcSequenceSeriesType` | Carries the sequence series for the current request or response. |
| `SequenceNo` | `TThostFtdcSequenceNoType` | Carries the sequence no for the current request or response. |
| `InvestUnitID` | `TThostFtdcInvestUnitIDType` | Investment unit identifier used by the account model. |

**Structure layout**

```cpp
struct CThostFtdcTradingNoticeInfoField
{

    TThostFtdcBrokerIDType BrokerID;

    TThostFtdcInvestorIDType InvestorID;

    TThostFtdcTimeType SendTime;

    TThostFtdcContentType FieldContent;

    TThostFtdcSequenceSeriesType SequenceSeries;

    TThostFtdcSequenceNoType SequenceNo;

    TThostFtdcInvestUnitIDType InvestUnitID;
};
```

**Usage example**

```cpp
void MySpi::OnRtnTradingNotice() {
    // Mark the event in your session state machine and send the next step if needed.
}
```

**Implementation notes**

- Make callback handlers idempotent because reconnect and replay semantics can surface the same business object more than once.
- Do not block the SPI thread with long business logic; hand the event to a worker queue when processing becomes expensive.
