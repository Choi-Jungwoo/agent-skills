# CTP trader SPI order and quote responses

This reference covers direct response callbacks for trader-side order, quote, exec-order, option-self-close, and parked-order requests.

| Entry | Kind |
| --- | --- |
| OnRspBatchOrderAction | callback |
| OnRspCombActionInsert | callback |
| OnRspExecOrderAction | callback |
| OnRspExecOrderInsert | callback |
| OnRspForQuoteInsert | callback |
| OnRspOptionSelfCloseAction | callback |
| OnRspOptionSelfCloseInsert | callback |
| OnRspOrderAction | callback |
| OnRspOrderInsert | callback |
| OnRspParkedOrderAction | callback |
| OnRspParkedOrderInsert | callback |
| OnRspQuoteAction | callback |
| OnRspQuoteInsert | callback |
| OnRspRemoveParkedOrder | callback |
| OnRspRemoveParkedOrderAction | callback |

## OnRspBatchOrderAction

`OnRspBatchOrderAction` is an event callback that reports state back from the CTP runtime into the client application.

- Kind: callback
- Owning interface: `CThostFtdcTraderSpi`
- Related symbols: `ReqBatchOrderAction`

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

**Field guide for `CThostFtdcInputBatchOrderActionField`**

| Field | Type | Purpose |
| --- | --- | --- |
| `BrokerID` | `TThostFtdcBrokerIDType` | Broker code that scopes the request or identifies the response owner. |
| `InvestorID` | `TThostFtdcInvestorIDType` | Investor code used by the trading account. |
| `OrderActionRef` | `TThostFtdcOrderActionRefType` | Carries the order action reference for the current request or response. |
| `RequestID` | `TThostFtdcRequestIDType` | Client-generated request identifier used for response correlation. |
| `FrontID` | `TThostFtdcFrontIDType` | Front identifier assigned by the server for the current login session. |
| `SessionID` | `TThostFtdcSessionIDType` | Session identifier assigned by the server for the current login session. |
| `ExchangeID` | `TThostFtdcExchangeIDType` | Exchange code that disambiguates the target venue. |
| `UserID` | `TThostFtdcUserIDType` | User code associated with the current login identity. |
| `InvestUnitID` | `TThostFtdcInvestUnitIDType` | Investment unit identifier used by the account model. |
| `reserve1` | `TThostFtdcOldIPAddressType` | Carries the reserve1 for the current request or response. |
| `MacAddress` | `TThostFtdcMacAddressType` | Client MAC address reported to the server. |
| `IPAddress` | `TThostFtdcIPAddressType` | Client IP address reported to the server. |

**Structure layout**

```cpp
struct CThostFtdcInputBatchOrderActionField
{

    TThostFtdcBrokerIDType  BrokerID;

    TThostFtdcInvestorIDType    InvestorID;

    TThostFtdcOrderActionRefType    OrderActionRef;

    TThostFtdcRequestIDType RequestID;

    TThostFtdcFrontIDType   FrontID;

    TThostFtdcSessionIDType SessionID;

    TThostFtdcExchangeIDType    ExchangeID;

    TThostFtdcUserIDType    UserID;

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
void MySpi::OnRspBatchOrderAction() {
    // Mark the event in your session state machine and send the next step if needed.
}
```

**Implementation notes**

- Make callback handlers idempotent because reconnect and replay semantics can surface the same business object more than once.
- Do not block the SPI thread with long business logic; hand the event to a worker queue when processing becomes expensive.

## OnRspCombActionInsert

`OnRspCombActionInsert` is an event callback that reports state back from the CTP runtime into the client application.

