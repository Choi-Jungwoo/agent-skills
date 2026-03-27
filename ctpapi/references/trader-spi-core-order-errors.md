# CTP trader SPI order-path asynchronous errors

This reference covers asynchronous error callbacks emitted by trader-side order, quote, exec-order, and offset-setting paths.

| Entry | Kind |
| --- | --- |
| OnErrRtnBatchOrderAction | callback |
| OnErrRtnCombActionInsert | callback |
| OnErrRtnExecOrderAction | callback |
| OnErrRtnExecOrderInsert | callback |
| OnErrRtnForQuoteInsert | callback |
| OnErrRtnOptionSelfCloseAction | callback |
| OnErrRtnOptionSelfCloseInsert | callback |
| OnErrRtnOrderAction | callback |
| OnErrRtnOrderInsert | callback |
| OnErrRtnQuoteAction | callback |
| OnErrRtnQuoteInsert | callback |
| OnErrRtnOffsetSetting | callback |
| OnErrRtnCancelOffsetSetting | callback |

## OnErrRtnBatchOrderAction

`OnErrRtnBatchOrderAction` is an event callback that reports state back from the CTP runtime into the client application.

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

- This callback signals an asynchronous failure after the original request has already been accepted locally.
- Keep it separate from the immediate request return code because both can be present in the same business flow.

**Field guide for `CThostFtdcBatchOrderActionField`**

| Field | Type | Purpose |
| --- | --- | --- |
| `BrokerID` | `TThostFtdcBrokerIDType` | Broker code that scopes the request or identifies the response owner. |
| `InvestorID` | `TThostFtdcInvestorIDType` | Investor code used by the trading account. |
| `OrderActionRef` | `TThostFtdcOrderActionRefType` | Carries the order action reference for the current request or response. |
| `RequestID` | `TThostFtdcRequestIDType` | Client-generated request identifier used for response correlation. |
| `FrontID` | `TThostFtdcFrontIDType` | Front identifier assigned by the server for the current login session. |
| `SessionID` | `TThostFtdcSessionIDType` | Session identifier assigned by the server for the current login session. |
| `ExchangeID` | `TThostFtdcExchangeIDType` | Exchange code that disambiguates the target venue. |
| `ActionDate` | `TThostFtdcDateType` | Carries the action date for the current request or response. |
| `ActionTime` | `TThostFtdcTimeType` | Carries the action time for the current request or response. |
| `TraderID` | `TThostFtdcTraderIDType` | Carries the trader identifier for the current request or response. |
| `InstallID` | `TThostFtdcInstallIDType` | Carries the install identifier for the current request or response. |
| `ActionLocalID` | `TThostFtdcOrderLocalIDType` | Carries the action local identifier for the current request or response. |
| `ParticipantID` | `TThostFtdcParticipantIDType` | Carries the participant identifier for the current request or response. |
| `ClientID` | `TThostFtdcClientIDType` | Client identifier supplied by the brokerage environment. |
| `BusinessUnit` | `TThostFtdcBusinessUnitType` | Free-form business tag used for routing or attribution. |
| `OrderActionStatus` | `TThostFtdcOrderActionStatusType` | Carries the order action status for the current request or response. |
| `UserID` | `TThostFtdcUserIDType` | User code associated with the current login identity. |
| `StatusMsg` | `TThostFtdcErrorMsgType` | Carries the status msg for the current request or response. |
| `InvestUnitID` | `TThostFtdcInvestUnitIDType` | Investment unit identifier used by the account model. |
| `reserve1` | `TThostFtdcOldIPAddressType` | Carries the reserve1 for the current request or response. |
| `MacAddress` | `TThostFtdcMacAddressType` | Client MAC address reported to the server. |
| `IPAddress` | `TThostFtdcIPAddressType` | Client IP address reported to the server. |

**Structure layout**

```cpp
struct CThostFtdcBatchOrderActionField
{

    TThostFtdcBrokerIDType  BrokerID;

    TThostFtdcInvestorIDType    InvestorID;

    TThostFtdcOrderActionRefType    OrderActionRef;

    TThostFtdcRequestIDType RequestID;

    TThostFtdcFrontIDType   FrontID;

    TThostFtdcSessionIDType SessionID;

    TThostFtdcExchangeIDType    ExchangeID;

    TThostFtdcDateType  ActionDate;

    TThostFtdcTimeType  ActionTime;

    TThostFtdcTraderIDType  TraderID;

    TThostFtdcInstallIDType InstallID;

    TThostFtdcOrderLocalIDType  ActionLocalID;

    TThostFtdcParticipantIDType ParticipantID;

    TThostFtdcClientIDType  ClientID;

    TThostFtdcBusinessUnitType  BusinessUnit;

    TThostFtdcOrderActionStatusType OrderActionStatus;

    TThostFtdcUserIDType    UserID;

    TThostFtdcErrorMsgType  StatusMsg;

    TThostFtdcInvestUnitIDType  InvestUnitID;

    TThostFtdcOldIPAddressType  reserve1;

    TThostFtdcMacAddressType    MacAddress;

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
void MySpi::OnErrRtnBatchOrderAction() {
    // Mark the event in your session state machine and send the next step if needed.
}
```

**Implementation notes**

- Make callback handlers idempotent because reconnect and replay semantics can surface the same business object more than once.
- Do not block the SPI thread with long business logic; hand the event to a worker queue when processing becomes expensive.

## OnErrRtnCombActionInsert

`OnErrRtnCombActionInsert` is an event callback that reports state back from the CTP runtime into the client application.

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

- This callback signals an asynchronous failure after the original request has already been accepted locally.
- Keep it separate from the immediate request return code because both can be present in the same business flow.

