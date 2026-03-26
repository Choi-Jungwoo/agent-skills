# Order Execution & Data Types

## OrderClientSafe

Synchronous thread-safe order wrapper.

```
OrderClientSafe(MT5API api)
```

| Member | Type |
|--------|------|
| `Api` | `MT5API { get; }` |
| `TradeTimeoutSafe` | `int` |

| Method | Signature |
|--------|-----------|
| `OrderSend` | `Order OrderSend(string symbol, double lots, double price, OrderType type, double sl = 0, double tp = 0, ulong deviation = 0, string comment = null, FillPolicy fillPolicy = Any, TradeType tradeType = Transfer, double stoplimit = 0, Expiration expiration = null, long closeByTicket = 0, PlacedType placedType = Manually)` |
| `OrderClose` | `Order OrderClose(long ticket, string symbol, double price, double lots, OrderType type, ulong deviation = 0, FillPolicy fillPolicy = Any, long closeByTicket = 0, PlacedType placedType = Manually)` |
| `OrderDelete` | `void OrderDelete(long ticket, OrderType type, string symbol, double lots, double price)` |
| `OrderModify` | `void OrderModify(long ticket, string symbol, double lots, double price, OrderType type, double sl, double tp, long expertId = 0, double stoplimit = 0, Expiration expiration = null, string comment = null)` |

## OrderClientSafeAsync

Async thread-safe order wrapper.

```
OrderClientSafeAsync(MT5API api)
```

| Member | Type |
|--------|------|
| `Api` | `MT5API { get; }` |
| `TradeTimeoutSafe` | `int { get; set; }` |

| Method | Signature |
|--------|-----------|
| `OrderSendAsync` | `Task<Order> OrderSendAsync(string symbol, double lots, double price, OrderType type, double sl = 0, double tp = 0, ulong deviation = 0, string comment = null, FillPolicy fillPolicy = Any, TradeType tradeType = Transfer, double stoplimit = 0, Expiration expiration = null, long closeByTicket = 0, PlacedType placedType = Manually, CancellationToken ct = null)` |
| `OrderCloseAsync` | `Task<Order> OrderCloseAsync(long ticket, string symbol, double price, double lots, OrderType type, ulong deviation = 0, FillPolicy fillPolicy = Any, long closeByTicket = 0, PlacedType placedType = Manually, CancellationToken ct = null, string comment = null)` |
| `OrderDeleteAsync` | `Task OrderDeleteAsync(long ticket, OrderType type, string symbol, double lots, double price, CancellationToken ct = null)` |
| `OrderModifyAsync` | `Task OrderModifyAsync(long ticket, string symbol, double lots, double price, OrderType type, double sl, double tp, long expertId = 0, double stoplimit = 0, Expiration expiration = null, string comment = null, CancellationToken ct = null)` |

## Order

| Field | Type |
|-------|------|
| `Ticket` | `long` |
| `Symbol` | `string` |
| `OrderType` | `OrderType` |
| `DealType` | `DealType` |
| `State` | `OrderState` |
| `OpenPrice` | `double` |
| `ClosePrice` | `double` |
| `OpenTime` | `DateTime` |
| `CloseTime` | `DateTime` |
| `Lots` | `double` |
| `CloseLots` | `double` |
| `Profit` | `double` |
| `Swap` | `double` |
| `Commission` | `double` |
| `Fee` | `double` |
| `ContractSize` | `double` |
| `StopLoss` | `double` |
| `TakeProfit` | `double` |
| `StopLimitPrice` | `double` |
| `Comment` | `string` |
| `CloseComment` | `string` |
| `ExpertId` | `long` |
| `PlacedType` | `PlacedType` |
| `RequestId` | `int` |
| `Digits` | `int` |
| `ProfitRate` | `double` |
| `DealInternalIn` | `DealInternal` |
| `DealInternalOut` | `DealInternal` |
| `OrderInternal` | `OrderInternal` |
| `PartialCloseDeals` | `DealInternal[]` |
| `PartialFillDeals` | `DealInternal[]` |

