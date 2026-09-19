export const personalInfo = {
  name: "Logeshwaran G",
  greeting: "Hi, I'm",
  brandName: "Logeshwaran.dev",
  statusBadge: "Available for Full-time Roles & Projects",
  roleTitle: "Full-Stack Web Developer & Data Analyst",
  typingRoles: [
    "Web Developer (React.js & Node.js)",
    "Data Analyst (Python, SQL & Power BI)",
    "AI & Cloud Practitioner",
    "Creative Problem Solver"
  ],
  phone: "+91 7200693638",
  email: "parthalogesh0@gmail.com",
  logoImage: "",
  profileImage: "",
  location: "Coonoor, Nilgiris, Tamil Nadu, India",
  summary:
    "Highly analytical and results-oriented professional with strong data analysis and web development expertise. Proven ability to extract actionable insights from complex datasets and build robust, high-performance web applications. Eager to contribute to a dynamic team, leveraging a passion for technology and continuous learning.",
  footerText: "Logeshwaran G | Thanks for visiting, come again 🫂",
  socials: {
    github: "https://github.com/",
    linkedin: "https://linkedin.com/",
    email: "mailto:parthalogesh0@gmail.com",
    phone: "tel:+917200693638"
  },
  stats: [
    { label: "Core Domains", value: "2", suffix: " (Web & Data)" },
    { label: "Certifications", value: "4", suffix: " Verified" },
    { label: "Technologies", value: "15+", suffix: " Mastered" },
    { label: "Dedication", value: "100%", suffix: " Focus" }
  ]
};

export const defaultSectionHeaders = {
  about: {
    tag: "About Me",
    title: "Blending Data Insights with Modern Web Tech",
    subtitle: "Passionate about extracting actionable intelligence from datasets and delivering intuitive, high-performance web applications."
  },
  skills: {
    tag: "Technical Skills",
    title: "Skills & Capabilities",
    subtitle: "Explore my technical skills, mastery levels, and areas of expertise across data analytics, full-stack web, and cloud tools."
  },
  projects: {
    tag: "Swipeable 3D Deck & Multi-Image Gallery",
    title: "Featured Projects",
    subtitle: "Swipe the 3D card deck or click on any project image to open the full multi-image parallax gallery view powered by Skiper UI."
  },
  certifications: {
    tag: "3D Coverflow Perspective (@skiper-ui/skiper49)",
    title: "Certifications & Verified Honors",
    subtitle: "Interactive 3D Inverted Coverflow Carousel. Click any certificate to open its full verified credential document."
  },
  education: {
    tag: "Academic Background",
    title: "Education & Milestones",
    subtitle: "Academic qualifications shaping computer science theory, software design, and analytical problem-solving."
  },
  contact: {
    tag: "Get In Touch",
    title: "Let's Connect & Collaborate",
    subtitle: "Whether you have an opportunity, a project to build, or a dataset to analyze, my inbox is open!"
  }
};

