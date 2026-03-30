---
name: notification
description: Send push notifications. MUST use when the user asks to send, receive, or configure notifications.
---

# Task Completion Notifier

Send a push notification via [ntfy](https://ntfy.sh) or [Bark](https://github.com/Finb/Bark) when your current task is finished. Designed for long-running sessions where the user wants to step away and get pinged on their phone or desktop when work is done.

## Priority Levels

Parse the priority from the user's message or command arguments:

| User input                          | Priority name | Behavior                                      |
|-------------------------------------|---------------|-----------------------------------------------|
| `/notification` or "normal" (default)       | normal        | Standard notification                         |
| `/notification urgent` or "urgent"          | urgent        | Breakthrough / high-priority notification      |

If the user writes anything that clearly conveys urgency (e.g. "high priority", "important", "asap"), treat it as urgent.

## Workflow

### Step 1 — Complete the task

Carry out whatever the user asked for. This skill does not alter your approach to the task itself — it only adds a notification at the end.

### Step 2 — Send the notification

After the task completes (whether it succeeded or failed), send the notification using the resolved provider.

**Compose the notification:**

- **Title**: The specific task name (e.g. "Run test suite", "Refactor auth module"). Use the user's own words when possible.
- **Message**: A concise summary (max 200 characters) describing the result of the task and what work was completed. On failure, describe what failed and why. Focus on outcomes, not process.
- **Priority**: normal by default, urgent only when the user explicitly requests it.

**Send the notification** using the `send.mjs` script in this skill's `scripts` directory:

```bash
node "<skill-directory>/scripts/send.mjs" \
  --title "<title>" \
  --message "<message body>" \
  --priority <3 or 5> \
  --tags "<white_check_mark or x>"
```

The script auto-detects the provider from environment variables and handles all configuration. If environment variables are missing, the script will exit with an error explaining how to configure a provider — relay that message to the user.


### Failure handling

- If **the script fails** (non-zero exit), mention to the user that the notification could not be sent — but do not let it block delivering the task result.
- If the **task itself fails**, still send a notification with the failure indicator so the user knows to come check. The whole point is that the user might be AFK — a failure notification is just as valuable as a success one.
