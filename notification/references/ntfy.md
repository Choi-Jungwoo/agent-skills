# ntfy — Provider Reference

[ntfy](https://ntfy.sh) is an open-source HTTP-based pub-sub notification service. You publish a message by POSTing (or simply curling) to a topic URL; any device subscribed to that topic gets a push notification instantly.

## Environment Variables

| Variable     | Required | Description                                                          |
|--------------|----------|----------------------------------------------------------------------|
| `NTFY_URL`   | Yes      | Full endpoint including topic, e.g. `https://ntfy.sh/my-alerts`     |
| `NTFY_TOKEN` | No       | Bearer token for authenticated ntfy servers; omit for public topics  |

## Priority Mapping

| Skill priority | ntfy value | Phone behavior                              |
|----------------|------------|---------------------------------------------|
| normal         | `3`        | Short vibration + default sound             |
| urgent         | `5`        | Long vibration bursts, pop-over notification|

## Sending a Notification

Use the `send.mjs` script located alongside this reference directory. This script uses Node.js `fetch` to ensure correct UTF-8 encoding on all platforms (including Windows).

```bash
node "<skill-directory>/send.mjs" \
  --title "<title>" \
  --message "<message body>" \
  --priority <3 or 5> \
  --tags "<white_check_mark or x>"
```

> **Note:** Replace `<skill-directory>` with the absolute path to this skill's installation directory. The provider is auto-detected from the `NTFY_URL` environment variable.

### Parameters

| Parameter   | Required | Value                                    | Notes                                              |
|-------------|----------|------------------------------------------|----------------------------------------------------|
| `--title`   | No       | Task name from the user's words          |                                                    |
| `--message` | Yes      | Notification body text                   |                                                    |
| `--priority`| No       | `3` (normal) or `5` (urgent)             | Defaults to `3`                                    |
| `--tags`    | No       | `white_check_mark` (success) / `x` (fail) | Renders as emoji in ntfy clients                 |

The script reads `NTFY_URL` and optionally `NTFY_TOKEN` from environment variables. Public topics work without any auth configuration.

### Success Check

A 2xx HTTP status code means the notification was delivered to the ntfy server. Any non-zero curl exit code or non-2xx status means delivery failed.
