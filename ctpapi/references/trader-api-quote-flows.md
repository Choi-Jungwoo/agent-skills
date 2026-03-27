# CTP trader API quote and for-quote flows

This reference covers for-quote requests, quote insertion and cancellation, and the query APIs used to inspect quote-side state.

| Entry | Kind |
| --- | --- |
| ReqForQuoteInsert | request |
| ReqQryForQuote | request |
| ReqQryQuote | request |
| ReqQuoteAction | request |
| ReqQuoteInsert | request |

## ReqForQuoteInsert

`ReqForQuoteInsert` is an asynchronous request entry point used to drive a business operation through the CTP runtime.

- Kind: request
- Owning interface: `CThostFtdcTraderApi`
- Related symbols: `OnErrRtnForQuoteInsert`, `OnRspForQuoteInsert`, `OnRtnForQuoteRsp`

**When to use it**

- Use this entry when the related business flow becomes part of your integration.
- Keep the behavior in mind when modeling retries, reconnection, or reconciliation logic.

**How to apply it**

1. Ensure the API instance is initialized and the session has reached the state required for this request.
2. Fill the request object with the identifiers and business fields expected by the server.
3. Call the API, inspect the local return code, then complete the workflow through later SPI callbacks.

**Prototype**

```cpp
virtual int ReqForQuoteInsert(CThostFtdcInputForQuoteField *pInputForQuote, int nRequestID) = 0;
```

**Parameters**

| Name | Type | Purpose |
| --- | --- | --- |
| `pInputForQuote` | `CThostFtdcInputForQuoteField *` | Pointer to the payload object `CThostFtdcInputForQuoteField *`. |
| `nRequestID` | `int` | Request correlation id provided by the caller. |

**Callback and outcome model**

- Success path: `OnRspForQuoteInsert`, `OnRtnForQuoteRsp`.
- Error path: `OnErrRtnForQuoteInsert`.

**Return semantics**

- `0` means the request was accepted by the local API runtime and will continue asynchronously through SPI callbacks.
- `-1` means the client is not in a state where the request can be submitted, typically because the connection is unavailable.
- `-2` means too many outstanding requests remain unprocessed on the local side.
- `-3` means the local request-rate limit was hit and the caller should retry later.

**Usage example**

```cpp
CThostFtdcInputForQuoteField a = { 0 };
strcpy_s(a.BrokerID, "9999");
strcpy_s(a.InvestorID, "1000001");
strcpy_s(a.InstrumentID, "rb1809");
strcpy_s(a.UserID, "1000001");
strcpy_s(a.ExchangeID, "SHFE");
m_pUserApi->ReqForQuoteInsert(&a, nRequestID++);
```

**Implementation notes**

- Treat the immediate return code and the later callbacks as two different stages of the same business operation.
- Preserve the identifiers sent in the request because later callbacks often reference them instead of your local in-memory object.

## ReqQryForQuote

`ReqQryForQuote` is an asynchronous request entry point used to drive a business operation through the CTP runtime.

- Kind: request
- Owning interface: `CThostFtdcTraderApi`
- Related symbols: `OnRspQryForQuote`

**When to use it**

- Warm up local caches after login.
- Fetch on-demand operational data for UI, reconciliation, or risk checks.

**How to apply it**

1. Ensure the API instance is initialized and the session has reached the state required for this request.
2. Fill the request object with the identifiers and business fields expected by the server.
3. Call the API, inspect the local return code, then complete the workflow through later SPI callbacks.

**Prototype**

```cpp
virtual int ReqQryForQuote(CThostFtdcQryForQuoteField *pQryForQuote, int nRequestID) = 0;
```

**Parameters**

| Name | Type | Purpose |
| --- | --- | --- |
| `pQryForQuote` | `CThostFtdcQryForQuoteField *` | Pointer to the payload object `CThostFtdcQryForQuoteField *`. |
| `nRequestID` | `int` | Request correlation id provided by the caller. |

**Callback and outcome model**

- Success path: `OnRspQryForQuote`.

**Return semantics**