**Field guide for `CThostFtdcInputCombActionField`**

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
| `ExchangeID` | `TThostFtdcExchangeIDType` | Exchange code that disambiguates the target venue. |
| `reserve2` | `TThostFtdcOldIPAddressType` | Carries the reserve2 for the current request or response. |
| `MacAddress` | `TThostFtdcMacAddressType` | Client MAC address reported to the server. |
| `InvestUnitID` | `TThostFtdcInvestUnitIDType` | Investment unit identifier used by the account model. |
| `FrontID` | `TThostFtdcFrontIDType` | Front identifier assigned by the server for the current login session. |
| `SessionID` | `TThostFtdcSessionIDType` | Session identifier assigned by the server for the current login session. |
| `InstrumentID` | `TThostFtdcInstrumentIDType` | Instrument symbol for the target contract. |
| `IPAddress` | `TThostFtdcIPAddressType` | Client IP address reported to the server. |

**Structure layout**

```cpp
struct CThostFtdcInputCombActionField
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

    TThostFtdcExchangeIDType    ExchangeID;

    TThostFtdcOldIPAddressType  reserve2;

    TThostFtdcMacAddressType    MacAddress;

    TThostFtdcInvestUnitIDType  InvestUnitID;

    TThostFtdcFrontIDType   FrontID;

    TThostFtdcSessionIDType SessionID;

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
void MySpi::OnErrRtnCombActionInsert() {
    // Mark the event in your session state machine and send the next step if needed.
}
```

**Implementation notes**

- Make callback handlers idempotent because reconnect and replay semantics can surface the same business object more than once.
- Do not block the SPI thread with long business logic; hand the event to a worker queue when processing becomes expensive.

## OnErrRtnExecOrderAction

`OnErrRtnExecOrderAction` is an event callback that reports state back from the CTP runtime into the client application.

- Kind: callback
- Owning interface: `CThostFtdcTraderSpi`
- Related symbols: `ReqExecOrderAction`

**When to use it**

- Drive event-based application state updates as server data arrives.
- Wake request waiters or publish the event into a higher-level message bus.

**How to apply it**

1. Validate the payload and error object before updating application state.
2. Correlate the event with the original request or subscription when a request id is present.
3. Persist the important identifiers and keep handler logic short so the SPI thread stays responsive.

**Callback and outcome model**

- This callback signals an asynchronous failure after the original request has already been accepted locally.
- Keep it separate from the immediate request return code because both can be present in the same business flow.

**Field guide for `CThostFtdcExecOrderActionField`**

| Field | Type | Purpose |
| --- | --- | --- |
| `BrokerID` | `TThostFtdcBrokerIDType` | Broker code that scopes the request or identifies the response owner. |
| `InvestorID` | `TThostFtdcInvestorIDType` | Investor code used by the trading account. |
| `ExecOrderActionRef` | `TThostFtdcOrderActionRefType` | Carries the exercise or exec-order order action reference for the current request or response. |
| `ExecOrderRef` | `TThostFtdcOrderRefType` | Carries the exercise or exec-order order reference for the current request or response. |
| `RequestID` | `TThostFtdcRequestIDType` | Client-generated request identifier used for response correlation. |
| `FrontID` | `TThostFtdcFrontIDType` | Front identifier assigned by the server for the current login session. |
| `SessionID` | `TThostFtdcSessionIDType` | Session identifier assigned by the server for the current login session. |
| `ExchangeID` | `TThostFtdcExchangeIDType` | Exchange code that disambiguates the target venue. |
| `ExecOrderSysID` | `TThostFtdcExecOrderSysIDType` | Carries the exercise or exec-order order sys identifier for the current request or response. |
| `ActionFlag` | `TThostFtdcActionFlagType` | Carries the action flag for the current request or response. |
| `ActionDate` | `TThostFtdcDateType` | Carries the action date for the current request or response. |
| `ActionTime` | `TThostFtdcTimeType` | Carries the action time for the current request or response. |
| `TraderID` | `TThostFtdcTraderIDType` | Carries the trader identifier for the current request or response. |
| `InstallID` | `TThostFtdcInstallIDType` | Carries the install identifier for the current request or response. |
| `ExecOrderLocalID` | `TThostFtdcOrderLocalIDType` | Carries the exercise or exec-order order local identifier for the current request or response. |
| `ActionLocalID` | `TThostFtdcOrderLocalIDType` | Carries the action local identifier for the current request or response. |
| `ParticipantID` | `TThostFtdcParticipantIDType` | Carries the participant identifier for the current request or response. |
| `ClientID` | `TThostFtdcClientIDType` | Client identifier supplied by the brokerage environment. |
| `BusinessUnit` | `TThostFtdcBusinessUnitType` | Free-form business tag used for routing or attribution. |
| `OrderActionStatus` | `TThostFtdcOrderActionStatusType` | Carries the order action status for the current request or response. |
| `UserID` | `TThostFtdcUserIDType` | User code associated with the current login identity. |
| `ActionType` | `TThostFtdcActionTypeType` | Carries the action type for the current request or response. |
| `StatusMsg` | `TThostFtdcErrorMsgType` | Carries the status msg for the current request or response. |
| `reserve1` | `TThostFtdcOldInstrumentIDType` | Carries the reserve1 for the current request or response. |
| `BranchID` | `TThostFtdcBranchIDType` | Carries the branch identifier for the current request or response. |
| `InvestUnitID` | `TThostFtdcInvestUnitIDType` | Investment unit identifier used by the account model. |
| `reserve2` | `TThostFtdcOldIPAddressType` | Carries the reserve2 for the current request or response. |
| `MacAddress` | `TThostFtdcMacAddressType` | Client MAC address reported to the server. |
| `InstrumentID` | `TThostFtdcInstrumentIDType` | Instrument symbol for the target contract. |
| `IPAddress` | `TThostFtdcIPAddressType` | Client IP address reported to the server. |

**Structure layout**

