# Exceptions

| Exception | Base | Description |
|-----------|------|-------------|
| `ServerException` | `Exception` | Server error with `Msg Code` field |
| `ConnectException` | `Exception` | Connection failure |
| `ConnectionException` | `ApplicationException` | Connection error |
| `ServerNotFoundException` | `Exception` | Server not found |
| `InvalidSymbolException` | `Exception` | Invalid symbol |
| `InvestorModeException` | `Exception` | Operation blocked in investor mode |
| `DoubleRequestException` | `Exception` | Duplicate request detected |
| `ProxyException` | `Exception` | Proxy error (with `Socks5ToString` helper) |

## Reflection Utility

```
static void CopyProperties(object source, object destination)
```
