// Fails when a check step in a workflow can be skipped by an earlier failure.
// Every step after the setup steps (checkout, setup-node) must carry an
// `if:` that starts with `!cancelled()`, so one failing check never hides
// the next. Usage: node scripts/check-run-through.mjs <workflow.yml>...
import { readFileSync } from 'node:fs';

const SETUP = new Set(['actions/checkout', 'actions/setup-node']);
const problems = [];

for (const file of process.argv.slice(2)) {
  const steps = [];
  let current = null;
  for (const line of readFileSync(file, 'utf8').split('\n')) {
    const start = line.match(/^\s+- (name|uses|run):\s*(.*)$/);
    if (start) {
      current = { name: '', uses: '', cond: '' };
      steps.push(current);
    }
    if (!current) continue;
    const field = line.match(/^\s+(?:- )?(name|uses|if):\s*(.*)$/);
    if (field && field[1] === 'name') current.name = field[2];
    if (field && field[1] === 'uses') current.uses = field[2].split('@')[0];
    if (field && field[1] === 'if') current.cond = field[2];
  }
  if (steps.length === 0) problems.push(`${file}: no steps found`);
  for (const step of steps) {
    if (SETUP.has(step.uses)) continue;
    if (!/^\$\{\{\s*!cancelled\(\)/.test(step.cond)) {
      problems.push(`${file}: step "${step.name || step.uses}" lacks if: \${{ !cancelled() ... }}`);
    }
  }
}

if (problems.length) {
  for (const p of problems) console.error(p);
  process.exit(1);
}
console.log('run-through policy: ok');
