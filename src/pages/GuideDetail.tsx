import React from "react";
import { useParams, Link, Navigate, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Clock, BookOpen, Share2, Bookmark, ChevronRight } from "lucide-react";
import { guides } from "../data/guides";

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
  const nextGuide = guideList[(currentIndex + 1) % guideList.length];
  const nextSlug = nextGuide.slug;

  const relatedGuides = guideList
    .filter(g => g.category === guide.category && g.slug !== guide.slug)
    .slice(0, 2);

  return (
    <div className="max-w-4xl mx-auto px-6 py-12 space-y-12">
      {/* Breadcrumbs */}
      <div className="flex items-center gap-2 text-[10px] font-mono text-gray-400 uppercase tracking-widest">
        <Link to="/" className="hover:text-primary transition-colors">Hem</Link>
        <ChevronRight size={10} />
        <Link to="/guider" className="hover:text-primary transition-colors">Guider</Link>
        <ChevronRight size={10} />
        <span className="text-gray-600">{guide.category}</span>
      </div>

      {/* Header */}
      <header className="space-y-8">
        <Link to="/guider" className="inline-flex items-center gap-2 text-sm font-bold text-muted hover:text-primary transition-colors">
          <ArrowLeft size={16} /> Tillbaka till guider
        </Link>
        
        <div className="space-y-4">
          <div className="flex items-center gap-4 text-[11px] font-mono uppercase tracking-widest text-primary font-bold">
            <span>Del {guide.part}</span>
            <span className="w-1 h-1 rounded-full bg-border" />
            <span>{guide.category}</span>
            <span className="w-1 h-1 rounded-full bg-border" />
            <span className="flex items-center gap-1"><Clock size={12} /> {guide.readTime}</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-serif font-bold tracking-tight leading-tight">
            {guide.title}
          </h1>
          <p className="text-xl text-muted leading-relaxed font-light">
            {guide.excerpt}
          </p>
        </div>

        <div className="flex items-center justify-between py-6 border-y border-border/50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary/10 text-primary rounded-full flex items-center justify-center">
              <BookOpen size={20} />
            </div>
            <div>
              <div className="text-xs font-bold">Börsanalys.se Redaktionen</div>
              <div className="text-[10px] font-mono text-muted uppercase tracking-widest">Publicerad: 2025-03-20</div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button className="p-2 hover:bg-section-alt rounded-lg text-muted transition-colors">
              <Bookmark size={20} />
            </button>
            <button className="p-2 hover:bg-section-alt rounded-lg text-muted transition-colors">
              <Share2 size={20} />
            </button>
          </div>
        </div>
      </header>

      {/* Content */}
      <article 
        className="prose prose-lg max-w-none prose-headings:font-serif prose-headings:font-bold prose-p:text-muted prose-p:leading-relaxed prose-li:text-muted prose-strong:text-foreground prose-a:text-primary hover:prose-a:underline"
        onClick={handleContentClick}
      >
        <div dangerouslySetInnerHTML={{ __html: guide.content }} />
      </article>

      {/* Navigation Between Guides */}
      <div className="pt-12 border-t border-border space-y-12">
        {/* Next Guide */}
        <Link 
          to={`/guider/${nextSlug}`}
          className="group block p-8 bg-section-alt border border-border rounded-3xl hover:border-primary/30 transition-all"
        >
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-2">
              <div className="text-[10px] font-mono uppercase tracking-widest text-primary font-bold flex items-center gap-2">
                Läs nästa guide <ChevronRight size={12} />
              </div>
              <h3 className="text-2xl font-serif font-bold group-hover:text-primary transition-colors">
                {nextGuide.title}
              </h3>
              <p className="text-sm text-muted line-clamp-1">
                {nextGuide.excerpt}
              </p>
            </div>
            <div className="flex-shrink-0 w-12 h-12 bg-white border border-border rounded-full flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all">
              <ChevronRight size={24} />
            </div>
          </div>
        </Link>

        {/* Related Guides */}
        {relatedGuides.length > 0 && (
          <div className="space-y-6">
            <h4 className="text-sm font-mono uppercase tracking-widest text-muted">Fler guider inom {guide.category}</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {relatedGuides.map((related) => (
                <Link 
                  key={related.slug}
                  to={`/guider/${related.slug}`}
                  className="p-6 border border-border rounded-2xl hover:bg-section-alt transition-colors group"
                >
                  <div className="space-y-3">
                    <div className="text-[10px] font-mono uppercase tracking-widest text-muted">{related.readTime} läsning</div>
                    <h5 className="font-bold group-hover:text-primary transition-colors">{related.title}</h5>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Footer / Newsletter */}
      <footer className="mt-24 p-12 bg-section-alt border border-border rounded-3xl text-center space-y-8">
        <div className="space-y-4">
          <h3 className="text-3xl font-serif font-bold tracking-tight">Gillar du vad du läser?</h3>
          <p className="text-muted max-w-md mx-auto">
            Prenumerera på vårt nyhetsbrev för att få de senaste analyserna och guiderna direkt i din inkorg.
          </p>
        </div>
        <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto" onSubmit={(e) => e.preventDefault()}>
          <input 
            type="email" 
            placeholder="Din e-postadress" 
            className="flex-grow px-6 py-4 bg-white border border-border rounded-xl focus:outline-none focus:border-primary/50 transition-all"
          />
          <button className="bg-primary text-white px-8 py-4 rounded-xl font-bold hover:bg-primary-light transition-colors">
            Prenumerera
          </button>
        </form>
      </footer>
    </div>
  );
}
