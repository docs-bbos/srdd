---
title: "SRDD: Spec-Roundtrip Driven Development"
description: "A methodology that keeps developers in control while building better systems with aligned AI"
---

# SRDD: Spec-Roundtrip Driven Development

**Keeping developers in control while building better systems with aligned AI**

---

AI-assisted coding is transformative for small projects. But as systems grow, every approach hits the same wall: the AI forgets earlier decisions, architectural drift accumulates silently, and teams stop understanding what they're shipping.

Vibe coding forgets. Agentic coding echoes. Context engineering curates inputs but not outputs. Spec-driven development fossilizes.

**SRDD closes the loop.**

Specifications guide implementation — but code becomes the source of truth. Periodically, understanding is extracted back out through regeneration: fresh specs synthesized from the living system, informed by everything learned along the way.

The developer dreams; the AI disciplines. Developers stay hands-on — reviewing, steering, choosing when to regenerate — not deskilled into passengers watching the AI drive off a cliff. Understanding compounds instead of decaying. Systems stay maintainable. Velocity doesn't collapse at scale.

And when it's time to rebuild, you're not reverse-engineering legacy code. The regenerated specs already capture what the system became and what it will become — in English, not yesterday's code or framework.

---

## Read the Full Documentation

The complete SRDD methodology is documented in a four-part series:

👉 **[SRDD Is the Best AI Coding Methodology](https://dev.to/bbos/srdd-is-the-best-ai-coding-methodology-entry-1o54-temp-slug-133762)**

This includes:
- **Part 1:** Why SRDD Exists — The problem, the journey, the insight
- **Part 2:** The AI Coding Landscape — Vibe coding, agentic coding, context engineering, SDD
- **Part 3:** The SRDD Workflow — Phases, contracts, regeneration
- **Part 4:** Scaling Up — SSRDD, principles, implementation

---

## Why Dev.to Instead of Medium?

You might wonder why I'm linking to Dev.to rather than publishing the full series here on Medium. Here's the reasoning:

### Single Source of Truth

The canonical documentation lives on [GitHub Pages](https://docs-bbos.github.io/srdd/). Every article points back there via `canonical_url`, ensuring search engines index one authoritative source regardless of where the content appears.

### Automated Publishing Pipeline

The documentation source files live in a GitHub repository. A GitHub Actions pipeline:

1. **Deploys to GitHub Pages** — the canonical location
2. **Syncs to Dev.to** — automatically, via API

This means documentation updates flow from a single source. Edit once, publish everywhere.

Medium doesn't offer API-based publishing in the same way, which would require manual copy-paste for every update. For living documentation that evolves with the methodology, that's not sustainable.

### Developer Audience

Dev.to is purpose-built for technical content and developer audiences. The formatting, code blocks, and series features work well for methodology documentation. Medium is excellent for broader reach — which is why I'm posting this introduction here — but the detailed technical content fits Dev.to's format better.

---

## Get Involved

SRDD is an open methodology. The [GitHub repository](https://github.com/docs-bbos/srdd) welcomes contributions:

- Tooling development
- Template improvements
- Integration guides
- Case studies and adoption experiences

---

*© 2026 Brooke Smith. SRDD and SSRDD are placed into the public domain as prior art to prevent patent claims. Commercial use requires permission.*
