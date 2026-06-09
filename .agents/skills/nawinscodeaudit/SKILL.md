---
name: nawinscodeaudit
description: Performs evidence-based code audits, dependency analysis, file usage verification, architecture reviews, and KEEP / ARCHIVE / REFACTOR / REMOVE classification for the NAWINS platform.
---

# NAWINS Code Audit Skill

Purpose:

Provide evidence-based auditing of the NAWINS codebase before any refactoring, cleanup, deletion, restructuring, or optimization.

## Audit Rules

Never assume a file is unused.

Always verify:

1. Import references
2. Route references
3. Dynamic imports
4. Dependency references
5. Build references
6. Runtime references
7. Business relevance

## Classification System

### KEEP

Use when:

- Active production code
- SEO assets
- Analytics integrations
- CRM integrations
- Lead capture systems
- Business-critical content
- Study destination pages
- University content

### ARCHIVE

Use when:

- Legacy implementations
- Experimental work
- Old branding
- Historical documentation
- Deprecated concepts

### REFACTOR

Use when:

- Large files
- Duplicate logic
- Repeated components
- Naming inconsistencies
- Folder structure issues
- Technical debt

### REMOVE

Only when all checks pass:

- No imports exist
- No route usage exists
- No dynamic imports exist
- No build references exist
- No business dependency exists
- No future planned usage exists

## Required Audit Process

For every file reviewed:

1. Locate file.
2. Search references.
3. Check imports.
4. Check routes.
5. Check dependencies.
6. Check business impact.
7. Assign classification.

## Output Format

File:
Path:
Reason:
References:
Risk Level:
Business Impact:
Recommendation:

Classification:
KEEP / ARCHIVE / REFACTOR / REMOVE

## Deletion Policy

Never recommend deletion without evidence.

Always provide proof before recommending removal.

If uncertain:

ARCHIVE instead of REMOVE.

Business continuity is more important than technical cleanup.