import { useEffect, useState, type FormEvent } from 'react';
import { ArrowLeft, ArrowRight, BarChart3, Check, Home, LockKeyhole, TrendingUp, UserRound } from 'lucide-react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import { SavingsGoalDashboard } from '../components/house/SavingsGoalDashboard';
import { useAuth } from '../contexts/AuthContext';
import { emptyHouseholdMonth, householdTotals, monthLabel, settlementDate, type HouseholdMonth, type MoneyField } from '../lib/householdMonth';
import { listHouseholdMonths, saveHouseholdMonth } from '../services/householdMonthService';

const money = new Intl.NumberFormat('sv-SE', { style: 'currency', currency: 'SEK', maximumFractionDigits: 0 });
const fields: { heading: string; description: string; fields: { key: MoneyField; label: string }[] }[] = [
  { heading: 'Pengar in', description: 'Det som kom in månaden före ska täcka den här månadens kostnader.', fields: [
    { key: 'calleSalary', label: 'Calles lön' }, { key: 'idaSalary', label: 'Idas lön' },
    { key: 'benefit', label: 'Försäkringskassan' }, { key: 'childAllowance', label: 'Barnbidrag totalt' },
  ] },
  { heading: 'Investeringar', description: 'Barnens sparande, pensioner och aktier syns direkt.', fields: [
    { key: 'childrenInvested', label: 'Till barnen' }, { key: 'callePension', label: 'Calles pension' },
    { key: 'idaPension', label: 'Idas pension' }, { key: 'otherInvested', label: 'Övriga aktier och fonder' },
  ] },
];

function currentPeriod() {
  const parts = new Intl.DateTimeFormat('en-CA', { timeZone: 'Europe/Stockholm', year: 'numeric', month: '2-digit', day: '2-digit' }).formatToParts(new Date());
  const value = (type: string) => Number(parts.find((part) => part.type === type)?.value ?? 0);
  const d = new Date(value('year'), value('month') - 1 + (value('day') >= 24 ? 1 : 0), 1);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
}

function MonthlySummary({ entry, onOpen }: { entry: HouseholdMonth; onOpen: () => void }) {
  const totals = householdTotals(entry);
  return <article className="rounded-[1.6rem] border border-[#e0e3d8] bg-white p-5 shadow-sm sm:p-7">
    <div className="flex flex-wrap items-start justify-between gap-3">
      <div><p className="text-xs font-bold uppercase tracking-[0.18em] text-[#687b6f]">Hushållets månad</p><h3 className="mt-2 font-serif text-2xl capitalize text-[#153d2d]">{monthLabel(entry.month)}</h3></div>
      <span className={`rounded-full px-3 py-1.5 text-xs font-semibold ${totals.complete ? 'bg-[#e6f0e6] text-[#265f3d]' : 'bg-[#f5ede0] text-[#875b27]'}`}>{totals.complete ? 'Avstämd' : 'Pågår · avstämning 24:e'}</span>
    </div>
    <div className="mt-6 grid gap-5 sm:grid-cols-2">
      <div><p className="text-sm text-[#687b6f]">Inkomster</p><p className="mt-1 font-serif text-3xl">{money.format(totals.income)}</p></div>
      <div><p className="text-sm text-[#687b6f]">{totals.complete ? 'Sparat totalt' : 'Investerat hittills'}</p><p className="mt-1 font-serif text-3xl">{money.format(totals.saved)}</p>{totals.income > 0 && <p className="mt-1 text-xs text-[#687b6f]">{totals.complete ? 'Sparkvot' : 'Preliminär andel'} {totals.rate} %</p>}</div>
    </div>
    <div className="mt-7 space-y-5 border-t border-[#e7e9e1] pt-6">
      {([{ label: 'Sparande', amount: totals.liquid, color: 'bg-[#2c7455]' }, { label: 'Investeringar', amount: totals.invested, color: 'bg-[#b47d4a]' }]).map(({ label, amount, color }) => {
        const ratio = totals.income ? Math.min(100, Math.round(amount / totals.income * 100)) : 0;
        return <div key={label}><div className="flex items-baseline justify-between gap-2"><span className="text-sm font-medium">{label}</span><strong className="font-serif text-xl">{money.format(amount)}</strong></div><div role="progressbar" aria-label={label} aria-valuenow={ratio} aria-valuemin={0} aria-valuemax={100} className="mt-2 h-3 overflow-hidden rounded-full bg-[#e7e9e1]"><div className={`h-full rounded-full ${color}`} style={{ width: `${ratio}%` }} /></div><p className="mt-1 text-right text-xs text-[#687b6f]">{totals.income ? `${ratio} % av inkomsterna` : 'Ange inkomster för procent'}</p></div>;
      })}
    </div>
    <p className="mt-6 text-sm leading-relaxed text-[#64776b]">{totals.complete ? 'Månaden är avstämd. Du kan fortfarande korrigera siffrorna.' : 'Investeringarna syns redan nu. Fyll i sparandet efter avstämningen den 24:e.'}</p>
    <button type="button" onClick={onOpen} className="mt-5 inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-[#1b6043] hover:underline">Visa och ändra <ArrowRight size={17} /></button>
  </article>;
}

