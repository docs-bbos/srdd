# Plan: Rename SRDD Article Files

## Overview
Rename files from `SRDD-MEDIUM-POST-v3-part*.md` to `SRDD-part*.md` and update all relative file references while preserving external Medium URLs.

## Files to Rename

### In `medium/` directory:
1. `SRDD-MEDIUM-POST-v3-part0-orig.md` → `SRDD-part0-orig.md`
2. `SRDD-MEDIUM-POST-v3-part1-of-4.md` → `SRDD-part1-of-4.md`
3. `SRDD-MEDIUM-POST-v3-part2-of-4.md` → `SRDD-part2-of-4.md`
4. `SRDD-MEDIUM-POST-v3-part3-of-4.md` → `SRDD-part3-of-4.md`
5. `SRDD-MEDIUM-POST-v3-part4-of-4.md` → `SRDD-part4-of-4.md`

## Files That Reference These (Need Updates)

### 1. `medium/index.md`
**Current references (lines 150-153):**
- `./SRDD-MEDIUM-POST-v3-part1-of-4` → `./SRDD-part1-of-4`
- `./SRDD-MEDIUM-POST-v3-part2-of-4` → `./SRDD-part2-of-4`
- `./SRDD-MEDIUM-POST-v3-part3-of-4` → `./SRDD-part3-of-4`
- `./SRDD-MEDIUM-POST-v3-part4-of-4` → `./SRDD-part4-of-4`

**Action:** Update all 4 relative file path references

## Files That Should NOT Be Changed

### External Medium URLs (Keep as-is):
These reference the published Medium articles and should remain unchanged:
- `https://brooke.medium.com/srdd-part1-of-4` (and similar URLs)
- Found in:
  - `readme.md` (lines 168-171)
  - `medium/SRDD-MEDIUM-POST-v3-part*.md` files (various cross-references)
  - `medium/pitches.md` (line 265)
  - `assets/workflows/phases_workflow.mermaid` (line 17)

## Execution Steps

### Step 1: Rename Files
Use `git mv` to preserve history:
```bash
cd medium/
git mv SRDD-MEDIUM-POST-v3-part0-orig.md SRDD-part0-orig.md
git mv SRDD-MEDIUM-POST-v3-part1-of-4.md SRDD-part1-of-4.md
git mv SRDD-MEDIUM-POST-v3-part2-of-4.md SRDD-part2-of-4.md
git mv SRDD-MEDIUM-POST-v3-part3-of-4.md SRDD-part3-of-4.md
git mv SRDD-MEDIUM-POST-v3-part4-of-4.md SRDD-part4-of-4.md
```

### Step 2: Update Relative References
Update `medium/index.md`:
- Replace `./SRDD-MEDIUM-POST-v3-part1-of-4` with `./SRDD-part1-of-4`
- Replace `./SRDD-MEDIUM-POST-v3-part2-of-4` with `./SRDD-part2-of-4`
- Replace `./SRDD-MEDIUM-POST-v3-part3-of-4` with `./SRDD-part3-of-4`
- Replace `./SRDD-MEDIUM-POST-v3-part4-of-4` with `./SRDD-part4-of-4`

### Step 3: Verify
- Check that all relative links in `medium/index.md` work
- Verify no broken internal references
- Confirm all `brooke.medium.com` URLs remain unchanged

## Summary
- **Files to rename:** 5 files
- **Files to update:** 1 file (`medium/index.md`)
- **Files to preserve:** All external Medium URLs in readme.md, part files, pitches.md, and mermaid file

