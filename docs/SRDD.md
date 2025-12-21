# SRDD: Spec-Roundtrip Driven Development — formal specs, TDD, phased documentation, regeneration cycles

This methodology defines a structured approach to AI-assisted development with bidirectional spec-code flow.

---

## SRDD Phases Overview

```
Phase 1: DESIGN      → Requirements, use cases, architecture, planning docs
Phase 2: IMPLEMENT   → TDD cycle per issue, test data generation
Phase 3: REVIEW      → PR creation, user review, merge
Phase 4: PRODUCTION  → Deploy, UAT on prod data
Phase 5: ITERATE     → Next issue or REGENERATE if spaghettified
```

---

## Phase 1: Design

### Document Sequence
All planning documents go in `docs/plans/<yyyy-mm-dd>_v#_<short-name>/`

```
00-PLANNING.md        ← Initial brain dump from requirements gathering
01-REQUIREMENTS.md    ← Refined functional & non-functional requirements
02-USECASES.md        ← User stories with acceptance criteria
03-QA-SESSION.md      ← Q&A transcript refining the above
04-ARCHITECTURE.md    ← Technical design, components, data model
05-IMPLEMENTATION.md  ← Phased plan: what gets built in what order
06-TESTPLAN.md        ← Test strategy, test data requirements
```

### Requirements Gathering
Use the structured questionnaire in `docs/templates/REQUIREMENTS-QUESTIONNAIRE.md` to elicit initial requirements from user.

### Issue Creation
- Create only a few high-level issues from planning
- Keep backlog lean and visible
- More issues will emerge organically during development

---

## Phase 2: Implementation

### TDD Cycle
```
failing test ↔ implement → pass
     ↑              │
     └──────────────┘
```

- Write failing test first
- Implement minimum to pass
- Refactor if needed
- Repeat

### Test Types
- **Unit tests**: The "T" in TDD, run constantly
- **Integration tests**: Service boundaries, APIs
- **Functional tests**: End-to-end user flows

### Test Data
- AI generates test data based on 06-TESTPLAN.md
- Update test data when new scenarios discovered
- Prod UAT issues may require new test data

---

## Phase 3: Review

### PR Workflow
1. AI advises "ready for review" when tests pass and implementation complete
2. AI creates PR with "Closes #<issue>" in description
3. User reviews, requests changes if needed
4. AI updates PR based on feedback
5. User merges and advises "PR MERGED"
6. Issue auto-closes on merge

### Branch Naming
```
<type>/<issue#>-<short-description>

Types:
  feat     — New feature
  fix      — Bug fix
  doc      — Documentation
  security — Security-related
  refactor — Code restructure
  test     — Test additions/fixes
  chore    — Maintenance

Example: feat/42-user-authentication
```

### Before First PR
Single `dev` branch is fine. Feature branches start once PR workflow begins.

---

## Phase 4: Production

### Deployment
1. User deploys merged code to prod
2. Configure prod data access if needed
3. User conducts UAT on prod data

### Prod UAT Issues
When issues found in prod UAT:
1. AI creates NEW issue for the bug
2. Return to Phase 2, step 11 (may need new test data)
3. New PR cycle for that issue

User confirms "UAT PASSED" when complete.

---

## Phase 5: Iterate or Regenerate

### Normal Iteration
- Pick next issue from backlog → Phase 2
- New feature request → Create issue → Phase 2
- Significant new functionality → Phase 1 (new planning docs)

### Regeneration Trigger
AI should flag when it observes spaghettification indicators:

**Code Smells**
- Multiple tests covering same functionality from different angles
- Tests hard to write due to complex setup
- Difficulty isolating units for testing

**Regression Patterns**
- Fixes in one area causing failures in unrelated areas
- "Whack-a-mole" bug patterns
- Increasing defensive coding

**Structural Issues**
- God classes/modules emerging
- Circular dependencies
- Copy-paste code across modules
- Feature changes requiring edits in 5+ files

**Velocity Decay**
- Simple features taking longer than expected
- AI struggling to make changes confidently
- Increasing hedging: "I'm not sure if this will break something"

### Regeneration Process
When triggered:
1. AI synthesises fresh specs from:
   - Current codebase
   - All previous planning docs
   - Git history (PRs, commits)
   - Issues (open and closed)
   - Test suite
2. New dated plan directory: `docs/plans/<date>_v#_regeneration/`
3. Fresh 00-PLANNING.md capturing current state + learnings
4. Restart Phase 1 with clean architecture

---

## Scope Management

### AI Role: Scope Guardian

When user requests work outside current issue scope:
1. Acknowledge the idea is valid
2. Note it's outside current issue scope
3. Offer to create a new issue
4. Refocus on current work

**Example:**
```
User: "Now add password reset functionality"

AI: "Good idea. That's outside the scope of #42 though — 
     want me to create an issue for it? 
     For now, let's finish the auth flow."
```

### Do NOT
- Silently expand scope
- Proactively suggest new features unprompted
- Create issues without user involvement

### DO
- Respond to user's new ideas with issue-creation offers
- Keep current issue focused
- Remind user of current issue scope if conversation drifts
- Curate issue creation through discussion

---

## Issue Management

### Creation
- Developer identifies work, AI curates through discussion
- Check existing issues before creating (avoid duplicates)
- Keep titles actionable: "Implement X" not "X"
- Include acceptance criteria
- Tag with appropriate labels
- Reference originating context

### Backlog Health
- Closed issues > open issues (momentum)
- If backlog grows faster than it shrinks, pause and reassess
- Advise user if issues seem duplicative or should be split

---

## Communication

### Key Phrases

**From User:**
- "PR MERGED" — Proceed to production or next issue
- "UAT PASSED" — Current work complete, update docs, pick next issue
- "Let's regenerate" — Trigger regeneration cycle

**From AI:**
- "Ready for review" — Tests pass, implementation complete, create PR
- "This is outside #X scope" — Scope guardian intervention
- "I'm noticing spaghettification signs" — Consider regeneration

---

## Documentation

After UAT PASSED:
- Update README if user-facing changes
- Update API docs if endpoints changed
- Update user guides if workflows changed
- Ensure code comments explain "why" not "what"
