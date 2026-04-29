import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, ShieldCheck, PiggyBank, ArrowRight, CheckCircle2, Zap, Smartphone, Shield, Percent, AlertCircle } from 'lucide-react';

export default function SparaInvesteraGuide() {
  const tableData = [
    { years: 5, amount: '36 740 kr' },
    { years: 10, amount: '91 470 kr' },
    { years: 20, amount: '294 510 kr' },
    { years: 30, amount: '745 180 kr' }
  ];

  const sections = [
    {
      title: "El & Energi",
      icon: <Zap className="text-amber-400" size={24} />,
      content: "Genom att se över ditt elavtal en gång om året kan du ofta spara flera tusen kronor. Elmarknaden är rörlig och lojalitet lönar sig sällan."
    },
    {
      title: "Försäkringar",
      icon: <Shield className="text-blue-400" size={24} />,
      content: "Samla dina försäkringar men jämför alltid. Många betalar för dubbelt skydd eller gamla villkor som inte längre är konkurrenskraftiga."
    },
    {
      title: "Bolån & Privatpapper",
      icon: <TrendingUp className="text-emerald-400" size={24} />,
      content: "Räntekostnaden är en av de största utgifterna i de flesta hushåll. En sänkning på bara 0,2 procentenheter kan ge tusenlappar extra varje år."
    },
    {
      title: "Abonnemang",
      icon: <Smartphone className="text-purple-400" size={24} />,
      content: "Streaming, mobilabonnemang och gymkort som inte används är direkta läckage. Rensa i din bankhistorik och se vad som verkligen tillför värde."
    }
  ];

  return (
    <div className="space-y-16">
      <section className="not-prose space-y-8">
        <h2 className="text-4xl md:text-6xl font-black tracking-tighter leading-[0.9]">
          Den <span className="text-primary">osynliga vinsten</span>: Hur du hittar 10 000 kr extra till din portfölj varje år
        </h2>
        <div className="space-y-6">
          <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed font-medium max-w-3xl">
            Att sänka sina fasta kostnader är den enda investeringen med en 100% garanterad avkastning.
          </p>
          <p className="text-lg text-muted-foreground leading-relaxed font-medium max-w-3xl">
            De flesta investerare lägger hundratals timmar på att försöka överprestera börsen med någon procentenhet. Men genom att täppa till de ekonomiska läckagen i din vardag kan du öka ditt investeringsutrymme dramatiskt — utan att påverka din livskvalitet. Varje sparad hundralapp som går in i din portfölj börjar genast arbeta för din framtid.
          </p>
        </div>
      </section>

      {/* Påmind CTA */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="not-prose p-10 md:p-12 bg-[#f0f7ff] border border-blue-100 rounded-[3rem] relative overflow-hidden group shadow-xl shadow-blue-500/5"
      >
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-100/50 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 group-hover:bg-blue-200/50 transition-colors duration-700"></div>
        
        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-10">
          <div className="space-y-6 max-w-2xl">
            <div className="flex items-center gap-3 text-[#0052FF]">
              <ShieldCheck size={28} />
              <span className="text-[10px] font-black uppercase tracking-[0.4em] opacity-80">Rekommenderat verktyg</span>
            </div>
            <h3 className="text-3xl md:text-4xl font-black tracking-tighter text-[#002B7A]">Sänk dina fasta kostnader automatiskt med Påmind</h3>
            <p className="text-lg text-slate-600 font-medium leading-relaxed">
              Att förhandla om avtal är tidskrävande. Påmind är en kostnadsfri tjänst som automatiskt bevakar och förhandlar dina elavtal, försäkringar och abonnemang åt dig. Det är det enklaste sättet att hitta de där extra 10 000 kronorna per år.
            </p>
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-2 text-sm font-bold text-slate-700">
                <CheckCircle2 size={16} className="text-[#0052FF]" /> Helt kostnadsfritt
              </div>
              <div className="flex items-center gap-2 text-sm font-bold text-slate-700">
                <CheckCircle2 size={16} className="text-[#0052FF]" /> Ingen flytt krävs
              </div>
              <div className="flex items-center gap-2 text-sm font-bold text-slate-700">
                <CheckCircle2 size={16} className="text-[#0052FF]" /> Bevakar marknaden dygnet runt
              </div>
            </div>
          </div>
          
          <div className="flex-shrink-0">
            <a 
              href="https://go.adt228.com/t/t?a=2007569774&as=2066019423&t=2&tk=1" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-4 bg-[#0052FF] text-white px-12 py-6 rounded-2xl font-black uppercase tracking-widest text-sm hover:bg-[#0041CC] hover:scale-105 active:scale-95 transition-all shadow-2xl shadow-blue-500/20 group/btn"
            >
              Kom igång gratis <ArrowRight size={20} className="group-hover/btn:translate-x-2 transition-transform" />
            </a>
          </div>
        </div>
      </motion.div>

      {/* Strategy Grid */}
      <div className="not-prose grid grid-cols-1 md:grid-cols-2 gap-8 my-24">
        {sections.map((section, idx) => (
          <div 
            key={idx}
            className="p-10 bg-muted/30 border border-border rounded-[2.5rem] space-y-6 hover:border-primary/30 transition-all group"
          >
            <div className="w-12 h-12 rounded-2xl bg-muted border border-border flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
              {section.icon}
            </div>
            <h3 className="text-2xl font-black tracking-tighter">{section.title}</h3>
            <p className="text-base text-muted-foreground leading-relaxed font-medium">
              {section.content}
            </p>
          </div>
        ))}
      </div>

      {/* Table Section */}
      <section className="not-prose space-y-12 py-16 border-t border-border/50">
        <div className="space-y-4">
          <div className="flex items-center gap-3 text-primary mb-4">
            <PiggyBank size={32} />
            <h3 className="text-3xl md:text-5xl font-black tracking-tighter">Kraften i 500 kr extra</h3>
          </div>
          <p className="text-xl text-muted-foreground font-medium leading-relaxed max-w-3xl">
            Genom att hitta bara 500 kr extra per månad — pengar du annars skulle ha spenderat på onödiga avgifter — och investera dem med 8% årlig avkastning, skapar du en betydande förmögenhet över tid.
          </p>
        </div>

        <div className="overflow-hidden bg-card border border-border rounded-[2.5rem] shadow-xl shadow-black/5">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-muted/50 border-b border-border">
                <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-muted-foreground">Tidshorisont</th>
                <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-muted-foreground text-right border-l border-border">Total förmögenhet (8% avk.)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/50">
              {tableData.map((row, i) => (
                <tr key={i} className="hover:bg-primary/5 transition-colors">
                  <td className="px-8 py-8">
                    <div className="flex items-center gap-3 font-black text-2xl tracking-tighter">
                      {row.years} <span className="text-sm font-medium text-muted-foreground uppercase tracking-widest">år</span>
                    </div>
                  </td>
                  <td className="px-8 py-8 text-right border-l border-border/50">
                    <div className="text-3xl font-black text-primary tracking-tighter">
                      {row.amount}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="p-8 bg-muted/30 text-center border-t border-border">
            <p className="text-xs font-black text-muted-foreground/50 uppercase tracking-[0.2em]">
              Baserat på 8% årlig avkastning, 500 kr/månad, före skatt.
            </p>
          </div>
        </div>
      </section>

      {/* Från besparing till investering */}
      <section className="not-prose space-y-12">
        <div className="space-y-4">
          <h3 className="text-3xl md:text-5xl font-black tracking-tighter italic">Från besparing till investering</h3>
          <p className="text-xl text-muted-foreground font-medium leading-relaxed max-w-3xl">
            Det verkliga värdet uppstår inte bara när du sänker kostnaderna, utan när du automatiskt för över skillnaden till sparande varje månad.
          </p>
        </div>

        <div className="p-8 bg-muted/30 border border-border rounded-[2.5rem] space-y-8">
          <p className="text-lg text-muted-foreground leading-relaxed font-medium">
            Det är här många missar poängen. Att spara 500 kronor extra spelar mindre roll om pengarna bara blir kvar på kontot och försvinner i annan konsumtion. Men om de istället förs över till ett ISK, en fondportfölj eller ett långsiktigt kvalitetscase, då blir varje förbättrat avtal ett konkret steg mot större finansiell frihet.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 pt-8">
            {[
              { step: 1, title: "Identifiera", text: "Onödigt dyra fasta kostnader" },
              { step: 2, title: "Optimera", text: "Sänk eller förhandla om dem" },
              { step: 3, title: "Investera", text: "För över skillnaden automatiskt" },
              { step: 4, title: "Växa", text: "Låt tiden och räntan göra resten" }
            ].map((item, idx) => (
              <div key={idx} className="p-6 bg-card border border-border rounded-2xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-4 font-black text-4xl opacity-5 text-primary group-hover:opacity-10 transition-opacity">0{item.step}</div>
                <div className="text-primary font-black text-xs uppercase tracking-widest mb-2">Steg {item.step}</div>
                <div className="text-xl font-black tracking-tighter mb-2">{item.title}</div>
                <p className="text-xs text-muted-foreground font-medium leading-relaxed">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Nordnet CTA */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="my-12 flex justify-center w-full"
      >
        <a 
          href="https://go.adt267.com/t/t?a=1582930370&as=2066019423&t=2&tk=1" 
          target="_blank" 
          rel="sponsored noopener noreferrer"
          className="block w-full max-w-[728px] hover:opacity-95 transition-opacity"
        >
          <img 
            src="https://track.adtraction.com/t/t?a=2067948486&as=2066019423&t=1&tk=1&i=1" 
            alt="Öppna konto hos Nordnet" 
            className="w-full h-auto rounded-lg shadow-sm"
          />
        </a>
      </motion.div>

      {/* Summary Section */}
      <section className="not-prose p-12 bg-primary/5 border border-primary/20 rounded-[3rem] space-y-8 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-64 h-64 bg-primary/10 rounded-full blur-[100px] -translate-y-1/2 -translate-x-1/2"></div>
        <div className="relative z-10 space-y-6 text-center max-w-3xl mx-auto">
          <h3 className="text-3xl md:text-4xl font-black tracking-tighter">Börja i dag</h3>
          <div className="space-y-6">
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed font-medium">
              För de flesta hushåll är det här den mest realistiska vägen till högre investeringsutrymme. Inte genom att leva snålare, utan genom att sluta betala för mycket i onödan.
            </p>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed font-medium">
              Du behöver inte hitta nästa kursraket för att förbättra din ekonomi. Du kan börja med att täppa till de läckor som redan finns. Det är enkelt, rationellt och i många fall betydligt mer kraftfullt än man först tror.
            </p>
          </div>
        </div>
      </section>

      {/* Legal Disclaimer */}
      <footer className="pt-16 border-t border-border/50">
        <div className="p-8 bg-muted/20 border border-border rounded-2xl space-y-4">
          <div className="flex items-center gap-2 text-xs font-black text-muted-foreground/50 uppercase tracking-widest uppercase italic">
            <Shield size={14} /> Ansvarsfriskrivning & Affiliate
          </div>
          <p className="text-xs text-muted-foreground/60 leading-relaxed font-medium">
            Det här inlägget innehåller annonslänkar för Påmind. Börsanalys.se kan erhålla ersättning om du väljer att använda tjänsten. Vi rekommenderar endast tjänster som vi bedömer kan tillföra ett tydligt värde för våra läsare. Kom ihåg att alla investeringar innebär risk. Historisk avkastning är ingen garanti för framtida resultat. Du kan förlora delar av eller hela ditt investerade kapital.
          </p>
        </div>
      </footer>
    </div>
  );
}
