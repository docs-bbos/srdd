---
title: SRDD pitches
---
# SRDD Is the Best AI Coding Methodology - pitches

## Summary of pitches

| Document | Length | Audience |
|----------|--------|----------|
| One-liner | 1-2 sentences | Everyone (hook) |
| Elevator pitch | ~150 words / 60 sec | Networking, intros |
| One-minute read | ~250 words | Time-poor anyone |
| Executive brief | ~600 words | Managers, CTOs, VPs |
| Technical brief | ~800 words | Tech leads, architects |

## One-Liner

SRDD future-proofs your system by storing understanding in specs, not code — so when it's time to rebuild, you're not locked into yesterday's language, framework, or architecture.

## Elevator Pitch

AI-assisted coding is transformative for small projects. But as systems grow, every approach hits the same wall: the AI forgets earlier decisions, architectural drift accumulates silently, and teams stop understanding what they're shipping.

Vibe coding forgets. Agentic coding echoes. Context engineering curates inputs but not outputs. Spec-driven development fossilizes.
SRDD closes the loop.

Specifications guide implementation — but code becomes the source of truth. Periodically, understanding is extracted back out through regeneration: fresh specs synthesized from the living system, informed by everything learned along the way.

The developer dreams; the AI disciplines. Developers stay hands-on — reviewing, steering, choosing when to regenerate — not deskilled into passengers watching the AI drive off a cliff. Understanding compounds instead of decaying. Systems stay maintainable. Velocity doesn't collapse at scale.

And when it's time to rebuild, you're not reverse-engineering legacy code. The regenerated specs already capture what the system became and what it will become — in English, not yesterday's code or framework.

## One-Minute Read

**The problem:** AI-assisted coding accelerates everything — including architectural decay. Vibe coding forgets earlier decisions as context windows overflow. Agentic coding echoes mistakes across autonomous loops. Context engineering curates inputs meticulously but has no mechanism to extract understanding back out. Spec-driven development fossilizes — specs written upfront drift into fiction as reality evolves. Each approach optimises for something real, but none of them close the loop. Teams ship systems they no longer fully understand.

**The insight:** Vibe and agentic coding externalize nothing. Context engineering curates inputs but never extracts outputs. SDD writes specs upfront and watches them fossilize. SRDD inverts this: specs are snapshots, not contracts. Code evolves. Periodically, understanding is extracted back out — not as rescue, but as a planned phase.

**The method:** SRDD is a six-phase workflow where specs guide implementation, but code becomes the source of truth. When accumulated drift signals misalignment, regeneration synthesizes fresh specs from the living system — capturing everything learned, surfacing technical debt, and reasserting direction. Then the loop begins again: clearer, cleaner, and ready for the next revolution.

**The result:** Understanding compounds instead of decaying. Velocity stays high because confidence stays high. Developers remain in control — shaping direction, reviewing PRs, deciding when to regenerate — while AI handles execution.

**For larger systems:** Scaled SRDD (SSRDD) coordinates multiple independent SRDD loops across domains, enforcing boundaries without bureaucracy.

**Bottom line:** SRDD makes "burn it down and rebuild properly — keeping everything we learned" a repeatable workflow, not a fantasy.

## SRDD: Executive Brief

### What is SRDD?

Spec-Roundtrip Driven Development (SRDD) is an AI-assisted development methodology designed for systems that must remain maintainable over time.

Unlike approaches that treat specifications as fixed contracts or ignore them entirely, SRDD treats specs as snapshots — initially created to establish intent, then periodically regenerated from the living codebase to capture what the system has become and what it will be.

### The Problem It Solves

AI-assisted coding delivers significant productivity gains on small projects. But as systems grow, predictable failure modes emerge:

- **Architectural drift** — The AI makes locally optimal changes without awareness of system-wide intent
- **Lost understanding** — Teams ship systems they no longer fully comprehend
- **Velocity collapse** — Simple changes become risky; confidence erodes
- **Technical debt accumulation** — Shortcuts compound invisibly until refactoring becomes prohibitive

These failures are not unique to any single tool. They emerge from a structural gap: understanding flows into AI-generated code, but nothing flows back out.

### How SRDD Addresses This

SRDD introduces a closed loop:

