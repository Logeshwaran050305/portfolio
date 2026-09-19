import React from 'react';
import { User, Phone, Mail } from 'lucide-react';

export function PrintableResume({
  personalInfo
}) {
  const name = personalInfo?.name || 'LOGESHWARAN G';
  const phone = personalInfo?.phone || '+91 7200693638';
  const email = personalInfo?.email || 'parthalogesh0@gmail.com';
  const summary = personalInfo?.summary ||
    'Highly analytical and results-oriented professional with strong data analysis and web development expertise. Proven ability to extract insights from complex datasets and build robust web applications. Eager to contribute to a dynamic team, leveraging a passion for technology and continuous learning.';

  return (
    <div
      id="printable-resume-container"
      style={{
        width: '100%',
        maxWidth: '760px',
        margin: '0 auto',
        padding: '24px 20px',
        background: '#ffffff',
        color: '#000000',
        fontFamily: "'Times New Roman', Times, Georgia, serif",
        fontSize: '11pt',
        lineHeight: 1.5
      }}
    >
      {/* CONTACT */}
      <div style={{ fontSize: '14pt', fontWeight: 'bold', color: '#000000', marginBottom: '12px' }}>
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
          marginBottom: '20px'
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
      <div style={{ fontSize: '13pt', fontWeight: 'bold', fontStyle: 'italic', color: '#000000', marginBottom: '8px' }}>
        Summary
      </div>
      <p style={{ fontSize: '11pt', lineHeight: '1.45', color: '#000000', textAlign: 'justify', margin: '0 0 18px 0' }}>
        {summary}
      </p>

      {/* Skills */}
      <div style={{ fontSize: '13pt', fontWeight: 'bold', fontStyle: 'italic', color: '#000000', marginBottom: '8px' }}>
        Skills
      </div>
      <div style={{ fontSize: '11pt', lineHeight: '1.5', color: '#000000', marginBottom: '6px' }}>
        <strong>Data Analytics:</strong> SQL, Python Pandas , R, Excel, Power BI, Data Visualization, Statistical Analysis, Machine Learning Basics.
      </div>
      <div style={{ fontSize: '11pt', lineHeight: '1.5', color: '#000000', marginBottom: '6px' }}>
        <strong>Web Development:</strong> HTML, CSS, JavaScript (React.js), Node.js (Express), Python , Git, Design, Database ,
      </div>
      <div style={{ fontSize: '11pt', lineHeight: '1.5', color: '#000000', marginBottom: '18px' }}>
        <strong>Other:</strong> Agile, Problem Solving, Communication, Teamwork, MS Excel, Vibe Coding, AI
      </div>

      {/* Education */}
      <div style={{ fontSize: '13pt', fontWeight: 'bold', fontStyle: 'italic', color: '#000000', marginBottom: '8px' }}>
        Education
      </div>

      <div style={{ fontSize: '11pt', fontWeight: 'bold', textTransform: 'uppercase', marginBottom: '4px', letterSpacing: '0.5px' }}>
        HIGHER SECONDARY
      </div>
      <div style={{ fontSize: '11pt', color: '#000000', marginBottom: '14px' }}>
        ST. Antony’s Higher Secondary School ,Coonoor ,Nilagiri,Tamil Nadu.
      </div>

      <div style={{ fontSize: '11pt', fontWeight: 'bold', textTransform: 'uppercase', marginBottom: '4px', letterSpacing: '0.5px' }}>
        COLLEGE
      </div>
      <ul style={{ listStyleType: 'disc', margin: '0 0 18px 24px', padding: 0, fontSize: '11pt', lineHeight: '1.5', color: '#000000' }}>
        <li style={{ marginBottom: '3px' }}>BCA</li>
        <li style={{ marginBottom: '3px' }}>Computer Application</li>
        <li style={{ marginBottom: '3px' }}>Sri Ramakrishna Mission Vidyalaya College Of Art And Science</li>
      </ul>

      {/* Certifications / Awards */}
      <div style={{ fontSize: '13pt', fontWeight: 'bold', fontStyle: 'italic', color: '#000000', marginBottom: '8px' }}>
        Certifications / Awards
      </div>
      <ul style={{ listStyleType: 'disc', margin: '0 0 14px 24px', padding: 0, fontSize: '11pt', lineHeight: '1.5', color: '#000000' }}>
        <li style={{ marginBottom: '3px' }}>Google AI Essentials</li>
        <li style={{ marginBottom: '3px' }}>AWS academy cloud foundations</li>
        <li style={{ marginBottom: '3px' }}>Coursera Introduction to Data Analysis using Microsoft Excel</li>
        <li style={{ marginBottom: '3px' }}>NPTEL The Joy of Computing using python</li>
      </ul>
    </div>
  );
}