export const skillsData = {
  categories: [
    { id: "all", label: "⚡ All Capabilities", count: 19 },
    { id: "analytics", label: "📊 Data Analytics & AI", count: 8 },
    { id: "web", label: "💻 Web Engineering", count: 7 },
    { id: "tools", label: "🛠️ Tools & Cloud", count: 4 }
  ],
  skills: [
    // Data Analytics
    {
      name: "SQL & Relational DBs",
      level: 90,
      category: "analytics",
      icon: "Database",
      accent: "#38bdf8",
      glow: "rgba(56, 189, 248, 0.45)",
      badge: "Expert",
      desc: "Complex queries, joins, aggregations, query optimization & schemas"
    },
    {
      name: "Python (Pandas / NumPy)",
      level: 92,
      category: "analytics",
      icon: "Code",
      accent: "#60a5fa",
      glow: "rgba(96, 165, 250, 0.45)",
      badge: "Core Stack",
      desc: "Data cleaning, statistical wrangling, exploratory analysis & automation"
    },
    {
      name: "Power BI & DAX",
      level: 88,
      category: "analytics",
      icon: "BarChart3",
      accent: "#f59e0b",
      glow: "rgba(245, 158, 11, 0.45)",
      badge: "Visual BI",
      desc: "Dynamic dashboards, multi-source modeling & interactive KPI reports"
    },
    {
      name: "Excel & Data Modeling",
      level: 92,
      category: "analytics",
      icon: "FileSpreadsheet",
      accent: "#10b981",
      glow: "rgba(16, 185, 129, 0.45)",
      badge: "Advanced",
      desc: "XLOOKUP, Pivot Tables, conditional formulas & financial models"
    },
    {
      name: "R Statistical Language",
      level: 80,
      category: "analytics",
      icon: "LineChart",
      accent: "#818cf8",
      glow: "rgba(129, 140, 248, 0.45)",
      badge: "Stats",
      desc: "Statistical hypothesis testing, variance analysis & data frames"
    },
    {
      name: "Data Visualization (Seaborn/Matplotlib)",
      level: 90,
      category: "analytics",
      icon: "PieChart",
      accent: "#ec4899",
      glow: "rgba(236, 72, 153, 0.45)",
      badge: "Storytelling",
      desc: "Compelling infographics, correlation heatmaps & presentation plots"
    },
    {
      name: "Statistical Analysis",
      level: 85,
      category: "analytics",
      icon: "TrendingUp",
      accent: "#a855f7",
      glow: "rgba(168, 85, 247, 0.45)",
      badge: "Theory",
      desc: "Probability distributions, regression modeling & confidence intervals"
    },
    {
      name: "Machine Learning Foundations",
      level: 78,
      category: "analytics",
      icon: "Cpu",
      accent: "#06b6d4",
      glow: "rgba(6, 182, 212, 0.45)",
      badge: "Predictive",
      desc: "Classification, clustering, scikit-learn pipelines & model metrics"
    },

    // Web Development
    {
      name: "React.js (v19 / Modern Hooks)",
      level: 88,
      category: "web",
      icon: "Layers",
      accent: "#38bdf8",
      glow: "rgba(56, 189, 248, 0.45)",
      badge: "Frontend",
      desc: "Modern functional components, state management, SPA routers & hooks"
    },
    {
      name: "JavaScript (ES6+ / Async)",
      level: 90,
      category: "web",
      icon: "Code2",
      accent: "#fbbf24",
      glow: "rgba(251, 191, 36, 0.45)",
      badge: "Core Language",
      desc: "Promises, fetch/async-await, closures, modern ES features & DOM"
    },
    {
      name: "Node.js & Express APIs",
      level: 82,
      category: "web",
      icon: "Server",
      accent: "#22c55e",
      glow: "rgba(34, 197, 94, 0.45)",
      badge: "Backend",
      desc: "RESTful architecture, middleware pipelines, routing & controllers"
    },
    {
      name: "Modern CSS3 & Animations",
      level: 95,
      category: "web",
      icon: "Layout",
      accent: "#3b82f6",
      glow: "rgba(59, 130, 246, 0.45)",
      badge: "UI Styling",
      desc: "3D transforms, glassmorphism, responsive grid/flexbox & dark UI"
    },
    {
      name: "Database Architecture",
      level: 86,
      category: "web",
      icon: "HardDrive",
      accent: "#6366f1",
      glow: "rgba(99, 102, 241, 0.45)",
      badge: "Storage",
      desc: "Schema design, relational integrity, indexing & normalization"
    },
    {
      name: "Git & Version Control",
      level: 88,
      category: "web",
      icon: "GitBranch",
      accent: "#f97316",
      glow: "rgba(249, 115, 22, 0.45)",
      badge: "DevOps",
      desc: "Collaborative Git flow, PR workflows, merging & branch strategies"
    },
    {
      name: "UI / UX & Product Design",
      level: 85,
      category: "web",
      icon: "Palette",
      accent: "#d946ef",
      glow: "rgba(217, 70, 239, 0.45)",
      badge: "Experience",
      desc: "Visual hierarchy, micro-interactions, clean aesthetics & accessibility"
    },

    // Tools & Methodologies
    {
      name: "AI Workflows & Vibe Coding",
      level: 95,
      category: "tools",
      icon: "Sparkles",
      accent: "#f43f5e",
      glow: "rgba(244, 63, 94, 0.45)",
      badge: "Next-Gen",
      desc: "Prompt engineering, rapid prototyping & modern AI-powered dev"
    },
    {
      name: "Agile & Team Collaboration",
      level: 90,
      category: "tools",
      icon: "Users",
      accent: "#0ea5e9",
      glow: "rgba(14, 165, 233, 0.45)",
      badge: "Methodology",
      desc: "Sprint planning, cross-functional communication & problem tracking"
    },
    {
      name: "Analytical Problem Solving",
      level: 95,
      category: "tools",
      icon: "Lightbulb",
      accent: "#eab308",
      glow: "rgba(234, 179, 8, 0.45)",
      badge: "Mindset",
      desc: "Deconstructing complex bugs, architectural bottlenecks & edge cases"
    },
    {
      name: "AWS Cloud Foundations",
      level: 80,
      category: "tools",
      icon: "Cloud",
      accent: "#f97316",
      glow: "rgba(249, 115, 22, 0.45)",
      badge: "Cloud",
      desc: "EC2, S3 storage, IAM security policies & cloud architecture basics"
    }
  ]
};

