# CTP trader API exec-order, option self-close, and combination flows

This reference covers exec-order paths, option self-close paths, and combination-action flows together with their direct query companions.

| Entry | Kind |
| --- | --- |
| ReqCombActionInsert | request |
| ReqExecOrderAction | request |
| ReqExecOrderInsert | request |
| ReqOptionSelfCloseAction | request |
| ReqOptionSelfCloseInsert | request |
| ReqQryCombAction | request |
| ReqQryExecOrder | request |
| ReqQryOptionSelfClose | request |

## ReqCombActionInsert

`ReqCombActionInsert` is an asynchronous request entry point used to drive a business operation through the CTP runtime.

- Kind: request
- Owning interface: `CThostFtdcTraderApi`
- Related symbols: `OnErrRtnCombActionInsert`, `OnRspCombActionInsert`, `OnRtnCombAction`

**When to use it**

- Use this entry when the related business flow becomes part of your integration.
- Keep the behavior in mind when modeling retries, reconnection, or reconciliation logic.

**How to apply it**

1. Ensure the API instance is initialized and the session has reached the state required for this request.
2. Fill the request object with the identifiers and business fields expected by the server.
3. Call the API, inspect the local return code, then complete the workflow through later SPI callbacks.

**Prototype**

```cpp
virtual int ReqCombActionInsert(CThostFtdcInputCombActionField *pInputCombAction, int nRequestID) = 0;
```

**Parameters**

| Name | Type | Purpose |
| --- | --- | --- |
| `pInputCombAction` | `CThostFtdcInputCombActionField *` | Pointer to the payload object `CThostFtdcInputCombActionField *`. |
| `nRequestID` | `int` | Request correlation id provided by the caller. |

**Callback and outcome model**

- Success path: `OnRspCombActionInsert`, `OnRtnCombAction`.
- Error path: `OnErrRtnCombActionInsert`.

**Return semantics**

- `0` means the request was accepted by the local API runtime and will continue asynchronously through SPI callbacks.
- `-1` means the client is not in a state where the request can be submitted, typically because the connection is unavailable.
- `-2` means too many outstanding requests remain unprocessed on the local side.
- `-3` means the local request-rate limit was hit and the caller should retry later.

**Usage example**

```cpp
CThostFtdcInputCombActionField a = { 0 };
    strcpy_s(a.BrokerID,  9999 );
    strcpy_s(a.InvestorID,  00001 );
    strcpy_s(a.InstrumentID,  STG c1909-P-1680&c1909-C-2020 );
    strcpy_s(a.CombActionRef, "1");
    strcpy_s(a.UserID,  00001 );
    a.Direction = THOST_FTDC_D_Sell;
    a.Volume = 1;
    a.CombDirection = THOST_FTDC_CMDR_Comb;
    a.HedgeFlag = THOST_FTDC_HF_Speculation;
    strcpy_s(a.ExchangeID,  DCE );
    m_pUserApi->ReqCombActionInsert(&a, nRequestID++);
```

**Implementation notes**

- Treat the immediate return code and the later callbacks as two different stages of the same business operation.
- Preserve the identifiers sent in the request because later callbacks often reference them instead of your local in-memory object.

## ReqExecOrderAction

`ReqExecOrderAction` is an asynchronous request entry point used to drive a business operation through the CTP runtime.

- Kind: request
- Owning interface: `CThostFtdcTraderApi`
- Related symbols: `OnErrRtnExecOrderAction`, `OnRspExecOrderAction`, `OnRtnExecOrder`

**When to use it**

- Use this entry when the related business flow becomes part of your integration.
- Keep the behavior in mind when modeling retries, reconnection, or reconciliation logic.

**How to apply it**

1. Ensure the API instance is initialized and the session has reached the state required for this request.
2. Fill the request object with the identifiers and business fields expected by the server.
3. Call the API, inspect the local return code, then complete the workflow through later SPI callbacks.

**Prototype**

```cpp
virtual int ReqExecOrderAction(CThostFtdcInputExecOrderActionField *pInputExecOrderAction, int nRequestID) = 0;
```

