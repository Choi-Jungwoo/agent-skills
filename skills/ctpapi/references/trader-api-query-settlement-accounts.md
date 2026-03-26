# CTP trader API settlement and account queries

This reference covers settlement, trading-account, trading-code, trading-notice, and secondary-agent account queries.

| Entry | Kind |
| --- | --- |
| ReqSettlementInfoConfirm | request |
| ReqQrySecAgentACIDMap | request |
| ReqQrySecAgentCheckMode | request |
| ReqQrySecAgentTradeInfo | request |
| ReqQrySecAgentTradingAccount | request |
| ReqQrySettlementInfo | request |
| ReqQrySettlementInfoConfirm | request |
| ReqQryTradingAccount | request |
| ReqQryTradingCode | request |
| ReqQryTradingNotice | request |
| ReqQryRiskSettleInvstPosition | request |
| ReqQryRiskSettleProductStatus | request |
| ReqQryUserSession | request |

## ReqSettlementInfoConfirm

`ReqSettlementInfoConfirm` is an asynchronous request entry point used to drive a business operation through the CTP runtime.

- Kind: request
- Owning interface: `CThostFtdcTraderApi`
- Related symbols: `OnRspSettlementInfoConfirm`

**When to use it**

- Use this entry when the related business flow becomes part of your integration.
- Keep the behavior in mind when modeling retries, reconnection, or reconciliation logic.

**How to apply it**

1. Ensure the API instance is initialized and the session has reached the state required for this request.
2. Fill the request object with the identifiers and business fields expected by the server.
3. Call the API, inspect the local return code, then complete the workflow through later SPI callbacks.

**Prototype**

```cpp
virtual int ReqSettlementInfoConfirm(CThostFtdcSettlementInfoConfirmField *pSettlementInfoConfirm, int nRequestID) = 0;
```

**Parameters**

| Name | Type | Purpose |
| --- | --- | --- |
| `pSettlementInfoConfirm` | `CThostFtdcSettlementInfoConfirmField *` | Pointer to the payload object `CThostFtdcSettlementInfoConfirmField *`. |
| `nRequestID` | `int` | Request correlation id provided by the caller. |

**Callback and outcome model**

- Success path: `OnRspSettlementInfoConfirm`.

**Return semantics**

- `0` means the request was accepted by the local API runtime and will continue asynchronously through SPI callbacks.
- `-1` means the client is not in a state where the request can be submitted, typically because the connection is unavailable.
- `-2` means too many outstanding requests remain unprocessed on the local side.
- `-3` means the local request-rate limit was hit and the caller should retry later.

**Usage example**

```cpp
CThostFtdcSettlementInfoConfirmField Confirm = { 0 };
strcpy_s(Confirm.BrokerID, "9999");
strcpy_s(Confirm.InvestorID, "1000001");
m_pUserApi->ReqSettlementInfoConfirm(&Confirm, nRequestID++);
```

**Implementation notes**

- Treat the immediate return code and the later callbacks as two different stages of the same business operation.
- Preserve the identifiers sent in the request because later callbacks often reference them instead of your local in-memory object.

## ReqQrySecAgentACIDMap

`ReqQrySecAgentACIDMap` is an asynchronous request entry point used to drive a business operation through the CTP runtime.

- Kind: request
- Owning interface: `CThostFtdcTraderApi`
- Related symbols: `OnRspQrySecAgentACIDMap`

**When to use it**

- Warm up local caches after login.
- Fetch on-demand operational data for UI, reconciliation, or risk checks.

**How to apply it**

1. Ensure the API instance is initialized and the session has reached the state required for this request.
2. Fill the request object with the identifiers and business fields expected by the server.
3. Call the API, inspect the local return code, then complete the workflow through later SPI callbacks.

**Prototype**

```cpp
virtual int ReqQrySecAgentACIDMap(CThostFtdcQrySecAgentACIDMapField *pQrySecAgentACIDMap, int nRequestID) = 0;
```

**Parameters**

