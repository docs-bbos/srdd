#!/bin/bash

# SRDD Project Scaffolding Script
# Usage: ./init-srdd-project.sh <project-name> [project-path]

set -e

PROJECT_NAME="${1:?Usage: $0 <project-name> [project-path]}"
PROJECT_PATH="${2:-./$PROJECT_NAME}"
TODAY=$(date +%Y-%m-%d)

echo "🚀 Initialising SRDD project: $PROJECT_NAME"
echo "   Location: $PROJECT_PATH"

# Create directory structure
mkdir -p "$PROJECT_PATH"/{src,tests,docs/{plans/"${TODAY}_v1_initial-design",templates}}

# Create initial planning docs (empty with headers)
cat > "$PROJECT_PATH/docs/plans/${TODAY}_v1_initial-design/00-PLANNING.md" << 'EOF'
# Initial Planning

## Project Overview
[To be completed during requirements gathering]

## Problem Statement
[What problem are we solving?]

## Users & Actors
[Who will use this?]

## Core Functionality
[What must it do?]

## Constraints
[What limitations exist?]

## Success Criteria
[How do we know it works?]

---
*Generated from requirements questionnaire session*
EOF

# Create placeholder for other docs
for doc in "01-REQUIREMENTS" "02-USECASES" "03-QA-SESSION" "04-ARCHITECTURE" "05-IMPLEMENTATION" "06-TESTPLAN"; do
  cat > "$PROJECT_PATH/docs/plans/${TODAY}_v1_initial-design/${doc}.md" << EOF
# ${doc#*-}

[To be completed]
EOF
done

# Copy questionnaire template
cat > "$PROJECT_PATH/docs/templates/REQUIREMENTS-QUESTIONNAIRE.md" << 'EOF'
# Requirements Gathering Questionnaire

[Copy full questionnaire content here or reference global template]

See: ~/.claude/templates/REQUIREMENTS-QUESTIONNAIRE.md
EOF

# Create project CLAUDE.md
cat > "$PROJECT_PATH/CLAUDE.md" << EOF
# Project: $PROJECT_NAME

## Methodology
This project follows **SRDD (Spec-Roundtrip Driven Development)**.
See global CLAUDE.md for full methodology.

---

## Project Context

### Description
[One paragraph describing what this project does]

### Tech Stack
- **Language**: 
- **Framework**: 
- **Database**: 
- **Testing**: 
- **Other**: 

### Repository Structure
\`\`\`
├── src/                    # Application source
├── tests/                  # Test files
├── docs/
│   ├── plans/             # SRDD planning documents
│   └── templates/         # Project templates
├── CLAUDE.md              # This file
└── README.md
\`\`\`

---

## Current State

### Active Issue
None yet — starting Phase 1: Design

### Current Plan Version
\`docs/plans/${TODAY}_v1_initial-design/\`

---

## Project-Specific Rules

### Code Style
[To be defined]

### Naming Conventions
[To be defined]

### Domain Language
[Key domain terms and their meanings]

---

## External Integrations
[None yet]

---

## Environment Setup
\`\`\`bash
# To be defined
\`\`\`

---

## Test Data
- Location: tests/fixtures/
- Generation: [To be defined]

---

## Notes
[Project started: ${TODAY}]
EOF

# Create README
cat > "$PROJECT_PATH/README.md" << EOF
# $PROJECT_NAME

[Project description]

## Getting Started

[Setup instructions]

## Development

This project uses [SRDD (Spec-Roundtrip Driven Development)](link-to-methodology).

See \`docs/plans/\` for planning documents.

## License

[License]
EOF

# Create .gitignore
cat > "$PROJECT_PATH/.gitignore" << 'EOF'
# Dependencies
node_modules/
venv/
__pycache__/

# Build
dist/
build/
*.egg-info/

# Environment
.env
.env.local

# IDE
.idea/
.vscode/
*.swp

# OS
.DS_Store
Thumbs.db

# Test
coverage/
.pytest_cache/

# Logs
*.log
EOF

# Initialise git if not exists
if [ ! -d "$PROJECT_PATH/.git" ]; then
  cd "$PROJECT_PATH"
  git init
  git add .
  git commit -m "Initial SRDD project scaffold"
  echo "   ✓ Git repository initialised"
fi

echo ""
echo "✅ SRDD project scaffolded successfully!"
echo ""
echo "Next steps:"
echo "  1. cd $PROJECT_PATH"
echo "  2. Update CLAUDE.md with project details"
echo "  3. Run requirements gathering questionnaire"
echo "  4. Complete 00-PLANNING.md"
echo ""
echo "Current plan directory:"
echo "  docs/plans/${TODAY}_v1_initial-design/"
echo ""
