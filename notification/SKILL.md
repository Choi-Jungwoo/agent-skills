---
name: notification
description: Send push notifications. MUST use when the user asks to send, test, or configure notifications, or mentions "notify me", "ping me", "alert me", "let me know", or /notification.
---

# Notification

Send push notifications via ntfy or Bark. Use this skill for **any** notification-related request — sending, testing, or configuring.

## Triggers

Activate when the user:
- Uses `/notification` or asks to send/test a notification
- Says "notify me", "ping me", "alert me", "let me know", "send a push notification"
- Asks about notification setup, configuration, or troubleshooting
- Requests to be alerted when a task completes

## Priority

| User signal | `--priority` | `--tags` |
|---|---|---|
| Default / "normal" / no signal | `3` | `white_check_mark` (success) or `x` (failure) |
| "urgent" / "high priority" / "important" / "asap" | `5` | `white_check_mark` (success) or `x` (failure) |

Choose `--tags` based on task outcome: `white_check_mark` if the task succeeded, `x` if it failed.

## Workflow

1. **If there is a task**, complete it first — this skill adds a notification at the end.
2. **Send the notification** using the command below. Do not skip this step even if the task failed. If the user only asked to send/test a notification (no preceding task), go directly to this step.

### Compose fields

- **`--title`**: The task or notification name in the user's own words (e.g. "Run test suite", "Refactor auth module", "Test notification").
- **`--message`**: A concise summary (max 200 chars) of the outcome. On failure, state what failed and why. For standalone notifications, use the user's message.
- **`--priority`** and **`--tags`**: See the table above.

### Send command

```bash
node "<skill-directory>/scripts/send.mjs" \
  --title "<title>" \
  --message "<message>" \
  --priority <3|5> \
  --tags "<white_check_mark|x>"
```

## Failure handling

- **Script fails** (non-zero exit): Tell the user the notification could not be sent, but still deliver the task result.
- **Task fails**: Send the notification with `--tags x` so the user knows to check back. A failure notification is as valuable as a success one — the user may be AFK.
- **Missing env vars**: The script prints setup instructions on error — relay them to the user.
