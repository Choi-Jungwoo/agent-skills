# CTP trader API login and topic session control

This reference covers the standard trader login/logout flow and the private/public topic subscription mode that shapes replay behavior after startup.

| Entry | Kind |
| --- | --- |
| ReqUserLogin | request |
| ReqUserLogout | request |
| SubscribePrivateTopic | registration |
| SubscribePublicTopic | registration |

## ReqUserLogin

`ReqUserLogin` is an asynchronous request entry point used to drive a business operation through the CTP runtime.

- Kind: request
- Owning interface: `CThostFtdcTraderApi`
- Related symbols: `OnRspUserLogin`, `ReqUserPasswordUpdate`

**When to use it**

- Establish a fresh authenticated session before any trading or market-data work.
- Recover after a disconnect and rebuild client-side session state.

**How to apply it**

1. Ensure the API instance is initialized and the session has reached the state required for this request.
2. Fill the request object with the identifiers and business fields expected by the server.
3. Call the API, inspect the local return code, then complete the workflow through later SPI callbacks.

**Prototype**

```cpp
virtual int ReqUserLogin(CThostFtdcReqUserLoginField *pReqUserLoginField, int nRequestID) = 0;
```

**Parameters**

| Name | Type | Purpose |
| --- | --- | --- |
| `pReqUserLoginField` | `CThostFtdcReqUserLoginField *` | Pointer to the request object `CThostFtdcReqUserLoginField *`. |
| `nRequestID` | `int` | Request correlation id provided by the caller. |

**Callback and outcome model**

- Success path: `OnRspUserLogin`.

**Return semantics**

- `0` means the request was accepted by the local API runtime and will continue asynchronously through SPI callbacks.
- `-1` means the client is not in a state where the request can be submitted, typically because the connection is unavailable.
- `-2` means too many outstanding requests remain unprocessed on the local side.
- `-3` means the local request-rate limit was hit and the caller should retry later.

**Usage example**

```cpp
CThostFtdcReqUserLoginField reqUserLogin = { 0 };
strcpy_s(reqUserLogin.BrokerID,  0000 );
strcpy_s(reqUserLogin.UserID,  00001 );
strcpy_s(reqUserLogin.Password,  123456 );
m_pUserApi->ReqUserLogin(&reqUserLogin, nRequestID++);
```

**Implementation notes**

- Treat the immediate return code and the later callbacks as two different stages of the same business operation.
- Preserve the identifiers sent in the request because later callbacks often reference them instead of your local in-memory object.

## ReqUserLogout

`ReqUserLogout` is an asynchronous request entry point used to drive a business operation through the CTP runtime.

- Kind: request
- Owning interface: `CThostFtdcTraderApi`
- Related symbols: `OnRspUserLogout`

**When to use it**

- End the current user session cleanly during shutdown.
- Release server-side session state before switching identities.

**How to apply it**

1. Ensure the API instance is initialized and the session has reached the state required for this request.
2. Fill the request object with the identifiers and business fields expected by the server.
3. Call the API, inspect the local return code, then complete the workflow through later SPI callbacks.

**Prototype**

```cpp
virtual int ReqUserLogout(CThostFtdcUserLogoutField *pUserLogout, int nRequestID) = 0;
```

**Parameters**

| Name | Type | Purpose |
| --- | --- | --- |
| `pUserLogout` | `CThostFtdcUserLogoutField *` | Pointer to the payload object `CThostFtdcUserLogoutField *`. |
| `nRequestID` | `int` | Request correlation id provided by the caller. |

**Callback and outcome model**

- Success path: `OnRspUserLogout`.

**Return semantics**

- `0` means the request was accepted by the local API runtime and will continue asynchronously through SPI callbacks.
- `-1` means the client is not in a state where the request can be submitted, typically because the connection is unavailable.
- `-2` means too many outstanding requests remain unprocessed on the local side.
- `-3` means the local request-rate limit was hit and the caller should retry later.

**Usage example**

```cpp
CThostFtdcUserLogoutField a = { 0 };
strcpy_s(a.BrokerID, "9999");
strcpy_s(a.UserID, "1000001");
m_pUserApi->ReqUserLogout(&a, nRequestID++);
```

**Implementation notes**

- Treat the immediate return code and the later callbacks as two different stages of the same business operation.
- Preserve the identifiers sent in the request because later callbacks often reference them instead of your local in-memory object.