| Property | Type |
|----------|------|
| `Volume` | `ulong { get; }` |
| `CloseVolume` | `ulong { get; }` |
| `FillPolicy` | `FillPolicy { get; }` |
| `ExpirationType` | `ExpirationType { get; }` |
| `ExpirationTime` | `DateTime { get; }` |
| `OpenTimestampUTC` | `long { get; }` |
| `CloseTimestampUTC` | `long { get; }` |

| Method | Signature |
|--------|-----------|
| `Clone` | `Order Clone()` |
| `GetPartialCloseDeals` | `DealInternal[] GetPartialCloseDeals(DealInternal[] deals)` |
| `SortAndTrimDealsNotClosed` | `static DealInternal[] SortAndTrimDealsNotClosed(DealInternal[] deals)` |

## OrderInternal

| Field | Type |
|-------|------|
| `TicketNumber` | `long` |
| `Id` | `string` |
| `Login` | `ulong` |
| `Symbol` | `string` |
| `HistoryTime` | `long` |
| `OpenTime` | `long` |
| `ExpirationTime` | `long` |
| `ExecutionTime` | `long` |
| `Type` | `OrderType` |
| `FillPolicy` | `FillPolicy` |
| `ExpirationType` | `ExpirationType` |
| `PlacedType` | `PlacedType` |
| `OpenPrice` | `double` |
| `StopLimitPrice` | `double` |
| `Price` | `double` |
| `StopLoss` | `double` |
| `TakeProfit` | `double` |
| `Volume` | `ulong` |
| `RequestVolume` | `ulong` |
| `State` | `OrderState` |
| `ExpertId` | `long` |
| `DealTicket` | `long` |
| `Comment` | `string` |
| `ContractSize` | `double` |
| `Digits` | `int` |
| `BaseDigits` | `int` |
| `ProfitRate` | `double` |
| `OpenTimeMs` | `long` |

| Property | Type |
|----------|------|
| `Ticket` | `long { get; }` |
| `Lots` | `double { get; }` |
| `RequestLots` | `double { get; }` |
| `ExecutionTimeAsDateTime` | `DateTime { get; }` |
| `OpenTimeMsAsDateTime` | `DateTime { get; }` |
| `OpenTimeAsDateTime` | `DateTime { get; }` |

| Method | Returns |
|--------|---------|
| `IsAssociativeDealOrder()` | `bool` |
| `IsTradeOrder()` | `bool` |
| `IsLimitOrder()` | `bool` |
| `IsStopOrder()` | `bool` |
| `IsBuyOrder()` | `bool` |
| `IsStopLimitOrder()` | `bool` |
| `AreEquals(OrderInternal other)` | `bool` |

## DealInternal

| Field | Type |
|-------|------|
| `TicketNumber` | `long` |
| `Id` | `string` |
| `Login` | `ulong` |
| `HistoryTime` | `long` |
| `OrderTicket` | `long` |
| `OpenTime` | `long` |
| `Symbol` | `string` |
| `Type` | `DealType` |
| `Direction` | `Direction` |
| `OpenPrice` | `double` |
| `Price` | `double` |
| `StopLoss` | `double` |
| `TakeProfit` | `double` |
| `Volume` | `ulong` |
| `Profit` | `double` |
| `ProfitRate` | `double` |
| `VolumeRate` | `double` |
| `Commission` | `double` |
| `Fee` | `double` |
| `Swap` | `double` |
| `ExpertId` | `long` |
| `PositionTicket` | `long` |
| `Comment` | `string` |
| `ContractSize` | `double` |
| `Digits` | `int` |
| `MoneyDigits` | `int` |
| `FreeProfit` | `double` |
| `TrailRounder` | `double` |
| `OpenTimeMs` | `long` |
| `PlacedType` | `PlacedType` |

| Property | Type |
|----------|------|
| `OpenTimeAsDateTime` | `DateTime { get; }` |
| `Lots` | `double { get; }` |
