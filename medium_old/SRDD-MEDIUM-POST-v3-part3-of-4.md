---
title: SRDD (Part 3 of 4) - The SRDD Workflow
---

<style>
    figure.image-center {
    text-align: center;
    margin: 2em 0;
    border: 1px solid #eee;
}

figure.image-center img {
    max-width: 100%;
    height: auto;
}
  
figure.image-center figcaption {
    font-style: italic;
    color: #666;
    margin-top: 0.5em;
}
</style>

# SRDD (Part 3 of 4): The SRDD Workflow

This is Part 3 of a four-part series on Spec-Roundtrip Driven Development.
* 👉 **[Read Part 1: Why SRDD Exists](https://brooke.medium.com/srdd-part1-of-4)**
* 👉 **[Read Part 2: The AI Coding Landscape](https://brooke.medium.com/srdd-part2-of-4)**

---

Part 2 mapped the AI coding landscape - vibe coding, agentic coding, context engineering, and spec-driven development - and showed where each approach predictably breaks down.

This article is the technical core: the five phases of SRDD, how contracts govern change, what the AI is responsible for during implementation, and how regeneration closes the loop between intent and reality.

<figure class="image-center">
  <img src="./images/3-01_missingLoop_e00f6-roller-coaster-loop-gap-youtube-geek-week.png" alt="Image of a fictional roller-coaster that has a gap in one of it's loops" width="600">
  <figcaption><a href="https://coastercritic.com/2013/08/10/roller-coaster-gap-in-loop-youtube-geek-week/">Some might like this missing loop</a></figcaption>
</figure>

## SRDD: The Missing Loop

Spec-Roundtrip Driven Development (SRDD) is a development methodology designed for AI-assisted systems that must evolve over time without losing coherence, intent, or professional judgment. It was created in response to a recurring failure mode across modern AI coding approaches: understanding flows in one direction, while systems grow in another.

In SRDD, specifications, code, tests, and operational reality form a **closed loop**. Specs inform implementation, implementation reshapes understanding, and that understanding is periodically captured back into renewed specifications. The system is not treated as something to be generated once and maintained defensively, but as something to be **actively developed** - with intent revisited, designs refined, and direction reasserted as the system grows.

Spec-Roundtrip Driven Development (SRDD) retains the strengths of earlier approaches while removing their most damaging assumptions.

It deliberately keeps:

* **The structure of specs**  
SRDD preserves structured specifications as a working medium for intent. Requirements, use cases, architectural boundaries, and test strategies are still articulated explicitly. Specs remain the place where understanding is shaped, challenged, and communicated - not abandoned once code exists. They provide the map from which development proceeds.

* **The speed of AI**  
SRDD fully embraces AI-assisted execution. Generation, refactoring, test scaffolding, and repetitive work are delegated aggressively. The AI accelerates implementation, shortens feedback loops, and keeps momentum high. Humans are freed to make directional decisions rather than fight mechanics.

* **The adaptability of iteration**  
SRDD remains unapologetically iterative, but iteration is not aimless. Each cycle is guided by intent and expressed through **deliberate development**. Features are not merely discovered; they are designed, implemented, reviewed, and extended in response to real use. Assumptions are corrected, designs are refined, and capabilities are intentionally built out over time.

The system is not simply allowed to change.  
It is **actively developed**.

AI accelerates the mechanics of that development, but humans retain control over direction, scope, and shape. Each cycle ensures that what is built next is informed by what already exists - without being constrained by it.

But SRDD draws a hard line at one assumption.

**It rejects the idea that specs are contracts.**

Specs are not promises to be enforced against the future. They are snapshots of current understanding, taken so that the next step can be chosen deliberately. When reality diverges - as it inevitably does - SRDD does not force the system back into compliance with an outdated document. Instead, the spec is regenerated from the living system, *then actively edited* to reflect what the system **should become next**.

Regeneration is not acceptance of the system as it is.  It is not a rationalisation of accumulated **technical debt**, nor a quiet agreement to live with architectural drift because it has become inconvenient to confront.

It is re-orientation.

SRDD begins by accepting reality as evidence: the code that exists, the behaviour that ships, the tests that pass, and the shortcuts that were taken. Technical debt is acknowledged explicitly, not hidden behind compliance or deferred indefinitely. The system is recognised as *broken where it is broken*.

But SRDD refuses a more dangerous form of acceptance - the kind where debt becomes destiny.

Instead, regeneration reasserts intent. The system is deliberately pointed somewhere new, informed by everything that has been learned along the way. Decisions that once lived only as **tribal knowledge** - why a trade-off was made, why a shortcut was tolerated, why a boundary eroded - are surfaced, articulated, and captured in the regenerated spec.

What emerges is not a justification of the present system, but a clarified foundation for what comes next.

The regenerated spec becomes a renewed point of control - a place where technical debt is made visible, tribal knowledge is externalised, and direction is chosen consciously rather than inherited accidentally. Structure is preserved. Direction is reasserted. Progress continues with better footing than before.

SRDD does not eliminate structure.  It makes structure responsive.

**That roundtrip is the core innovation.**

<figure class="image-center">
  <img src="./images/3-02-auditability_best-practices-improvement-2.jpg" alt="Cartoon hand holding a 'tick' surrounded by business process icons" width="600">
  <figcaption>Best practices: how to develop with <a href="https://grupo-giga.com/blog/develop-with-auditability/">auditability</a></figcaption>
</figure>

### A note on SRDD and auditability

It is worth pausing here to be explicit about how SRDD relates to the core strength of Spec-Driven Development.

One of the primary reasons SDD exists at all is **auditability**. By forcing early formalisation and maintaining tight synchronisation between specification and implementation, SDD produces systems where intent, design, code, and change history can be traced with near-forensic precision. That discipline is not incidental - it is the point. In regulated and safety-critical environments, the cost of Big Design Up Front is accepted because the resulting guarantees are required.

SRDD does not attempt to replicate that level of certainty.

Instead, it offers a different - and deliberately weaker - form of auditability.

Where SDD proves correctness through prior formalisation, SRDD produces **evidence through evolution**. Each regeneration cycle preserves lineage: original intent, implemented reality, subsequent redesign. What remains consistent across regenerations demonstrates stability. What changes documents learning. Technical debt is surfaced rather than concealed, and tribal knowledge is progressively externalised into planning artefacts instead of remaining implicit in code or conversations.

The system is not certified as *never wrong* in advance.
It is traceable in **how it became right over time**.

This distinction matters. SRDD trades absolute guarantees for adaptability, but it does not abandon accountability. It replaces compliance-driven certainty with historically grounded transparency - sufficient for most software systems, even if it falls short of SDD’s strongest claims.

<figure class="image-center">
  <img src="./images/3-00_workflowDiagram-transparent.png" alt="Workflow diagram showing the phases of SRDD" width="600">
  <figcaption>Workflow diagram showing the phases of <a href="https://docs-bbos.github.io/srdd">SRDD</a></figcaption>
</figure>


## The SRDD Workflow

### Phase 1: Design

Phase 1 establishes *intent*. It is where understanding is shaped, clarified, and made explicit **before** implementation hardens around it.

In an initial build, Phase 1 starts from a blank slate.
In subsequent iterations or regeneration cycles, it is informed by everything learned since the last design - including production evidence captured in `07-NextCycle.md`.
```text
docs/plans/2025-12-15_v1_initial-design/
  00-PLANNING.md       ← Initial brain dump from requirements questionnaire
  01-REQUIREMENTS.md   ← Refined functional and non-functional requirements
  02-USECASES.md       ← User stories with acceptance criteria
  03-QA-SESSION.md     ← Q&A transcript clarifying ambiguities
  04-ARCHITECTURE.md   ← Technical design, components, data model
  05-IMPLEMENTATION.md ← Phased plan: what gets built in what order
  06-TESTPLAN.md       ← Test strategy and test data requirements
  07-NextCycle.md      ← Placeholder for production discoveries and future intent
```


When Phase 1 is entered as part of a **regeneration cycle**, the `07-NextCycle.md` artefact is treated as an explicit input:

This document captures production discoveries, unresolved tensions, candidate contracts, and signals of architectural drift. It does not prescribe solutions - it informs what must be reconsidered.

### 00-PLANNING.md

`00-PLANNING.md` captures the initial brain dump.

Using a structured questionnaire, the developer and AI work through the problem space: what is being solved, who has the problem, why now, and what constraints exist. In regeneration cycles, this document also reflects on what the system has become - including shortcuts taken, assumptions invalidated, and lessons learned.

This document is deliberately rough. Its purpose is **breadth, not precision**. Everything goes on the table before refinement begins.

### 01-REQUIREMENTS.md

`01-REQUIREMENTS.md` distils the planning document into formal requirements.

Functional requirements describe what the system must do. Non-functional requirements capture performance, security, reliability, scalability, and operational constraints. MoSCoW prioritisation happens here: must have, should have, could have, won't have.

In regeneration cycles, requirements may be:

* reaffirmed
* modified
* retired
* or newly introduced based on production evidence

This makes change explicit rather than accidental.

### 02-USECASES.md

`02-USECASES.md` translates requirements into concrete user stories with acceptance criteria.

Each use case follows a consistent structure:

* *As a* [role]
* *I want* [capability]
* *So that* [benefit]

Acceptance criteria define what "done" means in observable terms. These criteria become the authoritative source for functional and integration tests in later phases.

Importantly, **use cases are not written during production**. They are derived deliberately here - often directly from discoveries captured in `07-NextCycle.md`.

### 03-QA-SESSION.md

`03-QA-SESSION.md` preserves the conversation.

As the AI generates and refines the preceding documents, questions naturally arise: edge cases, ambiguities, unstated assumptions, conflicting goals. This transcript captures the back-and-forth - including corrections, disagreements, and rationale.

This document exists to preserve **decision context**, not to enforce outcomes. It becomes invaluable during regeneration, when past intent must be re-understood rather than re-imagined.

### 04-ARCHITECTURE.md

`04-ARCHITECTURE.md` defines the technical approach.

It documents:

* component boundaries
* data models
* API surfaces
* integration patterns
* technology choices and constraints

This is where professional architectural judgment matters most. The goal is not novelty, but coherence - ensuring the AI does not default to generic or statistically common patterns that are misaligned with the system's actual needs.

**Canonical patterns are established here**: Decisions about how the system handles logging, error handling, configuration, and other cross-cutting concerns should be explicit. These patterns become what the AI will replicate throughout implementation. Contradictions introduced later are harder to correct than conventions established early.

See: *Principles → Designing for AI Comprehension*

### 05-IMPLEMENTATION.md

`05-IMPLEMENTATION.md` breaks the work into phases.

What is built first? What depends on what? What can safely be deferred?

This document informs issue creation, but the backlog remains intentionally lean. Only a small number of high-level issues are created initially. Additional issues emerge organically as understanding deepens.

Momentum is preserved by keeping the queue short.

### 06-TESTPLAN.md

`06-TESTPLAN.md` defines the testing strategy across all layers:

* unit
* integration
* functional

It clarifies what each layer is responsible for, what constitutes a contract, and what data is required to exercise the system meaningfully. It also specifies how test data will be generated or sourced.

Tests are not written here - but the **authority and scope of tests** is.

### 07-NextCycle.md

`07-NextCycle.md` is created during Phase 1 but **intentionally left empty**.

It exists to establish a forward-looking capture point for discoveries that cannot be known at design time. This document is populated **only after a production release**, when real usage surfaces new expectations, implicit contracts, and architectural tensions.

During **Phase 4 (Production)**, findings from UAT are recorded here:

* newly discovered behaviours users rely on
* candidate contracts not previously specified
* rejected expectations (explicitly documented)
* signals of architectural strain or drift
* inputs that may justify iteration or regeneration

No implementation occurs at this stage.
`07-NextCycle.md` records evidence and intent - not solutions.

During the next SRDD cycle, this document becomes a **primary input to Phase 1**, informing updates to requirements, use cases, and architecture. In regeneration cycles, it plays a critical role in re-establishing direction without losing historical context.

This ensures that production learning is preserved deliberately rather than absorbed accidentally.

`07-NextCycle.md` does not answer questions.
It creates the conditions for better ones.

When the next SRDD cycle begins, the AI and developer return to Phase 1 with sharper evidence, clearer tensions, and fewer assumptions carried forward by habit alone. Misunderstandings are corrected earlier. Trade-offs are re-examined explicitly. Intent is reasserted before code is touched again.

The backlog stays intentionally lean.
Understanding compounds instead of drifting.

### Phase 2: Implementation

Each issue in SRDD is implemented through a strict test-first loop:
```
failing test ↔ implement → pass
```

This is not TDD as a ritual. It is TDD as a **boundary-enforcement mechanism**.

SRDD does not use tests to maximise coverage or satisfy process doctrine. Tests exist to enforce boundaries: to make explicit what the system is committing to, and to protect those commitments as change occurs. They define where stability is mandatory and where evolution is permitted.

TDD here is not about proving correctness in isolation. It is about **protecting intent under change**. Writing tests first forces an explicit declaration of what is being guaranteed before implementation choices harden around it. Accidental commitments are prevented; deliberate ones are made visible.

When a test fails, the question is never "How do we fix the test?"  It is "Did we violate a boundary, or did we intentionally choose to move it?"

This reframes testing from verification to governance. The test suite becomes a living record of the system's contractual surface, enforcing discipline at the edges while leaving the interior free to evolve.

#### Contracts as the Source of Authority

In SRDD, **contracts are authoritative**.

A contract is anything that external systems, users, or adjacent components depend on remaining stable unless explicitly versioned:

* Public APIs (request/response shapes, error semantics)
* UI behaviours and interaction guarantees
* Domain events and their payloads
* Invariants (idempotency, ordering guarantees, security constraints)
* Observable side effects (persistence, notifications, integrations)

These contracts define *what must not change*.  
They are not informal expectations - they are **deliberate commitments**.

#### Tests as Executable Witnesses

Tests are not the source of authority; they are its **executable witnesses**.

Each contract is encoded as one or more tests that demonstrate:

* What behaviour is guaranteed
* Under which conditions it holds
* What constitutes a breaking change

In short:

> **Contracts define intent.  
> Tests prove that intent still holds.**

If a test fails, SRDD assumes one of only two possibilities:

1. The implementation violated a contract  
2. The contract itself must be deliberately changed (and versioned)

There is no third option.

#### When Contracts Change

When contracts keep shifting, or each change exposes deeper misalignment, the system is telling you something: boundaries were drawn in the wrong place, responsibilities are unclear, or requirements were not understood well enough.

The AI is responsible for capturing these signals as they occur. Each significant contract change - and its context - is logged immediately in `07-NextCycle.md`. This is not a fix; it is evidence. The document accumulates observations: what changed, why, what it affected, and what tension it revealed.

As signals accumulate, the AI periodically reviews the list. When the pattern becomes clear - repeated boundary violations, cascading impacts, foundational assumptions proving wrong - it advises regeneration:

> "07-NextCycle.md now contains five significant contract changes in three weeks, three of which affected the same boundary. This suggests architectural misalignment. I recommend returning to Phase 1."

The developer makes the final call, but the recommendation is backed by documented evidence, not AI intuition. The decision to regenerate becomes traceable.

In short:
- **Minor contract change** → new issue, normal flow
- **Significant contract change** → new issue, log signal in 07-NextCycle.md
- **Accumulated signals show pattern** → AI advises regeneration, evidence already captured, return to Phase 1

<figure class="image-center">
  <img src="./images/3-03_defining-roles-and-responsibilities.png" alt="4 different business roles and responsibilities shown" width="600">
  <figcaption>Define Roles & <a href="https://www.pmcolumn.com/roles-and-responsibilities/">Responsibilities</a></figcaption>
</figure>


#### Layered Tests, Distinct Responsibilities

SRDD adopts the well-established practice of layered testing - not to duplicate coverage, but to assign **jurisdiction**.

Authority, in this context, means contractual weight - how strongly a test's failure signals a violated guarantee, and how much scrutiny is required before that test can be changed. High-authority tests encode promises the system makes to the outside world. Changing them is changing the contract. Low-authority tests are internal scaffolding - useful for development velocity, but disposable without consequence.

**Unit tests**
* Validate local logic and edge cases
* Optimise developer velocity
* Free to change, split, or disappear
* Carry *no* contractual authority

**Integration tests**
* Validate service boundaries and data flows
* Encode API behaviour, persistence semantics, and error handling
* Medium authority

**Functional / contract tests**
* Encode user-visible or system-visible guarantees
* Represent APIs, UI flows, events, and invariants
* Must not change without explicit intent
* Highest authority

Internal structure - classes, modules, helpers, private methods - is intentionally *not* protected by tests unless it expresses a contract.

This is a feature, not a limitation.

#### Internal Freedom, External Stability

This is standard software engineering - and SRDD respects it.

* **Outside the contract:** stability is mandatory  
* **Inside the boundary:** evolution is encouraged

Refactors, restructures, and architectural shifts are allowed - even expected - as long as contractual tests continue to pass.

The principle resolves a long-standing tension in software design: private methods remain private, cohesion is preserved, and test suites do not calcify internal structure. Velocity is maintained without eroding guarantees.

The system becomes **stable where it must be**, and **fluid where it can be**.

SRDD does not claim to invent this. It simply refuses to abandon it - even when AI-assisted velocity tempts teams to blur boundaries or lock down internals defensively.

#### The AI as Scope Guardian

During implementation, the AI plays a non-negotiable role: **scope guardian**.

Its responsibilities include:

* Preventing feature creep within an issue
* Detecting when a proposed change alters a contract
* Asking explicit questions when a boundary is crossed:
  > "This change affects a public API. Should this be versioned?"
* Offering to create new issues for out-of-scope ideas
* Refusing to silently "just add one more thing"

These roles are not aspirational - they can be enforced today through rules files, test discipline, and review structure, with future tooling improving what these already provide.

This matters because AI-assisted development **amplifies opportunism**.

When implementation becomes cheap, fast, and frictionless, the cost of *just adding one more thing* collapses. Ideas that would normally be deferred - "while we're here", "it's only a small change", "we can tidy this up later" - are acted on immediately. The AI does not push back. It does not feel scope creep. It executes.

Developers recognise this instinct instantly. A feature almost works, so you extend it slightly. A function is already open, so you add a parameter. A test is failing nearby, so you broaden its responsibility. None of these decisions are irrational in isolation. In aggregate, they erode boundaries.

AI accelerates this dynamic. What used to take minutes now takes seconds. What once required intent now happens by momentum. The system drifts not because of negligence, but because the path of least resistance becomes irresistible.

SRDD treats this not as a moral failing, but as a structural risk.

By enforcing issue boundaries and making the AI explicitly responsible for guarding scope, SRDD introduces friction *where it matters most*. The AI is required to ask: "Is this still the same commitment?" If not, it offers to create a new issue, defer the change, or force an explicit decision.

This restores a discipline that velocity quietly erodes: the habit of choosing what *not* to do next.

SRDD deliberately counters that by enforcing discipline at the issue boundary.

#### The AI as Pattern Follower

The AI has a second responsibility during implementation: **following established patterns**.

Canonical patterns - for logging, error handling, configuration, naming, and other cross-cutting concerns - are defined in `04-ARCHITECTURE.md`. The AI should replicate these patterns, not invent alternatives.

But the AI cannot reliably enforce its own adherence. Pattern conformance requires layered defence:

* **Good examples in the codebase**: the AI pattern-matches on what exists
* **Rules files**: explicit instructions that shape generation (CLAUDE.md, .cursorrules, copilot-instructions.md, or whatever your tooling supports)
* **Linters and static analysis**: automated rejection of non-conforming code
* **CI checks**: build failures that prevent violations from merging
* **Human review in Phase 3**: coherence review catches what tooling misses

When the AI deviates from an established pattern, **correct it immediately**. Deviations that slip through become examples the AI will repeat. The codebase teaches by demonstration; every inconsistency introduced is an inconsistency that will propagate. The same applies to hallucinations and contrived solutions - an invented API that gets merged becomes a pattern the AI treats as real; a workaround that should have been questioned becomes the template for future workarounds.

This means:

* If the project uses a specific logging approach, the AI uses that approach
* If error handling follows a defined structure, new errors follow the same structure
* If naming conventions exist, new code matches them

Prefer explicit, well-named abstractions. `logAuditEvent()` is better than `log()`. `fetchUserById()` is better than `getUser()`. Names that reveal intent help both humans and AI understand what "right" looks like.

Pattern deviation is not a moral failing - it is a signal. It may indicate:

* The AI lacks sufficient context (add to rules or provide examples)
* The established pattern is unclear (clarify in ARCHITECTURE.md)
* The guardrails are insufficient (add linter rules or CI checks)
* The pattern itself needs revision (make this explicit, not accidental)

See: *Principles → Designing for AI Comprehension*

### Phase 3: Review

Pull requests are not just a delivery mechanism in SRDD; they are a **decision record**.

Every PR captures a moment where intent met reality. In many cases, it records trade-offs: alternatives that were considered or rejected, constraints that surfaced late, or shortcuts that were consciously tolerated. These decisions are often too contextual, too situational, or too nuanced to justify formal documentation at the time - but they matter later.

In other cases, the PR is far more explicit. It may be the moment where a contract is defined, tightened, or deliberately changed. An API boundary is clarified. A behavioural guarantee is enforced through a new test. A breaking change is versioned rather than smuggled through. In these moments, the PR is not just descriptive - it is **constitutive**. It establishes what the system now promises.

Whether implicit or explicit, the PR marks the point at which uncertainty becomes commitment.

PRs preserve this context implicitly:

- Why a boundary was moved or reinforced
- Why a shortcut was accepted - or explicitly rejected
- Why an interface took its current shape
- Why a test defines a guarantee broadly rather than narrowly

The review conversation, commit history, and diff together form a lightweight narrative of how the system actually evolved - not how it was originally imagined.

This history becomes critical during regeneration. When the AI synthesises a new spec from the living system, PRs provide the missing "why" that code alone cannot explain. They surface intent that was never formalised, constraints that were discovered late, and decisions that lived temporarily in human judgment.

Without this trail, regeneration risks erasing hard-won knowledge. With it, SRDD can distinguish between accidental drift and deliberate adaptation.

PRs do not just close issues.
They preserve reasoning.

That preservation is what allows understanding to compound rather than reset between cycles.

#### Review for Coherence, Not Just Correctness

The AI can determine whether code works. That is not the reviewer's primary concern.

The reviewer's responsibility is to assess whether the code **fits** - whether it coheres with the system's architecture, follows established patterns, and avoids introducing long-term complexity.

The AI can assist with this review. It can flag potential boundary violations, compare implementations against ARCHITECTURE.md patterns, identify naming inconsistencies, and detect changes to public APIs. Use the AI as a first pass.

But the human reviewer holds final authority. Review for:

* **Architectural coherence**: Does this change respect existing boundaries? Does it introduce new dependencies that weren't discussed? The AI can flag these; the human decides if they're acceptable.
* **Pattern conformance**: Does the implementation follow canonical patterns, or has the AI introduced a variation? The AI can compare; the human judges whether deviation is drift or improvement.
* **Naming and abstraction**: Are new functions, classes, and modules named in ways that reveal intent? The AI can check consistency; the human assesses whether names actually clarify.
* **Contractual impact**: Does this change affect a public API, event, or guarantee? The AI can detect changes mechanically; the human decides if the change is intentional and appropriate.

Correctness is necessary but insufficient. A PR can pass all tests - and all AI checks - and still degrade the system's coherence. The human reviewer is the last line of defence against pattern drift, and the only one who can say "this is correct but wrong."

If the AI has deviated from an established pattern, this is the moment to catch it. Every deviation that merges becomes an example the AI will follow next time.

See: *Principles → Designing for AI Comprehension*

#### Capturing Signals

Review can surface two kinds of observations:

**Blocking issues** are problems that must be resolved before the PR can merge. These are captured as PR review comments — not in `07-NextCycle.md`. The PR returns to Phase 2 for revision, focused specifically on addressing the review feedback. Once resolved, it returns to Phase 3 for re-review. This is the standard review loop:

```
Phase 2 (Implement) → Phase 3 (Review) → Blocking issue found
                           ↓
                      PR comments
                           ↓
            Phase 2 (Revise) → Phase 3 (Re-review) → ...
```

**Non-blocking signals** are observations that don't prevent the PR from merging but inform future work. These are captured in `07-NextCycle.md`. They are **implementation signals** — patterns or tensions visible in the code that may not warrant immediate action but should influence future decisions:

- Patterns showing strain or becoming awkward
- Boundaries that feel wrong or artificially placed
- Dependencies heavier or more entangled than expected
- Modules that want to split or merge
- Abstractions that aren't earning their complexity
- Emerging candidates for refactoring

These signals are distinct from the **production signals** captured in Phase 4 (UAT). Implementation signals come from reading and reviewing code; production signals come from observing the system under real conditions. Both feed into regeneration decisions, but they represent different kinds of evidence.

Not every PR generates signals. Many are clean implementations that fit well. But when something feels off — even if it doesn't block approval — capture it. The pattern may become clearer over time.

#### Continue or Advance?

After each PR merges, the cycle either continues or advances:

**More issues in the current cycle?**
Return to Phase 2. Select the next issue from the backlog, implement, and return to Phase 3 for review.

**Cycle complete?**
Advance to Phase 4 (UAT). The implemented functionality is ready for validation against reality.

What constitutes "cycle complete" depends on team workflow:

- **Time-boxed (Agile sprint):** The sprint ends. Completed work advances to UAT; incomplete issues return to the backlog. Phase 4 aligns with Sprint Review.

- **Scope-boxed (milestone):** A defined set of issues constitutes a coherent deliverable. When all are done, the milestone advances to UAT.

- **Hybrid:** Core functionality must complete before advancing. Nice-to-have scope can carry over to the next cycle.

The key criterion: *Is there enough implemented functionality to validate against reality?*

SRDD does not prescribe which model to use — that is an organisational choice. But the decision point must be explicit. Drifting into UAT without conscious commitment invites incomplete validation and blurred accountability.

### Phase 4: UAT (Observe and Accumulate)

UAT is where SRDD validates intent against reality.

This phase is not treated as the end of development, but as the moment when assumptions are finally exposed to real conditions. The system is exercised using **real data, real permissions, real workflows, and real constraints** - not sanitised environments optimised to pass automated checks.

Automated tests have already established correctness. UAT exists to establish *fitness*.

#### A Deliberate Confrontation with Reality

In SRDD, UAT is not a ceremonial sign-off. It is **evidence gathering**.

UAT asks a different question from tests:

> *Does the system behave acceptably in the world it actually inhabits?*

This is where qualitative judgment enters the loop. Performance may meet metrics but still feel slow. A workflow may be logically correct but cognitively awkward. An edge case may be rare but unacceptable. These are not failures of correctness; they are failures of fit.

SRDD treats this feedback as first-class evidence - but **does not act on it during this phase**.

#### Accumulate, Don't Fix

Every finding during UAT is captured in `07-NextCycle.md`:

- Bugs and defects
- Minor issues and rough edges
- Implicit contracts discovered through use
- Architectural tensions revealed under real conditions
- Performance concerns
- User feedback and behavioural expectations

No fixes are made. No issues are created in the backlog. No code changes.

This is deliberate. Phase 4 is observation. The decision about *what to do* with these findings belongs to Phase 5.

Each entry in `07-NextCycle.md` captures:

- What was observed
- The context (user, workflow, data conditions)
- Whether it appears to be a bug, a missing contract, or an architectural signal
- Any relevant evidence (logs, screenshots, user quotes)

The document accumulates throughout UAT. It becomes the input to triage.

#### Making Implicit Contracts Visible

Crucially, UAT often reveals **implicit contracts** - behaviours users depend on that were never formally encoded. These are not traditional bugs. They are expectations that emerged through use rather than design.

The trigger is almost always human.

A user, product owner, or developer notices a behaviour and says some version of:

- "Oh - actually, I expect this to do *that*."
- "If this ever changed, it would break how I use it."
- "We rely on this, even though it isn't documented."

SRDD treats these moments as signals, not interruptions.

At that point, the AI's role is not to infer intent, but to **force clarification**. It prompts a series of decisions:

**Should this behaviour be guaranteed going forward?**

If no, the rejection is captured deliberately in `07-NextCycle.md`. The behaviour remains unsupported, and the system is free to change without preserving it. Future developers - and future AI sessions - will know the decision was conscious, not accidental.

If yes, the AI captures it as a **candidate contract** and clarifies its scope:

- **Context-specific or system-wide**: Does this guarantee apply everywhere, or only under certain conditions?
- **Stable, versioned, or constrained**: Should it never change, change only with explicit versioning, or be bounded by specific limits?

These answers are recorded in `07-NextCycle.md` alongside the candidate contract - not as a bug to fix now, but as a guarantee to formalize in a future cycle.

In both cases, ambiguity is resolved consciously.
Nothing remains implicit by accident.

#### UAT as Evidence

UAT is therefore not a destination.
It is a **source of evidence**.

That evidence - accumulated in `07-NextCycle.md` - feeds Phase 5, where the decision is made: iterate, regenerate, or release.

### Phase 5: Triage and Decide

Phase 5 is the decision point.

After UAT, `07-NextCycle.md` contains accumulated evidence: bugs, minor issues, implicit contracts, architectural signals, user feedback. Phase 5 analyzes this evidence and chooses the path forward.

This is not a formality. It is where SRDD's discipline pays off.

#### Categorizing Findings

The AI assists in categorizing accumulated findings:

**Bugs and defects**:
The system does not behave as specified. Tests should have caught this but didn't, or the condition wasn't anticipated. These require fixes.

**Minor issues and rough edges**:
The system works but could be better. Performance improvements, UX polish, small enhancements. These are iterative refinements.

**Candidate contracts**:
Implicit behaviours that users depend on, surfaced during UAT. These need to be formalized - either as guaranteed contracts or explicitly rejected.

**Architectural signals**:
Signs of deeper misalignment: repeated boundary violations, cascading changes, pattern drift, responsibilities in the wrong place. These suggest regeneration.

#### Watching for Spaghettification

As findings are reviewed, the AI actively looks for signs that the system's structure is beginning to degrade - not because of negligence, but because accumulated change has outpaced architectural clarity.

These signals are collectively referred to as **spaghettification**, and they tend to surface gradually:

- **Duplicated logic:** Similar behaviour implemented in multiple places with slight variations
- **Circular dependencies:** Components that cannot be reasoned about in isolation
- **Whack-a-mole regressions:** Fixes in one area repeatedly break others
- **God modules:** Classes or services that accumulate disproportionate responsibility, violating the [Single Responsibility Principle](https://en.wikipedia.org/wiki/Single-responsibility_principle)
- **Velocity decay:** Simple changes take longer than expected
- **Hedging language:** Phrases like "this might break something" or "I'm not entirely sure"
- **Pattern inconsistency:** The same concern (logging, error handling, configuration) implemented multiple ways across the codebase

None of these indicate failure.
They indicate **misalignment between intent and structure**.

Pattern inconsistency deserves particular attention. When the AI encounters contradictory examples, it cannot determine which is "right." It pattern-matches on whatever is in context - which may not be the canonical approach. This creates a feedback loop: inconsistency breeds inconsistency, accelerating drift.

#### The Decision

Based on the categorized findings and spaghettification signals, Phase 5 chooses one of three paths:

**1. Phase 1 (Regenerate)**:
Architectural or contractual issues require a return to design. The accumulated signals show misalignment that patching cannot fix. Regeneration synthesizes fresh specs from the living system, and development resumes from a clarified foundation.

**2. Phase 2 (Iterate)**:
Bugs, minor issues, or candidate contracts need to be addressed before release. Issues are created from the relevant findings in `07-NextCycle.md`, and development continues through the standard implementation cycle.

**6. Phase 6 (Production)**:
The system is ready to version and release. Findings are either minor enough to defer, or the accumulated evidence shows the system is fit for production. The decision moves to release.
```
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

#### Advising Regeneration

When spaghettification signals accumulate, the AI does not attempt to quietly compensate with increasingly fragile fixes. Instead, it surfaces the pattern explicitly and advises regeneration.

This is not an automated action. It is a recommendation.

The AI explains what it is observing, why incremental change is becoming costly, and which parts of the system appear most affected. The decision to regenerate remains human.

> "07-NextCycle.md contains five significant contract changes in three weeks, three of which affected the same boundary. Combined with the pattern drift in error handling and the circular dependency introduced last sprint, this suggests architectural misalignment. I recommend returning to Phase 1."

Regeneration is chosen when the cost of continued patching exceeds the cost of reorientation.

That choice is never trivial.

#### The Cost and Return of Regeneration

Regeneration is not cheap.

Depending on the size of the system, how long it has evolved since the last regeneration, and how far it has drifted from its original expectations, returning to feature parity can take days - sometimes weeks. That time is real cost. SRDD does not pretend otherwise.

What it offers in return is clarity.

The regenerated system is clean. Architectural intent is explicit again. Implicit requirements surfaced during UAT are captured as contracts and tests. Technical debt is no longer woven invisibly through the codebase; it is either resolved or consciously accepted.

Most importantly, velocity returns - and with it, confidence. Development after regeneration is faster, more predictable, and more satisfying. Changes no longer feel precarious. The system can once again be reasoned about as a whole.

For users, this translates into something tangible: **continuous improvement without instability**. Features ship rapidly. Bugs are fixed promptly. The system evolves visibly - yet it remains reliable. Users experience a product that gets better without breaking, that responds to feedback without regressing. This is only possible when the team behind it can move quickly *with* confidence, not despite its absence.

SRDD makes that sustainable.

The mechanics of regeneration - what the AI synthesizes and what it produces - are covered in detail in the following section: *The Regeneration Cycle*.

#### The Alternative

In large, long-lived systems - especially those built by many developers over time - architectural drift is rarely confronted head-on. Instead, it is managed defensively. Code becomes brittle. Knowledge fragments. Boundaries blur. Entire areas of the system acquire reputations: *"Don't touch that,"* *"No one really knows how this works,"* *"It breaks if you look at it wrong."*

Organisations attempt to compensate through process.

The only reliable way to prevent collapse in such systems is an increasingly onerous emphasis on exhaustive testing. Every change must be defended by more tests. Every edge case must be locked down. This is rational - but expensive.

Writing tests by hand is time-consuming, repetitive, and cognitively draining. It is rarely the work developers are motivated by, and often the first thing deferred under pressure. Over time, test suites grow unevenly: critical paths are over-tested, obscure behaviours remain implicit, and large areas of the codebase exist in a grey zone of partial coverage and collective anxiety.

The result is stagnation.

Code that developers are uncertain about is not improved. It is avoided. Bugs persist not because they are unsolvable, but because touching the surrounding code feels too risky. Architectural debt compounds quietly, protected by fear rather than intention. Velocity slows - not because the team lacks skill, but because confidence has eroded.

SRDD offers a different trade.

Rather than relying on ever-expanding defensive test suites to prop up brittle structure, SRDD periodically restores architectural clarity through regeneration. Tests remain essential - but they defend *contracts*, not accumulated uncertainty. The system is made comprehensible again, not merely survivable.

This is why regeneration, despite its cost, is often cheaper than the alternative.

A week of deliberate reorientation can replace months of hesitant change. A system that can be reasoned about invites improvement. A system that cannot eventually resists it.

SRDD does not promise perpetual cleanliness.
It promises the ability to **recover it**, intentionally and repeatedly, before brittleness becomes destiny.

#### Why This Works

SRDD does not treat architectural decay as a moral failing or a crisis. It treats it as a natural consequence of sustained progress - especially in systems that grow through real use, changing requirements, and multiple contributors.

By making regeneration an expected and supported move - rather than an admission of defeat - SRDD removes the stigma that causes teams to avoid structural correction. Refactoring stops being a desperate rescue operation performed under pressure and becomes a deliberate design activity undertaken with intent.

Iteration grows the system.
Regeneration realigns it.

Together, they prevent the slow hardening that turns living systems brittle. Boundaries remain intelligible. Confidence is preserved. Change remains possible even as systems scale in size, age, and ambition.

And perhaps most importantly, SRDD preserves the role of the developer.

As AI reshapes employment models and commoditises large portions of implementation work, developers remain valuable not because they type code, but because they **invent, imagine, and choose direction**. SRDD deliberately assigns mechanical execution to machines and reserves judgment, taste, and intent for humans. Developers are no longer paid to wrestle brittle systems or memorise tribal knowledge - they are paid to design futures, recognise when something feels wrong, and steer systems toward what they should become next.

In a world where AI can generate endlessly, SRDD ensures that humans still decide *why*, *where*, and *whether*.

---

<figure class="image-center">
  <img src="./images/3-04_The-regeneration-cycle-as-a-cascade-of-ecological-processes-and-their-success-and-failure.png" alt="Diagram showing regeneration cycle in plants'" width="600">
  <figcaption><a href="https://www.researchgate.net/publication/281813304_Developing_restoration_strategies_for_temperate_forests_using_natural_regeneration_processes">Regeration cycle</a> in plants</figcaption>
</figure>

## The Regeneration Cycle

This is the roundtrip.

Regeneration is the moment where SRDD closes the loop between intent and reality - not by rewinding time, but by **rebuilding understanding**.

It is a deliberate return to Phase 1, informed by everything that has been learned, and undertaken with full awareness of its cost.

### What the AI Synthesizes

The AI re-synthesises a coherent picture of the system from multiple sources of truth:

* the **current codebase** (what actually exists)
* **prior planning documents** (what was intended at different points in time)
* **git history** (how and when the system changed)
* **issues and tickets** (what was discovered under pressure)
* **pull requests** (why decisions were made)
* the **test suite** (what is contractually protected)
* **07-NextCycle.md** (accumulated signals, candidate contracts, and version history)

None of these sources is treated as authoritative in isolation. Each is partial, biased, and incomplete. Together, they form a layered record of how the system became what it is.

### What the AI Produces

From this synthesis, the AI produces a **new, dated planning directory** - a refreshed set of artefacts that describe the system as it now stands, not as it was once imagined. This includes:

* an updated model of the system's boundaries and responsibilities
* an explicit account of preserved contracts
* identified areas of architectural drift
* accumulated technical debt, surfaced rather than rationalised
* open questions and tensions that were previously implicit
* what should be built next

This is not a rollback.
It is a reset of understanding - and a re-assertion of direction.

### Holistic Diagnosis, Selective Intervention

A critical refinement of SRDD is that regeneration is **holistic in diagnosis, selective in intervention**.

The entire system is re-understood end-to-end. Dependencies are traced. Assumptions are re-examined. Interfaces are re-evaluated in light of real usage. Nothing is excluded from analysis.

But redesign is not applied indiscriminately.

Only subsystems that exhibit clear signs of drift - structural incoherence, brittle contracts, runaway complexity, or mismatched responsibilities - are candidates for redesign. Components that remain cohesive, well-bounded, and stable are **explicitly left alone**.

This matters.

Blanket rewrites destroy trust, erase hard-won learning, and reset momentum. SRDD avoids that trap by making *non-intervention* an explicit decision, not an accident. Stability is preserved where it has been earned.

### Compounding Understanding

The outcome of regeneration is not just cleaner code.

It is **compounded understanding**.

Each regeneration captures:

* why certain structures survived
* why others failed
* what trade-offs were real versus imagined
* which constraints were fundamental and which were provisional

That understanding is externalised into artefacts that future humans - and future AI sessions - can reason from. Knowledge stops evaporating when developers leave, teams change, or time passes.

Instead of entropy winning by default, insight accumulates.

Iteration grows the system. Regeneration realigns it.

That is the roundtrip - and it is why SRDD scales not just across codebases, but across years.

<figure class="image-center">
  <img src="./images/06.WhichWay.png" alt="Simple text image asking 'where to next..'" width="400">
  <figcaption><a href="https://www.facebook.com/andsowheretonext/">where to next</a></figcaption>
</figure>

## What's Next

The workflow is the engine. But SRDD doesn't stop at single projects.

In **Part 4**, I cover:

- How SRDD scales to multi-domain systems through **Scaled SRDD (SSRDD)**
- The principles that underpin the methodology
- The current state of implementation - what works today
- The roadmap ahead - alignment with Agile and SAFe, rules file templates, and MCP server integration

Continue to Part 4:
* 👉 **[Scaling Up: SSRDD, Principles, and Implementation](https://brooke.medium.com/srdd-part4-of-4)**

Or return to earlier parts:
* 👉 **[Part 1: Why SRDD Exists](https://brooke.medium.com/srdd-part1-of-4)**
* 👉 **[Part 2: The AI Coding Landscape](https://brooke.medium.com/srdd-part2-of-4)**

---

© 2025 Brooke Smith. All rights reserved.

This document constitutes a public disclosure and defensive publication of the
Spec-Roundtrip Driven Development (SRDD) and Scaled SRDD (SSRDD) methodologies.

The author expressly places the concepts, processes, and workflows described
herein into the public domain as prior art, for the purpose of preventing
subsequent patent claims or exclusive ownership by third parties.

Commercial use, redistribution, or derivative works of this text require
explicit permission from the author.