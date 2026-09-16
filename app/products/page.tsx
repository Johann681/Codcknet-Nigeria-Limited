"use client";

import { useState } from "react";
import {
  ArrowRight,
  BadgeCheck,
  BatteryCharging,
  ChevronRight,
  Gauge,
  MapPin,
  Menu,
  Radar,
  Radio,
  ScanLine,
  ShieldCheck,
  Signal,
  Truck,
  X,
} from "lucide-react";
import ThemeToggle from "@/components/theme-toggle";

const scannerFunctions = [
  ["Read Codes", ScanLine],
  ["Clear Codes", ShieldCheck],
  ["Live Data", Signal],
  ["I/M Readiness", BadgeCheck],
  ["Freeze Frame", BatteryCharging],
  ["O2 Sensor Test", Radio],
] as const;

const fleetDevices = [
  [
    "AIS 140 IRNSS Device",
    "A rugged, standards-ready tracking unit for commercial fleets that need dependable location intelligence and compliance visibility.",
    "/images/Ais140.jpg",
    "01",
  ],
  [
    "Blackbox TM 65",
    "A discreet fleet blackbox built for route history, driver behavior insights, and reliable event reporting.",
    "/images/Black-box-tm-65.jpg",
    "02",
  ],
  [
    "Blackbox TM 33 PLUS",
    "Connected hardware for practical vehicle oversight, speed alerts, geofencing, and responsive fleet control.",
    "/images/Black-box-tm-33.jpg",
    "03",
  ],
] as const;

