# Bark — Provider Reference

[Bark](https://github.com/Finb/Bark) is a free, open-source push notification app for iOS that leverages Apple Push Notification service (APNs). You send notifications by making a simple HTTP request to a Bark server — either the public `api.day.app` or a self-hosted instance.

## Environment Variables

| Variable   | Required | Description                                                                      |
|------------|----------|----------------------------------------------------------------------------------|
| `BARK_URL` | Yes      | Bark server URL **including your device key**, e.g. `https://api.day.app/ABCDEF` |

No separate auth token is needed — the device key in the URL serves as authentication.

## Priority Mapping

Bark uses an `level` parameter (Apple's interruption levels) instead of numeric priority:

| Skill priority | Bark `level`    | Device behavior                                        |
|----------------|-----------------|--------------------------------------------------------|
| normal         | `active`        | Lights up screen, default sound                        |
| urgent         | `timeSensitive` | Breaks through Focus / Do Not Disturb                  |

> For truly critical alerts (ignores silent mode, always plays sound), you can use `critical` — but this skill defaults to `timeSensitive` for urgent, which is appropriate for task-completion pings.

## Sending a Notification

Use a POST request with a JSON body:

```bash
curl -s -o /dev/null -w "%{http_code}" \
  -X POST "$BARK_URL" \
  -H "Content-Type: application/json; charset=utf-8" \
  -d '{
    "title": "<title>",
    "body": "<message body>",
    "group": "claude-code",
    "level": "<active or timeSensitive>",
    "icon": "https://claude.ai/favicon.ico"
  }'
```

### JSON Body Parameters

| Field   | Required | Description                                                       |
|---------|----------|-------------------------------------------------------------------|
| `title` | No       | Notification title — use the task name from the user's words      |
| `body`  | Yes      | Notification body text                                            |
| `group` | No       | Groups notifications in the notification center (use `claude-code`) |
| `level` | No       | Interruption level: `active` (default), `timeSensitive`, `passive`, `critical` |
| `icon`  | No       | URL for a custom notification icon (iOS 15+)                      |
| `sound` | No       | Sound name, e.g. `minuet`, `alarm`, `bell`, `chime`               |
| `url`   | No       | URL to open when notification is tapped                           |
| `badge` | No       | Number to display on the app icon badge                           |

### Success Check

Bark returns a JSON response. A successful send looks like:

```json
{ "code": 200, "message": "success" }
```

Check for HTTP 200 status. Any non-zero curl exit code or non-200 status means delivery failed.
