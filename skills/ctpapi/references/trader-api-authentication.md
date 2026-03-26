# CTP trader API authentication variants

This reference covers authentication-specific APIs, challenge generation, and the extended login variants that depend on additional authentication material.

| Entry | Kind |
| --- | --- |
| ReqAuthenticate | request |
| ReqGenUserCaptcha | request |
| ReqGenUserText | request |
| ReqUserAuthMethod | request |
| ReqUserLoginWithCaptcha | request |
| ReqUserLoginWithOTP | request |
| ReqUserLoginWithText | request |

## ReqAuthenticate

`ReqAuthenticate` is an asynchronous request entry point used to drive a business operation through the CTP runtime.

- Kind: request
- Owning interface: `CThostFtdcTraderApi`
- Related symbols: `OnRspAuthenticate`, `ReqAuthentication`, `ReqUserLogin`

**When to use it**

- Use this entry when the related business flow becomes part of your integration.
- Keep the behavior in mind when modeling retries, reconnection, or reconciliation logic.

**How to apply it**

1. Ensure the API instance is initialized and the session has reached the state required for this request.
2. Fill the request object with the identifiers and business fields expected by the server.
3. Call the API, inspect the local return code, then complete the workflow through later SPI callbacks.

**Prototype**

```cpp
virtual int ReqAuthenticate(CThostFtdcReqAuthenticateField *pReqAuthenticateField, int nRequestID) = 0;
```

**Parameters**

| Name | Type | Purpose |
| --- | --- | --- |
| `pReqAuthenticateField` | `CThostFtdcReqAuthenticateField *` | Pointer to the request object `CThostFtdcReqAuthenticateField *`. |
| `nRequestID` | `int` | Request correlation id provided by the caller. |

**Callback and outcome model**

- Success path: `OnRspAuthenticate`.

**Return semantics**

- `0` means the request was accepted by the local API runtime and will continue asynchronously through SPI callbacks.
- `-1` means the client is not in a state where the request can be submitted, typically because the connection is unavailable.
- `-2` means too many outstanding requests remain unprocessed on the local side.
- `-3` means the local request-rate limit was hit and the caller should retry later.

**Usage example**

```cpp
CThostFtdcReqAuthenticateField a = { 0 };
strcpy_s(a.BrokerID, "9999");
strcpy_s(a.UserID, "1000001");
strcpy_s(a.UserProductInfo, "mytest");
strcpy_s(a.AuthCode, "MLX0LEA4L4UPUCBF");
strcpy_s(a.AppID, "mytest");
m_pUserApi->ReqAuthenticate(&a, nRequestID++);
```

**Implementation notes**

- Treat the immediate return code and the later callbacks as two different stages of the same business operation.
- Preserve the identifiers sent in the request because later callbacks often reference them instead of your local in-memory object.

## ReqGenUserCaptcha

`ReqGenUserCaptcha` is an asynchronous request entry point used to drive a business operation through the CTP runtime.

- Kind: request
- Owning interface: `CThostFtdcTraderApi`
- Related symbols: `OnRspGenUserCaptcha`

**When to use it**

- Use this entry when the related business flow becomes part of your integration.
- Keep the behavior in mind when modeling retries, reconnection, or reconciliation logic.

**How to apply it**

1. Ensure the API instance is initialized and the session has reached the state required for this request.
2. Fill the request object with the identifiers and business fields expected by the server.
3. Call the API, inspect the local return code, then complete the workflow through later SPI callbacks.

**Prototype**

```cpp
virtual int ReqGenUserCaptcha(CThostFtdcReqGenUserCaptchaField *pReqGenUserCaptcha, int nRequestID) = 0;
```

**Parameters**

| Name | Type | Purpose |
| --- | --- | --- |
| `pReqGenUserCaptcha` | `CThostFtdcReqGenUserCaptchaField *` | Pointer to the request object `CThostFtdcReqGenUserCaptchaField *`. |
| `nRequestID` | `int` | Request correlation id provided by the caller. |

