import { useState } from 'react';
import { motion } from 'motion/react';
import { Download, FileText, Check, ShieldAlert, Award, FileSpreadsheet, Printer } from 'lucide-react';
import { PRODUCTS } from '../data';

export default function BrochureViewer() {
  const [downloading, setDownloading] = useState(false);

  // Technical properties comparison
  const comparisons = [
    { metric: 'Corrosion Rate', frp: 'Zero (No rust, corrosion, or rotting)', steel: 'High (Requires regular sandblasting/painting)', ss: 'Moderate (Susceptible to chloride pitting)' },
    { metric: 'Design Life', frp: '50+ Years maintenance-free', steel: '10–15 Years with constant treatment', ss: '20–25 Years under ideal conditions' },
    { metric: 'Installation Weight', frp: 'Extremely Light (25% of Mild Steel)', steel: 'Heavy (Requires crane rigging & heavy structures)', ss: 'Heavy (High labor and transport cost)' },
    { metric: 'Thermal/Electrical', frp: 'Non-conductive, self-insulating', steel: 'Highly conductive (Static/spark risk)', ss: 'Conductive (Grounding required)' },
    { metric: 'Tensile Strength', frp: 'Very High (Optimized via glass roving angles)', steel: 'High (Isotropic, non-direction optimized)', ss: 'High (Non-direction optimized)' },
  ];

  // Resin selection guidelines
  const resins = [
    { type: 'Isophthalic Polyester', application: 'Water supply, sewage, light acidic washdowns, structural frames', temp: 'Up to 70°C' },
    { type: 'Bisphenol Polyester', application: 'Medium-duty chemicals, salt-water processing, bleach solutions', temp: 'Up to 90°C' },
    { type: 'Vinyl Ester (Derakane)', application: 'Ultra-corrosive heavy acids (HCl, H2SO4), alkaline tanks, hot flue gas scrubbers', temp: 'Up to 110°C' },
    { type: 'Epoxy / Phenolic', application: 'Low-smoke, high structural fire rating, military and electronics defense', temp: 'Up to 140°C' }
  ];

  // Function to download the technical catalog as an elegant standalone HTML document
  const handleDownloadBrochure = () => {
    setDownloading(true);

    const productPagesHtml = PRODUCTS.map((p, index) => {
      // Split applications by comma if present
      const appsKey = Object.keys(p.specifications).find(k => k.toLowerCase().includes('application'));
      const appsValue = appsKey ? p.specifications[appsKey] : '';
      const otherSpecs = { ...p.specifications };
      if (appsKey) delete otherSpecs[appsKey];

      const appsListHtml = appsValue 
        ? appsValue.split(',').map(app => `<li><span class="bullet">›</span> ${app.trim()}</li>`).join('\n')
        : '<li><span class="bullet">›</span> General Commercial Projects</li>\n<li><span class="bullet">›</span> Premium Infrastructure Installations</li>';

      const featuresHtml = p.features.map(f => `<li><span class="checkmark">✔</span> ${f}</li>`).join('\n');
      
      const specsRowsHtml = Object.entries(otherSpecs).map(([key, val]) => `
        <tr>
          <td class="spec-label">${key}</td>
          <td class="spec-value">${val}</td>
        </tr>
      `).join('\n');

      return `
      <!-- PRODUCT PAGE 0${index + 1} -->
      <div class="page product-page">
        <div class="page-header">
          <div class="header-logo">
            <span class="logo-title">AMAR FIBRE GLASS CO.</span>
            <span class="logo-punjabi">ਅਮਰ ਫਾਈਬਰ ਗਲਾਸ ਕੰਪਨੀ</span>
          </div>
          <div class="header-page-num">0${index + 1}</div>
        </div>

        <div class="product-title-row">
          <span class="category-tag">${p.category}</span>
          <h2 class="product-name">${p.name}</h2>
        </div>

        <div class="product-body-grid">
          <div class="body-left">
            <div class="image-container">
              <img src="${window.location.origin}${p.image}" alt="${p.name}" class="product-img" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';" />
              <div class="fallback-graphic">
                <div class="fallback-icon">FRP</div>
                <span>Premium Molded Composite</span>
              </div>
            </div>

            <div class="apps-container">
              <div class="section-sub-title">Applications & Use Cases</div>
              <ul class="apps-list">
                ${appsListHtml}
              </ul>
            </div>
          </div>

          <div class="body-right">
            <div class="description-block">
              <div class="section-sub-title">Product Description</div>
              <p class="description-text">${p.description}</p>
            </div>

            <div class="features-container">
              <div class="section-sub-title">Key Features</div>
              <ul class="features-list">
                ${featuresHtml}
              </ul>
            </div>

            <div class="specs-container">
              <div class="section-sub-title">Technical Specifications</div>
              <table class="specs-table">
                <tbody>
                  ${specsRowsHtml}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div class="page-footer">
          <span>Amar Fibre Glass Co. &bull; Catalog 2026</span>
          <span>amar.fibre74@gmail.com</span>
        </div>
      </div>
      `;
    }).join('\n');

    const catalogContent = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>AMAR FIBRE GLASS CO. - Corporate Product Catalog & Technical Spec Sheet</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&family=Plus+Jakarta+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,400&display=swap');
    
    :root {
      --primary: #1e3a8a;
      --secondary: #f59e0b;
      --dark: #0f172a;
      --slate-500: #64748b;
      --slate-700: #334155;
      --slate-100: #f1f5f9;
      --border: #cbd5e1;
    }

    * { box-sizing: border-box; margin: 0; padding: 0; }
    
    body {
      font-family: 'Plus Jakarta Sans', system-ui, -apple-system, sans-serif;
      color: #334155;
      background-color: #cbd5e1;
      line-height: 1.5;
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
    }

    .page {
      background: white;
      width: 210mm;
      min-height: 297mm;
      padding: 15mm 15mm 10mm 15mm;
      margin: 40px auto;
      box-shadow: 0 10px 30px rgba(0,0,0,0.15);
      position: relative;
      overflow: hidden;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      page-break-after: always;
    }

    @media print {
      body { background: white; padding: 0; margin: 0; }
      .page { margin: 0; box-shadow: none; border: none; width: 210mm; height: 297mm; page-break-after: always; }
    }

    /* Cover Page */
    .cover-page {
      background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
      color: white;
      text-align: center;
      padding: 25mm 15mm 15mm 15mm;
    }

    .cover-top {
      border-bottom: 4px solid var(--secondary);
      padding-bottom: 12px;
      margin-bottom: 25px;
    }

    .cover-logo-wrapper {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 6px;
    }

    .cover-badge {
      background-color: var(--secondary);
      color: var(--dark);
      font-size: 11px;
      font-weight: 800;
      letter-spacing: 2.5px;
      text-transform: uppercase;
      padding: 6px 16px;
      border-radius: 2px;
      display: inline-block;
      margin-bottom: 15px;
    }

    .cover-title {
      font-family: 'Outfit', sans-serif;
      font-size: 42px;
      font-weight: 800;
      letter-spacing: -0.5px;
      line-height: 1.1;
      color: white;
    }

    .cover-title-punjabi {
      font-size: 20px;
      color: #94a3b8;
      margin-top: 10px;
      letter-spacing: 0.5px;
      font-weight: 500;
    }

    .cover-tagline {
      font-size: 13px;
      color: #94a3b8;
      font-weight: 600;
      letter-spacing: 3px;
      text-transform: uppercase;
      margin-top: 5px;
    }

    .cover-hero-box {
      margin: 40px auto;
      background: rgba(255, 255, 255, 0.05);
      border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: 8px;
      padding: 25px;
      max-width: 580px;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 15px;
    }

    .cover-hero-tag {
      font-size: 13px;
      text-transform: uppercase;
      letter-spacing: 1px;
      font-weight: 700;
      color: var(--secondary);
    }

    .cover-hero-desc {
      font-size: 13px;
      color: #cbd5e1;
      line-height: 1.6;
    }

    .cover-details-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 20px;
      max-width: 550px;
      margin: 30px auto 0 auto;
      text-align: left;
      border-top: 1px solid rgba(255, 255, 255, 0.1);
      padding-top: 25px;
    }

    .cover-detail-item {
      display: flex;
      flex-direction: column;
      gap: 4px;
    }

    .cover-detail-label {
      font-size: 9px;
      font-weight: 700;
      color: #64748b;
      text-transform: uppercase;
      letter-spacing: 1.5px;
    }

    .cover-detail-val {
      font-size: 12px;
      color: #cbd5e1;
      font-weight: 500;
    }

    /* Standard Page Header & Footer */
    .page-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 2px solid var(--slate-100);
      padding-bottom: 12px;
      margin-bottom: 20px;
    }

    .header-logo {
      display: flex;
      flex-direction: column;
    }

    .logo-title {
      font-size: 14px;
      font-weight: 800;
      color: var(--dark);
      letter-spacing: 0.5px;
    }

    .logo-punjabi {
      font-size: 10px;
      color: var(--slate-500);
    }

    .header-page-num {
      font-size: 12px;
      font-weight: 700;
      font-family: monospace;
      color: var(--primary);
      background: var(--slate-100);
      padding: 4px 10px;
      border-radius: 12px;
    }

    .page-footer {
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-top: 1px solid var(--slate-100);
      padding-top: 12px;
      font-size: 10px;
      color: var(--slate-500);
      font-weight: 500;
    }

    /* Product Page Specific */
    .product-title-row {
      display: flex;
      flex-direction: column;
      gap: 4px;
      margin-bottom: 20px;
    }

    .category-tag {
      font-size: 10px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 1.5px;
      color: var(--primary);
    }

    .product-name {
      font-family: 'Outfit', sans-serif;
      font-size: 24px;
      font-weight: 700;
      color: var(--dark);
    }

    .product-body-grid {
      display: grid;
      grid-template-columns: 85mm 100mm;
      gap: 20px;
      flex: 1;
      margin-bottom: 15px;
    }

    .body-left {
      display: flex;
      flex-direction: column;
      gap: 20px;
    }

    .body-right {
      display: flex;
      flex-direction: column;
      gap: 15px;
    }

    .image-container {
      width: 100%;
      height: 75mm;
      background-color: var(--slate-100);
      border: 1px solid #cbd5e1;
      border-radius: 4px;
      overflow: hidden;
      position: relative;
    }

    .product-img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .fallback-graphic {
      position: absolute;
      inset: 0;
      background: linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%);
      color: white;
      display: none;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 8px;
    }

    .fallback-icon {
      font-weight: 900;
      font-size: 22px;
      letter-spacing: 1px;
      border: 2px solid white;
      padding: 4px 10px;
      border-radius: 4px;
    }

    .fallback-graphic span {
      font-size: 10px;
      text-transform: uppercase;
      letter-spacing: 1px;
      opacity: 0.9;
    }

    .section-sub-title {
      font-size: 11px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 1px;
      color: var(--slate-500);
      margin-bottom: 8px;
      border-bottom: 1px solid var(--slate-100);
      padding-bottom: 4px;
    }

    .apps-container {
      background: var(--slate-100);
      padding: 15px;
      border-radius: 4px;
      border-left: 3px solid var(--secondary);
    }

    .apps-list {
      list-style: none;
      display: flex;
      flex-direction: column;
      gap: 6px;
    }

    .apps-list li {
      font-size: 11px;
      color: var(--slate-700);
      font-weight: 500;
    }

    .bullet {
      color: var(--secondary);
      font-weight: bold;
      margin-right: 6px;
    }

    .description-text {
      font-size: 11.5px;
      color: var(--slate-700);
      line-height: 1.6;
    }

    .features-list {
      list-style: none;
      display: grid;
      grid-template-columns: 1fr;
      gap: 6px;
    }

    .features-list li {
      font-size: 11px;
      color: var(--slate-700);
      display: flex;
      align-items: flex-start;
      gap: 6px;
    }

    .checkmark {
      color: #10b981;
      font-weight: bold;
    }

    .specs-table {
      width: 100%;
      border-collapse: collapse;
    }

    .specs-table td {
      border: 1px solid var(--slate-100);
      padding: 6px 10px;
      font-size: 10.5px;
    }

    .spec-label {
      font-weight: 600;
      color: var(--dark);
      background-color: var(--slate-100);
      width: 40%;
    }

    .spec-value {
      color: var(--slate-700);
    }

    /* Page 2 Details */
    .profile-title {
      font-family: 'Outfit', sans-serif;
      font-size: 26px;
      font-weight: 700;
      color: var(--dark);
      margin-bottom: 15px;
    }

    .about-text {
      font-size: 13px;
      color: var(--slate-700);
      line-height: 1.6;
      margin-bottom: 25px;
    }

    .strengths-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 15px;
      margin-bottom: 25px;
    }

    .strength-card {
      background: var(--slate-100);
      border-radius: 4px;
      padding: 15px;
      border-top: 3px solid var(--primary);
    }

    .strength-title {
      font-size: 12px;
      font-weight: 700;
      text-transform: uppercase;
      color: var(--primary);
      margin-bottom: 6px;
    }

    .strength-desc {
      font-size: 11px;
      color: var(--slate-700);
      line-height: 1.5;
    }

    .matrix-table {
      width: 100%;
      border-collapse: collapse;
      margin-top: 10px;
    }

    .matrix-table th, .matrix-table td {
      border: 1px solid var(--border);
      padding: 8px 12px;
      font-size: 11px;
      text-align: left;
    }

    .matrix-table th {
      background-color: var(--dark);
      color: white;
      text-transform: uppercase;
      font-size: 9.5px;
      letter-spacing: 1px;
    }

    .matrix-table tr:nth-child(even) {
      background-color: var(--slate-100);
    }

    .matrix-highlight {
      font-weight: 700;
      color: var(--primary);
    }

    /* Back Cover */
    .back-cover {
      background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
      color: white;
      justify-content: space-between;
      padding: 20mm 15mm;
    }

    .back-title {
      font-family: 'Outfit', sans-serif;
      font-size: 30px;
      font-weight: 800;
      color: white;
      text-align: center;
      margin-bottom: 15px;
    }

    .back-subtitle {
      font-size: 13px;
      color: var(--secondary);
      text-transform: uppercase;
      letter-spacing: 2px;
      text-align: center;
      font-weight: 600;
      margin-bottom: 40px;
    }

    .channels-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 30px;
      max-width: 580px;
      margin: 0 auto;
    }

    .channel-box {
      background: rgba(255,255,255,0.03);
      border: 1px dashed rgba(255,255,255,0.15);
      border-radius: 8px;
      padding: 20px;
      text-align: center;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 12px;
    }

    .qr-container {
      width: 120px;
      height: 120px;
      background: white;
      border-radius: 6px;
      padding: 8px;
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
    }

    /* Stylized Simulated QR code using SVG */
    .qr-svg {
      width: 100%;
      height: 100%;
    }

    .channel-title {
      font-size: 12px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 1px;
      color: #94a3b8;
    }

    .channel-action {
      font-size: 10px;
      color: var(--secondary);
      font-weight: 600;
    }

    .office-block {
      text-align: center;
      border-top: 1px solid rgba(255,255,255,0.1);
      padding-top: 30px;
      margin-top: 40px;
      display: flex;
      flex-direction: column;
      gap: 10px;
    }

    .office-address {
      font-size: 12.5px;
      color: #cbd5e1;
      max-width: 480px;
      margin: 0 auto;
      line-height: 1.6;
    }

    .office-contact {
      font-size: 13px;
      color: var(--secondary);
      font-weight: 700;
      display: flex;
      justify-content: center;
      gap: 20px;
    }

    .office-gst {
      font-size: 11px;
      color: #64748b;
      font-family: monospace;
      letter-spacing: 0.5px;
    }
  </style>
