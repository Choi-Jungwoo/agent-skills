#!/usr/bin/env node

// Usage: node send.mjs --title "..." --message "..." [--priority 3|5] [--tags "white_check_mark"]
// Provider is auto-detected from environment variables (NTFY_URL or BARK_URL).

const args = process.argv.slice(2);

function getArg(name) {
  const idx = args.indexOf(`--${name}`);
  return idx !== -1 && idx + 1 < args.length ? args[idx + 1] : undefined;
}

// Auto-detect provider from environment
const provider = process.env.NTFY_URL ? "ntfy" : process.env.BARK_URL ? "bark" : null;

if (!provider) {
  console.error("Error: Neither NTFY_URL nor BARK_URL is set");
  process.exit(1);
}

const title = getArg("title") || "";
const message = getArg("message") || "";
const priority = getArg("priority") || "3";
const tags = getArg("tags") || "white_check_mark";

if (!message) {
  console.error("Error: --message is required");
  process.exit(1);
}

async function sendNtfy() {
  // Split NTFY_URL into root URL and topic
  // e.g. "https://ntfy.sh/my-topic" -> root="https://ntfy.sh", topic="my-topic"
  const parsed = new URL(process.env.NTFY_URL);
  const topic = parsed.pathname.slice(1);
  parsed.pathname = "/";

  const headers = { "Content-Type": "application/json; charset=utf-8" };
  if (process.env.NTFY_TOKEN) {
    headers["Authorization"] = `Bearer ${process.env.NTFY_TOKEN}`;
  }

  const body = JSON.stringify({
    topic,
    title,
    message,
    priority: Number(priority),
    tags: [tags],
  });

  const res = await fetch(parsed.toString(), { method: "POST", headers, body });
  console.log(res.status);
  if (!res.ok) {
    console.error(await res.text());
    process.exit(1);
  }
}

async function sendBark() {
  const body = JSON.stringify({
    title,
    body: message,
    group: "claude-code",
    level: priority === "5" ? "timeSensitive" : "active",
    icon: "https://claude.ai/favicon.ico",
  });

  const res = await fetch(process.env.BARK_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body,
  });
  console.log(res.status);
  if (!res.ok) {
    console.error(await res.text());
    process.exit(1);
  }
}

if (provider === "ntfy") {
  await sendNtfy();
} else {
  await sendBark();
}
