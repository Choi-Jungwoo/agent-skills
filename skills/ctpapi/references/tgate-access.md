# CTP TGate gateway access guide

This reference covers TGate-specific access guidance, rollout concerns, and the gateway-focused release notes that affect deployment design.

| Entry | Kind |
| --- | --- |
| TGate gateway access guide | topic |
| TGate gateway access guide | topic |
| TGate 6.7.11 update notes | topic |

## TGate gateway access guide

This section explains the rule set, overview, or release topic represented by `TGate gateway access guide`.

- Kind: topic

**When to use it**

- Review the rule before implementing the related API path.
- Use the topic as a checklist when diagnosing production behavior.

**How to apply it**

1. Read this section before implementing the related integration path.
2. Map the rule or overview to the request and callback symbols affected by it.

**Implementation notes**

- Use this section together with the related request and callback entries so the rules become concrete in code.

## TGate gateway access guide

This section explains the rule set, overview, or release topic represented by `TGate gateway access guide`.

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

## TGate 6.7.11 update notes

This section explains the rule set, overview, or release topic represented by `TGate 6.7.11 update notes`.

- Kind: topic

**When to use it**

- Review the rule before implementing the related API path.
- Use the topic as a checklist when diagnosing production behavior.

**How to apply it**

1. Read this section before implementing the related integration path.
2. Map the rule or overview to the request and callback symbols affected by it.

**Implementation notes**

- Use this section together with the related request and callback entries so the rules become concrete in code.
