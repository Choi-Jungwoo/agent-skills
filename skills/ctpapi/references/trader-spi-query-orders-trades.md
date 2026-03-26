# CTP trader SPI order and trade query callbacks

This reference covers query callbacks for orders, trades, quotes, exec orders, parked orders, and related state.

| Entry | Kind |
| --- | --- |
| OnRspQryCombAction | callback |
| OnRspQryCombInstrumentGuard | callback |
| OnRspQryExecOrder | callback |
| OnRspQryForQuote | callback |
| OnRspQryOptionSelfClose | callback |
| OnRspQryOrder | callback |
| OnRspQryParkedOrder | callback |
| OnRspQryParkedOrderAction | callback |
| OnRspQryQuote | callback |
| OnRspQryTrade | callback |
| OnRspQryMaxOrderVolume | callback |

## OnRspQryCombAction

`OnRspQryCombAction` is an event callback that reports state back from the CTP runtime into the client application.

- Kind: callback
- Owning interface: `CThostFtdcTraderSpi`
- Related symbols: `ReqQryCombAction`

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

**Field guide for `CThostFtdcCombActionField`**

| Field | Type | Purpose |
| --- | --- | --- |
| `BrokerID` | `TThostFtdcBrokerIDType` | Broker code that scopes the request or identifies the response owner. |
| `InvestorID` | `TThostFtdcInvestorIDType` | Investor code used by the trading account. |
| `reserve1` | `TThostFtdcOldInstrumentIDType` | Carries the reserve1 for the current request or response. |
| `CombActionRef` | `TThostFtdcOrderRefType` | Carries the comb action reference for the current request or response. |
| `UserID` | `TThostFtdcUserIDType` | User code associated with the current login identity. |
| `Direction` | `TThostFtdcDirectionType` | Buy or sell direction of the trading instruction. |
| `Volume` | `TThostFtdcVolumeType` | Carries the volume for the current request or response. |
| `CombDirection` | `TThostFtdcCombDirectionType` | Carries the comb direction for the current request or response. |
| `HedgeFlag` | `TThostFtdcHedgeFlagType` | Carries the hedge flag for the current request or response. |
| `ActionLocalID` | `TThostFtdcOrderLocalIDType` | Carries the action local identifier for the current request or response. |
| `ExchangeID` | `TThostFtdcExchangeIDType` | Exchange code that disambiguates the target venue. |
| `ParticipantID` | `TThostFtdcParticipantIDType` | Carries the participant identifier for the current request or response. |
| `ClientID` | `TThostFtdcClientIDType` | Client identifier supplied by the brokerage environment. |
| `reserve2` | `TThostFtdcOldExchangeInstIDType` | Carries the reserve2 for the current request or response. |
| `TraderID` | `TThostFtdcTraderIDType` | Carries the trader identifier for the current request or response. |
| `InstallID` | `TThostFtdcInstallIDType` | Carries the install identifier for the current request or response. |
| `ActionStatus` | `TThostFtdcOrderActionStatusType` | Carries the action status for the current request or response. |
| `NotifySequence` | `TThostFtdcSequenceNoType` | Carries the notify sequence for the current request or response. |
| `TradingDay` | `TThostFtdcDateType` | Trading date visible to the current trading system session. |
| `SettlementID` | `TThostFtdcSettlementIDType` | Carries the settlement identifier for the current request or response. |
| `SequenceNo` | `TThostFtdcSequenceNoType` | Carries the sequence no for the current request or response. |
| `FrontID` | `TThostFtdcFrontIDType` | Front identifier assigned by the server for the current login session. |
| `SessionID` | `TThostFtdcSessionIDType` | Session identifier assigned by the server for the current login session. |
| `UserProductInfo` | `TThostFtdcProductInfoType` | Client product string used during authentication or login. |
| `StatusMsg` | `TThostFtdcErrorMsgType` | Carries the status msg for the current request or response. |
| `reserve3` | `TThostFtdcOldIPAddressType` | Carries the reserve3 for the current request or response. |
| `MacAddress` | `TThostFtdcMacAddressType` | Client MAC address reported to the server. |
| `ComTradeID` | `TThostFtdcTradeIDType` | Carries the com trade identifier for the current request or response. |
| `BranchID` | `TThostFtdcBranchIDType` | Carries the branch identifier for the current request or response. |
| `InvestUnitID` | `TThostFtdcInvestUnitIDType` | Investment unit identifier used by the account model. |
| `InstrumentID` | `TThostFtdcInstrumentIDType` | Instrument symbol for the target contract. |
| `ExchangeInstID` | `TThostFtdcExchangeInstIDType` | Carries the exchange inst identifier for the current request or response. |
| `IPAddress` | `TThostFtdcIPAddressType` | Client IP address reported to the server. |

**Structure layout**

```cpp
struct CThostFtdcCombActionField
{

    TThostFtdcBrokerIDType  BrokerID;

    TThostFtdcInvestorIDType    InvestorID;

    TThostFtdcOldInstrumentIDType   reserve1;

    TThostFtdcOrderRefType  CombActionRef;

    TThostFtdcUserIDType    UserID;

    TThostFtdcDirectionType Direction;

    TThostFtdcVolumeType    Volume;

    TThostFtdcCombDirectionType CombDirection;

    TThostFtdcHedgeFlagType HedgeFlag;

    TThostFtdcOrderLocalIDType  ActionLocalID;

    TThostFtdcExchangeIDType    ExchangeID;

    TThostFtdcParticipantIDType ParticipantID;

    TThostFtdcClientIDType  ClientID;

    TThostFtdcOldExchangeInstIDType reserve2;

    TThostFtdcTraderIDType  TraderID;

    TThostFtdcInstallIDType InstallID;

    TThostFtdcOrderActionStatusType ActionStatus;

    TThostFtdcSequenceNoType    NotifySequence;

    TThostFtdcDateType  TradingDay;

    TThostFtdcSettlementIDType  SettlementID;

    TThostFtdcSequenceNoType    SequenceNo;

    TThostFtdcFrontIDType   FrontID;

    TThostFtdcSessionIDType SessionID;

    TThostFtdcProductInfoType   UserProductInfo;

    TThostFtdcErrorMsgType  StatusMsg;

    TThostFtdcOldIPAddressType  reserve3;

    TThostFtdcMacAddressType    MacAddress;

    TThostFtdcTradeIDType   ComTradeID;

    TThostFtdcBranchIDType  BranchID;

    TThostFtdcInvestUnitIDType  InvestUnitID;

    TThostFtdcInstrumentIDType  InstrumentID;

    TThostFtdcExchangeInstIDType    ExchangeInstID;

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

    TThostFtdcErrorIDType ErrorID;

    TThostFtdcErrorMsgType ErrorMsg;
};
```

**Usage example**

```cpp
void MySpi::OnRspQryCombAction() {
    // Mark the event in your session state machine and send the next step if needed.
}
```

**Implementation notes**

- Make callback handlers idempotent because reconnect and replay semantics can surface the same business object more than once.
- Do not block the SPI thread with long business logic; hand the event to a worker queue when processing becomes expensive.

## OnRspQryCombInstrumentGuard

`OnRspQryCombInstrumentGuard` is an event callback that reports state back from the CTP runtime into the client application.

- Kind: callback
- Owning interface: `CThostFtdcTraderSpi`
- Related symbols: `ReqQryCombInstrumentGuard`

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

**Field guide for `CThostFtdcCombInstrumentGuardField`**

| Field | Type | Purpose |
| --- | --- | --- |
| `BrokerID` | `TThostFtdcBrokerIDType` | Broker code that scopes the request or identifies the response owner. |
| `reserve1` | `TThostFtdcOldInstrumentIDType` | Carries the reserve1 for the current request or response. |
| `GuarantRatio` | `TThostFtdcRatioType` | Carries the guarant ratio for the current request or response. |
| `ExchangeID` | `TThostFtdcExchangeIDType` | Exchange code that disambiguates the target venue. |
| `InstrumentID` | `TThostFtdcInstrumentIDType` | Instrument symbol for the target contract. |

**Structure layout**

```cpp
struct CThostFtdcCombInstrumentGuardField
{

TThostFtdcBrokerIDType  BrokerID;

TThostFtdcOldInstrumentIDType   reserve1;

TThostFtdcRatioType GuarantRatio;

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
void MySpi::OnRspQryCombInstrumentGuard() {
    // Mark the event in your session state machine and send the next step if needed.
}
```

**Implementation notes**

- Make callback handlers idempotent because reconnect and replay semantics can surface the same business object more than once.
- Do not block the SPI thread with long business logic; hand the event to a worker queue when processing becomes expensive.

## OnRspQryExecOrder

`OnRspQryExecOrder` is an event callback that reports state back from the CTP runtime into the client application.

- Kind: callback
- Owning interface: `CThostFtdcTraderSpi`
- Related symbols: `ReqQryExecOrder`

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

**Field guide for `CThostFtdcExecOrderField`**

