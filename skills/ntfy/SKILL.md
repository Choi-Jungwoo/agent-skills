---
name: ntfy
description: Send a push notification via ntfy or Bark when work is complete. Use this skill whenever the user says "notify me", "alert me", "ping me when done", "/ntfy", or wants to be notified after a long-running task finishes. Also trigger when the user mentions ntfy, Bark, push notifications for task completion, or says things like "let me know when it's done" in the context of wanting an external notification. Supports normal and urgent priority levels via "/ntfy" (normal) and "/ntfy urgent".
---

# Task Completion Notifier

Send a push notification via [ntfy](https://ntfy.sh) or [Bark](https://github.com/Finb/Bark) when your current task is finished. Designed for long-running sessions where the user wants to step away and get pinged on their phone or desktop when work is done.

## Environment Variables

| Variable     | Required | Description                                                          |
|--------------|----------|----------------------------------------------------------------------|
| `NTFY_URL`   | No*      | Full ntfy endpoint including topic, e.g. `https://ntfy.sh/my-alerts` |
| `NTFY_TOKEN` | No       | Bearer token for authenticated ntfy servers; omit for public topics  |
| `BARK_URL`   | No*      | Bark server URL including device key, e.g. `https://api.day.app/your_key` |

\* At least one of `NTFY_URL` or `BARK_URL` must be set. If both are set, ntfy is used.

The user sets these in their shell profile, `.env`, or Claude Code settings (`env` field in `settings.json`).

## Priority Levels

Parse the priority from the user's message or command arguments:

| User input                          | Priority name | Behavior                                      |
|-------------------------------------|---------------|-----------------------------------------------|
| `/ntfy` or "normal" (default)       | normal        | Standard notification                         |
| `/ntfy urgent` or "urgent"          | urgent        | Breakthrough / high-priority notification      |

If the user writes anything that clearly conveys urgency (e.g. "high priority", "important", "asap"), treat it as urgent.

## Workflow

### Step 1 — Detect provider and validate configuration

Determine the provider based on which URL environment variable is set. If both are set, prefer ntfy.

**Validate:**

```bash
if [ -n "${NTFY_URL:-}" ]; then
  PROVIDER="ntfy"
elif [ -n "${BARK_URL:-}" ]; then
  PROVIDER="bark"
else
  echo "Error: Neither NTFY_URL nor BARK_URL is set" >&2; exit 1
fi
```

If neither URL is set, stop and tell the user:

> No notification service is configured. Set up at least one:
>
> **ntfy** (cross-platform):
> ```bash
> export NTFY_URL="https://ntfy.sh/your-topic"
> export NTFY_TOKEN="tk_xxx"          # optional, for private servers
> ```
>
> **Bark** (iOS):
> ```bash
> export BARK_URL="https://api.day.app/your_device_key"
> ```

Do **not** proceed with the task until a valid provider is confirmed.

### Step 2 — Complete the task

Carry out whatever the user asked for. This skill does not alter your approach to the task itself — it only adds a notification at the end.

### Step 3 — Send the notification

After the task completes (whether it succeeded or failed), send the notification using the resolved provider.

**Compose the notification:**

- **Title**: The specific task name (e.g. "Run test suite", "Refactor auth module"). Use the user's own words when possible.
- **Message**: `<task name> is completed, please continue.` on success, or `<task name> failed, please check.` on failure. Keep it short — this is a ping, not a report.
- **Priority**: normal by default, urgent only when the user explicitly requests it.

**Send the notification** by following the curl command in the appropriate reference file:

- **ntfy** → read `references/ntfy.md` for the curl command, headers, and tag mapping
- **Bark** → read `references/bark.md` for the curl command, JSON body, and level mapping

### Failure handling

- If **curl fails** (non-zero exit or non-2xx status), mention to the user that the notification could not be sent — but do not let it block delivering the task result.
- If the **task itself fails**, still send a notification with the failure indicator so the user knows to come check. The whole point is that the user might be AFK — a failure notification is just as valuable as a success one.