```cpp
struct CThostFtdcExecOrderActionField
{

    TThostFtdcBrokerIDType  BrokerID;

    TThostFtdcInvestorIDType    InvestorID;

    TThostFtdcOrderActionRefType    ExecOrderActionRef;

    TThostFtdcOrderRefType  ExecOrderRef;

    TThostFtdcRequestIDType RequestID;

    TThostFtdcFrontIDType   FrontID;

    TThostFtdcSessionIDType SessionID;

    TThostFtdcExchangeIDType    ExchangeID;

    TThostFtdcExecOrderSysIDType    ExecOrderSysID;

    TThostFtdcActionFlagType    ActionFlag;

    TThostFtdcDateType  ActionDate;

    TThostFtdcTimeType  ActionTime;

    TThostFtdcTraderIDType  TraderID;

    TThostFtdcInstallIDType InstallID;

    TThostFtdcOrderLocalIDType  ExecOrderLocalID;

    TThostFtdcOrderLocalIDType  ActionLocalID;

    TThostFtdcParticipantIDType ParticipantID;

    TThostFtdcClientIDType  ClientID;

    TThostFtdcBusinessUnitType  BusinessUnit;

    TThostFtdcOrderActionStatusType OrderActionStatus;

    TThostFtdcUserIDType    UserID;

    TThostFtdcActionTypeType    ActionType;

    TThostFtdcErrorMsgType  StatusMsg;

    TThostFtdcOldInstrumentIDType   reserve1;

    TThostFtdcBranchIDType  BranchID;

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
void MySpi::OnErrRtnExecOrderAction() {
    // Mark the event in your session state machine and send the next step if needed.
}
```

**Implementation notes**

- Make callback handlers idempotent because reconnect and replay semantics can surface the same business object more than once.
- Do not block the SPI thread with long business logic; hand the event to a worker queue when processing becomes expensive.

## OnErrRtnExecOrderInsert

`OnErrRtnExecOrderInsert` is an event callback that reports state back from the CTP runtime into the client application.

- Kind: callback
- Owning interface: `CThostFtdcTraderSpi`
- Related symbols: `ReqExecOrderInsert`

**When to use it**

- Drive event-based application state updates as server data arrives.
- Wake request waiters or publish the event into a higher-level message bus.

**How to apply it**

1. Validate the payload and error object before updating application state.
2. Correlate the event with the original request or subscription when a request id is present.
3. Persist the important identifiers and keep handler logic short so the SPI thread stays responsive.

**Callback and outcome model**

- This callback signals an asynchronous failure after the original request has already been accepted locally.
- Keep it separate from the immediate request return code because both can be present in the same business flow.

**Field guide for `CThostFtdcInputExecOrderField`**

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
| `ExchangeID` | `TThostFtdcExchangeIDType` | Exchange code that disambiguates the target venue. |
| `InvestUnitID` | `TThostFtdcInvestUnitIDType` | Investment unit identifier used by the account model. |
| `AccountID` | `TThostFtdcAccountIDType` | Futures-side account identifier. |
| `CurrencyID` | `TThostFtdcCurrencyIDType` | Currency code used for balance and transfer values. |
| `ClientID` | `TThostFtdcClientIDType` | Client identifier supplied by the brokerage environment. |
| `reserve2` | `TThostFtdcOldIPAddressType` | Carries the reserve2 for the current request or response. |
| `MacAddress` | `TThostFtdcMacAddressType` | Client MAC address reported to the server. |
| `InstrumentID` | `TThostFtdcInstrumentIDType` | Instrument symbol for the target contract. |
| `IPAddress` | `TThostFtdcIPAddressType` | Client IP address reported to the server. |

**Structure layout**

```cpp
struct CThostFtdcInputExecOrderField
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

    TThostFtdcExchangeIDType    ExchangeID;

    TThostFtdcInvestUnitIDType  InvestUnitID;

    TThostFtdcAccountIDType AccountID;

    TThostFtdcCurrencyIDType    CurrencyID;

    TThostFtdcClientIDType  ClientID;

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
void MySpi::OnErrRtnExecOrderInsert() {
    // Mark the event in your session state machine and send the next step if needed.
}
```

**Implementation notes**

- Make callback handlers idempotent because reconnect and replay semantics can surface the same business object more than once.
- Do not block the SPI thread with long business logic; hand the event to a worker queue when processing becomes expensive.

## OnErrRtnForQuoteInsert

`OnErrRtnForQuoteInsert` is an event callback that reports state back from the CTP runtime into the client application.

- Kind: callback
- Owning interface: `CThostFtdcTraderSpi`
- Related symbols: `ReqForQuoteInsert`

**When to use it**

- Drive event-based application state updates as server data arrives.
- Wake request waiters or publish the event into a higher-level message bus.

**How to apply it**

1. Validate the payload and error object before updating application state.
2. Correlate the event with the original request or subscription when a request id is present.
3. Persist the important identifiers and keep handler logic short so the SPI thread stays responsive.

**Callback and outcome model**

- This callback signals an asynchronous failure after the original request has already been accepted locally.
- Keep it separate from the immediate request return code because both can be present in the same business flow.

**Field guide for `CThostFtdcInputForQuoteField`**

| Field | Type | Purpose |
| --- | --- | --- |
| `BrokerID` | `TThostFtdcBrokerIDType` | Broker code that scopes the request or identifies the response owner. |
| `InvestorID` | `TThostFtdcInvestorIDType` | Investor code used by the trading account. |
| `reserve1` | `TThostFtdcOldInstrumentIDType` | Carries the reserve1 for the current request or response. |
| `ForQuoteRef` | `TThostFtdcOrderRefType` | Carries the for quote reference for the current request or response. |
| `UserID` | `TThostFtdcUserIDType` | User code associated with the current login identity. |
| `ExchangeID` | `TThostFtdcExchangeIDType` | Exchange code that disambiguates the target venue. |
| `InvestUnitID` | `TThostFtdcInvestUnitIDType` | Investment unit identifier used by the account model. |
| `reserve2` | `TThostFtdcOldIPAddressType` | Carries the reserve2 for the current request or response. |
| `MacAddress` | `TThostFtdcMacAddressType` | Client MAC address reported to the server. |
| `InstrumentID` | `TThostFtdcInstrumentIDType` | Instrument symbol for the target contract. |
| `IPAddress` | `TThostFtdcIPAddressType` | Client IP address reported to the server. |

**Structure layout**