| Field | Type | Purpose |
| --- | --- | --- |
| `BrokerID` | `TThostFtdcBrokerIDType` | Broker code that scopes the request or identifies the response owner. |
| `InvestorID` | `TThostFtdcInvestorIDType` | Investor code used by the trading account. |
| `reserve1` | `TThostFtdcOldInstrumentIDType` | Carries the reserve1 for the current request or response. |
| `ExecOrderRef` | `TThostFtdcOrderRefType` | Carries the exercise or exec-order order reference for the current request or response. |
| `UserID` | `TThostFtdcUserIDType` | User code associated with the current login identity. |
| `Volume` | `TThostFtdcVolumeType` | Carries the volume for the current request or response. |
| `RequestID` | `TThostFtdcRequestIDType` | Client-generated request identifier used for response correlation. |
| `BusinessUnit` | `TThostFtdcBusinessUnitType` | Free-form business tag used for routing or attribution. |
| `OffsetFlag` | `TThostFtdcOffsetFlagType` | Carries the offset flag for the current request or response. |
| `HedgeFlag` | `TThostFtdcHedgeFlagType` | Carries the hedge flag for the current request or response. |
| `ActionType` | `TThostFtdcActionTypeType` | Carries the action type for the current request or response. |
| `PosiDirection` | `TThostFtdcPosiDirectionType` | Carries the posi direction for the current request or response. |
| `ReservePositionFlag` | `TThostFtdcExecOrderPositionFlagType` | Carries the reserve position flag for the current request or response. |
| `CloseFlag` | `TThostFtdcExecOrderCloseFlagType` | Carries the close flag for the current request or response. |
| `ExecOrderLocalID` | `TThostFtdcOrderLocalIDType` | Carries the exercise or exec-order order local identifier for the current request or response. |
| `ExchangeID` | `TThostFtdcExchangeIDType` | Exchange code that disambiguates the target venue. |
| `ParticipantID` | `TThostFtdcParticipantIDType` | Carries the participant identifier for the current request or response. |
| `ClientID` | `TThostFtdcClientIDType` | Client identifier supplied by the brokerage environment. |
| `reserve2` | `TThostFtdcOldExchangeInstIDType` | Carries the reserve2 for the current request or response. |
| `TraderID` | `TThostFtdcTraderIDType` | Carries the trader identifier for the current request or response. |
| `InstallID` | `TThostFtdcInstallIDType` | Carries the install identifier for the current request or response. |
| `OrderSubmitStatus` | `TThostFtdcOrderSubmitStatusType` | Carries the order submit status for the current request or response. |
| `NotifySequence` | `TThostFtdcSequenceNoType` | Carries the notify sequence for the current request or response. |
| `TradingDay` | `TThostFtdcDateType` | Trading date visible to the current trading system session. |
| `SettlementID` | `TThostFtdcSettlementIDType` | Carries the settlement identifier for the current request or response. |
| `ExecOrderSysID` | `TThostFtdcExecOrderSysIDType` | Carries the exercise or exec-order order sys identifier for the current request or response. |
| `InsertDate` | `TThostFtdcDateType` | Carries the insert date for the current request or response. |
| `InsertTime` | `TThostFtdcTimeType` | Carries the insert time for the current request or response. |
| `CancelTime` | `TThostFtdcTimeType` | Carries the cancel time for the current request or response. |
| `ExecResult` | `TThostFtdcExecResultType` | Carries the exercise or exec-order result for the current request or response. |
| `ClearingPartID` | `TThostFtdcParticipantIDType` | Carries the clearing part identifier for the current request or response. |
| `SequenceNo` | `TThostFtdcSequenceNoType` | Carries the sequence no for the current request or response. |
| `FrontID` | `TThostFtdcFrontIDType` | Front identifier assigned by the server for the current login session. |
| `SessionID` | `TThostFtdcSessionIDType` | Session identifier assigned by the server for the current login session. |
| `UserProductInfo` | `TThostFtdcProductInfoType` | Client product string used during authentication or login. |
| `StatusMsg` | `TThostFtdcErrorMsgType` | Carries the status msg for the current request or response. |
| `ActiveUserID` | `TThostFtdcUserIDType` | Carries the active user identifier for the current request or response. |
| `BrokerExecOrderSeq` | `TThostFtdcSequenceNoType` | Carries the broker exercise or exec-order order sequence for the current request or response. |
| `BranchID` | `TThostFtdcBranchIDType` | Carries the branch identifier for the current request or response. |
| `InvestUnitID` | `TThostFtdcInvestUnitIDType` | Investment unit identifier used by the account model. |
| `AccountID` | `TThostFtdcAccountIDType` | Futures-side account identifier. |
| `CurrencyID` | `TThostFtdcCurrencyIDType` | Currency code used for balance and transfer values. |
| `reserve3` | `TThostFtdcOldIPAddressType` | Carries the reserve3 for the current request or response. |
| `MacAddress` | `TThostFtdcMacAddressType` | Client MAC address reported to the server. |
| `InstrumentID` | `TThostFtdcInstrumentIDType` | Instrument symbol for the target contract. |
| `ExchangeInstID` | `TThostFtdcExchangeInstIDType` | Carries the exchange inst identifier for the current request or response. |
| `IPAddress` | `TThostFtdcIPAddressType` | Client IP address reported to the server. |

**Structure layout**

```cpp
struct CThostFtdcExecOrderField
{

    TThostFtdcBrokerIDType  BrokerID;

    TThostFtdcInvestorIDType    InvestorID;

    TThostFtdcOldInstrumentIDType   reserve1;

    TThostFtdcOrderRefType  ExecOrderRef;

    TThostFtdcUserIDType    UserID;

    TThostFtdcVolumeType    Volume;

    TThostFtdcRequestIDType RequestID;

    TThostFtdcBusinessUnitType  BusinessUnit;

    TThostFtdcOffsetFlagType    OffsetFlag;

    TThostFtdcHedgeFlagType HedgeFlag;

    TThostFtdcActionTypeType    ActionType;

    TThostFtdcPosiDirectionType PosiDirection;

    TThostFtdcExecOrderPositionFlagType ReservePositionFlag;

    TThostFtdcExecOrderCloseFlagType    CloseFlag;

    TThostFtdcOrderLocalIDType  ExecOrderLocalID;

    TThostFtdcExchangeIDType    ExchangeID;

    TThostFtdcParticipantIDType ParticipantID;

    TThostFtdcClientIDType  ClientID;

    TThostFtdcOldExchangeInstIDType reserve2;

    TThostFtdcTraderIDType  TraderID;

    TThostFtdcInstallIDType InstallID;

    TThostFtdcOrderSubmitStatusType OrderSubmitStatus;

    TThostFtdcSequenceNoType    NotifySequence;

    TThostFtdcDateType  TradingDay;

    TThostFtdcSettlementIDType  SettlementID;

    TThostFtdcExecOrderSysIDType    ExecOrderSysID;

    TThostFtdcDateType  InsertDate;

    TThostFtdcTimeType  InsertTime;

    TThostFtdcTimeType  CancelTime;

    TThostFtdcExecResultType    ExecResult;

    TThostFtdcParticipantIDType ClearingPartID;

    TThostFtdcSequenceNoType    SequenceNo;

    TThostFtdcFrontIDType   FrontID;

    TThostFtdcSessionIDType SessionID;

    TThostFtdcProductInfoType   UserProductInfo;

    TThostFtdcErrorMsgType  StatusMsg;

    TThostFtdcUserIDType    ActiveUserID;

    TThostFtdcSequenceNoType    BrokerExecOrderSeq;

    TThostFtdcBranchIDType  BranchID;

    TThostFtdcInvestUnitIDType  InvestUnitID;

    TThostFtdcAccountIDType AccountID;

    TThostFtdcCurrencyIDType    CurrencyID;

    TThostFtdcOldIPAddressType  reserve3;

    TThostFtdcMacAddressType    MacAddress;

    TThostFtdcInstrumentIDType  InstrumentID;

    TThostFtdcExchangeInstIDType    ExchangeInstID;

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

    TThostFtdcErrorIDType ErrorID;

    TThostFtdcErrorMsgType ErrorMsg;
};
```

**Usage example**

```cpp
void MySpi::OnRspQryExecOrder() {
    // Mark the event in your session state machine and send the next step if needed.
}
```

**Implementation notes**

- Make callback handlers idempotent because reconnect and replay semantics can surface the same business object more than once.
- Do not block the SPI thread with long business logic; hand the event to a worker queue when processing becomes expensive.

## OnRspQryForQuote

`OnRspQryForQuote` is an event callback that reports state back from the CTP runtime into the client application.

- Kind: callback
- Owning interface: `CThostFtdcTraderSpi`
- Related symbols: `ReqQryForQuote`

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

**Field guide for `CThostFtdcForQuoteField`**

