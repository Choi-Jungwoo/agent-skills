# CTP trader SPI connection and authentication callbacks

This reference covers the trader SPI class, connection events, authentication responses, login/logout responses, and other core session callbacks.

| Entry | Kind |
| --- | --- |
| CThostFtdcTraderSpi | class |
| OnFrontConnected | callback |
| OnFrontDisconnected | callback |
| OnHeartBeatWarning | callback |
| OnRspAuthenticate | callback |
| OnRspError | callback |
| OnRspGenUserCaptcha | callback |
| OnRspGenUserText | callback |
| OnRspTradingAccountPasswordUpdate | callback |
| OnRspUserAuthMethod | callback |
| OnRspUserLogin | callback |
| OnRspUserLogout | callback |
| OnRspUserPasswordUpdate | callback |

## CThostFtdcTraderSpi

`CThostFtdcTraderSpi` is the main class for this API surface and anchors the surrounding workflow.

- Kind: class
- Owning interface: `CThostFtdcTraderSpi`
- Related symbols: `OnRspAuthenticate`, `OnRspUserLogin`, `OnRspUserLogout`, `OnRspUserPasswordUpdate`, `OnRspTradingAccountPasswordUpdate`, `OnRspUserAuthMethod`, `OnRspGenUserCaptcha`, `OnRspGenUserText`, `OnRspOrderInsert`, `OnRspParkedOrderInsert`

**When to use it**

- Use this entry when the related business flow becomes part of your integration.
- Keep the behavior in mind when modeling retries, reconnection, or reconciliation logic.

**How to apply it**

1. Read this section before implementing the related integration path.
2. Map the rule or overview to the request and callback symbols affected by it.

**Prototype**

```cpp
class CTraderHandler : public CThostFtdcTraderSpi
```

**Callback and outcome model**

- Success path: `OnRspAuthenticate`, `OnRspUserLogin`, `OnRspUserLogout`, `OnRspUserPasswordUpdate`, `OnRspTradingAccountPasswordUpdate`, `OnRspUserAuthMethod`, `OnRspGenUserCaptcha`, `OnRspGenUserText`.
- Error path: `OnRspError`, `OnErrRtnOrderInsert`, `OnErrRtnOrderAction`, `OnErrRtnExecOrderInsert`, `OnErrRtnExecOrderAction`, `OnErrRtnForQuoteInsert`, `OnErrRtnQuoteInsert`, `OnErrRtnQuoteAction`.

**Usage example**

```cpp
CThostFtdcRspInfoField *pRspInfo, int nRequestID, bool bIsLast)
  {
      printf("OnRspOrderInsert\n");
  }
```

**Implementation notes**

- Keep the API object alive for the full lifetime of the session and destroy it only after the runtime thread has stopped or the process is shutting down.

## OnFrontConnected

`OnFrontConnected` is an event callback that reports state back from the CTP runtime into the client application.

- Kind: callback
- Owning interface: `CThostFtdcTraderSpi`

**When to use it**

- Drive event-based application state updates as server data arrives.
- Wake request waiters or publish the event into a higher-level message bus.

**How to apply it**

1. Validate the payload and error object before updating application state.
2. Correlate the event with the original request or subscription when a request id is present.
3. Persist the important identifiers and keep handler logic short so the SPI thread stays responsive.

**Usage example**

```cpp
void MySpi::OnFrontConnected() {
    // Mark the event in your session state machine and send the next step if needed.
}
```

**Implementation notes**

- Make callback handlers idempotent because reconnect and replay semantics can surface the same business object more than once.
- Do not block the SPI thread with long business logic; hand the event to a worker queue when processing becomes expensive.

## OnFrontDisconnected

`OnFrontDisconnected` is an event callback that reports state back from the CTP runtime into the client application.

- Kind: callback
- Owning interface: `CThostFtdcTraderSpi`

**When to use it**

- Drive event-based application state updates as server data arrives.
- Wake request waiters or publish the event into a higher-level message bus.

**How to apply it**

1. Validate the payload and error object before updating application state.
2. Correlate the event with the original request or subscription when a request id is present.
3. Persist the important identifiers and keep handler logic short so the SPI thread stays responsive.

