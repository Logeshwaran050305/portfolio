import React, { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Lenis from "lenis";
import {
  ArrowLeft,
  ExternalLink,
  Layers,
  CheckCircle2,
  Sparkles,
  Maximize2,
  X,
  ChevronDown,
  ChevronUp,
  Image as ImageIcon
} from "lucide-react";
import { formatImageUrl } from "../utils/imageUtils";

// Custom Github Icon
function GithubIcon({ size = 16, className = "" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  );
}

// =========================================================
// Skiper30 Multi-Column Parallax Scroll Component
// =========================================================
function ParallaxColumn({ images, y, onImageClick }) {
  if (!images || images.length === 0) return null;
  return (
    <motion.div
      className="skiper30-column"
      style={{ y }}
    >
      {images.map((src, i) => (
        <div
          key={i}
          className="skiper30-img-card"
          onClick={() => onImageClick && onImageClick(src)}
          title="Click to enlarge"
        >
          <img
            src={formatImageUrl(src, "/projects/project-1/img1.jpg")}
            alt="Project Screenshot"
            className="skiper30-img"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "/projects/project-1/img1.jpg";
            }}
          />
          <div className="skiper30-img-hover-overlay">
            <Maximize2 size={20} className="text-cyan-400" />
          </div>
        </div>
      ))}
    </motion.div>
  );
}

