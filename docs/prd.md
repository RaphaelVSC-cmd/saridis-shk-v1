# Product Requirements Document (PRD) - Saridis SHK v1
*Tier 1 (Gold) | v8.0 Bespoke Unikat-Engine | Projekt: `saridis-shk-v1`*

---

## 1. Strategie, Grammatik & Positionierung
- **Unternehmen:** Saridis SHK (Sanitärtechnik & Heizungsbau)
- **Standort:** Geibelstraße 22, 85055 Ingolstadt
- **Kontakt:** Telefon & WhatsApp: +49 1523 7384702
- **Google Maps Rating:** 5,0 ⭐ (12 Bewertungen, 100% Top-Zufriedenheit)
- **Gewählte Seiten-Grammatik:** **Grammatik 4: The Interactive Configurator** (Planung, Fördersimulation & Preiskorridor) mit Elementen aus Grammatik 2 (Master Showcase Vorwand-Reveal).
- **Zielgruppe:** Anspruchsvolle private Haus- und Wohnungseigentümer in Ingolstadt und der Region, die Wert auf termintreue Badsanierung ohne Schmutzbelastung und energetisch optimierte Heizungsumrüstung (Wärmepumpe, KfW-Förderung) legen.
- **Recruiting-Fokus:** Ausgewiesene Gesellen und Azubis für Anlagenmechanik SHK (Integrierte Karriere-Stage `team.html`).

---

## 2. Generatives Farb- & Typografie-System (HSL & WCAG AA)
- **DNA-Quelle:** Geschmiedetes Kupfer (Heizungsrohre/Thermik), Edelstahl-Fittings, mineralischer fugenloser Mikrozement & Ingolstädter Donauklima.
- **CSS-Tokens:**
  - `--sc-canvas`: `#0A0E13` (Deep Hydro-Carbon mit 3% Blauanteil für Ruhe & Tiefe)
  - `--sc-surface`: `#121820` (Mineralische Kartenebene)
  - `--sc-surface-raised`: `#19222D` (Erhabene Interaktions-Cards)
  - `--sc-ink`: `#F8FAFC` (Kristallines Quell-Off-White, Kontrast 17.2:1 auf Canvas)
  - `--sc-ink-muted`: `#94A3B8` (Titan-Silber getönt, Kontrast 7.6:1)
  - `--sc-accent`: `#E26D35` (Geschmiedetes Industrie-Kupfer, HSL 20, 76%, 55%, Kontrast 6.3:1)
  - `--sc-accent-subtle`: `#38BDF8` (Gletscher-Cyan, HSL 199, 95%, 60%, Kontrast 9.1:1)
  - `--sc-border`: `rgba(255, 255, 255, 0.08)`
- **Typografie-Pairing:**
  - *Headlines & Statustexte:* `Space Grotesk` (Google Font, 600/700) – technisch, geometrisch, architektonische Präzision.
  - *Fließtext & UI:* `Plus Jakarta Sans` (Google Font, 400/500) – moderne Ergonomie, weite Punzen, ermüdungsfrei.
  - *Technische Attribute & Maßeinheiten:* `JetBrains Mono` (Google Font, 500) – messbare Meisterdaten (`DN 20`, `5.0 STERNE`, `INGOLSTADT`).
- **Fluid Type Scale:**
  - Hero H1: `clamp(2.35rem, 1.4rem + 4.2vw, 5.8rem)`
  - Sektionen H2: `clamp(1.85rem, 1.2rem + 2.6vw, 3.4rem)`
  - Body: `clamp(0.95rem, 0.9rem + 0.25vw, 1.125rem)`

---

## 3. Motion- & Interaktions-System (Kowalski Craft & 7 Primitiven)
- **Unternehmens-Metapher:** *Fluidic Pipeline Flow & Clean Architectural Reveal* (Von der rohen Installation mit Kupferleitungen zum staubfrei vollendeten Masterbad).
- **Aktive Primitiven (7 von 16 aktiv):**
  1. *Primitiv 1: Hero Kinetic Typography:* 3D-Split-Reveal auf H1 (`rotateX: -25deg`, Stagger 0.02s).
  2. *Primitiv 2: Scroll Reveal Fade-Up:* Weiche Aufblendung (`y: 40, opacity: 0 -> 1`, 600ms, `--ease-out-expo`).
  3. *Primitiv 4: Dynamic Counters:* Butterweiches Hochzählen von 0 auf 5.0 Sterne, 12 Kunden, 100% Staubschutz, bis 70% Förderung.
  4. *Primitiv 6: Native CSS-3D Perspective Tilt:* Haptischer Kartenneigungseffekt bei Mausbewegung auf Desktop (`translateZ(30px)` für Siegel/Badges); mobiler sanfter Scroll-Tilt.
  5. *Primitiv 9: Vorwand-Schnittstellen-Slider:* Interaktiver Schieberegler zwischen Vorwand-Rohbau und fugenlosem Designer-Bad.
  6. *Primitiv 10: Dynamic SVG Path Drawing:* Haardünne Kupfer- und Cyan-Leitungspfade zeichnen sich bei Scroll-Eintritt entlang der Bento-Raster ab.
  7. *Primitiv 12: Continuous Rotating Stamp:* Rotierendes 5,0-Meister-Siegel im Hero ("MEISTERBETRIEB INGOLSTADT • 5.0 STERNE • GEIBELSTRASSE 22 •").

---

## 4. Signature Feature
- **Name:** *Saridis Ingolstadt Bad- & Heizungs-Simulator (Scope-, Förder- & Termin-Rechner)*
- **Funktionen:**
  - Gewerke-Auswahl: Komplettbadsanierung, Heizungsmodernisierung/Wärmepumpe, Kombi-Sanierung.
  - Interaktive Schieberegler für Raumgröße, Baujahr, Sanierungstiefe und Barrierefreiheit.
  - Live-Kalkulation der Bauzeit (z. B. "12–15 Werktage bei 100% Staubschutz-Garantie") und KfW-Zuschuss (bis zu 70%).
  - 1-Klick-Briefing an Meister Saridis via WhatsApp mit vorformatiertem Text.

---

## 5. Tageszeit-Personalisierung
- 06:00 – 12:00: „Guten Morgen in Ingolstadt — Bereit für die moderne Bad- & Heizungswelt?“
- 12:00 – 19:00: „Guten Tag in Ingolstadt — Meisterhafte Badsanierung & energieeffiziente Heiztechnik.“
- 19:00 – 06:00: „Guten Abend — Dringende Störung oder Heizungsausfall? Wir sind erreichbar.“

---

## 6. Full-Canvas Raumnutzung (Anti-Insel)
- Container: `max-width: 1440px` (bzw. `min(94vw, 1440px)`).
- Hero-Split: 55% Text/CTA-Spalte, 45% interaktive Visual-Stage.
- Leistungen & Prüfstandards: Breites 4-Spalten-Grid auf Widescreen (`repeat(4, 1fr)`).
