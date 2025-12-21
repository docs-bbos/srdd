Below is a **clean, fully-written Part 2**, derived *entirely* from the content you provided, but structured as a coherent standalone continuation.
Tone, vocabulary, and argumentation are aligned with Part 1, while Part 2 does the heavy lifting: taxonomy, mechanics, workflow, and scaling.

I’ve avoided introducing new concepts, claims, or tools that weren’t already present — this is synthesis and refinement, not invention.

---

# Spec-Roundtrip Driven Development (Part 2): From Vibe Coding to Regeneration Cycles

By mid-2025, it became clear that “AI coding” was no longer a single thing.

What started as playful experimentation had hardened into distinct methodologies, each optimising for different trade-offs: speed versus coherence, autonomy versus understanding, structure versus adaptability. The industry conversation, however, kept collapsing these into a false binary — vibe coding versus spec-driven development.

That framing misses what’s actually happening.

## The Emerging Landscape of AI-Assisted Coding

What we’re seeing instead is a spectrum of approaches, each with its own strengths and failure modes.

### 1. Vibe Coding

The casual extreme. You prompt the AI conversationally:

> “Add this feature.”
> “Fix that bug.”
> “Refactor this file.”

It feels magical when it works — and for small projects, it often does.

The problem is scale. Context windows are finite. As systems grow, the AI forgets earlier decisions, repeats mistakes, and implements the same concern three different ways in three different files. Worse, it gives developers a false sense of confidence: things appear to work, until they don’t.

Vibe coding is best suited to:

* small utilities
* CLIs and scripts
* projects that fit comfortably within a single context window

It breaks down the moment architectural memory matters.

### 2. Agentic Coding

Agentic coding introduces structure. You define a goal, the AI plans a sequence of steps, executes them, and asks for validation.

Tools like Claude Code and Cursor operate in this mode when given multi-step tasks. Studies show it can be effective — fewer engineers delivering faster.

But it remains fundamentally **code-first**. The agent explores what exists and extends it. There is no durable external representation of *intent* — only the current state of the codebase.

Agentic coding accelerates delivery, but it does not protect understanding.

### 3. Context Engineering

Context engineering reframes the problem: success isn’t about better prompts or better specs, but about feeding the AI the *right information at the right time*.

This includes:

* anchoring agents to reference architectures
* using MCP to provide tools and data
* aggressively curating high-signal context

Practitioners discovered something counterintuitive: abstraction often helps. Remove legacy specifics, and the solution space widens.

The downside is overhead. Context must be constantly curated, refreshed, and pruned. For solo developers or small teams, this discipline quickly becomes brittle.

Context engineering is powerful — but one-directional. Knowledge flows *into* the AI, not back out.

### 4. Spec-Driven Development (SDD)

SDD formalises everything. Write detailed specifications in markdown. Let the AI generate code. Iterate on the specs rather than the implementation.

GitHub’s Spec Kit made this approach practical, and the appeal is obvious:

* consistency
* regenerable code
* documentation as a source of truth

The problem is philosophical — and historical.

SDD is **Big Design Up Front** in modern clothing. It assumes that complex systems can be fully described before they exist. This is precisely the assumption that Waterfall made — and that Agile emerged to correct.

In practice, teams loop endlessly on specs before writing code. When reality intrudes — as it always does — the specs lag behind. Developers update documents to match the system rather than guiding it.

And there’s a deeper issue.

**AI doesn’t dream.**

LLMs interpolate. They reproduce statistically common patterns. If you rely exclusively on spec-to-code generation, your architecture and UI converge toward whatever appears most frequently in training data.

Human judgment — taste, discomfort, intuition — has no formal place to enter the loop.

SDD ships faster. It also ships bland.

## SRDD: The Missing Loop

Spec-Roundtrip Driven Development (SRDD) emerged as a response to all of this.

It keeps:

* the structure and intentionality of specs
* the speed and assistance of AI
* the adaptability of iterative development

