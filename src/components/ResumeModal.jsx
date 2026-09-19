import React from 'react';
import {
  X,
  Printer,
  Download,
  FileText,
  CheckCircle2,
  User,
  Phone,
  Mail
} from 'lucide-react';
import { printCleanResume, handleResumeDownloadAction } from '../utils/resumePrinter';

export function ResumeModal({
  isOpen,
  onClose,
  personalInfo,
  skills,
  projects,
  education,
  certifications,
  onShowToast
}) {
  if (!isOpen) return null;

  const resumeData = {
    personalInfo,
    skills,
    projects,
    education,
    certifications
  };

  const name = personalInfo?.name || 'LOGESHWARAN G';
  const phone = personalInfo?.phone || '+91 7200693638';
  const email = personalInfo?.email || 'parthalogesh0@gmail.com';
  const summary = personalInfo?.summary ||
    'Highly analytical and results-oriented professional with strong data analysis and web development expertise. Proven ability to extract insights from complex datasets and build robust web applications. Eager to contribute to a dynamic team, leveraging a passion for technology and continuous learning.';

  const hasCustomFile = Boolean(personalInfo?.resumeUrl && personalInfo?.resumeUrl !== '#');

  const handlePrint = () => {
    printCleanResume(resumeData);
    if (onShowToast) {
      onShowToast('Opening Resume document print / PDF dialog...');
    }
  };

  const handleDirectDownload = () => {
    handleResumeDownloadAction(resumeData, {
      onDirectDownload: () => {
        if (onShowToast) onShowToast('Downloading custom resume file...');
      },
      onFallbackPrint: () => {
        if (onShowToast) onShowToast('Opening Resume document print / PDF dialog...');
      }
    });
  };

  return (
    <div
      className="modal-backdrop resume-modal-backdrop"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        className="glass-card resume-modal-card"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Top Bar */}
        <div className="resume-modal-topbar">
          <div className="resume-modal-title-group">
            <div className="resume-modal-icon-badge">
              <FileText size={20} />
            </div>
            <div>
              <h3 className="resume-modal-heading">
                {name} — Resume
              </h3>
              <p className="resume-modal-subheading">
                Dedicated Clean Resume Document • Ready for Save as PDF
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="resume-modal-header-actions">
            {hasCustomFile && (
              <button
                onClick={handleDirectDownload}
                className="btn-secondary resume-modal-action-btn"
              >
                <Download size={15} /> <span>Download File</span>
              </button>
            )}

            <button
              onClick={handlePrint}
              className="btn-glow resume-modal-action-btn"
            >
              <Printer size={15} /> <span>Save / Print PDF</span>
            </button>

            <button
              onClick={onClose}
              className="close-btn"
              title="Close modal"
              aria-label="Close modal"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Info Banner */}
        <div className="resume-modal-banner">
          <div className="resume-modal-banner-info">
            <CheckCircle2 size={15} style={{ flexShrink: 0 }} />
            <span>
              <strong>Clean Resume View:</strong> Downloads/Prints <strong>only</strong> this exact resume document without any website copy or UI elements.
            </span>
          </div>
          <button
            onClick={handlePrint}
            className="resume-modal-banner-link"
          >
            Click to Save as PDF
          </button>
        </div>

        {/* Document Preview Scroll Area */}
        <div className="resume-modal-scroll-area">
          {/* Printable White Paper Document */}
          <div className="resume-document-sheet">
            {/* CONTACT */}
            <div
              style={{
                fontSize: '14pt',
                fontWeight: 'bold',
                color: '#000000',
                marginBottom: '12px'
              }}
            >
              CONTACT
            </div>

            <div
              className="resume-sheet-contact-row"
              style={{
                display: 'flex',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: '16px',
                fontSize: '11.5pt',
                fontWeight: 'bold',
                marginBottom: '22px'
              }}
            >
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                <User size={16} strokeWidth={2.5} />
                <span>{name},</span>
              </span>

              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                <Phone size={16} strokeWidth={2.5} />
                <span>{phone},</span>
              </span>

              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                <Mail size={16} strokeWidth={2.5} />
                <span>{email}</span>
              </span>
            </div>

            {/* Summary */}
            <div
              style={{
                fontSize: '13pt',
                fontWeight: 'bold',
                fontStyle: 'italic',
                color: '#000000',
                marginBottom: '8px'
              }}
            >
              Summary
            </div>
            <p
              style={{
                fontSize: '11pt',
                lineHeight: '1.45',
                color: '#000000',
                textAlign: 'justify',
                margin: '0 0 20px 0'
              }}
            >
              {summary}
            </p>

            {/* Skills */}
            <div
              style={{
                fontSize: '13pt',
                fontWeight: 'bold',
                fontStyle: 'italic',
                color: '#000000',
                marginBottom: '8px'
              }}
            >
              Skills
            </div>
            <div style={{ fontSize: '11pt', lineHeight: '1.5', color: '#000000', marginBottom: '8px' }}>
              <strong>Data Analytics:</strong> SQL, Python Pandas , R, Excel, Power BI, Data Visualization, Statistical Analysis, Machine Learning Basics.
            </div>
            <div style={{ fontSize: '11pt', lineHeight: '1.5', color: '#000000', marginBottom: '8px' }}>
              <strong>Web Development:</strong> HTML, CSS, JavaScript (React.js), Node.js (Express), Python , Git, Design, Database ,
            </div>
            <div style={{ fontSize: '11pt', lineHeight: '1.5', color: '#000000', marginBottom: '20px' }}>
              <strong>Other:</strong> Agile, Problem Solving, Communication, Teamwork, MS Excel, Vibe Coding, AI
            </div>

            {/* Education */}
            <div
              style={{
                fontSize: '13pt',
                fontWeight: 'bold',
                fontStyle: 'italic',
                color: '#000000',
                marginBottom: '8px'
              }}
            >
              Education
            </div>

            <div
              style={{
                fontSize: '11pt',
                fontWeight: 'bold',
                textTransform: 'uppercase',
                marginBottom: '4px',
                letterSpacing: '0.5px'
              }}
            >
              HIGHER SECONDARY
            </div>
            <div style={{ fontSize: '11pt', color: '#000000', marginBottom: '14px' }}>
              ST. Antony’s Higher Secondary School ,Coonoor ,Nilagiri,Tamil Nadu.
            </div>

            <div
              style={{
                fontSize: '11pt',
                fontWeight: 'bold',
                textTransform: 'uppercase',
                marginBottom: '4px',
                letterSpacing: '0.5px'
              }}
            >
              COLLEGE
            </div>
            <ul
              style={{
                listStyleType: 'disc',
                margin: '0 0 20px 24px',
                padding: 0,
                fontSize: '11pt',
                lineHeight: '1.5',
                color: '#000000'
              }}
            >
              <li style={{ marginBottom: '3px' }}>BCA</li>
              <li style={{ marginBottom: '3px' }}>Computer Application</li>
              <li style={{ marginBottom: '3px' }}>Sri Ramakrishna Mission Vidyalaya College Of Art And Science</li>
            </ul>

            {/* Certifications / Awards */}
            <div
              style={{
                fontSize: '13pt',
                fontWeight: 'bold',
                fontStyle: 'italic',
                color: '#000000',
                marginBottom: '8px'
              }}
            >
              Certifications / Awards
            </div>
            <ul
              style={{
                listStyleType: 'disc',
                margin: '0 0 10px 24px',
                padding: 0,
                fontSize: '11pt',
                lineHeight: '1.5',
                color: '#000000'
              }}
            >
              <li style={{ marginBottom: '4px' }}>Google AI Essentials</li>
              <li style={{ marginBottom: '4px' }}>AWS academy cloud foundations</li>
              <li style={{ marginBottom: '4px' }}>Coursera Introduction to Data Analysis using Microsoft Excel</li>
              <li style={{ marginBottom: '4px' }}>NPTEL The Joy of Computing using python</li>
            </ul>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="resume-modal-footer">
          <span className="resume-modal-footer-tip">
            Tip: In the print dialog destination, choose <strong>"Save as PDF"</strong> to save your resume file.
          </span>

          <div className="resume-modal-footer-actions">
            <button
              onClick={onClose}
              className="btn-secondary"
            >
              Close
            </button>
            <button
              onClick={handlePrint}
              className="btn-glow"
            >
              <Download size={15} /> Save / Print PDF
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
