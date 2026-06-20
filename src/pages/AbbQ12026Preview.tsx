import React from "react";
import { Navigate } from "react-router-dom";
import ABBDeepDive from "../components/analysis/ABBDeepDive";
import { abb2026 } from "../data/analyses/abb/abb-q1-2026";

function PreviewGuard({ children }: { children: React.ReactNode }) {
  const host = window.location.hostname;
  const isLocal = host === "localhost" || host === "127.0.0.1" || host === "::1";
  return isLocal ? <>{children}</> : <Navigate to="/analys" replace />;
}

export default function AbbQ12026Preview() {
  return (
    <PreviewGuard>
      <ABBDeepDive data={abb2026} />
    </PreviewGuard>
  );
}
