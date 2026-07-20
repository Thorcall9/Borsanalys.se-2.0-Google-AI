import React from "react";
import { BarChart3, LockKeyhole, SearchCheck, ShieldCheck } from "lucide-react";

const trustSignals = [
  { title: "Oberoende analyser", description: "Utan påverkan från banker eller intressekonflikter.", icon: ShieldCheck },
  { title: "Datadrivna insikter", description: "Grundade i fakta, inte åsikter eller spekulation.", icon: BarChart3 },
  { title: "Beprövad metodik", description: "Samma ramverk i varje analys, varje gång.", icon: SearchCheck },
  { title: "Kvalitet och transparens", description: "Tydlig metod, öppna källor och ärliga bedömningar.", icon: LockKeyhole },
];

export default function TrustStrip() {
  return (
    <ul className="trust-strip" aria-label="Därför kan du lita på Börsanalys.se">
      {trustSignals.map(({ title, description, icon: Icon }) => (
        <li key={title} className="trust-item">
          <Icon className="trust-icon" aria-hidden="true" />
          <div>
            <h3>{title}</h3>
            <p>{description}</p>
          </div>
        </li>
      ))}
    </ul>
  );
}
