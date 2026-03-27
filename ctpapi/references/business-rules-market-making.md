# CTP business rules for market making and quote callbacks

This reference covers the rule sets that shape market-maker inquiry and quote behavior, especially around quote-side sequencing.

| Entry | Kind |
| --- | --- |
| Market maker inquiry and quote | topic |
| Quote callback rules | topic |

## Market maker inquiry and quote

This section explains the rule set, overview, or release topic represented by `Market maker inquiry and quote`.

- Kind: topic
- Related symbols: `ReqForQuoteInsert`, `OnRspForQuoteInsert`, `OnRtnForQuoteRsp`, `OnErrRtnForQuoteInsert`, `ReqQryForQuote`, `OnRspQryForQuote`, `ReqQuoteInsert`, `ReqOrderInsert`, `OnRspQuoteInsert`, `OnRtnQuote`

**When to use it**

- Review the rule before implementing the related API path.
- Use the topic as a checklist when diagnosing production behavior.

**How to apply it**

1. Read this section before implementing the related integration path.
2. Map the rule or overview to the request and callback symbols affected by it.

**Callback and outcome model**

- Success path: `OnRspForQuoteInsert`, `OnRtnForQuoteRsp`, `OnRspQryForQuote`, `OnRspQuoteInsert`, `OnRtnQuote`, `OnRtnOrder`, `OnRtnTrade`, `OnRspQryQuote`.
- Error path: `OnErrRtnForQuoteInsert`.

**Implementation notes**

- Use this section together with the related request and callback entries so the rules become concrete in code.

## Quote callback rules

This section explains the rule set, overview, or release topic represented by `Quote callback rules`.

- Kind: topic
- Related symbols: `OnRtnQuote`, `OnRtnOrder`, `OnRtnTrade`, `ReqQuoteInsert`, `OnErrRtnOrderAction`

**When to use it**

- Review the rule before implementing the related API path.
- Use the topic as a checklist when diagnosing production behavior.

**How to apply it**

1. Read this section before implementing the related integration path.
2. Map the rule or overview to the request and callback symbols affected by it.

**Callback and outcome model**

- Success path: `OnRtnQuote`, `OnRtnOrder`, `OnRtnTrade`.
- Error path: `OnErrRtnOrderAction`.

**Implementation notes**

- Use this section together with the related request and callback entries so the rules become concrete in code.
