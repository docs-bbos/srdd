# SRDD (Part 2): From Vibe Coding to Regeneration Cycles

See part 1 at 👉 **[https://brooke.medium.com/ssrd-part1](https://brooke.medium.com/ssrd-part1)**

By mid-2025, it became clear that "AI coding" was no longer a single thing.

What began as playful experimentation had hardened into recognisable methodologies, each optimising for different trade-offs: speed versus coherence, autonomy versus understanding, structure versus adaptability.

There are now multiple serious approaches to AI-assisted development. In this article, I break down the most widely adopted ones — vibe coding, agentic coding, context engineering, and spec-driven development — then propose an alternative I call **Spec-Roundtrip Driven Development (SRDD)**, along with its multi-domain extension, **Scaled SRDD (SSRDD)**, for larger systems composed of independently developed subsystems that must integrate into a coherent whole.

### Why SRDD

SRDD draws from the strengths of each approach while addressing their predictable failure modes:

- From **vibe coding**: rapid iteration, low ceremony, fast feedback
- From **agentic coding**: goal-driven autonomy, multi-step task execution
- From **context engineering**: disciplined curation of what the AI sees
- From **spec-driven development**: architectural intentionality, explicit contracts, structured documentation

What distinguishes SRDD from all of these is the **roundtrip**: planned regeneration cycles that synthesise fresh specs from living code. Specifications are treated as snapshots, not contracts. Code evolves. Understanding must be periodically extracted back out — not as a rescue operation, but as a normal phase in the system's lifecycle.

This is what every senior developer has quietly wished for. They watch codebases grow over time — clean architecture slowly compromised, elegant patterns eroded by expedient fixes, boundaries blurred by "just this once" shortcuts. The industry calls it technical debt, but that term sanitises what it actually feels like: the slow death of coherence. Every experienced developer has stared at a system they once understood and thought, "If only I could burn this down and rebuild it properly — keeping everything we learned, but losing the accumulated mess." SRDD makes that possible. Regeneration is not fantasy; it is methodology.

Our time has come. The tooling finally exists. The AI can analyse, synthesise, and rebuild at speeds that make regeneration practical rather than aspirational. What was once a daydream — "start fresh, but keep the wisdom" — is now a workflow. We call it Spec-Roundtrip Driven Development.

For larger systems composed of independently developed subsystems, **SSRDD** wraps multiple SRDD instances with a coordination layer. Each subsystem runs its own SRDD cycle — its own planning docs, its own backlog, its own regeneration rhythm. SSRDD governs the boundaries between them: system-wide integration standards (CONSTITUTION.md), explicit API contracts, and dependency declarations that make cross-system coupling visible and intentional. The subsystems evolve independently; SSRDD ensures they integrate coherently.

### When to Use SRDD / SSRDD

SRDD is a generalist approach. It suits most projects that:

- Outlive a single coding session
- Involve multiple services, files, or contributors
- Need to remain maintainable over time
- Require production validation and iterative refinement

SSRDD is appropriate when:

- Multiple domains or bounded contexts must integrate
- Teams need to evolve APIs without breaking consumers
- Cross-domain dependencies must be explicit and versioned
- System-wide standards (authentication, error formats, events) must be enforced

I argue SRDD produces better outcomes than the alternatives for the majority of real-world development — with a few exceptions. Vibe coding remains superior for throwaway scripts and utilities that fit in a single context window. Spec-driven development may suit highly regulated environments where formal traceability is mandated. Context engineering offers value in brownfield systems where you're not trying to improve the architecture — just survive it. Surgical fixes, minimal blast radius, brownfield in, brownfield out.

For everything else — single projects through to multi-domain systems — SRDD and SSRDD provide the better balance.

What follows is a breakdown of each approach — its strengths, its limitations, and where it predictably breaks down — followed by a detailed walkthrough of SRDD and SSRDD themselves.

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
  Vibe coding collapses idea → code → output into a single conversational loop. Syntax, plumbing, and boilerplate effectively disappear. Feedback becomes immediate, enabling you to explore functionality in minutes rather than days. For small, self-contained problems, this speed is genuinely transformative.

* **Low-friction creativity.**
  Because you’re not fighting tooling, frameworks, or process, you remain in a high-level creative flow. This makes vibe coding especially effective for UI exploration, proof-of-concepts, demos, and early-stage experimentation — situations where discovering *what* to build matters more than how it is structured.

* **Drudgery elimination.**
  Routine engineering work is overrepresented in model training data. CRUD endpoints, form handling, configuration scaffolding, and common integrations are produced quickly and competently. The AI absorbs the repetitive cognitive load, allowing humans to spend time on differentiation, design intent, and problem framing.

* **Democratisation.**
  Vibe coding lowers the barrier to creation. Designers, founders, and product managers can produce working artefacts without deep technical fluency. When used responsibly, this improves cross-disciplinary communication, reduces translation loss, and allows ideas to be tested in code rather than debated in abstraction.

Vibe coding is unbeatable for **0 → 1**.

### The cons

* **The complexity ceiling**
Vibe coding eventually hits a coherence ceiling. This is partly driven by context window limits, but the failure is neither visible nor well-signalled. LLMs do not warn when earlier assumptions fall out of scope — they simply stop conditioning on them. Larger context windows delay the collapse, but do not prevent it; they often extend the illusion of coherence, pushing regressions further from their cause and making failures harder to reason about. The result is the familiar whack-a-mole loop — not because the model is “bad,” but because architectural memory was never externalised in the first place.
Here’s an expanded, essay-grade treatment of each con that deepens the argument without bloating it or repeating earlier sections. You can drop this straight under the Vibe Coding cons.

* **Invisible technical debt**
  In vibe coding, debt does not accumulate because developers are careless — it accumulates because *no one is looking*. Code is generated in fragments, accepted opportunistically, and rarely revisited with architectural intent. Because there is no externalised model of the system, duplication, leaky abstractions, and accidental coupling emerge gradually and silently. The system appears to move quickly right up until it doesn’t — at which point the cost is no longer incremental. Refactors become risky, fixes cascade unpredictably, and the only visible option is wholesale rewrite. Debt was always present; it was simply never surfaced early enough to be managed deliberately.

* **Security and correctness risks**
  Large language models optimise for plausibility, not for adversarial safety, invariants, or edge-case integrity. In a vibe-coding loop, there is rarely a formal declaration of what *must not* happen — only an informal sense of what “seems right.” This leads to insecure defaults (over-permissive access, missing validation, unsafe deserialisation), fragile assumptions (happy-path logic treated as universal), and correctness gaps that surface only under load or abuse.

  Critically, recognising these failures requires professional experience. Security flaws are often invisible to non-specialists, and correctness bugs frequently masquerade as acceptable behaviour until they are exploited or stressed. Vibe coding lowers the barrier to entry so far that individuals with little or no background in security, systems design, or failure analysis can ship applications used by millions — without understanding the risks they have encoded. The danger is not malice; it is invisibility. Problems are present from day one, but only become obvious to those trained to look for them.

* **Auditor fatigue**
  Reviewing AI-generated code is not equivalent to reviewing human-written code. Humans compress intent when they write; AI expands it. The result is large volumes of syntactically correct but semantically diffuse output. Developers are forced to read more code, hold more state in their heads, and infer intent that was never explicitly declared. Over time, this leads to a subtle but dangerous shift: reviews become superficial, approvals become habitual, and “looks fine” replaces understanding. Teams stop building systems and start rubber-stamping artefacts they did not truly author.

* **Non-reproducibility**
  Without specifications, structured context, or stable contracts, vibe coding is inherently non-deterministic. The same prompt, run days or weeks apart, may yield different abstractions, naming schemes, or architectural decisions — not because requirements changed, but because the statistical path through the model did. This fragility undermines collaboration: teammates cannot reliably reproduce or extend work, onboarding becomes archaeology, and long-term maintenance turns into guesswork. The system’s shape becomes an accident of timing rather than a consequence of intent.

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
Skeletons and selective retrieval dramatically reduce token usage. Smaller, higher-signal contexts not only cost less, they often produce *more accurate* outputs by avoiding “lost in the middle” failures, where LLMs weight the beginning and the most recent end of the context window more heavily, causing architectural decisions and constraints in between to be silently dropped as conversations grow — without warning or explicit failure signals.

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

## 4. Spec-Driven Development (SDD)

### What it is

Spec-Driven Development (SDD) is a spec-first methodology designed to produce software with high certainty, traceability, and auditability. The specification is treated as the primary artefact of intent: requirements, constraints, and behavioural guarantees are articulated explicitly and used to drive implementation. The human role is not simply to “build features”, but to formalise what must be true, verify that the resulting system matches it, and maintain a defensible trail of why the system behaves as it does.

Modern Spec-Driven Development makes this practical by formalising software development around **continuously synchronised specifications**.

In contemporary SDD, the specification and the codebase exist in a bidirectional relationship. The spec is not a static document, nor merely an input to generation. Instead, it is a living artefact that is actively reconciled with the implementation. AI agents generate code from the spec, detect divergence as development proceeds, and update the specification to reflect reality when change occurs.

This spec ↔ code synchronisation is foundational. It allows SDD to maintain traceability while tolerating controlled evolution. Requirements, architectural decisions, and behavioural guarantees remain preserved as first-class artefacts, while AI handles the mechanical work of keeping them aligned with the implementation.

In practice, SDD treats the AI less like a pair programmer and more like a compiler for intent — one that continuously verifies that what exists matches what was declared.

This posture is intentional. SDD optimises for certainty.

### Why sync exists

This was not always the case.

Early forms of Spec-Driven Development assumed a **one-way flow**: specification first, code second, and never the reverse. The spec was authoritative; the implementation was disposable. Any change to behaviour required prior modification of the specification.

While conceptually pure, this model collapsed under real-world pressure.

It suppressed exploratory development, punished learning-through-implementation, and forced teams into **Big Design Up Front** simply to make progress. Developers either abandoned the methodology when reality diverged, or quietly modified code and backfilled the spec later — eroding trust in the very artefact meant to provide certainty.

Spec ↔ code synchronisation emerged as a corrective to this failure.

By allowing controlled reverse sync, modern SDD preserves auditability without prohibiting reality. Drift is surfaced explicitly rather than hidden. Documentation remains truthful. The system stays inspectable.

But the underlying philosophy remains unchanged.

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

### Failure modes

The limitations of SDD emerge precisely where software becomes uncertain.

**Reintroduces Big Design Up Front:**
Even with synchronisation, SDD still requires correctness to be formalised early, because the specification remains the authoritative artefact. This mirrors the core assumption of Waterfall: that complex systems can be fully and accurately described before meaningful experience exists. Sync does not alter that premise — it merely constrains how far the implementation is allowed to diverge from an early formalisation.

Discovery is not eliminated; it is deferred. Understanding still arrives late, but the cost of revising foundational assumptions is higher because the system must be reconciled back into a pre-existing specification. What appears as flexibility is, in practice, controlled deviation within a design that was fixed too soon.

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

This mirrors a familiar pattern already visible in AI-generated art. As models train increasingly on their own outputs, variance collapses. Novelty erodes. The work converges toward a safe, statistically defensible centre. Texture, risk, and idiosyncrasy are averaged away until what remains is technically coherent but aesthetically flat — the oft-invoked image of everything drifting toward the same muted, featureless form.

SDD exhibits the same gravitational pull. When generation is driven exclusively by prior specifications and statistically common patterns, each new system reinforces the last. Architectural decisions harden into defaults. Interfaces converge. Systems stop reflecting the peculiarities of their context and instead resemble the accumulated median of what has come before.

The danger is not incorrectness.
It is homogenisation.

Over time, SDD does not merely prevent surprise — it systematically removes the conditions under which genuinely new structure, interaction, or architecture can emerge.

## SRDD: The Missing Loop

Spec-Roundtrip Driven Development (SRDD) is a development methodology designed for AI-assisted systems that must evolve over time without losing coherence, intent, or professional judgment. It was created in response to a recurring failure mode across modern AI coding approaches: understanding flows in one direction, while systems grow in another.

In SRDD, specifications, code, tests, and operational reality form a **closed loop**. Specs inform implementation, implementation reshapes understanding, and that understanding is periodically captured back into renewed specifications. The system is not treated as something to be generated once and maintained defensively, but as something to be **actively developed** — with intent revisited, designs refined, and direction reasserted as the system grows.

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

Regeneration is not acceptance of the system as it is.  It is not a rationalisation of accumulated **technical debt**, nor a quiet agreement to live with architectural drift because it has become inconvenient to confront.

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

## The SRDD Workflow

### Phase 1: Design

Phase 1 establishes *intent*. It is where understanding is shaped, clarified, and made explicit **before** implementation hardens around it.

In an initial build, Phase 1 starts from a blank slate.
In subsequent iterations or regeneration cycles, it is informed by everything learned since the last design — including production evidence captured in `07-NextCycle.md`.
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

This document captures production discoveries, unresolved tensions, candidate contracts, and signals of architectural drift. It does not prescribe solutions — it informs what must be reconsidered.

---

### 00-PLANNING.md

`00-PLANNING.md` captures the initial brain dump.

Using a structured questionnaire, the developer and AI work through the problem space: what is being solved, who has the problem, why now, and what constraints exist. In regeneration cycles, this document also reflects on what the system has become — including shortcuts taken, assumptions invalidated, and lessons learned.

This document is deliberately rough. Its purpose is **breadth, not precision**. Everything goes on the table before refinement begins.

---

### 01-REQUIREMENTS.md

`01-REQUIREMENTS.md` distils the planning document into formal requirements.

Functional requirements describe what the system must do. Non-functional requirements capture performance, security, reliability, scalability, and operational constraints. MoSCoW prioritisation happens here: must have, should have, could have, won't have.

In regeneration cycles, requirements may be:

* reaffirmed
* modified
* retired
* or newly introduced based on production evidence

This makes change explicit rather than accidental.

---

### 02-USECASES.md

`02-USECASES.md` translates requirements into concrete user stories with acceptance criteria.

Each use case follows a consistent structure:

* *As a* [role]
* *I want* [capability]
* *So that* [benefit]

Acceptance criteria define what "done" means in observable terms. These criteria become the authoritative source for functional and integration tests in later phases.

Importantly, **use cases are not written during production**. They are derived deliberately here — often directly from discoveries captured in `07-NextCycle.md`.

---

### 03-QA-SESSION.md

`03-QA-SESSION.md` preserves the conversation.

As the AI generates and refines the preceding documents, questions naturally arise: edge cases, ambiguities, unstated assumptions, conflicting goals. This transcript captures the back-and-forth — including corrections, disagreements, and rationale.

This document exists to preserve **decision context**, not to enforce outcomes. It becomes invaluable during regeneration, when past intent must be re-understood rather than re-imagined.

---

### 04-ARCHITECTURE.md

`04-ARCHITECTURE.md` defines the technical approach.

It documents:

* component boundaries
* data models
* API surfaces
* integration patterns
* technology choices and constraints

This is where professional architectural judgment matters most. The goal is not novelty, but coherence — ensuring the AI does not default to generic or statistically common patterns that are misaligned with the system's actual needs.

**Canonical patterns are established here.** Decisions about how the system handles logging, error handling, configuration, and other cross-cutting concerns should be explicit. These patterns become what the AI will replicate throughout implementation. Contradictions introduced later are harder to correct than conventions established early.

See: *Principles → Designing for AI Comprehension*

---

### 05-IMPLEMENTATION.md

`05-IMPLEMENTATION.md` breaks the work into phases.

What is built first? What depends on what? What can safely be deferred?

This document informs issue creation, but the backlog remains intentionally lean. Only a small number of high-level issues are created initially. Additional issues emerge organically as understanding deepens.

Momentum is preserved by keeping the queue short.

---

### 06-TESTPLAN.md

`06-TESTPLAN.md` defines the testing strategy across all layers:

* unit
* integration
* functional

It clarifies what each layer is responsible for, what constitutes a contract, and what data is required to exercise the system meaningfully. It also specifies how test data will be generated or sourced.

Tests are not written here — but the **authority and scope of tests** is.

---

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
`07-NextCycle.md` records evidence and intent — not solutions.

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
They are not informal expectations — they are **deliberate commitments**.

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

#### Layered Tests, Distinct Responsibilities

SRDD uses layered tests, not to duplicate coverage, but to assign **jurisdiction**:

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

Internal structure — classes, modules, helpers, private methods — is intentionally *not* protected by tests unless it expresses a contract.

This is a feature, not a limitation.

#### Internal Freedom, External Stability

SRDD draws a sharp boundary:

* **Outside the contract:** stability is mandatory  
* **Inside the boundary:** evolution is encouraged

Refactors, restructures, and architectural shifts are allowed — even expected — as long as contractual tests continue to pass.

This resolves a long-standing tension in software design: private methods remain private, cohesion is preserved, and test suites do not calcify internal structure. Velocity is maintained without eroding guarantees.

The system becomes **stable where it must be**, and **fluid where it can be**.

#### The AI as Scope Guardian

During implementation, the AI plays a non-negotiable role: **scope guardian**.

Its responsibilities include:

* Preventing feature creep within an issue
* Detecting when a proposed change alters a contract
* Asking explicit questions when a boundary is crossed:
  > "This change affects a public API. Should this be versioned?"
* Offering to create new issues for out-of-scope ideas
* Refusing to silently "just add one more thing"

This matters because AI-assisted development **amplifies opportunism**.

When implementation becomes cheap, fast, and frictionless, the cost of *just adding one more thing* collapses. Ideas that would normally be deferred — "while we're here", "it's only a small change", "we can tidy this up later" — are acted on immediately. The AI does not push back. It does not feel scope creep. It executes.

Developers recognise this instinct instantly. A feature almost works, so you extend it slightly. A function is already open, so you add a parameter. A test is failing nearby, so you broaden its responsibility. None of these decisions are irrational in isolation. In aggregate, they erode boundaries.

AI accelerates this dynamic. What used to take minutes now takes seconds. What once required intent now happens by momentum. The system drifts not because of negligence, but because the path of least resistance becomes irresistible.

SRDD treats this not as a moral failing, but as a structural risk.

By enforcing issue boundaries and making the AI explicitly responsible for guarding scope, SRDD introduces friction *where it matters most*. The AI is required to ask: "Is this still the same commitment?" If not, it offers to create a new issue, defer the change, or force an explicit decision.

This restores a discipline that velocity quietly erodes: the habit of choosing what *not* to do next.

SRDD deliberately counters that by enforcing discipline at the issue boundary.

#### The AI as Pattern Follower

The AI has a second responsibility during implementation: **following established patterns**.

Canonical patterns — for logging, error handling, configuration, naming, and other cross-cutting concerns — are defined in `04-ARCHITECTURE.md`. The AI must replicate these patterns, not invent alternatives.

When the AI deviates from an established pattern, **correct it immediately**. Deviations that slip through become examples the AI will repeat. The codebase teaches by demonstration; every inconsistency introduced is an inconsistency that will propagate.

This means:

* If the project uses a specific logging approach, the AI uses that approach
* If error handling follows a defined structure, new errors follow the same structure
* If naming conventions exist, new code matches them

Prefer explicit, well-named abstractions. `logAuditEvent()` is better than `log()`. `fetchUserById()` is better than `getUser()`. Names that reveal intent help both humans and AI understand what "right" looks like.

Pattern deviation is not a moral failing — it is a signal. It may indicate:

* The AI lacks sufficient context (add to rules or provide examples)
* The established pattern is unclear (clarify in ARCHITECTURE.md)
* The pattern itself needs revision (make this explicit, not accidental)

See: *Principles → Designing for AI Comprehension*

#### Why This Matters

Left unchecked, opportunistic change does not fail loudly. It succeeds quietly — one small improvement at a time — until the system no longer has clear edges. Tests begin to reflect internal structure rather than external guarantees. Contracts blur. Refactors become risky not because the code is complex, but because no one is certain what is still promised.

At that point, regeneration becomes guesswork. Understanding has decayed faster than the code itself.

With SRDD's structure in place, the opposite occurs. Behavioural guarantees are made explicit and defended deliberately. Change is forced to declare itself. Regeneration starts from evidence rather than intuition, and each cycle compounds understanding instead of eroding it.

This is what makes SRDD scalable — not just across codebases, but across time.

The developer dreams. The AI disciplines.

### Phase 3: Review

Pull requests are not just a delivery mechanism in SRDD; they are a **decision record**.

Every PR captures a moment where intent met reality. In many cases, it records trade-offs: alternatives that were considered or rejected, constraints that surfaced late, or shortcuts that were consciously tolerated. These decisions are often too contextual, too situational, or too nuanced to justify formal documentation at the time — but they matter later.

In other cases, the PR is far more explicit. It may be the moment where a contract is defined, tightened, or deliberately changed. An API boundary is clarified. A behavioural guarantee is enforced through a new test. A breaking change is versioned rather than smuggled through. In these moments, the PR is not just descriptive — it is **constitutive**. It establishes what the system now promises.

Whether implicit or explicit, the PR marks the point at which uncertainty becomes commitment.

PRs preserve this context implicitly:

- Why a boundary was moved or reinforced
- Why a shortcut was accepted — or explicitly rejected
- Why an interface took its current shape
- Why a test defines a guarantee broadly rather than narrowly

The review conversation, commit history, and diff together form a lightweight narrative of how the system actually evolved — not how it was originally imagined.

This history becomes critical during regeneration. When the AI synthesises a new spec from the living system, PRs provide the missing "why" that code alone cannot explain. They surface intent that was never formalised, constraints that were discovered late, and decisions that lived temporarily in human judgment.

Without this trail, regeneration risks erasing hard-won knowledge. With it, SRDD can distinguish between accidental drift and deliberate adaptation.

PRs do not just close issues.
They preserve reasoning.
That preservation is what allows understanding to compound rather than reset between cycles.

#### Review for Coherence, Not Just Correctness

The AI can determine whether code works. That is not the reviewer's primary job.

The reviewer's responsibility is to assess whether the code **fits** — whether it coheres with the system's architecture, follows established patterns, and avoids introducing long-term complexity.

Review for:

* **Architectural coherence** — Does this change respect existing boundaries? Does it introduce new dependencies that weren't discussed?
* **Pattern conformance** — Does the implementation follow the canonical patterns defined in ARCHITECTURE.md? Or has the AI introduced a variation?
* **Naming and abstraction** — Are new functions, classes, and modules named in ways that reveal intent? Will the AI (and future developers) understand what "right" looks like from these examples?
* **Contractual impact** — Does this change affect a public API, event, or guarantee? If so, is that change explicit and versioned?

Correctness is necessary but insufficient. A PR can pass all tests and still degrade the system's coherence. The reviewer is the last line of defence against pattern drift.

If the AI has deviated from an established pattern, this is the moment to catch it. Every deviation that merges becomes an example the AI will follow next time.

See: *Principles → Designing for AI Comprehension*

### Phase 4: Production

Production is where SRDD validates intent against reality.

Deployment is not treated as the end of development, but as the moment when assumptions are finally exposed to real conditions. The system is exercised using **real data, real permissions, real workflows, and real constraints** — not sanitised environments optimised to pass automated checks.

Automated tests have already established correctness. Production exists to establish *fitness*.

#### User Acceptance Testing (UAT)

In SRDD, UAT is not a ceremonial sign-off. It is a **deliberate confrontation with reality**.

UAT asks a different question from tests:

> *Does the system behave acceptably in the world it actually inhabits?*

This is where qualitative judgment enters the loop. Performance may meet metrics but still feel slow. A workflow may be logically correct but cognitively awkward. An edge case may be rare but unacceptable. These are not failures of correctness; they are failures of fit.

SRDD treats this feedback as first-class evidence.

When UAT surfaces an issue:

- It is never patched opportunistically
- It is never folded back into a closed issue
- It always becomes a **new issue**, with its own scope, intent, and lifecycle

Old issues are never reopened.

This is a deliberate rule. Reopening an issue implies that the original work was incomplete or incorrect. In SRDD, production findings are understood as discoveries that could not have been known earlier. They represent new learning, not execution failure.

Each new issue:

- Captures production context explicitly
- Enters the standard SRDD cycle
- Receives its own tests and review
- Preserves the historical truth of prior decisions

#### Making Implicit Contracts Explicit

Crucially, UAT often reveals **implicit contracts** — behaviours users depend on that were never formally encoded. These are not traditional bugs. They are expectations that emerged through use rather than design.

The trigger is almost always human.

A user, product owner, or developer notices a behaviour and says some version of:

- "Oh — actually, I expect this to do *that*."
- "If this ever changed, it would break how I use it."
- "We rely on this, even though it isn't documented."

SRDD treats these moments as signals, not interruptions.

At that point, the AI's role is not to infer intent, but to **force clarification**. It prompts an explicit decision:

- Is this behaviour something we want to guarantee going forward?
- Is it context-specific, or system-wide?
- Should it remain stable, or be versioned or constrained?

If the answer is yes, the behaviour is promoted from expectation to contract by:

1. Creating a new issue that describes the behaviour in user or system terms
2. Encoding it as a failing functional or integration test
3. Updating documentation or specs to reflect the newly recognised guarantee
4. Implementing only what is required to make that guarantee explicit

At that point, the behaviour is no longer tribal knowledge. It is enforced, reviewable, and visible to both humans and AI.

If the answer is no, the rejection is captured just as deliberately. The behaviour remains unsupported, and the system is free to change without preserving it.

In both cases, ambiguity is resolved consciously.  
Nothing remains implicit by accident.

#### Production Discoveries as AI Curriculum

When implicit contracts become explicit, they also become **examples the AI will learn from**.

The test you write to encode a guarantee becomes a pattern for future tests. The implementation you create becomes a reference the AI will follow. The naming you choose — for functions, events, error types — shapes what the AI considers "right" in similar contexts.

This means production discoveries do more than stabilise the system. They **teach** the system.

Sloppy formalisation creates sloppy precedents. A hastily-named function or inconsistent error structure will propagate. Careful formalisation creates clarity that compounds: future AI-generated code will pattern-match on well-structured examples.

When making implicit contracts explicit:

- Follow established patterns from ARCHITECTURE.md
- Use names that reveal intent, not just function
- Structure tests consistently with existing contract tests
- Treat this as curation, not just correction

See: *Principles → Designing for AI Comprehension*

#### Production as Evidence

Production is therefore not a destination.  
It is a **source of evidence**.

That evidence feeds the next iteration — or, when accumulated signals indicate deeper drift, the next regeneration cycle.

### Phase 5: Iterate or Regenerate

Most development in SRDD is iterative.

Features are added, behaviours refined, and capabilities extended by selecting the next issue and returning to Phase 2. This is the normal mode of progress. Systems grow through deliberate, bounded change, with contracts preserved and understanding compounding over time.

Regeneration is not the default.  
It is the exception.

#### Watching for Spaghettification

As development proceeds, the AI actively monitors for signs that the system's structure is beginning to degrade — not because of negligence, but because accumulated change has outpaced architectural clarity.

These signals are collectively referred to as **spaghettification**, and they tend to surface gradually:

- **Duplicated logic:** Similar behaviour implemented in multiple places with slight variations
- **Circular dependencies:** Components that cannot be reasoned about in isolation
- **Whack-a-mole regressions:** Fixes in one area repeatedly break others
- **God modules:** Classes or services that accumulate disproportionate responsibility
- **Velocity decay:** Simple changes take longer than expected
- **Hedging language:** Phrases like "this might break something" or "I'm not entirely sure"
- **Pattern inconsistency:** The same concern (logging, error handling, configuration) implemented multiple ways across the codebase

None of these indicate failure.  
They indicate **misalignment between intent and structure**.

Pattern inconsistency deserves particular attention. When the AI encounters contradictory examples, it cannot determine which is "right." It pattern-matches on whatever is in context — which may not be the canonical approach. This creates a feedback loop: inconsistency breeds inconsistency, accelerating drift.

#### Advising Regeneration

When these signals accumulate, the AI does not attempt to quietly compensate with increasingly fragile fixes. Instead, it surfaces the pattern explicitly and advises regeneration.

This is not an automated action. It is a recommendation.

The AI explains what it is observing, why incremental change is becoming costly, and which parts of the system appear most affected. The decision to regenerate remains human.

Regeneration is chosen when the cost of continued patching exceeds the cost of reorientation.

That choice is never trivial.

The analytical part is fast, as expected. The AI can synthesise intent, contracts, drift, and decision history quickly. What follows is not. Regeneration almost always implies **substantial change**, because the recommendation is rarely cosmetic. It is typically driven by architectural misalignment — boundaries that no longer hold, responsibilities that have collapsed inward, or contracts that have accreted implicit behaviour without structure.

Once regeneration begins, affected parts of the system are rewritten deliberately. This is not incremental refactoring. It is controlled reconstruction.

Depending on the size of the system, how long it has evolved since the last regeneration, and how far it has drifted from its original expectations, returning to feature parity can take days — sometimes a week. That time is real cost. SRDD does not pretend otherwise.

What it offers in return is clarity.

The regenerated system is clean. Architectural intent is explicit again. Implicit requirements surfaced during iteration and UAT are captured as contracts and tests. Technical debt is no longer woven invisibly through the codebase; it is either resolved or consciously accepted.

Most importantly, velocity returns — and with it, confidence. Development after regeneration is faster, more predictable, and more satisfying. Changes no longer feel precarious. The system can once again be reasoned about as a whole.

Regeneration is not a shortcut.
It is an investment.

SRDD treats that investment as a normal, planned phase in the life of a system — not a last resort taken when everything has gone wrong.

The alternative is familiar.

In large, long-lived systems — especially those built by many developers over time — architectural drift is rarely confronted head-on. Instead, it is managed defensively. Code becomes brittle. Knowledge fragments. Boundaries blur. Entire areas of the system acquire reputations: *"Don't touch that,"* *"No one really knows how this works,"* *"It breaks if you look at it wrong."*

Organisations attempt to compensate through process.

The only reliable way to prevent collapse in such systems is an increasingly onerous emphasis on exhaustive testing. Every change must be defended by more tests. Every edge case must be locked down. This is rational — but expensive.

Writing tests by hand is time-consuming, repetitive, and cognitively draining. It is rarely the work developers are motivated by, and often the first thing deferred under pressure. Over time, test suites grow unevenly: critical paths are over-tested, obscure behaviours remain implicit, and large areas of the codebase exist in a grey zone of partial coverage and collective anxiety.

The result is stagnation.

Code that developers are uncertain about is not improved. It is avoided. Bugs persist not because they are unsolvable, but because touching the surrounding code feels too risky. Architectural debt compounds quietly, protected by fear rather than intention. Velocity slows — not because the team lacks skill, but because confidence has eroded.

SRDD offers a different trade.

Rather than relying on ever-expanding defensive test suites to prop up brittle structure, SRDD periodically restores architectural clarity through regeneration. Tests remain essential — but they defend *contracts*, not accumulated uncertainty. The system is made comprehensible again, not merely survivable.

This is why regeneration, despite its cost, is often cheaper than the alternative.

A week of deliberate reorientation can replace months of hesitant change. A system that can be reasoned about invites improvement. A system that cannot eventually resists it.

SRDD does not promise perpetual cleanliness.
It promises the ability to **recover it**, intentionally and repeatedly, before brittleness becomes destiny.

#### The Regeneration Cycle

Regeneration is a deliberate return to Phase 1 — informed by everything that has been learned, and undertaken with full awareness of its cost.

The analytical phase is fast. The AI synthesises a new set of planning artefacts by analysing:

- The current codebase (what exists)
- The existing test suite (what is guaranteed)
- Issue history (what was discovered through use)
- Pull requests (why decisions were made)
- Previous specs (what was originally intended)

What follows is not.

Regeneration is rarely cosmetic. Because it is typically triggered by architectural misalignment, it often implies **substantial rewriting** of affected parts of the system. This is intentional. Incremental patching is no longer sufficient; structure must be realigned with intent.

The result is not a rollback.  
It is a reset of *understanding* — and a re-assertion of direction.

A new dated plan is produced, explicitly capturing:

- What the system actually is
- Which contracts and behaviours remain valid
- What has accumulated as technical debt
- Which assumptions must be corrected
- What should be built next

#### Pattern Hygiene During Regeneration

Regeneration is also the moment to **clean the curriculum**.

Before the next development cycle begins, contradictory patterns must be consolidated. If logging is done three different ways, regeneration decides which is canonical — and eliminates the others. If error handling has drifted, it is realigned. If naming conventions have eroded, they are restored.

This is not cosmetic tidying. It directly affects future velocity.

The AI will pattern-match on whatever exists in the regenerated codebase. Clean, consistent examples produce clean, consistent output. Contradictions left in place will propagate again.

Regeneration therefore includes:

- Identifying cross-cutting concerns with multiple implementations
- Selecting or defining the canonical pattern for each
- Refactoring to consolidate (not just documenting the preference)
- Updating ARCHITECTURE.md to reflect current decisions

The codebase that emerges from regeneration should teach the AI what "right" looks like — unambiguously.

See: *Principles → Designing for AI Comprehension*

#### Resuming Development

From there, development resumes with clearer boundaries, cleaner structure, and restored confidence. Feature parity may take days to recover, but velocity afterwards increases sharply. The system becomes easier to reason about, safer to change, and more satisfying to work on.

Regeneration trades short-term disruption for long-term momentum — and does so deliberately.

#### Why This Works

SRDD does not treat architectural decay as a moral failing or a crisis. It treats it as a natural consequence of sustained progress — especially in systems that grow through real use, changing requirements, and multiple contributors.

By making regeneration an expected and supported move — rather than an admission of defeat — SRDD removes the stigma that causes teams to avoid structural correction. Refactoring stops being a desperate rescue operation performed under pressure and becomes a deliberate design activity undertaken with intent.

Iteration grows the system.  
Regeneration realigns it.

Together, they prevent the slow hardening that turns living systems brittle. Boundaries remain intelligible. Confidence is preserved. Change remains possible even as systems scale in size, age, and ambition.

And perhaps most importantly, SRDD preserves the role of the developer.

As AI reshapes employment models and commoditises large portions of implementation work, developers remain valuable not because they type code, but because they **invent, imagine, and choose direction**. SRDD deliberately assigns mechanical execution to machines and reserves judgment, taste, and intent for humans. Developers are no longer paid to wrestle brittle systems or memorise tribal knowledge — they are paid to design futures, recognise when something feels wrong, and steer systems toward what they should become next.

In a world where AI can generate endlessly, SRDD ensures that humans still decide *why*, *where*, and *whether*.

---

## The Regeneration Cycle

This is the roundtrip.

Regeneration is the moment where SRDD closes the loop between intent and reality — not by rewinding time, but by **rebuilding understanding**.

The AI re-synthesises a coherent picture of the system from multiple sources of truth:

* the **current codebase** (what actually exists)
* **prior planning documents** (what was intended at different points in time)
* **git history** (how and when the system changed)
* **issues and tickets** (what was discovered under pressure)
* the **test suite** (what is contractually protected)

None of these sources is treated as authoritative in isolation. Each is partial, biased, and incomplete. Together, they form a layered record of how the system became what it is.

From this synthesis, the AI produces a **new, dated planning directory** — a refreshed set of artefacts that describe the system as it now stands, not as it was once imagined. This includes:

* an updated model of the system’s boundaries and responsibilities
* an explicit account of preserved contracts
* identified areas of architectural drift
* accumulated technical debt, surfaced rather than rationalised
* open questions and tensions that were previously implicit

This is not a rollback.
It is a reset of understanding.

### Holistic Diagnosis, Selective Intervention

A critical refinement of SRDD is that regeneration is **holistic in diagnosis, selective in intervention**.

The entire system is re-understood end-to-end. Dependencies are traced. Assumptions are re-examined. Interfaces are re-evaluated in light of real usage. Nothing is excluded from analysis.

But redesign is not applied indiscriminately.

Only subsystems that exhibit clear signs of drift — structural incoherence, brittle contracts, runaway complexity, or mismatched responsibilities — are candidates for redesign. Components that remain cohesive, well-bounded, and stable are **explicitly left alone**.

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

That understanding is externalised into artefacts that future humans — and future AI sessions — can reason from. Knowledge stops evaporating when developers leave, teams change, or time passes.

Instead of entropy winning by default, insight accumulates.

Iteration grows the system.  Regeneration realigns it.

That is the roundtrip — and it is why SRDD scales not just across codebases, but across years.

---

## Scaled SRDD (SSRDD)

For systems that extend beyond a single bounded context, SRDD scales into **Scaled SRDD (SSRDD)**.

SSRDD is not a new methodology layered on top of SRDD. It is a coordination wrapper that allows **multiple independent SRDD loops** to coexist without collapsing into chaos or bureaucracy.

Each domain, service, or subsystem:
* owns its own planning artefacts
* runs its own SRDD cycles
* evolves at its own pace
* regenerates when its local signals demand it

No central plan attempts to predict how the whole system should evolve.

Instead, SSRDD introduces just enough structure at the **system boundary** to allow independent evolution without accidental entanglement.

### System-Level Coordination

At the system level, SSRDD coordinates only what *must* be shared:

* **Shared constitutions**  
  Agreed integration standards that define how domains present themselves to one another — API conventions, event schemas, versioning rules, and compatibility expectations. These govern interaction, not internal design.

* **Explicit contracts**  
  Public-facing APIs, events, and invariants are declared and versioned. Domains are free to change internally as long as these contracts hold or are deliberately evolved.

* **Dependency visibility**  
  What each domain consumes and produces is visible by design. Hidden couplings are surfaced early, before they calcify into architectural traps.

* **Boundary drift detection**  
  SSRDD watches for signs that domain boundaries are eroding — duplicated responsibilities, circular dependencies, creeping knowledge of internals — and flags these as candidates for regeneration or boundary renegotiation.

Crucially, SSRDD does **not** synchronise development cadence, force shared tooling, or impose uniform internal practices. It coordinates *interfaces and intent*, not implementation.

SSRDD scales **understanding**, not bureaucracy.

---

## Why SRDD Works

SRDD succeeds because it aligns with how complex systems *actually* evolve — not how we wish they would.

* **It acknowledges discovery**  
  SRDD assumes that important knowledge arrives late. Instead of treating this as failure, it builds discovery into the process and gives it a disciplined place to land.

* **It prevents specs from becoming fiction**  
  Specs are continuously regenerated from reality, not left to rot as idealised narratives disconnected from the system that ships.

* **It manages AI-induced technical debt at the design level**  
  AI accelerates both construction and decay. SRDD counters this not by slowing AI down, but by periodically reasserting architectural intent before debt becomes destiny.

* **It preserves tacit product wisdom**  
  Decisions that would otherwise live only in heads or pull requests are captured, externalised, and made legible to both humans and machines.

* **It restores human judgment where it belongs**  
  AI executes, analyses, and enforces. Humans choose direction, recognise discomfort, and decide when a system needs to change course.

SRDD is not the fastest way to write code.

It *is* the fastest way to keep understanding intact — as systems grow, teams change, and years pass.

### Boundary Enforcement via Dependency Permissions (SSRDD)

SSRDD does more than coordinate domains. It can **enforce architectural boundaries**.

The core rule is explicit:

> **If a domain does not declare that it consumes another domain, it cannot see it.**

This model is closely analogous to **Project Jigsaw (Java 9+)**.

Like Jigsaw, SSRDD treats boundaries as **design-time and compile-time constraints**, not as informal conventions. Domains must explicitly declare what they depend on and what they expose. Everything else is inaccessible by default.

#### Explicit dependency declarations

Each domain declares its dependencies in `contracts/consumes.yaml`:

```yaml
consumes:
  - identity-management/api-users
  - inventory/api-stock
```

#### Controlled evolution of dependencies

In practice, dependency permissions in SSRDD are not universally mutable.

Domain developers typically **do not have direct write access** to the system-level SSRDD artefacts that define cross-domain dependencies — such as the shared constitution or dependency registry. Their focus remains local: implementing behaviour within declared boundaries.

Changes to domain dependencies are instead mediated at the system level, typically by architects or designated system stewards.

This mirrors the intent of Project Jigsaw: module boundaries are not something individual classes casually rewrite. They are **structural decisions**, owned at a higher level of abstraction.

#### Why this separation matters

Without this separation, boundaries decay quietly:

- A developer “just imports” another domain to save time
- A quick integration bypasses the contract layer
- A dependency is added for convenience and never removed
- Architectural coupling becomes invisible until it is irreversible

AI-assisted development amplifies this failure mode. When generation is cheap and fast, the path of least resistance is always cross-boundary access.

SSRDD deliberately resists this by making dependency changes **explicit, reviewable, and intentional**.

Developers still move quickly within their domain.
They simply cannot *accidentally* change the shape of the system.

#### Architectural control without architectural bottlenecks

This is not about slowing teams down.

By centralising dependency authority:
- Domains remain autonomous within their scope
- Integration decisions are made with system-level visibility
- Boundary changes become conscious design moments
- Regeneration remains feasible because coupling stays controlled

The result is not bureaucracy — it is **preserved optionality**.

Architects are not approving code.
They are curating the *shape* in which code is allowed to grow.

SSRDD enforces boundaries the same way strong type systems enforce correctness:
not by trust, but by making the wrong thing impossible.

---

## Principles

*The principles that follow were crystallised in part through reflection on Craig Adam's article "[Agile is Out, Architecture is Back](https://medium.com/@craig_32726/agile-is-out-architecture-is-back-7586910ab810)" — a clear articulation of why architecture matters more, not less, in the age of AI-assisted development. His framing of the codebase as curriculum and the developer's evolving role helped sharpen what SRDD was already reaching toward. Thank you.*

The five phases describe *what* happens in SRDD. This section describes *why* certain patterns recur across all of them.

These principles are not rules to be enforced. They are orientations — ways of thinking that make AI-assisted development more effective, more sustainable, and more aligned with human intent.

### Designing for AI Comprehension

> Your codebase is a curriculum. Every pattern teaches the AI what to repeat. Contradictions create confusion. Consistency creates velocity.

The AI learns your project not from training, but from context. It reads your existing code and generates more code that looks like it. This has profound implications.

**Rules files instruct. Code demonstrates.**

Your CLAUDE.md, cursor rules, and similar files tell the AI what to do. Your codebase *shows* what "right" looks like. Both matter — but when they conflict, the AI often follows what it sees over what it's told.

If your codebase contains:

- Multiple logging implementations → AI picks one randomly or invents another
- Inconsistent error handling → AI generates inconsistent error handling
- Mixed naming conventions → AI outputs mixed naming
- God classes alongside clean modules → AI might follow either pattern

The AI does not judge which pattern is correct. It pattern-matches on what exists.

**This principle is LLM-agnostic.** Every AI coding tool — Claude Code, Cursor, Copilot, Windsurf, and tools not yet built — reads your codebase into context. Keep your codebase clean and consistent because the AI will copy what it sees.

**Applying this across SRDD:**

| Phase | Purpose | Application |
|-------|---------|-------------|
| Phase 1 | Establish intent | Define canonical patterns in ARCHITECTURE.md before implementation begins |
| Phase 2 | Build it | Correct deviations immediately; uncorrected deviations become new patterns |
| Phase 3 | Check fit | Review for pattern conformance, not just correctness |
| Phase 4 | Validate reality | Formalise production discoveries carefully; they become future examples |
| Phase 5 | Realign or continue | Consolidate contradictory patterns during regeneration |

### Guardrails Beyond Tests

> Use types, linters, schemas, and structure not just to enforce correctness — but to communicate intent.

Tests verify behaviour after the fact. Guardrails prevent bad patterns from entering in the first place. They operate earlier in the feedback loop, and they constrain what the AI can produce.

**Types as documentation:**
Strong typing (TypeScript, Zod schemas, Pydantic models) constrains AI output at generation time. A well-typed function signature tells the AI what shapes are valid before it writes a line of implementation.

**Linters as guardrails:**
ESLint rules, Prettier configurations, and architectural linters (like eslint-plugin-boundaries) reject code that violates conventions automatically. The AI learns quickly that certain patterns don't survive.

**Schemas as contracts:**
OpenAPI specs, JSON Schema, and similar declarations make contracts machine-readable. The AI can validate its output against them — and tools can reject non-conforming code before review.

**Folder structure as architecture:**
Where code lives communicates what it is. A clear directory structure — with boundaries that match domain concepts — helps the AI place new code appropriately. Ambiguous structure produces ambiguous placement.

**These guardrails are not bureaucracy.** They are force multipliers. Every constraint that prevents a bad pattern from entering is a constraint that doesn't need to be caught in review, fixed in testing, or cleaned up during regeneration.

Guardrails encode judgment structurally — not just in documentation.

### Encode Judgment, Don't Just Document It

> Structure that enforces decisions is stronger than documentation that describes them.

Documentation can be ignored. Structure cannot.

When a decision matters — when violating it would cause drift, inconsistency, or architectural decay — encode it in a way that makes violation difficult or impossible:

- **Use folder boundaries** to enforce module separation, not just naming conventions
- **Use types** to make invalid states unrepresentable, not just documented as "don't do this"
- **Use linter rules** to reject patterns automatically, not just style guides that request compliance
- **Use CI checks** to fail builds on violations, not just code review comments

The AI reads structure more reliably than prose. A linter rule that rejects a pattern is more effective than a CLAUDE.md instruction that discourages it.

This does not mean documentation is worthless. It means documentation is for *explanation*, not *enforcement*. Explain the "why" in docs. Enforce the "what" in structure.

**The test:** If the AI could violate a decision and still produce code that passes all checks, the decision is not yet encoded. It is merely suggested.

### Coherence Over Correctness

> Correct code that doesn't fit is worse than imperfect code that coheres.

The AI can produce code that works. That is table stakes. The harder problem is producing code that *fits* — that respects existing boundaries, follows established patterns, and doesn't introduce architectural debt.

A function can pass all tests and still:

- Use a different logging approach than the rest of the system
- Handle errors in a novel way that won't be replicated
- Introduce a dependency that violates layering
- Name things inconsistently with surrounding code

These are not test failures. They are coherence failures. They make the system harder to understand, harder to maintain, and harder for the AI to pattern-match correctly in future.

**The reviewer's job is coherence.** The AI handles correctness. The human ensures fit.

This requires architectural awareness — understanding not just whether the code works, but whether it belongs. That awareness is precisely what distinguishes a developer from a code generator.

### The Developer Dreams, The AI Disciplines

> Humans are for invention, imagination, and direction. Machines are for execution, analysis, and consistency.

SRDD deliberately assigns roles:

**The developer:**
- Decides what to build and why
- Makes architectural judgments
- Recognises when something feels wrong
- Chooses direction when trade-offs arise
- Dreams futures the AI cannot imagine

**The AI:**
- Executes implementation within constraints
- Guards scope and flags deviations
- Detects spaghettification signals
- Maintains consistency with established patterns
- Synthesises understanding during regeneration

The AI does not dream. It interpolates. It gravitates toward the statistical centre of its training data. Novel architectures, distinctive designs, and opinionated choices must come from humans.

But humans are fallible. They get bored. They take shortcuts. They expand scope opportunistically. The AI provides discipline: holding boundaries, asking clarifying questions, refusing to silently drift.

Neither is sufficient alone.
Together, they compound.

### Specs Are Snapshots, Not Contracts

> Specifications capture understanding at a moment in time. Code becomes the source of truth. Periodically, understanding must be extracted back out.

This is the foundational insight of SRDD.

Traditional spec-driven development treats specifications as authoritative: write the spec, generate the code, update the spec when requirements change. In practice, this breaks down. Code evolves faster than documentation. Implicit behaviours emerge. The spec becomes fiction.

SRDD inverts the relationship. Specs are *inputs* to a cycle, not *outputs* of a process. They capture intent at the start. But as implementation proceeds, the code becomes the real source of truth — informed by production discoveries, implicit contracts, and decisions made under pressure.

The roundtrip is what makes SRDD sustainable:

1. Specs guide initial implementation
2. Implementation reveals what specs missed
3. Production surfaces implicit contracts
4. Regeneration extracts new specs from living code
5. The cycle repeats with compounded understanding

Without the roundtrip, specs drift into irrelevance. With it, understanding compounds instead of decaying.

### Velocity Follows Clarity

> Fast development is not the cause of good systems. It is the consequence of clear ones.

Teams do not ship slowly because they lack skill. They ship slowly because they lack confidence. Confidence erodes when:

- No one is sure what a change might break
- Boundaries have blurred beyond recognition
- Patterns contradict each other
- Tests defend structure rather than contracts
- Tribal knowledge has replaced explicit understanding

SRDD addresses velocity by addressing clarity. Regeneration restores architectural coherence. Contracts make guarantees explicit. Pattern hygiene ensures the AI produces consistent output. Guardrails prevent drift from entering.

The result is not just a cleaner codebase. It is a faster one — because developers (and AI) can act with confidence instead of caution.

Speed is earned, not demanded.

### Summary

| Principle | Core Insight |
|-----------|--------------|
| Designing for AI Comprehension | The codebase teaches the AI what to repeat |
| Guardrails Beyond Tests | Prevent bad patterns earlier than review |
| Encode Judgment, Don't Just Document It | Structure enforces; documentation explains |
| Coherence Over Correctness | Fit matters more than function |
| The Developer Dreams, The AI Disciplines | Humans choose direction; machines maintain consistency |
| Specs Are Snapshots, Not Contracts | Understanding must roundtrip back from code |
| Velocity Follows Clarity | Confidence enables speed |

These principles are not optional.

SRDD's phases, guardrails, and regeneration cycles exist to enforce them — or surface it clearly when they're being violated.

---

## Closing

The industry frames AI-assisted development as a choice between chaos and rigidity. That framing is wrong.

Vibe coding fails because memory collapses and boundaries dissolve. Spec-driven development fails because reality refuses to stay still. SRDD accepts both truths and closes the loop between them.

### What SRDD Enforces

**Specs are snapshots, not contracts.**
Specifications capture understanding at a point in time. Code becomes the source of truth. Periodically, understanding is extracted back out through regeneration.

**The codebase is a curriculum.**
The AI learns from your existing code. Every pattern teaches it what to repeat. Contradictions breed confusion; consistency compounds velocity.

**Guardrails encode judgment structurally.**
Types, linters, schemas, and folder boundaries prevent bad patterns before review. Documentation explains; structure enforces.

**Coherence matters more than correctness.**
The AI determines whether code works. The reviewer determines whether it fits. Correct code that violates patterns degrades the system.

**The developer dreams; the AI disciplines.**
Humans choose direction, make architectural judgments, and recognise when something feels wrong. The AI executes, guards scope, and maintains consistency.

**Velocity follows clarity.**
Fast development is not the cause of good systems. It is the consequence of clear ones. Confidence enables speed.

### At Scale

SSRDD extends these principles across domains:

- Boundaries become explicit
- Dependencies become intentional
- Domains evolve independently without silent entanglement
- Understanding scales — not bureaucracy

### The Core Commitment

AI accelerates everything, including mistakes. SRDD exists to make learning faster than decay.

- Specs deserve a return ticket
- Boundaries deserve enforcement
- Judgment deserves to be structural
- Understanding deserves to survive

SRDD provides all four.

---

© 2025 Brooke Smith. All rights reserved.

This document constitutes a public disclosure and defensive publication of the
Spec-Roundtrip Driven Development (SRDD) and Scaled SRDD (SSRDD) methodologies.

The author expressly places the concepts, processes, and workflows described
herein into the public domain as prior art, for the purpose of preventing
subsequent patent claims or exclusive ownership by third parties.

Commercial use, redistribution, or derivative works of this text require
explicit permission from the author.
