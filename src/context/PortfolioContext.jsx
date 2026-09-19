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

export function PortfolioProvider({ children }) {
  // Load initial state from localStorage or defaults
  const [personalInfo, setPersonalInfo] = useState(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY}_personal`);
      return saved ? { ...defaultPersonalInfo, ...JSON.parse(saved) } : defaultPersonalInfo;
    } catch {
      return defaultPersonalInfo;
    }
  });

  const [sectionHeaders, setSectionHeaders] = useState(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY}_section_headers`);
      return saved ? { ...defaultSectionHeaders, ...JSON.parse(saved) } : defaultSectionHeaders;
    } catch {
      return defaultSectionHeaders;
    }
  });

  const [aboutHighlights, setAboutHighlights] = useState(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY}_about_highlights`);
      return saved ? JSON.parse(saved) : defaultAboutHighlights;
    } catch {
      return defaultAboutHighlights;
    }
  });

  const [skills, setSkills] = useState(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY}_skills`);
      return saved ? JSON.parse(saved) : defaultSkillsData.skills;
    } catch {
      return defaultSkillsData.skills;
    }
  });

  const [categories, setCategories] = useState(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY}_categories`);
      return saved ? JSON.parse(saved) : defaultSkillsData.categories;
    } catch {
      return defaultSkillsData.categories;
    }
  });

  const [projects, setProjects] = useState(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY}_projects`);
      return saved ? JSON.parse(saved) : defaultProjectsData;
    } catch {
      return defaultProjectsData;
    }
  });

  const [certifications, setCertifications] = useState(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY}_certs`);
      return saved ? JSON.parse(saved) : defaultCertificationsData;
    } catch {
      return defaultCertificationsData;
    }
  });

  const [education, setEducation] = useState(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY}_education`);
      return saved ? JSON.parse(saved) : defaultEducationData;
    } catch {
      return defaultEducationData;
    }
  });

  const [messages, setMessages] = useState(() => {
    try {
      const saved = localStorage.getItem(MESSAGES_KEY);
      return saved
        ? JSON.parse(saved)
        : [
            {
              id: 1,
              name: "Priya Sharma",
              email: "priya.tech@example.com",
              subject: "Data Analyst Role Opportunity",
              message: "Hi Logeshwaran, we were impressed by your Power BI and Python projects and would love to schedule a preliminary conversation for our Data Analytics team.",
              date: "2026-08-25 14:30",
              read: false
            },
            {
              id: 2,
              name: "David Miller",
              email: "david.m@cloudventures.io",
              subject: "Full-Stack Project Collaboration",
              message: "Hello Logeshwaran, we are developing an AI-powered SaaS dashboard and are looking for a skilled React/Node developer with your background.",
              date: "2026-08-26 10:15",
              read: true
            }
          ];
    } catch {
      return [];
    }
  });

  const [adminCredentials, setAdminCredentials] = useState(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY}_admin_credentials`);
      return saved ? JSON.parse(saved) : DEFAULT_ADMIN_CREDENTIALS;
    } catch {
      return DEFAULT_ADMIN_CREDENTIALS;
    }
  });

  // Save changes to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(`${STORAGE_KEY}_personal`, JSON.stringify(personalInfo));
      localStorage.setItem(`${STORAGE_KEY}_section_headers`, JSON.stringify(sectionHeaders));
      localStorage.setItem(`${STORAGE_KEY}_about_highlights`, JSON.stringify(aboutHighlights));
      localStorage.setItem(`${STORAGE_KEY}_skills`, JSON.stringify(skills));
      localStorage.setItem(`${STORAGE_KEY}_categories`, JSON.stringify(categories));
      localStorage.setItem(`${STORAGE_KEY}_projects`, JSON.stringify(projects));
      localStorage.setItem(`${STORAGE_KEY}_certs`, JSON.stringify(certifications));
      localStorage.setItem(`${STORAGE_KEY}_education`, JSON.stringify(education));
      localStorage.setItem(`${STORAGE_KEY}_admin_credentials`, JSON.stringify(adminCredentials));
      localStorage.setItem(MESSAGES_KEY, JSON.stringify(messages));
    } catch (e) {
      console.error("Failed to persist portfolio data to localStorage", e);
    }
  }, [personalInfo, sectionHeaders, aboutHighlights, skills, categories, projects, certifications, education, messages, adminCredentials]);

  // Actions
  const updatePersonalInfo = (newInfo) => {
    setPersonalInfo((prev) => ({ ...prev, ...newInfo }));
  };

  const updateSectionHeader = (sectionKey, newHeaderData) => {
    setSectionHeaders((prev) => ({
      ...prev,
      [sectionKey]: {
        ...(prev[sectionKey] || {}),
        ...newHeaderData
      }
    }));
  };

  const updateAdminCredentials = (newCredentials) => {
    setAdminCredentials((prev) => ({ ...prev, ...newCredentials }));
  };

  const resetAdminCredentials = () => {
    setAdminCredentials(DEFAULT_ADMIN_CREDENTIALS);
    localStorage.setItem(`${STORAGE_KEY}_admin_credentials`, JSON.stringify(DEFAULT_ADMIN_CREDENTIALS));
  };

  // About Highlights Actions
  const addAboutHighlight = (item) => {
    setAboutHighlights((prev) => [...prev, item]);
  };

  const updateAboutHighlight = (index, updatedItem) => {
    setAboutHighlights((prev) => {
      const next = [...prev];
      next[index] = updatedItem;
      return next;
    });
  };

  const deleteAboutHighlight = (index) => {
    setAboutHighlights((prev) => prev.filter((_, i) => i !== index));
  };

  // Categories Actions
  const addCategory = (category) => {
    setCategories((prev) => [...prev, category]);
  };

  const updateCategory = (id, updatedCat) => {
    setCategories((prev) => prev.map((c) => (c.id === id ? { ...c, ...updatedCat } : c)));
  };

  const deleteCategory = (id) => {
    if (id === 'all') return; // Cannot delete default 'all' category
    setCategories((prev) => prev.filter((c) => c.id !== id));
  };

  // Skills Actions
  const addSkill = (newSkill) => {
    setSkills((prev) => [newSkill, ...prev]);
  };

  const updateSkill = (index, updatedSkill) => {
    setSkills((prev) => {
      const next = [...prev];
      next[index] = updatedSkill;
      return next;
    });
  };

  const deleteSkill = (index) => {
    setSkills((prev) => prev.filter((_, i) => i !== index));
  };

  // Projects Actions
  const addProject = (newProj) => {
    setProjects((prev) => [{ ...newProj, id: Date.now() }, ...prev]);
  };

  const updateProject = (id, updatedProj) => {
    setProjects((prev) => prev.map((p) => (p.id === id ? { ...p, ...updatedProj } : p)));
  };

  const deleteProject = (id) => {
    setProjects((prev) => prev.filter((p) => p.id !== id));
  };

  // Certifications Actions
  const addCertification = (newCert) => {
    setCertifications((prev) => [{ ...newCert, id: `cert-${Date.now()}` }, ...prev]);
  };

  const updateCertification = (id, updatedCert) => {
    setCertifications((prev) => prev.map((c) => (c.id === id ? { ...c, ...updatedCert } : c)));
  };

  const deleteCertification = (id) => {
    setCertifications((prev) => prev.filter((c) => c.id !== id));
  };

  // Education Actions
  const addEducation = (newEdu) => {
    setEducation((prev) => [newEdu, ...prev]);
  };

  const updateEducation = (index, updatedEdu) => {
    setEducation((prev) => {
      const next = [...prev];
      next[index] = updatedEdu;
      return next;
    });
  };

  const deleteEducation = (index) => {
    setEducation((prev) => prev.filter((_, i) => i !== index));
  };

  // Messages Actions
  const addMessage = (msg) => {
    const newMsg = {
      id: Date.now(),
      ...msg,
      date: new Date().toLocaleString(),
      read: false
    };
    setMessages((prev) => [newMsg, ...prev]);
  };

  const deleteMessage = (id) => {
    setMessages((prev) => prev.filter((m) => m.id !== id));
  };

  const markMessageAsRead = (id) => {
    setMessages((prev) => prev.map((m) => (m.id === id ? { ...m, read: true } : m)));
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
    localStorage.removeItem(`${STORAGE_KEY}_personal`);
    localStorage.removeItem(`${STORAGE_KEY}_section_headers`);
    localStorage.removeItem(`${STORAGE_KEY}_about_highlights`);
    localStorage.removeItem(`${STORAGE_KEY}_skills`);
    localStorage.removeItem(`${STORAGE_KEY}_categories`);
    localStorage.removeItem(`${STORAGE_KEY}_projects`);
    localStorage.removeItem(`${STORAGE_KEY}_certs`);
    localStorage.removeItem(`${STORAGE_KEY}_education`);
    localStorage.removeItem(`${STORAGE_KEY}_admin_credentials`);
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
      if (data.personalInfo) setPersonalInfo(data.personalInfo);
      if (data.sectionHeaders) setSectionHeaders(data.sectionHeaders);
      if (data.aboutHighlights) setAboutHighlights(data.aboutHighlights);
      if (data.skills) setSkills(data.skills);
      if (data.categories) setCategories(data.categories);
      if (data.projects) setProjects(data.projects);
      if (data.certifications) setCertifications(data.certifications);
      if (data.education) setEducation(data.education);
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
        resetAdminCredentials
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