- `0` means the request was accepted by the local API runtime and will continue asynchronously through SPI callbacks.
- `-1` means the client is not in a state where the request can be submitted, typically because the connection is unavailable.
- `-2` means too many outstanding requests remain unprocessed on the local side.
- `-3` means the local request-rate limit was hit and the caller should retry later.

**Usage example**

```cpp
CThostFtdcQryForQuoteField qryForQuot = {};
// Fill the required identifiers and business fields before sending the request.
int rc = api->ReqQryForQuote(&qryForQuot, requestId++);
if (rc != 0) {
    // Handle the local submission failure before waiting for callbacks.
}
```

**Implementation notes**

- Treat the immediate return code and the later callbacks as two different stages of the same business operation.
- Preserve the identifiers sent in the request because later callbacks often reference them instead of your local in-memory object.

## ReqQryQuote

`ReqQryQuote` is an asynchronous request entry point used to drive a business operation through the CTP runtime.

- Kind: request
- Owning interface: `CThostFtdcTraderApi`
- Related symbols: `OnRspQryQuote`

**When to use it**

- Warm up local caches after login.
- Fetch on-demand operational data for UI, reconciliation, or risk checks.

**How to apply it**

1. Ensure the API instance is initialized and the session has reached the state required for this request.
2. Fill the request object with the identifiers and business fields expected by the server.
3. Call the API, inspect the local return code, then complete the workflow through later SPI callbacks.

**Prototype**

```cpp
virtual int ReqQryQuote(CThostFtdcQryQuoteField *pQryQuote, int nRequestID) = 0;
```

**Parameters**

| Name | Type | Purpose |
| --- | --- | --- |
| `pQryQuote` | `CThostFtdcQryQuoteField *` | Pointer to the payload object `CThostFtdcQryQuoteField *`. |
| `nRequestID` | `int` | Request correlation id provided by the caller. |

**Callback and outcome model**

- Success path: `OnRspQryQuote`.

**Return semantics**

- `0` means the request was accepted by the local API runtime and will continue asynchronously through SPI callbacks.
- `-1` means the client is not in a state where the request can be submitted, typically because the connection is unavailable.
- `-2` means too many outstanding requests remain unprocessed on the local side.
- `-3` means the local request-rate limit was hit and the caller should retry later.

**Usage example**

```cpp
CThostFtdcQryQuoteField qryQuot = {};
// Fill the required identifiers and business fields before sending the request.
int rc = api->ReqQryQuote(&qryQuot, requestId++);
if (rc != 0) {
    // Handle the local submission failure before waiting for callbacks.
}
```

**Implementation notes**

- Treat the immediate return code and the later callbacks as two different stages of the same business operation.
- Preserve the identifiers sent in the request because later callbacks often reference them instead of your local in-memory object.

## ReqQuoteAction

`ReqQuoteAction` is an asynchronous request entry point used to drive a business operation through the CTP runtime.

- Kind: request
- Owning interface: `CThostFtdcTraderApi`
- Related symbols: `OnRspQuoteAction`, `OnErrRtnQuoteAction`, `OnRtnQuote`, `OnRtnOrder`

**When to use it**

- Use this entry when the related business flow becomes part of your integration.
- Keep the behavior in mind when modeling retries, reconnection, or reconciliation logic.

**How to apply it**

1. Ensure the API instance is initialized and the session has reached the state required for this request.
2. Fill the request object with the identifiers and business fields expected by the server.
3. Call the API, inspect the local return code, then complete the workflow through later SPI callbacks.

**Prototype**

```cpp
virtual int ReqQuoteAction(CThostFtdcInputQuoteActionField *pInputQuoteAction, int nRequestID) = 0;
```

**Parameters**

| Name | Type | Purpose |
| --- | --- | --- |
| `pInputQuoteAction` | `CThostFtdcInputQuoteActionField *` | Pointer to the payload object `CThostFtdcInputQuoteActionField *`. |
| `nRequestID` | `int` | Request correlation id provided by the caller. |

**Callback and outcome model**

- Success path: `OnRspQuoteAction`, `OnRtnQuote`, `OnRtnOrder`.
- Error path: `OnErrRtnQuoteAction`.

**Return semantics**

