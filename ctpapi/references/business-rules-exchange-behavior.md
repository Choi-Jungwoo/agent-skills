# CTP business rules for exchange-specific behavior

This reference covers exchange-specific market-data and instruction differences, contract status changes, and venue-specific command behavior.

| Entry | Kind |
| --- | --- |
| Exchange-specific market data differences | topic |
| Instrument status transition notes | topic |
| Exchange-specific special instructions | topic |

## Exchange-specific market data differences

This section explains the rule set, overview, or release topic represented by `Exchange-specific market data differences`.

- Kind: topic
- Related symbols: `CreateFtdcMdApi`

**When to use it**

- Review the rule before implementing the related API path.
- Use the topic as a checklist when diagnosing production behavior.

**How to apply it**

1. Read this section before implementing the related integration path.
2. Map the rule or overview to the request and callback symbols affected by it.

**Implementation notes**

- Use this section together with the related request and callback entries so the rules become concrete in code.

## Instrument status transition notes

This section explains the rule set, overview, or release topic represented by `Instrument status transition notes`.

- Kind: topic
- Related symbols: `OnRtnInstrumentStatus`

**When to use it**

- Review the rule before implementing the related API path.
- Use the topic as a checklist when diagnosing production behavior.

**How to apply it**

1. Read this section before implementing the related integration path.
2. Map the rule or overview to the request and callback symbols affected by it.

**Callback and outcome model**

- Success path: `OnRtnInstrumentStatus`.

**Implementation notes**

- Use this section together with the related request and callback entries so the rules become concrete in code.

## Exchange-specific special instructions

This section explains the rule set, overview, or release topic represented by `Exchange-specific special instructions`.

- Kind: topic
- Related symbols: `ReqOrderInsert`, `ReqCombActionInsert`

**When to use it**

- Review the rule before implementing the related API path.
- Use the topic as a checklist when diagnosing production behavior.

**How to apply it**

1. Read this section before implementing the related integration path.
2. Map the rule or overview to the request and callback symbols affected by it.

**Implementation notes**

- Use this section together with the related request and callback entries so the rules become concrete in code.
