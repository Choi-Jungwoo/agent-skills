# Account & Server

## AccountRec

| Field | Type |
|-------|------|
| `Login` | `ulong` |
| `Type` | `string` |
| `UserName` | `string` |
| `TradeFlags` | `int` |
| `Country` | `string` |
| `City` | `string` |
| `State` | `string` |
| `ZipCode` | `string` |
| `UserAddress` | `string` |
| `Phone` | `string` |
| `Email` | `string` |
| `Balance` | `double` |
| `Credit` | `double` |
| `Blocked` | `double` |
| `Leverage` | `int` |

## AccountRequest (demo account creation)

| Field | Type |
|-------|------|
| `Type` | `byte` |
| `Time` | `int` |
| `UserName` | `string` |
| `AccType` | `string` |
| `Country` | `string` |
| `City` | `string` |
| `State` | `string` |
| `ZipCode` | `string` |
| `Address` | `string` |
| `Phone` | `string` |
| `Email` | `string` |
| `CompanyName` | `string` |
| `Deposit` | `double` |
| `Leverage` | `int` |
| `LanguageId` | `int` |
| `UtmCampaign` | `string` |
| `Flags` | `int` |
| `PushID` | `int` |

## AccountAnswer

| Field | Type |
|-------|------|
| `Login` | `ulong` |
| `Password` | `string` |
| `Investor` | `string` |

## ServerRec

| Field | Type |
|-------|------|
| `ServerName` | `string` |
| `CompanyName` | `string` |
| `DST` | `int` |
| `TimeZone` | `int` |

## ServerInfo / ServerInfoEx

Both share:

| Field | Type |
|-------|------|
| `ServerName` | `string` |
| `CompanyName` | `string` |
| `DST` | `int` |
| `TimeZone` | `int` |
| `Address` | `string` |
| `PingTime` | `int` |

`ServerInfoEx` additionally has:

| Field | Type |
|-------|------|
| `CompanyLink` | `string` |

## ClusterDetails

| Field | Type |
|-------|------|
| `General` | `ServerRec` |
| `Servers` | `Dictionary<string, AddressRec[]>` |

## Server

| Field | Type |
|-------|------|
| `ServerInfoEx` | `ServerInfoEx` |
| `ServerInfo` | `ServerInfo` |
| `Accesses` | `Access[]` |
| `AccessesEx` | `AccessEx[]` |

## Access

| Field | Type |
|-------|------|
| `AccessRec` | `AccessRec` |
| `Addresses` | `AddressRec[]` |

## AccessInfo

| Field | Type |
|-------|------|
| `ServerName` | `string` |

## AccessRec

| Field | Type |
|-------|------|
| `ServerName` | `string` |

## AddressRec

| Field | Type |
|-------|------|
| `Address` | `string` |

## MailMessage

| Field | Type |
|-------|------|
| `Id` | `long` |
| `Time` | `DateTime` |
| `From` | `string` |
| `To` | `string` |
| `Subject` | `string` |
| `Body` | `string` |

## Logger

Available via `MT5API.Logger` (internal field).

| Method | Signature |
|--------|-----------|
| `trace` | `void trace(string msg)` |
| `debug` | `void debug(string msg)` |
| `info` | `void info(string msg)` |
| `warn` | `void warn(string msg)` |
| `error` | `void error(string msg)` / `void error(Exception ex)` |

| Event | Delegate |
|-------|----------|
| `OnMsg` | `void (object sender, string msg, MsgType type)` |
| `OnMsgEx` | `void (object sender, string msg, MsgType type, Exception ex)` |

## MsgType

```
Trace = 0, Debug = 1, Info = 2, Warn = 3, Error = 4, Exception = 5
```

## SocksProxy

| Method | Signature |
|--------|-----------|
| `ConnectToSocks5Proxy` | `static Socket ConnectToSocks5Proxy(string proxyAdress, ushort proxyPort, string destAddress, ushort destPort, string userName, string password)` |

## HostAndPort

| Method | Signature |
|--------|-----------|
| `Parse` | `static KeyValuePair<string, int> Parse(string ip)` |
