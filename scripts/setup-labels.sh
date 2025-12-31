#!/bin/bash

# SRDD Repository Labels Setup Script
# Reads label definitions from /data/gh_labels.json and creates them in the repo
#
# Usage: ./scripts/setup-labels.sh [--force] [--delete-defaults]
#
# Options:
#   --force            Overwrite existing labels
#   --delete-defaults  Delete GitHub's default labels first
#
# Prerequisites:
#   - gh CLI installed and authenticated (gh auth login)
#   - jq installed (brew install jq / apt install jq)

set -e

REPO="docs-bbos/srdd"
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
DATA_FILE="$SCRIPT_DIR/../data/gh_labels.json"

FORCE=""
DELETE_DEFAULTS=false

# Parse arguments
for arg in "$@"; do
  case $arg in
    --force)
      FORCE="--force"
      ;;
    --delete-defaults)
      DELETE_DEFAULTS=true
      ;;
  esac
done

# Check prerequisites
if ! command -v gh &> /dev/null; then
  echo "Error: gh CLI is not installed. Install from https://cli.github.com/"
  exit 1
fi

if ! command -v jq &> /dev/null; then
  echo "Error: jq is not installed. Install with: brew install jq (macOS) or apt install jq (Linux)"
  exit 1
fi

if [ ! -f "$DATA_FILE" ]; then
  echo "Error: Label data file not found at $DATA_FILE"
  exit 1
fi

# Delete default GitHub labels if requested
if [ "$DELETE_DEFAULTS" = true ]; then
  echo "Deleting default GitHub labels..."
  
  DEFAULT_LABELS=("bug" "documentation" "duplicate" "enhancement" "good first issue" "help wanted" "invalid" "question" "wontfix")
  
  for label in "${DEFAULT_LABELS[@]}"; do
    if gh label delete "$label" --repo "$REPO" --yes 2>/dev/null; then
      echo "  Deleted: $label"
    else
      echo "  Skipped (not found): $label"
    fi
  done
  
  echo ""
fi

# Create labels from JSON
echo "Creating labels for $REPO..."
echo ""

# Iterate over categories and labels using jq
jq -c '.labels[].items[]' "$DATA_FILE" | while read -r label; do
  name=$(echo "$label" | jq -r '.name')
  color=$(echo "$label" | jq -r '.color')
  description=$(echo "$label" | jq -r '.description')
  
  if gh label create "$name" \
    --repo "$REPO" \
    --color "$color" \
    --description "$description" \
    $FORCE 2>/dev/null; then
    echo "  ✓ Created: $name"
  else
    if [ -n "$FORCE" ]; then
      echo "  ✗ Failed: $name"
    else
      echo "  - Exists:  $name (use --force to overwrite)"
    fi
  fi
done

echo ""
echo "Done!"
