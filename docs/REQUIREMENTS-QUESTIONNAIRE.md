# Requirements Gathering Questionnaire

Use this template to elicit initial requirements from the user. Work through each section conversationally — don't just fire questions. Adapt based on answers.

---

## 1. The Problem

**Opening:**
> Let's start by understanding what we're solving.

- What problem are we solving?
- Who has this problem? (specific people, roles, situations)
- What happens today without this solution?
- What happens if we don't solve it?
- Why now? What's driving the need?

---

## 2. Users & Actors

**Opening:**
> Now let's understand who will use this.

- Who are the primary users?
- Are there different user roles with different needs?
- Who are secondary users (admins, support, etc.)?
- Are there external systems that will interact with this?
- Who are the stakeholders (care about it but don't use it directly)?

**For each user type, understand:**
- What's their goal?
- What's their technical comfort level?
- How often will they use it?
- What frustrates them about current solutions?

---

## 3. Core Functionality

**Opening:**
> Let's prioritise what the system needs to do.

**Must Have (MVP):**
- What absolutely must work for this to be useful?
- What's the minimum viable version?

**Should Have (v1.0):**
- What makes it properly useful?
- What would feel missing without it?

**Could Have (future):**
- What would be nice but can wait?
- What are stretch goals?

**Won't Have (out of scope):**
- What explicitly is NOT part of this project?
- What might people assume is included but isn't?

---

## 4. User Journeys

**Opening:**
> Walk me through how someone would actually use this.

**Happy Path:**
- Describe the main user flow from start to finish
- What's the trigger that starts the journey?
- What does success look like?

**Alternative Paths:**
- What variations exist in the flow?
- Are there different ways to accomplish the same goal?

**Edge Cases:**
- What can go wrong?
- What unusual situations might arise?
- How should errors be handled?

---

## 5. Data

**Opening:**
> Let's understand the data this system will work with.

**Data Entities:**
- What are the main things (nouns) the system manages?
- How do they relate to each other?

**Data Sources:**
- Where does data come from?
- Manual entry? Import? External systems?

**Data Lifecycle:**
- How is data created, updated, deleted?
- What's the retention policy?
- Is there archival or history needed?

**Sensitive Data:**
- What data is sensitive or personal?
- What protection is required?
- Any compliance requirements (GDPR, HIPAA, etc.)?

---

## 6. Non-Functional Requirements

**Opening:**
> Beyond features, let's talk about how it needs to perform.

**Performance:**
- Expected response times?
- Any operations that could be slow?

**Scale:**
- How many users (now and future)?
- Data volume expectations?
- Peak usage patterns?

**Availability:**
- Uptime requirements?
- Maintenance windows acceptable?
- Disaster recovery needs?

**Security:**
- Authentication requirements?
- Authorization model (who can do what)?
- Audit/logging requirements?

---

## 7. Constraints

**Opening:**
> What limitations do we need to work within?

**Technology:**
- Required technologies (mandated by org)?
- Forbidden technologies?
- Existing systems to integrate with?

**Resources:**
- Budget constraints?
- Timeline requirements?
- Team size/skills?

**Environment:**
- Where will this run?
- Deployment requirements?
- Infrastructure constraints?

**Organisational:**
- Approval processes?
- Compliance requirements?
- Third-party dependencies?

---

## 8. Success Criteria

**Opening:**
> How will we know this project succeeded?

**Functional Success:**
- What specific things must work?
- Acceptance criteria for MVP?

**Measurable Outcomes:**
- What metrics would indicate success?
- Before/after comparisons possible?

**User Success:**
- How will users feel about it?
- What would make them love it vs tolerate it?

**Definition of Done:**
- What does "done" look like for v1?
- What would warrant a v2?

---

## 9. Risks & Assumptions

**Opening:**
> Let's surface what might derail us or what we're assuming.

**Risks:**
- What could go wrong?
- What unknowns exist?
- Dependencies on external factors?

**Assumptions:**
- What are we assuming is true?
- What happens if those assumptions are wrong?

---

## 10. Existing Context

**Opening:**
> What prior work or context should I know about?

- Is this replacing something existing?
- Previous attempts at solving this?
- Existing documentation or specs?
- Related systems to understand?
- Domain knowledge I should have?

---

## Wrap-Up

**Closing:**
> Let me summarise what I've understood, and you can correct anything I've got wrong.

Then generate **00-PLANNING.md** from this conversation.
