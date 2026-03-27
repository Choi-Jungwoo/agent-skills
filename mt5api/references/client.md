# MT5API — Main Client Class

The central class. All trading, quoting, and connection operations go through this.

## Constructors

```
MT5API()
MT5API(ulong user, string password, string host, int port)
MT5API(ulong user, string password, string host, int port, byte[] pfxFile = null, string pfxFilePassword = null)
MT5API(ulong user, string password, string server, byte[] pfxFile = null, string pfxFilePassword = null)
MT5API(ulong user, string password, string host, int port, string proxyHost, int proxyPort, string proxyUser, string proxyPassword, ProxyTypes type)
```

## Connection

| Member | Signature | Description |
|--------|-----------|-------------|
| `Connect` | `void Connect()` | Synchronous connect |
| `ConnectAsync` | `Task ConnectAsync()` | Async connect |
| `ConnectAsync` | `Task ConnectAsync(CancellationToken cancellation)` | Async connect with cancellation |
| `ConnectAsync` | `Task ConnectAsync(int timeoutMs)` | Async connect with timeout |
| `Disconnect` | `void Disconnect()` | Disconnect from server |
| `Connected` | `bool { get; }` | Connection status |
| `ConnectTime` | `DateTime { get; set; }` | When connection was established |
| `ConnectTimeout` | `int` (field) | Overall connection timeout (ms) |
| `ConnectTimeoutForOneClusterMember` | `int` (field) | Per-node connection timeout (ms) |

## Account Properties

| Member | Type | Description |
|--------|------|-------------|
| `Account` | `AccountRec { get; set; }` | Full account record |
| `AccountEquity` | `double { get; }` | Account equity |
| `AccountMargin` | `double { get; }` | Used margin |
| `AccountFreeMargin` | `double { get; }` | Free margin |
| `AccountProfit` | `double { get; }` | Current P&L |
| `MarginLevel` | `double { get; }` | Margin level % |
| `AccountCurrency` | `string { get; }` | Account currency |
| `AccountCompanyName` | `string { get; }` | Broker company name |
| `AccountMethod` | `AccMethod { get; }` | Netting / Hedging / Default |
| `User` | `ulong { get; set; }` | Login ID |
| `Password` | `string { get; set; }` | Account password |
| `IsInvestor` | `bool { get; }` | Investor (read-only) mode |
| `IsTradeAllowed` | `bool { get; }` | Trading permission |
| `IsTradeDisableOnServer` | `bool { get; }` | Server-side trade disable |
| `IsNotConfirmedAccount` | `bool { get; }` | Account not confirmed |

## Server & Timing

| Member | Type | Description |
|--------|------|-------------|
| `ServerTime` | `DateTime { get; }` | Server's current time |
| `ServerTimeZoneInMinutes` | `int { get; }` | Server timezone offset |
| `LastServerMessageTime` | `DateTime` (field) | Last message from server (staleness tracking) |
| `LastQuoteTime` | `DateTime { get; set; }` | Last quote received time |
| `NoServerMessagesTimeout` | `int` (field) | Dead connection timeout (ms) |
| `Server` | `string` (field) | Server name |
| `Host` | `string { get; set; }` | Server host |
| `Port` | `int { get; set; }` | Server port |
| `ServerBuild` | `short { get; }` | Server build number |
| `Id` | `string { get; set; }` | Client identifier |

## Cluster

| Member | Signature |
|--------|-----------|
| `ClusterSummary` | `ServerRec { get; }` |
| `ClusterMembers` | `Dictionary<AccessInfo, AddressRec[]> { get; }` |
| `ClusterDetails()` | `ClusterDetails` — returns full cluster topology |
| `PingHost` | `static int PingHost(string host, int port = 443)` — TCP ping in ms |

## Order Execution Methods

