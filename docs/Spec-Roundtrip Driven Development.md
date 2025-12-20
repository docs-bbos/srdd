# Spec-Roundtrip Driven Development: A Third Way for AI-Assisted Coding

2025 has been the year of AI coding methodologies. We've watched Andrej Karpathy coin "vibe coding" in February, GitHub release Spec Kit, Thoughtworks declare the shift to "context engineering," and everyone argue about whether we're entering a golden age or a technical debt apocalypse.

After extensive work with Claude Code, Bolt.new, and Cursor, I've landed on a hybrid approach that I'm calling **Spec-Roundtrip Driven Development (SRDD)**. But before I explain it, we need to map the territory — because the discourse has moved beyond a simple binary.

## The Landscape: Five Approaches to AI Coding

The conversation is usually framed as vibe coding versus spec-driven development. That's too simple. Here's what's actually emerging:

### 1. Vibe Coding

The casual extreme. You chat with your AI, one prompt at a time. "Add this feature." "Fix that bug." It's iterative, interactive, and feels like magic when it works.

The problems are well-documented now. Context window limitations mean the AI loses track of your app's purpose and past decisions. Suddenly it's asking you to repeat things you've already explained, or suggesting changes that ignore your previous instructions.

Worse, vibe coding gives developers a false sense of security. The AI will do whatever the current context statistically suggests — which means the same functional service (say, logging) can end up implemented in three different ways across three different files. The AI doesn't notice the inconsistency because it's not in context.

### 2. Agentic Coding

A structured step up from vibe coding. You define goals, the AI plans and executes, you validate. Tools like Claude Code and Cursor operate in this mode when you give them multi-step tasks.

One experiment from Modus Create compared traditional development against agentic workflows on identical scope. The AI team had 30% fewer engineers and delivered in half the time. That's compelling.

But agentic coding is still fundamentally code-first. The agent explores the codebase, makes changes, and iterates. There's no external source of truth about what the system *should* be — only what it currently is.

### 3. Context Engineering

The emerging middle ground that Thoughtworks and others are championing. The insight: it's not about prompts or specs, it's about *what information you feed the AI and when*.

This includes techniques like anchoring agents to reference applications, using Model Context Protocol (MCP) to give agents access to tools and data, and curating the smallest possible set of high-signal context for each task.

Interestingly, Thoughtworks found something counterintuitive: AI is often more effective when it's further abstracted from the underlying system. Remove the specifics of legacy code, and the solution space becomes wider. This aligns with keeping specifications implementation-agnostic.

### 4. Spec-Driven Development (SDD)

The structured extreme. Write detailed specifications in markdown, let AI generate code, iterate on the specs rather than the code. GitHub's Spec Kit has made this approach accessible.

The promise is seductive: specs become the source of truth, you can regenerate code from updated specs, and you get consistency that vibe coding can't provide.

The problem? It's Big Design Up Front (BDUF) wearing new clothes. What system is simple enough to fully describe before building it? You'll spend endless time looping on spec refinement before writing a single line of code. And when you discover requirements through actual usage — as you inevitably will — you're stuck updating specs to match reality rather than the other way around.

There's another problem nobody talks about: *AI doesn't dream*.

LLMs are interpolation machines, not imagination machines. They find the statistical centre of their training data. If you rely entirely on AI to implement from spec, your UI components will look like every other AI-generated UI. Your architecture will be whatever pattern appears most frequently in the training data. 

A human developer "feels" when a button needs to be 2 pixels larger, or when an interaction is slightly wrong. AI can only do what it's seen before. Pure SDD produces generic products — they ship faster, but they ship bland.

### 5. SRDD: The Roundtrip Approach

This is the hybrid I've developed. It keeps what works about SDD (structure, documentation, architectural intentionality) while acknowledging that the best specifications emerge from building, not before it.

The core insight: **specs are snapshots, not contracts**. They compress your understanding at a point in time. But the code becomes the real source of truth as you iterate — and periodically, you extract new specs from evolved code.

It's a closed loop, not a one-way street.

## Comparing the Approaches

| Approach | Direction | Structure | Human Role | Weakness |
|----------|-----------|-----------|------------|----------|
| Vibe Coding | Code → Code | None | Passenger | Context loss, inconsistency |
| Agentic Coding | Goal → Code | Light | Director | No external source of truth |
| Context Engineering | Context → Code | Medium | Curator | Still code-first |
| SDD | Spec → Code | Heavy | Author | BDUF, generic outputs |
| **SRDD** | Spec ↔ Code | Adaptive | Architect | Requires discipline |

The key differentiator for SRDD is the bidirectional arrow. Specs drive code, and evolved code drives regenerated specs.

## The SRDD Workflow

### Phase 1: Design Iteration

Iterate on a design with AI assistance. Build documentation covering:

- Product requirements and user stories
- System architecture (kept implementation-agnostic where possible)
- Interface contracts and data models
- Key technical decisions and their rationale

Commit this documentation. It's your first spec snapshot.

### Phase 2: Environment Setup

Configure your AI coding environment properly. For Claude Code, this means a well-crafted `CLAUDE.md` with project context, coding standards, and architectural constraints.