| Name | Type | Purpose |
| --- | --- | --- |
| `pQrySecAgentACIDMap` | `CThostFtdcQrySecAgentACIDMapField *` | Pointer to the payload object `CThostFtdcQrySecAgentACIDMapField *`. |
| `nRequestID` | `int` | Request correlation id provided by the caller. |

**Callback and outcome model**

- Success path: `OnRspQrySecAgentACIDMap`.

**Return semantics**

- `0` means the request was accepted by the local API runtime and will continue asynchronously through SPI callbacks.
- `-1` means the client is not in a state where the request can be submitted, typically because the connection is unavailable.
- `-2` means too many outstanding requests remain unprocessed on the local side.
- `-3` means the local request-rate limit was hit and the caller should retry later.

**Usage example**

```cpp
CThostFtdcQrySecAgentACIDMapField qrySecAgentACIDMap = {};
// Fill the required identifiers and business fields before sending the request.
int rc = api->ReqQrySecAgentACIDMap(&qrySecAgentACIDMap, requestId++);
if (rc != 0) {
    // Handle the local submission failure before waiting for callbacks.
}
```

**Implementation notes**

- Treat the immediate return code and the later callbacks as two different stages of the same business operation.
- Preserve the identifiers sent in the request because later callbacks often reference them instead of your local in-memory object.

## ReqQrySecAgentCheckMode

`ReqQrySecAgentCheckMode` is an asynchronous request entry point used to drive a business operation through the CTP runtime.

- Kind: request
- Owning interface: `CThostFtdcTraderApi`
- Related symbols: `OnRspQrySecAgentCheckMode`

**When to use it**

- Warm up local caches after login.
- Fetch on-demand operational data for UI, reconciliation, or risk checks.

**How to apply it**

1. Ensure the API instance is initialized and the session has reached the state required for this request.
2. Fill the request object with the identifiers and business fields expected by the server.
3. Call the API, inspect the local return code, then complete the workflow through later SPI callbacks.

**Prototype**

```cpp
virtual int ReqQrySecAgentCheckMode(CThostFtdcQrySecAgentCheckModeField *pQrySecAgentCheckMode, int nRequestID) = 0;
```

**Parameters**

| Name | Type | Purpose |
| --- | --- | --- |
| `pQrySecAgentCheckMode` | `CThostFtdcQrySecAgentCheckModeField *` | Pointer to the payload object `CThostFtdcQrySecAgentCheckModeField *`. |
| `nRequestID` | `int` | Request correlation id provided by the caller. |

**Callback and outcome model**

- Success path: `OnRspQrySecAgentCheckMode`.

**Return semantics**

- `0` means the request was accepted by the local API runtime and will continue asynchronously through SPI callbacks.
- `-1` means the client is not in a state where the request can be submitted, typically because the connection is unavailable.
- `-2` means too many outstanding requests remain unprocessed on the local side.
- `-3` means the local request-rate limit was hit and the caller should retry later.

**Usage example**

```cpp
CThostFtdcQrySecAgentCheckModeField qrySecAgentCheckMo = {};
// Fill the required identifiers and business fields before sending the request.
int rc = api->ReqQrySecAgentCheckMode(&qrySecAgentCheckMo, requestId++);
if (rc != 0) {
    // Handle the local submission failure before waiting for callbacks.
}
```

**Implementation notes**

- Treat the immediate return code and the later callbacks as two different stages of the same business operation.
- Preserve the identifiers sent in the request because later callbacks often reference them instead of your local in-memory object.

## ReqQrySecAgentTradeInfo

`ReqQrySecAgentTradeInfo` is an asynchronous request entry point used to drive a business operation through the CTP runtime.

- Kind: request
- Owning interface: `CThostFtdcTraderApi`
- Related symbols: `OnRspQrySecAgentTradeInfo`

**When to use it**

- Warm up local caches after login.
- Fetch on-demand operational data for UI, reconciliation, or risk checks.

**How to apply it**

1. Ensure the API instance is initialized and the session has reached the state required for this request.
2. Fill the request object with the identifiers and business fields expected by the server.
3. Call the API, inspect the local return code, then complete the workflow through later SPI callbacks.