**Callback and outcome model**

- Success path: `OnRspGenUserCaptcha`.

**Return semantics**

- `0` means the request was accepted by the local API runtime and will continue asynchronously through SPI callbacks.
- `-1` means the client is not in a state where the request can be submitted, typically because the connection is unavailable.
- `-2` means too many outstanding requests remain unprocessed on the local side.
- `-3` means the local request-rate limit was hit and the caller should retry later.

**Usage example**

```cpp
CThostFtdcReqGenUserCaptchaField reqGenUserCaptcha = {};
// Fill the required identifiers and business fields before sending the request.
int rc = api->ReqGenUserCaptcha(&reqGenUserCaptcha, requestId++);
if (rc != 0) {
    // Handle the local submission failure before waiting for callbacks.
}
```

**Implementation notes**

- Treat the immediate return code and the later callbacks as two different stages of the same business operation.
- Preserve the identifiers sent in the request because later callbacks often reference them instead of your local in-memory object.

## ReqGenUserText

`ReqGenUserText` is an asynchronous request entry point used to drive a business operation through the CTP runtime.

- Kind: request
- Owning interface: `CThostFtdcTraderApi`
- Related symbols: `OnRspGenUserText`

**When to use it**

- Use this entry when the related business flow becomes part of your integration.
- Keep the behavior in mind when modeling retries, reconnection, or reconciliation logic.

**How to apply it**

1. Ensure the API instance is initialized and the session has reached the state required for this request.
2. Fill the request object with the identifiers and business fields expected by the server.
3. Call the API, inspect the local return code, then complete the workflow through later SPI callbacks.

**Prototype**

```cpp
virtual int ReqGenUserText(CThostFtdcReqGenUserTextField *pReqGenUserText, int nRequestID) = 0;
```

**Parameters**

| Name | Type | Purpose |
| --- | --- | --- |
| `pReqGenUserText` | `CThostFtdcReqGenUserTextField *` | Pointer to the request object `CThostFtdcReqGenUserTextField *`. |
| `nRequestID` | `int` | Request correlation id provided by the caller. |

**Callback and outcome model**

- Success path: `OnRspGenUserText`.

**Return semantics**

- `0` means the request was accepted by the local API runtime and will continue asynchronously through SPI callbacks.
- `-1` means the client is not in a state where the request can be submitted, typically because the connection is unavailable.
- `-2` means too many outstanding requests remain unprocessed on the local side.
- `-3` means the local request-rate limit was hit and the caller should retry later.

**Usage example**

```cpp
CThostFtdcReqGenUserTextField reqGenUserText = {};
// Fill the required identifiers and business fields before sending the request.
int rc = api->ReqGenUserText(&reqGenUserText, requestId++);
if (rc != 0) {
    // Handle the local submission failure before waiting for callbacks.
}
```

**Implementation notes**

- Treat the immediate return code and the later callbacks as two different stages of the same business operation.
- Preserve the identifiers sent in the request because later callbacks often reference them instead of your local in-memory object.

## ReqUserAuthMethod

`ReqUserAuthMethod` is an asynchronous request entry point used to drive a business operation through the CTP runtime.

- Kind: request
- Owning interface: `CThostFtdcTraderApi`
- Related symbols: `OnRspUserAuthMethod`

**When to use it**

- Use this entry when the related business flow becomes part of your integration.
- Keep the behavior in mind when modeling retries, reconnection, or reconciliation logic.

**How to apply it**

1. Ensure the API instance is initialized and the session has reached the state required for this request.
2. Fill the request object with the identifiers and business fields expected by the server.
3. Call the API, inspect the local return code, then complete the workflow through later SPI callbacks.

**Prototype**

```cpp
virtual int ReqUserAuthMethod(CThostFtdcReqUserAuthMethodField *pReqUserAuthMethod, int nRequestID) = 0;
```

**Parameters**