| Method | Signature |
|--------|-----------|
| `OrderSend` | `Order OrderSend(string symbol, double lots, double price, OrderType type, double sl = 0, double tp = 0, ulong deviation = 0, string comment = null, long expertID = 0, FillPolicy fillPolicy = Any, TradeType tradeType = Transfer, double stoplimit = 0, Expiration expiration = null, long closeByTicket = 0, PlacedType placedType = Manually)` |
| `OrderSendAsyncTask` | `Task<Order> OrderSendAsyncTask(...)` — same params, returns Task |
| `OrderSendAsync` | `void OrderSendAsync(int requestId, ...)` — fire-and-forget with request ID |
| `OrderClose` | `Order OrderClose(long ticket, string symbol, double price, double lots, OrderType type, ulong deviation = 0, FillPolicy fillPolicy = Any, long expertId = 0, string comment = null, long closeByTicket = 0, PlacedType placedType = Manually)` |
| `OrderCloseAsyncTask` | `Task<Order> OrderCloseAsyncTask(...)` — same params |
| `OrderCloseAsync` | `void OrderCloseAsync(int requestId, ...)` — fire-and-forget |
| `OrderModify` | `void OrderModify(long ticket, string symbol, double lots, double price, OrderType type, double sl, double tp, long expertID = 0, double stoplimit = 0, Expiration expiration = null, string comment = null)` |
| `OrderModifyAsyncTask` | `Task OrderModifyAsyncTask(...)` |
| `OrderModifyAsync` | `void OrderModifyAsync(int requestId, ...)` |

## Position & Order Queries

| Method | Signature |
|--------|-----------|
| `GetOpenedOrders` | `Order[] GetOpenedOrders(OrderSort sort = OpenTime, bool ascending = True)` |
| `GetOpenedOrder` | `Order GetOpenedOrder(long ticket)` |
| `ClosedOrders` | `Order[] ClosedOrders()` |

## Quote Methods

| Method | Signature |
|--------|-----------|
| `GetQuote` | `Quote GetQuote(string symbol, int msTimeout = 0, int msNotOlder = 0)` |
| `GetQuoteTask` | `Task<Quote> GetQuoteTask(string symbol, int msTimeout = 5000, int msNotOlder = 0)` |
| `GetQuoteAsync` | `Task<Quote> GetQuoteAsync(string symbol, int msTimeout = 5000, int msNotOlder = 0)` |
| `GetQuoteFromAnyServer` | `Quote GetQuoteFromAnyServer(string symbol)` |
| `GetMarketWatch` | `MarketWatch GetMarketWatch(string symbol)` |
| `GetMarketWatchAsync` | `Task<MarketWatch> GetMarketWatchAsync(string symbol)` |
| `GetQuoteTimeoutMs` | `int` (field) — quote request timeout |

## Symbol Methods

| Method | Signature |
|--------|-----------|
| `Subscribe` | `void Subscribe(string symbol)` / `void Subscribe(string[] symbols)` |
| `SubscribeAsync` | `Task SubscribeAsync(string symbol)` / `Task SubscribeAsync(string[] symbols)` |
| `SubscribeForce` | `void SubscribeForce(string[] symbols)` |
| `SubscribeForceAsync` | `Task SubscribeForceAsync(string[] symbols)` |
| `SubscribeIgnoreNotExistAsync` | `Task SubscribeIgnoreNotExistAsync(string[] symbols)` |
| `SubscribeForceIgnoreNotExist` | `void SubscribeForceIgnoreNotExist(string[] symbols)` |
| `SubscribeForceIgnoreNotExistAsync` | `Task SubscribeForceIgnoreNotExistAsync(string[] symbols)` |
| `Unsubscribe` | `void Unsubscribe(string symbol)` / `void Unsubscribe(string[] symbols)` |
| `Subscriptions` | `string[] Subscriptions()` |
| `IsSubscribed` | `bool IsSubscribed(string symbol)` |
| `IsQuoteSession` | `bool IsQuoteSession(string symbol)` |
| `IsTradeSession` | `bool IsTradeSession(string symbol)` |
| `Symbols` | `Symbols` (field, readonly) — symbol registry |
| `GetContractSize` | `double GetContractSize(string symbol)` |
| `GetTickSize` | `double GetTickSize(string symbol)` |
| `GetTickValue` | `double GetTickValue(string symbol, int msGetQuoteTimeout = 10000)` |
| `GetTickValueAsync` | `Task<double> GetTickValueAsync(string symbol, int msGetQuoteTimeout = 10000)` |
| `GetBidTickValue` | `double GetBidTickValue(Quote quote)` |
| `GetBidTickValueAsync` | `Task<double> GetBidTickValueAsync(Quote quote)` |
| `GetAskTickValue` | `double GetAskTickValue(Quote quote)` |
| `GetAskTickValueAsync` | `Task<double> GetAskTickValueAsync(Quote quote)` |

