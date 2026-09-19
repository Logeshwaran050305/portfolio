/**
 * Utility for generating, previewing, printing, and downloading
 * clean, professional ATS-standard Resume matching Logeshwaran G's exact resume format.
 */

export function generateResumeHTML({ personalInfo }) {
  const name = personalInfo?.name || "LOGESHWARAN G";
  const phone = personalInfo?.phone || "+91 7200693638";
  const email = personalInfo?.email || "parthalogesh0@gmail.com";
  const summary = personalInfo?.summary || 
    "Highly analytical and results-oriented professional with strong data analysis and web development expertise. Proven ability to extract insights from complex datasets and build robust web applications. Eager to contribute to a dynamic team, leveraging a passion for technology and continuous learning.";

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>${name} - Resume</title>
  <style>
    @page {
      size: A4;
      margin: 20mm 20mm 20mm 20mm;
    }
    *, *::before, *::after {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }
    body {
      font-family: 'Times New Roman', Times, Georgia, 'Palatino Linotype', serif;
      color: #000000;
      background: #ffffff;
      line-height: 1.5;
      font-size: 11pt;
      padding: 0;
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
    }
    .resume-container {
      max-width: 760px;
      margin: 0 auto;
      background: #ffffff;
      padding: 10px 0;
    }
    
    /* Section Headings */
    .section-title {
      font-size: 14pt;
      font-weight: bold;
      color: #000000;
      margin-top: 24px;
      margin-bottom: 12px;
    }
    .section-title.first-title {
      margin-top: 0;
    }
    .section-title.italic-title {
      font-style: italic;
    }

    /* Contact Row */
    .contact-row {
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      gap: 16px;
      font-size: 11.5pt;
      font-weight: bold;
      margin-bottom: 16px;
    }
    .contact-item {
      display: inline-flex;
      align-items: center;
      gap: 6px;
    }
    .contact-item svg {
      width: 16px;
      height: 16px;
      flex-shrink: 0;
    }
    
    /* Text paragraphs */
    .paragraph-text {
      font-size: 11pt;
      line-height: 1.45;
      color: #000000;
      text-align: justify;
      margin-bottom: 14px;
    }

    /* Skills groups */
    .skills-group {
      font-size: 11pt;
      line-height: 1.5;
      margin-bottom: 10px;
      color: #000000;
    }
    .skills-label {
      font-weight: normal;
    }

    /* Education */
    .edu-subheading {
      font-size: 11pt;
      font-weight: bold;
      text-transform: uppercase;
      margin-top: 10px;
      margin-bottom: 6px;
      letter-spacing: 0.5px;
    }
    .edu-school-name {
      font-size: 11pt;
      margin-bottom: 12px;
      color: #000000;
    }

    /* Bullet lists */
    .resume-bullets {
      list-style-type: disc;
      margin-left: 24px;
      margin-bottom: 14px;
      font-size: 11pt;
      line-height: 1.5;
    }
    .resume-bullets li {
      margin-bottom: 4px;
    }
  </style>
</head>
<body>
  <div class="resume-container">
    
    <!-- CONTACT SECTION -->
    <div class="section-title first-title">CONTACT</div>
    <div class="contact-row">
      <div class="contact-item">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
          <circle cx="12" cy="7" r="4"></circle>
        </svg>
        <span>${name},</span>
      </div>
      <div class="contact-item">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
        </svg>
        <span>${phone},</span>
      </div>
      <div class="contact-item">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <rect width="20" height="16" x="2" y="4" rx="2"></rect>
          <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
        </svg>
        <span>${email}</span>
      </div>
    </div>

    <!-- SUMMARY SECTION -->
    <div class="section-title italic-title">Summary</div>
    <p class="paragraph-text">
      ${summary}
    </p>

    <!-- SKILLS SECTION -->
    <div class="section-title italic-title">Skills</div>
    <div class="skills-group">
      <strong>Data Analytics:</strong> SQL, Python Pandas , R, Excel, Power BI, Data Visualization, Statistical Analysis, Machine Learning Basics.
    </div>
    <div class="skills-group">
      <strong>Web Development:</strong> HTML, CSS, JavaScript (React.js), Node.js (Express), Python , Git, Design, Database ,
    </div>
    <div class="skills-group">
      <strong>Other:</strong> Agile, Problem Solving, Communication, Teamwork, MS Excel, Vibe Coding, AI
    </div>

    <!-- EDUCATION SECTION -->
    <div class="section-title italic-title">Education</div>
    
    <div class="edu-subheading">HIGHER SECONDARY</div>
    <div class="edu-school-name">ST. Antony’s Higher Secondary School ,Coonoor ,Nilagiri,Tamil Nadu.</div>

    <div class="edu-subheading">COLLEGE</div>
    <ul class="resume-bullets">
      <li>BCA</li>
      <li>Computer Application</li>
      <li>Sri Ramakrishna Mission Vidyalaya College Of Art And Science</li>
    </ul>

    <!-- CERTIFICATIONS / AWARDS SECTION -->
    <div class="section-title italic-title">Certifications / Awards</div>
    <ul class="resume-bullets">
      <li>Google AI Essentials</li>
      <li>AWS academy cloud foundations</li>
      <li>Coursera Introduction to Data Analysis using Microsoft Excel</li>
      <li>NPTEL The Joy of Computing using python</li>
    </ul>

  </div>
</body>
</html>
  `;
}

/**
 * Trigger clean isolated print/PDF generation without ANY website elements.
 */
export function printCleanResume(data) {
  const htmlContent = generateResumeHTML(data);

  // Create an isolated hidden iframe
  const iframe = document.createElement('iframe');
  iframe.style.position = 'fixed';
  iframe.style.right = '0';
  iframe.style.bottom = '0';
  iframe.style.width = '0';
  iframe.style.height = '0';
  iframe.style.border = '0';
  iframe.style.visibility = 'hidden';
  iframe.setAttribute('title', 'Resume Document Print View');

  document.body.appendChild(iframe);

  const doc = iframe.contentWindow.document;
  doc.open();
  doc.write(htmlContent);
  doc.close();

  // Wait for rendering then trigger print
  setTimeout(() => {
    try {
      iframe.contentWindow.focus();
      iframe.contentWindow.print();
    } catch (err) {
      console.error('Error invoking print:', err);
    } finally {
      // Clean up after 3 seconds
      setTimeout(() => {
        if (iframe && iframe.parentNode) {
          iframe.parentNode.removeChild(iframe);
        }
      }, 3000);
    }
  }, 350);
}

/**
 * Handle direct file download if available, or trigger clean print/PDF save
 */
export function handleResumeDownloadAction(data, { onDirectDownload, onFallbackPrint } = {}) {
  const resumeUrl = data?.personalInfo?.resumeUrl;
  const resumeFileName = data?.personalInfo?.resumeFileName || `${(data?.personalInfo?.name || 'LOGESHWARAN_G').replace(/\s+/g, '_')}_Resume.pdf`;

  if (resumeUrl && typeof resumeUrl === 'string' && resumeUrl.trim() && resumeUrl !== '#') {
    const link = document.createElement('a');
    link.href = resumeUrl;
    link.download = resumeFileName;
    link.target = '_blank';
    link.rel = 'noreferrer';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    if (onDirectDownload) onDirectDownload();
    return;
  }

  // Fallback: trigger clean printable ATS resume
  printCleanResume(data);
  if (onFallbackPrint) onFallbackPrint();
}
