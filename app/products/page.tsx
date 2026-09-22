"use client";

import {
  ArrowRight,
  BadgeCheck,
  BatteryCharging,
  ChevronRight,
  Gauge,
  MapPin,
  Radar,
  Radio,
  ScanLine,
  ShieldCheck,
  Signal,
  Sparkles,
  Truck,
} from "lucide-react";
import NavSocials from "@/components/NavSocials";

const scannerFunctions = [
  ["Read Codes", ScanLine],
  ["Clear Codes", ShieldCheck],
  ["Live Data", Signal],
  ["I/M Readiness", BadgeCheck],
  ["Freeze Frame", BatteryCharging],
  ["O2 Sensor Test", Radio],
] as const;


export default function ProductsPage() {
  return (
    <main className="products-page dark-site">
      <section className="products-hero">
        <div className="products-hero-image" />
        <div className="products-hero-overlay" />
        <div className="products-hero-grid" />
        <div className="site-width products-hero-content">
          <span className="dark-kicker">
            <i /> Hardware / vehicle intelligence
          </span>
          <h1>
            Our <span>Products. </span>
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
              We supply and install the hardware that makes your operation
              visible, safer, and accountable.
            </p>
          </div>
          <div className="hardware-showcase">
            <article className="limiter-kit">
              <div
                className="kit-photo"
                style={{
                  backgroundImage:
                    "linear-gradient(180deg, #07111d11, #07111db0), url('/images/vehicle speedlimiter device.jpeg')",
                }}
              >
                
              </div>
              <div className="kit-copy">
                <span className="product-tag">01 / FEATURED KIT</span>
                <h3>
                  Codcknet Vehicle
                  <br />
                  <span>Speed Limiter Device</span>
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
                <a className="product-link" href="/book-online">
                  Request this product <ArrowRight size={15} />
                </a>
              </div>
            </article>
            <article className="universal-tracker">
              <div
                className="tracker-photo"
                style={{
                  backgroundImage:
                    "linear-gradient(180deg, #07111d11, #07111d55), url('/images/codcknet gps tracker.jpeg')",
                }}
              >
               
              </div>
              <div>
                <span className="product-tag">02 / UNIVERSAL TRACKING</span>
                <h3>
                  Codcknet GPS
                  <br />
                  <span>Tracker Device</span>
                </h3>
                <p>
                  Discrete, reliable GPS tracking for vehicles and fleet
                  operations.
                </p>
                <a className="product-link" href="/book-online">
                  Request this product <ArrowRight size={15} />
                </a>
              </div>
            </article>

            <article className="universal-tracker">
              <div
                className="tracker-photo"
                style={{
                  backgroundImage:
                    "linear-gradient(180deg, #07111d11, #07111d55), url('/images/cctv.jpeg')",
                }}
              >
              </div>
              <div>
                <span className="product-tag">03 / SMART SURVEILLANCE</span>
                <h3>
                  Codcknet CCTV
                  <br />
                  <span>Security Camera System</span>
                </h3>
                <p>
                  Reliable CCTV surveillance for property protection, monitoring,
                  and real-time awareness.
                </p>
                <a className="product-link" href="/book-online">
                  Request this product <ArrowRight size={15} />
                </a>
              </div>
            </article>
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
            <div>
              <Sparkles size={21} />
              <b>And many more</b>
              <span>
                Fuel monitoring, driver behavior analytics, SOS alerts, and custom fleet capabilities.
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
            <a className="hero-button" href="/book-online#contact">
              CONTACT US <ArrowRight size={16} />
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
            <a href="mailto:info@codcknet.com">
              info@codcknet.com
            </a>
            <a href="tel:+2347040272129">+234 704 027 2129</a>
            <a href="tel:+2349099522825">+234 909 952 2825</a>
            <a href="tel:+2347074526007">+234 707 452 6007</a>
            <div className="mt-2 pt-1">
              <NavSocials />
            </div>
            <span>Nigeria</span>
          </div>
          <div>
            <h4>Explore</h4>
            <a href="/">Home</a>
            <a href="/about-us">About Us</a>
            <a href="/services">Service List</a>
            <a href="/products">Products</a>
            <a href="/certificates">Certificates</a>
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
