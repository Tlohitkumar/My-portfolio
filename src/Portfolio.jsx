import { useState, useEffect, useRef } from "react";

/* ═══════════════════════════════════════════════════════════
   ✏️  EASY EDIT ZONE — Update all your info right here!
   ═══════════════════════════════════════════════════════════ */
const DATA = {
  name:      "Lohit Kumar",
  fullName:  "Thotakura Lohit Kumar",
  role:      "Software Engineer ✦ Presenter ✦ Quick Learner",
  tagline:   "Backend Engineer · Spring Boot · Microservices",
  bio:       "Product-focused Java Backend Developer skilled in rapidly building and deploying REST APIs using Spring Boot and Microservices. Experienced in end-to-end development, database optimization, and integrating AI/NLP features for real-world applications.",
  email:     "lohitkumar0103@gmail.com",
  phone:     "+91-6303082637",
  linkedin:  "https://linkedin.com/in/lohitkumar7",
  github:    "https://github.com/Tlohitkumar",
  location:  "Vijayawada, India",
  degree:    "Masters in Computer Science",
  resumeUrl: "/Lohit_Resume_Software_Engineer.pdf",
  logoUrl:   "/LohitLogo.png",

  stats: [
    { value: "20+", label: "REST APIs"  },
    { value: "35%", label: "DB Speedup" },
    { value: "25+", label: "Endpoints"  },
    { value: "10+", label: "Sprints"    },
  ],

  skills: [
    { category: "Languages",      items: ["Java", "Python", "HTML", "CSS"] },
    { category: "Frameworks",     items: ["Spring Boot", "Spring Security", "Hibernate", "REST APIs"] },
    { category: "Databases",      items: ["MySQL"] },
    { category: "DevOps & Tools", items: ["Docker", "Git", "GitHub", "Maven", "Postman", "Eclipse"] },
    { category: "Architecture",   items: ["Microservices", "MVC", "OOP", "Dependency Injection"] },
    { category: "Core Concepts",  items: ["JWT Auth", "DSA", "Exception Handling", "Unit Testing"] },
    { category: "Practices",      items: ["Agile/Scrum", "Version Control"] },
  ],

  experience: [
    {
      company: "Blue Stock Fintech",
      role:    "Software Development Intern",
      period:  "Aug 2024 – Oct 2024",
      type:    "Remote",
      points: [
        "Developed 20+ REST APIs using Spring Boot layered architecture (Controller → Service → Repository)",
        "Optimized MySQL schema and queries for high concurrency — cut execution time by 35%",
        "Validated 25+ API endpoints via Postman across 10+ sprint cycles",
        "Collaborated with QA & frontend to deliver production-ready backend services",
        "Supported cloud deployment & environment config for scalable delivery",
      ],
    },
  ],

  projects: [
    {
      title:  "Personalized News Aggregator",
      url:    "https://github.com/Tlohitkumar/NewsAggregator",
      tag:    "GitHub",
      stack:  ["Java", "React", "MySQL", "JWT", "Python (Flask)", "NLP"],
      impact: "AI + Bias Detection",
      desc:   "Scalable news platform with Spring Boot, React & MySQL delivering personalized real-time news. Features NLP-based bias & sentiment engine classifying content as Left, Right, or Neutral.",
    },
    {
      title:  "Bank Statement Categorizer",
      url:    "https://bankstatementcategorizer.vercel.app/",
      tag:    "Live",
      stack:  ["Java", "Spring Boot", "MySQL", "NLP"],
      impact: "90% NLP accuracy",
      desc:   "Backend transaction engine processing 200+ transactions with automated NLP-based expense categorization and real-time financial data processing.",
    },
    {
      title:  "Patient Management System",
      url:    "https://github.com/PatientManagementSystem",
      tag:    "GitHub",
      stack:  ["Spring Microservices", "PostgreSQL", "Docker", "JWT"],
      impact: "Dockerized",
      desc:   "Microservices-based patient records & appointments with JWT auth, Spring Beans, Lombok, and containerized Docker deployment.",
    },
  ],

  education: [
    {
      degree: "M.Tech — Computer Science & Engineering",
      school: "KL Deemed University",
      loc:    "Vijayawada, India",
      period: "May 2024 – May 2026",
      active: true,
    },
    {
      degree: "B.Tech — Electrical & Electronics Engineering",
      school: "NRI Institute of Technology",
      loc:    "Vijayawada, India",
      period: "May 2020 – May 2024",
      active: false,
    },
  ],

  certifications: [
    { icon: "☁️", name: "Oracle Cloud Infrastructure",  detail: "Docker · CI/CD · Containerization"           },
    { icon: "⚡", name: "Scrum Fundamentals Certified", detail: "Agile · Sprint Planning · Iterative Delivery" },
  ],
};
/* ═══════════════════════════════════════════════════════════ */

