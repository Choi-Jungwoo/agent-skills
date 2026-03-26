# CTP trader API RCAMS and RULE queries

This reference covers RCAMS and RULE parameter, position, and margin queries.

| Entry | Kind |
| --- | --- |
| ReqQryRCAMSCombProductInfo | request |
| ReqQryRCAMSInstrParameter | request |
| ReqQryRCAMSIntraParameter | request |
| ReqQryRCAMSInterParameter | request |
| ReqQryRCAMSShortOptAdjustParam | request |
| ReqQryRCAMSInvestorCombPosition | request |
| ReqQryInvestorProdRCAMSMargin | request |
| ReqQryRULEInstrParameter | request |
| ReqQryRULEIntraParameter | request |
| ReqQryRULEInterParameter | request |
| ReqQryInvestorProdRULEMargin | request |

## ReqQryRCAMSCombProductInfo

`ReqQryRCAMSCombProductInfo` is an asynchronous request entry point used to drive a business operation through the CTP runtime.

- Kind: request
- Owning interface: `CThostFtdcTraderApi`
- Related symbols: `OnRspQryRCAMSCombProductInfo`

**When to use it**

- Warm up local caches after login.
- Fetch on-demand operational data for UI, reconciliation, or risk checks.

**How to apply it**

1. Ensure the API instance is initialized and the session has reached the state required for this request.
2. Fill the request object with the identifiers and business fields expected by the server.
3. Call the API, inspect the local return code, then complete the workflow through later SPI callbacks.

**Prototype**

```cpp
virtual int ReqQryRCAMSCombProductInfo(CThostFtdcQryRCAMSCombProduc tInfoField *pQryRCAMSCombProductInfo, int nRequestID) = 0;
```

**Parameters**

| Name | Type | Purpose |
| --- | --- | --- |
| `pQryRCAMSCombProductInfo` | `CThostFtdcQryRCAMSCombProduc tInfoField *` | Pointer to the payload object `CThostFtdcQryRCAMSCombProduc tInfoField *`. |
| `nRequestID` | `int` | Request correlation id provided by the caller. |

**Callback and outcome model**

- Success path: `OnRspQryRCAMSCombProductInfo`.

**Return semantics**

- `0` means the request was accepted by the local API runtime and will continue asynchronously through SPI callbacks.
- `-1` means the client is not in a state where the request can be submitted, typically because the connection is unavailable.
- `-2` means too many outstanding requests remain unprocessed on the local side.
- `-3` means the local request-rate limit was hit and the caller should retry later.

**Usage example**

```cpp
CThostFtdcQryRCAMSCombProduc tInfoField qryRCAMSCombProductInfo = {};
// Fill the required identifiers and business fields before sending the request.
int rc = api->ReqQryRCAMSCombProductInfo(&qryRCAMSCombProductInfo, requestId++);
if (rc != 0) {
    // Handle the local submission failure before waiting for callbacks.
}
```

**Implementation notes**

- Treat the immediate return code and the later callbacks as two different stages of the same business operation.
- Preserve the identifiers sent in the request because later callbacks often reference them instead of your local in-memory object.

## ReqQryRCAMSInstrParameter

`ReqQryRCAMSInstrParameter` is an asynchronous request entry point used to drive a business operation through the CTP runtime.

- Kind: request
- Owning interface: `CThostFtdcTraderApi`
- Related symbols: `OnRspQryRCAMSInstrParameter`

**When to use it**

- Warm up local caches after login.
- Fetch on-demand operational data for UI, reconciliation, or risk checks.

**How to apply it**

1. Ensure the API instance is initialized and the session has reached the state required for this request.
2. Fill the request object with the identifiers and business fields expected by the server.
3. Call the API, inspect the local return code, then complete the workflow through later SPI callbacks.

**Prototype**

```cpp
virtual int ReqQryRCAMSInstrParameter(CThostFtdcQryRCAMSInstrParameterFi eld *pQryRCAMSInstrParameter, int nRequestID) = 0;
```

**Parameters**

| Name | Type | Purpose |
| --- | --- | --- |
| `pQryRCAMSInstrParameter` | `CThostFtdcQryRCAMSInstrParameterFi eld *` | Pointer to the payload object `CThostFtdcQryRCAMSInstrParameterFi eld *`. |
| `nRequestID` | `int` | Request correlation id provided by the caller. |

