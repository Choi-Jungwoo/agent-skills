# CTP overview and version history

This reference explains the front matter and release-oriented sections that shape compatibility, rollout planning, and regression review.

| Entry | Kind |
| --- | --- |
| Home | topic |
| Reading guide | topic |
| Document versions and key changes | topic |
| Version 6.5.1 update notes | topic |
| Version 6.5.1 supplemental update notes | topic |
| Version 6.6.1P1 update notes | topic |
| Version 6.6.5 update notes | topic |
| Version 6.6.7 update notes | topic |
| Version 6.6.8 update notes | topic |
| Version 6.6.9 update notes | topic |
| Version 6.7.0 update notes | topic |
| Version 6.7.1 update notes | topic |
| Version 6.7.2 update notes | topic |
| Version 6.7.7 update notes | topic |
| Version 6.7.8 update notes | topic |
| Version 6.7.9 update notes | topic |
| Version 6.7.9P1 update notes | topic |
| Version 6.7.10 update notes | topic |
| Version 6.7.11 update notes | topic |

## Home

This section explains the rule set, overview, or release topic represented by `Home`.

- Kind: topic
- Related symbols: `ReqUserLogin`, `OnRspUserLogin`, `ReqQry`, `ReqQryInstrument`, `OnRspQry`, `OnRspQryInstrument`, `OnRtnOrder`, `OnErrRtnOrderInsert`

**When to use it**

- Review the rule before implementing the related API path.
- Use the topic as a checklist when diagnosing production behavior.

**How to apply it**

1. Read this section before implementing the related integration path.
2. Map the rule or overview to the request and callback symbols affected by it.

**Callback and outcome model**

- Success path: `OnRspUserLogin`, `OnRspQry`, `OnRspQryInstrument`, `OnRtnOrder`.
- Error path: `OnErrRtnOrderInsert`.

**Implementation notes**

- Use this section together with the related request and callback entries so the rules become concrete in code.

## Reading guide

This section explains the rule set, overview, or release topic represented by `Reading guide`.

- Kind: topic

**When to use it**

- Review the rule before implementing the related API path.
- Use the topic as a checklist when diagnosing production behavior.

**How to apply it**

1. Read this section before implementing the related integration path.
2. Map the rule or overview to the request and callback symbols affected by it.

**Implementation notes**

- Use this section together with the related request and callback entries so the rules become concrete in code.

## Document versions and key changes

This section explains the rule set, overview, or release topic represented by `Document versions and key changes`.

- Kind: topic
- Related symbols: `CreateFtdcTraderApi`, `OnRspUserLogin`, `OnRtnOffsetSetting`, `OnRspQryOffsetSetting`, `ReqQryUserSession`, `OnRspQryUserSession`, `RegisterWechatUserSystemInfo`, `OnRspQryTradingAccount`, `OnRspQrySecAgentTradingAccount`, `OnRspQryInvestorPosition`

**When to use it**

- Review the rule before implementing the related API path.
- Use the topic as a checklist when diagnosing production behavior.

**How to apply it**

1. Read this section before implementing the related integration path.
2. Map the rule or overview to the request and callback symbols affected by it.

**Callback and outcome model**

- Success path: `OnRspUserLogin`, `OnRtnOffsetSetting`, `OnRspQryOffsetSetting`, `OnRspQryUserSession`, `OnRspQryTradingAccount`, `OnRspQrySecAgentTradingAccount`, `OnRspQryInvestorPosition`, `OnRspForQuoteInsert`.
- Error path: `OnErrRtnForQuoteInsert`, `OnErrRtnOrderInsert`, `OnErrRtnCombActionInsert`, `OnErrRtnOffsetSetting`, `OnErrRtnCancelOffsetSetting`, `OnErrRtnOrderAction`, `OnErrRtnQuoteInsert`, `OnErrRtnQuoteAction`.

**Implementation notes**

- Use this section together with the related request and callback entries so the rules become concrete in code.

## Version 6.5.1 update notes

This section explains the rule set, overview, or release topic represented by `Version 6.5.1 update notes`.