- `0` means the request was accepted by the local API runtime and will continue asynchronously through SPI callbacks.
- `-1` means the client is not in a state where the request can be submitted, typically because the connection is unavailable.
- `-2` means too many outstanding requests remain unprocessed on the local side.
- `-3` means the local request-rate limit was hit and the caller should retry later.

**Usage example**

```cpp
CThostFtdcInputQuoteActionField t = { 0 };
strcpy_s(t.BrokerID, "9999");
strcpy_s(t.InvestorID, "1000001");
strcpy_s(t.UserID, "1000001");
strcpy_s(t.ExchangeID, "SHFE");
strcpy_s(t.QuoteRef, "           1");
t.FrontID = 1;
t.SessionID = 6442531;
t.ActionFlag = THOST_FTDC_AF_Delete;
strcpy_s(t.InstrumentID, "rb1809");
m_pUserApi->ReqQuoteAction(&t, nRequestID++);
```

**Implementation notes**

- Treat the immediate return code and the later callbacks as two different stages of the same business operation.
- Preserve the identifiers sent in the request because later callbacks often reference them instead of your local in-memory object.

## ReqQuoteInsert

`ReqQuoteInsert` is an asynchronous request entry point used to drive a business operation through the CTP runtime.

- Kind: request
- Owning interface: `CThostFtdcTraderApi`
- Related symbols: `OnRspQuoteInsert`, `OnErrRtnQuoteInsert`, `OnRtnQuote`, `OnRtnOrder`, `OnRtnTrade`, `ReqOrderInsert`

**When to use it**

- Use this entry when the related business flow becomes part of your integration.
- Keep the behavior in mind when modeling retries, reconnection, or reconciliation logic.

**How to apply it**

1. Ensure the API instance is initialized and the session has reached the state required for this request.
2. Fill the request object with the identifiers and business fields expected by the server.
3. Call the API, inspect the local return code, then complete the workflow through later SPI callbacks.

**Prototype**

```cpp
virtual int ReqQuoteInsert(CThostFtdcInputQuoteField *pInputQuote, int nRequestID) = 0;
```

**Parameters**

| Name | Type | Purpose |
| --- | --- | --- |
| `pInputQuote` | `CThostFtdcInputQuoteField *` | Pointer to the payload object `CThostFtdcInputQuoteField *`. |
| `nRequestID` | `int` | Request correlation id provided by the caller. |

**Callback and outcome model**

- Success path: `OnRspQuoteInsert`, `OnRtnQuote`, `OnRtnOrder`, `OnRtnTrade`.
- Error path: `OnErrRtnQuoteInsert`.

**Return semantics**

- `0` means the request was accepted by the local API runtime and will continue asynchronously through SPI callbacks.
- `-1` means the client is not in a state where the request can be submitted, typically because the connection is unavailable.
- `-2` means too many outstanding requests remain unprocessed on the local side.
- `-3` means the local request-rate limit was hit and the caller should retry later.

**Usage example**

```cpp
CThostFtdcInputQuoteField t = { 0 };
strcpy_s(t.BrokerID, "9999");
strcpy_s(t.InvestorID, "1000001");
strcpy_s(t.InstrumentID, "rb1809");
strcpy_s(t.UserID, "1000001");
strcpy_s(t.ExchangeID, "SHFE");
t.AskPrice = 200;
t.BidPrice = 150;
t.AskVolume = 1;
t.BidVolume = 1;
t.AskOffsetFlag = THOST_FTDC_OF_Open;///
t.BidOffsetFlag = THOST_FTDC_OF_Open;///
t.AskHedgeFlag = THOST_FTDC_HF_Hedge;///
t.BidHedgeFlag = THOST_FTDC_HF_Hedge;///
_itoa_s(OrderRef, t.AskOrderRef, 10);///
OrderRef++;
_itoa_s(OrderRef, t.BidOrderRef, 10);///
OrderRef++;
m_pUserApi->ReqQuoteInsert(&t, nRequestID++);
```

**Implementation notes**

- Treat the immediate return code and the later callbacks as two different stages of the same business operation.
- Preserve the identifiers sent in the request because later callbacks often reference them instead of your local in-memory object.
