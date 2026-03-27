# Symbol Information

## Symbols

The symbol registry, accessible via `MT5API.Symbols`.

| Field | Type |
|-------|------|
| `Base` | `SymBaseInfo` |
| `SymGroups` | `SymGroup[]` |
| `Sessions` | `ConcurrentDictionary<string, SymbolSessions>` |
| `Groups` | `ConcurrentDictionary<string, SymGroup>` |
| `Infos` | `ConcurrentDictionary<string, SymbolInfo>` |
| `InfosById` | `ConcurrentDictionary<int, SymbolInfo>` |

| Property | Type |
|----------|------|
| `Names` | `string[] { get; }` |
| `GroupNames` | `string[] { get; }` |
| `Comissions` | `ComissionInfo[] { get; set; }` |

| Method | Signature |
|--------|-----------|
| `GetInfo` | `SymbolInfo GetInfo(string symbol)` / `SymbolInfo GetInfo(int id)` |
| `GetGroup` | `SymGroup GetGroup(string symbol)` |
| `GetGroupByName` | `SymGroup GetGroupByName(string groupName)` |
| `Exist` | `bool Exist(string symbol)` |
| `ExistStartsWith` | `string ExistStartsWith(string symbol)` |
| `GetComission` | `ComissionInfo GetComission(string symbol)` |

## SymbolInfo

| Field | Type |
|-------|------|
| `UpdateTime` | `long` |
| `Currency` | `string` |
| `ISIN` | `string` |
| `Description` | `string` |
| `Basis` | `string` |
| `RefToSite` | `string` |
| `Custom` | `int` |
| `ProfitCurrency` | `string` |
| `MarginCurrency` | `string` |
| `Precision` | `int` |
| `BkgndColor` | `int` |
| `Digits` | `int` |
| `Points` | `double` |
| `LimitPoints` | `double` |
| `Id` | `int` |
| `DepthOfMarket` | `int` |
| `Spread` | `int` |
| `TickValue` | `double` |
| `TickSize` | `double` |
| `ContractSize` | `double` |
| `GTCMode` | `GTCMode` |
| `CalcMode` | `CalculationMode` |
| `SettlementPrice` | `double` |
| `LowerLimit` | `double` |
| `UpperLimit` | `double` |
| `FaceValue` | `double` |
| `AccruedInterest` | `double` |
| `FirstTradeTime` | `long` |
| `LastTradeTime` | `long` |
| `bid_tickvalue` | `double` |
| `ask_tickvalue` | `double` |

## SymGroup

| Field | Type |
|-------|------|
| `GroupName` | `string` |
| `DeviationRate` | `int` |
| `RoundRate` | `int` |
| `TradeMode` | `TradeMode` |
| `SL` | `int` |
| `TP` | `int` |
| `TradeType` | `ExecutionType` |
| `FillPolicy` | `FillingFlags` |
| `Expiration` | `ExpirationFlags` |
| `OrderFlags` | `int` |
| `PriceTimeout` | `int` |
| `RequoteTimeout` | `int` |
| `RequestLots` | `uint` |
| `MinVolume` | `ulong` |
| `MaxVolume` | `ulong` |
| `VolumeStep` | `long` |
| `InitialMargin` | `double` |
| `MaintenanceMargin` | `double` |
| `InitMarginRate` | `double[]` |
| `MntnMarginRate` | `double[]` |
| `HedgedMargin` | `double` |
| `SwapType` | `SwapType` |
| `SwapLong` | `double` |
| `SwapShort` | `double` |
| `ThreeDaysSwap` | `V3DaysSwap` |
| `SwapRates` | `double[]` |

| Property | Type |
|----------|------|
| `MinLots` | `double { get; }` |
| `MaxLots` | `double { get; }` |
| `LotsStep` | `double { get; }` |

## SymbolSessions

| Field | Type |
|-------|------|
| `Quotes` | `List<Session>[]` |
| `Trades` | `List<Session>[]` |

## Session

| Field | Type |
|-------|------|
| `StartTime` | `int` |
| `EndTime` | `int` |

## CalculationMode

```
Forex = 0, Futures = 1, CFD = 2, CFDIndex = 3, CFDLeverage = 4,
CalcMode5 = 5, ExchangeStocks = 32, ExchangeFutures = 33,
FORTSFutures = 34, ExchangeOption = 35, ExchangeMarginOption = 36,
ExchangeBounds = 37, Collateral = 64
```

## MarginMode

```
MarginForex = 0, MarginFutures = 1, vMarginCFD = 2, MarginCFDIndex = 3
```

## GTCMode

```
Cancelled = 0, TodayIncludeSL_TP = 1, TodayExcludeSL_TP = 2
```

## ExpirationFlags

```
NONE = 0, GTC = 1, DAY = 2, SPECIFIED = 4, SPECIFIED_DAY = 8, ALL = 15
```

## FillingFlags

```
NONE = 0, FOK = 1, IOC = 2, BOC = 4
```
