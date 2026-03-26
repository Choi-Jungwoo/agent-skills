# CTP trader API instrument and cost queries

This reference covers instrument metadata, market snapshots, and cost or margin related trader-side queries.

| Entry | Kind |
| --- | --- |
| ReqQryDepthMarketData | request |
| ReqQryEWarrantOffset | request |
| ReqQryInstrument | request |
| ReqQryInstrumentCommissionRate | request |
| ReqQryInstrumentMarginRate | request |
| ReqQryInstrumentOrderCommRate | request |
| ReqQryMMInstrumentCommissionRate | request |
| ReqQryMMOptionInstrCommRate | request |
| ReqQryOptionInstrCommRate | request |
| ReqQryOptionInstrTradeCost | request |

## ReqQryDepthMarketData

`ReqQryDepthMarketData` is an asynchronous request entry point used to drive a business operation through the CTP runtime.

- Kind: request
- Owning interface: `CThostFtdcTraderApi`
- Related symbols: `OnRspQryDepthMarketData`

**When to use it**

- Warm up local caches after login.
- Fetch on-demand operational data for UI, reconciliation, or risk checks.

**How to apply it**

1. Ensure the API instance is initialized and the session has reached the state required for this request.
2. Fill the request object with the identifiers and business fields expected by the server.
3. Call the API, inspect the local return code, then complete the workflow through later SPI callbacks.

**Prototype**

```cpp
virtual int ReqQryDepthMarketData(CThostFtdcQryDepthMarketDataField *pQryDepthMarketData, int nRequestID) = 0;
```

**Parameters**

| Name | Type | Purpose |
| --- | --- | --- |
| `pQryDepthMarketData` | `CThostFtdcQryDepthMarketDataField *` | Pointer to the payload object `CThostFtdcQryDepthMarketDataField *`. |
| `nRequestID` | `int` | Request correlation id provided by the caller. |

**Callback and outcome model**

- Success path: `OnRspQryDepthMarketData`.

**Return semantics**

- `0` means the request was accepted by the local API runtime and will continue asynchronously through SPI callbacks.
- `-1` means the client is not in a state where the request can be submitted, typically because the connection is unavailable.
- `-2` means too many outstanding requests remain unprocessed on the local side.
- `-3` means the local request-rate limit was hit and the caller should retry later.

**Usage example**

```cpp
CThostFtdcQryDepthMarketDataField qryDepthMarketData = {};
// Fill the required identifiers and business fields before sending the request.
int rc = api->ReqQryDepthMarketData(&qryDepthMarketData, requestId++);
if (rc != 0) {
    // Handle the local submission failure before waiting for callbacks.
}
```

**Implementation notes**

- Treat the immediate return code and the later callbacks as two different stages of the same business operation.
- Preserve the identifiers sent in the request because later callbacks often reference them instead of your local in-memory object.

## ReqQryEWarrantOffset

`ReqQryEWarrantOffset` is an asynchronous request entry point used to drive a business operation through the CTP runtime.

- Kind: request
- Owning interface: `CThostFtdcTraderApi`
- Related symbols: `OnRspQryEWarrantOffset`

**When to use it**

- Warm up local caches after login.
- Fetch on-demand operational data for UI, reconciliation, or risk checks.

**How to apply it**

1. Ensure the API instance is initialized and the session has reached the state required for this request.
2. Fill the request object with the identifiers and business fields expected by the server.
3. Call the API, inspect the local return code, then complete the workflow through later SPI callbacks.

**Prototype**

```cpp
virtual int ReqQryEWarrantOffset(CThostFtdcQryEWarrantOffsetField *pQryEWarrantOffset, int nRequestID) = 0;
```

**Parameters**

| Name | Type | Purpose |
| --- | --- | --- |
| `pQryEWarrantOffset` | `CThostFtdcQryEWarrantOffsetField *` | Pointer to the payload object `CThostFtdcQryEWarrantOffsetField *`. |
| `nRequestID` | `int` | Request correlation id provided by the caller. |

**Callback and outcome model**

- Success path: `OnRspQryEWarrantOffset`.

**Return semantics**

- `0` means the request was accepted by the local API runtime and will continue asynchronously through SPI callbacks.
- `-1` means the client is not in a state where the request can be submitted, typically because the connection is unavailable.
- `-2` means too many outstanding requests remain unprocessed on the local side.
- `-3` means the local request-rate limit was hit and the caller should retry later.

**Usage example**

