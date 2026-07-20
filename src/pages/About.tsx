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
    <div className="min-h-screen bg-white text-slate-900">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-[radial-gradient(circle_at_75%_15%,rgba(16,185,129,0.08),transparent_28%),linear-gradient(180deg,#ffffff_0%,#fbfdfc_100%)]">
      <div className="mx-auto max-w-[1180px] px-5 pb-12 pt-12 md:px-8 md:pb-16 md:pt-14">
      <div className="max-w-4xl space-y-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-700"
        >
          Om Börsanalys.se
        </motion.div>
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.8 }}
          className="font-serif text-[48px] leading-[.98] tracking-[-0.045em] md:text-[72px]"
        >
          Vi gör analys <br /> <span className="text-primary">tillgängligt.</span>
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="max-w-[620px] text-base leading-7 text-slate-600 md:text-[18px]"
        >
          Börsanalys.se startades med en enkel idé: att erbjuda djupgående aktieanalys som faktiskt hjälper dig fatta bättre investeringsbeslut — utan krångel, utan dolda agendor.
        </motion.p>
      </div>
      </div>
      </div>

      {/* Values Section */}
      <div className="mx-auto grid max-w-[1180px] grid-cols-1 gap-3 px-5 py-10 md:grid-cols-3 md:px-8 md:py-14">
        {values.map((value, index) => (
          <motion.div 
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1, duration: 0.6 }}
            className="group space-y-5 rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_5px_18px_rgba(15,23,42,0.035)] transition-all duration-500 hover:-translate-y-0.5 hover:border-emerald-300 hover:shadow-md md:p-6"
          >
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700 transition-transform duration-500 group-hover:scale-105">
              <value.icon size={22} />
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-bold tracking-tight">{value.title}</h3>
              <p className="text-sm leading-6 text-slate-500">{value.description}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Team Section */}
      <div className="mx-auto max-w-[1180px] space-y-8 px-5 pb-14 md:px-8 md:pb-20">
        <div className="space-y-2">
          <h2 className="font-serif text-3xl leading-tight tracking-tight md:text-5xl">Carl Fredrik Thor</h2>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-700">Grundare & analytiker</p>
        </div>
        
        <div className="grid min-w-0 grid-cols-1 items-center gap-8 lg:grid-cols-2 lg:gap-14">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="group"
          >
            <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-slate-100 shadow-lg">
              <img 
                src="https://picsum.photos/seed/carlfredrik/800/1000" 
                alt="Carl Fredrik Thor" 
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 scale-105 group-hover:scale-100"
                referrerPolicy="no-referrer"
              />
            </div>
          </motion.div>
          
          <div className="space-y-5">
            <p className="text-base leading-7 text-slate-600 md:text-lg">
              Jag arbetar inom rättsväsendet och har parallellt byggt upp ett stort intresse för fundamental aktieanalys. Börsanalys.se är mitt sätt att kombinera analytiskt och systematiskt tänkande — egenskaper från mitt yrkesliv — med ett genuint intresse för börsen och investeringar.
            </p>
            <p className="text-base leading-7 text-slate-600 md:text-lg">
              Jag äger själv aktier i flera av de bolag jag analyserar, vilket innebär att jag har skin in the game. Mina rekommendationer är mina egna och baseras på samma analysmodell som presenteras på sajten.
            </p>
            <div className="flex gap-3 pt-2">
              <a 
                href="https://x.com/borsanalys" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex h-11 w-11 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-500 shadow-sm transition hover:border-emerald-700 hover:bg-emerald-700 hover:text-white"
              >
                <Twitter size={24} />
              </a>
              <a href="#" className="flex h-11 w-11 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-500 shadow-sm transition hover:border-emerald-700 hover:bg-emerald-700 hover:text-white">
                <Linkedin size={24} />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Section */}
      <div className="mx-5 mb-12 overflow-hidden rounded-2xl bg-slate-950 p-8 text-center text-white shadow-xl md:mx-auto md:max-w-[1120px] md:p-14">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/20 rounded-full blur-[150px] -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] translate-y-1/2 -translate-x-1/2" />
        
        <div className="relative z-10 space-y-8">
          <h2 className="font-serif text-4xl leading-tight tracking-tight md:text-6xl">Vill du komma <br /> <span className="text-emerald-400">i kontakt?</span></h2>
          <p className="mx-auto max-w-2xl text-base leading-7 text-white/70 md:text-lg">Har du frågor, feedback eller vill diskutera en analys?</p>
          <div className="flex flex-wrap justify-center gap-4 pt-4">
            <motion.a 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="mailto:carl@borsanalys.se" 
              className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-6 py-3 text-sm font-bold text-white shadow-md shadow-emerald-900/30"
            >
              <Mail size={24} /> carl@borsanalys.se
            </motion.a>
          </div>
        </div>
      </div>

      {/* Final CTA Section */}
      <div className="px-5 py-10 text-center md:py-14">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="space-y-8"
        >
          <h3 className="font-serif text-2xl tracking-tight md:text-4xl">Redo att se vår metodik i praktiken?</h3>
          <Link 
            to="/analys" 
            className="group inline-flex items-center gap-2 text-lg font-semibold text-emerald-700 transition-all duration-500 hover:gap-4 md:text-2xl"
          >
            Se våra senaste analyser
            <ArrowRight size={24} className="transition-transform group-hover:scale-110" />
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