| Field | Type | Purpose |
| --- | --- | --- |
| `BrokerID` | `TThostFtdcBrokerIDType` | Broker code that scopes the request or identifies the response owner. |
| `InvestorID` | `TThostFtdcInvestorIDType` | Investor code used by the trading account. |
| `reserve1` | `TThostFtdcOldInstrumentIDType` | Carries the reserve1 for the current request or response. |
| `ForQuoteRef` | `TThostFtdcOrderRefType` | Carries the for quote reference for the current request or response. |
| `UserID` | `TThostFtdcUserIDType` | User code associated with the current login identity. |
| `ForQuoteLocalID` | `TThostFtdcOrderLocalIDType` | Carries the for quote local identifier for the current request or response. |
| `ExchangeID` | `TThostFtdcExchangeIDType` | Exchange code that disambiguates the target venue. |
| `ParticipantID` | `TThostFtdcParticipantIDType` | Carries the participant identifier for the current request or response. |
| `ClientID` | `TThostFtdcClientIDType` | Client identifier supplied by the brokerage environment. |
| `reserve2` | `TThostFtdcOldExchangeInstIDType` | Carries the reserve2 for the current request or response. |
| `TraderID` | `TThostFtdcTraderIDType` | Carries the trader identifier for the current request or response. |
| `InstallID` | `TThostFtdcInstallIDType` | Carries the install identifier for the current request or response. |
| `InsertDate` | `TThostFtdcDateType` | Carries the insert date for the current request or response. |
| `InsertTime` | `TThostFtdcTimeType` | Carries the insert time for the current request or response. |
| `ForQuoteStatus` | `TThostFtdcForQuoteStatusType` | Carries the for quote status for the current request or response. |
| `FrontID` | `TThostFtdcFrontIDType` | Front identifier assigned by the server for the current login session. |
| `SessionID` | `TThostFtdcSessionIDType` | Session identifier assigned by the server for the current login session. |
| `StatusMsg` | `TThostFtdcErrorMsgType` | Carries the status msg for the current request or response. |
| `ActiveUserID` | `TThostFtdcUserIDType` | Carries the active user identifier for the current request or response. |
| `BrokerForQutoSeq` | `TThostFtdcSequenceNoType` | Carries the broker for quto sequence for the current request or response. |
| `InvestUnitID` | `TThostFtdcInvestUnitIDType` | Investment unit identifier used by the account model. |
| `reserve3` | `TThostFtdcOldIPAddressType` | Carries the reserve3 for the current request or response. |
| `MacAddress` | `TThostFtdcMacAddressType` | Client MAC address reported to the server. |
| `InstrumentID` | `TThostFtdcInstrumentIDType` | Instrument symbol for the target contract. |
| `ExchangeInstID` | `TThostFtdcExchangeInstIDType` | Carries the exchange inst identifier for the current request or response. |
| `IPAddress` | `TThostFtdcIPAddressType` | Client IP address reported to the server. |

**Structure layout**

```cpp
struct CThostFtdcForQuoteField
{

    TThostFtdcBrokerIDType  BrokerID;

    TThostFtdcInvestorIDType    InvestorID;

    TThostFtdcOldInstrumentIDType   reserve1;

    TThostFtdcOrderRefType  ForQuoteRef;

    TThostFtdcUserIDType    UserID;

    TThostFtdcOrderLocalIDType  ForQuoteLocalID;

    TThostFtdcExchangeIDType    ExchangeID;

    TThostFtdcParticipantIDType ParticipantID;

    TThostFtdcClientIDType  ClientID;

    TThostFtdcOldExchangeInstIDType reserve2;

    TThostFtdcTraderIDType  TraderID;

    TThostFtdcInstallIDType InstallID;

    TThostFtdcDateType  InsertDate;

    TThostFtdcTimeType  InsertTime;

    TThostFtdcForQuoteStatusType    ForQuoteStatus;

    TThostFtdcFrontIDType   FrontID;

    TThostFtdcSessionIDType SessionID;

    TThostFtdcErrorMsgType  StatusMsg;

    TThostFtdcUserIDType    ActiveUserID;

    TThostFtdcSequenceNoType    BrokerForQutoSeq;

    TThostFtdcInvestUnitIDType  InvestUnitID;

    TThostFtdcOldIPAddressType  reserve3;

    TThostFtdcMacAddressType    MacAddress;

    TThostFtdcInstrumentIDType  InstrumentID;

    TThostFtdcExchangeInstIDType    ExchangeInstID;

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

    TThostFtdcErrorIDType ErrorID;

    TThostFtdcErrorMsgType ErrorMsg;
};
```

**Usage example**

```cpp
void MySpi::OnRspQryForQuote() {
    // Mark the event in your session state machine and send the next step if needed.
}
```

**Implementation notes**

- Make callback handlers idempotent because reconnect and replay semantics can surface the same business object more than once.
- Do not block the SPI thread with long business logic; hand the event to a worker queue when processing becomes expensive.

## OnRspQryOptionSelfClose

`OnRspQryOptionSelfClose` is an event callback that reports state back from the CTP runtime into the client application.

- Kind: callback
- Owning interface: `CThostFtdcTraderSpi`
- Related symbols: `ReqQryOptionSelfClose`

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

**Field guide for `CThostFtdcOptionSelfCloseField`**

| Field | Type | Purpose |
| --- | --- | --- |
| `BrokerID` | `TThostFtdcBrokerIDType` | Broker code that scopes the request or identifies the response owner. |
| `InvestorID` | `TThostFtdcInvestorIDType` | Investor code used by the trading account. |
| `reserve1` | `TThostFtdcOldInstrumentIDType` | Carries the reserve1 for the current request or response. |
| `OptionSelfCloseRef` | `TThostFtdcOrderRefType` | Carries the option self close reference for the current request or response. |
| `UserID` | `TThostFtdcUserIDType` | User code associated with the current login identity. |
| `Volume` | `TThostFtdcVolumeType` | Carries the volume for the current request or response. |
| `RequestID` | `TThostFtdcRequestIDType` | Client-generated request identifier used for response correlation. |
| `BusinessUnit` | `TThostFtdcBusinessUnitType` | Free-form business tag used for routing or attribution. |
| `HedgeFlag` | `TThostFtdcHedgeFlagType` | Carries the hedge flag for the current request or response. |
| `OptSelfCloseFlag` | `TThostFtdcOptSelfCloseFlagType` | Carries the opt self close flag for the current request or response. |
| `OptionSelfCloseLocalID` | `TThostFtdcOrderLocalIDType` | Carries the option self close local identifier for the current request or response. |
| `ExchangeID` | `TThostFtdcExchangeIDType` | Exchange code that disambiguates the target venue. |
| `ParticipantID` | `TThostFtdcParticipantIDType` | Carries the participant identifier for the current request or response. |
| `ClientID` | `TThostFtdcClientIDType` | Client identifier supplied by the brokerage environment. |
| `reserve2` | `TThostFtdcOldExchangeInstIDType` | Carries the reserve2 for the current request or response. |
| `TraderID` | `TThostFtdcTraderIDType` | Carries the trader identifier for the current request or response. |
| `InstallID` | `TThostFtdcInstallIDType` | Carries the install identifier for the current request or response. |
| `OrderSubmitStatus` | `TThostFtdcOrderSubmitStatusType` | Carries the order submit status for the current request or response. |
| `NotifySequence` | `TThostFtdcSequenceNoType` | Carries the notify sequence for the current request or response. |
| `TradingDay` | `TThostFtdcDateType` | Trading date visible to the current trading system session. |
| `SettlementID` | `TThostFtdcSettlementIDType` | Carries the settlement identifier for the current request or response. |
| `OptionSelfCloseSysID` | `TThostFtdcOrderSysIDType` | Carries the option self close sys identifier for the current request or response. |
| `InsertDate` | `TThostFtdcDateType` | Carries the insert date for the current request or response. |
| `InsertTime` | `TThostFtdcTimeType` | Carries the insert time for the current request or response. |
| `CancelTime` | `TThostFtdcTimeType` | Carries the cancel time for the current request or response. |
| `ExecResult` | `TThostFtdcExecResultType` | Carries the exercise or exec-order result for the current request or response. |
| `ClearingPartID` | `TThostFtdcParticipantIDType` | Carries the clearing part identifier for the current request or response. |
| `SequenceNo` | `TThostFtdcSequenceNoType` | Carries the sequence no for the current request or response. |
| `FrontID` | `TThostFtdcFrontIDType` | Front identifier assigned by the server for the current login session. |
| `SessionID` | `TThostFtdcSessionIDType` | Session identifier assigned by the server for the current login session. |
| `UserProductInfo` | `TThostFtdcProductInfoType` | Client product string used during authentication or login. |
| `StatusMsg` | `TThostFtdcErrorMsgType` | Carries the status msg for the current request or response. |
| `ActiveUserID` | `TThostFtdcUserIDType` | Carries the active user identifier for the current request or response. |
| `BrokerOptionSelfCloseSeq` | `TThostFtdcSequenceNoType` | Carries the broker option self close sequence for the current request or response. |
| `BranchID` | `TThostFtdcBranchIDType` | Carries the branch identifier for the current request or response. |
| `InvestUnitID` | `TThostFtdcInvestUnitIDType` | Investment unit identifier used by the account model. |
| `AccountID` | `TThostFtdcAccountIDType` | Futures-side account identifier. |
| `CurrencyID` | `TThostFtdcCurrencyIDType` | Currency code used for balance and transfer values. |
| `reserve3` | `TThostFtdcOldIPAddressType` | Carries the reserve3 for the current request or response. |
| `MacAddress` | `TThostFtdcMacAddressType` | Client MAC address reported to the server. |
| `InstrumentID` | `TThostFtdcInstrumentIDType` | Instrument symbol for the target contract. |
| `ExchangeInstID` | `TThostFtdcExchangeInstIDType` | Carries the exchange inst identifier for the current request or response. |
| `IPAddress` | `TThostFtdcIPAddressType` | Client IP address reported to the server. |

