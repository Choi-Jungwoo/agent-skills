# CTP trader API SPMM queries

This reference covers SPMM-side commodity margin and parameter queries.

| Entry | Kind |
| --- | --- |
| ReqQryInvestorCommoditySPMMMargin | request |
| ReqQryInvestorCommodityGroupSPMMMargin | request |
| ReqQrySPMMInstParam | request |
| ReqQrySPMMProductParam | request |

## ReqQryInvestorCommoditySPMMMargin

`ReqQryInvestorCommoditySPMMMargin` is an asynchronous request entry point used to drive a business operation through the CTP runtime.

- Kind: request
- Owning interface: `CThostFtdcTraderApi`
- Related symbols: `ReqQryInvestorCommoditySPMMMarg`, `OnRspQryInvestorCommoditySPMMMargin`

**When to use it**

- Warm up local caches after login.
- Fetch on-demand operational data for UI, reconciliation, or risk checks.

**How to apply it**

1. Ensure the API instance is initialized and the session has reached the state required for this request.
2. Fill the request object with the identifiers and business fields expected by the server.
3. Call the API, inspect the local return code, then complete the workflow through later SPI callbacks.

**Prototype**

```cpp
virtual int ReqQryInvestorCommoditySPMMMargin(CThostFtdcQryInvestorCom moditySPMMMarginField *pQryInvestorCommoditySPMMMargin, int nRequestID) = 0;
```

**Parameters**

| Name | Type | Purpose |
| --- | --- | --- |
| `pQryInvestorCommoditySPMMMargin` | `CThostFtdcQryInvestorCom moditySPMMMarginField *` | Pointer to the payload object `CThostFtdcQryInvestorCom moditySPMMMarginField *`. |
| `nRequestID` | `int` | Request correlation id provided by the caller. |

**Callback and outcome model**

- Success path: `OnRspQryInvestorCommoditySPMMMargin`.

**Return semantics**

- `0` means the request was accepted by the local API runtime and will continue asynchronously through SPI callbacks.
- `-1` means the client is not in a state where the request can be submitted, typically because the connection is unavailable.
- `-2` means too many outstanding requests remain unprocessed on the local side.
- `-3` means the local request-rate limit was hit and the caller should retry later.

**Usage example**

```cpp
CThostFtdcQryInvestorCommoditySPMMMarginField a = { 0 };
strcpy_s(a.BrokerID, "9999");
strcpy_s(a.InvestorID, "1000001");
strcpy_s(a.CommodityID, "cu&cu_o");
m_pUserApi->ReqQryInvestorCommoditySPMMMargin(&a,
nRequestID++);
```

**Implementation notes**

- Treat the immediate return code and the later callbacks as two different stages of the same business operation.
- Preserve the identifiers sent in the request because later callbacks often reference them instead of your local in-memory object.

## ReqQryInvestorCommodityGroupSPMMMargin

`ReqQryInvestorCommodityGroupSPMMMargin` is an asynchronous request entry point used to drive a business operation through the CTP runtime.

- Kind: request
- Owning interface: `CThostFtdcTraderApi`
- Related symbols: `ReqQryInvestorCommodityGroupSPM`, `OnRspQryInvestorCommoditySPMMMargin`

**When to use it**

- Warm up local caches after login.
- Fetch on-demand operational data for UI, reconciliation, or risk checks.

**How to apply it**

1. Ensure the API instance is initialized and the session has reached the state required for this request.
2. Fill the request object with the identifiers and business fields expected by the server.
3. Call the API, inspect the local return code, then complete the workflow through later SPI callbacks.

**Prototype**

```cpp
virtual int ReqQryInvestorCommodityGroupSPMMMargin(CThostFtdcQryInvestor CommodityGroupSPMMMarginField *pQryInvestorCommodityGroupSPMMMargin, int nRequestID) = 0;
```

**Parameters**

| Name | Type | Purpose |
| --- | --- | --- |
| `pQryInvestorCommodityGroupSPMMMargin` | `CThostFtdcQryInvestor CommodityGroupSPMMMarginField *` | Pointer to the payload object `CThostFtdcQryInvestor CommodityGroupSPMMMarginField *`. |
| `nRequestID` | `int` | Request correlation id provided by the caller. |

**Callback and outcome model**

- Success path: `OnRspQryInvestorCommoditySPMMMargin`.

**Return semantics**

- `0` means the request was accepted by the local API runtime and will continue asynchronously through SPI callbacks.
- `-1` means the client is not in a state where the request can be submitted, typically because the connection is unavailable.
- `-2` means too many outstanding requests remain unprocessed on the local side.
- `-3` means the local request-rate limit was hit and the caller should retry later.

**Usage example**