**Usage example**

```cpp
void MySpi::OnFrontDisconnected() {
    // Mark the event in your session state machine and send the next step if needed.
}
```

**Implementation notes**

- Make callback handlers idempotent because reconnect and replay semantics can surface the same business object more than once.
- Do not block the SPI thread with long business logic; hand the event to a worker queue when processing becomes expensive.

## OnHeartBeatWarning

`OnHeartBeatWarning` is an event callback that reports state back from the CTP runtime into the client application.

- Kind: callback
- Owning interface: `CThostFtdcTraderSpi`

**When to use it**

- Drive event-based application state updates as server data arrives.
- Wake request waiters or publish the event into a higher-level message bus.

**How to apply it**

1. Validate the payload and error object before updating application state.
2. Correlate the event with the original request or subscription when a request id is present.
3. Persist the important identifiers and keep handler logic short so the SPI thread stays responsive.

**Usage example**

```cpp
void MySpi::OnHeartBeatWarning() {
    // Mark the event in your session state machine and send the next step if needed.
}
```

**Implementation notes**

- Make callback handlers idempotent because reconnect and replay semantics can surface the same business object more than once.
- Do not block the SPI thread with long business logic; hand the event to a worker queue when processing becomes expensive.

## OnRspAuthenticate

`OnRspAuthenticate` is an event callback that reports state back from the CTP runtime into the client application.

- Kind: callback
- Owning interface: `CThostFtdcTraderSpi`
- Related symbols: `ReqAuthenticate`

**When to use it**

- Drive event-based application state updates as server data arrives.
- Wake request waiters or publish the event into a higher-level message bus.

**How to apply it**

1. Validate the payload and error object before updating application state.
2. Correlate the event with the original request or subscription when a request id is present.
3. Persist the important identifiers and keep handler logic short so the SPI thread stays responsive.

**Callback and outcome model**

- This callback belongs to the synchronous response path for a request issued earlier.
- Use `pRspInfo` to detect business or validation failures when that parameter is present.
- Use `nRequestID` and `bIsLast` to correlate and complete the waiting request state when those parameters are present.

**Field guide for `CThostFtdcRspAuthenticateField`**

| Field | Type | Purpose |
| --- | --- | --- |
| `BrokerID` | `TThostFtdcBrokerIDType` | Broker code that scopes the request or identifies the response owner. |
| `UserID` | `TThostFtdcUserIDType` | User code associated with the current login identity. |
| `UserProductInfo` | `TThostFtdcProductInfoType` | Client product string used during authentication or login. |
| `AppID` | `TThostFtdcAppIDType` | Application identifier registered for the client program. |
| `AppType` | `TThostFtdcAppTypeType` | Carries the application type for the current request or response. |

**Structure layout**

```cpp
struct CThostFtdcRspAuthenticateField
{

    TThostFtdcBrokerIDType BrokerID;

    TThostFtdcUserIDType UserID;

    TThostFtdcProductInfoType UserProductInfo;

    TThostFtdcAppIDType AppID;

    TThostFtdcAppTypeType AppType;
};
```

**Field guide for `CThostFtdcRspInfoField`**

| Field | Type | Purpose |
| --- | --- | --- |
| `ErrorID` | `TThostFtdcErrorIDType` | Numeric error code returned by the API. |
| `ErrorMsg` | `TThostFtdcErrorMsgType` | Human-readable error message returned by the API. |

**Structure layout**

```cpp
struct CThostFtdcRspInfoField
{

    TThostFtdcErrorIDType ErrorID;

    TThostFtdcErrorMsgType ErrorMsg;
};
```

**Usage example**

```cpp
void MySpi::OnRspAuthenticate() {
    // Mark the event in your session state machine and send the next step if needed.
}
```

**Implementation notes**

- Make callback handlers idempotent because reconnect and replay semantics can surface the same business object more than once.
- Do not block the SPI thread with long business logic; hand the event to a worker queue when processing becomes expensive.

## OnRspError

`OnRspError` is an event callback that reports state back from the CTP runtime into the client application.

- Kind: callback
- Owning interface: `CThostFtdcTraderSpi`

**When to use it**