**Structure layout**

```cpp
struct CThostFtdcOptionSelfCloseField
{

    TThostFtdcBrokerIDType  BrokerID;

    TThostFtdcInvestorIDType    InvestorID;

    TThostFtdcOldInstrumentIDType   reserve1;

    TThostFtdcOrderRefType  OptionSelfCloseRef;

    TThostFtdcUserIDType    UserID;

    TThostFtdcVolumeType    Volume;

    TThostFtdcRequestIDType RequestID;

    TThostFtdcBusinessUnitType  BusinessUnit;

    TThostFtdcHedgeFlagType HedgeFlag;

    TThostFtdcOptSelfCloseFlagType  OptSelfCloseFlag;

    TThostFtdcOrderLocalIDType  OptionSelfCloseLocalID;

    TThostFtdcExchangeIDType    ExchangeID;

    TThostFtdcParticipantIDType ParticipantID;

    TThostFtdcClientIDType  ClientID;

    TThostFtdcOldExchangeInstIDType reserve2;

    TThostFtdcTraderIDType  TraderID;

    TThostFtdcInstallIDType InstallID;

    TThostFtdcOrderSubmitStatusType OrderSubmitStatus;

    TThostFtdcSequenceNoType    NotifySequence;

    TThostFtdcDateType  TradingDay;

    TThostFtdcSettlementIDType  SettlementID;

    TThostFtdcOrderSysIDType    OptionSelfCloseSysID;

    TThostFtdcDateType  InsertDate;

    TThostFtdcTimeType  InsertTime;

    TThostFtdcTimeType  CancelTime;

    TThostFtdcExecResultType    ExecResult;

    TThostFtdcParticipantIDType ClearingPartID;

    TThostFtdcSequenceNoType    SequenceNo;

    TThostFtdcFrontIDType   FrontID;

    TThostFtdcSessionIDType SessionID;

    TThostFtdcProductInfoType   UserProductInfo;

    TThostFtdcErrorMsgType  StatusMsg;

    TThostFtdcUserIDType    ActiveUserID;

    TThostFtdcSequenceNoType    BrokerOptionSelfCloseSeq;

    TThostFtdcBranchIDType  BranchID;

    TThostFtdcInvestUnitIDType  InvestUnitID;

    TThostFtdcAccountIDType AccountID;

    TThostFtdcCurrencyIDType    CurrencyID;

    TThostFtdcOldIPAddressType  reserve3;

    TThostFtdcMacAddressType    MacAddress;

    TThostFtdcInstrumentIDType  InstrumentID;

    TThostFtdcExchangeInstIDType    ExchangeInstID;

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

    TThostFtdcErrorIDType ErrorID;

    TThostFtdcErrorMsgType ErrorMsg;
};
```

**Usage example**

```cpp
void MySpi::OnRspQryOptionSelfClose() {
    // Mark the event in your session state machine and send the next step if needed.
}
```

**Implementation notes**

- Make callback handlers idempotent because reconnect and replay semantics can surface the same business object more than once.
- Do not block the SPI thread with long business logic; hand the event to a worker queue when processing becomes expensive.

## OnRspQryOrder

`OnRspQryOrder` is an event callback that reports state back from the CTP runtime into the client application.

- Kind: callback
- Owning interface: `CThostFtdcTraderSpi`
- Related symbols: `ReqQryOrder`

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

**Field guide for `CThostFtdcOrderField`**

| Field | Type | Purpose |
| --- | --- | --- |
| `BrokerID` | `TThostFtdcBrokerIDType` | Broker code that scopes the request or identifies the response owner. |
| `InvestorID` | `TThostFtdcInvestorIDType` | Investor code used by the trading account. |
| `reserve1` | `TThostFtdcOldInstrumentIDType` | Carries the reserve1 for the current request or response. |
| `OrderRef` | `TThostFtdcOrderRefType` | Client-side order reference used to correlate later order events. |
| `UserID` | `TThostFtdcUserIDType` | User code associated with the current login identity. |
| `OrderPriceType` | `TThostFtdcOrderPriceTypeType` | Pricing mode, such as limit price or market-style price. |
| `Direction` | `TThostFtdcDirectionType` | Buy or sell direction of the trading instruction. |
| `CombOffsetFlag` | `TThostFtdcCombOffsetFlagType` | Open or close intent for the order legs. |
| `CombHedgeFlag` | `TThostFtdcCombHedgeFlagType` | Hedge classification for the instruction. |
| `LimitPrice` | `TThostFtdcPriceType` | Explicit price used by price-limited instructions. |
| `VolumeTotalOriginal` | `TThostFtdcVolumeType` | Original requested volume of the instruction. |
| `TimeCondition` | `TThostFtdcTimeConditionType` | Lifetime condition that controls how long the order stays active. |
| `GTDDate` | `TThostFtdcDateType` | Good-till-date value used when the order lifetime depends on a date. |
| `VolumeCondition` | `TThostFtdcVolumeConditionType` | Fill condition that constrains how much must be traded at once. |
| `MinVolume` | `TThostFtdcVolumeType` | Minimum executable volume accepted for the instruction. |
| `ContingentCondition` | `TThostFtdcContingentConditionType` | Trigger condition that activates a contingent order. |
| `StopPrice` | `TThostFtdcPriceType` | Trigger price used by contingent instructions. |
| `ForceCloseReason` | `TThostFtdcForceCloseReasonType` | Reason code used when force-close semantics apply. |
| `IsAutoSuspend` | `TThostFtdcBoolType` | Whether the instruction should enter the auto-suspend path. |
| `BusinessUnit` | `TThostFtdcBusinessUnitType` | Free-form business tag used for routing or attribution. |
| `RequestID` | `TThostFtdcRequestIDType` | Client-generated request identifier used for response correlation. |
| `OrderLocalID` | `TThostFtdcOrderLocalIDType` | Carries the order local identifier for the current request or response. |
| `ExchangeID` | `TThostFtdcExchangeIDType` | Exchange code that disambiguates the target venue. |
| `ParticipantID` | `TThostFtdcParticipantIDType` | Carries the participant identifier for the current request or response. |
| `ClientID` | `TThostFtdcClientIDType` | Client identifier supplied by the brokerage environment. |
| `reserve2` | `TThostFtdcOldExchangeInstIDType` | Carries the reserve2 for the current request or response. |
| `TraderID` | `TThostFtdcTraderIDType` | Carries the trader identifier for the current request or response. |
| `InstallID` | `TThostFtdcInstallIDType` | Carries the install identifier for the current request or response. |
| `OrderSubmitStatus` | `TThostFtdcOrderSubmitStatusType` | Carries the order submit status for the current request or response. |
| `NotifySequence` | `TThostFtdcSequenceNoType` | Carries the notify sequence for the current request or response. |
| `TradingDay` | `TThostFtdcDateType` | Trading date visible to the current trading system session. |
| `SettlementID` | `TThostFtdcSettlementIDType` | Carries the settlement identifier for the current request or response. |
| `OrderSysID` | `TThostFtdcOrderSysIDType` | Carries the order sys identifier for the current request or response. |
| `OrderSource` | `TThostFtdcOrderSourceType` | Carries the order source for the current request or response. |
| `OrderStatus` | `TThostFtdcOrderStatusType` | Carries the order status for the current request or response. |
| `OrderType` | `TThostFtdcOrderTypeType` | Carries the order type for the current request or response. |
| `VolumeTraded` | `TThostFtdcVolumeType` | Carries the volume traded for the current request or response. |
| `VolumeTotal` | `TThostFtdcVolumeType` | Carries the volume total for the current request or response. |
| `InsertDate` | `TThostFtdcDateType` | Carries the insert date for the current request or response. |
| `InsertTime` | `TThostFtdcTimeType` | Carries the insert time for the current request or response. |
| `ActiveTime` | `TThostFtdcTimeType` | Carries the active time for the current request or response. |
| `SuspendTime` | `TThostFtdcTimeType` | Carries the suspend time for the current request or response. |
| `UpdateTime` | `TThostFtdcTimeType` | Carries the update time for the current request or response. |
| `CancelTime` | `TThostFtdcTimeType` | Carries the cancel time for the current request or response. |
| `ActiveTraderID` | `TThostFtdcTraderIDType` | Carries the active trader identifier for the current request or response. |
| `ClearingPartID` | `TThostFtdcParticipantIDType` | Carries the clearing part identifier for the current request or response. |
| `SequenceNo` | `TThostFtdcSequenceNoType` | Carries the sequence no for the current request or response. |
| `FrontID` | `TThostFtdcFrontIDType` | Front identifier assigned by the server for the current login session. |
| `SessionID` | `TThostFtdcSessionIDType` | Session identifier assigned by the server for the current login session. |
| `UserProductInfo` | `TThostFtdcProductInfoType` | Client product string used during authentication or login. |
| `StatusMsg` | `TThostFtdcErrorMsgType` | Carries the status msg for the current request or response. |
| `UserForceClose` | `TThostFtdcBoolType` | Whether the order is flagged as a user-initiated force close. |
| `ActiveUserID` | `TThostFtdcUserIDType` | Carries the active user identifier for the current request or response. |
| `BrokerOrderSeq` | `TThostFtdcSequenceNoType` | Carries the broker order sequence for the current request or response. |
| `RelativeOrderSysID` | `TThostFtdcOrderSysIDType` | Carries the relative order sys identifier for the current request or response. |
| `ZCETotalTradedVolume` | `TThostFtdcVolumeType` | Carries the zce total traded volume for the current request or response. |
| `IsSwapOrder` | `TThostFtdcBoolType` | Whether the order participates in the swap-order path. |
| `BranchID` | `TThostFtdcBranchIDType` | Carries the branch identifier for the current request or response. |
| `InvestUnitID` | `TThostFtdcInvestUnitIDType` | Investment unit identifier used by the account model. |
| `AccountID` | `TThostFtdcAccountIDType` | Futures-side account identifier. |
| `CurrencyID` | `TThostFtdcCurrencyIDType` | Currency code used for balance and transfer values. |
| `reserve3` | `TThostFtdcOldIPAddressType` | Carries the reserve3 for the current request or response. |
| `MacAddress` | `TThostFtdcMacAddressType` | Client MAC address reported to the server. |
| `InstrumentID` | `TThostFtdcInstrumentIDType` | Instrument symbol for the target contract. |
| `ExchangeInstID` | `TThostFtdcExchangeInstIDType` | Carries the exchange inst identifier for the current request or response. |
| `IPAddress` | `TThostFtdcIPAddressType` | Client IP address reported to the server. |
| `OrderMemo` | `TThostFtdcOrderMemoType` | Client memo attached to the order. |
| `SessionReqSeq` | `TThostFtdcSequenceNo12Type` | Per-session request sequence used by some server paths. |

