---
name: ctpapi
description: >
  Complete CTP API documentation skill. Use when the user invokes
  `/ctpapi` or asks about CTP internal runtime behavior, market data
  APIs, trader APIs, SPI callbacks, request and response structures, field
  definitions, login and session flow, order and quote flow, bank-futures
  transfer APIs, query methods, risk and margin models, TGate access, or
  exchange-specific CTP business rules.
---

# CTP API documentation skill

This skill provides a Markdown-only CTP reference corpus. The references are
grouped by topic so you can load the smallest relevant file first and then
answer from the structured English summaries, signatures, related symbols, and
key types.

| Topic | File | Read when |
| --- | --- | --- |
| API directory | `references/api-directory.md` | You need to locate the smallest reference file for a class, method, callback, helper API, or appendix topic |
| Document shell and release context | `references/interface-overviews.md`, `references/overview-versioning.md` | You need the table of contents, the document entry point, release notes, or overall navigation context |
| Supervision and system collection | `references/data-collection.md` | You need `CTP-GetSystemInfo`, `CTP-GetDataCollectApiVersion`, or the look-through supervision workflow |
| Market data runtime | `references/market-data-api-core.md`, `references/market-data-api-login.md`, `references/market-data-api-subscriptions.md`, `references/market-data-api-multicast.md` | You need market-data startup, login, subscription management, or multicast discovery |
| Market data callbacks | `references/market-data-spi-core.md`, `references/market-data-spi-session.md`, `references/market-data-spi-subscriptions.md`, `references/market-data-spi-streams.md` | You need market-data connection, session, subscription, or live streaming callbacks |
| Trader runtime and auth | `references/trader-api-runtime.md`, `references/trader-api-authentication.md`, `references/trader-api-login-session.md`, `references/trader-api-system-info.md` | You need trader startup, authentication variants, login session behavior, topic replay policy, or system-info submission |
| Trader order workflows | `references/trader-api-order-entry.md`, `references/trader-api-quote-flows.md`, `references/trader-api-exec-option-combination.md`, `references/trader-api-parked-orders.md` | You need order entry, quote flows, exec-order paths, option self-close paths, combination actions, or parked orders |
| Trader bank and CFMMC | `references/trader-api-bank-transfers.md`, `references/trader-api-bank-reference.md`, `references/trader-api-cfmmc-security.md` | You need bank-futures transfer requests, bank reference queries, or CFMMC security material |
| Trader core queries | `references/trader-api-query-broker-exchange.md`, `references/trader-api-query-instruments-costs.md`, `references/trader-api-query-investor-positions.md`, `references/trader-api-query-order-trade-state.md`, `references/trader-api-query-settlement-accounts.md` | You need trader-side metadata, instrument, investor, order, trade, settlement, or account queries |
| Trader risk queries | `references/trader-api-risk-spbm.md`, `references/trader-api-risk-spmm.md`, `references/trader-api-risk-rcams-rule.md`, `references/trader-api-risk-offset-portfolio.md` | You need SPBM, SPMM, RCAMS, RULE, offset-setting, or portfolio configuration queries |
| Trader core error callbacks | `references/trader-spi-core-connection-auth.md`, `references/trader-spi-core-order-errors.md`, `references/trader-spi-core-bank-errors.md` | You need trader connection/authentication callbacks or asynchronous error returns |
| Trader runtime notifications | `references/trader-spi-responses-orders.md`, `references/trader-spi-responses-bank-config.md`, `references/trader-spi-notifications-orders.md`, `references/trader-spi-notifications-bank.md`, `references/trader-spi-notifications-system.md` | You need direct trader responses or asynchronous notifications for orders, bank flows, instruments, and notices |
| Trader query callbacks | `references/trader-spi-query-broker-exchange.md`, `references/trader-spi-query-instruments.md`, `references/trader-spi-query-investor-positions.md`, `references/trader-spi-query-orders-trades.md`, `references/trader-spi-query-settlement-accounts.md`, `references/trader-spi-query-bank.md`, `references/trader-spi-query-risk-models.md` | You need `OnRspQry*` callback payloads and result-stream handling |
| TGate guidance | `references/tgate-access.md` | You need TGate access guidance or TGate-specific release notes |
| Business-rule appendices | `references/business-rules-overview.md`, `references/business-rules-market-making.md`, `references/business-rules-ordering.md`, `references/business-rules-connectivity.md`, `references/business-rules-exchange-behavior.md`, `references/business-rules-trading-models.md`, `references/business-rules-risk-controls.md` | You need operational rules, callback ordering, transport rules, exchange differences, trading-model notes, or control limits |
