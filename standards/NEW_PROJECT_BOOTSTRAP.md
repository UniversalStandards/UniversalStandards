# New Project AI Bootstrap Standard

Every new UniversalStandards-managed project should initialize with these minimum controls before substantial implementation work begins:

1. `AGENTS.md` with project-specific constraints plus a reference to this upstream standards repository.
2. `.github/copilot-instructions.md` with repository-wide AI behavior.
3. Capability-escalation guidance preventing connector limitations from being mislabeled as project blockers.
4. Continuous-learning intake and lesson-promotion instructions.
5. Security, approval, review, identity, audit, and release invariants appropriate to the project.
6. Issue templates for blocker escalation and reusable lesson candidates.
7. PR acceptance requirements and evidence expectations.
8. A declared upstream standards version/commit.
9. A project adoption record identifying intentional deviations.
10. A conformance check that can detect missing or stale bootstrap files.

## Bootstrap behavior

Projects inherit reusable standards, then add local requirements. Local copies must not silently weaken upstream requirements. Material upstream changes should trigger an adoption review rather than automatic unsafe overwrite.

## Completion

A project is considered bootstrapped only when the required instruction files exist, reference the upstream standard, and the adoption/conformance record is valid.