- Drive event-based application state updates as server data arrives.
- Wake request waiters or publish the event into a higher-level message bus.

**How to apply it**

1. Validate the payload and error object before updating application state.
2. Correlate the event with the original request or subscription when a request id is present.
3. Persist the important identifiers and keep handler logic short so the SPI thread stays responsive.

**Callback and outcome model**

- This callback belongs to the synchronous response path for a request issued earlier.
- Use `pRspInfo` to detect business or validation failures when that parameter is present.
- Use `nRequestID` and `bIsLast` to correlate and complete the waiting request state when those parameters are present.

**Field guide for `CThostFtdcRspInfoField`**

| Field | Type | Purpose |
| --- | --- | --- |
| `ErrorID` | `TThostFtdcErrorIDType` | Numeric error code returned by the API. |
| `ErrorMsg` | `TThostFtdcErrorMsgType` | Human-readable error message returned by the API. |

**Structure layout**

```cpp
struct CThostFtdcRspInfoField
{

    TThostFtdcErrorIDType ErrorID;

    TThostFtdcErrorMsgType ErrorMsg;
};
```

**Usage example**

```cpp
void MySpi::OnRspError() {
    // Mark the event in your session state machine and send the next step if needed.
}
```

**Implementation notes**

- Make callback handlers idempotent because reconnect and replay semantics can surface the same business object more than once.
- Do not block the SPI thread with long business logic; hand the event to a worker queue when processing becomes expensive.

## OnRspGenUserCaptcha

`OnRspGenUserCaptcha` is an event callback that reports state back from the CTP runtime into the client application.

- Kind: callback
- Owning interface: `CThostFtdcTraderSpi`

**When to use it**

- Drive event-based application state updates as server data arrives.
- Wake request waiters or publish the event into a higher-level message bus.

**How to apply it**

1. Validate the payload and error object before updating application state.
2. Correlate the event with the original request or subscription when a request id is present.
3. Persist the important identifiers and keep handler logic short so the SPI thread stays responsive.

**Callback and outcome model**

- This callback belongs to the synchronous response path for a request issued earlier.
- Use `pRspInfo` to detect business or validation failures when that parameter is present.
- Use `nRequestID` and `bIsLast` to correlate and complete the waiting request state when those parameters are present.

**Field guide for `CThostFtdcRspGenUserCaptchaField`**

| Field | Type | Purpose |
| --- | --- | --- |
| `BrokerID` | `TThostFtdcBrokerIDType` | Broker code that scopes the request or identifies the response owner. |
| `UserID` | `TThostFtdcUserIDType` | User code associated with the current login identity. |
| `CaptchaInfoLen` | `TThostFtdcCaptchaInfoLenType` | Carries the captcha information len for the current request or response. |
| `CaptchaInfo` | `TThostFtdcCaptchaInfoType` | Carries the captcha information for the current request or response. |

**Structure layout**

```cpp
struct CThostFtdcRspGenUserCaptchaField
{

    TThostFtdcBrokerIDType BrokerID;

    TThostFtdcUserIDType UserID;

    TThostFtdcCaptchaInfoLenType CaptchaInfoLen;

    TThostFtdcCaptchaInfoType CaptchaInfo;
};
```

**Field guide for `CThostFtdcRspInfoField`**

| Field | Type | Purpose |
| --- | --- | --- |
| `ErrorID` | `TThostFtdcErrorIDType` | Numeric error code returned by the API. |
| `ErrorMsg` | `TThostFtdcErrorMsgType` | Human-readable error message returned by the API. |

**Structure layout**

```cpp
struct CThostFtdcRspInfoField
{

    TThostFtdcErrorIDType ErrorID;

    TThostFtdcErrorMsgType ErrorMsg;
};
```

**Usage example**

```cpp
void MySpi::OnRspGenUserCaptcha() {
    // Mark the event in your session state machine and send the next step if needed.
}
```

**Implementation notes**

- Make callback handlers idempotent because reconnect and replay semantics can surface the same business object more than once.
- Do not block the SPI thread with long business logic; hand the event to a worker queue when processing becomes expensive.

## OnRspGenUserText

`OnRspGenUserText` is an event callback that reports state back from the CTP runtime into the client application.

