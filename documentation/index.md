---
title: SRDD Is the Best AI Coding Methodology - entry
---
<!-- this is a copy of readme.md -->
# SRDD — Spec-Roundtrip Driven Development

**Keeping developers in control while building better systems with aligned AI**

> Jump to quick specification overview in  [Pitches]({{devto:pitches}}).

SRDD is an AI-assisted development methodology where specifications and code exist in a closed loop. Specs guide implementation, but code becomes the source of truth. Periodically, understanding is extracted back out through regeneration — synthesising fresh specs from the living system. The developer dreams; the AI disciplines. Understanding compounds instead of decaying.

For multi-domain systems, **Scaled SRDD (SSRDD)** wraps multiple SRDD instances with a coordination layer, governing boundaries between independently evolving subsystems.

## Table of Contents

- [SRDD Overview]({{devto:index}}) *(this page)*
- [Pitches]({{devto:pitches}}) — One-liner to executive brief
- [Part 1: Why SRDD Exists]({{devto:SRDD-part1-of-4}}) — The problem, the journey, the insight
- [Part 2: The AI Coding Landscape]({{devto:SRDD-part2-of-4}}) — Vibe coding, agentic coding, context engineering, SDD
- [Part 3: The SRDD Workflow]({{devto:SRDD-part3-of-4}}) — Phases, contracts, regeneration
- [Part 4: Scaling Up]({{devto:SRDD-part4-of-4}}) — SSRDD, principles, implementation
- [Contributing]({{devto:CONTRIBUTING}})
- [About]({{devto:about}}) — Documentation infrastructure

## The Problem

AI-assisted coding is transformative for small projects. But as systems grow, the same failure modes appear everywhere:

- Context windows become constraints, not conveniences
- The AI forgets earlier decisions and repeats mistakes
- Architectural drift accumulates silently
- Velocity slows as complexity rises
- Teams stop understanding the systems they're shipping

Every approach optimises for something real — speed, autonomy, discipline, traceability — but none of them close the loop between specification and reality.

**SRDD closes the loop.**

## The Core Insight

**Specs are snapshots, not contracts.**

They capture understanding at a moment in time. Code evolves. Periodically, you must extract new understanding *from* the code and regenerate the specs.

Specs guide code. Code informs regenerated specs. It's a closed loop.

## The Six Phases

```
┌─────────────────────────────────────────────────────────────────┐
│                        SRDD Workflow                            │
└─────────────────────────────────────────────────────────────────┘

Phase 1: Design          → Establish intent, create planning docs
Phase 2: Implementation  → TDD, contracts, scope-guarded development  
Phase 3: Review          → PR review, coherence validation
Phase 4: UAT             → Observe and accumulate evidence
Phase 5: Triage          → Analyze findings, choose path
Phase 6: Production      → Version, release, continue observing

                    ┌─────────────────────────┐
                    │      Phase 4: UAT       │
                    │   (Observe & Accumulate)│
                    └───────────┬─────────────┘
                                │
                                ▼
                    ┌─────────────────────────┐
                    │  Phase 5: Triage and    │
                    │        Decide           │
                    └───────────┬─────────────┘
                                │
            ┌───────────────────┼───────────────────┐
            │                   │                   │
            ▼                   ▼                   ▼
    ┌───────────────┐   ┌───────────────┐   ┌───────────────┐
    │   Phase 1:    │   │   Phase 2:    │   │   Phase 6:    │
    │  Regenerate   │   │   Iterate     │   │  Production   │
    │(architectural)│   │ (bugs/minor)  │   │               │
    └───────────────┘   └───────────────┘   └───────────────┘
```

## Planning Documents

Each SRDD cycle produces a dated planning directory:

```
docs/plans/2025-12-15_v1_initial-design/
  00-PLANNING.md       ← Initial brain dump from requirements questionnaire
  01-REQUIREMENTS.md   ← Refined functional and non-functional requirements
  02-USECASES.md       ← User stories with acceptance criteria
  03-QA-SESSION.md     ← Q&A transcript clarifying ambiguities
  04-ARCHITECTURE.md   ← Technical design, components, data model
  05-IMPLEMENTATION.md ← Phased plan: what gets built in what order
  06-TESTPLAN.md       ← Test strategy and test data requirements
  07-NextCycle.md      ← Accumulated signals, candidate contracts, version history
```

