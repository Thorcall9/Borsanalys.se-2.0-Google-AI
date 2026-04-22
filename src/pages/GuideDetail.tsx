import React from "react";
import { useParams, Link, Navigate, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Clock, BookOpen, Share2, Bookmark, ChevronRight } from "lucide-react";
import { guides } from "../data/guides";

import SEO from "../components/SEO";
import AnalysisDisclaimer from "../components/analysis/AnalysisDisclaimer";
import MobileReadingProgress from "../components/MobileReadingProgress";
import { Helmet } from "react-helmet-async";
import SparaInvesteraGuide from "../components/guides/SparaInvesteraGuide";

const GUIDE_COMPONENTS = {
  SparaInvesteraGuide: SparaInvesteraGuide
};


export default function GuideDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const guide = slug ? guides[slug] : null;

  const handleContentClick = (e: React.MouseEvent<HTMLElement>) => {
    const target = e.target as HTMLElement;
    const anchor = target.closest("a");
    
    if (anchor && anchor.getAttribute("href")?.startsWith("/guider/")) {
      e.preventDefault();
      const href = anchor.getAttribute("href");
      if (href) {
        navigate(href);
      }
    }
  };

  if (!guide) {
    return <Navigate to="/guider" replace />;
  }

  const guideList = Object.values(guides).sort((a, b) => a.part - b.part);
  const currentIndex = guideList.findIndex(g => g.slug === slug);
  const nextGuide = currentIndex !== -1 && currentIndex < guideList.length - 1 ? guideList[currentIndex + 1] : undefined;
  const nextSlug = nextGuide?.slug;

  const relatedGuides = guideList
    .filter(g => g.category === guide.category && g.slug !== guide.slug)
    .slice(0, 2);

  return (
    <div className="max-w-4xl mx-auto px-6 py-24 space-y-16">
      <SEO 
        title={guide.seoTitle || guide.title}
        description={guide.metaDescription || guide.excerpt}
      />
      
      {guide.faqSchema && (
        <Helmet>
          <script type="application/ld+json">
            {JSON.stringify(guide.faqSchema)}
          </script>
        </Helmet>
      )}
      {/* Breadcrumbs */}
      <div className="flex items-center gap-3 text-[10px] font-black text-muted-foreground/40 uppercase tracking-[0.3em]">
        <Link to="/" className="hover:text-primary transition-colors">Hem</Link>
        <ChevronRight size={10} />
        <Link to="/guider" className="hover:text-primary transition-colors">Guider</Link>
        <ChevronRight size={10} />
        <span className="text-muted-foreground">{guide.category}</span>
      </div>

      {/* Header */}
      <header className="space-y-12">
        <Link to="/guider" className="inline-flex items-center gap-3 text-xs font-black uppercase tracking-widest text-muted-foreground hover:text-primary transition-all group">
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> Tillbaka till guider
        </Link>
        
        <div className="space-y-8">
          <div className="flex items-center gap-6 text-[11px] font-black uppercase tracking-[0.4em] text-primary">
            <span>Del {guide.part}</span>
            <span className="w-1.5 h-1.5 rounded-full bg-primary/20" />
            <span>{guide.category}</span>
            <span className="w-1.5 h-1.5 rounded-full bg-primary/20" />
            <span className="flex items-center gap-2"><Clock size={14} /> {guide.readTime}</span>
          </div>
          <h1 className="text-5xl md:text-8xl font-black tracking-tighter leading-[0.85]">
            {guide.title}
          </h1>
          <p className="text-2xl text-muted-foreground leading-relaxed font-medium max-w-3xl">
            {guide.excerpt}
          </p>
        </div>

        <div className="flex items-center justify-between py-10 border-y border-border/50">
          <div className="flex items-center gap-5">
            <div className="w-14 h-14 bg-primary/10 text-primary rounded-2xl flex items-center justify-center shadow-lg shadow-primary/5">
              <BookOpen size={24} />
            </div>
            <div className="space-y-1">
              <div className="text-sm font-black tracking-tight">Börsanalys.se Redaktionen</div>
              <div className="text-[10px] font-black text-muted-foreground/50 uppercase tracking-[0.2em]">Publicerad: {guide.publishedDate || "2025-03-20"}</div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button className="w-12 h-12 flex items-center justify-center hover:bg-muted rounded-2xl text-muted-foreground hover:text-foreground transition-all">
              <Bookmark size={22} />
            </button>
            <button className="w-12 h-12 flex items-center justify-center hover:bg-muted rounded-2xl text-muted-foreground hover:text-foreground transition-all">
              <Share2 size={22} />
            </button>
          </div>
        </div>
      </header>

      {/* Content */}
      {guide.component && GUIDE_COMPONENTS[guide.component as keyof typeof GUIDE_COMPONENTS] ? (
        <section className="relative">
          {React.createElement(GUIDE_COMPONENTS[guide.component as keyof typeof GUIDE_COMPONENTS])}
        </section>
      ) : (
        <article 
          className="prose prose-invert prose-2xl max-w-none prose-headings:font-black prose-headings:tracking-tighter prose-p:text-muted-foreground prose-p:leading-relaxed prose-p:font-medium prose-strong:text-foreground prose-strong:font-black prose-a:text-primary hover:prose-a:underline prose-img:rounded-[2.5rem] prose-hr:border-border/50"
          onClick={handleContentClick}
        >
          <div dangerouslySetInnerHTML={{ __html: guide.content }} />
        </article>
      )}

      <AnalysisDisclaimer />



      {/* Navigation Between Guides */}

      <div className="pt-24 border-t border-border space-y-16">
        {/* Next Guide */}
        {nextGuide && (
          <Link 
            to={`/guider/${nextSlug}`}
            className="group block p-12 bg-muted/30 border border-border rounded-[3rem] hover:border-primary/30 transition-all relative overflow-hidden shadow-xl shadow-black/5"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />
            
            <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-10">
              <div className="space-y-4 max-w-2xl">
                <div className="text-[10px] font-black uppercase tracking-[0.4em] text-primary flex items-center gap-3">
                  Läs nästa guide <ChevronRight size={14} />
                </div>
                <h3 className="text-4xl font-black tracking-tighter group-hover:text-primary transition-colors leading-tight">
                  {nextGuide.title}
                </h3>
                <p className="text-lg text-muted-foreground font-medium line-clamp-1">
                  {nextGuide.excerpt}
                </p>
              </div>
              <div className="flex-shrink-0 w-16 h-16 bg-card border border-border rounded-2xl flex items-center justify-center text-muted-foreground group-hover:bg-primary group-hover:text-primary-foreground group-hover:rotate-12 transition-all duration-500 shadow-xl">
                <ChevronRight size={32} />
              </div>
            </div>
          </Link>
        )}

        {/* Related Guides */}
        {relatedGuides.length > 0 && (
          <div className="space-y-8">
            <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-muted-foreground/50 px-4">Fler guider inom {guide.category}</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {relatedGuides.map((related) => (
                <Link 
                  key={related.slug}
                  to={`/guider/${related.slug}`}
                  className="p-10 border border-border rounded-[2.5rem] hover:bg-muted/30 transition-all group shadow-sm hover:shadow-xl hover:shadow-black/5"
                >
                  <div className="space-y-4">
                    <div className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground/50">{related.readTime} läsning</div>
                    <h5 className="text-2xl font-black tracking-tighter group-hover:text-primary transition-colors leading-tight">{related.title}</h5>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Footer / Newsletter */}
      <footer className="mt-32 p-16 md:p-24 bg-muted/30 border border-border rounded-[4rem] text-center space-y-12 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-[150px] -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-[150px] translate-y-1/2 -translate-x-1/2" />
        
        <div className="relative z-10 space-y-6">
          <h3 className="text-4xl md:text-6xl font-black tracking-tighter leading-tight">Gillar du vad du läser?</h3>
          <p className="text-xl text-muted-foreground max-w-xl mx-auto font-medium leading-relaxed">
            Prenumerera på vårt nyhetsbrev för att få de senaste analyserna och guiderna direkt i din inkorg.
          </p>
        </div>
        <form className="relative z-10 flex flex-col sm:flex-row gap-4 max-w-xl mx-auto" onSubmit={(e) => e.preventDefault()}>
          <input 
            type="email" 
            placeholder="Din e-postadress" 
            className="flex-grow px-8 py-5 bg-card border border-border rounded-full focus:outline-none focus:border-primary/50 transition-all font-medium text-lg shadow-inner"
          />
          <button className="bg-primary text-primary-foreground px-12 py-5 rounded-full font-black uppercase tracking-widest text-sm hover:scale-105 transition-all shadow-xl shadow-primary/20">
            Prenumerera
          </button>
        </form>
      </footer>
      <MobileReadingProgress 
        label="guide" 
        nextTitle={nextGuide?.title} 
        nextHref={nextSlug ? `/guider/${nextSlug}` : undefined} 
      />
    </div>
  );
}