- Kind: callback
- Owning interface: `CThostFtdcTraderSpi`

**When to use it**

- Drive event-based application state updates as server data arrives.
- Wake request waiters or publish the event into a higher-level message bus.

**How to apply it**

1. Validate the payload and error object before updating application state.
2. Correlate the event with the original request or subscription when a request id is present.
3. Persist the important identifiers and keep handler logic short so the SPI thread stays responsive.

**Callback and outcome model**

- This callback belongs to the synchronous response path for a request issued earlier.
- Use `pRspInfo` to detect business or validation failures when that parameter is present.
- Use `nRequestID` and `bIsLast` to correlate and complete the waiting request state when those parameters are present.

**Field guide for `CThostFtdcRspGenUserTextField`**

| Field | Type | Purpose |
| --- | --- | --- |
| `UserTextSeq` | `TThostFtdcUserTextSeqType` | Carries the user text challenge sequence for the current request or response. |

**Structure layout**

```cpp
struct CThostFtdcRspGenUserTextField
{

    TThostFtdcUserTextSeqType UserTextSeq;
};
```

**Field guide for `CThostFtdcRspInfoField`**

| Field | Type | Purpose |
| --- | --- | --- |
| `ErrorID` | `TThostFtdcErrorIDType` | Numeric error code returned by the API. |
| `ErrorMsg` | `TThostFtdcErrorMsgType` | Human-readable error message returned by the API. |

**Structure layout**

```cpp
struct CThostFtdcRspInfoField
{

    TThostFtdcErrorIDType ErrorID;

    TThostFtdcErrorMsgType ErrorMsg;
};
```

**Usage example**

```cpp
void MySpi::OnRspGenUserText() {
    // Mark the event in your session state machine and send the next step if needed.
}
```

**Implementation notes**

- Make callback handlers idempotent because reconnect and replay semantics can surface the same business object more than once.
- Do not block the SPI thread with long business logic; hand the event to a worker queue when processing becomes expensive.

## OnRspTradingAccountPasswordUpdate

`OnRspTradingAccountPasswordUpdate` is an event callback that reports state back from the CTP runtime into the client application.

- Kind: callback
- Owning interface: `CThostFtdcTraderSpi`
- Related symbols: `ReqTradingAccountPasswordUpdate`

**When to use it**

- Drive event-based application state updates as server data arrives.
- Wake request waiters or publish the event into a higher-level message bus.

**How to apply it**

1. Validate the payload and error object before updating application state.
2. Correlate the event with the original request or subscription when a request id is present.
3. Persist the important identifiers and keep handler logic short so the SPI thread stays responsive.

**Callback and outcome model**

- This callback belongs to the synchronous response path for a request issued earlier.
- Use `pRspInfo` to detect business or validation failures when that parameter is present.
- Use `nRequestID` and `bIsLast` to correlate and complete the waiting request state when those parameters are present.

**Field guide for `CThostFtdcTradingAccountPasswordUpdateField`**

| Field | Type | Purpose |
| --- | --- | --- |
| `BrokerID` | `TThostFtdcBrokerIDType` | Broker code that scopes the request or identifies the response owner. |
| `AccountID` | `TThostFtdcAccountIDType` | Futures-side account identifier. |
| `OldPassword` | `TThostFtdcPasswordType` | Carries the old password for the current request or response. |
| `NewPassword` | `TThostFtdcPasswordType` | Carries the new password for the current request or response. |
| `CurrencyID` | `TThostFtdcCurrencyIDType` | Currency code used for balance and transfer values. |

**Structure layout**

```cpp
struct CThostFtdcTradingAccountPasswordUpdateField
{

    TThostFtdcBrokerIDType BrokerID;

    TThostFtdcAccountIDType AccountID;

    TThostFtdcPasswordType OldPassword;

    TThostFtdcPasswordType NewPassword;

    TThostFtdcCurrencyIDType CurrencyID;
};
```

**Field guide for `CThostFtdcRspInfoField`**

| Field | Type | Purpose |
| --- | --- | --- |
| `ErrorID` | `TThostFtdcErrorIDType` | Numeric error code returned by the API. |
| `ErrorMsg` | `TThostFtdcErrorMsgType` | Human-readable error message returned by the API. |