```cpp
CThostFtdcQryEWarrantOffsetField qryEWarrantOffset = {};
// Fill the required identifiers and business fields before sending the request.
int rc = api->ReqQryEWarrantOffset(&qryEWarrantOffset, requestId++);
if (rc != 0) {
    // Handle the local submission failure before waiting for callbacks.
}
```

**Implementation notes**

- Treat the immediate return code and the later callbacks as two different stages of the same business operation.
- Preserve the identifiers sent in the request because later callbacks often reference them instead of your local in-memory object.

## ReqQryInstrument

`ReqQryInstrument` is an asynchronous request entry point used to drive a business operation through the CTP runtime.

- Kind: request
- Owning interface: `CThostFtdcTraderApi`
- Related symbols: `OnRspQryInstrument`

**When to use it**

- Warm up local caches after login.
- Fetch on-demand operational data for UI, reconciliation, or risk checks.

**How to apply it**

1. Ensure the API instance is initialized and the session has reached the state required for this request.
2. Fill the request object with the identifiers and business fields expected by the server.
3. Call the API, inspect the local return code, then complete the workflow through later SPI callbacks.

**Prototype**

```cpp
virtual int ReqQryInstrument(CThostFtdcQryInstrumentField *pQryInstrument, int nRequestID) = 0;
```

**Parameters**

| Name | Type | Purpose |
| --- | --- | --- |
| `pQryInstrument` | `CThostFtdcQryInstrumentField *` | Pointer to the payload object `CThostFtdcQryInstrumentField *`. |
| `nRequestID` | `int` | Request correlation id provided by the caller. |

**Callback and outcome model**

- Success path: `OnRspQryInstrument`.

**Return semantics**

- `0` means the request was accepted by the local API runtime and will continue asynchronously through SPI callbacks.
- `-1` means the client is not in a state where the request can be submitted, typically because the connection is unavailable.
- `-2` means too many outstanding requests remain unprocessed on the local side.
- `-3` means the local request-rate limit was hit and the caller should retry later.

**Usage example**

```cpp
CThostFtdcQryInstrumentField a = { 0 };
strcpy_s(a.InstrumentID, "rb1809");
strcpy_s(a.ExchangeID, "SHFE");
m_pUserApi->ReqQryInstrument(&a, nRequestID++);
```

**Implementation notes**

- Treat the immediate return code and the later callbacks as two different stages of the same business operation.
- Preserve the identifiers sent in the request because later callbacks often reference them instead of your local in-memory object.

## ReqQryInstrumentCommissionRate

`ReqQryInstrumentCommissionRate` is an asynchronous request entry point used to drive a business operation through the CTP runtime.

- Kind: request
- Owning interface: `CThostFtdcTraderApi`
- Related symbols: `OnRspQryInstrumentCommissionRate`

**When to use it**

- Warm up local caches after login.
- Fetch on-demand operational data for UI, reconciliation, or risk checks.

**How to apply it**

1. Ensure the API instance is initialized and the session has reached the state required for this request.
2. Fill the request object with the identifiers and business fields expected by the server.
3. Call the API, inspect the local return code, then complete the workflow through later SPI callbacks.

**Prototype**

```cpp
virtual int ReqQryInstrumentCommissionRate(CThostFtdcQryInstrumentCommissi onRateField *pQryInstrumentCommissionRate, int nRequestID) = 0;
```

**Parameters**

| Name | Type | Purpose |
| --- | --- | --- |
| `pQryInstrumentCommissionRate` | `CThostFtdcQryInstrumentCommissi onRateField *` | Pointer to the payload object `CThostFtdcQryInstrumentCommissi onRateField *`. |
| `nRequestID` | `int` | Request correlation id provided by the caller. |

**Callback and outcome model**

- Success path: `OnRspQryInstrumentCommissionRate`.

**Return semantics**

- `0` means the request was accepted by the local API runtime and will continue asynchronously through SPI callbacks.
- `-1` means the client is not in a state where the request can be submitted, typically because the connection is unavailable.
- `-2` means too many outstanding requests remain unprocessed on the local side.
- `-3` means the local request-rate limit was hit and the caller should retry later.

**Usage example**

```cpp
CThostFtdcQryInstrumentCommissionRateField a = { 0 };
strcpy_s(a.BrokerID, "9999");
strcpy_s(a.InvestorID, "1000001");
strcpy_s(a.InstrumentID, "rb1809");
m_pUserApi->ReqQryInstrumentCommissionRate(&a,
nRequestID++);
```

**Implementation notes**

- Treat the immediate return code and the later callbacks as two different stages of the same business operation.
- Preserve the identifiers sent in the request because later callbacks often reference them instead of your local in-memory object.

