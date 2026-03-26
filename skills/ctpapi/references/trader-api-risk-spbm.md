# CTP trader API SPBM queries

This reference covers the SPBM-side parameter, portfolio-definition, and investor SPBM detail queries.

| Entry | Kind |
| --- | --- |
| ReqQrySPBMFutureParameter | request |
| ReqQrySPBMOptionParameter | request |
| ReqQrySPBMIntraParameter | request |
| ReqQrySPBMInterParameter | request |
| ReqQrySPBMPortfDefinition | request |
| ReqQrySPBMInvestorPortfDef | request |
| ReqQryInvestorPortfMarginRatio | request |
| ReqQryInvestorProdSPBMDetail | request |
| ReqQrySPBMAddOnInterParameter | request |

## ReqQrySPBMFutureParameter

`ReqQrySPBMFutureParameter` is an asynchronous request entry point used to drive a business operation through the CTP runtime.

- Kind: request
- Owning interface: `CThostFtdcTraderApi`
- Related symbols: `OnRspQrySPBMFutureParameter`

**When to use it**

- Warm up local caches after login.
- Fetch on-demand operational data for UI, reconciliation, or risk checks.

**How to apply it**

1. Ensure the API instance is initialized and the session has reached the state required for this request.
2. Fill the request object with the identifiers and business fields expected by the server.
3. Call the API, inspect the local return code, then complete the workflow through later SPI callbacks.

**Prototype**

```cpp
virtual int ReqQrySPBMFutureParameter(CThostFtdcQrySPBMFutureParameterFi eld *pQrySPBMFutureParameter, int nRequestID) = 0;
```

**Parameters**

| Name | Type | Purpose |
| --- | --- | --- |
| `pQrySPBMFutureParameter` | `CThostFtdcQrySPBMFutureParameterFi eld *` | Pointer to the payload object `CThostFtdcQrySPBMFutureParameterFi eld *`. |
| `nRequestID` | `int` | Request correlation id provided by the caller. |

**Callback and outcome model**

- Success path: `OnRspQrySPBMFutureParameter`.

**Return semantics**

- `0` means the request was accepted by the local API runtime and will continue asynchronously through SPI callbacks.
- `-1` means the client is not in a state where the request can be submitted, typically because the connection is unavailable.
- `-2` means too many outstanding requests remain unprocessed on the local side.
- `-3` means the local request-rate limit was hit and the caller should retry later.

**Usage example**

```cpp
CThostFtdcQrySPBMFutureParameterFi eld qrySPBMFutureParameter = {};
// Fill the required identifiers and business fields before sending the request.
int rc = api->ReqQrySPBMFutureParameter(&qrySPBMFutureParameter, requestId++);
if (rc != 0) {
    // Handle the local submission failure before waiting for callbacks.
}
```

**Implementation notes**

- Treat the immediate return code and the later callbacks as two different stages of the same business operation.
- Preserve the identifiers sent in the request because later callbacks often reference them instead of your local in-memory object.

## ReqQrySPBMOptionParameter

`ReqQrySPBMOptionParameter` is an asynchronous request entry point used to drive a business operation through the CTP runtime.

- Kind: request
- Owning interface: `CThostFtdcTraderApi`
- Related symbols: `OnRspQrySPBMOptionParameter`

**When to use it**

- Warm up local caches after login.
- Fetch on-demand operational data for UI, reconciliation, or risk checks.

**How to apply it**

1. Ensure the API instance is initialized and the session has reached the state required for this request.
2. Fill the request object with the identifiers and business fields expected by the server.
3. Call the API, inspect the local return code, then complete the workflow through later SPI callbacks.

**Prototype**

```cpp
virtual int ReqQrySPBMOptionParameter(CThostFtdcQrySPBMOptionParameterF ield *pQrySPBMOptionParameter, int nRequestID) = 0;
```

**Parameters**

| Name | Type | Purpose |
| --- | --- | --- |
| `pQrySPBMOptionParameter` | `CThostFtdcQrySPBMOptionParameterF ield *` | Pointer to the payload object `CThostFtdcQrySPBMOptionParameterF ield *`. |
| `nRequestID` | `int` | Request correlation id provided by the caller. |

**Callback and outcome model**

