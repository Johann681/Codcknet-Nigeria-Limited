"use client";

import { useState } from "react";
import {
  ArrowRight,
  BadgeCheck,
  Building2,
  Calendar,
  CheckCircle2,
  ChevronRight,
  ExternalLink,
  FileCheck,
  FileText,
  Lock,
  Phone,
  Shield,
  ShieldAlert,
  ShieldCheck,
  X,
  ZoomIn,
} from "lucide-react";
import NavSocials from "@/components/NavSocials";

interface CertificateItem {
  id: string;
  regNumber?: string;
  authority: string;
  title: string;
  subtitle: string;
  badge: string;
  image: string;
  description: string;
  coverage: string[];
}

const CERTIFICATES: CertificateItem[] = [
  {
    id: "ncc",
    regNumber: "NCC/VTS/2023",
    authority: "Nigerian Communications Commission (NCC)",
    title: "Vehicle Tracking License",
    subtitle: "Public Mobile Communications & Vehicle Tracking License",
    badge: "Active / Licensed",
    image: "/images/ncc-vehicle-tracking-certificate.avif",
    description:
      "Authorizes Codcknet Nigeria Limited to operate and provide nationwide commercial vehicle tracking and telematics services across Nigerian networks.",
    coverage: [
      "Nationwide GSM/GPS frequency operation",
      "Public mobile communications compliance",
      "Data transmission & security protocols",
      "Commercial fleet tracking authorization",
    ],
  },
  {
    id: "cac",
    regNumber: "RC No. 1231301",
    authority: "Corporate Affairs Commission (CAC)",
    title: "Certificate of Incorporation",
    subtitle: "Federal Republic of Nigeria Companies Act",
    badge: "Incorporated Entity",
    image: "/images/cac-certificate.avif",
    description:
      "Official certificate of incorporation issued by the Corporate Affairs Commission confirming Codcknet Nigeria Limited as a legally registered corporation.",
    coverage: [
      "Registered corporate legal identity",
      "Full automotive engineering mandate",
      "Government contracting eligibility",
      "Institutional vendor accreditation",
    ],
  },
  {
    id: "conformity",
    regNumber: "FRSC / SON / NADDC Standards",
    authority: "FRSC • SON • NADDC Inter-Agency Committee",
    title: "Speed Limiting Conformity Certificate",
    subtitle: "Authorized Vendor, Installer & Calibration Provider",
    badge: "Approved & Certified",
    image: "/images/speed-limiting-conformity-certificate.avif",
    description:
      "Certificate of conformity certifying that Codcknet speed limiting devices and installation practices strictly adhere to FRSC, SON, and NADDC specifications.",
    coverage: [
      "FRSC road safety audit alignment",
      "Standards Organisation of Nigeria (SON) conformity",
      "NADDC automotive technology compliance",
      "Tamper-proof calibration & certification",
    ],
  },
];

const AUTHORITIES = [
  {
    short: "FRSC",
    name: "Federal Road Safety Corps",
    role: "National Road Safety Authority",
    details:
      "Mandates and verifies speed limiter installations to eliminate excessive speeding and reduce highway fatalities across Nigeria.",
    logo: "/images/frsc-logo.jpeg",
  },
  {
    short: "NCC",
    name: "Nigerian Communications Commission",
    role: "Telecommunications Regulator",
    details:
      "Regulates telematics, tracking devices, and communication standards for high reliability and secure frequency usage.",
    logo: "/images/ncc-logo.jpeg",
  },
  {
    short: "NADDC",
    name: "National Automotive Design and Development Council",
    role: "Automotive Policy & Standards",
    details:
      "Ensures automotive speed limiters and electronic safety additions adhere to vehicle engineering standards.",
    logo: "/images/naddc-logo.jpeg",
  },
  {
    short: "SON",
    name: "Standards Organisation of Nigeria",
    role: "National Quality & Standardization",
    details:
      "Sets technical specifications (NIS) to guarantee product durability, precision calibration, and safety compliance.",
    logo: "/images/son-logo.jpeg",
  },
  {
    short: "CAC",
    name: "Corporate Affairs Commission",
    role: "Corporate Incorporation & Legal Registry",
    details:
      "Certifies Codcknet Nigeria Limited as a duly registered corporate entity (RC 1231301) operating legally nationwide.",
    logo: "/images/cac-logo.jpeg",
  },
  {
    short: "VIO",
    name: "Vehicle Inspection Office",
    role: "Roadworthiness & Fleet Verification",
    details:
      "Inspects commercial and private fleet devices during annual roadworthiness tests and safety certification.",
    logo: "/images/vio-logo.jpeg",
  },
];

