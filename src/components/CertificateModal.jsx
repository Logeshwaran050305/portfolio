import React, { useRef, useState } from "react";
import confetti from "canvas-confetti";
import {
  Sparkles,
  Award,
  CheckCircle2,
  ExternalLink,
  Download,
  X,
  Maximize2,
  ShieldCheck,
  Calendar,
  FileBadge
} from "lucide-react";
import { formatImageUrl } from "../utils/imageUtils";

// Safe Dynamic Icon
function CertificateIcon({ name, size = 22, className = "" }) {
  return <Award size={size} className={className} />;
}

// =========================================================
// 3D Holographic Certificate Card Component
// =========================================================
export function Certificate3DCard({ cert, onClick }) {
  const [tilt, setTilt] = useState({
    rotateX: 0,
    rotateY: 0,
    glareX: 50,
    glareY: 50,
    isHovered: false
  });

  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -16;
    const rotateY = ((x - centerX) / centerX) * 16;
    const glareX = (x / rect.width) * 100;
    const glareY = (y / rect.height) * 100;

    setTilt({
      rotateX,
      rotateY,
      glareX,
      glareY,
      isHovered: true
    });
  };

  const handleMouseLeave = () => {
    setTilt({
      rotateX: 0,
      rotateY: 0,
      glareX: 50,
      glareY: 50,
      isHovered: false
    });
  };

  return (
    <div
      ref={cardRef}
      className="cert-3d-card"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={() => onClick(cert)}
      style={{
        '--cert-glow': cert.glowColor || "rgba(245, 158, 11, 0.4)",
        transform: tilt.isHovered
          ? `perspective(1000px) rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg) scale3d(1.04, 1.04, 1.04)`
          : 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)',
        transition: tilt.isHovered ? 'transform 0.08s ease-out' : 'transform 0.5s cubic-bezier(0.2, 0.8, 0.2, 1)'
      }}
    >
      {/* 3D Holographic Rainbow / Gold Shimmer Foil */}
      {tilt.isHovered && (
        <div
          className="cert-holo-glare"
          style={{
            background: `radial-gradient(circle at ${tilt.glareX}% ${tilt.glareY}%, rgba(255, 255, 255, 0.3) 0%, rgba(245, 158, 11, 0.2) 30%, transparent 70%)`
          }}
        />
      )}

      {/* Floating 3D Certificate Preview Box */}
      <div className="cert-preview-3d-wrap">
        <img
          src={formatImageUrl(cert.image, "/certificates/google_ai.jpg")}
          alt={cert.title}
          className="cert-preview-3d-img"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = "/certificates/google_ai.jpg";
          }}
        />
        <div className="cert-preview-overlay">
          <span className="cert-view-badge">
            <Maximize2 size={14} /> View Certificate
          </span>
        </div>
        <div className="cert-floating-seal">
          <ShieldCheck size={18} style={{ color: "#f59e0b" }} />
        </div>
      </div>

      {/* Card Info Section */}
      <div className="cert-card-body">
        <div className="cert-card-header">
          <span className="cert-issuer-badge">{cert.issuer}</span>
          <span className={`status-badge ${cert.badgeColor || ""}`}>
            <Sparkles size={12} /> {cert.date || "Verified"}
          </span>
        </div>

        <h3 className="cert-card-title">{cert.title}</h3>
        <p className="cert-card-desc">{cert.description}</p>

        {/* Skills Tag Pills */}
        <div className="cert-skills-pills">
          {cert.skillsValidated?.slice(0, 3).map((skill, sIdx) => (
            <span key={sIdx} className="tag-pill" style={{ fontSize: "0.72rem", padding: "0.2rem 0.5rem" }}>
              ✓ {skill}
            </span>
          ))}
        </div>

        <div className="cert-card-footer">
          <span className="cert-id-tag">ID: {cert.credentialId?.slice(0, 16)}...</span>
          <span className="cert-click-prompt">Click to open ➔</span>
        </div>
      </div>
    </div>
  );
}

// =========================================================
// Dedicated Certificate Credential View Modal
// =========================================================
export function CertificateModal({ cert, onClose }) {
  if (!cert) return null;

  const handlePrint = () => {
    confetti({
      particleCount: 100,
      spread: 80,
      origin: { y: 0.6 }
    });
    window.print();
  };

  return (
    <div className="cert-modal-overlay" onClick={onClose}>
      <div className="cert-modal-container" onClick={(e) => e.stopPropagation()}>
        <button className="cert-modal-close-btn" onClick={onClose} aria-label="Close">
          <X size={24} />
        </button>

        <div className="cert-modal-grid">
          {/* Left / Top: High-Res Certificate Document Image */}
          <div className="cert-modal-img-column">
            <div className="cert-document-frame">
              <img
                src={formatImageUrl(cert.image, "/certificates/google_ai.jpg")}
                alt={cert.title}
                className="cert-document-full-img"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "/certificates/google_ai.jpg";
                }}
              />
            </div>
          </div>

          {/* Right / Bottom: Verification & Credential Details */}
          <div className="cert-modal-details-column">
            <div className="cert-verified-stamp">
              <ShieldCheck size={28} style={{ color: "#10b981" }} />
              <div>
                <div style={{ fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.05em", color: "#10b981", fontWeight: 800 }}>
                  Official Credential Verified
                </div>
                <div style={{ fontSize: "0.85rem", color: "var(--text-secondary)" }}>
                  Issued by {cert.issuer}
                </div>
              </div>
            </div>

            <div className="cert-modal-header">
              <h2 className="cert-modal-title">{cert.title}</h2>
              <div className="cert-meta-row">
                <span className="cert-issuer-badge" style={{ fontSize: "0.85rem", padding: "0.3rem 0.8rem" }}>
                  {cert.issuer}
                </span>
                <span className="timeline-period">
                  Status: {cert.date || "Verified"}
                </span>
              </div>
            </div>

            {/* Credential ID Key Details */}
            <div className="cert-meta-box">
              <div className="cert-meta-item">
                <span className="meta-label">Credential ID</span>
                <span className="meta-value font-mono" style={{ color: "#38bdf8" }}>
                  {cert.credentialId}
                </span>
              </div>
              <div className="cert-meta-item">
                <span className="meta-label">Issued To</span>
                <span className="meta-value font-bold">Logeshwaran G</span>
              </div>
            </div>

            {/* Description */}
            <div className="cert-desc-block">
              <h4 style={{ fontSize: "0.95rem", fontWeight: 700, color: "#ffffff", marginBottom: "0.5rem" }}>
                Curriculum & Domain Mastery
              </h4>
              <p style={{ color: "var(--text-secondary)", fontSize: "0.92rem", lineHeight: 1.6 }}>
                {cert.description}
              </p>
            </div>

            {/* Validated Skills */}
            <div className="cert-skills-block">
              <h4 style={{ fontSize: "0.95rem", fontWeight: 700, color: "#ffffff", marginBottom: "0.6rem" }}>
                Skills & Technologies Validated
              </h4>
              <div className="cert-modal-skills-grid">
                {cert.skillsValidated?.map((skill, idx) => (
                  <div key={idx} className="cert-skill-item">
                    <CheckCircle2 size={16} style={{ color: "#38bdf8", flexShrink: 0 }} />
                    <span>{skill}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Modal Actions */}
            <div className="cert-modal-actions">
              <button onClick={handlePrint} className="btn-glow" style={{ flex: 1 }}>
                <Download size={16} /> Print / Save Certificate View
              </button>
              <button onClick={onClose} className="btn-secondary">
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
