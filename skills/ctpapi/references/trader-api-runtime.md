# CTP trader API runtime and startup

This reference covers trader-side object creation, lifecycle control, endpoint registration, and the runtime startup sequence.

| Entry | Kind |
| --- | --- |
| Trader interface | topic |
| CThostFtdcTraderApi | class |
| CreateFtdcTraderApi | factory |
| GetApiVersion | method |
| GetTradingDay | method |
| GetFrontInfo | method |
| Init | method |
| Join | method |
| RegisterFensUserInfo | registration |
| RegisterFront | registration |
| RegisterNameServer | registration |
| RegisterSpi | registration |
| Release | method |

## Trader interface

This section explains the rule set, overview, or release topic represented by `Trader interface`.

- Kind: topic
- Related symbols: `CreateFtdcTraderApi`, `RegisterSpi`, `SubscribePublicTopic`, `SubscribePrivateTopic`, `RegisterFront`, `Init`, `GetApiVersion`, `Release`, `ReqUserLogin`, `ReqSettlementInfoConfirm`

**When to use it**

- Review the rule before implementing the related API path.
- Use the topic as a checklist when diagnosing production behavior.

**How to apply it**

1. Read this section before implementing the related integration path.
2. Map the rule or overview to the request and callback symbols affected by it.

**Callback and outcome model**

- Success path: `OnRspUserLogin`, `OnRspSettlementInfoConfirm`, `OnRspQryInstrument`, `OnRtnOrder`, `OnRtnTrade`, `OnRspOrderInsert`, `OnRspError`.
- Error path: `OnRspError`.

**Implementation notes**

- Use this section together with the related request and callback entries so the rules become concrete in code.
- Endpoint discovery through NameServer or FENS changes the startup path, so build the deployment-specific variant explicitly.

## CThostFtdcTraderApi

`CThostFtdcTraderApi` is the main class for this API surface and anchors the surrounding workflow.

- Kind: class
- Owning interface: `CThostFtdcTraderApi`
- Related symbols: `CreateFtdcTraderApi`, `GetApiVersion`, `Release`, `Init`, `Join`, `GetTradingDay`, `GetFrontInfo`, `RegisterFront`, `RegisterNameServer`, `RegisterFensUserInfo`

**When to use it**

- Use this entry when the related business flow becomes part of your integration.
- Keep the behavior in mind when modeling retries, reconnection, or reconciliation logic.

**How to apply it**

1. Read this section before implementing the related integration path.
2. Map the rule or overview to the request and callback symbols affected by it.

**Prototype**

```cpp
static CThostFtdcTraderApi *CreateFtdcTraderApi(const char *pszFlowPath = "", bool bIsProductionMode = true);
```

**Parameters**

| Name | Type | Purpose |
| --- | --- | --- |
| `pszFlowPath` | `const char *` | Carries the psz flow path for the current request or response. |
| `bIsProductionMode` | `bool` | Carries the b is production mode for the current request or response. |

**Usage example**

```cpp
m_ptraderapi->RegisterSpi(this);
      m_ptraderapi->SubscribePublicTopic(THOST_TERT_QUICK);
      m_ptraderapi->SubscribePrivateTopic(THOST_TERT_QUICK); //
```

**Implementation notes**

- Keep the API object alive for the full lifetime of the session and destroy it only after the runtime thread has stopped or the process is shutting down.
- Endpoint discovery through NameServer or FENS changes the startup path, so build the deployment-specific variant explicitly.

## CreateFtdcTraderApi

`CreateFtdcTraderApi` is a factory entry point that creates the API runtime object before any session logic begins.

- Kind: factory
- Owning interface: `CThostFtdcTraderApi`
- Related symbols: `RegisterSpi`, `SubscribePrivateTopic`, `SubscribePublicTopic`, `RegisterFront`, `Init`

**When to use it**

- Use this entry when the related business flow becomes part of your integration.
- Keep the behavior in mind when modeling retries, reconnection, or reconciliation logic.

