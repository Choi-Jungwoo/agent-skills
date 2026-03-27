# CTP trader API offset and portfolio settings

This reference covers portfolio settings, investor information communication records, combination-leg inspection, and offset-setting flows.

| Entry | Kind |
| --- | --- |
| ReqQryInvestorPortfSetting | request |
| ReqQryInvestorInfoCommRec | request |
| ReqQryCombLeg | request |
| ReqOffsetSetting | request |
| ReqCancelOffsetSetting | request |
| ReqQryOffsetSetting | request |

## ReqQryInvestorPortfSetting

`ReqQryInvestorPortfSetting` is an asynchronous request entry point used to drive a business operation through the CTP runtime.

- Kind: request
- Owning interface: `CThostFtdcTraderApi`
- Related symbols: `OnRspQryInvestorPortfSetting`

**When to use it**

- Warm up local caches after login.
- Fetch on-demand operational data for UI, reconciliation, or risk checks.

**How to apply it**

1. Ensure the API instance is initialized and the session has reached the state required for this request.
2. Fill the request object with the identifiers and business fields expected by the server.
3. Call the API, inspect the local return code, then complete the workflow through later SPI callbacks.

**Prototype**

```cpp
virtual int ReqQryInvestorPortfSetting(CThostFtdcQryInvestorPortfSettingField *pQryInvestorPortfSetting, int nRequestID) = 0;
```

**Parameters**

| Name | Type | Purpose |
| --- | --- | --- |
| `pQryInvestorPortfSetting` | `CThostFtdcQryInvestorPortfSettingField *` | Pointer to the payload object `CThostFtdcQryInvestorPortfSettingField *`. |
| `nRequestID` | `int` | Request correlation id provided by the caller. |

**Callback and outcome model**

- Success path: `OnRspQryInvestorPortfSetting`.

**Return semantics**

- `0` means the request was accepted by the local API runtime and will continue asynchronously through SPI callbacks.
- `-1` means the client is not in a state where the request can be submitted, typically because the connection is unavailable.
- `-2` means too many outstanding requests remain unprocessed on the local side.
- `-3` means the local request-rate limit was hit and the caller should retry later.

**Usage example**

```cpp
CThostFtdcQryInvestorPortfSettingField qryInvestorPortfSetting = {};
// Fill the required identifiers and business fields before sending the request.
int rc = api->ReqQryInvestorPortfSetting(&qryInvestorPortfSetting, requestId++);
if (rc != 0) {
    // Handle the local submission failure before waiting for callbacks.
}
```

**Implementation notes**

- Treat the immediate return code and the later callbacks as two different stages of the same business operation.
- Preserve the identifiers sent in the request because later callbacks often reference them instead of your local in-memory object.

## ReqQryInvestorInfoCommRec

`ReqQryInvestorInfoCommRec` is an asynchronous request entry point used to drive a business operation through the CTP runtime.

- Kind: request
- Owning interface: `CThostFtdcTraderApi`
- Related symbols: `OnRspQryInvestorInfoCommRec`

**When to use it**

- Warm up local caches after login.
- Fetch on-demand operational data for UI, reconciliation, or risk checks.

**How to apply it**

1. Ensure the API instance is initialized and the session has reached the state required for this request.
2. Fill the request object with the identifiers and business fields expected by the server.
3. Call the API, inspect the local return code, then complete the workflow through later SPI callbacks.

**Prototype**

```cpp
virtual int ReqQryInvestorInfoCommRec(CThostFtdcQryInvestorInfoCommRecFie ld *pQryInvestorInfoCommRec, int nRequestID) = 0;
```

**Parameters**

| Name | Type | Purpose |
| --- | --- | --- |
| `pQryInvestorInfoCommRec` | `CThostFtdcQryInvestorInfoCommRecFie ld *` | Pointer to the payload object `CThostFtdcQryInvestorInfoCommRecFie ld *`. |
| `nRequestID` | `int` | Request correlation id provided by the caller. |

**Callback and outcome model**

- Success path: `OnRspQryInvestorInfoCommRec`.

**Return semantics**

- `0` means the request was accepted by the local API runtime and will continue asynchronously through SPI callbacks.
- `-1` means the client is not in a state where the request can be submitted, typically because the connection is unavailable.
- `-2` means too many outstanding requests remain unprocessed on the local side.
- `-3` means the local request-rate limit was hit and the caller should retry later.

**Usage example**

```cpp
CThostFtdcQryInvestorInfoCommRecFie ld qryInvestorInfoCommRec = {};
// Fill the required identifiers and business fields before sending the request.
int rc = api->ReqQryInvestorInfoCommRec(&qryInvestorInfoCommRec, requestId++);
if (rc != 0) {
    // Handle the local submission failure before waiting for callbacks.
}
```