**Callback and outcome model**

- Success path: `OnRspQryRCAMSInstrParameter`.

**Return semantics**

- `0` means the request was accepted by the local API runtime and will continue asynchronously through SPI callbacks.
- `-1` means the client is not in a state where the request can be submitted, typically because the connection is unavailable.
- `-2` means too many outstanding requests remain unprocessed on the local side.
- `-3` means the local request-rate limit was hit and the caller should retry later.

**Usage example**

```cpp
CThostFtdcQryRCAMSInstrParameterFi eld qryRCAMSInstrParameter = {};
// Fill the required identifiers and business fields before sending the request.
int rc = api->ReqQryRCAMSInstrParameter(&qryRCAMSInstrParameter, requestId++);
if (rc != 0) {
    // Handle the local submission failure before waiting for callbacks.
}
```

**Implementation notes**

- Treat the immediate return code and the later callbacks as two different stages of the same business operation.
- Preserve the identifiers sent in the request because later callbacks often reference them instead of your local in-memory object.

## ReqQryRCAMSIntraParameter

`ReqQryRCAMSIntraParameter` is an asynchronous request entry point used to drive a business operation through the CTP runtime.

- Kind: request
- Owning interface: `CThostFtdcTraderApi`
- Related symbols: `OnRspQryRCAMSIntraParameter`

**When to use it**

- Warm up local caches after login.
- Fetch on-demand operational data for UI, reconciliation, or risk checks.

**How to apply it**

1. Ensure the API instance is initialized and the session has reached the state required for this request.
2. Fill the request object with the identifiers and business fields expected by the server.
3. Call the API, inspect the local return code, then complete the workflow through later SPI callbacks.

**Prototype**

```cpp
virtual int ReqQryRCAMSIntraParameter(CThostFtdcQryRCAMSIntraParameterFi eld *pQryRCAMSIntraParameter, int nRequestID) = 0;
```

**Parameters**

| Name | Type | Purpose |
| --- | --- | --- |
| `pQryRCAMSIntraParameter` | `CThostFtdcQryRCAMSIntraParameterFi eld *` | Pointer to the payload object `CThostFtdcQryRCAMSIntraParameterFi eld *`. |
| `nRequestID` | `int` | Request correlation id provided by the caller. |

**Callback and outcome model**

- Success path: `OnRspQryRCAMSIntraParameter`.

**Return semantics**

- `0` means the request was accepted by the local API runtime and will continue asynchronously through SPI callbacks.
- `-1` means the client is not in a state where the request can be submitted, typically because the connection is unavailable.
- `-2` means too many outstanding requests remain unprocessed on the local side.
- `-3` means the local request-rate limit was hit and the caller should retry later.

**Usage example**

```cpp
CThostFtdcQryRCAMSIntraParameterFi eld qryRCAMSIntraParameter = {};
// Fill the required identifiers and business fields before sending the request.
int rc = api->ReqQryRCAMSIntraParameter(&qryRCAMSIntraParameter, requestId++);
if (rc != 0) {
    // Handle the local submission failure before waiting for callbacks.
}
```

**Implementation notes**

- Treat the immediate return code and the later callbacks as two different stages of the same business operation.
- Preserve the identifiers sent in the request because later callbacks often reference them instead of your local in-memory object.

## ReqQryRCAMSInterParameter

`ReqQryRCAMSInterParameter` is an asynchronous request entry point used to drive a business operation through the CTP runtime.

- Kind: request
- Owning interface: `CThostFtdcTraderApi`
- Related symbols: `OnRspQryRCAMSInterParameter`

**When to use it**

- Warm up local caches after login.
- Fetch on-demand operational data for UI, reconciliation, or risk checks.

**How to apply it**

1. Ensure the API instance is initialized and the session has reached the state required for this request.
2. Fill the request object with the identifiers and business fields expected by the server.
3. Call the API, inspect the local return code, then complete the workflow through later SPI callbacks.

**Prototype**

```cpp
virtual int ReqQryRCAMSInterParameter(CThostFtdcQryRCAMSInterParameterFi eld *pQryRCAMSInterParameter, int nRequestID) = 0;
```

**Parameters**

