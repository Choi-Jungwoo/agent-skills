#!/usr/bin/env node
// Reads text from stdin, strips fenced code blocks, copies text-only to clipboard.
// Cross-platform: Windows (clip.exe), macOS (pbcopy), Linux (xclip/xsel).

const { execSync } = require("child_process");

function getClipboardCmd() {
  switch (process.platform) {
    case "win32":
      return "clip.exe";
    case "darwin":
      return "pbcopy";
    default:
      try {
        execSync("which xclip", { stdio: "ignore" });
        return "xclip -selection clipboard";
      } catch {
        return "xsel --clipboard --input";
      }
  }
}

let input = "";
process.stdin.setEncoding("utf8");
process.stdin.on("data", (chunk) => (input += chunk));
process.stdin.on("end", () => {
  try {
    // Strip fenced code blocks (``` ... ```)
    let text = input.replace(/```[\s\S]*?```/g, "").trim();
    // Collapse excessive blank lines left by removed blocks
    text = text.replace(/\n{3,}/g, "\n\n");
    if (!text) return;

    execSync(getClipboardCmd(), { input: text, timeout: 5000 });
  } catch {
    // Silent — never block the session
  }
});