**Parameters**

| Name | Type | Purpose |
| --- | --- | --- |
| `pInputExecOrderAction` | `CThostFtdcInputExecOrderActionField *` | Pointer to the payload object `CThostFtdcInputExecOrderActionField *`. |
| `nRequestID` | `int` | Request correlation id provided by the caller. |

**Callback and outcome model**

- Success path: `OnRspExecOrderAction`, `OnRtnExecOrder`.
- Error path: `OnErrRtnExecOrderAction`.

**Return semantics**

- `0` means the request was accepted by the local API runtime and will continue asynchronously through SPI callbacks.
- `-1` means the client is not in a state where the request can be submitted, typically because the connection is unavailable.
- `-2` means too many outstanding requests remain unprocessed on the local side.
- `-3` means the local request-rate limit was hit and the caller should retry later.

**Usage example**

```cpp
CThostFtdcInputExecOrderActionField a = { 0 };
strcpy_s(a.BrokerID, "9999");
strcpy_s(a.InvestorID, "1000001");
a.ExecOrderActionRef = 1;
strcpy_s(a.ExecOrderRef, "00000003");
a.FrontID = 1;
a.SessionID = -7844256;
strcpy_s(a.ExchangeID, "SHFE");
strcpy_s(a.ExecOrderSysID, "         285");
a.ActionFlag = THOST_FTDC_AF_Delete;//
strcpy_s(a.UserID, "1000001");
strcpy_s(a.InstrumentID, "rb1809");
m_pUserApi->ReqExecOrderAction(&a, nRequestID++);
```

**Implementation notes**

- Treat the immediate return code and the later callbacks as two different stages of the same business operation.
- Preserve the identifiers sent in the request because later callbacks often reference them instead of your local in-memory object.

## ReqExecOrderInsert

`ReqExecOrderInsert` is an asynchronous request entry point used to drive a business operation through the CTP runtime.

- Kind: request
- Owning interface: `CThostFtdcTraderApi`
- Related symbols: `OnErrRtnExecOrderInsert`, `OnRspExecOrderInsert`, `OnRtnExecOrder`

**When to use it**

- Use this entry when the related business flow becomes part of your integration.
- Keep the behavior in mind when modeling retries, reconnection, or reconciliation logic.

**How to apply it**

1. Ensure the API instance is initialized and the session has reached the state required for this request.
2. Fill the request object with the identifiers and business fields expected by the server.
3. Call the API, inspect the local return code, then complete the workflow through later SPI callbacks.

**Prototype**

```cpp
virtual int ReqExecOrderInsert(CThostFtdcInputExecOrderField *pInputExecOrder, int nRequestID) = 0;
```

**Parameters**

| Name | Type | Purpose |
| --- | --- | --- |
| `pInputExecOrder` | `CThostFtdcInputExecOrderField *` | Pointer to the payload object `CThostFtdcInputExecOrderField *`. |
| `nRequestID` | `int` | Request correlation id provided by the caller. |

**Callback and outcome model**

- Success path: `OnRspExecOrderInsert`, `OnRtnExecOrder`.
- Error path: `OnErrRtnExecOrderInsert`.

**Return semantics**

- `0` means the request was accepted by the local API runtime and will continue asynchronously through SPI callbacks.
- `-1` means the client is not in a state where the request can be submitted, typically because the connection is unavailable.
- `-2` means too many outstanding requests remain unprocessed on the local side.
- `-3` means the local request-rate limit was hit and the caller should retry later.

**Usage example**

```cpp
CThostFtdcInputExecOrderField OrderInsert = { 0 };
strcpy_s(OrderInsert.BrokerID, "9999");
strcpy_s(OrderInsert.InvestorID, "1000001");
strcpy_s(OrderInsert.InstrumentID, "a2505-C-3950");
strcpy_s(OrderInsert.ExchangeID, "DCE");
strcpy_s(OrderInsert.ExecOrderRef, "00001");
strcpy_s(OrderInsert.UserID, "1000001");
OrderInsert.Volume = 1;
OrderInsert.RequestID = 1;
OrderInsert.OffsetFlag = THOST_FTDC_OF_Close;//      (    )
OrderInsert.HedgeFlag = THOST_FTDC_HF_Speculation;//
```