- Kind: callback
- Owning interface: `CThostFtdcTraderSpi`
- Related symbols: `ReqCombActionInsert`

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
void MySpi::OnRspCombActionInsert() {
    // Mark the event in your session state machine and send the next step if needed.
}
```

**Implementation notes**

- Make callback handlers idempotent because reconnect and replay semantics can surface the same business object more than once.
- Do not block the SPI thread with long business logic; hand the event to a worker queue when processing becomes expensive.

## OnRspExecOrderAction

`OnRspExecOrderAction` is an event callback that reports state back from the CTP runtime into the client application.

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

- This callback belongs to the synchronous response path for a request issued earlier.
- Use `pRspInfo` to detect business or validation failures when that parameter is present.
- Use `nRequestID` and `bIsLast` to correlate and complete the waiting request state when those parameters are present.

**Field guide for `CThostFtdcInputExecOrderActionField`**

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
| `UserID` | `TThostFtdcUserIDType` | User code associated with the current login identity. |
| `reserve1` | `TThostFtdcOldInstrumentIDType` | Carries the reserve1 for the current request or response. |
| `InvestUnitID` | `TThostFtdcInvestUnitIDType` | Investment unit identifier used by the account model. |
| `reserve2` | `TThostFtdcOldIPAddressType` | Carries the reserve2 for the current request or response. |
| `MacAddress` | `TThostFtdcMacAddressType` | Client MAC address reported to the server. |
| `InstrumentID` | `TThostFtdcInstrumentIDType` | Instrument symbol for the target contract. |
| `IPAddress` | `TThostFtdcIPAddressType` | Client IP address reported to the server. |

**Structure layout**

```cpp
struct CThostFtdcInputExecOrderActionField
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

    TThostFtdcUserIDType    UserID;

    TThostFtdcOldInstrumentIDType   reserve1;

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
void MySpi::OnRspExecOrderAction() {
    // Mark the event in your session state machine and send the next step if needed.
}
```

**Implementation notes**

- Make callback handlers idempotent because reconnect and replay semantics can surface the same business object more than once.
- Do not block the SPI thread with long business logic; hand the event to a worker queue when processing becomes expensive.

## OnRspExecOrderInsert

`OnRspExecOrderInsert` is an event callback that reports state back from the CTP runtime into the client application.

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

- This callback belongs to the synchronous response path for a request issued earlier.
- Use `pRspInfo` to detect business or validation failures when that parameter is present.
- Use `nRequestID` and `bIsLast` to correlate and complete the waiting request state when those parameters are present.

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
void MySpi::OnRspExecOrderInsert() {
    // Mark the event in your session state machine and send the next step if needed.
}
```

**Implementation notes**

- Make callback handlers idempotent because reconnect and replay semantics can surface the same business object more than once.
- Do not block the SPI thread with long business logic; hand the event to a worker queue when processing becomes expensive.

## OnRspForQuoteInsert

`OnRspForQuoteInsert` is an event callback that reports state back from the CTP runtime into the client application.

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

- This callback belongs to the synchronous response path for a request issued earlier.
- Use `pRspInfo` to detect business or validation failures when that parameter is present.
- Use `nRequestID` and `bIsLast` to correlate and complete the waiting request state when those parameters are present.

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
void MySpi::OnRspForQuoteInsert() {
    // Mark the event in your session state machine and send the next step if needed.
}
```

**Implementation notes**

- Make callback handlers idempotent because reconnect and replay semantics can surface the same business object more than once.
- Do not block the SPI thread with long business logic; hand the event to a worker queue when processing becomes expensive.

## OnRspOptionSelfCloseAction

`OnRspOptionSelfCloseAction` is an event callback that reports state back from the CTP runtime into the client application.

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

- This callback belongs to the synchronous response path for a request issued earlier.
- Use `pRspInfo` to detect business or validation failures when that parameter is present.
- Use `nRequestID` and `bIsLast` to correlate and complete the waiting request state when those parameters are present.

**Field guide for `CThostFtdcInputOptionSelfCloseActionField`**

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
| `UserID` | `TThostFtdcUserIDType` | User code associated with the current login identity. |
| `reserve1` | `TThostFtdcOldInstrumentIDType` | Carries the reserve1 for the current request or response. |
| `InvestUnitID` | `TThostFtdcInvestUnitIDType` | Investment unit identifier used by the account model. |
| `reserve2` | `TThostFtdcOldIPAddressType` | Carries the reserve2 for the current request or response. |
| `MacAddress` | `TThostFtdcMacAddressType` | Client MAC address reported to the server. |
| `InstrumentID` | `TThostFtdcInstrumentIDType` | Instrument symbol for the target contract. |
| `IPAddress` | `TThostFtdcIPAddressType` | Client IP address reported to the server. |

**Structure layout**

```cpp
struct CThostFtdcInputOptionSelfCloseActionField
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

    TThostFtdcUserIDType    UserID;

    TThostFtdcOldInstrumentIDType   reserve1;

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
void MySpi::OnRspOptionSelfCloseAction() {
    // Mark the event in your session state machine and send the next step if needed.
}
```

**Implementation notes**

- Make callback handlers idempotent because reconnect and replay semantics can surface the same business object more than once.
- Do not block the SPI thread with long business logic; hand the event to a worker queue when processing becomes expensive.

## OnRspOptionSelfCloseInsert

`OnRspOptionSelfCloseInsert` is an event callback that reports state back from the CTP runtime into the client application.

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

- This callback belongs to the synchronous response path for a request issued earlier.
- Use `pRspInfo` to detect business or validation failures when that parameter is present.
- Use `nRequestID` and `bIsLast` to correlate and complete the waiting request state when those parameters are present.

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
void MySpi::OnRspOptionSelfCloseInsert() {
    // Mark the event in your session state machine and send the next step if needed.
}
```

