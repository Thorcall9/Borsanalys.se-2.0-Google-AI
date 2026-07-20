import { motion } from "framer-motion";
import {
  AlertTriangle,
  BarChart3,
  Building2,
  Scale,
  ShieldCheck,
  Store,
  TrendingUp,
  type LucideIcon,
} from "lucide-react";
import { METHODOLOGY_STEPS } from "./Methodology/data";

const iconByStepId: Record<string, LucideIcon> = {
  I: Building2,
  II: Store,
  III: ShieldCheck,
  IV: BarChart3,
  V: Scale,
  VI: TrendingUp,
  VII: AlertTriangle,
};

export default function MethodologySection() {
  return (
    <section aria-labelledby="methodology-title" className="homepage-section bg-section-alt">
      <div className="homepage-container">
        <header className="mx-auto max-w-2xl text-center">
          <p className="section-kicker">Vår metod</p>
          <h2 id="methodology-title" className="text-3xl font-bold tracking-tight md:text-4xl">
            Så analyserar vi ett bolag
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground md:text-lg">
            Varje bolag bedöms utifrån samma sju områden för att göra analyserna
            konsekventa, jämförbara och enkla att förstå.
          </p>
        </header>
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {METHODOLOGY_STEPS.slice(0, 7).map((step) => {
            const Icon = iconByStepId[step.id];

            return (
              <motion.article
                key={step.id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35 }}
                viewport={{ once: true }}
                className="surface-card surface-card-hover p-6"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <Icon aria-hidden="true" className="h-5 w-5" />
                </div>
                <h3 className="mt-5 text-lg font-bold tracking-tight">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{step.summary}</p>
                <span className="mt-5 block text-xs font-semibold text-primary">Ingår i varje analys</span>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
