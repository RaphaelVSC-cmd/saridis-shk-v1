# Kunden-Anleitung - Saridis SHK Website
**Betrieb:** Saridis SHK | **Standort:** Geibelstraße 22, 85055 Ingolstadt

---

## 1. Was wurde für Sie gebaut?
Für Ihren Meisterbetrieb wurde eine maßgeschneiderte, hochmoderne Web-Präsenz auf Agenturniveau entwickelt. 
Herzstück ist der **Saridis Bad- & Heizungs-Simulator**: Kunden können damit direkt online ihr geplantes Bad oder ihren Heizungstausch durchkalkulieren, sehen sofort eine realistische Bauzeit-Prognose (12–15 Werktage bei 100% Staubschutz) sowie KfW-Förderpotenziale und senden Ihnen das fertige Briefing mit einem Klick per WhatsApp. 
Ergänzt wird die Seite durch einen **intelligenten Chat-Assistenten**, ein internes **Bewertungs-Tool** (`/bewertung.html`) für mehr 5-Sterne-Google-Rezensionen und eine **Karriere-Seite** (`/team.html`) zur Gewinnung von Azubis und Gesellen.

---

## 2. Formular-Aktivierung (Formspree in 4 Schritten)
Das Kontaktformular und das Bewerbungsformular sind vorbereitet. Um Anfragen direkt auf Ihre E-Mail-Adresse zu erhalten:
1. Kostenlosen Account auf [formspree.io](https://formspree.io) anlegen.
2. Ein neues Formular erstellen (z.B. „Saridis Website Anfragen“) und Ihre Ziel-E-Mail angeben.
3. Die erhaltene Formular-ID (z.B. `xbjnqkyv`) kopieren.
4. In `index.html` und `team.html` beim `<form action="https://formspree.io/f/...">` die ID austauschen. Fertig!

---

## 3. Analytics aktivieren (Plausible.io)
Für DSGVO-konforme Besucherstatistiken ohne nerviges Cookie-Banner:
1. Account auf [plausible.io](https://plausible.io) erstellen.
2. Ihre Domain (z.B. `saridis-shk.de`) hinzufügen.
3. Den vorbereiteten Skript-Code im `<head>` von `index.html` einkommentieren.

---

## 4. Eigene Domain aufschalten (z.B. www.saridis-shk.de)
Um die Website unter Ihrer offiziellen Wunschdomain zu veröffentlichen:
1. Loggen Sie sich bei Ihrem Domain-Provider (z.B. Strato, IONOS, All-Inkl) ein.
2. Öffnen Sie die DNS-Einstellungen Ihrer Domain.
3. Fügen Sie für `www` einen **CNAME-Eintrag** hinzu, der auf `cname.vercel-dns.com` verweist.
4. Für die Hauptdomain ohne www erstellen Sie einen **A-Record** auf `76.76.21.21`.
5. Innerhalb weniger Minuten ist Ihre Website weltweit sicher per SSL (https) erreichbar.

---

## 5. Was Sie selbst anpassen können
Sie können Texte, Telefonnummern und Öffnungszeiten direkt in `index.html` mit jedem Text-Editor anpassen:
- **Telefonnummer:** Suchen Sie nach `+49 1523 7384702` und ersetzen Sie diese bei Bedarf.
- **Öffnungszeiten:** Suchen Sie nach `07:30 bis 17:00 Uhr`.
- **Preise / Richtwerte:** In `assets/js/chat-widget.js` unter `CHAT_KB`.

---

## 6. Ihr Ansprechpartner & Support
Haben Sie Fragen, wünschen Sie Änderungen oder möchten Sie neue Baustellen-Fotos einpflegen lassen?
- **Webmaster & Betreuung:** Raphael Neumeier
- **WhatsApp / Telefon:** +49 170 1234567 [oder Raphaels Direktkontakt]
- **SLA-Garantie:** Änderungswünsche werden innerhalb von 24 Stunden zuverlässig umgesetzt.
