import { readFileSync } from 'node:fs';
import assert from 'node:assert/strict';
import test from 'node:test';
const read = p => JSON.parse(readFileSync(new URL(p, import.meta.url)));
const d = read('../../src/data/analyses/aq-group/aq-q3-2026-dossier.json');
const old = read('../../analyses/AQ/AQ-20261019-v11.2-r1.json');
test('forecast assumptions and recommendation remain unchanged', () => {
  assert.equal(d.recommendation, old.recommendation);
  assert.equal(d.risk, old.risk);
  for (const [i,s] of d.scenarios.entries()) {
    assert.deepEqual(s.inputs, old.scenarios[i].inputs);
    assert.equal(s.probability, old.scenarios[i].probability);
    assert.equal(s.valuation_date, '2028-12-31');
    assert.equal(s.fair_value.value, old.scenarios[i].fair_value.value);
    const x=s.inputs;
    assert.ok(Math.abs((x.revenue*x.ebit_margin+x.net_finance)*(1-x.tax_rate)/x.diluted_shares*x.pe-s.fair_value.value)<1e-8);
  }
});
test('dated quote drives exact annualization and the archive projection', () => {
  assert.equal(d.market_reference.price,237.6);
  assert.equal(d.market_reference.as_of_timestamp,'2026-10-28T13:39:00+01:00');
  const years=(Date.parse(d.valuation_date)-Date.parse(d.market_reference.as_of))/86400000/365.25;
  const w=d.scenarios.reduce((t,s)=>t+s.probability*s.fair_value.value,0);
  assert.equal(d.scenarios.reduce((t,s)=>t+s.probability,0),1);
  assert.ok(Math.abs((w/237.6)**(1/years)-1-d.valuation_summary.annualized_value_potential)<1e-10);
  assert.equal(d.presentation.archiveComparison.annualPotential,'+4,3 %/år');
});
test('funding budgets and FCF definitions tie out',()=>{
  assert.equal(921+631-799-(233+8+197+4-183-5)-(144+116-106),345);
  for(const b of d.cashflow_control.funding_budgets) assert.equal(b.opening_net_cash_including_leases+b.cumulative_fcf_after_leases-b.cumulative_dividends-b.cumulative_net_acquisition_cash_budget,b.closing_net_cash_including_leases);
});
test('publication uses existing disclaimer and source provenance, not invented zones',()=>{
  assert.equal(d.disclaimer.central_disclaimer_version,'v11.2-2026-08');
  assert.equal(d.disclaimer.short_disclaimer_id,'standard-short-v11.2');
  assert.equal(d.disclaimer.full_disclaimer_url,'https://www.borsanalys.se/villkor');
  assert.equal(d.risk_reward_zones.status,'NOT_APPLICABLE');
  const ids=new Set(d.claims.map(c=>c.claim_id));
  const sources=new Set(d.sources.map(s=>s.source_id));
  for(const c of d.claims){for(const id of c.source_refs)assert.ok(sources.has(id));for(const id of c.input_claim_ids??[])assert.ok(ids.has(id));}
  assert.equal(d.version.parent_version_id,old.version.version_id);
});