**Structure layout**

```cpp
struct CThostFtdcRspInfoField
{

    TThostFtdcErrorIDType ErrorID;

    TThostFtdcErrorMsgType ErrorMsg;
};
```

**Usage example**

```cpp
void MySpi::OnRspTradingAccountPasswordUpdate() {
    // Mark the event in your session state machine and send the next step if needed.
}
```

**Implementation notes**

- Make callback handlers idempotent because reconnect and replay semantics can surface the same business object more than once.
- Do not block the SPI thread with long business logic; hand the event to a worker queue when processing becomes expensive.

## OnRspUserAuthMethod

`OnRspUserAuthMethod` is an event callback that reports state back from the CTP runtime into the client application.

- Kind: callback
- Owning interface: `CThostFtdcTraderSpi`

**When to use it**

- Drive event-based application state updates as server data arrives.
- Wake request waiters or publish the event into a higher-level message bus.

**How to apply it**

1. Validate the payload and error object before updating application state.
2. Correlate the event with the original request or subscription when a request id is present.
3. Persist the important identifiers and keep handler logic short so the SPI thread stays responsive.

**Callback and outcome model**

- This callback belongs to the synchronous response path for a request issued earlier.
- Use `pRspInfo` to detect business or validation failures when that parameter is present.
- Use `nRequestID` and `bIsLast` to correlate and complete the waiting request state when those parameters are present.

**Field guide for `CThostFtdcRspUserAuthMethodField`**

| Field | Type | Purpose |
| --- | --- | --- |
| `UsableAuthMethod` | `TThostFtdcCurrentAuthMethodType` | Carries the usable authentication method for the current request or response. |

**Structure layout**

```cpp
struct CThostFtdcRspUserAuthMethodField
{

    TThostFtdcCurrentAuthMethodType UsableAuthMethod;
};
```

**Field guide for `CThostFtdcRspInfoField`**

| Field | Type | Purpose |
| --- | --- | --- |
| `ErrorID` | `TThostFtdcErrorIDType` | Numeric error code returned by the API. |
| `ErrorMsg` | `TThostFtdcErrorMsgType` | Human-readable error message returned by the API. |

**Structure layout**

```cpp
struct CThostFtdcRspInfoField
{

    TThostFtdcErrorIDType ErrorID;

    TThostFtdcErrorMsgType ErrorMsg;
};
```

**Usage example**

```cpp
void MySpi::OnRspUserAuthMethod() {
    // Mark the event in your session state machine and send the next step if needed.
}
```

**Implementation notes**

- Make callback handlers idempotent because reconnect and replay semantics can surface the same business object more than once.
- Do not block the SPI thread with long business logic; hand the event to a worker queue when processing becomes expensive.

## OnRspUserLogin

`OnRspUserLogin` is an event callback that reports state back from the CTP runtime into the client application.

- Kind: callback
- Owning interface: `CThostFtdcTraderSpi`
- Related symbols: `ReqUserLogin`

**When to use it**

- Establish a fresh authenticated session before any trading or market-data work.
- Recover after a disconnect and rebuild client-side session state.

**How to apply it**

1. Validate the payload and error object before updating application state.
2. Correlate the event with the original request or subscription when a request id is present.
3. Persist the important identifiers and keep handler logic short so the SPI thread stays responsive.

**Callback and outcome model**

- This callback belongs to the synchronous response path for a request issued earlier.
- Use `pRspInfo` to detect business or validation failures when that parameter is present.
- Use `nRequestID` and `bIsLast` to correlate and complete the waiting request state when those parameters are present.

**Field guide for `CThostFtdcRspUserLoginField`**

