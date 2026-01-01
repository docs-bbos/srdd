# SRDD Is the Best AI Coding Methodology

**Spec-Roundtrip Driven Development** — Keeping developers in control while building better systems with aligned AI

I’m a senior software engineer with over 25 years of experience working across government, finance, science, defence, and large-scale commercial systems. I started AI-assisted coding in January 2025 and joined a community of like-minded professionals at [New Society](https://www.skool.com/new-society), where AI tools, methods, and real-world projects are discussed daily.

The source documentation for this series — including the evolving methodology, explanations, and supporting material — is maintained openly at **[https://docs-bbos.github.io/srdd/](https://docs-bbos.github.io/srdd/)**. That site serves as the canonical reference for the ideas presented here.

The underlying repository, which includes working assets such as templates, rules files, and examples, is available at **[https://github.com/docs-bbos/srdd/](https://github.com/docs-bbos/srdd/)**.

Much of the work that informed this series was done in my own time, driven by a growing fascination — and concern — that AI-assisted coding is where the software engineering world is headed. Over the months that followed, I spent time working with multiple AI coding methodologies — from low-friction experimentation to heavily structured approaches — and saw the same patterns repeat as systems grew.

It became clear to me that the industry had been set adrift by the sudden acceleration of these tools, with no shared footing yet established. What I’ve learned — and what I’m trying to convey in this series — is an attempt to help find that footing, without discarding the hard-won lessons of software engineering along the way.

Like most developers, I arrived curious, sceptical, and slightly overwhelmed.

## Finding My Footing

I immersed myself in Cursor IDE and immediately appreciated the tight integration between editor and assistant. AI-assisted development, instant explanations of unfamiliar code, integrated terminals, and one-click error interpretation all felt like genuine productivity gains.

Recent releases pushed this even further: background agents running in isolated environments, parallel agents via git worktrees, integrated browsers for testing, automated PR review bots, voice input, and fast-turnaround “composer” tasks that complete in seconds.

But very quickly, something started to bother me.

The more capable these tools became, the more they *pulled the developer away* from the system itself. And we’re already seeing the consequences play out across the industry. Klarna laid off around 700 customer-service staff in favour of AI-driven automation, only to later acknowledge falling service quality and begin rehiring human agents (*[Company That Sacked 700 Workers With AI Now Regrets It](https://www.economictimes.com/news/international/us/company-that-sacked-700-workers-with-ai-now-regrets-it-scrambles-to-rehire-as-automation-goes-horribly-wrong/articleshow/121732999.cms)*; *[Klarna Reverses on AI, Says Customers Like Talking to People](https://www.forbes.com/sites/quickerbettertech/2025/05/18/business-tech-news-klarna-reverses-on-ai-says-customers-like-talking-to-people/)*). Forrester has similarly predicted that more than half of AI-attributed layoffs will be quietly reversed as organisations confront the limits of premature automation (*[Forrester: AI Layoffs Will Be Quietly Reversed](https://www.theregister.com/2025/10/29/forrester_ai_rehiring/)*).

The problem isn’t the tools. It’s the loss of understanding.

When nobody really knows what the code is doing, you get what one observer called *archaeological programming*: future developers reverse-engineering AI-generated systems like anthropologists studying ancient ruins. Commit histories read “AI improvements” and “ChatGPT optimisation” with no explanation of *why* anything exists. Every change risks breaking something else — a pattern increasingly described as software archaeology (*[The Junior Developer Extinction: We’re All Building the Next Programming Dark Age](https://generativeai.pub/the-junior-developer-extinction-were-all-building-the-next-programming-dark-age-f66711c09f25)*).

Developers need to remain across the codebase and architecture. The sweet spot is automating the boring, low-value work — boilerplate, tests, routine fixes, explanations — while keeping humans responsible for structure, intent, and judgment.

That’s why tools like Claude Code and OpenAI’s Codex clicked for me. Command-line assistants keep you closer to what’s actually happening. You run the AI deliberately, review diffs in your editor, and stay oriented. I don’t understand every line of generated code — no one can unless they write it all themselves — but I maintain *architectural understanding*: how the system fits together, where the boundaries are, and where to look when something breaks.

Businesses don't care which sorting algorithm you chose. They care that the system solves their problem. As developers, our job is to care *just enough* — and to name things well enough that intent stays visible.

This matters more with AI-generated code, not less. When you didn't write it yourself, you need to grasp intent at a glance. I'd much rather see `sortRedBlackTree()` than `sort()` and retain that understanding without spelunking through every line. The AI can generate the implementation; the human ensures the names reveal what it actually does.

This is Uncle Bob's "Clean Code" — small, well-named functions that communicate intent. See [summary](https://gist.github.com/wojteklu/73c6914cc446146b8b533c0988cf8d29#functions-rules), [video](https://youtu.be/7EmboKQH8lM), and [book](https://www.goodreads.com/book/show/3735293-clean-code). The principles predate AI coding, but AI coding makes them essential. If the AI generates opaque code with generic names, you've lost the architectural understanding that keeps you in control.

This article is not just an introduction to a new methodology. It is also a survey of the major AI-assisted development approaches that have emerged over the past year — what they optimise for, where they succeed, and where they begin to break down as systems grow.

## The Honeymoon Phase

Like everyone new to AI coding, I started with “vibe coding”. I churned out utilities I’d previously written off as not worth the effort. Fully tested, well-documented tools appeared in hours instead of weekends.

It also solved another persistent problem: returning to old codebases. Even with good documentation, once a project spanned multiple files and services, understanding decayed quickly. AI code analysis changed that. Point it at a repository and ask, “What does this do?” — and within seconds you get a coherent, high-level explanation that would normally take hours of context rebuilding.

That kind of patience changes how you work.

At the same time, I should be clear about something: I don’t buy the modern obsession with speed for its own sake. Not everything needs to be solved immediately, as if a meteorite were on a collision course with Earth — or some alien civilisation had scheduled our planet for demolition to make way for an intergalactic super-highway. Most of the urgency we live under isn’t existential at all. It’s manufactured — a capitalistic pressure built around perpetual competition. We must ship first. We must grow faster. Before them. What a load of codswallop. This mindset is quietly exhausting people and degrading the planet in the process.

I’ve written — and continue to write — about these dynamics elsewhere, for anyone interested in digging further.

The reason I *do* embrace AI coding is different. It removes the mundane and the laborious. Writing boilerplate. Churning out test scaffolding. Re-implementing solutions that have already been solved a thousand times, in a dozen languages. Few developers genuinely enjoy that work, and fewer would argue it’s where human creativity is best spent.

What *is* fulfilling is building architecturally coherent systems, writing novel code where novelty matters, and shaping systems with a sense of intent — even a kind of poetry or artistry. AI coding makes room for that. By offloading the repetitive and the already-solved, it gives developers the space to focus on structure, meaning, and design.

And that shift — from exhaustion to intention — is quietly transformative.

## Hitting the Wall

The cracks appeared when I moved beyond small tools into multi-service systems.

I first encountered this while writing long-form essays — expecting the AI to maintain continuity across chapters, only to discover it quietly rewriting earlier material. The assumption that it was “keeping the whole thing in mind” turned out to be false. Later, the same thing happened in code. As systems grew, context windows became constraints rather than conveniences.

When that continuity breaks, the AI doesn’t fail loudly — it degrades subtly. Lacking persistent awareness of prior decisions, intent, and structure, it defaults to locally optimal changes made one prompt at a time. That’s when the familiar symptoms begin to appear:

* scope creep, one “small change” at a time
* inconsistent implementations of the same concerns
* architectural drift
* regressions popping up elsewhere
* god classes forming
* velocity slowing as complexity rose
* the AI hedging: “I’m not sure if this will break something”

I’d been coding long enough to recognise the pattern. This wasn’t just a tooling problem. It was a deeper failure of software-engineering fundamentals — violated design principles, eroded architectural patterns, and the slow decay of clean, comprehensible code. These are issues that only emerge clearly with professional experience. They don’t announce themselves immediately, and they’re easy to miss if you haven’t had to maintain, extend, and live with systems over time. But once you have, the signs are unmistakable.

## Surveying the Landscape

By mid-2025, it was clear that I wasn’t alone in hitting this wall. As AI-assisted coding moved beyond small tools and demos into longer-lived systems, the same failure modes were appearing everywhere: loss of coherence, architectural drift, and teams no longer fully understanding the systems they were shipping.

In response, the industry began to fragment into distinct AI coding methodologies. Some approaches effectively ignored the problem altogether — because they were never intended to operate at that scale. Others attempted to address it directly, each in their own way, with different assumptions about control, structure, and responsibility.

We watched Andrej Karpathy coin *vibe coding*. GitHub released Spec Kit. Thoughtworks declared the shift toward *context engineering*. Others leaned into increasingly agentic approaches.

What became clear is that this wasn’t a binary debate. Five distinct approaches were emerging:

* **Vibe coding**: fast, magical, but limited to what fits in context
* **Agentic coding**: goal-driven and powerful, but still code-first
* **Context engineering**: disciplined curation of information, but brittle and one-way
* **Spec-driven development (SDD)**: structured and consistent — but Big Design Up Front in modern dress
* …and something missing in between

SDD in particular troubled me. It promises order, but assumes you can fully specify complex systems upfront — the same Waterfall fallacy Agile emerged to escape. Worse, there’s a quieter problem nobody talks about.

**AI doesn’t dream.**

LLMs interpolate. They gravitate toward the statistical centre of their training data. If you rely entirely on AI to implement from specification, your architecture — and your interfaces — converge on the same patterns everyone else ships.

A human developer feels when a screen is doing too much, when a flow is awkward, when something technically works but emotionally misses. Those judgments emerge through use, friction, and lived interaction. They do not reside cleanly in specifications.

Pure SDD doesn’t optimise for speed. At scale, it is often painfully slow. What it optimises for instead is **consistency, formal declaration, and auditability**: clearly defined artefacts, traceable decisions, and boxes that can be ticked with confidence. The result is systems that are internally coherent on paper, defensible in process, and deeply constrained in expression.

## Finding a Third Way

As a solo developer working unpaid in my spare time, I knew I wouldn’t sustain any of these for my bigger projects. So I drew on my 25+ years of experience — from Waterfall and spiral models, through UML-heavy enterprise systems, to Agile teams and SAFe programs — to build something that worked for me.

That professional background isn’t the point. It simply informed my analysis and helped me recognise the patterns early. The result itself is deliberately simple.

I call it **Spec-Roundtrip Driven Development (SRDD)**. For larger environments, it scales through **Scaled SRDD (SSRDD)**.

The core insight is simple:

**Specs are snapshots, not contracts.**

They capture understanding at a moment in time. Code evolves. Periodically, you must extract new understanding *from* the code and regenerate the specs.

Specs guide code. Code informs regenerated specs. It’s a closed loop.

The developer stays hands-on — shaping requirements, reviewing PRs, and validating behaviour — with their hands firmly on the steering wheel. The AI handles execution, analysis, and discipline, keeping the system within its lane and keeping that baby on the road. The human dreams and chooses the destination; the AI helps get there.

That roundtrip is what keeps understanding compounding instead of decaying.

## Where This Goes Next

Spec-Roundtrip Driven Development is about aligning AI-assisted coding with the realities of professional systems development and the outcomes we actually care about: coherent architecture, maintainable systems, and products that feel intentional rather than accidental — **with the potential to operate effectively at scale**.

SRDD builds on what AI is genuinely good at, recognises its limits, and restores the developer's role as the system's steward — hands on the steering wheel — rather than a passive passenger.

This is a four-part series:

- **Part 1** (this article): Why SRDD exists
- **[Part 2: The AI Coding Landscape](https://brooke.medium.com/srdd-part2-of-4)** — Vibe coding, agentic coding, context engineering, and spec-driven development
- **[Part 3: The SRDD Workflow](https://brooke.medium.com/srdd-part3-of-4)** — Phases, contracts, regeneration
- **[Part 4: Scaling Up](https://brooke.medium.com/srdd-part4-of-4)** — SSRDD, principles, and implementation

Continue to Part 2:
👉 **[The AI Coding Landscape](https://brooke.medium.com/srdd-part2-of-4)**

---

© 2025 Brooke Smith. All rights reserved.

This document constitutes a public disclosure and defensive publication of the
Spec-Roundtrip Driven Development (SRDD) and Scaled SRDD (SSRDD) methodologies.

The author expressly places the concepts, processes, and workflows described
herein into the public domain as prior art, for the purpose of preventing
subsequent patent claims or exclusive ownership by third parties.

Commercial use, redistribution, or derivative works of this text require
explicit permission from the author.