**Implementation notes**

- Treat the immediate return code and the later callbacks as two different stages of the same business operation.
- Preserve the identifiers sent in the request because later callbacks often reference them instead of your local in-memory object.

## ReqOptionSelfCloseAction

`ReqOptionSelfCloseAction` is an asynchronous request entry point used to drive a business operation through the CTP runtime.

- Kind: request
- Owning interface: `CThostFtdcTraderApi`
- Related symbols: `OnErrRtnOptionSelfCloseAction`, `OnRspOptionSelfCloseAction`, `OnRtnOptionSelfClose`

**When to use it**

- Use this entry when the related business flow becomes part of your integration.
- Keep the behavior in mind when modeling retries, reconnection, or reconciliation logic.

**How to apply it**

1. Ensure the API instance is initialized and the session has reached the state required for this request.
2. Fill the request object with the identifiers and business fields expected by the server.
3. Call the API, inspect the local return code, then complete the workflow through later SPI callbacks.

**Prototype**

```cpp
virtual int ReqOptionSelfCloseAction(CThostFtdcInputOptionSelfCloseActionField *pInputOptionSelfCloseAction, int nRequestID) = 0;
```

**Parameters**

| Name | Type | Purpose |
| --- | --- | --- |
| `pInputOptionSelfCloseAction` | `CThostFtdcInputOptionSelfCloseActionField *` | Pointer to the payload object `CThostFtdcInputOptionSelfCloseActionField *`. |
| `nRequestID` | `int` | Request correlation id provided by the caller. |

**Callback and outcome model**

- Success path: `OnRspOptionSelfCloseAction`, `OnRtnOptionSelfClose`.
- Error path: `OnErrRtnOptionSelfCloseAction`.

**Return semantics**

- `0` means the request was accepted by the local API runtime and will continue asynchronously through SPI callbacks.
- `-1` means the client is not in a state where the request can be submitted, typically because the connection is unavailable.
- `-2` means too many outstanding requests remain unprocessed on the local side.
- `-3` means the local request-rate limit was hit and the caller should retry later.

**Usage example**

```cpp
CThostFtdcInputOptionSelfCloseActionField a = { 0 };
strcpy_s(a.BrokerID, "9999");
strcpy_s(a.InvestorID, "1000001");
strcpy_s(a.OptionSelfCloseRef, "000000258");//
a.FrontID = 1;
a.SessionID = 6442531;
strcpy_s(a.ExchangeID, "SHFE");
a.ActionFlag = THOST_FTDC_AF_Delete;
strcpy_s(a.UserID, "1000001");
strcpy_s(a.InstrumentID, "rb1809");
m_pUserApi->ReqOptionSelfCloseAction(&a, nRequestID++);
```

**Implementation notes**

- Treat the immediate return code and the later callbacks as two different stages of the same business operation.
- Preserve the identifiers sent in the request because later callbacks often reference them instead of your local in-memory object.

## ReqOptionSelfCloseInsert

`ReqOptionSelfCloseInsert` is an asynchronous request entry point used to drive a business operation through the CTP runtime.

- Kind: request
- Owning interface: `CThostFtdcTraderApi`
- Related symbols: `OnErrRtnOptionSelfCloseInsert`, `OnRspOptionSelfCloseInsert`, `OnRtnOptionSelfClose`

**When to use it**

- Use this entry when the related business flow becomes part of your integration.
- Keep the behavior in mind when modeling retries, reconnection, or reconciliation logic.

**How to apply it**

1. Ensure the API instance is initialized and the session has reached the state required for this request.
2. Fill the request object with the identifiers and business fields expected by the server.
3. Call the API, inspect the local return code, then complete the workflow through later SPI callbacks.

**Prototype**

```cpp
virtual int ReqOptionSelfCloseInsert(CThostFtdcInputOptionSelfCloseField *pInputOptionSelfClose, int nRequestID) = 0;
```

