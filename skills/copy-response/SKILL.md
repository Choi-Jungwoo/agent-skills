---
name: copy-response
description: "Copies the AI's text-only response (excluding code blocks) to the clipboard. MUST use whenever the AI returns a result to the user or asks the user a question — no exceptions."
---

# Copy Response to Clipboard

This skill copies your text response to the user's clipboard whenever you return a result or need user input.

## When to copy

Whenever you are about to wait for user input, including:

- Returning a result (task complete, answer given)
- Asking a clarifying question
- Presenting a plan for approval
- Reporting an error or status that needs user action

**Skip** when your turn has no text output (pure tool-call turns with no prose).

## How to copy

After composing your text response, run this Bash command:

```
cat <<'__COPY__' | node ".claude/skills/copy-response/scripts/copy-text.js"
<your full response text here>
__COPY__
```

Paste your entire response inside the heredoc — the script automatically strips fenced code blocks and copies only the prose. You do not need to manually remove code blocks.

## Output format

The copied content preserves **Markdown formatting**:

- Headers (`#`, `##`, etc.)
- Bold, italic, inline code
- Bullet and numbered lists
- Tables
- Links and references

Only fenced code blocks (` ``` ... ``` `) are stripped. Everything else is kept as-is in Markdown.

## Important

- **Execute exactly ONCE per turn.** Gather your entire response text first, then make a single Bash call at the very end. Never call the script multiple times in one turn.
- The copy is the **last thing** you do before the user sees the input prompt.
- Keep the Bash call silent — no description or commentary about the copy step in your response to the user. It should be invisible.
- If the copy fails, just note it briefly — do not retry.
- If the heredoc would be empty (no text in your response), skip it entirely.