function MonthEditor({ uid, month, records, onSaved }: { uid: string; month: string; records: HouseholdMonth[]; onSaved: (entry: HouseholdMonth) => void }) {
  const [draft, setDraft] = useState<HouseholdMonth>(() => records.find((r) => r.month === month) ?? emptyHouseholdMonth(month));
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  useEffect(() => { setDraft(records.find((r) => r.month === month) ?? emptyHouseholdMonth(month)); setMessage(''); setError(''); }, [month, records]);
  const setAmount = (key: MoneyField, text: string) => setDraft((old) => ({ ...old, [key]: text === '' && key === 'liquidSavings' ? null : Number(text) }));
  const input = (key: MoneyField, label: string) => <label key={key} className="block"><span className="mb-2 block text-sm font-medium text-[#344e40]">{label}</span><span className="flex items-center overflow-hidden rounded-xl border border-[#d6decf] bg-white focus-within:border-[#356a4b] focus-within:ring-2 focus-within:ring-[#356a4b]/15"><input type="number" min="0" max="100000000" step="1" inputMode="numeric" value={draft[key] ?? ''} placeholder="0" onChange={(e) => setAmount(key, e.target.value)} className="w-full min-w-0 px-4 py-3 text-base font-semibold text-[#153d2d] outline-none" /><span className="pr-4 text-sm text-[#627468]">kr</span></span></label>;
  const submit = async (event: FormEvent) => {
    event.preventDefault(); setSaving(true); setError(''); setMessage('');
    try { await saveHouseholdMonth(uid, draft); onSaved(draft); setMessage('Månaden sparades på ditt konto.'); }
    catch (failure) { setError(failure instanceof Error ? failure.message : 'Kunde inte spara.'); }
    finally { setSaving(false); }
  };
  return <form onSubmit={(e) => void submit(e)} className="space-y-5">
    {fields.map((group) => <section key={group.heading} className="rounded-[1.6rem] border border-[#e0e3d8] bg-white p-5 sm:p-7"><h3 className="font-serif text-2xl">{group.heading}</h3><p className="mt-1 text-sm text-[#687b6f]">{group.description}</p><div className="mt-6 grid gap-5 sm:grid-cols-2">{group.fields.map(({ key, label }) => input(key, label))}</div></section>)}
    <section className="rounded-[1.6rem] border border-[#e0e3d8] bg-white p-5 sm:p-7"><h3 className="font-serif text-2xl">Sparande efter kostnader</h3><p className="mt-2 text-sm leading-relaxed text-[#687b6f]">Fyll i det som finns kvar efter räkningar och övriga kostnader. Lämna tomt tills ni stämt av månaden den 24:e.</p><div className="mt-6 max-w-sm">{input('liquidSavings', 'Kvar att spara')}</div><p className="mt-2 text-xs text-[#687b6f]">Tomt betyder pågår. 0 kr betyder avstämd utan sparande.</p></section>
    {error && <p role="alert" className="rounded-xl bg-red-50 p-4 text-sm text-red-800">{error}</p>}
    {message && <p role="status" className="flex items-center gap-2 text-sm text-[#286347]"><Check size={17} /> {message}</p>}
    <button type="submit" disabled={saving} className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#173e2e] px-6 py-3 text-sm font-semibold text-white hover:bg-[#286347] disabled:opacity-50 sm:w-auto"><Check size={17} /> {saving ? 'Sparar…' : 'Spara månaden'}</button>
  </form>;
}

