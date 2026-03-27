# CTP document and interface overviews

This reference introduces the overall shape of the manual and the top-level API surfaces so you can place each detailed API entry in its runtime context.

| Entry | Kind |
| --- | --- |
| Table of contents | topic |
| CTP API manual root | topic |
| Market data interface | topic |
| Trader interface | topic |

## Table of contents

This section explains the rule set, overview, or release topic represented by `Table of contents`.

- Kind: topic
- Related symbols: `CTP-GetSystemInfo`, `CTP-GetDataCollectApiVersion`, `CreateFtdcMdApi`, `GetApiVersion`, `GetTradingDay`, `Init`, `Join`, `RegisterFensUserInfo`, `RegisterFront`, `RegisterNameServer`

**When to use it**

- Review the rule before implementing the related API path.
- Use the topic as a checklist when diagnosing production behavior.

**How to apply it**

1. Read this section before implementing the related integration path.
2. Map the rule or overview to the request and callback symbols affected by it.

**Callback and outcome model**

- Success path: `OnRspError`, `OnRspQryMulticastInstrument`, `OnRspSubForQuoteRsp`, `OnRspSubMarketData`, `OnRspUnSubForQuoteRsp`, `OnRspUnSubMarketData`, `OnRspUserLogin`, `OnRspUserLogout`.
- Error path: `OnRspError`, `OnErrRtnBankToFutureByFuture`, `OnErrRtnBatchOrderAction`, `OnErrRtnCombActionInsert`, `OnErrRtnExecOrderAction`, `OnErrRtnExecOrderInsert`, `OnErrRtnForQuoteInsert`, `OnErrRtnFutureToBankByFuture`.

**Implementation notes**

- Use this section together with the related request and callback entries so the rules become concrete in code.
- Endpoint discovery through NameServer or FENS changes the startup path, so build the deployment-specific variant explicitly.

## CTP API manual root

This section explains the rule set, overview, or release topic represented by `CTP API manual root`.

- Kind: topic

**When to use it**

- Review the rule before implementing the related API path.
- Use the topic as a checklist when diagnosing production behavior.

**How to apply it**

1. Read this section before implementing the related integration path.
2. Map the rule or overview to the request and callback symbols affected by it.

**Implementation notes**

- Use this section together with the related request and callback entries so the rules become concrete in code.

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
