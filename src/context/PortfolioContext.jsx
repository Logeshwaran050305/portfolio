import React, { createContext, useContext, useState, useEffect } from "react";
import {
  personalInfo as defaultPersonalInfo,
  defaultSectionHeaders,
  skillsData as defaultSkillsData,
  projectsData as defaultProjectsData,
  certificationsData as defaultCertificationsData,
  educationData as defaultEducationData,
  aboutHighlights as defaultAboutHighlights
} from "../data/portfolioData";

const PortfolioContext = createContext();

const STORAGE_KEY = "logeshwaran_portfolio_cms_v1";
const MESSAGES_KEY = "logeshwaran_portfolio_messages_v1";
const DEFAULT_ADMIN_CREDENTIALS = { username: "admin", password: "admin123" };
const CONTENT_API = "/api/content";

// Safe item serializer that protects against localStorage quota exhaustion
function safeSetItem(key, value) {
  try {
    const serialized = JSON.stringify(value);
    localStorage.setItem(key, serialized);
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("portfolio_cms_update", { detail: { key, value } }));
    }
    return true;
  } catch (err) {
    console.warn(`[PortfolioContext] Failed to persist key "${key}" to localStorage:`, err);
    return false;
  }
}

function safeGetItem(key, fallback) {
  try {
    const saved = localStorage.getItem(key);
    if (!saved) return fallback;
    const parsed = JSON.parse(saved);
    if (Array.isArray(fallback)) {
      return Array.isArray(parsed) ? parsed : fallback;
    }
    if (typeof fallback === "object" && fallback !== null) {
      const merged = { ...fallback };
      for (const k of Object.keys(parsed)) {
        if (
          typeof parsed[k] === "object" &&
          parsed[k] !== null &&
          !Array.isArray(parsed[k]) &&
          typeof fallback[k] === "object" &&
          fallback[k] !== null &&
          !Array.isArray(fallback[k])
        ) {
          merged[k] = { ...fallback[k], ...parsed[k] };
        } else {
          merged[k] = parsed[k];
        }
      }
      return merged;
    }
    return parsed ?? fallback;
  } catch {
    return fallback;
  }
}