## ReqQryInstrumentMarginRate

`ReqQryInstrumentMarginRate` is an asynchronous request entry point used to drive a business operation through the CTP runtime.

- Kind: request
- Owning interface: `CThostFtdcTraderApi`
- Related symbols: `OnRspQryInstrumentMarginRate`

**When to use it**

- Warm up local caches after login.
- Fetch on-demand operational data for UI, reconciliation, or risk checks.

**How to apply it**

1. Ensure the API instance is initialized and the session has reached the state required for this request.
2. Fill the request object with the identifiers and business fields expected by the server.
3. Call the API, inspect the local return code, then complete the workflow through later SPI callbacks.

**Prototype**

```cpp
virtual int ReqQryInstrumentMarginRate(CThostFtdcQryInstrumentMarginRateFiel d *pQryInstrumentMarginRate, int nRequestID) = 0;
```

**Parameters**

| Name | Type | Purpose |
| --- | --- | --- |
| `pQryInstrumentMarginRate` | `CThostFtdcQryInstrumentMarginRateFiel d *` | Pointer to the payload object `CThostFtdcQryInstrumentMarginRateFiel d *`. |
| `nRequestID` | `int` | Request correlation id provided by the caller. |

**Callback and outcome model**

- Success path: `OnRspQryInstrumentMarginRate`.

**Return semantics**

- `0` means the request was accepted by the local API runtime and will continue asynchronously through SPI callbacks.
- `-1` means the client is not in a state where the request can be submitted, typically because the connection is unavailable.
- `-2` means too many outstanding requests remain unprocessed on the local side.
- `-3` means the local request-rate limit was hit and the caller should retry later.

**Usage example**

```cpp
CThostFtdcQryInstrumentMarginRateField a = { 0 };
strcpy_s(a.BrokerID, "9999");
strcpy_s(a.InvestorID, "1000001");
strcpy_s(a.InstrumentID, "rb1809");
a.HedgeFlag = THOST_FTDC_HF_Speculation;
m_pUserApi->ReqQryInstrumentMarginRate(&a, 1);
```

**Implementation notes**

- Treat the immediate return code and the later callbacks as two different stages of the same business operation.
- Preserve the identifiers sent in the request because later callbacks often reference them instead of your local in-memory object.

## ReqQryInstrumentOrderCommRate

`ReqQryInstrumentOrderCommRate` is an asynchronous request entry point used to drive a business operation through the CTP runtime.

- Kind: request
- Owning interface: `CThostFtdcTraderApi`
- Related symbols: `OnRspQryInstrumentOrderCommRate`

**When to use it**

- Warm up local caches after login.
- Fetch on-demand operational data for UI, reconciliation, or risk checks.

**How to apply it**

1. Ensure the API instance is initialized and the session has reached the state required for this request.
2. Fill the request object with the identifiers and business fields expected by the server.
3. Call the API, inspect the local return code, then complete the workflow through later SPI callbacks.

**Prototype**

```cpp
virtual int ReqQryInstrumentOrderCommRate(CThostFtdcQryInstrumentOrderCo mmRateField *pQryInstrumentOrderCommRate, int nRequestID) = 0;
```

**Parameters**

| Name | Type | Purpose |
| --- | --- | --- |
| `pQryInstrumentOrderCommRate` | `CThostFtdcQryInstrumentOrderCo mmRateField *` | Pointer to the payload object `CThostFtdcQryInstrumentOrderCo mmRateField *`. |
| `nRequestID` | `int` | Request correlation id provided by the caller. |

**Callback and outcome model**

- Success path: `OnRspQryInstrumentOrderCommRate`.

**Return semantics**

- `0` means the request was accepted by the local API runtime and will continue asynchronously through SPI callbacks.
- `-1` means the client is not in a state where the request can be submitted, typically because the connection is unavailable.
- `-2` means too many outstanding requests remain unprocessed on the local side.
- `-3` means the local request-rate limit was hit and the caller should retry later.

**Usage example**

```cpp
CThostFtdcQryInstrumentOrderCommRateField a = { 0 };
strcpy(a.BrokerID, "9999");
strcpy(a.InvestorID, "1000001");
strcpy(a.InstrumentID, "rb1809");
m_pUserApi->ReqQryInstrumentOrderCommRate(&a, 1);
```

**Implementation notes**

- Treat the immediate return code and the later callbacks as two different stages of the same business operation.
- Preserve the identifiers sent in the request because later callbacks often reference them instead of your local in-memory object.

