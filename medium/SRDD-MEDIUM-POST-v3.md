# Spec-Roundtrip Driven Development: A Third Way for AI-Assisted Coding

2025 has been the year of AI coding methodologies. We've watched Andrej Karpathy coin "vibe coding" in February, GitHub release Spec Kit, Thoughtworks declare the shift to "context engineering," and everyone argue about whether we're entering a golden age or a technical debt apocalypse.

After extensive work with Claude Code, Bolt.new, and Cursor, I've landed on a hybrid approach that I'm calling **Spec-Roundtrip Driven Development (SRDD)**. But before I explain it, we need to map the territory — because the discourse has moved beyond a simple binary.

## The Landscape: Five Approaches to AI Coding

The conversation is usually framed as vibe coding versus spec-driven development. That's too simple. Here's what's actually emerging:

### 1. Vibe Coding

The casual extreme. You chat with your AI, one prompt at a time. "Add this feature." "Fix that bug." It's iterative, interactive, and feels like magic when it works.

The problems are well-documented now. Context window limitations mean the AI loses track of your app's purpose and past decisions. Suddenly it's asking you to repeat things you've already explained, or suggesting changes that ignore your previous instructions.

Worse, vibe coding gives developers a false sense of security. The AI will do whatever the current context statistically suggests — which means the same functional service (say, logging) can end up implemented in three different ways across three different files. The AI doesn't notice the inconsistency because it's not in context.

**Where vibe coding works:** Small projects where the entire codebase fits in the context window. Command-line tools, simple GUIs, utilities. I use it regularly for tools that live in my `~/bin` — rich CLIs with full documentation, knocked out in a single session.

### 2. Agentic Coding

A structured step up from vibe coding. You define goals, the AI plans and executes, you validate. Tools like Claude Code and Cursor operate in this mode when you give them multi-step tasks.

Experiments show it works — one study had an AI team with 30% fewer engineers delivering in half the time. That's compelling.

But agentic coding is still fundamentally code-first. The agent explores the codebase, makes changes, and iterates. There's no external source of truth about what the system *should* be — only what it currently is.

### 3. Context Engineering

The emerging middle ground that Thoughtworks and others are championing. The insight: it's not about prompts or specs, it's about *what information you feed the AI and when*.

This includes techniques like anchoring agents to reference applications, using Model Context Protocol (MCP) to give agents access to tools and data, and curating the smallest possible set of high-signal context for each task.

Interestingly, practitioners found something counterintuitive: AI is often more effective when it's further abstracted from the underlying system. Remove the specifics of legacy code, and the solution space becomes wider. This aligns with keeping specifications implementation-agnostic.

**The limitation:** Context engineering is still reactive and one-directional. You're curating context for the AI to consume, but there's no formal mechanism to extract updated understanding back out. The context gets stale.

### 4. Spec-Driven Development (SDD)

The structured extreme. Write detailed specifications in markdown, let AI generate code, iterate on the specs rather than the code. GitHub's Spec Kit has made this approach accessible.

The promise is seductive: specs become the source of truth, you can regenerate code from updated specs, and you get consistency that vibe coding can't provide.

The problem? It's Big Design Up Front (BDUF) wearing new clothes. What system is simple enough to fully describe before building it? You'll spend endless time looping on spec refinement before writing a single line of code. And when you discover requirements through actual usage — as you inevitably will — you're stuck updating specs to match reality rather than the other way around.

There's another problem nobody talks about: **AI doesn't dream.**

LLMs are interpolation machines, not imagination machines. They find the statistical centre of their training data. If you rely entirely on AI to implement from spec, your UI components will look like every other AI-generated UI. Your architecture will be whatever pattern appears most frequently in the training data.

A human developer "feels" when a button needs to be 2 pixels larger, or when an interaction is slightly wrong. AI can only do what it's seen before. Pure SDD produces generic products — they ship faster, but they ship bland.

### 5. SRDD: The Roundtrip Approach

This is the hybrid I've developed. It keeps what works about SDD (structure, documentation, architectural intentionality) while acknowledging that the best specifications emerge from building, not before it.

The core insight: **specs are snapshots, not contracts**. They compress your understanding at a point in time. But the code becomes the real source of truth as you iterate — and periodically, you extract new specs from evolved code.

It's a closed loop, not a one-way street.