export default function Huskapital() {
  const { user, loading, openLoginModal } = useAuth();
  const [view, setView] = useState<'overview' | 'month'>('overview');
  const [month, setMonth] = useState(currentPeriod);
  const [records, setRecords] = useState<HouseholdMonth[]>([]);
  const [loadError, setLoadError] = useState('');
  useEffect(() => {
    if (!user) return;
    let active = true;
    void listHouseholdMonths(user.uid).then((entries) => { if (active) { setRecords(entries); setLoadError(''); } }).catch(() => { if (active) setLoadError('Månaderna kunde inte hämtas. Försök ladda om sidan.'); });
    return () => { active = false; };
  }, [user]);
  const chosen = records.find((record) => record.month === month) ?? emptyHouseholdMonth(month);
  const today = records.find((record) => record.month === currentPeriod()) ?? emptyHouseholdMonth(currentPeriod());
  const onSaved = (entry: HouseholdMonth) => setRecords((old) => [entry, ...old.filter((r) => r.month !== entry.month)].sort((a, b) => b.month.localeCompare(a.month)));
  const navigate = (target: 'overview' | 'month') => { setView(target); window.scrollTo({ top: 0, behavior: 'smooth' }); };
  return <>
    <SEO title="Huskapital" noIndex />
    {loading ? <div className="flex min-h-screen items-center justify-center bg-[#f6f5f0]">Öppnar Huskapital…</div> : !user ? <div className="flex min-h-screen items-center justify-center bg-[#f6f5f0] p-6"><div className="max-w-md rounded-3xl border border-[#e0e3d8] bg-white p-8 text-center shadow-sm"><LockKeyhole className="mx-auto text-[#286347]" size={30} /><h1 className="mt-4 font-serif text-3xl">Er ekonomi, på ett ställe</h1><p className="mt-3 text-sm text-[#64776b]">Logga in för att se bostadsmålet och ert månadssparande.</p><button type="button" onClick={openLoginModal} className="mt-6 rounded-xl bg-[#173e2e] px-6 py-3 text-sm font-semibold text-white">Logga in</button><Link to="/" className="mt-5 block text-sm text-[#286347]">Tillbaka till Börsanalys</Link></div></div> :
      <div className="min-h-screen bg-[#f6f5f0] text-[#153d2d] lg:grid lg:grid-cols-[226px_minmax(0,1fr)]">
        <aside className="hidden bg-[#123d2c] px-4 py-6 lg:sticky lg:top-0 lg:flex lg:h-screen lg:flex-col" aria-label="Huskapital navigation">
          <Link to="/" className="flex items-center gap-3 px-3 text-[#f5f3e9]"><Home size={20} className="text-[#d9b58a]" /><span className="font-serif text-xl font-semibold">Huskapital<span className="mt-0.5 block font-sans text-[10px] font-normal tracking-wide text-[#b2cdb8]">Vår väg hem</span></span></Link>
          <div className="mt-12 flex flex-col gap-2">{([{ id: 'overview', label: 'Översikt', Icon: Home }, { id: 'month', label: 'Månaden', Icon: BarChart3 }] as const).map(({ id, label, Icon }) => <button key={id} type="button" onClick={() => navigate(id)} aria-current={view === id ? 'page' : undefined} className={`flex min-h-11 items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold ${view === id ? 'bg-[#92b18d] text-[#102f23]' : 'text-[#d5e5d8] hover:bg-white/10'}`}><Icon size={18} /> {label}</button>)}</div>
          <div className="mt-auto space-y-2 border-t border-white/15 pt-4"><Link to="/profil" className="flex min-h-11 items-center gap-3 rounded-xl px-4 text-sm text-[#d5e5d8]"><UserRound size={18} /> Min profil</Link><Link to="/" className="flex min-h-11 items-center gap-3 rounded-xl px-4 text-sm text-[#d5e5d8]"><ArrowLeft size={18} /> Börsanalys</Link></div>
        </aside>
        <div className="min-w-0 pb-24 lg:pb-0">
          <header className="border-b border-[#e2e6dc] bg-[#fbfaf6] px-5 py-5 sm:px-8 lg:px-12"><div className="mx-auto flex max-w-6xl items-center justify-between gap-4"><Link to="/" className="flex items-center gap-2 font-serif text-xl font-semibold lg:hidden"><Home size={18} /> Huskapital</Link><span className="hidden text-xs font-bold uppercase tracking-[0.2em] text-[#687b6f] lg:block">Er gemensamma plan</span><Link to="/profil" className="flex h-10 w-10 items-center justify-center rounded-full border border-[#dbe2d6] bg-white text-[#286347]" aria-label="Min profil"><UserRound size={19} /></Link></div></header>
          <main className="mx-auto max-w-6xl space-y-7 px-4 py-7 sm:px-8 sm:py-10 lg:px-12">
            <div><p className="text-xs font-bold uppercase tracking-[0.2em] text-[#a36f43]">{view === 'overview' ? 'Er gemensamma plan' : 'Hushållets ekonomi'}</p><h1 className="mt-2 font-serif text-3xl leading-tight tracking-tight sm:text-5xl">{view === 'overview' ? `God morgon${user.displayName ? `, ${user.displayName.split(' ')[0]}` : ''}.` : 'Varje månad räknas.'}</h1><p className="mt-2 text-sm text-[#687b6f]">{view === 'overview' ? 'Ni bygger något fint tillsammans.' : 'Se vad som kommer in, investeras och blir kvar.'}</p></div>
            {loadError && <p role="alert" className="rounded-xl bg-red-50 p-4 text-sm text-red-800">{loadError}</p>}
            {view === 'overview' ? <><SavingsGoalDashboard uid={user.uid} /><div className="grid gap-5 lg:grid-cols-[1.3fr_0.7fr]"><MonthlySummary entry={today} onOpen={() => { setMonth(currentPeriod()); navigate('month'); }} /><aside className="flex flex-col justify-between rounded-[1.6rem] bg-[#e9ecdf] p-6 sm:p-7"><div><TrendingUp size={22} className="text-[#976531]" /><h3 className="mt-4 font-serif text-2xl">Gör plats för nästa insättning.</h3><p className="mt-3 text-sm leading-relaxed text-[#566b5d]">Aktier, fonder och pension växer vid sidan av ert övriga sparande. Se vad ni redan har satt i rörelse.</p></div><button type="button" onClick={() => { setMonth(currentPeriod()); navigate('month'); }} className="mt-7 inline-flex min-h-11 items-center gap-2 font-semibold text-[#1b6043]">Öppna månaden <ArrowRight size={17} /></button></aside></div></> :
              <><div className="flex flex-wrap items-center justify-between gap-4 rounded-[1.6rem] border border-[#e0e3d8] bg-white p-5 sm:p-6"><div><label htmlFor="household-month" className="block text-xs font-bold uppercase tracking-[0.15em] text-[#687b6f]">Månad att följa</label><input id="household-month" type="month" value={month} onChange={(e) => { if (/^\d{4}-(0[1-9]|1[0-2])$/.test(e.target.value)) setMonth(e.target.value); }} className="mt-2 rounded-lg border border-[#d6decf] bg-white px-3 py-2.5 text-base font-semibold" /></div><p className="max-w-sm text-sm leading-relaxed text-[#687b6f]">Pengarna från månaden före används här. Stäm av sparandet omkring {settlementDate(month).toLocaleDateString('sv-SE', { day: 'numeric', month: 'long' })}.</p></div><MonthlySummary entry={chosen} onOpen={() => document.getElementById('edit-household-month')?.scrollIntoView({ behavior: 'smooth' })} /><section id="edit-household-month" className="scroll-mt-6 space-y-5"><h2 className="font-serif text-2xl capitalize">Fyll i {monthLabel(month)}</h2><MonthEditor uid={user.uid} month={month} records={records} onSaved={onSaved} /></section><p className="rounded-2xl bg-[#e9ecdf] p-5 text-sm leading-relaxed text-[#566b5d]">Insättningarna redovisas separat från huskapitalets saldo. Uppdatera huskapitalet efter att ni kontrollerat det faktiska saldot, så undviker ni dubbelräkning.</p></>}
          </main>
        </div>
        <nav aria-label="Mobil navigation" className="fixed inset-x-0 bottom-0 z-40 flex border-t border-[#d8e0d3] bg-[#fbfaf6]/95 px-4 pb-[max(env(safe-area-inset-bottom),8px)] pt-2 backdrop-blur lg:hidden"><button type="button" onClick={() => navigate('overview')} aria-current={view === 'overview' ? 'page' : undefined} className={`flex min-h-14 flex-1 flex-col items-center justify-center gap-1 rounded-xl text-xs font-semibold ${view === 'overview' ? 'text-[#1b6043]' : 'text-[#687b6f]'}`}><Home size={20} /> Översikt</button><button type="button" onClick={() => navigate('month')} aria-current={view === 'month' ? 'page' : undefined} className={`flex min-h-14 flex-1 flex-col items-center justify-center gap-1 rounded-xl text-xs font-semibold ${view === 'month' ? 'text-[#1b6043]' : 'text-[#687b6f]'}`}><BarChart3 size={20} /> Månaden</button><Link to="/profil" className="flex min-h-14 flex-1 flex-col items-center justify-center gap-1 rounded-xl text-xs font-semibold text-[#687b6f]"><UserRound size={20} /> Profil</Link></nav>
      </div>}
  </>;
}