**Structure layout**

```cpp
struct CThostFtdcOrderField
{

    TThostFtdcBrokerIDType  BrokerID;

    TThostFtdcInvestorIDType    InvestorID;

    TThostFtdcOldInstrumentIDType   reserve1;

    TThostFtdcOrderRefType  OrderRef;

    TThostFtdcUserIDType    UserID;

    TThostFtdcOrderPriceTypeType    OrderPriceType;

    TThostFtdcDirectionType Direction;

    TThostFtdcCombOffsetFlagType    CombOffsetFlag;

    TThostFtdcCombHedgeFlagType CombHedgeFlag;

    TThostFtdcPriceType LimitPrice;

    TThostFtdcVolumeType    VolumeTotalOriginal;

    TThostFtdcTimeConditionType TimeCondition;

    TThostFtdcDateType  GTDDate;

    TThostFtdcVolumeConditionType   VolumeCondition;

    TThostFtdcVolumeType    MinVolume;

    TThostFtdcContingentConditionType   ContingentCondition;

    TThostFtdcPriceType StopPrice;

    TThostFtdcForceCloseReasonType  ForceCloseReason;

    TThostFtdcBoolType  IsAutoSuspend;

    TThostFtdcBusinessUnitType  BusinessUnit;

    TThostFtdcRequestIDType RequestID;

    TThostFtdcOrderLocalIDType  OrderLocalID;

    TThostFtdcExchangeIDType    ExchangeID;

    TThostFtdcParticipantIDType ParticipantID;

    TThostFtdcClientIDType  ClientID;

    TThostFtdcOldExchangeInstIDType reserve2;

    TThostFtdcTraderIDType  TraderID;

    TThostFtdcInstallIDType InstallID;

    TThostFtdcOrderSubmitStatusType OrderSubmitStatus;

    TThostFtdcSequenceNoType    NotifySequence;

    TThostFtdcDateType  TradingDay;

    TThostFtdcSettlementIDType  SettlementID;

    TThostFtdcOrderSysIDType    OrderSysID;

    TThostFtdcOrderSourceType   OrderSource;

    TThostFtdcOrderStatusType   OrderStatus;

    TThostFtdcOrderTypeType OrderType;

    TThostFtdcVolumeType    VolumeTraded;

    TThostFtdcVolumeType    VolumeTotal;

    TThostFtdcDateType  InsertDate;

    TThostFtdcTimeType  InsertTime;

    TThostFtdcTimeType  ActiveTime;

    TThostFtdcTimeType  SuspendTime;

    TThostFtdcTimeType  UpdateTime;

    TThostFtdcTimeType  CancelTime;

    TThostFtdcTraderIDType  ActiveTraderID;

    TThostFtdcParticipantIDType ClearingPartID;

    TThostFtdcSequenceNoType    SequenceNo;

    TThostFtdcFrontIDType   FrontID;

    TThostFtdcSessionIDType SessionID;

    TThostFtdcProductInfoType   UserProductInfo;

    TThostFtdcErrorMsgType  StatusMsg;

    TThostFtdcBoolType  UserForceClose;

    TThostFtdcUserIDType    ActiveUserID;

    TThostFtdcSequenceNoType    BrokerOrderSeq;

    TThostFtdcOrderSysIDType    RelativeOrderSysID;

    TThostFtdcVolumeType    ZCETotalTradedVolume;

    TThostFtdcBoolType  IsSwapOrder;

    TThostFtdcBranchIDType  BranchID;

    TThostFtdcInvestUnitIDType  InvestUnitID;

    TThostFtdcAccountIDType AccountID;

    TThostFtdcCurrencyIDType    CurrencyID;

    TThostFtdcOldIPAddressType  reserve3;

    TThostFtdcMacAddressType    MacAddress;

    TThostFtdcInstrumentIDType  InstrumentID;

    TThostFtdcExchangeInstIDType    ExchangeInstID;

    TThostFtdcIPAddressType IPAddress;

    TThostFtdcOrderMemoType OrderMemo;

    TThostFtdcSequenceNo12Type  SessionReqSeq;
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
void MySpi::OnRspQryOrder() {
    // Mark the event in your session state machine and send the next step if needed.
}
```

**Implementation notes**

- Make callback handlers idempotent because reconnect and replay semantics can surface the same business object more than once.
- Do not block the SPI thread with long business logic; hand the event to a worker queue when processing becomes expensive.

## OnRspQryParkedOrder

`OnRspQryParkedOrder` is an event callback that reports state back from the CTP runtime into the client application.

- Kind: callback
- Owning interface: `CThostFtdcTraderSpi`
- Related symbols: `ReqQryParkedOrder`

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

**Field guide for `CThostFtdcParkedOrderField`**

| Field | Type | Purpose |
| --- | --- | --- |
| `BrokerID` | `TThostFtdcBrokerIDType` | Broker code that scopes the request or identifies the response owner. |
| `InvestorID` | `TThostFtdcInvestorIDType` | Investor code used by the trading account. |
| `reserve1` | `TThostFtdcOldInstrumentIDType` | Carries the reserve1 for the current request or response. |
| `OrderRef` | `TThostFtdcOrderRefType` | Client-side order reference used to correlate later order events. |
| `UserID` | `TThostFtdcUserIDType` | User code associated with the current login identity. |
| `OrderPriceType` | `TThostFtdcOrderPriceTypeType` | Pricing mode, such as limit price or market-style price. |
| `Direction` | `TThostFtdcDirectionType` | Buy or sell direction of the trading instruction. |
| `CombOffsetFlag` | `TThostFtdcCombOffsetFlagType` | Open or close intent for the order legs. |
| `CombHedgeFlag` | `TThostFtdcCombHedgeFlagType` | Hedge classification for the instruction. |
| `LimitPrice` | `TThostFtdcPriceType` | Explicit price used by price-limited instructions. |
| `VolumeTotalOriginal` | `TThostFtdcVolumeType` | Original requested volume of the instruction. |
| `TimeCondition` | `TThostFtdcTimeConditionType` | Lifetime condition that controls how long the order stays active. |
| `GTDDate` | `TThostFtdcDateType` | Good-till-date value used when the order lifetime depends on a date. |
| `VolumeCondition` | `TThostFtdcVolumeConditionType` | Fill condition that constrains how much must be traded at once. |
| `MinVolume` | `TThostFtdcVolumeType` | Minimum executable volume accepted for the instruction. |
| `ContingentCondition` | `TThostFtdcContingentConditionType` | Trigger condition that activates a contingent order. |
| `StopPrice` | `TThostFtdcPriceType` | Trigger price used by contingent instructions. |
| `ForceCloseReason` | `TThostFtdcForceCloseReasonType` | Reason code used when force-close semantics apply. |
| `IsAutoSuspend` | `TThostFtdcBoolType` | Whether the instruction should enter the auto-suspend path. |
| `BusinessUnit` | `TThostFtdcBusinessUnitType` | Free-form business tag used for routing or attribution. |
| `RequestID` | `TThostFtdcRequestIDType` | Client-generated request identifier used for response correlation. |
| `UserForceClose` | `TThostFtdcBoolType` | Whether the order is flagged as a user-initiated force close. |
| `ExchangeID` | `TThostFtdcExchangeIDType` | Exchange code that disambiguates the target venue. |
| `ParkedOrderID` | `TThostFtdcParkedOrderIDType` | Carries the parked order identifier for the current request or response. |
| `UserType` | `TThostFtdcUserTypeType` | Carries the user type for the current request or response. |
| `Status` | `TThostFtdcParkedOrderStatusType` | Carries the status for the current request or response. |
| `ErrorID` | `TThostFtdcErrorIDType` | Numeric error code returned by the API. |
| `ErrorMsg` | `TThostFtdcErrorMsgType` | Human-readable error message returned by the API. |
| `IsSwapOrder` | `TThostFtdcBoolType` | Whether the order participates in the swap-order path. |
| `AccountID` | `TThostFtdcAccountIDType` | Futures-side account identifier. |
| `CurrencyID` | `TThostFtdcCurrencyIDType` | Currency code used for balance and transfer values. |
| `ClientID` | `TThostFtdcClientIDType` | Client identifier supplied by the brokerage environment. |
| `InvestUnitID` | `TThostFtdcInvestUnitIDType` | Investment unit identifier used by the account model. |
| `reserve2` | `TThostFtdcOldIPAddressType` | Carries the reserve2 for the current request or response. |
| `MacAddress` | `TThostFtdcMacAddressType` | Client MAC address reported to the server. |
| `InstrumentID` | `TThostFtdcInstrumentIDType` | Instrument symbol for the target contract. |
| `IPAddress` | `TThostFtdcIPAddressType` | Client IP address reported to the server. |