## Comparing the Approaches

| Approach | Direction | Structure | Human Role | Best For |
|----------|-----------|-----------|------------|----------|
| Vibe Coding | Code → Code | None | Passenger | Small tools, utilities |
| Agentic Coding | Goal → Code | Light | Director | Medium projects, program-of-projects |
| Context Engineering | Context → Code | Medium | Curator | Complex brownfield, legacy |
| SDD | Spec → Code | Heavy | Author | Greenfield with stable requirements |
| **SRDD** | Spec ↔ Code | Adaptive | Architect | Long-lived products, evolving requirements |

The key differentiator for SRDD is the bidirectional arrow. Specs drive code, and evolved code drives regenerated specs.

## The SRDD Workflow

### Phase 1: Design

Everything starts with structured requirements gathering. I use a questionnaire template that covers:

- The problem and who has it
- Users, actors, and their goals
- Core functionality (must/should/could/won't have)
- User journeys and edge cases
- Data entities and lifecycle
- Non-functional requirements
- Constraints and success criteria

The output is a sequence of planning documents:

```
docs/plans/2025-01-15_v1_initial-design/
  00-PLANNING.md        ← Initial brain dump from questionnaire
  01-REQUIREMENTS.md    ← Refined functional & non-functional
  02-USECASES.md        ← User stories with acceptance criteria
  03-QA-SESSION.md      ← Q&A transcript refining the above
  04-ARCHITECTURE.md    ← Technical design, components, data model
  05-IMPLEMENTATION.md  ← Phased plan: what gets built in what order
  06-TESTPLAN.md        ← Test strategy, test data requirements
```

The AI helps generate and refine each document. The conversation is iterative — the AI asks clarifying questions, the user corrects misunderstandings, and understanding deepens on both sides.

At the end of Phase 1, create a few high-level issues from the plan. Keep the backlog lean — more issues will emerge organically.

### Phase 2: Implementation

For each issue, follow the TDD cycle:

```
failing test ↔ implement → pass
     ↑              │
     └──────────────┘
```

The AI generates test data based on the test plan. Tests are layered:

- **Unit tests**: The "T" in TDD, run constantly
- **Integration tests**: Service boundaries, APIs
- **Functional tests**: End-to-end user flows

Local UAT happens with test data. Issues found in scope loop back through TDD.

**Critical: The AI as scope guardian.** During implementation, the developer will naturally think of adjacent work — "now add password reset" while working on authentication. The AI's job is to keep focus:

> "Good idea. That's outside the scope of #42 though — want me to create an issue for it? For now, let's finish the auth flow."

The developer dreams. The AI disciplines.

### Phase 3: Review

When tests pass and implementation is complete, the AI advises "ready for review" and creates a PR linked to the issue.

Branch naming follows a convention:
```
<type>/<issue#>-<short-description>
Examples: feat/42-user-authentication, fix/47-login-regression
```

User reviews, requests changes if needed, AI updates the PR. Once approved, user merges and advises "PR MERGED". Issue closes.

### Phase 4: Production

Deploy to prod. Configure prod data access if needed. User conducts UAT on production data.

When issues are found in prod UAT:
1. AI creates a NEW issue for the bug
2. Return to Phase 2 (may need new test data)
3. New PR cycle for that issue

User confirms "UAT PASSED" when complete.

### Phase 5: Iterate or Regenerate

Normal iteration: pick next issue from backlog, return to Phase 2. New feature requests become new issues.

**But here's where SRDD diverges from everything else: the regeneration trigger.**

At some point, the code becomes spaghettified. The AI should actively detect this:

- Multiple tests covering the same functionality from different angles
- Fixes in one area causing failures in unrelated areas
- God classes/modules emerging
- Feature changes requiring edits in 5+ files
- Simple features taking longer than expected
- AI hedging: "I'm not sure if this will break something"

When detected, the AI advises:

> "I'm noticing signs of architectural drift. Consider triggering a regeneration cycle."

### The Regeneration Cycle

This is the "roundtrip" in Spec-Roundtrip Driven Development.

The AI synthesises fresh specs from:
- Current codebase (what exists)
- All previous planning docs (original intent)
- Git history — PRs, commits (decisions made)
- Issues — open and closed (what was learned)
- Test suite (what behaviours are locked in)

The output is a new dated plan directory:
```
docs/plans/2025-06-10_v3_regeneration-post-spaghetti/
  00-PLANNING.md   ← Synthesised from code + v1 + v2 + issues + PRs
  ...
```

Then restart Phase 1 with clean architecture. Tests that still apply carry forward. History is preserved. Understanding compounds.

## Why This Works

**It acknowledges discovery.** You can't know everything upfront. SRDD builds in formal checkpoints to capture emergent understanding.

**It prevents specification drift.** In pure hand-editing approaches, specs become fiction. SRDD periodically resynchronises them with reality.

**It manages AI-generated technical debt.** AI code tends to accumulate local fixes without global coherence. Periodic regeneration is refactoring at the design level.

**It preserves product wisdom.** The Q&A during regeneration captures tacit knowledge that would otherwise be lost.

**It makes room for human judgment.** Unlike pure SDD, you're not trapped by what you specified. You can adjust, feel, and dream — then capture those improvements in the next regeneration cycle.

## Practical Setup

### Global CLAUDE.md

Your global instructions should encode the SRDD methodology itself — the phases, the document sequence, the scope guardian behaviour, the spaghettification indicators. This stays consistent across projects.

### Project CLAUDE.md

Project-specific: tech stack, domain language, current active issue, pointer to current plan version. Lightweight.

### Directory Structure

```
project/
├── src/
├── tests/
├── docs/
│   ├── plans/
│   │   ├── 2025-01-15_v1_initial-design/
│   │   │   ├── 00-PLANNING.md
│   │   │   ├── 01-REQUIREMENTS.md
│   │   │   └── ...
│   │   └── 2025-06-10_v2_add-payments/
│   │       └── ...
│   └── templates/
├── CLAUDE.md
└── README.md
```

Each planning cycle gets a dated directory. History preserved. AI can reference previous versions during regeneration.

## Scaling SRDD

For larger systems with multiple bounded contexts, SRDD scales to **Scaled SRDD** — think SAFe for AI-assisted development.

Each domain gets its own SRDD cycle:
- Own planning docs
- Own issue backlog
- Own spec ↔ code loop

The system level maintains:
- A constitution (API standards, integration patterns, shared conventions)
- A dependencies declaration (who produces and consumes which APIs)
- Optionally, an API Guardian pattern to coordinate cross-domain contract evolution

The domain identity comes from the path structure:
```
Systems/ecommerce/
  identity-management/    ← Domain with its own SRDD cycle
    src/
    specs/
    contracts/           ← APIs this domain produces
    domain.yaml          ← Declares produces/consumes
    CLAUDE.md
  order-processing/      ← Another domain
    ...
```

MCP servers can provide tools for contract management, dependency checking, and cross-domain coordination. But that's a topic for another post.

## The Career Angle

If you're wondering whether this is a viable career direction: yes, but the titles are still forming. What I'm describing blends AI Solutions Architect, Staff Engineer, and what some companies are calling "Agentic AI Lead."

The core skill is architectural judgment combined with AI fluency — knowing when to let AI run, when to intervene, and when to blow it all up and rebuild.

Dedicated "Prompt Engineer" roles are actually rare — less than 0.5% of AI-related job postings. The skill is being absorbed into broader roles that require both technical depth and AI fluency. That's the sweet spot SRDD practitioners occupy.

## Conclusion

The AI coding methodology debate has been framed as vibe coding versus spec-driven development — chaos versus rigidity. But the real answer is neither extreme.

Vibe coding fails because AI loses context and developers lose control. Spec-driven development fails because it's BDUF in disguise, and AI can only interpolate what it's seen before.

SRDD offers a third way. Specs drive code. Code informs regenerated specs. Human judgment fills the gaps that AI can't — the feeling, the dreaming, the "this isn't quite right" that no statistical model can replicate.

Each cycle produces better architecture, more accurate documentation, and products that aren't just functional but have that ineffable quality of being *designed*, not just generated.

Your specifications deserve a return ticket. Give them one.

---

*I've open-sourced the SRDD templates — global CLAUDE.md, project templates, requirements questionnaire, and scaffolding script — on GitHub. [Link]*

*What's your experience with AI-assisted development methodologies? Have you hit the spaghettification wall? I'd love to hear how others are navigating between structure and flexibility in the comments.*