| Field | Type | Purpose |
| --- | --- | --- |
| `TradingDay` | `TThostFtdcDateType` | Trading date visible to the current trading system session. |
| `LoginTime` | `TThostFtdcTimeType` | Server-side login timestamp. |
| `BrokerID` | `TThostFtdcBrokerIDType` | Broker code that scopes the request or identifies the response owner. |
| `UserID` | `TThostFtdcUserIDType` | User code associated with the current login identity. |
| `SystemName` | `TThostFtdcSystemNameType` | Name of the serving trading system. |
| `FrontID` | `TThostFtdcFrontIDType` | Front identifier assigned by the server for the current login session. |
| `SessionID` | `TThostFtdcSessionIDType` | Session identifier assigned by the server for the current login session. |
| `MaxOrderRef` | `TThostFtdcOrderRefType` | Highest order reference currently known after login. |
| `SHFETime` | `TThostFtdcTimeType` | Carries the shfe time for the current request or response. |
| `DCETime` | `TThostFtdcTimeType` | Carries the dce time for the current request or response. |
| `CZCETime` | `TThostFtdcTimeType` | Carries the czce time for the current request or response. |
| `FFEXTime` | `TThostFtdcTimeType` | Carries the ffex time for the current request or response. |
| `INETime` | `TThostFtdcTimeType` | Carries the ine time for the current request or response. |
| `SysVersion` | `TThostFtdcSysVersionType` | Carries the sys version for the current request or response. |
| `GFEXTime` | `TThostFtdcTimeType` | Carries the gfex time for the current request or response. |
| `LoginDRIdentityID` | `TThostFtdcDRIdentityIDType` | Carries the login dr identity identifier for the current request or response. |
| `UserDRIdentityID` | `TThostFtdcDRIdentityIDType` | Carries the user dr identity identifier for the current request or response. |
| `LastLoginTime` | `TThostFtdcDateTimeType` | Carries the last login time for the current request or response. |
| `ReserveInfo` | `TThostFtdcReserveInfoType` | Carries the reserve information for the current request or response. |

**Structure layout**

```cpp
struct CThostFtdcRspUserLoginField
{

    TThostFtdcDateType TradingDay;

    TThostFtdcTimeType LoginTime;

    TThostFtdcBrokerIDType BrokerID;

    TThostFtdcUserIDType UserID;

    TThostFtdcSystemNameType SystemName;

    TThostFtdcFrontIDType FrontID;

    TThostFtdcSessionIDType SessionID;

    TThostFtdcOrderRefType MaxOrderRef;

    TThostFtdcTimeType SHFETime;

    TThostFtdcTimeType DCETime;

    TThostFtdcTimeType CZCETime;

    TThostFtdcTimeType FFEXTime;

    TThostFtdcTimeType INETime;

    TThostFtdcSysVersionType SysVersion;

    TThostFtdcTimeType GFEXTime;

    TThostFtdcDRIdentityIDType  LoginDRIdentityID;

    TThostFtdcDRIdentityIDType  UserDRIdentityID;

    TThostFtdcDateTimeType  LastLoginTime;

    TThostFtdcReserveInfoType   ReserveInfo;
};
```

**Field guide for `CThostFtdcRspInfoField`**

| Field | Type | Purpose |
| --- | --- | --- |
| `ErrorID` | `TThostFtdcErrorIDType` | Numeric error code returned by the API. |
| `ErrorMsg` | `TThostFtdcErrorMsgType` | Human-readable error message returned by the API. |

**Structure layout**

```cpp
struct CThostFtdcRspInfoField
{

    TThostFtdcErrorIDType ErrorID;

    TThostFtdcErrorMsgType ErrorMsg;
};
```

**Usage example**

```cpp
void MySpi::OnRspUserLogin() {
    // Mark the event in your session state machine and send the next step if needed.
}
```

**Implementation notes**

- Make callback handlers idempotent because reconnect and replay semantics can surface the same business object more than once.
- Do not block the SPI thread with long business logic; hand the event to a worker queue when processing becomes expensive.

## OnRspUserLogout

`OnRspUserLogout` is an event callback that reports state back from the CTP runtime into the client application.

- Kind: callback
- Owning interface: `CThostFtdcTraderSpi`
- Related symbols: `ReqUserLogout`

**When to use it**

- End the current user session cleanly during shutdown.
- Release server-side session state before switching identities.

**How to apply it**

1. Validate the payload and error object before updating application state.
2. Correlate the event with the original request or subscription when a request id is present.
3. Persist the important identifiers and keep handler logic short so the SPI thread stays responsive.

**Callback and outcome model**

