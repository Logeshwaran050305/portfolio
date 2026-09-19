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
      className="modal-backdrop"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        background: 'rgba(3, 7, 18, 0.85)',
        backdropFilter: 'blur(10px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1rem',
        animation: 'fadeIn 0.2s ease-out'
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        className="glass-card"
        style={{
          width: '100%',
          maxWidth: '850px',
          maxHeight: '92vh',
          display: 'flex',
          flexDirection: 'column',
          background: 'rgba(15, 23, 42, 0.95)',
          border: '1px solid rgba(255, 255, 255, 0.12)',
          boxShadow: '0 25px 60px -15px rgba(0, 0, 0, 0.8), 0 0 40px rgba(56, 189, 248, 0.15)',
          borderRadius: '1.25rem',
          overflow: 'hidden'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Top Bar */}
        <div
          style={{
            padding: '1.25rem 1.75rem',
            borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            background: 'linear-gradient(90deg, rgba(30, 41, 59, 0.8) 0%, rgba(15, 23, 42, 0.9) 100%)'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div
              style={{
                width: '38px',
                height: '38px',
                borderRadius: '10px',
                background: 'linear-gradient(135deg, rgba(56, 189, 248, 0.2), rgba(99, 102, 241, 0.2))',
                border: '1px solid rgba(56, 189, 248, 0.4)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#38bdf8'
              }}
            >
              <FileText size={20} />
            </div>
            <div>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#f8fafc', margin: 0 }}>
                {name} — Resume
              </h3>
              <p style={{ fontSize: '0.82rem', color: '#94a3b8', margin: '2px 0 0 0' }}>
                Dedicated Clean Resume Document • Ready for Save as PDF
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
            {hasCustomFile && (
              <button
                onClick={handleDirectDownload}
                className="btn-secondary"
                style={{
                  padding: '0.45rem 0.95rem',
                  fontSize: '0.84rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  borderColor: 'rgba(56, 189, 248, 0.4)'
                }}
              >
                <Download size={15} /> Download Attached File
              </button>
            )}

            <button
              onClick={handlePrint}
              className="btn-glow"
              style={{
                padding: '0.45rem 1.15rem',
                fontSize: '0.84rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.45rem'
              }}
            >
              <Printer size={15} /> Save / Print PDF
            </button>

            <button
              onClick={onClose}
              className="close-btn"
              style={{
                background: 'rgba(255, 255, 255, 0.06)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '8px',
                color: '#cbd5e1',
                padding: '0.45rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
              title="Close modal"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Info Banner */}
        <div
          style={{
            padding: '0.65rem 1.75rem',
            background: 'rgba(56, 189, 248, 0.08)',
            borderBottom: '1px solid rgba(56, 189, 248, 0.15)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            fontSize: '0.82rem',
            color: '#38bdf8'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <CheckCircle2 size={15} />
            <span>
              <strong>Clean Resume View:</strong> Downloads/Prints <strong>only</strong> this exact resume document without any website copy or UI elements.
            </span>
          </div>
          <button
            onClick={handlePrint}
            style={{
              background: 'none',
              border: 'none',
              color: '#38bdf8',
              textDecoration: 'underline',
              cursor: 'pointer',
              fontWeight: 600,
              fontSize: '0.82rem'
            }}
          >
            Click to Save as PDF
          </button>
        </div>

        {/* Document Preview Scroll Area */}
        <div
          style={{
            flex: 1,
            overflowY: 'auto',
            padding: '1.5rem',
            background: '#090d16'
          }}
        >
          {/* Printable White Paper Document */}
          <div
            style={{
              maxWidth: '750px',
              margin: '0 auto',
              background: '#ffffff',
              color: '#000000',
              borderRadius: '4px',
              boxShadow: '0 10px 30px rgba(0, 0, 0, 0.5)',
              padding: '2.5rem 2.75rem',
              fontFamily: "'Times New Roman', Times, Georgia, serif",
              lineHeight: 1.5,
              fontSize: '11pt'
            }}
          >
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
        <div
          style={{
            padding: '1rem 1.75rem',
            borderTop: '1px solid rgba(255, 255, 255, 0.08)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            background: 'rgba(15, 23, 42, 0.95)'
          }}
        >
          <span style={{ fontSize: '0.82rem', color: '#94a3b8' }}>
            Tip: In the print dialog destination, choose <strong>"Save as PDF"</strong> to save your resume file.
          </span>

          <div style={{ display: 'flex', gap: '0.75rem' }}>
            <button
              onClick={onClose}
              className="btn-secondary"
              style={{ padding: '0.45rem 1rem', fontSize: '0.84rem' }}
            >
              Close
            </button>
            <button
              onClick={handlePrint}
              className="btn-glow"
              style={{ padding: '0.45rem 1.25rem', fontSize: '0.84rem' }}
            >
              <Download size={15} /> Save / Print PDF
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
