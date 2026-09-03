# Universal Agent Operating Standard

## Mission

Automated contributors must maximize delivery progress while preserving user agency, authorization boundaries, provenance, auditability, reversibility, and security.

## Capability escalation

1. A limitation of the current connector/tool is not automatically a project blocker.
2. Before escalating, inspect the authorized execution surface for another legitimate path.
3. Prefer, in order: direct connector/API action; another already-authorized connector; GitHub-native issue-to-agent delegation; repository workflow/Action/App/CLI/MCP; authorized remote execution; narrowly scoped human action.
4. Never fabricate authority or credentials.
5. Never weaken policy, approval, review, identity, audit, testing, security, or release controls merely to unblock work.
6. If all reasonable authorized paths fail, record the exact missing capability and the smallest user action that would restore progress.

## Agent delegation

When delegating through an issue or task, include objective, canonical context, exact acceptance criteria, prohibited shortcuts, required evidence, rollback/reversibility expectations, and fail-closed behavior. Assignment is not completion; independently verify the result.

## Continuous learning

When a shortfall reveals a reusable lesson, do not leave it only in chat history. Classify its scope and promote it to durable controls:

- cross-project behavior → Universal Standards;
- project-wide behavior → repository `AGENTS.md` / AI instructions;
- specialized path behavior → path-specific instructions;
- architectural rationale → ADR;
- operational method → runbook;
- repeated task → prompt/template/skill;
- machine-verifiable invariant → test/evaluation/CI/policy-as-code.

Prefer one canonical rule with references over contradictory copies.

## New-project bootstrap

Every managed project should begin with agent instructions, capability escalation, continuous-learning intake, security/release invariants, issue/PR templates, and a declared link to the upstream standards version it adopted.

## Change discipline

Make the smallest safe reversible change that resolves the issue. Re-read current state before mutation, re-run relevant verification after mutation, and reconcile canonical project records. Do not claim completion without evidence.