import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  Award,
  Sparkles,
  ExternalLink,
  Download,
  Maximize2,
  CheckCircle2,
  FileCheck
} from "lucide-react";
import {
  Autoplay,
  EffectCoverflow,
  Navigation,
  Pagination
} from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { formatImageUrl } from "../utils/imageUtils";

import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css";

export function Skiper49Certifications({ certifications, onSelectCert }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const swiperRef = useRef(null);

  const activeCert = certifications[activeIndex] || certifications[0];

  const handleSlideSelect = (index) => {
    setActiveIndex(index);
    if (swiperRef.current && swiperRef.current.swiper) {
      swiperRef.current.swiper.slideTo(index);
    }
  };

  return (
    <div className="skiper49-certifications-wrapper">
      {/* 3D Inverted Coverflow Swiper (Skiper 49 Effect) */}
      <div className="skiper49-swiper-container">
        <Swiper
          ref={swiperRef}
          effect="coverflow"
          grabCursor={true}
          centeredSlides={true}
          slidesPerView="auto"
          initialSlide={1}
          touchStartPreventDefault={false}
          autoplay={{
            delay: 4500,
            disableOnInteraction: false,
            pauseOnMouseEnter: true
          }}
          coverflowEffect={{
            rotate: 35,
            stretch: 0,
            depth: 140,
            modifier: 1.1,
            slideShadows: true
          }}
          pagination={{
            clickable: true,
            el: ".skiper49-pagination"
          }}
          navigation={{
            nextEl: ".skiper49-next-btn",
            prevEl: ".skiper49-prev-btn"
          }}
          onSlideChange={(swiper) => {
            setActiveIndex(swiper.realIndex);
          }}
          modules={[EffectCoverflow, Autoplay, Pagination, Navigation]}
          className="skiper49-coverflow-swiper"
        >
          {certifications.map((cert, index) => (
            <SwiperSlide
              key={cert.id || index}
              className="skiper49-slide"
              onClick={() => {
                handleSlideSelect(index);
                onSelectCert(cert);
              }}
            >
              <div
                className="skiper49-card-inner"
                style={{ "--card-glow": cert.glowColor || "rgba(245, 158, 11, 0.4)" }}
              >
                {/* Top Holographic Sheen Layer */}
                <div className="skiper49-holo-layer"></div>

                {/* Certificate Document Visual Box */}
                <div className="skiper49-img-box">
                  <img
                    src={formatImageUrl(cert.image, "/certificates/google_ai.jpg")}
                    alt={cert.title}
                    className="skiper49-img"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "/certificates/google_ai.jpg";
                    }}
                  />
                  <div className="skiper49-img-overlay">
                    <div className="skiper49-badge-pill">
                      <Maximize2 size={13} />
                      <span>View Credential Document</span>
                    </div>
                  </div>
                  <div className="skiper49-floating-seal">
                    <ShieldCheck size={18} style={{ color: "#fbbf24" }} />
                  </div>
                </div>

                {/* Card Content Footer */}
                <div className="skiper49-info-block">
                  <div className="skiper49-issuer-tag">{cert.issuer}</div>
                  <h4 className="skiper49-title">{cert.title}</h4>

                  <div className="skiper49-skills-cloud">
                    {cert.skillsValidated?.slice(0, 2).map((s, sIdx) => (
                      <span key={sIdx} className="tag-pill" style={{ fontSize: "0.68rem" }}>
                        ✓ {s}
                      </span>
                    ))}
                  </div>

                  <div className="skiper49-footer-row">
                    <span className="skiper49-id-code">ID: {cert.credentialId?.slice(0, 16)}...</span>
                    <span className="skiper49-click-hint">Click ➔</span>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Custom Navigation Controls */}
        <div className="skiper49-controls-row">
          <button className="skiper49-nav-btn skiper49-prev-btn" aria-label="Previous certificate">
            <ChevronLeft size={20} />
          </button>
          <div className="skiper49-pagination"></div>
          <button className="skiper49-nav-btn skiper49-next-btn" aria-label="Next certificate">
            <ChevronRight size={20} />
          </button>
        </div>
      </div>

      {/* Active Certificate Deep Dive Card Below Coverflow */}
      {activeCert && (
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCert.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
            className="glass-card active-cert-detail-panel"
            style={{ marginTop: "2.5rem", padding: "2rem", border: "1px solid rgba(251, 191, 36, 0.3)" }}
          >
            <div className="active-cert-panel-grid">
              <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
                  <span className="section-tag" style={{ margin: 0, color: "#fbbf24", borderColor: "rgba(251, 191, 36, 0.3)", background: "rgba(251, 191, 36, 0.1)" }}>
                    {activeCert.issuer}
                  </span>
                  <span className="status-badge" style={{ fontSize: "0.75rem", padding: "0.2rem 0.6rem" }}>
                    <ShieldCheck size={14} /> {activeCert.date || "Verified"}
                  </span>
                </div>

                <h3 style={{ fontSize: "1.45rem", fontWeight: 800, color: "#ffffff" }}>
                  {activeCert.title}
                </h3>

                <p style={{ color: "var(--text-secondary)", fontSize: "0.92rem", lineHeight: 1.6 }}>
                  {activeCert.description}
                </p>

                <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.82rem", color: "#38bdf8", marginTop: "0.25rem" }}>
                  Credential ID: <span style={{ color: "#ffffff" }}>{activeCert.credentialId}</span>
                </div>
              </div>

              <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", gap: "1rem" }}>
                <div>
                  <h5 style={{ fontSize: "0.85rem", textTransform: "uppercase", letterSpacing: "0.05em", color: "var(--text-muted)", marginBottom: "0.5rem" }}>
                    Verified Competencies
                  </h5>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
                    {activeCert.skillsValidated?.map((sk, idx) => (
                      <span key={idx} className="tag-pill" style={{ color: "#fef08a", background: "rgba(251, 191, 36, 0.12)", borderColor: "rgba(251, 191, 36, 0.3)" }}>
                        ✓ {sk}
                      </span>
                    ))}
                  </div>
                </div>

                <button
                  onClick={() => onSelectCert(activeCert)}
                  className="btn-glow"
                  style={{ alignSelf: "flex-start", padding: "0.65rem 1.4rem", fontSize: "0.88rem" }}
                >
                  <Sparkles size={16} /> Open Verified Document View
                </button>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      )}
    </div>
  );
}
