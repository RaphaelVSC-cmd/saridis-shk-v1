'use strict';

/**
 * === BAUSTEIN A: SMART CHAT-ASSISTENT (v8.0) ===
 * Saridis SHK - Ingolstadt
 * Vollständig lokal – kein externer API-Call zur Laufzeit.
 * CHAT_KB wird direkt aus der Website-DNA befüllt.
 */

const CHAT_KB = {
  firma: 'Saridis SHK',
  tel: '+49 1523 7384702',
  wa: '4915237384702',
  leistungen: [
    'Schlüsselfertige Badsanierung (100% staubfrei)',
    'Wärmepumpen & Heizungsmodernisierung',
    'Sanitärfeininstallation & Wartung'
  ],
  preisrahmen: 'Komplettbäder beginnen ab ca. 9.500 € bis 25.000 €+ je nach Raumgröße; Heizungsmodernisierungen ab 12.000 € (bis zu 70% KfW-Förderung möglich)',
  oeffnungszeiten: 'Montag bis Freitag von 07:30 bis 17:00 Uhr (Termine vor Ort nach Vereinbarung)',
  einsatzgebiet: 'Stadt Ingolstadt (Geibelstraße & alle Bezirke) sowie ca. 35 km Umkreis (Gaimersheim, Kösching, Manching, Pfaffenhofen)',
  spezialitaet: '100% staubfreie Badsanierung mit Unterdruck-Luftreinigung und GEG-konforme Wärmepumpen-Hydraulik nach Verfahren B',

  intents: [
    {
      keywords: ['preis', 'kosten', 'kostet', 'angebot', 'anfrage', 'offerte', 'teuer', 'budget'],
      antwort: 'Ein konkreter Preis hängt immer vom genauen Raumzuschnitt und der Haustechnik ab. Richtwert: Komplettbäder ab ca. 9.500 € bis 25.000 €+, Heizungsmodernisierungen ab ca. 12.000 € (bis zu 70% KfW-Förderung). Am einfachsten: Nutzen Sie unseren Bad- & Heizungs-Simulator auf dieser Seite oder senden Sie uns eine kurze WhatsApp mit 2–3 Fotos.',
      wa_text: 'Hallo Herr Saridis, ich interessiere mich für eine Preisanfrage bei Saridis SHK und hätte gerne ein Vorab-Angebot.',
      wa_label: 'Preisanfrage via WhatsApp'
    },
    {
      keywords: ['oeffnung', 'öffnung', 'erreichbar', 'wann', 'geschäftszeit', 'zeiten', 'uhr'],
      antwort: 'Sie erreichen Meister Saridis Montag bis Freitag von 07:30 bis 17:00 Uhr. Außerhalb der Geschäftszeiten oder bei laufender Montage vor Ort hinterlassen Sie uns einfach direkt eine kurze Nachricht per WhatsApp.',
      wa_text: null
    },
    {
      keywords: ['einsatzgebiet', 'gebiet', 'kommt ihr', 'fahrt ihr', 'region', 'umgebung', 'distanz', 'entfernung', 'ort', 'audi', 'kösching', 'gaimersheim'],
      antwort: 'Wir sind im gesamten Raum Ingolstadt (Hauptsitz Geibelstraße 22) sowie im Umkreis von ca. 35 km für Sie im Einsatz (u.a. Gaimersheim, Kösching, Manching, Großmehring, Pfaffenhofen). Nicht sicher, ob Ihr Objekt im Gebiet liegt? Fragen Sie uns kurz!',
      wa_text: 'Hallo Herr Saridis, ich möchte anfragen, ob Saridis SHK auch zu meinem Standort in der Region Ingolstadt kommt.',
      wa_label: 'Einsatzgebiet anfragen'
    },
    {
      keywords: ['rückruf', 'anrufen', 'rück', 'callback', 'telefonisch', 'termin', 'besichtigung', 'vor ort'],
      antwort: 'Gerne stimmen wir einen Vor-Ort-Besichtigungstermin in Ingolstadt mit Ihnen ab! Senden Sie uns einfach kurz Ihren Namen und die Wunschzeit per WhatsApp – wir melden uns schnellstmöglich.',
      wa_text: 'Hallo Herr Saridis, ich hätte gerne einen Rückruf von Saridis SHK zur Terminabstimmung. Meine Nummer: ',
      wa_label: 'Rückruf anfordern'
    },
    {
      keywords: ['leistung', 'anbietet', 'machen', 'services', 'was könnt', 'was macht', 'bad', 'heizung', 'wärmepumpe', 'sanitär'],
      antwort: 'Unser Schwerpunkt liegt auf: 1. Schlüsselfertige Badsanierung (fugenlose Walk-In-Bäder, barrierearm, staubfrei), 2. Wärmepumpen & Heizungstausch mit KfW-Förderabwicklung und 3. Sanitär-Feinmontage. Besonders geschätzt: Unsere 100% Staubschutz-Versiegelung während der gesamten Bauphase.',
      wa_text: null
    },
    {
      keywords: ['staub', 'dreck', 'schmutz', 'schmutzfrei', 'sauber', 'staubfrei'],
      antwort: 'Bei Saridis SHK gilt die 100% Staubschutz-Garantie: Vor Baubeginn richten wir Unterdruck-Luftreiniger, Staubschutzwände und Schmutzschleusen ein. Der Wohnbereich bleibt garantiert staubfrei.',
      wa_text: 'Hallo Herr Saridis, ich möchte mich über das staubfreie Badsanierungskonzept von Saridis SHK informieren.',
      wa_label: 'Staubschutz-Details per WhatsApp'
    }
  ]
};

