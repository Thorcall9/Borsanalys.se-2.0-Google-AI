import {readFileSync} from 'node:fs';
import assert from 'node:assert/strict';
import test from 'node:test';
const read=p=>JSON.parse(readFileSync(new URL(p,import.meta.url)));
const d=read('../../src/data/analyses/aq-group/aq-q3-2026-dossier.json');
const old=read('../../analyses/AQ/AQ-20261028-v11.2-r2.json');
const previous=read('../../analyses/AQ/AQ-20261028-v11.2-r3.json');
const near=(a,b)=>assert.ok(Math.abs(a-b)<1e-8,`${a} != ${b}`);
test('Q4 growth bridge reconciles to full year and lower Base flows to 2028',()=>{
 for(const q of d.q4_bridge.scenarios){near(q.total_growth,q.organic_growth+q.acquired_growth+q.fx_growth);near(q.q4_revenue,2323*(1+q.total_growth));near(q.annual_revenue_path[0],7500+q.q4_revenue);}
 const b=d.q4_bridge.scenarios[1];near(b.total_growth,.15);near(b.annual_revenue_path[2],b.annual_revenue_path[0]*1.11**2);assert.ok(d.scenarios[1].inputs.revenue<old.scenarios[1].inputs.revenue);
});
test('both valuation methods and weighted annualization reconcile',()=>{
 for(const s of d.scenarios){const x=s.inputs;near(s.outputs.eps,(x.revenue*x.ebit_margin+x.net_finance)*(1-x.tax_rate)/x.diluted_shares);near(s.fair_value.value,s.outputs.eps*x.pe);near(s.secondary_valuation.fair_value,(s.outputs.ebit*x.ev_ebit+x.net_cash_including_leases-x.minority_interest)/x.diluted_shares);}
 near(d.scenarios.reduce((t,s)=>t+s.probability,0),1);
 const w=d.scenarios.reduce((t,s)=>t+s.probability*s.fair_value.value,0);near(w,d.valuation_summary.weighted_fair_value);near((w/d.market_reference.price)**(1/(795/365.25))-1,d.valuation_summary.annualized_value_potential);
});
test('capital allocation produces residual cash and includes deferred consideration',()=>{
 for(const [i,b] of d.cashflow_control.funding_budgets.entries()){
 near(b.cumulative_fcf_after_leases,b.q4_2026_fcf_after_leases+b.fy2027_fcf_after_leases+b.fy2028_fcf_after_leases);assert.equal(b.cumulative_net_acquisition_cash_budget,0);assert.equal(b.other_financing_fx,-9);
 near(b.opening_net_cash_including_leases+b.cumulative_fcf_after_leases-b.cumulative_dividends+b.other_financing_fx,b.closing_net_cash_including_leases);near(b.closing_net_cash_including_leases,d.scenarios[i].inputs.net_cash_including_leases);
 }
});
test('dividend timing, IRR and hurdle prices are discounted consistently',()=>{
 const r=d.return_framework;const years=795/365.25;
 const times=r.dividend_dates.map(date=>(Date.parse(date)-Date.parse('2026-10-28'))/86400000/365.25);
 const pv=rate=>r.weighted_dividend_per_share/2*times.reduce((n,t)=>n+(1+rate)**(-t),0)+d.valuation_summary.weighted_fair_value/(1+rate)**years;
 near(pv(r.weighted_cashflow_irr),d.market_reference.price);for(const h of r.hurdle_prices)near(pv(h.annual_return),h.price);assert.equal(r.hurdle_rate,.10);
});
test('version, author disclosure and provenance prevent false publication readiness',()=>{
 assert.equal(d.version.parent_version_id,previous.version.version_id);assert.equal(d.publication_status,'AWAITING_AUTHOR_DISCLOSURE');assert.ok(d.publication_blockers.length);assert.equal(d.presentation.v11.publicationStatus,d.publication_status);
 const ids=new Set(d.claims.map(c=>c.claim_id));const sources=new Set(d.sources.map(s=>s.source_id));for(const c of d.claims){for(const id of c.source_refs)assert.ok(sources.has(id));for(const id of c.input_claim_ids??[])assert.ok(ids.has(id));}
 const q=d.claims.find(c=>c.claim_id==='F54');near(q.value,d.market_reference.price);
});

test('r4 preserves primary scenarios and isolates Base-light sensitivity',()=>{
 assert.deepEqual(d.scenarios,previous.scenarios);assert.deepEqual(d.valuation_summary,previous.valuation_summary);
 const b=d.sensitivity_analysis.base_light;near(b.inputs.revenue,d.q4_bridge.scenarios[1].annual_revenue_path[0]*1.08**2);near(b.outputs.eps,b.inputs.revenue*.095*.79/92);near(b.outputs.fair_value,b.outputs.eps*22);assert.equal(b.role,'SENSITIVITY_ONLY_NOT_WEIGHTED_SCENARIO');
 assert.ok(b.outputs.fair_value<d.market_reference.price);assert.ok(b.outputs.total_return_irr<0);
});
test('weight sensitivity reallocates Base to Bear and recomputes dated cashflow IRR',()=>{
 const times=d.return_framework.dividend_dates.map(date=>(Date.parse(date)-Date.parse('2026-10-28'))/86400000/365.25);
 for(const s of d.sensitivity_analysis.scenario_weight_sensitivity){
 near(s.weights.reduce((a,b)=>a+b,0),1);near(s.weights[2],.2);
 const w=d.scenarios.reduce((t,b,i)=>t+s.weights[i]*b.fair_value.value,0);near(w,s.weighted_fair_value);
 const div=d.scenarios.reduce((t,b,i)=>t+s.weights[i]*b.outputs.cumulative_dividend_per_share,0);
 near(div/2*times.reduce((a,t)=>a+(1+s.weighted_cashflow_irr)**(-t),0)+w/(1+s.weighted_cashflow_irr)**(795/365.25),d.market_reference.price);
 assert.ok(s.weighted_cashflow_irr<d.return_framework.hurdle_rate);
 }
});