**Structure layout**

```cpp
struct CThostFtdcParkedOrderField
{

    TThostFtdcBrokerIDType  BrokerID;

    TThostFtdcInvestorIDType    InvestorID;

    TThostFtdcOldInstrumentIDType   reserve1;

    TThostFtdcOrderRefType  OrderRef;

    TThostFtdcUserIDType    UserID;

    TThostFtdcOrderPriceTypeType    OrderPriceType;

    TThostFtdcDirectionType Direction;

    TThostFtdcCombOffsetFlagType    CombOffsetFlag;

    TThostFtdcCombHedgeFlagType CombHedgeFlag;

    TThostFtdcPriceType LimitPrice;

    TThostFtdcVolumeType    VolumeTotalOriginal;

    TThostFtdcTimeConditionType TimeCondition;

    TThostFtdcDateType  GTDDate;

    TThostFtdcVolumeConditionType   VolumeCondition;

    TThostFtdcVolumeType    MinVolume;

    TThostFtdcContingentConditionType   ContingentCondition;

    TThostFtdcPriceType StopPrice;

    TThostFtdcForceCloseReasonType  ForceCloseReason;

    TThostFtdcBoolType  IsAutoSuspend;

    TThostFtdcBusinessUnitType  BusinessUnit;

    TThostFtdcRequestIDType RequestID;

    TThostFtdcBoolType  UserForceClose;

    TThostFtdcExchangeIDType    ExchangeID;

    TThostFtdcParkedOrderIDType ParkedOrderID;

    TThostFtdcUserTypeType  UserType;

    TThostFtdcParkedOrderStatusType Status;

    TThostFtdcErrorIDType   ErrorID;

    TThostFtdcErrorMsgType  ErrorMsg;

    TThostFtdcBoolType  IsSwapOrder;

    TThostFtdcAccountIDType AccountID;

    TThostFtdcCurrencyIDType    CurrencyID;

    TThostFtdcClientIDType  ClientID;

    TThostFtdcInvestUnitIDType  InvestUnitID;

    TThostFtdcOldIPAddressType  reserve2;

    TThostFtdcMacAddressType    MacAddress;

    TThostFtdcInstrumentIDType  InstrumentID;

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

    TThostFtdcErrorIDType ErrorID;

    TThostFtdcErrorMsgType ErrorMsg;
};
```

**Usage example**

```cpp
void MySpi::OnRspQryParkedOrder() {
    // Mark the event in your session state machine and send the next step if needed.
}
```

**Implementation notes**

- Make callback handlers idempotent because reconnect and replay semantics can surface the same business object more than once.
- Do not block the SPI thread with long business logic; hand the event to a worker queue when processing becomes expensive.

## OnRspQryParkedOrderAction

`OnRspQryParkedOrderAction` is an event callback that reports state back from the CTP runtime into the client application.

- Kind: callback
- Owning interface: `CThostFtdcTraderSpi`
- Related symbols: `ReqQryParkedOrderAction`

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

**Field guide for `CThostFtdcParkedOrderActionField`**

| Field | Type | Purpose |
| --- | --- | --- |
| `BrokerID` | `TThostFtdcBrokerIDType` | Broker code that scopes the request or identifies the response owner. |
| `InvestorID` | `TThostFtdcInvestorIDType` | Investor code used by the trading account. |
| `OrderActionRef` | `TThostFtdcOrderActionRefType` | Carries the order action reference for the current request or response. |
| `OrderRef` | `TThostFtdcOrderRefType` | Client-side order reference used to correlate later order events. |
| `RequestID` | `TThostFtdcRequestIDType` | Client-generated request identifier used for response correlation. |
| `FrontID` | `TThostFtdcFrontIDType` | Front identifier assigned by the server for the current login session. |
| `SessionID` | `TThostFtdcSessionIDType` | Session identifier assigned by the server for the current login session. |
| `ExchangeID` | `TThostFtdcExchangeIDType` | Exchange code that disambiguates the target venue. |
| `OrderSysID` | `TThostFtdcOrderSysIDType` | Carries the order sys identifier for the current request or response. |
| `ActionFlag` | `TThostFtdcActionFlagType` | Carries the action flag for the current request or response. |
| `LimitPrice` | `TThostFtdcPriceType` | Explicit price used by price-limited instructions. |
| `VolumeChange` | `TThostFtdcVolumeType` | Carries the volume change for the current request or response. |
| `UserID` | `TThostFtdcUserIDType` | User code associated with the current login identity. |
| `reserve1` | `TThostFtdcOldInstrumentIDType` | Carries the reserve1 for the current request or response. |
| `ParkedOrderActionID` | `TThostFtdcParkedOrderActionIDType` | Carries the parked order action identifier for the current request or response. |
| `UserType` | `TThostFtdcUserTypeType` | Carries the user type for the current request or response. |
| `Status` | `TThostFtdcParkedOrderStatusType` | Carries the status for the current request or response. |
| `ErrorID` | `TThostFtdcErrorIDType` | Numeric error code returned by the API. |
| `ErrorMsg` | `TThostFtdcErrorMsgType` | Human-readable error message returned by the API. |
| `InvestUnitID` | `TThostFtdcInvestUnitIDType` | Investment unit identifier used by the account model. |
| `reserve2` | `TThostFtdcOldIPAddressType` | Carries the reserve2 for the current request or response. |
| `MacAddress` | `TThostFtdcMacAddressType` | Client MAC address reported to the server. |
| `InstrumentID` | `TThostFtdcInstrumentIDType` | Instrument symbol for the target contract. |
| `IPAddress` | `TThostFtdcIPAddressType` | Client IP address reported to the server. |

**Structure layout**

```cpp
struct CThostFtdcParkedOrderActionField
{

    TThostFtdcBrokerIDType  BrokerID;

    TThostFtdcInvestorIDType    InvestorID;

    TThostFtdcOrderActionRefType    OrderActionRef;

    TThostFtdcOrderRefType  OrderRef;

    TThostFtdcRequestIDType RequestID;

    TThostFtdcFrontIDType   FrontID;

    TThostFtdcSessionIDType SessionID;

    TThostFtdcExchangeIDType    ExchangeID;

    TThostFtdcOrderSysIDType    OrderSysID;

    TThostFtdcActionFlagType    ActionFlag;

    TThostFtdcPriceType LimitPrice;

    TThostFtdcVolumeType    VolumeChange;

    TThostFtdcUserIDType    UserID;

    TThostFtdcOldInstrumentIDType   reserve1;

    TThostFtdcParkedOrderActionIDType   ParkedOrderActionID;

    TThostFtdcUserTypeType  UserType;

    TThostFtdcParkedOrderStatusType Status;

    TThostFtdcErrorIDType   ErrorID;

    TThostFtdcErrorMsgType  ErrorMsg;

    TThostFtdcInvestUnitIDType  InvestUnitID;

    TThostFtdcOldIPAddressType  reserve2;

    TThostFtdcMacAddressType    MacAddress;

    TThostFtdcInstrumentIDType  InstrumentID;

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

    TThostFtdcErrorIDType ErrorID;

    TThostFtdcErrorMsgType ErrorMsg;
};
```

**Usage example**

```cpp
void MySpi::OnRspQryParkedOrderAction() {
    // Mark the event in your session state machine and send the next step if needed.
}
```

**Implementation notes**

- Make callback handlers idempotent because reconnect and replay semantics can surface the same business object more than once.
- Do not block the SPI thread with long business logic; hand the event to a worker queue when processing becomes expensive.

## OnRspQryQuote

`OnRspQryQuote` is an event callback that reports state back from the CTP runtime into the client application.

- Kind: callback
- Owning interface: `CThostFtdcTraderSpi`
- Related symbols: `ReqQryQuote`

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

**Field guide for `CThostFtdcQuoteField`**

