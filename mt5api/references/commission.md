# Commission & Swap

## ComissionInfo

| Field | Type |
|-------|------|
| `Comissions` | `Comission[]` |
| `GroupName` | `string` |
| `Type` | `CommissionType` |
| `Period` | `CommissionPeriod` |
| `MoneyCurrency` | `string` |
| `InstantType` | `InstantCommissionType` |

## Comission

| Field | Type |
|-------|------|
| `UnitType` | `vCommissionUnitType` |
| `UnitMode` | `vCommissionUnitMode` |
| `UnitValue` | `double` |
| `MinValue` | `double` |
| `MaxValue` | `double` |
| `MinUnit` | `double` |
| `CurrencyUnit` | `string` |
| `MaxUnit` | `double` |

## CommissionType

```
vFlatCommission = 0, vLayerCommission = 1
```

## CommissionPeriod

```
vPerDailyCommission = 0, vPerMonthlyCommission = 1, vPerInstantCommission = 2
```

## InstantCommissionType

```
vInOutDealsCommission = 0, vInDealsCommission = 1, vOutDealsCommission = 2
```

## vCommissionUnitType

```
vCurrencyUnit = 0, vBaseCurrencyUnit = 1, vProfitCurrencyUnit = 2,
vMarginCurrencyUnit = 3, vPointsUnit = 4, vMoneyCurrencyUnit = 5,
vSpecifiedUnit = 6, vProfitUnit = 7
```

## vCommissionUnitMode

```
vPerDealCommission = 0, vPerLotCommission = 1, vPerValueCommission = 2
```

## SwapType

```
SwapNone = 0, InPoints = 1, SymInfo_s408 = 2,
MarginCurrency = 3, Currency = 4,
PercCurPrice = 5, PercOpenPrice = 6,
PointClosePrice = 7, PointBidPrice = 8
```

## V3DaysSwap

```
Sunday = 0, Monday = 1, Tuesday = 2, Wednesday = 3,
Thursday = 4, Friday = 5, Saturday = 6
```