| Name | Type | Purpose |
| --- | --- | --- |
| `pReqUserAuthMethod` | `CThostFtdcReqUserAuthMethodField *` | Pointer to the request object `CThostFtdcReqUserAuthMethodField *`. |
| `nRequestID` | `int` | Request correlation id provided by the caller. |

**Callback and outcome model**

- Success path: `OnRspUserAuthMethod`.

**Return semantics**

- `0` means the request was accepted by the local API runtime and will continue asynchronously through SPI callbacks.
- `-1` means the client is not in a state where the request can be submitted, typically because the connection is unavailable.
- `-2` means too many outstanding requests remain unprocessed on the local side.
- `-3` means the local request-rate limit was hit and the caller should retry later.

**Usage example**

```cpp
CThostFtdcReqUserAuthMethodField reqUserAuthMetho = {};
// Fill the required identifiers and business fields before sending the request.
int rc = api->ReqUserAuthMethod(&reqUserAuthMetho, requestId++);
if (rc != 0) {
    // Handle the local submission failure before waiting for callbacks.
}
```

**Implementation notes**

- Treat the immediate return code and the later callbacks as two different stages of the same business operation.
- Preserve the identifiers sent in the request because later callbacks often reference them instead of your local in-memory object.

## ReqUserLoginWithCaptcha

`ReqUserLoginWithCaptcha` is an asynchronous request entry point used to drive a business operation through the CTP runtime.

- Kind: request
- Owning interface: `CThostFtdcTraderApi`
- Related symbols: `OnRspUserLogin`

**When to use it**

- Establish a fresh authenticated session before any trading or market-data work.
- Recover after a disconnect and rebuild client-side session state.

**How to apply it**

1. Ensure the API instance is initialized and the session has reached the state required for this request.
2. Fill the request object with the identifiers and business fields expected by the server.
3. Call the API, inspect the local return code, then complete the workflow through later SPI callbacks.

**Prototype**

```cpp
virtual int ReqUserLoginWithCaptcha(CThostFtdcReqUserLoginWithCaptchaField *pReqUserLoginWithCaptcha, int nRequestID) = 0;
```

**Parameters**

| Name | Type | Purpose |
| --- | --- | --- |
| `pReqUserLoginWithCaptcha` | `CThostFtdcReqUserLoginWithCaptchaField *` | Pointer to the request object `CThostFtdcReqUserLoginWithCaptchaField *`. |
| `nRequestID` | `int` | Request correlation id provided by the caller. |

**Callback and outcome model**

- Success path: `OnRspUserLogin`.

**Return semantics**

- `0` means the request was accepted by the local API runtime and will continue asynchronously through SPI callbacks.
- `-1` means the client is not in a state where the request can be submitted, typically because the connection is unavailable.
- `-2` means too many outstanding requests remain unprocessed on the local side.
- `-3` means the local request-rate limit was hit and the caller should retry later.

**Field guide for `CThostFtdcReqUserLoginWithCaptchaField`**

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
| `reserve1` | `TThostFtdcOldIPAddressType` | Carries the reserve1 for the current request or response. |
| `LoginRemark` | `TThostFtdcLoginRemarkType` | Carries the login remark for the current request or response. |
| `Captcha` | `TThostFtdcPasswordType` | Carries the captcha for the current request or response. |
| `ClientIPPort` | `TThostFtdcIPPortType` | Carries the client IP port for the current request or response. |
| `ClientIPAddress` | `TThostFtdcIPAddressType` | Carries the client IP address for the current request or response. |

**Structure layout**

```cpp
struct CThostFtdcReqUserLoginWithCaptchaField
{

TThostFtdcDateType  TradingDay;

TThostFtdcBrokerIDType  BrokerID;

TThostFtdcUserIDType    UserID;

TThostFtdcPasswordType  Password;

TThostFtdcProductInfoType   UserProductInfo;

TThostFtdcProductInfoType   InterfaceProductInfo;

TThostFtdcProtocolInfoType  ProtocolInfo;

TThostFtdcMacAddressType    MacAddress;

TThostFtdcOldIPAddressType  reserve1;

TThostFtdcLoginRemarkType   LoginRemark;

TThostFtdcPasswordType  Captcha;

TThostFtdcIPPortType    ClientIPPort;

TThostFtdcIPAddressType ClientIPAddress;
};
```

