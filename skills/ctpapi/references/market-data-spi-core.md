# CTP market data SPI core callbacks

This reference covers the market-data SPI class and the core connection and error callbacks that shape the session state machine.

| Entry | Kind |
| --- | --- |
| CThostFtdcMdSpi | class |
| OnFrontConnected | callback |
| OnFrontDisconnected | callback |
| OnHeartBeatWarning | callback |
| OnRspError | callback |

## CThostFtdcMdSpi

`CThostFtdcMdSpi` is the main class for this API surface and anchors the surrounding workflow.

- Kind: class
- Owning interface: `CThostFtdcMdSpi`
- Related symbols: `OnRspUserLogin`, `OnRspUserLogout`, `OnRspQryMulticastInstrument`, `OnRspError`, `OnRspSubMarketData`, `OnRspUnSubMarketData`, `OnRspSubForQuoteRsp`, `OnRspUnSubForQuoteRsp`, `OnRtnDepthMarketData`, `OnRtnForQuoteRsp`

**When to use it**

- Use this entry when the related business flow becomes part of your integration.
- Keep the behavior in mind when modeling retries, reconnection, or reconciliation logic.

**How to apply it**

1. Read this section before implementing the related integration path.
2. Map the rule or overview to the request and callback symbols affected by it.

**Prototype**

```cpp
class CMduserHandler : public CThostFtdcMdSpi
```

**Callback and outcome model**

- Success path: `OnRspUserLogin`, `OnRspUserLogout`, `OnRspQryMulticastInstrument`, `OnRspError`, `OnRspSubMarketData`, `OnRspUnSubMarketData`, `OnRspSubForQuoteRsp`, `OnRspUnSubForQuoteRsp`.
- Error path: `OnRspError`.

**Usage example**

```cpp
{
                     printf("OnRtnDepthMarketData\n");
       }
}
```

**Implementation notes**

- Keep the API object alive for the full lifetime of the session and destroy it only after the runtime thread has stopped or the process is shutting down.

## OnFrontConnected

`OnFrontConnected` is an event callback that reports state back from the CTP runtime into the client application.

- Kind: callback
- Owning interface: `CThostFtdcMdSpi`

**When to use it**

- Drive event-based application state updates as server data arrives.
- Wake request waiters or publish the event into a higher-level message bus.

**How to apply it**

1. Validate the payload and error object before updating application state.
2. Correlate the event with the original request or subscription when a request id is present.
3. Persist the important identifiers and keep handler logic short so the SPI thread stays responsive.

**Usage example**

```cpp
void MySpi::OnFrontConnected() {
    // Mark the event in your session state machine and send the next step if needed.
}
```

**Implementation notes**

- Make callback handlers idempotent because reconnect and replay semantics can surface the same business object more than once.
- Do not block the SPI thread with long business logic; hand the event to a worker queue when processing becomes expensive.

## OnFrontDisconnected

`OnFrontDisconnected` is an event callback that reports state back from the CTP runtime into the client application.

- Kind: callback
- Owning interface: `CThostFtdcMdSpi`

**When to use it**

- Drive event-based application state updates as server data arrives.
- Wake request waiters or publish the event into a higher-level message bus.

**How to apply it**

1. Validate the payload and error object before updating application state.
2. Correlate the event with the original request or subscription when a request id is present.
3. Persist the important identifiers and keep handler logic short so the SPI thread stays responsive.

**Usage example**

```cpp
void MySpi::OnFrontDisconnected() {
    // Mark the event in your session state machine and send the next step if needed.
}
```

**Implementation notes**

- Make callback handlers idempotent because reconnect and replay semantics can surface the same business object more than once.
- Do not block the SPI thread with long business logic; hand the event to a worker queue when processing becomes expensive.

## OnHeartBeatWarning

`OnHeartBeatWarning` is an event callback that reports state back from the CTP runtime into the client application.

- Kind: callback
- Owning interface: `CThostFtdcMdSpi`

**When to use it**

- Drive event-based application state updates as server data arrives.
- Wake request waiters or publish the event into a higher-level message bus.

**How to apply it**

1. Validate the payload and error object before updating application state.
2. Correlate the event with the original request or subscription when a request id is present.
3. Persist the important identifiers and keep handler logic short so the SPI thread stays responsive.

**Usage example**

```cpp
void MySpi::OnHeartBeatWarning() {
    // Mark the event in your session state machine and send the next step if needed.
}
```

**Implementation notes**

- Make callback handlers idempotent because reconnect and replay semantics can surface the same business object more than once.
- Do not block the SPI thread with long business logic; hand the event to a worker queue when processing becomes expensive.

## OnRspError

`OnRspError` is an event callback that reports state back from the CTP runtime into the client application.

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
void MySpi::OnRspError() {
    // Mark the event in your session state machine and send the next step if needed.
}
```

**Implementation notes**

- Make callback handlers idempotent because reconnect and replay semantics can surface the same business object more than once.
- Do not block the SPI thread with long business logic; hand the event to a worker queue when processing becomes expensive.
