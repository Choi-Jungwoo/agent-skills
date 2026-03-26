# CTP market data API core runtime

This reference covers the market-data runtime surface, including object creation, lifecycle control, endpoint registration, and core startup behavior.

| Entry | Kind |
| --- | --- |
| Market data interface | topic |
| CThostFtdcMdApi | class |
| CreateFtdcMdApi | factory |
| GetApiVersion | method |
| GetTradingDay | method |
| Init | method |
| Join | method |
| RegisterFensUserInfo | registration |
| RegisterFront | registration |
| RegisterNameServer | registration |
| RegisterSpi | registration |
| Release | method |

## Market data interface

This section explains the rule set, overview, or release topic represented by `Market data interface`.

- Kind: topic
- Related symbols: `CreateFtdcMdApi`, `RegisterSpi`, `RegisterFront`, `Init`, `ReqUserLogin`, `OnRtnDepthMarketData`, `OnRspSubMarketData`, `RegisterNameServer`

**When to use it**

- Review the rule before implementing the related API path.
- Use the topic as a checklist when diagnosing production behavior.

**How to apply it**

1. Read this section before implementing the related integration path.
2. Map the rule or overview to the request and callback symbols affected by it.

**Callback and outcome model**

- Success path: `OnRtnDepthMarketData`, `OnRspSubMarketData`.

**Implementation notes**

- Use this section together with the related request and callback entries so the rules become concrete in code.
- Endpoint discovery through NameServer or FENS changes the startup path, so build the deployment-specific variant explicitly.

## CThostFtdcMdApi

`CThostFtdcMdApi` is the main class for this API surface and anchors the surrounding workflow.

- Kind: class
- Owning interface: `CThostFtdcMdApi`
- Related symbols: `CreateFtdcMdApi`, `GetApiVersion`, `Release`, `Init`, `Join`, `GetTradingDay`, `RegisterFront`, `RegisterNameServer`, `RegisterFensUserInfo`, `RegisterSpi`

**When to use it**

- Use this entry when the related business flow becomes part of your integration.
- Keep the behavior in mind when modeling retries, reconnection, or reconciliation logic.

**How to apply it**

1. Read this section before implementing the related integration path.
2. Map the rule or overview to the request and callback symbols affected by it.

**Prototype**

```cpp
static CThostFtdcMdApi *CreateFtdcMdApi(const char *pszFlowPath = "", const bool bIsUsingUdp=false, const bool bIsMulticast=false, bool bIsProductionMode=true);
```

**Parameters**

| Name | Type | Purpose |
| --- | --- | --- |
| `pszFlowPath` | `const char *` | Carries the psz flow path for the current request or response. |
| `bIsUsingUdp` | `const bool` | Carries the b is using udp for the current request or response. |
| `bIsMulticast` | `const bool` | Carries the b is multicast for the current request or response. |
| `bIsProductionMode` | `bool` | Carries the b is production mode for the current request or response. |

**Usage example**

```cpp
m_mdApi = CThostFtdcMdApi::CreateFtdcMdApi("", true, true);
        m_mdApi->RegisterSpi(this);
        m_mdApi->RegisterFront("tcp://127.0.0.1:41413");
        m_mdApi->Init();
    }
}
```

**Implementation notes**

- Keep the API object alive for the full lifetime of the session and destroy it only after the runtime thread has stopped or the process is shutting down.
- Endpoint discovery through NameServer or FENS changes the startup path, so build the deployment-specific variant explicitly.

## CreateFtdcMdApi

`CreateFtdcMdApi` is a factory entry point that creates the API runtime object before any session logic begins.

- Kind: factory
- Owning interface: `CThostFtdcMdApi`
- Related symbols: `RegisterSpi`, `RegisterFront`, `Init`

**When to use it**

- Use this entry when the related business flow becomes part of your integration.
- Keep the behavior in mind when modeling retries, reconnection, or reconciliation logic.

**How to apply it**

1. Call the factory before any registration or login step.
2. Keep the returned pointer alive for the full session lifetime.
3. Register the SPI and endpoint information before starting the runtime thread.

**Prototype**

```cpp
static CThostFtdcMdApi *CreateFtdcMdApi(const char *pszFlowPath = "", const bool bIsUsingUdp=false, const bool bIsMulticast=false, bool bIsProductionMode=true);
```

**Parameters**

