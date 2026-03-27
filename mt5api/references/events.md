# Events & Real-Time Payloads

## Event Delegates

| Delegate | Signature |
|----------|-----------|
| `OnQuote` | `void (MT5API sender, Quote quote)` |
| `OnOrderUpdate` | `void (MT5API sender, OrderUpdate update)` |
| `OnOrderProgress` | `void (MT5API sender, OrderProgress progress)` |
| `OnOrderHistory` | `void (MT5API sender, OrderHistoryEventArgs args)` |
| `OnConnectProgress` | `void (MT5API sender, ConnectEventArgs args)` |
| `OnSymbolUpdate` | `void (MT5API sender, SymbolUpdate update)` |
| `OnSymbolsUpdate` | `void (MT5API sender)` |
| `OnQuoteHistory` | `void (MT5API sender, QuoteHistoryEventArgs args)` |
| `OnTickHistory` | `void (MT5API sender, TickHistoryEventArgs args)` |
| `OnMail` | `void (MT5API sender, MailMessage msg)` |
| `OnOrderBook` | `void (MT5API sender, MarketDepthEventArgs args)` |

## OrderProgress

Fired by `OnOrderProgress` at each step of order execution.

| Field | Type |
|-------|------|
| `OrderUpdate` | `TransactionInfo` |
| `TradeRequest` | `TradeRequest` |
| `TradeResult` | `TradeResult` |

## OrderProgressEventArgs

| Field | Type |
|-------|------|
| `TempID` | `int` |
| `Type` | `ProgressType` |
| `Exception` | `Exception` |

## ProgressType

```
Rejected = 0, Accepted = 1, InProcess = 2,
Opened = 3, Closed = 4, Modified = 5,
PendingDeleted = 6, ClosedBy = 7, MultipleClosedBy = 8,
Timeout = 9, Price = 10, Exception = 11
```

## OrderUpdate

Fired by `OnOrderUpdate` after server confirms a state change.

| Field | Type |
|-------|------|
| `Type` | `UpdateType` |
| `Trans` | `TransactionInfo` |
| `Order` | `Order` |
| `OrderInternal` | `OrderInternal` |
| `Deal` | `DealInternal` |
| `OppositeDeal` | `DealInternal` |
| `CloseByTicket` | `long` |

| Method | Signature |
|--------|-----------|
| `AreEqual` | `static bool AreEqual(OrderUpdate a, OrderUpdate b)` |

## UpdateType

```
Unknown = 0, PendingClose = 1, MarketOpen = 2, PendingOpen = 3,
MarketClose = 4, PartialClose = 5, Started = 6, Filled = 7,
Cancelling = 8, MarketModify = 9, PendingModify = 10,
OnStopLoss = 11, OnTakeProfit = 12, OnStopOut = 13,
Balance = 14, Expired = 15, Rejected = 16
```

## TransactionInfo

| Field | Type |
|-------|------|
| `UpdateId` | `int` |
| `Action` | `int` |
| `TicketNumber` | `long` |
| `Currency` | `string` |
| `Id` | `int` |
| `OrderType` | `OrderType` (field: `s58`) |
| `OrderState` | `OrderState` |
| `ExpirationType` | `ExpirationType` |
| `ExpirationTime` | `long` |
| `OpenPrice` | `double` |
| `OrderPrice` | `double` |
| `StopLoss` | `double` |
| `TakeProfit` | `double` |
| `Volume` | `ulong` |

## TradeRequest

| Field | Type |
|-------|------|
| `RequestId` | `int` |
| `TradeType` | `TradeType` |
| `Login` | `ulong` |
| `TransferLogin` | `ulong` |
| `Currency` | `string` |
| `Digits` | `int` |
| `OrderTicket` | `long` |
| `ExpirationTime` | `long` |
| `OrderType` | `OrderType` |
| `FillPolicy` | `FillPolicy` |
| `ExpirationType` | `ExpirationType` |
| `Flags` | `long` |
| `PlacedType` | `PlacedType` |
| `Price` | `double` |
| `OrderPrice` | `double` |
| `StopLoss` | `double` |
| `TakeProfit` | `double` |
| `Deviation` | `ulong` |
| `ExpertId` | `long` |
| `Comment` | `string` |
| `DealTicket` | `long` |
| `ByCloseTicket` | `long` |

| Property | Type |
|----------|------|
| `Lots` | `double { get; }` |

## TradeResult

| Field | Type |
|-------|------|
| `Status` | `Msg` |
| `PositionId` | `long` |
| `TicketNumber` | `long` |
| `Volume` | `ulong` |
| `OpenPrice` | `double` |
| `Bid` | `double` |
| `Ask` | `double` |
| `Last` | `double` |
| `Comment` | `string` |

## ConnectEventArgs

| Field | Type |
|-------|------|
| `Exception` | `Exception` |
| `Progress` | `ConnectProgress` |

## ConnectProgress

```
SendLogin = 0, SendAccountPassword = 1, AcceptAuthorized = 2,
RequestTradeInfo = 3, Connected = 4, Exception = 5, Disconnect = 6
```

## OrderHistoryEventArgs

| Field | Type |
|-------|------|
| `Orders` | `List<Order>` |
| `InternalDeals` | `List<DealInternal>` |
| `InternalOrders` | `List<OrderInternal>` |
| `Action` | `int` |

| Property | Type |
|----------|------|
| `PartialResponse` | `bool { get; }` |

## QuoteHistoryEventArgs

| Field | Type |
|-------|------|
| `Symbol` | `string` |
| `Bars` | `List<Bar>` |

## TickHistoryEventArgs

| Field | Type |
|-------|------|
| `Symbol` | `string` |
| `Bars` | `TickBar[]` |

## MarketDepthEventArgs

| Field | Type |
|-------|------|
| `Symbol` | `string` |
| `BookRecord` | `SymbolBook` |

## SymbolUpdate (Struct)

| Property | Type |
|----------|------|
| `Symbol` | `string { get; set; }` |
| `Group` | `SymGroup { get; set; }` |
| `Sessions` | `SymbolSessions { get; set; }` |
| `Action` | `UpdateAction { get; set; }` |

## UpdateAction (Struct)

```
Add = 0, Update = 1, Delete = 2
```