| Name | Type | Purpose |
| --- | --- | --- |
| `pQryRCAMSInterParameter` | `CThostFtdcQryRCAMSInterParameterFi eld *` | Pointer to the payload object `CThostFtdcQryRCAMSInterParameterFi eld *`. |
| `nRequestID` | `int` | Request correlation id provided by the caller. |

**Callback and outcome model**

- Success path: `OnRspQryRCAMSInterParameter`.

**Return semantics**

- `0` means the request was accepted by the local API runtime and will continue asynchronously through SPI callbacks.
- `-1` means the client is not in a state where the request can be submitted, typically because the connection is unavailable.
- `-2` means too many outstanding requests remain unprocessed on the local side.
- `-3` means the local request-rate limit was hit and the caller should retry later.

**Usage example**

```cpp
CThostFtdcQryRCAMSInterParameterFi eld qryRCAMSInterParameter = {};
// Fill the required identifiers and business fields before sending the request.
int rc = api->ReqQryRCAMSInterParameter(&qryRCAMSInterParameter, requestId++);
if (rc != 0) {
    // Handle the local submission failure before waiting for callbacks.
}
```

**Implementation notes**

- Treat the immediate return code and the later callbacks as two different stages of the same business operation.
- Preserve the identifiers sent in the request because later callbacks often reference them instead of your local in-memory object.

## ReqQryRCAMSShortOptAdjustParam

`ReqQryRCAMSShortOptAdjustParam` is an asynchronous request entry point used to drive a business operation through the CTP runtime.

- Kind: request
- Owning interface: `CThostFtdcTraderApi`
- Related symbols: `OnRspQryRCAMSShortOptAdjustParam`

**When to use it**

- Warm up local caches after login.
- Fetch on-demand operational data for UI, reconciliation, or risk checks.

**How to apply it**

1. Ensure the API instance is initialized and the session has reached the state required for this request.
2. Fill the request object with the identifiers and business fields expected by the server.
3. Call the API, inspect the local return code, then complete the workflow through later SPI callbacks.

**Prototype**

```cpp
virtual int ReqQryRCAMSShortOptAdjustParam(CThostFtdcQryRCAMSShortOpt AdjustParamField *pQryRCAMSShortOptAdjustParam, int nRequestID) = 0;
```

**Parameters**

| Name | Type | Purpose |
| --- | --- | --- |
| `pQryRCAMSShortOptAdjustParam` | `CThostFtdcQryRCAMSShortOpt AdjustParamField *` | Pointer to the payload object `CThostFtdcQryRCAMSShortOpt AdjustParamField *`. |
| `nRequestID` | `int` | Request correlation id provided by the caller. |

**Callback and outcome model**

- Success path: `OnRspQryRCAMSShortOptAdjustParam`.

**Return semantics**

- `0` means the request was accepted by the local API runtime and will continue asynchronously through SPI callbacks.
- `-1` means the client is not in a state where the request can be submitted, typically because the connection is unavailable.
- `-2` means too many outstanding requests remain unprocessed on the local side.
- `-3` means the local request-rate limit was hit and the caller should retry later.

**Usage example**

```cpp
CThostFtdcQryRCAMSShortOpt AdjustParamField qryRCAMSShortOptAdjustParam = {};
// Fill the required identifiers and business fields before sending the request.
int rc = api->ReqQryRCAMSShortOptAdjustParam(&qryRCAMSShortOptAdjustParam, requestId++);
if (rc != 0) {
    // Handle the local submission failure before waiting for callbacks.
}
```

**Implementation notes**

- Treat the immediate return code and the later callbacks as two different stages of the same business operation.
- Preserve the identifiers sent in the request because later callbacks often reference them instead of your local in-memory object.

## ReqQryRCAMSInvestorCombPosition

`ReqQryRCAMSInvestorCombPosition` is an asynchronous request entry point used to drive a business operation through the CTP runtime.

- Kind: request
- Owning interface: `CThostFtdcTraderApi`
- Related symbols: `OnRspQryRCAMSInvestorCombPosition`

**When to use it**

- Warm up local caches after login.
- Fetch on-demand operational data for UI, reconciliation, or risk checks.

**How to apply it**

