# Spec-Roundtrip Driven Development: A Third Way for AI-Assisted Coding

I started AI-assisted coding in January 2025 and joined a community of like-minded professionals at [New Society](https://www.skool.com/new-society) where the latest AI news, tools, trends, and members' projects are discussed daily.

## Finding My Footing

I immersed myself in Cursor IDE and found the tight integration of AI assistant and editor to be a welcome combination. The experience was seamless: easy AI-assisted development, instant insight into unfamiliar code, an integrated terminal, and one-click interpretation of errors for debugging. Recent versions have pushed this further with Background Agents that run autonomously in isolated cloud environments, up to eight parallel agents working simultaneously via git worktrees, an integrated browser for testing and debugging without leaving the IDE, BugBot for automated PR code reviews, voice control, and their new Composer model that completes most tasks in under 30 seconds.

But to me, the downside is that it takes too much away from the developer. We're already seeing the consequences play out across the industry. Klarna laid off 700 customer service staff in favour of AI, only to quietly rehire humans when service quality tanked. Forrester predicts that 55% of AI-attributed layoffs will be reversed. A rigorous METR study found that developers using AI tools experienced a 19% *decrease* in productivity — while *believing* they'd become 20% more productive. That's a 39-point gap between perception and reality.

The problem isn't the tools themselves — it's the loss of understanding. When nobody knows what the code is doing, you get what one industry observer called "archaeological programming": future developers reverse-engineering AI-generated systems like anthropologists studying ancient civilizations. The commit history shows messages like "AI improvements" and "ChatGPT optimization" with no explanation of the underlying logic. Every attempt to modify the system risks breaking something else in unpredictable ways.

Developers have to remain across the codebase and architecture. The sweet spot is automating the mundane, time-consuming stuff that doesn't add much value to developers *as developers* — boilerplate code, writing tests, fixing simple bugs, explaining unfamiliar code. Humans are fallible and humans hate boredom. That's where mistakes get made. So get the AI to help there. But developers need to maintain their understanding.

That's why, when Claude Code and OpenAI's Codex emerged, I was truly in my element. Command-line tools keep me closer to what's actually happening. Run the coding assistant — including agents — from the terminal and prompt it naturally. Maintain configuration and rules in markdown files (true in Cursor too), and view changes through your favourite text editor or IDE. You can even double-dip on AI coding abilities by using Cursor as your viewer. I prefer full-screen terminal sessions with AI prompts filling the buffer, then a simple Ctrl-Tab to the IDE or browser to review code changes.

The difference is maintaining comprehension at the right level. I can't claim to understand every line — the only way to do that is to write all the code yourself. But I maintain architectural-level understanding: how the systems fit together, where the boundaries are, what the interfaces look like. The majority of algorithmic coding solutions have already been developed and exist in the LLM's "mind." I can add little there. But if I understand the high-level structure and how things connect, I know where to look when something breaks — and I can actually comprehend the AI's analysis of bugs or issues that surface.

And understanding at this architectural level enables me to more rapidly develop precise applications that address real business needs. Businesses care about bigger picture items — solutions to real problems. They don't care what sorting algorithm you use, as long as it suits their requirements. They don't care *if* you use a sorting algorithm — because they don't care about algorithms at all. They want a solution.

As a developer, you should still care about how something is written, but the insight is this: insist the AI writes methods like `sortRedBlackTree()` rather than `sort()` so you maintain a high-level understanding of what's happening without needing to trace through every line.

## The Honeymoon Phase

Like any developer new to AI coding, I started with the "vibe coding" approach. I understood the context window limitations and happily churned out utilities for my environment. I rapidly produced fully-functional, fully-documented, and fully-tested scripts — solutions I'd previously dismissed as too much work to fit into spare time. With me, if I don't complete a project quickly, I never get back to it. I get bored or consumed by other projects. So the rapid development cycle was gold.

This also solved another persistent problem: returning to an old codebase. No matter how carefully I wrote my code — with headers, comments, and documentation — once a project spanned multiple classes and files, reasoning about it became difficult. I was consistently surprised by how quickly my understanding of a system degraded after even a short break.

That, in part, is a product of how busy our lives have become. I strongly disagree that the world *needs* to be this busy — there are no imminent meteorites heading toward Earth, no expected alien invasions. And yet, as a species, we rush to deliver outcomes as if everything is an emergency. This constant urgency is driven less by necessity than by a growth-at-all-costs and endless competition mindset under modern capitalism. I’ll leave that broader critique to my essays, for those interested.

Back to the point: AI code analysis fundamentally changes this dynamic. It is fast, accurate, and relentlessly patient. Point it at a codebase and ask, “What does this do?” and within seconds you receive a coherent, high-level explanation — something that would otherwise take hours of manual reading, context rebuilding, and cognitive warm-up.


## The Wall

Once I started to expand my goals and write larger solutions with multiple services, I properly understood the limitations of a context window. Actually, I learnt this earlier when writing those multi-chapter essays mentioned before. I had this expectation that the AI would magically maintain persistence of the content. I was crushed when I asked it to print out a chapter only to find, after a quick read, that it had changed most of what we'd previously written.

To solve this problem, I wrote one of my first multi-service applications — Catalyst — to manage context across multiple chapters and even build an Astro website to display the content.

But then I ran into my next tranche of problems with AI-assisted coding:

- **Scope creep**: Features expanding beyond original intent, one "quick addition" at a time
- **Inconsistent implementations**: The same functional service (logging, error handling, configuration) implemented three different ways across three different files
- **Architectural drift**: Multiple solutions to the same problem, each locally reasonable but globally incoherent
- **Code regression**: Fixes in one area causing failures in unrelated areas — the whack-a-mole pattern
- **God classes emerging**: Modules accumulating responsibilities until they became unmaintainable
- **Velocity decay**: Simple features taking longer and longer as the codebase grew
- **AI uncertainty**: The assistant hedging with "I'm not sure if this will break something"

Catalyst development steamed along rapidly until these issues hit. I'd spend days pouring over the same problem. Then a little later it would break again, so I'd return to write more fixes and tests. I've been coding long enough to know that I had an architectural problem.

## Searching for Solutions

So I did some research and spoke to people at New Society and developed a better plan. I looked at the current AI assistant coding trends beyond vibe coding — mainly Context Engineering and Spec-Driven Development (SDD).

### Context Engineering

Context Engineering is the emerging middle ground that Thoughtworks and others are championing. The insight is that it's not about prompts or specs — it's about *what information you feed the AI and when*.

This includes techniques like anchoring agents to reference applications, using Model Context Protocol (MCP) to give agents access to tools and data, and curating the smallest possible set of high-signal context for each task. Practitioners found something counterintuitive: AI is often more effective when it's further abstracted from the underlying system. Remove the specifics of legacy code, and the solution space becomes wider.

I found Context Engineering too finicky — too "anally retentive," though they prefer to call it "disciplined precision." I agree that economisation is valuable and there's plenty to learn from this approach. But the overhead of constant curation felt unsustainable for a solo developer.

### Spec-Driven Development

If Context Engineering is about the meticulous curation of information, then Spec-Driven Development (SDD) is the high-church ritual of that world. Write detailed specifications in markdown, let AI generate code, iterate on the specs rather than the code. GitHub's Spec Kit has made this approach accessible.

The promise is seductive: specs become the source of truth, you can regenerate code from updated specs, and you get consistency that vibe coding can't provide.

But SDD is a masochist’s dream. It is Big Design Up Front (BDUF) in modern dress — the same old Waterfall assumption that a complex system can be fully specified before it is built. What real system is simple enough for that to be true?

This is precisely why Agile emerged in the first place: because BDUF consistently failed in practice, especially on large, complex projects. The further a system grows, the harder it becomes to predict interactions, edge cases, and real user behaviour from a document alone.

In reality, teams end up trapped in endless loops of specification refinement before writing a single line of code. Then, when real requirements emerge through actual use — as they inevitably do — the process breaks down. Instead of the design guiding reality, you are forced to continually retrofit the specification to match what the system has already become. The document lags behind the truth, and everyone pretends otherwise.

"Gowd, I just need to make that button blue." But first you update the UI spec, then the component spec, then regenerate, then verify the output matches. For a one-line CSS change. It's a nightmare. Managers love it — I used to have to maintain UML artifacts so I know the pain. But developers need to actually ship things.

There’s another problem nobody talks about: **AI doesn’t dream.** LLMs are interpolation machines, not imagination machines. They gravitate toward the statistical centre of their training data. If you rely entirely on AI to implement directly from specification, your architecture — and your interfaces — will tend to mirror whatever patterns appear most frequently in that data.

A human developer *feels* when something isn’t right: when a screen is doing too much, when a flow feels awkward, when a user is being asked to think too hard, or when an interaction technically “works” but emotionally misses the mark. These are not things you specify cleanly in advance. They emerge through use, discomfort, and iteration.

AI can only recombine what it has already seen. In that mode, pure SDD optimises for speed, not distinctiveness: products ship faster, but they increasingly converge on the same visual language, the same interaction patterns, and the same bland experience.

## Finding My Own Way

I liked aspects of both approaches, but as an independent developer working unpaid on this in my spare time, I didn't have the gumption to believe I could stick to either.

So I set about drawing on more than 25 years of experience as a software engineer — from early work in Waterfall and spiral models, through heavy use of UML artefacts, to later adopting and teaching Agile practices within teams, and more recently working within SAFe across multi-project programs — to develop an approach that actually works for me. What emerged is a practical alternative suited to medium-sized single projects through to coordinated multi-project systems.

I call it **Spec-Roundtrip Driven Development (SRDD)**. For larger, multi-project environments, the same principles scale into **Scaled Spec-Roundtrip Driven Development (SSRDD)** (I love symmetry).

It starts with building a spec — though one more closely aligned to a development plan — working with AI assistance and, in a smaller capacity, as a vibe-coder to build the design. It requires the developer to be hands-on: helping create requirements, architecture, and design; approving each pull request with code review and UAT; and working strategically through the issues. It keeps the developer's hands on the steering wheel, but with an AI assistant to keep it within the lane.

The core insight: **specs are snapshots, not contracts**. They compress your understanding at a point in time. But the code becomes the real source of truth as you iterate — and periodically, you extract new specs from evolved code.

The AI keeps track of the project and looks for signs of "spaghettification," then advises when to regenerate the application.

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
docs/plans/2025-12-10_v3_regeneration-post-spaghetti/
  00-PLANNING.md   ← Synthesised from code + v1 + v2 + issues + PRs
  ...
```

Then restart Phase 1 with clean architecture. Tests that still apply carry forward. History is preserved. Understanding compounds.

It's a closed loop, not a one-way street.

---

2025 has been the year of AI coding methodologies. We've watched Andrej Karpathy coin "vibe coding" in February, GitHub release Spec Kit, Thoughtworks declare the shift to "context engineering," and everyone argue about whether we're entering a golden age or a technical debt apocalypse.

After extensive work with Claude Code, Bolt.new, and Cursor, I've landed on a hybrid approach that I'm calling **Spec-Roundtrip Driven Development (SRDD)**. But before I explain it, we need to map the territory — because the discourse has moved beyond a simple binary.

## The Landscape: Five Approaches to AI Coding

The conversation is usually framed as vibe coding versus spec-driven development. That's too simple. Here's what's actually emerging:

### 1. Vibe Coding

The casual extreme. You chat with your AI, one prompt at a time. "Add this feature." "Fix that bug." It's iterative, interactive, and feels like magic when it works.

The problems are well-documented now. Context window limitations mean the AI loses track of your app's purpose and past decisions. Suddenly it's asking you to repeat things you've already explained, or suggesting changes that ignore your previous instructions.

Worse, vibe coding gives developers a false sense of security. The AI will do whatever the current context statistically suggests — which means the same functional service (say, logging) can end up implemented in three different ways across three different files. The AI doesn't notice the inconsistency because it's not in context.

**Where vibe coding works:**

- Small projects where the entire codebase fits in the context window
- Command-line tools, simple GUIs, utilities
- Tools that live in `~/bin` — rich CLIs with full documentation, knocked out in a single session

**Advantages:**

- Fastest time to first output — no planning overhead
- Interactive, iterative, feels like magic when it works
- Perfect for small, context-window-sized projects
- Great for utilities, CLIs, simple GUIs, one-session tools

**Limitations:**

- Context window limits mean AI loses track of purpose and past decisions
- Same functionality implemented inconsistently across files
- False sense of security — AI does whatever current context suggests
- Doesn't scale beyond what fits in context

### 2. Agentic Coding

A structured step up from vibe coding. You define goals, the AI plans and executes, you validate. Tools like Claude Code and Cursor operate in this mode when you give them multi-step tasks.

Experiments show it works — one study had an AI team with 30% fewer engineers delivering in half the time. That's compelling.

But agentic coding is still fundamentally code-first. The agent explores the codebase, makes changes, and iterates. There's no external source of truth about what the system *should* be — only what it currently is.

**Advantages:**

- Structured goal-based approach with AI planning
- Studies show 30% fewer engineers delivering in half the time
- Handles multi-step tasks autonomously
- Good for medium complexity, program-of-projects work

**Limitations:**

- Still fundamentally code-first — no external source of truth
- Only knows what currently exists, not original intent
- Can drift from requirements without formal checkpoints
- No mechanism to capture decisions for future reference

### 3. Context Engineering

The emerging middle ground that Thoughtworks and others are championing. The insight: it's not about prompts or specs, it's about *what information you feed the AI and when*.

This includes techniques like anchoring agents to reference applications, using Model Context Protocol (MCP) to give agents access to tools and data, and curating the smallest possible set of high-signal context for each task.

Interestingly, practitioners found something counterintuitive: AI is often more effective when it's further abstracted from the underlying system. Remove the specifics of legacy code, and the solution space becomes wider. This aligns with keeping specifications implementation-agnostic.

**Advantages:**

- Focuses on high-signal context curation
- AI more effective when abstracted from legacy specifics
- MCP enables tool and data access
- Works well for complex brownfield and legacy systems

**Limitations:**

- Reactive and one-directional
- No formal mechanism to extract updated understanding back out
- Context gets stale over time
- Requires constant manual curation

### 4. Spec-Driven Development (SDD)

The structured extreme. Write detailed specifications in markdown, let AI generate code, iterate on the specs rather than the code. GitHub's Spec Kit has made this approach accessible.

The promise is seductive: specs become the source of truth, you can regenerate code from updated specs, and you get consistency that vibe coding can't provide.

The problem? It's Big Design Up Front (BDUF) wearing new clothes. What system is simple enough to fully describe before building it? You'll spend endless time looping on spec refinement before writing a single line of code. And when you discover requirements through actual usage — as you inevitably will — you're stuck updating specs to match reality rather than the other way around.

There's another problem nobody talks about: **AI doesn't dream.**

LLMs are interpolation machines, not imagination machines. They find the statistical centre of their training data. If you rely entirely on AI to implement from spec, your UI components will look like every other AI-generated UI. Your architecture will be whatever pattern appears most frequently in the training data.

A human developer "feels" when a button needs to be 2 pixels larger, or when an interaction is slightly wrong. AI can only do what it's seen before. Pure SDD produces generic products — they ship faster, but they ship bland.

**Advantages:**

- Specs become the source of truth
- Can regenerate code from updated specs
- Consistency that vibe coding can't provide
- Good for greenfield with stable, well-understood requirements

**Limitations:**

- Big Design Up Front (BDUF) in disguise
- Endless spec refinement loops before writing code
- Requirements discovered through usage force awkward spec updates
- AI doesn't dream — produces generic, statistically average outputs

### 5. SRDD: The Roundtrip Approach

This is the hybrid I've developed. It keeps what works about SDD (structure, documentation, architectural intentionality) while acknowledging that the best specifications emerge from building, not before it.

The core insight: **specs are snapshots, not contracts**. They compress your understanding at a point in time. But the code becomes the real source of truth as you iterate — and periodically, you extract new specs from evolved code.

It's a closed loop, not a one-way street.

**Advantages:**

- Bidirectional spec-code loop captures emergent understanding
- Prevents specification drift through regeneration cycles
- Manages AI-generated technical debt at design level
- Preserves product wisdom through structured Q&A
- Makes room for human judgment — the "feel" AI can't replicate

**Limitations:**

- More overhead than vibe/agentic for simple projects
- Requires discipline to recognise and trigger regeneration
- Learning curve for the full workflow
- Overkill for utilities and small tools

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

**Advantages:**

- Each domain maintains its own SRDD cycle independently
- System constitution ensures integration consistency
- API Guardian pattern coordinates cross-domain contract evolution
- Scales to large multi-bounded-context systems

**Limitations:**

- Significant coordination overhead between domains
- Requires cross-team buy-in on standards
- Contract management adds complexity
- Tooling (MCP servers, guardians) still maturing

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
