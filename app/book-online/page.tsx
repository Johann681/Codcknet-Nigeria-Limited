"use client";

import { useState } from "react";
import { ArrowRight, CalendarDays, Check, Clock3, Mail, Menu, Phone, ShieldCheck, X } from "lucide-react";
import ThemeToggle from "@/components/theme-toggle";

const bookings = [
  ["GPS Vehicle Tracking", "1 hr", "N100", "Book Now", "gps", "Real-time visibility for safer vehicles, better security, and more confident daily operations.", "/images/gps-tracker-yellow.jpeg"],
  ["Speed Limiter Installation", "1 hr 30 min", "N150", "Book Now", "limiter", "Certified speed limiter installation aligned with Nigerian road safety requirements.", "/images/sabo-speed-limiter.jpeg"],
  ["Fleet Management Consultation", "Ended", "N200", "View Course", "fleet", "A focused consultation for transport operators building better systems for vehicles, drivers, and routes.", "/images/fleet-devices.jpeg"],
] as const;

export default function BookOnlinePage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [selected, setSelected] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [requestText, setRequestText] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

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

      const nextText = `Hello Codcknet, I would like to book ${selected}. My name/company is ${payload.name} and my phone number is ${payload.phone}.`;
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
      <header className="site-header"><div className="site-width header-inner"><a className="brand dark-brand" href="/"><img className="brand-mark" src="/images/image.png" alt="Codcknet logo" /><span className="brand-name">Codcknet <small>Nigeria Limited</small></span></a><nav className={menuOpen ? "main-nav open" : "main-nav"}><a href="/">Home</a><a href="/about-us">About Us</a><a href="/services">Service List</a><a href="/products">Products</a><a className="active" href="/book-online">Book Online</a></nav><div className="header-tools"><ThemeToggle /><a className="header-action" href="#booking-catalog">Get started <ArrowRight size={15} /></a></div><button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">{menuOpen ? <X size={21} /> : <Menu size={21} />}</button></div></header>

      <section className="booking-hero"><div className="booking-hero-image" /><div className="booking-hero-overlay" /><div className="site-width booking-hero-content"><span className="dark-kicker"><i /> Book online / Codcknet</span><h1>Make time for<br /><span>safer journeys.</span></h1><p>Schedule an installation or consultation with our team. Choose the service that fits your operation and let&apos;s get your vehicle moving with confidence.</p><div className="booking-hero-points"><span><CalendarDays size={15} /> Flexible scheduling</span><span><ShieldCheck size={15} /> Certified specialists</span></div></div></section>

      <section className="booking-catalog" id="booking-catalog"><div className="site-width"><div className="booking-heading"><div><span className="dark-kicker"><i /> Start here</span><h2>Our <span>Services.</span></h2></div><p>Select a service to begin. Our team will confirm the details and help you choose a convenient time.</p></div><div className="booking-grid">{bookings.map(([title, duration, price, action, tone, description, image]) => <article className={`booking-card ${tone}`} key={title}><div className="booking-card-image" style={{ backgroundImage: `linear-gradient(180deg, #07111d22, #07111dd9), url(${image})` }}><span className={duration === "Ended" ? "ended-badge" : "available-badge"}>{duration === "Ended" ? "Ended" : "Available"}</span><div className="booking-card-stamp"><Clock3 size={13} /> {duration}</div></div><div className="booking-card-body"><h3>{title}</h3><p>{description}</p><div className="booking-card-bottom"><div><small>From</small><b>{price}</b></div>{duration === "Ended" ? <button className="booking-button ended-button" onClick={() => setSelected(title)}>{action} <ArrowRight size={14} /></button> : <button className="booking-button" onClick={() => setSelected(title)}>{action} <ArrowRight size={14} /></button>}</div></div></article>)}</div></div></section>

      <section className="booking-assurance"><div className="site-width assurance-inner"><div><span className="dark-kicker"><i /> What happens next</span><h2>Simple booking.<br /><span>Clear next steps.</span></h2></div><div className="assurance-steps"><div><b>01</b><span>Choose a service</span></div><div><b>02</b><span>Share your details</span></div><div><b>03</b><span>We confirm your time</span></div></div></div></section>

      <section className="booking-contact"><div className="site-width booking-contact-inner"><div><span className="dark-kicker"><i /> Need help choosing?</span><h2>Talk to our<br /><span>booking team.</span></h2><p>Have a few vehicles or a full fleet? We&apos;ll help you find the right starting point.</p></div><div className="booking-contact-links"><a href="mailto:codcknetinstallation@gmail.com"><Mail size={16} /> codcknetinstallation@gmail.com</a><a href="tel:+2349099522825"><Phone size={16} /> +234 909 952 2825</a></div><iframe className="site-map site-map-booking" title="Google Maps overview of Nigeria" src="https://www.google.com/maps?q=Nigeria&output=embed" loading="lazy" referrerPolicy="no-referrer-when-downgrade" /></div></section>

      <footer className="dark-footer"><div className="site-width footer-grid"><div><a className="brand dark-brand" href="/"><img className="brand-mark" src="/images/image.png" alt="Codcknet logo" /><span className="brand-name">Codcknet <small>Nigeria Limited</small></span></a><p>Engineering safer roads and smarter fleets across Nigeria.</p></div><div><h4>Connect with us</h4><a href="mailto:codcknetinstallation@gmail.com">codcknetinstallation@gmail.com</a><a href="tel:+2349099522825">+234 909 952 2825</a><span>Nigeria</span></div><div><h4>Explore</h4><a href="/">Home</a><a href="/about-us">About Us</a><a href="/services">Service List</a><a href="/products">Products</a></div></div><div className="site-width footer-bottom"><span>© {new Date().getFullYear()} Codcknet Nigeria Limited. All rights reserved.</span><span>Privacy Policy &nbsp; Terms &amp; Conditions</span></div></footer>

      {selected && <div className="booking-modal-backdrop" role="presentation" onClick={() => { setSelected(null); setSubmitted(false); setErrorMessage(""); }}><div className="booking-modal" role="dialog" aria-modal="true" onClick={(event) => event.stopPropagation()}><button className="modal-close" onClick={() => { setSelected(null); setSubmitted(false); setErrorMessage(""); }} aria-label="Close booking dialog"><X size={18} /></button>{!submitted ? <><span className="dark-kicker"><i /> Booking request</span><h2>{selected}</h2><p>Send us your details and our team will confirm availability and the next step with you.</p><form onSubmit={handleSubmit}><label>Full name<input name="name" required placeholder="Your name or company" /></label><label>Phone number<input name="phone" required type="tel" placeholder="+234 800 000 0000" /></label>{errorMessage ? <p className="booking-form-error">{errorMessage}</p> : null}<button className="hero-button" type="submit" disabled={isSaving}>{isSaving ? "SAVING..." : "REQUEST A SLOT"} <Check size={15} /></button></form></> : <div className="booking-success"><span className="success-check"><Check size={22} /></span><span className="dark-kicker"><i /> Request ready</span><h2>Let&apos;s confirm your slot.</h2><p>Your request is prepared. Send it directly to our booking team on WhatsApp to complete the conversation.</p><a className="hero-button" href={`https://wa.me/2349099522825?text=${encodeURIComponent(requestText)}`} target="_blank" rel="noreferrer">OPEN WHATSAPP <ArrowRight size={15} /></a><button className="modal-reset" onClick={() => setSubmitted(false)}>Edit details</button></div>}</div></div>}
    </main>
  );
}