- Kind: topic
- Related symbols: `ReqOrderInsert`, `RegisterFront`, `RegisterNameServer`, `ReqQryCombPromotionParam`, `OnRspQryCombPromotionParam`, `SubscribePublicTopic`, `Init`, `ReqQryClassifiedInstrument`, `OnRspQryClassifiedInstrument`, `ReqQueryMaxOrderVolume`

**When to use it**

- Review the rule before implementing the related API path.
- Use the topic as a checklist when diagnosing production behavior.

**How to apply it**

1. Read this section before implementing the related integration path.
2. Map the rule or overview to the request and callback symbols affected by it.

**Parameters**

| Name | Type | Purpose |
| --- | --- | --- |
| `pQryCombPromotionParam` | `CThostFtdcQryCombPromotionPara mField *` | Pointer to the payload object `CThostFtdcQryCombPromotionPara mField *`. |
| `nRequestID` | `int` | Request correlation id provided by the caller. |

**Callback and outcome model**

- Success path: `OnRspQryCombPromotionParam`, `OnRspQryClassifiedInstrument`, `OnRspQueryMaxOrderVolume`, `OnRspQryMaxOrderVolume`.

**Field guide for `CThostFtdcQryCombPromotionParamField`**

| Field | Type | Purpose |
| --- | --- | --- |
| `ExchangeID` | `TThostFtdcExchangeIDType` | Exchange code that disambiguates the target venue. |
| `InstrumentID` | `TThostFtdcInstrumentIDType` | Instrument symbol for the target contract. |

**Structure layout**

```cpp
struct CThostFtdcQryCombPromotionParamField
{

    TThostFtdcExchangeIDType ExchangeID;

    TThostFtdcInstrumentIDType InstrumentID;
};
```

**Field guide for `CThostFtdcCombPromotionParamField`**

| Field | Type | Purpose |
| --- | --- | --- |
| `ExchangeID` | `TThostFtdcExchangeIDType` | Exchange code that disambiguates the target venue. |
| `InstrumentID` | `TThostFtdcInstrumentIDType` | Instrument symbol for the target contract. |
| `CombHedgeFlag` | `TThostFtdcCombHedgeFlagType` | Hedge classification for the instruction. |
| `Xparameter` | `TThostFtdcDiscountRatioType` | Carries the xparameter for the current request or response. |

**Structure layout**

```cpp
struct CThostFtdcCombPromotionParamField
{

    TThostFtdcExchangeIDType ExchangeID;

    TThostFtdcInstrumentIDType InstrumentID;

    TThostFtdcCombHedgeFlagType CombHedgeFlag;

    TThostFtdcDiscountRatioType Xparameter;
};
```

**Field guide for `CThostFtdcQryClassifiedInstrumentField`**

| Field | Type | Purpose |
| --- | --- | --- |
| `InstrumentID` | `TThostFtdcInstrumentIDType` | Instrument symbol for the target contract. |
| `ExchangeID` | `TThostFtdcExchangeIDType` | Exchange code that disambiguates the target venue. |
| `ExchangeInstID` | `TThostFtdcExchangeInstIDType` | Carries the exchange inst identifier for the current request or response. |
| `ProductID` | `TThostFtdcInstrumentIDType` | Carries the product identifier for the current request or response. |
| `TradingType` | `TThostFtdcTradingTypeType` | Carries the trading type for the current request or response. |
| `ClassType` | `TThostFtdcClassTypeType` | Carries the class type for the current request or response. |

**Structure layout**

```cpp
struct CThostFtdcQryClassifiedInstrumentField
{

    TThostFtdcInstrumentIDType  InstrumentID;

    TThostFtdcExchangeIDType    ExchangeID;

    TThostFtdcExchangeInstIDType    ExchangeInstID;

    TThostFtdcInstrumentIDType  ProductID;

    TThostFtdcTradingTypeType   TradingType;

    TThostFtdcClassTypeType ClassType;
};
```

**Implementation notes**

- Use this section together with the related request and callback entries so the rules become concrete in code.
- Endpoint discovery through NameServer or FENS changes the startup path, so build the deployment-specific variant explicitly.

## Version 6.5.1 supplemental update notes

