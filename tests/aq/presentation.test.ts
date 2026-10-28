import assert from 'node:assert/strict';
import test from 'node:test';
import {createElement} from 'react';
import {renderToStaticMarkup} from 'react-dom/server';
import {getAnalysisPresentation} from '../../src/components/home/analysisPresentation';
import {aqQ32026} from '../../src/data/analyses/aq-group/aq-q3-2026';
import AqBusinessDetails from '../../src/components/analysis/aq/AqBusinessDetails';
import AqMemberDetails from '../../src/components/analysis/aq/AqMemberDetails';
import HistoricalFundament from '../../src/components/analysis/HistoricalFundament';

test('homepage uses AQ canonical potential with Swedish precision and spacing',()=>{
 assert.equal(getAnalysisPresentation(aqQ32026).potential,'+0,4 %');
 const input={...aqQ32026,upside:999,v11Preview:{...aqQ32026.v11,upside:'+900 %'}};
 assert.equal(getAnalysisPresentation(input as typeof aqQ32026).potential,aqQ32026.v11!.upside);
});
test('legacy numeric potential uses one decimal, including negative and zero',()=>{
 for(const [upside,expected] of [[1.992187063,'+2,0 %'],[-1.992187063,'−2,0 %'],[0,'0,0 %']] as const){
  const data={...aqQ32026,v11:undefined,v11Preview:undefined,upside};
  assert.equal(getAnalysisPresentation(data).potential,expected);
 }
});
test('AQ historical periods and decimal separators match actual supplied data',()=>{
 const html=renderToStaticMarkup(createElement(HistoricalFundament,{data:aqQ32026.historicalFundament!}));
 const text=html.replace(/<[^>]*>/g,'');
 assert.doesNotMatch(text,/Senaste fyra rapporterade kvartal/);
 assert.match(text,/Helår 2023–2025/);
 assert.match(text,/R12 Q3 2026/);
 assert.match(text,/8,8–9,8 %/);
 assert.match(text,/9,7 %/);
 assert.match(text,/0,6 %/);
});

test('company explanation precedes financial detail and covers the actual business',()=>{
 const html=renderToStaticMarkup(createElement(AqBusinessDetails));const text=html.replace(/<[^>]*>/g,'');
 for(const subject of ['Vad AQ säljer','Två delar av bolaget','Varifrån tillväxten','pengar på kontot'])assert.ok(text.includes(subject));
});
test('member reading starts with operational scenarios and folds technical stress tests away',()=>{
 const html=renderToStaticMarkup(createElement(AqMemberDetails));const reading=html.split('<details')[0];
 assert.match(reading,/Komponenter driver tillväxten/);assert.match(reading,/Hur mycket av vinsten blir kvar/);assert.doesNotMatch(reading,/Base-light|0,103|Bear-\/Bull-vikter/);
 assert.match(html,/<details[^>]*><summary[^>]*>Visa hela modellen och extra stresstester/);assert.doesNotMatch(html,/<details[^>]* open/);
});
