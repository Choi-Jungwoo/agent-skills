# CTP market data API subscriptions

This reference covers market-data and for-quote subscription management on the request side.

| Entry | Kind |
| --- | --- |
| SubscribeForQuoteRsp | request |
| SubscribeMarketData | request |
| UnSubscribeForQuoteRsp | request |
| UnSubscribeMarketData | request |

## SubscribeForQuoteRsp

`SubscribeForQuoteRsp` is an asynchronous request entry point used to drive a business operation through the CTP runtime.

- Kind: request
- Owning interface: `CThostFtdcMdApi`
- Related symbols: `OnRspSubForQuoteRsp`, `OnRtnForQuoteRsp`

**When to use it**

- Load a symbol set at startup so live updates start immediately.
- Adjust the subscribed set when the watchlist changes during the session.

**How to apply it**

1. Ensure the API instance is initialized and the session has reached the state required for this request.
2. Fill the request object with the identifiers and business fields expected by the server.
3. Call the API, inspect the local return code, then complete the workflow through later SPI callbacks.

**Prototype**

```cpp
virtual int SubscribeForQuoteRsp(char *ppInstrumentID[], int nCount) = 0;
```

**Parameters**

| Name | Type | Purpose |
| --- | --- | --- |
| `char *ppInstrumentID[]` | `char *ppInstrumentID[]` | Carries the char *pp instrument id[] for the current request or response. |
| `nCount` | `int` | Carries the n count for the current request or response. |

**Callback and outcome model**

- Success path: `OnRspSubForQuoteRsp`, `OnRtnForQuoteRsp`.

**Return semantics**

- `0` means the request was accepted by the local API runtime and will continue asynchronously through SPI callbacks.
- `-1` means the client is not in a state where the request can be submitted, typically because the connection is unavailable.
- `-2` means too many outstanding requests remain unprocessed on the local side.
- `-3` means the local request-rate limit was hit and the caller should retry later.

**Usage example**

```cpp
char **ppInstrumentID = new char*[50];
ppInstrumentID[0] =  sc1801 ;
int result = m_pUserMdApi->SubscribeForQuoteRsp(ppInstrumentID,
1);
```

**Implementation notes**

- Treat the immediate return code and the later callbacks as two different stages of the same business operation.
- Preserve the identifiers sent in the request because later callbacks often reference them instead of your local in-memory object.

## SubscribeMarketData

`SubscribeMarketData` is an asynchronous request entry point used to drive a business operation through the CTP runtime.

- Kind: request
- Owning interface: `CThostFtdcMdApi`
- Related symbols: `OnRspSubMarketData`, `OnRtnDepthMarketData`

**When to use it**

- Load a symbol set at startup so live updates start immediately.
- Adjust the subscribed set when the watchlist changes during the session.

**How to apply it**

1. Ensure the API instance is initialized and the session has reached the state required for this request.
2. Fill the request object with the identifiers and business fields expected by the server.
3. Call the API, inspect the local return code, then complete the workflow through later SPI callbacks.

**Prototype**

```cpp
virtual int SubscribeMarketData(char *ppInstrumentID[], int nCount) = 0;
```

**Parameters**

| Name | Type | Purpose |
| --- | --- | --- |
| `char *ppInstrumentID[]` | `char *ppInstrumentID[]` | Carries the char *pp instrument id[] for the current request or response. |
| `nCount` | `int` | Carries the n count for the current request or response. |

**Callback and outcome model**

- Success path: `OnRspSubMarketData`, `OnRtnDepthMarketData`.

**Return semantics**

- `0` means the request was accepted by the local API runtime and will continue asynchronously through SPI callbacks.
- `-1` means the client is not in a state where the request can be submitted, typically because the connection is unavailable.
- `-2` means too many outstanding requests remain unprocessed on the local side.
- `-3` means the local request-rate limit was hit and the caller should retry later.

**Usage example**

```cpp
char **ppInstrumentID = new char*[50];
ppInstrumentID[0] = "T1712";
m_pUserMdApi->SubscribeMarketData(ppInstrumentID, 1);
```

