# Quotes & Market Data

## Quote

| Field | Type |
|-------|------|
| `Symbol` | `string` |
| `Bid` | `double` |
| `Ask` | `double` |
| `Time` | `DateTime` |
| `Last` | `double` |
| `Volume` | `ulong` |

## MarketWatch

| Field | Type |
|-------|------|
| `Symbol` | `string` |
| `High` | `double` |
| `Low` | `double` |
| `OpenPrice` | `double` |
| `ClosePrice` | `double` |
| `DailyChange` | `double` |
| `Bid` | `double` |
| `Ask` | `double` |
| `Spread` | `int` |
| `Volume` | `ulong` |

## Bar

| Field | Type |
|-------|------|
| `Time` | `DateTime` |
| `OpenPrice` | `double` |
| `HighPrice` | `double` |
| `LowPrice` | `double` |
| `ClosePrice` | `double` |
| `TickVolume` | `ulong` |
| `Spread` | `int` |
| `Volume` | `ulong` |

## TickBar

| Field | Type |
|-------|------|
| `Time` | `DateTime` |
| `Bid` | `double` |
| `Ask` | `double` |
| `Last` | `double` |
| `Volume` | `ulong` |

## TickBarRecord

| Field | Type |
|-------|------|
| `TimeMs` | `long` |
| `Index` | `int` |
| `Bid` | `long` |
| `Ask` | `long` |
| `Last` | `long` |
| `Volume` | `ulong` |
| `UpdateMask` | `ulong` |
| `BankId` | `uint` |

## BookBar

| Field | Type |
|-------|------|
| `UpdateMask` | `ulong` |
| `Type` | `BookBarType` |
| `Price` | `double` |
| `Volume` | `ulong` |

| Property | Type |
|----------|------|
| `Lots` | `double { get; }` |

## BookBarType

```
Reset = 0, SellBook = 1, BuyBook = 2, SellMarket = 3, BuyMarket = 4
```

## SymbolBook

| Field | Type |
|-------|------|
| `Symbol` | `string` |
| `Bars` | `ConcurrentDictionary<double, BookBar>` |