- Success path: `OnRspQrySPBMOptionParameter`.

**Return semantics**

- `0` means the request was accepted by the local API runtime and will continue asynchronously through SPI callbacks.
- `-1` means the client is not in a state where the request can be submitted, typically because the connection is unavailable.
- `-2` means too many outstanding requests remain unprocessed on the local side.
- `-3` means the local request-rate limit was hit and the caller should retry later.

**Usage example**

```cpp
CThostFtdcQrySPBMOptionParameterF ield qrySPBMOptionParameter = {};
// Fill the required identifiers and business fields before sending the request.
int rc = api->ReqQrySPBMOptionParameter(&qrySPBMOptionParameter, requestId++);
if (rc != 0) {
    // Handle the local submission failure before waiting for callbacks.
}
```

**Implementation notes**

- Treat the immediate return code and the later callbacks as two different stages of the same business operation.
- Preserve the identifiers sent in the request because later callbacks often reference them instead of your local in-memory object.

## ReqQrySPBMIntraParameter

`ReqQrySPBMIntraParameter` is an asynchronous request entry point used to drive a business operation through the CTP runtime.

- Kind: request
- Owning interface: `CThostFtdcTraderApi`
- Related symbols: `OnRspQrySPBMIntraParameter`

**When to use it**

- Warm up local caches after login.
- Fetch on-demand operational data for UI, reconciliation, or risk checks.

**How to apply it**

1. Ensure the API instance is initialized and the session has reached the state required for this request.
2. Fill the request object with the identifiers and business fields expected by the server.
3. Call the API, inspect the local return code, then complete the workflow through later SPI callbacks.

**Prototype**

```cpp
virtual int ReqQrySPBMIntraParameter(CThostFtdcQrySPBMIntraParameterField *pQrySPBMIntraParameter, int nRequestID) = 0;
```

**Parameters**

| Name | Type | Purpose |
| --- | --- | --- |
| `pQrySPBMIntraParameter` | `CThostFtdcQrySPBMIntraParameterField *` | Pointer to the payload object `CThostFtdcQrySPBMIntraParameterField *`. |
| `nRequestID` | `int` | Request correlation id provided by the caller. |

**Callback and outcome model**

- Success path: `OnRspQrySPBMIntraParameter`.

**Return semantics**

- `0` means the request was accepted by the local API runtime and will continue asynchronously through SPI callbacks.
- `-1` means the client is not in a state where the request can be submitted, typically because the connection is unavailable.
- `-2` means too many outstanding requests remain unprocessed on the local side.
- `-3` means the local request-rate limit was hit and the caller should retry later.

**Usage example**

```cpp
CThostFtdcQrySPBMIntraParameterField qrySPBMIntraParameter = {};
// Fill the required identifiers and business fields before sending the request.
int rc = api->ReqQrySPBMIntraParameter(&qrySPBMIntraParameter, requestId++);
if (rc != 0) {
    // Handle the local submission failure before waiting for callbacks.
}
```

**Implementation notes**

- Treat the immediate return code and the later callbacks as two different stages of the same business operation.
- Preserve the identifiers sent in the request because later callbacks often reference them instead of your local in-memory object.

## ReqQrySPBMInterParameter

`ReqQrySPBMInterParameter` is an asynchronous request entry point used to drive a business operation through the CTP runtime.

- Kind: request
- Owning interface: `CThostFtdcTraderApi`
- Related symbols: `OnRspQrySPBMInterParameter`

**When to use it**

- Warm up local caches after login.
- Fetch on-demand operational data for UI, reconciliation, or risk checks.

**How to apply it**

1. Ensure the API instance is initialized and the session has reached the state required for this request.
2. Fill the request object with the identifiers and business fields expected by the server.
3. Call the API, inspect the local return code, then complete the workflow through later SPI callbacks.

**Prototype**

```cpp
virtual int ReqQrySPBMInterParameter(CThostFtdcQrySPBMInterParameterField *pQrySPBMInterParameter, int nRequestID) = 0;
```

**Parameters**

| Name | Type | Purpose |
| --- | --- | --- |
| `pQrySPBMInterParameter` | `CThostFtdcQrySPBMInterParameterField *` | Pointer to the payload object `CThostFtdcQrySPBMInterParameterField *`. |
| `nRequestID` | `int` | Request correlation id provided by the caller. |

