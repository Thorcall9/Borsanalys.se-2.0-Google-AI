import { useState } from "react";

type CompanyVisualProps = {
  ticker: string;
  className?: string;
};

type CompanyIdentity = {
  domain: string;
  name: string;
};

// One canonical mapping keeps logo lookup independent from individual cards.
// The Brandfetch client ID is intentionally public: their Logo API is designed
// to be embedded directly in browser image URLs.
const BRANDFETCH_CLIENT_ID = "1id2fK9pYaZ-DVYYgNa";

const companyByTicker: Record<string, CompanyIdentity> = {
  "AAPL": { domain: "apple.com", name: "Apple" },
  "ABB.ST": { domain: "abb.com", name: "ABB" },
  "AQ": { domain: "aqg.se", name: "AQ Group" },
  "AXFO": { domain: "axfood.se", name: "Axfood" },
  "ERIC B": { domain: "ericsson.com", name: "Ericsson" },
  "ERIC-B.ST": { domain: "ericsson.com", name: "Ericsson" },
  "EVO.ST": { domain: "evolution.com", name: "Evolution" },
  "GOOG": { domain: "google.com", name: "Alphabet" },
  "GOOGL": { domain: "google.com", name: "Alphabet" },
  "INVE-B.ST": { domain: "investorab.com", name: "Investor" },
  "INWI": { domain: "inwido.com", name: "Inwido" },
  "META": { domain: "meta.com", name: "Meta" },
  "MSFT": { domain: "microsoft.com", name: "Microsoft" },
  "NDA SE": { domain: "nordea.com", name: "Nordea" },
  "NIBE B": { domain: "nibe.com", name: "Nibe" },
  "NOVO-B.CO": { domain: "novonordisk.com", name: "Novo Nordisk" },
  "NVDA": { domain: "nvidia.com", name: "NVIDIA" },
  "NWG B": { domain: "newwavegroup.com", name: "New Wave Group" },
  "PLEJD": { domain: "plejd.com", name: "Plejd" },
  "RVRC": { domain: "revolutionrace.com", name: "RevolutionRace" },
  "SAAB B": { domain: "saab.com", name: "Saab" },
  "SBB-B.ST": { domain: "sbbnorden.se", name: "SBB" },
  "SHB A": { domain: "handelsbanken.com", name: "Handelsbanken" },
  "SWED A": { domain: "swedbank.com", name: "Swedbank" },
  "VOLV-B.ST": { domain: "volvogroup.com", name: "Volvo" },
};

function logoUrl(domain: string) {
  return `https://cdn.brandfetch.io/domain/${domain}/icon.png?c=${BRANDFETCH_CLIENT_ID}`;
}

/** Official company logo from Brandfetch with a neutral local fallback. */
export default function CompanyVisual({ ticker, className = "" }: CompanyVisualProps) {
  const [hasFailed, setHasFailed] = useState(false);
  const normalizedTicker = ticker.trim().toUpperCase();
  const company = companyByTicker[normalizedTicker];

  if (!company || hasFailed) {
    return <span className={`company-visual company-visual--fallback ${className}`} aria-label={ticker}>{normalizedTicker.toLowerCase()}</span>;
  }

  return (
    <span className={`company-visual company-visual--logo ${className}`}>
      <img src={logoUrl(company.domain)} alt={`${company.name} logotyp`} onError={() => setHasFailed(true)} />
    </span>
  );
}