**Prototype**

```cpp
virtual int ReqQrySecAgentTradeInfo(CThostFtdcQrySecAgentTradeInfoField *pQrySecAgentTradeInfo, int nRequestID) = 0;
```

**Parameters**

| Name | Type | Purpose |
| --- | --- | --- |
| `pQrySecAgentTradeInfo` | `CThostFtdcQrySecAgentTradeInfoField *` | Pointer to the payload object `CThostFtdcQrySecAgentTradeInfoField *`. |
| `nRequestID` | `int` | Request correlation id provided by the caller. |

**Callback and outcome model**

- Success path: `OnRspQrySecAgentTradeInfo`.

**Return semantics**

- `0` means the request was accepted by the local API runtime and will continue asynchronously through SPI callbacks.
- `-1` means the client is not in a state where the request can be submitted, typically because the connection is unavailable.
- `-2` means too many outstanding requests remain unprocessed on the local side.
- `-3` means the local request-rate limit was hit and the caller should retry later.

**Usage example**

```cpp
CThostFtdcQrySecAgentTradeInfoField qrySecAgentTradeInfo = {};
// Fill the required identifiers and business fields before sending the request.
int rc = api->ReqQrySecAgentTradeInfo(&qrySecAgentTradeInfo, requestId++);
if (rc != 0) {
    // Handle the local submission failure before waiting for callbacks.
}
```

**Implementation notes**

- Treat the immediate return code and the later callbacks as two different stages of the same business operation.
- Preserve the identifiers sent in the request because later callbacks often reference them instead of your local in-memory object.

## ReqQrySecAgentTradingAccount

`ReqQrySecAgentTradingAccount` is an asynchronous request entry point used to drive a business operation through the CTP runtime.

- Kind: request
- Owning interface: `CThostFtdcTraderApi`
- Related symbols: `OnRspQrySecAgentTradingAccount`

**When to use it**

- Warm up local caches after login.
- Fetch on-demand operational data for UI, reconciliation, or risk checks.

**How to apply it**

1. Ensure the API instance is initialized and the session has reached the state required for this request.
2. Fill the request object with the identifiers and business fields expected by the server.
3. Call the API, inspect the local return code, then complete the workflow through later SPI callbacks.

**Prototype**

```cpp
virtual int ReqQrySecAgentTradingAccount(CThostFtdcQryTradingAccountField *pQryTradingAccount, int nRequestID) = 0;
```

**Parameters**

| Name | Type | Purpose |
| --- | --- | --- |
| `pQryTradingAccount` | `CThostFtdcQryTradingAccountField *` | Pointer to the payload object `CThostFtdcQryTradingAccountField *`. |
| `nRequestID` | `int` | Request correlation id provided by the caller. |

**Callback and outcome model**

- Success path: `OnRspQrySecAgentTradingAccount`.

**Return semantics**

- `0` means the request was accepted by the local API runtime and will continue asynchronously through SPI callbacks.
- `-1` means the client is not in a state where the request can be submitted, typically because the connection is unavailable.
- `-2` means too many outstanding requests remain unprocessed on the local side.
- `-3` means the local request-rate limit was hit and the caller should retry later.

**Usage example**

```cpp
CThostFtdcQryTradingAccountField qryTradingAccount = {};
// Fill the required identifiers and business fields before sending the request.
int rc = api->ReqQrySecAgentTradingAccount(&qryTradingAccount, requestId++);
if (rc != 0) {
    // Handle the local submission failure before waiting for callbacks.
}
```

**Implementation notes**

- Treat the immediate return code and the later callbacks as two different stages of the same business operation.
- Preserve the identifiers sent in the request because later callbacks often reference them instead of your local in-memory object.

## ReqQrySettlementInfo

`ReqQrySettlementInfo` is an asynchronous request entry point used to drive a business operation through the CTP runtime.

- Kind: request
- Owning interface: `CThostFtdcTraderApi`
- Related symbols: `OnRspQrySettlementInfo`