This section explains the rule set, overview, or release topic represented by `Version 6.5.1 supplemental update notes`.

- Kind: topic
- Related symbols: `ReqQryInstrument`, `ReqQryClassifiedInstrument`, `ReqQryCombPromotionParam`

**When to use it**

- Review the rule before implementing the related API path.
- Use the topic as a checklist when diagnosing production behavior.

**How to apply it**

1. Read this section before implementing the related integration path.
2. Map the rule or overview to the request and callback symbols affected by it.

**Implementation notes**

- Use this section together with the related request and callback entries so the rules become concrete in code.

## Version 6.6.1P1 update notes

This section explains the rule set, overview, or release topic represented by `Version 6.6.1P1 update notes`.

- Kind: topic
- Related symbols: `ReqUserLogin`, `RegisterUserSystemInfo`, `ReqQuoteInsert`, `ReqQryRiskSettleInvstPosition`, `ReqQryRiskSettleProductStatus`, `OnRspQryRiskSettleInvstPosition`, `OnRspQryRiskSettleProductStatus`

**When to use it**

- Review the rule before implementing the related API path.
- Use the topic as a checklist when diagnosing production behavior.

**How to apply it**

1. Read this section before implementing the related integration path.
2. Map the rule or overview to the request and callback symbols affected by it.

**Parameters**

| Name | Type | Purpose |
| --- | --- | --- |
| `pUserSystemInfo` | `CThostFtdcUserSystemInfoField *` | Pointer to the payload object `CThostFtdcUserSystemInfoField *`. |

**Callback and outcome model**

- Success path: `OnRspQryRiskSettleInvstPosition`, `OnRspQryRiskSettleProductStatus`.

**Implementation notes**

- Use this section together with the related request and callback entries so the rules become concrete in code.

## Version 6.6.5 update notes

This section explains the rule set, overview, or release topic represented by `Version 6.6.5 update notes`.

- Kind: topic
- Related symbols: `OnRtnOptionSelfClose`, `ReqQrySettlementInfo`, `OnRspUserLogin`

**When to use it**

- Review the rule before implementing the related API path.
- Use the topic as a checklist when diagnosing production behavior.

**How to apply it**

1. Read this section before implementing the related integration path.
2. Map the rule or overview to the request and callback symbols affected by it.

**Callback and outcome model**

- Success path: `OnRtnOptionSelfClose`, `OnRspUserLogin`.

**Field guide for `CThostFtdcRspUserLoginField`**

| Field | Type | Purpose |
| --- | --- | --- |
| `TradingDay` | `String` | Trading date visible to the current trading system session. |
| `LoginTime` | `String` | Server-side login timestamp. |
| `BrokerID` | `String` | Broker code that scopes the request or identifies the response owner. |
| `UserID` | `String` | User code associated with the current login identity. |
| `SystemName` | `String` | Name of the serving trading system. |
| `FrontID` | `int` | Front identifier assigned by the server for the current login session. |
| `SessionID` | `int` | Session identifier assigned by the server for the current login session. |
| `MaxOrderRef` | `String` | Highest order reference currently known after login. |
| `SHFETime` | `String` | Carries the shfe time for the current request or response. |
| `DCETime` | `String` | Carries the dce time for the current request or response. |
| `CZCETime` | `String` | Carries the czce time for the current request or response. |
| `FFEXTime` | `String` | Carries the ffex time for the current request or response. |
| `INETime` | `String` | Carries the ine time for the current request or response. |
| `SysVersion` | `String` | Carries the sys version for the current request or response. |

**Structure layout**

```cpp
struct CThostFtdcRspUserLoginField
{

    String  TradingDay;

    String  LoginTime;

    String  BrokerID;

    String  UserID;

    String  SystemName;

    int FrontID;

    int SessionID;

    String  MaxOrderRef;

    String  SHFETime;

    String  DCETime;

    String  CZCETime;

    String  FFEXTime;

    String  INETime;
    //
    String  SysVersion;
};
```

**Implementation notes**

- Use this section together with the related request and callback entries so the rules become concrete in code.

## Version 6.6.7 update notes

This section explains the rule set, overview, or release topic represented by `Version 6.6.7 update notes`.

