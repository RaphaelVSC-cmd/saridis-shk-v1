'use strict';

/**
 * === BAUSTEIN B: BEWERTUNGS-TOOL (v8.0) ===
 * Saridis SHK Ingolstadt
 * WhatsApp-Link-Generator für Bewertungsanfragen nach abgeschlossenen Aufträgen.
 * Rein clientseitig, ephemer – keine dauerhafte Speicherung von Kundendaten.
 */

const BEWERTUNG_CONFIG = {
  firma: 'Saridis SHK',
  googleLink: 'https://maps.google.com/?cid=ChIJ_QPzVZP_nkcRwn5cy5256ZE', // Direkter Maps-Link aus Lead-Daten
  nachrichtVorlage: (kundenname, firma, googleLink) =>
    `Hallo ${kundenname}, vielen Dank für das Vertrauen in unser Handwerk bei ${firma} in Ingolstadt!` +
    ' Wir würden uns sehr freuen, wenn Sie sich kurz 1–2 Minuten Zeit nehmen' +
    ' und uns eine kurze Google-Bewertung hinterlassen – das hilft unserem regionalen Meisterbetrieb enorm:' +
    ' ' + googleLink +
    ' Herzlichen Dank für die Zusammenarbeit und beste Grüße aus der Geibelstraße!'
};

// Robuste Telefonnummer-Normalisierung (deutsche Schreibweisen)
function normalizeTel(raw) {
  let t = raw.replace(/[\s\-\.]/g, ''); // Leerzeichen, Bindestriche, Punkte entfernen
  if (t.startsWith('00')) t = '+' + t.slice(2);
  if (t.startsWith('0'))  t = '+49' + t.slice(1);
  if (!t.startsWith('+')) t = '+49' + t;
  return t.replace(/[^0-9+]/g, ''); // Nur Ziffern und + behalten
}

function buildWaMessage(tel, name) {
  const normalized = normalizeTel(tel);
  const waNum = normalized.replace('+', '');
  const text = BEWERTUNG_CONFIG.nachrichtVorlage(name, BEWERTUNG_CONFIG.firma, BEWERTUNG_CONFIG.googleLink);
  return 'https://wa.me/' + waNum + '?text=' + encodeURIComponent(text);
}

document.addEventListener('DOMContentLoaded', () => {
  const form      = document.getElementById('bewertungForm');
  const result    = document.getElementById('bewertungResult');
  const waLinkEl  = document.getElementById('bewertungWaLink');
  const copyBtn   = document.getElementById('bewertungCopyBtn');

  if (!form) return;

  form.addEventListener('submit', e => {
    e.preventDefault();
    const name = (document.getElementById('bKundenname')?.value || '').trim();
    const tel  = (document.getElementById('bTelefon')?.value || '').trim();
    if (!name || !tel) return;

    const waUrl = buildWaMessage(tel, name);
    if (waLinkEl) {
      waLinkEl.href = waUrl;
      waLinkEl.textContent = 'In WhatsApp öffnen';
    }
    if (result) result.classList.add('is-visible');
    result?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  });

  copyBtn && copyBtn.addEventListener('click', async () => {
    const link = waLinkEl?.href;
    if (!link) return;
    try {
      await navigator.clipboard.writeText(link);
      copyBtn.textContent = 'Link kopiert!';
      setTimeout(() => { copyBtn.textContent = 'Link kopieren'; }, 2000);
    } catch {
      copyBtn.textContent = 'Manuell kopieren';
    }
  });
});
