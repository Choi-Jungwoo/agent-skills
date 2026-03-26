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

```bash
curl -s -o /dev/null -w "%{http_code}" \
  -H "Title: <title>" \
  -H "Priority: <3 or 5>" \
  -H "Tags: <white_check_mark or x>" \
  ${NTFY_TOKEN:+-H "Authorization: Bearer $NTFY_TOKEN"} \
  -d "<message body>" \
  "$NTFY_URL"
```

### Header Reference

| Header          | Value                                    | Notes                                              |
|-----------------|------------------------------------------|----------------------------------------------------|
| `Title`         | Task name from the user's words          |                                                    |
| `Priority`      | `3` (normal) or `5` (urgent)             |                                                    |
| `Tags`          | `white_check_mark` (success) / `x` (fail) | Renders as emoji in ntfy clients                 |
| `Authorization` | `Bearer $NTFY_TOKEN`                     | Only include when `NTFY_TOKEN` is set              |

The `${NTFY_TOKEN:+...}` shell pattern conditionally includes the Authorization header only when the token is set, so public topics work without any auth configuration.

### Success Check

A 2xx HTTP status code means the notification was delivered to the ntfy server. Any non-zero curl exit code or non-2xx status means delivery failed.
