---
name: mt5api:docs
description: >
  Complete API reference for the mt5api.dll (.NET wrapper for MetaTrader 5).
  This skill MUST be referenced automatically whenever the user works with
  MT5 API types, trading operations, order execution, symbol data, account
  management, or any code that touches the mtapi.mt5 namespace. Also use it
  when the user asks about available MT5 methods, enums, events, or data
  structures — even if they don't explicitly say "mt5api".
---

# mt5api.dll API Reference

Read the relevant reference file based on the user's question:

| Topic | File | When to read |
|-------|------|--------------|
| MT5API class | `references/client.md` | Connection, account properties, server timing, cluster, configuration, proxy, events |
| Order execution | `references/orders.md` | OrderSend/Close/Modify, OrderClientSafe(Async), Order/OrderInternal/DealInternal types |
| Order enums | `references/order-enums.md` | OrderType, OrderState, DealType, FillPolicy, PlacedType, TradeType, TradeMode, etc. |
| Events & payloads | `references/events.md` | Event delegates, OrderProgress, OrderUpdate, TransactionInfo, TradeRequest/Result, ConnectProgress |
| Quotes & market data | `references/quotes.md` | Quote, MarketWatch, Bar, TickBar, BookBar, SymbolBook, order book |
| Symbol information | `references/symbols.md` | Symbols registry, SymbolInfo, SymGroup, sessions, CalculationMode, MarginMode |
| Account & server | `references/account-server.md` | AccountRec, ServerRec, ServerInfo, ClusterDetails, Access, AddressRec, MailMessage |
| History & analytics | `references/history.md` | EquityPoint, BalancePoint, EquityTimeframe, Expiration, history download methods |
| Commission & swap | `references/commission.md` | ComissionInfo, Comission, commission/swap enums |
| Server response codes | `references/msg-codes.md` | Msg enum — all ~150 server response/error codes |
| Exceptions | `references/exceptions.md` | ServerException, ConnectException, InvalidSymbolException, etc. |