```cpp
struct CThostFtdcInputForQuoteField
{

    TThostFtdcBrokerIDType  BrokerID;

    TThostFtdcInvestorIDType    InvestorID;

    TThostFtdcOldInstrumentIDType   reserve1;

    TThostFtdcOrderRefType  ForQuoteRef;

    TThostFtdcUserIDType    UserID;

    TThostFtdcExchangeIDType    ExchangeID;

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
void MySpi::OnErrRtnForQuoteInsert() {
    // Mark the event in your session state machine and send the next step if needed.
}
```

**Implementation notes**

- Make callback handlers idempotent because reconnect and replay semantics can surface the same business object more than once.
- Do not block the SPI thread with long business logic; hand the event to a worker queue when processing becomes expensive.

## OnErrRtnOptionSelfCloseAction

`OnErrRtnOptionSelfCloseAction` is an event callback that reports state back from the CTP runtime into the client application.

- Kind: callback
- Owning interface: `CThostFtdcTraderSpi`
- Related symbols: `ReqOptionSelfCloseAction`

**When to use it**

- Drive event-based application state updates as server data arrives.
- Wake request waiters or publish the event into a higher-level message bus.

**How to apply it**

1. Validate the payload and error object before updating application state.
2. Correlate the event with the original request or subscription when a request id is present.
3. Persist the important identifiers and keep handler logic short so the SPI thread stays responsive.

**Callback and outcome model**

- This callback signals an asynchronous failure after the original request has already been accepted locally.
- Keep it separate from the immediate request return code because both can be present in the same business flow.

**Field guide for `CThostFtdcOptionSelfCloseActionField`**

| Field | Type | Purpose |
| --- | --- | --- |
| `BrokerID` | `TThostFtdcBrokerIDType` | Broker code that scopes the request or identifies the response owner. |
| `InvestorID` | `TThostFtdcInvestorIDType` | Investor code used by the trading account. |
| `OptionSelfCloseActionRef` | `TThostFtdcOrderActionRefType` | Carries the option self close action reference for the current request or response. |
| `OptionSelfCloseRef` | `TThostFtdcOrderRefType` | Carries the option self close reference for the current request or response. |
| `RequestID` | `TThostFtdcRequestIDType` | Client-generated request identifier used for response correlation. |
| `FrontID` | `TThostFtdcFrontIDType` | Front identifier assigned by the server for the current login session. |
| `SessionID` | `TThostFtdcSessionIDType` | Session identifier assigned by the server for the current login session. |
| `ExchangeID` | `TThostFtdcExchangeIDType` | Exchange code that disambiguates the target venue. |
| `OptionSelfCloseSysID` | `TThostFtdcOrderSysIDType` | Carries the option self close sys identifier for the current request or response. |
| `ActionFlag` | `TThostFtdcActionFlagType` | Carries the action flag for the current request or response. |
| `ActionDate` | `TThostFtdcDateType` | Carries the action date for the current request or response. |
| `ActionTime` | `TThostFtdcTimeType` | Carries the action time for the current request or response. |
| `TraderID` | `TThostFtdcTraderIDType` | Carries the trader identifier for the current request or response. |
| `InstallID` | `TThostFtdcInstallIDType` | Carries the install identifier for the current request or response. |
| `OptionSelfCloseLocalID` | `TThostFtdcOrderLocalIDType` | Carries the option self close local identifier for the current request or response. |
| `ActionLocalID` | `TThostFtdcOrderLocalIDType` | Carries the action local identifier for the current request or response. |
| `ParticipantID` | `TThostFtdcParticipantIDType` | Carries the participant identifier for the current request or response. |
| `ClientID` | `TThostFtdcClientIDType` | Client identifier supplied by the brokerage environment. |
| `BusinessUnit` | `TThostFtdcBusinessUnitType` | Free-form business tag used for routing or attribution. |
| `OrderActionStatus` | `TThostFtdcOrderActionStatusType` | Carries the order action status for the current request or response. |
| `UserID` | `TThostFtdcUserIDType` | User code associated with the current login identity. |
| `StatusMsg` | `TThostFtdcErrorMsgType` | Carries the status msg for the current request or response. |
| `reserve1` | `TThostFtdcOldInstrumentIDType` | Carries the reserve1 for the current request or response. |
| `BranchID` | `TThostFtdcBranchIDType` | Carries the branch identifier for the current request or response. |
| `InvestUnitID` | `TThostFtdcInvestUnitIDType` | Investment unit identifier used by the account model. |
| `reserve2` | `TThostFtdcOldIPAddressType` | Carries the reserve2 for the current request or response. |
| `MacAddress` | `TThostFtdcMacAddressType` | Client MAC address reported to the server. |
| `InstrumentID` | `TThostFtdcInstrumentIDType` | Instrument symbol for the target contract. |
| `IPAddress` | `TThostFtdcIPAddressType` | Client IP address reported to the server. |

**Structure layout**

```cpp
struct CThostFtdcOptionSelfCloseActionField
{

TThostFtdcBrokerIDType  BrokerID;

TThostFtdcInvestorIDType    InvestorID;

TThostFtdcOrderActionRefType    OptionSelfCloseActionRef;

TThostFtdcOrderRefType  OptionSelfCloseRef;

TThostFtdcRequestIDType RequestID;

TThostFtdcFrontIDType   FrontID;

TThostFtdcSessionIDType SessionID;

TThostFtdcExchangeIDType    ExchangeID;

TThostFtdcOrderSysIDType    OptionSelfCloseSysID;

TThostFtdcActionFlagType    ActionFlag;

TThostFtdcDateType  ActionDate;

TThostFtdcTimeType  ActionTime;

TThostFtdcTraderIDType  TraderID;

TThostFtdcInstallIDType InstallID;

TThostFtdcOrderLocalIDType  OptionSelfCloseLocalID;

TThostFtdcOrderLocalIDType  ActionLocalID;

TThostFtdcParticipantIDType ParticipantID;

TThostFtdcClientIDType  ClientID;

TThostFtdcBusinessUnitType  BusinessUnit;

TThostFtdcOrderActionStatusType OrderActionStatus;

TThostFtdcUserIDType    UserID;

TThostFtdcErrorMsgType  StatusMsg;

TThostFtdcOldInstrumentIDType   reserve1;

TThostFtdcBranchIDType  BranchID;

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
void MySpi::OnErrRtnOptionSelfCloseAction() {
    // Mark the event in your session state machine and send the next step if needed.
}
```

