# Spec-Roundtrip Driven Development: Why Your AI Coding Methodology Needs a Return Ticket

Spec-Driven Development (SDD) is having a moment. GitHub released Spec Kit, every AI coding tool now supports markdown specifications, and the promise is seductive: write detailed specs, let AI generate code, ship faster.

There's just one problem. Pure SDD assumes you can fully specify a system before building it. And if you've built anything beyond a todo app, you know that's fantasy.

I've been working with AI coding tools extensively — Claude Code, Bolt.new, Cursor — and I've landed on a hybrid approach that I'm calling **Spec-Roundtrip Driven Development (SRDD)**. It keeps what works about SDD while acknowledging an uncomfortable truth: the best specifications emerge from building, not before it.

## The Problem with Pure SDD

SDD proponents treat specifications as the source of truth. Update the spec, regenerate the code, repeat. It's intellectually clean and echoes the waterfall methodologies we thought we'd left behind.

But what system is simple enough to fully describe upfront? You're going to spend endless time looping around creating and refining specs before writing a single line of code. And even then, you'll discover requirements you couldn't have anticipated until you saw the thing running.

The SDD community acknowledges this tension. Red Hat's guide on spec-driven development identifies three camps: purists who regenerate everything from specs, pragmatists who treat AI code as a draft to be hand-edited, and those who blend human insight with AI speed through interactive sessions.

SRDD is firmly in that third camp — but with a crucial addition most don't discuss.

## The Core Insight: Specs Are Snapshots, Not Contracts

Here's what I've learned: specifications are most useful as **synchronisation mechanisms**, not as immutable sources of truth. They compress your understanding at a point in time. But the code becomes the real source of truth as you iterate.

The key insight of SRDD is that this isn't a problem to solve — it's a feature to embrace. Specs flow to code, and periodically, evolved code flows back to regenerated specs. It's a closed loop, not a one-way street.

## The SRDD Workflow

Here's the methodology I've developed:

### Phase 1: Design Iteration
Iterate on a design with AI assistance. Build documentation covering:
- Product requirements and user stories
- System architecture (kept implementation-agnostic where possible)
- Interface contracts and data models
- Key technical decisions and their rationale

Commit this documentation. It's your first spec snapshot.

### Phase 2: Environment Setup
Configure your AI coding environment properly. For Claude Code, this means setting up `claude.md` with project context, coding standards, and architectural constraints. This is your "constitution" — the stable intent that survives regeneration cycles.

### Phase 3: TDD Implementation
Have AI implement from the spec using Test-Driven Development. This is non-negotiable. Tests are your safety net for everything that follows:
- AI writes failing tests based on spec requirements
- AI implements code to pass tests
- You review for architectural alignment

### Phase 4: User Acceptance Testing
Put the thing in front of users (or yourself wearing a user hat). When issues emerge — and they will — don't just fix them:
- Write failing tests that capture the bug or missing requirement
- Have AI fix the code
- Document what you learned

This is where specifications start drifting from reality. That's fine. Keep going.

### Phase 5: Functional Iteration
Iterate on functional and interface design changes. Add features. Refine UX. Let the code evolve in response to real usage.

Here's where most methodologies stop. SRDD doesn't.

### Phase 6: The Regeneration Trigger

At some point, the code becomes spaghettified. You'll feel it: changes that should be simple become hard, the AI starts fighting the codebase, architectural seams are in the wrong places.

This is your signal to **regenerate**.

Ask the AI to produce a complete new set of specifications and design documents covering everything developed so far. Critically, conduct a Q&A session during this process:
- What new features emerged that weren't in the original spec?
- What architectural decisions proved wrong?
- What would you do differently with hindsight?

The new spec should be implementation and architecturally independent — you're extracting intent, not documenting current code.

### Phase 7: Fresh Architecture
With new specs in hand, start fresh:
- Design new architecture informed by everything you learned
- Bed in the architectural foundations first
- Implement using TDD, same as Phase 3

### Repeat Ad Infinitum
This cycle continues over the life of the product. Each roundtrip produces cleaner architecture and more accurate specifications.

## Why This Works

**It acknowledges discovery.** You can't know everything upfront. SRDD builds in formal checkpoints to capture emergent understanding.

**It prevents specification drift.** In pure hand-editing approaches, specs become fiction. SRDD periodically resynchronises them with reality.

**It manages AI-generated technical debt.** AI code tends to accumulate local fixes without global coherence. Periodic regeneration is like refactoring at the design level.

**It preserves product wisdom.** The Q&A during regeneration captures tacit knowledge that would otherwise be lost. Your specs get smarter each cycle.

## What SRDD Adds to the Conversation

The current SDD discourse focuses on the spec → code direction. SRDD makes the return journey explicit:

| Approach | Spec → Code | Code → Spec |
|----------|-------------|-------------|
| Pure SDD | ✓ | ✗ |
| Vibe Coding | ✗ | ✗ |
| Hand-editing | ✓ | Manual drift |
| **SRDD** | ✓ | ✓ (explicit regeneration) |

The bidirectional flow is what makes it sustainable for long-lived products.

## Practical Tips

**Keep a constitution separate from specs.** Your core intent, values, and non-negotiables should survive regeneration cycles. This is the stable layer.

**Version control your specs.** Treat them like code. Diff them between regeneration cycles to see how your understanding evolved.

**Don't regenerate too early.** Let the code evolve enough that regeneration is genuinely valuable. Premature regeneration is just churn.

**Don't regenerate too late.** If you're fighting the codebase constantly, you've waited too long. The spaghettification trigger is real — learn to feel it.

**TDD is mandatory, not optional.** Tests are how you verify that regenerated code actually does what the evolved system did. Without them, you're flying blind.

## The Job Market Angle

If you're wondering whether this is a viable career direction: yes, but the titles are still forming. What I'm describing blends AI Solutions Architect, Staff Engineer, and what some companies are calling "Agentic AI Lead." 

The core skill is architectural judgment combined with AI fluency — knowing when to let AI run, when to intervene, and when to blow it all up and rebuild. That's not going away anytime soon.

## Conclusion

Spec-Driven Development got one thing right: working with AI requires more structure than pure vibe coding. But it got one thing wrong: treating specs as immutable truth.

SRDD embraces the roundtrip. Specs drive code. Code informs regenerated specs. Each cycle produces better architecture and more accurate documentation.

Your specifications deserve a return ticket. Give them one.

---

*What's your experience with AI-assisted development methodologies? Have you hit the spaghettification wall? I'd love to hear how others are approaching this in the comments.*