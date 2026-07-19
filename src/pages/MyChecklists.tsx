import React from "react";
import SEO from "../components/SEO";
import SavedChecklists from "../components/community/SavedChecklists";

export default function MyChecklists() {
  return <><SEO title="Mina checklistor" noindex nofollow /><main className="mx-auto max-w-4xl px-4 pb-24 pt-10 md:px-8 md:pt-16"><SavedChecklists /></main></>;
}
