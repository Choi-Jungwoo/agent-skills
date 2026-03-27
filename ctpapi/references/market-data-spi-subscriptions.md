# CTP market data SPI subscription callbacks

This reference covers multicast query responses and subscription acknowledgement callbacks on the market-data SPI side.

| Entry | Kind |
| --- | --- |
| OnRspQryMulticastInstrument | callback |
| OnRspSubForQuoteRsp | callback |
| OnRspSubMarketData | callback |
| OnRspUnSubForQuoteRsp | callback |
| OnRspUnSubMarketData | callback |

## OnRspQryMulticastInstrument

`OnRspQryMulticastInstrument` is an event callback that reports state back from the CTP runtime into the client application.

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

- This callback belongs to the synchronous response path for a request issued earlier.
- Use `pRspInfo` to detect business or validation failures when that parameter is present.
- Use `nRequestID` and `bIsLast` to correlate and complete the waiting request state when those parameters are present.

**Field guide for `CThostFtdcMulticastInstrumentField`**

| Field | Type | Purpose |
| --- | --- | --- |
| `TopicID` | `TThostFtdcInstallIDType` | Carries the topic identifier for the current request or response. |
| `InstrumentID` | `TThostFtdcInstrumentIDType` | Instrument symbol for the target contract. |
| `InstrumentNo` | `TThostFtdcInstallIDType` | Carries the instrument no for the current request or response. |
| `CodePrice` | `TThostFtdcPriceType` | Carries the code price for the current request or response. |
| `VolumeMultiple` | `TThostFtdcVolumeMultipleType` | Carries the volume multiple for the current request or response. |
| `PriceTick` | `TThostFtdcPriceType` | Carries the price tick for the current request or response. |

**Structure layout**

```cpp
struct CThostFtdcMulticastInstrumentField
    {

        TThostFtdcInstallIDType TopicID;

        TThostFtdcInstrumentIDType  InstrumentID;

        TThostFtdcInstallIDType InstrumentNo;

        TThostFtdcPriceType CodePrice;

        TThostFtdcVolumeMultipleType    VolumeMultiple;

        TThostFtdcPriceType PriceTick;
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
void MySpi::OnRspQryMulticastInstrument() {
    // Mark the event in your session state machine and send the next step if needed.
}
```

**Implementation notes**

- Make callback handlers idempotent because reconnect and replay semantics can surface the same business object more than once.
- Do not block the SPI thread with long business logic; hand the event to a worker queue when processing becomes expensive.

## OnRspSubForQuoteRsp

`OnRspSubForQuoteRsp` is an event callback that reports state back from the CTP runtime into the client application.

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

- This callback belongs to the synchronous response path for a request issued earlier.
- Use `pRspInfo` to detect business or validation failures when that parameter is present.
- Use `nRequestID` and `bIsLast` to correlate and complete the waiting request state when those parameters are present.

**Field guide for `CThostFtdcSpecificInstrumentField`**

| Field | Type | Purpose |
| --- | --- | --- |
| `InstrumentID` | `TThostFtdcInstrumentIDType` | Instrument symbol for the target contract. |

**Structure layout**

```cpp
struct CThostFtdcSpecificInstrumentField
{

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
void MySpi::OnRspSubForQuoteRsp() {
    // Mark the event in your session state machine and send the next step if needed.
}
```

**Implementation notes**

- Make callback handlers idempotent because reconnect and replay semantics can surface the same business object more than once.
- Do not block the SPI thread with long business logic; hand the event to a worker queue when processing becomes expensive.

## OnRspSubMarketData

`OnRspSubMarketData` is an event callback that reports state back from the CTP runtime into the client application.

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

- This callback belongs to the synchronous response path for a request issued earlier.
- Use `pRspInfo` to detect business or validation failures when that parameter is present.
- Use `nRequestID` and `bIsLast` to correlate and complete the waiting request state when those parameters are present.

**Field guide for `CThostFtdcSpecificInstrumentField`**

| Field | Type | Purpose |
| --- | --- | --- |
| `InstrumentID` | `TThostFtdcInstrumentIDType` | Instrument symbol for the target contract. |

**Structure layout**

```cpp
struct CThostFtdcSpecificInstrumentField
{

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
void MySpi::OnRspSubMarketData() {
    // Mark the event in your session state machine and send the next step if needed.
}
```

**Implementation notes**

- Make callback handlers idempotent because reconnect and replay semantics can surface the same business object more than once.
- Do not block the SPI thread with long business logic; hand the event to a worker queue when processing becomes expensive.

## OnRspUnSubForQuoteRsp

`OnRspUnSubForQuoteRsp` is an event callback that reports state back from the CTP runtime into the client application.

- Kind: callback
- Owning interface: `CThostFtdcMdSpi`
- Related symbols: `UnSubscribeForQuoteRsp`

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

**Field guide for `CThostFtdcSpecificInstrumentField`**

| Field | Type | Purpose |
| --- | --- | --- |
| `InstrumentID` | `TThostFtdcInstrumentIDType` | Instrument symbol for the target contract. |

**Structure layout**

```cpp
struct CThostFtdcSpecificInstrumentField
{

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
void MySpi::OnRspUnSubForQuoteRsp() {
    // Mark the event in your session state machine and send the next step if needed.
}
```

**Implementation notes**

- Make callback handlers idempotent because reconnect and replay semantics can surface the same business object more than once.
- Do not block the SPI thread with long business logic; hand the event to a worker queue when processing becomes expensive.

## OnRspUnSubMarketData

`OnRspUnSubMarketData` is an event callback that reports state back from the CTP runtime into the client application.

- Kind: callback
- Owning interface: `CThostFtdcMdSpi`
- Related symbols: `UnSubscribeMarketData`

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

**Field guide for `CThostFtdcSpecificInstrumentField`**

| Field | Type | Purpose |
| --- | --- | --- |
| `InstrumentID` | `TThostFtdcInstrumentIDType` | Instrument symbol for the target contract. |

**Structure layout**

```cpp
struct CThostFtdcSpecificInstrumentField
{

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
void MySpi::OnRspUnSubMarketData() {
    // Mark the event in your session state machine and send the next step if needed.
}
```

**Implementation notes**

- Make callback handlers idempotent because reconnect and replay semantics can surface the same business object more than once.
- Do not block the SPI thread with long business logic; hand the event to a worker queue when processing becomes expensive.