| Field | Type | Purpose |
| --- | --- | --- |
| `BrokerID` | `TThostFtdcBrokerIDType` | Broker code that scopes the request or identifies the response owner. |
| `InvestorID` | `TThostFtdcInvestorIDType` | Investor code used by the trading account. |
| `reserve1` | `TThostFtdcOldInstrumentIDType` | Carries the reserve1 for the current request or response. |
| `QuoteRef` | `TThostFtdcOrderRefType` | Carries the quote reference for the current request or response. |
| `UserID` | `TThostFtdcUserIDType` | User code associated with the current login identity. |
| `AskPrice` | `TThostFtdcPriceType` | Carries the ask price for the current request or response. |
| `BidPrice` | `TThostFtdcPriceType` | Carries the bid price for the current request or response. |
| `AskVolume` | `TThostFtdcVolumeType` | Carries the ask volume for the current request or response. |
| `BidVolume` | `TThostFtdcVolumeType` | Carries the bid volume for the current request or response. |
| `RequestID` | `TThostFtdcRequestIDType` | Client-generated request identifier used for response correlation. |
| `BusinessUnit` | `TThostFtdcBusinessUnitType` | Free-form business tag used for routing or attribution. |
| `AskOffsetFlag` | `TThostFtdcOffsetFlagType` | Carries the ask offset flag for the current request or response. |
| `BidOffsetFlag` | `TThostFtdcOffsetFlagType` | Carries the bid offset flag for the current request or response. |
| `AskHedgeFlag` | `TThostFtdcHedgeFlagType` | Carries the ask hedge flag for the current request or response. |
| `BidHedgeFlag` | `TThostFtdcHedgeFlagType` | Carries the bid hedge flag for the current request or response. |
| `QuoteLocalID` | `TThostFtdcOrderLocalIDType` | Carries the quote local identifier for the current request or response. |
| `ExchangeID` | `TThostFtdcExchangeIDType` | Exchange code that disambiguates the target venue. |
| `ParticipantID` | `TThostFtdcParticipantIDType` | Carries the participant identifier for the current request or response. |
| `ClientID` | `TThostFtdcClientIDType` | Client identifier supplied by the brokerage environment. |
| `reserve2` | `TThostFtdcOldExchangeInstIDType` | Carries the reserve2 for the current request or response. |
| `TraderID` | `TThostFtdcTraderIDType` | Carries the trader identifier for the current request or response. |
| `InstallID` | `TThostFtdcInstallIDType` | Carries the install identifier for the current request or response. |
| `NotifySequence` | `TThostFtdcSequenceNoType` | Carries the notify sequence for the current request or response. |
| `OrderSubmitStatus` | `TThostFtdcOrderSubmitStatusType` | Carries the order submit status for the current request or response. |
| `TradingDay` | `TThostFtdcDateType` | Trading date visible to the current trading system session. |
| `SettlementID` | `TThostFtdcSettlementIDType` | Carries the settlement identifier for the current request or response. |
| `QuoteSysID` | `TThostFtdcOrderSysIDType` | Carries the quote sys identifier for the current request or response. |
| `InsertDate` | `TThostFtdcDateType` | Carries the insert date for the current request or response. |
| `InsertTime` | `TThostFtdcTimeType` | Carries the insert time for the current request or response. |
| `CancelTime` | `TThostFtdcTimeType` | Carries the cancel time for the current request or response. |
| `QuoteStatus` | `TThostFtdcOrderStatusType` | Carries the quote status for the current request or response. |
| `ClearingPartID` | `TThostFtdcParticipantIDType` | Carries the clearing part identifier for the current request or response. |
| `SequenceNo` | `TThostFtdcSequenceNoType` | Carries the sequence no for the current request or response. |
| `AskOrderSysID` | `TThostFtdcOrderSysIDType` | Carries the ask order sys identifier for the current request or response. |
| `BidOrderSysID` | `TThostFtdcOrderSysIDType` | Carries the bid order sys identifier for the current request or response. |
| `FrontID` | `TThostFtdcFrontIDType` | Front identifier assigned by the server for the current login session. |
| `SessionID` | `TThostFtdcSessionIDType` | Session identifier assigned by the server for the current login session. |
| `UserProductInfo` | `TThostFtdcProductInfoType` | Client product string used during authentication or login. |
| `StatusMsg` | `TThostFtdcErrorMsgType` | Carries the status msg for the current request or response. |
| `ActiveUserID` | `TThostFtdcUserIDType` | Carries the active user identifier for the current request or response. |
| `BrokerQuoteSeq` | `TThostFtdcSequenceNoType` | Carries the broker quote sequence for the current request or response. |
| `AskOrderRef` | `TThostFtdcOrderRefType` | Carries the ask order reference for the current request or response. |
| `BidOrderRef` | `TThostFtdcOrderRefType` | Carries the bid order reference for the current request or response. |
| `ForQuoteSysID` | `TThostFtdcOrderSysIDType` | Carries the for quote sys identifier for the current request or response. |
| `BranchID` | `TThostFtdcBranchIDType` | Carries the branch identifier for the current request or response. |
| `InvestUnitID` | `TThostFtdcInvestUnitIDType` | Investment unit identifier used by the account model. |
| `AccountID` | `TThostFtdcAccountIDType` | Futures-side account identifier. |
| `CurrencyID` | `TThostFtdcCurrencyIDType` | Currency code used for balance and transfer values. |
| `reserve3` | `TThostFtdcOldIPAddressType` | Carries the reserve3 for the current request or response. |
| `MacAddress` | `TThostFtdcMacAddressType` | Client MAC address reported to the server. |
| `InstrumentID` | `TThostFtdcInstrumentIDType` | Instrument symbol for the target contract. |
| `ExchangeInstID` | `TThostFtdcExchangeInstIDType` | Carries the exchange inst identifier for the current request or response. |
| `IPAddress` | `TThostFtdcIPAddressType` | Client IP address reported to the server. |
| `ReplaceSysID` | `TThostFtdcOrderSysIDType` | Carries the replace sys identifier for the current request or response. |
| `TimeCondition` | `TThostFtdcTimeConditionType` | Lifetime condition that controls how long the order stays active. |
| `OrderMemo` | `TThostFtdcOrderMemoType` | Client memo attached to the order. |
| `SessionReqSeq` | `TThostFtdcSequenceNo12Type` | Per-session request sequence used by some server paths. |

**Structure layout**

```cpp
struct CThostFtdcQuoteField
{

    TThostFtdcBrokerIDType  BrokerID;

    TThostFtdcInvestorIDType    InvestorID;

    TThostFtdcOldInstrumentIDType   reserve1;

    TThostFtdcOrderRefType  QuoteRef;

    TThostFtdcUserIDType    UserID;

    TThostFtdcPriceType AskPrice;

    TThostFtdcPriceType BidPrice;

    TThostFtdcVolumeType    AskVolume;

    TThostFtdcVolumeType    BidVolume;

    TThostFtdcRequestIDType RequestID;

    TThostFtdcBusinessUnitType  BusinessUnit;

    TThostFtdcOffsetFlagType    AskOffsetFlag;

    TThostFtdcOffsetFlagType    BidOffsetFlag;

    TThostFtdcHedgeFlagType AskHedgeFlag;

    TThostFtdcHedgeFlagType BidHedgeFlag;

    TThostFtdcOrderLocalIDType  QuoteLocalID;

    TThostFtdcExchangeIDType    ExchangeID;

    TThostFtdcParticipantIDType ParticipantID;

    TThostFtdcClientIDType  ClientID;

    TThostFtdcOldExchangeInstIDType reserve2;

    TThostFtdcTraderIDType  TraderID;

    TThostFtdcInstallIDType InstallID;

    TThostFtdcSequenceNoType    NotifySequence;

    TThostFtdcOrderSubmitStatusType OrderSubmitStatus;

    TThostFtdcDateType  TradingDay;

    TThostFtdcSettlementIDType  SettlementID;

    TThostFtdcOrderSysIDType    QuoteSysID;

    TThostFtdcDateType  InsertDate;

    TThostFtdcTimeType  InsertTime;

    TThostFtdcTimeType  CancelTime;

    TThostFtdcOrderStatusType   QuoteStatus;

    TThostFtdcParticipantIDType ClearingPartID;

    TThostFtdcSequenceNoType    SequenceNo;

    TThostFtdcOrderSysIDType    AskOrderSysID;

    TThostFtdcOrderSysIDType    BidOrderSysID;

    TThostFtdcFrontIDType   FrontID;

    TThostFtdcSessionIDType SessionID;

    TThostFtdcProductInfoType   UserProductInfo;

    TThostFtdcErrorMsgType  StatusMsg;

    TThostFtdcUserIDType    ActiveUserID;

    TThostFtdcSequenceNoType    BrokerQuoteSeq;

    TThostFtdcOrderRefType  AskOrderRef;

    TThostFtdcOrderRefType  BidOrderRef;

    TThostFtdcOrderSysIDType    ForQuoteSysID;

    TThostFtdcBranchIDType  BranchID;

    TThostFtdcInvestUnitIDType  InvestUnitID;

    TThostFtdcAccountIDType AccountID;

    TThostFtdcCurrencyIDType    CurrencyID;

    TThostFtdcOldIPAddressType  reserve3;

    TThostFtdcMacAddressType    MacAddress;

    TThostFtdcInstrumentIDType  InstrumentID;

    TThostFtdcExchangeInstIDType    ExchangeInstID;

    TThostFtdcIPAddressType IPAddress;

    TThostFtdcOrderSysIDType    ReplaceSysID;

    TThostFtdcTimeConditionType TimeCondition;

    TThostFtdcOrderMemoType OrderMemo;

    TThostFtdcSequenceNo12Type  SessionReqSeq;
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
void MySpi::OnRspQryQuote() {
    // Mark the event in your session state machine and send the next step if needed.
}
```

