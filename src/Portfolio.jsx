import { useState, useEffect, useRef } from "react";

/* ═══════════════════════════════════════════════════════════
   ✏️  EASY EDIT ZONE — Update all your info right here!
   ═══════════════════════════════════════════════════════════ */
const DATA = {
  name: "Lohit Kumar",
  fullName: "Thotakura Lohit Kumar",
  role: "Java Developer",
  tagline: "Backend Engineer · Spring Boot · Microservices",
  bio: "I build scalable RESTful APIs and backend systems that actually ship to production. Currently pursuing M.Tech while engineering things that work.",
  email: "lohitkumar0103@gmail.com",
  phone: "+91-6303082637",
  linkedin: "https://linkedin.com/in/lohitkumar7",
  github: "https://github.com/Tlohitkumar",
  location: "Vijayawada, India",
  degree: "M.Tech CSE · KL University",

  stats: [
    { value: "20+", label: "REST APIs" },
    { value: "35%", label: "DB Speedup" },
    { value: "25+", label: "Endpoints" },
    { value: "10+", label: "Sprints" },
  ],

  skills: [
    { category: "Languages",     items: ["Java", "Python"] },
    { category: "Frameworks",    items: ["Spring Boot", "Spring Security", "Hibernate", "REST APIs"] },
    { category: "Databases",     items: ["PostgreSQL", "MySQL"] },
    { category: "DevOps & Tools",items: ["Docker", "Git", "GitHub", "Maven", "Postman", "Eclipse"] },
    { category: "Architecture",  items: ["Microservices", "MVC", "OOP", "Dependency Injection"] },
    { category: "Core Concepts", items: ["JWT Auth", "DSA", "Exception Handling"] },
    { category: "Practices",     items: ["Agile/Scrum", "Version Control", "CI/CD"] },
  ],

  experience: [
    {
      company:  "Blue Stock Fintech",
      role:     "Software Development Intern",
      period:   "Aug 2024 – Oct 2024",
      type:     "Remote",
      color:    "#b5ff47",
      points: [
        "Built 20+ REST APIs using Spring Boot layered architecture (Controller → Service → Repository)",
        "Optimized PostgreSQL schema and queries for high concurrency — cut execution time by 35%",
        "Validated 25+ API endpoints via Postman across 10+ sprint cycles",
        "Collaborated with QA & frontend to deliver production-ready backend services",
        "Supported cloud deployment & environment config for scalable delivery",
      ],
    },
  ],

  projects: [
    {
      title:   "Bank Statement Categorizer",
      url:     "https://bankstatementcategorizer.vercel.app/",
      tag:     "Live",
      stack:   ["Java", "Spring Boot", "MySQL", "NLP"],
      color:   "#b5ff47",
      impact:  "90% NLP accuracy",
      desc:    "Backend transaction engine processing 200+ transactions with automated NLP-based expense categorization and real-time financial data processing.",
    },
    {
      title:   "E-Commerce Store",
      url:     "https://github.com/EcommerceStore",
      tag:     "GitHub",
      stack:   ["Java", "Spring Boot", "MySQL", "JPA"],
      color:   "#c4b5fd",
      impact:  "20+ DB tables",
      desc:    "Full backend with Spring Data JPA across 20+ relational tables, 5+ CRUD operations, and modular OOP component design.",
    },
    {
      title:   "Patient Management System",
      url:     "https://github.com/PatientManagementSystem",
      tag:     "GitHub",
      stack:   ["Spring Microservices", "PostgreSQL", "Docker", "JWT"],
      color:   "#fbbf24",
      impact:  "Dockerized",
      desc:    "Microservices-based patient records & appointments with JWT auth, Spring Beans, Lombok, and containerized Docker deployment.",
    },
  ],

  education: [
    {
      degree:  "M.Tech — Computer Science & Engineering",
      school:  "KL Deemed University",
      loc:     "Vijayawada, India",
      period:  "May 2024 – May 2026",
      active:  true,
    },
    {
      degree:  "B.Tech — Electrical & Electronics Engineering",
      school:  "NRI Institute of Technology",
      loc:     "Vijayawada, India",
      period:  "May 2020 – May 2024",
      active:  false,
    },
  ],

  certifications: [
    { icon: "☁️", name: "Oracle Cloud Infrastructure", detail: "Docker · CI/CD · Containerization" },
    { icon: "⚡", name: "Scrum Fundamentals Certified",  detail: "Agile · Sprint Planning · Iterative Delivery" },
  ],

  openSource: [
    "Contributing to open-source Java backend projects via feature development and bug fixes",
    "Supporting developer community growth by sharing job updates and technical guidance",
  ],
};
/* ═══════════════════════════════════════════════════════════ */

