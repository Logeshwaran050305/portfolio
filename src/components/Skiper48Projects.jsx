import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  ExternalLink,
  Sparkles,
  Layers,
  Maximize2,
  X,
  Eye,
  Images,
  Image as ImageIcon
} from "lucide-react";
import { Autoplay, EffectCards, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { formatImageUrl } from "../utils/imageUtils";

import "swiper/css/effect-cards";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css";

// Custom Github Icon
function GithubIcon({ size = 16, className = "" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  );
}

export function Skiper48Projects({ projects, userEmail, onOpenProjectDetail }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [activeGalleryIndex, setActiveGalleryIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const swiperRef = useRef(null);

  const activeProject = projects[activeIndex] || projects[0];
  const galleryImages = Array.isArray(activeProject?.gallery) && activeProject.gallery.length > 0
    ? activeProject.gallery
    : [activeProject?.image || "/projects/project-1/img1.jpg"];

  const handleSelectThumbnail = (index) => {
    setActiveIndex(index);
    setActiveGalleryIndex(0);
    if (swiperRef.current && swiperRef.current.swiper) {
      swiperRef.current.swiper.slideTo(index);
    }
  };

  const nextLightboxImage = () => {
    setActiveIndex((prev) => (prev + 1) % projects.length);
  };

  const prevLightboxImage = () => {
    setActiveIndex((prev) => (prev - 1 + projects.length) % projects.length);
  };

  return (
    <div className="skiper48-projects-container">
      {/* =========================================================
          FULLSCREEN IMAGE LIGHTBOX MODAL
          ========================================================= */}
      <AnimatePresence>
        {lightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="lightbox-overlay"
            onClick={() => setLightboxOpen(false)}
          >
            <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
              <button
                className="lightbox-close-btn"
                onClick={() => setLightboxOpen(false)}
                aria-label="Close Lightbox"
              >
                <X size={24} />
              </button>

              <div className="lightbox-image-wrapper">
                <img
                  src={formatImageUrl(activeProject?.image, "/projects/project-1/img1.jpg")}
                  alt={activeProject?.title || "Project preview"}
                  className="lightbox-img"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "/projects/project-1/img1.jpg";
                  }}
                />
              </div>

              <div className="lightbox-caption">
                <div className="lightbox-meta">
                  <span className="project-badge">{activeProject?.badge}</span>
                  <h3 style={{ fontSize: "1.2rem", fontWeight: 700, color: "#ffffff" }}>
                    {activeProject?.title}
                  </h3>
                </div>
                <div className="lightbox-counter">
                  {activeIndex + 1} / {projects.length}
                </div>
              </div>

              {/* Lightbox Navigation Buttons */}
              <button
                className="lightbox-nav-btn lightbox-prev"
                onClick={prevLightboxImage}
                aria-label="Previous image"
              >
                <ChevronLeft size={28} />
              </button>
              <button
                className="lightbox-nav-btn lightbox-next"
                onClick={nextLightboxImage}
                aria-label="Next image"
              >
                <ChevronRight size={28} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* =========================================================
          MAIN LAYOUT: 3D CARD SWIPER + ACTIVE DETAILS & GALLERY
          ========================================================= */}
      <div className="skiper48-layout">
        {/* Left Side: 3D Stacked Card Swiper (Skiper 48 Effect) */}
        <div className="skiper48-swiper-column">
          <div className="skiper48-card-wrapper">
            <Swiper
              ref={swiperRef}
              effect="cards"
              grabCursor={true}
              rewind={true}
              touchStartPreventDefault={false}
              autoplay={{
                delay: 5000,
                disableOnInteraction: false,
                pauseOnMouseEnter: true
              }}
              pagination={{
                clickable: true,
                el: ".skiper48-pagination"
              }}
              navigation={{
                nextEl: ".skiper48-next-btn",
                prevEl: ".skiper48-prev-btn"
              }}
              onSlideChange={(swiper) => {
                setActiveIndex(swiper.activeIndex);
                setActiveGalleryIndex(0);
              }}
              modules={[EffectCards, Autoplay, Pagination, Navigation]}
              className="skiper48-swiper"
            >
              {projects.map((project, index) => (
                <SwiperSlide key={project.id || index} className="skiper48-slide">
                  <div className="skiper48-card-inner">
                    {/* Card Top Preview Image with Overlay */}
                    <div
                      className="skiper48-slide-img-box"
                      onClick={() => onOpenProjectDetail && onOpenProjectDetail(project)}
                      style={{ cursor: "pointer" }}
                      title="Click to open Full Parallax Gallery Page"
                    >
                      <img
                        src={formatImageUrl(project.image, "/projects/project-1/img1.jpg")}
                        alt={project.title}
                        className="skiper48-slide-img"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = "/projects/project-1/img1.jpg";
                        }}
                      />
                      <div className="skiper48-slide-img-gradient"></div>
                      <div className="skiper48-badge-row">
                        <span className="project-badge">{project.badge}</span>
                        <span className="skiper48-num">0{index + 1}</span>
                      </div>
                    </div>

                    {/* Card Content */}
                    <div className="skiper48-slide-content">
                      <h4 className="skiper48-card-headline">{project.title}</h4>
                      <p className="skiper48-slide-desc">{project.description}</p>

                      <div className="skiper48-pill-cloud">
                        {project.tags?.slice(0, 3).map((tag, tIdx) => (
                          <span key={tIdx} className="tag-pill">
                            #{tag}
                          </span>
                        ))}
                      </div>

                      <div className="skiper48-hint">
                        <Sparkles size={14} style={{ color: "#38bdf8" }} />
                        <span>Swipe card or click image ➔</span>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>

            {/* Custom Skiper48 Navigation Controls */}
            <div className="skiper48-controls">
              <button className="skiper48-nav-btn skiper48-prev-btn" aria-label="Previous project">
                <ChevronLeft size={20} />
              </button>

              <div className="skiper48-pagination"></div>

              <button className="skiper48-nav-btn skiper48-next-btn" aria-label="Next project">
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
        </div>

        {/* Right Side: Active Project Deep Dive & Interactive Image Gallery */}
        <div className="skiper48-detail-column">
          <AnimatePresence mode="wait">
            {activeProject && (
              <motion.div
                key={activeProject.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className="glass-card skiper48-detail-card"
              >
                {/* Header */}
                <div className="detail-header">
                  <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                    <span className="section-tag" style={{ margin: 0 }}>
                      {activeProject.category}
                    </span>
                  </div>
                  <div style={{ display: "flex", gap: "0.5rem" }}>
                    <a
                      href={activeProject.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="chip-btn"
                      title="View GitHub Repository"
                    >
                      <GithubIcon size={15} /> Code
                    </a>
                  </div>
                </div>

                {/* Title & Description */}
                <h3 className="detail-title">{activeProject.title}</h3>

                {/* =========================================================
                    FEATURED PROJECT IMAGE PREVIEW WITH PARALLAX OPEN TRIGGER
                    ========================================================= */}
                <div className="detail-gallery-showcase">
                  <div
                    className="gallery-main-image-wrap"
                    onClick={() => onOpenProjectDetail ? onOpenProjectDetail(activeProject) : setLightboxOpen(true)}
                    title="Click to open Full Parallax Gallery Page (@skiper-ui/skiper30)"
                  >
                    <img
                      src={formatImageUrl(galleryImages[activeGalleryIndex], "/projects/project-1/img1.jpg")}
                      alt={activeProject.title}
                      className="gallery-main-img"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "/projects/project-1/img1.jpg";
                      }}
                    />
                    <div className="gallery-img-overlay">
                      <div className="gallery-zoom-badge" style={{ background: "rgba(99, 102, 241, 0.85)", borderColor: "rgba(168, 85, 247, 0.5)", color: "#ffffff" }}>
                        <Images size={16} />
                        <span>Open Multi-Image Parallax Page ➔</span>
                      </div>
                    </div>
                  </div>

                  {/* Interactive Project Thumbnails Strip */}
                  <div className="gallery-thumbnail-strip">
                    <div className="gallery-strip-label">
                      <ImageIcon size={14} style={{ color: "#38bdf8" }} />
                      <span>Project Screenshots Gallery ({galleryImages.length})</span>
                    </div>

                    <div className="thumbnails-row">
                      {galleryImages.map((image, idx) => (
                        <button
                          key={`${image}-${idx}`}
                          onClick={() => setActiveGalleryIndex(idx)}
                          className={`thumbnail-card ${activeGalleryIndex === idx ? "active" : ""}`}
                          title={`View screenshot ${idx + 1}`}
                        >
                          <img
                            src={formatImageUrl(image, "/projects/project-1/img1.jpg")}
                            alt={`${activeProject.title} screenshot ${idx + 1}`}
                            className="thumb-img"
                            onError={(e) => {
                              e.target.onerror = null;
                              e.target.src = "/projects/project-1/img1.jpg";
                            }}
                          />
                          <div className="thumb-badge">Screenshot {idx + 1}</div>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <p className="detail-desc">{activeProject.description}</p>

                {/* Key Features */}
                {activeProject.features && activeProject.features.length > 0 && (
                  <div className="detail-features-block">
                    <h4 style={{ fontSize: "0.95rem", fontWeight: 700, color: "#f8fafc", marginBottom: "0.75rem", display: "flex", alignItems: "center", gap: "0.4rem" }}>
                      <Layers size={16} style={{ color: "#38bdf8" }} /> Key Highlights & Deliverables
                    </h4>
                    <ul className="detail-features-list">
                      {activeProject.features.map((feat, fIdx) => (
                        <li key={fIdx}>
                          <CheckCircle2 size={16} style={{ color: "#38bdf8", flexShrink: 0, marginTop: "2px" }} />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Tags */}
                {activeProject.tags && activeProject.tags.length > 0 && (
                  <div className="detail-tags-wrap">
                    {activeProject.tags.map((t, idx) => (
                      <span key={idx} className="tag-pill" style={{ color: "#a5b4fc", backgroundColor: "rgba(99, 102, 241, 0.12)" }}>
                        #{t}
                      </span>
                    ))}
                  </div>
                )}

                {/* Action Buttons */}
                <div className="detail-footer" style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
                  <button
                    onClick={() => onOpenProjectDetail && onOpenProjectDetail(activeProject)}
                    className="btn-glow"
                    style={{ flex: 1, padding: "0.75rem 1.25rem", fontSize: "0.9rem" }}
                  >
                    <Images size={16} /> Open Full Parallax Gallery (@skiper-ui/skiper30)
                  </button>

                  <a
                    href={`mailto:${userEmail}?subject=Discussion on ${encodeURIComponent(activeProject.title)}`}
                    className="btn-secondary"
                    style={{ padding: "0.75rem 1.25rem", fontSize: "0.9rem" }}
                  >
                    <ExternalLink size={16} /> Contact
                  </a>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