- This callback belongs to the synchronous response path for a request issued earlier.
- Use `pRspInfo` to detect business or validation failures when that parameter is present.
- Use `nRequestID` and `bIsLast` to correlate and complete the waiting request state when those parameters are present.

**Field guide for `CThostFtdcUserLogoutField`**

| Field | Type | Purpose |
| --- | --- | --- |
| `BrokerID` | `TThostFtdcBrokerIDType` | Broker code that scopes the request or identifies the response owner. |
| `UserID` | `TThostFtdcUserIDType` | User code associated with the current login identity. |

**Structure layout**

```cpp
struct CThostFtdcUserLogoutField
{

    TThostFtdcBrokerIDType BrokerID;

    TThostFtdcUserIDType UserID;
};
```

**Field guide for `CThostFtdcRspInfoField`**

| Field | Type | Purpose |
| --- | --- | --- |
| `ErrorID` | `TThostFtdcErrorIDType` | Numeric error code returned by the API. |
| `ErrorMsg` | `TThostFtdcErrorMsgType` | Human-readable error message returned by the API. |

**Structure layout**

```cpp
struct CThostFtdcRspInfoField
{

    TThostFtdcErrorIDType ErrorID;

    TThostFtdcErrorMsgType ErrorMsg;
};
```

**Usage example**

```cpp
void MySpi::OnRspUserLogout() {
    // Mark the event in your session state machine and send the next step if needed.
}
```

**Implementation notes**

- Make callback handlers idempotent because reconnect and replay semantics can surface the same business object more than once.
- Do not block the SPI thread with long business logic; hand the event to a worker queue when processing becomes expensive.

## OnRspUserPasswordUpdate

`OnRspUserPasswordUpdate` is an event callback that reports state back from the CTP runtime into the client application.

- Kind: callback
- Owning interface: `CThostFtdcTraderSpi`
- Related symbols: `ReqUserPasswordUpdate`

**When to use it**

- Drive event-based application state updates as server data arrives.
- Wake request waiters or publish the event into a higher-level message bus.

**How to apply it**

1. Validate the payload and error object before updating application state.
2. Correlate the event with the original request or subscription when a request id is present.
3. Persist the important identifiers and keep handler logic short so the SPI thread stays responsive.

**Callback and outcome model**

- This callback belongs to the synchronous response path for a request issued earlier.
- Use `pRspInfo` to detect business or validation failures when that parameter is present.
- Use `nRequestID` and `bIsLast` to correlate and complete the waiting request state when those parameters are present.

**Field guide for `CThostFtdcUserPasswordUpdateField`**

| Field | Type | Purpose |
| --- | --- | --- |
| `BrokerID` | `TThostFtdcBrokerIDType` | Broker code that scopes the request or identifies the response owner. |
| `UserID` | `TThostFtdcUserIDType` | User code associated with the current login identity. |
| `OldPassword` | `TThostFtdcPasswordType` | Carries the old password for the current request or response. |
| `NewPassword` | `TThostFtdcPasswordType` | Carries the new password for the current request or response. |

**Structure layout**

```cpp
struct CThostFtdcUserPasswordUpdateField
{

    TThostFtdcBrokerIDType BrokerID;

    TThostFtdcUserIDType UserID;

    TThostFtdcPasswordType OldPassword;

    TThostFtdcPasswordType NewPassword;
};
```

**Field guide for `CThostFtdcRspInfoField`**

| Field | Type | Purpose |
| --- | --- | --- |
| `ErrorID` | `TThostFtdcErrorIDType` | Numeric error code returned by the API. |
| `ErrorMsg` | `TThostFtdcErrorMsgType` | Human-readable error message returned by the API. |

**Structure layout**

```cpp
struct CThostFtdcRspInfoField
{

    TThostFtdcErrorIDType ErrorID;

    TThostFtdcErrorMsgType ErrorMsg;
};
```

**Usage example**

```cpp
void MySpi::OnRspUserPasswordUpdate() {
    // Mark the event in your session state machine and send the next step if needed.
}
```

**Implementation notes**

- Make callback handlers idempotent because reconnect and replay semantics can surface the same business object more than once.
- Do not block the SPI thread with long business logic; hand the event to a worker queue when processing becomes expensive.
