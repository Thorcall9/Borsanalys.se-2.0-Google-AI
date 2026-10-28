import {readFileSync} from 'node:fs';
import assert from 'node:assert/strict';
import test from 'node:test';
const read=p=>JSON.parse(readFileSync(new URL(p,import.meta.url)));
const d=read('../../src/data/analyses/aq-group/aq-q3-2026-dossier.json');
const old=read('../../analyses/AQ/AQ-20261028-v11.2-r2.json');
const previous=read('../../analyses/AQ/AQ-20261028-v11.2-r4.json');
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

test('r5 preserves operating forecasts and revises premium using component FCF',()=>{
 for(const [i,s] of d.scenarios.entries()){for(const key of ['revenue','ebit_margin','net_finance','tax_rate','diluted_shares'])near(s.inputs[key],previous.scenarios[i].inputs[key]);near(s.probability,previous.scenarios[i].probability);near(s.inputs.ev_ebit,s.inputs.pe*(1-s.inputs.tax_rate));}
 assert.equal(d.scenarios[1].inputs.pe,22);assert.equal(d.scenarios[2].inputs.pe,26);
 const b=d.sensitivity_analysis.base_light;near(b.outputs.fair_value,previous.sensitivity_analysis.base_light.outputs.fair_value);assert.equal(b.role,'SENSITIVITY_ONLY_NOT_WEIGHTED_SCENARIO');
});
test('weight sensitivity reallocates Base to Bear and recomputes dated cashflow IRR',()=>{
 const times=d.return_framework.dividend_dates.map(date=>(Date.parse(date)-Date.parse('2026-10-28'))/86400000/365.25);
 for(const s of d.sensitivity_analysis.scenario_weight_sensitivity){
 near(s.weights.reduce((a,b)=>a+b,0),1);assert.ok([.15,.2].includes(s.weights[2]));
 const w=d.scenarios.reduce((t,b,i)=>t+s.weights[i]*b.fair_value.value,0);near(w,s.weighted_fair_value);
 const div=d.scenarios.reduce((t,b,i)=>t+s.weights[i]*b.outputs.cumulative_dividend_per_share,0);
 near(div/2*times.reduce((a,t)=>a+(1+s.weighted_cashflow_irr)**(-t),0)+w/(1+s.weighted_cashflow_irr)**(795/365.25),d.market_reference.price);
 assert.ok(s.weighted_cashflow_irr<d.return_framework.hurdle_rate);
 }
});

test('reported R12 bridge reconciles including explicit rounding',()=>{
 const h=d.cashflow_bridge.historical_r12;near(h.ebt+h.depreciation_amortization+h.other_noncash-h.tax_paid-h.working_capital_absorption+h.rounding_adjustment,h.cfo);near(h.cfo-h.gross_capex-h.lease_principal,345);
 const w=d.cashflow_bridge.working_capital_proxy;near(w.inventory+w.trade_receivables+w.other_current_assets_ex_tax-w.trade_payables-w.contract_liabilities-w.other_current_liabilities,w.net_operating_working_capital);near(w.ratio,w.net_operating_working_capital/9823);
});
test('each forward cashflow period derives from components and funds terminal cash',()=>{
 const b=d.cashflow_bridge;for(const [i,s] of b.scenarios.entries()){
 for(const row of s.periods){
 near(row.ebt,row.period_revenue*row.ebit_margin+row.net_finance);near(row.depreciation_amortization,row.period_revenue*.035);near(row.tax_paid,row.ebt*d.scenarios[i].inputs.tax_rate);
 near(row.working_capital_absorption,row.closing_working_capital_proxy-row.opening_working_capital_proxy);near(row.cfo,row.ebt+row.depreciation_amortization-row.tax_paid-row.working_capital_absorption);near(row.fcf_after_leases,row.cfo-row.gross_capex-row.lease_principal);
 }
 near(s.periods[2].net_income,d.scenarios[i].outputs.net_income);near(s.periods.reduce((a,r)=>a+r.fcf_after_leases,0),d.cashflow_control.funding_budgets[i].cumulative_fcf_after_leases);
 }
 assert.ok(b.scenarios[1].periods[2].fcf_conversion<.54);
});
test('four scenario is isolated and reweighted from revised values',()=>{
 const f=d.sensitivity_analysis.four_scenario;const vals=[d.scenarios[0].fair_value.value,d.sensitivity_analysis.base_light.outputs.fair_value,d.scenarios[1].fair_value.value,d.scenarios[2].fair_value.value];near(f.weights.reduce((a,p)=>a+p,0),1);near(vals.reduce((a,v,i)=>a+f.weights[i]*v,0),f.weighted_fair_value);
});
