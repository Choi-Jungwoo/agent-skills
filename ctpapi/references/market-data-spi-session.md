# CTP market data SPI session callbacks

This reference covers login and logout callbacks for the market-data session.

| Entry | Kind |
| --- | --- |
| OnRspUserLogin | callback |
| OnRspUserLogout | callback |

## OnRspUserLogin

`OnRspUserLogin` is an event callback that reports state back from the CTP runtime into the client application.

- Kind: callback
- Owning interface: `CThostFtdcMdSpi`
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

    TThostFtdcSysVersionType    SysVersion;

    TThostFtdcTimeType  GFEXTime;

    TThostFtdcDRIdentityIDType  LoginDRIdentityID;

    TThostFtdcDRIdentityIDType  UserDRIdentityID;
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
- Owning interface: `CThostFtdcMdSpi`
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