1. Ensure the API instance is initialized and the session has reached the state required for this request.
2. Fill the request object with the identifiers and business fields expected by the server.
3. Call the API, inspect the local return code, then complete the workflow through later SPI callbacks.

**Prototype**

```cpp
virtual int ReqQryRCAMSInvestorCombPosition(CThostFtdcQryRCAMSInvestor CombPositionField *pQryRCAMSInvestorCombPosition, int nRequestID) = 0;
```

**Parameters**

| Name | Type | Purpose |
| --- | --- | --- |
| `pQryRCAMSInvestorCombPosition` | `CThostFtdcQryRCAMSInvestor CombPositionField *` | Pointer to the payload object `CThostFtdcQryRCAMSInvestor CombPositionField *`. |
| `nRequestID` | `int` | Request correlation id provided by the caller. |

**Callback and outcome model**

- Success path: `OnRspQryRCAMSInvestorCombPosition`.

**Return semantics**

- `0` means the request was accepted by the local API runtime and will continue asynchronously through SPI callbacks.
- `-1` means the client is not in a state where the request can be submitted, typically because the connection is unavailable.
- `-2` means too many outstanding requests remain unprocessed on the local side.
- `-3` means the local request-rate limit was hit and the caller should retry later.

**Usage example**

```cpp
CThostFtdcQryRCAMSInvestor CombPositionField qryRCAMSInvestorCombPosition = {};
// Fill the required identifiers and business fields before sending the request.
int rc = api->ReqQryRCAMSInvestorCombPosition(&qryRCAMSInvestorCombPosition, requestId++);
if (rc != 0) {
    // Handle the local submission failure before waiting for callbacks.
}
```

**Implementation notes**

- Treat the immediate return code and the later callbacks as two different stages of the same business operation.
- Preserve the identifiers sent in the request because later callbacks often reference them instead of your local in-memory object.

## ReqQryInvestorProdRCAMSMargin

`ReqQryInvestorProdRCAMSMargin` is an asynchronous request entry point used to drive a business operation through the CTP runtime.

- Kind: request
- Owning interface: `CThostFtdcTraderApi`
- Related symbols: `OnRspQryInvestorProdRCAMSMargin`

**When to use it**

- Warm up local caches after login.
- Fetch on-demand operational data for UI, reconciliation, or risk checks.

**How to apply it**

1. Ensure the API instance is initialized and the session has reached the state required for this request.
2. Fill the request object with the identifiers and business fields expected by the server.
3. Call the API, inspect the local return code, then complete the workflow through later SPI callbacks.

**Prototype**

```cpp
virtual int ReqQryInvestorProdRCAMSMargin(CThostFtdcQryInvestorProdRCAM SMarginField *pQryInvestorProdRCAMSMargin, int nRequestID) = 0;
```

**Parameters**

| Name | Type | Purpose |
| --- | --- | --- |
| `pQryInvestorProdRCAMSMargin` | `CThostFtdcQryInvestorProdRCAM SMarginField *` | Pointer to the payload object `CThostFtdcQryInvestorProdRCAM SMarginField *`. |
| `nRequestID` | `int` | Request correlation id provided by the caller. |

**Callback and outcome model**

- Success path: `OnRspQryInvestorProdRCAMSMargin`.

**Return semantics**

- `0` means the request was accepted by the local API runtime and will continue asynchronously through SPI callbacks.
- `-1` means the client is not in a state where the request can be submitted, typically because the connection is unavailable.
- `-2` means too many outstanding requests remain unprocessed on the local side.
- `-3` means the local request-rate limit was hit and the caller should retry later.

**Usage example**

```cpp
CThostFtdcQryInvestorProdRCAM SMarginField qryInvestorProdRCAMSMargin = {};
// Fill the required identifiers and business fields before sending the request.
int rc = api->ReqQryInvestorProdRCAMSMargin(&qryInvestorProdRCAMSMargin, requestId++);
if (rc != 0) {
    // Handle the local submission failure before waiting for callbacks.
}
```

**Implementation notes**

- Treat the immediate return code and the later callbacks as two different stages of the same business operation.
- Preserve the identifiers sent in the request because later callbacks often reference them instead of your local in-memory object.

## ReqQryRULEInstrParameter

`ReqQryRULEInstrParameter` is an asynchronous request entry point used to drive a business operation through the CTP runtime.

