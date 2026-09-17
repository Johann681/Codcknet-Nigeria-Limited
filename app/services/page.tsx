"use client";

import { useState } from "react";
import {
  ArrowRight,
  BadgeCheck,
  CheckCircle2,
  ChevronRight,
  Gauge,
  Menu,
  Navigation,
  Radar,
  Route,
  ShieldCheck,
  Truck,
  Wrench,
  X,
} from "lucide-react";
import ThemeToggle from "@/components/theme-toggle";

const services = [
  [
    "01",
    "Speed Limiter Installation",
    "FRSC-approved installations ensuring compliance, controlled speed, and safer roads for every vehicle in your operation.",
    Gauge,
    "/images/limiter-installation.jpg",
  ],
  [
    "02",
    "GPS Vehicle Tracking",
    "Real-time tracking and monitoring devices for stronger security, route visibility, and smarter asset optimization.",
    Navigation,
    "/images/gps-tracker-promo.jpeg",
  ],
  [
    "03",
    "Fleet Management Solutions",
    "Comprehensive systems for transport companies to manage vehicles, drivers, routes, performance, and risk.",
    Truck,
    "/images/fleet-management.jpg",
  ],
  [
    "04",
    "Maintenance & After-Sales Support",
    "Routine servicing, device calibration, troubleshooting, and continuous technical assistance after installation.",
    Wrench,
    "https://images.unsplash.com/photo-1487754180451-c456f719a1fc?auto=format&fit=crop&w=900&q=85",
  ],
  [
    "05",
    "Vehicle Compliance & Roadworthiness",
    "Practical support for regulatory requirements, speed limiter certification, and inspection readiness.",
    ShieldCheck,
    "/images/road-worthness.jpg",
  ],
  [
    "06",
    "Driver Compliance & Safety Training",
    "Guidance for drivers and organizations to improve safety protocols, accountability, and operational compliance.",
    CheckCircle2,
    "/images/driver-compliance-safety-training.jpg",
  ],
] as const;