## What SRDD Enforces

| Principle | Description |
|-----------|-------------|
| **The roundtrip is the methodology** | Specifications flow into implementation. Understanding flows back out through regeneration. |
| **Specs are snapshots, not contracts** | Specifications capture understanding at a point in time. Code becomes the source of truth. |
| **The codebase is a curriculum** | The AI learns from your existing code. Contradictions breed confusion; consistency compounds velocity. |
| **Guardrails encode judgment structurally** | Types, linters, schemas, and folder boundaries prevent bad patterns before review. |
| **Coherence matters more than correctness** | The AI determines whether code works. The reviewer determines whether it fits. |
| **The developer dreams; the AI disciplines** | Humans choose direction. The AI executes, guards scope, and maintains consistency. |
| **Velocity follows clarity** | Fast development is not the cause of good systems. It is the consequence of clear ones. |

## Scaled SRDD (SSRDD)

For systems that extend beyond a single bounded context:

- Each domain owns its own planning artefacts and SRDD cycles
- Domains evolve at their own pace and regenerate when local signals demand it
- **CONSTITUTION.md** defines system-wide integration standards
- Explicit dependency declarations prevent accidental coupling
- Boundary drift detection flags architectural erosion early

SSRDD scales **understanding**, not bureaucracy.

## Current Status

| Component | Status | Notes |
|-----------|--------|-------|
| Methodology documentation | ✅ Available | This repo |
| Planning doc templates | ✅ Available | `templates/` directory |
| Rules file examples | ✅ Available | CLAUDE.md templates |
| Scope enforcement tooling | 🔲 Planned | Pre-commit hooks, MCP integration |
| Coherence validation | 🔲 Planned | Pattern comparison against ARCHITECTURE.md |
| Regeneration advisor | 🔲 Planned | Cross-session signal tracking |
| SSRDD coordination layer | 🔲 Planned | Multi-subsystem orchestration |

### Adoption Today

Teams can adopt SRDD now by:

1. Using the planning doc templates (00-07)
2. Adding SRDD rules to AI configuration (CLAUDE.md, .cursorrules, etc.)
3. Following the phase workflow manually
4. Relying on human review for coherence and scope discipline

This delivers 60-70% of the value. The remaining 30-40% — reliable enforcement without human vigilance — awaits tooling.

## Roadmap

**Alignment with Agile and SAFe**
Map SRDD phases to Agile ceremonies and SAFe constructs — regeneration in PI planning, Phase 5 triage in backlog refinement, SSRDD across Agile Release Trains.

**Rules file templates**
Complete CLAUDE.md, .cursorrules, and copilot-instructions.md templates encoding the full SRDD workflow.

**MCP server integration**
Real-time SRDD enforcement within Claude Code, Cursor, and similar tools.

**Kubernetes and container orchestration**
SSRDD boundaries aligned with Kubernetes namespaces, CONSTITUTION.md as service mesh policies, coordinated regeneration in deployment pipelines.

## The Article Series

This methodology is documented in a four-part series:

- **[Part 1: Why SRDD Exists]({{devto:SRDD-part1-of-4}})** — The problem, the journey, the insight
- **[Part 2: The AI Coding Landscape]({{devto:SRDD-part2-of-4}})** — Vibe coding, agentic coding, context engineering, SDD
- **[Part 3: The SRDD Workflow]({{devto:SRDD-part3-of-4}})** — Phases, contracts, regeneration
- **[Part 4: Scaling Up]({{devto:SRDD-part4-of-4}})** — SSRDD, principles, implementation

## Contributing

SRDD and SSRDD are open methodologies. Contributions welcome:

- Tooling development
- Template improvements
- Integration guides for specific frameworks
- Case studies and adoption experiences

See [Contributions]({{devto:CONTRIBUTING}})

## License & Prior Art

© 2026 Brooke Smith. All rights reserved.

This repository constitutes a public disclosure and defensive publication of the Spec-Roundtrip Driven Development (SRDD) and Scaled SRDD (SSRDD) methodologies.

The author expressly places the concepts, processes, and workflows described herein into the public domain as prior art, for the purpose of preventing subsequent patent claims or exclusive ownership by third parties.

Commercial use, redistribution, or derivative works of this text require explicit permission from the author.