const FONTS = `@import url('https://fonts.googleapis.com/css2?family=Cabinet+Grotesk:wght@400;500;700;800;900&family=Instrument+Serif:ital,wght@0,400;1,400&family=JetBrains+Mono:wght@400;500&display=swap');`;

const css = `
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  :root {
    --white:      #ffffff;
    --off:        #faf8f4;
    --ink:        #1a1208;
    --gold:       #c49a3c;
    --gold-light: #e8c96a;
    --gold-pale:  #fdf6e3;
    --gold-mid:   #d4aa50;
    --border:       2px solid #1a1208;
    --border-gold:  2px solid #c49a3c;
    --shadow:       4px 4px 0 #1a1208;
    --shadow-gold:  4px 4px 0 #c49a3c;
    --r: 8px;
  }
  body { background:var(--white); color:var(--ink); font-family:'Cabinet Grotesk',sans-serif; font-size:16px; line-height:1.7; overflow-x:hidden; }

  @keyframes fadeUp  { from{opacity:0;transform:translateY(22px)} to{opacity:1;transform:translateY(0)} }
  @keyframes marquee { from{transform:translateX(0)} to{transform:translateX(-50%)} }
  @keyframes pulse   { 0%,100%{opacity:1} 50%{opacity:.35} }
  .fade-in{animation:fadeUp .55s ease both;}
  .d1{animation-delay:.05s}.d2{animation-delay:.15s}.d3{animation-delay:.25s}.d4{animation-delay:.35s}

  /* NAV */
  nav {
    position:fixed;top:0;left:0;right:0;z-index:200;
    background:var(--white);border-bottom:var(--border);
    padding:0 clamp(16px,4vw,48px);
    display:flex;align-items:center;justify-content:space-between;height:58px;
  }
  .nav-brand{display:flex;align-items:center;gap:10px;text-decoration:none;}
  .nav-logo-box{
    width:34px;height:34px;border:var(--border);border-radius:var(--r);
    overflow:hidden;flex-shrink:0;background:var(--gold);
    display:flex;align-items:center;justify-content:center;
  }
  .nav-logo-box img{width:100%;height:100%;object-fit:cover;display:block;}
  .nav-logo-fallback{font-family:'Instrument Serif',serif;font-style:italic;font-size:1.1rem;color:#fff;}
  .nav-brand-text{font-family:'Instrument Serif',serif;font-size:1rem;font-style:italic;color:var(--ink);}
  .nav-links{display:flex;gap:3px;list-style:none;}
  .nav-links a{font-size:.65rem;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:var(--ink);text-decoration:none;padding:6px 12px;border-radius:100px;transition:background .18s,color .18s;}
  .nav-links a:hover,.nav-links a.active{background:var(--ink);color:var(--white);}
  .nav-right{display:flex;align-items:center;gap:8px;}
  .nav-dl{font-size:.65rem;font-weight:800;letter-spacing:.08em;text-transform:uppercase;background:var(--white);color:var(--ink);border:var(--border);padding:7px 16px;border-radius:100px;box-shadow:2px 2px 0 var(--gold);text-decoration:none;transition:box-shadow .15s,transform .15s;display:flex;align-items:center;gap:5px;}
  .nav-dl:hover{box-shadow:1px 1px 0 var(--gold);transform:translate(1px,1px);background:var(--gold-pale);}
  .nav-cta{font-size:.65rem;font-weight:800;letter-spacing:.08em;text-transform:uppercase;background:var(--gold);color:#fff;border:var(--border);padding:7px 18px;border-radius:100px;box-shadow:2px 2px 0 var(--ink);text-decoration:none;transition:box-shadow .15s,transform .15s;}
  .nav-cta:hover{box-shadow:1px 1px 0 var(--ink);transform:translate(1px,1px);background:var(--gold-mid);}

  .hamburger{display:none;flex-direction:column;gap:5px;cursor:pointer;padding:4px;}
  .hamburger span{display:block;width:22px;height:2px;background:var(--ink);transition:.25s;}
  .hamburger.open span:nth-child(1){transform:translateY(7px) rotate(45deg);}
  .hamburger.open span:nth-child(2){opacity:0;}
  .hamburger.open span:nth-child(3){transform:translateY(-7px) rotate(-45deg);}
  .mobile-menu{display:none;position:fixed;top:58px;left:0;right:0;z-index:199;background:var(--white);border-bottom:var(--border);padding:16px clamp(16px,4vw,48px);flex-direction:column;gap:4px;}
  .mobile-menu.open{display:flex;}
  .mobile-menu a{font-size:.85rem;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:var(--ink);text-decoration:none;padding:10px 12px;border-radius:var(--r);transition:background .15s;}
  .mobile-menu a:hover{background:var(--gold-pale);}

  /* HERO */
  #hero{padding-top:calc(58px + 48px);padding-bottom:48px;padding-left:clamp(16px,4vw,48px);padding-right:clamp(16px,4vw,48px);}
  .hero-inner{max-width:1140px;margin:0 auto;}
  .hero-top{display:grid;grid-template-columns:1fr auto;gap:24px;align-items:flex-start;margin-bottom:40px;}
  .hero-eyebrow{font-family:'JetBrains Mono',monospace;font-size:.7rem;font-weight:500;letter-spacing:.14em;text-transform:uppercase;color:#7a6a40;margin-bottom:16px;display:flex;align-items:center;gap:8px;}
  .eyebrow-dot{display:inline-block;width:8px;height:8px;border-radius:50%;background:var(--gold);border:var(--border);animation:pulse 2s ease infinite;}
  .hero-name{font-family:'Instrument Serif',serif;font-size:clamp(2.6rem,7vw,7rem);font-weight:400;line-height:.95;letter-spacing:-.02em;color:var(--ink);white-space:nowrap;}
  .hero-name em{font-style:italic;color:var(--ink);}
  .hero-role-pill {
    background: var(--gold); color: #fff;
    border: var(--border); border-radius: 100px;
    overflow: hidden; box-shadow: var(--shadow);
    display: inline-flex; align-items: stretch;
    font-family: 'Cabinet Grotesk', sans-serif;
    font-size: .7rem; font-weight: 800; letter-spacing: .05em; text-transform: uppercase;
    height: fit-content; margin-top: 14px; flex-shrink: 0;
    white-space: nowrap;
  }
  .pill-seg {
    padding: 11px 15px;
    display: flex; align-items: center; justify-content: center;
    white-space: nowrap; line-height: 1;
  }
  .pill-seg:not(:last-child) { border-right: 2px solid rgba(255,255,255,.25); }
  .hero-contact-strip{display:flex;flex-wrap:wrap;border:var(--border);border-radius:var(--r);overflow:hidden;box-shadow:var(--shadow-gold);margin-top:16px;}
  .hc-item{display:flex;align-items:center;gap:7px;padding:9px 18px;border-right:var(--border);font-family:'JetBrains Mono',monospace;font-size:.68rem;font-weight:500;letter-spacing:.03em;background:var(--white);color:var(--ink);text-decoration:none;transition:background .15s;white-space:nowrap;}
  .hc-item:first-child{background:var(--gold-pale);}
  .hc-item:last-child{border-right:none;}
  .hc-item:hover{background:var(--gold-pale);}
  .hero-bottom{display:grid;grid-template-columns:1fr 1fr;gap:24px;align-items:end;border-top:var(--border);padding-top:32px;}
  .hero-bio{font-family:'Instrument Serif',serif;font-size:clamp(1.05rem,2vw,1.3rem);line-height:1.65;color:#5a4a28;font-style:italic;margin-bottom:20px;}
  .hero-actions{display:flex;gap:10px;flex-wrap:wrap;}
  .hero-stats{display:flex;border:var(--border);border-radius:var(--r);overflow:hidden;box-shadow:var(--shadow);}
  .hero-stat{flex:1;text-align:center;padding:16px 10px;border-right:var(--border);}
  .hero-stat:last-child{border-right:none;}
  .hero-stat:nth-child(odd){background:var(--ink);color:#fff;}
  .hero-stat:nth-child(even){background:var(--gold-pale);color:var(--ink);}
  .hero-stat-val{font-size:1.6rem;font-weight:900;line-height:1;}
  .hero-stat-lbl{font-size:.6rem;font-weight:700;letter-spacing:.1em;text-transform:uppercase;opacity:.65;margin-top:3px;}

  /* BUTTONS */
  .btn{font-size:.75rem;font-weight:800;letter-spacing:.08em;text-transform:uppercase;padding:10px 22px;border-radius:100px;border:var(--border);cursor:pointer;text-decoration:none;display:inline-flex;align-items:center;gap:6px;box-shadow:3px 3px 0 var(--ink);transition:box-shadow .15s,transform .15s;font-family:'Cabinet Grotesk',sans-serif;}
  .btn:hover{box-shadow:1px 1px 0 var(--ink);transform:translate(2px,2px);}
  .btn-gold{background:var(--gold);color:#fff;}
  .btn-gold:hover{background:var(--gold-mid);}
  .btn-dark{background:var(--ink);color:#fff;}
  .btn-white{background:var(--white);color:var(--ink);}
  .btn-resume{background:var(--white);color:var(--ink);border:2px dashed var(--ink);}
  .btn-resume:hover{background:var(--gold-pale);border-style:solid;}

  /* TICKER */
  .ticker{overflow:hidden;border-top:var(--border);border-bottom:var(--border);padding:12px 0;background:var(--gold);}
  .ticker-track{display:flex;width:max-content;animation:marquee 22s linear infinite;}
  .ticker-item{font-family:'JetBrains Mono',monospace;font-size:.72rem;font-weight:500;letter-spacing:.1em;color:rgba(255,255,255,.88);white-space:nowrap;padding:0 24px;}
  .ticker-dot{color:rgba(255,255,255,.55);}

  /* SECTION */
  section{padding:96px clamp(16px,4vw,48px);}
  .section-inner{max-width:1140px;margin:0 auto;}
  .sec-label{display:inline-flex;align-items:center;gap:6px;font-family:'JetBrains Mono',monospace;font-size:.68rem;font-weight:500;letter-spacing:.14em;text-transform:uppercase;background:var(--ink);color:#fff;padding:4px 12px;border-radius:100px;margin-bottom:18px;}
  h2.sec-title{font-family:'Instrument Serif',serif;font-size:clamp(2rem,4vw,3rem);font-weight:400;line-height:1.1;color:var(--ink);margin-bottom:48px;}

  /* SKILLS */
  #skills{background:var(--off);border-top:var(--border);border-bottom:var(--border);}
  .skills-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(250px,1fr));gap:14px;}
  .skill-card{background:var(--white);border:var(--border);border-radius:var(--r);padding:20px 22px;box-shadow:3px 3px 0 var(--gold);transition:transform .2s,box-shadow .2s;}
  .skill-card:hover{transform:translate(-2px,-2px);box-shadow:5px 5px 0 var(--gold);}
  .skill-cat{font-family:'JetBrains Mono',monospace;font-size:.64rem;font-weight:500;letter-spacing:.12em;text-transform:uppercase;color:var(--gold);margin-bottom:12px;}
  .skill-pills{display:flex;flex-wrap:wrap;gap:6px;}
  .skill-pill{font-size:.76rem;font-weight:700;padding:4px 11px;border-radius:100px;border:var(--border-gold);background:var(--gold-pale);color:var(--ink);transition:background .15s,color .15s;cursor:default;}
  .skill-pill:hover{background:var(--gold);color:#fff;}

  /* EXPERIENCE */
  .exp-wrapper{display:grid;grid-template-columns:200px 1fr;border:var(--border);border-radius:var(--r);overflow:hidden;box-shadow:var(--shadow-gold);}
  .exp-sidebar{background:var(--ink);color:#fff;padding:28px 24px;display:flex;flex-direction:column;gap:14px;}
  .exp-company{font-family:'Instrument Serif',serif;font-size:1.35rem;font-style:italic;line-height:1.2;}
  .exp-period{font-family:'JetBrains Mono',monospace;font-size:.64rem;letter-spacing:.1em;opacity:.55;}
  .exp-type-pill{background:var(--gold);color:#fff;font-size:.62rem;font-weight:800;letter-spacing:.1em;text-transform:uppercase;padding:4px 10px;border-radius:100px;border:1.5px solid var(--gold-light);align-self:flex-start;}
  .exp-content{padding:28px;background:var(--white);}
  .exp-role{font-family:'JetBrains Mono',monospace;font-size:.68rem;font-weight:500;letter-spacing:.12em;text-transform:uppercase;color:var(--gold);margin-bottom:18px;}
  .exp-points{list-style:none;display:flex;flex-direction:column;gap:10px;}
  .exp-point{font-size:.92rem;color:#3a3020;padding-left:20px;position:relative;line-height:1.55;}
  .exp-point::before{content:'→';position:absolute;left:0;color:var(--gold);font-weight:900;font-size:.8rem;top:1px;}

  /* PROJECTS */
  #projects{background:var(--off);border-top:var(--border);border-bottom:var(--border);}
  .projects-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(310px,1fr));gap:18px;}
  .proj-card{background:var(--white);border:var(--border);border-radius:var(--r);overflow:hidden;box-shadow:4px 4px 0 var(--gold);display:flex;flex-direction:column;transition:transform .2s,box-shadow .2s;}
  .proj-card:hover{transform:translate(-3px,-3px);box-shadow:7px 7px 0 var(--gold);}
  .proj-header{padding:22px;border-bottom:var(--border);background:var(--gold-pale);}
  .proj-tag-row{display:flex;align-items:center;justify-content:space-between;margin-bottom:10px;}
  .proj-impact{font-family:'JetBrains Mono',monospace;font-size:.63rem;font-weight:500;letter-spacing:.1em;padding:3px 10px;border-radius:100px;border:var(--border-gold);background:var(--white);color:var(--gold);}
  .proj-tag{font-size:.63rem;font-weight:800;letter-spacing:.1em;text-transform:uppercase;padding:3px 10px;border-radius:100px;border:var(--border);background:var(--white);color:var(--ink);}
  .proj-title{font-family:'Instrument Serif',serif;font-size:1.3rem;font-style:italic;}
  .proj-body{padding:18px 22px;flex:1;}
  .proj-desc{font-size:.88rem;color:#4a3820;line-height:1.6;margin-bottom:14px;}
  .proj-stack{display:flex;flex-wrap:wrap;gap:6px;}
  .proj-tech{font-family:'JetBrains Mono',monospace;font-size:.63rem;letter-spacing:.05em;padding:3px 8px;border-radius:4px;background:var(--gold-pale);border:1px solid #e0c870;color:var(--ink);}
  .proj-footer{padding:14px 22px;border-top:var(--border);display:flex;justify-content:flex-end;}
  .proj-link{font-family:'JetBrains Mono',monospace;font-size:.66rem;font-weight:500;letter-spacing:.1em;text-transform:uppercase;color:var(--gold);text-decoration:none;display:flex;align-items:center;gap:5px;transition:gap .2s;}
  .proj-link:hover{gap:10px;}

  /* EDUCATION */
  .edu-grid{display:grid;grid-template-columns:1fr 1fr;gap:16px;}
  .edu-card{border:var(--border);border-radius:var(--r);overflow:hidden;box-shadow:3px 3px 0 var(--gold);display:grid;grid-template-columns:140px 1fr;transition:box-shadow .2s,transform .2s;}
  .edu-card:hover{transform:translate(-2px,-2px);box-shadow:5px 5px 0 var(--gold);}
  .edu-date-col{background:var(--ink);color:#fff;padding:22px 16px;display:flex;flex-direction:column;justify-content:center;gap:8px;}
  .edu-period{font-family:'JetBrains Mono',monospace;font-size:.62rem;letter-spacing:.08em;opacity:.6;line-height:1.6;}
  .edu-active{font-size:.58rem;font-weight:800;letter-spacing:.1em;text-transform:uppercase;background:var(--gold);color:#fff;padding:3px 8px;border-radius:100px;align-self:flex-start;border:1.5px solid var(--gold-light);}
  .edu-content{padding:22px;background:var(--white);}
  .edu-degree{font-family:'Instrument Serif',serif;font-size:1.1rem;font-style:italic;margin-bottom:5px;}
  .edu-school{font-size:.88rem;font-weight:700;color:#3a3020;margin-bottom:3px;}
  .edu-loc{font-size:.76rem;color:#8a7a60;}

  /* CERTS */
  #certifications{background:var(--off);border-top:var(--border);border-bottom:var(--border);}
  .certs-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(290px,1fr));gap:14px;}
  .cert-card{background:var(--white);border:var(--border);border-radius:var(--r);padding:22px;box-shadow:3px 3px 0 var(--gold);display:flex;gap:14px;align-items:flex-start;transition:transform .2s,box-shadow .2s;}
  .cert-card:hover{transform:translate(-2px,-2px);box-shadow:5px 5px 0 var(--gold);}
  .cert-icon{font-size:1.3rem;width:44px;height:44px;border:var(--border-gold);border-radius:var(--r);display:flex;align-items:center;justify-content:center;flex-shrink:0;background:var(--gold-pale);}
  .cert-name{font-size:.95rem;font-weight:800;margin-bottom:4px;}
  .cert-detail{font-family:'JetBrains Mono',monospace;font-size:.66rem;color:var(--gold);letter-spacing:.06em;}

  /* RESUME BANNER */
  .resume-banner{background:var(--ink);color:#fff;border:var(--border);border-radius:var(--r);padding:20px 28px;display:flex;align-items:center;justify-content:space-between;box-shadow:4px 4px 0 var(--gold);gap:16px;flex-wrap:wrap;}
  .rb-label{font-family:'JetBrains Mono',monospace;font-size:.65rem;letter-spacing:.12em;text-transform:uppercase;opacity:.55;margin-bottom:3px;}
  .rb-title{font-family:'Instrument Serif',serif;font-size:1.15rem;font-style:italic;color:var(--gold-light);}
  .btn-dl{font-size:.7rem;font-weight:800;letter-spacing:.08em;text-transform:uppercase;background:var(--gold);color:#fff;border:2px solid var(--gold-light);padding:10px 24px;border-radius:100px;text-decoration:none;display:inline-flex;align-items:center;gap:7px;box-shadow:3px 3px 0 rgba(255,255,255,.15);transition:box-shadow .15s,transform .15s,background .15s;font-family:'Cabinet Grotesk',sans-serif;white-space:nowrap;}
  .btn-dl:hover{box-shadow:1px 1px 0 rgba(255,255,255,.1);transform:translate(2px,2px);background:var(--gold-mid);}

  /* FOOTER */
  footer{background:var(--ink);color:#fff;padding:60px clamp(16px,4vw,48px);border-top:var(--border);}
  .footer-inner{max-width:1140px;margin:0 auto;}
  .footer-top{display:grid;grid-template-columns:1fr auto;gap:32px;align-items:center;border-bottom:1px solid rgba(255,255,255,.1);padding-bottom:40px;margin-bottom:32px;}
  .footer-name{font-family:'Instrument Serif',serif;font-size:clamp(2rem,5vw,4rem);font-style:italic;line-height:1;}
  .footer-name span{color:var(--gold-light);}
  .footer-tagline{font-family:'JetBrains Mono',monospace;font-size:.68rem;letter-spacing:.12em;text-transform:uppercase;opacity:.4;margin-top:8px;}
  .footer-links{display:flex;flex-direction:column;gap:10px;align-items:flex-end;}
  .footer-link{font-family:'JetBrains Mono',monospace;font-size:.68rem;letter-spacing:.1em;text-transform:uppercase;color:rgba(255,255,255,.45);text-decoration:none;display:flex;align-items:center;gap:7px;transition:color .15s;}
  .footer-link:hover{color:var(--gold-light);}
  .footer-link::after{content:'→';transition:transform .15s;}
  .footer-link:hover::after{transform:translateX(4px);}
  .footer-bottom{display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:12px;}
  .footer-copy{font-family:'JetBrains Mono',monospace;font-size:.63rem;opacity:.28;letter-spacing:.08em;}

  /* RESPONSIVE */
  @media(max-width:768px){
    .nav-links,.nav-right{display:none;}
    .hamburger{display:flex;}
    .hero-name{white-space:normal;font-size:clamp(2.4rem,10vw,5rem);}
    .hero-top{grid-template-columns:1fr;}
    .hero-role-pill{align-self:flex-start;}
    .hero-bottom{grid-template-columns:1fr;}
    .hero-stats{display:grid;grid-template-columns:1fr 1fr;}
    .hero-contact-strip{flex-direction:column;}
    .hc-item{border-right:none;border-bottom:var(--border);}
    .hc-item:last-child{border-bottom:none;}
    .exp-wrapper{grid-template-columns:1fr;}
    .exp-sidebar{flex-direction:row;flex-wrap:wrap;align-items:center;padding:16px;}
    .edu-grid{grid-template-columns:1fr;}
    .edu-card{grid-template-columns:1fr;}
    .edu-date-col{flex-direction:row;align-items:center;justify-content:space-between;padding:14px 18px;}
    .footer-top{grid-template-columns:1fr;}
    .footer-links{align-items:flex-start;}
    .footer-bottom{flex-direction:column;align-items:flex-start;}
  }
`;