**How to apply it**

1. Call the factory before any registration or login step.
2. Keep the returned pointer alive for the full session lifetime.
3. Register the SPI and endpoint information before starting the runtime thread.

**Prototype**

```cpp
static CThostFtdcTraderApi *CreateFtdcTraderApi(const char *pszFlowPath = "", bool bIsProductionMode = true);
```

**Parameters**

| Name | Type | Purpose |
| --- | --- | --- |
| `pszFlowPath` | `const char *` | Carries the psz flow path for the current request or response. |
| `bIsProductionMode` | `bool` | Carries the b is production mode for the current request or response. |

**Return semantics**

- A non-null pointer means the API object was created successfully.
- A null result means the runtime object could not be created and the client cannot proceed with this API surface.

**Usage example**

```cpp
CSimpleHandler sh(pUserApi);
pUserApi->RegisterSpi(&sh);
pUserApi->SubscribePrivateTopic(THOST_TERT_QUICK);
pUserApi->SubscribePublicTopic(THOST_TERT_QUICK);
pUserApi->RegisterFront("tcp://127.0.0.1:41205");
pUserApi->Init();
```

**Implementation notes**

- Keep the API object alive for the full lifetime of the session and destroy it only after the runtime thread has stopped or the process is shutting down.

## GetApiVersion

`GetApiVersion` is a direct lifecycle method that acts immediately and does not depend on the asynchronous request pipeline.

- Kind: method
- Owning interface: `CThostFtdcTraderApi`
- Related symbols: `CreateFtdcTraderApi`, `RegisterSpi`, `SubscribePrivateTopic`, `SubscribePublicTopic`, `RegisterFront`, `Init`

**When to use it**

- Use this entry when the related business flow becomes part of your integration.
- Keep the behavior in mind when modeling retries, reconnection, or reconciliation logic.

**How to apply it**

1. Call the method only when the lifecycle state makes sense for it.
2. Use the returned value or side effect immediately in the surrounding startup or shutdown flow.

**Prototype**

```cpp
virtual const char *GetApiVersion() = 0;
```

**Return semantics**

- The return value is produced synchronously and can be used immediately by the caller.

**Usage example**

```cpp
CThostFtdcTraderApi *pUserApi =
CThostFtdcTraderApi::CreateFtdcTraderApi("F:\\flow\\");
CSimpleHandler sh(pUserApi);
pUserApi->RegisterSpi(&sh);
LOG(pUserApi->GetApiVersion());
pUserApi->SubscribePrivateTopic(THOST_TERT_QUICK);
pUserApi->SubscribePublicTopic(THOST_TERT_QUICK);
pUserApi->RegisterFront( tcp://127.0.0.1:51205 );
pUserApi->Init();
```

**Implementation notes**

- Use this section together with the related request and callback entries so the rules become concrete in code.

## GetTradingDay

`GetTradingDay` is a direct lifecycle method that acts immediately and does not depend on the asynchronous request pipeline.

