# Continuous Learning Promotion Standard

## Goal

Convert reusable failures, fixes, and improved execution patterns into durable controls that future projects inherit automatically.

## Lifecycle

`observe → verify → classify → promote → propagate → enforce → measure → retire/supersede`

## Promotion classes

- `L0 local`: one-off note; no propagation.
- `L1 project`: update local instructions/runbook/tests.
- `L2 portfolio`: reusable across managed projects; promote to Universal Standards and bootstrap templates.
- `L3 control`: safety, security, governance, or repeat-delivery invariant; add machine enforcement where possible.

## Promotion criteria

Promote when a lesson is likely to recur, materially affects delivery time/quality/risk, prevents duplicate work, or exposes a better authorized execution pattern. Do not promote speculation; require evidence from an observed failure, verified improvement, or validated external change.

## Required artifacts

Every promoted lesson records: identifier, date, source project, trigger, failure mode, improved pattern, scope, canonical rule, enforcement mechanism, adoption status, supersedes/superseded-by links, and verification evidence.

## Machine enforcement preference

Where practical, move from prose to executable checks: schema validation, unit/integration tests, agent evaluations, CI gates, repository policy evidence, or automated bootstrap conformance.

## Drift control

Projects may strengthen the upstream standard but must explicitly document deviations. Silent weakening or contradictory copies are prohibited. Superseded rules must be marked rather than accumulating ambiguous versions.