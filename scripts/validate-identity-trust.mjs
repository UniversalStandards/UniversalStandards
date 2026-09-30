import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const manifestPath = path.join(root, 'manifests', 'IDENTITY_TRUST_CONTROLS.json');
const schemaPath = path.join(root, 'standards', 'identity-trust', 'principal-context.schema.json');
const standardPath = path.join(root, 'standards', 'IDENTITY_TRUST.md');

const failures = [];
const readJson = (file) => {
  try {
    return JSON.parse(fs.readFileSync(file, 'utf8'));
  } catch (error) {
    failures.push(`${path.relative(root, file)}: ${error.message}`);
    return null;
  }
};

const manifest = readJson(manifestPath);
const schema = readJson(schemaPath);

if (!manifest || !schema) {
  console.error(failures.join('\n'));
  process.exit(1);
}

if (manifest.version !== 1) failures.push('manifest.version must be 1');
if (manifest.sourceOfTruth !== 'UniversalStandards/UniversalStandards') failures.push('manifest.sourceOfTruth is incorrect');
if (!fs.existsSync(standardPath)) failures.push('standards/IDENTITY_TRUST.md is missing');
if (!Array.isArray(manifest.controls) || manifest.controls.length === 0) failures.push('manifest.controls must be non-empty');

const ids = new Set();
const statuses = new Set(manifest.statusValues);
const idPattern = /^IAM-[A-Z]+-[0-9]{3}$/;

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
  for (const field of ['implementationIssues', 'implementationPullRequests', 'tests', 'evidence']) {
    if (!Array.isArray(control[field])) failures.push(`${control.id}: ${field} must be an array`);
  }
  if (control.status === 'verified') {
    for (const field of ['implementationIssues', 'implementationPullRequests', 'tests', 'evidence']) {
      if (control[field].length === 0) failures.push(`${control.id}: verified controls require ${field}`);
    }
  }
}

if (schema.$id !== 'https://github.com/UniversalStandards/UniversalStandards/blob/main/standards/identity-trust/principal-context.schema.json') failures.push('PrincipalContext schema $id is incorrect');
if (!schema.required?.includes('principalId') || !schema.required?.includes('authMethod')) failures.push('PrincipalContext schema is missing required identity fields');

if (failures.length) {
  console.error(`Identity trust validation failed (${failures.length}):`);
  console.error(failures.map((failure) => `- ${failure}`).join('\n'));
  process.exit(1);
}

console.log(`Identity trust validation passed: ${manifest.controls.length} controls, ${ids.size} unique IDs.`);