**Implementation notes**

- Make callback handlers idempotent because reconnect and replay semantics can surface the same business object more than once.
- Do not block the SPI thread with long business logic; hand the event to a worker queue when processing becomes expensive.

## OnErrRtnOptionSelfCloseInsert

`OnErrRtnOptionSelfCloseInsert` is an event callback that reports state back from the CTP runtime into the client application.

- Kind: callback
- Owning interface: `CThostFtdcTraderSpi`
- Related symbols: `ReqOptionSelfCloseInsert`

**When to use it**

- Drive event-based application state updates as server data arrives.
- Wake request waiters or publish the event into a higher-level message bus.

**How to apply it**

1. Validate the payload and error object before updating application state.
2. Correlate the event with the original request or subscription when a request id is present.
3. Persist the important identifiers and keep handler logic short so the SPI thread stays responsive.

**Callback and outcome model**

- This callback signals an asynchronous failure after the original request has already been accepted locally.
- Keep it separate from the immediate request return code because both can be present in the same business flow.

**Field guide for `CThostFtdcInputOptionSelfCloseField`**

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
| `ExchangeID` | `TThostFtdcExchangeIDType` | Exchange code that disambiguates the target venue. |
| `InvestUnitID` | `TThostFtdcInvestUnitIDType` | Investment unit identifier used by the account model. |
| `AccountID` | `TThostFtdcAccountIDType` | Futures-side account identifier. |
| `CurrencyID` | `TThostFtdcCurrencyIDType` | Currency code used for balance and transfer values. |
| `ClientID` | `TThostFtdcClientIDType` | Client identifier supplied by the brokerage environment. |
| `reserve2` | `TThostFtdcOldIPAddressType` | Carries the reserve2 for the current request or response. |
| `MacAddress` | `TThostFtdcMacAddressType` | Client MAC address reported to the server. |
| `InstrumentID` | `TThostFtdcInstrumentIDType` | Instrument symbol for the target contract. |
| `IPAddress` | `TThostFtdcIPAddressType` | Client IP address reported to the server. |

**Structure layout**

```cpp
struct CThostFtdcInputOptionSelfCloseField
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

    TThostFtdcExchangeIDType    ExchangeID;

    TThostFtdcInvestUnitIDType  InvestUnitID;

    TThostFtdcAccountIDType AccountID;

    TThostFtdcCurrencyIDType    CurrencyID;

    TThostFtdcClientIDType  ClientID;

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
void MySpi::OnErrRtnOptionSelfCloseInsert() {
    // Mark the event in your session state machine and send the next step if needed.
}
```

**Implementation notes**

- Make callback handlers idempotent because reconnect and replay semantics can surface the same business object more than once.
- Do not block the SPI thread with long business logic; hand the event to a worker queue when processing becomes expensive.

## OnErrRtnOrderAction

`OnErrRtnOrderAction` is an event callback that reports state back from the CTP runtime into the client application.

- Kind: callback
- Owning interface: `CThostFtdcTraderSpi`
- Related symbols: `ReqOrderAction`

**When to use it**

- Drive event-based application state updates as server data arrives.
- Wake request waiters or publish the event into a higher-level message bus.

**How to apply it**

1. Validate the payload and error object before updating application state.
2. Correlate the event with the original request or subscription when a request id is present.
3. Persist the important identifiers and keep handler logic short so the SPI thread stays responsive.

**Callback and outcome model**

- This callback signals an asynchronous failure after the original request has already been accepted locally.
- Keep it separate from the immediate request return code because both can be present in the same business flow.

**Field guide for `CThostFtdcOrderActionField`**

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
| `ActionDate` | `TThostFtdcDateType` | Carries the action date for the current request or response. |
| `ActionTime` | `TThostFtdcTimeType` | Carries the action time for the current request or response. |
| `TraderID` | `TThostFtdcTraderIDType` | Carries the trader identifier for the current request or response. |
| `InstallID` | `TThostFtdcInstallIDType` | Carries the install identifier for the current request or response. |
| `OrderLocalID` | `TThostFtdcOrderLocalIDType` | Carries the order local identifier for the current request or response. |
| `ActionLocalID` | `TThostFtdcOrderLocalIDType` | Carries the action local identifier for the current request or response. |
| `ParticipantID` | `TThostFtdcParticipantIDType` | Carries the participant identifier for the current request or response. |
| `ClientID` | `TThostFtdcClientIDType` | Client identifier supplied by the brokerage environment. |
| `BusinessUnit` | `TThostFtdcBusinessUnitType` | Free-form business tag used for routing or attribution. |
| `OrderActionStatus` | `TThostFtdcOrderActionStatusType` | Carries the order action status for the current request or response. |
| `UserID` | `TThostFtdcUserIDType` | User code associated with the current login identity. |
| `StatusMsg` | `TThostFtdcErrorMsgType` | Carries the status msg for the current request or response. |
| `reserve1` | `TThostFtdcOldInstrumentIDType` | Carries the reserve1 for the current request or response. |
| `BranchID` | `TThostFtdcBranchIDType` | Carries the branch identifier for the current request or response. |
| `InvestUnitID` | `TThostFtdcInvestUnitIDType` | Investment unit identifier used by the account model. |
| `reserve2` | `TThostFtdcOldIPAddressType` | Carries the reserve2 for the current request or response. |
| `MacAddress` | `TThostFtdcMacAddressType` | Client MAC address reported to the server. |
| `InstrumentID` | `TThostFtdcInstrumentIDType` | Instrument symbol for the target contract. |
| `IPAddress` | `TThostFtdcIPAddressType` | Client IP address reported to the server. |
| `OrderMemo` | `TThostFtdcOrderMemoType` | Client memo attached to the order. |
| `SessionReqSeq` | `TThostFtdcSequenceNo12Type` | Per-session request sequence used by some server paths. |

