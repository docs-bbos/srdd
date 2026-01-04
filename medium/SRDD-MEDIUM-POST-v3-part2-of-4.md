---
title: SRDD (Part 2 of 4): The AI Coding Landscape
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

# SRDD (Part 2 of 4): The AI Coding Landscape

This is Part 2 of a four-part series on Spec-Roundtrip Driven Development.
👉 **[Read Part 1: Why SRDD Exists](https://brooke.medium.com/srdd-part1-of-4)**

---

<figure class="image-center">
  <img src="./images/2-01.TeachAndLearnWGenAI.jpg" alt="Brain fused on to a circuit board">
  <figcaption>Teaching and learning with <a href="https://www.ohio.edu/center-teaching-learning/teaching-learning-genai">GenAI</a> (Ohio University)</figcaption>
</figure>

By mid-2025, it became clear that "AI coding" was no longer a single thing.

What began as playful experimentation had hardened into recognisable methodologies, each optimising for different trade-offs: speed versus coherence, autonomy versus understanding, structure versus adaptability.

There are now multiple serious approaches to AI-assisted development. This article breaks down the four most widely adopted - vibe coding, agentic coding, context engineering, and spec-driven development - examining where each shines, where each breaks, and how **Spec-Roundtrip Driven Development (SRDD)** (and its multi-domain extension, **Scaled SRDD (SSRDD)**) positions itself relative to them.

### Why SRDD

SRDD draws from the strengths of each approach while addressing their predictable failure modes:

- From **vibe coding**: rapid iteration, low ceremony, fast feedback
- From **agentic coding**: goal-driven autonomy, multi-step task execution
- From **context engineering**: disciplined curation of what the AI sees
- From **spec-driven development**: architectural intentionality, explicit contracts, structured documentation

What distinguishes SRDD from all of these is the **roundtrip**: planned regeneration cycles that synthesise fresh specs from living code. Specifications are treated as snapshots, not contracts. Code evolves. Understanding must be periodically extracted back out - not as a rescue operation, but as a normal phase in the system's lifecycle.

This is what every senior developer has quietly wished for. They watch codebases grow over time - clean architecture slowly compromised, elegant patterns eroded by expedient fixes, boundaries blurred by "just this once" shortcuts. They hesitate before every change, unsure what's tested and what isn't, wondering what else might break. The industry calls it technical debt, but that term sanitises what it actually feels like: the slow death of coherence. Every experienced developer has stared at a system they once understood and thought, "If only I could burn this down and rebuild it properly - keeping everything we learned, but losing the accumulated mess." SRDD makes that possible. Regeneration is not fantasy; it is methodology.

Our time has come. The tooling finally exists. The AI can analyse, synthesise, and rebuild at speeds that make regeneration practical rather than aspirational. What was once a daydream - "start fresh, but keep the wisdom" - is now a workflow. We call it Spec-Roundtrip Driven Development.

For larger systems composed of independently developed subsystems, **SSRDD** wraps multiple SRDD instances with a coordination layer. Each subsystem runs its own SRDD cycle - its own planning docs, its own backlog, its own regeneration rhythm. SSRDD governs the boundaries between them: system-wide integration standards (CONSTITUTION.md), explicit API contracts, and dependency declarations that make cross-system coupling visible and intentional. The subsystems evolve independently; SSRDD ensures they integrate coherently.

<figure class="image-center">
  <img src="./images/2-02.WhenToUse.png" alt="Person holding chopsticks as demonstration of their use">
  <figcaption>When to use (<a href="https://livejapan.com/en/article-a0000335/">chopsticks</a>)</figcaption>
</figure>

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

I argue SRDD produces better outcomes than the alternatives for the majority of real-world development - with a few exceptions. Vibe coding remains superior for throwaway scripts and utilities that fit in a single context window. Spec-driven development may suit highly regulated environments where formal traceability is mandated. Context engineering offers value in brownfield systems where you're not trying to improve the architecture - just survive it. Surgical fixes, minimal blast radius, brownfield in, brownfield out.

For everything else - single projects through to multi-domain systems - SRDD and SSRDD provide the better balance.

What follows is a breakdown of each approach - its strengths, its limitations, and where it predictably breaks down.

<figure class="image-center">
  <img src="./images/2-03.cracked-beam-300x171.png" alt="Representation of failed (cracked) beam">
  <figcaption>Failure modes (<a href="https://feaforall.com/failure-modes/">of structural beams</a>)</figcaption>
</figure>

### The Common Failure Pattern

Although these approaches look different on the surface, they fail in remarkably similar ways.

Across modern AI-assisted development, three failure modes recur - regardless of tooling, workflow, or ideology:

**Context loss**: as systems grow beyond what fits inside a single *context window*, earlier decisions, trade-offs, and assumptions don’t fail loudly; they simply slip out of view. The AI continues to reason fluently, but no longer conditions on the full history of intent. Nothing announces the loss. Larger context windows may delay it, but often only extend the illusion of coherence - pushing regressions further from their cause. What emerges is the familiar whack-a-mole loop: fixes land, tests pass, and new issues surface elsewhere, not because the model is “bad,” but because architectural memory was never externalised in the first place. The system forgets selectively, locally, and invisibly - until coherence degrades not through error, but through omission, and that loss compounds quietly over time.


**False confidence**: the most dangerous failure mode in AI-assisted development - arises when systems continue to signal success after understanding has quietly fallen out of scope. It is not caused by recklessness, nor by poor intentions, nor even by faulty models. It emerges when the mechanisms that normally bind progress to comprehension are no longer required for work to continue.

In traditional development, forward motion is constrained by friction. Humans must understand enough to proceed: to reason about changes, to predict consequences, to explain intent to others. Difficulty acts as a forcing function. When understanding erodes, progress naturally slows.

AI-assisted workflows weaken that coupling.

As context windows truncate history, earlier decisions and assumptions stop influencing new work. Yet the system does not stall. Output remains fluent. Tasks complete. Tests pass. Builds stay green. The visible signals that teams have learned to associate with correctness and safety continue to fire - even as the underlying model of the system becomes partial, fragmented, or obsolete.

This is the critical shift: **progress no longer requires comprehension**.

Once that threshold is crossed, confidence becomes structurally unjustified. Work proceeds smoothly not because the system is healthy, but because nothing is demanding that its health be re-established. Risk does not disappear; it becomes latent. Security flaws, architectural shortcuts, duplicated logic, and violated invariants accumulate quietly, masked by the same signals that normally indicate success.

False confidence is reinforced, not self-correcting. Each locally successful change affirms the belief that things are under control. In autonomous or semi-autonomous workflows, this reinforcement accelerates: agents optimise relentlessly for observable success criteria - task completion, test results, pipeline status - and echo existing patterns outward. What “works” is repeated. What is unexamined is entrenched.

Crucially, this is not a moral failure and not an AI-specific flaw. Humans fall into the same trap whenever indicators outlive the conditions that once made them meaningful. The danger lies in mistaking fluency for understanding, motion for direction, and the absence of alarms for the presence of safety.

False confidence therefore fails *late* and *discontinuously*. Systems appear stable until they are not. Recovery is expensive because the past cannot be reliably reconstructed: intent was never made durable, assumptions were never externalised, and the system evolved faster than understanding could be maintained.

This failure mode is not universal. Methodologies that impose formalism - explicit specifications, enforced contracts, curated context, or audited intent - resist false confidence by design. They reintroduce friction. They slow progress deliberately. They force understanding to be declared, reviewed, or regenerated before work can continue.

Where such mechanisms are absent, false confidence is not an edge case. It is the default outcome of success without comprehension.

**Architectural drift**: once progress continues without comprehension, architectural decisions cease to be deliberate. Structure emerges implicitly from local fixes, which accumulate into global incoherence without ever triggering a clear failure.

The failure pattern above becomes visible earliest and most vividly in low-friction workflows. When progress is cheap and success signals are abundant, context loss, false confidence, and architectural drift surface quickly. Vibe coding sits at that boundary, where the strengths of AI assistance are maximised - and so are its risks.

<figure class="image-center">
  <img src="./images/2-04.goodVibes.png" alt="Tie dye writing of 'good vibes only'">
  <figcaption><a href="https://www.redbubble.com/i/sticker/Good-vibes-only-tie-dye-by-cedoughert">Good vibes</a></figcaption>
</figure>

## 1. Vibe Coding

### What it is

Vibe coding is the casual extreme of AI-assisted development. You prompt the AI conversationally:

> “Add this feature.”
> “Fix that bug.”
> “Refactor this file.”

It feels magical when it works - and for small projects, it often does. But the moment architectural memory matters, it starts to unravel. Context windows are finite. As systems grow, the AI forgets earlier decisions, repeats mistakes, and implements the same concern three different ways across three different files.

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

* **Extreme velocity**:
  Vibe coding collapses idea → code → output into a single conversational loop. Syntax, plumbing, and boilerplate effectively disappear. Feedback becomes immediate, enabling you to explore functionality in minutes rather than days. For small, self-contained problems, this speed is genuinely transformative.

* **Low-friction creativity**:
  Because you’re not fighting tooling, frameworks, or process, you remain in a high-level creative flow. This makes vibe coding especially effective for UI exploration, proof-of-concepts, demos, and early-stage experimentation - situations where discovering *what* to build matters more than how it is structured.

* **Drudgery elimination**:
  Routine engineering work is overrepresented in model training data. CRUD endpoints, form handling, configuration scaffolding, and common integrations are produced quickly and competently. The AI absorbs the repetitive cognitive load, allowing humans to spend time on differentiation, design intent, and problem framing.

* **Democratisation**:
  Vibe coding lowers the barrier to creation. Designers, founders, and product managers can produce working artefacts without deep technical fluency. When used responsibly, this improves cross-disciplinary communication, reduces translation loss, and allows ideas to be tested in code rather than debated in abstraction.

Vibe coding is unbeatable for **0 → 1**.

### The cons

This is the first place where the common failure pattern becomes visible in full. Vibe coding does not merely suffer from context loss; it actively cultivates **false confidence**. Progress continues smoothly, outputs look correct, and nothing demands that understanding be re-established before work proceeds.

**The complexity ceiling**:
This is the same context loss described earlier. As work exceeds a single context window, assumptions fall out of scope without warning. Coherence degrades quietly, and fixes begin to chase symptoms rather than intent.

**Invisible technical debt**:
In vibe coding, debt does not accumulate because developers are careless - it accumulates because the system provides no reason to look. Output remains fluent, changes land cleanly, and nothing signals that architectural intent has slipped out of view. 

Code is generated in fragments, accepted opportunistically, and rarely revisited with architectural intent. Because there is no externalised model of the system, duplication, leaky abstractions, and accidental coupling emerge gradually and silently. The system appears to move quickly right up until it doesn’t - at which point the cost is no longer incremental. Refactors become risky, fixes cascade unpredictably, and the only visible option is wholesale rewrite. Debt was always present; it was simply never surfaced early enough to be managed deliberately.

**Security and correctness risks**:
False confidence is especially dangerous here, because plausibility and correctness are easily confused.

Large language models optimise for plausibility, not for adversarial safety, invariants, or edge-case integrity. In a vibe-coding loop, there is rarely a formal declaration of what *must not* happen - only an informal sense of what “seems right.” This leads to insecure defaults (over-permissive access, missing validation, unsafe deserialisation), fragile assumptions (happy-path logic treated as universal), and correctness gaps that surface only under load or abuse.

Critically, recognising these failures requires professional experience. Security flaws are often invisible to non-specialists, and correctness bugs frequently masquerade as acceptable behaviour until they are exploited or stressed. Vibe coding lowers the barrier to entry so far that individuals with little or no background in security, systems design, or failure analysis can ship applications used by millions - without understanding the risks they have encoded. The danger is not malice; it is invisibility. Problems are present from day one, but only become obvious to those trained to look for them.

**Auditor fatigue**:
Reviewing AI-generated code is not equivalent to reviewing human-written code. Humans compress intent when they write; AI expands it. The result is large volumes of syntactically correct but semantically diffuse output. Developers are forced to read more code, hold more state in their heads, and infer intent that was never explicitly declared. Over time, this leads to a subtle but dangerous shift: reviews become superficial, approvals become habitual, and “looks fine” becomes a substitute for understanding. Teams stop building systems and start rubber-stamping artefacts they did not truly author.

**Non-reproducibility**:
As long as things appear to work, this instability remains hidden.

Without specifications, structured context, or stable contracts, vibe coding is inherently non-deterministic. The same prompt, run days or weeks apart, may yield different abstractions, naming schemes, or architectural decisions - not because requirements changed, but because the statistical path through the model did, whether due to context sensitivity, probabilistic sampling (including temperature), or a later model update. This fragility undermines collaboration: teammates cannot reliably reproduce or extend work, onboarding becomes archaeology, and long-term maintenance turns into guesswork. The system’s shape becomes an accident of timing rather than a consequence of intent.

Vibe coding is exhilarating - until you have to live with what you shipped.

### Bottom line

Vibe coding is the ultimate **0 → 1 tool**. It becomes dangerous the moment a system needs to be maintained, reasoned about, or trusted.

Most experienced developers now use it *selectively*: to explore ideas quickly - and then transition to something more disciplined once the idea is worth keeping.

### SRDD Comparison

**Where SRDD meets vibe coding**:
SRDD preserves the rapid iteration that makes vibe coding effective. Within an issue, the developer and AI move quickly - TDD loops are tight, feedback is immediate, and the AI handles boilerplate, tests, and routine implementation. The conversational fluidity isn't lost; it's bounded.

**Where SRDD goes beyond**:
SRDD externalises what vibe coding keeps implicit. Architectural intent is captured in planning docs. Contracts make guarantees explicit. The scope guardian prevents the opportunistic drift that accumulates into chaos. Most critically, regeneration cycles mean the complexity ceiling isn't a dead end - it's a trigger for deliberate realignment. Understanding compounds instead of decaying.

**Where vibe coding wins**:
For throwaway scripts and single-session utilities, SRDD is overhead you don't need. But the bottom line above points to the real relationship: vibe coding excels at exploration; SRDD is what you transition to once the idea is worth keeping. They are sequential, not competing.

<figure class="image-center">
  <img src="./images/2-05.agentic.png" alt="Cute android with pretty smile. Like one seen in Disney movies.">
  <figcaption>An <a href="https://www.computerworld.com/article/3843138/agentic-ai-ongoing-coverage-of-its-impact-on-the-enterprise.html">agentic AI</a> mascot</figcaption>
</figure>

## 2. Agentic Coding

### What it is

Agentic coding introduces structure and autonomy. Instead of responding to a single prompt, the AI is given a goal and allowed to plan, act, verify, and correct itself using tools.

The interaction shifts from *chat* to *task*.

In practice, the AI behaves like a junior engineer with shell access: exploring the repository, editing files, running builds, fixing errors, and iterating until its own success criteria are met.

It feels like leverage.

But it remains fundamentally **code-first**. The agent reasons over the current repository state, not over a durable representation of intent. Understanding emerges implicitly, if at all.

### The process

Agentic workflows follow a loop:

1. **Goal definition**:
The human provides a task framed as a definition of done, not a conversational prompt.                                          
2. **Autonomous discovery**:
The agent scans the repository, reads files, greps for relevant symbols, and maps dependencies.
3. **Planning**:
The agent generates a step-by-step plan and may request approval before proceeding.
4. **Execution**:
The agent edits files, runs commands, fixes errors, installs dependencies, and retries.
5. **Verification**:
Tests are run; failures trigger replanning and further action.
6. **Handoff**:
The agent stops when tests pass, a blocker is reached, or human intervention is required.

Persistence is the defining feature.

### Where it shines

Agentic coding excels at **execution-heavy work with clear local success criteria** - especially when progress can be measured mechanically.

It is particularly effective for:

* **Mechanical refactors at scale**:
  Large, repetitive changes (renaming APIs, migrating libraries, flattening abstractions) are where agentic loops shine. The agent can apply consistent transformations across dozens of files faster than any human.

* **Dependency and ecosystem churn**:
  Upgrading frameworks, fixing breaking changes, resolving deprecated APIs - all benefit from the agent’s willingness to brute-force its way through build errors until the system compiles again.

* **Test and lint repair**:
  When tests already encode desired behaviour, agents are good at iterating until green. This creates the impression of “self-healing” codebases.

* **Throughput amplification**:
  One engineer can suddenly “do the work of many” - touching wide surface areas, unblocking pipelines, and clearing backlogs that would otherwise stall teams.

This is where the **echo effect** begins.

Agentic coding amplifies *whatever signal you give it*. If the success signal is “tests pass” or “build succeeds,” the agent will relentlessly optimise toward that outcome - even if the system becomes less coherent, less understandable, or more fragile in the process.

In short: agentic coding is excellent at **local optimisation**.

### Failure modes at scale

At scale, those same echo effects turn pathological.

**Context loss becomes probabilistic and compounding**:
This is the same context loss described earlier, now multiplied by autonomy and multiple agents. Each agent succeeds locally, but none conditions on the full system history. Intent fragments, assumptions fall out of scope, and coherence collapses through the compounded interaction of many individually correct steps.

**Architectural drift accelerates under success**:
Under sustained false confidence, architectural decisions stop being deliberate. Because the agent optimises for task completion, it reinforces whatever patterns already exist - good or bad. Local fixes echo outward, entrenching accidental structure. Over time, the codebase becomes a sedimentary record of agent decisions that were never globally evaluated.

**False confidence through mechanical success**:
This is the false confidence described earlier, now reinforced by autonomy. Tests passing become the dominant success signal. If the tests are incomplete, mis-scoped, or outdated, the agent will happily satisfy them while violating unstated invariants. The system appears healthy while drifting further from its original intent.

**Professional judgment erodes through delegation**:
Once false confidence takes hold, the volume of agent-generated changes shifts team behaviour and reduces the likelihood of deep review. Fifteen-file diffs across four modules push teams into audit mode rather than design mode. “Looks fine” becomes normal. Understanding quietly decays.

**Autonomy magnifies blast radius**:
Because agents require broad access - terminals, file systems, credentials - their mistakes scale too. Runaway loops, dependency explosions, or subtle security regressions are not edge cases; they are natural consequences of autonomous optimisation without durable intent.

The net effect is a dangerous illusion: **high velocity with hidden decay**.

Agentic coding doesn’t fail loudly. It fails *gradually*, echoing small local decisions into system-wide incoherence - until the cost of recovery exceeds the cost of having gone slower.

### Verdict

Agentic coding is **delegated execution**, not delegated responsibility.

It delivers speed without stability.

### SRDD Comparison

**Where SRDD meets agentic coding**:
SRDD doesn't reject agentic execution - it harnesses it. Within Phase 2, the AI operates agentically: planning steps, editing files, running tests, fixing errors, iterating until done. The TDD loop is an agentic loop. The difference is that SRDD bounds what "done" means and guards what the agent is allowed to touch.

**Where SRDD goes beyond**:
Agentic coding optimises for task completion. SRDD optimises for *coherent* task completion - with the developer kept deliberately in the loop. The scope guardian prevents the echo effect: the AI cannot silently expand scope or reinforce bad patterns unchecked. PRs are mandatory, and review focuses on coherence, not just "tests pass." Contracts provide a durable representation of intent that survives beyond the current repository state. When the AI advises regeneration, the human decides whether to act. SRDD treats agentic execution as a tool to be supervised, not a strategy to be delegated to.

**Where agentic coding wins**:
For pure mechanical transformations - bulk renames, dependency upgrades, migration scripts - where architectural coherence is irrelevant and the only goal is "make it compile again," raw agentic execution is faster. SRDD's guardrails add friction that isn't needed when you genuinely don't care about the system's future. But those cases are rarer than they appear. Most systems need to be maintained, and "tests pass" is not the same as "understanding survives."

<figure class="image-center">
  <img src="./images/2-06_context.png" alt="Cartoon with random 'thread' shown in one person's head, spilling out to someone where it is arranged in a spiral ie. organized">
  <figcaption>Context analysis in <a href="https://www.matrix.edu.au/10-things-you-must-know-about-context-analysis-in-year-9-english/">education</a></figcaption>
</figure>

## 3. Context Engineering

### What it is

Context Engineering focuses on controlling *what* the AI sees, *when*, and *in what form*. The goal is not more context, but better abstraction.

It treats the context window as a scarce resource.

### The process

Context Engineering is less about “adding information” and more about **actively sculpting what the model is allowed to know at any moment**.

**Context curation (skeletons, exemplars, rules)**
Instead of feeding the AI full source trees, developers aggressively abstract:

* *Skeletons* replace implementations with method signatures, interfaces, and type definitions - enough to communicate shape without drowning the model in detail.
* *Exemplars* provide a small number of “gold standard” patterns that demonstrate how the team wants problems solved.
* *Rules* encode architectural constraints, banned libraries, naming conventions, and stylistic expectations.

The intent is to reduce variance by narrowing the solution space. Ironically, *less* code often produces *better* results.

**Context management (summaries, scratchpads)**:
Because real tasks exceed a single context window, teams introduce mechanisms to preserve continuity:

* AI-maintained summaries that periodically compress prior conversations and decisions
* Scratchpad files (`memory.md`, `notes.md`) where the model records intermediate reasoning or assumptions
* Explicit handoff points where context is refreshed or reset

This turns long interactions into staged engagements rather than unbounded chats.

**Dynamic retrieval (MCP, tools, on-demand access)**:
Rather than front-loading everything, agents pull information *only when needed*:

* Model Context Protocol (MCP) calls to inspect files, logs, schemas, or APIs
* On-demand documentation lookup for version-accurate library behaviour
* Tool-mediated access to repositories, databases, and build systems

The model becomes less of a “reader” and more of an *investigator*, requesting context just in time.

---

### The pros

Used well, Context Engineering delivers genuine improvements over ad-hoc prompting.

**Fewer hallucinations**:
By grounding the model in curated constraints, the AI is far less likely to invent APIs, libraries, or patterns that don’t exist. This is especially valuable in legacy systems or regulated environments where correctness matters more than creativity.

**Lower cost and better performance**:
Skeletons and selective retrieval dramatically reduce token usage. Smaller, higher-signal contexts not only cost less, they often produce *more accurate* outputs by avoiding “lost in the middle” failures, where LLMs weight the beginning and the most recent end of the context window more heavily, causing architectural decisions and constraints in between to be silently dropped as conversations grow - without warning or explicit failure signals.

**Architectural enforcement**:
Context files act as soft guardrails. AI-generated code naturally conforms to senior-level conventions, reducing stylistic drift and PR churn. This is one of the few ways to reliably encode architectural intent without constant human intervention.

**Determinism for contract-driven systems**:
In API-first or schema-driven environments, well-engineered context can make AI output surprisingly consistent. Given the same spec and constraints, regeneration becomes predictable - a prerequisite for CI/CD and automated codegen workflows.

---

### The cons

The problems with Context Engineering are not subtle - they emerge directly from its strengths.

Unlike vibe or agentic coding, Context Engineering largely resists false confidence and architectural drift by design - but it does so by imposing deliberate friction, ongoing cognitive overhead, and manual reconciliation.

**High cognitive overhead**:
Designing, maintaining, and evolving the AI’s “mental environment” is work. Developers can spend more time tuning context than building features. For small teams or solo developers, this overhead quickly becomes unsustainable.

**Fragility across model changes**:
Context strategies are tightly coupled to model behaviour. A carefully tuned setup for one model version can degrade when the model changes, forcing teams into continuous recalibration.

**Context bloat**:
This is the same context loss described earlier, now driven by accumulation. As context files grow, signal is buried by its own scaffolding, recreating the very “lost in the middle” failures they were meant to avoid.

**Slower feedback loops**:
What could have been a five-second experiment becomes a multi-minute ritual: curate context, verify rules, run the agent, review output. For exploratory work, this feels like procedural friction masquerading as discipline.

**One-directional knowledge flow**:
Most critically, Context Engineering only controls what flows *into* the model. There is no native mechanism to extract updated understanding back out. When the system evolves, humans must manually reconcile reality with the curated context - or accept drift.

### SRDD Comparison

**Where SRDD meets context engineering**:
SRDD shares context engineering's recognition that *what the AI knows matters*. Rules files (CLAUDE.md), canonical patterns (ARCHITECTURE.md), and planning docs all shape how the AI reasons about the system. But the flow differs fundamentally. Context engineering focuses on preparing inputs - curating skeletons, examples, and abstraction layers before the AI begins work. Whether humans or AI assist with that curation, the knowledge flows one direction: into the coding session. SRDD closes the loop. The AI sees reality in full, synthesises understanding during regeneration, and produces planning docs for human approval. What the AI extracts - and the human approves - becomes the authoritative input for the next cycle. Context engineering curates *before*. SRDD extracts *after* - and feeds it forward.

**Where SRDD goes beyond**:
Context engineering is one-directional: carefully curated inputs, no mechanism to extract updated understanding back out. SRDD closes that loop. Regeneration cycles synthesise fresh specs from living code, ensuring that context files reflect reality rather than gradually drifting into fiction. The planning docs aren't static artefacts maintained by ceremony - they're regenerated from evidence. This is the fundamental difference: context engineering improves inputs; SRDD also regenerates understanding.

**Where context engineering wins**:
For brownfield systems where the goal is surgical fixes - not architectural transformation - context engineering's discipline is exactly right. When you don't own the architecture, can't regenerate, and just need to thread a needle without breaking anything, meticulous curation is the entire game. Brownfield in, brownfield out. SRDD assumes you can reshape the system over time; context engineering is designed for when you can't or won't.

### The takeaway

Context Engineering is powerful, disciplined, and increasingly necessary for large or constrained systems. But it solves the context window problem through **curation and ceremony**, not through feedback.

It improves inputs.
It does not regenerate understanding.

And that unclosed loop is precisely why SRDD exists.

<figure class="image-center">
  <img src="./images/2-07.Specifications_Blueprint-gc87638b5f_1280.jpg" alt="Architectural room design on a large piece of paper (or on screen)">
  <figcaption><a href="https://www.designingbuildings.co.uk/wiki/Specification_for_construction">Architectural plan</a> - a specification</figcaption>
</figure>

## 4. Spec-Driven Development (SDD)

### What it is

Spec-Driven Development (SDD) is a spec-first methodology designed to produce software with high certainty, traceability, and auditability. The specification is treated as the primary artefact of intent: requirements, constraints, and behavioural guarantees are articulated explicitly and used to drive implementation. The human role is not simply to “build features”, but to formalise what must be true, verify that the resulting system matches it, and maintain a defensible trail of why the system behaves as it does.

Modern Spec-Driven Development makes this practical by formalising software development around **continuously synchronised specifications**.

In contemporary SDD, the specification and the codebase exist in a bidirectional relationship. The spec is not a static document, nor merely an input to generation. Instead, it is a living artefact that is actively reconciled with the implementation. AI agents generate code from the spec, detect divergence as development proceeds, and update the specification to reflect reality when change occurs.

This spec ↔ code synchronisation is foundational. It allows SDD to maintain traceability while tolerating controlled evolution. Requirements, architectural decisions, and behavioural guarantees remain preserved as first-class artefacts, while AI handles the mechanical work of keeping them aligned with the implementation.

In practice, SDD treats the AI less like a pair programmer and more like a compiler for intent - one that continuously verifies that what exists matches what was declared.

This posture is intentional. SDD optimises for certainty.

### Why sync exists

This was not always the case.

Early forms of Spec-Driven Development assumed a **one-way flow**: specification first, code second, and never the reverse. The spec was authoritative; the implementation was disposable. Any change to behaviour required prior modification of the specification.

While conceptually pure, this model collapsed under real-world pressure.

It suppressed exploratory development, punished learning-through-implementation, and forced teams into **Big Design Up Front** simply to make progress. Developers either abandoned the methodology when reality diverged, or quietly modified code and backfilled the spec later - eroding trust in the very artefact meant to provide certainty.

Spec ↔ code synchronisation emerged as a corrective to this failure.

By allowing controlled reverse sync, modern SDD preserves auditability without prohibiting reality. Drift is surfaced explicitly rather than hidden. Documentation remains truthful. The system stays inspectable.

But the underlying philosophy remains unchanged.

### Where it shines

Spec-Driven Development is genuinely effective **when the cost of ambiguity exceeds the cost of rigidity**.

**Stable core logic**:
When requirements are well understood and evolve slowly, SDD performs exactly as intended. Deterministic business rules, calculation engines, and policy enforcement benefit from being specified once and regenerated reliably. Creativity is not the objective; consistency is.

**Regulated domains**:
In finance, healthcare, safety-critical systems, and government, SDD aligns naturally with compliance requirements. Specifications double as audit artefacts. The ability to demonstrate that an implementation was derived from a formally reviewed description of intent is a powerful organisational capability.

**Regenerable systems**:
SDD excels when code is treated as a secondary artefact. Entire services can be regenerated across languages, frameworks, or platforms, provided the spec remains authoritative. In theory, this reduces long-term platform risk and vendor lock-in.

**High audit requirements**:
Traceability is SDD’s native strength. Every behaviour can be traced to an explicit declaration. For systems where explanation matters more than adaptability, this trade-off is not just acceptable - it is required.

In short, SDD is optimised for systems that are already known.

### Failure modes

The limitations of SDD emerge precisely where software becomes uncertain.

SDD suppresses false confidence and architectural drift by making intent explicit and authoritative, but the cost is that discovery is constrained rather than emergent.

**Reintroduces Big Design Up Front**:
Even with synchronisation, SDD still requires correctness to be formalised early, because the specification remains the authoritative artefact. This mirrors the core assumption of Waterfall: that complex systems can be fully and accurately described before meaningful experience exists. Sync does not alter that premise - it merely constrains how far the implementation is allowed to diverge from an early formalisation.

Discovery is not eliminated; it is deferred. Understanding still arrives late, but the cost of revising foundational assumptions is higher because the system must be reconciled back into a pre-existing specification. What appears as flexibility is, in practice, controlled deviation within a design that was fixed too soon.

For traceability to remain meaningful, the spec and the code must remain nearly isomorphic. Code may evolve, but only within the conceptual envelope already declared. Reverse sync exists to reconcile drift, not to legitimise it. If implementation deviates too far, traceability collapses - the spec no longer explains the system; it merely describes it after the fact.

This places a hard ceiling on discovery. Significant design insight cannot emerge organically through coding, because any non-trivial departure must first be formalised in the spec. Exploration becomes paperwork. Learning is permitted only insofar as it can be anticipated, named, and approved before it exists.

As a result, SDD remains fundamentally spec-first. Sync makes the process survivable, but it does not change the core assumption: that understanding precedes implementation, rather than being produced by it. Big Design Up Front is softened - not removed.

Discovery is delayed, constrained, and filtered through formality. It is not eliminated, but it is never allowed to lead.

**Defers rather than resolves drift**:
Synchronisation keeps documents accurate, but it does not question whether the architecture itself is sound. Specs follow reality; they do not critique it.

**Compliance over coherence**:
Because success is measured by adherence rather than design quality, systems can remain formally correct while becoming structurally brittle. Architectural discomfort has no formal signal.

**Excludes human taste and intuition**:
Most critically, SDD has no natural mechanism for expressing unease. LLMs interpolate; they do not imagine. When generation is driven primarily by specifications, outputs converge toward statistically defensible patterns rather than inspired ones.

AI doesn’t dream.
And SDD gives it nothing else to work with.

Human judgment - taste, discomfort, intuition, the sense that something is *technically correct but wrong* - has no formal entry point. The spec becomes a narrowing funnel, and the AI fills it faithfully with the safest patterns available.

The result is software that is correct, auditable, and consistent - and increasingly indistinguishable.

This mirrors a familiar pattern already visible in AI-generated art. As models train increasingly on their own outputs, variance collapses. Novelty erodes. The work converges toward a safe, statistically defensible centre. Texture, risk, and idiosyncrasy are averaged away until what remains is technically coherent but aesthetically flat - the oft-invoked image of everything drifting toward the same muted, featureless form.

SDD exhibits the same gravitational pull. When generation is driven exclusively by prior specifications and statistically common patterns, each new system reinforces the last. Architectural decisions harden into defaults. Interfaces converge. Systems stop reflecting the peculiarities of their context and instead resemble the accumulated median of what has come before.

The danger is not incorrectness.
It is homogenisation.

Over time, SDD does not merely prevent surprise - it systematically removes the conditions under which genuinely new structure, interaction, or architecture can emerge.

### SRDD Comparison

**Where SRDD meets SDD**:
Both methodologies reject the chaos of undocumented, ad-hoc development. Both produce planning artefacts. Both recognise that specifications matter. And both establish a relationship between spec and code that goes beyond one-way generation. The superficial shape is similar: documents drive implementation, and implementation informs documents.

**Where SRDD goes beyond**:
The relationship to the spec is fundamentally different. In SDD, the specification remains authoritative - code must reconcile back to it, and sync exists to detect drift, not to question the architecture. In SRDD, specifications are snapshots, not contracts. They capture understanding at a moment in time, but code becomes the source of truth as reality evolves. Regeneration doesn't sync - it *synthesises*. The AI extracts fresh specs from living code, informed by everything learned: PRs, issues, tests, production discoveries. The output isn't a reconciled document; it's a new foundation.

More critically, SRDD preserves human judgment as a first-class input. SDD has no formal mechanism for taste, intuition, or the sense that something is "correct but wrong." The spec is a narrowing funnel; the AI fills it faithfully with statistically safe patterns. SRDD explicitly counters this: the developer dreams, the AI disciplines. Architectural discomfort has a voice. Discovery is allowed to lead, not merely to be tolerated within pre-declared boundaries.

**Where SDD wins**:
When formal traceability is mandated - not preferred, but legally or contractually required - SDD's rigour is the point. Regulated domains (finance, healthcare, safety-critical systems) often demand that every behaviour trace to an explicit, pre-approved declaration of intent. SRDD's "specs are snapshots" philosophy doesn't satisfy auditors who need to demonstrate that implementation derived from reviewed specifications. If the cost of ambiguity exceeds the cost of rigidity, and external compliance requires it, SDD remains the appropriate choice. SRDD is not designed for environments where flexibility is a liability.

<figure class="image-center">
  <img src="./images/06.WhichWay.png" alt="Simple text image asking 'where to next..'" width="400">
  <figcaption><a href="https://www.facebook.com/andsowheretonext/">where to next</a></figcaption>
</figure>

## What's Next

The landscape is clear. Each approach optimises for something real - speed, autonomy, discipline, traceability - but none of them close the loop between specification and reality.

SRDD does.

In **Part 3**, I walk through the SRDD workflow in detail: the five phases, how contracts are defined and protected, the role of the AI as scope guardian, and what regeneration actually looks like in practice.

Continue to Part 3:
👉 **[The SRDD Workflow](https://brooke.medium.com/srdd-part3-of-4)**

Or return to Part 1:
👉 **[Why SRDD Exists](https://brooke.medium.com/srdd-part1-of-4)**

---

© 2025 Brooke Smith. All rights reserved.

This document constitutes a public disclosure and defensive publication of the
Spec-Roundtrip Driven Development (SRDD) and Scaled SRDD (SSRDD) methodologies.

The author expressly places the concepts, processes, and workflows described
herein into the public domain as prior art, for the purpose of preventing
subsequent patent claims or exclusive ownership by third parties.

Commercial use, redistribution, or derivative works of this text require
explicit permission from the author.