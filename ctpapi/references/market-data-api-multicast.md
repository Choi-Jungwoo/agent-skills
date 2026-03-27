# CTP market data API multicast discovery

This reference covers request-side multicast instrument discovery for market-data deployments that use multicast routing.

| Entry | Kind |
| --- | --- |
| ReqQryMulticastInstrument | request |

## ReqQryMulticastInstrument

`ReqQryMulticastInstrument` is an asynchronous request entry point used to drive a business operation through the CTP runtime.

- Kind: request
- Owning interface: `CThostFtdcMdApi`
- Related symbols: `OnRspQryMulticastInstrument`

**When to use it**

- Warm up local caches after login.
- Fetch on-demand operational data for UI, reconciliation, or risk checks.

**How to apply it**

1. Ensure the API instance is initialized and the session has reached the state required for this request.
2. Fill the request object with the identifiers and business fields expected by the server.
3. Call the API, inspect the local return code, then complete the workflow through later SPI callbacks.

**Prototype**

```cpp
virtual int ReqQryMulticastInstrument(CThostFtdcQryMulticastInstrumentField *pQryMulticastInstrument, int nRequestID) = 0;
```

**Parameters**

| Name | Type | Purpose |
| --- | --- | --- |
| `pQryMulticastInstrument` | `CThostFtdcQryMulticastInstrumentField *` | Pointer to the payload object `CThostFtdcQryMulticastInstrumentField *`. |
| `nRequestID` | `int` | Request correlation id provided by the caller. |

**Callback and outcome model**

- Success path: `OnRspQryMulticastInstrument`.

**Return semantics**

- `0` means the request was accepted by the local API runtime and will continue asynchronously through SPI callbacks.
- `-1` means the client is not in a state where the request can be submitted, typically because the connection is unavailable.
- `-2` means too many outstanding requests remain unprocessed on the local side.
- `-3` means the local request-rate limit was hit and the caller should retry later.

**Field guide for `CThostFtdcQryMulticastInstrumentField`**

| Field | Type | Purpose |
| --- | --- | --- |
| `TopicID` | `TThostFtdcInstallIDType` | Carries the topic identifier for the current request or response. |
| `InstrumentID` | `TThostFtdcInstrumentIDType` | Instrument symbol for the target contract. |

**Structure layout**

```cpp
struct CThostFtdcQryMulticastInstrumentField
    {

        TThostFtdcInstallIDType TopicID;

        TThostFtdcInstrumentIDType  InstrumentID;
    };
```

**Usage example**

```cpp
CThostFtdcQryMulticastInstrumentField a = { 0 };
a.TopicID = 1001;//            topic
//a.TopicID = 5001;//              topic
strcpy_s(g_chInstrumentID,"cu1906");
m_pUserMdApi->ReqQryMulticastInstrument(&a, 1);
```

**Implementation notes**

- Treat the immediate return code and the later callbacks as two different stages of the same business operation.
- Preserve the identifiers sent in the request because later callbacks often reference them instead of your local in-memory object.
