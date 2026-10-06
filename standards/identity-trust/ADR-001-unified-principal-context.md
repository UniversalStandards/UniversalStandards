# ADR-001: Unified PrincipalContext

- Status: accepted as a cross-project contract; implementation is staged
- Date: 2026-09-30
- Scope: Universal Standards, MCP, ATLANTIS and SWARM

## Decision

All authentication mechanisms resolve to one provider-neutral `PrincipalContext` before authorization, capability execution, delegation or durable task mutation. Authentication answers who or what presented a credential. Authorization answers whether that principal may perform the requested action on the requested resource under the active policy.

The canonical schema is `standards/identity-trust/principal-context.schema.json`. Implementations may add non-secret provider metadata in `attributes`, but raw credentials and provider-specific SDK objects are prohibited at this boundary.

## Consequences

- MCP can support API keys, OAuth/OIDC and workload identity without making tools provider-aware.
- ATLANTIS and SWARM can use distinct agent/workload identities and constrain delegated authority.
- Authorization decisions become testable and explainable independently of credential parsing.
- Existing repository work remains the implementation path: ATLANTIS issue #2 owns provider-neutral contracts; SWARM issue #31 and PROJECT-SWARM PR #147 own per-user OAuth/token lifecycle; the MCP repository owns the reference server implementation.

## Rejected alternatives

- A single ATLANTIS-wide credential inherited by every worker: violates least privilege and prevents useful audit attribution.
- Separate authentication models in MCP, ATLANTIS and SWARM: creates inconsistent authorization and migration drift.
- Treating encrypted credential storage as identity: encryption protects material but does not define principal, scope, tenant or policy semantics.