**When to use it**

- Warm up local caches after login.
- Fetch on-demand operational data for UI, reconciliation, or risk checks.

**How to apply it**

1. Ensure the API instance is initialized and the session has reached the state required for this request.
2. Fill the request object with the identifiers and business fields expected by the server.
3. Call the API, inspect the local return code, then complete the workflow through later SPI callbacks.

**Prototype**

```cpp
virtual int ReqQrySettlementInfo(CThostFtdcQrySettlementInfoField *pQrySettlementInfo, int nRequestID) = 0;
```

**Parameters**

| Name | Type | Purpose |
| --- | --- | --- |
| `pQrySettlementInfo` | `CThostFtdcQrySettlementInfoField *` | Pointer to the payload object `CThostFtdcQrySettlementInfoField *`. |
| `nRequestID` | `int` | Request correlation id provided by the caller. |

**Callback and outcome model**

- Success path: `OnRspQrySettlementInfo`.

**Return semantics**

- `0` means the request was accepted by the local API runtime and will continue asynchronously through SPI callbacks.
- `-1` means the client is not in a state where the request can be submitted, typically because the connection is unavailable.
- `-2` means too many outstanding requests remain unprocessed on the local side.
- `-3` means the local request-rate limit was hit and the caller should retry later.

**Usage example**

```cpp
CThostFtdcQrySettlementInfoField a = { 0 };
strcpy_s(a.BrokerID, "9999");
strcpy_s(a.InvestorID, "1000001");
strcpy_s(a.TradingDay, 20180101 );
m_pUserApi->ReqQrySettlementInfo(&a, nRequestID++);
```

**Implementation notes**

- Treat the immediate return code and the later callbacks as two different stages of the same business operation.
- Preserve the identifiers sent in the request because later callbacks often reference them instead of your local in-memory object.

## ReqQrySettlementInfoConfirm

`ReqQrySettlementInfoConfirm` is an asynchronous request entry point used to drive a business operation through the CTP runtime.

- Kind: request
- Owning interface: `CThostFtdcTraderApi`
- Related symbols: `OnRspQrySettlementInfoConfirm`

**When to use it**

- Warm up local caches after login.
- Fetch on-demand operational data for UI, reconciliation, or risk checks.

**How to apply it**

1. Ensure the API instance is initialized and the session has reached the state required for this request.
2. Fill the request object with the identifiers and business fields expected by the server.
3. Call the API, inspect the local return code, then complete the workflow through later SPI callbacks.

**Prototype**

```cpp
virtual int ReqQrySettlementInfoConfirm(CThostFtdcQrySettlementInfoConfirmFi eld *pQrySettlementInfoConfirm, int nRequestID) = 0;
```

**Parameters**

| Name | Type | Purpose |
| --- | --- | --- |
| `pQrySettlementInfoConfirm` | `CThostFtdcQrySettlementInfoConfirmFi eld *` | Pointer to the payload object `CThostFtdcQrySettlementInfoConfirmFi eld *`. |
| `nRequestID` | `int` | Request correlation id provided by the caller. |

**Callback and outcome model**

- Success path: `OnRspQrySettlementInfoConfirm`.

**Return semantics**

- `0` means the request was accepted by the local API runtime and will continue asynchronously through SPI callbacks.
- `-1` means the client is not in a state where the request can be submitted, typically because the connection is unavailable.
- `-2` means too many outstanding requests remain unprocessed on the local side.
- `-3` means the local request-rate limit was hit and the caller should retry later.

**Usage example**

```cpp
CThostFtdcQrySettlementInfoConfirmFi eld qrySettlementInfoConfirm = {};
// Fill the required identifiers and business fields before sending the request.
int rc = api->ReqQrySettlementInfoConfirm(&qrySettlementInfoConfirm, requestId++);
if (rc != 0) {
    // Handle the local submission failure before waiting for callbacks.
}
```

**Implementation notes**