**Parameters**

| Name | Type | Purpose |
| --- | --- | --- |
| `pInputOptionSelfClose` | `CThostFtdcInputOptionSelfCloseField *` | Pointer to the payload object `CThostFtdcInputOptionSelfCloseField *`. |
| `nRequestID` | `int` | Request correlation id provided by the caller. |

**Callback and outcome model**

- Success path: `OnRspOptionSelfCloseInsert`, `OnRtnOptionSelfClose`.
- Error path: `OnErrRtnOptionSelfCloseInsert`.

**Return semantics**

- `0` means the request was accepted by the local API runtime and will continue asynchronously through SPI callbacks.
- `-1` means the client is not in a state where the request can be submitted, typically because the connection is unavailable.
- `-2` means too many outstanding requests remain unprocessed on the local side.
- `-3` means the local request-rate limit was hit and the caller should retry later.

**Usage example**

```cpp
CThostFtdcInputOptionSelfCloseField a = { 0 };
strcpy_s(a.BrokerID, "9999");
strcpy_s(a.InvestorID, "1000001");
strcpy_s(a.InstrumentID, "rb1809");
strcpy_s(a.UserID, "1000001");
a.Volume = 1;
a.HedgeFlag = THOST_FTDC_HF_Speculation;
a.OptSelfCloseFlag = THOST_FTDC_OSCF_CloseSelfOptionPosition;
strcpy_s(a.ExchangeID, "SHFE");
strcpy_s(a.AccountID, "1000001");
strcpy_s(a.CurrencyID, "CNY");
m_pUserApi->ReqOptionSelfCloseInsert(&a, nRequestID++);
```

**Implementation notes**

- Treat the immediate return code and the later callbacks as two different stages of the same business operation.
- Preserve the identifiers sent in the request because later callbacks often reference them instead of your local in-memory object.

## ReqQryCombAction

`ReqQryCombAction` is an asynchronous request entry point used to drive a business operation through the CTP runtime.

- Kind: request
- Owning interface: `CThostFtdcTraderApi`
- Related symbols: `OnRspQryCombAction`

**When to use it**

- Warm up local caches after login.
- Fetch on-demand operational data for UI, reconciliation, or risk checks.

**How to apply it**

1. Ensure the API instance is initialized and the session has reached the state required for this request.
2. Fill the request object with the identifiers and business fields expected by the server.
3. Call the API, inspect the local return code, then complete the workflow through later SPI callbacks.

**Prototype**

```cpp
virtual int ReqQryCombAction(CThostFtdcQryCombActionField *pQryCombAction, int nRequestID) = 0;
```

**Parameters**

| Name | Type | Purpose |
| --- | --- | --- |
| `pQryCombAction` | `CThostFtdcQryCombActionField *` | Pointer to the payload object `CThostFtdcQryCombActionField *`. |
| `nRequestID` | `int` | Request correlation id provided by the caller. |

**Callback and outcome model**

- Success path: `OnRspQryCombAction`.

**Return semantics**

- `0` means the request was accepted by the local API runtime and will continue asynchronously through SPI callbacks.
- `-1` means the client is not in a state where the request can be submitted, typically because the connection is unavailable.
- `-2` means too many outstanding requests remain unprocessed on the local side.
- `-3` means the local request-rate limit was hit and the caller should retry later.

**Usage example**

```cpp
CThostFtdcQryCombActionField a = { 0 };
strcpy(a.BrokerID, "9999");
strcpy(a.InvestorID, "1000001");
strcpy(a.InstrumentID, "rb1809");//
strcpy(a.ExchangeID, "SHFE");
m_pUserApi->ReqQryCombAction(&a, 1);
```

**Implementation notes**

- Treat the immediate return code and the later callbacks as two different stages of the same business operation.
- Preserve the identifiers sent in the request because later callbacks often reference them instead of your local in-memory object.

## ReqQryExecOrder

`ReqQryExecOrder` is an asynchronous request entry point used to drive a business operation through the CTP runtime.

- Kind: request
- Owning interface: `CThostFtdcTraderApi`
- Related symbols: `OnRspQryExecOrder`

