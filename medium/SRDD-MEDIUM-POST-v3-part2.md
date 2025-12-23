# SRDD (Part 2): From Vibe Coding to Regeneration Cycles

See part 1 at 👉 **[https://brooke.medium.com/ssrd-part1](https://brooke.medium.com/ssrd-part1)**

By mid-2025, it became clear that “AI coding” was no longer a single thing.

What began as playful experimentation had hardened into recognisable methodologies, each optimising for different trade-offs: speed versus coherence, autonomy versus understanding, structure versus adaptability. At the extreme ends of this spectrum sit **Vibe Coding** and **Spec-Driven Development** — one maximising immediacy and flexibility, the other maximising formality and control.

Much of the industry conversation, however, collapses this spectrum into a false binary: vibe coding versus spec-driven development — as though these were the only two positions worth considering.

Most debate stops there.

That framing misses what’s actually happening.

What we’re seeing instead is a broader landscape of AI-assisted coding approaches, each with genuine strengths and predictable failure modes as systems grow. To understand why SRDD exists, we need to examine that landscape in full.

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

* **Extreme velocity.**
Vibe coding collapses idea → code → output into a single step. Syntax, plumbing, and boilerplate vanish. You can build in minutes what once took days.
* **Low friction creativity.**
Because you’re not fighting tooling, you stay in a high-level flow. This makes it ideal for UI exploration, rapid prototyping, and divergent thinking.
* **Drudgery elimination.**
Standard tasks — CRUD, scaffolding, setup — are well represented in training data. AI handles the boring 80%, freeing humans to focus on novelty, design, and intent.
* **Democratisation.**
Designers, founders, and product managers can produce high-fidelity, living prototypes without deep technical knowledge — often improving communication and alignment.

Vibe coding is unbeatable for **0 → 1**.

### The cons

* **The complexity ceiling.**
At a certain size (often shockingly small), the AI loses coherence. Fixes introduce regressions elsewhere. You enter a “whack-a-mole” loop.
* **Invisible technical debt.**
Because the code isn’t read or shaped deliberately, problems accumulate silently until they become unavoidable — and expensive.
* **Security and correctness risks.**
AI optimises for plausibility, not safety. Without explicit constraints, vibe-coded systems frequently contain insecure defaults and subtle logic flaws.
* **Auditor fatigue.**
Reviewing large volumes of AI-generated code is cognitively harder than writing smaller amounts yourself. Developers become exhausted auditors rather than builders.
* **Non-reproducibility.**
With no spec or engineered context, results are non-deterministic. Re-running the same prompts later often yields a different architecture — making team collaboration fragile.

Vibe coding is exhilarating — until you have to live with what you shipped.

### Bottom line

Vibe coding is the ultimate **0 → 1 tool**. It becomes dangerous the moment a system needs to be maintained, reasoned about, or trusted.

Most experienced developers now use it *selectively*: to explore ideas quickly — and then transition to something more disciplined once the idea is worth keeping.

## 2. Agentic Coding

### What it is

Agentic coding introduces structure and autonomy. Instead of responding to a single prompt, the AI is given a goal and allowed to plan, act, verify, and correct itself using tools.

The interaction shifts from *chat* to *task*.

In practice, the AI behaves like a junior engineer with shell access: exploring the repository, editing files, running builds, fixing errors, and iterating until its own success criteria are met.

It feels like leverage.

But it remains fundamentally **code-first**. The agent reasons over the current repository state, not over a durable representation of intent. Understanding emerges implicitly, if at all.

### The process

Agentic workflows follow a loop:

1. **Goal definition**
The human provides a task framed as a definition of done, not a conversational prompt.                                          
2. **Autonomous discovery**
The agent scans the repository, reads files, greps for relevant symbols, and maps dependencies.
3. **Planning**
The agent generates a step-by-step plan and may request approval before proceeding.
4. **Execution**
The agent edits files, runs commands, fixes errors, installs dependencies, and retries.
5. **Verification**
Tests are run; failures trigger replanning and further action.
6. **Handoff**
The agent stops when tests pass, a blocker is reached, or human intervention is required.

Persistence is the defining feature.

### Where it shines

Agentic coding excels at **execution-heavy work with clear local success criteria** — especially when progress can be measured mechanically.

It is particularly effective for:

* **Mechanical refactors at scale**
  Large, repetitive changes (renaming APIs, migrating libraries, flattening abstractions) are where agentic loops shine. The agent can apply consistent transformations across dozens of files faster than any human.

* **Dependency and ecosystem churn**
  Upgrading frameworks, fixing breaking changes, resolving deprecated APIs — all benefit from the agent’s willingness to brute-force its way through build errors until the system compiles again.

* **Test and lint repair**
  When tests already encode desired behaviour, agents are good at iterating until green. This creates the impression of “self-healing” codebases.

* **Throughput amplification**
  One engineer can suddenly “do the work of many” — touching wide surface areas, unblocking pipelines, and clearing backlogs that would otherwise stall teams.

This is where the **echo effect** begins.

Agentic coding amplifies *whatever signal you give it*. If the success signal is “tests pass” or “build succeeds,” the agent will relentlessly optimise toward that outcome — even if the system becomes less coherent, less understandable, or more fragile in the process.

In short: agentic coding is excellent at **local optimisation**.

### Failure modes at scale

At scale, those same echo effects turn pathological.

**Context loss becomes probabilistic and compounding**
Each individual step may succeed, but agentic workflows are chains of steps. A 95% success rate per step quickly collapses as task length grows. The result is brittle success: things work until they suddenly don’t, and no one is quite sure why.

**Architectural drift accelerates through success**
Because the agent optimises for task completion, it reinforces whatever patterns already exist — good or bad. Local fixes echo outward, entrenching accidental architecture. Over time, the codebase becomes a sedimentary record of agent decisions that were never globally evaluated.

**Echo chambers of “green builds”**
Tests passing becomes the dominant success signal. If the tests are incomplete, mis-scoped, or outdated, the agent will happily satisfy them while violating unstated invariants. The system appears healthy while drifting further from its original intent.

**Professional judgment erodes through delegation**
Large agent-generated changesets are harder to review than human-authored ones. Fifteen-file diffs across four modules force reviewers into audit mode rather than design mode. Teams adapt by reviewing less deeply. “Looks fine” becomes normal. Understanding quietly decays.

**Autonomy magnifies blast radius**
Because agents require broad access — terminals, file systems, credentials — their mistakes scale too. Runaway loops, dependency explosions, or subtle security regressions are not edge cases; they are natural consequences of autonomous optimisation without durable intent.

The net effect is a dangerous illusion: **high velocity with hidden decay**.

Agentic coding doesn’t fail loudly. It fails *gradually*, echoing small local decisions into system-wide incoherence — until the cost of recovery exceeds the cost of having gone slower.

### Verdict

Agentic coding is **delegated execution**, not delegated responsibility.

It delivers speed without stability.

---

## 3. Context Engineering

### What it is

Context Engineering focuses on controlling *what* the AI sees, *when*, and *in what form*. The goal is not more context, but better abstraction.

It treats the context window as a scarce resource.

### The process

Context Engineering is less about “adding information” and more about **actively sculpting what the model is allowed to know at any moment**.

**Context curation (skeletons, exemplars, rules)**
Instead of feeding the AI full source trees, developers aggressively abstract:

* *Skeletons* replace implementations with method signatures, interfaces, and type definitions — enough to communicate shape without drowning the model in detail.
* *Exemplars* provide a small number of “gold standard” patterns that demonstrate how the team wants problems solved.
* *Rules* encode architectural constraints, banned libraries, naming conventions, and stylistic expectations.

The intent is to reduce variance by narrowing the solution space. Ironically, *less* code often produces *better* results.

**Context management (summaries, scratchpads)**
Because real tasks exceed a single context window, teams introduce mechanisms to preserve continuity:

* AI-maintained summaries that periodically compress prior conversations and decisions
* Scratchpad files (`memory.md`, `notes.md`) where the model records intermediate reasoning or assumptions
* Explicit handoff points where context is refreshed or reset

This turns long interactions into staged engagements rather than unbounded chats.

**Dynamic retrieval (MCP, tools, on-demand access)**
Rather than front-loading everything, agents pull information *only when needed*:

* Model Context Protocol (MCP) calls to inspect files, logs, schemas, or APIs
* On-demand documentation lookup for version-accurate library behaviour
* Tool-mediated access to repositories, databases, and build systems

The model becomes less of a “reader” and more of an *investigator*, requesting context just in time.

---

### The pros

Used well, Context Engineering delivers genuine improvements over ad-hoc prompting.

**Fewer hallucinations**
By grounding the model in curated constraints, the AI is far less likely to invent APIs, libraries, or patterns that don’t exist. This is especially valuable in legacy systems or regulated environments where correctness matters more than creativity.

**Lower cost and better performance**
Skeletons and selective retrieval dramatically reduce token usage. Smaller, higher-signal contexts not only cost less, they often produce *more accurate* outputs by avoiding “lost in the middle” failures.

**Architectural enforcement**
Context files act as soft guardrails. AI-generated code naturally conforms to senior-level conventions, reducing stylistic drift and PR churn. This is one of the few ways to reliably encode architectural intent without constant human intervention.

**Determinism for contract-driven systems**
In API-first or schema-driven environments, well-engineered context can make AI output surprisingly consistent. Given the same spec and constraints, regeneration becomes predictable — a prerequisite for CI/CD and automated codegen workflows.

---

### The cons

The problems with Context Engineering are not subtle — they emerge directly from its strengths.

**High cognitive overhead**
Designing, maintaining, and evolving the AI’s “mental environment” is work. Developers can spend more time tuning context than building features. For small teams or solo developers, this overhead quickly becomes unsustainable.

**Fragility across model changes**
Context strategies are tightly coupled to model behaviour. A carefully tuned setup for one model version can degrade when the model changes, forcing teams into continuous recalibration.

**Context bloat**
Rules, examples, and summaries accumulate. Over time, the very files meant to improve signal begin consuming the attention budget themselves, recreating the same “lost in the middle” problem they were designed to solve.

**Slower feedback loops**
What could have been a five-second experiment becomes a multi-minute ritual: curate context, verify rules, run the agent, review output. For exploratory work, this feels like procedural friction masquerading as discipline.

**One-directional knowledge flow**
Most critically, Context Engineering only controls what flows *into* the model. There is no native mechanism to extract updated understanding back out. When the system evolves, humans must manually reconcile reality with the curated context — or accept drift.

---

### The takeaway

Context Engineering is powerful, disciplined, and increasingly necessary for large or constrained systems. But it solves the context window problem through **curation and ceremony**, not through feedback.

It improves inputs.
It does not regenerate understanding.

And that unclosed loop is precisely why SRDD exists.


Got it. This is about **narrative authority**, not content.
We describe **modern SDD as the baseline reality**, then *deliberately rewind* to explain why it had to evolve — without sounding like an afterthought.

Here’s a clean rewrite that does exactly that.

---

## 4. Spec-Driven Development (SDD)

### What it is

Modern Spec-Driven Development formalises software development around **continuously synchronised specifications**.

In contemporary SDD, the specification and the codebase exist in a **bidirectional relationship**. The spec is not a static document, nor merely an input to generation. Instead, it is a living artefact that is actively reconciled with the implementation. AI agents generate code from the spec, detect divergence as development proceeds, and update the specification to reflect reality when change occurs.

This spec ↔ code synchronisation is foundational. It allows SDD to maintain traceability while tolerating controlled evolution. Requirements, architectural decisions, and behavioural guarantees are preserved as first-class artefacts, while AI handles the mechanical work of keeping them aligned with the implementation.

In practice, SDD treats the AI less like a pair programmer and more like a **compiler for intent** — one that continuously verifies that what exists matches what was declared.

This posture is intentional. SDD optimises for certainty.

---

### Why sync exists

This was not always the case.

Early forms of Spec-Driven Development assumed a **one-way flow**: specification first, code second, and never the reverse. The spec was authoritative; the implementation was disposable. Any change to behaviour required prior modification of the specification.

While conceptually pure, this model collapsed under real-world pressure.

It suppressed exploratory development, punished learning-through-implementation, and forced teams into **Big Design Up Front** simply to make progress. Developers either abandoned the methodology when reality diverged, or quietly modified code and backfilled the spec later — eroding trust in the very artefact meant to provide certainty.

Spec ↔ code synchronisation emerged as a corrective to this failure.

By allowing controlled reverse sync, modern SDD preserves auditability without prohibiting reality. Drift is surfaced explicitly rather than hidden. Documentation remains truthful. The system stays inspectable.

But the underlying philosophy remains unchanged.

---

### Where it shines

Spec-Driven Development is genuinely effective **when the cost of ambiguity exceeds the cost of rigidity**.

**Stable core logic:**
When requirements are well understood and evolve slowly, SDD performs exactly as intended. Deterministic business rules, calculation engines, and policy enforcement benefit from being specified once and regenerated reliably. Creativity is not the objective; consistency is.

**Regulated domains:**
In finance, healthcare, safety-critical systems, and government, SDD aligns naturally with compliance requirements. Specifications double as audit artefacts. The ability to demonstrate that an implementation was derived from a formally reviewed description of intent is a powerful organisational capability.

**Regenerable systems:**
SDD excels when code is treated as a secondary artefact. Entire services can be regenerated across languages, frameworks, or platforms, provided the spec remains authoritative. In theory, this reduces long-term platform risk and vendor lock-in.

**High audit requirements:**
Traceability is SDD’s native strength. Every behaviour can be traced to an explicit declaration. For systems where explanation matters more than adaptability, this trade-off is not just acceptable — it is required.

In short, SDD is optimised for systems that are already known.

---

### Failure modes

The limitations of SDD emerge precisely where software becomes uncertain.

**Reintroduces Big Design Up Front:**
Even with synchronisation, SDD still requires correctness to be formalised early, because the specification remains the authoritative artefact. Sync does not change that relationship — it merely constrains how far implementation is allowed to diverge.

For traceability to remain meaningful, the spec and the code must remain nearly isomorphic. Code may evolve, but only within the conceptual envelope already declared. Reverse sync exists to reconcile drift, not to legitimise it. If implementation deviates too far, traceability collapses — the spec no longer explains the system; it merely describes it after the fact.

This places a hard ceiling on discovery. Significant design insight cannot emerge organically through coding, because any non-trivial departure must first be formalised in the spec. Exploration becomes paperwork. Learning is permitted only insofar as it can be anticipated, named, and approved before it exists.

As a result, SDD remains fundamentally spec-first. Sync makes the process survivable, but it does not change the core assumption: that understanding precedes implementation, rather than being produced by it. Big Design Up Front is softened — not removed.

Discovery is delayed, constrained, and filtered through formality. It is not eliminated, but it is never allowed to lead.

**Defers rather than resolves drift:**
Synchronisation keeps documents accurate, but it does not question whether the architecture itself is sound. Specs follow reality; they do not critique it.

**Compliance over coherence:**
Because success is measured by adherence rather than design quality, systems can remain formally correct while becoming structurally brittle. Architectural discomfort has no formal signal.

**Excludes human taste and intuition:**
Most critically, SDD has no natural mechanism for expressing unease. LLMs interpolate; they do not imagine. When generation is driven primarily by specifications, outputs converge toward statistically defensible patterns rather than inspired ones.

AI doesn’t dream.
And SDD gives it nothing else to work with.

Human judgment — taste, discomfort, intuition, the sense that something is *technically correct but wrong* — has no formal entry point. The spec becomes a narrowing funnel, and the AI fills it faithfully with the safest patterns available.

The result is software that is correct, auditable, and consistent — and increasingly indistinguishable.

---


---

## SRDD: The Missing Loop

Spec-Roundtrip Driven Development (SRDD) retains the strengths of earlier approaches while removing their most damaging assumptions.

It deliberately keeps:

* **The structure of specs**
SRDD preserves structured specifications as a working medium for intent. Requirements, use cases, architectural boundaries, and test strategies are still articulated explicitly. Specs remain the place where understanding is shaped, challenged, and communicated — not abandoned once code exists. They provide the map from which development proceeds.

* **The speed of AI**
SRDD fully embraces AI-assisted execution. Generation, refactoring, test scaffolding, and repetitive work are delegated aggressively. The AI accelerates implementation, shortens feedback loops, and keeps momentum high. Humans are freed to make directional decisions rather than fight mechanics.

* **The adaptability of iteration**
SRDD remains unapologetically iterative, but iteration is not aimless. Each cycle is guided by intent and expressed through **deliberate development**. Features are not merely discovered; they are designed, implemented, reviewed, and extended in response to real use. Assumptions are corrected, designs are refined, and capabilities are intentionally built out over time.

The system is not simply allowed to change.
It is **actively developed**.

AI accelerates the mechanics of that development, but humans retain control over direction, scope, and shape. Each cycle ensures that what is built next is informed by what already exists — without being constrained by it.

But SRDD draws a hard line at one assumption.

**It rejects the idea that specs are contracts.**

Specs are not promises to be enforced against the future. They are snapshots of current understanding, taken so that the next step can be chosen deliberately. When reality diverges — as it inevitably does — SRDD does not force the system back into compliance with an outdated document. Instead, the spec is regenerated from the living system, *then actively edited* to reflect what the system **should become next**.

Regeneration is not acceptance of the system as it is.
It is not a rationalisation of accumulated **technical debt**, nor a quiet agreement to live with architectural drift because it has become inconvenient to confront.

It is re-orientation.

SRDD begins by accepting reality as evidence: the code that exists, the behaviour that ships, the tests that pass, and the shortcuts that were taken. Technical debt is acknowledged explicitly, not hidden behind compliance or deferred indefinitely. The system is recognised as *broken where it is broken*.

But SRDD refuses a more dangerous form of acceptance — the kind where debt becomes destiny.

Instead, regeneration reasserts intent. The system is deliberately pointed somewhere new, informed by everything that has been learned along the way. Decisions that once lived only as **tribal knowledge** — why a trade-off was made, why a shortcut was tolerated, why a boundary eroded — are surfaced, articulated, and captured in the regenerated spec.

What emerges is not a justification of the present system, but a clarified foundation for what comes next.

The regenerated spec becomes a renewed point of control — a place where technical debt is made visible, tribal knowledge is externalised, and direction is chosen consciously rather than inherited accidentally. Structure is preserved. Direction is reasserted. Progress continues with better footing than before.

SRDD does not eliminate structure.  It makes structure responsive.

**That roundtrip is the core innovation.**

### A note on SRDD and auditability

It is worth pausing here to be explicit about how SRDD relates to the core strength of Spec-Driven Development.

One of the primary reasons SDD exists at all is **auditability**. By forcing early formalisation and maintaining tight synchronisation between specification and implementation, SDD produces systems where intent, design, code, and change history can be traced with near-forensic precision. That discipline is not incidental — it is the point. In regulated and safety-critical environments, the cost of Big Design Up Front is accepted because the resulting guarantees are required.

SRDD does not attempt to replicate that level of certainty.

Instead, it offers a different — and deliberately weaker — form of auditability.

Where SDD proves correctness through prior formalisation, SRDD produces **evidence through evolution**. Each regeneration cycle preserves lineage: original intent, implemented reality, subsequent redesign. What remains consistent across regenerations demonstrates stability. What changes documents learning. Technical debt is surfaced rather than concealed, and tribal knowledge is progressively externalised into planning artefacts instead of remaining implicit in code or conversations.

The system is not certified as *never wrong* in advance.
It is traceable in **how it became right over time**.

This distinction matters. SRDD trades absolute guarantees for adaptability, but it does not abandon accountability. It replaces compliance-driven certainty with historically grounded transparency — sufficient for most software systems, even if it falls short of SDD’s strongest claims.

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

---

© 2025 Brooke Smith. All rights reserved.

This document constitutes a public disclosure and defensive publication of the
Spec-Roundtrip Driven Development (SRDD) and Scaled SRDD (SSRDD) methodologies.

The author expressly places the concepts, processes, and workflows described
herein into the public domain as prior art, for the purpose of preventing
subsequent patent claims or exclusive ownership by third parties.

Commercial use, redistribution, or derivative works of this text require
explicit permission from the author.
