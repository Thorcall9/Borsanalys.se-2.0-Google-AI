import React from 'react';
import { motion } from 'framer-motion';
import { 
  Users, 
  ShieldCheck, 
  BarChart3, 
  Scale, 
  Zap, 
  AlertTriangle, 
  Globe, 
  Cpu, 
  CheckCircle,
  Layers,
  TrendingUp,
  TrendingDown,
  Minus
} from 'lucide-react';

interface StepProps {
  number: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  index: number;
}

const Step: React.FC<StepProps> = ({ number, title, description, icon, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8, delay: index * 0.1 }}
    viewport={{ once: true }}
    className="relative group p-8 rounded-[2rem] bg-card border border-border hover:border-primary/50 transition-all duration-500 shadow-xl shadow-black/5 hover:shadow-primary/10"
  >
    <div className="flex items-start gap-6">
      <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-500 shrink-0">
        {icon}
      </div>
      <div>
        <div className="text-[10px] font-black uppercase tracking-[0.3em] text-primary mb-2">
          {number}
        </div>
        <h4 className="text-xl font-black tracking-tight mb-3 group-hover:text-primary transition-colors">
          {title}
        </h4>
        <p className="text-sm text-muted-foreground leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  </motion.div>
);

export const MethodologyEngine: React.FC = () => {
  const steps = [
    {
      number: "Steg I",
      title: "Företagsöversikt",
      description: "Vi analyserar affärsmodellen på djupet, utvärderar ledningens historik och säkerställer att ägarstrukturen gynnar långsiktiga aktieägare.",
      icon: <Users size={24} />
    },
    {
      number: "Steg II",
      title: "Strategisk analys & Moat",
      description: "Bedömning av bolagets vallgravar (Moats) och konkurrensfördelar. Hur skyddad är vinstmaskinen mot nya utmanare?",
      icon: <ShieldCheck size={24} />
    },
    {
      number: "Steg III",
      title: "Finansiell analys",
      description: "En stenhård genomgång av siffrorna: Vinsttillväxt, kassaflöde och balansräkningens styrka. Vi ser bortom redovisningskosmetik.",
      icon: <BarChart3 size={24} />
    },
    {
      number: "Steg IV",
      title: "Värdering & Jämförelse",
      description: "Är aktien billig eller dyr? Vi ställer multiplar som P/E, EV/EBIT och PEG i relation till historiska snitt och konkurrenter.",
      icon: <Scale size={24} />
    },
    {
      number: "Steg V",
      title: "Tillväxtmotorer & Triggers",
      description: "Identifiering av konkreta katalysatorer. Vi letar efter expansion på nya marknader och innovation.",
      icon: <Zap size={24} />
    },
    {
      number: "Steg VI",
      title: "Riskprofil",
      description: "Vi vänder på steken och letar efter det som kan gå fel. Inkluderar branschspecifika hot och finansiella fallgropar.",
      icon: <AlertTriangle size={24} />
    },
    {
      number: "Steg VII",
      title: "ESG & Makro",
      description: "Analys av hållbarhetsrisker och hur bolaget påverkas av det makroekonomiska läget (räntor, inflation).",
      icon: <Globe size={24} />
    },
    {
      number: "Steg VIII",
      title: "AI-observationer",
      description: "Vår AI skannar miljontals datapunkter, nyhetsflöden och dolda mönster för att identifierar avvikelser som människan missar.",
      icon: <Cpu size={24} />
    }
  ];

  return (
    <section className="py-32 container mx-auto px-6">
      <div className="max-w-4xl mb-24">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-[11px] font-mono font-black uppercase tracking-[0.4em] text-primary mb-4">Methodology Engine 2.0</h2>
          <h3 className="text-5xl md:text-7xl font-black tracking-tighter leading-tight mb-8">
            Vår Analysmetodik
          </h3>
          <p className="text-xl text-muted-foreground leading-relaxed">
            Vi kombinerar mänsklig expertis med AI för att leverera marknadens mest kompletta bolagsanalyser. 
            Datan bearbetas tvärs över 10 rigorösa steg för att hitta den asymmetriska fördelen.
          </p>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-24">
        {steps.map((step, i) => (
          <Step key={step.number} {...step} index={i} />
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        {/* Sektion IX: Verdict */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="bg-foreground text-background rounded-[3rem] p-10 md:p-14 relative overflow-hidden shadow-2xl shadow-black/20"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2" />
          
          <div className="relative z-10">
            <div className="flex flex-col md:flex-row justify-between items-start gap-8 mb-12">
              <div>
                <div className="text-[10px] font-black uppercase tracking-[0.3em] text-primary mb-4">
                  Sektion IX
                </div>
                <h4 className="text-4xl font-black tracking-tight mb-4">
                  Sammanfattning & Verdict
                </h4>
                <p className="text-background/60 leading-relaxed max-w-md">
                  Här sammanställs de 8 kategorierna till en totalpoäng (0–40). Vår algoritm utmynnar i ett konkret data-drivet investeringsutlåtande.
                </p>
              </div>
              <div className="flex flex-col items-center justify-center p-8 bg-background/5 border border-white/10 rounded-[2rem] min-w-[200px]">
                <div className="text-[10px] font-black uppercase tracking-widest text-primary mb-2">Algoritmisk Utdata</div>
                <div className="text-2xl font-black text-primary mb-4">CONFIRMED: KÖP</div>
                <div className="flex items-baseline gap-2">
                  <span className="text-6xl font-black">32</span>
                  <span className="text-xl font-black text-white/20">/ 40</span>
                </div>
                <div className="text-[10px] font-black uppercase tracking-widest text-white/30 mt-2">Totalpoäng (80%)</div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Sektion X: Scenarios */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="bg-card border border-border rounded-[3rem] p-10 md:p-14 shadow-2xl shadow-black/5"
        >
          <div className="mb-12">
            <div className="text-[10px] font-black uppercase tracking-[0.3em] text-primary mb-4">
              Sektion X
            </div>
            <h4 className="text-4xl font-black tracking-tight mb-4">
              Scenarier (Bull, Base & Bear)
            </h4>
            <p className="text-muted-foreground leading-relaxed">
              Sannolikhetsviktad förväntad avkastning visualiserad genom tre marknadsklimat.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-primary/5 border border-primary/10 flex flex-col items-center text-center">
              <TrendingUp className="text-primary mb-4" size={32} />
              <div className="text-xs font-black uppercase tracking-widest text-primary mb-1">Bull Case</div>
              <div className="text-2xl font-black mb-1">420 SEK</div>
              <div className="text-[10px] font-black text-muted-foreground uppercase">25% Sannolikhet</div>
            </div>
            <div className="p-6 rounded-2xl bg-muted/50 border border-border flex flex-col items-center text-center">
              <Minus className="text-muted-foreground mb-4" size={32} />
              <div className="text-xs font-black uppercase tracking-widest text-muted-foreground mb-1">Base Case</div>
              <div className="text-2xl font-black mb-1">345 SEK</div>
              <div className="text-[10px] font-black text-muted-foreground uppercase">50% Sannolikhet</div>
            </div>
            <div className="p-6 rounded-2xl bg-red-500/5 border border-red-500/10 flex flex-col items-center text-center">
              <TrendingDown className="text-red-500 mb-4" size={32} />
              <div className="text-xs font-black uppercase tracking-widest text-red-500 mb-1">Bear Case</div>
              <div className="text-2xl font-black mb-1">210 SEK</div>
              <div className="text-[10px] font-black text-muted-foreground uppercase">25% Sannolikhet</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