**Usage example**

```cpp
CThostFtdcReqUserLoginWithCaptchaField reqUserLoginWithCaptcha = {};
// Fill the required identifiers and business fields before sending the request.
int rc = api->ReqUserLoginWithCaptcha(&reqUserLoginWithCaptcha, requestId++);
if (rc != 0) {
    // Handle the local submission failure before waiting for callbacks.
}
```

**Implementation notes**

- Treat the immediate return code and the later callbacks as two different stages of the same business operation.
- Preserve the identifiers sent in the request because later callbacks often reference them instead of your local in-memory object.

## ReqUserLoginWithOTP

`ReqUserLoginWithOTP` is an asynchronous request entry point used to drive a business operation through the CTP runtime.

- Kind: request
- Owning interface: `CThostFtdcTraderApi`
- Related symbols: `OnRspUserLogin`

**When to use it**

- Establish a fresh authenticated session before any trading or market-data work.
- Recover after a disconnect and rebuild client-side session state.

**How to apply it**

1. Ensure the API instance is initialized and the session has reached the state required for this request.
2. Fill the request object with the identifiers and business fields expected by the server.
3. Call the API, inspect the local return code, then complete the workflow through later SPI callbacks.

**Prototype**

```cpp
virtual int ReqUserLoginWithOTP(CThostFtdcReqUserLoginWithOTPField *pReqUserLoginWithOTP, int nRequestID) = 0;
```

**Parameters**

| Name | Type | Purpose |
| --- | --- | --- |
| `pReqUserLoginWithOTP` | `CThostFtdcReqUserLoginWithOTPField *` | Pointer to the request object `CThostFtdcReqUserLoginWithOTPField *`. |
| `nRequestID` | `int` | Request correlation id provided by the caller. |

**Callback and outcome model**

- Success path: `OnRspUserLogin`.

**Return semantics**

- `0` means the request was accepted by the local API runtime and will continue asynchronously through SPI callbacks.
- `-1` means the client is not in a state where the request can be submitted, typically because the connection is unavailable.
- `-2` means too many outstanding requests remain unprocessed on the local side.
- `-3` means the local request-rate limit was hit and the caller should retry later.

**Field guide for `CThostFtdcReqUserLoginWithOTPField`**

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
| `reserve1` | `TThostFtdcOldIPAddressType` | Carries the reserve1 for the current request or response. |
| `LoginRemark` | `TThostFtdcLoginRemarkType` | Carries the login remark for the current request or response. |
| `OTPPassword` | `TThostFtdcPasswordType` | Carries the one-time password password for the current request or response. |
| `ClientIPPort` | `TThostFtdcIPPortType` | Carries the client IP port for the current request or response. |
| `ClientIPAddress` | `TThostFtdcIPAddressType` | Carries the client IP address for the current request or response. |

**Structure layout**

```cpp
struct CThostFtdcReqUserLoginWithOTPField
{

    TThostFtdcDateType  TradingDay;

    TThostFtdcBrokerIDType  BrokerID;

    TThostFtdcUserIDType    UserID;

    TThostFtdcPasswordType  Password;

    TThostFtdcProductInfoType   UserProductInfo;

    TThostFtdcProductInfoType   InterfaceProductInfo;

    TThostFtdcProtocolInfoType  ProtocolInfo;

    TThostFtdcMacAddressType    MacAddress;

    TThostFtdcOldIPAddressType  reserve1;

    TThostFtdcLoginRemarkType   LoginRemark;

    TThostFtdcPasswordType  OTPPassword;

    TThostFtdcIPPortType    ClientIPPort;

    TThostFtdcIPAddressType ClientIPAddress;
};
```

**Usage example**

