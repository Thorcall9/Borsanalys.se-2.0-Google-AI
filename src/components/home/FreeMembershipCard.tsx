import React from "react";
import { Check, Gift, UserRound } from "lucide-react";

interface FreeMembershipCardProps {
  onSignup: () => void;
  compact?: boolean;
}

const benefits = ["Spara analyser", "Följ bolag", "Få rapportkommentarer", "Rösta fram nästa analys"];

export default function FreeMembershipCard({ onSignup, compact = false }: FreeMembershipCardProps) {
  const visibleBenefits = compact ? benefits.slice(0, 3) : benefits;

  return (
    <aside className={`membership-card${compact ? " membership-card-compact" : ""}`}>
      <div className="membership-card-heading">
        <span className="membership-icon"><Gift size={17} aria-hidden="true" /></span>
        <span>Gratis medlemskap</span>
      </div>
      <h2>{compact ? "Spara det som är viktigt." : "Få mer av Börsanalys.se"}</h2>
      <p className="membership-intro">
        {compact ? "Spara analyser, följ bolag och få mer relevant innehåll." : "Skapa ett gratis konto och bygg din egen analysbevakning."}
      </p>
      <ul className="membership-benefits">
        {visibleBenefits.map((benefit) => (
          <li key={benefit}><Check size={16} aria-hidden="true" />{benefit}</li>
        ))}
      </ul>
      <button type="button" className="primary-action membership-cta" onClick={onSignup}>
        <UserRound size={17} aria-hidden="true" />
        Skapa gratis konto
      </button>
      <p className="membership-footnote">Gratis. Ingen betalningsinformation krävs.</p>
    </aside>
  );
}