**Implementation notes**

- Make callback handlers idempotent because reconnect and replay semantics can surface the same business object more than once.
- Do not block the SPI thread with long business logic; hand the event to a worker queue when processing becomes expensive.

## OnRspOrderAction

`OnRspOrderAction` is an event callback that reports state back from the CTP runtime into the client application.

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

- This callback belongs to the synchronous response path for a request issued earlier.
- Use `pRspInfo` to detect business or validation failures when that parameter is present.
- Use `nRequestID` and `bIsLast` to correlate and complete the waiting request state when those parameters are present.

**Field guide for `CThostFtdcInputOrderActionField`**

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
| `InvestUnitID` | `TThostFtdcInvestUnitIDType` | Investment unit identifier used by the account model. |
| `reserve2` | `TThostFtdcOldIPAddressType` | Carries the reserve2 for the current request or response. |
| `MacAddress` | `TThostFtdcMacAddressType` | Client MAC address reported to the server. |
| `InstrumentID` | `TThostFtdcInstrumentIDType` | Instrument symbol for the target contract. |
| `IPAddress` | `TThostFtdcIPAddressType` | Client IP address reported to the server. |
| `OrderMemo` | `TThostFtdcOrderMemoType` | Client memo attached to the order. |
| `SessionReqSeq` | `TThostFtdcSequenceNo12Type` | Per-session request sequence used by some server paths. |

**Structure layout**

```cpp
struct CThostFtdcInputOrderActionField
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
void MySpi::OnRspOrderAction() {
    // Mark the event in your session state machine and send the next step if needed.
}
```

**Implementation notes**

- Make callback handlers idempotent because reconnect and replay semantics can surface the same business object more than once.
- Do not block the SPI thread with long business logic; hand the event to a worker queue when processing becomes expensive.

## OnRspOrderInsert

`OnRspOrderInsert` is an event callback that reports state back from the CTP runtime into the client application.

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

- This callback belongs to the synchronous response path for a request issued earlier.
- Use `pRspInfo` to detect business or validation failures when that parameter is present.
- Use `nRequestID` and `bIsLast` to correlate and complete the waiting request state when those parameters are present.

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
void MySpi::OnRspOrderInsert() {
    // Mark the event in your session state machine and send the next step if needed.
}
```

**Implementation notes**

- Make callback handlers idempotent because reconnect and replay semantics can surface the same business object more than once.
- Do not block the SPI thread with long business logic; hand the event to a worker queue when processing becomes expensive.

## OnRspParkedOrderAction

`OnRspParkedOrderAction` is an event callback that reports state back from the CTP runtime into the client application.

- Kind: callback
- Owning interface: `CThostFtdcTraderSpi`
- Related symbols: `ReqParkedOrderAction`

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
void MySpi::OnRspParkedOrderAction() {
    // Mark the event in your session state machine and send the next step if needed.
}
```

**Implementation notes**

- Make callback handlers idempotent because reconnect and replay semantics can surface the same business object more than once.
- Do not block the SPI thread with long business logic; hand the event to a worker queue when processing becomes expensive.

## OnRspParkedOrderInsert

`OnRspParkedOrderInsert` is an event callback that reports state back from the CTP runtime into the client application.

- Kind: callback
- Owning interface: `CThostFtdcTraderSpi`
- Related symbols: `ReqParkedOrderInsert`

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
void MySpi::OnRspParkedOrderInsert() {
    // Mark the event in your session state machine and send the next step if needed.
}
```

**Implementation notes**

- Make callback handlers idempotent because reconnect and replay semantics can surface the same business object more than once.
- Do not block the SPI thread with long business logic; hand the event to a worker queue when processing becomes expensive.

## OnRspQuoteAction

`OnRspQuoteAction` is an event callback that reports state back from the CTP runtime into the client application.

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

- This callback belongs to the synchronous response path for a request issued earlier.
- Use `pRspInfo` to detect business or validation failures when that parameter is present.
- Use `nRequestID` and `bIsLast` to correlate and complete the waiting request state when those parameters are present.

**Field guide for `CThostFtdcInputQuoteActionField`**

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
| `UserID` | `TThostFtdcUserIDType` | User code associated with the current login identity. |
| `reserve1` | `TThostFtdcOldInstrumentIDType` | Carries the reserve1 for the current request or response. |
| `InvestUnitID` | `TThostFtdcInvestUnitIDType` | Investment unit identifier used by the account model. |
| `ClientID` | `TThostFtdcClientIDType` | Client identifier supplied by the brokerage environment. |
| `reserve2` | `TThostFtdcOldIPAddressType` | Carries the reserve2 for the current request or response. |
| `MacAddress` | `TThostFtdcMacAddressType` | Client MAC address reported to the server. |
| `InstrumentID` | `TThostFtdcInstrumentIDType` | Instrument symbol for the target contract. |
| `IPAddress` | `TThostFtdcIPAddressType` | Client IP address reported to the server. |
| `OrderMemo` | `TThostFtdcOrderMemoType` | Client memo attached to the order. |
| `SessionReqSeq` | `TThostFtdcSequenceNo12Type` | Per-session request sequence used by some server paths. |

**Structure layout**

```cpp
struct CThostFtdcInputQuoteActionField
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

    TThostFtdcUserIDType    UserID;

    TThostFtdcOldInstrumentIDType   reserve1;

    TThostFtdcInvestUnitIDType  InvestUnitID;

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
void MySpi::OnRspQuoteAction() {
    // Mark the event in your session state machine and send the next step if needed.
}
```

**Implementation notes**

- Make callback handlers idempotent because reconnect and replay semantics can surface the same business object more than once.
- Do not block the SPI thread with long business logic; hand the event to a worker queue when processing becomes expensive.

## OnRspQuoteInsert

`OnRspQuoteInsert` is an event callback that reports state back from the CTP runtime into the client application.

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

- This callback belongs to the synchronous response path for a request issued earlier.
- Use `pRspInfo` to detect business or validation failures when that parameter is present.
- Use `nRequestID` and `bIsLast` to correlate and complete the waiting request state when those parameters are present.

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
void MySpi::OnRspQuoteInsert() {
    // Mark the event in your session state machine and send the next step if needed.
}
```