function findIntent(input) {
  const text = input.toLowerCase().normalize('NFC');
  const normalized = text
    .replace(/ä/g, 'a').replace(/ö/g, 'o').replace(/ü/g, 'u')
    .replace(/ß/g, 'ss');

  for (const intent of CHAT_KB.intents) {
    for (const kw of intent.keywords) {
      const kwNorm = kw.replace(/ä/g,'a').replace(/ö/g,'o').replace(/ü/g,'u').replace(/ß/g,'ss');
      if (normalized.includes(kwNorm)) return intent;
    }
  }
  return null;
}

function buildWaUrl(waText) {
  const base = 'https://wa.me/' + CHAT_KB.wa + '?text=';
  return base + encodeURIComponent(waText);
}

function addBubble(container, text, sender, waBtn) {
  const div = document.createElement('div');
  div.className = 'chat-bubble ' + sender;
  div.textContent = text;
  if (waBtn) {
    const a = document.createElement('a');
    a.href = buildWaUrl(waBtn.text);
    a.target = '_blank';
    a.rel = 'noopener noreferrer';
    a.className = 'chat-wa-btn';
    a.setAttribute('aria-label', waBtn.label + ' via WhatsApp');
    a.textContent = '💬 ' + waBtn.label;
    div.appendChild(document.createElement('br'));
    div.appendChild(a);
  }
  container.appendChild(div);
  container.scrollTop = container.scrollHeight;
  return div;
}

function handleMessage(input, messagesEl) {
  const trimmed = input.trim();
  if (!trimmed) return;

  addBubble(messagesEl, trimmed, 'user');

  setTimeout(() => {
    const intent = findIntent(trimmed);
    if (intent) {
      const waBtn = intent.wa_text
        ? { text: intent.wa_text, label: intent.wa_label || 'Via WhatsApp senden' }
        : null;
      addBubble(messagesEl, intent.antwort, 'bot', waBtn);
    } else {
      addBubble(
        messagesEl,
        'Gute Frage! Bei Sanierungs- und Heizungsprojekten klären wir die technischen Details am besten direkt. Schreiben Sie uns kurz per WhatsApp oder rufen Sie uns an – Meister Saridis antwortet verlässlich.',
        'bot',
        { text: 'Hallo Saridis SHK, ich habe eine Frage zu meinem Vorhaben in Ingolstadt: ' + trimmed, label: 'Direkt via WhatsApp fragen' }
      );
    }
  }, 220);
}

function handleQuickAction(intentKey, messagesEl) {
  const mapping = {
    preis: 'preis',
    oeffnungszeiten: 'öffnung',
    einsatzgebiet: 'einsatzgebiet',
    kontakt: 'rückruf'
  };
  const kw = mapping[intentKey] || intentKey;
  const intent = CHAT_KB.intents.find(i => i.keywords.includes(kw));
  if (intent) {
    const waBtn = intent.wa_text
      ? { text: intent.wa_text, label: intent.wa_label || 'Via WhatsApp' }
      : null;
    addBubble(messagesEl, intent.antwort, 'bot', waBtn);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.getElementById('chatToggle');
  const closeBtn = document.getElementById('chatClose');
  const panel = document.getElementById('chatPanel');
  const messagesEl = document.getElementById('chatMessages');
  const form = document.getElementById('chatInputForm');
  const input = document.getElementById('chatInput');
  const quickBtns = document.querySelectorAll('.chat-quick-btn');

  if (!toggle || !panel || !messagesEl) return;

  setTimeout(() => {
    addBubble(messagesEl,
      'Grüß Gott! Ich bin der digitale Assistent von Saridis SHK Ingolstadt. Was darf ich für Ihr Bad- oder Heizungsprojekt klären?',
      'bot');
  }, 600);

  toggle.addEventListener('click', () => {
    const isOpen = !panel.hidden;
    panel.hidden = isOpen;
    toggle.setAttribute('aria-expanded', String(!isOpen));
    if (!isOpen) {
      setTimeout(() => input && input.focus(), 80);
    }
  });

  closeBtn && closeBtn.addEventListener('click', () => {
    panel.hidden = true;
    toggle.setAttribute('aria-expanded', 'false');
    toggle.focus();
  });

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && !panel.hidden) {
      panel.hidden = true;
      toggle.setAttribute('aria-expanded', 'false');
    }
  });

  form && form.addEventListener('submit', e => {
    e.preventDefault();
    if (!input) return;
    handleMessage(input.value, messagesEl);
    input.value = '';
  });

  quickBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const intent = btn.dataset.intent;
      handleQuickAction(intent, messagesEl);
    });
  });
});
