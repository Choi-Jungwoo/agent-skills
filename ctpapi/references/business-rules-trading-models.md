# CTP business rules for advanced trading models

This reference covers DCE combination hedge behavior, TAS, exercise and self-close handling, and the DCE exercise-optimization business flow.

| Entry | Kind |
| --- | --- |
| DCE combination hedge | topic |
| TAS overview | topic |
| Futures and options exercise and self-close | topic |
| DCE exercise optimization phase-two business | topic |

## DCE combination hedge

This section explains the rule set, overview, or release topic represented by `DCE combination hedge`.

- Kind: topic
- Related symbols: `ReqCombActionInsert`, `OnErrRtnCombActionInsert`, `OnRspCombActionInsert`, `OnRtnCombAction`, `OnRspQryInstrument`, `OnRtnDepthMarketData`, `ReqOrderInsert`, `OnRspQryInvestorPosition`, `OnRspQryInvestorPositionDetail`

**When to use it**

- Review the rule before implementing the related API path.
- Use the topic as a checklist when diagnosing production behavior.

**How to apply it**

1. Read this section before implementing the related integration path.
2. Map the rule or overview to the request and callback symbols affected by it.

**Callback and outcome model**

- Success path: `OnRspCombActionInsert`, `OnRtnCombAction`, `OnRspQryInstrument`, `OnRtnDepthMarketData`, `OnRspQryInvestorPosition`, `OnRspQryInvestorPositionDetail`.
- Error path: `OnErrRtnCombActionInsert`.

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

- Use this section together with the related request and callback entries so the rules become concrete in code.

## TAS overview

This section explains the rule set, overview, or release topic represented by `TAS overview`.

- Kind: topic
- Related symbols: `ReqOrderInsert`, `OnRtnTrade`, `OnRspQryInvestorPositionDetail`, `OnRspQryInvestorPosition`

**When to use it**

- Review the rule before implementing the related API path.
- Use the topic as a checklist when diagnosing production behavior.

**How to apply it**

1. Read this section before implementing the related integration path.
2. Map the rule or overview to the request and callback symbols affected by it.

**Callback and outcome model**

- Success path: `OnRtnTrade`, `OnRspQryInvestorPositionDetail`, `OnRspQryInvestorPosition`.

**Usage example**

```cpp
{
    CThostFtdcInputOrderField t = { 0 };
    strcpy_s(t.BrokerID, "1007");
    strcpy_s(t.InvestorID, "10000001");
    strcpy_s(t.UserID, "10000001");
    t.Direction = THOST_FTDC_D_Sell;
    t.CombOffsetFlag[0] = THOST_FTDC_OF_Open;
    t.CombHedgeFlag[0] = THOST_FTDC_HF_Speculation;
    t.ContingentCondition = THOST_FTDC_CC_Immediately;
    strcpy_s(t.InstrumentID, "sc2006TAS");  //tas
    t.ForceCloseReason = THOST_FTDC_FCC_NotForceClose;;
    t.LimitPrice = 0;   //     0
    t.StopPrice = 0;
    t.OrderPriceType = THOST_FTDC_OPT_LimitPrice;
    t.VolumeCondition = THOST_FTDC_VC_AV;
    t.TimeCondition = THOST_FTDC_TC_GFD;
    t.VolumeTotalOriginal = 10;
    m_ptraderapi->ReqOrderInsert(&t, m_requestid++);
}
```

**Implementation notes**

- Use this section together with the related request and callback entries so the rules become concrete in code.

## Futures and options exercise and self-close

This section explains the rule set, overview, or release topic represented by `Futures and options exercise and self-close`.

- Kind: topic
- Related symbols: `ReqExecOrderInsert`, `OnErrRtnExecOrderInsert`, `OnRspExecOrderInsert`, `OnRtnExecOrder`, `ReqExecOrderAction`, `OnErrRtnExecOrderAction`, `OnRspExecOrderAction`, `ReqOptionSelfCloseInsert`, `OnErrRtnOptionSelfCloseInsert`, `OnRspOptionSelfCloseInsert`

**When to use it**

- Review the rule before implementing the related API path.
- Use the topic as a checklist when diagnosing production behavior.

**How to apply it**

1. Read this section before implementing the related integration path.
2. Map the rule or overview to the request and callback symbols affected by it.

**Callback and outcome model**

- Success path: `OnRspExecOrderInsert`, `OnRtnExecOrder`, `OnRspExecOrderAction`, `OnRspOptionSelfCloseInsert`, `OnRtnOptionSelfClose`, `OnRspOptionSelfCloseAction`.
- Error path: `OnErrRtnExecOrderInsert`, `OnErrRtnExecOrderAction`, `OnErrRtnOptionSelfCloseInsert`, `OnErrRtnOptionSelfCloseAction`.

**Implementation notes**

- Use this section together with the related request and callback entries so the rules become concrete in code.

## DCE exercise optimization phase-two business

This section explains the rule set, overview, or release topic represented by `DCE exercise optimization phase-two business`.

- Kind: topic
- Related symbols: `Release`, `ReqQryTGIpAddrParam`, `RegisterSpi`, `RegisterTGAddr`, `OnRspQryTGIpAddrParam`

**When to use it**

- Review the rule before implementing the related API path.
- Use the topic as a checklist when diagnosing production behavior.

**How to apply it**

1. Read this section before implementing the related integration path.
2. Map the rule or overview to the request and callback symbols affected by it.

**Callback and outcome model**

- Success path: `OnRspQryTGIpAddrParam`.

**Usage example**

```cpp
16      {
17          string m_sTGFrontAddr = "tcp://127.0.0.1";
18          string m_sBrokerid = "0001";
19          string m_sUserid = "123456789";
```

**Implementation notes**

- Use this section together with the related request and callback entries so the rules become concrete in code.
