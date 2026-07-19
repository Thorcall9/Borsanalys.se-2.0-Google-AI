import React from "react";
import { Link } from "react-router-dom";
import SEO from "../components/SEO";

export default function NotFound() {
  return (
    <main className="min-h-[60vh] px-6 py-32">
      <SEO title="Sidan hittades inte" noindex />
      <div className="mx-auto max-w-2xl space-y-6 text-center">
        <p className="text-xs font-black uppercase tracking-[0.35em] text-primary">404</p>
        <h1 className="text-5xl font-black tracking-tight">Sidan hittades inte</h1>
        <p className="text-lg text-muted-foreground">Adressen finns inte eller har flyttats.</p>
        <Link className="inline-flex rounded-full bg-primary px-6 py-3 text-sm font-black text-primary-foreground" to="/">
          Till startsidan
        </Link>
      </div>
    </main>
  );
}