- Kind: topic
- Related symbols: `OnRspQryInvestor`, `OnRspQryProduct`

**When to use it**

- Review the rule before implementing the related API path.
- Use the topic as a checklist when diagnosing production behavior.

**How to apply it**

1. Read this section before implementing the related integration path.
2. Map the rule or overview to the request and callback symbols affected by it.

**Callback and outcome model**

- Success path: `OnRspQryInvestor`, `OnRspQryProduct`.

**Implementation notes**

- Use this section together with the related request and callback entries so the rules become concrete in code.

## Version 6.6.8 update notes

This section explains the rule set, overview, or release topic represented by `Version 6.6.8 update notes`.

- Kind: topic

**When to use it**

- Review the rule before implementing the related API path.
- Use the topic as a checklist when diagnosing production behavior.

**How to apply it**

1. Read this section before implementing the related integration path.
2. Map the rule or overview to the request and callback symbols affected by it.

**Field guide for `CThostFtdcRspUserLoginField`**

| Field | Type | Purpose |
| --- | --- | --- |
| `TradingDay` | `TThostFtdcDateType` | Trading date visible to the current trading system session. |
| `LoginTime` | `TThostFtdcTimeType` | Server-side login timestamp. |
| `BrokerID` | `TThostFtdcBrokerIDType` | Broker code that scopes the request or identifies the response owner. |
| `UserID` | `TThostFtdcUserIDType` | User code associated with the current login identity. |
| `SystemName` | `TThostFtdcSystemNameType` | Name of the serving trading system. |
| `FrontID` | `TThostFtdcFrontIDType` | Front identifier assigned by the server for the current login session. |
| `SessionID` | `TThostFtdcSessionIDType` | Session identifier assigned by the server for the current login session. |
| `MaxOrderRef` | `TThostFtdcOrderRefType` | Highest order reference currently known after login. |
| `SHFETime` | `TThostFtdcTimeType` | Carries the shfe time for the current request or response. |
| `DCETime` | `TThostFtdcTimeType` | Carries the dce time for the current request or response. |
| `CZCETime` | `TThostFtdcTimeType` | Carries the czce time for the current request or response. |
| `FFEXTime` | `TThostFtdcTimeType` | Carries the ffex time for the current request or response. |
| `INETime` | `TThostFtdcTimeType` | Carries the ine time for the current request or response. |
| `SysVersion` | `TThostFtdcSysVersionType` | Carries the sys version for the current request or response. |
| `GFEXTime` | `TThostFtdcTimeType` | Carries the gfex time for the current request or response. |

**Structure layout**

```cpp
struct CThostFtdcRspUserLoginField
{

    TThostFtdcDateType  TradingDay;

    TThostFtdcTimeType  LoginTime;

    TThostFtdcBrokerIDType  BrokerID;

    TThostFtdcUserIDType    UserID;

    TThostFtdcSystemNameType    SystemName;

    TThostFtdcFrontIDType   FrontID;

    TThostFtdcSessionIDType SessionID;

    TThostFtdcOrderRefType  MaxOrderRef;

    TThostFtdcTimeType  SHFETime;

    TThostFtdcTimeType  DCETime;

    TThostFtdcTimeType  CZCETime;

    TThostFtdcTimeType  FFEXTime;

    TThostFtdcTimeType  INETime;

    TThostFtdcSysVersionType    SysVersion;

    TThostFtdcTimeType  GFEXTime;
};
```

**Implementation notes**

- Use this section together with the related request and callback entries so the rules become concrete in code.

## Version 6.6.9 update notes

This section explains the rule set, overview, or release topic represented by `Version 6.6.9 update notes`.

- Kind: topic
- Related symbols: `ReqQrySPBMFutureParameter`, `OnRspQrySPBMFutureParameter`, `ReqQrySPBMOptionParameter`, `OnRspQrySPBMOptionParameter`, `ReqQrySPBMIntraParameter`, `OnRspQrySPBMIntraParameter`, `ReqQrySPBMInterParameter`, `OnRspQrySPBMInterParameter`, `ReqQrySPBMPortfDefinition`, `OnRspQrySPBMPortfDefinition`