</head>
<body>

  <!-- PAGE 1: COVER PAGE -->
  <div class="page cover-page">
    <div class="cover-top">
      <div class="cover-logo-wrapper">
        <span class="cover-badge">Amar Corporate Suite</span>
        <h1 class="cover-title">AMAR FIBRE GLASS CO.</h1>
        <div class="cover-title-punjabi">ਅਮਰ ਫਾਈਬਰ ਗਲਾਸ ਕੰਪਨੀ</div>
        <p class="cover-tagline">Manufacturer of Premium FRP Products</p>
      </div>
    </div>

    <div class="cover-hero-box">
      <span class="cover-hero-tag">Core Focus</span>
      <p class="cover-hero-desc">
        Engineered Fibre Reinforced Plastic (FRP) and Glass Reinforced Plastic (GRP) composites designed to deliver outstanding corrosion immunity, structural robustness, and long-term durability in high-demand industrial processing, religious places, and architectural projects.
      </p>
    </div>

    <div class="cover-details-grid">
      <div class="cover-detail-item">
        <span class="cover-detail-label">Headquarters</span>
        <span class="cover-detail-val">Jalandhar, Punjab, India</span>
      </div>
      <div class="cover-detail-item">
        <span class="cover-detail-label">Design Standard</span>
        <span class="cover-detail-val">ISO 9001:2015 Firm</span>
      </div>
      <div class="cover-detail-item">
        <span class="cover-detail-label">Primary Hotline</span>
        <span class="cover-detail-val">+91 98141 39979</span>
      </div>
      <div class="cover-detail-item">
        <span class="cover-detail-label">Corporate Email</span>
        <span class="cover-detail-val">amar.fibre74@gmail.com</span>
      </div>
    </div>

    <div class="page-footer">
      <span>Amar Fibre Glass Co. &bull; Official Product Portfolio</span>
      <span>www.amarfibreglass.com</span>
    </div>
  </div>


  <!-- PAGE 2: CORPORATE PROFILE & COMPARISONS -->
  <div class="page profile-page">
    <div class="page-header">
      <div class="header-logo">
        <span class="logo-title">AMAR FIBRE GLASS CO.</span>
        <span class="logo-punjabi">ਅਮਰ ਫਾਈਬਰ ਗਲਾਸ ਕੰਪਨੀ</span>
      </div>
      <div class="header-page-num">00</div>
    </div>

    <div>
      <h2 class="profile-title">About Our Enterprise</h2>
      <p class="about-text">
        Amar Fibre Glass Co. is a highly trusted manufacturer and global developer of premium-grade Fibre Reinforced Plastic (FRP) composite products. Over more than 20 years of operations, we have built a reputation for designing resilient solutions matching diverse customer requirements. We specialize in custom FRP moulding, decorative architectural products, industrial heavy-duty components, landscaping decor, and detailed religious sculptures. Our products are lightweight, robust, weather-resistant, and entirely rust-free.
      </p>

      <div class="section-sub-title">Why Amar Fibre Glass?</div>
      <div class="strengths-grid">
        <div class="strength-card">
          <h4 class="strength-title">20+ Years Experience</h4>
          <p class="strength-desc">Delivering engineering excellence and top quality composites since decades.</p>
        </div>
        <div class="strength-card">
          <h4 class="strength-title">Custom Manufacturing</h4>
          <p class="strength-desc">We mold and build exactly to your drawings, color preferences, and dimensions.</p>
        </div>
        <div class="strength-card">
          <h4 class="strength-title">PAN India Supply</h4>
          <p class="strength-desc">Robust logistics network ensuring safe, timely shipping to any corner of India.</p>
        </div>
        <div class="strength-card">
          <h4 class="strength-title">Quality Assured</h4>
          <p class="strength-desc">High grade resins, strict thickness matrices, and rigorous testing checkpoints.</p>
        </div>
      </div>

      <div class="section-sub-title">Composites Performance Comparison Matrix</div>
      <table class="matrix-table">
        <thead>
          <tr>
            <th>Performance Indicator</th>
            <th>Amar FRP Composites</th>
            <th>Standard Structural Steel</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>Corrosion Rate</strong></td>
            <td class="matrix-highlight">Zero (Completely immune to acids, moisture & salts)</td>
            <td>High (Susceptible to rapid rust and chemical attack)</td>
          </tr>
          <tr>
            <td><strong>Lifespan Expectancy</strong></td>
            <td class="matrix-highlight">50+ Years (Zero structural degradation)</td>
            <td>10-15 Years (Requires continuous painting/maintenance)</td>
          </tr>
          <tr>
            <td><strong>Weight Comparison</strong></td>
            <td class="matrix-highlight">Lightweight (75% lighter than steel, easy manual install)</td>
            <td>Very Heavy (Demands high-load rigging & structures)</td>
          </tr>
          <tr>
            <td><strong>Conductivity</strong></td>
            <td class="matrix-highlight">Non-conductive (Inherent electrical/thermal insulator)</td>
            <td>Highly conductive (Requires complex grounding/shields)</td>
          </tr>
          <tr>
            <td><strong>Weathering Resistance</strong></td>
            <td class="matrix-highlight">Excellent (UV-stabilized gelcoat layer prevents fading)</td>
            <td>Poor (Rapid degradation in acidic or coastal air)</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="page-footer">
      <span>Amar Fibre Glass Co. &bull; Capabilities and Strengths</span>
      <span>ISO 9001:2015 Firm</span>
    </div>
  </div>


  <!-- DYNAMIC PRODUCT CATALOG PAGES (PAGES 3-10) -->
  ${productPagesHtml}


  <!-- PAGE 11: BACK COVER & DIRECT CALL CHANNELS -->
  <div class="page back-cover">
    <div class="page-header" style="border-bottom-color: rgba(255,255,255,0.1)">
      <div class="header-logo">
        <span class="logo-title" style="color: white">AMAR FIBRE GLASS CO.</span>
        <span class="logo-punjabi" style="color: #94a3b8">ਅਮਰ ਫਾਈਬਰ ਗਲਾਸ ਕੰਪਨੀ</span>
      </div>
      <div class="header-page-num" style="background: rgba(255,255,255,0.05); color: white">INFO</div>
    </div>

    <div>
      <h2 class="back-title">THANK YOU</h2>
      <p class="back-subtitle">We look forward to serving you!</p>

      <div class="channels-grid">
        <div class="channel-box">
          <span class="channel-title">Product Portfolio</span>
          <div class="qr-container">
            <svg class="qr-svg" viewBox="0 0 100 100">
              <!-- Corner Position detection patterns -->
              <rect x="0" y="0" width="30" height="30" fill="#0f172a" />
              <rect x="5" y="5" width="20" height="20" fill="white" />
              <rect x="10" y="10" width="10" height="10" fill="#0f172a" />
              
              <rect x="70" y="0" width="30" height="30" fill="#0f172a" />
              <rect x="75" y="5" width="20" height="20" fill="white" />
              <rect x="80" y="10" width="10" height="10" fill="#0f172a" />
              
              <rect x="0" y="70" width="30" height="30" fill="#0f172a" />
              <rect x="5" y="75" width="20" height="20" fill="white" />
              <rect x="10" y="80" width="10" height="10" fill="#0f172a" />
              
              <!-- Random QR-like blocks -->
              <rect x="40" y="10" width="10" height="10" fill="#0f172a" />
              <rect x="55" y="15" width="10" height="10" fill="#0f172a" />
              <rect x="45" y="30" width="15" height="10" fill="#0f172a" />
              <rect x="15" y="45" width="10" height="15" fill="#0f172a" />
              <rect x="35" y="50" width="10" height="10" fill="#0f172a" />
              <rect x="55" y="45" width="10" height="10" fill="#0f172a" />
              <rect x="75" y="40" width="15" height="10" fill="#0f172a" />
              <rect x="80" y="60" width="10" height="15" fill="#0f172a" />
              <rect x="40" y="75" width="10" height="15" fill="#0f172a" />
              <rect x="55" y="80" width="15" height="10" fill="#0f172a" />
              
              <!-- Center branding dot -->
              <circle cx="50" cy="50" r="10" fill="#1e3a8a" />
              <rect x="48" y="45" width="4" height="10" fill="white" />
            </svg>
          </div>
          <span class="channel-action">Scan to View Products</span>
        </div>

        <div class="channel-box">
          <span class="channel-title">Connect on WhatsApp</span>
          <div class="qr-container">
            <svg class="qr-svg" viewBox="0 0 100 100">
              <!-- Corner Position detection patterns -->
              <rect x="0" y="0" width="30" height="30" fill="#0f172a" />
              <rect x="5" y="5" width="20" height="20" fill="white" />
              <rect x="10" y="10" width="10" height="10" fill="#0f172a" />
              
              <rect x="70" y="0" width="30" height="30" fill="#0f172a" />
              <rect x="75" y="5" width="20" height="20" fill="white" />
              <rect x="80" y="10" width="10" height="10" fill="#0f172a" />
              
              <rect x="0" y="70" width="30" height="30" fill="#0f172a" />
              <rect x="5" y="75" width="20" height="20" fill="white" />
              <rect x="10" y="80" width="10" height="10" fill="#0f172a" />
              
              <!-- Random QR-like blocks -->
              <rect x="40" y="10" width="10" height="10" fill="#0f172a" />
              <rect x="55" y="20" width="10" height="10" fill="#0f172a" />
              <rect x="45" y="30" width="15" height="10" fill="#0f172a" />
              <rect x="20" y="45" width="10" height="15" fill="#0f172a" />
              <rect x="35" y="50" width="10" height="10" fill="#0f172a" />
              <rect x="55" y="50" width="10" height="10" fill="#0f172a" />
              <rect x="75" y="45" width="15" height="10" fill="#0f172a" />
              <rect x="80" y="65" width="10" height="15" fill="#0f172a" />
              <rect x="45" y="75" width="10" height="15" fill="#0f172a" />
              <rect x="55" y="80" width="15" height="10" fill="#0f172a" />
              
              <!-- Small Center WhatsApp Icon -->
              <circle cx="50" cy="50" r="11" fill="#128c7e" />
              <circle cx="50" cy="50" r="9" fill="white" />
              <path d="M46 45 C46 45, 48 44, 49 45 C50 46, 49 48, 51 49 C53 50, 55 49, 55 51 C54 52, 53 54, 51 54 C48 53, 46 49, 46 45" fill="#128c7e" />
            </svg>
          </div>
          <span class="channel-action">Scan to Chat with Team</span>
        </div>
      </div>

      <div class="office-block">
        <p class="office-address">
          <strong>Amar Fibre Glass Co.</strong><br />
          Naryan Complex, Plot No. 3A, Leather Complex Road,<br />
          Jalandhar - 144021, Punjab, India.
        </p>
        <p class="office-contact">
          <span><strong>Mob:</strong> +91 98141 39979</span>
          <span><strong>Email:</strong> amar.fibre74@gmail.com</span>
        </p>
        <p class="office-gst">GSTIN: 03BAUPS5304N1Z6</p>
      </div>
    </div>

    <div class="page-footer" style="border-top-color: rgba(255,255,255,0.1); color: #64748b">
      <span>Amar Fibre Glass Co. &bull; Secure Technical Resources</span>
      <span>&copy; 2026 AFG. All rights reserved.</span>
    </div>
  </div>