const FONTS = `@import url('https://fonts.googleapis.com/css2?family=Cabinet+Grotesk:wght@400;500;700;800;900&family=Instrument+Serif:ital@0;1&family=JetBrains+Mono:wght@400;500&display=swap');`;

const css = `
  *,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
  :root{
    --cream:#f5f0e8;
    --ink:#0f0e0d;
    --lime:#b5ff47;
    --violet:#c4b5fd;
    --border:2px solid #0f0e0d;
    --shadow:4px 4px 0 #0f0e0d;
    --shadow-lg:6px 6px 0 #0f0e0d;
    --r:8px;
  }
  body{background:var(--cream);color:var(--ink);font-family:'Cabinet Grotesk',sans-serif;overflow-x:hidden;}

  @keyframes fadeUp{from{opacity:0;transform:translateY(24px)}to{opacity:1;transform:translateY(0)}}
  @keyframes spin{to{transform:rotate(360deg)}}
  @keyframes marquee{from{transform:translateX(0)}to{transform:translateX(-50%)}}
  @keyframes pulse{0%,100%{opacity:1}50%{opacity:0.4}}

  .fade-in{animation:fadeUp .55s ease both}
  .d1{animation-delay:.05s}.d2{animation-delay:.15s}.d3{animation-delay:.25s}.d4{animation-delay:.35s}

  /* Nav */
  .nav{
    position:fixed;top:0;left:0;right:0;z-index:200;
    background:var(--cream);border-bottom:var(--border);
    padding:0 clamp(16px,4vw,48px);
    display:flex;align-items:center;justify-content:space-between;height:56px;
  }
  .nav-logo{
    font-family:'Instrument Serif',serif;font-size:1.25rem;font-style:italic;
    text-decoration:none;color:var(--ink);
  }
  .nav-links{display:flex;gap:4px;list-style:none;}
  .nav-links a{
    font-size:.72rem;font-weight:700;letter-spacing:.1em;text-transform:uppercase;
    color:var(--ink);text-decoration:none;padding:6px 12px;border-radius:100px;
    transition:background .18s,color .18s;
  }
  .nav-links a:hover{background:var(--ink);color:var(--cream);}
  .nav-cta{
    font-size:.72rem;font-weight:800;letter-spacing:.08em;text-transform:uppercase;
    background:var(--lime);color:var(--ink);border:var(--border);
    padding:7px 18px;border-radius:100px;cursor:pointer;
    box-shadow:3px 3px 0 var(--ink);
    transition:box-shadow .15s,transform .15s;text-decoration:none;
  }
  .nav-cta:hover{box-shadow:1px 1px 0 var(--ink);transform:translate(2px,2px);}

  /* Hamburger */
  .hamburger{display:none;flex-direction:column;gap:5px;cursor:pointer;padding:4px;}
  .hamburger span{display:block;width:22px;height:2px;background:var(--ink);transition:.25s;}
  .hamburger.open span:nth-child(1){transform:translateY(7px) rotate(45deg);}
  .hamburger.open span:nth-child(2){opacity:0;}
  .hamburger.open span:nth-child(3){transform:translateY(-7px) rotate(-45deg);}
  .mobile-menu{
    display:none;position:fixed;top:56px;left:0;right:0;z-index:199;
    background:var(--cream);border-bottom:var(--border);
    padding:16px clamp(16px,4vw,48px);flex-direction:column;gap:4px;
  }
  .mobile-menu.open{display:flex;}
  .mobile-menu a{
    font-size:.85rem;font-weight:700;letter-spacing:.08em;text-transform:uppercase;
    color:var(--ink);text-decoration:none;padding:10px 12px;border-radius:var(--r);
    transition:background .15s;
  }
  .mobile-menu a:hover{background:rgba(0,0,0,.06);}

  /* Sections */
  .section{padding:80px clamp(16px,4vw,48px);}
  .section-inner{max-width:1140px;margin:0 auto;}
  .sec-label{
    display:inline-flex;align-items:center;gap:8px;
    font-family:'JetBrains Mono',monospace;font-size:.68rem;font-weight:500;
    letter-spacing:.14em;text-transform:uppercase;
    background:var(--ink);color:var(--cream);
    padding:4px 12px;border-radius:100px;margin-bottom:20px;
  }
  h2.sec-title{
    font-family:'Instrument Serif',serif;
    font-size:clamp(2.2rem,5vw,3.6rem);
    font-weight:400;line-height:1.1;
    margin-bottom:48px;
  }

  /* Hero */
  #hero{
    padding-top:calc(56px + 48px);padding-bottom:48px;
    padding-left:clamp(16px,4vw,48px);padding-right:clamp(16px,4vw,48px);
  }
  .hero-inner{max-width:1140px;margin:0 auto;}
  .hero-top{
    display:grid;grid-template-columns:1fr auto;gap:24px;align-items:start;
    margin-bottom:40px;
  }
  .hero-eyebrow{
    font-family:'JetBrains Mono',monospace;font-size:.7rem;font-weight:500;
    letter-spacing:.14em;text-transform:uppercase;color:#6b6560;margin-bottom:16px;
    display:flex;align-items:center;gap:8px;
  }
  .hero-eyebrow::before{
    content:'';display:inline-block;width:8px;height:8px;
    border-radius:50%;background:var(--lime);border:var(--border);
    animation:pulse 2s ease infinite;
  }
  .hero-name{
    font-family:'Instrument Serif',serif;
    font-size:clamp(2.6rem,7vw,7rem);
    font-weight:400;line-height:.95;
    letter-spacing:-.02em;
    white-space:nowrap;
  }
  .hero-name em{font-style:italic;color:#5a5550;}
  .hero-contact-strip{
    display:flex;flex-wrap:wrap;gap:0;
    border:var(--border);border-radius:var(--r);
    overflow:hidden;box-shadow:var(--shadow);
    margin-top:16px;
  }
  .hc-item{
    display:flex;align-items:center;gap:7px;
    padding:9px 16px;border-right:var(--border);
    font-family:'JetBrains Mono',monospace;
    font-size:.68rem;font-weight:500;letter-spacing:.04em;
    background:var(--cream);color:var(--ink);
    text-decoration:none;transition:background .15s;
    white-space:nowrap;
  }
  .hc-item:last-child{border-right:none;}
  .hc-item:hover{background:var(--lime);}
  .hc-icon{font-size:.75rem;opacity:.7;}
  .hero-role-pill{
    background:var(--lime);border:var(--border);
    padding:10px 20px;border-radius:100px;
    font-size:.8rem;font-weight:800;letter-spacing:.06em;text-transform:uppercase;
    box-shadow:var(--shadow);white-space:nowrap;height:fit-content;margin-top:16px;
  }
  .hero-bottom{
    display:grid;grid-template-columns:1fr 1fr;gap:24px;align-items:end;
    border-top:var(--border);padding-top:32px;
  }
  .hero-bio{
    font-family:'Instrument Serif',serif;
    font-size:clamp(1.05rem,2vw,1.3rem);
    line-height:1.65;color:#4a4540;font-style:italic;
  }
  .hero-stats{display:flex;gap:0;border:var(--border);border-radius:var(--r);overflow:hidden;box-shadow:var(--shadow);}
  .hero-stat{
    flex:1;text-align:center;padding:16px 12px;border-right:var(--border);
  }
  .hero-stat:last-child{border-right:none;}
  .hero-stat:nth-child(odd){background:var(--ink);color:var(--cream);}
  .hero-stat-val{font-size:1.6rem;font-weight:900;line-height:1;}
  .hero-stat-lbl{font-size:.62rem;font-weight:700;letter-spacing:.1em;text-transform:uppercase;opacity:.65;margin-top:3px;}
  .hero-actions{display:flex;gap:10px;flex-wrap:wrap;margin-top:24px;}

  /* Buttons */
  .btn{
    font-size:.75rem;font-weight:800;letter-spacing:.08em;text-transform:uppercase;
    padding:10px 22px;border-radius:100px;border:var(--border);
    cursor:pointer;text-decoration:none;display:inline-flex;align-items:center;gap:6px;
    box-shadow:3px 3px 0 var(--ink);transition:box-shadow .15s,transform .15s;
    font-family:'Cabinet Grotesk',sans-serif;
  }
  .btn:hover{box-shadow:1px 1px 0 var(--ink);transform:translate(2px,2px);}
  .btn-lime{background:var(--lime);color:var(--ink);}
  .btn-violet{background:var(--violet);color:var(--ink);}
  .btn-plain{background:var(--cream);color:var(--ink);}
  .btn-dark{background:var(--ink);color:var(--cream);}

  /* Marquee ticker */
  .ticker{
    overflow:hidden;border-top:var(--border);border-bottom:var(--border);
    padding:12px 0;background:var(--ink);
  }
  .ticker-track{
    display:flex;width:max-content;
    animation:marquee 22s linear infinite;
  }
  .ticker-item{
    font-family:'JetBrains Mono',monospace;
    font-size:.72rem;font-weight:500;letter-spacing:.1em;
    color:var(--cream);white-space:nowrap;padding:0 24px;opacity:.7;
  }
  .ticker-dot{color:var(--lime);}

  /* Skills */
  #skills{background:#f0ebe0;}
  .skills-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(260px,1fr));gap:12px;}
  .skill-card{
    background:var(--cream);border:var(--border);border-radius:var(--r);
    padding:20px;box-shadow:var(--shadow);
    transition:transform .2s,box-shadow .2s;
  }
  .skill-card:hover{transform:translate(-2px,-2px);box-shadow:var(--shadow-lg);}
  .skill-cat{
    font-family:'JetBrains Mono',monospace;
    font-size:.65rem;font-weight:500;letter-spacing:.12em;text-transform:uppercase;
    color:#6b6560;margin-bottom:10px;
  }
  .skill-pills{display:flex;flex-wrap:wrap;gap:6px;}
  .skill-pill{
    font-size:.78rem;font-weight:700;
    padding:4px 11px;border-radius:100px;border:var(--border);
    background:transparent;
    transition:background .15s;cursor:default;
  }
  .skill-pill:hover{background:var(--lime);}

  /* Experience */
  .exp-wrapper{display:grid;grid-template-columns:200px 1fr;gap:0;border:var(--border);border-radius:var(--r);overflow:hidden;box-shadow:var(--shadow-lg);}
  .exp-sidebar{background:var(--ink);color:var(--cream);padding:28px 24px;display:flex;flex-direction:column;gap:16px;}
  .exp-company{font-family:'Instrument Serif',serif;font-size:1.4rem;font-style:italic;line-height:1.2;}
  .exp-period{font-family:'JetBrains Mono',monospace;font-size:.65rem;letter-spacing:.1em;opacity:.6;}
  .exp-type-pill{
    background:var(--lime);color:var(--ink);
    font-size:.65rem;font-weight:800;letter-spacing:.1em;text-transform:uppercase;
    padding:4px 10px;border-radius:100px;border:1.5px solid var(--cream);
    align-self:flex-start;
  }
  .exp-content{padding:28px;}
  .exp-role{
    font-family:'JetBrains Mono',monospace;font-size:.72rem;font-weight:500;
    letter-spacing:.12em;text-transform:uppercase;color:#6b6560;margin-bottom:18px;
  }
  .exp-points{list-style:none;display:flex;flex-direction:column;gap:10px;}
  .exp-point{
    font-size:.92rem;color:#3a3530;padding-left:20px;position:relative;line-height:1.55;
  }
  .exp-point::before{
    content:'→';position:absolute;left:0;color:var(--ink);font-weight:900;font-size:.8rem;top:1px;
  }

  /* Projects */
  #projects{background:#f0ebe0;}
  .projects-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(300px,1fr));gap:16px;}
  .proj-card{
    border:var(--border);border-radius:var(--r);overflow:hidden;
    box-shadow:var(--shadow);
    display:flex;flex-direction:column;
    transition:transform .2s,box-shadow .2s;
  }
  .proj-card:hover{transform:translate(-3px,-3px);box-shadow:var(--shadow-lg);}
  .proj-header{padding:22px;border-bottom:var(--border);}
  .proj-tag-row{display:flex;align-items:center;justify-content:space-between;margin-bottom:10px;}
  .proj-impact-pill{
    font-family:'JetBrains Mono',monospace;
    font-size:.65rem;font-weight:500;letter-spacing:.1em;
    padding:3px 10px;border-radius:100px;border:var(--border);
  }
  .proj-tag{
    font-size:.65rem;font-weight:800;letter-spacing:.1em;text-transform:uppercase;
    padding:3px 10px;border-radius:100px;border:var(--border);background:var(--cream);
  }
  .proj-title{font-family:'Instrument Serif',serif;font-size:1.35rem;font-style:italic;line-height:1.2;margin-bottom:6px;}
  .proj-body{padding:16px 22px;flex:1;}
  .proj-desc{font-size:.88rem;color:#4a4540;line-height:1.6;margin-bottom:14px;}
  .proj-stack{display:flex;flex-wrap:wrap;gap:5px;}
  .proj-tech{
    font-family:'JetBrains Mono',monospace;
    font-size:.65rem;letter-spacing:.06em;
    padding:3px 8px;border-radius:4px;background:rgba(0,0,0,.06);border:1px solid rgba(0,0,0,.12);
  }
  .proj-footer{padding:14px 22px;border-top:var(--border);display:flex;justify-content:flex-end;}
  .proj-link{
    font-family:'JetBrains Mono',monospace;
    font-size:.68rem;font-weight:500;letter-spacing:.1em;text-transform:uppercase;
    color:var(--ink);text-decoration:none;display:flex;align-items:center;gap:5px;
    transition:gap .2s;
  }
  .proj-link:hover{gap:10px;}

  /* Education */
  .edu-list{display:flex;flex-direction:column;gap:0;}
  .edu-item{
    display:grid;grid-template-columns:160px 1fr;gap:0;
    border:var(--border);border-radius:var(--r);overflow:hidden;
    box-shadow:var(--shadow);margin-bottom:14px;
  }
  .edu-date-col{
    background:var(--ink);color:var(--cream);
    padding:24px 20px;
    display:flex;flex-direction:column;justify-content:center;gap:6px;
  }
  .edu-period{font-family:'JetBrains Mono',monospace;font-size:.65rem;letter-spacing:.1em;opacity:.65;line-height:1.6;}
  .edu-active{
    font-size:.6rem;font-weight:800;letter-spacing:.1em;text-transform:uppercase;
    background:var(--lime);color:var(--ink);
    padding:3px 8px;border-radius:100px;align-self:flex-start;
  }
  .edu-content{padding:24px;background:var(--cream);}
  .edu-degree{font-family:'Instrument Serif',serif;font-size:1.25rem;font-style:italic;margin-bottom:5px;}
  .edu-school{font-size:.88rem;font-weight:700;color:#3a3530;margin-bottom:2px;}
  .edu-loc{font-size:.78rem;color:#8a847d;}

  /* Certs */
  #certifications{background:#f0ebe0;}
  .certs-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(280px,1fr));gap:14px;}
  .cert-card{
    background:var(--cream);border:var(--border);border-radius:var(--r);
    padding:22px;box-shadow:var(--shadow);
    display:flex;gap:14px;align-items:flex-start;
    transition:transform .2s,box-shadow .2s;
  }
  .cert-card:hover{transform:translate(-2px,-2px);box-shadow:var(--shadow-lg);}
  .cert-icon{
    font-size:1.4rem;width:44px;height:44px;
    border:var(--border);border-radius:var(--r);
    display:flex;align-items:center;justify-content:center;flex-shrink:0;
    background:var(--lime);
  }
  .cert-name{font-size:.95rem;font-weight:800;margin-bottom:3px;}
  .cert-detail{font-family:'JetBrains Mono',monospace;font-size:.67rem;color:#6b6560;letter-spacing:.06em;}

  /* Footer */
  footer{
    background:var(--ink);color:var(--cream);
    padding:60px clamp(16px,4vw,48px);
    border-top:var(--border);
  }
  .footer-inner{max-width:1140px;margin:0 auto;}
  .footer-top{
    display:grid;grid-template-columns:1fr auto;
    gap:32px;align-items:center;
    border-bottom:1px solid rgba(255,255,255,.12);
    padding-bottom:40px;margin-bottom:32px;
  }
  .footer-name{
    font-family:'Instrument Serif',serif;
    font-size:clamp(2rem,5vw,4rem);
    font-style:italic;line-height:1;
  }
  .footer-name span{color:var(--lime);}
  .footer-tagline{font-family:'JetBrains Mono',monospace;font-size:.7rem;letter-spacing:.12em;opacity:.5;margin-top:8px;text-transform:uppercase;}
  .footer-links{display:flex;flex-direction:column;gap:10px;align-items:flex-end;}
  .footer-link{
    font-family:'JetBrains Mono',monospace;font-size:.7rem;letter-spacing:.1em;text-transform:uppercase;
    color:rgba(255,255,255,.55);text-decoration:none;
    transition:color .15s;display:flex;align-items:center;gap:8px;
  }
  .footer-link:hover{color:var(--lime);}
  .footer-link::after{content:'→';transition:transform .15s;}
  .footer-link:hover::after{transform:translateX(4px);}
  .footer-bottom{display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:12px;}
  .footer-copy{font-family:'JetBrains Mono',monospace;font-size:.65rem;opacity:.35;letter-spacing:.08em;}

  /* Responsive */
  @media(max-width:768px){
    .nav-links,.nav-cta{display:none;}
    .hamburger{display:flex;}
    .hero-top{grid-template-columns:1fr;}
    .hero-name{white-space:normal;font-size:clamp(2.4rem,10vw,5rem);}
    .hero-contact-strip{flex-direction:column;}
    .hc-item{border-right:none;border-bottom:var(--border);}
    .hc-item:last-child{border-bottom:none;}
    .hero-role-pill{align-self:flex-start;}
    .hero-bottom{grid-template-columns:1fr;}
    .hero-stats{display:grid;grid-template-columns:1fr 1fr;}
    .exp-wrapper{grid-template-columns:1fr;}
    .exp-sidebar{flex-direction:row;flex-wrap:wrap;align-items:center;padding:18px;}
    .edu-item{grid-template-columns:1fr;}
    .edu-date-col{flex-direction:row;align-items:center;justify-content:space-between;padding:14px 18px;}
    .footer-top{grid-template-columns:1fr;}
    .footer-links{align-items:flex-start;}
    .footer-bottom{flex-direction:column;align-items:flex-start;}
  }
`;

