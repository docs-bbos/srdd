# SCALED-SRDD: Multi-domain systems with API contracts, domain coordination, and distributed spec-code cycles

This methodology extends SRDD for large systems with multiple bounded contexts/domains/sub-domains.

---

## Overview

Scaled SRDD applies SRDD principles at the domain level while adding:
- Cross-domain API contract management
- Domain identity from path structure
- Coordination between domain agents
- System-wide constitution for integration standards

---

## Directory Structure
```
Systems/<system-name>/
  system/                          ← System-level config
    CONSTITUTION.md                 ← Integration standards, API formats
  
  <domain-a>/                       ← Each domain runs its own SRDD cycle
    src/
    tests/
    specs/                          ← Domain-local SRDD artifacts
    contracts/
      api-<n>.yaml                  ← APIs this domain PRODUCES (inferred from files)
      consumes.yaml                 ← APIs this domain CONSUMES (explicit)
    CLAUDE.md                       ← Domain-specific rules
  
  <domain-b>/
    ...
```

---

## Domain Identity

Domain identity and contracts are inferred from structure — minimal explicit declaration:
```
Working in: Systems/ecommerce/order-processing/
  → System: ecommerce
  → Domain: order-processing
  → Produces: [inferred from contracts/*.yaml files, excluding consumes.yaml]
  → Consumes: [explicit in contracts/consumes.yaml]
```

---

## consumes.yaml

Each domain explicitly declares what external APIs it depends on:
```yaml
# contracts/consumes.yaml
consumes:
  - identity-management/api-users
  - inventory/api-stock
```

What the domain **produces** is inferred from the other files in `contracts/` — no need to declare it.

## API Contract Files

Each `contracts/api-<name>.yaml` file is an OpenAPI 3.x specification for an API this domain produces:
```yaml
# contracts/api-orders.yaml
openapi: 3.1.0
info:
  title: Orders API
  version: 1.0.0
  description: Order management for ecommerce system

paths:
  /orders:
    get:
      summary: List orders
      # ...
    post:
      summary: Create order
      # ...
  /orders/{id}:
    get:
      summary: Get order by ID
      # ...

components:
  schemas:
    Order:
      type: object
      properties:
        id:
          type: string
          format: uuid
        # ...
```

These contracts must conform to standards defined in `system/CONSTITUTION.md`.

---

## CONSTITUTION.md

System-wide integration standards that all domains must follow:

- API standards (OpenAPI version, REST conventions)
- Authentication patterns (JWT, service-to-service)
- Error response format
- Event/messaging standards
- Data conventions (ID format, timestamps, money)
- Breaking change policy

---

## Cross-Domain Workflow

### API Guardian

The API Guardian validates contracts at key checkpoints:

**Contract Validation (per domain):**
- Schema validation: Is the OpenAPI spec well-formed?
- Constitution compliance: Does it follow system standards?
- Implementation conformance: Does the code match the contract?

**Cross-Domain Validation (system-wide):**
- Dependency resolution: Can all `consumes.yaml` references be satisfied?
- Breaking change detection: Will this change break consumers?
- Circular dependency check: No A→B→C→A chains

The Guardian runs automatically on PR creation, or manually via MCP tools.

### When Domain Evolves Its API

1. Domain completes internal SRDD cycle
2. If API contract changed:
   - Update `contracts/api-<name>.yaml`
   - API Guardian validates contract (schema, constitution, implementation)
   - API Guardian checks impact on consuming domains
   - If breaking: Guardian flags affected domains, requires acknowledgment
   - If non-breaking: Guardian approves, notifies consumers
3. Dependent domains review and adapt

### When Consuming Domain Needs Change

1. Request enhancement from producing domain
2. API Guardian validates request against constitution
3. Producing domain evaluates feasibility
4. If approved:
   - Producing domain updates contract
   - API Guardian validates change
   - API Guardian notifies consuming domain
5. Consuming domain adapts when ready

---

## MCP Integration (Optional)

For automated coordination, an MCP server can provide:

```
Tools:
  whoami()                    → Current system/domain from cwd
  get_my_contracts()          → APIs this domain produces
  get_my_dependencies()       → APIs this domain consumes
  get_contract(domain, api)   → Fetch external contract
  propose_change(api, spec)   → Submit contract change
  check_upstream_changes()    → Pending changes to dependencies
  get_constitution()          → System-wide rules
```

---

## Within Each Domain

Standard SRDD applies:
- Phase 1: Design (planning docs)
- Phase 2: Implementation (TDD)
- Phase 3: Review (PR workflow)
- Phase 4: Production (UAT)
- Phase 5: Iterate or Regenerate

See `@~/.claude/methodologies/SRDD.md` for full phase details.

---

## Spaghettification at Scale

Additional indicators for multi-domain systems:
- API contracts diverging from actual implementation
- Circular dependencies emerging between domains
- Constitution violations accumulating
- Cross-domain changes requiring coordination overhead

Regeneration may be needed at:
- Domain level (single domain spaghettified)
- System level (architecture drift across domains)

---

## TODO

- [ ] Define MCP server implementation
- [ ] Create contract validation tooling
- [ ] Define breaking change detection
- [ ] Document domain split/merge patterns
