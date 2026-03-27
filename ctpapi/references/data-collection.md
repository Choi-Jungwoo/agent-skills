# CTP data collection and supervision guide

This reference covers the supervision-data collection workflow, the helper APIs that support it, and the implementation implications for compliant deployments.

| Entry | Kind |
| --- | --- |
| Look-through supervision data collection | topic |
| Common FAQ | topic |
| CTP-GetSystemInfo | helper |
| CTP-GetDataCollectApiVersion | helper |

## Look-through supervision data collection

This section explains the rule set, overview, or release topic represented by `Look-through supervision data collection`.

- Kind: topic
- Related symbols: `ReqAuthenticate`, `OnRspAuthenticate`, `RegisterUserSystemInfo`, `GetApiVersion`, `ReqUserLogin`, `CTP-GetSystemInfo`, `CTP-GetDataCollectApiVersion`

**When to use it**

- Review the rule before implementing the related API path.
- Use the topic as a checklist when diagnosing production behavior.

**How to apply it**

1. Read this section before implementing the related integration path.
2. Map the rule or overview to the request and callback symbols affected by it.

**Callback and outcome model**

- Success path: `OnRspAuthenticate`.

**Usage example**

```cpp
void CUser::OnFrontConnected()
{
    cout << "OnFrontConnected." << endl;
    static const char *version = m_pUserApi->GetApiVersion();
    cout << "------          " << version << " ------" << endl;
    ReqAuthenticate();
}
int CUser::ReqAuthenticate()
{
    CThostFtdcReqAuthenticateField field;
    memset(&field, 0, sizeof(field));
    strcpy(field.BrokerID, "8000");
    strcpy(field.UserID, "001888");
    strcpy(field.AppID, "XY_Q7_V1.0.0");
    strcpy(field.AuthCode, "5A5P4V7AZ5LCFEAK");
    return m_pUserApi->ReqAuthenticate(&field, 5);
}
```

**Implementation notes**

- Use this section together with the related request and callback entries so the rules become concrete in code.

## Common FAQ

This section explains the rule set, overview, or release topic represented by `Common FAQ`.

- Kind: topic
- Related symbols: `RegisterUserSystemInfo`, `OnRspError`

**When to use it**

- Review the rule before implementing the related API path.
- Use the topic as a checklist when diagnosing production behavior.

**How to apply it**

1. Read this section before implementing the related integration path.
2. Map the rule or overview to the request and callback symbols affected by it.

**Callback and outcome model**

- Success path: `OnRspError`.
- Error path: `OnRspError`.

**Implementation notes**

- Use this section together with the related request and callback entries so the rules become concrete in code.

## CTP-GetSystemInfo

`CTP-GetSystemInfo` is a helper entry point used to support a larger workflow outside the normal class-based request path.

- Kind: helper

**When to use it**

- Use this entry when the related business flow becomes part of your integration.
- Keep the behavior in mind when modeling retries, reconnection, or reconciliation logic.

**How to apply it**

1. Allocate the output buffer described by the helper contract.
2. Call the helper and inspect the returned status immediately.
3. Pass the collected result into the later authentication or compliance path that depends on it.

**Prototype**

```cpp
int CTP_GetSystemInfo(char* pSystemInfo, int& nLen);
```

**Parameters**

| Name | Type | Purpose |
| --- | --- | --- |
| `pSystemInfo` | `char*` | Pointer to the payload object `char*`. |
| `nLen` | `int&` | Carries the n len for the current request or response. |

**Return semantics**

- `0` means the helper collected the system-information payload successfully.
- Any non-zero result means some part of the local system-information collection failed and the caller must inspect the platform-specific error semantics before using the output.

**Usage example**

```cpp
char pSystemInfo[344];
int len;
CTP_GetSystemInfo(pSystemInfo, len);
```

**Implementation notes**

- Use this section together with the related request and callback entries so the rules become concrete in code.

## CTP-GetDataCollectApiVersion

`CTP-GetDataCollectApiVersion` is a helper entry point used to support a larger workflow outside the normal class-based request path.

- Kind: helper

**When to use it**

- Use this entry when the related business flow becomes part of your integration.
- Keep the behavior in mind when modeling retries, reconnection, or reconciliation logic.

**How to apply it**

1. Allocate the output buffer described by the helper contract.
2. Call the helper and inspect the returned status immediately.
3. Pass the collected result into the later authentication or compliance path that depends on it.

**Implementation notes**

- Use this section together with the related request and callback entries so the rules become concrete in code.