**Implementation notes**

- Make callback handlers idempotent because reconnect and replay semantics can surface the same business object more than once.
- Do not block the SPI thread with long business logic; hand the event to a worker queue when processing becomes expensive.

## OnRspRemoveParkedOrder

`OnRspRemoveParkedOrder` is an event callback that reports state back from the CTP runtime into the client application.

- Kind: callback
- Owning interface: `CThostFtdcTraderSpi`
- Related symbols: `ReqRemoveParkedOrder`

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

**Field guide for `CThostFtdcRemoveParkedOrderField`**

| Field | Type | Purpose |
| --- | --- | --- |
| `BrokerID` | `TThostFtdcBrokerIDType` | Broker code that scopes the request or identifies the response owner. |
| `InvestorID` | `TThostFtdcInvestorIDType` | Investor code used by the trading account. |
| `ParkedOrderID` | `TThostFtdcParkedOrderIDType` | Carries the parked order identifier for the current request or response. |
| `InvestUnitID` | `TThostFtdcInvestUnitIDType` | Investment unit identifier used by the account model. |

**Structure layout**

```cpp
struct CThostFtdcRemoveParkedOrderField
{

    TThostFtdcBrokerIDType BrokerID;

    TThostFtdcInvestorIDType InvestorID;

    TThostFtdcParkedOrderIDType ParkedOrderID;

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
void MySpi::OnRspRemoveParkedOrder() {
    // Mark the event in your session state machine and send the next step if needed.
}
```

**Implementation notes**

- Make callback handlers idempotent because reconnect and replay semantics can surface the same business object more than once.
- Do not block the SPI thread with long business logic; hand the event to a worker queue when processing becomes expensive.

## OnRspRemoveParkedOrderAction

`OnRspRemoveParkedOrderAction` is an event callback that reports state back from the CTP runtime into the client application.

- Kind: callback
- Owning interface: `CThostFtdcTraderSpi`
- Related symbols: `ReqRemoveParkedOrderAction`

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

**Field guide for `CThostFtdcRemoveParkedOrderActionField`**

| Field | Type | Purpose |
| --- | --- | --- |
| `BrokerID` | `TThostFtdcBrokerIDType` | Broker code that scopes the request or identifies the response owner. |
| `InvestorID` | `TThostFtdcInvestorIDType` | Investor code used by the trading account. |
| `ParkedOrderActionID` | `TThostFtdcParkedOrderActionIDType` | Carries the parked order action identifier for the current request or response. |
| `InvestUnitID` | `TThostFtdcInvestUnitIDType` | Investment unit identifier used by the account model. |

**Structure layout**

```cpp
struct CThostFtdcRemoveParkedOrderActionField
{

    TThostFtdcBrokerIDType BrokerID;

    TThostFtdcInvestorIDType InvestorID;

    TThostFtdcParkedOrderActionIDType ParkedOrderActionID;

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
void MySpi::OnRspRemoveParkedOrderAction() {
    // Mark the event in your session state machine and send the next step if needed.
}
```

**Implementation notes**

- Make callback handlers idempotent because reconnect and replay semantics can surface the same business object more than once.
- Do not block the SPI thread with long business logic; hand the event to a worker queue when processing becomes expensive.