export default function ProductsPage() {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <main className="products-page dark-site">
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
            <a href="/services">Service List</a>
            <a className="active" href="/products">
              Products
            </a>
            <a href="/book-online">Book Online</a>
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

      <section className="products-hero">
        <div className="products-hero-image" />
        <div className="products-hero-overlay" />
        <div className="products-hero-grid" />
        <div className="site-width products-hero-content">
          <span className="dark-kicker">
            <i /> Hardware / vehicle intelligence
          </span>
          <h1>
            Our <span>Products.</span>
          </h1>
          <p>
            We supply government-approved speed limiters, GPS trackers, and
            fleet devices that meet Nigeria&apos;s highest safety standards.
          </p>
          <div className="products-hero-meta">
            <span>
              <BadgeCheck size={15} /> Government-approved hardware
            </span>
            <span>
              <Signal size={15} /> Connected across Nigeria
            </span>
          </div>
        </div>
      </section>

      <section className="hardware-section">
        <div className="site-width">
          <div className="hardware-heading">
            <div>
              <span className="dark-kicker">
                <i /> Core hardware
              </span>
              <h2>
                Small devices.
                <br />
                <span>Serious control.</span>
              </h2>
            </div>
            <p>
              From a single car or motorcycle to a national transport fleet, we
              fit the hardware that makes your operation visible and
              accountable.
            </p>
          </div>
          <div className="hardware-showcase">
            <article className="limiter-kit">
              <div
                className="kit-photo"
                style={{
                  backgroundImage:
                    "linear-gradient(180deg, #07111d11, #07111db0), url('/images/sabo-speed-limiter.jpeg')",
                }}
              >
                <span>COMPLETE SABO KIT</span>
              </div>
              <div className="kit-copy">
                <span className="product-tag">01 / FEATURED KIT</span>
                <h3>
                  Sabo Vehicle
                  <br />
                  <span>Speed Limiter Kit</span>
                </h3>
                <p>
                  A complete, calibrated solution for controlled vehicle speed
                  and certified road safety compliance.
                </p>
                <div className="kit-list">
                  <span>
                    <Gauge size={15} /> Precision speed control
                  </span>
                  <span>
                    <ShieldCheck size={15} /> FRSC-aligned installation
                  </span>
                  <span>
                    <Radio size={15} /> GPS-ready architecture
                  </span>
                </div>
                <a className="product-link" href="/#contact">
                  Request this product <ArrowRight size={15} />
                </a>
              </div>
            </article>
            <article className="universal-tracker">
              <div
                className="tracker-photo"
                style={{
                  backgroundImage:
                    "linear-gradient(180deg, #07111d11, #07111db0), url('/images/route.jpg')",
                }}
              >
                <span>UNIVERSAL GPS TRACKER</span>
              </div>
              <div>
                <span className="product-tag">02 / UNIVERSAL TRACKING</span>
                <h3>
                  Compact GPS
                  <br />
                  <span>Tracker Units</span>
                </h3>
                <p>
                  Discrete, reliable tracking for motorcycles, cars, and
                  commercial vehicles.
                </p>
                <div className="tracker-types">
                  <span>Motorcycles</span>
                  <span>Cars</span>
                  <span>Commercial</span>
                </div>
                <a className="product-link" href="/#contact">
                  View tracking options <ArrowRight size={15} />
                </a>
              </div>
            </article>
          </div>
        </div>
      </section>

      <section className="fleet-devices-section">
        <div className="site-width">
          <div className="hardware-heading fleet-heading">
            <div>
              <span className="dark-kicker">
                <i /> Fleet intelligence
              </span>
              <h2>
                Built for the
                <br />
                <span>long haul.</span>
              </h2>
            </div>
            <p>
              Industrial tracking hardware for companies that need more than a
              pin on a map.
            </p>
          </div>
          <div className="fleet-device-grid">
            {fleetDevices.map(([title, description, image, number]) => (
              <article className="fleet-device-card" key={title}>
                <div
                  className="fleet-device-image"
                  style={{
                    backgroundImage: `linear-gradient(180deg, #07111d22, #07111ddd), url(${image})`,
                  }}
                >
                  <span>{number}</span>
                  <Radar size={24} />
                </div>
                <div>
                  <h3>{title}</h3>
                  <p>{description}</p>
                  <a className="product-link" href="/#contact">
                    Explore device <ArrowRight size={14} />
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="scanner-section">
        <div className="site-width scanner-layout">
          <div className="scanner-copy">
            <span className="dark-kicker">
              <i /> Diagnostics / workshop tools
            </span>
            <h2>
              Know what&apos;s
              <br />
              <span>under the hood.</span>
            </h2>
            <p>
              The Autel AL538B gives technicians a clear starting point for
              diagnostics, maintenance decisions, and faster issue resolution.
            </p>
            <div
              className="scanner-photo"
              style={{
                backgroundImage:
                  "linear-gradient(180deg, #07111d11, #07111d55), url('/images/autel-al539b.jpeg')",
              }}
            />
          </div>
          <div className="scanner-functions">
            <div className="scanner-heading">
              <span className="product-tag">AUTEL AL538B SCAN TOOL</span>
              <h3>Essential OBDII functions</h3>
              <p>Professional insight without the guesswork.</p>
            </div>
            <div className="function-grid">
              {scannerFunctions.map(([title, Icon]) => (
                <div className="function-item" key={title}>
                  <i>
                    <Icon size={17} />
                  </i>
                  <span>{title}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="feature-section">
        <div className="site-width">
          <div className="center-heading">
            <span className="dark-kicker">
              <i /> Connected by design
            </span>
            <h2>
              Control the details
              <br />
              <span>that move you forward.</span>
            </h2>
            <p>
              One connected system gives fleet leaders the clarity to respond
              early and operate with confidence.
            </p>
          </div>
          <div className="feature-grid">
            <div>
              <Radar size={21} />
              <b>24/7 live tracking</b>
              <span>
                See vehicles and assets in motion, wherever the route takes
                them.
              </span>
            </div>
            <div>
              <RouteIcon />
              <b>Historical playback</b>
              <span>
                Review routes, stops, and journeys with a reliable operational
                record.
              </span>
            </div>
            <div>
              <PowerIcon />
              <b>Remote engine shutdown</b>
              <span>
                Respond to high-risk events with control built into the system.
              </span>
            </div>
            <div>
              <MapPin size={21} />
              <b>Geofencing</b>
              <span>
                Set smart boundaries and receive alerts when vehicles cross
                them.
              </span>
            </div>
            <div>
              <Gauge size={21} />
              <b>Speed alerts</b>
              <span>
                Make safer driving visible with timely speed event
                notifications.
              </span>
            </div>
          </div>
        </div>
      </section>

      <section className="products-cta">
        <div className="site-width products-cta-inner">
          <div>
            <span className="dark-kicker">
              <i /> Choose the right hardware
            </span>
            <h2>
              Let&apos;s equip your
              <br />
              <span>operation properly.</span>
            </h2>
            <p>
              Tell us what you drive, where you operate, and what you need to
              monitor. We&apos;ll guide you to the right device.
            </p>
            <a className="hero-button" href="/#contact">
              BOOK ONLINE <ArrowRight size={16} />
            </a>
          </div>
          <div className="product-cta-radar">
            <Radar size={310} />
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
            <a href="/products">Products</a>
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
 
function RouteIcon() {
  return (
    <span className="route-icon">
      <span />
      <span />
      <span />
    </span>
  );
}

function PowerIcon() {
  return <span className="power-icon">↯</span>;
}
