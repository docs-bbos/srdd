# SRDD (Part 2): From Vibe Coding to Regeneration Cycles

See part 1 at 👉 **[https://brooke.medium.com/ssrd-part1](https://brooke.medium.com/ssrd-part1)**

By mid-2025, it became clear that “AI coding” was no longer a single thing.

What started as playful experimentation had hardened into distinct methodologies, each optimising for different trade-offs: speed versus coherence, autonomy versus understanding, structure versus adaptability. The industry conversation, however, kept collapsing these into a false binary — vibe coding versus spec-driven development.

That framing misses what’s actually happening.

## The Emerging Landscape of AI-Assisted Coding

What we’re seeing instead is a spectrum of approaches, each with its own strengths and failure modes.

### 1. Vibe Coding

#### 1) What’s Been Written (Refined)

Vibe coding is the casual extreme of AI-assisted development. You prompt the AI conversationally:

> “Add this feature.”
> “Fix that bug.”
> “Refactor this file.”

It feels magical when it works — and for small projects, it often does. But the moment architectural memory matters, it starts to unravel. Context windows are finite. As systems grow, the AI forgets earlier decisions, repeats mistakes, and implements the same concern three different ways across three different files. Worse, it creates a false sense of confidence: everything appears to work, until it suddenly doesn’t.

Vibe coding shines for:

* small utilities
* scripts and CLIs
* projects that comfortably fit in a single context window

It breaks the moment continuity and system-level understanding are required.

#### 2) What Is the Process?

Vibe coding is intentionally fluid and conversational. There is no formal specification, no curated context, and minimal concern for internal structure.

The loop usually looks like this:

1. **Describe the intent**, not the implementation (“Make this feel slick”, “This UI should pop”).
2. **Accept large AI-generated changes wholesale**, often without reviewing the code.
3. **React to outcomes**, not internals — if something feels off, you prompt again.
4. **Pivot instead of debugging** — swap libraries, rewrite modules, or change direction rather than tracing root causes.

You are trading *structural integrity* for *momentum*. The code is treated as an opaque byproduct, not an artifact to be understood.

#### 3) What Are the Pros?

**Extreme velocity.**
Vibe coding collapses idea → code → output into a single step. Syntax, plumbing, and boilerplate vanish. You can build in minutes what once took days.

**Low friction creativity.**
Because you’re not fighting tooling, you stay in a high-level flow. This makes it ideal for UI exploration, rapid prototyping, and divergent thinking.

**Drudgery elimination.**
Standard tasks — CRUD, scaffolding, setup — are well represented in training data. AI handles the boring 80%, freeing humans to focus on novelty, design, and intent.

**Democratisation.**
Designers, founders, and product managers can produce high-fidelity, living prototypes without deep technical knowledge — often improving communication and alignment.

Vibe coding is unbeatable for **0 → 1**.

#### 4) What Are the Cons?

**The complexity ceiling.**
At a certain size (often shockingly small), the AI loses coherence. Fixes introduce regressions elsewhere. You enter a “whack-a-mole” loop.

**Invisible technical debt.**
Because the code isn’t read or shaped deliberately, problems accumulate silently until they become unavoidable — and expensive.

**Security and correctness risks.**
AI optimises for plausibility, not safety. Without explicit constraints, vibe-coded systems frequently contain insecure defaults and subtle logic flaws.

**Auditor fatigue.**
Reviewing large volumes of AI-generated code is cognitively harder than writing smaller amounts yourself. Developers become exhausted auditors rather than builders.

**Non-reproducibility.**
With no spec or engineered context, results are non-deterministic. Re-running the same prompts later often yields a different architecture — making team collaboration fragile.

Vibe coding is exhilarating — until you have to live with what you shipped.

#### Bottom Line

Vibe coding is the **ultimate 0 → 1 tool**. It is spectacular for prototypes, experiments, and disposable software. It becomes dangerous the moment a system needs to be maintained, reasoned about, or trusted.

Most experienced developers now use it *selectively*: to explore ideas quickly — and then transition to something more disciplined once the idea is worth keeping.

Here’s a tightened, **essay-ready** version of **Agentic Coding**, aligned to the same structure and tone as *Vibe Coding*, and explicitly anchored to **context loss, architectural drift, and professional SE judgment**. I’ve kept your core ideas, removed marketing language, and sharpened the failure analysis.

You can paste this directly as **Section 2**.

---

### 2. Agentic Coding

#### What it is (in practice)

Agentic coding introduces structure and autonomy. Instead of responding to a single prompt, the AI is given a **goal** and allowed to plan, act, verify, and correct itself using tools. The interaction shifts from *chat* to *task*.

In practice, this means the AI operates like a junior engineer with shell access. It explores the repository, edits multiple files, runs builds and tests, installs dependencies, and iterates until its internal success criteria are met. Tools such as Claude Code and Cursor operate in this mode when given multi-step instructions.

Agentic coding feels like leverage. One person can move faster, touch more surface area, and complete work that would normally require multiple engineers. It is widely perceived as a step toward “AI teammates.”

But despite the autonomy, it remains fundamentally **code-first**. The agent reasons over the current state of the repository, not over a durable representation of system intent. Understanding emerges implicitly, if at all.

#### Typical process

Agentic workflows follow a loop rather than a single response:

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

The defining feature is persistence: the agent keeps going until something external forces it to stop.

#### Where it genuinely shines

Agentic coding excels at **operational throughput**.

It is particularly effective for:

* Mechanical refactors across many files
* Dependency upgrades and API migrations
* Test fixing and lint cleanups
* Repetitive implementation work with clear end states

When guardrails are present, it can offload large volumes of “engineering drudgery” and compress delivery timelines dramatically. Used well, it allows experienced engineers to focus on higher-order concerns while the agent handles execution.

#### Failure modes at scale

Agentic coding fails differently from vibe coding—but just as predictably.

**Context loss becomes probabilistic rather than immediate:**
Each step may succeed locally, but longer chains compound error. A task with ten steps and a 95% per-step success rate only succeeds end-to-end about 60% of the time. At enterprise scale, agentic workflows become coin flips.

**Architectural drift accelerates:**
Because the agent optimises for task completion, not system coherence, it introduces local fixes that subtly diverge from architectural intent. Without a stabilising specification, the agent reshapes the system opportunistically. Over time, the codebase becomes a sedimentary record of agent decisions no one fully owns.

**Professional judgment erodes through delegation:**
Reviewing agent output is cognitively expensive. Fifteen-file changesets across multiple modules are harder to audit than human-authored code. Teams adapt by reviewing less rigorously. “Accept All” becomes normal. Understanding decays.

**Autonomy without accountability introduces new risks:**
Agents require broad access—to terminals, file systems, secrets, and cloud resources. This creates a large attack surface. Prompt injection, runaway loops, and cost explosions are not edge cases; they are emergent properties of autonomy.

The net result is speed without stability. Agentic coding delivers output faster than teams can assimilate meaningfully.

#### Verdict

Agentic coding is best understood as **delegated execution**, not delegated responsibility.

It can dramatically accelerate delivery, but it does not preserve intent, prevent drift, or accumulate understanding. Without external anchors, the agent’s loop optimises for *completion*, not *coherence*.

If vibe coding is improvisation and context engineering is discipline, agentic coding is industrialisation—powerful, efficient, and dangerous without brakes.

Used carefully, it is leverage. Used casually, it is entropy at machine speed.

---

### 3. Context Engineering

#### What it is

Context Engineering reframes the AI-coding problem entirely. Success isn’t about better prompts or more detailed specifications; it’s about **controlling what information the model sees, when it sees it, and in what form**.

In the 2025 Thoughtworks Technology Radar, Context Engineering is positioned as a necessary evolution beyond vibe coding — a move from luck and conversational nudging toward a disciplined, production-grade engineering practice. Thoughtworks defines it as the *systematic design and optimisation of the information provided to an LLM during inference*.

The motivation is simple: large language models have finite attention. Dumping entire repositories or long histories into a context window leads to “lost in the middle” effects, higher costs, and worse outputs. More context often makes models *less* reliable, not more.

---

#### The process

Context Engineering typically involves three layers of work:

1. **Context setup (curation)**
   Developers aggressively prune noise and supply only high-signal inputs:

   * *Skeleton trimming* (method signatures, interfaces, API contracts instead of full implementations)
   * *Knowledge priming* using reference architectures or “gold standard” examples
   * Small sets of canonical few-shot examples rather than broad dumps of mediocre code

2. **Context management (long-horizon tasks)**
   Because tasks exceed a single context window, teams introduce structure:

   * AI-maintained scratchpads or `memory.md` files
   * Sub-agent architectures where each agent sees only what it needs
   * Periodic summarisation of prior conversations and decisions

3. **Dynamic retrieval (just-in-time context)**
   Instead of pushing everything upfront, agents pull context only when required:

   * Model Context Protocol (MCP) to access files, logs, APIs, and databases
   * Tools like Context7 to provide version-accurate documentation
   * Repository-level files (`agents.md`, `context.md`) that define architectural ground rules

The guiding idea is abstraction: counterintuitively, removing legacy detail often *improves* AI performance by widening the solution space.

#### The pros

Used well, Context Engineering delivers real benefits:

* **Fewer hallucinations and less context rot**
  By grounding the model in curated constraints, the AI is less likely to invent libraries, APIs, or patterns that don’t exist in your environment — particularly valuable in legacy refactors and complex bug fixing.

* **Lower cost and better performance**
  Skeleton trimming allows large systems to fit into manageable windows, reducing token usage and latency while improving response quality.

* **Architectural enforcement**
  It turns vibe coding into guardrail coding. Standards live in shared context files, so AI-generated code automatically reflects senior-level conventions, reducing PR churn.

* **Determinism for spec-driven workflows**
  In API-first or contract-driven systems, a carefully engineered spec can reliably generate servers, clients, and tests with minimal variance.

This is why Thoughtworks frames Context Engineering as the “adult in the room” — the point where AI stops being a toy and starts resembling an engineering tool.

#### The cons

The criticism is not that Context Engineering *doesn’t work*, but that it comes with a heavy tax.

* **High cognitive and maintenance overhead**
  Developers can end up spending more time managing the AI’s “brain” than building features. For solo developers or small teams, this discipline quickly becomes brittle.

* **Fragility across model changes**
  A carefully tuned context can break when underlying models change. What worked perfectly with GPT-4 may degrade with GPT-4.5, turning context setup into a maintenance liability.

* **Context bloat and instruction fatigue**
  As rules accumulate (`.cursorrules`, architecture docs, agent instructions), they consume the very attention budget they’re meant to optimise, creating new blind spots.

* **Slower feedback loops**
  What could have been a five-second experiment becomes a multi-minute process. For prototyping and early exploration, this often feels like ceremonial masochism.

* **One-directional knowledge flow**
  Context flows *into* the AI, but there’s no built-in mechanism to extract updated understanding back out. Specs and documents still rot unless humans intervene.

#### The takeaway

Context Engineering is powerful, disciplined, and increasingly necessary in large or constrained environments. But it is also **procedural, brittle, and expensive in attention**. It solves the context window problem by force of ceremony, not by closing the loop.

And that gap — between feeding understanding in and getting understanding back out — is precisely where SRDD emerges.

### 4. Spec-Driven Development (SDD)

#### What it is (in practice)

Spec-Driven Development formalises AI-assisted coding around written intent. The developer produces detailed specifications—typically in markdown—describing behaviour, constraints, and acceptance criteria. The AI then generates code *from the spec*, and iteration happens primarily by refining the document rather than editing the implementation directly.

In its modern form, SDD has been revived by tools such as GitHub’s Spec Kit, which make spec-to-code workflows practical at scale. The promise is compelling: consistency, regenerable code, and documentation that never drifts because it *is* the source of truth.

In practice, SDD treats the AI as a compiler for natural language.

#### Typical process

The SDD workflow is deliberate and front-loaded:

1. **Specification authoring**
   The human writes a detailed description of behaviour, data structures, invariants, and edge cases.

2. **Code generation**
   The AI translates the spec into implementation code.

3. **Validation**
   The generated system is tested against the spec.

4. **Iteration via spec changes**
   When requirements change, the spec is updated and the code is regenerated or patched to match.

The emphasis is not on evolving code, but on perfecting the description that precedes it.

#### Where it genuinely shines

SDD performs best where **determinism and auditability** matter more than exploration.

It is genuinely effective for:

* Core business logic with stable requirements
* Regulated domains (finance, healthcare, safety-critical systems)
* Teams that need consistent output across contributors
* Scenarios where regeneration is cheaper than refactoring

As an externalised memory, the spec provides a stable anchor. The AI does not “forget” requirements buried in chat history. Intent, once written, persists.

#### Failure modes at scale

SDD’s weaknesses are not technical. They are philosophical—and historical.

**It reintroduces Big Design Up Front.**
SDD assumes that complex systems can be fully described *before they exist*. This is the same assumption that powered Waterfall, and the same one Agile emerged to correct. Reality inevitably intrudes. Edge cases appear. Constraints shift. The spec lags behind lived behaviour.

**Context loss is deferred, not solved.**
When change happens in code first—as it often must—the spec becomes an artefact to be updated *after the fact*. Teams begin documenting what the system does rather than guiding what it should do. The “source of truth” quietly flips.

**Architectural drift is disguised as compliance.**
Because the AI optimises for adherence to the spec, not system coherence, architectural problems can persist indefinitely—as long as they are consistent with the document. The system may be formally correct and practically wrong.

**Professional judgment has no natural entry point.**
Most critically, SDD has no place for taste, discomfort, or intuition. LLMs interpolate; they do not imagine. If architecture and UI emerge solely from spec-to-code generation, systems converge toward statistically common patterns. Innovation collapses into average.

AI doesn’t dream.
And SDD gives it nothing else to work with.

#### Verdict

Spec-Driven Development trades improvisational chaos for procedural certainty. It ships faster—and blander.

As a control mechanism, it is powerful. As a creative or adaptive methodology, it is brittle. The more faithfully teams adhere to it, the more they risk mistaking formal correctness for real understanding.

SDD does not fail because it is too strict.
It fails because it assumes that understanding can be fully captured *before* experience.

And complex systems simply do not work that way.

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