**Structure layout**

```cpp
struct CThostFtdcOrderActionField
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

TThostFtdcDateType  ActionDate;

TThostFtdcTimeType  ActionTime;

TThostFtdcTraderIDType  TraderID;

TThostFtdcInstallIDType InstallID;

TThostFtdcOrderLocalIDType  OrderLocalID;

TThostFtdcOrderLocalIDType  ActionLocalID;

TThostFtdcParticipantIDType ParticipantID;

TThostFtdcClientIDType  ClientID;

TThostFtdcBusinessUnitType  BusinessUnit;

TThostFtdcOrderActionStatusType OrderActionStatus;

TThostFtdcUserIDType    UserID;

TThostFtdcErrorMsgType  StatusMsg;

TThostFtdcOldInstrumentIDType   reserve1;

TThostFtdcBranchIDType  BranchID;

TThostFtdcInvestUnitIDType  InvestUnitID;

TThostFtdcOldIPAddressType  reserve2;

TThostFtdcMacAddressType    MacAddress;

TThostFtdcInstrumentIDType  InstrumentID;

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
void MySpi::OnErrRtnOrderAction() {
    // Mark the event in your session state machine and send the next step if needed.
}
```

**Implementation notes**

- Make callback handlers idempotent because reconnect and replay semantics can surface the same business object more than once.
- Do not block the SPI thread with long business logic; hand the event to a worker queue when processing becomes expensive.

## OnErrRtnOrderInsert

`OnErrRtnOrderInsert` is an event callback that reports state back from the CTP runtime into the client application.

- Kind: callback
- Owning interface: `CThostFtdcTraderSpi`
- Related symbols: `ReqOrderInsert`

**When to use it**

- Drive event-based application state updates as server data arrives.
- Wake request waiters or publish the event into a higher-level message bus.

**How to apply it**

1. Validate the payload and error object before updating application state.
2. Correlate the event with the original request or subscription when a request id is present.
3. Persist the important identifiers and keep handler logic short so the SPI thread stays responsive.

**Callback and outcome model**

- This callback signals an asynchronous failure after the original request has already been accepted locally.
- Keep it separate from the immediate request return code because both can be present in the same business flow.

**Field guide for `CThostFtdcInputOrderField`**

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
| `IsSwapOrder` | `TThostFtdcBoolType` | Whether the order participates in the swap-order path. |
| `ExchangeID` | `TThostFtdcExchangeIDType` | Exchange code that disambiguates the target venue. |
| `InvestUnitID` | `TThostFtdcInvestUnitIDType` | Investment unit identifier used by the account model. |
| `AccountID` | `TThostFtdcAccountIDType` | Futures-side account identifier. |
| `CurrencyID` | `TThostFtdcCurrencyIDType` | Currency code used for balance and transfer values. |
| `ClientID` | `TThostFtdcClientIDType` | Client identifier supplied by the brokerage environment. |
| `reserve2` | `TThostFtdcOldIPAddressType` | Carries the reserve2 for the current request or response. |
| `MacAddress` | `TThostFtdcMacAddressType` | Client MAC address reported to the server. |
| `InstrumentID` | `TThostFtdcInstrumentIDType` | Instrument symbol for the target contract. |
| `IPAddress` | `TThostFtdcIPAddressType` | Client IP address reported to the server. |
| `OrderMemo` | `TThostFtdcOrderMemoType` | Client memo attached to the order. |
| `SessionReqSeq` | `TThostFtdcSequenceNo12Type` | Per-session request sequence used by some server paths. |

**Structure layout**

```cpp
struct CThostFtdcInputOrderField
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

    TThostFtdcBoolType  IsSwapOrder;

    TThostFtdcExchangeIDType    ExchangeID;

    TThostFtdcInvestUnitIDType  InvestUnitID;

    TThostFtdcAccountIDType AccountID;

    TThostFtdcCurrencyIDType    CurrencyID;

    TThostFtdcClientIDType  ClientID;

    TThostFtdcOldIPAddressType  reserve2;

    TThostFtdcMacAddressType    MacAddress;

    TThostFtdcInstrumentIDType  InstrumentID;

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
void MySpi::OnErrRtnOrderInsert() {
    // Mark the event in your session state machine and send the next step if needed.
}
```

**Implementation notes**

- Make callback handlers idempotent because reconnect and replay semantics can surface the same business object more than once.
- Do not block the SPI thread with long business logic; hand the event to a worker queue when processing becomes expensive.

## OnErrRtnQuoteAction

`OnErrRtnQuoteAction` is an event callback that reports state back from the CTP runtime into the client application.

- Kind: callback
- Owning interface: `CThostFtdcTraderSpi`
- Related symbols: `ReqQuoteAction`

**When to use it**

- Drive event-based application state updates as server data arrives.
- Wake request waiters or publish the event into a higher-level message bus.

**How to apply it**

1. Validate the payload and error object before updating application state.
2. Correlate the event with the original request or subscription when a request id is present.
3. Persist the important identifiers and keep handler logic short so the SPI thread stays responsive.

**Callback and outcome model**

- This callback signals an asynchronous failure after the original request has already been accepted locally.
- Keep it separate from the immediate request return code because both can be present in the same business flow.

**Field guide for `CThostFtdcQuoteActionField`**