export const projectsData = [
  {
    id: 1,
    title: "Global Sales & Business Intelligence Dashboard",
    category: "Data Analytics & BI",
    image: "/projects/project-1/img1.jpg",
    gallery: [
      "/projects/project-1/img1.jpg",
      "/projects/project-1/img2.jpg",
      "/projects/project-1/img3.jpg",
      "/projects/sales_bi_dashboard.jpg",
      "/projects/python_eda_charts.jpg",
      "/projects/react_web_app.jpg"
    ],
    tags: ["Power BI", "SQL", "Excel", "DAX", "Data Modeling"],
    description:
      "An executive sales performance and operational dashboard analyzing multi-year revenue trends, customer segmentation, regional sales variance, and inventory metrics.",
    features: [
      "Dynamic slicers & drill-through KPIs for regional sales variance",
      "Automated data pipeline transforming raw CSVs and transactional SQL tables",
      "Executive summary cards showing MoM and YoY growth indicators"
    ],
    github: "https://github.com/",
    live: "#",
    badge: "Power BI"
  },
  {
    id: 2,
    title: "Data Insights & Exploratory Data Analysis Suite",
    category: "Python & Data Science",
    image: "/projects/project-2/img1.jpg",
    gallery: [
      "/projects/project-2/img1.jpg",
      "/projects/project-2/img2.jpg",
      "/projects/project-2/img3.jpg",
      "/projects/python_eda_charts.jpg",
      "/projects/sales_bi_dashboard.jpg",
      "/projects/ml_dashboard.jpg"
    ],
    tags: ["Python", "Pandas", "Matplotlib", "Seaborn", "Jupyter"],
    description:
      "End-to-end data exploration toolkit utilizing Pandas and statistical models to cleanse messy datasets, impute missing values, identify outliers, and render visualizations.",
    features: [
      "Correlation matrix heatmap & predictive trend forecasting",
      "Automated summary statistics, violin plots and distribution curves",
      "Clean export pipelines for business presentations and reports"
    ],
    github: "https://github.com/",
    live: "#",
    badge: "Python EDA"
  },
  {
    id: 3,
    title: "Nexus Analytics Modern Full-Stack Web App",
    category: "Web Engineering",
    image: "/projects/project-3/img1.jpg",
    gallery: [
      "/projects/project-3/img1.jpg",
      "/projects/project-3/img2.jpg",
      "/projects/project-3/img3.jpg",
      "/projects/react_web_app.jpg",
      "/projects/sql_etl_monitor.jpg",
      "/projects/sales_bi_dashboard.jpg"
    ],
    tags: ["React.js", "Node.js", "Express", "REST APIs", "Modern CSS"],
    description:
      "A responsive, full-stack web application featuring user authentication, interactive state management, RESTful CRUD operations, and responsive mobile-first UI.",
    features: [
      "Modular component architecture with custom hooks & state stores",
      "Secure backend endpoints with Express & JSON schema validation",
      "Sleek glassmorphic dark theme, interactive charts & micro-interactions"
    ],
    github: "https://github.com/",
    live: "#",
    badge: "Full-Stack"
  },
  {
    id: 4,
    title: "Predictive Analytics & Machine Learning Pipeline",
    category: "Machine Learning & AI",
    image: "/projects/project-4/img1.jpg",
    gallery: [
      "/projects/project-4/img1.jpg",
      "/projects/project-4/img2.jpg",
      "/projects/project-4/img3.jpg",
      "/projects/ml_dashboard.jpg",
      "/projects/python_eda_charts.jpg",
      "/projects/react_web_app.jpg"
    ],
    tags: ["Scikit-Learn", "Python", "NumPy", "ML Algorithms", "Statistics"],
    description:
      "Machine learning model pipeline trained on structured customer records to predict churn probabilities, evaluate feature importances, and generate actionable insights.",
    features: [
      "Hyperparameter tuning, cross-validation, and ROC-AUC curve evaluation",
      "Data preprocessing pipeline with standard scalers and encodings",
      "Confusion matrix and neural weight activation visual evaluations"
    ],
    github: "https://github.com/",
    live: "#",
    badge: "Machine Learning"
  },
  {
    id: 5,
    title: "Automated SQL ETL Pipeline & Database Optimizer",
    category: "Database & Backend",
    image: "/projects/project-5/img1.jpg",
    gallery: [
      "/projects/project-5/img1.jpg",
      "/projects/project-5/img2.jpg",
      "/projects/project-5/img3.jpg",
      "/projects/sql_etl_monitor.jpg",
      "/projects/react_web_app.jpg",
      "/projects/sales_bi_dashboard.jpg"
    ],
    tags: ["PostgreSQL", "SQL", "Python ETL", "Data Warehousing", "Indexing"],
    description:
      "High-throughput data extraction, transformation, and loading pipeline designed to ingest transactional logs, optimize relational queries with indexes, and generate reports.",
    features: [
      "Automated scheduled batch ingestion scripts and error monitoring",
      "Complex analytical queries with CTEs and window functions",
      "Optimized database indexing improving query latency by 45%"
    ],
    github: "https://github.com/",
    live: "#",
    badge: "Database"
  }
];

