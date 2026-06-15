---
name: "webapp-testing"
description: "Toolkit for interacting with and testing local web applications using Playwright. Supports verifying frontend functionality, debugging UI behavior, capturing browser screenshots, and viewing browser logs."
source: https://github.com/anthropics/skills/tree/main/skills/webapp-testing
fetched: 2026-05-23
---

# Web Application Testing

## Overview

Toolkit for interacting with and testing local web applications using Playwright. Supports verifying frontend functionality, debugging UI behavior, capturing browser screenshots, and viewing browser logs.

## Decision Tree: Choosing Your Approach

```
User task -> Is it static HTML?
    | Yes -> Read HTML file directly to identify selectors
    |         | Success -> Write Playwright script using selectors
    |         | Fails/Incomplete -> Treat as dynamic (below)
    |
    + No (dynamic webapp) -> Is the server already running?
        | No -> Run: python scripts/with_server.py --help
        |        Then use the helper + write simplified Playwright script
        |
        + Yes -> Reconnaissance-then-action:
            1. Navigate and wait for networkidle
            2. Take screenshot or inspect DOM
            3. Identify selectors from rendered state
            4. Execute actions with discovered selectors
```

## Reconnaissance-Then-Action Pattern

1. Inspect rendered DOM: screenshot, page.content(), page.locator()
2. Identify selectors from inspection results
3. Execute actions using discovered selectors

## Common Pitfall

Don't inspect the DOM before waiting for networkidle on dynamic apps. Do wait for page.wait_for_load_state('networkidle') before inspection.

## Best Practices

- Use bundled scripts as black boxes. Consider whether scripts can help. Use --help to see usage, then invoke directly. DO NOT read source until absolutely necessary
- Use sync_playwright() for synchronous scripts
- Always close the browser when done
- Use descriptive selectors: text=, role=, CSS selectors, or IDs
- Add appropriate waits: page.wait_for_selector() or page.wait_for_timeout()

## with_server.py

Manages server lifecycle (supports multiple servers):

Single server:
python scripts/with_server.py --server "npm run dev" --port 5173 -- python your_automation.py

Multiple servers (backend + frontend):
python scripts/with_server.py \
  --server "cd backend && python server.py" --port 3000 \
  --server "cd frontend && npm run dev" --port 5173 \
  -- python your_automation.py
