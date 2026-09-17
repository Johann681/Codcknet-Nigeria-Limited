"use client";

import { useState } from "react";
import { ArrowRight, BadgeCheck, Check, ChevronRight, Gauge, Globe2, Menu, Navigation, Radar, ShieldCheck, Truck, Wrench, X } from "lucide-react";
import ThemeToggle from "@/components/theme-toggle";

const services = [
  ["01", "Speed Limiter Installation", "FRSC-approved compliance installations calibrated for safer, more accountable driving.", Gauge],
  ["02", "After-Sales Support", "Technical maintenance, diagnostics, and continuous assistance long after installation day.", Wrench],
  ["03", "Fleet Management", "Transport company optimization systems that improve visibility, performance, and control.", Truck],
  ["04", "GPS Vehicle Tracking", "Real-time asset monitoring and security with dependable location intelligence.", Navigation],
] as const;

const certificates = [
  ["NCC", "Vehicle Tracking Licence", "Public mobile communications licence for vehicle tracking services", "ncc", "/images/ncc-vehicle-tracking-certificate.avif"],
  ["CAC", "Certificate of Incorporation", "Corporate Affairs Commission certificate for Codcknet Nigeria Limited", "cac", "/images/cac-certificate.avif"],
  ["FRSC / SON / NADDC", "Speed Limiting Conformity", "Certificate authorising the supply, installation, and calibration of speed limiting devices", "conformity", "/images/speed-limiting-conformity-certificate.avif"],
] as const;

const partners = [
  ["FRSC", "/images/frsc-logo.jpeg"],
  ["NCC", "/images/ncc-logo.jpeg"],
  ["NADDC", "/images/naddc-logo.jpeg"],
  ["MTN", "/images/mtn-logo.jpeg"],
  ["SON", "/images/son-logo.jpeg"],
  ["CAC", "/images/cac-logo.jpeg"],
  ["VIO", "/images/vio-logo.jpeg"],
] as const;