export const certificationsData = [
  {
    id: "google-ai",
    title: "Google AI Essentials",
    issuer: "Google",
    date: "Verified",
    icon: "Sparkles",
    image: "/certificates/google_ai.jpg",
    credentialId: "GAI-ESS-2023-A4C8-5067",
    badgeColor: "border-amber-500/40 bg-amber-500/10 text-amber-300",
    glowColor: "rgba(245, 158, 11, 0.4)",
    foilGradient: "linear-gradient(135deg, rgba(245, 158, 11, 0.3) 0%, rgba(59, 130, 246, 0.3) 50%, rgba(236, 72, 153, 0.3) 100%)",
    description: "Foundations of AI technologies, prompt engineering, generative AI workflows, model tuning, and ethical considerations for practical software problem solving.",
    skillsValidated: ["Generative AI", "Prompt Engineering", "AI Productivity Tools", "Machine Learning Ethics"]
  },
  {
    id: "aws-cloud",
    title: "AWS Academy Cloud Foundations",
    issuer: "Amazon Web Services (AWS)",
    date: "Verified",
    icon: "Cloud",
    image: "/certificates/aws_cloud.jpg",
    credentialId: "AWS-ACAD-CF-98234-LGG",
    badgeColor: "border-orange-500/40 bg-orange-500/10 text-orange-300",
    glowColor: "rgba(249, 115, 22, 0.4)",
    foilGradient: "linear-gradient(135deg, rgba(249, 115, 22, 0.35) 0%, rgba(234, 179, 8, 0.35) 50%, rgba(99, 102, 241, 0.3) 100%)",
    description: "Comprehensive understanding of cloud computing architecture, AWS core compute (EC2), S3 storage, networking (VPC), IAM security, and pricing models.",
    skillsValidated: ["Cloud Computing", "AWS Core Services", "S3 Storage & EC2", "IAM Security Policies"]
  },
  {
    id: "coursera-excel",
    title: "Introduction to Data Analysis using Microsoft Excel",
    issuer: "Coursera",
    date: "Verified",
    icon: "FileSpreadsheet",
    image: "/certificates/coursera_excel.jpg",
    credentialId: "COURSERA-DA-EXCEL-77312",
    badgeColor: "border-emerald-500/40 bg-emerald-500/10 text-emerald-300",
    glowColor: "rgba(16, 185, 129, 0.4)",
    foilGradient: "linear-gradient(135deg, rgba(16, 185, 129, 0.35) 0%, rgba(6, 182, 212, 0.35) 50%, rgba(59, 130, 246, 0.3) 100%)",
    description: "Mastery of spreadsheet data wrangling, Pivot Tables, conditional formulas, multi-criteria filtering, VLOOKUP/XLOOKUP, and executive visual dashboard generation.",
    skillsValidated: ["Advanced Excel", "Data Cleaning", "Pivot Tables & Slicers", "Business Intelligence Reporting"]
  },
  {
    id: "nptel-python",
    title: "The Joy of Computing using Python",
    issuer: "NPTEL / IIT Madras",
    date: "Verified",
    icon: "Code2",
    image: "/certificates/nptel_python.jpg",
    credentialId: "NPTEL23CS01S43567890",
    badgeColor: "border-blue-500/40 bg-blue-500/10 text-blue-300",
    glowColor: "rgba(56, 189, 248, 0.4)",
    foilGradient: "linear-gradient(135deg, rgba(56, 189, 248, 0.35) 0%, rgba(99, 102, 241, 0.35) 50%, rgba(168, 85, 247, 0.3) 100%)",
    description: "In-depth computer science foundations, algorithmic problem solving, recursion, data structures, and computational thinking using the Python programming language.",
    skillsValidated: ["Python Programming", "Algorithm Design", "Data Structures", "Computational Problem Solving"]
  }
];

