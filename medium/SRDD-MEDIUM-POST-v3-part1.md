# Spec-Roundtrip Driven Development: A Third Way for AI-Assisted Coding

I started AI-assisted coding in January 2025 and joined a community of like-minded professionals at [New Society](https://www.skool.com/new-society), where AI tools, methods, and real-world projects are discussed daily.

Like most developers, I arrived curious, sceptical, and slightly overwhelmed.

## Finding My Footing

I immersed myself in Cursor IDE and immediately appreciated the tight integration between editor and assistant. AI-assisted development, instant explanations of unfamiliar code, integrated terminals, and one-click error interpretation all felt like genuine productivity gains.

Recent releases pushed this even further: background agents running in isolated environments, parallel agents via git worktrees, integrated browsers for testing, automated PR review bots, voice input, and fast-turnaround “composer” tasks that complete in seconds.

But very quickly, something started to bother me.

The more capable these tools became, the more they *pulled the developer away* from the system itself. And we’re already seeing the consequences play out across the industry. Klarna laid off 700 customer-service staff in favour of AI, only to quietly rehire humans when quality dropped. Forrester predicts that over half of AI-attributed layoffs will be reversed. A rigorous METR study found that developers using AI tools experienced a **19 percent decrease in productivity** — while believing they had become **20 percent more productive**.

That 39-point gap between perception and reality matters.

The problem isn’t the tools. It’s the loss of understanding.

When nobody really knows what the code is doing, you get what one observer called *archaeological programming*: future developers reverse-engineering AI-generated systems like anthropologists studying ancient ruins. Commit histories read “AI improvements” and “ChatGPT optimisation” with no explanation of *why* anything exists. Every change risks breaking something else.

Developers need to remain across the codebase and architecture. The sweet spot is automating the boring, low-value work — boilerplate, tests, routine fixes, explanations — while keeping humans responsible for structure, intent, and judgment.

That’s why tools like Claude Code and OpenAI’s Codex clicked for me. Command-line assistants keep you closer to what’s actually happening. You run the AI deliberately, review diffs in your editor, and stay oriented. I don’t understand every line of generated code — no one can unless they write it all themselves — but I maintain *architectural understanding*: how the system fits together, where the boundaries are, and where to look when something breaks.

Businesses don’t care which sorting algorithm you chose. They care that the system solves their problem. As developers, our job is to care *just enough* — and to name things well enough that intent stays visible. I’d much rather see `sortRedBlackTree()` than `sort()` and retain that understanding without spelunking through every line.

This approach to small well named functions / methods is one of the principals in Uncle Bob's "Clean Code" - see [summary of this](https://gist.github.com/wojteklu/73c6914cc446146b8b533c0988cf8d29#functions-rules), [general video](https://youtu.be/7EmboKQH8lM) and [book](https://www.goodreads.com/book/show/3735293-clean-code).

## The Honeymoon Phase

Like everyone new to AI coding, I started with “vibe coding”. I churned out utilities I’d previously written off as not worth the effort. Fully tested, documented tools appeared in hours instead of weekends.

It also solved another persistent problem: returning to old codebases. Even with good documentation, once a project spanned multiple files and services, understanding decayed quickly. AI code analysis changed that. Point it at a repository and ask, “What does this do?” — and within seconds you get a coherent, high-level explanation that would normally take hours of context rebuilding.

That patience is transformative.

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

I’d been coding long enough to recognise the pattern. This wasn’t a tooling problem. It was an architectural one.

## Surveying the Landscape

By mid-2025, the industry had names for what I was experiencing.

We’d watched Andrej Karpathy coin *vibe coding*. GitHub released Spec Kit. Thoughtworks declared the shift toward *context engineering*. Others leaned into increasingly agentic approaches.

What became clear is that this wasn’t a binary debate. Five distinct approaches were emerging:

* **Vibe coding**: fast, magical, but limited to what fits in context
* **Agentic coding**: goal-driven and powerful, but still code-first
* **Context engineering**: disciplined curation of information, but brittle and one-way
* **Spec-driven development (SDD)**: structured and consistent — but Big Design Up Front in modern dress
* …and something missing in between

SDD in particular troubled me. It promises order, but assumes you can fully specify complex systems upfront — the same Waterfall fallacy Agile emerged to escape. Worse, there’s a quieter problem nobody talks about.

**AI doesn’t dream.**

LLMs interpolate. They gravitate toward the statistical centre of their training data. If you rely entirely on AI to implement from specification, your architecture — and your interfaces — converge on the same patterns everyone else ships.

A human developer feels when a screen is doing too much, when a flow is awkward, when something technically works but emotionally misses. Those judgments emerge through use and discomfort. They don’t live cleanly in specs.

Pure SDD optimises for speed, not distinctiveness.

## Finding a Third Way

As a solo developer working unpaid in spare time, I knew I wouldn’t sustain either extreme. So I drew on 25 years of experience — from Waterfall and spiral models, through UML-heavy enterprise systems, to Agile teams and SAFe programs — and built something that worked for me.

I call it **Spec-Roundtrip Driven Development (SRDD)**. For larger environments, it scales to **Scaled SRDD (SSRDD)**.

The core insight is simple:

**Specs are snapshots, not contracts.**

They capture understanding at a moment in time. Code evolves. Periodically, you must extract new understanding *from* the code and regenerate the specs.

Specs guide code. Code informs regenerated specs. It’s a closed loop.

The developer stays hands-on — shaping requirements, reviewing PRs, validating behaviour — while AI handles execution, analysis, and discipline. The human dreams. The AI keeps the lane.

That roundtrip is what keeps understanding compounding instead of decaying.

---

### Where to take this next

* **Part 2** can stay as the deep dive: workflows, regeneration cycles, scaling patterns.
* This Part 1 now stands alone as a **conceptual positioning piece**.
* Medium readers get the *why* before the *how*.

If you want, next I can:

* tighten this further for Medium’s scroll behaviour,
* split it into a short + long read,
* or rewrite the opening to be more provocative for distribution.