**Callback and outcome model**

- Success path: `OnRspQrySPBMInterParameter`.

**Return semantics**

- `0` means the request was accepted by the local API runtime and will continue asynchronously through SPI callbacks.
- `-1` means the client is not in a state where the request can be submitted, typically because the connection is unavailable.
- `-2` means too many outstanding requests remain unprocessed on the local side.
- `-3` means the local request-rate limit was hit and the caller should retry later.

**Usage example**

```cpp
CThostFtdcQrySPBMInterParameterField qrySPBMInterParameter = {};
// Fill the required identifiers and business fields before sending the request.
int rc = api->ReqQrySPBMInterParameter(&qrySPBMInterParameter, requestId++);
if (rc != 0) {
    // Handle the local submission failure before waiting for callbacks.
}
```

**Implementation notes**

- Treat the immediate return code and the later callbacks as two different stages of the same business operation.
- Preserve the identifiers sent in the request because later callbacks often reference them instead of your local in-memory object.

## ReqQrySPBMPortfDefinition

`ReqQrySPBMPortfDefinition` is an asynchronous request entry point used to drive a business operation through the CTP runtime.

- Kind: request
- Owning interface: `CThostFtdcTraderApi`
- Related symbols: `OnRspQrySPBMPortfDefinition`

**When to use it**

- Warm up local caches after login.
- Fetch on-demand operational data for UI, reconciliation, or risk checks.

**How to apply it**

1. Ensure the API instance is initialized and the session has reached the state required for this request.
2. Fill the request object with the identifiers and business fields expected by the server.
3. Call the API, inspect the local return code, then complete the workflow through later SPI callbacks.

**Prototype**

```cpp
virtual int ReqQrySPBMPortfDefinition(CThostFtdcQrySPBMPortfDefinitionField *pQrySPBMPortfDefinition, int nRequestID) = 0;
```

**Parameters**

| Name | Type | Purpose |
| --- | --- | --- |
| `pQrySPBMPortfDefinition` | `CThostFtdcQrySPBMPortfDefinitionField *` | Pointer to the payload object `CThostFtdcQrySPBMPortfDefinitionField *`. |
| `nRequestID` | `int` | Request correlation id provided by the caller. |

**Callback and outcome model**

- Success path: `OnRspQrySPBMPortfDefinition`.

**Return semantics**

- `0` means the request was accepted by the local API runtime and will continue asynchronously through SPI callbacks.
- `-1` means the client is not in a state where the request can be submitted, typically because the connection is unavailable.
- `-2` means too many outstanding requests remain unprocessed on the local side.
- `-3` means the local request-rate limit was hit and the caller should retry later.

**Usage example**

```cpp
CThostFtdcQrySPBMPortfDefinitionField qrySPBMPortfDefinition = {};
// Fill the required identifiers and business fields before sending the request.
int rc = api->ReqQrySPBMPortfDefinition(&qrySPBMPortfDefinition, requestId++);
if (rc != 0) {
    // Handle the local submission failure before waiting for callbacks.
}
```

**Implementation notes**

- Treat the immediate return code and the later callbacks as two different stages of the same business operation.
- Preserve the identifiers sent in the request because later callbacks often reference them instead of your local in-memory object.

## ReqQrySPBMInvestorPortfDef

`ReqQrySPBMInvestorPortfDef` is an asynchronous request entry point used to drive a business operation through the CTP runtime.

- Kind: request
- Owning interface: `CThostFtdcTraderApi`
- Related symbols: `OnRspQrySPBMInvestorPortfDef`

**When to use it**

- Warm up local caches after login.
- Fetch on-demand operational data for UI, reconciliation, or risk checks.

**How to apply it**

1. Ensure the API instance is initialized and the session has reached the state required for this request.
2. Fill the request object with the identifiers and business fields expected by the server.
3. Call the API, inspect the local return code, then complete the workflow through later SPI callbacks.

**Prototype**

```cpp
virtual int ReqQrySPBMInvestorPortfDef(CThostFtdcQrySPBMInvestorPortfDefFi eld *pQrySPBMInvestorPortfDef, int nRequestID) = 0;
```