1. **Specs guide implementation** — Structured planning documents establish intent before code
2. **Code becomes source of truth** — Reality evolves; specs are understood to be point-in-time snapshots
3. **Regeneration extracts understanding** — Periodically, fresh specs are synthesized from the living system, informed by code, PRs, issues, tests, and production discoveries — and incorporating new functional and non-functional requirements for what it will become next.

   This is not a rescue operation. It is a planned phase in the system's lifecycle.

### Business Value

| Outcome | Mechanism |
|---------|-----------|
| **Sustained velocity** | Confidence enables speed; regeneration prevents the slow hardening that makes change risky |
| **Reduced rework** | Architectural misalignment is surfaced early, before it becomes expensive to fix |
| **Lower onboarding cost** | Understanding is externalized into regenerated specs, not trapped in tribal knowledge |
| **Retained optionality** | Systems remain comprehensible and changeable as requirements evolve |
| **Developer retention** | Engineers work on coherent systems with clear direction, not archaeological rescue missions |

### Future-Proofing

Traditional systems trap knowledge in code. When that code becomes brittle, you face an unpleasant choice: expensive rewrite or slow decay. And rewrites typically reuse existing code to reduce cost — importing the same architectural constraints into the new system.

SRDD inverts this.

Understanding is continuously extracted into regenerated specs — language-agnostic, architecture-agnostic documentation of what the system does and why. The code is one implementation of that understanding, not the understanding itself.

When technology shifts — and it will — the cost of targeting a new language, framework, or architecture is not significantly higher than rewriting in the same stack. You're not reverse-engineering legacy code. You're re-implementing documented understanding, informed by everything learned, with AI doing the heavy lifting.

| Traditional rewrite | SRDD rebuild |
|---------------------|--------------|
| Reverse-engineer understanding from brittle code | Understanding already captured in specs |
| Reuse old code to save time → import old constraints | Fresh implementation from documented intent |
| Locked to existing language/architecture | Free to target new stack |
| Knowledge walks out the door with developers | Knowledge externalized and versioned |

SRDD doesn't just maintain systems. It makes them **portable across time**.

### What It Requires

SRDD is a methodology, not a product. Adoption requires:

- **Planning document discipline** — Seven structured documents per development cycle
- **Phase-aware workflow** — Six phases from design through production
- **Human judgment at key moments** — Developers review PRs, decide when to regenerate, and validate direction. The AI guides: surfacing signals, flagging drift, advising when regeneration is due. Humans decide; AI illuminates.

The methodology can be adopted today using documentation and rules files. Tooling for enforcement (CLI, MCP integration) is on the roadmap.

### When to Use SRDD

SRDD suits projects that:

- Outlive a single coding session
- Involve multiple services, files, or contributors
- Require production validation and iterative refinement
- Must remain maintainable over months or years

For multi-domain systems, Scaled SRDD (SSRDD) coordinates independent SRDD loops across bounded contexts.

### Recommendation

For teams experiencing velocity decay, architectural drift, or loss of system understanding in AI-assisted development, SRDD provides a structured path back to clarity — without abandoning the productivity benefits of AI.

Pilot adoption on a single project with a willing team. Evaluate after one full cycle including regeneration.

---

## SRDD: Technical Brief

### Overview

Spec-Roundtrip Driven Development (SRDD) is a six-phase AI-assisted development methodology that maintains architectural coherence through planned regeneration cycles.

**Core principle:** Specs are snapshots, not contracts. Code becomes the source of truth. Understanding is periodically extracted back out.

### The Six Phases

| Phase | Purpose | Key outputs |
|-------|---------|-------------|
| **1. Design** | Establish intent | Planning docs (00-07) |
| **2. Implementation** | TDD, scope-guarded development | Code, tests, PRs |
| **3. Review** | Coherence validation | Approved PRs |
| **4. UAT** | Observe and accumulate evidence | Findings in 07-NextCycle.md |
| **5. Triage** | Analyze findings, choose path | Decision: iterate, regenerate, or release |
| **6. Production** | Version and release | Tagged release, continued observation |

### Planning Documents

