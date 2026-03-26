# CTP business rules for order sequencing

This reference covers callback ordering, contingent order behavior, and sequence-number interpretation on the order side.

| Entry | Kind |
| --- | --- |
| Order callback rules | topic |
| Contingent order rules | topic |
| Important sequence numbers | topic |

## Order callback rules

This section explains the rule set, overview, or release topic represented by `Order callback rules`.

- Kind: topic
- Related symbols: `OnRtnOrder`, `OnRtnTrade`, `OnRspOrderInsert`, `OnErrRtnOrderInsert`, `ReqOrderInsert`, `ReqOrderAction`, `OnRspOrderAction`, `OnErrRtnOrderAction`

**When to use it**

- Review the rule before implementing the related API path.
- Use the topic as a checklist when diagnosing production behavior.

**How to apply it**

1. Read this section before implementing the related integration path.
2. Map the rule or overview to the request and callback symbols affected by it.

**Callback and outcome model**

- Success path: `OnRtnOrder`, `OnRtnTrade`, `OnRspOrderInsert`, `OnRspOrderAction`.
- Error path: `OnErrRtnOrderInsert`, `OnErrRtnOrderAction`.

**Implementation notes**

- Use this section together with the related request and callback entries so the rules become concrete in code.

## Contingent order rules

This section explains the rule set, overview, or release topic represented by `Contingent order rules`.

- Kind: topic
- Related symbols: `ReqOrderInsert`, `OnRtnOrder`, `OnRtnErrorConditionalOrder`, `OnRtnTrade`

**When to use it**

- Review the rule before implementing the related API path.
- Use the topic as a checklist when diagnosing production behavior.

**How to apply it**

1. Read this section before implementing the related integration path.
2. Map the rule or overview to the request and callback symbols affected by it.

**Callback and outcome model**

- Success path: `OnRtnOrder`, `OnRtnErrorConditionalOrder`, `OnRtnTrade`.

**Implementation notes**

- Use this section together with the related request and callback entries so the rules become concrete in code.

## Important sequence numbers

This section explains the rule set, overview, or release topic represented by `Important sequence numbers`.

- Kind: topic
- Related symbols: `ReqOrderInsert`, `OnRtnOrder`, `OnRtnTrade`, `ReqQuoteInsert`, `OnRtnQuote`, `ReqOptionSelfCloseInsert`, `OnRtnOptionSelfClose`

**When to use it**

- Review the rule before implementing the related API path.
- Use the topic as a checklist when diagnosing production behavior.

**How to apply it**

1. Read this section before implementing the related integration path.
2. Map the rule or overview to the request and callback symbols affected by it.

**Callback and outcome model**

- Success path: `OnRtnOrder`, `OnRtnTrade`, `OnRtnQuote`, `OnRtnOptionSelfClose`.

**Implementation notes**

- Use this section together with the related request and callback entries so the rules become concrete in code.
