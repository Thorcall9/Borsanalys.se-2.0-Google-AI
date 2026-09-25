import React from "react";
import { useLocation } from "react-router-dom";
import Header from "./Header";
import { LoginModal } from "../LoginModal";

const Footer = React.lazy(() => import("./Footer"));

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const isHuskapital = useLocation().pathname === "/huskapital";
  return (
    <div className="flex flex-col min-h-screen">
      {!isHuskapital && <Header />}
      <main className="flex-grow">{children}</main>
      {!isHuskapital && <React.Suspense fallback={<div className="h-40" />}><Footer /></React.Suspense>}
      <LoginModal />
    </div>
  );
}