This is your "constitution" — the stable intent that survives regeneration cycles. It encodes the things that shouldn't change: your values, non-negotiables, and core patterns. The constitution persists even when specs get regenerated.

### Phase 3: TDD Implementation

Have AI implement from the spec using Test-Driven Development. This is non-negotiable. Tests are your safety net for everything that follows:

- AI writes failing tests based on spec requirements
- AI implements code to pass tests
- You review for architectural alignment

Spotify's engineering team learned this the hard way: "Writing good prompts — and verifying that the agent did the right thing — becomes significantly more difficult if you want to apply a change over thousands of repos." Tests are how you verify at scale.

### Phase 4: User Acceptance Testing

Put the thing in front of users (or yourself wearing a user hat). When issues emerge — and they will — don't just fix them:

- Write failing tests that capture the bug or missing requirement
- Have AI fix the code
- Document what you learned

This is where specifications start drifting from reality. That's fine. Keep going.

### Phase 5: Functional Iteration

Iterate on functional and interface design changes. Add features. Refine UX. Let the code evolve in response to real usage.

This is where human judgment matters most. That button that needs to be 2 pixels larger? The interaction that feels slightly wrong? You adjust it in code, not in spec. You're the one who can dream — the AI can only interpolate.

### Phase 6: The Regeneration Trigger

At some point, the code becomes spaghettified. You'll feel it: changes that should be simple become hard, the AI starts fighting the codebase, architectural seams are in the wrong places.

This is your signal to **regenerate**.

Ask the AI to produce a complete new set of specifications and design documents covering everything developed so far. Critically, conduct a Q&A session during this process:

- What new features emerged that weren't in the original spec?
- What architectural decisions proved wrong?
- What would you do differently with hindsight?
- What did we learn from user feedback?

The new spec should be implementation and architecturally independent — you're extracting intent, not documenting current code.

### Phase 7: Fresh Architecture

With new specs in hand, start fresh:

- Design new architecture informed by everything you learned
- Bed in the architectural foundations first
- Implement using TDD, same as Phase 3
- Carry forward the tests that still apply

### Repeat

This cycle continues over the life of the product. Each roundtrip produces cleaner architecture and more accurate specifications. Your specs get smarter with each cycle because they're informed by real usage, not just upfront imagination.

## Why This Works

**It acknowledges discovery.** You can't know everything upfront. SRDD builds in formal checkpoints to capture emergent understanding.

**It prevents specification drift.** In pure hand-editing approaches, specs become fiction. SRDD periodically resynchronises them with reality.

**It manages AI-generated technical debt.** AI code tends to accumulate local fixes without global coherence. Periodic regeneration is refactoring at the design level.

**It preserves product wisdom.** The Q&A during regeneration captures tacit knowledge that would otherwise be lost.

**It makes room for human judgment.** Unlike pure SDD, you're not trapped by what you specified. You can adjust, feel, and dream — then capture those improvements in the next regeneration cycle.

## Practical Tips

**Keep a constitution separate from specs.** Your core intent, values, and non-negotiables should survive regeneration cycles. This is the stable layer that gives the AI consistent guidance.

**Version control your specs.** Treat them like code. Diff them between regeneration cycles to see how your understanding evolved.

**Don't regenerate too early.** Let the code evolve enough that regeneration is genuinely valuable. Premature regeneration is just churn.

**Don't regenerate too late.** If you're fighting the codebase constantly, you've waited too long. The spaghettification trigger is real — learn to feel it.

**TDD is mandatory, not optional.** Tests are how you verify that regenerated code actually does what the evolved system did. Without them, you're flying blind.

**Embrace your role as the dreamer.** AI can implement, but it can't imagine what's never existed. That's your job. Use the iteration phases to inject creativity that pure spec-driven approaches squeeze out.

## The Career Angle

If you're wondering whether this is a viable career direction: yes, but the titles are still forming. What I'm describing blends AI Solutions Architect, Staff Engineer, and what some companies are calling "Agentic AI Lead."

The core skill is architectural judgment combined with AI fluency — knowing when to let AI run, when to intervene, and when to blow it all up and rebuild. As one industry observer put it: "Prompt engineering today, broader AI leadership tomorrow."

Dedicated "Prompt Engineer" roles are actually still rare — less than 0.5% of AI-related job postings according to recent research. The skill is being absorbed into broader roles that require both technical depth and AI fluency. That's the sweet spot SRDD practitioners occupy.

## Conclusion

The AI coding methodology debate has been framed as vibe coding versus spec-driven development — chaos versus rigidity. But the real answer is neither extreme.

Vibe coding fails because AI loses context and developers lose control. Spec-driven development fails because it's BDUF in disguise, and AI can only interpolate what it's seen before.

SRDD offers a third way. Specs drive code. Code informs regenerated specs. Human judgment fills the gaps that AI can't — the feeling, the dreaming, the "this isn't quite right" that no statistical model can replicate.

Each cycle produces better architecture, more accurate documentation, and products that aren't just functional but have that ineffable quality of being *designed*, not just generated.

Your specifications deserve a return ticket. Give them one.

---

*What's your experience with AI-assisted development methodologies? Have you hit the spaghettification wall? I'd love to hear how others are navigating between structure and flexibility in the comments.*