**Implementation notes**

- Treat the immediate return code and the later callbacks as two different stages of the same business operation.
- Preserve the identifiers sent in the request because later callbacks often reference them instead of your local in-memory object.

## ReqQryCombLeg

`ReqQryCombLeg` is an asynchronous request entry point used to drive a business operation through the CTP runtime.

- Kind: request
- Owning interface: `CThostFtdcTraderApi`
- Related symbols: `OnRspQryCombLeg`

**When to use it**

- Warm up local caches after login.
- Fetch on-demand operational data for UI, reconciliation, or risk checks.

**How to apply it**

1. Ensure the API instance is initialized and the session has reached the state required for this request.
2. Fill the request object with the identifiers and business fields expected by the server.
3. Call the API, inspect the local return code, then complete the workflow through later SPI callbacks.

**Prototype**

```cpp
virtual int ReqQryCombLeg(CThostFtdcQryCombLegField *pQryCombLeg, int nRequestID) = 0;
```

**Parameters**

| Name | Type | Purpose |
| --- | --- | --- |
| `pQryCombLeg` | `CThostFtdcQryCombLegField *` | Pointer to the payload object `CThostFtdcQryCombLegField *`. |
| `nRequestID` | `int` | Request correlation id provided by the caller. |

**Callback and outcome model**

- Success path: `OnRspQryCombLeg`.

**Return semantics**

- `0` means the request was accepted by the local API runtime and will continue asynchronously through SPI callbacks.
- `-1` means the client is not in a state where the request can be submitted, typically because the connection is unavailable.
- `-2` means too many outstanding requests remain unprocessed on the local side.
- `-3` means the local request-rate limit was hit and the caller should retry later.

**Usage example**

```cpp
CThostFtdcQryCombLegField qryCombLeg = {};
// Fill the required identifiers and business fields before sending the request.
int rc = api->ReqQryCombLeg(&qryCombLeg, requestId++);
if (rc != 0) {
    // Handle the local submission failure before waiting for callbacks.
}
```

**Implementation notes**

- Treat the immediate return code and the later callbacks as two different stages of the same business operation.
- Preserve the identifiers sent in the request because later callbacks often reference them instead of your local in-memory object.

## ReqOffsetSetting

`ReqOffsetSetting` is an asynchronous request entry point used to drive a business operation through the CTP runtime.

- Kind: request
- Owning interface: `CThostFtdcTraderApi`
- Related symbols: `OnRspOffsetSetting`, `OnRtnOffsetSetting`, `OnErrRtnOffsetSetting`

**When to use it**

- Use this entry when the related business flow becomes part of your integration.
- Keep the behavior in mind when modeling retries, reconnection, or reconciliation logic.

**How to apply it**

1. Ensure the API instance is initialized and the session has reached the state required for this request.
2. Fill the request object with the identifiers and business fields expected by the server.
3. Call the API, inspect the local return code, then complete the workflow through later SPI callbacks.

**Prototype**

```cpp
virtual int ReqOffsetSetting(CThostFtdcInputOffsetSettingField *pInputOffsetSetting, int nRequestID) = 0;
```

**Parameters**

| Name | Type | Purpose |
| --- | --- | --- |
| `pInputOffsetSetting` | `CThostFtdcInputOffsetSettingField *` | Pointer to the payload object `CThostFtdcInputOffsetSettingField *`. |
| `nRequestID` | `int` | Request correlation id provided by the caller. |

**Callback and outcome model**

- Success path: `OnRspOffsetSetting`, `OnRtnOffsetSetting`.
- Error path: `OnErrRtnOffsetSetting`.

**Return semantics**

- `0` means the request was accepted by the local API runtime and will continue asynchronously through SPI callbacks.
- `-1` means the client is not in a state where the request can be submitted, typically because the connection is unavailable.
- `-2` means too many outstanding requests remain unprocessed on the local side.
- `-3` means the local request-rate limit was hit and the caller should retry later.

**Usage example**

```cpp
CThostFtdcInputOffsetSettingField a = { 0 };
strcpy_s(a.BrokerID, "9999");
strcpy_s(a.InvestorID, "00001");
strcpy_s(a.InstrumentID, "a2507-C-3850");
strcpy_s(a.UnderlyingInstrID, "a2507");
strcpy_s(a.ProductID, "a_o");
a.OffsetType = THOST_FTDC_OT_OPT_OFFSET;
a.Volume = 1;
a.IsOffset = 1;
strcpy_s(a.UserID, "00001");
strcpy_s(a.ExchangeID, "DCE");
m_pUserApi->ReqOffsetSetting(&a, 1);
```

**Implementation notes**

