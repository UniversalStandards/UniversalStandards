import fs from 'node:fs';

const failures = [];
const canonicalControlIds = [
  'IAM-ARCH-001',
  'IAM-ARCH-002',
  'IAM-KEY-001',
  'IAM-KEY-002',
  'IAM-OAUTH-001',
  'IAM-AUTHZ-001',
  'IAM-DELEG-001',
  'IAM-AGENT-001',
  'IAM-SECRET-001',
  'IAM-AUDIT-001',
  'IAM-MCP-001',
  'IAM-TEST-001',
  'IAM-REL-001'
];
const canonicalPrincipalRequiredFields = [
  'principalId',
  'principalType',
  'authMethod',
  'roles',
  'scopes',
  'attributes'
];
const canonicalStatusValues = [
  'planned',
  'in_progress',
  'verified',
  'blocked',
  'superseded',
  'deprecated',
  'rejected'
];
const canonicalPrincipalTypes = [
  'anonymous',
  'user',
  'service_account',
  'agent',
  'application',
  'workload'
];
const canonicalAuthMethods = ['none', 'oauth', 'api_key', 'workload_identity'];
const requiredVerificationEvidence = [
  'security_negative',
  'documentation',
  'independent_review',
  'rollback'
];
const readManifest = () => {
  try {
    return JSON.parse(fs.readFileSync('manifests/IDENTITY_TRUST_CONTROLS.json', 'utf8'));
  } catch (error) {
    failures.push(`manifests/IDENTITY_TRUST_CONTROLS.json: ${error.message}`);
    return null;
  }
};
const readSchema = () => {
  try {
    return JSON.parse(fs.readFileSync('standards/identity-trust/principal-context.schema.json', 'utf8'));
  } catch (error) {
    failures.push(`standards/identity-trust/principal-context.schema.json: ${error.message}`);
    return null;
  }
};
const arrayFields = (control) => [
  ['implementationIssues', control.implementationIssues],
  ['implementationPullRequests', control.implementationPullRequests],
  ['tests', control.tests],
  ['evidence', control.evidence]
];

const manifest = readManifest();
const schema = readSchema();

if (!manifest || !schema) {
  console.error(failures.join('\n'));
  process.exit(1);
}

if (manifest.version !== 1) failures.push('manifest.version must be 1');
if (manifest.sourceOfTruth !== 'UniversalStandards/UniversalStandards') failures.push('manifest.sourceOfTruth is incorrect');
if (!fs.existsSync('standards/IDENTITY_TRUST.md')) failures.push('standards/IDENTITY_TRUST.md is missing');
if (!Array.isArray(manifest.controls) || manifest.controls.length === 0) failures.push('manifest.controls must be non-empty');
if (!Array.isArray(manifest.statusValues) || manifest.statusValues.length !== canonicalStatusValues.length || canonicalStatusValues.some((status) => !manifest.statusValues.includes(status))) {
  failures.push(`manifest.statusValues must contain exactly: ${canonicalStatusValues.join(', ')}`);
}

const ids = new Set();
const statuses = new Set(canonicalStatusValues);
const idPattern = /^IAM-[A-Z]+-[0-9]{3}$/;

if (manifest.controls?.length !== canonicalControlIds.length) {
  failures.push(`manifest.controls must contain exactly ${canonicalControlIds.length} permanent controls`);
}