**When to use it**

- Review the rule before implementing the related API path.
- Use the topic as a checklist when diagnosing production behavior.

**How to apply it**

1. Read this section before implementing the related integration path.
2. Map the rule or overview to the request and callback symbols affected by it.

**Parameters**

| Name | Type | Purpose |
| --- | --- | --- |
| `pQrySPBMFutureParameter` | `CThostFtdcQrySPB MFutureParameterField *` | Pointer to the payload object `CThostFtdcQrySPB MFutureParameterField *`. |
| `D` | `int nRequestI` | Carries the d for the current request or response. |

**Callback and outcome model**

- Success path: `OnRspQrySPBMFutureParameter`, `OnRspQrySPBMOptionParameter`, `OnRspQrySPBMIntraParameter`, `OnRspQrySPBMInterParameter`, `OnRspQrySPBMPortfDefinition`, `OnRspQrySPBMInvestorPortfDef`, `OnRspQryInvestorPortfMarginRatio`, `OnRspQryInvestorProdSPBMDetail`.

**Field guide for `CThostFtdcQrySPBMFutureParameterField`**

| Field | Type | Purpose |
| --- | --- | --- |
| `ExchangeID` | `TThostFtdcExchangeIDType` | Exchange code that disambiguates the target venue. |
| `InstrumentID` | `TThostFtdcInstrumentIDType` | Instrument symbol for the target contract. |
| `ProdFamilyCode` | `TThostFtdcInstrumentIDType` | Carries the prod family code for the current request or response. |

**Structure layout**

```cpp
struct CThostFtdcQrySPBMFutureParameterField
{

    TThostFtdcExchangeIDType    ExchangeID;

    TThostFtdcInstrumentIDType  InstrumentID;

    TThostFtdcInstrumentIDType  ProdFamilyCode;
};
```

**Field guide for `CThostFtdcSPBMFutureParameterField`**

| Field | Type | Purpose |
| --- | --- | --- |
| `TradingDay` | `TThostFtdcDateType` | Trading date visible to the current trading system session. |
| `ExchangeID` | `TThostFtdcExchangeIDType` | Exchange code that disambiguates the target venue. |
| `InstrumentID` | `TThostFtdcInstrumentIDType` | Instrument symbol for the target contract. |
| `ProdFamilyCode` | `TThostFtdcInstrumentIDType` | Carries the prod family code for the current request or response. |
| `Cvf` | `TThostFtdcVolumeMultipleType` | Carries the cvf for the current request or response. |
| `TimeRange` | `TThostFtdcTimeRangeType` | Carries the time range for the current request or response. |
| `MarginRate` | `TThostFtdcRatioType` | Carries the margin rate for the current request or response. |
| `LockRateX` | `TThostFtdcRatioType` | Carries the lock rate x for the current request or response. |
| `AddOnRate` | `TThostFtdcRatioType` | Carries the add on rate for the current request or response. |
| `PreSettlementPrice` | `TThostFtdcPriceType` | Carries the pre settlement price for the current request or response. |

**Structure layout**

```cpp
struct CThostFtdcSPBMFutureParameterField
{

    TThostFtdcDateType  TradingDay;

    TThostFtdcExchangeIDType    ExchangeID;

    TThostFtdcInstrumentIDType  InstrumentID;

    TThostFtdcInstrumentIDType  ProdFamilyCode;

    TThostFtdcVolumeMultipleType    Cvf;

    TThostFtdcTimeRangeType TimeRange;

    TThostFtdcRatioType MarginRate;

    TThostFtdcRatioType LockRateX;

    TThostFtdcRatioType AddOnRate;

    TThostFtdcPriceType PreSettlementPrice;
};
```

**Field guide for `CThostFtdcQrySPBMOptionParameterField`**

| Field | Type | Purpose |
| --- | --- | --- |
| `ExchangeID` | `TThostFtdcExchangeIDType` | Exchange code that disambiguates the target venue. |
| `InstrumentID` | `TThostFtdcInstrumentIDType` | Instrument symbol for the target contract. |
| `ProdFamilyCode` | `TThostFtdcInstrumentIDType` | Carries the prod family code for the current request or response. |

