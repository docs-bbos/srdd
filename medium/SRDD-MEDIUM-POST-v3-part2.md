# SRDD (Part 2): From Vibe Coding to Regeneration Cycles

See part 1 at 👉 **[https://brooke.medium.com/ssrd-part1](https://brooke.medium.com/ssrd-part1)**

By mid-2025, it became clear that “AI coding” was no longer a single thing.

What started as playful experimentation had hardened into distinct methodologies, each optimising for different trade-offs: speed versus coherence, autonomy versus understanding, structure versus adaptability. The industry conversation, however, kept collapsing these into a false binary — vibe coding versus spec-driven development.

That framing misses what’s actually happening.

## The Emerging Landscape of AI-Assisted Coding

What we’re seeing instead is a spectrum of approaches, each with its own strengths and failure modes.

## 1. Vibe Coding

### What it is

Vibe coding is the casual extreme of AI-assisted development. You prompt the AI conversationally:

> “Add this feature.”
> “Fix that bug.”
> “Refactor this file.”

It feels magical when it works — and for small projects, it often does. But the moment architectural memory matters, it starts to unravel. Context windows are finite. As systems grow, the AI forgets earlier decisions, repeats mistakes, and implements the same concern three different ways across three different files.

Worse, it creates a false sense of confidence: everything appears to work, until it suddenly doesn’t.

Vibe coding shines for:

* small utilities
* scripts and CLIs
* projects that comfortably fit in a single context window

It breaks the moment continuity and system-level understanding are required.

### The process

Vibe coding is intentionally fluid and conversational. There is no formal specification, no curated context, and minimal concern for internal structure.

The loop usually looks like this:

1. Describe the intent, not the implementation (“Make this feel slick”).
2. Accept large AI-generated changes wholesale.
3. React to outcomes rather than internals.
4. Pivot instead of debugging.

You are trading *structural integrity* for *momentum*. The code is treated as an opaque byproduct, not an artefact to be understood.

### The pros

* Extreme velocity
* Low-friction creativity
* Drudgery elimination
* Democratized prototyping

Vibe coding is unbeatable for **0 → 1**.

### The cons

* A very low complexity ceiling
* Invisible technical debt
* Security and correctness risks
* Auditor fatigue
* Non-reproducibility

Vibe coding is exhilarating — until you have to live with what you shipped.

### Bottom line

Vibe coding is the ultimate **0 → 1 tool**. It becomes dangerous the moment a system needs to be maintained, reasoned about, or trusted.

---

## 2. Agentic Coding

### What it is

Agentic coding introduces structure and autonomy. Instead of responding to a single prompt, the AI is given a goal and allowed to plan, act, verify, and correct itself using tools.

The interaction shifts from *chat* to *task*.

In practice, the AI behaves like a junior engineer with shell access: exploring the repository, editing files, running builds, fixing errors, and iterating until its own success criteria are met.

It feels like leverage.

But it remains fundamentally **code-first**. The agent reasons over the current repository state, not over a durable representation of intent. Understanding emerges implicitly, if at all.

### The process

Agentic workflows follow a loop:

1. Goal definition
2. Autonomous discovery
3. Planning
4. Execution
5. Verification
6. Handoff

Persistence is the defining feature.

### Where it shines

Agentic coding excels at operational throughput:

* Mechanical refactors
* Dependency upgrades
* Test fixes
* Repetitive implementation work

Used well, it offloads drudgery. Used casually, it accelerates entropy.

### Failure modes at scale

* Context loss becomes probabilistic
* Architectural drift accelerates
* Professional judgment erodes
* Autonomy creates security and cost risks

### Verdict

Agentic coding is **delegated execution**, not delegated responsibility.

It delivers speed without stability.

---

## 3. Context Engineering

### What it is

Context Engineering focuses on controlling *what* the AI sees, *when*, and *in what form*. The goal is not more context, but better abstraction.

It treats the context window as a scarce resource.

### The process

* Context curation (skeletons, exemplars, rules)
* Context management (summaries, scratchpads)
* Dynamic retrieval (MCP, tools, on-demand access)

### The pros

* Fewer hallucinations
* Lower cost and better performance
* Architectural enforcement
* Determinism for contract-driven systems

### The cons

* High cognitive overhead
* Fragility across model changes
* Context bloat
* Slower feedback loops
* One-directional knowledge flow

### Takeaway

Context Engineering improves inputs, but does not extract updated understanding. Knowledge still rots unless humans intervene.

That gap is where SRDD emerges.

---

## 4. Spec-Driven Development (SDD)

### What it is

SDD formalises development around written specifications. The AI generates code *from* the spec. Iteration happens by editing documents rather than implementations.

In practice, SDD treats the AI as a compiler for natural language.

### Where it shines

* Stable core logic
* Regulated domains
* Regenerable systems
* High audit requirements

### Failure modes

* Reintroduces Big Design Up Front
* Defers rather than solves drift
* Masks architectural problems as compliance
* Excludes human taste and intuition

AI doesn’t dream.
SDD gives it nothing else to work with.

---

## SRDD: The Missing Loop

Spec-Roundtrip Driven Development (SRDD) keeps:

* the structure of specs
* the speed of AI
* the adaptability of iteration

But it rejects the idea that specs are contracts.

**Specs are snapshots.**

They compress understanding at a moment in time. Code evolves. Decisions accumulate. Knowledge becomes tacit. SRDD formalises the moment when you stop pretending the spec still reflects reality — and regenerate it.

That roundtrip is the core innovation.

---

## The SRDD Workflow

### Phase 1: Design

Structured discovery produces a small set of planning documents:

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

The backlog stays intentionally lean.

### Phase 2: Implementation

Each issue follows TDD:

```
failing test ↔ implement → pass
```

Tests are layered:

* unit
* integration
* functional

**Crucial clarification:**

In SRDD, **contracts are the authority** — APIs, UI behaviours, events, and invariants that must remain stable unless explicitly versioned.
**Tests are their executable witnesses**: the proof of what must not change.

Internal structure is free to evolve as long as these contracts hold.

The AI acts as **scope guardian**, preventing opportunistic expansion.

### Phase 3: Review

PRs capture decisions implicitly. This history matters later.

### Phase 4: Production

Deploy. Perform UAT on real data. Issues become new issues — never reopen old ones.

### Phase 5: Iterate or Regenerate

Most work is iterative.

But the AI actively watches for spaghettification:

* duplicated logic
* circular dependencies
* whack-a-mole regressions
* god modules
* slowing velocity
* hedging language

When detected, it advises regeneration.

---

## The Regeneration Cycle

This is the roundtrip.

The AI re-synthesises understanding from:

* current code
* prior planning docs
* git history
* issues
* the test suite

A new plan directory is produced.

**Key refinement:**

Regeneration is **holistic in diagnosis, selective in intervention**.

The system is re-understood end-to-end, but only subsystems showing drift are redesigned. Healthy components are explicitly left alone.

Understanding compounds instead of decaying.

---

## Scaling SRDD (SSRDD)

For multi-domain systems, SRDD scales into **Scaled SRDD (SSRDD)**.

Each domain runs its own SRDD loop.

At the system level, SSRDD coordinates:

* shared constitutions
* explicit contracts
* dependency visibility
* boundary drift

SSRDD scales **understanding**, not bureaucracy.

---

## Why SRDD Works

* It acknowledges discovery
* It prevents specs from becoming fiction
* It manages AI-induced technical debt at the design level
* It preserves tacit product wisdom
* It restores human judgment where it belongs

SRDD is not the fastest way to write code.

It *is* the fastest way to keep understanding intact.

---

## Closing

The debate has been framed as chaos versus rigidity.

That’s the wrong frame.

Vibe coding fails because AI forgets.
Spec-driven development fails because reality intrudes.

SRDD accepts both — and closes the loop between them.

**Specs deserve a return ticket.**

Give them one.
