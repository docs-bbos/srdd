# VIBE: Minimal process for quick utilities, scripts, and small tools

Use for projects where the entire codebase fits in context and formal process adds overhead without value.

---

## When to Use

- Single-file scripts
- CLI utilities in `~/bin/`
- Quick prototypes
- Config generators
- One-off automation
- Projects < 5 files with clear scope

---

## Rules

### Do
- Just build it — minimal planning overhead
- Iterate fast, fix as you go
- Keep it simple, don't over-engineer
- Add comments for non-obvious code
- Include usage instructions (--help or header comment)

### Don't
- Skip basic testing for anything non-trivial
- Create technical debt for "temporary" scripts that will live forever
- Ignore error handling ("it works on my machine")

---

## Minimal Structure

```
my-tool/
  my-tool.sh (or .py, .ts, etc.)  ← The thing
  README.md                        ← Optional: if others will use it
```

Or just a single file in `~/bin/`.

---

## Upgrade Path

If the project grows beyond vibe coding:
- Multiple files with unclear boundaries → Consider SRDD
- Others need to contribute → Consider SRDD
- You keep breaking things → Definitely SRDD

Say: "Let's upgrade this to SRDD" and Claude will switch methodologies.

---

## What's Disabled

When using Vibe methodology, the following SRDD elements are **not required**:
- Formal planning documents (00-PLANNING.md, etc.)
- Issue creation for all work
- PR workflow for single-developer scripts
- Test coverage requirements
- Spec regeneration cycles

Standard code quality rules from global CLAUDE.md still apply:
- ABOUTME headers
- Clean code principles
- No hardcoded secrets