## Order Book

| Method | Signature |
|--------|-----------|
| `SubscribeOrderBook` | `void SubscribeOrderBook(string symbol)` |
| `UnsubscribeOrderBook` | `void UnsubscribeOrderBook(string symbol)` |

## History Downloads

| Method | Signature |
|--------|-----------|
| `DownloadQuoteHistory` | `Bar[] DownloadQuoteHistory(string symbol, DateTime from, DateTime to, int timeFrame)` |
| `DownloadQuoteHistoryAsync` | `Task<Bar[]> DownloadQuoteHistoryAsync(string symbol, DateTime from, DateTime to, int timeFrame)` |
| `DownloadQuoteHistoryMonth` | `List<Bar> DownloadQuoteHistoryMonth(string symbol, int year, int month, int day, int timeFrame, int timeoutMs = 15000)` |
| `DownloadQuoteHistoryMonthAsync` | `Task<List<Bar>> DownloadQuoteHistoryMonthAsync(...)` |
| `DownloadQuoteHistoryToday` | `List<Bar> DownloadQuoteHistoryToday(string symbol, int timeFrame, int timeoutMs = 15000)` |
| `DownloadQuoteHistoryTodayAsync` | `Task<List<Bar>> DownloadQuoteHistoryTodayAsync(...)` |
| `DownloadOrderHistory` | `OrderHistoryEventArgs DownloadOrderHistory(DateTime from, DateTime to, OrderSort sort = OpenTime, bool ascending = True)` |
| `DownloadOrderHistoryAsync` | `Task<OrderHistoryEventArgs> DownloadOrderHistoryAsync(DateTime from, DateTime to, OrderSort sort = OpenTime, bool ascending = True, DealInternal[] existDeals = null, CancellationToken cancellation = null)` |
| `DownloadPendingOrderHistory` | `List<OrderInternal> DownloadPendingOrderHistory(DateTime from, DateTime to, bool ascending = True)` |
| `DownloadPendingOrderHistoryAsync` | `Task<List<OrderInternal>> DownloadPendingOrderHistoryAsync(...)` |
| `RequestOrderHistory` | `void RequestOrderHistory(DateTime from, DateTime to)` / `void RequestOrderHistory(int year, int month, ...)` |
| `RequestPendingOrderHistory` | `void RequestPendingOrderHistory(DateTime from, DateTime to)` / `void RequestPendingOrderHistory(int year, int month, ...)` |
| `RequestQuoteHistoryMonth` | `void RequestQuoteHistoryMonth(string symbol, int year, int month, int day)` |
| `RequestQuoteHistoryToday` | `void RequestQuoteHistoryToday(string symbol)` |
| `TickHistoryRequest` | `void TickHistoryRequest(string symbol, int startYear, int startMonth, int startDay)` |
| `TickHistoryStop` | `void TickHistoryStop(string symbol)` |
| `DownloadOrderHistoryTimeout` | `int` (field) — timeout for history downloads |

## Profit Calculation

| Method | Signature |
|--------|-----------|
| `UpdateProfits` | `void UpdateProfits(Quote quote = null)` |
| `UpdateProfitsAsync` | `Task UpdateProfitsAsync(Quote quote = null)` |
| `UpdateAccountProfit` | `void UpdateAccountProfit()` / `double UpdateAccountProfit(List<Order> orders)` |
| `CalculateOrderProfit` | `double CalculateOrderProfit(string symbol, double openPrice, double closePrice, double lots, bool buy)` |
| `RequiredMargin` | `Task<double> RequiredMargin(string symbol, double lots, DealType type = DealBuy, double price = 0)` |
| `CalculateEquityHistory` | `List<EquityPoint> CalculateEquityHistory(DateTime from, MT5API api, EquityTimeframe timeframe, bool excludeSameBars = True)` |