**Structure layout**

```cpp
struct CThostFtdcQrySPBMOptionParameterField
{

    TThostFtdcExchangeIDType    ExchangeID;

    TThostFtdcInstrumentIDType  InstrumentID;

    TThostFtdcInstrumentIDType  ProdFamilyCode;
};
```

**Implementation notes**

- Use this section together with the related request and callback entries so the rules become concrete in code.

## Version 6.7.0 update notes

This section explains the rule set, overview, or release topic represented by `Version 6.7.0 update notes`.

- Kind: topic

**When to use it**

- Review the rule before implementing the related API path.
- Use the topic as a checklist when diagnosing production behavior.

**How to apply it**

1. Read this section before implementing the related integration path.
2. Map the rule or overview to the request and callback symbols affected by it.

**Implementation notes**

- Use this section together with the related request and callback entries so the rules become concrete in code.

## Version 6.7.1 update notes

This section explains the rule set, overview, or release topic represented by `Version 6.7.1 update notes`.

- Kind: topic
- Related symbols: `ReqQuoteInsert`, `ReqOrderInsert`, `ReqParkedOrderInsert`, `ReqQryInvestorCommoditySPMMMargin`, `OnRspQryInvestorCommoditySPMMMargin`, `ReqQryInvestorCommodityGroupSPMMMargin`, `OnRspQryInvestorCommodityGroupSPMMMargin`, `ReqQrySPMMInstParam`, `OnRspQrySPMMInstParam`, `ReqQrySPMMProductParam`

**When to use it**

- Review the rule before implementing the related API path.
- Use the topic as a checklist when diagnosing production behavior.

**How to apply it**

1. Read this section before implementing the related integration path.
2. Map the rule or overview to the request and callback symbols affected by it.

**Parameters**

| Name | Type | Purpose |
| --- | --- | --- |
| `itySPMMMargin` | `CThostFtd cQryInvestorCommoditySPMMMarginField *pQryInvestorCommod` | Carries the ity spmm margin for the current request or response. |
| `nRequestID` | `int` | Request correlation id provided by the caller. |

**Callback and outcome model**

- Success path: `OnRspQryInvestorCommoditySPMMMargin`, `OnRspQryInvestorCommodityGroupSPMMMargin`, `OnRspQrySPMMInstParam`, `OnRspQrySPMMProductParam`.

**Implementation notes**

- Use this section together with the related request and callback entries so the rules become concrete in code.

## Version 6.7.2 update notes

This section explains the rule set, overview, or release topic represented by `Version 6.7.2 update notes`.

- Kind: topic
- Related symbols: `ReqQrySPBMAddOnInterParameter`, `OnRspQrySPBMAddOnInterParameter`, `ReqQryRCAMSCombProductInfo`, `OnRspQryRCAMSCombProductInfo`, `ReqQryRCAMSInstrParameter`, `OnRspQryRCAMSInstrParameter`, `ReqQryRCAMSIntraParameter`, `OnRspQryRCAMSIntraParameter`, `ReqQryRCAMSInterParameter`, `OnRspQryRCAMSInterParameter`

**When to use it**

- Review the rule before implementing the related API path.
- Use the topic as a checklist when diagnosing production behavior.

**How to apply it**

1. Read this section before implementing the related integration path.
2. Map the rule or overview to the request and callback symbols affected by it.

**Parameters**

| Name | Type | Purpose |
| --- | --- | --- |
| `r` | `CThostFtdcQry SPBMAddOnInterParameterField *pQrySPBMAddOnInterParamete` | Carries the r for the current request or response. |
| `nRequestID` | `int` | Request correlation id provided by the caller. |

**Callback and outcome model**

- Success path: `OnRspQrySPBMAddOnInterParameter`, `OnRspQryRCAMSCombProductInfo`, `OnRspQryRCAMSInstrParameter`, `OnRspQryRCAMSIntraParameter`, `OnRspQryRCAMSInterParameter`, `OnRspQryRCAMSShortOptAdjustParam`, `OnRspQryRCAMSInvestorCombPosition`, `OnRspQryInvestorProdRCAMSMargin`.