export default function AboutUsPage() {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <main className="about-page dark-site">
      <header className="site-header"><div className="site-width header-inner"><a className="brand dark-brand" href="/"><img className="brand-mark" src="/images/image.png" alt="Codcknet logo" /><span className="brand-name">Codcknet <small>Nigeria Limited</small></span></a><nav className={menuOpen ? "main-nav open" : "main-nav"}><a href="/">Home</a><a className="active" href="/about-us">About Us</a><a href="/services">Service List</a><a href="/products">Products</a><a href="/book-online#contact">Contact Us</a></nav><div className="header-tools"><ThemeToggle /><a className="header-action" href="/book-online">Get started <ArrowRight size={15} /></a></div><button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">{menuOpen ? <X size={21} /> : <Menu size={21} />}</button></div></header>

      <section className="about-hero"><div className="about-hero-image" /><div className="about-hero-overlay" /><div className="site-width about-hero-content"><span className="dark-kicker"><i /> Our story</span><h1>About Codcknet<br /><span>Nigeria Limited.</span></h1><p>Your Trusted Partner in Vehicle Safety &amp; Fleet Management</p><div className="about-breadcrumb"><a href="/">Home</a><ChevronRight size={13} /><span>About Us</span></div></div></section>

      <section className="who-section"><div className="site-width who-layout"><div className="who-image"><div className="who-image-note"><ShieldCheck size={17} /><span>Certified installations<br /><b>Across Nigeria</b></span></div></div><div className="who-copy"><span className="dark-kicker"><i /> Who we are</span><h2>Safety is not a feature.<br /><span>It is our foundation.</span></h2><p>Codcknet Nigeria Limited is a certified provider of speed limiter installations, GPS vehicle tracking, and fleet management solutions built for the realities of Nigerian roads.</p><p>We help individual drivers, transport companies, and organizations protect their vehicles, improve accountability, and make better decisions with dependable technology and hands-on expertise.</p><div className="who-checks"><span><Check size={13} /> FRSC-aligned standards</span><span><Check size={13} /> Nationwide service coverage</span><span><Check size={13} /> Technical support that stays close</span><span><Check size={13} /> Precision-led installations</span></div></div></div></section>

      <section className="mission-section"><div className="site-width mission-grid"><article className="mission-card mission-card-blue"><span className="mission-index">01 / MISSION</span><ShieldCheck size={26} /><h3>Saving lives through better systems.</h3><p>To deliver certified safety solutions that save lives, strengthen compliance, and create long-term value for every client we serve.</p></article><article className="mission-card mission-card-dark"><span className="mission-index">02 / VISION</span><Globe2 size={26} /><h3>Nigeria&apos;s trusted road safety leader.</h3><p>To become Nigeria&apos;s most trusted name in road safety through excellence, innovation, and a commitment to every journey.</p></article></div></section>

      <section className="about-services"><div className="site-width"><div className="about-section-heading"><div><span className="dark-kicker"><i /> How we help</span><h2>Built around your<br /><span>operational reality.</span></h2></div><p>From a single vehicle to a growing transport operation, our services are designed to make safety and control simpler.</p></div><div className="about-service-grid">{services.map(([number, title, description, Icon]) => <article className="about-service-card" key={title}><div className="about-service-top"><span>{number}</span><i><Icon size={21} /></i></div><h3>{title}</h3><p>{description}</p><a href="/book-online">Explore service <ArrowRight size={14} /></a></article>)}</div></div></section>

      <section className="certificates-section"><div className="site-width"><div className="center-heading"><span className="dark-kicker"><i /> Proof of practice</span><h2>Our Certificates<br /><span>&amp; Approvals</span></h2><p>Our compliance record is supported by incorporation, road safety, and automotive standards documentation.</p></div><div className="certificate-grid">{certificates.map(([short, title, subtitle, tone, image]) => <article className={`certificate-card ${tone}`} key={short}><div className="certificate-logo-frame"><img src={image} alt={`${title} original certificate`} /><span><BadgeCheck size={12} /> ORIGINAL CERTIFICATE</span></div><h3>{title}</h3><p>{subtitle}</p></article>)}</div></div></section>

      <section className="partners-section"><div className="site-width"><div className="about-section-heading partner-heading"><div><span className="dark-kicker"><i /> Trusted network</span><h2>Working With the Best<br /><span>Clients and Partners.</span></h2></div><p>Strong relationships with regulators, network providers, and industry leaders help us deliver solutions that hold up in the real world.</p></div><div className="partner-grid">{partners.map(([partner, image]) => <div className="partner-logo" key={partner}><img src={image} alt={`${partner} logo`} /><small>Partner network</small></div>)}</div></div></section>

      <section className="about-cta"><div className="cta-radar"><Radar size={310} /></div><div className="site-width about-cta-inner"><div><span className="dark-kicker"><i /> Start with certainty</span><h2>Ready to Make<br /><span>Your Fleet Safer?</span></h2><p>Partner with Codcknet for certified solutions, practical guidance, and support built around your operation.</p><a className="hero-button" href="/book-online#contact">CONTACT US <ArrowRight size={16} /></a></div><div className="cta-preview"><iframe className="cta-map site-map" title="Google Maps overview of Nigeria" src="https://www.google.com/maps?q=Nigeria&output=embed" loading="lazy" referrerPolicy="no-referrer-when-downgrade" /></div></div></section>

      <footer className="dark-footer"><div className="site-width footer-grid"><div><a className="brand dark-brand" href="/"><img className="brand-mark" src="/images/image.png" alt="Codcknet logo" /><span className="brand-name">Codcknet <small>Nigeria Limited</small></span></a><p>Engineering safer roads and smarter fleets across Nigeria.</p></div><div><h4>Connect with us</h4><a href="mailto:codcknetinstallation@gmail.com">codcknetinstallation@gmail.com</a><a href="tel:+2349099522825">+234 909 952 2825</a><span>Nigeria</span></div><div><h4>Explore</h4><a href="/">Home</a><a href="/about-us">About Us</a><a href="/services">Service List</a><a href="/book-online#contact">Contact Us</a></div></div><div className="site-width footer-bottom"><span>© {new Date().getFullYear()} Codcknet Nigeria Limited. All rights reserved.</span><span>Privacy Policy &nbsp; Terms &amp; Conditions</span></div></footer>
    </main>
  );
}
