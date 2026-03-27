# CTP business rules for control limits

This reference covers control-limit behavior around order flow, query flow, and session counts.

| Entry | Kind |
| --- | --- |
| Order and query rate control, and session count control | topic |

## Order and query rate control, and session count control

This section explains the rule set, overview, or release topic represented by `Order and query rate control, and session count control`.

- Kind: topic
- Related symbols: `ReqOrderInsert`, `ReqOrderAction`, `OnRspOrderAction`, `OnRspError`, `ReqQuery`, `OnRspUserLogin`, `OnRtnOrder`

**When to use it**

- Review the rule before implementing the related API path.
- Use the topic as a checklist when diagnosing production behavior.

**How to apply it**

1. Read this section before implementing the related integration path.
2. Map the rule or overview to the request and callback symbols affected by it.

**Callback and outcome model**

- Success path: `OnRspOrderAction`, `OnRspError`, `OnRspUserLogin`, `OnRtnOrder`.
- Error path: `OnRspError`.

**Implementation notes**

- Use this section together with the related request and callback entries so the rules become concrete in code.
