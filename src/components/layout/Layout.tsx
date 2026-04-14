import React from "react";
import Header from "./Header";
import { LoginModal } from "../LoginModal";

const Footer = React.lazy(() => import("./Footer"));

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">{children}</main>
      <React.Suspense fallback={<div className="h-40" />}>
        <Footer />
      </React.Suspense>
      <LoginModal />
    </div>
  );
}
