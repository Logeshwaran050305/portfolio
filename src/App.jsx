import React, { useState, useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';
import {
  Code,
  Code2,
  Database,
  BarChart3,
  FileSpreadsheet,
  LineChart,
  PieChart,
  TrendingUp,
  Cpu,
  Layers,
  Server,
  Layout,
  HardDrive,
  GitBranch,
  Palette,
  Sparkles,
  Users,
  Lightbulb,
  Cloud,
  Zap,
  Mail,
  Phone,
  MessageCircle,
  MapPin,
  ExternalLink,
  Download,
  Send,
  CheckCircle2,
  Copy,
  ChevronRight,
  Menu,
  X,
  ArrowUp,
  Award,
  GraduationCap,
  Briefcase,
  Images,
  Lock
} from 'lucide-react';

import { usePortfolio } from './context/PortfolioContext';
import { Skiper48Projects } from './components/Skiper48Projects';
import { Skiper30Gallery } from './components/Skiper30Gallery';
import { Skiper49Certifications } from './components/Skiper49Certifications';
import { CertificateModal } from './components/CertificateModal';
import { ResumeModal } from './components/ResumeModal';
import { PrintableResume } from './components/PrintableResume';
import { AdminDashboard } from './components/AdminDashboard';
import { AdminLogin } from './components/AdminLogin';
import { ScrollDissolveReveal } from './components/ScrollDissolveReveal';
import { formatImageUrl } from './utils/imageUtils';

import './App.css';

// Safe icon lookup mapping
const iconMap = {
  Database,
  Code,
  Code2,
  BarChart3,
  FileSpreadsheet,
  LineChart,
  PieChart,
  TrendingUp,
  Cpu,
  Layers,
  Server,
  Layout,
  HardDrive,
  GitBranch,
  Palette,
  Sparkles,
  Users,
  Lightbulb,
  Cloud,
  Zap,
  Award,
  GraduationCap,
  Briefcase,
  Images
};

function DynamicIcon({ name, size = 20, className = '' }) {
  const Component = iconMap[name] || Sparkles;
  return <Component size={size} className={className} />;
}

// =========================================================
// 3D Interactive Tilt Card Component (for Skills)
// =========================================================
function Skill3DCard({ skill, onCardClick }) {
  const [tilt, setTilt] = useState({
    rotateX: 0,
    rotateY: 0,
    glareX: 50,
    glareY: 50,
    isHovered: false
  });

  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    if (window.innerWidth <= 768 || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -14;
    const rotateY = ((x - centerX) / centerX) * 14;
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
      className="tilt-card-3d"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={() => onCardClick(skill)}
      style={{
        '--card-glow': skill.glow || 'rgba(99, 102, 241, 0.4)',
        transform: tilt.isHovered
          ? `perspective(1000px) rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg) scale3d(1.05, 1.05, 1.05)`
          : 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)',
        transition: tilt.isHovered ? 'transform 0.08s ease-out' : 'transform 0.5s cubic-bezier(0.2, 0.8, 0.2, 1)'
      }}
    >
      {/* Specular Holographic Glare Overlay */}
      {tilt.isHovered && (
        <div
          className="tilt-card-glare"
          style={{
            background: `radial-gradient(circle at ${tilt.glareX}% ${tilt.glareY}%, rgba(255, 255, 255, 0.22) 0%, transparent 60%)`
          }}
        />
      )}

      {/* 3D Pop-out Header with Icon and Badge */}
      <div className="layer-header-3d">
        <div
          className="layer-icon-3d"
          style={{
            color: skill.accent || '#38bdf8',
            backgroundColor: `${skill.accent || '#38bdf8'}15`,
            borderColor: `${skill.accent || '#38bdf8'}35`
          }}
        >
          <DynamicIcon name={skill.icon} size={22} />
        </div>

        <span
          className="layer-badge-3d"
          style={{
            color: skill.accent || '#38bdf8',
            borderColor: `${skill.accent || '#38bdf8'}30`,
            backgroundColor: `${skill.accent || '#38bdf8'}12`
          }}
        >
          {skill.badge}
        </span>
      </div>

      {/* 3D Pop-out Skill Title & Description */}
      <div>
        <h3 className="layer-title-3d">{skill.name}</h3>
        <p className="layer-desc-3d">{skill.desc}</p>
      </div>

      {/* 3D Pop-out Animated Progress Meter */}
      <div className="layer-bar-3d">
        <div className="skill-level-text">
          <span>Proficiency Mastery</span>
          <span style={{ color: skill.accent || '#38bdf8', fontWeight: 700 }}>{skill.level}%</span>
        </div>
        <div className="skill-bar-meter">
          <div
            className="skill-bar-progress"
            style={{
              width: `${skill.level}%`,
              background: `linear-gradient(90deg, ${skill.accent || '#38bdf8'}, #6366f1)`
            }}
          ></div>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  // Live Portfolio CMS Context Data
  const {
    personalInfo,
    skills,
    categories,
    projects,
    certifications,
    education,
    aboutHighlights,
    sectionHeaders,
    addMessage,
    adminCredentials,
    resetAdminCredentials
  } = usePortfolio();

  // Admin Dashboard View State
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(() => sessionStorage.getItem('portfolio_admin_authenticated') === 'true');

  // Dedicated Project Detail View State (Skiper30 Parallax Gallery Page)
  const [selectedProjectForGallery, setSelectedProjectForGallery] = useState(null);

  // Selected Certificate for Credential Modal View
  const [selectedCertForModal, setSelectedCertForModal] = useState(null);

  // Dedicated Clean ATS Resume Modal State
  const [isResumeModalOpen, setIsResumeModalOpen] = useState(false);

  // Navigation & Scroll states
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  // Typewriter effect state
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(100);

  // Skill filter state
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Contact form state
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [formSubmitting, setFormSubmitting] = useState(false);

  // Toast feedback state
  const [toastMessage, setToastMessage] = useState(null);

  // Keep the CMS as a separate page while supporting the old #admin link.
  useEffect(() => {
    if (window.location.pathname === '/admin' || window.location.hash === '#admin') {
      window.history.replaceState({}, '', '/admin');
      setIsAdminOpen(true);
    }

    const handleHistoryChange = () => setIsAdminOpen(window.location.pathname === '/admin');
    window.addEventListener('popstate', handleHistoryChange);
    return () => window.removeEventListener('popstate', handleHistoryChange);
  }, []);

  // Scroll listener for sticky navbar & active section
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      const sections = ['hero', 'about', 'skills', 'projects', 'certifications', 'education', 'contact'];
      const scrollPos = window.scrollY + 200;

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Reveal sections as they enter the viewport during scrolling.
  useEffect(() => {
    // If mobile screen or IntersectionObserver is unsupported, immediately make all visible
    if (typeof window !== 'undefined' && (window.innerWidth <= 768 || !('IntersectionObserver' in window))) {
      document.querySelectorAll('.scroll-reveal').forEach((section) => {
        section.classList.add('is-visible');
      });
      return;
    }

    try {
      const revealObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('is-visible');
              revealObserver.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.05, rootMargin: '0px 0px 50px 0px' }
      );

      document.querySelectorAll('.scroll-reveal').forEach((section) => {
        revealObserver.observe(section);
      });

      return () => revealObserver.disconnect();
    } catch {
      document.querySelectorAll('.scroll-reveal').forEach((section) => {
        section.classList.add('is-visible');
      });
    }
  }, []);

  // Typewriter effect
  useEffect(() => {
    const roles = personalInfo.typingRoles && personalInfo.typingRoles.length > 0
      ? personalInfo.typingRoles
      : ['Web Developer & Data Analyst'];

    const fullText = roles[currentRoleIndex % roles.length];

    const timer = setTimeout(() => {
      if (!isDeleting) {
        setDisplayedText(fullText.substring(0, displayedText.length + 1));
        setTypingSpeed(75);

        if (displayedText === fullText) {
          setTimeout(() => setIsDeleting(true), 1500);
        }
      } else {
        setDisplayedText(fullText.substring(0, displayedText.length - 1));
        setTypingSpeed(40);

        if (displayedText === '') {
          setIsDeleting(false);
          setCurrentRoleIndex((prev) => (prev + 1) % roles.length);
        }
      }
    }, typingSpeed);

    return () => clearTimeout(timer);
  }, [displayedText, isDeleting, currentRoleIndex, typingSpeed, personalInfo.typingRoles]);

  // Trigger celebratory confetti safely
  const launchConfetti = () => {
    try {
      confetti({
        particleCount: 60,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#38bdf8', '#6366f1', '#a855f7', '#10b981', '#f59e0b']
      });
    } catch {
      // Gracefully ignore if canvas confetti is restricted on device
    }
  };

  // Toast helper
  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  // Copy to clipboard helper with robust mobile fallback
  const handleCopy = async (text, type) => {
    try {
      if (navigator.clipboard && typeof navigator.clipboard.writeText === 'function') {
        await navigator.clipboard.writeText(text);
      } else {
        const textArea = document.createElement('textarea');
        textArea.value = text;
        textArea.style.position = 'fixed';
        textArea.style.left = '-9999px';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
      }
      showToast(`✓ Copied ${type} to clipboard!`);
    } catch (err) {
      console.warn('Clipboard copy fallback:', err);
      showToast(`✓ ${type}: ${text}`);
    }
  };

  // Handle skill card click with micro burst
  const handleSkillCardClick = (skill) => {
    showToast(`✨ ${skill.name} • ${skill.level}% Proficiency`);
  };

  // Handle certificate card click
  const handleCertClick = (cert) => {
    launchConfetti();
    setSelectedCertForModal(cert);
  };

  // Send the inquiry through FormSubmit, then save a copy in the CMS inbox.
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      showToast('Please fill out all required fields');
      return;
    }

    setFormSubmitting(true);
    try {
      const response = await fetch(`https://formsubmit.co/ajax/${encodeURIComponent(personalInfo.email)}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          subject: formData.subject || 'Portfolio Direct Inquiry',
          message: formData.message,
          _replyto: formData.email,
          _subject: formData.subject || `New portfolio message from ${formData.name}`,
          _template: 'box',
          _captcha: 'false'
        })
      });

      const result = await response.json();
      if (!response.ok || result.success === false) {
        throw new Error('Email service rejected the message');
      }

      addMessage({
        name: formData.name,
        email: formData.email,
        subject: formData.subject || 'Portfolio Direct Inquiry',
        message: formData.message
      });

      launchConfetti();
      showToast(`Thank you ${formData.name}! Your message was sent to Gmail.`);
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      console.error('Failed to send contact form message', error);
      showToast('Message could not be sent. Please try again or use the email link.');
    } finally {
      setFormSubmitting(false);
    }
  };

  // Resume Download / Modal Action (Dedicated Clean ATS Document)
  const handleDownloadResume = () => {
    launchConfetti();
    setIsResumeModalOpen(true);
  };

  // Filter skills
  const filteredSkills = selectedCategory === 'all'
    ? skills
    : skills.filter((s) => s.category === selectedCategory);

  // =========================================================
  // RENDER ADMIN DASHBOARD CMS PAGE IF OPEN
  // =========================================================
  if (isAdminOpen) {
    if (!isAdminAuthenticated) {
      return (
        <AdminLogin
          credentials={adminCredentials}
          onResetCredentials={() => {
            resetAdminCredentials();
          }}
          onLogin={() => {
            sessionStorage.setItem('portfolio_admin_authenticated', 'true');
            setIsAdminAuthenticated(true);
          }}
        />
      );
    }

    return (
      <AdminDashboard
        onLogout={() => {
          sessionStorage.removeItem('portfolio_admin_authenticated');
          setIsAdminAuthenticated(false);
        }}
        onExitAdmin={() => {
          setIsAdminOpen(false);
          window.history.pushState({}, '', '/');
          window.scrollTo(0, 0);
        }}
      />
    );
  }

  // =========================================================
  // RENDER DEDICATED PROJECT DETAIL PARALLAX PAGE (@skiper-ui/skiper30)
  // =========================================================
  if (selectedProjectForGallery) {
    return (
      <Skiper30Gallery
        project={selectedProjectForGallery}
        onBack={() => {
          setSelectedProjectForGallery(null);
          window.scrollTo(0, 0);
        }}
        userEmail={personalInfo.email}
      />
    );
  }

  return (
    <div className="portfolio-app">
      {/* Toast Alert */}
      {toastMessage && (
        <div className="toast-notice">
          <CheckCircle2 size={18} />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Certificate Credential View Modal */}
      {selectedCertForModal && (
        <CertificateModal
          cert={selectedCertForModal}
          onClose={() => setSelectedCertForModal(null)}
        />
      )}

      {/* =========================================================
          1. NAVIGATION BAR
          ========================================================= */}
      <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
        <div className="container-custom nav-container">
          <a href="#hero" className="nav-logo">
            <span className="logo-badge">
              {personalInfo.logoImage ? (
                <img
                  src={formatImageUrl(personalInfo.logoImage)}
                  alt="Logo"
                  onError={(e) => { e.target.style.display = 'none'; }}
                />
              ) : (
                'LG'
              )}
            </span>
            <span>{personalInfo.brandName || 'Logeshwaran.dev'}</span>
          </a>

          {/* Desktop Navigation */}
          <ul className="nav-links">
            <li><a href="#about" className={`nav-link ${activeSection === 'about' ? 'active' : ''}`}>About</a></li>
            <li><a href="#skills" className={`nav-link ${activeSection === 'skills' ? 'active' : ''}`}>Skills</a></li>
            <li><a href="#projects" className={`nav-link ${activeSection === 'projects' ? 'active' : ''}`}>Projects</a></li>
            <li><a href="#certifications" className={`nav-link ${activeSection === 'certifications' ? 'active' : ''}`}>Certifications</a></li>
            <li><a href="#education" className={`nav-link ${activeSection === 'education' ? 'active' : ''}`}>Education</a></li>
            <li><a href="#contact" className={`nav-link ${activeSection === 'contact' ? 'active' : ''}`}>Contact</a></li>
          </ul>

          <div className="nav-action-btn" style={{ display: 'flex', gap: '0.65rem', alignItems: 'center' }}>
            <button onClick={handleDownloadResume} className="btn-secondary" style={{ padding: '0.5rem 1rem', fontSize: '0.82rem' }}>
              <Download size={14} /> Resume
            </button>
            <a href="#contact" className="btn-glow" style={{ padding: '0.5rem 1.15rem', fontSize: '0.82rem' }}>
              Hire Me
            </a>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="mobile-menu-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Dropdown */}
        {mobileMenuOpen && (
          <div className="mobile-nav open">
            <a href="#about" onClick={() => setMobileMenuOpen(false)} className="nav-link">About</a>
            <a href="#skills" onClick={() => setMobileMenuOpen(false)} className="nav-link">Skills</a>
            <a href="#projects" onClick={() => setMobileMenuOpen(false)} className="nav-link">Projects</a>
            <a href="#certifications" onClick={() => setMobileMenuOpen(false)} className="nav-link">Certifications</a>
            <a href="#education" onClick={() => setMobileMenuOpen(false)} className="nav-link">Education</a>
            <a href="#contact" onClick={() => setMobileMenuOpen(false)} className="nav-link">Contact</a>
            <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem' }}>
              <button onClick={handleDownloadResume} className="btn-secondary" style={{ flex: 1 }}>
                <Download size={15} /> Resume
              </button>
              <a href="#contact" onClick={() => setMobileMenuOpen(false)} className="btn-glow" style={{ flex: 1 }}>
                Hire Me
              </a>
            </div>
          </div>
        )}
      </nav>

      {/* =========================================================
          2. HERO SECTION
          ========================================================= */}
      <section id="hero" className="hero-section">
        <div className="container-custom">
          <div className="hero-grid">
            <div className="hero-content">
              <div className="status-badge">
                <span className="status-dot"></span>
                <span>{personalInfo.statusBadge || 'Available for Full-time Roles & Projects'}</span>
              </div>

              <h1 className="hero-title">
                {personalInfo.greeting || "Hi, I'm"} <span className="text-gradient">{personalInfo.name}</span>
              </h1>

              <div className="hero-typewriter">
                <span>I build & analyze as a </span>
                <span style={{ color: '#ffffff', fontWeight: 700 }}>{displayedText}</span>
                <span className="cursor-blink"></span>
              </div>

              <p className="hero-summary">
                {personalInfo.summary}
              </p>

              <div className="hero-actions">
                <a href="#projects" className="btn-glow">
                  Explore My Work <ChevronRight size={18} />
                </a>
                <a href="#contact" className="btn-secondary">
                  <Mail size={18} /> Get In Touch
                </a>
                <a
                  href={personalInfo.socials?.github || 'https://github.com/'}
                  className="btn-secondary"
                  target="_blank"
                  rel="noreferrer"
                  title="Open GitHub profile"
                >
                  <GitBranch size={18} /> GitHub
                </a>
                <a
                  href={personalInfo.socials?.linkedin || 'https://linkedin.com/'}
                  className="btn-secondary"
                  target="_blank"
                  rel="noreferrer"
                  title="Open LinkedIn profile"
                >
                  <Briefcase size={18} /> LinkedIn
                </a>
                <button onClick={handleDownloadResume} className="btn-secondary">
                  <Download size={18} /> Download CV
                </button>
              </div>

              {/* Quick Contact Chips with 1-click Copy */}
              <div className="hero-contact-chips">
                <button
                  onClick={() => handleCopy(personalInfo.email, 'Email')}
                  className="chip-btn"
                  title="Click to copy email"
                >
                  <Mail size={14} style={{ color: '#38bdf8' }} />
                  <span>{personalInfo.email}</span>
                  <Copy size={12} />
                </button>

                <button
                  onClick={() => handleCopy(personalInfo.phone, 'Phone number')}
                  className="chip-btn"
                  title="Click to copy phone number"
                >
                  <Phone size={14} style={{ color: '#34d399' }} />
                  <span>{personalInfo.phone}</span>
                  <Copy size={12} />
                </button>

                <span className="chip-btn" style={{ cursor: 'default' }}>
                  <MapPin size={14} style={{ color: '#f59e0b' }} />
                  <span>{personalInfo.location}</span>
                </span>
              </div>
            </div>

            {/* Hero Visual Profile Card */}
            <div className="hero-visual">
              <div className="profile-card animate-float">
                <div className="avatar-wrapper">
                  <div className="avatar-inner">
                    {personalInfo.profileImage ? (
                      <img
                        src={formatImageUrl(personalInfo.profileImage)}
                        alt={`${personalInfo.name} profile`}
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.style.display = 'none';
                        }}
                      />
                    ) : (
                      <span style={{ fontSize: '2.5rem', fontWeight: 800, fontFamily: 'var(--font-heading)', color: '#ffffff' }}>LG</span>
                    )}
                  </div>
                </div>

                <h3 className="card-name">{personalInfo.name}</h3>
                <p className="card-role">{personalInfo.roleTitle}</p>

                <div className="card-stats-grid">
                  {personalInfo.stats && personalInfo.stats.map((stat, idx) => (
                    <div key={idx} className="mini-stat-card">
                      <div className="mini-stat-val">{stat.value}</div>
                      <div className="mini-stat-label">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          3. ABOUT & VALUE PROPOSITION
          ========================================================= */}
      <ScrollDissolveReveal as="section" id="about" className="section about-section scroll-reveal">
        <div className="container-custom">
          <div className="section-header">
            <span className="section-tag">{sectionHeaders?.about?.tag || 'About Me'}</span>
            <h2 className="section-title">{sectionHeaders?.about?.title || 'Blending Data Insights with Modern Web Tech'}</h2>
            <p className="section-subtitle">
              {sectionHeaders?.about?.subtitle || 'Passionate about extracting actionable intelligence from datasets and delivering intuitive, high-performance web applications.'}
            </p>
          </div>

          <div className="about-grid">
            {aboutHighlights.map((item, idx) => (
              <div
                key={idx}
                className="glass-card about-card"
                style={{ '--about-delay': `${idx * 110}ms` }}
              >
                <div className="about-icon-box">
                  <DynamicIcon name={item.icon} size={28} />
                </div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 700 }}>{item.title}</h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', lineHeight: 1.6 }}>
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </ScrollDissolveReveal>

      {/* =========================================================
          4. INTERACTIVE SKILLS MATRIX
          ========================================================= */}
      <ScrollDissolveReveal as="section" id="skills" className="section skills-section-wrapper scroll-reveal">
        {/* Ambient Glow */}
        <div className="skills-ambient-glow"></div>

        <div className="container-custom">
          <div className="section-header">
            <span className="section-tag">{sectionHeaders?.skills?.tag || 'Technical Skills'}</span>
            <h2 className="section-title">{sectionHeaders?.skills?.title || 'Skills & Capabilities'}</h2>
            <p className="section-subtitle">
              {sectionHeaders?.skills?.subtitle || 'Explore my technical skills, mastery levels, and areas of expertise.'}
            </p>
          </div>

          {/* Category Tabs */}
          <div className="skills-tabs">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`tab-btn ${selectedCategory === cat.id ? 'active' : ''}`}
              >
                <span>{cat.label}</span>
              </button>
            ))}
          </div>

          {/* Skills grid */}
          <div className="skills-3d-grid">
            {filteredSkills.map((skill, idx) => (
              <Skill3DCard
                key={idx}
                skill={skill}
                onCardClick={handleSkillCardClick}
              />
            ))}
          </div>
        </div>
      </ScrollDissolveReveal>

      {/* =========================================================
          5. FEATURED PROJECTS (POWERED BY SKIPER48 + SKIPER30)
          ========================================================= */}
      <ScrollDissolveReveal as="section" id="projects" className="section projects-section scroll-reveal">
        <div className="container-custom">
          <div className="section-header">
            <span className="section-tag">{sectionHeaders?.projects?.tag || 'Swipeable 3D Deck & Multi-Image Gallery'}</span>
            <h2 className="section-title">{sectionHeaders?.projects?.title || 'Featured Projects'}</h2>
            <p className="section-subtitle">
              {sectionHeaders?.projects?.subtitle || 'Swipe the 3D card deck or click on any project image to open the full multi-image parallax gallery view powered by Skiper UI.'}
            </p>
          </div>

          {/* Skiper48 3D Card Swipe Carousel */}
          <Skiper48Projects
            projects={projects}
            userEmail={personalInfo.email}
            onOpenProjectDetail={(project) => {
              setSelectedProjectForGallery(project);
            }}
          />
        </div>
      </ScrollDissolveReveal>

      {/* =========================================================
          6. 3D COVERFLOW CERTIFICATIONS (POWERED BY SKIPER-UI / SKIPER49)
          ========================================================= */}
      <ScrollDissolveReveal as="section" id="certifications" className="section certifications-section scroll-reveal">
        <div className="container-custom">
          <div className="section-header">
            <span className="section-tag">{sectionHeaders?.certifications?.tag || '3D Coverflow Perspective (@skiper-ui/skiper49)'}</span>
            <h2 className="section-title">{sectionHeaders?.certifications?.title || 'Certifications & Verified Honors'}</h2>
            <p className="section-subtitle">
              {sectionHeaders?.certifications?.subtitle || 'Interactive 3D Inverted Coverflow Carousel. Click any certificate to open its full verified credential document.'}
            </p>
          </div>

          {/* Skiper49 3D Inverted Coverflow Carousel */}
          <Skiper49Certifications
            certifications={certifications}
            onSelectCert={handleCertClick}
          />
        </div>
      </ScrollDissolveReveal>

      {/* =========================================================
          7. EDUCATION TIMELINE
          ========================================================= */}
      <ScrollDissolveReveal as="section" id="education" className="section education-section scroll-reveal">
        <div className="container-custom">
          <div className="section-header">
            <span className="section-tag">{sectionHeaders?.education?.tag || 'Academic Background'}</span>
            <h2 className="section-title">{sectionHeaders?.education?.title || 'Education & Milestones'}</h2>
            <p className="section-subtitle">
              {sectionHeaders?.education?.subtitle || 'Academic qualifications shaping computer science theory, software design, and analytical problem-solving.'}
            </p>
          </div>

          <div className="timeline">
            {education.map((edu, idx) => (
              <div key={idx} className="timeline-item">
                <div className="timeline-marker">
                  <div className="timeline-marker-inner"></div>
                </div>

                <div className="glass-card timeline-card">
                  <div className="timeline-header">
                    <h3 className="timeline-degree">{edu.degree}</h3>
                    <span className="timeline-period">{edu.period}</span>
                  </div>

                  <div className="timeline-inst">{edu.institution}</div>
                  <div className="timeline-location">
                    <MapPin size={13} style={{ display: 'inline', marginRight: '4px' }} />
                    {edu.location}
                  </div>

                  <ul className="timeline-list">
                    {edu.highlights.map((h, hIdx) => (
                      <li key={hIdx}>
                        <CheckCircle2 size={15} style={{ color: '#818cf8', flexShrink: 0, marginTop: '2px' }} />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </ScrollDissolveReveal>

      {/* =========================================================
          8. CONTACT SECTION
          ========================================================= */}
      <ScrollDissolveReveal as="section" id="contact" className="section contact-section scroll-reveal">
        <div className="container-custom">
          <div className="section-header">
            <span className="section-tag">{sectionHeaders?.contact?.tag || 'Get In Touch'}</span>
            <h2 className="section-title">{sectionHeaders?.contact?.title || "Let's Connect & Collaborate"}</h2>
            <p className="section-subtitle">
              {sectionHeaders?.contact?.subtitle || 'Whether you have an opportunity, a project to build, or a dataset to analyze, my inbox is open!'}
            </p>
          </div>

          <div className="contact-grid">
            {/* Contact Information & Copy Buttons */}
            <div className="glass-card contact-info-card">
              <h3 style={{ fontSize: '1.4rem', fontWeight: 700 }}>Contact Details</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
                Feel free to reach out via phone, email, or send a message using the form.
              </p>

              <div className="contact-method-list">
                {/* Email Item */}
                <div className="contact-method-item">
                  <div className="contact-icon-bubble">
                    <Mail size={22} />
                  </div>
                  <div style={{ flexGrow: 1 }}>
                    <div className="contact-meta-title">Email Address</div>
                    <a href={`mailto:${personalInfo.email}`} className="contact-meta-value">
                      {personalInfo.email}
                    </a>
                  </div>
                  <button
                    onClick={() => handleCopy(personalInfo.email, 'Email')}
                    className="chip-btn"
                    title="Copy Email"
                  >
                    <Copy size={14} />
                  </button>
                </div>

                {/* Phone Item */}
                <div className="contact-method-item">
                  <div className="contact-icon-bubble">
                    <Phone size={22} />
                  </div>
                  <div style={{ flexGrow: 1 }}>
                    <div className="contact-meta-title">Direct Phone</div>
                    <a href={`tel:${personalInfo.phone}`} className="contact-meta-value">
                      {personalInfo.phone}
                    </a>
                  </div>
                  <button
                    onClick={() => handleCopy(personalInfo.phone, 'Phone number')}
                    className="chip-btn"
                    title="Copy Phone"
                  >
                    <Copy size={14} />
                  </button>
                </div>

                {/* Location Item */}
                <div className="contact-method-item">
                  <div className="contact-icon-bubble">
                    <MapPin size={22} />
                  </div>
                  <div>
                    <div className="contact-meta-title">Location</div>
                    <div className="contact-meta-value">{personalInfo.location}</div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1rem', flexWrap: 'wrap' }}>
                <button onClick={handleDownloadResume} className="btn-secondary" style={{ flex: 1 }}>
                  <Download size={16} /> Print / Save Resume
                </button>
              </div>

              <div className="contact-social-actions">
                <a
                  href={personalInfo.socials?.github || 'https://github.com/'}
                  className="btn-secondary"
                  target="_blank"
                  rel="noreferrer"
                >
                  <GitBranch size={16} /> GitHub
                </a>
                <a
                  href={personalInfo.socials?.linkedin || 'https://linkedin.com/'}
                  className="btn-secondary"
                  target="_blank"
                  rel="noreferrer"
                >
                  <Briefcase size={16} /> LinkedIn
                </a>
              </div>
            </div>

            {/* Contact Form */}
            <div className="glass-card contact-form-card">
              <h3 style={{ fontSize: '1.4rem', fontWeight: 700, marginBottom: '1.5rem' }}>Send a Message</h3>
              <form onSubmit={handleFormSubmit}>
                <div className="form-group">
                  <label className="form-label">Your Full Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. John Doe"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Your Email Address *</label>
                  <input
                    type="email"
                    required
                    placeholder="e.g. john@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Subject / Purpose</label>
                  <input
                    type="text"
                    placeholder="e.g. Job Opportunity / Project Inquiry"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Your Message *</label>
                  <textarea
                    required
                    placeholder={`Hi ${personalInfo.name || 'Logeshwaran'}, I'd like to discuss an opportunity...`}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="form-textarea"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={formSubmitting}
                  className="btn-glow"
                  style={{ width: '100%', marginTop: '0.5rem' }}
                >
                  {formSubmitting ? (
                    'Sending...'
                  ) : (
                    <>
                      <Send size={18} /> Send Message
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </ScrollDissolveReveal>

      {/* =========================================================
          9. FOOTER
          ========================================================= */}
      <footer className="footer">
        <div className="container-custom">
          <div className="footer-content">
            <div className="nav-logo">
              <span className="logo-badge">
                {personalInfo.logoImage ? (
                  <img
                    src={formatImageUrl(personalInfo.logoImage)}
                    alt="Logo"
                    onError={(e) => { e.target.style.display = 'none'; }}
                  />
                ) : (
                  'LG'
                )}
              </span>
              <span>{personalInfo.brandName || personalInfo.name || 'Logeshwaran G'}</span>
            </div>

            <div className="footer-actions" style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
              <a
                href={`https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(personalInfo.email.replace(/^mailto:/i, ''))}`}
                className="chip-btn"
                title="Send Email"
                target="_blank"
                rel="noreferrer"
              >
                <Mail size={16} />
              </a>
              <a
                href={`tel:${personalInfo.phone.replace(/^tel:/i, '').replace(/[^+\d]/g, '')}`}
                className="chip-btn"
                title="Call Directly"
              >
                <Phone size={16} />
              </a>
              <a
                href={`https://wa.me/${personalInfo.phone.replace(/^tel:/i, '').replace(/\D/g, '')}?text=${encodeURIComponent(`Hello ${personalInfo.name || 'Logeshwaran'}, I would like to discuss an opportunity.`)}`}
                className="chip-btn"
                title="Chat on WhatsApp"
                target="_blank"
                rel="noreferrer"
              >
                <MessageCircle size={16} />
              </a>
              <a
                href={personalInfo.socials?.github || 'https://github.com/'}
                className="chip-btn"
                title="Open GitHub profile"
                target="_blank"
                rel="noreferrer"
              >
                <GitBranch size={16} />
              </a>
              <a
                href={personalInfo.socials?.linkedin || 'https://linkedin.com/'}
                className="chip-btn"
                title="Open LinkedIn profile"
                target="_blank"
                rel="noreferrer"
              >
                <Briefcase size={16} />
              </a>
              <a
                href="#hero"
                className="chip-btn"
                title="Back to top"
              >
                <ArrowUp size={16} /> Top
              </a>
              <button
                onClick={() => {
                  window.history.pushState({}, '', '/admin');
                  setIsAdminOpen(true);
                }}
                className="chip-btn"
                title="Open Admin CMS Portal"
                style={{ color: '#818cf8', borderColor: 'rgba(99, 102, 241, 0.35)', cursor: 'pointer' }}
              >
                <Lock size={15} /> Admin
              </button>
            </div>
          </div>

          <div style={{ textAlign: 'center', fontSize: '1rem', color: 'var(--text-muted)', borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '1.5rem' }}>
            <p>{personalInfo.footerText || `${personalInfo.name || 'Logeshwaran G'} | Thanks for visiting, come again 🫂`}</p>
          </div>
        </div>
      </footer>

      {/* Dedicated Clean ATS Resume Modal */}
      <ResumeModal
        isOpen={isResumeModalOpen}
        onClose={() => setIsResumeModalOpen(false)}
        personalInfo={personalInfo}
        skills={skills}
        projects={projects}
        education={education}
        certifications={certifications}
        onShowToast={showToast}
      />

      {/* Dedicated Isolated Printable Resume Document for Clean PDF/Print (No Website Copy) */}
      <PrintableResume
        personalInfo={personalInfo}
        skills={skills}
        projects={projects}
        education={education}
        certifications={certifications}
      />
    </div>
  );
}