Each cycle produces a dated planning directory:
```
docs/plans/2025-01-15_v2_post-regeneration/
  00-PLANNING.md       ← Requirements questionnaire
  01-REQUIREMENTS.md   ← Functional and non-functional requirements
  02-USECASES.md       ← User stories with acceptance criteria
  03-QA-SESSION.md     ← Clarifying Q&A transcript
  04-ARCHITECTURE.md   ← Technical design, components, data model
  05-IMPLEMENTATION.md ← Phased build plan
  06-TESTPLAN.md       ← Test strategy
  07-NextCycle.md      ← Accumulated signals, candidate contracts, version history
```

### AI Responsibilities

During implementation, the AI operates under explicit constraints:

- **Scope guardian** — Cannot modify files outside declared issue scope
- **Pattern follower** — Must conform to patterns in ARCHITECTURE.md
- **Contract respecter** — Cannot change test contracts without explicit approval
- **TDD enforcer** — Red → Green → Refactor on every change

Human review remains mandatory. The AI determines whether code works; the reviewer determines whether it fits.

### Regeneration Triggers

The AI monitors for spaghettification signals:

- Duplicated logic across modules
- Circular dependencies
- Whack-a-mole regressions
- God modules / SRP violations
- Velocity decay on simple changes
- Pattern inconsistency

When signals accumulate, the AI advises regeneration. The decision remains human.

### Regeneration Process

Regeneration synthesizes fresh specs from multiple sources:

- Current codebase
- Prior planning documents
- Git history and PRs
- Issues and tickets
- Test suite
- 07-NextCycle.md

Output: A new dated planning directory describing the system as it now stands — not as it was once imagined.

**Key principle:** Holistic diagnosis, selective intervention. The entire system is re-understood; only drifted subsystems are redesigned.

### SSRDD (Scaled SRDD)

For multi-domain systems:

- Each domain owns its own planning artefacts and SRDD cycle
- **CONSTITUTION.md** defines system-wide integration standards
- Explicit dependency declarations via `contracts/consumes.yaml`
- Boundary drift detection across domains
- Coordinated regeneration when changes cascade

### Trade-offs

| SRDD provides | SRDD requires |
|---------------|---------------|
| Sustained velocity at scale | Planning document discipline |
| Externalized understanding | Human judgment at triage/review |
| Managed technical debt | Acceptance that regeneration has real cost (days, perhaps weeks, not hours) |
| Clear audit trail | More ceremony than vibe coding |

### Technology Portability

SRDD's regeneration cycle produces specs that are implementation-independent:

- Requirements, use cases, and contracts are in natural language
- Architectural decisions are documented with rationale
- Lessons learned and rejected approaches are captured
- Code references illustrate solutions but don't define them

This means:
- Language migrations (JS → TS, Python → Go) become spec re-implementation, not code translation
- Architecture shifts (monolith → microservices) are informed by documented boundaries
- Framework upgrades are unconstrained by legacy code patterns
- New team members can understand intent without archaeology

The marginal cost of rebuilding in a new stack versus the same stack is low — because the specs, not the code, carry the knowledge.
### When to Use

**Good fit:**
- Systems expected to live > 6 months
- Multiple contributors or services
- Production validation required
- Maintainability is a priority

**Not ideal for:**
- Throwaway scripts / single-session utilities
- Strictly regulated environments requiring SDD-style traceability
- Teams unwilling to maintain planning docs

### Adoption Path

1. Use planning doc templates (00-07)
2. Add SRDD rules to AI configuration (CLAUDE.md, .cursorrules)
3. Follow phase workflow manually
4. Rely on human review for coherence and scope

This delivers 60-70% of value. Tooling for reliable enforcement is on the roadmap.

---

* **Documentation:** [docs-bbos.github.io/srdd](https://docs-bbos.github.io/srdd/)
* **Repository:** [github.com/docs-bbos/srdd](https://github.com/docs-bbos/srdd)
* **Article series:** [SRDD Is the Best AI Coding Methodology]({{devto:index}})

## License & Prior Art

© 2026 Brooke Smith. All rights reserved.

This repository constitutes a public disclosure and defensive publication of the Spec-Roundtrip Driven Development (SRDD) and Scaled SRDD (SSRDD) methodologies.

The author expressly places the concepts, processes, and workflows described herein into the public domain as prior art, for the purpose of preventing subsequent patent claims or exclusive ownership by third parties.

Commercial use, redistribution, or derivative works of this text require explicit permission from the author.