export function PortfolioProvider({ children }) {
  // Load initial state from localStorage or defaults
  const [personalInfo, setPersonalInfo] = useState(() =>
    safeGetItem(`${STORAGE_KEY}_personal`, defaultPersonalInfo)
  );

  const [sectionHeaders, setSectionHeaders] = useState(() =>
    safeGetItem(`${STORAGE_KEY}_section_headers`, defaultSectionHeaders)
  );

  const [aboutHighlights, setAboutHighlights] = useState(() =>
    safeGetItem(`${STORAGE_KEY}_about_highlights`, defaultAboutHighlights)
  );

  const [skills, setSkills] = useState(() =>
    safeGetItem(`${STORAGE_KEY}_skills`, defaultSkillsData.skills)
  );

  const [categories, setCategories] = useState(() =>
    safeGetItem(`${STORAGE_KEY}_categories`, defaultSkillsData.categories)
  );

  const [projects, setProjects] = useState(() =>
    safeGetItem(`${STORAGE_KEY}_projects`, defaultProjectsData)
  );

  const [certifications, setCertifications] = useState(() =>
    safeGetItem(`${STORAGE_KEY}_certs`, defaultCertificationsData)
  );

  const [education, setEducation] = useState(() =>
    safeGetItem(`${STORAGE_KEY}_education`, defaultEducationData)
  );

  const [messages, setMessages] = useState(() =>
    safeGetItem(MESSAGES_KEY, [
      {
        id: 1,
        name: "Priya Sharma",
        email: "priya.tech@example.com",
        subject: "Data Analyst Role Opportunity",
        message:
          "Hi Logeshwaran, we were impressed by your Power BI and Python projects and would love to schedule a preliminary conversation for our Data Analytics team.",
        date: "2026-08-25 14:30",
        read: false
      },
      {
        id: 2,
        name: "David Miller",
        email: "david.m@cloudventures.io",
        subject: "Full-Stack Project Collaboration",
        message:
          "Hello Logeshwaran, we are developing an AI-powered SaaS dashboard and are looking for a skilled React/Node developer with your background.",
        date: "2026-08-26 10:15",
        read: true
      }
    ])
  );

  const [adminCredentials, setAdminCredentials] = useState(() =>
    safeGetItem(`${STORAGE_KEY}_admin_credentials`, DEFAULT_ADMIN_CREDENTIALS)
  );

  const getContentSnapshot = () => ({
    personalInfo,
    sectionHeaders,
    aboutHighlights,
    skills,
    categories,
    projects,
    certifications,
    education
  });

  const applyContentSnapshot = (content) => {
    if (!content) return;
    if (content.personalInfo) setPersonalInfo(content.personalInfo);
    if (content.sectionHeaders) setSectionHeaders(content.sectionHeaders);
    if (content.aboutHighlights) setAboutHighlights(content.aboutHighlights);
    if (content.skills) setSkills(content.skills);
    if (content.categories) setCategories(content.categories);
    if (content.projects) setProjects(content.projects);
    if (content.certifications) setCertifications(content.certifications);
    if (content.education) setEducation(content.education);
  };

  // Shared content is authoritative on deployed sites; localStorage remains a cache/fallback.
  useEffect(() => {
    let cancelled = false;
    fetch(CONTENT_API)
      .then((response) => (response.ok ? response.json() : null))
      .then((data) => {
        if (!cancelled && data?.content) applyContentSnapshot(data.content);
      })
      .catch(() => {
        // The local cache keeps the portfolio usable when shared storage is unavailable.
      });
    return () => {
      cancelled = true;
    };
  }, []);

  // Cross-tab real-time sync listener
  useEffect(() => {
    const handleStorageEvent = (e) => {
      if (!e.key || !e.newValue) return;
      try {
        if (e.key === `${STORAGE_KEY}_personal`) {
          setPersonalInfo(JSON.parse(e.newValue));
        } else if (e.key === `${STORAGE_KEY}_section_headers`) {
          setSectionHeaders(JSON.parse(e.newValue));
        } else if (e.key === `${STORAGE_KEY}_about_highlights`) {
          setAboutHighlights(JSON.parse(e.newValue));
        } else if (e.key === `${STORAGE_KEY}_skills`) {
          setSkills(JSON.parse(e.newValue));
        } else if (e.key === `${STORAGE_KEY}_categories`) {
          setCategories(JSON.parse(e.newValue));
        } else if (e.key === `${STORAGE_KEY}_projects`) {
          setProjects(JSON.parse(e.newValue));
        } else if (e.key === `${STORAGE_KEY}_certs`) {
          setCertifications(JSON.parse(e.newValue));
        } else if (e.key === `${STORAGE_KEY}_education`) {
          setEducation(JSON.parse(e.newValue));
        } else if (e.key === `${STORAGE_KEY}_admin_credentials`) {
          setAdminCredentials(JSON.parse(e.newValue));
        } else if (e.key === MESSAGES_KEY) {
          setMessages(JSON.parse(e.newValue));
        }
      } catch (err) {
        console.warn("[PortfolioContext] Error during cross-tab sync:", err);
      }
    };

    window.addEventListener("storage", handleStorageEvent);
    return () => window.removeEventListener("storage", handleStorageEvent);
  }, []);

  // Save changes to localStorage with isolated safe setters
  useEffect(() => {
    safeSetItem(`${STORAGE_KEY}_personal`, personalInfo);
  }, [personalInfo]);

  useEffect(() => {
    safeSetItem(`${STORAGE_KEY}_section_headers`, sectionHeaders);
  }, [sectionHeaders]);

  useEffect(() => {
    safeSetItem(`${STORAGE_KEY}_about_highlights`, aboutHighlights);
  }, [aboutHighlights]);

  useEffect(() => {
    safeSetItem(`${STORAGE_KEY}_skills`, skills);
  }, [skills]);

  useEffect(() => {
    safeSetItem(`${STORAGE_KEY}_categories`, categories);
  }, [categories]);

  useEffect(() => {
    safeSetItem(`${STORAGE_KEY}_projects`, projects);
  }, [projects]);

  useEffect(() => {
    safeSetItem(`${STORAGE_KEY}_certs`, certifications);
  }, [certifications]);

  useEffect(() => {
    safeSetItem(`${STORAGE_KEY}_education`, education);
  }, [education]);

  useEffect(() => {
    safeSetItem(`${STORAGE_KEY}_admin_credentials`, adminCredentials);
  }, [adminCredentials]);

  useEffect(() => {
    safeSetItem(MESSAGES_KEY, messages);
  }, [messages]);

  // Actions
  const updatePersonalInfo = (newInfo) => {
    setPersonalInfo((prev) => {
      const updated = { ...prev, ...newInfo };
      safeSetItem(`${STORAGE_KEY}_personal`, updated);
      return updated;
    });
  };

  const updateSectionHeader = (sectionKey, newHeaderData) => {
    setSectionHeaders((prev) => {
      const updated = {
        ...prev,
        [sectionKey]: {
          ...(prev[sectionKey] || {}),
          ...newHeaderData
        }
      };
      safeSetItem(`${STORAGE_KEY}_section_headers`, updated);
      return updated;
    });
  };

  const updateAdminCredentials = (newCredentials) => {
    setAdminCredentials((prev) => {
      const updated = { ...prev, ...newCredentials };
      safeSetItem(`${STORAGE_KEY}_admin_credentials`, updated);
      return updated;
    });
  };

  const resetAdminCredentials = () => {
    setAdminCredentials(DEFAULT_ADMIN_CREDENTIALS);
    safeSetItem(`${STORAGE_KEY}_admin_credentials`, DEFAULT_ADMIN_CREDENTIALS);
  };

  // About Highlights Actions
  const addAboutHighlight = (item) => {
    setAboutHighlights((prev) => {
      const updated = [...prev, item];
      safeSetItem(`${STORAGE_KEY}_about_highlights`, updated);
      return updated;
    });
  };

  const updateAboutHighlight = (index, updatedItem) => {
    setAboutHighlights((prev) => {
      const next = [...prev];
      next[index] = updatedItem;
      safeSetItem(`${STORAGE_KEY}_about_highlights`, next);
      return next;
    });
  };

  const deleteAboutHighlight = (index) => {
    setAboutHighlights((prev) => {
      const updated = prev.filter((_, i) => i !== index);
      safeSetItem(`${STORAGE_KEY}_about_highlights`, updated);
      return updated;
    });
  };

  // Categories Actions
  const addCategory = (category) => {
    setCategories((prev) => {
      const updated = [...prev, category];
      safeSetItem(`${STORAGE_KEY}_categories`, updated);
      return updated;
    });
  };

  const updateCategory = (id, updatedCat) => {
    setCategories((prev) => {
      const updated = prev.map((c) => (c.id === id ? { ...c, ...updatedCat } : c));
      safeSetItem(`${STORAGE_KEY}_categories`, updated);
      return updated;
    });
  };

  const deleteCategory = (id) => {
    if (id === "all") return;
    setCategories((prev) => {
      const updated = prev.filter((c) => c.id !== id);
      safeSetItem(`${STORAGE_KEY}_categories`, updated);
      return updated;
    });
  };

  // Skills Actions
  const addSkill = (newSkill) => {
    setSkills((prev) => {
      const updated = [newSkill, ...prev];
      safeSetItem(`${STORAGE_KEY}_skills`, updated);
      return updated;
    });
  };

  const updateSkill = (index, updatedSkill) => {
    setSkills((prev) => {
      const next = [...prev];
      next[index] = updatedSkill;
      safeSetItem(`${STORAGE_KEY}_skills`, next);
      return next;
    });
  };

  const deleteSkill = (index) => {
    setSkills((prev) => {
      const updated = prev.filter((_, i) => i !== index);
      safeSetItem(`${STORAGE_KEY}_skills`, updated);
      return updated;
    });
  };

  // Projects Actions
  const addProject = (newProj) => {
    setProjects((prev) => {
      const updated = [{ ...newProj, id: Date.now() }, ...prev];
      safeSetItem(`${STORAGE_KEY}_projects`, updated);
      return updated;
    });
  };

  const updateProject = (id, updatedProj) => {
    setProjects((prev) => {
      const updated = prev.map((p) => (p.id === id ? { ...p, ...updatedProj } : p));
      safeSetItem(`${STORAGE_KEY}_projects`, updated);
      return updated;
    });
  };

  const deleteProject = (id) => {
    setProjects((prev) => {
      const updated = prev.filter((p) => p.id !== id);
      safeSetItem(`${STORAGE_KEY}_projects`, updated);
      return updated;
    });
  };

  // Certifications Actions
  const addCertification = (newCert) => {
    setCertifications((prev) => {
      const updated = [{ ...newCert, id: `cert-${Date.now()}` }, ...prev];
      safeSetItem(`${STORAGE_KEY}_certs`, updated);
      return updated;
    });
  };

  const updateCertification = (id, updatedCert) => {
    setCertifications((prev) => {
      const updated = prev.map((c) => (c.id === id ? { ...c, ...updatedCert } : c));
      safeSetItem(`${STORAGE_KEY}_certs`, updated);
      return updated;
    });
  };

  const deleteCertification = (id) => {
    setCertifications((prev) => {
      const updated = prev.filter((c) => c.id !== id);
      safeSetItem(`${STORAGE_KEY}_certs`, updated);
      return updated;
    });
  };

  // Education Actions
  const addEducation = (newEdu) => {
    setEducation((prev) => {
      const updated = [newEdu, ...prev];
      safeSetItem(`${STORAGE_KEY}_education`, updated);
      return updated;
    });
  };

  const updateEducation = (index, updatedEdu) => {
    setEducation((prev) => {
      const next = [...prev];
      next[index] = updatedEdu;
      safeSetItem(`${STORAGE_KEY}_education`, next);
      return next;
    });
  };

  const deleteEducation = (index) => {
    setEducation((prev) => {
      const updated = prev.filter((_, i) => i !== index);
      safeSetItem(`${STORAGE_KEY}_education`, updated);
      return updated;
    });
  };

  // Messages Actions
  const addMessage = (msg) => {
    const newMsg = {
      id: Date.now(),
      ...msg,
      date: new Date().toLocaleString(),
      read: false
    };
    setMessages((prev) => {
      const updated = [newMsg, ...prev];
      safeSetItem(MESSAGES_KEY, updated);
      return updated;
    });
  };

  const deleteMessage = (id) => {
    setMessages((prev) => {
      const updated = prev.filter((m) => m.id !== id);
      safeSetItem(MESSAGES_KEY, updated);
      return updated;
    });
  };

  const markMessageAsRead = (id) => {
    setMessages((prev) => {
      const updated = prev.map((m) => (m.id === id ? { ...m, read: true } : m));
      safeSetItem(MESSAGES_KEY, updated);
      return updated;
    });
  };

  // Explicit Save All Changes function
  const saveAllChanges = async () => {
    const content = getContentSnapshot();
    safeSetItem(`${STORAGE_KEY}_personal`, personalInfo);
    safeSetItem(`${STORAGE_KEY}_section_headers`, sectionHeaders);
    safeSetItem(`${STORAGE_KEY}_about_highlights`, aboutHighlights);
    safeSetItem(`${STORAGE_KEY}_skills`, skills);
    safeSetItem(`${STORAGE_KEY}_categories`, categories);
    safeSetItem(`${STORAGE_KEY}_projects`, projects);
    safeSetItem(`${STORAGE_KEY}_certs`, certifications);
    safeSetItem(`${STORAGE_KEY}_education`, education);
    safeSetItem(`${STORAGE_KEY}_admin_credentials`, adminCredentials);
    safeSetItem(MESSAGES_KEY, messages);

    const response = await fetch(CONTENT_API, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(content)
    });

    if (!response.ok) {
      throw new Error("Shared content storage is unavailable. Configure Vercel KV before publishing.");
    }
    return true;
  };

  // Reset all
  const resetAllToDefaults = () => {
    setPersonalInfo(defaultPersonalInfo);
    setSectionHeaders(defaultSectionHeaders);
    setAboutHighlights(defaultAboutHighlights);
    setSkills(defaultSkillsData.skills);
    setCategories(defaultSkillsData.categories);
    setProjects(defaultProjectsData);
    setCertifications(defaultCertificationsData);
    setEducation(defaultEducationData);
    setAdminCredentials(DEFAULT_ADMIN_CREDENTIALS);
    try {
      localStorage.removeItem(`${STORAGE_KEY}_personal`);
      localStorage.removeItem(`${STORAGE_KEY}_section_headers`);
      localStorage.removeItem(`${STORAGE_KEY}_about_highlights`);
      localStorage.removeItem(`${STORAGE_KEY}_skills`);
      localStorage.removeItem(`${STORAGE_KEY}_categories`);
      localStorage.removeItem(`${STORAGE_KEY}_projects`);
      localStorage.removeItem(`${STORAGE_KEY}_certs`);
      localStorage.removeItem(`${STORAGE_KEY}_education`);
      localStorage.removeItem(`${STORAGE_KEY}_admin_credentials`);
    } catch (e) {
      console.warn("Storage reset warning:", e);
    }
  };

  // Export JSON Backup
  const exportBackupJSON = () => {
    const backup = {
      personalInfo,
      sectionHeaders,
      aboutHighlights,
      skills,
      categories,
      projects,
      certifications,
      education,
      exportedAt: new Date().toISOString()
    };
    const blob = new Blob([JSON.stringify(backup, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `portfolio-backup-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // Import JSON Backup
  const importBackupJSON = (jsonString) => {
    try {
      const data = JSON.parse(jsonString);
      if (data.personalInfo) {
        setPersonalInfo(data.personalInfo);
        safeSetItem(`${STORAGE_KEY}_personal`, data.personalInfo);
      }
      if (data.sectionHeaders) {
        setSectionHeaders(data.sectionHeaders);
        safeSetItem(`${STORAGE_KEY}_section_headers`, data.sectionHeaders);
      }
      if (data.aboutHighlights) {
        setAboutHighlights(data.aboutHighlights);
        safeSetItem(`${STORAGE_KEY}_about_highlights`, data.aboutHighlights);
      }
      if (data.skills) {
        setSkills(data.skills);
        safeSetItem(`${STORAGE_KEY}_skills`, data.skills);
      }
      if (data.categories) {
        setCategories(data.categories);
        safeSetItem(`${STORAGE_KEY}_categories`, data.categories);
      }
      if (data.projects) {
        setProjects(data.projects);
        safeSetItem(`${STORAGE_KEY}_projects`, data.projects);
      }
      if (data.certifications) {
        setCertifications(data.certifications);
        safeSetItem(`${STORAGE_KEY}_certs`, data.certifications);
      }
      if (data.education) {
        setEducation(data.education);
        safeSetItem(`${STORAGE_KEY}_education`, data.education);
      }
      return { success: true };
    } catch (err) {
      console.error("Failed to import JSON", err);
      return { success: false, error: err.message };
    }
  };

  return (
    <PortfolioContext.Provider
      value={{
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
        addMessage,
        deleteMessage,
        markMessageAsRead,
        resetAllToDefaults,
        exportBackupJSON,
        importBackupJSON,
        adminCredentials,
        updateAdminCredentials,
        resetAdminCredentials,
        saveAllChanges
      }}
    >
      {children}
    </PortfolioContext.Provider>
  );
}

export function usePortfolio() {
  const context = useContext(PortfolioContext);
  if (!context) {
    throw new Error("usePortfolio must be used within a PortfolioProvider");
  }
  return context;
}
