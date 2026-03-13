// ── Standalone Modal Engine ──────────────────────────────────────────────────
// Completely independent of main script. Loaded last → overrides everything.
// Defines window.showModal, window.closeModal, window.openInfoModal

(function () {
  'use strict';

  var MAPS_URL = 'https://www.google.com/maps/dir/?api=1&destination=Kemp+u+Ro%C5%A1t%C4%9Bnky%2C+Tel%C4%8D&travelmode=driving';

  // ── Ensure overlay exists in DOM ──────────────────────────────────────────
  function _overlay() {
    var ov = document.getElementById('modal-overlay');
    if (ov) return ov;
    ov = document.createElement('div');
    ov.id = 'modal-overlay';
    ov.style.cssText = [
      'position:fixed', 'inset:0', 'background:rgba(0,0,0,.85)',
      'backdrop-filter:blur(12px)', 'z-index:9999', 'display:none',
      'align-items:center', 'justify-content:center',
      'padding:16px', 'box-sizing:border-box'
    ].join(';');
    ov.innerHTML =
      '<div id="_mbox" style="background:#1a0025;border:1px solid rgba(255,140,26,.25);' +
      'border-radius:24px;max-width:580px;width:100%;max-height:88vh;overflow-y:auto;' +
      'position:relative;scrollbar-width:thin">' +
      '<button onclick="window.closeModal()" style="position:absolute;top:14px;right:14px;' +
      'width:32px;height:32px;background:rgba(255,255,255,.1);border-radius:50%;' +
      'border:none;color:white;font-size:16px;cursor:pointer;z-index:2;' +
      'display:flex;align-items:center;justify-content:center">&#x2715;</button>' +
      '<div id="modal-content"></div></div>';
    document.body.appendChild(ov);
    ov.addEventListener('click', function (e) { if (e.target === ov) window.closeModal(); });
    return ov;
  }

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') window.closeModal();
  });

  // ── Public API ────────────────────────────────────────────────────────────
  window.closeModal = function () {
    var ov = document.getElementById('modal-overlay');
    if (ov) { ov.style.display = 'none'; document.body.style.overflow = ''; }
  };

  window.showModal = function (html) {
    var ov = _overlay();
    var mc = document.getElementById('modal-content');
    if (mc) mc.innerHTML = html;
    ov.style.display = 'flex';
    document.body.style.overflow = 'hidden';
  };

  // ── Content helpers ───────────────────────────────────────────────────────
  function R(label, val) {
    return '<div style="display:flex;justify-content:space-between;align-items:center;' +
      'background:rgba(255,255,255,.05);border-radius:10px;padding:10px 14px;margin-bottom:8px">' +
      '<span style="color:rgba(255,255,255,.8);font-size:13px">' + label + '</span>' +
      '<span style="color:#FF8C1A;font-weight:900;font-size:14px">' + val + '</span></div>';
  }

  function C(icon, title, sub) {
    return '<div style="background:rgba(255,255,255,.05);border-radius:10px;padding:12px">' +
      '<div style="font-size:22px;margin-bottom:6px">' + icon + '</div>' +
      '<p style="color:white;font-size:12px;font-weight:700;margin-bottom:2px">' + title + '</p>' +
      '<p style="color:rgba(255,255,255,.45);font-size:11px;line-height:1.4">' + sub + '</p></div>';
  }

  function B(href, label, primary) {
    var s = primary
      ? 'background:linear-gradient(to right,#FF9933,#FF6600);color:white;font-weight:900;' +
        'font-size:11px;text-transform:uppercase;letter-spacing:.1em;padding:11px 20px;' +
        'border-radius:8px;text-decoration:none;display:inline-block'
      : 'border:2px solid rgba(255,255,255,.2);color:rgba(255,255,255,.7);font-weight:700;' +
        'font-size:11px;text-transform:uppercase;letter-spacing:.1em;padding:10px 20px;' +
        'border-radius:8px;text-decoration:none;display:inline-block';
    return '<a href="' + href + '" target="_blank" style="' + s + '">' + label + '</a>';
  }

  // ── openInfoModal ─────────────────────────────────────────────────────────
  window.openInfoModal = function (type) {
    var body = '';

    if (type === 'misto') {
      body =
        '<h2 style="color:white;font-size:22px;font-weight:900;margin-bottom:4px">Kemp U Ro\u0161t\u011bnky</h2>' +
        '<p style="color:#FF8C1A;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:.1em;margin-bottom:16px">Tel\u010d, kraj Vyso\u010dina</p>' +
        '<div style="background:rgba(255,255,255,.05);border-radius:12px;padding:14px;margin-bottom:12px">' +
        '<p style="color:rgba(255,255,255,.8);font-size:13px;line-height:1.9">' +
        '<b style="color:white">Adresa:</b> St\u011bpni\u010dka 315, 588 56 Tel\u010d<br>' +
        '<b style="color:white">GPS:</b> 49.1818N, 15.4547E<br>' +
        '<b style="color:white">Web:</b> <a href="https://www.festivalvtelci.cz" target="_blank" style="color:#FF8C1A">festivalvtelci.cz</a>' +
        '</p></div>' +
        '<div style="background:rgba(255,255,255,.05);border-radius:12px;padding:14px;margin-bottom:16px">' +
        '<p style="color:#FF8C1A;font-size:11px;font-weight:900;text-transform:uppercase;letter-spacing:.1em;margin-bottom:10px">Jak se dostat</p>' +
        '<p style="color:rgba(255,255,255,.75);font-size:13px;line-height:2">' +
        'Autem: z Jihlavy E59 Tel\u010d (35 km)<br>' +
        'Autobusem: Brno, Jihlava, T\u0159eb\xed\u010d<br>' +
        'Vlak + bus: n\xe1stup Kostelec u Jihlavy<br>' +
        'Kolo: cyklostezka z centra Tel\u010de (2 km)' +
        '</p></div>' +
        '<div style="display:flex;gap:10px;flex-wrap:wrap">' +
        B(MAPS_URL, 'Navigovat na m\xedsto', true) +
        B('https://www.festivalvtelci.cz/jak-se-dostat/', 'Jak se dostat', false) +
        '</div>';

    } else if (type === 'datum') {
      body =
        '<h2 style="color:white;font-size:22px;font-weight:900;margin-bottom:16px">19. \u2013 20. 6. 2026</h2>' +
        '<div style="background:rgba(255,100,0,.1);border-left:4px solid #FF6600;border-radius:0 12px 12px 0;padding:14px;margin-bottom:10px">' +
        '<p style="color:#FF8C1A;font-weight:900;font-size:11px;text-transform:uppercase;letter-spacing:.1em;margin-bottom:6px">P\xc1TEK 19. 6.</p>' +
        '<p style="color:rgba(255,255,255,.85);font-size:13px;line-height:1.9">' +
        'Br\xe1ny otev\xedr\xe1 v 14:00<br>Program od 17:00<br>Kemp p\u0159ij\xedm\xe1 od 12:00 hod.' +
        '</p></div>' +
        '<div style="background:rgba(155,89,182,.1);border-left:4px solid #9B59B6;border-radius:0 12px 12px 0;padding:14px;margin-bottom:10px">' +
        '<p style="color:#9B59B6;font-weight:900;font-size:11px;text-transform:uppercase;letter-spacing:.1em;margin-bottom:6px">SOBOTA 20. 6.</p>' +
        '<p style="color:rgba(255,255,255,.85);font-size:13px;line-height:1.9">' +
        'Br\xe1ny otev\xedr\xe1 v 12:00<br>Program od 14:00<br>Hlavn\xed headliner od 22:00' +
        '</p></div>' +
        '<div style="background:rgba(255,255,255,.05);border-radius:12px;padding:12px;margin-bottom:16px">' +
        '<p style="color:rgba(255,255,255,.6);font-size:12px;line-height:1.7">' +
        'Kemp otev\xedr\xe1me ji\u017e ve \u010dtvrtek 18. 6. od 12:00. Odjezd nejpozd\u011bji v ned\u011bli 21. 6. do 12:00.' +
        '</p></div>' +
        '<a href="#calendar" onclick="window.closeModal()" style="background:linear-gradient(to right,#FF9933,#FF6600);color:white;font-weight:900;font-size:12px;text-transform:uppercase;letter-spacing:.1em;padding:11px 20px;border-radius:8px;text-decoration:none;display:inline-block">Zobrazit program</a>';

    } else if (type === 'kemping') {
      body =
        '<h2 style="color:white;font-size:22px;font-weight:900;margin-bottom:16px">Kemping</h2>' +
        R('Stan \u2013 1 noc (p\xe1 nebo so)', '200 K\u010d') +
        R('Stan \u2013 2 noci (p\xe1 + so)', '350 K\u010d') +
        R('Karavan\xa0/ obytn\xfd v\u016fz \u2013 1 noc', '800 K\u010d') +
        R('Karavan\xa0/ obytn\xfd v\u016fz \u2013 2 noci', '1\xa0400 K\u010d') +
        R('Motokaravan\xa0/ autobus', 'dohodou') +
        '<div style="background:rgba(255,255,255,.05);border-radius:12px;padding:14px;margin-bottom:16px">' +
        '<p style="color:#FF8C1A;font-size:11px;font-weight:900;text-transform:uppercase;letter-spacing:.1em;margin-bottom:8px">Informace k t\xe1boru</p>' +
        '<p style="color:rgba(255,255,255,.7);font-size:13px;line-height:1.9">' +
        'Soci\xe1ln\xed za\u0159\xedzen\xed (z\xe1chody\xa0+ sprchy) v are\xe1lu.<br>' +
        'Elektrina na karavanov\xfdch m\xedstech za p\u0159\xedplatek.<br>' +
        'Zv\xed\u0159ata nejsou povolena.<br>' +
        'Grilov\xe1n\xed pouze na vyhrazen\xfdch m\xedstech.<br>' +
        'No\u010dn\xed klid od\xa003:00 hod.' +
        '</p></div>' +
        '<div style="display:flex;gap:10px;flex-wrap:wrap">' +
        B('https://www.festivalvtelci.cz/kemping/', 'V\xedce info o kempov\xe1n\xed', true) +
        B('https://www.festivalvtelci.cz', 'Web festivalu', false) +
        '</div>';

    } else if (type === 'parkovani') {
      body =
        '<h2 style="color:white;font-size:22px;font-weight:900;margin-bottom:16px">Parkov\xe1n\xed</h2>' +
        R('Osobn\xed auto', '200 K\u010d\xa0/ den') +
        R('Motorka', '100 K\u010d\xa0/ den') +
        R('Autobus\xa0/ minibus', '600 K\u010d\xa0/ den') +
        R('Imobiln\xed \u2013 ZTP', 'zdarma') +
        '<div style="background:rgba(255,255,255,.05);border-radius:12px;padding:14px;margin-bottom:16px">' +
        '<p style="color:#FF8C1A;font-size:11px;font-weight:900;text-transform:uppercase;letter-spacing:.1em;margin-bottom:8px">D\u016fle\u017eit\xe9 informace</p>' +
        '<p style="color:rgba(255,255,255,.7);font-size:13px;line-height:1.9">' +
        'Parkovit\u011b se nach\xe1z\xed cca 200\xa0m od vstupu do are\xe1lu.<br>' +
        'Parkovit\u011b je hl\xedd\xe1n\xe9 24 hodin denn\u011b.<br>' +
        'Kyvadlov\xfd bus z centra Tel\u010de \u2013 ZDARMA.<br>' +
        'Doporu\u010dujeme vyu\u017e\xedt hromadnou dopravu.' +
        '</p></div>' +
        '<div style="display:flex;gap:10px;flex-wrap:wrap">' +
        B('https://www.festivalvtelci.cz/doprava-a-parkovani/', 'V\xedce info o doprav\u011b', true) +
        B(MAPS_URL, 'Navigovat', false) +
        '</div>';

    } else if (type === 'jidlo') {
      body =
        '<h2 style="color:white;font-size:22px;font-weight:900;margin-bottom:16px">J\xeddlo a pit\xed</h2>' +
        '<div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-bottom:16px">' +
        C('🍔', 'Burgery &amp; Grill', 'Dom\xe1c\xed hovez\xed burgery') +
        C('🌮', 'Street food', 'Tacos, wrapsy, kr\xeapy') +
        C('🍕', 'Italsk\xe1 kuchyn\u011b', 'Pizza, pasta, antipasti') +
        C('🥗', 'Vegetari\xe1nsk\xe9', 'Zdrav\xe9 a lehk\xe9 volby') +
        C('🍺', '\u010cepovan\xe9 pivo', '\u010cesk\xe1 zna\u010dka, \u010derstv\xe9') +
        C('🍷', 'V\xedno &amp; Koktejly', 'Moravsk\xe9 v\xedno, mojito') +
        C('☕', 'K\xe1va &amp; Nealko', 'Espresso, fresh d\u017eusy') +
        C('🍰', 'Sladkosti', 'Pala\u010dinka, zmrzlina') +
        '</div>' +
        '<div style="background:rgba(255,140,26,.1);border:1px solid rgba(255,140,26,.3);border-radius:12px;padding:14px;margin-bottom:16px">' +
        '<p style="color:#FF8C1A;font-size:11px;font-weight:900;text-transform:uppercase;letter-spacing:.1em;margin-bottom:6px">NFCtron \u010dipov\xfd n\xe1ramek</p>' +
        '<p style="color:rgba(255,255,255,.75);font-size:13px;line-height:1.7">' +
        'V\u0161echny platby v are\xe1lu prob\xedh\xe1 p\u0159es NFCtron \u010dipov\xfd n\xe1ramek. ' +
        'Hotovost lze dob\xedjit u vstupu nebo na dobijec\xedch punt\xedch v are\xe1lu. Karty jsou tak\xe9 p\u0159ij\xedm\xe1ny.' +
        '</p></div>' +
        B('https://www.festivalvtelci.cz', 'Zp\u011bt na web festivalu', true);

    } else if (type === 'telc') {
      body =
        '<h2 style="color:white;font-size:22px;font-weight:900;margin-bottom:4px">M\u011bsto Tel\u010d</h2>' +
        '<p style="color:#FF8C1A;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:.1em;margin-bottom:14px">UNESCO od roku 1992</p>' +
        '<div style="background:rgba(255,255,255,.05);border-radius:12px;padding:14px;margin-bottom:12px">' +
        '<p style="color:rgba(255,255,255,.8);font-size:13px;line-height:1.8">' +
        'Tel\u010d je jedno z nejkr\xe1sn\u011bj\u0161\xedch historick\xfdch m\u011bst v \u010cesk\xe9 republice. ' +
        'Renesanc\xed n\xe1m\u011bst\xed Zach\xe1ri\xe1\u0161e z Hradce, z\xe1mek a rybn\xedky jsou od roku 1992 ' +
        'za\u0159azeny na seznam Sv\u011btov\xe9ho kulturn\xedho d\u011bdictv\xed UNESCO.' +
        '</p></div>' +
        '<div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-bottom:16px">' +
        C('🏰', 'Tel\u010dsk\xfd z\xe1mek', 'Renesanc\xed skvost, prohl\xeddky denn\u011b') +
        C('🏛', 'N\xe1m\u011bst\xed UNESCO', 'Gotick\xe9 ark\xe1dy, font\xe1na, historick\xe9 domy') +
        C('🏊', 'Rybn\xedky', 'Koup\xe1n\xed, proch\xe1zky, ryba\u0159en\xed') +
        C('🏰', 'Hrad Ro\u0161tejn', '5\xa0km od Tel\u010de, gotick\xe1 v\u011b\u017e') +
        '</div>' +
        '<div style="background:rgba(255,255,255,.05);border-radius:12px;padding:12px;margin-bottom:16px">' +
        '<p style="color:rgba(255,255,255,.6);font-size:12px;line-height:1.7">' +
        'Centrum Tel\u010de je vzd\xe1len\xe9 cca 2\xa0km od kempu. Doporu\u010dujeme n\xe1v\u0161t\u011bvu p\u0159ed nebo po festivalu.' +
        '</p></div>' +
        '<div style="display:flex;gap:10px;flex-wrap:wrap">' +
        B('https://www.telc.eu', 'Web m\u011bsta Tel\u010d', true) +
        B('https://www.hrad-rostejn.cz', 'Hrad Ro\u0161tejn', false) +
        '</div>';

    } else if (type === 'mapa') {
      body =
        '<h2 style="color:white;font-size:22px;font-weight:900;margin-bottom:4px">Mapa are\xe1lu</h2>' +
        '<p style="color:#FF8C1A;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:.1em;margin-bottom:16px">Kemp U Ro\u0161t\u011bnky \u2013 Festival v Tel\u010di 2026</p>' +
        '<div style="background:rgba(255,140,26,.04);border:2px dashed rgba(255,140,26,.35);border-radius:16px;padding:40px 24px;text-align:center;margin-bottom:16px">' +
        '<div style="font-size:64px;margin-bottom:12px">🗺️</div>' +
        '<p style="color:white;font-weight:900;font-size:18px;margin-bottom:8px">Mapu are\xe1lu pro v\xe1s p\u0159ipravujeme.</p>' +
        '<p style="color:rgba(255,255,255,.55);font-size:13px;line-height:1.7">' +
        'Detailn\xed sch\xe9ma are\xe1lu bude dostupn\xe9 brzy.<br>' +
        'Bude obsahovat v\u0161echny stage, kemp, parkovit\u011b, vstupy, food z\xf3nu, z\xe1zem\xed a prvn\xed pomoc.' +
        '</p></div>' +
        '<div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-bottom:16px">' +
        C('🎤', 'Mare\u010dek Industries Stage', 'Hlavn\xed stage \u2013 jih are\xe1lu') +
        C('🎵', 'NFCtron Stage', 'Rap stage \u2013 st\u0159ed are\xe1lu') +
        C('🎶', 'M\u011bsto Tel\u010d Stage', 'T\u0159et\xed stage \u2013 sever are\xe1lu') +
        C('⛺', 'Kempovac\xed z\xf3na', 'V\xfdchod are\xe1lu \u2013 stan, karavan') +
        C('🚗', 'Parkov\xe1n\xed', '200\xa0m od vstupu') +
        C('🏥', 'Zdravotn\xed slu\u017eba', 'First aid punt') +
        C('🍺', 'J\xeddlo a pit\xed', 'St\u0159ed are\xe1lu, bary') +
        C('🚿', 'WC a sprchy', 'Rozlo\u017een\xe9 po are\xe1lu') +
        '</div>' +
        '<div style="display:flex;gap:10px;flex-wrap:wrap">' +
        B(MAPS_URL, 'Navigovat na m\xedsto', true) +
        B('https://www.festivalvtelci.cz', 'Sleduj aktualizace', false) +
        '</div>';

    } else if (type === 'aktivity') {
      body =
        '<h2 style="color:white;font-size:22px;font-weight:900;margin-bottom:16px">Doprovod activity</h2>' +
        '<div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-bottom:16px">' +
        C('🎨', 'Tv\u016fr\u010d\xed workshopy', 'Malb\xed\u0159stv\xed, keramika, tisk') +
        C('🧘', 'J\xf3ga a meditace', 'Rann\xed session v kempu') +
        C('🛋', 'Chill-out z\xf3na', 'Lehatka, z\xe1zem\xed, relax') +
        C('🎮', 'Hern\xed z\xf3na', 'Stoln\xed hry, foosball, \u0161achy') +
        C('🏊', 'Koup\xe1n\xed v rybn\xedku', '200\xa0m od are\xe1lu') +
        C('📸', 'Photo spot FvT', 'Instagramov\xe9 m\xedsto 2026') +
        C('🌿', 'Proch\xe1zky p\u0159\xedrodou', 'Rybn\xedky a sady kolem Tel\u010de') +
        C('🎯', 'Z\xe1bavn\xe9 aktivity', 'Ter\u010dovnice, p\xe9tanque, slackline') +
        '</div>' +
        '<div style="background:rgba(255,140,26,.08);border:1px solid rgba(255,140,26,.25);border-radius:12px;padding:14px;margin-bottom:16px">' +
        '<p style="color:#FF8C1A;font-size:11px;font-weight:900;text-transform:uppercase;letter-spacing:.1em;margin-bottom:8px">Tel\u010d jako bonus</p>' +
        '<p style="color:rgba(255,255,255,.75);font-size:13px;line-height:1.8">' +
        'Vyu\u017eij \u010das p\u0159ed festivalem! Renesanc\xed n\xe1m\u011bst\xed UNESCO, Tel\u010dsk\xfd z\xe1mek, hrad Ro\u0161tejn (5 km od kempu) ' +
        'a koup\xe1n\xed v m\xedstn\xedch rybn\xedc\xedch \u2013 v\u0161e dostupn\xe9 p\u011b\u0161ky nebo na kole.' +
        '</p></div>' +
        '<div style="display:flex;gap:10px;flex-wrap:wrap">' +
        B('https://www.telc.eu', 'Turistick\xe9 tipy Tel\u010d', true) +
        B('https://www.festivalvtelci.cz', 'Web festivalu', false) +
        '</div>';
    }

    if (!body) return;
    window.showModal('<div style="padding:24px 24px 28px">' + body + '</div>');
  };

})();
