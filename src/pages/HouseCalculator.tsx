import { HouseCalculator } from '../components/house/HouseCalculator';

export default function HouseCalculatorPage() {
  return <main className="bg-[#f7f5ef] py-12 sm:py-16">
    <div className="container mx-auto max-w-6xl px-4">
      <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#c96f45]">Huskapital</p>
      <h1 className="mt-3 font-serif text-4xl font-bold tracking-tight text-[#123f2d] sm:text-5xl">Din väg till nästa hem</h1>
      <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground">Planera nästa hem med ditt sparande – och, om du vill, en uppskattning av vad som kan bli kvar efter en försäljning. Ingen inloggning krävs och beräkningen sparas inte.</p>
      <div className="mt-9"><HouseCalculator /></div>
    </div>
  </main>;
}