| Name | Type | Purpose |
| --- | --- | --- |
| `pszFlowPath` | `const char *` | Carries the psz flow path for the current request or response. |
| `bIsUsingUdp` | `const bool` | Carries the b is using udp for the current request or response. |
| `bIsMulticast` | `const bool` | Carries the b is multicast for the current request or response. |
| `bIsProductionMode` | `bool` | Carries the b is production mode for the current request or response. |

**Return semantics**

- A non-null pointer means the API object was created successfully.
- A null result means the runtime object could not be created and the client cannot proceed with this API surface.

**Usage example**

```cpp
CThostFtdcMdApi  *pUserMdApi =
CThostFtdcMdApi::CreateFtdcMdApi();
CSimpleMdHandler ash(pUserMdApi);
pUserMdApi->RegisterSpi(&ash);
pUserMdApi->RegisterFront( tcp://127.0.0.1:41205 );
pUserMdApi->Init();
```

**Implementation notes**

- Keep the API object alive for the full lifetime of the session and destroy it only after the runtime thread has stopped or the process is shutting down.

## GetApiVersion

`GetApiVersion` is a direct lifecycle method that acts immediately and does not depend on the asynchronous request pipeline.

- Kind: method
- Owning interface: `CThostFtdcMdApi`
- Related symbols: `CreateFtdcMdApi`, `RegisterSpi`, `RegisterFront`, `Init`

**When to use it**

- Use this entry when the related business flow becomes part of your integration.
- Keep the behavior in mind when modeling retries, reconnection, or reconciliation logic.

**How to apply it**

1. Call the method only when the lifecycle state makes sense for it.
2. Use the returned value or side effect immediately in the surrounding startup or shutdown flow.

**Prototype**

```cpp
virtual const char * GetApiVersion () = 0;
```

**Return semantics**

- The return value is produced synchronously and can be used immediately by the caller.

**Usage example**

```cpp
CThostFtdcMdApi  *pUserMdApi =
CThostFtdcMdApi::CreateFtdcMdApi();
printf("      :%s\n", pUserMdApi->GetApiVersion());
CSimpleMdHandler ash(pUserMdApi);
pUserMdApi->RegisterSpi(&ash);
pUserMdApi->RegisterFront( tcp://127.0.0.1:41205 );
pUserMdApi->Init();
```

**Implementation notes**

- Use this section together with the related request and callback entries so the rules become concrete in code.

## GetTradingDay

`GetTradingDay` is a direct lifecycle method that acts immediately and does not depend on the asynchronous request pipeline.

- Kind: method
- Owning interface: `CThostFtdcMdApi`
- Related symbols: `CreateFtdcMdApi`, `RegisterSpi`, `RegisterFront`, `Init`

**When to use it**

- Use this entry when the related business flow becomes part of your integration.
- Keep the behavior in mind when modeling retries, reconnection, or reconciliation logic.

**How to apply it**

1. Call the method only when the lifecycle state makes sense for it.
2. Use the returned value or side effect immediately in the surrounding startup or shutdown flow.

**Prototype**

```cpp
virtual const char *GetTradingDay() = 0;
```

**Return semantics**

- The return value is produced synchronously and can be used immediately by the caller.

**Usage example**

```cpp
CThostFtdcMdApi  *pUserMdApi =
CThostFtdcMdApi::CreateFtdcMdApi();
CSimpleMdHandler ash(pUserMdApi);
pUserMdApi->RegisterSpi(&ash);
pUserMdApi->RegisterFront( tcp://127.0.0.1:41213 );
pUserMdApi->Init();
```

**Implementation notes**

- Use this section together with the related request and callback entries so the rules become concrete in code.

## Init

`Init` is a direct lifecycle method that acts immediately and does not depend on the asynchronous request pipeline.

- Kind: method
- Owning interface: `CThostFtdcMdApi`
- Related symbols: `CreateFtdcMdApi`, `RegisterSpi`, `RegisterFront`

**When to use it**

- Use this entry when the related business flow becomes part of your integration.
- Keep the behavior in mind when modeling retries, reconnection, or reconciliation logic.

**How to apply it**

1. Call the method only when the lifecycle state makes sense for it.
2. Use the returned value or side effect immediately in the surrounding startup or shutdown flow.

**Prototype**

```cpp
virtual void Init() = 0;
```

**Usage example**

```cpp
CThostFtdcMdApi  *pUserMdApi =
CThostFtdcMdApi::CreateFtdcMdApi();
CSimpleMdHandler ash(pUserMdApi);
pUserMdApi->RegisterSpi(&ash);
pUserMdApi->RegisterFront( tcp://127.0.0.1:41205 );
pUserMdApi->Init();
```

