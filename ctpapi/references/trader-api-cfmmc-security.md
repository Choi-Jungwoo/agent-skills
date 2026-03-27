# CTP trader API CFMMC security queries

This reference covers CFMMC-related security material on the trader side, including the account key and token queries.

| Entry | Kind |
| --- | --- |
| ReqQryCFMMCTradingAccountKey | request |
| ReqQueryCFMMCTradingAccountToken | request |

## ReqQryCFMMCTradingAccountKey

`ReqQryCFMMCTradingAccountKey` is an asynchronous request entry point used to drive a business operation through the CTP runtime.

- Kind: request
- Owning interface: `CThostFtdcTraderApi`
- Related symbols: `ReqQueryCFMMCTradingAccountToken`, `OnRspQryCFMMCTradingAccountKey`

**When to use it**

- Warm up local caches after login.
- Fetch on-demand operational data for UI, reconciliation, or risk checks.

**How to apply it**

1. Ensure the API instance is initialized and the session has reached the state required for this request.
2. Fill the request object with the identifiers and business fields expected by the server.
3. Call the API, inspect the local return code, then complete the workflow through later SPI callbacks.

**Prototype**

```cpp
virtual int ReqQryCFMMCTradingAccountKey(CThostFtdcQryCFMMCTradingA ccountKeyField *pQryCFMMCTradingAccountKey, int nRequestID) = 0;
```

**Parameters**

| Name | Type | Purpose |
| --- | --- | --- |
| `pQryCFMMCTradingAccountKey` | `CThostFtdcQryCFMMCTradingA ccountKeyField *` | Pointer to the payload object `CThostFtdcQryCFMMCTradingA ccountKeyField *`. |
| `nRequestID` | `int` | Request correlation id provided by the caller. |

**Callback and outcome model**

- Success path: `OnRspQryCFMMCTradingAccountKey`.

**Return semantics**

- `0` means the request was accepted by the local API runtime and will continue asynchronously through SPI callbacks.
- `-1` means the client is not in a state where the request can be submitted, typically because the connection is unavailable.
- `-2` means too many outstanding requests remain unprocessed on the local side.
- `-3` means the local request-rate limit was hit and the caller should retry later.

**Usage example**

```cpp
CThostFtdcQryCFMMCTradingAccountKeyField a = { 0 };
strcpy(a.BrokerID, "9999");
strcpy(a.InvestorID, "1000001");
m_pUserApi->ReqQryCFMMCTradingAccountKey(&a,
nRequestID++);
```

**Implementation notes**

- Treat the immediate return code and the later callbacks as two different stages of the same business operation.
- Preserve the identifiers sent in the request because later callbacks often reference them instead of your local in-memory object.

## ReqQueryCFMMCTradingAccountToken

`ReqQueryCFMMCTradingAccountToken` is an asynchronous request entry point used to drive a business operation through the CTP runtime.

- Kind: request
- Owning interface: `CThostFtdcTraderApi`
- Related symbols: `ReqQueryCFMMCTradingAccountToke`, `OnRspQueryCFMMCTradingAccountToken`, `OnRtnCFMMCTradingAccountToken`

**When to use it**

- Warm up local caches after login.
- Fetch on-demand operational data for UI, reconciliation, or risk checks.

**How to apply it**

1. Ensure the API instance is initialized and the session has reached the state required for this request.
2. Fill the request object with the identifiers and business fields expected by the server.
3. Call the API, inspect the local return code, then complete the workflow through later SPI callbacks.

**Prototype**

```cpp
virtual int ReqQueryCFMMCTradingAccountToken(CThostFtdcQueryCFMMCTra dingAccountTokenField *pQueryCFMMCTradingAccountToken, int nRequestID) = 0;
```

**Parameters**

| Name | Type | Purpose |
| --- | --- | --- |
| `pQueryCFMMCTradingAccountToken` | `CThostFtdcQueryCFMMCTra dingAccountTokenField *` | Pointer to the payload object `CThostFtdcQueryCFMMCTra dingAccountTokenField *`. |
| `nRequestID` | `int` | Request correlation id provided by the caller. |

**Callback and outcome model**

- Success path: `OnRspQueryCFMMCTradingAccountToken`, `OnRtnCFMMCTradingAccountToken`.

**Return semantics**

- `0` means the request was accepted by the local API runtime and will continue asynchronously through SPI callbacks.
- `-1` means the client is not in a state where the request can be submitted, typically because the connection is unavailable.
- `-2` means too many outstanding requests remain unprocessed on the local side.
- `-3` means the local request-rate limit was hit and the caller should retry later.

**Usage example**

```cpp
CThostFtdcQueryCFMMCTra dingAccountTokenField queryCFMMCTradingAccountToken = {};
// Fill the required identifiers and business fields before sending the request.
int rc = api->ReqQueryCFMMCTradingAccountToken(&queryCFMMCTradingAccountToken, requestId++);
if (rc != 0) {
    // Handle the local submission failure before waiting for callbacks.
}
```

**Implementation notes**

- Treat the immediate return code and the later callbacks as two different stages of the same business operation.
- Preserve the identifiers sent in the request because later callbacks often reference them instead of your local in-memory object.