**Parameters**

| Name | Type | Purpose |
| --- | --- | --- |
| `pQrySPBMInvestorPortfDef` | `CThostFtdcQrySPBMInvestorPortfDefFi eld *` | Pointer to the payload object `CThostFtdcQrySPBMInvestorPortfDefFi eld *`. |
| `nRequestID` | `int` | Request correlation id provided by the caller. |

**Callback and outcome model**

- Success path: `OnRspQrySPBMInvestorPortfDef`.

**Return semantics**

- `0` means the request was accepted by the local API runtime and will continue asynchronously through SPI callbacks.
- `-1` means the client is not in a state where the request can be submitted, typically because the connection is unavailable.
- `-2` means too many outstanding requests remain unprocessed on the local side.
- `-3` means the local request-rate limit was hit and the caller should retry later.

**Usage example**

```cpp
CThostFtdcQrySPBMInvestorPortfDefFi eld qrySPBMInvestorPortfDef = {};
// Fill the required identifiers and business fields before sending the request.
int rc = api->ReqQrySPBMInvestorPortfDef(&qrySPBMInvestorPortfDef, requestId++);
if (rc != 0) {
    // Handle the local submission failure before waiting for callbacks.
}
```

**Implementation notes**

- Treat the immediate return code and the later callbacks as two different stages of the same business operation.
- Preserve the identifiers sent in the request because later callbacks often reference them instead of your local in-memory object.

## ReqQryInvestorPortfMarginRatio

`ReqQryInvestorPortfMarginRatio` is an asynchronous request entry point used to drive a business operation through the CTP runtime.

- Kind: request
- Owning interface: `CThostFtdcTraderApi`
- Related symbols: `OnRspQryInvestorPortfMarginRatio`

**When to use it**

- Warm up local caches after login.
- Fetch on-demand operational data for UI, reconciliation, or risk checks.

**How to apply it**

1. Ensure the API instance is initialized and the session has reached the state required for this request.
2. Fill the request object with the identifiers and business fields expected by the server.
3. Call the API, inspect the local return code, then complete the workflow through later SPI callbacks.

**Prototype**

```cpp
virtual int ReqQryInvestorPortfMarginRatio(CThostFtdcQryInvestorPortfMarginRa tioField *pQryInvestorPortfMarginRatio, int nRequestID) = 0;
```

**Parameters**

| Name | Type | Purpose |
| --- | --- | --- |
| `pQryInvestorPortfMarginRatio` | `CThostFtdcQryInvestorPortfMarginRa tioField *` | Pointer to the payload object `CThostFtdcQryInvestorPortfMarginRa tioField *`. |
| `nRequestID` | `int` | Request correlation id provided by the caller. |

**Callback and outcome model**

- Success path: `OnRspQryInvestorPortfMarginRatio`.

**Return semantics**

- `0` means the request was accepted by the local API runtime and will continue asynchronously through SPI callbacks.
- `-1` means the client is not in a state where the request can be submitted, typically because the connection is unavailable.
- `-2` means too many outstanding requests remain unprocessed on the local side.
- `-3` means the local request-rate limit was hit and the caller should retry later.

**Usage example**

```cpp
CThostFtdcQryInvestorPortfMarginRa tioField qryInvestorPortfMarginRatio = {};
// Fill the required identifiers and business fields before sending the request.
int rc = api->ReqQryInvestorPortfMarginRatio(&qryInvestorPortfMarginRatio, requestId++);
if (rc != 0) {
    // Handle the local submission failure before waiting for callbacks.
}
```

**Implementation notes**

- Treat the immediate return code and the later callbacks as two different stages of the same business operation.
- Preserve the identifiers sent in the request because later callbacks often reference them instead of your local in-memory object.

## ReqQryInvestorProdSPBMDetail

`ReqQryInvestorProdSPBMDetail` is an asynchronous request entry point used to drive a business operation through the CTP runtime.

- Kind: request
- Owning interface: `CThostFtdcTraderApi`
- Related symbols: `OnRspQryInvestorProdSPBMDetail`

**When to use it**

- Warm up local caches after login.
- Fetch on-demand operational data for UI, reconciliation, or risk checks.