export default function ServicesPage() {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <main className="services-page dark-site">
      <header className="site-header">
        <div className="site-width header-inner">
          <a className="brand dark-brand" href="/">
            <img
              className="brand-mark"
              src="/images/image.png"
              alt="Codcknet logo"
            />
            <span className="brand-name">
              Codcknet <small>Nigeria Limited</small>
            </span>
          </a>
          <nav className={menuOpen ? "main-nav open" : "main-nav"}>
            <a href="/">Home</a>
            <a href="/about-us">About Us</a>
            <a className="active" href="/services">
              Service List
            </a>
            <a href="/products">Products</a>
            <a href="/book-online#contact">Contact Us</a>
          </nav>
          <div className="header-tools">
            <ThemeToggle />
            <a className="header-action" href="/book-online">
              Get started <ArrowRight size={15} />
            </a>
          </div>
          <button
            className="menu-toggle"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={21} /> : <Menu size={21} />}
          </button>
        </div>
      </header>

      <section className="services-hero">
        <div className="services-hero-image" />
        <div className="services-hero-overlay" />
        <div className="services-hero-grid" />
        <div className="site-width services-hero-content">
          <span className="dark-kicker">
            <i /> Service list / 2026
          </span>
          <h1>
            Exclusive
            <br />
            <span>Services.</span>
          </h1>
          <p>
            Certified installation and support for speed limiters, GPS tracking,
            and fleet management across Nigeria.
          </p>
          <div className="service-hero-meta">
            <span>
              <Radar size={15} /> Built for real operations
            </span>
            <span>
              <Route size={15} /> Designed for every route
            </span>
          </div>
        </div>
      </section>

      <section className="services-intro">
        <div className="site-width services-intro-inner">
          <div>
            <span className="dark-kicker">
              <i /> The Codcknet standard
            </span>
            <h2>
              More than a device.
              <br />
              <span>A complete safety system.</span>
            </h2>
          </div>
          <p>
            Every service we provide is designed around the same goal: giving
            people and businesses the confidence to move safely, stay compliant,
            and remain in control.
          </p>
        </div>
      </section>

      <section className="service-catalog">
        <div className="site-width">
          <div className="catalog-heading">
            <span className="dark-kicker">
              <i /> What we deliver
            </span>
            <p>
              Six practical ways we help your vehicles work safer and smarter.
            </p>
          </div>
          <div className="catalog-grid">
            {services.map(([number, title, description, Icon, image]) => (
              <article className="catalog-card" key={title}>
                <div
                  className="catalog-image"
                  style={{
                    backgroundImage: `linear-gradient(180deg, #08132122, #081321dd), url(${image})`,
                  }}
                >
                  <span>{number}</span>
                  <i>
                    <Icon size={21} />
                  </i>
                </div>
                <div className="catalog-card-body">
                  <h3>{title}</h3>
                  <p>{description}</p>
                  <a href="/book-online">
                    Talk to an expert <ArrowRight size={14} />
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="service-proof">
        <div className="site-width proof-layout">
          <div>
            <span className="dark-kicker">
              <i /> Why teams choose us
            </span>
            <h2>
              Precision at every
              <br />
              <span>point of the journey.</span>
            </h2>
          </div>
          <div className="proof-points">
            <div>
              <BadgeCheck size={19} />
              <span>
                <b>Certified processes</b>
                <small>Standards-led installation and documentation.</small>
              </span>
            </div>
            <div>
              <ShieldCheck size={19} />
              <span>
                <b>Road safety first</b>
                <small>
                  Systems built to reduce risk and improve accountability.
                </small>
              </span>
            </div>
            <div>
              <Navigation size={19} />
              <span>
                <b>Support that stays close</b>
                <small>
                  Technical help from setup through daily operation.
                </small>
              </span>
            </div>
          </div>
        </div>
      </section>

      <section className="services-cta">
        <div className="site-width services-cta-inner">
          <div>
            <span className="dark-kicker">
              <i /> Ready to get moving?
            </span>
            <h2>
              Put safer systems
              <br />
              <span>on every route.</span>
            </h2>
            <p>
              Tell us what you operate, where you operate, and what you need to
              control. We&apos;ll help you choose the right solution.
            </p>
            <a className="hero-button" href="/book-online#contact">
              CONTACT US <ArrowRight size={16} />
            </a>
          </div>
          <div className="services-cta-panel">
            <div
              className="cta-panel-map"
              style={{
                backgroundImage:
                  "linear-gradient(180deg, rgba(8, 19, 33, 0.18), rgba(8, 19, 33, 0.72)), url('/images/route.jpg')",
                backgroundPosition: "center",
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
              }}
            />
          </div>
        </div>
      </section>

      <footer className="dark-footer">
        <div className="site-width footer-grid">
          <div>
            <a className="brand dark-brand" href="/">
              <img
                className="brand-mark"
                src="/images/image.png"
                alt="Codcknet logo"
              />
              <span className="brand-name">
                Codcknet <small>Nigeria Limited</small>
              </span>
            </a>
            <p>Engineering safer roads and smarter fleets across Nigeria.</p>
          </div>
          <div>
            <h4>Connect with us</h4>
            <a href="mailto:codcknetinstallation@gmail.com">
              codcknetinstallation@gmail.com
            </a>
            <a href="tel:+2349099522825">+234 909 952 2825</a>
            <span>Nigeria</span>
          </div>
          <div>
            <h4>Explore</h4>
            <a href="/">Home</a>
            <a href="/about-us">About Us</a>
            <a href="/services">Service List</a>
            <a href="/book-online#contact">Contact Us</a>
          </div>
        </div>
        <div className="site-width footer-bottom">
          <span>
            © {new Date().getFullYear()} Codcknet Nigeria Limited. All rights
            reserved.
          </span>
          <span>Privacy Policy &nbsp; Terms &amp; Conditions</span>
        </div>
      </footer>
    </main>
  );
}
