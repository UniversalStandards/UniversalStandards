# Universal Identity, Authentication, Authorization & Trust

This is the reusable portfolio standard for identity and trust across the Universal Standards ecosystem. It extends existing repository controls; it does not create a second execution program.

## Authority and scope

- GitHub repositories, issues, pull requests, Projects, CI and release evidence are the execution source of truth.
- Notion is the architecture and ADR projection for the existing ATLANTIS program plan; it must not independently invent status.
- The Universal Standards control manifest is the anti-forgetting registry: [`manifests/IDENTITY_TRUST_CONTROLS.json`](../manifests/IDENTITY_TRUST_CONTROLS.json).
- ATLANTIS is the umbrella runtime. SWARM is its specialist execution module. HITMAN is predecessor lineage absorbed into ATLANTIS and does not receive a parallel identity runtime.

## Required request flow

```text
credential extraction
        ↓
credential validation
        ↓
principal resolution
        ↓
PrincipalContext
        ↓
policy evaluation
        ↓
capability selection and execution
        ↓
verification and durable audit
```

No protected MCP tool, resource, administrative action or agent delegation may execute before the normalized principal and policy decision exist. Anonymous routes must be explicit and separately allow-listed.

## Canonical contract

`PrincipalContext` is provider-neutral and carries principal identity, principal type, tenant boundary, authentication method, roles, scopes, non-secret attributes, credential/session references, time bounds and delegation provenance. Raw OAuth tokens, API-key secrets and provider-specific objects never cross the authorization boundary.

The machine-readable shape is [`standards/identity-trust/principal-context.schema.json`](identity-trust/principal-context.schema.json). Implementations may add constraints, but may not weaken required fields or permit authority escalation.

## Credential rules

1. API-key secrets are generated with a cryptographically secure source, shown once, and never recoverable from storage.
2. Verification uses a keyed digest and a separately brokered pepper; secrets are not logged, placed in prompts, fixtures, browser bundles or issue bodies.
3. Credentials have explicit lifecycle states, expiry, rotation, revocation and compromise handling.
4. OAuth/OIDC is provider-neutral and validates issuer, audience/resource, signature, time claims, subject, tenant and scopes.
5. Workload and agent identities are distinct and least-privilege. Delegation is a subset of the parent authority.

## Definition of done

A control is not verified because code exists. The manifest entry must link the implementation issue and pull request, tests, security/negative evidence, documentation, independent review and the applicable release gate. Verification evidence is recorded as objects with a controlled `type` (`security_negative`, `documentation`, `independent_review` or `rollback`) and a non-secret `ref`. The validator intentionally accepts planned controls without evidence, but rejects a `verified` control with any missing trace link or evidence category. The validator also pins the permanent control-ID set and the complete required PrincipalContext field set so a later edit cannot silently weaken the anti-forgetting contract.

## Required independent review

The implementer may not be the sole reviewer for credential storage, authorization policy, delegation, secret handling, MCP protocol behavior or release-gate changes. Review must use the exact immutable head and include negative/security evidence and rollback boundaries.