- Treat the immediate return code and the later callbacks as two different stages of the same business operation.
- Preserve the identifiers sent in the request because later callbacks often reference them instead of your local in-memory object.

## ReqQryTradingAccount

`ReqQryTradingAccount` is an asynchronous request entry point used to drive a business operation through the CTP runtime.

- Kind: request
- Owning interface: `CThostFtdcTraderApi`
- Related symbols: `OnRspQryTradingAccount`

**When to use it**

- Warm up local caches after login.
- Fetch on-demand operational data for UI, reconciliation, or risk checks.

**How to apply it**

1. Ensure the API instance is initialized and the session has reached the state required for this request.
2. Fill the request object with the identifiers and business fields expected by the server.
3. Call the API, inspect the local return code, then complete the workflow through later SPI callbacks.

**Prototype**

```cpp
virtual int ReqQryTradingAccount(CThostFtdcQryTradingAccountField *pQryTradingAccount, int nRequestID) = 0;
```

**Parameters**

| Name | Type | Purpose |
| --- | --- | --- |
| `pQryTradingAccount` | `CThostFtdcQryTradingAccountField *` | Pointer to the payload object `CThostFtdcQryTradingAccountField *`. |
| `nRequestID` | `int` | Request correlation id provided by the caller. |

**Callback and outcome model**

- Success path: `OnRspQryTradingAccount`.

**Return semantics**

- `0` means the request was accepted by the local API runtime and will continue asynchronously through SPI callbacks.
- `-1` means the client is not in a state where the request can be submitted, typically because the connection is unavailable.
- `-2` means too many outstanding requests remain unprocessed on the local side.
- `-3` means the local request-rate limit was hit and the caller should retry later.

**Usage example**

```cpp
CThostFtdcQryTradingAccountField a = { 0 };
strcpy_s(a.BrokerID, "9999");
strcpy_s(a.InvestorID, "1000001");
strcpy_s(a.CurrencyID, "CNY");
m_pUserApi->ReqQryTradingAccount(&a, nRequestID++);
```

**Implementation notes**

- Treat the immediate return code and the later callbacks as two different stages of the same business operation.
- Preserve the identifiers sent in the request because later callbacks often reference them instead of your local in-memory object.

## ReqQryTradingCode

`ReqQryTradingCode` is an asynchronous request entry point used to drive a business operation through the CTP runtime.

- Kind: request
- Owning interface: `CThostFtdcTraderApi`
- Related symbols: `OnRspQryTradingCode`

**When to use it**

- Warm up local caches after login.
- Fetch on-demand operational data for UI, reconciliation, or risk checks.

**How to apply it**

1. Ensure the API instance is initialized and the session has reached the state required for this request.
2. Fill the request object with the identifiers and business fields expected by the server.
3. Call the API, inspect the local return code, then complete the workflow through later SPI callbacks.

**Prototype**

```cpp
virtual int ReqQryTradingCode(CThostFtdcQryTradingCodeField *pQryTradingCode, int nRequestID) = 0;
```

**Parameters**

| Name | Type | Purpose |
| --- | --- | --- |
| `pQryTradingCode` | `CThostFtdcQryTradingCodeField *` | Pointer to the payload object `CThostFtdcQryTradingCodeField *`. |
| `nRequestID` | `int` | Request correlation id provided by the caller. |

**Callback and outcome model**

- Success path: `OnRspQryTradingCode`.

**Return semantics**

- `0` means the request was accepted by the local API runtime and will continue asynchronously through SPI callbacks.
- `-1` means the client is not in a state where the request can be submitted, typically because the connection is unavailable.
- `-2` means too many outstanding requests remain unprocessed on the local side.
- `-3` means the local request-rate limit was hit and the caller should retry later.

**Usage example**

```cpp
CThostFtdcQryTradingCodeField qryTradingCo = {};
// Fill the required identifiers and business fields before sending the request.
int rc = api->ReqQryTradingCode(&qryTradingCo, requestId++);
if (rc != 0) {
    // Handle the local submission failure before waiting for callbacks.
}
```

**Implementation notes**