## Misc

| Method | Signature |
|--------|-----------|
| `ChangePassword` | `void ChangePassword(string password, bool isInvestor = False)` |
| `GetRequestId` | `int GetRequestId()` |
| `MailBodyRequest` | `void MailBodyRequest(long id)` |
| `Mails` | `List<MailMessage> { get; }` |
| `ConvertToTimeframe` | `List<Bar> ConvertToTimeframe(List<Bar> bars, int minutes)` |
| `RequestDemoAccount` | `static AccountAnswer RequestDemoAccount(AccountRequest req, string host, int port)` |
| `LoadServersDat` | `static Server[] LoadServersDat(string path)` / `static Server[] LoadServersDat(byte[] bytes)` |
| `SaveServersDat` | `static byte[] SaveServersDat(Server[] servers)` |

## Configuration Fields

| Field | Type | Description |
|-------|------|-------------|
| `ExecutionTimeout` | `int` | Order execution timeout (ms) |
| `PlacedType` | `PlacedType` | Default order placement type |
| `LoginIdPath` | `string` | Path for login ID resolution |
| `LoginIdWebServerTimeout` | `int` | Login ID web server timeout |
| `ApiKey` | `string` | API key |
| `ExLoginManagers` | `string[]` | Extended login managers |
| `ExLoginProxies` | `string[]` | Extended login proxies |
| `DisallowLocalConnections` | `bool` | Block local connections |
| `UseConnectTask` | `bool` | Use task-based connect |
| `ProcessServerMessagesInThread` | `bool { get; set; }` | Thread message processing |
| `DisconnectOnSymbolUpdate` | `bool { get; set; }` | Auto-disconnect on symbol update |
| `EnableAllOrderUpdates` | `bool { get; set; }` | Receive all order update events |
| `ProcessEventTimeoutMs` | `int` | Event processing timeout |
| `OtpPassword` | `string { get; set; }` | One-time password |
| `HardwareId` | `byte[] { get; set; }` | Hardware identification |
| `PfxFile` | `byte[] { get; set; }` | SSL certificate |
| `PfxFilePassword` | `string { get; set; }` | SSL certificate password |
| `CommonKey` | `byte[] { get; set; }` | Common encryption key |
| `Build` | `int { get; set; }` | Client build number |

## Proxy Configuration

| Field | Type |
|-------|------|
| `ProxyEnable` | `bool` |
| `ProxyHost` | `string` |
| `ProxyPort` | `int` |
| `ProxyUser` | `string` |
| `ProxyPassword` | `string` |
| `ProxyType` | `ProxyTypes` |

## Events

| Event | Delegate | Fires When |
|-------|----------|------------|
| `OnQuote` | `OnQuote(MT5API sender, Quote quote)` | New quote received |
| `OnOrderUpdate` | `OnOrderUpdate(MT5API sender, OrderUpdate update)` | Order state changed on server |
| `OnOrderProgress` | `OnOrderProgress(MT5API sender, OrderProgress progress)` | Order execution step completed |
| `OnOrderHistory` | `OnOrderHistory(MT5API sender, OrderHistoryEventArgs args)` | Order history received |
| `OnConnectProgress` | `OnConnectProgress(MT5API sender, ConnectEventArgs args)` | Connection stage changed |
| `OnSymbolUpdate` | `OnSymbolUpdate(MT5API sender, SymbolUpdate update)` | Symbol config changed |
| `OnSymbolsUpdate` | `OnSymbolsUpdate(MT5API sender)` | Symbols list changed |
| `OnQuoteHistory` | `OnQuoteHistory(MT5API sender, QuoteHistoryEventArgs args)` | Quote history chunk received |
| `OnTickHistory` | `OnTickHistory(MT5API sender, TickHistoryEventArgs args)` | Tick history chunk received |
| `OnMail` | `OnMail(MT5API sender, MailMessage msg)` | Internal mail received |
| `OnOrderBook` | `OnOrderBook(MT5API sender, MarketDepthEventArgs args)` | Order book update |