for (const control of manifest.controls ?? []) {
  if (!control || typeof control !== 'object') {
    failures.push('each control must be an object');
    continue;
  }
  if (!idPattern.test(control.id ?? '')) failures.push(`invalid control id: ${control.id}`);
  if (ids.has(control.id)) failures.push(`duplicate control id: ${control.id}`);
  ids.add(control.id);
  if (!control.title || !control.requirement || !control.domain || !control.releaseGate) failures.push(`${control.id}: missing required control metadata`);
  if (!statuses.has(control.status)) failures.push(`${control.id}: invalid status ${control.status}`);
  for (const [field, value] of arrayFields(control)) {
    if (!Array.isArray(value)) failures.push(`${control.id}: ${field} must be an array`);
  }
  for (const [index, evidence] of (control.evidence ?? []).entries()) {
    if (!evidence || typeof evidence !== 'object' || Array.isArray(evidence)) {
      failures.push(`${control.id}: evidence[${index}] must be an object with type and ref`);
      continue;
    }
    if (!requiredVerificationEvidence.includes(evidence.type)) {
      failures.push(`${control.id}: evidence[${index}] has unsupported type ${evidence.type}`);
    }
    if (typeof evidence.ref !== 'string' || evidence.ref.length === 0) {
      failures.push(`${control.id}: evidence[${index}] must include a non-empty ref`);
    }
  }
  if (control.status === 'verified') {
    for (const [field, value] of arrayFields(control)) {
      if (value.length === 0) failures.push(`${control.id}: verified controls require ${field}`);
    }
    const evidenceTypes = new Set((control.evidence ?? []).map((evidence) => evidence?.type));
    for (const evidenceType of requiredVerificationEvidence) {
      if (!evidenceTypes.has(evidenceType)) {
        failures.push(`${control.id}: verified controls require ${evidenceType} evidence`);
      }
    }
  }
}

for (const controlId of canonicalControlIds) {
  if (!ids.has(controlId)) failures.push(`missing permanent control id: ${controlId}`);
}
for (const controlId of ids) {
  if (!canonicalControlIds.includes(controlId)) failures.push(`unexpected permanent control id: ${controlId}`);
}

if (schema.$id !== 'https://github.com/UniversalStandards/UniversalStandards/blob/main/standards/identity-trust/principal-context.schema.json') failures.push('PrincipalContext schema $id is incorrect');
const schemaRequired = Array.isArray(schema.required) ? schema.required : [];
const schemaRequiredSet = new Set(schemaRequired);
if (schemaRequired.length !== canonicalPrincipalRequiredFields.length || schemaRequiredSet.size !== schemaRequired.length || canonicalPrincipalRequiredFields.some((field) => !schemaRequiredSet.has(field))) {
  failures.push(`PrincipalContext schema must require exactly: ${canonicalPrincipalRequiredFields.join(', ')}`);
}
for (const field of canonicalPrincipalRequiredFields) {
  if (!schema.properties || !Object.hasOwn(schema.properties, field)) {
    failures.push(`PrincipalContext schema is missing property definition: ${field}`);
  }
}
if (schema.additionalProperties !== false) failures.push('PrincipalContext schema must set additionalProperties to false');

const schemaProperties = schema.properties ?? {};
const hasExactValues = (actual, expected) => Array.isArray(actual) && actual.length === expected.length && expected.every((value) => actual.includes(value));
const principalIdSchema = schemaProperties.principalId;
if (principalIdSchema?.type !== 'string' || principalIdSchema.minLength !== 1 || principalIdSchema.maxLength !== 256) {
  failures.push('PrincipalContext principalId must be a bounded non-empty string');
}
const principalTypeSchema = schemaProperties.principalType;
if (principalTypeSchema?.type !== 'string' || !hasExactValues(principalTypeSchema.enum, canonicalPrincipalTypes)) {
  failures.push(`PrincipalContext principalType must enumerate exactly: ${canonicalPrincipalTypes.join(', ')}`);
}
const authMethodSchema = schemaProperties.authMethod;
if (authMethodSchema?.type !== 'string' || !hasExactValues(authMethodSchema.enum, canonicalAuthMethods)) {
  failures.push(`PrincipalContext authMethod must enumerate exactly: ${canonicalAuthMethods.join(', ')}`);
}
for (const [field, property] of [
  ['roles', schemaProperties.roles],
  ['scopes', schemaProperties.scopes]
]) {
  if (property?.type !== 'array' || property.uniqueItems !== true || property.items?.type !== 'string' || property.items.minLength !== 1) {
    failures.push(`PrincipalContext ${field} must be a unique non-empty string array`);
  }
}
if (schemaProperties.attributes?.type !== 'object' || schemaProperties.attributes.additionalProperties !== true) {
  failures.push('PrincipalContext attributes must be an extensible object');
}

if (failures.length) {
  console.error(`Identity trust validation failed (${failures.length}):`);
  console.error(failures.map((failure) => `- ${failure}`).join('\n'));
  process.exit(1);
}

console.log(`Identity trust validation passed: ${manifest.controls.length} controls, ${ids.size} unique IDs.`);