- Treat the immediate return code and the later callbacks as two different stages of the same business operation.
- Preserve the identifiers sent in the request because later callbacks often reference them instead of your local in-memory object.

## ReqQryTradingNotice

`ReqQryTradingNotice` is an asynchronous request entry point used to drive a business operation through the CTP runtime.

- Kind: request
- Owning interface: `CThostFtdcTraderApi`
- Related symbols: `OnRtnTradingNotice`, `OnRspQryTradingNotice`

**When to use it**

- Warm up local caches after login.
- Fetch on-demand operational data for UI, reconciliation, or risk checks.

**How to apply it**

1. Ensure the API instance is initialized and the session has reached the state required for this request.
2. Fill the request object with the identifiers and business fields expected by the server.
3. Call the API, inspect the local return code, then complete the workflow through later SPI callbacks.

**Prototype**

```cpp
virtual int ReqQryTradingNotice(CThostFtdcQryTradingNoticeField *pQryTradingNotice, int nRequestID) = 0;
```

**Parameters**

| Name | Type | Purpose |
| --- | --- | --- |
| `pQryTradingNotice` | `CThostFtdcQryTradingNoticeField *` | Pointer to the payload object `CThostFtdcQryTradingNoticeField *`. |
| `nRequestID` | `int` | Request correlation id provided by the caller. |

**Callback and outcome model**

- Success path: `OnRtnTradingNotice`, `OnRspQryTradingNotice`.

**Return semantics**

- `0` means the request was accepted by the local API runtime and will continue asynchronously through SPI callbacks.
- `-1` means the client is not in a state where the request can be submitted, typically because the connection is unavailable.
- `-2` means too many outstanding requests remain unprocessed on the local side.
- `-3` means the local request-rate limit was hit and the caller should retry later.

**Usage example**

```cpp
CThostFtdcQryTradingNoticeField qryTradingNotic = {};
// Fill the required identifiers and business fields before sending the request.
int rc = api->ReqQryTradingNotice(&qryTradingNotic, requestId++);
if (rc != 0) {
    // Handle the local submission failure before waiting for callbacks.
}
```

**Implementation notes**

- Treat the immediate return code and the later callbacks as two different stages of the same business operation.
- Preserve the identifiers sent in the request because later callbacks often reference them instead of your local in-memory object.

## ReqQryRiskSettleInvstPosition

`ReqQryRiskSettleInvstPosition` is an asynchronous request entry point used to drive a business operation through the CTP runtime.

- Kind: request
- Owning interface: `CThostFtdcTraderApi`
- Related symbols: `OnRspQryRiskSettleInvstPosition`

**When to use it**

- Warm up local caches after login.
- Fetch on-demand operational data for UI, reconciliation, or risk checks.

**How to apply it**

1. Ensure the API instance is initialized and the session has reached the state required for this request.
2. Fill the request object with the identifiers and business fields expected by the server.
3. Call the API, inspect the local return code, then complete the workflow through later SPI callbacks.

**Prototype**

```cpp
virtual int ReqQryRiskSettleInvstPosition(CThostFtdcQryRiskSettleInvstPositionFi eld *pQryRiskSettleInvstPosition, int nRequestID) = 0;
```

**Parameters**

| Name | Type | Purpose |
| --- | --- | --- |
| `pQryRiskSettleInvstPosition` | `CThostFtdcQryRiskSettleInvstPositionFi eld *` | Pointer to the payload object `CThostFtdcQryRiskSettleInvstPositionFi eld *`. |
| `nRequestID` | `int` | Request correlation id provided by the caller. |

**Callback and outcome model**

- Success path: `OnRspQryRiskSettleInvstPosition`.

**Return semantics**

- `0` means the request was accepted by the local API runtime and will continue asynchronously through SPI callbacks.
- `-1` means the client is not in a state where the request can be submitted, typically because the connection is unavailable.
- `-2` means too many outstanding requests remain unprocessed on the local side.
- `-3` means the local request-rate limit was hit and the caller should retry later.

**Usage example**