## ReqQryMMInstrumentCommissionRate

`ReqQryMMInstrumentCommissionRate` is an asynchronous request entry point used to drive a business operation through the CTP runtime.

- Kind: request
- Owning interface: `CThostFtdcTraderApi`
- Related symbols: `OnRspQryMMInstrumentCommissionRate`

**When to use it**

- Warm up local caches after login.
- Fetch on-demand operational data for UI, reconciliation, or risk checks.

**How to apply it**

1. Ensure the API instance is initialized and the session has reached the state required for this request.
2. Fill the request object with the identifiers and business fields expected by the server.
3. Call the API, inspect the local return code, then complete the workflow through later SPI callbacks.

**Prototype**

```cpp
virtual int ReqQryMMInstrumentCommissionRate(CThostFtdcQryMMInstrument CommissionRateField *pQryMMInstrumentCommissionRate, int nRequestID) = 0;
```

**Parameters**

| Name | Type | Purpose |
| --- | --- | --- |
| `pQryMMInstrumentCommissionRate` | `CThostFtdcQryMMInstrument CommissionRateField *` | Pointer to the payload object `CThostFtdcQryMMInstrument CommissionRateField *`. |
| `nRequestID` | `int` | Request correlation id provided by the caller. |

**Callback and outcome model**

- Success path: `OnRspQryMMInstrumentCommissionRate`.

**Return semantics**

- `0` means the request was accepted by the local API runtime and will continue asynchronously through SPI callbacks.
- `-1` means the client is not in a state where the request can be submitted, typically because the connection is unavailable.
- `-2` means too many outstanding requests remain unprocessed on the local side.
- `-3` means the local request-rate limit was hit and the caller should retry later.

**Usage example**

```cpp
CThostFtdcQryMMInstrument CommissionRateField qryMMInstrumentCommissionRat = {};
// Fill the required identifiers and business fields before sending the request.
int rc = api->ReqQryMMInstrumentCommissionRate(&qryMMInstrumentCommissionRat, requestId++);
if (rc != 0) {
    // Handle the local submission failure before waiting for callbacks.
}
```

**Implementation notes**

- Treat the immediate return code and the later callbacks as two different stages of the same business operation.
- Preserve the identifiers sent in the request because later callbacks often reference them instead of your local in-memory object.

## ReqQryMMOptionInstrCommRate

`ReqQryMMOptionInstrCommRate` is an asynchronous request entry point used to drive a business operation through the CTP runtime.

- Kind: request
- Owning interface: `CThostFtdcTraderApi`
- Related symbols: `OnRspQryMMOptionInstrCommRate`

**When to use it**

- Warm up local caches after login.
- Fetch on-demand operational data for UI, reconciliation, or risk checks.

**How to apply it**

1. Ensure the API instance is initialized and the session has reached the state required for this request.
2. Fill the request object with the identifiers and business fields expected by the server.
3. Call the API, inspect the local return code, then complete the workflow through later SPI callbacks.

**Prototype**

```cpp
virtual int ReqQryMMOptionInstrCommRate(CThostFtdcQryMMOptionInstrCom mRateField *pQryMMOptionInstrCommRate, int nRequestID) = 0;
```

**Parameters**

| Name | Type | Purpose |
| --- | --- | --- |
| `pQryMMOptionInstrCommRate` | `CThostFtdcQryMMOptionInstrCom mRateField *` | Pointer to the payload object `CThostFtdcQryMMOptionInstrCom mRateField *`. |
| `nRequestID` | `int` | Request correlation id provided by the caller. |

**Callback and outcome model**

- Success path: `OnRspQryMMOptionInstrCommRate`.

**Return semantics**

- `0` means the request was accepted by the local API runtime and will continue asynchronously through SPI callbacks.
- `-1` means the client is not in a state where the request can be submitted, typically because the connection is unavailable.
- `-2` means too many outstanding requests remain unprocessed on the local side.
- `-3` means the local request-rate limit was hit and the caller should retry later.

**Usage example**

```cpp
CThostFtdcQryMMOptionInstrCom mRateField qryMMOptionInstrCommRat = {};
// Fill the required identifiers and business fields before sending the request.
int rc = api->ReqQryMMOptionInstrCommRate(&qryMMOptionInstrCommRat, requestId++);
if (rc != 0) {
    // Handle the local submission failure before waiting for callbacks.
}
```

**Implementation notes**

- Treat the immediate return code and the later callbacks as two different stages of the same business operation.
- Preserve the identifiers sent in the request because later callbacks often reference them instead of your local in-memory object.

