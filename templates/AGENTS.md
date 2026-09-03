# Project Agent Instructions

## Upstream standard

This project adopts `UniversalStandards/UniversalStandards` as its upstream reusable AI engineering standard. Local rules may strengthen upstream controls but must not silently weaken them.

## Required operating behavior

1. Re-read live project state before mutation.
2. Treat a connector/tool limitation as a limitation of that execution path, not automatically the project.
3. Search reasonable already-authorized alternate paths before escalating to a human.
4. Use tightly scoped issue-to-agent delegation when appropriate.
5. Never bypass security, approval, review, identity, audit, release, or production controls.
6. Promote reusable lessons into durable instructions/runbooks/templates/tests instead of leaving them only in chat or comments.
7. Independently verify delegated work before declaring completion.
8. Keep changes scoped, reversible, evidence-backed, and aligned with project-specific architecture.

## Project-specific rules

Add repository-specific architecture, testing, deployment, security, and authority constraints below this section.