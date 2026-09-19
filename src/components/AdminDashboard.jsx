import React, { useState } from "react";
import confetti from "canvas-confetti";
import {
  LayoutDashboard,
  User,
  Zap,
  FolderGit2,
  Award,
  GraduationCap,
  Mail,
  Plus,
  Trash2,
  Edit,
  Save,
  RotateCcw,
  Download,
  ExternalLink,
  ArrowLeft,
  CheckCircle2,
  Eye,
  Sliders,
  Sparkles,
  ShieldCheck,
  Phone,
  MapPin,
  X,
  Upload,
  FolderUp,
  Image as ImageIcon,
  Star,
  Layers,
  FileSpreadsheet,
  LockKeyhole,
  FileText,
  Printer,
  HeartHandshake,
  BookOpen,
  Palette,
  Settings2,
  Tag,
  MessageCircle,
  Copy
} from "lucide-react";
import { usePortfolio } from "../context/PortfolioContext";
import { compressImage, processMultipleImages, formatImageUrl } from "../utils/imageUtils";
import { printCleanResume, handleResumeDownloadAction } from "../utils/resumePrinter";

export function AdminDashboard({ onExitAdmin, onLogout }) {
  const {
    personalInfo,
    updatePersonalInfo,
    sectionHeaders,
    updateSectionHeader,
    aboutHighlights,
    addAboutHighlight,
    updateAboutHighlight,
    deleteAboutHighlight,
    skills,
    categories,
    addCategory,
    updateCategory,
    deleteCategory,
    addSkill,
    updateSkill,
    deleteSkill,
    projects,
    addProject,
    updateProject,
    deleteProject,
    certifications,
    addCertification,
    updateCertification,
    deleteCertification,
    education,
    addEducation,
    updateEducation,
    deleteEducation,
    messages,
    deleteMessage,
    markMessageAsRead,
    resetAllToDefaults,
    exportBackupJSON,
    importBackupJSON,
    adminCredentials,
    updateAdminCredentials,
    saveAllChanges
  } = usePortfolio();

  const [activeTab, setActiveTab] = useState("dashboard");
  const [toast, setToast] = useState(null);

  // Edit/Modal States for Skills
  const [editingSkill, setEditingSkill] = useState(null);
  const [newSkillModal, setNewSkillModal] = useState(false);

  // Edit/Modal States for Categories
  const [editingCategory, setEditingCategory] = useState(null);
  const [newCategoryModal, setNewCategoryModal] = useState(false);
  const [categoryForm, setCategoryForm] = useState({ id: "", label: "" });

  // Edit/Modal States for About Highlights
  const [editingHighlight, setEditingHighlight] = useState(null);
  const [newHighlightModal, setNewHighlightModal] = useState(false);
  const [highlightForm, setHighlightForm] = useState({
    title: "",
    desc: "",
    icon: "BarChart3"
  });

  // Edit/Modal States for Projects
  const [editingProject, setEditingProject] = useState(null);
  const [newProjectModal, setNewProjectModal] = useState(false);

  const defaultProjectData = {
    title: "",
    category: "Data Analytics & Web",
    badge: "Featured",
    image: "/projects/project-1/img1.jpg",
    gallery: [
      "/projects/project-1/img1.jpg",
      "/projects/project-1/img2.jpg",
      "/projects/project-1/img3.jpg",
      "/projects/sales_bi_dashboard.jpg",
      "/projects/python_eda_charts.jpg",
      "/projects/react_web_app.jpg"
    ],
    description: "",
    tags: ["React", "Python", "SQL"],
    features: [
      "Dynamic interactive dashboards and KPI reporting",
      "Automated pipeline transforming raw transactions and datasets"
    ],
    github: "https://github.com/",
    live: "#"
  };

  const [projectForm, setProjectForm] = useState(defaultProjectData);
  const [customGalleryUrl, setCustomGalleryUrl] = useState("");

  // Edit/Modal States for Certifications
  const [editingCert, setEditingCert] = useState(null);
  const [newCertModal, setNewCertModal] = useState(false);

  const defaultCertData = {
    title: "",
    issuer: "Google",
    date: "Verified",
    credentialId: "",
    image: "/certificates/google_ai.jpg",
    description: "",
    skillsValidated: ["Generative AI", "Cloud Foundations", "Data Analytics"],
    badgeColor: "border-amber-500/40 bg-amber-500/10 text-amber-300",
    glowColor: "rgba(245, 158, 11, 0.4)"
  };

  const [certForm, setCertForm] = useState(defaultCertData);
  const [adminForm, setAdminForm] = useState(adminCredentials);

  // Edit/Modal States for Education
  const [editingEdu, setEditingEdu] = useState(null);
  const [newEduModal, setNewEduModal] = useState(false);

  const defaultEduData = {
    degree: "",
    major: "",
    institution: "",
    location: "",
    period: "2023 - Present",
    highlights: ["Coursework in Data Structures & Web Tech", "Hands-on projects and team leadership"]
  };

  const [eduForm, setEduForm] = useState(defaultEduData);

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3200);
  };

  const handleConfetti = () => {
    try {
      confetti({
        particleCount: 60,
        spread: 60,
        origin: { y: 0.6 }
      });
    } catch {
      // Gracefully ignore if canvas is restricted
    }
  };

  // Profile Image and Logo Upload Handler
  const handleProfileImageUpload = async (key, event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      showToast("Compressing & saving image...");
      const compressed = await compressImage(file, 800, 800, 0.85);
      updatePersonalInfo({ [key]: compressed });
      showToast("✓ Image updated successfully!");
    } catch (err) {
      console.error("Profile image upload failed", err);
      showToast("Failed to process image");
    }
  };

  // Certificate Image Upload Handler
  const handleCertImageUpload = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      showToast("Compressing certificate visual...");
      const compressed = await compressImage(file, 1200, 850, 0.85);
      setCertForm((prev) => ({ ...prev, image: compressed }));
      showToast("✓ Certificate visual attached!");
    } catch (err) {
      console.error("Cert image upload failed", err);
      showToast("Failed to process certificate image");
    }
  };

  // Single Project Cover Image Upload Handler
  const handleProjectCoverUpload = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      showToast("Compressing cover image...");
      const compressed = await compressImage(file, 1200, 850, 0.82);
      setProjectForm((prev) => {
        const currentGallery = prev.gallery || [];
        const updatedGallery = currentGallery.includes(compressed)
          ? currentGallery
          : [compressed, ...currentGallery];
        return {
          ...prev,
          image: compressed,
          gallery: updatedGallery
        };
      });
      showToast("Cover image updated & added to gallery!");
    } catch (err) {
      console.error("Cover upload failed", err);
      showToast("Failed to process cover image");
    }
  };

  // Multiple project gallery upload
  const handleProjectGalleryUpload = async (event) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;
    try {
      showToast(`Compressing ${files.length} folder images...`);
      const compressedImages = await processMultipleImages(files, 1200, 850, 0.82);
      if (compressedImages.length === 0) {
        showToast("No valid image files found");
        return;
      }

      setProjectForm((prev) => {
        const current = prev.gallery || [];
        const combined = [...current, ...compressedImages];
        return {
          ...prev,
          image: prev.image || compressedImages[0],
          gallery: combined
        };
      });
      showToast(`✓ Added ${compressedImages.length} images to project gallery!`);
    } catch (err) {
      console.error("Gallery batch upload failed", err);
      showToast("Failed to upload folder images");
    }
  };

  const handleRemoveGalleryImage = (indexToRemove) => {
    setProjectForm((prev) => {
      const updated = prev.gallery.filter((_, idx) => idx !== indexToRemove);
      const isRemovingCover = prev.image === prev.gallery[indexToRemove];
      const newCover = isRemovingCover
        ? (updated[0] || "/projects/project-1/img1.jpg")
        : prev.image;

      return {
        ...prev,
        image: newCover,
        gallery: updated
      };
    });
    showToast("Image removed from gallery");
  };

  const handleSetAsCover = (imgSrc) => {
    setProjectForm((prev) => ({
      ...prev,
      image: imgSrc
    }));
    showToast("Set as primary cover image!");
  };

  const handleAddCustomGalleryUrl = () => {
    if (!customGalleryUrl.trim()) return;
    const url = customGalleryUrl.trim();
    setProjectForm((prev) => ({
      ...prev,
      gallery: [...(prev.gallery || []), url]
    }));
    setCustomGalleryUrl("");
    showToast("Added image path to gallery!");
  };

  // Resume File Upload Handler
  const handleResumeFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      updatePersonalInfo({
        resumeUrl: event.target.result,
        resumeFileName: file.name
      });
      showToast(`✓ Custom resume "${file.name}" attached successfully!`);
    };
    reader.readAsDataURL(file);
  };

  // Import JSON file handler
  const handleImportJSONFile = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const res = importBackupJSON(event.target.result);
      if (res.success) {
        handleConfetti();
        showToast("✓ Portfolio data restored from JSON backup!");
      } else {
        showToast(`Import failed: ${res.error}`);
      }
    };
    reader.readAsText(file);
  };

  // Skill default form
  const defaultSkillForm = {
    name: "",
    level: 85,
    category: "analytics",
    icon: "Database",
    accent: "#38bdf8",
    glow: "rgba(56, 189, 248, 0.45)",
    badge: "Core Stack",
    desc: ""
  };
  const [skillForm, setSkillForm] = useState(defaultSkillForm);

  return (
    <div className="admin-dashboard-container">
      {/* Toast Alert */}
      {toast && (
        <div className="toast-notice">
          <CheckCircle2 size={18} />
          <span>{toast}</span>
        </div>
      )}

      {/* Admin Top Header */}
      <header className="admin-header">
        <div className="admin-header-brand">
          <div className="admin-badge-pill">CMS v2.0</div>
          <h1 className="admin-title">
            Site Manager
          </h1>
        </div>

        <div className="admin-header-actions">
          <button
            onClick={() => {
              exportBackupJSON();
              showToast("Backup JSON exported!");
            }}
            className="chip-btn admin-desktop-only"
            title="Export Full Site Backup"
          >
            <Download size={14} /> Export Backup
          </button>

          <label className="chip-btn admin-desktop-only" style={{ cursor: "pointer" }} title="Restore Backup JSON">
            <Upload size={14} /> Import Backup
            <input type="file" accept=".json" onChange={handleImportJSONFile} style={{ display: "none" }} />
          </label>

          <button
            onClick={() => {
              if (window.confirm("Are you sure you want to reset all portfolio data to defaults?")) {
                resetAllToDefaults();
                showToast("Portfolio reset to original defaults");
              }
            }}
            className="chip-btn admin-desktop-only"
            style={{ color: "#f43f5e", borderColor: "rgba(244, 63, 94, 0.3)" }}
            title="Reset All Changes"
          >
            <RotateCcw size={14} /> Reset
          </button>

          <button onClick={onExitAdmin} className="btn-glow" style={{ padding: "0.45rem 0.95rem", fontSize: "0.82rem" }}>
            <Eye size={14} /> <span>Live Site</span>
          </button>

          <button onClick={onLogout} className="chip-btn" style={{ padding: "0.45rem 0.75rem", fontSize: "0.82rem" }} title="Sign Out">
            <LockKeyhole size={13} /> <span className="admin-btn-text">Logout</span>
          </button>
        </div>
      </header>

      {/* Main Admin Workspace Layout */}
      <div className="admin-workspace">
        {/* Left Navigation Sidebar */}
        <aside className="admin-sidebar">
          <div className="admin-sidebar-nav">
            <button
              onClick={() => setActiveTab("dashboard")}
              className={`admin-nav-item ${activeTab === "dashboard" ? "active" : ""}`}
            >
              <LayoutDashboard size={16} />
              <span>Overview</span>
            </button>

            <button
              onClick={() => setActiveTab("profile")}
              className={`admin-nav-item ${activeTab === "profile" ? "active" : ""}`}
            >
              <User size={16} />
              <span>Profile & Hero</span>
            </button>

            <button
              onClick={() => setActiveTab("about")}
              className={`admin-nav-item ${activeTab === "about" ? "active" : ""}`}
            >
              <HeartHandshake size={16} />
              <span>About ({aboutHighlights?.length || 0})</span>
            </button>

            <button
              onClick={() => setActiveTab("skills")}
              className={`admin-nav-item ${activeTab === "skills" ? "active" : ""}`}
            >
              <Zap size={16} />
              <span>Skills ({skills.length})</span>
            </button>

            <button
              onClick={() => setActiveTab("projects")}
              className={`admin-nav-item ${activeTab === "projects" ? "active" : ""}`}
            >
              <FolderGit2 size={16} />
              <span>Projects ({projects.length})</span>
            </button>

            <button
              onClick={() => setActiveTab("certifications")}
              className={`admin-nav-item ${activeTab === "certifications" ? "active" : ""}`}
            >
              <Award size={16} />
              <span>Certs ({certifications.length})</span>
            </button>

            <button
              onClick={() => setActiveTab("education")}
              className={`admin-nav-item ${activeTab === "education" ? "active" : ""}`}
            >
              <GraduationCap size={16} />
              <span>Education</span>
            </button>

            <button
              onClick={() => setActiveTab("resume")}
              className={`admin-nav-item ${activeTab === "resume" ? "active" : ""}`}
            >
              <FileText size={16} />
              <span>Resume & CV</span>
            </button>

            <button
              onClick={() => setActiveTab("sections")}
              className={`admin-nav-item ${activeTab === "sections" ? "active" : ""}`}
            >
              <Tag size={16} />
              <span>Section Titles</span>
            </button>

            <button
              onClick={() => setActiveTab("inbox")}
              className={`admin-nav-item ${activeTab === "inbox" ? "active" : ""}`}
            >
              <Mail size={16} />
              <span>Inbox ({messages.length})</span>
            </button>

            <button
              onClick={() => setActiveTab("settings")}
              className={`admin-nav-item ${activeTab === "settings" ? "active" : ""}`}
            >
              <Sliders size={16} />
              <span>Security & Data</span>
            </button>
          </div>

          <div className="admin-sidebar-footer admin-desktop-only">
            <div style={{ fontSize: "0.75rem", color: "var(--text-muted)", marginBottom: "0.5rem" }}>
              Status: <span style={{ color: "#34d399", fontWeight: 700 }}>Active Universal CMS</span>
            </div>
            <div style={{ display: "grid", gap: "0.5rem" }}>
              <button onClick={onLogout} className="btn-secondary" style={{ width: "100%", justifyContent: "center", fontSize: "0.82rem" }}>
                <LockKeyhole size={14} /> Sign Out
              </button>
              <button onClick={onExitAdmin} className="btn-secondary" style={{ width: "100%", justifyContent: "center", fontSize: "0.82rem" }}>
                <ArrowLeft size={14} /> Exit Admin
              </button>
            </div>
          </div>
        </aside>

        {/* Right Content Workspace */}
        <main className="admin-main-content">
          {/* =========================================================
              TAB 1: DASHBOARD OVERVIEW
              ========================================================= */}
          {activeTab === "dashboard" && (
            <div className="admin-tab-pane">
              <div className="admin-pane-header">
                <div>
                  <h2 className="admin-pane-title">CMS Dashboard Overview</h2>
                  <p className="admin-pane-desc">Every element on your portfolio is fully customizable from this panel.</p>
                </div>
                <button onClick={onExitAdmin} className="btn-glow">
                  <ExternalLink size={16} /> Open Live Site
                </button>
              </div>

              <div className="admin-stats-grid">
                <div className="glass-card admin-stat-card" onClick={() => setActiveTab("skills")} style={{ cursor: "pointer" }}>
                  <div className="admin-stat-icon" style={{ background: "rgba(56, 189, 248, 0.15)", color: "#38bdf8" }}>
                    <Zap size={24} />
                  </div>
                  <div>
                    <div className="admin-stat-number">{skills.length}</div>
                    <div className="admin-stat-label">3D Interactive Skills ({categories.length} Categories)</div>
                  </div>
                </div>

                <div className="glass-card admin-stat-card" onClick={() => setActiveTab("projects")} style={{ cursor: "pointer" }}>
                  <div className="admin-stat-icon" style={{ background: "rgba(99, 102, 241, 0.15)", color: "#818cf8" }}>
                    <FolderGit2 size={24} />
                  </div>
                  <div>
                    <div className="admin-stat-number">{projects.length}</div>
                    <div className="admin-stat-label">Featured Projects (Skiper48 / 30)</div>
                  </div>
                </div>

                <div className="glass-card admin-stat-card" onClick={() => setActiveTab("certifications")} style={{ cursor: "pointer" }}>
                  <div className="admin-stat-icon" style={{ background: "rgba(245, 158, 11, 0.15)", color: "#fbbf24" }}>
                    <Award size={24} />
                  </div>
                  <div>
                    <div className="admin-stat-number">{certifications.length}</div>
                    <div className="admin-stat-label">Verified Certifications</div>
                  </div>
                </div>

                <div className="glass-card admin-stat-card" onClick={() => setActiveTab("inbox")} style={{ cursor: "pointer" }}>
                  <div className="admin-stat-icon" style={{ background: "rgba(16, 185, 129, 0.15)", color: "#34d399" }}>
                    <Mail size={24} />
                  </div>
                  <div>
                    <div className="admin-stat-number">{messages.length}</div>
                    <div className="admin-stat-label">Contact Messages ({messages.filter(m => !m.read).length} Unread)</div>
                  </div>
                </div>
              </div>

              {/* Quick Actions Bar */}
              <div className="glass-card" style={{ padding: "1.75rem", marginTop: "1.5rem" }}>
                <h3 style={{ fontSize: "1.15rem", fontWeight: 700, marginBottom: "1rem" }}>⚡ Quick Configuration Actions</h3>
                <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
                  <button onClick={() => setActiveTab("profile")} className="btn-secondary" style={{ fontSize: "0.85rem" }}>
                    <User size={15} /> Edit Hero & Personal Info
                  </button>
                  <button onClick={() => setActiveTab("sections")} className="btn-secondary" style={{ fontSize: "0.85rem" }}>
                    <Tag size={15} /> Edit Section Headings
                  </button>
                  <button onClick={() => setActiveTab("about")} className="btn-secondary" style={{ fontSize: "0.85rem" }}>
                    <HeartHandshake size={15} /> Edit About Cards
                  </button>
                  <button onClick={() => setActiveTab("resume")} className="btn-secondary" style={{ fontSize: "0.85rem" }}>
                    <FileText size={15} /> Manage Resume & CV
                  </button>
                  <button onClick={() => setNewProjectModal(true)} className="btn-glow" style={{ fontSize: "0.85rem" }}>
                    <Plus size={15} /> Add New Project
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* =========================================================
              TAB 2: PROFILE, HERO & BRAND
              ========================================================= */}
          {activeTab === "profile" && (
            <div className="admin-tab-pane">
              <div className="admin-pane-header">
                <div>
                  <h2 className="admin-pane-title">Profile, Hero & Brand Identity</h2>
                  <p className="admin-pane-desc">Configure your headline, animated typewriter roles, brand name, stats counters, and contact details.</p>
                </div>
              </div>

              <div className="glass-card" style={{ padding: "2rem" }}>
                <div className="admin-form-grid">
                  {/* Logo Image */}
                  <div className="form-group profile-image-setting">
                    <label className="form-label">Navbar Logo Image</label>
                    <div className="image-upload-row">
                      <div className="logo-badge image-upload-preview">
                        {personalInfo.logoImage ? <img src={personalInfo.logoImage} alt="Logo preview" /> : "LG"}
                      </div>
                      <div>
                        <input type="file" accept="image/*" onChange={(e) => handleProfileImageUpload("logoImage", e)} />
                        {personalInfo.logoImage && (
                          <button type="button" className="text-button" onClick={() => updatePersonalInfo({ logoImage: "" })}>Remove logo</button>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Profile Photo */}
                  <div className="form-group profile-image-setting">
                    <label className="form-label">Hero Profile Photo</label>
                    <div className="image-upload-row">
                      <div className="profile-image-preview">
                        {personalInfo.profileImage ? <img src={personalInfo.profileImage} alt="Profile preview" /> : "LG"}
                      </div>
                      <div>
                        <input type="file" accept="image/*" onChange={(e) => handleProfileImageUpload("profileImage", e)} />
                        {personalInfo.profileImage && (
                          <button type="button" className="text-button" onClick={() => updatePersonalInfo({ profileImage: "" })}>Remove photo</button>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Full Name */}
                  <div className="form-group">
                    <label className="form-label">Full Name</label>
                    <input
                      type="text"
                      className="form-input"
                      value={personalInfo.name}
                      onChange={(e) => updatePersonalInfo({ name: e.target.value })}
                    />
                  </div>

                  {/* Brand Title in Navbar */}
                  <div className="form-group">
                    <label className="form-label">Navbar Brand Text</label>
                    <input
                      type="text"
                      className="form-input"
                      placeholder="Logeshwaran.dev"
                      value={personalInfo.brandName || ""}
                      onChange={(e) => updatePersonalInfo({ brandName: e.target.value })}
                    />
                  </div>

                  {/* Hero Greeting */}
                  <div className="form-group">
                    <label className="form-label">Hero Title Greeting</label>
                    <input
                      type="text"
                      className="form-input"
                      placeholder="Hi, I'm"
                      value={personalInfo.greeting || ""}
                      onChange={(e) => updatePersonalInfo({ greeting: e.target.value })}
                    />
                  </div>

                  {/* Status Badge */}
                  <div className="form-group">
                    <label className="form-label">Availability Status Badge</label>
                    <input
                      type="text"
                      className="form-input"
                      placeholder="Available for Full-time Roles & Projects"
                      value={personalInfo.statusBadge || ""}
                      onChange={(e) => updatePersonalInfo({ statusBadge: e.target.value })}
                    />
                  </div>

                  {/* Primary Role */}
                  <div className="form-group">
                    <label className="form-label">Primary Role Headline</label>
                    <input
                      type="text"
                      className="form-input"
                      value={personalInfo.roleTitle}
                      onChange={(e) => updatePersonalInfo({ roleTitle: e.target.value })}
                    />
                  </div>

                  {/* Email */}
                  <div className="form-group">
                    <label className="form-label">Email Address</label>
                    <input
                      type="email"
                      className="form-input"
                      value={personalInfo.email}
                      onChange={(e) => updatePersonalInfo({ email: e.target.value })}
                    />
                  </div>

                  {/* Phone */}
                  <div className="form-group">
                    <label className="form-label">Phone Number</label>
                    <input
                      type="text"
                      className="form-input"
                      value={personalInfo.phone}
                      onChange={(e) => updatePersonalInfo({ phone: e.target.value })}
                    />
                  </div>

                  {/* Location */}
                  <div className="form-group">
                    <label className="form-label">Location (City, District, State)</label>
                    <input
                      type="text"
                      className="form-input"
                      value={personalInfo.location}
                      onChange={(e) => updatePersonalInfo({ location: e.target.value })}
                    />
                  </div>

                  {/* GitHub Profile */}
                  <div className="form-group">
                    <label className="form-label">GitHub Profile URL</label>
                    <input
                      type="url"
                      className="form-input"
                      placeholder="https://github.com/your-username"
                      value={personalInfo.socials?.github || ""}
                      onChange={(e) => updatePersonalInfo({ socials: { ...personalInfo.socials, github: e.target.value } })}
                    />
                  </div>

                  {/* LinkedIn Profile */}
                  <div className="form-group">
                    <label className="form-label">LinkedIn Profile URL</label>
                    <input
                      type="url"
                      className="form-input"
                      placeholder="https://www.linkedin.com/in/your-profile"
                      value={personalInfo.socials?.linkedin || ""}
                      onChange={(e) => updatePersonalInfo({ socials: { ...personalInfo.socials, linkedin: e.target.value } })}
                    />
                  </div>

                  {/* Typewriter Roles */}
                  <div className="form-group" style={{ gridColumn: "1 / -1" }}>
                    <label className="form-label">Animated Typewriter Roles (comma-separated)</label>
                    <input
                      type="text"
                      className="form-input"
                      value={personalInfo.typingRoles ? personalInfo.typingRoles.join(", ") : ""}
                      onChange={(e) => updatePersonalInfo({ typingRoles: e.target.value.split(",").map((s) => s.trim()) })}
                    />
                  </div>

                  {/* Hero Summary */}
                  <div className="form-group" style={{ gridColumn: "1 / -1" }}>
                    <label className="form-label">Hero Bio Summary</label>
                    <textarea
                      className="form-textarea"
                      rows={4}
                      value={personalInfo.summary}
                      onChange={(e) => updatePersonalInfo({ summary: e.target.value })}
                    />
                  </div>

                  {/* Footer Text */}
                  <div className="form-group" style={{ gridColumn: "1 / -1" }}>
                    <label className="form-label">Footer Closing Note / Copyright</label>
                    <input
                      type="text"
                      className="form-input"
                      placeholder="Logeshwaran G | Thanks for visiting, come again 🫂"
                      value={personalInfo.footerText || ""}
                      onChange={(e) => updatePersonalInfo({ footerText: e.target.value })}
                    />
                  </div>
                </div>

                {/* Hero Stats Matrix Editor */}
                <div style={{ marginTop: "2rem", borderTop: "1px solid rgba(255, 255, 255, 0.08)", paddingTop: "1.5rem" }}>
                  <h3 style={{ fontSize: "1.1rem", fontWeight: 700, marginBottom: "0.5rem" }}>📊 Hero Card Statistics Matrix</h3>
                  <p className="admin-pane-desc" style={{ marginBottom: "1rem" }}>
                    Edit the 4 metric highlights displayed on the floating hero profile card.
                  </p>

                  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "1rem" }}>
                    {(personalInfo.stats || []).map((stat, idx) => (
                      <div key={idx} className="glass-card" style={{ padding: "1rem", background: "rgba(255, 255, 255, 0.03)" }}>
                        <div className="form-group" style={{ marginBottom: "0.5rem" }}>
                          <label className="form-label" style={{ fontSize: "0.78rem" }}>Stat Label</label>
                          <input
                            type="text"
                            className="form-input"
                            value={stat.label}
                            onChange={(e) => {
                              const newStats = [...personalInfo.stats];
                              newStats[idx] = { ...newStats[idx], label: e.target.value };
                              updatePersonalInfo({ stats: newStats });
                            }}
                          />
                        </div>
                        <div style={{ display: "flex", gap: "0.5rem" }}>
                          <div className="form-group" style={{ flex: 1, marginBottom: 0 }}>
                            <label className="form-label" style={{ fontSize: "0.78rem" }}>Value</label>
                            <input
                              type="text"
                              className="form-input"
                              value={stat.value}
                              onChange={(e) => {
                                const newStats = [...personalInfo.stats];
                                newStats[idx] = { ...newStats[idx], value: e.target.value };
                                updatePersonalInfo({ stats: newStats });
                              }}
                            />
                          </div>
                          <div className="form-group" style={{ flex: 1, marginBottom: 0 }}>
                            <label className="form-label" style={{ fontSize: "0.78rem" }}>Suffix</label>
                            <input
                              type="text"
                              className="form-input"
                              value={stat.suffix || ""}
                              onChange={(e) => {
                                const newStats = [...personalInfo.stats];
                                newStats[idx] = { ...newStats[idx], suffix: e.target.value };
                                updatePersonalInfo({ stats: newStats });
                              }}
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div style={{ marginTop: "1.75rem", display: "flex", justifyContent: "flex-end" }}>
                  <button
                    onClick={() => {
                      saveAllChanges();
                      handleConfetti();
                      showToast("✓ Profile & Hero settings saved to live website!");
                    }}
                    className="btn-glow"
                    style={{ width: "100%", maxWidth: "260px", justifyContent: "center" }}
                  >
                    <Save size={16} /> Save Profile Changes
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* =========================================================
              TAB 3: ABOUT SECTION & HIGHLIGHTS
              ========================================================= */}
          {activeTab === "about" && (
            <div className="admin-tab-pane">
              <div className="admin-pane-header">
                <div>
                  <h2 className="admin-pane-title">About Section & Value Propositions</h2>
                  <p className="admin-pane-desc">Manage the About section heading and customizable feature cards.</p>
                </div>
                <button
                  onClick={() => {
                    setEditingHighlight(null);
                    setHighlightForm({ title: "", desc: "", icon: "BarChart3" });
                    setNewHighlightModal(true);
                  }}
                  className="btn-glow"
                >
                  <Plus size={16} /> Add Highlight Card
                </button>
              </div>

              {/* Section Header Editor */}
              <div className="glass-card" style={{ padding: "1.75rem", marginBottom: "1.5rem" }}>
                <h3 style={{ fontSize: "1.1rem", fontWeight: 700, marginBottom: "1rem" }}>📝 About Section Headings</h3>
                <div className="admin-form-grid">
                  <div className="form-group">
                    <label className="form-label">Tag Pill Text</label>
                    <input
                      type="text"
                      className="form-input"
                      value={sectionHeaders?.about?.tag || ""}
                      onChange={(e) => updateSectionHeader("about", { tag: e.target.value })}
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Main Section Title</label>
                    <input
                      type="text"
                      className="form-input"
                      value={sectionHeaders?.about?.title || ""}
                      onChange={(e) => updateSectionHeader("about", { title: e.target.value })}
                    />
                  </div>
                  <div className="form-group" style={{ gridColumn: "1 / -1" }}>
                    <label className="form-label">Section Subtitle / Description</label>
                    <textarea
                      className="form-textarea"
                      rows={2}
                      value={sectionHeaders?.about?.subtitle || ""}
                      onChange={(e) => updateSectionHeader("about", { subtitle: e.target.value })}
                    />
                  </div>
                </div>
              </div>

              {/* Highlight Cards Grid */}
              <div className="admin-items-grid">
                {(aboutHighlights || []).map((highlight, index) => (
                  <div key={index} className="glass-card admin-item-card">
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "0.75rem" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                        <div
                          style={{
                            width: "2.4rem",
                            height: "2.4rem",
                            borderRadius: "0.5rem",
                            background: "rgba(56, 189, 248, 0.15)",
                            color: "#38bdf8",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontWeight: 700
                          }}
                        >
                          {highlight.icon?.slice(0, 2) || "★"}
                        </div>
                        <div>
                          <h3 style={{ fontSize: "1.1rem", fontWeight: 700, margin: 0 }}>{highlight.title}</h3>
                          <span style={{ fontSize: "0.8rem", color: "#94a3b8" }}>Icon: {highlight.icon}</span>
                        </div>
                      </div>

                      <div className="admin-item-actions">
                        <button
                          onClick={() => {
                            setEditingHighlight(index);
                            setHighlightForm(highlight);
                            setNewHighlightModal(true);
                          }}
                          className="chip-btn"
                          title="Edit Card"
                        >
                          <Edit size={14} />
                        </button>
                        <button
                          onClick={() => {
                            if (window.confirm("Delete this highlight card?")) {
                              deleteAboutHighlight(index);
                              showToast("Highlight card deleted");
                            }
                          }}
                          className="chip-btn delete-btn"
                          title="Delete Card"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>

                    <p style={{ fontSize: "0.9rem", color: "var(--text-secondary)", lineHeight: 1.5, margin: 0 }}>
                      {highlight.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* =========================================================
              TAB 4: SKILLS MATRIX & CATEGORIES
              ========================================================= */}
          {activeTab === "skills" && (
            <div className="admin-tab-pane">
              <div className="admin-pane-header">
                <div>
                  <h2 className="admin-pane-title">Skills Matrix & Category Manager</h2>
                  <p className="admin-pane-desc">Add, edit, change proficiency levels, custom glow colors, and categories.</p>
                </div>
                <div style={{ display: "flex", gap: "0.65rem" }}>
                  <button
                    onClick={() => {
                      setEditingCategory(null);
                      setCategoryForm({ id: "", label: "" });
                      setNewCategoryModal(true);
                    }}
                    className="btn-secondary"
                  >
                    <Plus size={16} /> Add Category
                  </button>
                  <button
                    onClick={() => {
                      setEditingSkill(null);
                      setSkillForm(defaultSkillForm);
                      setNewSkillModal(true);
                    }}
                    className="btn-glow"
                  >
                    <Plus size={16} /> Add New Skill
                  </button>
                </div>
              </div>

              {/* Section Header Editor */}
              <div className="glass-card" style={{ padding: "1.75rem", marginBottom: "1.5rem" }}>
                <h3 style={{ fontSize: "1.1rem", fontWeight: 700, marginBottom: "1rem" }}>📝 Skills Section Headings</h3>
                <div className="admin-form-grid">
                  <div className="form-group">
                    <label className="form-label">Tag Pill Text</label>
                    <input
                      type="text"
                      className="form-input"
                      value={sectionHeaders?.skills?.tag || ""}
                      onChange={(e) => updateSectionHeader("skills", { tag: e.target.value })}
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Main Section Title</label>
                    <input
                      type="text"
                      className="form-input"
                      value={sectionHeaders?.skills?.title || ""}
                      onChange={(e) => updateSectionHeader("skills", { title: e.target.value })}
                    />
                  </div>
                  <div className="form-group" style={{ gridColumn: "1 / -1" }}>
                    <label className="form-label">Section Subtitle / Description</label>
                    <textarea
                      className="form-textarea"
                      rows={2}
                      value={sectionHeaders?.skills?.subtitle || ""}
                      onChange={(e) => updateSectionHeader("skills", { subtitle: e.target.value })}
                    />
                  </div>
                </div>
              </div>

              {/* Category Filter Pills Manager */}
              <div className="glass-card" style={{ padding: "1.5rem", marginBottom: "1.5rem" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.75rem" }}>
                  <h4 style={{ fontSize: "1rem", fontWeight: 700, margin: 0 }}>Category Tabs</h4>
                  <span style={{ fontSize: "0.8rem", color: "#94a3b8" }}>{categories.length} Categories</span>
                </div>
                <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
                  {categories.map((cat) => (
                    <div
                      key={cat.id}
                      style={{
                        padding: "0.4rem 0.85rem",
                        borderRadius: "0.5rem",
                        background: "rgba(255, 255, 255, 0.06)",
                        border: "1px solid rgba(255, 255, 255, 0.12)",
                        display: "flex",
                        alignItems: "center",
                        gap: "0.5rem",
                        fontSize: "0.85rem"
                      }}
                    >
                      <span>{cat.label}</span>
                      {cat.id !== "all" && (
                        <button
                          type="button"
                          onClick={() => {
                            if (window.confirm(`Delete category "${cat.label}"?`)) {
                              deleteCategory(cat.id);
                              showToast("Category removed");
                            }
                          }}
                          style={{ background: "none", border: "none", color: "#f43f5e", cursor: "pointer", padding: 0 }}
                        >
                          <X size={13} />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Skills Grid */}
              <div className="admin-items-grid">
                {skills.map((skill, index) => (
                  <div key={index} className="glass-card admin-item-card">
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                        <div
                          style={{
                            width: "2.4rem",
                            height: "2.4rem",
                            borderRadius: "0.5rem",
                            background: `${skill.accent}20`,
                            color: skill.accent,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontWeight: 700
                          }}
                        >
                          {skill.icon?.slice(0, 2) || "⚡"}
                        </div>
                        <div>
                          <h3 style={{ fontSize: "1.1rem", fontWeight: 700, margin: 0 }}>{skill.name}</h3>
                          <span style={{ fontSize: "0.75rem", color: "var(--text-muted)", textTransform: "uppercase" }}>
                            {skill.category} • {skill.badge}
                          </span>
                        </div>
                      </div>

                      <div className="admin-item-actions">
                        <button
                          onClick={() => {
                            setEditingSkill(index);
                            setSkillForm(skill);
                            setNewSkillModal(true);
                          }}
                          className="chip-btn"
                          title="Edit Skill"
                        >
                          <Edit size={14} />
                        </button>
                        <button
                          onClick={() => {
                            if (window.confirm(`Delete skill "${skill.name}"?`)) {
                              deleteSkill(index);
                              showToast("Skill deleted");
                            }
                          }}
                          className="chip-btn delete-btn"
                          title="Delete Skill"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>

                    <div style={{ margin: "0.75rem 0" }}>
                      <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.85rem", marginBottom: "0.25rem" }}>
                        <span>Mastery Level</span>
                        <span style={{ fontWeight: 700, color: skill.accent }}>{skill.level}%</span>
                      </div>
                      <div className="progress-bar-bg">
                        <div
                          className="progress-bar-fill"
                          style={{
                            width: `${skill.level}%`,
                            background: skill.accent,
                            boxShadow: `0 0 10px ${skill.accent}`
                          }}
                        ></div>
                      </div>
                    </div>

                    <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)", margin: 0, lineHeight: 1.4 }}>
                      {skill.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* =========================================================
              TAB 5: FEATURED PROJECTS & GALLERIES
              ========================================================= */}
          {activeTab === "projects" && (
            <div className="admin-tab-pane">
              <div className="admin-pane-header">
                <div>
                  <h2 className="admin-pane-title">Featured Projects (Skiper48 / 30)</h2>
                  <p className="admin-pane-desc">Manage your projects, multi-image galleries, live URLs, and accomplishment bullets.</p>
                </div>
                <button
                  onClick={() => {
                    setEditingProject(null);
                    setProjectForm(defaultProjectData);
                    setNewProjectModal(true);
                  }}
                  className="btn-glow"
                >
                  <Plus size={16} /> Add New Project
                </button>
              </div>

              {/* Section Header Editor */}
              <div className="glass-card" style={{ padding: "1.75rem", marginBottom: "1.5rem" }}>
                <h3 style={{ fontSize: "1.1rem", fontWeight: 700, marginBottom: "1rem" }}>📝 Projects Section Headings</h3>
                <div className="admin-form-grid">
                  <div className="form-group">
                    <label className="form-label">Tag Pill Text</label>
                    <input
                      type="text"
                      className="form-input"
                      value={sectionHeaders?.projects?.tag || ""}
                      onChange={(e) => updateSectionHeader("projects", { tag: e.target.value })}
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Main Section Title</label>
                    <input
                      type="text"
                      className="form-input"
                      value={sectionHeaders?.projects?.title || ""}
                      onChange={(e) => updateSectionHeader("projects", { title: e.target.value })}
                    />
                  </div>
                  <div className="form-group" style={{ gridColumn: "1 / -1" }}>
                    <label className="form-label">Section Subtitle / Description</label>
                    <textarea
                      className="form-textarea"
                      rows={2}
                      value={sectionHeaders?.projects?.subtitle || ""}
                      onChange={(e) => updateSectionHeader("projects", { subtitle: e.target.value })}
                    />
                  </div>
                </div>
              </div>

              {/* Projects Grid */}
              <div className="admin-items-grid">
                {projects.map((proj) => (
                  <div key={proj.id} className="glass-card admin-item-card">
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "0.75rem" }}>
                      <div>
                        <div style={{ display: "flex", gap: "0.5rem", alignItems: "center", marginBottom: "0.25rem" }}>
                          <span className="badge-featured">{proj.badge || "Featured"}</span>
                          <span style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>{proj.category}</span>
                        </div>
                        <h3 style={{ fontSize: "1.15rem", fontWeight: 700, margin: 0 }}>{proj.title}</h3>
                      </div>

                      <div className="admin-item-actions">
                        <button
                          onClick={() => {
                            setEditingProject(proj.id);
                            setProjectForm(proj);
                            setNewProjectModal(true);
                          }}
                          className="chip-btn"
                          title="Edit Project"
                        >
                          <Edit size={14} />
                        </button>
                        <button
                          onClick={() => {
                            if (window.confirm(`Delete project "${proj.title}"?`)) {
                              deleteProject(proj.id);
                              showToast("Project deleted");
                            }
                          }}
                          className="chip-btn delete-btn"
                          title="Delete Project"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>

                    <p style={{ fontSize: "0.88rem", color: "var(--text-secondary)", lineHeight: 1.5, marginBottom: "0.75rem" }}>
                      {proj.description}
                    </p>

                    <div style={{ display: "flex", flexWrap: "wrap", gap: "0.35rem", marginBottom: "0.75rem" }}>
                      {proj.tags?.map((t, idx) => (
                        <span key={idx} style={{ fontSize: "0.75rem", padding: "0.2rem 0.5rem", borderRadius: "4px", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}>
                          {t}
                        </span>
                      ))}
                    </div>

                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: "0.8rem", color: "#94a3b8" }}>
                      <span>🖼️ {proj.gallery?.length || 1} Gallery Photos</span>
                      <div style={{ display: "flex", gap: "0.5rem" }}>
                        {proj.github && (
                          <a href={proj.github} target="_blank" rel="noreferrer" style={{ color: "#38bdf8", textDecoration: "none" }}>GitHub</a>
                        )}
                        {proj.live && proj.live !== "#" && (
                          <a href={proj.live} target="_blank" rel="noreferrer" style={{ color: "#34d399", textDecoration: "none" }}>Live Demo</a>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* =========================================================
              TAB 6: CERTIFICATIONS & CREDENTIALS
              ========================================================= */}
          {activeTab === "certifications" && (
            <div className="admin-tab-pane">
              <div className="admin-pane-header">
                <div>
                  <h2 className="admin-pane-title">Certifications & Verified Honors</h2>
                  <p className="admin-pane-desc">Manage certificates displayed in the 3D Inverted Coverflow perspective carousel.</p>
                </div>
                <button
                  onClick={() => {
                    setEditingCert(null);
                    setCertForm(defaultCertData);
                    setNewCertModal(true);
                  }}
                  className="btn-glow"
                >
                  <Plus size={16} /> Add Certificate
                </button>
              </div>

              {/* Section Header Editor */}
              <div className="glass-card" style={{ padding: "1.75rem", marginBottom: "1.5rem" }}>
                <h3 style={{ fontSize: "1.1rem", fontWeight: 700, marginBottom: "1rem" }}>📝 Certifications Section Headings</h3>
                <div className="admin-form-grid">
                  <div className="form-group">
                    <label className="form-label">Tag Pill Text</label>
                    <input
                      type="text"
                      className="form-input"
                      value={sectionHeaders?.certifications?.tag || ""}
                      onChange={(e) => updateSectionHeader("certifications", { tag: e.target.value })}
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Main Section Title</label>
                    <input
                      type="text"
                      className="form-input"
                      value={sectionHeaders?.certifications?.title || ""}
                      onChange={(e) => updateSectionHeader("certifications", { title: e.target.value })}
                    />
                  </div>
                  <div className="form-group" style={{ gridColumn: "1 / -1" }}>
                    <label className="form-label">Section Subtitle / Description</label>
                    <textarea
                      className="form-textarea"
                      rows={2}
                      value={sectionHeaders?.certifications?.subtitle || ""}
                      onChange={(e) => updateSectionHeader("certifications", { subtitle: e.target.value })}
                    />
                  </div>
                </div>
              </div>

              {/* Certifications Grid */}
              <div className="admin-items-grid">
                {certifications.map((cert) => (
                  <div key={cert.id} className="glass-card admin-item-card">
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "0.75rem" }}>
                      <div>
                        <div style={{ fontSize: "0.75rem", color: "#38bdf8", fontWeight: 700, textTransform: "uppercase" }}>
                          {cert.issuer} • {cert.date}
                        </div>
                        <h3 style={{ fontSize: "1.15rem", fontWeight: 700, margin: "2px 0 0 0" }}>{cert.title}</h3>
                        {cert.credentialId && (
                          <div style={{ fontSize: "0.75rem", color: "#94a3b8", fontFamily: "var(--font-mono)" }}>
                            ID: {cert.credentialId}
                          </div>
                        )}
                      </div>

                      <div className="admin-item-actions">
                        <button
                          onClick={() => {
                            setEditingCert(cert.id);
                            setCertForm(cert);
                            setNewCertModal(true);
                          }}
                          className="chip-btn"
                          title="Edit Certificate"
                        >
                          <Edit size={14} />
                        </button>
                        <button
                          onClick={() => {
                            if (window.confirm(`Delete certification "${cert.title}"?`)) {
                              deleteCertification(cert.id);
                              showToast("Certification deleted");
                            }
                          }}
                          className="chip-btn delete-btn"
                          title="Delete Certificate"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>

                    <p style={{ fontSize: "0.88rem", color: "var(--text-secondary)", lineHeight: 1.5, margin: "0 0 0.75rem 0" }}>
                      {cert.description}
                    </p>

                    <div style={{ display: "flex", flexWrap: "wrap", gap: "0.35rem" }}>
                      {cert.skillsValidated?.map((s, idx) => (
                        <span key={idx} style={{ fontSize: "0.75rem", padding: "0.2rem 0.5rem", borderRadius: "4px", background: "rgba(56, 189, 248, 0.08)", border: "1px solid rgba(56, 189, 248, 0.2)", color: "#38bdf8" }}>
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* =========================================================
              TAB 7: EDUCATION & ACADEMICS
              ========================================================= */}
          {activeTab === "education" && (
            <div className="admin-tab-pane">
              <div className="admin-pane-header">
                <div>
                  <h2 className="admin-pane-title">Education & Milestones</h2>
                  <p className="admin-pane-desc">Manage academic milestones displayed on the interactive timeline.</p>
                </div>
                <button
                  onClick={() => {
                    setEditingEdu(null);
                    setEduForm(defaultEduData);
                    setNewEduModal(true);
                  }}
                  className="btn-glow"
                >
                  <Plus size={16} /> Add Milestone
                </button>
              </div>

              {/* Section Header Editor */}
              <div className="glass-card" style={{ padding: "1.75rem", marginBottom: "1.5rem" }}>
                <h3 style={{ fontSize: "1.1rem", fontWeight: 700, marginBottom: "1rem" }}>📝 Education Section Headings</h3>
                <div className="admin-form-grid">
                  <div className="form-group">
                    <label className="form-label">Tag Pill Text</label>
                    <input
                      type="text"
                      className="form-input"
                      value={sectionHeaders?.education?.tag || ""}
                      onChange={(e) => updateSectionHeader("education", { tag: e.target.value })}
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Main Section Title</label>
                    <input
                      type="text"
                      className="form-input"
                      value={sectionHeaders?.education?.title || ""}
                      onChange={(e) => updateSectionHeader("education", { title: e.target.value })}
                    />
                  </div>
                  <div className="form-group" style={{ gridColumn: "1 / -1" }}>
                    <label className="form-label">Section Subtitle / Description</label>
                    <textarea
                      className="form-textarea"
                      rows={2}
                      value={sectionHeaders?.education?.subtitle || ""}
                      onChange={(e) => updateSectionHeader("education", { subtitle: e.target.value })}
                    />
                  </div>
                </div>
              </div>

              {/* Education Grid */}
              <div className="admin-items-grid">
                {education.map((edu, index) => (
                  <div key={index} className="glass-card admin-item-card">
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "0.5rem" }}>
                      <div>
                        <div style={{ fontSize: "0.8rem", color: "#818cf8", fontWeight: 700 }}>{edu.period}</div>
                        <h3 style={{ fontSize: "1.15rem", fontWeight: 700, margin: "2px 0 0 0" }}>{edu.degree}</h3>
                        <div style={{ fontSize: "0.88rem", color: "var(--text-secondary)" }}>
                          {edu.institution} — <em>{edu.location}</em>
                        </div>
                      </div>

                      <div className="admin-item-actions">
                        <button
                          onClick={() => {
                            setEditingEdu(index);
                            setEduForm(edu);
                            setNewEduModal(true);
                          }}
                          className="chip-btn"
                          title="Edit Milestone"
                        >
                          <Edit size={14} />
                        </button>
                        <button
                          onClick={() => {
                            if (window.confirm(`Delete education milestone "${edu.degree}"?`)) {
                              deleteEducation(index);
                              showToast("Milestone deleted");
                            }
                          }}
                          className="chip-btn delete-btn"
                          title="Delete Milestone"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>

                    <ul style={{ margin: "0.5rem 0 0 1rem", padding: 0, fontSize: "0.85rem", color: "var(--text-secondary)", lineHeight: 1.45 }}>
                      {edu.highlights?.map((h, hIdx) => (
                        <li key={hIdx} style={{ marginBottom: "0.25rem" }}>{h}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* =========================================================
              TAB 8: RESUME & CV MANAGER
              ========================================================= */}
          {activeTab === "resume" && (
            <div className="admin-tab-pane">
              <div className="admin-pane-header">
                <div>
                  <h2 className="admin-pane-title">Resume & CV Document Control</h2>
                  <p className="admin-pane-desc">Manage your ATS single/two-page resume generator or upload a custom attached PDF file.</p>
                </div>
                <div style={{ display: "flex", gap: "0.5rem" }}>
                  <button
                    type="button"
                    onClick={() => {
                      printCleanResume({ personalInfo, skills, projects, education, certifications });
                      showToast("Opening Clean ATS Resume print preview...");
                    }}
                    className="btn-secondary"
                  >
                    <Printer size={15} /> Test Clean ATS PDF
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      handleResumeDownloadAction(
                        { personalInfo, skills, projects, education, certifications },
                        {
                          onDirectDownload: () => showToast("Downloading attached resume file..."),
                          onFallbackPrint: () => showToast("Opening Clean ATS Resume print dialog...")
                        }
                      );
                    }}
                    className="btn-glow"
                  >
                    <Download size={15} /> Test Live Download
                  </button>
                </div>
              </div>

              <div className="glass-card" style={{ padding: "2rem" }}>
                <div className="admin-form-grid">
                  {/* Current Active Mode */}
                  <div className="form-group" style={{ gridColumn: "1 / -1" }}>
                    <label className="form-label">Active Download Mode</label>
                    <div
                      style={{
                        padding: "1rem 1.25rem",
                        borderRadius: "0.75rem",
                        background: personalInfo.resumeUrl ? "rgba(56, 189, 248, 0.08)" : "rgba(34, 197, 94, 0.08)",
                        border: personalInfo.resumeUrl ? "1px solid rgba(56, 189, 248, 0.25)" : "1px solid rgba(34, 197, 94, 0.25)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        flexWrap: "wrap",
                        gap: "0.75rem"
                      }}
                    >
                      <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                        <CheckCircle2 size={20} style={{ color: personalInfo.resumeUrl ? "#38bdf8" : "#22c55e" }} />
                        <div>
                          <div style={{ fontWeight: 600, fontSize: "0.95rem", color: "#f8fafc" }}>
                            {personalInfo.resumeUrl
                              ? `Custom Attached Resume: ${personalInfo.resumeFileName || "Custom PDF / Document"}`
                              : "Automated Clean ATS Resume Document (Single/Two-page PDF with 0 website copy)"}
                          </div>
                          <div style={{ fontSize: "0.82rem", color: "#94a3b8" }}>
                            {personalInfo.resumeUrl
                              ? "Visitors receive your uploaded custom resume file directly."
                              : "Visitors receive an auto-generated, perfectly formatted ATS single/two-page resume document matching your exact resume."}
                          </div>
                        </div>
                      </div>

                      {personalInfo.resumeUrl && (
                        <button
                          type="button"
                          onClick={() => {
                            updatePersonalInfo({ resumeUrl: "", resumeFileName: "" });
                            showToast("Reverted to Automated Clean ATS Resume!");
                          }}
                          className="text-button"
                          style={{ color: "#ef4444", fontSize: "0.82rem" }}
                        >
                          Remove Attached File & Use Auto ATS Resume
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Upload Custom PDF File */}
                  <div className="form-group">
                    <label className="form-label">Upload Custom Resume File (.pdf / .doc)</label>
                    <div className="image-upload-row">
                      <input
                        type="file"
                        accept=".pdf,.doc,.docx,application/pdf"
                        onChange={handleResumeFileUpload}
                        style={{ fontSize: "0.85rem" }}
                      />
                    </div>
                    <span style={{ fontSize: "0.75rem", color: "#94a3b8" }}>
                      Upload your own pre-made PDF resume to replace the auto-generated version.
                    </span>
                  </div>

                  {/* Custom External URL */}
                  <div className="form-group">
                    <label className="form-label">Or Provide External Resume Download Link (URL)</label>
                    <input
                      type="url"
                      className="form-input"
                      placeholder="https://drive.google.com/file/... or https://github.com/..."
                      value={personalInfo.resumeUrl?.startsWith("data:") ? "" : personalInfo.resumeUrl || ""}
                      onChange={(e) => updatePersonalInfo({ resumeUrl: e.target.value.trim(), resumeFileName: "Logeshwaran_Resume.pdf" })}
                    />
                    <span style={{ fontSize: "0.75rem", color: "#94a3b8" }}>
                      Google Drive link, Dropbox, or GitHub raw PDF link.
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* =========================================================
              TAB 9: MASTER SECTION HEADINGS
              ========================================================= */}
          {activeTab === "sections" && (
            <div className="admin-tab-pane">
              <div className="admin-pane-header">
                <div>
                  <h2 className="admin-pane-title">Master Section Headings & Tags</h2>
                  <p className="admin-pane-desc">Edit the Tag Pill, Main Title, and Subtitle description for every section across the entire website.</p>
                </div>
              </div>

              <div style={{ display: "grid", gap: "1.5rem" }}>
                {["about", "skills", "projects", "certifications", "education", "contact"].map((secKey) => (
                  <div key={secKey} className="glass-card" style={{ padding: "1.75rem" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "1rem" }}>
                      <Tag size={18} style={{ color: "#38bdf8" }} />
                      <h3 style={{ fontSize: "1.15rem", fontWeight: 700, margin: 0, textTransform: "capitalize" }}>
                        {secKey} Section Header
                      </h3>
                    </div>

                    <div className="admin-form-grid">
                      <div className="form-group">
                        <label className="form-label">Tag Pill Text</label>
                        <input
                          type="text"
                          className="form-input"
                          value={sectionHeaders?.[secKey]?.tag || ""}
                          onChange={(e) => updateSectionHeader(secKey, { tag: e.target.value })}
                        />
                      </div>
                      <div className="form-group">
                        <label className="form-label">Main Section Heading</label>
                        <input
                          type="text"
                          className="form-input"
                          value={sectionHeaders?.[secKey]?.title || ""}
                          onChange={(e) => updateSectionHeader(secKey, { title: e.target.value })}
                        />
                      </div>
                      <div className="form-group" style={{ gridColumn: "1 / -1" }}>
                        <label className="form-label">Subtitle / Description</label>
                        <textarea
                          className="form-textarea"
                          rows={2}
                          value={sectionHeaders?.[secKey]?.subtitle || ""}
                          onChange={(e) => updateSectionHeader(secKey, { subtitle: e.target.value })}
                        />
                      </div>
                    </div>
                  </div>
                ))}

                <div style={{ marginTop: "1rem", display: "flex", justifyContent: "flex-end" }}>
                  <button
                    onClick={() => {
                      saveAllChanges();
                      handleConfetti();
                      showToast("✓ All Section Headings saved to live website!");
                    }}
                    className="btn-glow"
                    style={{ width: "100%", maxWidth: "260px", justifyContent: "center" }}
                  >
                    <Save size={16} /> Save Section Titles
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* =========================================================
              TAB 10: INBOX & CONTACT MESSAGES
              ========================================================= */}
          {activeTab === "inbox" && (
            <div className="admin-tab-pane">
              <div className="admin-pane-header">
                <div>
                  <h2 className="admin-pane-title">Contact Inquiries ({messages.length})</h2>
                  <p className="admin-pane-desc">Messages submitted by visitors via your website contact form.</p>
                </div>
              </div>

              {messages.length === 0 ? (
                <div className="glass-card" style={{ padding: "3rem", textAlign: "center" }}>
                  <Mail size={40} style={{ color: "#64748b", margin: "0 auto 1rem auto" }} />
                  <h3 style={{ fontSize: "1.2rem", fontWeight: 700, margin: "0 0 0.5rem 0" }}>No Inquiries Yet</h3>
                  <p style={{ color: "var(--text-secondary)", margin: 0 }}>
                    When visitors submit your contact form, inquiries will appear right here.
                  </p>
                </div>
              ) : (
                <div style={{ display: "grid", gap: "1rem" }}>
                  {messages.map((msg) => (
                    <div
                      key={msg.id}
                      className="glass-card"
                      style={{
                        padding: "1.5rem",
                        borderLeft: msg.read ? "3px solid #64748b" : "3px solid #38bdf8",
                        background: msg.read ? "rgba(15, 23, 42, 0.6)" : "rgba(15, 23, 42, 0.9)"
                      }}
                    >
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "0.75rem" }}>
                        <div>
                          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.25rem" }}>
                            {!msg.read && (
                              <span style={{ fontSize: "0.7rem", padding: "0.15rem 0.45rem", borderRadius: "4px", background: "rgba(56, 189, 248, 0.2)", color: "#38bdf8", fontWeight: 700 }}>
                                NEW
                              </span>
                            )}
                            <h3 style={{ fontSize: "1.1rem", fontWeight: 700, margin: 0 }}>{msg.subject || "Contact Submission"}</h3>
                          </div>
                          <div style={{ fontSize: "0.85rem", color: "#94a3b8" }}>
                            From: <strong style={{ color: "#f8fafc" }}>{msg.name}</strong> ({msg.email}) • {msg.date}
                          </div>
                        </div>

                        <div className="admin-item-actions">
                          <a
                            href={`mailto:${msg.email}?subject=Re: ${encodeURIComponent(msg.subject || "Portfolio Inquiry")}`}
                            className="chip-btn"
                            title="Reply via Email"
                          >
                            <Mail size={14} /> Reply
                          </a>
                          {!msg.read && (
                            <button
                              onClick={() => {
                                markMessageAsRead(msg.id);
                                showToast("Marked as read");
                              }}
                              className="chip-btn"
                              title="Mark as read"
                            >
                              <CheckCircle2 size={14} />
                            </button>
                          )}
                          <button
                            onClick={() => {
                              if (window.confirm("Delete this message?")) {
                                deleteMessage(msg.id);
                                showToast("Message deleted");
                              }
                            }}
                            className="chip-btn delete-btn"
                            title="Delete Message"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </div>

                      <p style={{ fontSize: "0.92rem", color: "#e2e8f0", lineHeight: 1.6, margin: 0, whiteSpace: "pre-wrap" }}>
                        {msg.message}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* =========================================================
              TAB 11: SECURITY & SYSTEM BACKUP
              ========================================================= */}
          {activeTab === "settings" && (
            <div className="admin-tab-pane">
              <div className="admin-pane-header">
                <div>
                  <h2 className="admin-pane-title">Security & System Backup</h2>
                  <p className="admin-pane-desc">Manage admin credentials, export/import JSON backups, and system reset.</p>
                </div>
              </div>

              {/* Admin Password Settings */}
              <div className="glass-card" style={{ padding: "2rem", marginBottom: "1.5rem" }}>
                <h3 style={{ fontSize: "1.15rem", fontWeight: 700, marginBottom: "1rem" }}>🔐 Change Admin Login Credentials</h3>
                <div className="admin-form-grid">
                  <div className="form-group">
                    <label className="form-label">Username</label>
                    <input
                      type="text"
                      className="form-input"
                      value={adminForm.username}
                      onChange={(e) => setAdminForm({ ...adminForm, username: e.target.value })}
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Password</label>
                    <input
                      type="password"
                      className="form-input"
                      value={adminForm.password}
                      onChange={(e) => setAdminForm({ ...adminForm, password: e.target.value })}
                    />
                  </div>
                </div>
                <div style={{ marginTop: "1rem", display: "flex", justifyContent: "flex-end" }}>
                  <button
                    onClick={() => {
                      updateAdminCredentials(adminForm);
                      handleConfetti();
                      showToast("Admin credentials updated successfully!");
                    }}
                    className="btn-glow"
                  >
                    <Save size={16} /> Update Credentials
                  </button>
                </div>
              </div>

              {/* Backup & Factory Reset */}
              <div className="glass-card" style={{ padding: "2rem" }}>
                <h3 style={{ fontSize: "1.15rem", fontWeight: 700, marginBottom: "0.5rem" }}>💾 Data Backup & Factory Reset</h3>
                <p className="admin-pane-desc" style={{ marginBottom: "1.5rem" }}>
                  Export your complete website state as a JSON file or restore from a previous backup.
                </p>

                <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
                  <button
                    onClick={() => {
                      exportBackupJSON();
                      showToast("Full portfolio JSON backup downloaded!");
                    }}
                    className="btn-secondary"
                  >
                    <Download size={16} /> Download JSON Backup
                  </button>

                  <label className="btn-secondary" style={{ cursor: "pointer" }}>
                    <Upload size={16} /> Restore from JSON Backup
                    <input type="file" accept=".json" onChange={handleImportJSONFile} style={{ display: "none" }} />
                  </label>

                  <button
                    onClick={() => {
                      if (window.confirm("WARNING: This will reset all customizations back to factory defaults. Continue?")) {
                        resetAllToDefaults();
                        showToast("All data reset to factory defaults");
                      }
                    }}
                    className="btn-secondary"
                    style={{ color: "#f43f5e", borderColor: "rgba(244, 63, 94, 0.4)" }}
                  >
                    <RotateCcw size={16} /> Factory Reset All Data
                  </button>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* =========================================================
          MODALS FOR FULL CRUD (ABOUT, SKILL, CATEGORY, PROJECT, CERT, EDU)
          ========================================================= */}

      {/* 1. Skill Add/Edit Modal */}
      {newSkillModal && (
        <div className="modal-backdrop" onClick={(e) => { if (e.target === e.currentTarget) setNewSkillModal(false); }}>
          <div className="glass-card modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3 className="modal-title">{editingSkill !== null ? "Edit Skill" : "Add New Skill"}</h3>
              <button onClick={() => setNewSkillModal(false)} className="close-btn"><X size={18} /></button>
            </div>
            <div className="admin-form-grid" style={{ padding: "1.5rem" }}>
              <div className="form-group">
                <label className="form-label">Skill Name</label>
                <input
                  type="text"
                  className="form-input"
                  value={skillForm.name}
                  onChange={(e) => setSkillForm({ ...skillForm, name: e.target.value })}
                />
              </div>
              <div className="form-group">
                <label className="form-label">Category</label>
                <select
                  className="form-select"
                  value={skillForm.category}
                  onChange={(e) => setSkillForm({ ...skillForm, category: e.target.value })}
                >
                  {categories.filter(c => c.id !== 'all').map(c => (
                    <option key={c.id} value={c.id}>{c.label}</option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">Proficiency ({skillForm.level}%)</label>
                <input
                  type="range"
                  min="30"
                  max="100"
                  value={skillForm.level}
                  onChange={(e) => setSkillForm({ ...skillForm, level: Number(e.target.value) })}
                />
              </div>
              <div className="form-group">
                <label className="form-label">Accent Color</label>
                <input
                  type="color"
                  className="form-input"
                  value={skillForm.accent}
                  onChange={(e) => setSkillForm({ ...skillForm, accent: e.target.value, glow: `${e.target.value}70` })}
                />
              </div>
              <div className="form-group" style={{ gridColumn: "1 / -1" }}>
                <label className="form-label">Short Description</label>
                <input
                  type="text"
                  className="form-input"
                  value={skillForm.desc}
                  onChange={(e) => setSkillForm({ ...skillForm, desc: e.target.value })}
                />
              </div>
            </div>
            <div className="modal-footer" style={{ padding: "1rem 1.5rem", display: "flex", justifyContent: "flex-end", gap: "0.5rem" }}>
              <button onClick={() => setNewSkillModal(false)} className="btn-secondary">Cancel</button>
              <button
                onClick={() => {
                  if (editingSkill !== null) {
                    updateSkill(editingSkill, skillForm);
                    showToast("Skill updated!");
                  } else {
                    addSkill(skillForm);
                    showToast("Skill added!");
                  }
                  setNewSkillModal(false);
                }}
                className="btn-glow"
              >
                Save Skill
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 2. Category Modal */}
      {newCategoryModal && (
        <div className="modal-backdrop" onClick={(e) => { if (e.target === e.currentTarget) setNewCategoryModal(false); }}>
          <div className="glass-card modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3 className="modal-title">{editingCategory ? "Edit Category" : "Add Skill Category"}</h3>
              <button onClick={() => setNewCategoryModal(false)} className="close-btn"><X size={18} /></button>
            </div>
            <div className="admin-form-grid" style={{ padding: "1.5rem" }}>
              <div className="form-group">
                <label className="form-label">Category ID (slug, e.g. "cloud")</label>
                <input
                  type="text"
                  className="form-input"
                  value={categoryForm.id}
                  onChange={(e) => setCategoryForm({ ...categoryForm, id: e.target.value.toLowerCase().replace(/\s+/g, '-') })}
                />
              </div>
              <div className="form-group">
                <label className="form-label">Display Label (e.g. "☁️ Cloud Engineering")</label>
                <input
                  type="text"
                  className="form-input"
                  value={categoryForm.label}
                  onChange={(e) => setCategoryForm({ ...categoryForm, label: e.target.value })}
                />
              </div>
            </div>
            <div className="modal-footer" style={{ padding: "1rem 1.5rem", display: "flex", justifyContent: "flex-end", gap: "0.5rem" }}>
              <button onClick={() => setNewCategoryModal(false)} className="btn-secondary">Cancel</button>
              <button
                onClick={() => {
                  if (categoryForm.id && categoryForm.label) {
                    addCategory(categoryForm);
                    showToast("Category created!");
                    setNewCategoryModal(false);
                  }
                }}
                className="btn-glow"
              >
                Save Category
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 3. About Highlight Modal */}
      {newHighlightModal && (
        <div className="modal-backdrop" onClick={(e) => { if (e.target === e.currentTarget) setNewHighlightModal(false); }}>
          <div className="glass-card modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3 className="modal-title">{editingHighlight !== null ? "Edit About Highlight" : "Add About Highlight"}</h3>
              <button onClick={() => setNewHighlightModal(false)} className="close-btn"><X size={18} /></button>
            </div>
            <div className="admin-form-grid" style={{ padding: "1.5rem" }}>
              <div className="form-group">
                <label className="form-label">Card Title</label>
                <input
                  type="text"
                  className="form-input"
                  value={highlightForm.title}
                  onChange={(e) => setHighlightForm({ ...highlightForm, title: e.target.value })}
                />
              </div>
              <div className="form-group">
                <label className="form-label">Icon Name (e.g. BarChart3, Layout, Zap, Cpu, Sparkles)</label>
                <input
                  type="text"
                  className="form-input"
                  value={highlightForm.icon}
                  onChange={(e) => setHighlightForm({ ...highlightForm, icon: e.target.value })}
                />
              </div>
              <div className="form-group" style={{ gridColumn: "1 / -1" }}>
                <label className="form-label">Description</label>
                <textarea
                  className="form-textarea"
                  rows={3}
                  value={highlightForm.desc}
                  onChange={(e) => setHighlightForm({ ...highlightForm, desc: e.target.value })}
                />
              </div>
            </div>
            <div className="modal-footer" style={{ padding: "1rem 1.5rem", display: "flex", justifyContent: "flex-end", gap: "0.5rem" }}>
              <button onClick={() => setNewHighlightModal(false)} className="btn-secondary">Cancel</button>
              <button
                onClick={() => {
                  if (editingHighlight !== null) {
                    updateAboutHighlight(editingHighlight, highlightForm);
                    showToast("Highlight card updated!");
                  } else {
                    addAboutHighlight(highlightForm);
                    showToast("Highlight card added!");
                  }
                  setNewHighlightModal(false);
                }}
                className="btn-glow"
              >
                Save Card
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 4. Project Modal */}
      {newProjectModal && (
        <div className="modal-backdrop" onClick={(e) => { if (e.target === e.currentTarget) setNewProjectModal(false); }}>
          <div className="glass-card modal-content" style={{ maxWidth: "800px" }} onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3 className="modal-title">{editingProject ? "Edit Project" : "Add New Project"}</h3>
              <button onClick={() => setNewProjectModal(false)} className="close-btn"><X size={18} /></button>
            </div>
            <div className="admin-form-grid" style={{ padding: "1.5rem" }}>
              <div className="form-group">
                <label className="form-label">Project Title</label>
                <input
                  type="text"
                  className="form-input"
                  value={projectForm.title}
                  onChange={(e) => setProjectForm({ ...projectForm, title: e.target.value })}
                />
              </div>
              <div className="form-group">
                <label className="form-label">Category</label>
                <input
                  type="text"
                  className="form-input"
                  value={projectForm.category}
                  onChange={(e) => setProjectForm({ ...projectForm, category: e.target.value })}
                />
              </div>
              <div className="form-group">
                <label className="form-label">GitHub URL</label>
                <input
                  type="text"
                  className="form-input"
                  value={projectForm.github || ""}
                  onChange={(e) => setProjectForm({ ...projectForm, github: e.target.value })}
                />
              </div>
              <div className="form-group">
                <label className="form-label">Live Demo URL</label>
                <input
                  type="text"
                  className="form-input"
                  value={projectForm.live || ""}
                  onChange={(e) => setProjectForm({ ...projectForm, live: e.target.value })}
                />
              </div>
              <div className="form-group" style={{ gridColumn: "1 / -1" }}>
                <label className="form-label">Project Description</label>
                <textarea
                  className="form-textarea"
                  rows={3}
                  value={projectForm.description}
                  onChange={(e) => setProjectForm({ ...projectForm, description: e.target.value })}
                />
              </div>
              <div className="form-group" style={{ gridColumn: "1 / -1" }}>
                <label className="form-label">Tags (comma-separated)</label>
                <input
                  type="text"
                  className="form-input"
                  value={Array.isArray(projectForm.tags) ? projectForm.tags.join(", ") : ""}
                  onChange={(e) => setProjectForm({ ...projectForm, tags: e.target.value.split(",").map(t => t.trim()) })}
                />
              </div>
              <div className="form-group" style={{ gridColumn: "1 / -1" }}>
                <label className="form-label">Upload Cover Image</label>
                <input type="file" accept="image/*" onChange={handleProjectCoverUpload} />
              </div>
              <div className="form-group" style={{ gridColumn: "1 / -1" }}>
                <label className="form-label">Upload Additional Gallery Images</label>
                <input type="file" accept="image/*" multiple onChange={handleProjectGalleryUpload} />
              </div>
            </div>
            <div className="modal-footer" style={{ padding: "1rem 1.5rem", display: "flex", justifyContent: "flex-end", gap: "0.5rem" }}>
              <button onClick={() => setNewProjectModal(false)} className="btn-secondary">Cancel</button>
              <button
                onClick={() => {
                  if (editingProject) {
                    updateProject(editingProject, projectForm);
                    showToast("Project updated!");
                  } else {
                    addProject(projectForm);
                    showToast("Project created!");
                  }
                  setNewProjectModal(false);
                }}
                className="btn-glow"
              >
                Save Project
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 5. Certificate Modal */}
      {newCertModal && (
        <div className="modal-backdrop" onClick={(e) => { if (e.target === e.currentTarget) setNewCertModal(false); }}>
          <div className="glass-card modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3 className="modal-title">{editingCert ? "Edit Certificate" : "Add New Certificate"}</h3>
              <button onClick={() => setNewCertModal(false)} className="close-btn"><X size={18} /></button>
            </div>
            <div className="admin-form-grid" style={{ padding: "1.5rem" }}>
              <div className="form-group">
                <label className="form-label">Certification Title</label>
                <input
                  type="text"
                  className="form-input"
                  value={certForm.title}
                  onChange={(e) => setCertForm({ ...certForm, title: e.target.value })}
                />
              </div>
              <div className="form-group">
                <label className="form-label">Issuer Organization</label>
                <input
                  type="text"
                  className="form-input"
                  value={certForm.issuer}
                  onChange={(e) => setCertForm({ ...certForm, issuer: e.target.value })}
                />
              </div>
              <div className="form-group">
                <label className="form-label">Credential ID</label>
                <input
                  type="text"
                  className="form-input"
                  value={certForm.credentialId || ""}
                  onChange={(e) => setCertForm({ ...certForm, credentialId: e.target.value })}
                />
              </div>
              <div className="form-group">
                <label className="form-label">Upload Certificate Image</label>
                <input type="file" accept="image/*" onChange={handleCertImageUpload} />
              </div>
              <div className="form-group" style={{ gridColumn: "1 / -1" }}>
                <label className="form-label">Description</label>
                <textarea
                  className="form-textarea"
                  rows={3}
                  value={certForm.description}
                  onChange={(e) => setCertForm({ ...certForm, description: e.target.value })}
                />
              </div>
              <div className="form-group" style={{ gridColumn: "1 / -1" }}>
                <label className="form-label">Skills Validated (comma-separated)</label>
                <input
                  type="text"
                  className="form-input"
                  value={Array.isArray(certForm.skillsValidated) ? certForm.skillsValidated.join(", ") : ""}
                  onChange={(e) => setCertForm({ ...certForm, skillsValidated: e.target.value.split(",").map(s => s.trim()) })}
                />
              </div>
            </div>
            <div className="modal-footer" style={{ padding: "1rem 1.5rem", display: "flex", justifyContent: "flex-end", gap: "0.5rem" }}>
              <button onClick={() => setNewCertModal(false)} className="btn-secondary">Cancel</button>
              <button
                onClick={() => {
                  if (editingCert) {
                    updateCertification(editingCert, certForm);
                    showToast("Certificate updated!");
                  } else {
                    addCertification(certForm);
                    showToast("Certificate added!");
                  }
                  setNewCertModal(false);
                }}
                className="btn-glow"
              >
                Save Certificate
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 6. Education Modal */}
      {newEduModal && (
        <div className="modal-backdrop" onClick={(e) => { if (e.target === e.currentTarget) setNewEduModal(false); }}>
          <div className="glass-card modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3 className="modal-title">{editingEdu !== null ? "Edit Education Milestone" : "Add Education Milestone"}</h3>
              <button onClick={() => setNewEduModal(false)} className="close-btn"><X size={18} /></button>
            </div>
            <div className="admin-form-grid" style={{ padding: "1.5rem" }}>
              <div className="form-group">
                <label className="form-label">Degree / Certificate Name</label>
                <input
                  type="text"
                  className="form-input"
                  value={eduForm.degree}
                  onChange={(e) => setEduForm({ ...eduForm, degree: e.target.value })}
                />
              </div>
              <div className="form-group">
                <label className="form-label">Institution Name</label>
                <input
                  type="text"
                  className="form-input"
                  value={eduForm.institution}
                  onChange={(e) => setEduForm({ ...eduForm, institution: e.target.value })}
                />
              </div>
              <div className="form-group">
                <label className="form-label">Location</label>
                <input
                  type="text"
                  className="form-input"
                  value={eduForm.location}
                  onChange={(e) => setEduForm({ ...eduForm, location: e.target.value })}
                />
              </div>
              <div className="form-group">
                <label className="form-label">Period (e.g. "2021 - 2024")</label>
                <input
                  type="text"
                  className="form-input"
                  value={eduForm.period}
                  onChange={(e) => setEduForm({ ...eduForm, period: e.target.value })}
                />
              </div>
              <div className="form-group" style={{ gridColumn: "1 / -1" }}>
                <label className="form-label">Key Highlights (comma or newline-separated)</label>
                <textarea
                  className="form-textarea"
                  rows={3}
                  value={Array.isArray(eduForm.highlights) ? eduForm.highlights.join("\n") : ""}
                  onChange={(e) => setEduForm({ ...eduForm, highlights: e.target.value.split("\n").filter(Boolean) })}
                />
              </div>
            </div>
            <div className="modal-footer" style={{ padding: "1rem 1.5rem", display: "flex", justifyContent: "flex-end", gap: "0.5rem" }}>
              <button onClick={() => setNewEduModal(false)} className="btn-secondary">Cancel</button>
              <button
                onClick={() => {
                  if (editingEdu !== null) {
                    updateEducation(editingEdu, eduForm);
                    showToast("Milestone updated!");
                  } else {
                    addEducation(eduForm);
                    showToast("Milestone added!");
                  }
                  setNewEduModal(false);
                }}
                className="btn-glow"
              >
                Save Milestone
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