const TICKER_ITEMS = [
  "Java Developer", "Spring Boot", "REST APIs", "PostgreSQL",
  "Microservices", "Docker", "JWT Auth", "Agile/Scrum",
  "Open Source", "Backend Engineering", "System Design",
];

export default function Portfolio() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const sectionRefs = useRef({});

  useEffect(() => {
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => e.isIntersecting && setActiveSection(e.target.id)),
      { threshold: 0.35 }
    );
    document.querySelectorAll("section[id]").forEach(s => obs.observe(s));
    return () => obs.disconnect();
  }, []);

  const navLinks = ["skills", "experience", "projects", "education", "certifications"];

  return (
    <>
      <style>{FONTS}{css}</style>

      {/* NAV */}
      <nav className="nav">
        <a href="#hero" className="nav-logo">{DATA.name}</a>
        <ul className="nav-links">
          {navLinks.map(l => (
            <li key={l}>
              <a
                href={`#${l}`}
                style={activeSection === l ? { background: "var(--ink)", color: "var(--cream)" } : {}}
              >
                {l}
              </a>
            </li>
          ))}
        </ul>
        <a href={`mailto:${DATA.email}`} className="nav-cta">Hire Me</a>
        <div
          className={`hamburger ${menuOpen ? "open" : ""}`}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span /><span /><span />
        </div>
      </nav>
      <div className={`mobile-menu ${menuOpen ? "open" : ""}`}>
        {navLinks.map(l => (
          <a key={l} href={`#${l}`} onClick={() => setMenuOpen(false)}>
            {l.charAt(0).toUpperCase() + l.slice(1)}
          </a>
        ))}
        <a href={`mailto:${DATA.email}`} onClick={() => setMenuOpen(false)}>✉ Hire Me</a>
      </div>

      {/* HERO */}
      <section id="hero" ref={el => sectionRefs.current.hero = el}>
        <div className="hero-inner">
          <div className="hero-top fade-in d1">
            <div>
              <div className="hero-eyebrow">{DATA.tagline}</div>
              <h1 className="hero-name">
                {DATA.name.split(" ")[0]} <em>{DATA.name.split(" ").slice(1).join(" ")}</em>
              </h1>
              {/* Contact + Degree strip */}
              <div className="hero-contact-strip">
                <span className="hc-item"><span className="hc-icon">🎓</span>{DATA.degree}</span>
                <a href={`mailto:${DATA.email}`} className="hc-item"><span className="hc-icon">✉</span>{DATA.email}</a>
                <a href={`tel:${DATA.phone}`} className="hc-item"><span className="hc-icon">📞</span>{DATA.phone}</a>
              </div>
            </div>
            <div className="hero-role-pill fade-in d2">{DATA.role} ✦</div>
          </div>
          <div className="hero-bottom fade-in d3">
            <div>
              <p className="hero-bio">&ldquo;{DATA.bio}&rdquo;</p>
              <div className="hero-actions">
                <a href={`mailto:${DATA.email}`} className="btn btn-lime">✉ Email Me</a>
                <a href={DATA.github} target="_blank" rel="noreferrer" className="btn btn-dark">⌥ GitHub</a>
                <a href={DATA.linkedin} target="_blank" rel="noreferrer" className="btn btn-violet">in LinkedIn</a>
              </div>
            </div>
            <div>
              <div className="hero-stats fade-in d4">
                {DATA.stats.map(s => (
                  <div className="hero-stat" key={s.label}>
                    <div className="hero-stat-val">{s.value}</div>
                    <div className="hero-stat-lbl">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TICKER */}
      <div className="ticker">
        <div className="ticker-track">
          {[...TICKER_ITEMS, ...TICKER_ITEMS].map((item, i) => (
            <span className="ticker-item" key={i}>
              {item} <span className="ticker-dot">✦</span>
            </span>
          ))}
        </div>
      </div>

      {/* SKILLS */}
      <section id="skills" className="section" ref={el => sectionRefs.current.skills = el}>
        <div className="section-inner">
          <span className="sec-label">01 — Skills</span>
          <h2 className="sec-title">What I work with</h2>
          <div className="skills-grid">
            {DATA.skills.map(g => (
              <div className="skill-card" key={g.category}>
                <div className="skill-cat">{g.category}</div>
                <div className="skill-pills">
                  {g.items.map(item => (
                    <span className="skill-pill" key={item}>{item}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* EXPERIENCE */}
      <section id="experience" className="section" ref={el => sectionRefs.current.experience = el}>
        <div className="section-inner">
          <span className="sec-label">02 — Experience</span>
          <h2 className="sec-title">Where I've worked</h2>
          {DATA.experience.map(e => (
            <div className="exp-wrapper" key={e.company}>
              <div className="exp-sidebar">
                <div className="exp-company">{e.company}</div>
                <div className="exp-period">{e.period}</div>
                <div className="exp-type-pill">{e.type}</div>
              </div>
              <div className="exp-content">
                <div className="exp-role">{e.role}</div>
                <ul className="exp-points">
                  {e.points.map((p, i) => (
                    <li className="exp-point" key={i}>{p}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* PROJECTS */}
      <section id="projects" className="section" ref={el => sectionRefs.current.projects = el}>
        <div className="section-inner">
          <span className="sec-label">03 — Projects</span>
          <h2 className="sec-title">Things I've built</h2>
          <div className="projects-grid">
            {DATA.projects.map(p => (
              <div className="proj-card" key={p.title} style={{ background: p.color }}>
                <div className="proj-header">
                  <div className="proj-tag-row">
                    <span className="proj-impact-pill">{p.impact}</span>
                    <span className="proj-tag">{p.tag}</span>
                  </div>
                  <div className="proj-title">{p.title}</div>
                </div>
                <div className="proj-body">
                  <p className="proj-desc">{p.desc}</p>
                  <div className="proj-stack">
                    {p.stack.map(t => <span className="proj-tech" key={t}>{t}</span>)}
                  </div>
                </div>
                <div className="proj-footer">
                  <a className="proj-link" href={p.url} target="_blank" rel="noreferrer">
                    View Project →
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* EDUCATION */}
      <section id="education" className="section" ref={el => sectionRefs.current.education = el}>
        <div className="section-inner">
          <span className="sec-label">04 — Education</span>
          <h2 className="sec-title">Academic background</h2>
          <div className="edu-list">
            {DATA.education.map(e => (
              <div className="edu-item" key={e.degree}>
                <div className="edu-date-col">
                  <div className="edu-period">{e.period}</div>
                  {e.active && <div className="edu-active">Active</div>}
                </div>
                <div className="edu-content">
                  <div className="edu-degree">{e.degree}</div>
                  <div className="edu-school">{e.school}</div>
                  <div className="edu-loc">📍 {e.loc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CERTIFICATIONS */}
      <section id="certifications" className="section" ref={el => sectionRefs.current.certifications = el}>
        <div className="section-inner">
          <span className="sec-label">05 — Credentials</span>
          <h2 className="sec-title">Certified in</h2>
          <div className="certs-grid">
            {DATA.certifications.map(c => (
              <div className="cert-card" key={c.name}>
                <div className="cert-icon">{c.icon}</div>
                <div>
                  <div className="cert-name">{c.name}</div>
                  <div className="cert-detail">{c.detail}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer id="contact">
        <div className="footer-inner">
          <div className="footer-top">
            <div>
              <div className="footer-name">
                Let's <span>work</span><br />together.
              </div>
              <div className="footer-tagline">{DATA.role} · {DATA.location}</div>
            </div>
            <div className="footer-links">
              <a href={`mailto:${DATA.email}`} className="footer-link">Email</a>
              <a href={DATA.linkedin} target="_blank" rel="noreferrer" className="footer-link">LinkedIn</a>
              <a href={DATA.github} target="_blank" rel="noreferrer" className="footer-link">GitHub</a>
              <a href={`tel:${DATA.phone}`} className="footer-link">Phone</a>
            </div>
          </div>
          <div className="footer-bottom">
            <span className="footer-copy">© {new Date().getFullYear()} {DATA.fullName}</span>
            <span className="footer-copy">Designed & built with ✦</span>
          </div>
        </div>
      </footer>
    </>
  );
}
