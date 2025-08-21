import React from 'react';

export default function AboutPage() {
  return (
    <div className="main-content">
      <img src="/icons/Claw_Command_Bird_Only.svg" alt="Claw Command Logo" className="logo logo-light" />
      <img src="/icons/Claw_Command_Bird_Only_White.svg" alt="" aria-hidden="true" className="logo logo-dark" />

      <h1 className="organization-name glitch glitch-clip" data-text="About Us">About Us</h1>

      <div className="meeting-card" style={{ marginTop: 16 }}>
        <p className="meeting-desc">
          Welcome to <strong>Claw Command Cyber Club</strong> <strong>Cal State LA</strong>'s first <strong>cybersecurity</strong> club! We’re new, we’re small, and we’re passionate about bridging <strong>hardware</strong> and <strong>software security</strong>.
        </p>
        <p className="meeting-desc">
          CS and EE  <strong>students</strong> unite here to hack <strong>IoT</strong> devices, analyze <strong>malware</strong>, compete in <strong>cybersecurity challenges</strong>, and learn from each other. Whether you code, solder, or just want to break things (<strong>ethically</strong>!), we want you.
        </p>
        <p className="meeting-desc">
          We’re building this club from scratch, so you get to help shape what we become. Come for the <strong>cybersecurity</strong>, stay for the <strong>community</strong> and way too much caffeine. Let’s secure the digital world together one <strong>vulnerability</strong> at a time!
        </p>
      </div>

      <div className="meeting-nav" style={{ marginTop: 16 }}>
        <a className="date-link" href="/">← Home</a>
      </div>
    </div>
  );
}
