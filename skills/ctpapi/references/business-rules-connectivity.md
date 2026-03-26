# CTP business rules for connectivity and data transport

This reference covers transport-level and routing rules, including multicast reception, FENS behavior, communication modes, and market-data-side rate control.

| Entry | Kind |
| --- | --- |
| Protocol-based second-generation multicast market data | topic |
| FENS connection notes | topic |
| Communication modes | topic |
| Market data rate control | topic |

## Protocol-based second-generation multicast market data

This section explains the rule set, overview, or release topic represented by `Protocol-based second-generation multicast market data`.

- Kind: topic
- Related symbols: `ReqQryMulticastInstrument`, `CreateFtdcMdApi`, `RegisterSpi`, `RegisterFront`, `Init`, `ReqUserLogin`, `OnRspQryMulticastInstrument`, `OnRtnDepthMarketData`

**When to use it**

- Review the rule before implementing the related API path.
- Use the topic as a checklist when diagnosing production behavior.

**How to apply it**

1. Read this section before implementing the related integration path.
2. Map the rule or overview to the request and callback symbols affected by it.

**Callback and outcome model**

- Success path: `OnRspQryMulticastInstrument`, `OnRtnDepthMarketData`.

**Usage example**

```cpp
m_mdApi = CThostFtdcMdApi::CreateFtdcMdApi("", true, true);
        m_mdApi->RegisterSpi(this);
        m_mdApi->RegisterFront("tcp://218.28.130.102:41413");
        m_mdApi->Init();
    }
```

**Implementation notes**

- Use this section together with the related request and callback entries so the rules become concrete in code.

## FENS connection notes

This section explains the rule set, overview, or release topic represented by `FENS connection notes`.

- Kind: topic
- Related symbols: `RegisterFront`, `RegisterFensUserInfo`, `CreateFtdcTraderApi`, `RegisterSpi`, `GetApiVersion`, `SubscribePrivateTopic`, `SubscribePublicTopic`, `RegisterNameServer`, `Init`, `CreateFtdcMdApi`

**When to use it**

- Review the rule before implementing the related API path.
- Use the topic as a checklist when diagnosing production behavior.

**How to apply it**

1. Read this section before implementing the related integration path.
2. Map the rule or overview to the request and callback symbols affected by it.

**Usage example**

```cpp
```c++
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

## Communication modes

This section explains the rule set, overview, or release topic represented by `Communication modes`.

- Kind: topic
- Related symbols: `ReqUserLogin`, `OnRspUserLogin`, `ReqUserLogout`, `OnRspUserLogout`, `ReqUserPasswordUpdate`, `OnRspUserPasswordUpdate`, `ReqOrderInsert`, `OnRspOrderInsert`, `ReqOrderAction`, `OnRspOrderAction`

**When to use it**

- Review the rule before implementing the related API path.
- Use the topic as a checklist when diagnosing production behavior.

**How to apply it**

1. Read this section before implementing the related integration path.
2. Map the rule or overview to the request and callback symbols affected by it.

**Callback and outcome model**

- Success path: `OnRspUserLogin`, `OnRspUserLogout`, `OnRspUserPasswordUpdate`, `OnRspOrderInsert`, `OnRspOrderAction`, `OnRspQuoteInsert`, `OnRspQuoteAction`, `OnRtnTrade`.
- Error path: `OnErrRtnOrderInsert`, `OnErrRtnOrderAction`.

**Implementation notes**

- Use this section together with the related request and callback entries so the rules become concrete in code.

## Market data rate control

This section explains the rule set, overview, or release topic represented by `Market data rate control`.

- Kind: topic

**When to use it**

- Review the rule before implementing the related API path.
- Use the topic as a checklist when diagnosing production behavior.

**How to apply it**

1. Read this section before implementing the related integration path.
2. Map the rule or overview to the request and callback symbols affected by it.

**Implementation notes**

- Use this section together with the related request and callback entries so the rules become concrete in code.
