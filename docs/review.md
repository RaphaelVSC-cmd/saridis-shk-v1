# Selbst-Audit - Saridis SHK v1 | 18.09.2026
**Tier: 1 (Gold)** | Projektordner: `saridis-shk-v1`

---

## Punkt 1: Blueprint-Check
- **Frage:** Sieht das aus wie ein Standard-Template (Bento + Cyan-Glow + Emoji-Kacheln)?
- **Antwort:** Nein. Die Seite wurde über den Signature-DNA-Seed generiert. Farbklima aus geschmiedetem Kupfer (`#E26D35`), mineralischem Schiefer/Carbon (`#0A0E13`) und technischem Gletscher-Cyan (`#38BDF8`). Keine Emoji-Favicons, keine kitschigen Cliparts, sondern physische Vektorgrafiken und echte handwerkliche Vorwand-Architektur.
- **Versuche:** 1
- **Status:** PASS

---

## Punkt 2: Innovations-Check
- **Frage:** Einzigartiges Feature vorhanden, das der lokalen Konkurrenz fehlt?
- **Feature:** „Saridis Ingolstadt Bad- & Heizungs-Simulator“ mit modularer Gewerke-Auswahl, 100% Staubschutz-Versiegelungs-Zusage, live ermitteltem KfW-Förderindikator (bis 70%) und 1-Klick-Briefing-Export via WhatsApp an Meister Saridis. Zudem interaktiver Vorwand-Schnittstellen-Slider im Hero.
- **Versuche:** 1
- **Status:** PASS

---

## Punkt 3: Hartes Blocker-Gate — 5-Breiten Viewport-Check
- **Frage:** Besteht das Layout bei ALLEN 5 Pflicht-Breiten ohne horizontalen Scroll, Textabschnitt oder Kollisionen?
- **Test-Matrix:**
  - [x] **375px (iPhone SE):** 0px horizontaler Overflow (`scrollWidth <= clientWidth`), H1 skaliert via `clamp()` sauber, keine abgetrennten Wörter, alle Buttons umbrechen einspaltig, Touch-Targets $\ge 48\text{px}$, WhatsApp-Widget und Chat-Button sauber positioniert.
  - [x] **390px (iPhone 12/13/14/15):** Kein horizontaler Overflow, saubere einspaltige Bento- und Simulator-Darstellung, keine Textkollisionen.
  - [x] **414px (iPhone Plus/Max / Android):** Kein horizontaler Overflow, Inputs und Range-Slider passgenau im Screen.
  - [x] **768px (iPad Portrait / Tablet):** Asymmetrie-Fallback greift (Überlappungen zu gestapelten Blöcken ohne Negativ-Margins aufgelöst), Grid schaltet sauber 2-spaltig, Vorwand-Visualizer skaliert flüssig auf 380px Höhe.
  - [x] **1024px (iPad Landscape / Small Desktop):** Navbar staucht nicht (`site-header.offsetHeight <= 90px`). Bei Breiten $\le 1024\text{px}$ greift das zentrierte Hamburger-Menü. Ab 1024px schaltet das Hero-Grid in die 1.15fr / 0.85fr Split-Stage.
- **Kriterien erfüllt:**
  1. Kein horizontaler Scrollbalken bei allen 5 Breiten.
  2. Kein abgeschnittener Text (`overflow-wrap: break-word`, `hyphens: auto`).
  3. Keine überlappenden Elemente oder Z-Index-Konflikte.
  4. Lesbare Schriften auf allen Screen-Größen.
- **Versuche:** 1
- **Status:** PASS bei allen 5 Breiten: 375px, 390px, 414px, 768px, 1024px (BLOCKER-GATE BESTANDEN)

---

## Punkt 3B: Desktop-Navbar & Breakpoint-Safety (1024px & 1280px)
- **Frage:** Bricht die Navbar unschön um, kollidiert das Logo mit Links oder werden Menüpunkte gestaucht?
- **Test 1:** Header-Höhe bei 1024px und 1280px geprüft: `site-header.offsetHeight <= 90px`. (Kein unerwünschter 2-Zeiler).
- **Test 2:** `white-space: nowrap` auf allen Menüpunkten aktiv.
- **Regel:** Breakpoint ist auf `max-width: 1024px` gesetzt, damit das Hamburger-Menü bereits bei kleineren Tablets greift.
- **Versuche:** 1
- **Status:** PASS

---

## Punkt 3C: Full-Canvas Raumnutzung & Widescreen-Harmonie (1280px & 1440px)
- **Frage:** Nutzt die Seite die volle Breite harmonisch aus oder klebt der Inhalt mittig als schmale Insel?
- **Test 1:** Container auf `max-width: 1440px` dimensioniert.
- **Test 2:** Hero nutzt 55/45-Widescreen-Balance.
- **Test 3:** Bento- und Standard-Grids spannen sich souverän über die gesamte Breite auf.
- **Versuche:** 1
- **Status:** PASS

---

## Punkt 4: Motion- & Interaktions-System (Kowalski-Craft & 7 Animationen)
- **Frage:** Sind MINDESTENS 5 eigenständige Animationen aktiv und passend zur Handwerks-DNA choreographiert?
- **Aktive Primitiven (7 aktiv):**
  1. Kinetic Typography (SplitType auf H1)
  2. Scroll Reveal Fade-Up (`data-animate="fade-up"`)
  3. Dynamic Counters (5.0 Sterne, 12 Abnahmen, 100% Staubschutz, 70% KfW)
  4. Native CSS-3D Perspective Tilt auf Bento- und Benefit-Cards
  5. Interaktiver Vorwand-Schnittstellen-Slider
  6. Dynamic SVG Path Drawing auf technischen Linien
  7. Rotierendes 5,0-Meisterstempel-Siegel