const TICKER_ITEMS = [
  "Software Engineer","Spring Boot","REST APIs","MySQL",
  "Microservices","Docker","JWT Auth","Agile/Scrum",
  "Quick Learner","NLP & AI Features","Open Source","Cycling & Tech News",
];

export default function Portfolio() {
  const [menuOpen, setMenuOpen]   = useState(false);
  const [activeSection, setActive]= useState("hero");
  const [logoError, setLogoError] = useState(false);
  const sectionRefs = useRef({});

  useEffect(() => {
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => e.isIntersecting && setActive(e.target.id)),
      { threshold: 0.35 }
    );
    document.querySelectorAll("section[id]").forEach(s => obs.observe(s));
    return () => obs.disconnect();
  }, []);

  const navLinks = ["skills","experience","projects","education","certifications"];

  return (
    <>
      <style>{FONTS}{css}</style>

      {/* NAV */}
      <nav>
        <a href="#hero" className="nav-brand">
          <div className="nav-logo-box">
            {!logoError
              ? <img src={DATA.logoUrl} alt="lohit works" onError={() => setLogoError(true)} />
              : <span className="nav-logo-fallback">L</span>}
          </div>
          <span className="nav-brand-text">lohit works</span>
        </a>
        <ul className="nav-links">
          {navLinks.map(l => (
            <li key={l}>
              <a href={`#${l}`} className={activeSection === l ? "active" : ""}>{l}</a>
            </li>
          ))}
        </ul>
        <div className="nav-right">
          <a href={DATA.resumeUrl} download="Lohit_Kumar_Resume.pdf" className="nav-dl">⬇ Resume</a>
          <a href={`mailto:${DATA.email}`} className="nav-cta">Hire Me</a>
        </div>
        <div className={`hamburger ${menuOpen ? "open" : ""}`} onClick={() => setMenuOpen(!menuOpen)}>
          <span /><span /><span />
        </div>
      </nav>
      <div className={`mobile-menu ${menuOpen ? "open" : ""}`}>
        {navLinks.map(l => (
          <a key={l} href={`#${l}`} onClick={() => setMenuOpen(false)}>
            {l.charAt(0).toUpperCase() + l.slice(1)}
          </a>
        ))}
        <a href={DATA.resumeUrl} download onClick={() => setMenuOpen(false)}>⬇ Download Resume</a>
        <a href={`mailto:${DATA.email}`} onClick={() => setMenuOpen(false)}>✉ Hire Me</a>
      </div>

      {/* HERO */}
      <section id="hero" ref={el => sectionRefs.current.hero = el}>
        <div className="hero-inner">
          <div className="hero-top fade-in d1">
            <div>
              <div className="hero-eyebrow">
                <span className="eyebrow-dot" />{DATA.tagline}
              </div>
              <h1 className="hero-name">
                {DATA.name.split(" ")[0]} <em>{DATA.name.split(" ").slice(1).join(" ")}</em>
              </h1>
              <div className="hero-contact-strip">
                <span className="hc-item">🎓 {DATA.degree}</span>
                <a href={`mailto:${DATA.email}`} className="hc-item">✉ {DATA.email}</a>
                <a href={`tel:${DATA.phone}`}    className="hc-item">📞 {DATA.phone}</a>
              </div>
            </div>
            <div className="hero-role-pill fade-in d2">
              <span className="pill-seg">Software Engineer</span>
              <span className="pill-seg">✦ Presenter</span>
              <span className="pill-seg">✦ Quick Learner</span>
            </div>
          </div>
          <div className="hero-bottom fade-in d3">
            <div>
              <p className="hero-bio">&ldquo;{DATA.bio}&rdquo;</p>
              <div className="hero-actions">
                <a href={`mailto:${DATA.email}`} className="btn btn-gold">✉ Email Me</a>
                <a href={DATA.github}   target="_blank" rel="noreferrer" className="btn btn-dark">⌥ GitHub</a>
                <a href={DATA.linkedin} target="_blank" rel="noreferrer" className="btn btn-white">in LinkedIn</a>
                <a href={DATA.resumeUrl} download="Lohit_Kumar_Resume.pdf" className="btn btn-resume">⬇ Resume</a>
              </div>
            </div>
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
      </section>

      {/* TICKER */}
      <div className="ticker">
        <div className="ticker-track">
          {[...TICKER_ITEMS,...TICKER_ITEMS].map((item,i) => (
            <span className="ticker-item" key={i}>
              {item} <span className="ticker-dot">✦</span>
            </span>
          ))}
        </div>
      </div>

      {/* RESUME BANNER */}
      <div style={{ padding:"32px clamp(16px,4vw,48px) 0", background:"var(--white)" }}>
        <div className="resume-banner">
          <div>
            <div className="rb-label">Download CV</div>
            <div className="rb-title">{DATA.fullName} — Software Engineer Resume</div>
          </div>
          <a href={DATA.resumeUrl} download="Lohit_Kumar_Resume.pdf" className="btn-dl">⬇ Download PDF</a>
        </div>
      </div>

      {/* SKILLS */}
      <section id="skills" ref={el => sectionRefs.current.skills = el}>
        <div className="section-inner">
          <span className="sec-label">01 — Skills</span>
          <h2 className="sec-title">What I work with</h2>
          <div className="skills-grid">
            {DATA.skills.map(g => (
              <div className="skill-card" key={g.category}>
                <div className="skill-cat">{g.category}</div>
                <div className="skill-pills">
                  {g.items.map(item => <span className="skill-pill" key={item}>{item}</span>)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* EXPERIENCE */}
      <section id="experience" style={{ background:"var(--white)" }}
        ref={el => sectionRefs.current.experience = el}>
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
                  {e.points.map((p,i) => <li className="exp-point" key={i}>{p}</li>)}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* PROJECTS */}
      <section id="projects" ref={el => sectionRefs.current.projects = el}>
        <div className="section-inner">
          <span className="sec-label">03 — Projects</span>
          <h2 className="sec-title">Things I've built</h2>
          <div className="projects-grid">
            {DATA.projects.map(p => (
              <div className="proj-card" key={p.title}>
                <div className="proj-header">
                  <div className="proj-tag-row">
                    <span className="proj-impact">{p.impact}</span>
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
                  <a className="proj-link" href={p.url} target="_blank" rel="noreferrer">View Project →</a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* EDUCATION */}
      <section id="education" style={{ background:"var(--white)" }}
        ref={el => sectionRefs.current.education = el}>
        <div className="section-inner">
          <span className="sec-label">04 — Education</span>
          <h2 className="sec-title">Academic background</h2>
          <div className="edu-grid">
            {DATA.education.map(e => (
              <div className="edu-card" key={e.degree}>
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
      <section id="certifications" ref={el => sectionRefs.current.certifications = el}>
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
              <div className="footer-name">Let's <span>work</span><br />together.</div>
              <div className="footer-tagline">Software Engineer · {DATA.location}</div>
            </div>
            <div className="footer-links">
              <a href={`mailto:${DATA.email}`} className="footer-link">Email</a>
              <a href={DATA.linkedin} target="_blank" rel="noreferrer" className="footer-link">LinkedIn</a>
              <a href={DATA.github}   target="_blank" rel="noreferrer" className="footer-link">GitHub</a>
              <a href={`tel:${DATA.phone}`} className="footer-link">Phone</a>
              <a href={DATA.resumeUrl} download="Lohit_Kumar_Resume.pdf" className="footer-link">⬇ Resume</a>
            </div>
          </div>
          <div className="footer-bottom">
            <span className="footer-copy">© {new Date().getFullYear()} {DATA.fullName}</span>
            <span className="footer-copy">lohit works ✦</span>
          </div>
        </div>
      </footer>
    </>
  );
}