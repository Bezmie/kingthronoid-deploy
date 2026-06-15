# Agent Skills Specification (Anthropic)

Source: https://agentskills.io/specification + https://github.com/anthropics/skills

## Specification

A skill is a directory containing, at minimum, a SKILL.md file:

skill-name/
├── SKILL.md          # Required: metadata + instructions
├── scripts/          # Optional: executable code
├── references/       # Optional: documentation
├── assets/           # Optional: templates, resources
└── ...               # Any additional files or directories

### SKILL.md format

YAML frontmatter + Markdown content.

Frontmatter fields:
- name (required): Max 64 chars, lowercase + hyphens, matches directory name
- description (required): Max 1024 chars, describes what + when
- license (optional)
- compatibility (optional): Max 500 chars, environment requirements
- metadata (optional): key-value mapping
- allowed-tools (optional, experimental): pre-approved tools

Body: unrestricted markdown. Recommended: step-by-step instructions, examples, edge cases.

### Progressive Disclosure

3-level loading:
1. Metadata (~100 tokens): name + description always in context
2. Instructions (<5000 tokens recommended): SKILL.md body loaded on activation
3. Resources (as needed): scripts/, references/, assets/ loaded on demand

Keep SKILL.md under 500 lines. Move detailed reference to separate files.
File references: relative paths from skill root, one level deep.

### Description = Primary Trigger

The description field determines when an agent activates a skill.
"Pushy" descriptions recommended — include both what the skill does AND specific contexts for when to use it.
Agents consult skills for tasks they can't easily handle alone. Simple one-step queries may not trigger even if description matches.

### Validation

skills-ref validate ./my-skill — checks frontmatter + naming conventions.

## Skill-creator Workflow (from skills/skill-creator/SKILL.md)

1. Capture intent (what, when, output format, test cases?)
2. Interview + research (edge cases, MCPs, dependencies)
3. Write SKILL.md (name, pushy description, instructions)
4. Create 2-3 test prompts
5. Run with-skill AND baseline in parallel
6. Grade assertions (quantitative + qualitative)
7. Improve based on feedback
8. Repeat until satisfied
9. Optimize description for triggering (eval queries, A/B test)

Key principles:
- Explain WHY, not just WHAT — LLMs understand reasoning better than rigid MUSTs
- Keep prompt lean — remove what doesn't pull weight
- Generalize from feedback — avoid overfitting to test cases
- Look for repeated work across test cases — extract into bundled scripts

## MCP Builder Patterns (from skills/mcp-builder/SKILL.md)

4-phase workflow:
1. Deep Research + Planning (API coverage vs workflow tools, naming, context management, error messages)
2. Implementation (project structure, core infra, tools with input/output schemas)
3. Review + Test (DRY, error handling, type coverage, MCP Inspector)
4. Create Evaluations (10 complex questions, independent, read-only, verifiable, stable)

## Key Skills in Repository

- algorithmic-art, brand-guidelines, canvas-design, claude-api
- doc-coauthoring, docx, pdf, pptx, xlsx
- frontend-design, internal-comms, mcp-builder
- skill-creator, slack-gif-creator, theme-factory
- web-artifacts-builder, webapp-testing

## Progressive Disclosure Pattern (from README)

Skills teach Claude how to complete specific tasks in a repeatable way.
Loaded dynamically to improve performance on specialized tasks.
Each skill is self-contained in its own folder.

## Black-box Scripts Pattern

"Always run scripts with --help first to see usage. DO NOT read the source until you try running the script first and find that a customized solution is absolutely necessary."
Scripts exist to be called directly as black boxes rather than ingested into context window.

## Reconnaissance-Then-Action Pattern (from webapp-testing)

1. Navigate and wait for networkidle
2. Take screenshot or inspect DOM
3. Identify selectors from rendered state
4. Execute actions with discovered selectors
