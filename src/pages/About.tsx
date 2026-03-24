import React from "react";
import { motion } from "framer-motion";
import { Users, Target, Shield, Zap, Mail, Twitter, Linkedin } from "lucide-react";

export default function About() {
  const values = [
    {
      icon: Target,
      title: "Vår Vision",
      description: "Att demokratisera tillgången till högkvalitativ börsanalys och finansiell utbildning för alla sparare."
    },
    {
      icon: Shield,
      title: "Oberoende",
      description: "Vi är helt oberoende och drivs av passion för investeringar, inte av provisioner eller dolda intressen."
    },
    {
      icon: Zap,
      title: "Datadrivet",
      description: "Våra analyser baseras på hårda fakta, historisk data och beprövade värderingsmodeller."
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 md:py-24 space-y-24">
      {/* Hero Section */}
      <div className="max-w-3xl space-y-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-[11px] font-mono uppercase tracking-widest text-primary font-bold"
        >
          Om Börsanalys.se
        </motion.div>
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-5xl md:text-8xl font-serif font-bold tracking-tight leading-none"
        >
          Vi gör analys <br /> <span className="italic text-muted">tillgängligt.</span>
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-xl text-muted leading-relaxed"
        >
          Börsanalys.se startades med en enkel idé: att erbjuda djupgående, professionell aktieanalys på ett sätt som är lätt att förstå och använda för den vanliga spararen.
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
            transition={{ delay: index * 0.1 }}
            className="space-y-6"
          >
            <div className="w-12 h-12 bg-primary/10 text-primary rounded-xl flex items-center justify-center">
              <value.icon size={24} />
            </div>
            <h3 className="text-2xl font-serif font-bold">{value.title}</h3>
            <p className="text-muted leading-relaxed">{value.description}</p>
          </motion.div>
        ))}
      </div>

      {/* Team Section */}
      <div className="space-y-12">
        <div className="space-y-4">
          <h2 className="text-3xl md:text-5xl font-serif font-bold tracking-tight">Teamet bakom</h2>
          <p className="text-muted max-w-2xl">Vi är ett team av passionerade investerare, analytiker och utvecklare som jobbar för att ge dig de bästa förutsättningarna på börsen.</p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3].map((i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="group"
            >
              <div className="aspect-[4/5] bg-section rounded-3xl overflow-hidden mb-6 relative">
                <img 
                  src={`https://picsum.photos/seed/person${i}/800/1000`} 
                  alt="Team member" 
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-8">
                  <div className="flex gap-4">
                    <a href="#" className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-white hover:text-black transition-all">
                      <Twitter size={18} />
                    </a>
                    <a href="#" className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-white hover:text-black transition-all">
                      <Linkedin size={18} />
                    </a>
                  </div>
                </div>
              </div>
              <h4 className="text-xl font-serif font-bold">Carl Fredrik Thor</h4>
              <p className="text-sm text-muted uppercase tracking-widest font-mono mt-1">Grundare & Analytiker</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Contact Section */}
      <div className="bg-footer text-white rounded-[3rem] p-12 md:p-24 text-center space-y-8">
        <h2 className="text-4xl md:text-6xl font-serif font-bold tracking-tight">Vill du komma i kontakt?</h2>
        <p className="text-white/60 max-w-xl mx-auto text-lg">Vi älskar att prata investeringar och feedback. Tveka inte att höra av dig om du har frågor eller funderingar.</p>
        <div className="flex flex-wrap justify-center gap-6 pt-4">
          <a href="mailto:carl@borsanalys.se" className="inline-flex items-center gap-3 px-8 py-4 bg-white text-black rounded-full font-bold hover:bg-primary hover:text-white transition-all">
            <Mail size={20} /> carl@borsanalys.se
          </a>
        </div>
      </div>
    </div>
  );
}
