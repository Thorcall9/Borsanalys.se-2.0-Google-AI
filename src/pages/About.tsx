import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Users, Target, Shield, Zap, Mail, Twitter, Linkedin, ArrowRight } from "lucide-react";

export default function About() {
  const values = [
    {
      icon: Target,
      title: "Vår vision",
      description: "Att ge den vanlige spararen tillgång till samma typ av strukturerad bolagsanalys som professionella investerare använder — men på ett språk som är lätt att förstå."
    },
    {
      icon: Shield,
      title: "Transparens & Oberoende",
      description: "Våra analyser är alltid objektiva och drivs av ett genuint intresse för investeringar. För att finansiera plattformen använder vi utvalda affiliatelänkar. Vi kan även ha ägarintressen i bolag vi analyserar — detta framgår alltid tydligt i respektive analys."
    },
    {
      icon: Zap,
      title: "Metodik",
      description: "Varje analys bygger på kvartalsrapporter, årsredovisningar och makrodata. Vi bedömer varje bolag i åtta kategorier och sammanfattar alltid i ett tydligt beslut med tre scenarion — Bull, Base och Bear."
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-6 py-24 md:py-32 space-y-32">
      {/* Hero Section */}
      <div className="max-w-4xl space-y-12">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-[11px] font-black uppercase tracking-[0.4em] text-primary"
        >
          Om Börsanalys.se
        </motion.div>
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.8 }}
          className="text-6xl md:text-9xl font-black tracking-tighter leading-[0.85]"
        >
          Vi gör analys <br /> <span className="text-primary">tillgängligt.</span>
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="text-2xl text-muted-foreground leading-relaxed font-medium max-w-3xl"
        >
          Börsanalys.se startades med en enkel idé: att erbjuda djupgående aktieanalys som faktiskt hjälper dig fatta bättre investeringsbeslut — utan krångel, utan dolda agendor.
        </motion.p>
      </div>

      {/* Values Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
        {values.map((value, index) => (
          <motion.div 
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1, duration: 0.6 }}
            className="space-y-8 p-10 bg-card border border-border rounded-[2.5rem] hover:border-primary/50 transition-all duration-500 shadow-xl shadow-black/5 group"
          >
            <div className="w-16 h-16 bg-primary/10 text-primary rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-500 shadow-lg shadow-primary/5">
              <value.icon size={32} />
            </div>
            <div className="space-y-4">
              <h3 className="text-3xl font-black tracking-tighter">{value.title}</h3>
              <p className="text-lg text-muted-foreground leading-relaxed font-medium">{value.description}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Team Section */}
      <div className="space-y-20">
        <div className="space-y-6">
          <h2 className="text-4xl md:text-7xl font-black tracking-tighter leading-tight">Carl Fredrik Thor</h2>
          <p className="text-[10px] font-black text-primary uppercase tracking-[0.3em]">Grundare & Analytiker</p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="group"
          >
            <div className="aspect-[4/5] bg-muted rounded-[3rem] overflow-hidden relative shadow-2xl shadow-black/10">
              <img 
                src="https://picsum.photos/seed/carlfredrik/800/1000" 
                alt="Carl Fredrik Thor" 
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 scale-105 group-hover:scale-100"
                referrerPolicy="no-referrer"
              />
            </div>
          </motion.div>
          
          <div className="space-y-8">
            <p className="text-xl text-muted-foreground font-medium leading-relaxed">
              Jag arbetar inom rättsväsendet och har parallellt byggt upp ett stort intresse för fundamental aktieanalys. Börsanalys.se är mitt sätt att kombinera analytiskt och systematiskt tänkande — egenskaper från mitt yrkesliv — med ett genuint intresse för börsen och investeringar.
            </p>
            <p className="text-xl text-muted-foreground font-medium leading-relaxed">
              Jag äger själv aktier i flera av de bolag jag analyserar, vilket innebär att jag har skin in the game. Mina rekommendationer är mina egna och baseras på samma analysmodell som presenteras på sajten.
            </p>
            <div className="flex gap-4 pt-4">
              <a href="#" className="w-14 h-14 bg-card border border-border rounded-2xl flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all duration-500 shadow-xl shadow-black/5">
                <Twitter size={24} />
              </a>
              <a href="#" className="w-14 h-14 bg-card border border-border rounded-2xl flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all duration-500 shadow-xl shadow-black/5">
                <Linkedin size={24} />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Section */}
      <div className="bg-foreground text-background rounded-[4rem] p-16 md:p-32 text-center space-y-12 relative overflow-hidden shadow-2xl shadow-black/20">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/20 rounded-full blur-[150px] -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] translate-y-1/2 -translate-x-1/2" />
        
        <div className="relative z-10 space-y-8">
          <h2 className="text-5xl md:text-8xl font-black tracking-tighter leading-[0.85]">Vill du komma <br /> <span className="text-primary">i kontakt?</span></h2>
          <p className="text-xl md:text-2xl text-background/70 max-w-2xl mx-auto font-medium leading-relaxed">Har du frågor, feedback eller vill diskutera en analys?</p>
          <div className="flex flex-wrap justify-center gap-6 pt-8">
            <motion.a 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="mailto:carl@borsanalys.se" 
              className="inline-flex items-center gap-4 px-12 py-6 bg-primary text-primary-foreground rounded-full font-black uppercase tracking-widest text-sm shadow-2xl shadow-primary/30"
            >
              <Mail size={24} /> carl@borsanalys.se
            </motion.a>
          </div>
        </div>
      </div>

      {/* Final CTA Section */}
      <div className="text-center py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="space-y-8"
        >
          <h3 className="text-3xl md:text-5xl font-black tracking-tighter">Redo att se vår metodik i praktiken?</h3>
          <Link 
            to="/analys" 
            className="inline-flex items-center gap-3 text-2xl md:text-4xl font-black text-primary hover:gap-6 transition-all duration-500 group"
          >
            Se våra senaste analyser
            <ArrowRight size={40} className="group-hover:scale-110 transition-transform" />
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