**When to use it**

- Warm up local caches after login.
- Fetch on-demand operational data for UI, reconciliation, or risk checks.

**How to apply it**

1. Ensure the API instance is initialized and the session has reached the state required for this request.
2. Fill the request object with the identifiers and business fields expected by the server.
3. Call the API, inspect the local return code, then complete the workflow through later SPI callbacks.

**Prototype**

```cpp
virtual int ReqQryExecOrder(CThostFtdcQryExecOrderField *pQryExecOrder, int nRequestID) = 0;
```

**Parameters**

| Name | Type | Purpose |
| --- | --- | --- |
| `pQryExecOrder` | `CThostFtdcQryExecOrderField *` | Pointer to the payload object `CThostFtdcQryExecOrderField *`. |
| `nRequestID` | `int` | Request correlation id provided by the caller. |

**Callback and outcome model**

- Success path: `OnRspQryExecOrder`.

**Return semantics**

- `0` means the request was accepted by the local API runtime and will continue asynchronously through SPI callbacks.
- `-1` means the client is not in a state where the request can be submitted, typically because the connection is unavailable.
- `-2` means too many outstanding requests remain unprocessed on the local side.
- `-3` means the local request-rate limit was hit and the caller should retry later.

**Usage example**

```cpp
CThostFtdcQryExecOrderField a = { 0 };
strcpy_s(a.BrokerID, "9999");
strcpy_s(a.InvestorID, "1000001");
strcpy_s(a.InstrumentID, "rb1809");
strcpy_s(a.ExchangeID, "SHFE");
m_pUserApi->ReqQryExecOrder(&a, nRequestID++);
```

**Implementation notes**

- Treat the immediate return code and the later callbacks as two different stages of the same business operation.
- Preserve the identifiers sent in the request because later callbacks often reference them instead of your local in-memory object.

## ReqQryOptionSelfClose

`ReqQryOptionSelfClose` is an asynchronous request entry point used to drive a business operation through the CTP runtime.

- Kind: request
- Owning interface: `CThostFtdcTraderApi`
- Related symbols: `OnRspQryOptionSelfClose`

**When to use it**

- Warm up local caches after login.
- Fetch on-demand operational data for UI, reconciliation, or risk checks.

**How to apply it**

1. Ensure the API instance is initialized and the session has reached the state required for this request.
2. Fill the request object with the identifiers and business fields expected by the server.
3. Call the API, inspect the local return code, then complete the workflow through later SPI callbacks.

**Prototype**

```cpp
virtual int ReqQryOptionSelfClose(CThostFtdcQryOptionSelfCloseField *pQryOptionSelfClose, int nRequestID) = 0;
```

**Parameters**

| Name | Type | Purpose |
| --- | --- | --- |
| `pQryOptionSelfClose` | `CThostFtdcQryOptionSelfCloseField *` | Pointer to the payload object `CThostFtdcQryOptionSelfCloseField *`. |
| `nRequestID` | `int` | Request correlation id provided by the caller. |

**Callback and outcome model**

- Success path: `OnRspQryOptionSelfClose`.

**Return semantics**

- `0` means the request was accepted by the local API runtime and will continue asynchronously through SPI callbacks.
- `-1` means the client is not in a state where the request can be submitted, typically because the connection is unavailable.
- `-2` means too many outstanding requests remain unprocessed on the local side.
- `-3` means the local request-rate limit was hit and the caller should retry later.

**Usage example**

```cpp
CThostFtdcQryOptionSelfCloseField a = { 0 };
strcpy_s(a.BrokerID, "9999");
strcpy_s(a.InvestorID, "1000001");
strcpy_s(a.InstrumentID, "rb1809");
strcpy_s(a.ExchangeID, "SHFE");
m_pUserApi->ReqQryOptionSelfClose(&a, nRequestID++);
```

**Implementation notes**

- Treat the immediate return code and the later callbacks as two different stages of the same business operation.
- Preserve the identifiers sent in the request because later callbacks often reference them instead of your local in-memory object.
