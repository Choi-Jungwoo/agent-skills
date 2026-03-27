# CTP market data API login flow

This reference covers the request-side login and logout path for the market-data connection.

| Entry | Kind |
| --- | --- |
| ReqUserLogin | request |
| ReqUserLogout | request |

## ReqUserLogin

`ReqUserLogin` is an asynchronous request entry point used to drive a business operation through the CTP runtime.

- Kind: request
- Owning interface: `CThostFtdcMdApi`
- Related symbols: `OnRspUserLogin`, `ReqAuthentication`

**When to use it**

- Establish a fresh authenticated session before any trading or market-data work.
- Recover after a disconnect and rebuild client-side session state.

**How to apply it**

1. Ensure the API instance is initialized and the session has reached the state required for this request.
2. Fill the request object with the identifiers and business fields expected by the server.
3. Call the API, inspect the local return code, then complete the workflow through later SPI callbacks.

**Prototype**

```cpp
virtual int ReqUserLogin(CThostFtdcReqUserLoginField *pReqUserLoginField, int nRequestID) = 0;
```

**Parameters**

| Name | Type | Purpose |
| --- | --- | --- |
| `pReqUserLoginField` | `CThostFtdcReqUserLoginField *` | Pointer to the request object `CThostFtdcReqUserLoginField *`. |
| `nRequestID` | `int` | Request correlation id provided by the caller. |

**Callback and outcome model**

- Success path: `OnRspUserLogin`.

**Return semantics**

- `0` means the request was accepted by the local API runtime and will continue asynchronously through SPI callbacks.
- `-1` means the client is not in a state where the request can be submitted, typically because the connection is unavailable.
- `-2` means too many outstanding requests remain unprocessed on the local side.
- `-3` means the local request-rate limit was hit and the caller should retry later.

**Field guide for `CThostFtdcReqUserLoginField`**

| Field | Type | Purpose |
| --- | --- | --- |
| `TradingDay` | `TThostFtdcDateType` | Trading date visible to the current trading system session. |
| `BrokerID` | `TThostFtdcBrokerIDType` | Broker code that scopes the request or identifies the response owner. |
| `UserID` | `TThostFtdcUserIDType` | User code associated with the current login identity. |
| `Password` | `TThostFtdcPasswordType` | Trading password or user password carried by the request. |
| `UserProductInfo` | `TThostFtdcProductInfoType` | Client product string used during authentication or login. |
| `InterfaceProductInfo` | `TThostFtdcProductInfoType` | Carries the interface product information for the current request or response. |
| `ProtocolInfo` | `TThostFtdcProtocolInfoType` | Carries the protocol information for the current request or response. |
| `MacAddress` | `TThostFtdcMacAddressType` | Client MAC address reported to the server. |
| `OneTimePassword` | `TThostFtdcPasswordType` | Carries the one time password for the current request or response. |
| `ClientIPAddress` | `TThostFtdcIPAddressType` | Carries the client IP address for the current request or response. |
| `LoginRemark` | `TThostFtdcLoginRemarkType` | Carries the login remark for the current request or response. |

**Structure layout**

```cpp
struct CThostFtdcReqUserLoginField
{

    TThostFtdcDateType TradingDay;

    TThostFtdcBrokerIDType BrokerID;

    TThostFtdcUserIDType UserID;

    TThostFtdcPasswordType Password;

    TThostFtdcProductInfoType UserProductInfo;

    TThostFtdcProductInfoType InterfaceProductInfo;

    TThostFtdcProtocolInfoType ProtocolInfo;

    TThostFtdcMacAddressType MacAddress;

    TThostFtdcPasswordType OneTimePassword;

    TThostFtdcIPAddressType ClientIPAddress;

    TThostFtdcLoginRemarkType LoginRemark;
};
```

**Usage example**

```cpp
CThostFtdcReqUserLoginField reqUserLogin = {};
// Fill the required identifiers and business fields before sending the request.
int rc = api->ReqUserLogin(&reqUserLogin, requestId++);
if (rc != 0) {
    // Handle the local submission failure before waiting for callbacks.
}
```

**Implementation notes**

- Treat the immediate return code and the later callbacks as two different stages of the same business operation.
- Preserve the identifiers sent in the request because later callbacks often reference them instead of your local in-memory object.

## ReqUserLogout

`ReqUserLogout` is an asynchronous request entry point used to drive a business operation through the CTP runtime.

- Kind: request
- Owning interface: `CThostFtdcMdApi`
- Related symbols: `OnRspUserLogout`

**When to use it**

- End the current user session cleanly during shutdown.
- Release server-side session state before switching identities.

**How to apply it**

1. Ensure the API instance is initialized and the session has reached the state required for this request.
2. Fill the request object with the identifiers and business fields expected by the server.
3. Call the API, inspect the local return code, then complete the workflow through later SPI callbacks.

**Prototype**

```cpp
virtual int ReqUserLogout(CThostFtdcUserLogoutField *pUserLogout, int nRequestID) = 0;
```

**Parameters**

| Name | Type | Purpose |
| --- | --- | --- |
| `pUserLogout` | `CThostFtdcUserLogoutField *` | Pointer to the payload object `CThostFtdcUserLogoutField *`. |
| `nRequestID` | `int` | Request correlation id provided by the caller. |

**Callback and outcome model**

- Success path: `OnRspUserLogout`.

**Return semantics**

- `0` means the request was accepted by the local API runtime and will continue asynchronously through SPI callbacks.
- `-1` means the client is not in a state where the request can be submitted, typically because the connection is unavailable.
- `-2` means too many outstanding requests remain unprocessed on the local side.
- `-3` means the local request-rate limit was hit and the caller should retry later.

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

**Usage example**

```cpp
CThostFtdcUserLogoutField userLogout = {};
// Fill the required identifiers and business fields before sending the request.
int rc = api->ReqUserLogout(&userLogout, requestId++);
if (rc != 0) {
    // Handle the local submission failure before waiting for callbacks.
}
```

**Implementation notes**

- Treat the immediate return code and the later callbacks as two different stages of the same business operation.
- Preserve the identifiers sent in the request because later callbacks often reference them instead of your local in-memory object.