**Implementation notes**

- Use this section together with the related request and callback entries so the rules become concrete in code.

## Join

`Join` is a direct lifecycle method that acts immediately and does not depend on the asynchronous request pipeline.

- Kind: method
- Owning interface: `CThostFtdcMdApi`

**When to use it**

- Use this entry when the related business flow becomes part of your integration.
- Keep the behavior in mind when modeling retries, reconnection, or reconciliation logic.

**How to apply it**

1. Call the method only when the lifecycle state makes sense for it.
2. Use the returned value or side effect immediately in the surrounding startup or shutdown flow.

**Prototype**

```cpp
virtual int Join() = 0;
```

**Return semantics**

- The integer result is the completion code of the internal runtime thread.

**Usage example**

```cpp
auto value = api->Join();
// Continue with the next lifecycle step only after the runtime is in the correct state.
```

**Implementation notes**

- Use this section together with the related request and callback entries so the rules become concrete in code.

## RegisterFensUserInfo

`RegisterFensUserInfo` is a synchronous configuration method that must be called at the right point in the startup sequence.

- Kind: registration
- Owning interface: `CThostFtdcMdApi`
- Related symbols: `RegisterNameServer`, `CreateFtdcMdApi`, `RegisterSpi`, `Init`

**When to use it**

- Use this entry when the related business flow becomes part of your integration.
- Keep the behavior in mind when modeling retries, reconnection, or reconciliation logic.

**How to apply it**

1. Call the registration method before `Init` so the runtime starts with the intended configuration.
2. Apply the value only after choosing the correct front, NameServer, or session policy.
3. Keep the registration order deterministic to avoid startup races.

**Prototype**

```cpp
virtual void RegisterFensUserInfo(CThostFtdcFensUserInfoField * pFensUserInfo) = 0;
```

**Parameters**

| Name | Type | Purpose |
| --- | --- | --- |
| `pFensUserInfo` | `CThostFtdcFensUserInfoField *` | Pointer to the payload object `CThostFtdcFensUserInfoField *`. |

**Field guide for `CThostFtdcFensUserInfoField`**

| Field | Type | Purpose |
| --- | --- | --- |
| `BrokerID` | `TThostFtdcBrokerIDType` | Broker code that scopes the request or identifies the response owner. |
| `UserID` | `TThostFtdcUserIDType` | User code associated with the current login identity. |
| `LoginMode` | `TThostFtdcLoginModeType` | Mode used when resolving the login endpoint. |

**Structure layout**

```cpp
struct CThostFtdcFensUserInfoField
{

TThostFtdcBrokerIDType BrokerID;

TThostFtdcUserIDType UserID;

TThostFtdcLoginModeType LoginMode;
};
```

**Usage example**

```cpp
CThostFtdcMdApi  *pUserMdApi =
CThostFtdcMdApi::CreateFtdcMdApi();
CSimpleMdHandler ash(pUserMdApi);
pUserMdApi->RegisterSpi(&ash);
CThostFtdcFensUserInfoField pFensUserInfo = { 0 };
strcpy_s(pFensUserInfo.BrokerID, "9999");
strcpy_s(pFensUserInfo.UserID, "00001");
pFensUserInfo.LoginMode = THOST_FTDC_LM_Trade;
pUserMdApi->RegisterFensUserInfo(&pFensUserInfo);
pUserMdApi-> RegisterNameServer ("tcp://127.0.0.1:41213");
pUserMdApi->Init();
```

**Implementation notes**

- Use this section together with the related request and callback entries so the rules become concrete in code.
- Endpoint discovery through NameServer or FENS changes the startup path, so build the deployment-specific variant explicitly.

## RegisterFront

`RegisterFront` is a synchronous configuration method that must be called at the right point in the startup sequence.

- Kind: registration
- Owning interface: `CThostFtdcMdApi`
- Related symbols: `CreateFtdcMdApi`, `RegisterSpi`, `Init`

**When to use it**

- Use this entry when the related business flow becomes part of your integration.
- Keep the behavior in mind when modeling retries, reconnection, or reconciliation logic.

**How to apply it**

1. Call the registration method before `Init` so the runtime starts with the intended configuration.
2. Apply the value only after choosing the correct front, NameServer, or session policy.
3. Keep the registration order deterministic to avoid startup races.

**Prototype**

