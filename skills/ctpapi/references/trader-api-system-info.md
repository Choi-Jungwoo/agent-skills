# CTP trader API system information and password updates

This reference covers user system information registration and submission, WeChat-specific system information, and password update paths.

| Entry | Kind |
| --- | --- |
| RegisterUserSystemInfo | registration |
| ReqTradingAccountPasswordUpdate | request |
| ReqUserPasswordUpdate | request |
| SubmitUserSystemInfo | request |
| RegisterWechatUserSystemInfo | registration |
| SubmitWechatUserSystemInfo | request |

## RegisterUserSystemInfo

`RegisterUserSystemInfo` is a synchronous configuration method that must be called at the right point in the startup sequence.

- Kind: registration
- Owning interface: `CThostFtdcTraderApi`
- Related symbols: `ReqAuthenticate`, `ReqUserLogin`

**When to use it**

- Use this entry when the related business flow becomes part of your integration.
- Keep the behavior in mind when modeling retries, reconnection, or reconciliation logic.

**How to apply it**

1. Call the registration method before `Init` so the runtime starts with the intended configuration.
2. Apply the value only after choosing the correct front, NameServer, or session policy.
3. Keep the registration order deterministic to avoid startup races.

**Prototype**

```cpp
virtual int RegisterUserSystemInfo(CThostFtdcUserSystemInfoField *pUserSystemInfo) = 0;
```

**Parameters**

| Name | Type | Purpose |
| --- | --- | --- |
| `pUserSystemInfo` | `CThostFtdcUserSystemInfoField *` | Pointer to the payload object `CThostFtdcUserSystemInfoField *`. |

**Usage example**

```cpp
char pSystemInfo[344];
int len;
CTP_GetSystemInfo(pSystemInfo, len);
```

**Implementation notes**

- Use this section together with the related request and callback entries so the rules become concrete in code.

## ReqTradingAccountPasswordUpdate

`ReqTradingAccountPasswordUpdate` is an asynchronous request entry point used to drive a business operation through the CTP runtime.

- Kind: request
- Owning interface: `CThostFtdcTraderApi`
- Related symbols: `OnRspTradingAccountPasswordUpdate`

**When to use it**

- Use this entry when the related business flow becomes part of your integration.
- Keep the behavior in mind when modeling retries, reconnection, or reconciliation logic.

**How to apply it**

1. Ensure the API instance is initialized and the session has reached the state required for this request.
2. Fill the request object with the identifiers and business fields expected by the server.
3. Call the API, inspect the local return code, then complete the workflow through later SPI callbacks.

**Prototype**

```cpp
virtual int ReqTradingAccountPasswordUpdate(CThostFtdcTradingAccountPasswo rdUpdateField *pTradingAccountPasswordUpdate, int nRequestID) = 0;
```

**Parameters**

| Name | Type | Purpose |
| --- | --- | --- |
| `pTradingAccountPasswordUpdate` | `CThostFtdcTradingAccountPasswo rdUpdateField *` | Pointer to the payload object `CThostFtdcTradingAccountPasswo rdUpdateField *`. |
| `nRequestID` | `int` | Request correlation id provided by the caller. |

**Callback and outcome model**

- Success path: `OnRspTradingAccountPasswordUpdate`.

**Return semantics**

- `0` means the request was accepted by the local API runtime and will continue asynchronously through SPI callbacks.
- `-1` means the client is not in a state where the request can be submitted, typically because the connection is unavailable.
- `-2` means too many outstanding requests remain unprocessed on the local side.
- `-3` means the local request-rate limit was hit and the caller should retry later.

**Usage example**

```cpp
CThostFtdcTradingAccountPasswordUpdateField a = { 0 };
strcpy_s(a.BrokerID, "9999");
strcpy_s(a.AccountID, "1000001");
strcpy_s(a.OldPassword, "123456");
strcpy_s(a.NewPassword, "666666");
strcpy_s(a.CurrencyID, "CNY");
m_pUserApi->ReqTradingAccountPasswordUpdate(&a,
nRequestID++);
```

**Implementation notes**

- Treat the immediate return code and the later callbacks as two different stages of the same business operation.
- Preserve the identifiers sent in the request because later callbacks often reference them instead of your local in-memory object.

## ReqUserPasswordUpdate

`ReqUserPasswordUpdate` is an asynchronous request entry point used to drive a business operation through the CTP runtime.

- Kind: request
- Owning interface: `CThostFtdcTraderApi`
- Related symbols: `OnRspUserPasswordUpdate`

**When to use it**

- Use this entry when the related business flow becomes part of your integration.
- Keep the behavior in mind when modeling retries, reconnection, or reconciliation logic.

**How to apply it**

1. Ensure the API instance is initialized and the session has reached the state required for this request.
2. Fill the request object with the identifiers and business fields expected by the server.
3. Call the API, inspect the local return code, then complete the workflow through later SPI callbacks.

**Prototype**

```cpp
virtual int ReqUserPasswordUpdate(CThostFtdcUserPasswordUpdateField *pUserPasswordUpdate, int nRequestID) = 0;
```

**Parameters**

| Name | Type | Purpose |
| --- | --- | --- |
| `pUserPasswordUpdate` | `CThostFtdcUserPasswordUpdateField *` | Pointer to the payload object `CThostFtdcUserPasswordUpdateField *`. |
| `nRequestID` | `int` | Request correlation id provided by the caller. |