**How to apply it**

1. Ensure the API instance is initialized and the session has reached the state required for this request.
2. Fill the request object with the identifiers and business fields expected by the server.
3. Call the API, inspect the local return code, then complete the workflow through later SPI callbacks.

**Prototype**

```cpp
virtual int ReqQryInvestorProdSPBMDetail(CThostFtdcQryInvestorProdSPBMDet ailField *pQryInvestorProdSPBMDetail, int nRequestID) = 0;
```

**Parameters**

| Name | Type | Purpose |
| --- | --- | --- |
| `pQryInvestorProdSPBMDetail` | `CThostFtdcQryInvestorProdSPBMDet ailField *` | Pointer to the payload object `CThostFtdcQryInvestorProdSPBMDet ailField *`. |
| `nRequestID` | `int` | Request correlation id provided by the caller. |

**Callback and outcome model**

- Success path: `OnRspQryInvestorProdSPBMDetail`.

**Return semantics**

- `0` means the request was accepted by the local API runtime and will continue asynchronously through SPI callbacks.
- `-1` means the client is not in a state where the request can be submitted, typically because the connection is unavailable.
- `-2` means too many outstanding requests remain unprocessed on the local side.
- `-3` means the local request-rate limit was hit and the caller should retry later.

**Usage example**

```cpp
CThostFtdcQryInvestorProdSPBMDet ailField qryInvestorProdSPBMDeta = {};
// Fill the required identifiers and business fields before sending the request.
int rc = api->ReqQryInvestorProdSPBMDetail(&qryInvestorProdSPBMDeta, requestId++);
if (rc != 0) {
    // Handle the local submission failure before waiting for callbacks.
}
```

**Implementation notes**

- Treat the immediate return code and the later callbacks as two different stages of the same business operation.
- Preserve the identifiers sent in the request because later callbacks often reference them instead of your local in-memory object.

## ReqQrySPBMAddOnInterParameter

`ReqQrySPBMAddOnInterParameter` is an asynchronous request entry point used to drive a business operation through the CTP runtime.

- Kind: request
- Owning interface: `CThostFtdcTraderApi`
- Related symbols: `OnRspQrySPBMAddOnInterParameter`

**When to use it**

- Warm up local caches after login.
- Fetch on-demand operational data for UI, reconciliation, or risk checks.

**How to apply it**

1. Ensure the API instance is initialized and the session has reached the state required for this request.
2. Fill the request object with the identifiers and business fields expected by the server.
3. Call the API, inspect the local return code, then complete the workflow through later SPI callbacks.

**Prototype**

```cpp
virtual int ReqQrySPBMAddOnInterParameter(CThostFtdcQrySPBMAddOnInterP arameterField *pQrySPBMAddOnInterParameter, int nRequestID) = 0;
```

**Parameters**

| Name | Type | Purpose |
| --- | --- | --- |
| `pQrySPBMAddOnInterParameter` | `CThostFtdcQrySPBMAddOnInterP arameterField *` | Pointer to the payload object `CThostFtdcQrySPBMAddOnInterP arameterField *`. |
| `nRequestID` | `int` | Request correlation id provided by the caller. |

**Callback and outcome model**

- Success path: `OnRspQrySPBMAddOnInterParameter`.

**Return semantics**

- `0` means the request was accepted by the local API runtime and will continue asynchronously through SPI callbacks.
- `-1` means the client is not in a state where the request can be submitted, typically because the connection is unavailable.
- `-2` means too many outstanding requests remain unprocessed on the local side.
- `-3` means the local request-rate limit was hit and the caller should retry later.

**Usage example**

```cpp
CThostFtdcQrySPBMAddOnInterP arameterField qrySPBMAddOnInterParameter = {};
// Fill the required identifiers and business fields before sending the request.
int rc = api->ReqQrySPBMAddOnInterParameter(&qrySPBMAddOnInterParameter, requestId++);
if (rc != 0) {
    // Handle the local submission failure before waiting for callbacks.
}
```

**Implementation notes**

- Treat the immediate return code and the later callbacks as two different stages of the same business operation.
- Preserve the identifiers sent in the request because later callbacks often reference them instead of your local in-memory object.