**Implementation notes**

- Use this section together with the related request and callback entries so the rules become concrete in code.

## Version 6.7.7 update notes

This section explains the rule set, overview, or release topic represented by `Version 6.7.7 update notes`.

- Kind: topic
- Related symbols: `ReqQryInvestorPortfSetting`, `OnRspQryInvestorPortfSetting`, `GetFrontInfo`, `ReqQryDepthMarketData`, `OnRspOrderInsert`, `OnRspQuoteInsert`, `ReqOrderInsert`, `ReqOrderAction`, `ReqQuoteInsert`, `ReqQuoteAction`

**When to use it**

- Review the rule before implementing the related API path.
- Use the topic as a checklist when diagnosing production behavior.

**How to apply it**

1. Read this section before implementing the related integration path.
2. Map the rule or overview to the request and callback symbols affected by it.

**Parameters**

| Name | Type | Purpose |
| --- | --- | --- |
| `pQryInvestorPortfSetting` | `CThostFtdcQryInvestorP ortfSettingField *` | Pointer to the payload object `CThostFtdcQryInvestorP ortfSettingField *`. |
| `nRequestID` | `int` | Request correlation id provided by the caller. |

**Callback and outcome model**

- Success path: `OnRspQryInvestorPortfSetting`, `OnRspOrderInsert`, `OnRspQuoteInsert`.

**Field guide for `CThostFtdcQryDepthMarketDataField`**

| Field | Type | Purpose |
| --- | --- | --- |
| `reserve1` | `TThostFtdcOldInstrumentIDType` | Carries the reserve1 for the current request or response. |
| `ExchangeID` | `TThostFtdcExchangeIDType` | Exchange code that disambiguates the target venue. |
| `InstrumentID` | `TThostFtdcInstrumentIDType` | Instrument symbol for the target contract. |
| `ProductClass` | `TThostFtdcProductClassType` | Carries the product class for the current request or response. |

**Structure layout**

```cpp
struct CThostFtdcQryDepthMarketDataField
{

    TThostFtdcOldInstrumentIDType   reserve1;

    TThostFtdcExchangeIDType    ExchangeID;

    TThostFtdcInstrumentIDType  InstrumentID;

    TThostFtdcProductClassType  ProductClass;
};
```

**Implementation notes**

- Use this section together with the related request and callback entries so the rules become concrete in code.

## Version 6.7.8 update notes

This section explains the rule set, overview, or release topic represented by `Version 6.7.8 update notes`.

- Kind: topic
- Related symbols: `ReqQryInvestorInfoCommRec`, `OnRspQryInvestorInfoCommRec`

**When to use it**

- Review the rule before implementing the related API path.
- Use the topic as a checklist when diagnosing production behavior.

**How to apply it**

1. Read this section before implementing the related integration path.
2. Map the rule or overview to the request and callback symbols affected by it.

**Parameters**

| Name | Type | Purpose |
| --- | --- | --- |
| `pQryInvestorInfoCommRec` | `CThostFtdcQryInvest orInfoCommRecField *` | Pointer to the payload object `CThostFtdcQryInvest orInfoCommRecField *`. |
| `nRequestID` | `int` | Request correlation id provided by the caller. |

**Callback and outcome model**

- Success path: `OnRspQryInvestorInfoCommRec`.

**Field guide for `CThostFtdcQryInvestorInfoCommRecField`**

| Field | Type | Purpose |
| --- | --- | --- |
| `InvestorID` | `TThostFtdcExchangeIDType` | Investor code used by the trading account. |
| `InstrumentID` | `TThostFtdcInstrumentIDType` | Instrument symbol for the target contract. |
| `BrokerID` | `TThostFtdcBrokerIDType` | Broker code that scopes the request or identifies the response owner. |

**Structure layout**

```cpp
struct CThostFtdcQryInvestorInfoCommRecField
{

    TThostFtdcExchangeIDType InvestorID;

    TThostFtdcInstrumentIDType InstrumentID;

    TThostFtdcBrokerIDType BrokerID;
};
```

**Implementation notes**

- Use this section together with the related request and callback entries so the rules become concrete in code.