- **Unternehmens-Metapher:** Fluidic Pipeline Flow & Clean Architectural Reveal.
- **Tests:** Microinteractions im 180ms-Fenster, `--ease-out-expo` aktiv, Reduced-Motion Guard am Ende der CSS und in JS aktiv.
- **Versuche:** 1
- **Status:** PASS

---

## Punkt 5: Daumen-Test & Funktional-Check 375px
- Navigation öffnet und schließt sauber: PASS
- Mobile-Anchor-Scroll-Test: Linkklick schließt Menü und scrollt zur Sektion: PASS
- Ghost-Overlay Check: CTAs und WhatsApp frei klickbar: PASS
- Scroll-Lock Deadlock Guard: Lenis stoppt bei offenem Modal/Menü und startet nach Schließen: PASS
- Touch-Safe Hover: Keine klebenden Hover-Effekte auf Touchscreens: PASS
- Simulator per Daumen bedienbar: PASS
- WhatsApp-Widget sichtbar und erreichbar: PASS
- Touch-Test bei Scroll-Effekten: Keine Scroll-Freezes: PASS

---

## Punkt 6: Legal & SEO (Zero-Hallucination-Check)
- `favicon.svg`: Physische Vektordatei im Root vorhanden: PASS
- Impressum § 5 DDG: Alle Pflichtfelder vorhanden, unbekannte Daten strikt als `[MANUELL PRUEFEN]`: PASS
- Datenschutz Art. 13/14: Vollständig inklusive Hosting (Vercel), jsDelivr, Formspree, Chat-Assistent und Bewerbungsformular: PASS
- Cookie-Banner: Gleichwertige Buttons („Alle akzeptieren“ / „Nur notwendige“): PASS
- Google Maps geblockt via `data-src`: PASS
- Schema.org JSON-LD: `Plumber` / `LocalBusiness` PLUS `FAQPage` validiert: PASS
- Title: 61 Zeichen mit Stadt und USP: PASS
- Meta Description: 145 Zeichen mit CTA: PASS
- Plausible/Clarity Platzhalter vorhanden: PASS
- `vercel.json` Security Headers vorhanden: PASS
- `manifest.webmanifest` vorhanden: PASS

---

## Punkt 7: Authentizität
- **Frage:** Frei von KI-Floskeln („wir sind stolz darauf“, „höchste Qualitätsstandards“)?
- **Ergebnis:** Kerniger, bayerisch-regionaler Handwerker-Duktus, konkrete Maßeinheiten (`DN 20`, `Verfahren B`, `100% Staubschutz`, `Geibelstraße 22`).
- **Status:** PASS

---

## Punkt 8: Vercel Web Interface Guidelines Audit
- Icon-Only Buttons besitzen `aria-label`: PASS
- Formular-Controls haben valide `autocomplete`- und semantische `inputmode`-Attribute: PASS
- Kein Paste-Blocking: PASS
- Keine `outline: none` ohne `:focus-visible`-Ersatz: PASS
- Keine unzulässigen `transition: all` in CSS: PASS
- Typografische Satzzeichen (`…`, `&rarr;`, `&nbsp;`): PASS
- CLS-Schutz durch native Attribute: PASS
- **Status:** PASS

---

## Punkt 9: Taste-Skill Anti-Slop Audit
- Schriften: `Space Grotesk` + `Plus Jakarta Sans` + `JetBrains Mono`
- Farbpalette: Deep Carbon (`#0A0E13`) statt reinem Schwarz `#000000`; getönte weiche Schatten.
- Layout: Asymmetrisches Bento statt 08/15-Karten.
- Taktiles `:active`-Feedback auf Buttons (`scale(0.98)`).
- **Status:** PASS

---

## Punkt 10: NEU v8.0 – Baustein A (Chat-Assistent QA)
- `assets/js/chat-widget.js` vorhanden und eingebunden: PASS
- `CHAT_KB` vollständig befüllt mit Saridis SHK Daten: PASS
- Quick-Actions (Preise, Öffnungszeiten, Einsatzgebiet, Rückruf) funktional: PASS
- WhatsApp-Vorlagen-Buttons generieren korrekte `wa.me`-Links: PASS
- Fallback liefert verlässliche Antwort: PASS
- Keine externen API-Calls zur Laufzeit: PASS
- DSGVO-Hinweis sichtbar: PASS
- **Status:** PASS

---

## Punkt 11: NEU v8.0 – Baustein B (Bewertungs-Tool QA)
- `bewertung.html` + `assets/js/bewertung.js` vorhanden: PASS
- Nicht in Hauptnavigation verlinkt: PASS
- Telefonnummer-Normalisierung (`0170...`, `+49...`, `0049...`): PASS
- DSGVO-Hinweis: Keine dauerhafte Speicherung von Kundendaten: PASS
- **Status:** PASS

---

## Punkt 12: NEU v8.0 – Baustein C (Recruiting-Seite QA)
- `docs/lead-data.md` Recruiting-Antwort: JA
- `team.html` vorhanden: PASS
- Schema.org `JobPosting` im Head validiert: PASS
- Bewerbungsformular (Vorname, Nachname, Wunschposition, Telefon) mit DSGVO-Checkbox (required): PASS
- WhatsApp-Kurzbewerbungs-Fallback vorhanden: PASS
- **Status:** PASS

---

## Gesamt-Befund
Alle Prüfungen und das 5-Breiten Blocker-Gate erfolgreich bestanden. Bereit für Phase 5.5 Audit-Report.
