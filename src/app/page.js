"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";

export default function Home() {
  // States
  const [theme, setTheme] = useState("dark");
  const [scrolled, setScrolled] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [chatInput, setChatInput] = useState("");
  const [messages, setMessages] = useState([
    {
      text: "Hello! Welcome to Smart Fetch. I can help you with queries regarding our Integrated Security, Fire Safety, Professional Audio, and AV systems. What can I assist you with today?",
      sender: "system",
    },
  ]);
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    phone: "",
    domain: "",
    message: "",
  });
  const [submitBtnText, setSubmitBtnText] = useState("SUBMIT REQUEST");
  const [submitBtnStyle, setSubmitBtnStyle] = useState({});

  const chatBodyRef = useRef(null);

  // Load and sync theme
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "dark";
    setTheme(savedTheme);
    document.documentElement.setAttribute("data-theme", savedTheme);
  }, []);

  // Scroll handler for navbar height and background transition
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Scroll chatbot to bottom on new message
  useEffect(() => {
    if (chatBodyRef.current) {
      chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
    }
  }, [messages, chatOpen]);

  // Theme toggle
  const toggleTheme = () => {
    const nextTheme = theme === "dark" ? "light" : "dark";
    setTheme(nextTheme);
    document.documentElement.setAttribute("data-theme", nextTheme);
    localStorage.setItem("theme", nextTheme);
  };

  // Consultation form change handler
  const handleFormChange = (e) => {
    setFormState({ ...formState, [e.target.id]: e.target.value });
  };

  // Consultation form submission
  const handleFormSubmit = (e) => {
    e.preventDefault();
    const { name, email, phone, domain, message } = formState;

    if (!name || !email || !phone || !domain || !message) return;

    const formattedText = `Hi Smart Fetch! I would like to request a consultation.
*Name:* ${name}
*Email:* ${email}
*Phone:* ${phone}
*Requested Domain:* ${domain}
*Project Scope Summary:* ${message}`;

    const encodedText = encodeURIComponent(formattedText);
    const whatsappURL = `https://wa.me/919916172599?text=${encodedText}`;

    setSubmitBtnText("REDIRECTING TO WHATSAPP...");
    setSubmitBtnStyle({
      background: "var(--accent-green)",
      color: "#ffffff",
    });

    setTimeout(() => {
      window.open(whatsappURL, "_blank");
      setFormState({
        name: "",
        email: "",
        phone: "",
        domain: "",
        message: "",
      });
      setSubmitBtnText("SUBMIT REQUEST");
      setSubmitBtnStyle({});
    }, 1500);
  };

  // Bot response generation
  const getBotResponse = (input) => {
    const lowerInput = input.toLowerCase();
    if (lowerInput.includes("audio") || lowerInput.includes("sound") || lowerInput.includes("music") || lowerInput.includes("concert")) {
      return "We deliver advanced stadium-scale sound setups, concert line arrays, digital mixers, and premium public address/voice alarm systems (PAVA). Would you like to consult with an audio engineer?";
    }
    if (lowerInput.includes("cctv") || lowerInput.includes("camera") || lowerInput.includes("surveillance") || lowerInput.includes("security")) {
      return "Smart Fetch designs custom high-definition surveillance grids incorporating intelligent edge analytics, motion tracking, and automated perimeter alarms. Let us know if you need an on-site feasibility mapping.";
    }
    if (lowerInput.includes("fire") || lowerInput.includes("safety") || lowerInput.includes("smoke") || lowerInput.includes("alarm")) {
      return "We integrate high-compliance addressable fire alarm panels, optical smoke detection zones, sprinkler integration piping, and perform complete fire defense layout audits.";
    }
    if (lowerInput.includes("contact") || lowerInput.includes("number") || lowerInput.includes("phone") || lowerInput.includes("email") || lowerInput.includes("call")) {
      return "You can call us directly at +91 99161 72599, or email sales@smart-fetch.com. Alternatively, fill out our consultation form on the homepage!";
    }
    if (lowerInput.includes("quote") || lowerInput.includes("cost") || lowerInput.includes("price")) {
      return "For a custom quote, please submit your contact details and project description via our home page Consultation Form, or connect directly on WhatsApp (+91 99161 72599).";
    }
    return "Thank you for reaching out! I can guide you on our domains: Professional Audio, AV Integration, Access Control, Surveillance Systems, and Fire Safety. What would you like to know more about?";
  };

  // Chat message sending
  const handleChatSend = () => {
    if (!chatInput.trim()) return;

    const userMsg = chatInput;
    setMessages((prev) => [...prev, { text: userMsg, sender: "user" }]);
    setChatInput("");

    setTimeout(() => {
      const botReply = getBotResponse(userMsg);
      setMessages((prev) => [...prev, { text: botReply, sender: "system" }]);
    }, 800);
  };

  return (
    <>
      {/* Top Announcement Bar */}
      <div className="top-bar" id="topBar">
        <div className="top-bar-container">
          <div className="top-bar-left">
            <a href="tel:+919916172599" id="topPhone">
              <svg className="icon" viewBox="0 0 24 24">
                <path d="M6.62 10.79a15.15 15.15 0 0 0 6.59 6.59l2.2-2.2a1 1 0 0 1 1.11-.27 11.36 11.36 0 0 0 3.58.57 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1 11.36 11.36 0 0 0 .57 3.58 1 1 0 0 1-.27 1.1l-2.18 2.11z" />
              </svg>
              +91 99161 72599
            </a>
          </div>
          <div className="top-bar-center">
            <span>■ BANGALORE</span>
            <span className="separator">■</span>
            <span>PAN-INDIA SOLUTIONS</span>
          </div>
          <div className="top-bar-right">
            <a href="#contact" className="quote-link" id="topQuoteLink">GET QUOTE →</a>
          </div>
        </div>
      </div>

      {/* Header / Navigation */}
      <header className={`main-header ${scrolled ? "scrolled" : ""}`} id="mainHeader">
        <div className="header-container">
          <a href="#" className="logo-area" id="logoLink">
            <Image
              src="/images/logo.png"
              alt="Smart Fetch Logo"
              width={40}
              height={40}
              className="logo-img"
              id="logoImg"
              priority
            />
            <span className="logo-text">Smart Fetch</span>
          </a>

          {/* Desktop Navigation */}
          <nav className="nav-menu" id="navMenu">
            <a href="#" className="nav-link active">Home</a>
            <a href="#services" className="nav-link">Services</a>
            <a href="#partners" className="nav-link">Partners</a>
            <a href="#about" className="nav-link">About</a>
            <a href="#contact" className="nav-link">Contact</a>
          </nav>

          {/* Header CTA & Actions */}
          <div className="header-actions">
            <button className="action-btn theme-toggle" id="themeToggleBtn" aria-label="Toggle Theme" onClick={toggleTheme}>
              {theme === "dark" ? (
                <svg className="icon moon-icon" viewBox="0 0 24 24">
                  <path d="M12 3a9 9 0 1 0 9 9c0-.46-.04-.92-.1-1.36a5.389 5.389 0 0 1-7.64-7.64A9.04 9.04 0 0 0 12 3z" />
                </svg>
              ) : (
                <svg className="icon sun-icon" viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="5" />
                  <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
                </svg>
              )}
            </button>

            <a
              href="https://wa.me/919916172599?text=Hi%20Smart%20Fetch!%20I%20would%20like%20to%20request%20a%20quote%20for%20your%20services."
              target="_blank"
              rel="noopener noreferrer"
              className="action-btn whatsapp-btn"
              id="navWhatsappBtn"
              aria-label="WhatsApp Us"
            >
              <svg className="icon" viewBox="0 0 24 24">
                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.457L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.42 9.864-9.864.002-2.637-1.03-5.112-2.905-6.989-1.875-1.875-4.37-2.907-7.01-2.909-5.442 0-9.866 4.42-9.87 9.867-.001 1.695.441 3.354 1.284 4.803L.993 21.07l5.654-1.916zm12.39-7.235c-.29-.145-1.713-.846-1.979-.942-.266-.096-.459-.145-.653.145-.193.29-.748.942-.917 1.135-.169.193-.338.217-.627.072-2.825-1.413-4.647-4.148-5.39-5.44-.19-.327-.019-.505.142-.665.145-.145.32-.374.48-.562.16-.188.213-.32.32-.533.107-.213.053-.402-.027-.562-.08-.16-.653-1.573-.895-2.152-.236-.569-.475-.492-.653-.501-.17-.008-.364-.01-.557-.01-.193 0-.507.072-.773.362-.266.29-1.014.99-1.014 2.415 0 1.425 1.038 2.8 1.183 2.993.145.193 2.04 3.115 4.939 4.368.69.298 1.229.476 1.649.61.692.22 1.32.19 1.82.115.556-.083 1.713-.7 1.954-1.376.24-.677.24-1.256.169-1.376-.07-.12-.266-.193-.556-.338z" />
              </svg>
            </a>

            <a href="#contact" className="btn btn-outline" id="navQuoteBtn">REQUEST QUOTE</a>

            {/* Hamburger Menu Button */}
            <button className="hamburger-menu" id="hamburgerMenuBtn" aria-label="Open Menu" onClick={() => setDrawerOpen(true)}>
              <span className="bar"></span>
              <span className="bar"></span>
              <span className="bar"></span>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Overlay */}
      <div className={`mobile-drawer ${drawerOpen ? "open" : ""}`} id="mobileDrawer">
        <div className="drawer-header">
          <a href="#" className="logo-area">
            <Image
              src="/images/logo.png"
              alt="Smart Fetch Logo"
              width={40}
              height={40}
              className="logo-img"
            />
            <span className="logo-text">Smart Fetch</span>
          </a>
          <button className="drawer-close" id="drawerCloseBtn" aria-label="Close Menu" onClick={() => setDrawerOpen(false)}>&times;</button>
        </div>
        <nav className="drawer-links">
          <a href="#" className="drawer-link active" onClick={() => setDrawerOpen(false)}>Home</a>
          <a href="#services" className="drawer-link" onClick={() => setDrawerOpen(false)}>Services</a>
          <a href="#partners" className="drawer-link" onClick={() => setDrawerOpen(false)}>Partners</a>
          <a href="#about" className="drawer-link" onClick={() => setDrawerOpen(false)}>About Us</a>
          <a href="#contact" className="drawer-link" onClick={() => setDrawerOpen(false)}>Contact</a>
        </nav>
        <div className="drawer-footer">
          <a href="tel:+919916172599" className="drawer-contact-item">
            <svg className="icon" viewBox="0 0 24 24">
              <path d="M6.62 10.79a15.15 15.15 0 0 0 6.59 6.59l2.2-2.2a1 1 0 0 1 1.11-.27 11.36 11.36 0 0 0 3.58.57 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1 11.36 11.36 0 0 0 .57 3.58 1 1 0 0 1-.27 1.1l-2.18 2.11z" />
            </svg>
            +91 99161 72599
          </a>
          <a href="mailto:sales@smart-fetch.com" className="drawer-contact-item">
            <svg className="icon" viewBox="0 0 24 24">
              <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
            </svg>
            sales@smart-fetch.com
          </a>
          <a href="#contact" className="btn btn-primary w-full text-center" id="drawerQuoteBtn" onClick={() => setDrawerOpen(false)}>REQUEST QUOTE</a>
        </div>
      </div>

      {/* Hero Section */}
      <section className="hero-section" id="hero">
        <div className="hero-background-gradient"></div>
        <div className="hero-container">
          
          {/* Hero Left */}
          <div className="hero-text-content">
            <div className="hero-tagline-container">
              <span className="hero-tagline-decor"></span>
              <span className="hero-tagline-text">INTEGRATED TECHNOLOGY SERVICES</span>
            </div>
            
            <h1 className="hero-title" id="heroTitle">
              SMART<br />
              <span className="glow-text">FETCH</span>
            </h1>
            
            <p className="hero-subtitle">
              Pioneering technology solutions for a safer tomorrow. Zero compromise.
            </p>
            
            <p className="hero-desc">
              We engineer high-fidelity professional audio, concert acoustics, fully integrated AV ecosystems, state-of-the-art surveillance networks, smart access controls, and emergency fire safety systems.
            </p>

            {/* Stats Badges */}
            <div className="stats-badges-container">
              <div className="stat-badge">
                <span className="badge-bullet red">■</span>
                <span className="badge-label">CLIENTS: 200+</span>
              </div>
              <div className="stat-badge">
                <span className="badge-bullet blue">■</span>
                <span className="badge-label">PROJECTS: 500+</span>
              </div>
              <div className="stat-badge">
                <span className="badge-bullet green">■</span>
                <span className="badge-label">RETENTION: 98%</span>
              </div>
            </div>
            
            <div className="hero-ctas">
              <a href="#services" className="btn btn-primary">EXPLORE SERVICES</a>
              <a href="#contact" className="btn btn-secondary">GET CONSULTATION</a>
            </div>
          </div>

          {/* Hero Right */}
          <div className="hero-visual-content">
            <div className="image-wrapper">
              <div className="glow-ring glow-cyan"></div>
              <div className="glow-ring glow-red"></div>
              <Image
                src="/images/innovation.png"
                alt="Innovation and Tech Showcase"
                width={440}
                height={400}
                className="hero-main-img"
                id="heroMainImg"
                priority
              />
            </div>
          </div>

        </div>
      </section>

      {/* Partners Section */}
      <section className="partners-section" id="partners">
        <div className="partners-container">
          <div className="section-header-compact">
            <span className="section-tagline">GLOBAL STANDARDS</span>
            <h2 className="section-title-compact">TRUSTED PARTNER BRAND ECOSYSTEM</h2>
          </div>
          
          <div className="logo-carousel-viewport">
            <div className="logo-carousel-track" id="partnerTrack">
              <div className="logo-slide"><Image src="/images/partner-abb.jpeg" alt="ABB" width={160} height={80} /></div>
              <div className="logo-slide"><Image src="/images/partner-adityabirla.jpeg" alt="Aditya Birla" width={160} height={80} /></div>
              <div className="logo-slide"><Image src="/images/partner-hitachi.jpeg" alt="Hitachi" width={160} height={80} /></div>
              <div className="logo-slide"><Image src="/images/partner-iss.jpeg" alt="ISS" width={160} height={80} /></div>
              <div className="logo-slide"><Image src="/images/partner-oculus.jpeg" alt="Oculus" width={160} height={80} /></div>
              
              {/* Duplicated for infinite scrolling */}
              <div className="logo-slide"><Image src="/images/partner-abb.jpeg" alt="ABB" width={160} height={80} /></div>
              <div className="logo-slide"><Image src="/images/partner-adityabirla.jpeg" alt="Aditya Birla" width={160} height={80} /></div>
              <div className="logo-slide"><Image src="/images/partner-hitachi.jpeg" alt="Hitachi" width={160} height={80} /></div>
              <div className="logo-slide"><Image src="/images/partner-iss.jpeg" alt="ISS" width={160} height={80} /></div>
              <div className="logo-slide"><Image src="/images/partner-oculus.jpeg" alt="Oculus" width={160} height={80} /></div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid Section */}
      <section className="services-section" id="services">
        <div className="services-background-glow"></div>
        <div className="container">
          <div className="section-header text-center">
            <span className="section-tagline">CORE CAPABILITIES</span>
            <h2 className="section-title">ENGINEERED ENGINEERING DOMAINS</h2>
            <p className="section-desc">We offer best-in-class, fully integrated engineering and facility solutions tailored to complex architectural scales.</p>
          </div>

          <div className="services-grid">
            <div className="service-card" id="serviceCard1">
              <div className="service-icon-box cyan-glow">
                <svg className="icon" viewBox="0 0 24 24">
                  <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z" />
                </svg>
              </div>
              <h3 className="service-title-card">Professional Audio</h3>
              <p className="service-desc-card">Acoustical designs and state-of-the-art background music / paging sound architectures for stadiums, auditoriums, hotels, and complexes.</p>
              <div className="service-card-decor"></div>
            </div>

            <div className="service-card" id="serviceCard2">
              <div className="service-icon-box red-glow">
                <svg className="icon" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
                </svg>
              </div>
              <h3 className="service-title-card">Concert Audio</h3>
              <p className="service-desc-card">High-intensity line arrays, premium monitoring solutions, digital console distributions, and flawless sound reinforcement setups for live concerts.</p>
              <div className="service-card-decor"></div>
            </div>

            <div className="service-card" id="serviceCard3">
              <div className="service-icon-box cyan-glow">
                <svg className="icon" viewBox="0 0 24 24">
                  <path d="M21 3H3c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h5v2h8v-2h5c1.1 0 1.99-.9 1.99-2L23 5c0-1.1-.9-2-2-2zm0 14H3V5h18v12z" />
                </svg>
              </div>
              <h3 className="service-title-card">Audio-Video Integration</h3>
              <p className="service-desc-card">Intelligent AV distribution, digital signage grids, smart corporate boardrooms, video walls, and unified communications for seamless connectivity.</p>
              <div className="service-card-decor"></div>
            </div>

            <div className="service-card" id="serviceCard4">
              <div className="service-icon-box red-glow">
                <svg className="icon" viewBox="0 0 24 24">
                  <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z" />
                </svg>
              </div>
              <h3 className="service-title-card">Access Control</h3>
              <p className="service-desc-card">Secure smart credentials, contactless biometric readers, gate turnstiles, license plate recognitions, and fully centralized cloud authorization databases.</p>
              <div className="service-card-decor"></div>
            </div>

            <div className="service-card" id="serviceCard5">
              <div className="service-icon-box cyan-glow">
                <svg className="icon" viewBox="0 0 24 24">
                  <path d="M13 7h-2v4H7v2h4v4h2v-4h4v-2h-4V7zm-1-5C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" />
                </svg>
              </div>
              <h3 className="service-title-card">Surveillance Systems</h3>
              <p className="service-desc-card">Next-generation high-definition CCTV, automatic threat alarms, AI intrusion detection analysis, smart NVRs, and customized video walls operations.</p>
              <div className="service-card-decor"></div>
            </div>

            <div className="service-card" id="serviceCard6">
              <div className="service-icon-box red-glow">
                <svg className="icon" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z" />
                </svg>
              </div>
              <h3 className="service-title-card">Fire Safety Systems</h3>
              <p className="service-desc-card">Addressable fire detection controls, smart smoke sensor zones, fire gas exhausts, wet sprinkler integration pipelines, and routine fire safety audits.</p>
              <div className="service-card-decor"></div>
            </div>
          </div>
        </div>
      </section>

      {/* About Showcase Section */}
      <section className="about-section" id="about">
        <div className="container">
          <div className="about-grid">
            <div className="about-visual">
              <div className="image-wrapper">
                <div className="glow-ring glow-blue-large"></div>
                <Image
                  src="/images/audio-studio.png"
                  alt="Advanced Audio Engineering Showcase"
                  width={500}
                  height={350}
                  className="about-img"
                />
              </div>
            </div>
            <div className="about-text">
              <span className="section-tagline">ENGINEERING TRUST</span>
              <h2 className="section-title">INTEGRATED ENGINEERING ECOSYSTEMS</h2>
              <p className="about-body">
                Smart Fetch stands at the intersection of architectural safety, acoustic brilliance, and intelligent facility infrastructure. From structural fire protection maps to high-end concert configurations, we deliver integrated operations managed by experienced, certified project engineers.
              </p>
              <div className="about-bullets">
                <div className="bullet-item">
                  <span className="bullet-checkmark">✓</span>
                  <span>Centralized facility control dashboard integration</span>
                </div>
                <div className="bullet-item">
                  <span className="bullet-checkmark">✓</span>
                  <span>Full compliance with building regulations & safety standards</span>
                </div>
                <div className="bullet-item">
                  <span className="bullet-checkmark">✓</span>
                  <span>24/7 priority SLA customer and operational support</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact & Request Quote Section */}
      <section className="contact-section" id="contact">
        <div className="container">
          <div className="contact-grid">
            
            <div className="contact-info-col">
              <span className="section-tagline">GET IN TOUCH</span>
              <h2 className="section-title">LET'S BUILD A SAFER, SMARTER INFRASTRUCTURE</h2>
              <p className="contact-sub">
                Connect with our facility design specialist today to schedule an on-site feasibility consultation or request a custom integration quote.
              </p>
              
              <div className="info-items">
                <div className="info-item">
                  <div className="info-icon">
                    <svg viewBox="0 0 24 24"><path d="M6.62 10.79a15.15 15.15 0 0 0 6.59 6.59l2.2-2.2a1 1 0 0 1 1.11-.27 11.36 11.36 0 0 0 3.58.57 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1 11.36 11.36 0 0 0 .57 3.58 1 1 0 0 1-.27 1.1l-2.18 2.11z" /></svg>
                  </div>
                  <div className="info-details">
                    <h4>Call Center Support</h4>
                    <a href="tel:+919916172599">+91 99161 72599</a>
                  </div>
                </div>
                
                <div className="info-item">
                  <div className="info-icon">
                    <svg viewBox="0 0 24 24"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" /></svg>
                  </div>
                  <div className="info-details">
                    <h4>Sales Division</h4>
                    <a href="mailto:sales@smart-fetch.com">sales@smart-fetch.com</a>
                  </div>
                </div>

                <div className="info-item">
                  <div className="info-icon">
                    <svg viewBox="0 0 24 24"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z" /></svg>
                  </div>
                  <div className="info-details">
                    <h4>Taxation / GSTIN</h4>
                    <span>29EYXPP2480J1ZD</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Form Column */}
            <div className="contact-form-col">
              <div className="form-container">
                <h3 className="form-title">Consultation Request Form</h3>
                <form id="consultationForm" onSubmit={handleFormSubmit}>
                  <div className="form-group">
                    <label htmlFor="name">Your Name</label>
                    <input
                      type="text"
                      id="name"
                      placeholder="Imran Kumar"
                      value={formState.name}
                      onChange={handleFormChange}
                      required
                    />
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="email">Email Address</label>
                      <input
                        type="email"
                        id="email"
                        placeholder="imran@example.com"
                        value={formState.email}
                        onChange={handleFormChange}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="phone">Phone Number</label>
                      <input
                        type="tel"
                        id="phone"
                        placeholder="+91 98765 43210"
                        value={formState.phone}
                        onChange={handleFormChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <label htmlFor="domain">Requested Domain</label>
                    <select
                      id="domain"
                      value={formState.domain}
                      onChange={handleFormChange}
                      required
                    >
                      <option value="" disabled>Select a service domain...</option>
                      <option value="Professional Audio">Professional Audio Services</option>
                      <option value="Concert Audio">Concert Audio acoustics</option>
                      <option value="AV Integration">Audio-Video Integration systems</option>
                      <option value="Access Control & CCTV">Security & CCTV Systems</option>
                      <option value="Fire Safety">Fire Safety & Alarm audits</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label htmlFor="message">Project Scope Summary</label>
                    <textarea
                      id="message"
                      rows={4}
                      placeholder="Describe your architectural scope, project dimensions, or specific technical integration requirements..."
                      value={formState.message}
                      onChange={handleFormChange}
                      required
                    />
                  </div>
                  
                  <button type="submit" className="btn btn-primary btn-submit w-full" style={submitBtnStyle}>
                    {submitBtnText}
                  </button>
                </form>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="main-footer">
        <div className="container">
          <div className="footer-grid">
            <div className="footer-brand">
              <a href="#" className="logo-area">
                <Image
                  src="/images/logo.png"
                  alt="Smart Fetch Logo"
                  width={40}
                  height={40}
                  className="logo-img"
                />
                <span className="logo-text">Smart Fetch</span>
              </a>
              <p className="brand-tag">Pioneering technology solutions for a safer, more connected tomorrow.</p>
            </div>
            
            <div className="footer-links-col">
              <h4>Navigate</h4>
              <div className="footer-links">
                <a href="#">Home</a>
                <a href="#services">Services</a>
                <a href="#partners">Partners</a>
                <a href="#about">About Us</a>
                <a href="#contact">Contact</a>
              </div>
            </div>

            <div className="footer-links-col">
              <h4>Domains</h4>
              <div className="footer-links">
                <a href="#services">Acoustics & Concert Audio</a>
                <a href="#services">Integrated AV Systems</a>
                <a href="#services">Access Control Gateways</a>
                <a href="#services">AI Surveillance Solutions</a>
                <a href="#services">Addressable Fire Safety</a>
              </div>
            </div>

            <div className="footer-contact-col">
              <h4>Corporate Info</h4>
              <p><strong>Headquarters:</strong> Bangalore, Karnataka, India</p>
              <p><strong>GSTIN:</strong> 29EYXPP2480J1ZD</p>
              <p><strong>Email:</strong> sales@smart-fetch.com</p>
            </div>
          </div>

          <div className="footer-bottom">
            <p>&copy; 2026 Smart Fetch. All rights reserved. Designed with premium dark system aesthetics.</p>
          </div>
        </div>
      </footer>

      {/* Floating Buttons */}
      <button className="ask-aria-float" id="askAriaBtn" aria-label="Ask Aria Assistant" onClick={() => setChatOpen(!chatOpen)}>
        <span className="aria-dot"></span>
        ASK SMART
      </button>

      <a
        href="https://wa.me/919916172599?text=Hi%20Smart%20Fetch!%20I%27m%20interested%20in%20your%20integrated%20services.%20Please%20connect%20me%20with%20a%20technician."
        target="_blank"
        rel="noopener noreferrer"
        className="whatsapp-float"
        id="whatsappFloatBtn"
        aria-label="Quick WhatsApp Connect"
      >
        <svg className="icon" viewBox="0 0 24 24">
          <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.457L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.42 9.864-9.864.002-2.637-1.03-5.112-2.905-6.989-1.875-1.875-4.37-2.907-7.01-2.909-5.442 0-9.866 4.42-9.87 9.867-.001 1.695.441 3.354 1.284 4.803L.993 21.07l5.654-1.916zm12.39-7.235c-.29-.145-1.713-.846-1.979-.942-.266-.096-.459-.145-.653.145-.193.29-.748.942-.917 1.135-.169.193-.338.217-.627.072-2.825-1.413-4.647-4.148-5.39-5.44-.19-.327-.019-.505.142-.665.145-.145.32-.374.48-.562.16-.188.213-.32.32-.533.107-.213.053-.402-.027-.562-.08-.16-.653-1.573-.895-2.152-.236-.569-.475-.492-.653-.501-.17-.008-.364-.01-.557-.01-.193 0-.507.072-.773.362-.266.29-1.014.99-1.014 2.415 0 1.425 1.038 2.8 1.183 2.993.145.193 2.04 3.115 4.939 4.368.69.298 1.229.476 1.649.61.692.22 1.32.19 1.82.115.556-.083 1.713-.7 1.954-1.376.24-.677.24-1.256.169-1.376-.07-.12-.266-.193-.556-.338z" />
        </svg>
      </a>

      {/* Ask Smart Interactive Chatbot Overlay */}
      <div className={`aria-modal ${chatOpen ? "open" : ""}`} id="ariaModal">
        <div className="aria-modal-header">
          <div className="header-assistant-info">
            <span className="aria-dot"></span>
            <h4>SMART AI Assistant</h4>
          </div>
          <button className="aria-modal-close" id="ariaModalCloseBtn" onClick={() => setChatOpen(false)}>&times;</button>
        </div>
        <div className="aria-modal-body" id="ariaChatBody" ref={chatBodyRef}>
          {messages.map((msg, index) => (
            <div key={index} className={`message ${msg.sender === "system" ? "system-msg" : "user-msg"}`}>
              <p>{msg.text}</p>
            </div>
          ))}
        </div>
        <div className="aria-modal-footer">
          <input
            type="text"
            id="ariaChatInput"
            placeholder="Ask about Audio, CCTV, Fire Safety..."
            aria-label="Chat query input"
            value={chatInput}
            onChange={(e) => setChatInput(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleChatSend()}
          />
          <button id="ariaChatSendBtn" aria-label="Send Query" onClick={handleChatSend}>Send</button>
        </div>
      </div>
    </>
  );
}