- Kind: method
- Owning interface: `CThostFtdcTraderApi`
- Related symbols: `CreateFtdcTraderApi`, `RegisterSpi`, `SubscribePrivateTopic`, `SubscribePublicTopic`, `RegisterFront`, `Init`

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
CThostFtdcTraderApi *pUserApi =
CThostFtdcTraderApi::CreateFtdcTraderApi("F:\\flow\\");
CSimpleHandler sh(pUserApi);
pUserApi->RegisterSpi(&sh);
pUserApi->SubscribePrivateTopic(THOST_TERT_QUICK);
pUserApi->SubscribePublicTopic(THOST_TERT_QUICK);
pUserApi->RegisterFront( tcp://127.0.0.1:51205 );
pUserApi->Init();
WaitForSingleObject(g_LoginSig, INFINITE); //
printf(pUserApi->GetTradingDay()); //
```

**Implementation notes**

- Use this section together with the related request and callback entries so the rules become concrete in code.

## GetFrontInfo

`GetFrontInfo` is a direct lifecycle method that acts immediately and does not depend on the asynchronous request pipeline.

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
virtual void GetFrontInfo(CThostFtdcFrontInfoField* pFrontInfo) =0;
```

**Parameters**

| Name | Type | Purpose |
| --- | --- | --- |
| `pFrontInfo` | `CThostFtdcFrontInfoField*` | Pointer to the payload object `CThostFtdcFrontInfoField*`. |

**Usage example**

```cpp
CThostFtdcFrontInfoField g_chpFrontInfo = {};
pUserApi->GetFrontInfo(&g_chpFrontInfo);
printf("%s\n",g_chpFrontInfo.FrontAddr);
printf("%d\n",g_chpFrontInfo.FTDPkgFreq);
printf("%d\n", g_chpFrontInfo.QryFreq);
```

**Implementation notes**

- Use this section together with the related request and callback entries so the rules become concrete in code.

## Init

`Init` is a direct lifecycle method that acts immediately and does not depend on the asynchronous request pipeline.

- Kind: method
- Owning interface: `CThostFtdcTraderApi`
- Related symbols: `CreateFtdcTraderApi`, `RegisterSpi`, `SubscribePrivateTopic`, `SubscribePublicTopic`, `RegisterFront`

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
CThostFtdcTraderApi *pUserApi =
CThostFtdcTraderApi::CreateFtdcTraderApi("F:\\flow\\");
CSimpleHandler sh(pUserApi);
pUserApi->RegisterSpi(&sh);
pUserApi->SubscribePrivateTopic(THOST_TERT_QUICK);
pUserApi->SubscribePublicTopic(THOST_TERT_QUICK);
pUserApi->RegisterFront( tcp://127.0.0.1:51205 );
pUserApi->Init();
```

**Implementation notes**

- Use this section together with the related request and callback entries so the rules become concrete in code.

## Join

`Join` is a direct lifecycle method that acts immediately and does not depend on the asynchronous request pipeline.

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
- Owning interface: `CThostFtdcTraderApi`
- Related symbols: `RegisterNameServer`, `CreateFtdcTraderApi`, `RegisterSpi`, `GetApiVersion`, `SubscribePrivateTopic`, `SubscribePublicTopic`, `Init`

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

**Usage example**

```cpp
CThostFtdcTraderApi *pUserApi =
CThostFtdcTraderApi::CreateFtdcTraderApi("F:\\flow\\");
CSimpleHandler sh(pUserApi);
pUserApi->RegisterSpi(&sh);
printf(pUserApi->GetApiVersion());
pUserApi->SubscribePrivateTopic(THOST_TERT_QUICK);
pUserApi->SubscribePublicTopic(THOST_TERT_QUICK);
CThostFtdcFensUserInfoField pFensUserInfo = { 0 };
strcpy_s(pFensUserInfo.BrokerID, "9999");
strcpy_s(pFensUserInfo.UserID, "1000001");
pFensUserInfo.LoginMode = THOST_FTDC_LM_Trade;
pUserApi->RegisterFensUserInfo(&pFensUserInfo);
pUserApi-> RegisterNameServer("tcp://127.0.0.1:41205");
pUserApi->Init();
```

**Implementation notes**

- Use this section together with the related request and callback entries so the rules become concrete in code.
- Endpoint discovery through NameServer or FENS changes the startup path, so build the deployment-specific variant explicitly.

## RegisterFront

`RegisterFront` is a synchronous configuration method that must be called at the right point in the startup sequence.

- Kind: registration
- Owning interface: `CThostFtdcTraderApi`
- Related symbols: `CreateFtdcTraderApi`, `RegisterSpi`, `SubscribePrivateTopic`, `SubscribePublicTopic`, `Init`

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
CThostFtdcTraderApi *pUserApi =
CThostFtdcTraderApi::CreateFtdcTraderApi("F:\\flow \\");
CSimpleHandler sh(pUserApi);
pUserApi->RegisterSpi(&sh);
pUserApi->SubscribePrivateTopic(THOST_TERT_RESUME);
pUserApi->SubscribePublicTopic(THOST_TERT_RESUME);
```

**Implementation notes**

- Use this section together with the related request and callback entries so the rules become concrete in code.

## RegisterNameServer

`RegisterNameServer` is a synchronous configuration method that must be called at the right point in the startup sequence.

- Kind: registration
- Owning interface: `CThostFtdcTraderApi`
- Related symbols: `RegisterFront`, `RegisterFensUserInfo`, `CreateFtdcTraderApi`, `RegisterSpi`, `GetApiVersion`, `SubscribePrivateTopic`, `SubscribePublicTopic`, `Init`

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
CThostFtdcTraderApi *pUserApi =
CThostFtdcTraderApi::CreateFtdcTraderApi("F:\\flow\\");
CSimpleHandler sh(pUserApi);
pUserApi->RegisterSpi(&sh);
printf(pUserApi->GetApiVersion());
pUserApi->SubscribePrivateTopic(THOST_TERT_QUICK);
pUserApi->SubscribePublicTopic(THOST_TERT_QUICK);
CThostFtdcFensUserInfoField pFensUserInfo = { 0 };
strcpy_s(pFensUserInfo.BrokerID, "9999");
strcpy_s(pFensUserInfo.UserID, "1000001");
pFensUserInfo.LoginMode = THOST_FTDC_LM_Trade;
pUserApi->RegisterFensUserInfo(&pFensUserInfo);
pUserApi-> RegisterNameServer ( tcp://127.0.0.1:41205 );
pUserApi->Init();
```

**Implementation notes**

- Use this section together with the related request and callback entries so the rules become concrete in code.
- Endpoint discovery through NameServer or FENS changes the startup path, so build the deployment-specific variant explicitly.

## RegisterSpi

`RegisterSpi` is a synchronous configuration method that must be called at the right point in the startup sequence.

- Kind: registration
- Owning interface: `CThostFtdcTraderApi`
- Related symbols: `CreateFtdcTraderApi`, `SubscribePrivateTopic`, `SubscribePublicTopic`, `RegisterFront`, `Init`

**When to use it**

- Use this entry when the related business flow becomes part of your integration.
- Keep the behavior in mind when modeling retries, reconnection, or reconciliation logic.

**How to apply it**

1. Call the registration method before `Init` so the runtime starts with the intended configuration.
2. Apply the value only after choosing the correct front, NameServer, or session policy.
3. Keep the registration order deterministic to avoid startup races.

**Prototype**

```cpp
virtual void RegisterSpi(CThostFtdcTraderSpi *pSpi) = 0;
```

**Parameters**

| Name | Type | Purpose |
| --- | --- | --- |
| `pSpi` | `CThostFtdcTraderSpi *` | Pointer to the payload object `CThostFtdcTraderSpi *`. |

**Usage example**

```cpp
CThostFtdcTraderApi *pUserApi =
CThostFtdcTraderApi::CreateFtdcTraderApi("F:\\api_liu\\");
CSimpleHandler sh(pUserApi);
pUserApi->RegisterSpi(&sh);
pUserApi->SubscribePrivateTopic(THOST_TERT_QUICK);
pUserApi->SubscribePublicTopic(THOST_TERT_QUICK);
pUserApi->RegisterFront( tcp://127.0.0.1:51205 );
pUserApi->Init();
```

**Implementation notes**

- Use this section together with the related request and callback entries so the rules become concrete in code.

## Release

`Release` is a direct lifecycle method that acts immediately and does not depend on the asynchronous request pipeline.

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
virtual void Release() = 0;
```

**Usage example**

```cpp
if (m_pUserApi)
    {
        m_pUserApi->Release();
        m_pUserApi = NULL;
    }
```

**Implementation notes**

- Use this section together with the related request and callback entries so the rules become concrete in code.