**Implementation notes**

- Treat the immediate return code and the later callbacks as two different stages of the same business operation.
- Preserve the identifiers sent in the request because later callbacks often reference them instead of your local in-memory object.

## UnSubscribeForQuoteRsp

`UnSubscribeForQuoteRsp` is an asynchronous request entry point used to drive a business operation through the CTP runtime.

- Kind: request
- Owning interface: `CThostFtdcMdApi`
- Related symbols: `OnRspUnSubForQuoteRsp`

**When to use it**

- Load a symbol set at startup so live updates start immediately.
- Adjust the subscribed set when the watchlist changes during the session.

**How to apply it**

1. Ensure the API instance is initialized and the session has reached the state required for this request.
2. Fill the request object with the identifiers and business fields expected by the server.
3. Call the API, inspect the local return code, then complete the workflow through later SPI callbacks.

**Prototype**

```cpp
virtual int UnSubscribeForQuoteRsp(char *ppInstrumentID[], int nCount) = 0;
```

**Parameters**

| Name | Type | Purpose |
| --- | --- | --- |
| `char *ppInstrumentID[]` | `char *ppInstrumentID[]` | Carries the char *pp instrument id[] for the current request or response. |
| `nCount` | `int` | Carries the n count for the current request or response. |

**Callback and outcome model**

- Success path: `OnRspUnSubForQuoteRsp`.

**Return semantics**

- `0` means the request was accepted by the local API runtime and will continue asynchronously through SPI callbacks.
- `-1` means the client is not in a state where the request can be submitted, typically because the connection is unavailable.
- `-2` means too many outstanding requests remain unprocessed on the local side.
- `-3` means the local request-rate limit was hit and the caller should retry later.

**Usage example**

```cpp
char **ppInstrumentID = new char*[50];
ppInstrumentID[0] =  sc1801 ;
m_pUserMdApi->SubscribeForQuoteRsp(ppInstrumentID, 1);
```

**Implementation notes**

- Treat the immediate return code and the later callbacks as two different stages of the same business operation.
- Preserve the identifiers sent in the request because later callbacks often reference them instead of your local in-memory object.

## UnSubscribeMarketData

`UnSubscribeMarketData` is an asynchronous request entry point used to drive a business operation through the CTP runtime.

- Kind: request
- Owning interface: `CThostFtdcMdApi`
- Related symbols: `OnRspUnSubMarketData`

**When to use it**

- Load a symbol set at startup so live updates start immediately.
- Adjust the subscribed set when the watchlist changes during the session.

**How to apply it**

1. Ensure the API instance is initialized and the session has reached the state required for this request.
2. Fill the request object with the identifiers and business fields expected by the server.
3. Call the API, inspect the local return code, then complete the workflow through later SPI callbacks.

**Prototype**

```cpp
virtual int UnSubscribeMarketData(char *ppInstrumentID[], int nCount) = 0;
```

**Parameters**

| Name | Type | Purpose |
| --- | --- | --- |
| `char *ppInstrumentID[]` | `char *ppInstrumentID[]` | Carries the char *pp instrument id[] for the current request or response. |
| `nCount` | `int` | Carries the n count for the current request or response. |

**Callback and outcome model**

- Success path: `OnRspUnSubMarketData`.

**Return semantics**

- `0` means the request was accepted by the local API runtime and will continue asynchronously through SPI callbacks.
- `-1` means the client is not in a state where the request can be submitted, typically because the connection is unavailable.
- `-2` means too many outstanding requests remain unprocessed on the local side.
- `-3` means the local request-rate limit was hit and the caller should retry later.

**Usage example**

```cpp
char **ppInstrumentID = new char*[50];
ppInstrumentID[0] = "T1712";
m_pUserMdApi->UnSubscribeMarketData(ppInstrumentID, 1);
```

**Implementation notes**

- Treat the immediate return code and the later callbacks as two different stages of the same business operation.
- Preserve the identifiers sent in the request because later callbacks often reference them instead of your local in-memory object.
