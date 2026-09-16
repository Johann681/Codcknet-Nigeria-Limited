"use client";

import { useState } from "react";
import {
  ArrowDownRight,
  ArrowRight,
  BadgeCheck,
  ChevronRight,
  Menu,
  Navigation,
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
    "Ensure compliance and safety with approved speed limiter devices installed by experts.",
    ShieldCheck,
  ],
  [
    "02",
    "GPS Vehicle Tracking",
    "Track, monitor, and secure your vehicles in real time with advanced GPS solutions.",
    Navigation,
  ],
  [
    "03",
    "Fleet Management",
    "Optimize performance, reduce risk, and improve efficiency with complete fleet monitoring.",
    Truck,
  ],
  [
    "04",
    "Maintenance & Support",
    "Get reliable after-sales support, troubleshooting, and system updates to stay covered.",
    Wrench,
  ],
] as const;

const authorities = [
  [
    "FRSC",
    "Federal Road Safety Corps",
    "Speed limiter installations aligned with national safety standards to help reduce accidents on Nigerian roads.",
    "/images/frsc-logo.jpeg",
  ],
  [
    "NCC",
    "Nigerian Communications Commission",
    "Tracking devices that meet approved communication standards for accuracy, durability, and nationwide coverage.",
    "/images/ncc-logo.jpeg",
  ],
  [
    "VIO",
    "Vehicle Inspection Office",
    "Installation work that supports roadworthiness, legal inspection standards, and safer vehicle operations.",
    "/images/vio-logo.jpeg",
  ],
] as const;

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <main className="dark-site">
      <header className="site-header">
        <div className="site-width header-inner">
          <a className="brand dark-brand" href="#home">
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
            <a href="#home" onClick={() => setMenuOpen(false)}>
              Home
            </a>
            <a href="/about-us" onClick={() => setMenuOpen(false)}>
              About Us
            </a>
            <a href="/services" onClick={() => setMenuOpen(false)}>
              Service List
            </a>
            <a href="/products" onClick={() => setMenuOpen(false)}>
              Products
            </a>
            <a href="/book-online" onClick={() => setMenuOpen(false)}>
              Book Online
            </a>
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
      <section className="dark-hero" id="home">
        <video
          className="hero-video"
          autoPlay
          muted
          loop
          playsInline
          poster="/images/route.jpg"
        >
          <source src="/images/kling_20260915_VIDEO__0_4_secon_81_0.mp4" type="video/mp4" />
        </video>
        <div className="hero-overlay" />
        <div className="hero-lines" />
        <div className="site-width hero-content">
          <span className="dark-kicker">
            <i /> Certified safety &amp; compliance
          </span>
          <h1>
            Safety on Every Journey.
            <br />
            <span>Smarter Fleet Control.</span>
          </h1>
          <p>
            Certified speed limiters, GPS vehicle tracking, and fleet management
            solutions for individuals, transport companies, and organizations
            across Nigeria.
          </p>
          <a className="hero-button" href="#contact">
            GET STARTED <ArrowDownRight size={17} />
          </a>
          <div className="hero-footnote">
            <span>FRSC Accredited Vendor</span>
            <b>SLDV/LG/000058</b>
            <i />
          </div>
        </div>
        <div className="hero-scroll">
          <span /> Scroll to explore
        </div>
      </section>
      <section className="dark-section about-section" id="about-us">
        <div className="site-width about-layout">
          <div className="field-image">
            <span className="image-label">
              <i /> Field installation / Lagos
            </span>
          </div>
          <div className="about-content">
            <span className="dark-kicker">
              <i /> Who we are
            </span>
            <h2>
              Driven by safety.
              <br />
              <span>Built for the road ahead.</span>
            </h2>
            <p>
              At Codcknet Nigeria Limited, safety drives everything we do. From
              certified speed limiter installations to advanced GPS tracking and
              fleet management, we combine technology and expertise to keep you
              in control.
            </p>
            <p>
              Trusted by transport companies and individual drivers across
              Nigeria, we deliver more than just products. We deliver peace of
              mind.
            </p>
            <a className="outline-button" href="#contact">
              READ MORE <ArrowRight size={16} />
            </a>
            <div className="about-stats">
              <div>
                <strong>
                  10<span>+</span>
                </strong>
                <small>Years of precision</small>
              </div>
              <div>
                <strong>36</strong>
                <small>States covered</small>
              </div>
              <div>
                <strong>24/7</strong>
                <small>Support when needed</small>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="trust-section" id="products">
        <div className="site-width">
          <div className="center-heading">
            <span className="dark-kicker">
              <i /> Institutional trust
            </span>
            <h2>Certified &amp; Trusted</h2>
            <p>
              Our solutions are approved by recognized authorities and meet the
              compliance standards that keep Nigeria moving safely.
            </p>
          </div>
          <div className="authority-grid">
            {authorities.map(([short, title, description, image]) => (
              <article className="authority-circle-card" key={short}>
                <div className="authority-circle">
                  <img src={image} alt={`${title} logo`} />
                  <BadgeCheck size={17} />
                </div>
                <h3>{title}</h3>
                <p>{description}</p>
                <span className="card-rule" />
              </article>
            ))}
          </div>
          <a className="outline-button centered-button" href="#contact">
            SEE ALL CERTIFICATIONS <ArrowRight size={16} />
          </a>
        </div>
      </section>
      <section className="services-section" id="services">
        <div className="site-width">
          <div className="services-heading">
            <div>
              <span className="dark-kicker">
                <i /> What we do
              </span>
              <h2>
                Our Core <span>Services</span>
              </h2>
            </div>
            <p>
              Practical systems and responsive support for safer vehicles,
              stronger operations, and confident journeys.
            </p>
          </div>
          <div className="service-list">
            {services.map(([number, title, description, Icon]) => (
              <article className="service-row" key={title}>
                <span className="service-number">{number}</span>
                <span className="service-symbol">
                  <Icon size={21} />
                </span>
                <div>
                  <h3>{title}</h3>
                  <p>{description}</p>
                </div>
                <ChevronRight className="service-arrow" size={20} />
              </article>
            ))}
          </div>
          <a className="service-link" href="#contact">
            View Full Service List <ArrowRight size={16} />
          </a>
        </div>
      </section>
      <section className="contact-band" id="contact">
        <div className="site-width contact-content">
          <div>
            <span className="dark-kicker">
              <i /> Committed to safety
            </span>
            <h2>
              Ready for a safer,
              <br />
              <span>smarter operation?</span>
            </h2>
          </div>
          <div>
            <p>
              Talk to a Codcknet specialist about your vehicles, routes, and
              fleet.
            </p>
            <a
              className="hero-button"
              href="mailto:codcknetinstallation@gmail.com"
            >
              BOOK ONLINE <ArrowRight size={16} />
            </a>
          </div>
          <iframe
            className="site-map site-map-home"
            title="Google Maps overview of Nigeria"
            src="https://www.google.com/maps?q=Nigeria&output=embed"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </section>
      <footer className="dark-footer">
        <div className="site-width footer-grid">
          <div>
            <a className="brand dark-brand" href="#home">
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
            <h4>Additional links</h4>
            <a href="#about-us">About Us</a>
            <a href="#services">Service List</a>
            <a href="#products">Products</a>
            <a href="#contact">Book Online</a>
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