```cpp
CThostFtdcQryInvestorCommodityGroupSPMMMarginField a = { 0 };
strcpy_s(a.BrokerID, "9999");
strcpy_s(a.InvestorID, "1000001");
strcpy_s(a.CommodityGroupID, "01");
m_pUserApi->ReqQryInvestorCommodityGroupSPMMMargin(&a,
nRequestID++);
```

**Implementation notes**

- Treat the immediate return code and the later callbacks as two different stages of the same business operation.
- Preserve the identifiers sent in the request because later callbacks often reference them instead of your local in-memory object.

## ReqQrySPMMInstParam

`ReqQrySPMMInstParam` is an asynchronous request entry point used to drive a business operation through the CTP runtime.

- Kind: request
- Owning interface: `CThostFtdcTraderApi`
- Related symbols: `OnRspQrySPMMInstParam`

**When to use it**

- Warm up local caches after login.
- Fetch on-demand operational data for UI, reconciliation, or risk checks.

**How to apply it**

1. Ensure the API instance is initialized and the session has reached the state required for this request.
2. Fill the request object with the identifiers and business fields expected by the server.
3. Call the API, inspect the local return code, then complete the workflow through later SPI callbacks.

**Prototype**

```cpp
virtual int ReqQrySPMMInstParam(CThostFtdcQrySPMMInstParamField *pQrySPMMInstParam, int nRequestID) = 0;
```

**Parameters**

| Name | Type | Purpose |
| --- | --- | --- |
| `pQrySPMMInstParam` | `CThostFtdcQrySPMMInstParamField *` | Pointer to the payload object `CThostFtdcQrySPMMInstParamField *`. |
| `nRequestID` | `int` | Request correlation id provided by the caller. |

**Callback and outcome model**

- Success path: `OnRspQrySPMMInstParam`.

**Return semantics**

- `0` means the request was accepted by the local API runtime and will continue asynchronously through SPI callbacks.
- `-1` means the client is not in a state where the request can be submitted, typically because the connection is unavailable.
- `-2` means too many outstanding requests remain unprocessed on the local side.
- `-3` means the local request-rate limit was hit and the caller should retry later.

**Usage example**

```cpp
CThostFtdcQrySPMMInstParamField qrySPMMInstParam = {};
// Fill the required identifiers and business fields before sending the request.
int rc = api->ReqQrySPMMInstParam(&qrySPMMInstParam, requestId++);
if (rc != 0) {
    // Handle the local submission failure before waiting for callbacks.
}
```

**Implementation notes**

- Treat the immediate return code and the later callbacks as two different stages of the same business operation.
- Preserve the identifiers sent in the request because later callbacks often reference them instead of your local in-memory object.

## ReqQrySPMMProductParam

`ReqQrySPMMProductParam` is an asynchronous request entry point used to drive a business operation through the CTP runtime.

- Kind: request
- Owning interface: `CThostFtdcTraderApi`
- Related symbols: `OnRspQrySPMMProductParam`

**When to use it**

- Warm up local caches after login.
- Fetch on-demand operational data for UI, reconciliation, or risk checks.

**How to apply it**

1. Ensure the API instance is initialized and the session has reached the state required for this request.
2. Fill the request object with the identifiers and business fields expected by the server.
3. Call the API, inspect the local return code, then complete the workflow through later SPI callbacks.

**Prototype**

```cpp
virtual int ReqQrySPMMProductParam(CThostFtdcQrySPMMProductParamField *pQrySPMMProductParam, int nRequestID) = 0;
```

**Parameters**

| Name | Type | Purpose |
| --- | --- | --- |
| `pQrySPMMProductParam` | `CThostFtdcQrySPMMProductParamField *` | Pointer to the payload object `CThostFtdcQrySPMMProductParamField *`. |
| `nRequestID` | `int` | Request correlation id provided by the caller. |

**Callback and outcome model**

- Success path: `OnRspQrySPMMProductParam`.

**Return semantics**

- `0` means the request was accepted by the local API runtime and will continue asynchronously through SPI callbacks.
- `-1` means the client is not in a state where the request can be submitted, typically because the connection is unavailable.
- `-2` means too many outstanding requests remain unprocessed on the local side.
- `-3` means the local request-rate limit was hit and the caller should retry later.

**Usage example**

```cpp
CThostFtdcQrySPMMProductParamField qrySPMMProductParam = {};
// Fill the required identifiers and business fields before sending the request.
int rc = api->ReqQrySPMMProductParam(&qrySPMMProductParam, requestId++);
if (rc != 0) {
    // Handle the local submission failure before waiting for callbacks.
}
```

**Implementation notes**

- Treat the immediate return code and the later callbacks as two different stages of the same business operation.
- Preserve the identifiers sent in the request because later callbacks often reference them instead of your local in-memory object.
