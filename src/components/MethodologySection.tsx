import { motion } from "framer-motion";
import {
  CalendarDays,
  Eye,
  LineChart,
  Target,
  type LucideIcon,
} from "lucide-react";

const V11_HIGHLIGHTS: Array<{ icon: LucideIcon; title: string; description: string }> = [
  {
    icon: Eye,
    title: "Ett tydligt beslut",
    description: "Rekommendation, risknivå och värdering samlas i en kort översikt.",
  },
  {
    icon: LineChart,
    title: "Potential med förbehåll",
    description: "Ett sannolikhetsvägt värde ger kontext till uppsidan, utan att lova avkastning.",
  },
  {
    icon: Target,
    title: "Teser att följa",
    description: "Vi visar vad som behöver bekräftas, försvagas eller förändras över tid.",
  },
  {
    icon: CalendarDays,
    title: "Nästa bevis",
    description: "Varje analys lyfter fram vad nästa rapport behöver visa för att caset ska hålla.",
  },
];

export default function MethodologySection() {
  return (
    <section aria-labelledby="methodology-title" className="homepage-section bg-section-alt">
      <div className="homepage-container">
        <header className="mx-auto max-w-2xl text-center">
          <p className="section-kicker">V11.1</p>
          <h2 id="methodology-title" className="text-3xl font-bold tracking-tight md:text-4xl">
            Ett investeringscase som går att följa
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground md:text-lg">
            Analysen sammanfattar vad som talar för och emot caset, värdet vi ser och vilka
            bevis som avgör nästa steg.
          </p>
        </header>
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {V11_HIGHLIGHTS.map((highlight) => {
            const Icon = highlight.icon;

            return (
              <motion.article
                key={highlight.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35 }}
                viewport={{ once: true }}
                className="surface-card surface-card-hover group p-6"
              >
                <div className="methodology-icon flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <Icon aria-hidden="true" className="h-5 w-5" />
                </div>
                <h3 className="mt-5 text-lg font-bold tracking-tight">{highlight.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{highlight.description}</p>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
