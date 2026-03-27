# Order Lifecycle Enums

## OrderType

```
Buy = 0, Sell = 1,
BuyLimit = 2, SellLimit = 3,
BuyStop = 4, SellStop = 5,
BuyStopLimit = 6, SellStopLimit = 7,
CloseBy = 8,
Balance = 100, Credit = 101
```

## OrderState

```
Started = 0, Placed = 1, Cancelled = 2, Partial = 3,
Filled = 4, Rejected = 5, Expired = 6,
RequestAdding = 7, RequestModifying = 8, RequestCancelling = 9
```

## DealType

```
DealBuy = 0, DealSell = 1, Balance = 2, Credit = 3,
Charge = 4, Correction = 5, Bonus = 6, Commission = 7,
DailyCommission = 8, MonthlyCommission = 9,
DailyAgentCommission = 10, MonthlyAgentCommission = 11,
InterestRate = 12, CanceledBuy = 13, CanceledSell = 14,
Dividend = 15, FrankedDividend = 16, Tax = 17,
AgentCommission = 18, SoCompensation = 19, SoCreditCompensation = 20
```

## Direction

```
In = 0, Out = 1, InOut = 2, OutBy = 3
```

## FillPolicy

```
FillOrKill = 0, ImmediateOrCancel = 1, FlashFill = 2, Any = 3
```

## ExpirationType

```
GTC = 0, Today = 1, Specified = 2, SpecifiedDay = 3
```

## PlacedType

```
Manually = 0, ByExpert = 1, ByDealer = 2,
OnSL = 3, OnTP = 4, OnStopOut = 5, OnRollover = 6,
OnVmargin = 8, Gateway = 9, Signal = 10, Settlement = 11,
Transfer = 12, Sync = 13, ExternalService = 14, Migration = 15,
Mobile = 16, Web = 17, OnSplit = 18, Default = 20
```

## TradeType

```
TradePrice = 0, RequestExecution = 1, InstantExecution = 2,
MarketExecution = 3, ExchangeExecution = 4,
SetOrder = 5, ModifyDeal = 6, ModifyOrder = 7,
CancelOrder = 8, Transfer = 9, ClosePosition = 10,
ActivateOrder = 100, ActivateStopLoss = 101, ActivateTakeProfit = 102,
ActivateStopLimitOrder = 103, ActivateStopOutOrder = 104,
ActivateStopOutPosition = 105, ExpireOrder = 106,
ForSetOrder = 200, ForOrderPrice = 201, ForModifyDeal = 202,
ForModifyOrder = 203, ForCancelOrder = 204, ForActivateOrder = 205,
ForBalance = 206, ForActivateStopLimitOrder = 207, ForClosePosition = 208
```

## TradeMode

```
Disabled = 0, LongOnly = 1, ShortOnly = 2, CloseOnly = 3, FullAccess = 4
```

## ExecutionType

```
Request = 0, Instant = 1, Market = 2, Exchange = 3
```

## OrderSort

```
OpenTime = 0, CloseTime = 1
```

## AccMethod

```
Default = 0, Netting = 1, Hedging = 2
```
