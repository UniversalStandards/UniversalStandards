# Universal Standards — AI Engineering & Autonomous Delivery

This repository is the canonical cross-project control plane for reusable AI engineering standards, agent operating rules, project bootstrap requirements, blocker-escalation patterns, and continuous-learning promotion across UniversalStandards-managed projects.

## Core principle

A limitation of the currently selected connector, API wrapper, agent, tool, or execution surface is not automatically a project blocker. Before escalating to a human, agents must search the authorized execution surface for a safe alternative path and must never weaken policy, security, approval, review, identity, audit, or release controls to make progress.

## Canonical flow

`discover → correct → verify → classify → promote → propagate → enforce → inherit`

Lessons discovered in one project should become durable reusable controls when they are broadly applicable. New projects should inherit those controls during bootstrap instead of rediscovering the same failure.

## Repository layout

- `AGENTS.md` — standing cross-agent operating rules.
- `.github/copilot-instructions.md` — repository-wide Copilot/coding-agent rules.
- `standards/` — binding reusable engineering standards.
- `runbooks/` — operational procedures.
- `templates/` — files new/current managed projects can adopt.
- `learning/` — lesson registry, promotion lifecycle, and schema.
- `manifests/` — managed-project adoption and conformance inventory.
- `scripts/` — provider-neutral validation/bootstrap helpers.
- `.github/ISSUE_TEMPLATE/` — structured learning and blocker escalation intake.

## Adoption rule

Managed projects should carry a local `AGENTS.md` and AI instruction layer that references this repository as the upstream reusable standard while preserving project-specific constraints. Local policy may strengthen these standards but must not silently weaken them.

## Safety and authority

This standards layer does not grant credentials, deployment authority, merge authority, production access, or permission to bypass repository protections. Alternate execution paths must already be authorized. When authority is insufficient, agents fail closed and record the exact missing capability.