export const educationData = [
  {
    degree: "BCA (Bachelor of Computer Applications)",
    major: "Computer Application & Software Development",
    institution: "Sri Ramakrishna Mission Vidyalaya College Of Arts and Science",
    location: "Tamil Nadu, India",
    period: "Undergraduate Degree",
    type: "College",
    highlights: [
      "Rigorous coursework in Data Structures, Database Management, and Object-Oriented Programming",
      "Hands-on project work in Web Technologies, Software Engineering, and Computer Networks",
      "Active participation in technical symposiums, coding challenges, and collaborative workshops"
    ]
  },
  {
    degree: "Higher Secondary Certificate (HSC)",
    major: "Computer Science & General Academics",
    institution: "St. Antony's Higher Secondary School",
    location: "Coonoor, Nilgiris, Tamil Nadu",
    period: "Higher Secondary",
    type: "School",
    highlights: [
      "Built strong mathematical, logical reasoning, and initial computer programming fundamentals",
      "Participated in school academic clubs and community initiatives in the Nilgiris district"
    ]
  }
];

export const aboutHighlights = [
  {
    title: "Data-Driven Analyst",
    desc: "Transforming raw data into clear, actionable visual dashboards and analytical insights that power strategic decisions.",
    icon: "BarChart3"
  },
  {
    title: "Modern Web Developer",
    desc: "Crafting fast, responsive, and visually appealing web interfaces with React, modern JavaScript, and clean backend APIs.",
    icon: "Layout"
  },
  {
    title: "Continuous Learner & AI Adopter",
    desc: "Passionate about leveraging modern AI workflows, cloud computing, and cutting-edge tech to deliver superior results.",
    icon: "Zap"
  }
];
