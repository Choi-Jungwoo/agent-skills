---
name: ntfy
description: Send a push notification via ntfy when work is complete. Use this skill whenever the user says "notify me", "alert me", "ping me when done", "/ntfy", or wants to be notified after a long-running task finishes. Also trigger when the user mentions ntfy, push notifications for task completion, or says things like "let me know when it's done" in the context of wanting an external notification. Supports normal and urgent priority levels via "/ntfy" (normal) and "/ntfy urgent".
---

# Task Completion Notifier

Send a push notification via [ntfy](https://ntfy.sh) when your current task is finished. Designed for long-running Vibe Coding sessions where the user wants to step away and get pinged on their phone or desktop when work is done.

## Environment Variables

Two env vars configure the ntfy connection. The user sets these in their shell profile, `.env`, or Claude Code settings (`env` field in `settings.json`):

| Variable     | Required | Description                                                                 |
|--------------|----------|-----------------------------------------------------------------------------|
| `NTFY_URL`   | Yes      | Full ntfy endpoint including topic, e.g. `https://ntfy.sh/my-alerts`        |
| `NTFY_TOKEN` | No       | Bearer token for authenticated ntfy servers; omit for public topics         |

## Priority Levels

The user selects priority when invoking the skill. Parse it from their message or the command arguments:

| User input                          | Priority name | ntfy value | Phone behavior                                 |
|-------------------------------------|---------------|------------|-------------------------------------------------|
| `/ntfy` or "normal" (default)       | default       | `3`        | Short vibration + default sound                 |
| `/ntfy urgent` or "urgent"          | urgent        | `5`        | Long vibration bursts, pop-over notification    |

If the user writes anything that clearly conveys urgency (e.g. "high priority", "important", "asap"), treat it as urgent.

## Workflow

### Step 1 — Validate configuration

Before starting any work, verify the environment variable is available:

```bash
echo "${NTFY_URL:?NTFY_URL is not set}"
```

If `NTFY_URL` is missing, stop and tell the user:

> `NTFY_URL` is not set. Please configure it with your ntfy endpoint:
>
> ```bash
> # In your shell profile or Claude Code settings.json env field:
> export NTFY_URL="https://ntfy.sh/your-topic"
> # Optional, for private ntfy servers:
> export NTFY_TOKEN="tk_your_token_here"
> ```

Do **not** proceed with the task until the URL is confirmed available.

### Step 2 — Complete the task

Carry out whatever the user asked for. This skill does not alter your approach to the task itself — it only adds a notification at the end.

### Step 3 — Send the notification

After the task completes (whether it succeeded or failed), send the notification.

**Compose the notification:**

- **Title**: The specific task name (e.g. "Run test suite", "Refactor auth module", "Build project"). Use the user's own words for the task when possible.
- **Message**: Always use the pattern: `<task name> is completed, please continue.` on success, or `<task name> failed, please check.` on failure. Keep it short — this is a ping, not a report.
- **Tags**: `white_check_mark` for success, `x` for failure.
- **Priority**: `3` (normal) by default, `5` (urgent) only when the user explicitly requests it.

**Send via curl:**

```bash
curl -s -o /dev/null -w "%{http_code}" \
  -H "Title: <title>" \
  -H "Priority: <3 or 5>" \
  -H "Tags: <white_check_mark or x>" \
  ${NTFY_TOKEN:+-H "Authorization: Bearer $NTFY_TOKEN"} \
  -d "<message body>" \
  "$NTFY_URL"
```

The `${NTFY_TOKEN:+...}` pattern conditionally includes the Authorization header only when the token is set, so public topics work without any auth configuration.

### Failure handling

- If **curl fails** (non-zero exit or non-2xx status), mention to the user that the notification could not be sent — but do not let it block delivering the task result.
- If the **task itself fails**, still send a notification with the failure tag (`x`) and an appropriate title so the user knows to come check. The whole point is that the user might be AFK — a failure notification is just as valuable as a success one.