**Implementation notes**

- Make callback handlers idempotent because reconnect and replay semantics can surface the same business object more than once.
- Do not block the SPI thread with long business logic; hand the event to a worker queue when processing becomes expensive.

## OnRspQryTrade

`OnRspQryTrade` is an event callback that reports state back from the CTP runtime into the client application.

- Kind: callback
- Owning interface: `CThostFtdcTraderSpi`
- Related symbols: `ReqQryTrade`

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

**Field guide for `CThostFtdcTradeField`**

| Field | Type | Purpose |
| --- | --- | --- |
| `BrokerID` | `TThostFtdcBrokerIDType` | Broker code that scopes the request or identifies the response owner. |
| `InvestorID` | `TThostFtdcInvestorIDType` | Investor code used by the trading account. |
| `reserve1` | `TThostFtdcOldInstrumentIDType` | Carries the reserve1 for the current request or response. |
| `OrderRef` | `TThostFtdcOrderRefType` | Client-side order reference used to correlate later order events. |
| `UserID` | `TThostFtdcUserIDType` | User code associated with the current login identity. |
| `ExchangeID` | `TThostFtdcExchangeIDType` | Exchange code that disambiguates the target venue. |
| `TradeID` | `TThostFtdcTradeIDType` | Carries the trade identifier for the current request or response. |
| `Direction` | `TThostFtdcDirectionType` | Buy or sell direction of the trading instruction. |
| `OrderSysID` | `TThostFtdcOrderSysIDType` | Carries the order sys identifier for the current request or response. |
| `ParticipantID` | `TThostFtdcParticipantIDType` | Carries the participant identifier for the current request or response. |
| `ClientID` | `TThostFtdcClientIDType` | Client identifier supplied by the brokerage environment. |
| `TradingRole` | `TThostFtdcTradingRoleType` | Carries the trading role for the current request or response. |
| `reserve2` | `TThostFtdcOldExchangeInstIDType` | Carries the reserve2 for the current request or response. |
| `OffsetFlag` | `TThostFtdcOffsetFlagType` | Carries the offset flag for the current request or response. |
| `HedgeFlag` | `TThostFtdcHedgeFlagType` | Carries the hedge flag for the current request or response. |
| `Price` | `TThostFtdcPriceType` | Carries the price for the current request or response. |
| `Volume` | `TThostFtdcVolumeType` | Carries the volume for the current request or response. |
| `TradeDate` | `TThostFtdcDateType` | Business date attached to the transfer or trade record. |
| `TradeTime` | `TThostFtdcTimeType` | Business time attached to the transfer or trade record. |
| `TradeType` | `TThostFtdcTradeTypeType` | Carries the trade type for the current request or response. |
| `PriceSource` | `TThostFtdcPriceSourceType` | Carries the price source for the current request or response. |
| `TraderID` | `TThostFtdcTraderIDType` | Carries the trader identifier for the current request or response. |
| `OrderLocalID` | `TThostFtdcOrderLocalIDType` | Carries the order local identifier for the current request or response. |
| `ClearingPartID` | `TThostFtdcParticipantIDType` | Carries the clearing part identifier for the current request or response. |
| `BusinessUnit` | `TThostFtdcBusinessUnitType` | Free-form business tag used for routing or attribution. |
| `SequenceNo` | `TThostFtdcSequenceNoType` | Carries the sequence no for the current request or response. |
| `TradingDay` | `TThostFtdcDateType` | Trading date visible to the current trading system session. |
| `SettlementID` | `TThostFtdcSettlementIDType` | Carries the settlement identifier for the current request or response. |
| `BrokerOrderSeq` | `TThostFtdcSequenceNoType` | Carries the broker order sequence for the current request or response. |
| `TradeSource` | `TThostFtdcTradeSourceType` | Carries the trade source for the current request or response. |
| `InvestUnitID` | `TThostFtdcInvestUnitIDType` | Investment unit identifier used by the account model. |
| `InstrumentID` | `TThostFtdcInstrumentIDType` | Instrument symbol for the target contract. |
| `ExchangeInstID` | `TThostFtdcExchangeInstIDType` | Carries the exchange inst identifier for the current request or response. |

**Structure layout**

```cpp
struct CThostFtdcTradeField
{

    TThostFtdcBrokerIDType  BrokerID;

    TThostFtdcInvestorIDType    InvestorID;

    TThostFtdcOldInstrumentIDType   reserve1;

    TThostFtdcOrderRefType  OrderRef;

    TThostFtdcUserIDType    UserID;

    TThostFtdcExchangeIDType    ExchangeID;

    TThostFtdcTradeIDType   TradeID;

    TThostFtdcDirectionType Direction;

    TThostFtdcOrderSysIDType    OrderSysID;

    TThostFtdcParticipantIDType ParticipantID;

    TThostFtdcClientIDType  ClientID;

    TThostFtdcTradingRoleType   TradingRole;

    TThostFtdcOldExchangeInstIDType reserve2;

    TThostFtdcOffsetFlagType    OffsetFlag;

    TThostFtdcHedgeFlagType HedgeFlag;

    TThostFtdcPriceType Price;

    TThostFtdcVolumeType    Volume;

    TThostFtdcDateType  TradeDate;

    TThostFtdcTimeType  TradeTime;

    TThostFtdcTradeTypeType TradeType;

    TThostFtdcPriceSourceType   PriceSource;

    TThostFtdcTraderIDType  TraderID;

    TThostFtdcOrderLocalIDType  OrderLocalID;

    TThostFtdcParticipantIDType ClearingPartID;

    TThostFtdcBusinessUnitType  BusinessUnit;

    TThostFtdcSequenceNoType    SequenceNo;

    TThostFtdcDateType  TradingDay;

    TThostFtdcSettlementIDType  SettlementID;

    TThostFtdcSequenceNoType    BrokerOrderSeq;

    TThostFtdcTradeSourceType   TradeSource;

    TThostFtdcInvestUnitIDType  InvestUnitID;

    TThostFtdcInstrumentIDType  InstrumentID;

    TThostFtdcExchangeInstIDType    ExchangeInstID;
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
void MySpi::OnRspQryTrade() {
    // Mark the event in your session state machine and send the next step if needed.
}
```

**Implementation notes**

- Make callback handlers idempotent because reconnect and replay semantics can surface the same business object more than once.
- Do not block the SPI thread with long business logic; hand the event to a worker queue when processing becomes expensive.

## OnRspQryMaxOrderVolume

`OnRspQryMaxOrderVolume` is an event callback that reports state back from the CTP runtime into the client application.

- Kind: callback
- Owning interface: `CThostFtdcTraderSpi`
- Related symbols: `ReqQryMaxOrderVolume`

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

**Field guide for `CThostFtdcQryMaxOrderVolumeField`**

| Field | Type | Purpose |
| --- | --- | --- |
| `BrokerID` | `TThostFtdcBrokerIDType` | Broker code that scopes the request or identifies the response owner. |
| `InvestorID` | `TThostFtdcInvestorIDType` | Investor code used by the trading account. |
| `reserve1` | `TThostFtdcOldInstrumentIDType` | Carries the reserve1 for the current request or response. |
| `InstrumentID` | `TThostFtdcInstrumentIDType` | Instrument symbol for the target contract. |
| `Direction` | `TThostFtdcDirectionType` | Buy or sell direction of the trading instruction. |
| `OffsetFlag` | `TThostFtdcOffsetFlagType` | Carries the offset flag for the current request or response. |
| `HedgeFlag` | `TThostFtdcHedgeFlagType` | Carries the hedge flag for the current request or response. |
| `MaxVolume` | `TThostFtdcVolumeType` | Carries the maximum volume for the current request or response. |
| `ExchangeID` | `TThostFtdcExchangeIDType` | Exchange code that disambiguates the target venue. |
| `InvestUnitID` | `TThostFtdcInvestUnitIDType` | Investment unit identifier used by the account model. |

**Structure layout**

```cpp
struct CThostFtdcQryMaxOrderVolumeField
{

    TThostFtdcBrokerIDType BrokerID;

    TThostFtdcInvestorIDType InvestorID;

    TThostFtdcOldInstrumentIDType   reserve1;

    TThostFtdcInstrumentIDType InstrumentID;

    TThostFtdcDirectionType Direction;

    TThostFtdcOffsetFlagType OffsetFlag;

    TThostFtdcHedgeFlagType HedgeFlag;

    TThostFtdcVolumeType MaxVolume;

    TThostFtdcExchangeIDType ExchangeID;

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
void MySpi::OnRspQryMaxOrderVolume() {
    // Mark the event in your session state machine and send the next step if needed.
}
```

**Implementation notes**

- Make callback handlers idempotent because reconnect and replay semantics can surface the same business object more than once.
- Do not block the SPI thread with long business logic; hand the event to a worker queue when processing becomes expensive.