- Kind: request
- Owning interface: `CThostFtdcTraderApi`
- Related symbols: `OnRspQryRULEInstrParameter`

**When to use it**

- Warm up local caches after login.
- Fetch on-demand operational data for UI, reconciliation, or risk checks.

**How to apply it**

1. Ensure the API instance is initialized and the session has reached the state required for this request.
2. Fill the request object with the identifiers and business fields expected by the server.
3. Call the API, inspect the local return code, then complete the workflow through later SPI callbacks.

**Prototype**

```cpp
virtual int ReqQryRULEInstrParameter(CThostFtdcQryRULEInstrParameterField *pQryRULEInstrParameter, int nRequestID) = 0;
```

**Parameters**

| Name | Type | Purpose |
| --- | --- | --- |
| `pQryRULEInstrParameter` | `CThostFtdcQryRULEInstrParameterField *` | Pointer to the payload object `CThostFtdcQryRULEInstrParameterField *`. |
| `nRequestID` | `int` | Request correlation id provided by the caller. |

**Callback and outcome model**

- Success path: `OnRspQryRULEInstrParameter`.

**Return semantics**

- `0` means the request was accepted by the local API runtime and will continue asynchronously through SPI callbacks.
- `-1` means the client is not in a state where the request can be submitted, typically because the connection is unavailable.
- `-2` means too many outstanding requests remain unprocessed on the local side.
- `-3` means the local request-rate limit was hit and the caller should retry later.

**Usage example**

```cpp
CThostFtdcQryRULEInstrParameterField qryRULEInstrParameter = {};
// Fill the required identifiers and business fields before sending the request.
int rc = api->ReqQryRULEInstrParameter(&qryRULEInstrParameter, requestId++);
if (rc != 0) {
    // Handle the local submission failure before waiting for callbacks.
}
```

**Implementation notes**

- Treat the immediate return code and the later callbacks as two different stages of the same business operation.
- Preserve the identifiers sent in the request because later callbacks often reference them instead of your local in-memory object.

## ReqQryRULEIntraParameter

`ReqQryRULEIntraParameter` is an asynchronous request entry point used to drive a business operation through the CTP runtime.

- Kind: request
- Owning interface: `CThostFtdcTraderApi`
- Related symbols: `OnRspQryRULEIntraParameter`

**When to use it**

- Warm up local caches after login.
- Fetch on-demand operational data for UI, reconciliation, or risk checks.

**How to apply it**

1. Ensure the API instance is initialized and the session has reached the state required for this request.
2. Fill the request object with the identifiers and business fields expected by the server.
3. Call the API, inspect the local return code, then complete the workflow through later SPI callbacks.

**Prototype**

```cpp
virtual int ReqQryRULEIntraParameter(CThostFtdcQryRULEIntraParameterField *pQryRULEIntraParameter, int nRequestID) = 0;
```

**Parameters**

| Name | Type | Purpose |
| --- | --- | --- |
| `pQryRULEIntraParameter` | `CThostFtdcQryRULEIntraParameterField *` | Pointer to the payload object `CThostFtdcQryRULEIntraParameterField *`. |
| `nRequestID` | `int` | Request correlation id provided by the caller. |

**Callback and outcome model**

- Success path: `OnRspQryRULEIntraParameter`.

**Return semantics**

- `0` means the request was accepted by the local API runtime and will continue asynchronously through SPI callbacks.
- `-1` means the client is not in a state where the request can be submitted, typically because the connection is unavailable.
- `-2` means too many outstanding requests remain unprocessed on the local side.
- `-3` means the local request-rate limit was hit and the caller should retry later.

**Usage example**

```cpp
CThostFtdcQryRULEIntraParameterField qryRULEIntraParameter = {};
// Fill the required identifiers and business fields before sending the request.
int rc = api->ReqQryRULEIntraParameter(&qryRULEIntraParameter, requestId++);
if (rc != 0) {
    // Handle the local submission failure before waiting for callbacks.
}
```

**Implementation notes**

- Treat the immediate return code and the later callbacks as two different stages of the same business operation.
- Preserve the identifiers sent in the request because later callbacks often reference them instead of your local in-memory object.

## ReqQryRULEInterParameter

`ReqQryRULEInterParameter` is an asynchronous request entry point used to drive a business operation through the CTP runtime.