export default function CertificatesPage() {
  const [selectedCert, setSelectedCert] = useState<CertificateItem | null>(null);

  return (
    <main className="about-page dark-site">
      {/* Hero Section */}
      <section className="about-hero">
        <div className="about-hero-image" />
        <div className="about-hero-overlay" />
        <div className="site-width about-hero-content">
          <span className="dark-kicker">
            <i /> Institutional Trust &amp; Compliance
          </span>
          <h1>
            Our Official
            <br />
            <span>Certificates &amp; Licences.</span>
          </h1>
          <p>
            Fully certified by FRSC, NCC, NADDC, SON, and CAC. Every Codcknet
            hardware installation comes with authentic, government-recognized
            compliance documentation.
          </p>
          <div className="about-breadcrumb">
            <a href="/">Home</a>
            <ChevronRight size={13} />
            <a href="/about-us">About Us</a>
            <ChevronRight size={13} />
            <span>Certifications</span>
          </div>
        </div>
      </section>

      {/* Main Certificates Showcase Section */}
      <section className="certificates-section" id="certificates-list">
        <div className="site-width">
          <div className="center-heading">
            <span className="dark-kicker">
              <i /> Verified Credentials
            </span>
            <h2>
              Official Proof of
              <br />
              <span>Accreditation &amp; Standards</span>
            </h2>
            <p>
              Click on any certificate to view high-resolution documentation,
              regulatory mandates, and compliance scope.
            </p>
          </div>

          <div className="certificate-grid" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))" }}>
            {CERTIFICATES.map((cert) => (
              <article
                className="certificate-card cursor-pointer group transition-all duration-300 hover:border-[#4d86db]"
                key={cert.id}
                onClick={() => setSelectedCert(cert)}
              >
                <div className="certificate-logo-frame relative overflow-hidden group-hover:bg-[#f0f4fa]">
                  <img
                    src={cert.image}
                    alt={`${cert.title} original certificate`}
                    className="transition-transform duration-300 group-hover:scale-[1.02]"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity duration-200">
                    <span className="inline-flex items-center gap-2 bg-[#0c1829] text-white text-xs font-bold px-4 py-2 rounded-full shadow-lg border border-white/20">
                      <ZoomIn size={14} /> Click to Inspect
                    </span>
                  </div>
                  <span>
                    <BadgeCheck size={12} /> ORIGINAL CERTIFICATE
                  </span>
                </div>
                <div className="mt-4">
                  <div className="flex items-center justify-between text-[11px] text-[#6da9ff] font-semibold">
                    <span>{cert.regNumber}</span>
                    <span className="text-[#48d597]">{cert.badge}</span>
                  </div>
                  <h3 className="text-base font-bold mt-1 text-white">{cert.title}</h3>
                  <p className="text-xs text-[#8997a9] mt-1">{cert.subtitle}</p>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedCert(cert);
                    }}
                    className="mt-3 text-xs text-[#5da4ff] hover:text-white font-bold inline-flex items-center gap-1 uppercase tracking-wider"
                  >
                    View Details <ArrowRight size={13} />
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Regulators / Authorities Grid */}
      <section className="partners-section">
        <div className="site-width">
          <div className="center-heading partner-heading">
            <span className="dark-kicker">
              <i /> Statutory Authorities
            </span>
            <h2>
              Governed by Nigeria&apos;s
              <br />
              <span>Leading Safety Bodies</span>
            </h2>
            <p>
              We operate under full compliance with Nigerian federal transport,
              safety, and telecommunications frameworks.
            </p>
          </div>
          <div className="partner-badges" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", display: "grid", gap: "16px" }}>
            {AUTHORITIES.map((item) => (
              <div
                key={item.short}
                className="p-5 bg-[#101722] border border-[#253143] rounded-sm flex items-start gap-4"
              >
                <div className="size-14 rounded-full bg-white p-1 shrink-0 flex items-center justify-center shadow-inner overflow-hidden">
                  <img
                    src={item.logo}
                    alt={`${item.short} logo`}
                    className="size-full object-contain"
                  />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-black text-[#5da4ff] uppercase tracking-wider">
                      {item.short}
                    </span>
                    <BadgeCheck size={13} className="text-[#48d597]" />
                  </div>
                  <h4 className="text-sm font-bold text-white mt-0.5">{item.name}</h4>
                  <p className="text-[11px] text-[#8ba0b8] leading-relaxed mt-1">
                    {item.details}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Certification Matters */}
      <section className="about-story" style={{ padding: "80px 0", background: "#0b121c" }}>
        <div className="site-width">
          <div style={{ maxWidth: "800px", margin: "0 auto", textAlign: "center" }}>
            <span className="dark-kicker">
              <i /> Compliance Guarantee
            </span>
            <h2 className="text-2xl font-bold text-white mt-2">
              Why Official Certification Protects Your Fleet
            </h2>
            <p className="text-sm text-[#8ba0b8] leading-relaxed mt-3">
              Using uncertified speed limiters or unregistered tracking equipment
              exposes your drivers and company to regulatory penalties, vehicle
              impoundment by FRSC/VIO, and voided insurance claims. With
              Codcknet, every installation is backed by official certification,
              digital verification, and full compliance immunity.
            </p>
            <div className="flex flex-wrap justify-center gap-4 mt-6">
              <a className="hero-button" href="/book-online#contact">
                BOOK CERTIFIED INSTALLATION <ArrowRight size={15} />
              </a>
              <a
                className="outline-button"
                href="https://wa.me/2347074526007?text=Hello%20Codcknet%20Team,%20I%20would%20like%20to%20verify%20certificates"
                target="_blank"
                rel="noreferrer"
              >
                ASK A COMPLIANCE OFFICER <ExternalLink size={14} />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Full Certificate Inspection Modal */}
      {selectedCert && (
        <div
          className="booking-modal-backdrop"
          role="presentation"
          onClick={() => setSelectedCert(null)}
        >
          <div
            className="booking-modal"
            style={{ maxWidth: "680px", width: "95%" }}
            role="dialog"
            aria-modal="true"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="modal-close"
              onClick={() => setSelectedCert(null)}
              aria-label="Close certificate preview"
            >
              <X size={18} />
            </button>

            <span className="dark-kicker">
              <i /> {selectedCert.authority}
            </span>
            <h2 className="text-xl font-bold mt-1 text-white">{selectedCert.title}</h2>
            <p className="text-xs text-[#8ba0b8]">{selectedCert.subtitle}</p>

            <div className="my-4 p-2 bg-white rounded-md border border-slate-200">
              <img
                src={selectedCert.image}
                alt={selectedCert.title}
                className="w-full max-h-[380px] object-contain mx-auto"
              />
            </div>

            <div className="p-3 bg-[#111c2b] border border-[#233852] rounded-md text-xs text-[#a3b8cf] space-y-2">
              <p className="leading-relaxed">{selectedCert.description}</p>
              <div className="pt-2 border-t border-white/10">
                <span className="font-bold text-white block mb-1">Key Authorized Scope:</span>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-1.5">
                  {selectedCert.coverage.map((item, idx) => (
                    <li key={idx} className="flex items-center gap-1.5 text-[11px] text-[#c0d4ea]">
                      <CheckCircle2 size={12} className="text-[#48d597] shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-5 flex items-center justify-between gap-3">
              <a
                href={selectedCert.image}
                target="_blank"
                rel="noreferrer"
                className="outline-button text-xs py-2 px-3"
              >
                OPEN FULL RESOLUTION <ExternalLink size={13} />
              </a>
              <a
                href="/book-online"
                className="hero-button text-xs py-2 px-4"
              >
                REQUEST SERVICE <ArrowRight size={13} />
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
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
            <a href="mailto:info@codcknet.com">info@codcknet.com</a>
            <a href="tel:+2347040272129">+234 704 027 2129</a>
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