**Callback and outcome model**

- Success path: `OnRspUserPasswordUpdate`.

**Return semantics**

- `0` means the request was accepted by the local API runtime and will continue asynchronously through SPI callbacks.
- `-1` means the client is not in a state where the request can be submitted, typically because the connection is unavailable.
- `-2` means too many outstanding requests remain unprocessed on the local side.
- `-3` means the local request-rate limit was hit and the caller should retry later.

**Usage example**

```cpp
CThostFtdcUserPasswordUpdateField a = { 0 };
strcpy_s(a.BrokerID, "9999");
strcpy_s(a.UserID, "1000001");
strcpy_s(a.OldPassword, "123456");
strcpy_s(a.NewPassword, "666666");
m_pUserApi->ReqUserPasswordUpdate(&a, nRequestID++);
```

**Implementation notes**

- Treat the immediate return code and the later callbacks as two different stages of the same business operation.
- Preserve the identifiers sent in the request because later callbacks often reference them instead of your local in-memory object.

## SubmitUserSystemInfo

`SubmitUserSystemInfo` is a direct lifecycle method that acts immediately and does not depend on the asynchronous request pipeline.

- Kind: method
- Owning interface: `CThostFtdcTraderApi`

**When to use it**

- Use this entry when the related business flow becomes part of your integration.
- Keep the behavior in mind when modeling retries, reconnection, or reconciliation logic.

**How to apply it**

1. Call the method only when the lifecycle state makes sense for it.
2. Use the returned value or side effect immediately in the surrounding startup or shutdown flow.

**Prototype**

```cpp
virtual int SubmitUserSystemInfo(CThostFtdcUserSystemInfoField *pUserSystemInfo) = 0;
```

**Parameters**

| Name | Type | Purpose |
| --- | --- | --- |
| `pUserSystemInfo` | `CThostFtdcUserSystemInfoField *` | Pointer to the payload object `CThostFtdcUserSystemInfoField *`. |

**Usage example**

```cpp
char pSystemInfo[344];
  int len;
  CTP_GetSystemInfo(pSystemInfo, len);
  CThostFtdcUserSystemInfoField field1;
  memset(&field1, 0, sizeof(field));
  strcpy(field1.BrokerID, "9999");
  strcpy(field1.UserID, "00001");
  memcpy(field1.ClientSystemInfo, pSystemInfo, len);
  field1.ClientSystemInfoLen = len;
  strcpy(field1.ClientPublicIP, "127.0.0.1");
  field1.ClientIPPort = 65535;
  strcpy(field1.ClientLoginTime, "11:28:28");
  strcpy(field1.ClientAppID, "Q7");
  m_pUserApi->SubmitUserSystemInfo(&field1);
```

**Implementation notes**

- Use this section together with the related request and callback entries so the rules become concrete in code.

## RegisterWechatUserSystemInfo

`RegisterWechatUserSystemInfo` is a synchronous configuration method that must be called at the right point in the startup sequence.

- Kind: registration
- Owning interface: `CThostFtdcTraderApi`

**When to use it**

- Use this entry when the related business flow becomes part of your integration.
- Keep the behavior in mind when modeling retries, reconnection, or reconciliation logic.

**How to apply it**

1. Call the registration method before `Init` so the runtime starts with the intended configuration.
2. Apply the value only after choosing the correct front, NameServer, or session policy.
3. Keep the registration order deterministic to avoid startup races.

**Prototype**

```cpp
virtual int RegisterWechatUserSystemInfo(CThostFtdcWechatUserSystemInfoField *pUserSystemInfo) = 0;
```

**Parameters**

| Name | Type | Purpose |
| --- | --- | --- |
| `pUserSystemInfo` | `CThostFtdcWechatUserSystemInfoField *` | Pointer to the payload object `CThostFtdcWechatUserSystemInfoField *`. |

**Usage example**

```cpp
api->RegisterWechatUserSystemInfo(pUserSystemInfo);
// Continue with the next lifecycle step only after the runtime is in the correct state.
```

**Implementation notes**

- Use this section together with the related request and callback entries so the rules become concrete in code.

## SubmitWechatUserSystemInfo

`SubmitWechatUserSystemInfo` is a direct lifecycle method that acts immediately and does not depend on the asynchronous request pipeline.

- Kind: method
- Owning interface: `CThostFtdcTraderApi`

**When to use it**

- Use this entry when the related business flow becomes part of your integration.
- Keep the behavior in mind when modeling retries, reconnection, or reconciliation logic.

**How to apply it**

1. Call the method only when the lifecycle state makes sense for it.
2. Use the returned value or side effect immediately in the surrounding startup or shutdown flow.

**Prototype**

```cpp
virtual int SubmitWechatUserSystemInfo(CThostFtdcWechatUserSystemInfoField *pUserSystemInfo) = 0;
```

**Parameters**

| Name | Type | Purpose |
| --- | --- | --- |
| `pUserSystemInfo` | `CThostFtdcWechatUserSystemInfoField *` | Pointer to the payload object `CThostFtdcWechatUserSystemInfoField *`. |

**Usage example**

```cpp
api->SubmitWechatUserSystemInfo(pUserSystemInfo);
// Continue with the next lifecycle step only after the runtime is in the correct state.
```

**Implementation notes**

- Use this section together with the related request and callback entries so the rules become concrete in code.
