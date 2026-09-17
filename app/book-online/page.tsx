"use client";

import { useState } from "react";
import { ArrowRight, CalendarDays, Check, Mail, Menu, Phone, ShieldCheck, X } from "lucide-react";
import ThemeToggle from "@/components/theme-toggle";

const bookings = [
  ["GPS Vehicle Tracking", "gps", "Real-time visibility for safer vehicles, better security, and more confident daily operations.", "/images/gps-tracker-yellow.jpeg"],
  ["Speed Limiter Installation", "limiter", "Certified speed limiter installation aligned with Nigerian road safety requirements.", "/images/sabo-speed-limiter.jpeg"],
  ["Fleet Management Consultation", "fleet", "A focused consultation for transport operators building better systems for vehicles, drivers, and routes.", "/images/fleet management consultation.jpeg"],
] as const;

export default function BookOnlinePage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [selected, setSelected] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [requestText, setRequestText] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [leadName, setLeadName] = useState("");
  const [leadCompany, setLeadCompany] = useState("");
  const [fleetSize, setFleetSize] = useState("1-5 vehicles");

  function handleLeadSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const fullName = leadName.trim();
    const companyName = leadCompany.trim();

    if (!fullName || !companyName) {
      return;
    }

    const message = `Hello Codcknet Team, my name is ${fullName} from ${companyName}. I would like to discuss fleet tracking/solutions. Fleet size: ${fleetSize}.`;
    const waUrl = `https://wa.me/2347040272129?text=${encodeURIComponent(message)}`;
    window.open(waUrl, "_blank", "noopener,noreferrer");
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!selected) {
      return;
    }

    setIsSaving(true);
    setErrorMessage("");

    const formData = new FormData(event.currentTarget);
    const payload = {
      name: String(formData.get("name") || "").trim(),
      phone: String(formData.get("phone") || "").trim(),
      email: String(formData.get("email") || "").trim(),
      company: String(formData.get("company") || "").trim(),
      vehicle: String(formData.get("vehicle") || "").trim(),
      message: String(formData.get("message") || "").trim(),
      service: selected,
    };

    try {
      const response = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (!response.ok || !result?.success) {
        throw new Error(result?.message || "Unable to save booking request.");
      }

      const nextText = [
        "Hello Codcknet, I would like to make an enquiry.",
        `Service: ${selected}`,
        `Name: ${payload.name}`,
        `Phone: ${payload.phone}`,
        `Email: ${payload.email}`,
        payload.company ? `Company: ${payload.company}` : "",
        payload.vehicle ? `Vehicle/fleet details: ${payload.vehicle}` : "",
        payload.message ? `Request: ${payload.message}` : "",
      ].filter(Boolean).join("\n");
      setRequestText(nextText);
      setSubmitted(true);
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : "Unable to save booking request.");
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <main className="booking-page dark-site">
      <header className="site-header"><div className="site-width header-inner"><a className="brand dark-brand" href="/"><img className="brand-mark" src="/images/image.png" alt="Codcknet logo" /><span className="brand-name">Codcknet <small>Nigeria Limited</small></span></a><nav className={menuOpen ? "main-nav open" : "main-nav"}><a href="/">Home</a><a href="/about-us">About Us</a><a href="/services">Service List</a><a href="/products">Products</a><a className="active" href="/book-online#contact">Contact Us</a></nav><div className="header-tools"><ThemeToggle /><a className="header-action" href="#booking-catalog">Get started <ArrowRight size={15} /></a></div><button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">{menuOpen ? <X size={21} /> : <Menu size={21} />}</button></div></header>

      <section className="booking-hero"><div className="booking-hero-image" /><div className="booking-hero-overlay" /><div className="site-width booking-hero-content"><span className="dark-kicker"><i /> Contact us / Codcknet</span><h1>Let&apos;s make your<br /><span>next move safer.</span></h1><p>Tell us what you need for your vehicle or fleet. Share a few details and we&apos;ll connect you with our team on WhatsApp.</p><div className="booking-hero-points"><span><CalendarDays size={15} /> Flexible scheduling</span><span><ShieldCheck size={15} /> Certified specialists</span></div></div></section>

      <section className="booking-catalog" id="booking-catalog"><div className="site-width"><div className="booking-heading"><div><span className="dark-kicker"><i /> Start here</span><h2>Our <span>Services.</span></h2></div><p>Select a service to begin. Our team will confirm the details and help you choose a convenient time.</p></div><div className="booking-grid">{bookings.map(([title, tone, description, image]) => <article className={`booking-card ${tone}`} key={title}><div className="booking-card-image" style={{ backgroundImage: `linear-gradient(180deg, #07111d22, #07111dd9), url("${image}")` }} /><div className="booking-card-body"><h3>{title}</h3><p>{description}</p><button className="booking-button" onClick={() => setSelected(title)}>CONTACT US <ArrowRight size={14} /></button></div></article>)}</div></div></section>

      <section className="booking-assurance"><div className="site-width assurance-inner"><div><span className="dark-kicker"><i /> What happens next</span><h2>Simple booking.<br /><span>Clear next steps.</span></h2></div><div className="assurance-steps"><div><b>01</b><span>Choose a service</span></div><div><b>02</b><span>Share your details</span></div><div><b>03</b><span>We confirm your time</span></div></div></div></section>

      <section className="booking-contact" id="contact"><div className="site-width booking-contact-inner"><div><span className="dark-kicker"><i /> Need help choosing?</span><h2>Talk to our<br /><span>booking team.</span></h2><p>Have a few vehicles or a full fleet? We&apos;ll help you find the right starting point.</p></div><div className="booking-contact-links"><a href="mailto:info@codcknet.com"><Mail size={16} /> info@codcknet.com</a><a href="tel:+2347040272129"><Phone size={16} /> +234 704 027 2129</a><a href="tel:+2347074526007"><Phone size={16} /> +234 707 452 6007</a></div><div className="booking-lead-card"><div><span className="lead-card-kicker">Start a conversation</span><h3>Let&apos;s get your fleet moving.</h3><p>Share your details and continue with our booking team on WhatsApp.</p></div><form className="booking-lead-form" onSubmit={handleLeadSubmit}><label>Full name<input value={leadName} onChange={(event) => setLeadName(event.target.value)} placeholder="Enter your full name" required /></label><label>Company name<input value={leadCompany} onChange={(event) => setLeadCompany(event.target.value)} placeholder="Enter your company name" required /></label><label>Fleet size<select value={fleetSize} onChange={(event) => setFleetSize(event.target.value)}><option>1-5 vehicles</option><option>6-20 vehicles</option><option>Full Fleet</option></select></label><button className="hero-button" type="submit">CHAT ON WHATSAPP <ArrowRight size={15} /></button></form></div></div></section>

      <footer className="dark-footer"><div className="site-width footer-grid"><div><a className="brand dark-brand" href="/"><img className="brand-mark" src="/images/image.png" alt="Codcknet logo" /><span className="brand-name">Codcknet <small>Nigeria Limited</small></span></a><p>Engineering safer roads and smarter fleets across Nigeria.</p></div><div><h4>Connect with us</h4><a href="mailto:info@codcknet.com">info@codcknet.com</a><a href="tel:+2347040272129">+234 704 027 2129</a><a href="tel:+2347074526007">+234 707 452 6007</a><span>Nigeria</span></div><div><h4>Explore</h4><a href="/">Home</a><a href="/about-us">About Us</a><a href="/services">Service List</a><a href="/products">Products</a></div></div><div className="site-width footer-bottom"><span>© {new Date().getFullYear()} Codcknet Nigeria Limited. All rights reserved.</span><span>Privacy Policy &nbsp; Terms &amp; Conditions</span></div></footer>

      {selected && <div className="booking-modal-backdrop" role="presentation" onClick={() => { setSelected(null); setSubmitted(false); setErrorMessage(""); }}><div className="booking-modal" role="dialog" aria-modal="true" onClick={(event) => event.stopPropagation()}><button className="modal-close" onClick={() => { setSelected(null); setSubmitted(false); setErrorMessage(""); }} aria-label="Close contact form"><X size={18} /></button>{!submitted ? <><span className="dark-kicker"><i /> Contact request</span><h2>{selected}</h2><p>Share your details and our team will continue the conversation with you on WhatsApp.</p><form onSubmit={handleSubmit}><label>Full name<input name="name" required placeholder="Your full name" /></label><label>Phone number<input name="phone" required type="tel" placeholder="+234 800 000 0000" /></label><label>Email address<input name="email" required type="email" placeholder="you@example.com" /></label><label>Company (optional)<input name="company" placeholder="Company or organisation" /></label><label>Vehicle or fleet details (optional)<input name="vehicle" placeholder="Vehicle type or fleet size" /></label><label>How can we help? (optional)<textarea name="message" rows={3} placeholder="Tell us what you need" /></label>{errorMessage ? <p className="booking-form-error">{errorMessage}</p> : null}<button className="hero-button" type="submit" disabled={isSaving}>{isSaving ? "SAVING..." : "CONTINUE TO WHATSAPP"} <Check size={15} /></button></form></> : <div className="booking-success"><span className="success-check"><Check size={22} /></span><span className="dark-kicker"><i /> Request ready</span><h2>Let&apos;s continue.</h2><p>Your request is saved. Send it directly to our team on WhatsApp to complete the conversation.</p><a className="hero-button" href={`https://wa.me/2347040272129?text=${encodeURIComponent(requestText)}`} target="_blank" rel="noreferrer">OPEN WHATSAPP <ArrowRight size={15} /></a><button className="modal-reset" onClick={() => setSubmitted(false)}>Edit details</button></div>}</div></div>}
    </main>
  );
}
