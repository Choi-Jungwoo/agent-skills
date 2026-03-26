# Agent Skills

A collection of custom skills for AI coding agents like Claude Code and Cursor.

## Usage

Once installed, skills are automatically available to your agent. You can interact with them through natural language prompts:

```
"How do I use the ntfy skill?"
```

If you're unsure what a skill does or how to trigger it, just ask your agent — it can read the skill's definition and explain it to you.

## Installation

Install skills from this repository using the [`skills`](https://www.npmjs.com/package/skills) CLI:

```bash
# Install all skills from this repo
npx skills add Choi-Jungwoo/agent-skills

# Install globally (user-level, available across all projects)
npx skills add Choi-Jungwoo/agent-skills -g

# Install a specific skill only
npx skills add Choi-Jungwoo/agent-skills --skill ntfy

# Install to specific agents
npx skills add Choi-Jungwoo/agent-skills --agent claude-code cursor
```

## Managing Skills

```bash
# List installed skills
npx skills list

# Remove a skill
npx skills remove <skill-name>

# Check for updates
npx skills check

# Update all skills
npx skills update
```

## License

MIT