```cpp
CThostFtdcQryRiskSettleInvstPositionFi eld qryRiskSettleInvstPosition = {};
// Fill the required identifiers and business fields before sending the request.
int rc = api->ReqQryRiskSettleInvstPosition(&qryRiskSettleInvstPosition, requestId++);
if (rc != 0) {
    // Handle the local submission failure before waiting for callbacks.
}
```

**Implementation notes**

- Treat the immediate return code and the later callbacks as two different stages of the same business operation.
- Preserve the identifiers sent in the request because later callbacks often reference them instead of your local in-memory object.

## ReqQryRiskSettleProductStatus

`ReqQryRiskSettleProductStatus` is an asynchronous request entry point used to drive a business operation through the CTP runtime.

- Kind: request
- Owning interface: `CThostFtdcTraderApi`
- Related symbols: `OnRspQryRiskSettleProductStatus`

**When to use it**

- Warm up local caches after login.
- Fetch on-demand operational data for UI, reconciliation, or risk checks.

**How to apply it**

1. Ensure the API instance is initialized and the session has reached the state required for this request.
2. Fill the request object with the identifiers and business fields expected by the server.
3. Call the API, inspect the local return code, then complete the workflow through later SPI callbacks.

**Prototype**

```cpp
virtual int ReqQryRiskSettleProductStatus(CThostFtdcQryRiskSettleProductStatus Field *pQryRiskSettleProductStatus, int nRequestID) = 0;
```

**Parameters**

| Name | Type | Purpose |
| --- | --- | --- |
| `pQryRiskSettleProductStatus` | `CThostFtdcQryRiskSettleProductStatus Field *` | Pointer to the payload object `CThostFtdcQryRiskSettleProductStatus Field *`. |
| `nRequestID` | `int` | Request correlation id provided by the caller. |

**Callback and outcome model**

- Success path: `OnRspQryRiskSettleProductStatus`.

**Return semantics**

- `0` means the request was accepted by the local API runtime and will continue asynchronously through SPI callbacks.
- `-1` means the client is not in a state where the request can be submitted, typically because the connection is unavailable.
- `-2` means too many outstanding requests remain unprocessed on the local side.
- `-3` means the local request-rate limit was hit and the caller should retry later.

**Usage example**

```cpp
CThostFtdcQryRiskSettleProductStatus Field qryRiskSettleProductStatus = {};
// Fill the required identifiers and business fields before sending the request.
int rc = api->ReqQryRiskSettleProductStatus(&qryRiskSettleProductStatus, requestId++);
if (rc != 0) {
    // Handle the local submission failure before waiting for callbacks.
}
```

**Implementation notes**

- Treat the immediate return code and the later callbacks as two different stages of the same business operation.
- Preserve the identifiers sent in the request because later callbacks often reference them instead of your local in-memory object.

## ReqQryUserSession

`ReqQryUserSession` is an asynchronous request entry point used to drive a business operation through the CTP runtime.

- Kind: request
- Owning interface: `CThostFtdcTraderApi`
- Related symbols: `OnRspQryUserSession`, `ReqQryOffsetSetting`

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

- Success path: `OnRspQryUserSession`.

**Return semantics**

- `0` means the request was accepted by the local API runtime and will continue asynchronously through SPI callbacks.
- `-1` means the client is not in a state where the request can be submitted, typically because the connection is unavailable.
- `-2` means too many outstanding requests remain unprocessed on the local side.
- `-3` means the local request-rate limit was hit and the caller should retry later.

**Usage example**

```cpp
CThostFtdcQryOffsetSettingField qryOffsetSetting = {};
// Fill the required identifiers and business fields before sending the request.
int rc = api->ReqQryUserSession(&qryOffsetSetting, requestId++);
if (rc != 0) {
    // Handle the local submission failure before waiting for callbacks.
}
```

**Implementation notes**

- Treat the immediate return code and the later callbacks as two different stages of the same business operation.
- Preserve the identifiers sent in the request because later callbacks often reference them instead of your local in-memory object.