But it rejects the idea that specs are contracts.

**Specs are snapshots.**

They compress understanding at a moment in time. Code evolves. Decisions accumulate. Knowledge becomes tacit. SRDD formalises the moment when you stop pretending the spec still reflects reality — and regenerate it.

That roundtrip is the core innovation.

## The SRDD Workflow

SRDD operates as a closed loop with explicit phases.

### Phase 1: Design

Everything starts with structured discovery.

I use a questionnaire-driven approach that captures:

* the problem and who has it
* actors and goals
* functional and non-functional requirements
* user journeys and edge cases
* data lifecycles
* constraints and success criteria

These are synthesised — with AI assistance — into a set of planning documents:

```
docs/plans/2025-01-15_v1_initial-design/
  00-PLANNING.md
  01-REQUIREMENTS.md
  02-USECASES.md
  03-QA-SESSION.md
  04-ARCHITECTURE.md
  05-IMPLEMENTATION.md
  06-TESTPLAN.md
```

The AI asks questions. Misunderstandings are corrected. Understanding deepens.

At the end of this phase, only a small number of high-level issues are created. The backlog stays lean.

### Phase 2: Implementation

Each issue follows a strict TDD cycle:

```
failing test ↔ implement → pass
```

Tests are layered:

* unit
* integration
* functional

Local UAT happens continuously.

A critical role emerges here: **the AI as scope guardian**.

When the developer inevitably thinks, “While I’m here, I should also add…”, the AI pushes back:

> “That’s outside the scope of this issue. Want me to create a new one?”

The human dreams. The AI disciplines.

### Phase 3: Review

Once tests pass, the AI prepares a PR linked to the issue. The developer reviews, requests changes, and merges.

Decisions are captured implicitly in PRs and commits — material that will matter later.

### Phase 4: Production

Deploy. Perform UAT on real data. Any issues discovered become new issues and re-enter the loop.

### Phase 5: Iterate or Regenerate

Most of the time, you iterate.

But SRDD explicitly recognises when iteration becomes counterproductive.

The AI watches for signs of architectural decay:

* duplicated logic
* fixes causing unrelated failures
* god classes emerging
* simple changes requiring edits across many files
* velocity slowing
* hedging language: “I’m not sure if this will break something”

When detected, the AI advises triggering regeneration.

## The Regeneration Cycle

This is the “roundtrip”.

The AI synthesises new specs from:

* the current codebase
* all prior planning documents
* git history (PRs and commits)
* issues (open and closed)
* the test suite

The result is a new, dated planning directory:

```
docs/plans/2025-06-10_v3_regeneration-post-spaghetti/
  00-PLANNING.md
  ...
```

You then restart Phase 1 — with clearer understanding, cleaner architecture, and preserved history.

Code informed the spec. The spec will now guide the next generation of code.

Understanding compounds instead of decaying.

## Scaling SRDD (SSRDD)

For multi-project or multi-domain systems, SRDD scales into **Scaled SRDD (SSRDD)**.

Each domain runs its own SRDD cycle:

* independent planning docs
* independent backlogs
* independent regeneration triggers

At the system level, you maintain:

* a shared constitution (standards, conventions)
* explicit dependency declarations
* optional API guardians to coordinate contract evolution

This resembles SAFe structurally — but with AI-assisted regeneration as the organising principle.

## Why SRDD Works

* It acknowledges discovery instead of denying it
* It prevents specs from becoming fiction
* It manages AI-generated technical debt at the design level
* It preserves tacit product wisdom
* It creates space for human judgment — the “feel” AI cannot replicate

SRDD is not the fastest way to write code.

It *is* the fastest way to keep understanding intact over time.

## Closing

The debate has been framed as chaos versus rigidity.

That’s the wrong frame.

Vibe coding fails because AI forgets.
Spec-driven development fails because reality intrudes.

SRDD accepts both — and closes the loop between them.

Specs deserve a return ticket.

Give them one.
