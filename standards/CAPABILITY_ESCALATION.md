# Capability Escalation Standard

## Purpose

Prevent delivery stalls caused by treating one tool's limitation as the project's limitation.

## Required decision sequence

1. Confirm the requested outcome and the authority required.
2. Re-read live state before deciding anything is blocked.
3. Determine whether the failure is in the project, the current connector, the current account/token, the current agent, or the environment.
4. Search authorized alternatives in this order:
   1. current connector/API;
   2. another connected/authorized service;
   3. GitHub issue assigned to Copilot/coding agent;
   4. GitHub workflow, App, Action, CLI, or MCP path;
   5. authorized remote machine/desktop execution;
   6. narrowly scoped human intervention.
5. Choose the smallest safe reversible path that can satisfy the original acceptance criteria.
6. Verify the result through an independent read/evidence path.
7. Only then classify the blocker as resolved.

## Fail-closed constraints

Alternate paths may not weaken approval, review, security, identity, audit, testing, release, or production controls. They may not fabricate credentials or authority. If the alternate path cannot satisfy the original control requirements, it is not a valid workaround.

## Escalation record

When human action is truly required, report: blocked objective, paths attempted, exact missing permission/capability, smallest required action, risk of the action, and how completion will be verified.

## Reusable lesson rule

If the blocker pattern can recur, promote the lesson into the appropriate durable instruction/runbook/template/test layer before closing the work item.