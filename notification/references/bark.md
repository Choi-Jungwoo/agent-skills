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

Use the `send.mjs` script located alongside this reference directory. This script uses Node.js `fetch` to ensure correct UTF-8 encoding on all platforms (including Windows).

```bash
node "<skill-directory>/send.mjs" \
  --title "<title>" \
  --message "<message body>" \
  --priority <3 or 5>
```

> **Note:** Replace `<skill-directory>` with the absolute path to this skill's installation directory. The provider is auto-detected from the `BARK_URL` environment variable.

### Parameters

| Parameter   | Required | Value                                    | Notes                                              |
|-------------|----------|------------------------------------------|----------------------------------------------------|
| `--title`   | No       | Task name from the user's words          |                                                    |
| `--message` | Yes      | Notification body text                   |                                                    |
| `--priority`| No       | `3` (normal) or `5` (urgent)             | `3` → `active`, `5` → `timeSensitive`             |

The script reads `BARK_URL` from environment variables. The device key in the URL serves as authentication.

### Bark-specific Features (manual use)

These fields are supported by Bark but not exposed via `send.mjs` CLI flags. They are hardcoded with sensible defaults in the script:

| Field   | Default in script | Description                                                       |
|---------|-------------------|-------------------------------------------------------------------|
| `group` | `claude-code`     | Groups notifications in the notification center                   |
| `icon`  | Claude favicon    | URL for a custom notification icon (iOS 15+)                      |
| `sound` | —                 | Sound name, e.g. `minuet`, `alarm`, `bell`, `chime`               |
| `url`   | —                 | URL to open when notification is tapped                           |
| `badge` | —                 | Number to display on the app icon badge                           |

### Success Check

Bark returns a JSON response. A successful send looks like:

```json
{ "code": 200, "message": "success" }
```

Check for HTTP 200 status. Any non-zero curl exit code or non-200 status means delivery failed.