## ReqQryOptionInstrCommRate

`ReqQryOptionInstrCommRate` is an asynchronous request entry point used to drive a business operation through the CTP runtime.

- Kind: request
- Owning interface: `CThostFtdcTraderApi`
- Related symbols: `OnRspQryOptionInstrCommRate`

**When to use it**

- Warm up local caches after login.
- Fetch on-demand operational data for UI, reconciliation, or risk checks.

**How to apply it**

1. Ensure the API instance is initialized and the session has reached the state required for this request.
2. Fill the request object with the identifiers and business fields expected by the server.
3. Call the API, inspect the local return code, then complete the workflow through later SPI callbacks.

**Prototype**

```cpp
virtual int ReqQryOptionInstrCommRate(CThostFtdcQryOptionInstrCommRateFie ld *pQryOptionInstrCommRate, int nRequestID) = 0;
```

**Parameters**

| Name | Type | Purpose |
| --- | --- | --- |
| `pQryOptionInstrCommRate` | `CThostFtdcQryOptionInstrCommRateFie ld *` | Pointer to the payload object `CThostFtdcQryOptionInstrCommRateFie ld *`. |
| `nRequestID` | `int` | Request correlation id provided by the caller. |

**Callback and outcome model**

- Success path: `OnRspQryOptionInstrCommRate`.

**Return semantics**

- `0` means the request was accepted by the local API runtime and will continue asynchronously through SPI callbacks.
- `-1` means the client is not in a state where the request can be submitted, typically because the connection is unavailable.
- `-2` means too many outstanding requests remain unprocessed on the local side.
- `-3` means the local request-rate limit was hit and the caller should retry later.

**Usage example**

```cpp
CThostFtdcQryOptionInstrCommRateField a = { 0 };
strcpy_s(a.BrokerID, "9999");
strcpy_s(a.InvestorID, "1000001");
strcpy_s(a.InstrumentID, "ag2311C1200");
m_pUserApi->ReqQryOptionInstrCommRate(&a, nRequestID++);
```

**Implementation notes**

- Treat the immediate return code and the later callbacks as two different stages of the same business operation.
- Preserve the identifiers sent in the request because later callbacks often reference them instead of your local in-memory object.

## ReqQryOptionInstrTradeCost

`ReqQryOptionInstrTradeCost` is an asynchronous request entry point used to drive a business operation through the CTP runtime.

- Kind: request
- Owning interface: `CThostFtdcTraderApi`
- Related symbols: `OnRspQryOptionInstrTradeCost`

**When to use it**

- Warm up local caches after login.
- Fetch on-demand operational data for UI, reconciliation, or risk checks.

**How to apply it**

1. Ensure the API instance is initialized and the session has reached the state required for this request.
2. Fill the request object with the identifiers and business fields expected by the server.
3. Call the API, inspect the local return code, then complete the workflow through later SPI callbacks.

**Prototype**

```cpp
virtual int ReqQryOptionInstrTradeCost(CThostFtdcQryOptionInstrTradeCostField *pQryOptionInstrTradeCost, int nRequestID) = 0;
```

**Parameters**

| Name | Type | Purpose |
| --- | --- | --- |
| `pQryOptionInstrTradeCost` | `CThostFtdcQryOptionInstrTradeCostField *` | Pointer to the payload object `CThostFtdcQryOptionInstrTradeCostField *`. |
| `nRequestID` | `int` | Request correlation id provided by the caller. |

**Callback and outcome model**

- Success path: `OnRspQryOptionInstrTradeCost`.

**Return semantics**

- `0` means the request was accepted by the local API runtime and will continue asynchronously through SPI callbacks.
- `-1` means the client is not in a state where the request can be submitted, typically because the connection is unavailable.
- `-2` means too many outstanding requests remain unprocessed on the local side.
- `-3` means the local request-rate limit was hit and the caller should retry later.

**Usage example**

```cpp
CThostFtdcQryOptionInstrTradeCostField a = { 0 };
strcpy_s(a.BrokerID, "9999");
strcpy_s(a.InvestorID, "1000001");
strcpy_s(a.InstrumentID, "rb1809");
a.HedgeFlag = THOST_FTDC_HF_Speculation;
a.InputPrice = 300;
m_pUserApi->ReqQryOptionInstrTradeCost(&a, nRequestID++);
```

**Implementation notes**

- Treat the immediate return code and the later callbacks as two different stages of the same business operation.
- Preserve the identifiers sent in the request because later callbacks often reference them instead of your local in-memory object.