```cpp
virtual void RegisterFront(char *pszFrontAddress) = 0;
```

**Parameters**

| Name | Type | Purpose |
| --- | --- | --- |
| `pszFrontAddress` | `char *` | Carries the psz front address for the current request or response. |

**Usage example**

```cpp
CThostFtdcMdApi  *pUserMdApi =
CThostFtdcMdApi::CreateFtdcMdApi();
CSimpleMdHandler ash(pUserMdApi);
pUserMdApi->RegisterSpi(&ash);
```

**Implementation notes**

- Use this section together with the related request and callback entries so the rules become concrete in code.

## RegisterNameServer

`RegisterNameServer` is a synchronous configuration method that must be called at the right point in the startup sequence.

- Kind: registration
- Owning interface: `CThostFtdcMdApi`
- Related symbols: `RegisterFront`, `RegisterFensUserInfo`, `CreateFtdcMdApi`, `RegisterSpi`, `Init`

**When to use it**

- Use this entry when the related business flow becomes part of your integration.
- Keep the behavior in mind when modeling retries, reconnection, or reconciliation logic.

**How to apply it**

1. Call the registration method before `Init` so the runtime starts with the intended configuration.
2. Apply the value only after choosing the correct front, NameServer, or session policy.
3. Keep the registration order deterministic to avoid startup races.

**Prototype**

```cpp
virtual void RegisterNameServer(char *pszNsAddress) = 0;
```

**Parameters**

| Name | Type | Purpose |
| --- | --- | --- |
| `pszNsAddress` | `char *` | Carries the psz ns address for the current request or response. |

**Usage example**

```cpp
CThostFtdcMdApi  *pUserMdApi =
CThostFtdcMdApi::CreateFtdcMdApi();
CSimpleMdHandler ash(pUserMdApi);
pUserMdApi->RegisterSpi(&ash);
CThostFtdcFensUserInfoField pFensUserInfo = { 0 };
strcpy_s(pFensUserInfo.BrokerID, g_chBrokerID);
strcpy_s(pFensUserInfo.UserID, g_chUserID);
pFensUserInfo.LoginMode = THOST_FTDC_LM_Trade;
pUserMdApi->RegisterFensUserInfo(&pFensUserInfo,
nRequestID++);
pUserMdApi->RegisterNameServer ( tcp://127.0.0.1:41205 );
pUserMdApi->Init();
```

**Implementation notes**

- Use this section together with the related request and callback entries so the rules become concrete in code.
- Endpoint discovery through NameServer or FENS changes the startup path, so build the deployment-specific variant explicitly.

## RegisterSpi

`RegisterSpi` is a synchronous configuration method that must be called at the right point in the startup sequence.

- Kind: registration
- Owning interface: `CThostFtdcMdApi`

**When to use it**

- Use this entry when the related business flow becomes part of your integration.
- Keep the behavior in mind when modeling retries, reconnection, or reconciliation logic.

**How to apply it**

1. Call the registration method before `Init` so the runtime starts with the intended configuration.
2. Apply the value only after choosing the correct front, NameServer, or session policy.
3. Keep the registration order deterministic to avoid startup races.

**Prototype**

```cpp
virtual void RegisterSpi(CThostFtdcMdSpi *pSpi) = 0;
```

**Parameters**

| Name | Type | Purpose |
| --- | --- | --- |
| `pSpi` | `CThostFtdcMdSpi *` | Pointer to the payload object `CThostFtdcMdSpi *`. |

**Usage example**

```cpp
api->RegisterSpi(pSpi);
// Continue with the next lifecycle step only after the runtime is in the correct state.
```

**Implementation notes**

- Use this section together with the related request and callback entries so the rules become concrete in code.

## Release

`Release` is a direct lifecycle method that acts immediately and does not depend on the asynchronous request pipeline.

- Kind: method
- Owning interface: `CThostFtdcMdApi`

**When to use it**

- Use this entry when the related business flow becomes part of your integration.
- Keep the behavior in mind when modeling retries, reconnection, or reconciliation logic.

**How to apply it**

1. Call the method only when the lifecycle state makes sense for it.
2. Use the returned value or side effect immediately in the surrounding startup or shutdown flow.

**Prototype**

```cpp
virtual void Release() = 0;
```

**Usage example**

```cpp
auto value = api->Release();
// Continue with the next lifecycle step only after the runtime is in the correct state.
```

**Implementation notes**

- Use this section together with the related request and callback entries so the rules become concrete in code.