## Version 6.7.9 update notes

This section explains the rule set, overview, or release topic represented by `Version 6.7.9 update notes`.

- Kind: topic
- Related symbols: `ReqQryCombLeg`, `OnRspQryCombLeg`

**When to use it**

- Review the rule before implementing the related API path.
- Use the topic as a checklist when diagnosing production behavior.

**How to apply it**

1. Read this section before implementing the related integration path.
2. Map the rule or overview to the request and callback symbols affected by it.

**Parameters**

| Name | Type | Purpose |
| --- | --- | --- |
| `QryCombLeg` | `CThostFtdcQryCombLegField *p` | Carries the query comb leg for the current request or response. |
| `nRequestID` | `int` | Request correlation id provided by the caller. |

**Callback and outcome model**

- Success path: `OnRspQryCombLeg`.

**Implementation notes**

- Use this section together with the related request and callback entries so the rules become concrete in code.

## Version 6.7.9P1 update notes

This section explains the rule set, overview, or release topic represented by `Version 6.7.9P1 update notes`.

- Kind: topic
- Related symbols: `ReqOffsetSetting`, `OnRspOffsetSetting`, `OnRtnOffsetSetting`, `OnErrRtnOffsetSetting`, `ReqCancelOffsetSetting`, `OnRspCancelOffsetSetting`, `OnErrRtnCancelOffsetSetting`, `ReqQryOffsetSetting`, `OnRspQryOffsetSetting`, `ReqExecOrderInsert`

**When to use it**

- Review the rule before implementing the related API path.
- Use the topic as a checklist when diagnosing production behavior.

**How to apply it**

1. Read this section before implementing the related integration path.
2. Map the rule or overview to the request and callback symbols affected by it.

**Callback and outcome model**

- Success path: `OnRspOffsetSetting`, `OnRtnOffsetSetting`, `OnRspCancelOffsetSetting`, `OnRspQryOffsetSetting`.
- Error path: `OnErrRtnOffsetSetting`, `OnErrRtnCancelOffsetSetting`.

**Implementation notes**

- Use this section together with the related request and callback entries so the rules become concrete in code.

## Version 6.7.10 update notes

This section explains the rule set, overview, or release topic represented by `Version 6.7.10 update notes`.

- Kind: topic
- Related symbols: `OnRspQryTradingAccount`, `OnRspQrySecAgentTradingAccount`, `OnRspQryInvestorPosition`, `RegisterWechatUserSystemInfo`

**When to use it**

- Review the rule before implementing the related API path.
- Use the topic as a checklist when diagnosing production behavior.

**How to apply it**

1. Read this section before implementing the related integration path.
2. Map the rule or overview to the request and callback symbols affected by it.

**Parameters**

| Name | Type | Purpose |
| --- | --- | --- |
| `pUserSystemInfo` | `CThostFtdcWechatU serSystemInfoField *` | Pointer to the payload object `CThostFtdcWechatU serSystemInfoField *`. |

**Callback and outcome model**

- Success path: `OnRspQryTradingAccount`, `OnRspQrySecAgentTradingAccount`, `OnRspQryInvestorPosition`.

**Implementation notes**

- Use this section together with the related request and callback entries so the rules become concrete in code.

## Version 6.7.11 update notes

This section explains the rule set, overview, or release topic represented by `Version 6.7.11 update notes`.

- Kind: topic
- Related symbols: `CreateFtdcTraderApi`, `CreateFtdcMdApi`, `ReqQryInstrumentCommissionRate`, `ReqQryOptionInstrCommRate`, `ReqQryInstrumentMarginRate`, `ReqQryUserSession`, `OnRtnOffsetSetting`, `OnRspQryOffsetSetting`

**When to use it**

- Review the rule before implementing the related API path.
- Use the topic as a checklist when diagnosing production behavior.

**How to apply it**

1. Read this section before implementing the related integration path.
2. Map the rule or overview to the request and callback symbols affected by it.

**Callback and outcome model**

- Success path: `OnRtnOffsetSetting`, `OnRspQryOffsetSetting`.

**Implementation notes**

- Use this section together with the related request and callback entries so the rules become concrete in code.