export function Skiper30Gallery({ project, onBack, userEmail }) {
  const galleryRef = useRef(null);
  const [dimension, setDimension] = useState({ width: 0, height: 0 });
  const [selectedImage, setSelectedImage] = useState(null);

  // Parallax Scroll Tracking with Framer Motion
  const { scrollYProgress } = useScroll({
    target: galleryRef,
    offset: ["start end", "end start"],
  });

  const { height } = dimension;
  const y1 = useTransform(scrollYProgress, [0, 1], [0, height * 0.34]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, height * 0.2]);
  const y3 = useTransform(scrollYProgress, [0, 1], [0, height * 0.4]);
  const y4 = useTransform(scrollYProgress, [0, 1], [0, height * 0.26]);

  // Smooth Lenis Scroll Integration
  useEffect(() => {
    window.scrollTo(0, 0);

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true
    });

    let animationFrameId;
    const raf = (time) => {
      lenis.raf(time);
      animationFrameId = requestAnimationFrame(raf);
    };

    const resize = () => {
      setDimension({ width: window.innerWidth, height: window.innerHeight });
    };

    window.addEventListener("resize", resize);
    animationFrameId = requestAnimationFrame(raf);
    resize();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationFrameId);
      lenis.destroy();
    };
  }, [project]);

  // Build full robust gallery list from project's gallery
  const rawList = Array.isArray(project.gallery) && project.gallery.length > 0
    ? project.gallery
    : [project.image || "/projects/project-1/img1.jpg"];

  const galleryImages = rawList.map((item) => formatImageUrl(item));

  // Dynamically distribute all images evenly across visible columns
  const isMobile = dimension.width <= 768 && dimension.width > 0;
  const isSmallPhone = dimension.width <= 480 && dimension.width > 0;

  let col1, col2, col3, col4;
  if (isSmallPhone) {
    col1 = galleryImages;
    col2 = [];
    col3 = [];
    col4 = [];
  } else if (isMobile) {
    col1 = galleryImages.filter((_, idx) => idx % 2 === 0);
    col2 = galleryImages.filter((_, idx) => idx % 2 === 1);
    col3 = [];
    col4 = [];
  } else {
    col1 = galleryImages.filter((_, idx) => idx % 4 === 0);
    col2 = galleryImages.filter((_, idx) => idx % 4 === 1);
    col3 = galleryImages.filter((_, idx) => idx % 4 === 2);
    col4 = galleryImages.filter((_, idx) => idx % 4 === 3);
  }


  return (
    <div className="skiper30-page-wrapper">
      {/* Lightbox Modal */}
      {selectedImage && (
        <div className="lightbox-overlay" onClick={() => setSelectedImage(null)}>
          <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
            <button className="lightbox-close-btn" onClick={() => setSelectedImage(null)}>
              <X size={24} />
            </button>
            <div className="lightbox-image-wrapper">
              <img
                src={formatImageUrl(selectedImage, "/projects/project-1/img1.jpg")}
                alt={project.title}
                className="lightbox-img"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "/projects/project-1/img1.jpg";
                }}
              />
            </div>
            <div className="lightbox-caption">
              <span className="project-badge">{project.badge}</span>
              <h3 style={{ fontSize: "1.1rem", color: "#ffffff", fontWeight: 700 }}>
                {project.title} — High-Res View
              </h3>
            </div>
          </div>
        </div>
      )}

      {/* Top Fixed Header */}
      <header className="skiper30-header">
        <div className="container-custom skiper30-header-inner">
          <button onClick={onBack} className="btn-secondary skiper30-back-btn">
            <ArrowLeft size={16} />
            <span>Back to Portfolio</span>
          </button>

          <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
            <span className="project-badge">{project.badge}</span>
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="chip-btn"
              title="View GitHub Repository"
            >
              <GithubIcon size={16} /> GitHub
            </a>
          </div>
        </div>
      </header>

      {/* Hero Intro Section */}
      <section className="skiper30-hero-banner">
        <div className="container-custom">
          <div className="skiper30-hero-content">
            <span className="section-tag">{project.category} Showcase</span>
            <h1 className="skiper30-main-title">{project.title}</h1>
            <p className="skiper30-lead-text">{project.description}</p>

            <div className="skiper30-tags-cluster">
              {project.tags?.map((tag, idx) => (
                <span key={idx} className="tag-pill" style={{ fontSize: "0.85rem", padding: "0.35rem 0.85rem" }}>
                  #{tag}
                </span>
              ))}
            </div>

            {/* Scroll Indicator Prompt */}
            <div className="skiper30-scroll-prompt">
              <ChevronDown size={20} className="animate-bounce text-cyan-400" />
              <span>Scroll down to experience the 3D Parallax Multi-Image Gallery</span>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          SKIPER30 MULTI-COLUMN PARALLAX GALLERY
          ========================================================= */}
      <section className="skiper30-parallax-section">
        <div className="skiper30-section-label-bar">
          <div className="container-custom" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <ImageIcon size={18} style={{ color: "#38bdf8" }} />
              <span style={{ fontWeight: 700, fontSize: "0.95rem", textTransform: "uppercase", letterSpacing: "0.05em", color: "#ffffff" }}>
                Multi-Layer Parallax Gallery (Powered by @skiper-ui/skiper30)
              </span>
            </div>
            <span style={{ fontSize: "0.85rem", color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}>
              Interactive Depth Motion • {rawList.length} Unique Images
            </span>
          </div>
        </div>

        <div ref={galleryRef} className="skiper30-gallery-container">
          <ParallaxColumn images={col1} y={y1} onImageClick={setSelectedImage} />
          <ParallaxColumn images={col2} y={y2} onImageClick={setSelectedImage} />
          <ParallaxColumn images={col3} y={y3} onImageClick={setSelectedImage} />
          <ParallaxColumn images={col4} y={y4} onImageClick={setSelectedImage} />
        </div>
      </section>

      {/* Project Deliverables & Architecture Breakdown */}
      <section className="section" style={{ background: "rgba(15, 23, 42, 0.6)" }}>
        <div className="container-custom">
          <div className="section-header">
            <span className="section-tag">Technical Architecture</span>
            <h2 className="section-title">Key Deliverables & Specifications</h2>
            <p className="section-subtitle">
              Comprehensive breakdown of system design, metrics, and business outcomes achieved.
            </p>
          </div>

          <div className="about-grid" style={{ marginBottom: "3rem" }}>
            {project.features?.map((feat, fIdx) => (
              <div key={fIdx} className="glass-card about-card">
                <div className="about-icon-box">
                  <CheckCircle2 size={24} style={{ color: "#38bdf8" }} />
                </div>
                <h3 style={{ fontSize: "1.15rem", fontWeight: 700 }}>Deliverable 0{fIdx + 1}</h3>
                <p style={{ color: "var(--text-secondary)", fontSize: "0.95rem", lineHeight: 1.6 }}>
                  {feat}
                </p>
              </div>
            ))}
          </div>

          {/* Action Card */}
          <div className="glass-card" style={{ padding: "3rem", textAlign: "center", maxWidth: "750px", margin: "0 auto", border: "1px solid rgba(99, 102, 241, 0.4)" }}>
            <h3 style={{ fontSize: "1.75rem", fontWeight: 800, marginBottom: "0.75rem" }}>
              Interested in implementing a similar architecture?
            </h3>
            <p style={{ color: "var(--text-secondary)", marginBottom: "2rem", fontSize: "1rem" }}>
              Let's collaborate to build data analytics dashboards, full-stack applications, or machine learning pipelines.
            </p>
            <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
              <a
                href={`mailto:${userEmail}?subject=Inquiry about ${encodeURIComponent(project.title)}`}
                className="btn-glow"
              >
                <ExternalLink size={18} /> Discuss Project Architecture
              </a>
              <button onClick={onBack} className="btn-secondary">
                <ArrowLeft size={18} /> Return to Main Portfolio
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container-custom" style={{ textAlign: "center", color: "var(--text-muted)", fontSize: "0.85rem" }}>
          <p>© {new Date().getFullYear()} Logeshwaran G. All rights reserved. Featuring Skiper UI Parallax Gallery.</p>
        </div>
      </footer>
    </div>
  );
}