</body>
</html>`;

    const blob = new Blob([catalogContent], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'Amar_Fibre_Glass_Technical_Catalog.html';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    setTimeout(() => {
      setDownloading(false);
    }, 1000);
  };

  const handlePrintBrochure = () => {
    window.print();
  };

  return (
    <section id="brochure" className="py-24 bg-white border-t border-slate-200 relative">
      <div className="absolute top-1/3 right-10 w-80 h-80 bg-blue-500/5 rounded-full blur-[100px] pointer-events-none" />

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 relative z-10">
        
        {/* Section Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-16">
          <div className="lg:col-span-7">
            <span className="text-blue-600 bg-blue-50 border border-blue-200 font-mono text-xs uppercase tracking-widest font-semibold px-2.5 py-1 rounded">
              Technical Resources
            </span>
            <h2 className="font-display font-black text-3xl sm:text-4xl text-slate-900 tracking-tight mt-4 mb-5">
              Client Engineering Center
            </h2>
            <p className="text-slate-600 font-sans text-sm sm:text-base leading-relaxed">
              We provide comprehensive engineering resources to help project managers and procurement officers make informed decisions regarding material selection, chemical resistance compliance, and cost-benefit analysis.
            </p>
          </div>

          <div className="lg:col-span-5 flex flex-wrap gap-4 lg:justify-end">
            <button
              onClick={handleDownloadBrochure}
              className="bg-blue-600 hover:bg-blue-500 text-white font-bold px-6 py-3.5 rounded-sm text-xs sm:text-sm tracking-widest uppercase transition-all duration-300 shadow-lg shadow-blue-500/10 flex items-center gap-2.5 cursor-pointer"
            >
              <Download className="w-4 h-4" />
              {downloading ? 'Downloading Catalog...' : 'Download Technical Brochure'}
            </button>
            <button
              onClick={handlePrintBrochure}
              className="bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 font-semibold px-6 py-3.5 rounded-sm text-xs sm:text-sm tracking-wide transition-all duration-300 flex items-center gap-2.5 cursor-pointer uppercase"
            >
              <Printer className="w-4 h-4" />
              Print Specs Sheet
            </button>
          </div>
        </div>

        {/* Brochure Core: Printable and Readable Content Block */}
        <div id="brochure-print-section" className="bg-white p-6 md:p-10 rounded border border-slate-200 shadow-sm space-y-12">
          {/* Top Brand Header (Print Visible) */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-8 border-b border-slate-200">
            <div>
              <span className="font-display font-bold text-xl text-slate-900 tracking-tight leading-none block">
                AMAR FIBRE GLASS
              </span>
              <span className="text-xs text-blue-600 font-mono tracking-widest uppercase mt-1 block">
                FRP Composite Solutions &bull; Spec Sheet v4.2
              </span>
            </div>
            <div className="text-left sm:text-right font-mono text-xs text-slate-400">
              <span className="block">Design Standard: ASME RTP-1 / BS 4994</span>
              <span className="block mt-0.5">ISO 9001:2015 Quality Assured</span>
            </div>
          </div>

          {/* Grid Layout: Comparison + Resins */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Left Column: Properties comparison table */}
            <div className="lg:col-span-7 space-y-6">
              <h3 className="font-display font-bold text-base text-slate-900 uppercase tracking-wider flex items-center gap-2">
                <FileSpreadsheet className="w-4 h-4 text-blue-500" /> Material Performance Matrix
              </h3>
              
              <div className="border border-slate-200 rounded overflow-hidden">
                <table className="w-full text-left text-xs sm:text-sm">
                  <thead>
                    <tr className="bg-slate-100 border-b border-slate-200 text-slate-700">
                      <th className="px-4 py-3.5 font-semibold uppercase tracking-wider font-mono">Metric</th>
                      <th className="px-4 py-3.5 font-semibold uppercase tracking-wider font-mono text-blue-600">Amar FRP</th>
                      <th className="px-4 py-3.5 font-semibold uppercase tracking-wider font-mono">Structural Steel</th>
                    </tr>
                  </thead>
                  <tbody className="text-slate-700 divide-y divide-slate-100">
                    {comparisons.map((item, idx) => (
                      <tr key={idx} className="hover:bg-slate-50 transition-colors">
                        <td className="px-4 py-3 font-semibold text-slate-500">{item.metric}</td>
                        <td className="px-4 py-3 text-blue-600 font-medium bg-blue-50/50">{item.frp}</td>
                        <td className="px-4 py-3 text-slate-500">{item.steel}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Right Column: Resin Chemical Selection */}
            <div className="lg:col-span-5 space-y-6">
              <h3 className="font-display font-bold text-base text-slate-900 uppercase tracking-wider flex items-center gap-2">
                <Award className="w-4 h-4 text-blue-500" /> Resin Engineering Selection
              </h3>

              <div className="space-y-4">
                {resins.map((resin, idx) => (
                  <div key={idx} className="p-4 rounded bg-slate-50 border border-slate-200 flex items-start gap-3 text-slate-700">
                    <div className="w-6 h-6 rounded bg-blue-50 border border-blue-200 text-blue-600 font-mono text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                      0{idx + 1}
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-center gap-2">
                        <h4 className="font-display font-bold text-sm text-slate-800">
                          {resin.type}
                        </h4>
                        <span className="text-[10px] font-mono bg-slate-200 px-2 py-0.5 rounded text-slate-600">
                          {resin.temp}
                        </span>
                      </div>
                      <p className="text-slate-500 text-xs mt-1.5 leading-relaxed font-sans">
                        {resin.application}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Chemical resistance warning tag */}
          <div className="flex flex-col sm:flex-row items-center gap-4 bg-blue-50 border border-blue-100 p-5 rounded">
            <div className="w-10 h-10 rounded bg-blue-100 border border-blue-200 text-blue-600 flex items-center justify-center shrink-0">
              <ShieldAlert className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-display font-bold text-slate-900 uppercase tracking-wider">
                Full Chemical Resistance Database Available
              </h4>
              <p className="text-slate-600 text-xs sm:text-sm mt-0.5 font-sans leading-normal">
                Amar FRP products are resistant to over 350 chemical compounds including hydrochloric acid, chlorine gas, sodium hypochlorite, and hydrofluoric acid. Contact our chemical engineering wing for a full compatibility chart.
              </p>
            </div>
          </div>

          {/* Brochure Footer */}
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-6 border-t border-slate-100 text-slate-400 text-[10px] uppercase font-mono tracking-widest text-center sm:text-left">
            <span>&copy; 2026 AMAR FIBRE GLASS. ALL RIGHTS RESERVED.</span>
            <span>SPECIFICATION CODE: AFG-COM-2026-v4</span>
          </div>
        </div>
      </div>
    </section>
  );
}