| Field | Type | Purpose |
| --- | --- | --- |
| `BrokerID` | `TThostFtdcBrokerIDType` | Broker code that scopes the request or identifies the response owner. |
| `InvestorID` | `TThostFtdcInvestorIDType` | Investor code used by the trading account. |
| `QuoteActionRef` | `TThostFtdcOrderActionRefType` | Carries the quote action reference for the current request or response. |
| `QuoteRef` | `TThostFtdcOrderRefType` | Carries the quote reference for the current request or response. |
| `RequestID` | `TThostFtdcRequestIDType` | Client-generated request identifier used for response correlation. |
| `FrontID` | `TThostFtdcFrontIDType` | Front identifier assigned by the server for the current login session. |
| `SessionID` | `TThostFtdcSessionIDType` | Session identifier assigned by the server for the current login session. |
| `ExchangeID` | `TThostFtdcExchangeIDType` | Exchange code that disambiguates the target venue. |
| `QuoteSysID` | `TThostFtdcOrderSysIDType` | Carries the quote sys identifier for the current request or response. |
| `ActionFlag` | `TThostFtdcActionFlagType` | Carries the action flag for the current request or response. |
| `ActionDate` | `TThostFtdcDateType` | Carries the action date for the current request or response. |
| `ActionTime` | `TThostFtdcTimeType` | Carries the action time for the current request or response. |
| `TraderID` | `TThostFtdcTraderIDType` | Carries the trader identifier for the current request or response. |
| `InstallID` | `TThostFtdcInstallIDType` | Carries the install identifier for the current request or response. |
| `QuoteLocalID` | `TThostFtdcOrderLocalIDType` | Carries the quote local identifier for the current request or response. |
| `ActionLocalID` | `TThostFtdcOrderLocalIDType` | Carries the action local identifier for the current request or response. |
| `ParticipantID` | `TThostFtdcParticipantIDType` | Carries the participant identifier for the current request or response. |
| `ClientID` | `TThostFtdcClientIDType` | Client identifier supplied by the brokerage environment. |
| `BusinessUnit` | `TThostFtdcBusinessUnitType` | Free-form business tag used for routing or attribution. |
| `OrderActionStatus` | `TThostFtdcOrderActionStatusType` | Carries the order action status for the current request or response. |
| `UserID` | `TThostFtdcUserIDType` | User code associated with the current login identity. |
| `StatusMsg` | `TThostFtdcErrorMsgType` | Carries the status msg for the current request or response. |
| `reserve1` | `TThostFtdcOldInstrumentIDType` | Carries the reserve1 for the current request or response. |
| `BranchID` | `TThostFtdcBranchIDType` | Carries the branch identifier for the current request or response. |
| `InvestUnitID` | `TThostFtdcInvestUnitIDType` | Investment unit identifier used by the account model. |
| `reserve2` | `TThostFtdcOldIPAddressType` | Carries the reserve2 for the current request or response. |
| `MacAddress` | `TThostFtdcMacAddressType` | Client MAC address reported to the server. |
| `InstrumentID` | `TThostFtdcInstrumentIDType` | Instrument symbol for the target contract. |
| `IPAddress` | `TThostFtdcIPAddressType` | Client IP address reported to the server. |
| `OrderMemo` | `TThostFtdcOrderMemoType` | Client memo attached to the order. |
| `SessionReqSeq` | `TThostFtdcSequenceNo12Type` | Per-session request sequence used by some server paths. |

**Structure layout**

```cpp
struct CThostFtdcQuoteActionField
{

    TThostFtdcBrokerIDType  BrokerID;

    TThostFtdcInvestorIDType    InvestorID;

    TThostFtdcOrderActionRefType    QuoteActionRef;

    TThostFtdcOrderRefType  QuoteRef;

    TThostFtdcRequestIDType RequestID;

    TThostFtdcFrontIDType   FrontID;

    TThostFtdcSessionIDType SessionID;

    TThostFtdcExchangeIDType    ExchangeID;

    TThostFtdcOrderSysIDType    QuoteSysID;

    TThostFtdcActionFlagType    ActionFlag;

    TThostFtdcDateType  ActionDate;

    TThostFtdcTimeType  ActionTime;

    TThostFtdcTraderIDType  TraderID;

    TThostFtdcInstallIDType InstallID;

    TThostFtdcOrderLocalIDType  QuoteLocalID;

    TThostFtdcOrderLocalIDType  ActionLocalID;

    TThostFtdcParticipantIDType ParticipantID;

    TThostFtdcClientIDType  ClientID;

    TThostFtdcBusinessUnitType  BusinessUnit;

    TThostFtdcOrderActionStatusType OrderActionStatus;

    TThostFtdcUserIDType    UserID;

    TThostFtdcErrorMsgType  StatusMsg;

    TThostFtdcOldInstrumentIDType   reserve1;

    TThostFtdcBranchIDType  BranchID;

    TThostFtdcInvestUnitIDType  InvestUnitID;

    TThostFtdcOldIPAddressType  reserve2;

    TThostFtdcMacAddressType    MacAddress;

    TThostFtdcInstrumentIDType  InstrumentID;

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
void MySpi::OnErrRtnQuoteAction() {
    // Mark the event in your session state machine and send the next step if needed.
}
```

**Implementation notes**

- Make callback handlers idempotent because reconnect and replay semantics can surface the same business object more than once.
- Do not block the SPI thread with long business logic; hand the event to a worker queue when processing becomes expensive.

## OnErrRtnQuoteInsert

`OnErrRtnQuoteInsert` is an event callback that reports state back from the CTP runtime into the client application.

- Kind: callback
- Owning interface: `CThostFtdcTraderSpi`
- Related symbols: `ReqQuoteInsert`

**When to use it**

- Drive event-based application state updates as server data arrives.
- Wake request waiters or publish the event into a higher-level message bus.

**How to apply it**

1. Validate the payload and error object before updating application state.
2. Correlate the event with the original request or subscription when a request id is present.
3. Persist the important identifiers and keep handler logic short so the SPI thread stays responsive.

**Callback and outcome model**

- This callback signals an asynchronous failure after the original request has already been accepted locally.
- Keep it separate from the immediate request return code because both can be present in the same business flow.