- Kind: request
- Owning interface: `CThostFtdcTraderApi`
- Related symbols: `OnRspQryRULEInterParameter`

**When to use it**

- Warm up local caches after login.
- Fetch on-demand operational data for UI, reconciliation, or risk checks.

**How to apply it**

1. Ensure the API instance is initialized and the session has reached the state required for this request.
2. Fill the request object with the identifiers and business fields expected by the server.
3. Call the API, inspect the local return code, then complete the workflow through later SPI callbacks.

**Prototype**

```cpp
virtual int ReqQryRULEInterParameter(CThostFtdcQryRULEInterParameterField *pQryRULEInterParameter, int nRequestID) = 0;
```

**Parameters**

| Name | Type | Purpose |
| --- | --- | --- |
| `pQryRULEInterParameter` | `CThostFtdcQryRULEInterParameterField *` | Pointer to the payload object `CThostFtdcQryRULEInterParameterField *`. |
| `nRequestID` | `int` | Request correlation id provided by the caller. |

**Callback and outcome model**

- Success path: `OnRspQryRULEInterParameter`.

**Return semantics**

- `0` means the request was accepted by the local API runtime and will continue asynchronously through SPI callbacks.
- `-1` means the client is not in a state where the request can be submitted, typically because the connection is unavailable.
- `-2` means too many outstanding requests remain unprocessed on the local side.
- `-3` means the local request-rate limit was hit and the caller should retry later.

**Usage example**

```cpp
CThostFtdcQryRULEInterParameterField qryRULEInterParameter = {};
// Fill the required identifiers and business fields before sending the request.
int rc = api->ReqQryRULEInterParameter(&qryRULEInterParameter, requestId++);
if (rc != 0) {
    // Handle the local submission failure before waiting for callbacks.
}
```

**Implementation notes**

- Treat the immediate return code and the later callbacks as two different stages of the same business operation.
- Preserve the identifiers sent in the request because later callbacks often reference them instead of your local in-memory object.

## ReqQryInvestorProdRULEMargin

`ReqQryInvestorProdRULEMargin` is an asynchronous request entry point used to drive a business operation through the CTP runtime.

- Kind: request
- Owning interface: `CThostFtdcTraderApi`
- Related symbols: `OnRspQryInvestorProdRULEMargin`

**When to use it**

- Warm up local caches after login.
- Fetch on-demand operational data for UI, reconciliation, or risk checks.

**How to apply it**

1. Ensure the API instance is initialized and the session has reached the state required for this request.
2. Fill the request object with the identifiers and business fields expected by the server.
3. Call the API, inspect the local return code, then complete the workflow through later SPI callbacks.

**Prototype**

```cpp
virtual int ReqQryInvestorProdRULEMargin(CThostFtdcQryInvestorProdRULEM arginField *pQryInvestorProdRULEMargin, int nRequestID) = 0;
```

**Parameters**

| Name | Type | Purpose |
| --- | --- | --- |
| `pQryInvestorProdRULEMargin` | `CThostFtdcQryInvestorProdRULEM arginField *` | Pointer to the payload object `CThostFtdcQryInvestorProdRULEM arginField *`. |
| `nRequestID` | `int` | Request correlation id provided by the caller. |

**Callback and outcome model**

- Success path: `OnRspQryInvestorProdRULEMargin`.

**Return semantics**

- `0` means the request was accepted by the local API runtime and will continue asynchronously through SPI callbacks.
- `-1` means the client is not in a state where the request can be submitted, typically because the connection is unavailable.
- `-2` means too many outstanding requests remain unprocessed on the local side.
- `-3` means the local request-rate limit was hit and the caller should retry later.

**Usage example**

```cpp
CThostFtdcQryInvestorProdRULEM arginField qryInvestorProdRULEMargin = {};
// Fill the required identifiers and business fields before sending the request.
int rc = api->ReqQryInvestorProdRULEMargin(&qryInvestorProdRULEMargin, requestId++);
if (rc != 0) {
    // Handle the local submission failure before waiting for callbacks.
}
```

**Implementation notes**

- Treat the immediate return code and the later callbacks as two different stages of the same business operation.
- Preserve the identifiers sent in the request because later callbacks often reference them instead of your local in-memory object.
