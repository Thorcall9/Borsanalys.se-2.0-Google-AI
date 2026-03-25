import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, TrendingUp, Shield, Zap } from 'lucide-react';

export const Hero: React.FC = () => {
  return (
    <section className="relative pt-40 pb-32 overflow-hidden">
      {/* Background Grid & Accents */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full">
          <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[120px] animate-pulse" />
          <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px]" />
        </div>
      </div>

      <div className="container mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-5xl mx-auto"
        >
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/5 text-primary border border-primary/20 text-[10px] font-black uppercase tracking-[0.3em] mb-10"
          >
            <Zap className="w-3 h-3 fill-primary" />
            <span>AI-Driven Analys v2.0</span>
          </motion.div>
          
          <h1 className="text-6xl md:text-[100px] font-black tracking-tighter leading-[0.85] mb-10 text-foreground">
            Professionella aktieanalyser <br />
            <span className="text-primary">drivna av data och AI</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto mb-16 leading-relaxed font-medium">
            Vi kombinerar djupgående fundamental analys med avancerade algoritmer för att ge dig en klar och objektiv bild av marknaden.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="w-full sm:w-auto px-12 py-6 bg-primary text-primary-foreground rounded-full font-black text-lg shadow-2xl shadow-primary/30 hover:bg-primary/90 transition-all flex items-center justify-center gap-3 uppercase tracking-widest"
            >
              Kom igång nu
              <ArrowRight className="w-6 h-6" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="w-full sm:w-auto px-12 py-6 bg-card border border-border rounded-full font-black text-lg shadow-xl shadow-black/5 hover:bg-muted transition-all uppercase tracking-widest"
            >
              Se demoanalys
            </motion.button>
          </div>
        </motion.div>

        {/* Feature Highlights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 mt-40 max-w-6xl mx-auto">
          {[
            { icon: TrendingUp, title: "Data-driven precision", desc: "Varje analys baseras på tusentals datapunkter för maximal träffsäkerhet." },
            { icon: Zap, title: "Realtidsinsikter", desc: "Våra algoritmer bevakar marknaden 24/7 och levererar insikter i realtid." },
            { icon: Shield, title: "Total objektivitet", desc: "Vi tar inga positioner i bolagen vi analyserar. Bara ren, ofiltrerad data." }
          ].map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.2, duration: 0.8 }}
              viewport={{ once: true }}
              className="flex flex-col items-center text-center group"
            >
              <div className="w-20 h-20 rounded-[2rem] bg-muted/50 border border-border flex items-center justify-center mb-8 group-hover:scale-110 group-hover:rotate-6 group-hover:border-primary/50 transition-all duration-500">
                <feature.icon className="w-10 h-10 text-primary" />
              </div>
              <h3 className="text-2xl font-black tracking-tight mb-4">{feature.title}</h3>
              <p className="text-muted-foreground text-base leading-relaxed font-medium">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