**Field guide for `CThostFtdcInputQuoteField`**

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
| `AskOrderRef` | `TThostFtdcOrderRefType` | Carries the ask order reference for the current request or response. |
| `BidOrderRef` | `TThostFtdcOrderRefType` | Carries the bid order reference for the current request or response. |
| `ForQuoteSysID` | `TThostFtdcOrderSysIDType` | Carries the for quote sys identifier for the current request or response. |
| `ExchangeID` | `TThostFtdcExchangeIDType` | Exchange code that disambiguates the target venue. |
| `InvestUnitID` | `TThostFtdcInvestUnitIDType` | Investment unit identifier used by the account model. |
| `ClientID` | `TThostFtdcClientIDType` | Client identifier supplied by the brokerage environment. |
| `reserve2` | `TThostFtdcOldIPAddressType` | Carries the reserve2 for the current request or response. |
| `MacAddress` | `TThostFtdcMacAddressType` | Client MAC address reported to the server. |
| `InstrumentID` | `TThostFtdcInstrumentIDType` | Instrument symbol for the target contract. |
| `IPAddress` | `TThostFtdcIPAddressType` | Client IP address reported to the server. |
| `ReplaceSysID` | `TThostFtdcOrderSysIDType` | Carries the replace sys identifier for the current request or response. |
| `TimeCondition` | `TThostFtdcTimeConditionType` | Lifetime condition that controls how long the order stays active. |
| `OrderMemo` | `TThostFtdcOrderMemoType` | Client memo attached to the order. |
| `SessionReqSeq` | `TThostFtdcSequenceNo12Type` | Per-session request sequence used by some server paths. |

**Structure layout**

```cpp
struct CThostFtdcInputQuoteField
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

    TThostFtdcOrderRefType  AskOrderRef;

    TThostFtdcOrderRefType  BidOrderRef;

    TThostFtdcOrderSysIDType    ForQuoteSysID;

    TThostFtdcExchangeIDType    ExchangeID;

    TThostFtdcInvestUnitIDType  InvestUnitID;

    TThostFtdcClientIDType  ClientID;

    TThostFtdcOldIPAddressType  reserve2;

    TThostFtdcMacAddressType    MacAddress;

    TThostFtdcInstrumentIDType  InstrumentID;

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
void MySpi::OnErrRtnQuoteInsert() {
    // Mark the event in your session state machine and send the next step if needed.
}
```

**Implementation notes**

- Make callback handlers idempotent because reconnect and replay semantics can surface the same business object more than once.
- Do not block the SPI thread with long business logic; hand the event to a worker queue when processing becomes expensive.

## OnErrRtnOffsetSetting

`OnErrRtnOffsetSetting` is an event callback that reports state back from the CTP runtime into the client application.

- Kind: callback
- Owning interface: `CThostFtdcTraderSpi`
- Related symbols: `ReqOffsetSetting`

**When to use it**

- Drive event-based application state updates as server data arrives.
- Wake request waiters or publish the event into a higher-level message bus.

**How to apply it**

1. Validate the payload and error object before updating application state.
2. Correlate the event with the original request or subscription when a request id is present.
3. Persist the important identifiers and keep handler logic short so the SPI thread stays responsive.

**Callback and outcome model**

- This callback signals an asynchronous failure after the original request has already been accepted locally.
- Keep it separate from the immediate request return code because both can be present in the same business flow.

**Field guide for `CThostFtdcInputOffsetSettingField`**

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

**Structure layout**

```cpp
struct CThostFtdcInputOffsetSettingField
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
void MySpi::OnErrRtnOffsetSetting() {
    // Mark the event in your session state machine and send the next step if needed.
}
```

**Implementation notes**

- Make callback handlers idempotent because reconnect and replay semantics can surface the same business object more than once.
- Do not block the SPI thread with long business logic; hand the event to a worker queue when processing becomes expensive.

## OnErrRtnCancelOffsetSetting

`OnErrRtnCancelOffsetSetting` is an event callback that reports state back from the CTP runtime into the client application.

- Kind: callback
- Owning interface: `CThostFtdcTraderSpi`
- Related symbols: `ReqCancelOffsetSetting`

**When to use it**

- Drive event-based application state updates as server data arrives.
- Wake request waiters or publish the event into a higher-level message bus.

**How to apply it**

1. Validate the payload and error object before updating application state.
2. Correlate the event with the original request or subscription when a request id is present.
3. Persist the important identifiers and keep handler logic short so the SPI thread stays responsive.

**Callback and outcome model**

- This callback signals an asynchronous failure after the original request has already been accepted locally.
- Keep it separate from the immediate request return code because both can be present in the same business flow.

**Field guide for `CThostFtdcCancelOffsetSettingField`**

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
| `TraderID` | `TThostFtdcTraderIDType` | Carries the trader identifier for the current request or response. |
| `InstallID` | `TThostFtdcInstallIDType` | Carries the install identifier for the current request or response. |
| `ParticipantID` | `TThostFtdcParticipantIDType` | Carries the participant identifier for the current request or response. |
| `ClientID` | `TThostFtdcClientIDType` | Client identifier supplied by the brokerage environment. |
| `OrderActionStatus` | `TThostFtdcOrderActionStatusType` | Carries the order action status for the current request or response. |
| `StatusMsg` | `TThostFtdcErrorMsgType` | Carries the status msg for the current request or response. |
| `ActionLocalID` | `TThostFtdcOrderLocalIDType` | Carries the action local identifier for the current request or response. |
| `ActionDate` | `TThostFtdcDateType` | Carries the action date for the current request or response. |
| `ActionTime` | `TThostFtdcTimeType` | Carries the action time for the current request or response. |

**Structure layout**

```cpp
struct CThostFtdcCancelOffsetSettingField
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

    TThostFtdcTraderIDType  TraderID;

    TThostFtdcInstallIDType InstallID;

    TThostFtdcParticipantIDType ParticipantID;

    TThostFtdcClientIDType  ClientID;

    TThostFtdcOrderActionStatusType OrderActionStatus;

    TThostFtdcErrorMsgType  StatusMsg;

    TThostFtdcOrderLocalIDType  ActionLocalID;

    TThostFtdcDateType  ActionDate;

    TThostFtdcTimeType  ActionTime;
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
void MySpi::OnErrRtnCancelOffsetSetting() {
    // Mark the event in your session state machine and send the next step if needed.
}
```

**Implementation notes**

- Make callback handlers idempotent because reconnect and replay semantics can surface the same business object more than once.
- Do not block the SPI thread with long business logic; hand the event to a worker queue when processing becomes expensive.