## SubscribePrivateTopic

`SubscribePrivateTopic` is an asynchronous request entry point used to drive a business operation through the CTP runtime.

- Kind: request
- Owning interface: `CThostFtdcTraderApi`
- Related symbols: `Init`, `CreateFtdcTraderApi`, `RegisterSpi`, `SubscribePublicTopic`, `RegisterFront`

**When to use it**

- Load a symbol set at startup so live updates start immediately.
- Adjust the subscribed set when the watchlist changes during the session.

**How to apply it**

1. Ensure the API instance is initialized and the session has reached the state required for this request.
2. Fill the request object with the identifiers and business fields expected by the server.
3. Call the API, inspect the local return code, then complete the workflow through later SPI callbacks.

**Prototype**

```cpp
virtual void SubscribePrivateTopic(THOST_TE_RESUME_TYPE nResumeType) = 0;
```

**Parameters**

| Name | Type | Purpose |
| --- | --- | --- |
| `nResumeType` | `THOST_TE_RESUME_TYPE` | Carries the n resume type for the current request or response. |

**Return semantics**

- `0` means the request was accepted by the local API runtime and will continue asynchronously through SPI callbacks.
- `-1` means the client is not in a state where the request can be submitted, typically because the connection is unavailable.
- `-2` means too many outstanding requests remain unprocessed on the local side.
- `-3` means the local request-rate limit was hit and the caller should retry later.

**Usage example**

```cpp
CThostFtdcTraderApi *pUserApi =
CThostFtdcTraderApi::CreateFtdcTraderApi("F:\\flow\\");
CSimpleHandler sh(pUserApi);
pUserApi->RegisterSpi(&sh);
pUserApi->SubscribePrivateTopic(THOST_TERT_RESTART);
pUserApi->SubscribePublicTopic(THOST_TERT_RESTART);
pUserApi->RegisterFront( tcp://127.0.0.1:51205 );
pUserApi->Init();
```

**Implementation notes**

- Treat the immediate return code and the later callbacks as two different stages of the same business operation.
- Preserve the identifiers sent in the request because later callbacks often reference them instead of your local in-memory object.

## SubscribePublicTopic

`SubscribePublicTopic` is an asynchronous request entry point used to drive a business operation through the CTP runtime.

- Kind: request
- Owning interface: `CThostFtdcTraderApi`
- Related symbols: `Init`, `CreateFtdcTraderApi`, `RegisterSpi`, `SubscribePrivateTopic`, `RegisterFront`

**When to use it**

- Load a symbol set at startup so live updates start immediately.
- Adjust the subscribed set when the watchlist changes during the session.

**How to apply it**

1. Ensure the API instance is initialized and the session has reached the state required for this request.
2. Fill the request object with the identifiers and business fields expected by the server.
3. Call the API, inspect the local return code, then complete the workflow through later SPI callbacks.

**Prototype**

```cpp
virtual void SubscribePublicTopic(THOST_TE_RESUME_TYPE nResumeType) = 0;
```

**Parameters**

| Name | Type | Purpose |
| --- | --- | --- |
| `nResumeType` | `THOST_TE_RESUME_TYPE` | Carries the n resume type for the current request or response. |

**Return semantics**

- `0` means the request was accepted by the local API runtime and will continue asynchronously through SPI callbacks.
- `-1` means the client is not in a state where the request can be submitted, typically because the connection is unavailable.
- `-2` means too many outstanding requests remain unprocessed on the local side.
- `-3` means the local request-rate limit was hit and the caller should retry later.

**Usage example**

```cpp
CThostFtdcTraderApi *pUserApi =
CThostFtdcTraderApi::CreateFtdcTraderApi("F:\\flow\\");
CSimpleHandler sh(pUserApi);
pUserApi->RegisterSpi(&sh);
pUserApi->SubscribePrivateTopic(THOST_TERT_RESUME);
pUserApi->SubscribePublicTopic(THOST_TERT_RESUME);
pUserApi->RegisterFront("tcp://127.0.0.1:51205");
pUserApi->Init();
```

**Implementation notes**

- Treat the immediate return code and the later callbacks as two different stages of the same business operation.
- Preserve the identifiers sent in the request because later callbacks often reference them instead of your local in-memory object.