```cpp
CThostFtdcReqUserLoginWithOTPField reqUserLoginWithOTP = {};
// Fill the required identifiers and business fields before sending the request.
int rc = api->ReqUserLoginWithOTP(&reqUserLoginWithOTP, requestId++);
if (rc != 0) {
    // Handle the local submission failure before waiting for callbacks.
}
```

**Implementation notes**

- Treat the immediate return code and the later callbacks as two different stages of the same business operation.
- Preserve the identifiers sent in the request because later callbacks often reference them instead of your local in-memory object.

## ReqUserLoginWithText

`ReqUserLoginWithText` is an asynchronous request entry point used to drive a business operation through the CTP runtime.

- Kind: request
- Owning interface: `CThostFtdcTraderApi`
- Related symbols: `OnRspUserLogin`

**When to use it**

- Establish a fresh authenticated session before any trading or market-data work.
- Recover after a disconnect and rebuild client-side session state.

**How to apply it**

1. Ensure the API instance is initialized and the session has reached the state required for this request.
2. Fill the request object with the identifiers and business fields expected by the server.
3. Call the API, inspect the local return code, then complete the workflow through later SPI callbacks.

**Prototype**

```cpp
virtual int ReqUserLoginWithText(CThostFtdcReqUserLoginWithTextField *pReqUserLoginWithText, int nRequestID) = 0;
```

**Parameters**

| Name | Type | Purpose |
| --- | --- | --- |
| `pReqUserLoginWithText` | `CThostFtdcReqUserLoginWithTextField *` | Pointer to the request object `CThostFtdcReqUserLoginWithTextField *`. |
| `nRequestID` | `int` | Request correlation id provided by the caller. |

**Callback and outcome model**

- Success path: `OnRspUserLogin`.

**Return semantics**

- `0` means the request was accepted by the local API runtime and will continue asynchronously through SPI callbacks.
- `-1` means the client is not in a state where the request can be submitted, typically because the connection is unavailable.
- `-2` means too many outstanding requests remain unprocessed on the local side.
- `-3` means the local request-rate limit was hit and the caller should retry later.

**Field guide for `CThostFtdcReqUserLoginWithTextField`**

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
| `reserve1` | `TThostFtdcOldIPAddressType` | Carries the reserve1 for the current request or response. |
| `LoginRemark` | `TThostFtdcLoginRemarkType` | Carries the login remark for the current request or response. |
| `Text` | `TThostFtdcPasswordType` | Carries the text challenge for the current request or response. |
| `ClientIPPort` | `TThostFtdcIPPortType` | Carries the client IP port for the current request or response. |
| `ClientIPAddress` | `TThostFtdcIPAddressType` | Carries the client IP address for the current request or response. |

**Structure layout**

```cpp
struct CThostFtdcReqUserLoginWithTextField
{

    TThostFtdcDateType  TradingDay;

    TThostFtdcBrokerIDType  BrokerID;

    TThostFtdcUserIDType    UserID;

    TThostFtdcPasswordType  Password;

    TThostFtdcProductInfoType   UserProductInfo;

    TThostFtdcProductInfoType   InterfaceProductInfo;

    TThostFtdcProtocolInfoType  ProtocolInfo;

    TThostFtdcMacAddressType    MacAddress;

    TThostFtdcOldIPAddressType  reserve1;

    TThostFtdcLoginRemarkType   LoginRemark;

    TThostFtdcPasswordType  Text;

    TThostFtdcIPPortType    ClientIPPort;

    TThostFtdcIPAddressType ClientIPAddress;
};
```

**Usage example**

```cpp
CThostFtdcReqUserLoginWithTextField reqUserLoginWithText = {};
// Fill the required identifiers and business fields before sending the request.
int rc = api->ReqUserLoginWithText(&reqUserLoginWithText, requestId++);
if (rc != 0) {
    // Handle the local submission failure before waiting for callbacks.
}
```

**Implementation notes**

- Treat the immediate return code and the later callbacks as two different stages of the same business operation.
- Preserve the identifiers sent in the request because later callbacks often reference them instead of your local in-memory object.