- Treat the immediate return code and the later callbacks as two different stages of the same business operation.
- Preserve the identifiers sent in the request because later callbacks often reference them instead of your local in-memory object.

## ReqCancelOffsetSetting

`ReqCancelOffsetSetting` is an asynchronous request entry point used to drive a business operation through the CTP runtime.

- Kind: request
- Owning interface: `CThostFtdcTraderApi`
- Related symbols: `OnRspCancelOffsetSetting`, `OnRtnOffsetSetting`, `OnErrRtnCancelOffsetSetting`

**When to use it**

- Use this entry when the related business flow becomes part of your integration.
- Keep the behavior in mind when modeling retries, reconnection, or reconciliation logic.

**How to apply it**

1. Ensure the API instance is initialized and the session has reached the state required for this request.
2. Fill the request object with the identifiers and business fields expected by the server.
3. Call the API, inspect the local return code, then complete the workflow through later SPI callbacks.

**Prototype**

```cpp
virtual int ReqCancelOffsetSetting(CThostFtdcInputOffsetSettingField *pInputOffsetSetting, int nRequestID) = 0;
```

**Parameters**

| Name | Type | Purpose |
| --- | --- | --- |
| `pInputOffsetSetting` | `CThostFtdcInputOffsetSettingField *` | Pointer to the payload object `CThostFtdcInputOffsetSettingField *`. |
| `nRequestID` | `int` | Request correlation id provided by the caller. |

**Callback and outcome model**

- Success path: `OnRspCancelOffsetSetting`, `OnRtnOffsetSetting`.
- Error path: `OnErrRtnCancelOffsetSetting`.

**Return semantics**

- `0` means the request was accepted by the local API runtime and will continue asynchronously through SPI callbacks.
- `-1` means the client is not in a state where the request can be submitted, typically because the connection is unavailable.
- `-2` means too many outstanding requests remain unprocessed on the local side.
- `-3` means the local request-rate limit was hit and the caller should retry later.

**Usage example**

```cpp
CThostFtdcInputOffsetSettingField a = { 0 };
strcpy_s(a.BrokerID, "9999");
strcpy_s(a.InvestorID, "00001");
strcpy_s(a.InstrumentID, "a2407-C-3850");
a.OffsetType = THOST_FTDC_OT_OPT_OFFSET;
strcpy_s(a.ExchangeID, "DCE);
m_pUserApi->ReqCancelOffsetSetting(&a, nRequestID++);
```

**Implementation notes**

- Treat the immediate return code and the later callbacks as two different stages of the same business operation.
- Preserve the identifiers sent in the request because later callbacks often reference them instead of your local in-memory object.

## ReqQryOffsetSetting

`ReqQryOffsetSetting` is an asynchronous request entry point used to drive a business operation through the CTP runtime.

- Kind: request
- Owning interface: `CThostFtdcTraderApi`
- Related symbols: `OnRspQryOffsetSetting`

**When to use it**

- Warm up local caches after login.
- Fetch on-demand operational data for UI, reconciliation, or risk checks.

**How to apply it**

1. Ensure the API instance is initialized and the session has reached the state required for this request.
2. Fill the request object with the identifiers and business fields expected by the server.
3. Call the API, inspect the local return code, then complete the workflow through later SPI callbacks.

**Prototype**

```cpp
virtual int ReqQryOffsetSetting(CThostFtdcQryOffsetSettingField *pQryOffsetSetting, int nRequestID) = 0;
```

**Parameters**

| Name | Type | Purpose |
| --- | --- | --- |
| `pQryOffsetSetting` | `CThostFtdcQryOffsetSettingField *` | Pointer to the payload object `CThostFtdcQryOffsetSettingField *`. |
| `nRequestID` | `int` | Request correlation id provided by the caller. |

**Callback and outcome model**

- Success path: `OnRspQryOffsetSetting`.

**Return semantics**

- `0` means the request was accepted by the local API runtime and will continue asynchronously through SPI callbacks.
- `-1` means the client is not in a state where the request can be submitted, typically because the connection is unavailable.
- `-2` means too many outstanding requests remain unprocessed on the local side.
- `-3` means the local request-rate limit was hit and the caller should retry later.

**Usage example**

```cpp
CThostFtdcQryOffsetSettingField qryOffsetSetting = {};
// Fill the required identifiers and business fields before sending the request.
int rc = api->ReqQryOffsetSetting(&qryOffsetSetting, requestId++);
if (rc != 0) {
    // Handle the local submission failure before waiting for callbacks.
}
```

**Implementation notes**

- Treat the immediate return code and the later callbacks as two different stages of the same business operation.
- Preserve the identifiers sent in the request because later callbacks often reference them instead of your local in-memory object.
