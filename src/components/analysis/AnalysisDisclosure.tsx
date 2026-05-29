import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Info, ChevronDown, ChevronUp, ShieldAlert, Award, Calendar, DollarSign, Activity } from "lucide-react";
import { analysisDisclosures, AnalysisDisclosureKey } from "../../data/analysisDisclosures.js";
import type { AnalysisDisclosure as DisclosureType } from "../../data/analysisDisclosures.js";

export type AnalysisDisclosureProps = {
  disclosureKey: AnalysisDisclosureKey;
  analysisDate?: string;
  updatedAt?: string | null;
  analysisPrice?: string;
  recommendation?: string;
  fairValue?: string;
  timeHorizon?: string;
};

const holdingBadgeText = {
  direct: "Författaren äger aktier i bolaget",
  indirect: "Författaren har indirekt ekonomisk exponering",
  none: "Inget direkt innehav redovisat"
} as const;

export default function AnalysisDisclosure({
  disclosureKey,
  analysisDate,
  updatedAt,
  analysisPrice,
  recommendation,
  fairValue,
  timeHorizon = "12–24 månader"
}: AnalysisDisclosureProps) {
  const [isOpen, setIsOpen] = useState(false);
  const disclosure = analysisDisclosures[disclosureKey] as DisclosureType;

  if (!disclosure) {
    console.warn(`No disclosure found for key: ${disclosureKey}`);
    return null;
  }

  const badgeColor = {
    direct: "bg-emerald-500/10 border-emerald-500/30 text-emerald-400",
    indirect: "bg-blue-500/10 border-blue-500/30 text-blue-400",
    none: "bg-muted/30 border-border text-muted-foreground"
  }[disclosure.holdingType];

  return (
    <div className="border border-border/60 rounded-3xl bg-muted/5 shadow-lg shadow-black/5 backdrop-blur-sm overflow-hidden transition-all duration-300 max-w-4xl mx-auto my-12">
      {/* Header bar (always visible) */}
      <div 
        onClick={() => setIsOpen(!isOpen)}
        className="p-6 md:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 cursor-pointer hover:bg-muted/10 transition-colors select-none"
      >
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-primary/10 flex items-center justify-center text-primary shadow-inner">
              <Info size={16} />
            </div>
            <h3 className="text-base font-black tracking-tight text-foreground">Information och intressekonflikter</h3>
          </div>
          
          <div className="flex flex-wrap gap-x-6 gap-y-2 text-xs text-muted-foreground font-semibold">
            <div>
              Författare: <span className="text-foreground">Carl Fredrik Thor, Börsanalys.se</span>
            </div>
            {analysisDate && (
              <div>
                Analysdatum: <span className="text-foreground">{analysisDate}</span>
              </div>
            )}
            {updatedAt && (
              <div>
                Senast uppdaterad: <span className="text-foreground">{updatedAt}</span>
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center gap-4 self-start md:self-center">
          <div className={`px-4 py-2 border rounded-2xl text-[10px] font-black uppercase tracking-widest ${badgeColor}`}>
            {holdingBadgeText[disclosure.holdingType]}
          </div>
          <div className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-1.5 text-xs font-black uppercase tracking-widest">
            <span>{isOpen ? "Dölj" : "Visa fullständig information"}</span>
            {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </div>
        </div>
      </div>

      {/* Expanded section */}
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden border-t border-border/40"
          >
            <div className="p-6 md:p-10 space-y-8 text-foreground/80 text-sm md:text-base leading-relaxed">
              
              {/* Introduction */}
              <div className="space-y-4">
                <p>
                  Denna analys är framtagen av <strong>Börsanalys.se</strong> och författad av <strong>Carl Fredrik Thor</strong>. Analysen är avsedd för allmän information och utbildning och utgör inte personlig investeringsrådgivning anpassad efter din individuella situation.
                </p>
                <p>
                  Analysen innehåller Börsanalys.se:s självständiga bedömning av bolaget och aktien vid analystillfället, inklusive värdering, risker, scenarier och investeringsbeslut. Bedömningen bygger på offentligt tillgänglig information och kan förändras om nya uppgifter publiceras, aktiekursen förändras eller marknadsförutsättningarna ändras.
                </p>
              </div>

              {/* Facts Table */}
              <div className="border border-border/80 rounded-2xl bg-muted/10 overflow-hidden shadow-inner">
                <div className="overflow-x-auto premium-scrollbar">
                  <table className="w-full text-left text-xs md:text-sm border-collapse min-w-[500px] md:min-w-0">
                    <thead>
                      <tr className="bg-muted/30 border-b border-border/60">
                        <th className="px-6 py-3 font-black uppercase tracking-wider text-muted-foreground/80">Uppgift</th>
                        <th className="px-6 py-3 font-black uppercase tracking-wider text-muted-foreground/80">Värde</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border/40 font-semibold text-foreground/95">
                      <tr className="hover:bg-muted/5 transition-colors">
                        <td className="px-6 py-3.5 text-muted-foreground font-medium">Författare</td>
                        <td className="px-6 py-3.5 flex items-center gap-2">
                          <Award size={14} className="text-primary" />
                          <span>Carl Fredrik Thor, Börsanalys.se</span>
                        </td>
                      </tr>
                      <tr className="hover:bg-muted/5 transition-colors">
                        <td className="px-6 py-3.5 text-muted-foreground font-medium">Analysdatum</td>
                        <td className="px-6 py-3.5 flex items-center gap-2">
                          <Calendar size={14} className="text-primary" />
                          <span>{analysisDate || "Ej angivet"}</span>
                        </td>
                      </tr>
                      <tr className="hover:bg-muted/5 transition-colors">
                        <td className="px-6 py-3.5 text-muted-foreground font-medium">Senast väsentligt uppdaterad</td>
                        <td className="px-6 py-3.5 flex items-center gap-2">
                          <Calendar size={14} className="text-primary" />
                          <span>{updatedAt || "Ej väsentligt uppdaterad efter publicering"}</span>
                        </td>
                      </tr>
                      {analysisPrice && (
                        <tr className="hover:bg-muted/5 transition-colors">
                          <td className="px-6 py-3.5 text-muted-foreground font-medium">Analyspris</td>
                          <td className="px-6 py-3.5 flex items-center gap-2">
                            <DollarSign size={14} className="text-primary" />
                            <span>{analysisPrice}</span>
                          </td>
                        </tr>
                      )}
                      {recommendation && (
                        <tr className="hover:bg-muted/5 transition-colors">
                          <td className="px-6 py-3.5 text-muted-foreground font-medium">Investeringsbeslut</td>
                          <td className="px-6 py-3.5 flex items-center gap-2">
                            <Activity size={14} className="text-primary" />
                            <span className="font-black text-primary">{recommendation}</span>
                          </td>
                        </tr>
                      )}
                      {fairValue && (
                        <tr className="hover:bg-muted/5 transition-colors">
                          <td className="px-6 py-3.5 text-muted-foreground font-medium">Rimligt värde</td>
                          <td className="px-6 py-3.5 flex items-center gap-2">
                            <DollarSign size={14} className="text-primary" />
                            <span>{fairValue}</span>
                          </td>
                        </tr>
                      )}
                      <tr className="hover:bg-muted/5 transition-colors">
                        <td className="px-6 py-3.5 text-muted-foreground font-medium">Tidshorisont</td>
                        <td className="px-6 py-3.5 flex items-center gap-2">
                          <Activity size={14} className="text-primary" />
                          <span>{timeHorizon}</span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Holdings & Conflicts of Interest */}
              <div className="space-y-4 pt-4 border-t border-border/40">
                <h4 className="text-lg font-black tracking-tight text-foreground">Innehav och kommersiella relationer</h4>
                
                <div className="space-y-3 bg-muted/20 p-5 rounded-2xl border border-border/50">
                  <div>
                    <strong className="text-foreground text-xs font-black uppercase tracking-widest block mb-1">Aktuell innehavsstatus:</strong>
                    <p className="text-foreground/90">{disclosure.holdingText}</p>
                  </div>

                  {disclosure.indirectExposure && (
                    <div className="mt-3 pt-3 border-t border-border/30">
                      <strong className="text-foreground text-xs font-black uppercase tracking-widest block mb-1">Relevant indirekt exponering:</strong>
                      <p className="text-foreground/90">{disclosure.indirectExposure}</p>
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
                  <div className="space-y-1 bg-muted/10 p-4 rounded-xl border border-border/40">
                    <strong className="text-foreground text-xs font-black uppercase tracking-widest block mb-1">Andra relevanta intressekonflikter:</strong>
                    <p className="text-muted-foreground">Inga andra kända intressekonflikter som bedöms kunna påverka analysens objektivitet.</p>
                  </div>
                  
                  <div className="space-y-1 bg-muted/10 p-4 rounded-xl border border-border/40">
                    <strong className="text-foreground text-xs font-black uppercase tracking-widest block mb-1">Kommersiell relation till bolaget:</strong>
                    <p className="text-muted-foreground">{disclosure.commercialRelationship}</p>
                  </div>
                </div>

                <div className="text-xs text-muted-foreground bg-muted/5 p-4 rounded-xl border border-border/30 leading-relaxed font-medium">
                  <strong className="text-foreground text-[10px] font-black uppercase tracking-widest block mb-1">Annonser och affiliatelänkar:</strong>
                  Börsanalys.se kan erhålla ersättning från annonser eller affiliatelänkar till externa tjänster som visas i anslutning till analysen. Sådan ersättning betalas inte av det analyserade bolaget, om inte annat uttryckligen anses ovan, och påverkar inte analysens poängsättning, investeringsbeslut eller bedömda rimliga värde.
                </div>
              </div>

              {/* Risk Information */}
              <div className="space-y-3 pt-4 border-t border-border/40 text-xs md:text-sm">
                <div className="flex items-center gap-2 text-foreground font-black uppercase tracking-wider">
                  <ShieldAlert size={16} className="text-primary" />
                  <h4>Riskinformation</h4>
                </div>
                <p className="text-muted-foreground leading-relaxed">
                  Investeringar i aktier och andra finansiella instrument innebär risk. Värdet på en investering kan både öka och minska, och du kan förlora hela eller delar av det investerade kapitalet. Historisk utveckling är ingen garanti för framtida avkastning. Prognoser, estimat, scenarier och värdeintervall bygger på antaganden som kan visa sig vara felaktiga.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  Du ansvarar själv för dina investeringsbeslut och bör göra en egen bedömning utifrån din ekonomi, placeringshorisont och risktolerans.
                </p>
                <div className="pt-2 text-xs font-black uppercase tracking-widest flex gap-4 text-primary">
                  <Link to="/villkor" className="hover:underline">Användarvillkor</Link>
                  <span className="text-muted-foreground/30">•</span>
                  <Link to="/innehav" className="hover:underline">Aktieinnehav och intressekonflikter</Link>
                </div>
              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
