// ─── DATA (let – patched by auto-sync) ─────────────────
let ARTISTS = [
  {id:1,  name:'Rybičky 48',          genre:'Rock',          stage:'main', img:'https://www.festivalvtelci.cz/wp-content/uploads/2025/12/Rybicky48-450x450.webp',         headliner:true},
  {id:2,  name:'DYMYTRY',             genre:'Metal / Rock',  stage:'main', img:'https://www.festivalvtelci.cz/wp-content/uploads/2025/12/Dymytry-lineup-450x450.webp',    headliner:true},
  {id:3,  name:'Olympic',             genre:'Rock / Pop',    stage:'main', img:'https://www.festivalvtelci.cz/wp-content/uploads/2025/10/Line-up-450x450.webp',           headliner:true},
  {id:4,  name:'Richard Müller',      genre:'Pop / Folk',    stage:'main', img:'https://www.festivalvtelci.cz/wp-content/uploads/2025/10/Line-up_-02-450x450.webp',      headliner:true},
  {id:5,  name:'Wohnout',             genre:'Rock / Reggae', stage:'main', img:'https://www.festivalvtelci.cz/wp-content/uploads/2025/11/Wohnout-11-1-450x450.png'},
  {id:6,  name:'Anna K.',             genre:'Pop / Rock',    stage:'main', img:'https://www.festivalvtelci.cz/wp-content/uploads/2025/11/AnnaK-450x450.webp'},
  {id:7,  name:'Walda Gang',          genre:'Folk / Punk',   stage:'main', img:'https://www.festivalvtelci.cz/wp-content/uploads/2025/11/Waldagang-330x330.webp'},
  {id:8,  name:'Vesna',               genre:'Folk / World',  stage:'main', img:'https://www.festivalvtelci.cz/wp-content/uploads/2025/10/Line-up_-07-330x330.webp'},
  {id:9,  name:'IMT Smile',           genre:'Pop / Rock',    stage:'main', img:'https://www.festivalvtelci.cz/wp-content/uploads/2025/11/IMT-330x330.webp'},
  {id:10, name:'Adam Ďurica',         genre:'Pop',           stage:'main', img:'https://www.festivalvtelci.cz/wp-content/uploads/2025/10/Line-up_-03-330x330.webp'},
  {id:11, name:'Petr Bende & Band',   genre:'Pop',           stage:'main', img:'https://www.festivalvtelci.cz/wp-content/uploads/2025/10/Line-up_-04-330x330.webp'},
  {id:12, name:'Kapela Pekař',        genre:'Pop / Indie',   stage:'main', img:'https://www.festivalvtelci.cz/wp-content/uploads/2025/10/Line-up_-01-330x330.webp'},
  {id:13, name:'Kateřina Marie Tichá',genre:'Pop / Soul',    stage:'main', img:'https://www.festivalvtelci.cz/wp-content/uploads/2025/10/Line-up_-05-330x330.webp'},
  {id:14, name:'Refew',               genre:'Hip-Hop / Rap', stage:'rap',  img:'https://www.festivalvtelci.cz/wp-content/uploads/2026/02/Refew-330x330.png',            isNew:true},
  {id:15, name:'Robin Zoot',          genre:'Hip-Hop / Rap', stage:'rap',  img:'https://www.festivalvtelci.cz/wp-content/uploads/2025/10/Line-up_-09-330x330.webp',     isNew:true},
  {id:16, name:'Gleb',                genre:'Hip-Hop',       stage:'rap',  img:'https://www.festivalvtelci.cz/wp-content/uploads/2025/11/2.-Web-Line-up-14-330x330.png', isNew:true},
  {id:17, name:'Dorian',              genre:'Rap',           stage:'rap',  img:'https://www.festivalvtelci.cz/wp-content/uploads/2025/10/Line-up_-08-330x330.webp',     isNew:true, rapNew:true},
  {id:18, name:'Pain',                genre:'Rap',           stage:'rap',  img:'https://www.festivalvtelci.cz/wp-content/uploads/2026/01/rap-19-330x330.png',           isNew:true, rapNew:true},
  {id:19, name:'Katannah',            genre:'Rap / R&B',     stage:'rap',  img:'https://www.festivalvtelci.cz/wp-content/uploads/2026/01/rap-20-330x330.png',           isNew:true, rapNew:true},
  {id:20, name:'Vlaďky syn',          genre:'Rap',           stage:'rap',  img:'https://www.festivalvtelci.cz/wp-content/uploads/2026/03/vladky-syn-330x330.png',       isNew:true, rapNew:true, imgFallback:true},
];

// ─── ARTIST BIOS ─────────────────────────────────────────
const ARTIST_BIOS = {
  'Rybičky 48':'Česká rock-pop kapela, která baví diváky svou energií, nezaměnitelným humorem a chytlavými melodiemi. Na Festival v Telči přiváží nejlepší hity z víc než dvaceti let na scéně.',
  'DYMYTRY':'Metalová sorta s duší! DYMYTRY propojují heavy metal s elektronickými prvky a neuvěřitelnou charismatičností. Festival v Telči bude jedním z nejintenzivnějších shows sezóny 2026.',
  'Olympic':'Živá legenda české hudby. Olympic hrají od roku 1962 a jejich hity překračují generace — od "Dej mi víc své lásky" po "Prázdniny na zámku". Nefalšovaný rockový svátek.',
  'Richard Müller':'Slovenský zpěvák a skladatel, jehož hlas vyvolává silné emoce. Richard Müller přináší nezaměnitelné spojení folk, pop a soul s poetickými texty.',
  'Wohnout':'Reggae-rockový nářez z Prahy. Wohnout jsou zárukou skvělé energie, politicky nabitých textů a davu, který do poslední písničky neopustí parket.',
  'Anna K.':'Ikona české pop-rockové scény. Anna Kačmarčíková je zpěvačka s mocným hlasem a hitovou diskografií, která rozezní hlavní stage Telče.',
  'Walda Gang':'Řekni folk-punk a první co se vybaví? Walda Gang! Skvělé texty, akustická energie a parta lidí, které je radost sledovat i poslouchat.',
  'Vesna':'Česko-slovenská world-music kapela s kořeny v tradiční slovanské hudbě. Jejich show propojuje folklór, hip-hop a moderní elektroniku.',
  'IMT Smile':'Slovenská pop-rocková kapela plná hitů. IMT Smile jsou festivaloví veteráni, kteří vždy přinesou neodhaknutelné singly a dav zpívající každý refrén.',
  'Adam Ďurica':'Slovenský zpěvák a skladatel s unikátním hlasem. Adam Ďurica je jednou z nejrespektovanějších postav slovenské pop scény.',
  'Petr Bende & Band':'Mladý slovenský popový fenomén s vyprodanými turné a miliony streamů. Petr Bende a jeho band přinesou energetický set plný moderního popu.',
  'Kapela Pekař':'Parta muzikantů se svým indie-pop zvukem. Kapela Pekař patří k nejvýraznějším tuzemským kapelám nové generace.',
  'Kateřina Marie Tichá':'Zpěvačka s nezaměnitelným hlasem a silnými texty. Kateřina Marie Tichá a BANDJEEZ přinesou na festival live show plnou emocí.',
  'Refew':'Jeden z nejtalentovanějších slovenských rapperů současnosti. Refew je znám pro svůj propracovaný flow a texty, které rezonují s generací Z.',
  'Robin Zoot':'Česko-slovenský rapper a producent spojující jazz, soul a hip-hop. Robin Zoot přináší sofistikovaný rap s nepřehlédnutelnou osobností.',
  'Gleb':'Mladý hip-hop talent s unikátním stylem a emotivními texty. Gleb se rychle řadí mezi nejvýraznější nová jména české rap scény.',
  'Dorian':'Rapper s jasnou vizí a silným sdělením. Dorian je jednou z nejočekávanějších novinek letošního ročníku na NFCtron Stage.',
  'Pain':'Rap artist s intenzivním přístupem a poctivým řemeslem. Pain přináší na festival silnou živou show bez kompromisů.',
  'Katannah':'Rapper a producent, jehož hudba stojí na průsečíku R&B, hip-hopu a alternativy. Katannah je novinka festivalu, kterou nechceš propásnout.',
  'Vlaďky syn':'Enigmatický rapper s silnou identitou a texty, které se zarývají pod kůži. Vlaďky syn debutuje na NFCtron Stage jako jedna z nejzajímavějších novinek.'
};
const ARTIST_WEBS = {
  'Rybičky 48':'https://www.rybicky48.cz','DYMYTRY':'https://dymytry.com',
  'Olympic':'https://www.olympic.cz','Wohnout':'https://www.wohnout.cz',
  'Anna K.':'https://www.annak.cz','IMT Smile':'https://www.imtsmile.sk',
  'Walda Gang':'https://www.waldagang.cz','Vesna':'https://www.vesnaband.cz'
};

const SCHEDULE = {
  fri: {
    main:  [{t:'17:30',e:'19:00',name:'Walda Gang'},{t:'19:00',e:'20:30',name:'Anna K.'},{t:'20:30',e:'22:15',name:'IMT Smile'},{t:'22:15',e:'00:15',name:'Rybičky 48'}],
    rap:   [{t:'17:00',e:'18:15',name:'Katannah'},{t:'18:15',e:'19:30',name:'Pain'},{t:'19:30',e:'21:00',name:'Gleb'},{t:'21:00',e:'22:30',name:'Robin Zoot'}],
    third: [{t:'17:00',e:'18:30',name:'Kapela Pekař'},{t:'18:30',e:'20:00',name:'Adam ďurica'},{t:'20:00',e:'22:00',name:'Kateřina Marie Tichá'}],
  },
  sat: {
    main:  [{t:'16:30',e:'18:00',name:'Vesna'},{t:'18:00',e:'19:30',name:'Petr Bende & Band'},{t:'19:30',e:'21:00',name:'Wohnout'},{t:'21:00',e:'22:45',name:'Richard Müller'},{t:'22:45',e:'00:30',name:'Olympic'},{t:'00:00',e:'02:00',name:'DYMYTRY'}],
    rap:   [{t:'16:00',e:'17:15',name:'Vlaďky syn'},{t:'17:15',e:'18:45',name:'Dorian'},{t:'18:45',e:'20:30',name:'Refew'},{t:'20:30',e:'22:00',name:'Robin Zoot'}],
    third: [{t:'16:00',e:'17:30',name:'Adam ďurica'},{t:'17:30',e:'19:30',name:'Kapela Pekař'},{t:'19:30',e:'22:00',name:'Kateřina Marie Tichá'}],
  }
};
const STAGE_COLORS = { main:'#FF6600', rap:'#9B59B6', third:'#1A9E6E' };
const STAGE_LABELS = { main:'🎤 Mareček Industries Stage', rap:'🎵 NFCtron Stage', third:'🎶 Město Telč Stage' };

// ─── MODAL ENGINE ────────────────────────────────────────
// Modal overlay is in static HTML above the footer

function showModal(html) {
  document.getElementById('modal-content').innerHTML = html;
  document.getElementById('modal-overlay').classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closeModal() {
  document.getElementById('modal-overlay').classList.remove('open');
  document.body.style.overflow = '';
}
document.addEventListener('keydown', function(e){ if(e.key==='Escape') closeModal(); });

function imgFallback(img) {
  img.onerror = null;
  img.src = 'logo.png';
  img.style.objectFit = 'contain';
  img.style.padding = '20%';
  img.style.background = 'linear-gradient(135deg,#300030,#1a0020)';
  img.style.filter = 'brightness(0) invert(1)';
  img.style.opacity = '.35';
}

// ─── LINE-UP FILTER ──────────────────────────────────────
let activeStage = 'all';
function filterStage(stage) {
  activeStage = stage;
  renderArtists();
  document.querySelectorAll('.stage-tab').forEach(function(btn) {
    var a = btn.dataset.stage === stage;
    btn.classList.toggle('tab-active', a);
    if (!a) btn.style.background = 'transparent';
  });
}
function _artistPlaceholder(a) {
  // Festival-branded placeholder with artist name in festival colors
  var stageC = {main:'#FF6600',rap:'#9B59B6',third:'#1A9E6E'}[a.stage] || '#FF8C1A';
  var initials = a.name.split(' ').map(function(w){return w[0];}).join('').slice(0,3).toUpperCase();
  return '<div class="artist-placeholder" style="background:linear-gradient(145deg,#1a0028,#2d0045)">' +
    '<div style="width:60px;height:60px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-weight:900;font-size:18px;color:white;background:' + stageC + ';flex-shrink:0;border:3px solid rgba(255,255,255,.15)">' + initials + '</div>' +
    '<p style="color:white;font-weight:900;font-size:11px;text-transform:uppercase;letter-spacing:.06em;text-align:center;line-height:1.3">' + a.name + '</p>' +
    '<img src="logo.png" alt="" style="width:40%;opacity:.15;filter:brightness(0) invert(1)"/>' +
    '</div>';
}

function renderArtists() {
  var grid = document.getElementById('artistGrid');
  var list = activeStage === 'all' ? ARTISTS : ARTISTS.filter(function(a){ return a.stage === activeStage; });
  grid.innerHTML = list.map(function(a) {
    var imgHtml = (a.img && !a.imgFallback)
      ? '<img src="' + a.img + '" alt="' + a.name + '" loading="lazy" onerror="imgFallback(this)"/>'
      : _artistPlaceholder(a);
    var hlBadge = a.headliner
      ? '<span class="stage-pill" style="position:absolute;top:10px;left:10px;background:#FF8C1A;color:white">HEADLINER</span>' : '';
    var newBadge = a.rapNew
      ? '<span class="stage-pill" style="position:absolute;top:10px;right:10px;background:#9B59B6;color:white;font-size:7.5px">NOVINKA! RAP STAGE</span>'
      : (a.isNew ? '<span class="stage-pill" style="position:absolute;top:10px;right:10px;background:#FF6600;color:white">NOVINKA</span>' : '');
    return '<div class="artist-card" onclick="openArtistModal(' + a.id + ')">' +
      imgHtml + '<div class="card-overlay"></div>' + hlBadge + newBadge +
      '<div class="card-info">' +
      '<p style="color:white;font-weight:900;font-size:14px;letter-spacing:.01em;text-transform:uppercase;line-height:1.2;margin-bottom:3px">' + a.name + '</p>' +
      '<p style="color:rgba(255,255,255,.75);font-size:10px;font-weight:600;text-transform:uppercase;letter-spacing:.08em">' + a.genre + '</p>' +
      '</div></div>';
  }).join('');
}
renderArtists();

// ─── ARTIST MODAL ────────────────────────────────────────
function openArtistModal(id) {
  var a = ARTISTS.find(function(x){ return x.id === id; });
  if (!a) return;
  var sc = { main:'#FF6600', rap:'#9B59B6', third:'#1A9E6E' };
  var sn = { main:'Mareček Industries Stage', rap:'NFCtron Stage', third:'Město Telč Stage' };
  var badges = (a.headliner ? '<span class="stage-pill" style="background:#FF8C1A;color:white;margin-right:4px">HEADLINER</span>' : '') +
    (a.rapNew ? '<span class="stage-pill" style="background:#9B59B6;color:white;font-size:7.5px">NOVINKA! RAP STAGE</span>'
              : a.isNew ? '<span class="stage-pill" style="background:#FF6600;color:white">NOVINKA</span>' : '');
  var bio = ARTIST_BIOS[a.name] || 'Více informací najdeš na webu festivalu.';
  var web = ARTIST_WEBS[a.name] || null;
  var hasRealImg = a.img && !a.imgFallback;
  var stageC2 = {main:'#FF6600',rap:'#9B59B6',third:'#1A9E6E'}[a.stage] || '#FF8C1A';
  var initials2 = a.name.split(' ').map(function(w){return w[0];}).join('').slice(0,3).toUpperCase();
  var imgSec = hasRealImg
    ? '<div style="position:relative;aspect-ratio:16/9;overflow:hidden;border-radius:20px 20px 0 0">' +
      '<img src="' + a.img + '" alt="' + a.name + '" style="width:100%;height:100%;object-fit:cover" onerror="imgFallback(this)"/>' +
      '<div style="position:absolute;inset:0;background:linear-gradient(to top,#1a0025,transparent 55%)"></div></div>'
    : '<div style="aspect-ratio:16/9;background:linear-gradient(145deg,#1a0028,#2d0045);border-radius:20px 20px 0 0;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:12px;padding:24px">' +
      '<div style="width:72px;height:72px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-weight:900;font-size:22px;color:white;background:' + stageC2 + ';border:3px solid rgba(255,255,255,.2)">' + initials2 + '</div>' +
      '<p style="color:white;font-weight:900;font-size:14px;text-transform:uppercase;letter-spacing:.06em;text-align:center">' + a.name + '</p>' +
      '<img src="logo.png" alt="" style="width:25%;opacity:.15;filter:brightness(0) invert(1)"/></div>';
  showModal(imgSec +
    '<div style="padding:22px 24px 28px">' +
    (badges ? '<div style="margin-bottom:10px">' + badges + '</div>' : '') +
    '<h2 style="color:white;font-size:26px;font-weight:900;text-transform:uppercase;margin:0 0 4px">' + a.name + '</h2>' +
    '<p style="color:rgba(255,255,255,.4);font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:.1em;margin-bottom:10px">' + a.genre + '</p>' +
    '<div style="display:inline-block;background:rgba(255,255,255,.07);border-radius:8px;padding:4px 10px;margin-bottom:16px">' +
    '<span style="color:' + sc[a.stage] + ';font-size:11px;font-weight:700">' + sn[a.stage] + '</span></div>' +
    '<p style="color:rgba(255,255,255,.75);font-size:14px;line-height:1.7;margin-bottom:20px">' + bio + '</p>' +
    '<div style="display:flex;gap:10px;flex-wrap:wrap">' +
    (web ? '<a href="' + web + '" target="_blank" class="grad-btn" style="color:white;font-weight:900;font-size:11px;text-transform:uppercase;letter-spacing:.1em;padding:10px 20px;border-radius:8px;text-decoration:none;display:inline-block">Oficiální web →</a>' : '') +
    '<a href="#calendar" onclick="closeModal()" style="border:2px solid rgba(255,255,255,.2);color:rgba(255,255,255,.7);font-weight:700;font-size:11px;text-transform:uppercase;letter-spacing:.1em;padding:10px 20px;border-radius:8px;text-decoration:none;display:inline-block">🗓 Program</a>' +
    '<a href="https://tickets.nfctron.com/event/marecek-industrie-sro/festival-v-telci-2026" target="_blank" class="grad-btn" style="color:white;font-weight:900;font-size:11px;text-transform:uppercase;letter-spacing:.1em;padding:10px 20px;border-radius:8px;text-decoration:none;display:inline-block">🎟 Vstupenky</a>' +
    '</div></div>');
}

// ─── INFO MODALS ─────────────────────────────────────────
function _iRow(label, val) {
  return '<div style="display:flex;justify-content:space-between;align-items:center;background:rgba(255,255,255,.05);border-radius:10px;padding:10px 14px;margin-bottom:8px">' +
    '<span style="color:rgba(255,255,255,.8);font-size:13px">' + label + '</span>' +
    '<span style="color:#FF8C1A;font-weight:900;font-size:14px">' + val + '</span></div>';
}
function _iCard(icon, title, sub) {
  return '<div style="background:rgba(255,255,255,.05);border-radius:10px;padding:12px">' +
    '<div style="font-size:22px;margin-bottom:6px">' + icon + '</div>' +
    '<p style="color:white;font-size:12px;font-weight:700;margin-bottom:2px">' + title + '</p>' +
    '<p style="color:rgba(255,255,255,.45);font-size:11px;line-height:1.4">' + sub + '</p></div>';
}
function _iBtn(href, label, primary) {
  var s = primary
    ? 'background:linear-gradient(to right,#FF9933,#FF6600);color:white;font-weight:900;'
    : 'border:2px solid rgba(255,255,255,.2);color:rgba(255,255,255,.7);font-weight:700;';
  return '<a href="' + href + '" target="_blank" style="' + s + 'font-size:12px;text-transform:uppercase;letter-spacing:.1em;padding:11px 20px;border-radius:8px;text-decoration:none;display:inline-block">' + label + '</a>';
}
function openInfoModal(type) {
  var body = '';
  if (type === 'misto') {
    body =
      '<h2 style="color:white;font-size:22px;font-weight:900;margin-bottom:4px">Kemp U Rostenky</h2>' +
      '<p style="color:#FF8C1A;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:.1em;margin-bottom:16px">Telc, kraj Vysocina</p>' +
      '<div style="background:rgba(255,255,255,.05);border-radius:12px;padding:14px;margin-bottom:12px">' +
        '<p style="color:rgba(255,255,255,.8);font-size:13px;line-height:1.9">' +
        '<b style="color:white">Adresa:</b> Stepnicka 315, 588 56 Telc<br>' +
        '<b style="color:white">GPS:</b> 49.1818N, 15.4547E<br>' +
        '<b style="color:white">Web:</b> <a href="https://www.festivalvtelci.cz" target="_blank" style="color:#FF8C1A">festivalvtelci.cz</a>' +
        '</p>' +
      '</div>' +
      '<div style="background:rgba(255,255,255,.05);border-radius:12px;padding:14px;margin-bottom:16px">' +
        '<p style="color:#FF8C1A;font-size:11px;font-weight:900;text-transform:uppercase;letter-spacing:.1em;margin-bottom:10px">Jak se dostat</p>' +
        '<p style="color:rgba(255,255,255,.75);font-size:13px;line-height:2.0">' +
        'Autem: z Jihlavy E59 Telc (35 km)<br>' +
        'Autobusem: Brno, Jihlava, Trebic<br>' +
        'Vlak + bus: nastup Kostelec u Jihlavy<br>' +
        'Kolo: cyklostezka z centra Telce (2 km)' +
        '</p>' +
      '</div>' +
      '<div style="display:flex;gap:10px;flex-wrap:wrap">' +
      _iBtn('https://www.google.com/maps/dir/?api=1&destination=Kemp+u+Ro%C5%A1t%C4%9Bnky%2C+Tel%C4%8D&travelmode=driving','Navigovat na misto', true) +
      _iBtn('https://www.festivalvtelci.cz/jak-se-dostat/','Jak se dostat', false) +
      '</div>';
  } else if (type === 'datum') {
    body =
      '<h2 style="color:white;font-size:22px;font-weight:900;margin-bottom:16px">19. – 20. 6. 2026</h2>' +
      '<div style="background:rgba(255,100,0,.1);border-left:4px solid #FF6600;border-radius:0 12px 12px 0;padding:14px;margin-bottom:10px">' +
        '<p style="color:#FF8C1A;font-weight:900;font-size:11px;text-transform:uppercase;letter-spacing:.1em;margin-bottom:6px">PATEK 19. 6.</p>' +
        '<p style="color:rgba(255,255,255,.85);font-size:13px;line-height:1.9">Brany oteviraji v 14:00<br>Program od 17:00<br>Kemp prijima od 12:00 hod.</p>' +
      '</div>' +
      '<div style="background:rgba(155,89,182,.1);border-left:4px solid #9B59B6;border-radius:0 12px 12px 0;padding:14px;margin-bottom:10px">' +
        '<p style="color:#9B59B6;font-weight:900;font-size:11px;text-transform:uppercase;letter-spacing:.1em;margin-bottom:6px">SOBOTA 20. 6.</p>' +
        '<p style="color:rgba(255,255,255,.85);font-size:13px;line-height:1.9">Brany oteviraji v 12:00<br>Program od 14:00<br>Hlavni headliner od 22:00</p>' +
      '</div>' +
      '<div style="background:rgba(255,255,255,.05);border-radius:12px;padding:12px;margin-bottom:16px">' +
        '<p style="color:rgba(255,255,255,.6);font-size:12px;line-height:1.7">Kemp otevirame jiz ve ctvrtek 18. 6. od 12:00. Odjezd nejpozdeji v nedeli 21. 6. do 12:00.</p>' +
      '</div>' +
      '<a href="#calendar" onclick="closeModal()" style="background:linear-gradient(to right,#FF9933,#FF6600);color:white;font-weight:900;font-size:12px;text-transform:uppercase;letter-spacing:.1em;padding:11px 20px;border-radius:8px;text-decoration:none;display:inline-block">Zobrazit program</a>';
  } else if (type === 'kemping') {
    body =
      '<h2 style="color:white;font-size:22px;font-weight:900;margin-bottom:16px">Kemping</h2>' +
      _iRow('Stan – 1 noc (pa nebo so)','200 Kc') +
      _iRow('Stan – 2 noci (pa + so)','350 Kc') +
      _iRow('Karavan / obytny vuz – 1 noc','800 Kc') +
      _iRow('Karavan / obytny vuz – 2 noci','1 400 Kc') +
      _iRow('Motokaravan / autobus','dohodou') +
      '<div style="background:rgba(255,255,255,.05);border-radius:12px;padding:14px;margin-bottom:16px">' +
        '<p style="color:#FF8C1A;font-size:11px;font-weight:900;text-transform:uppercase;letter-spacing:.1em;margin-bottom:8px">Informace k taboru</p>' +
        '<p style="color:rgba(255,255,255,.7);font-size:13px;line-height:1.9">' +
        'Socialni zarizeni (zachody + sprchy) v arealu.<br>' +
        'Elektrina na karavanovych mistech za priplatek.<br>' +
        'Zvire nejsou povolena.<br>' +
        'Grilovani pouze na vyhrazenych mistech.<br>' +
        'Nocni klid od 03:00 hod.' +
        '</p>' +
      '</div>' +
      '<div style="display:flex;gap:10px;flex-wrap:wrap">' +
      _iBtn('https://www.festivalvtelci.cz/kemping/','Vice info o kempovani', true) +
      _iBtn('https://www.festivalvtelci.cz','Web festivalu', false) +
      '</div>';
  } else if (type === 'parkovani') {
    body =
      '<h2 style="color:white;font-size:22px;font-weight:900;margin-bottom:16px">Parkovani</h2>' +
      _iRow('Osobni auto','200 Kc / den') +
      _iRow('Motorka','100 Kc / den') +
      _iRow('Autobus / minibus','600 Kc / den') +
      _iRow('Imobilni – ZTP','zdarma') +
      '<div style="background:rgba(255,255,255,.05);border-radius:12px;padding:14px;margin-bottom:16px">' +
        '<p style="color:#FF8C1A;font-size:11px;font-weight:900;text-transform:uppercase;letter-spacing:.1em;margin-bottom:8px">Dulezite informace</p>' +
        '<p style="color:rgba(255,255,255,.7);font-size:13px;line-height:1.9">' +
        'Parkoviste se nachazi cca 200 m od vstupu do arealu.<br>' +
        'Parkoviste je hlidane 24 hodin denne.<br>' +
        'Kyvadlovy bus z centra Telce – ZDARMA.<br>' +
        'Doporucujeme vyuzit hromadnou dopravu.' +
        '</p>' +
      '</div>' +
      '<div style="display:flex;gap:10px;flex-wrap:wrap">' +
      _iBtn('https://www.festivalvtelci.cz/doprava-a-parkovani/','Vice info o doprave', true) +
      _iBtn('https://www.google.com/maps/dir/?api=1&destination=Kemp+u+Ro%C5%A1t%C4%9Bnky%2C+Tel%C4%8D&travelmode=driving','Navigovat', false) +
      '</div>';
  } else if (type === 'jidlo') {
    body =
      '<h2 style="color:white;font-size:22px;font-weight:900;margin-bottom:16px">Jidlo a Piti</h2>' +
      '<div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-bottom:16px">' +
      _iCard('Burgery','Burgery &amp; Grill','Domaci hovezi burgery') +
      _iCard('Street food','Street food','Tacos, wrapsy, krepe') +
      _iCard('Italska','Italska kuchyne','Pizza, pasta, antipasti') +
      _iCard('Veggie','Vegetarianske','Zdrave a lehke volby') +
      _iCard('Pivo','Cepovane pivo','Ceska znacka, cerstve') +
      _iCard('Vino','Vino &amp; Koktejly','Moravske vino, mojito') +
      _iCard('Kava','Kava &amp; Nealko','Espresso, fresh dzusy') +
      _iCard('Dezerty','Sladkosti','Palacinka, zmrzlina') +
      '</div>' +
      '<div style="background:rgba(255,140,26,.1);border:1px solid rgba(255,140,26,.3);border-radius:12px;padding:14px;margin-bottom:16px">' +
        '<p style="color:#FF8C1A;font-size:11px;font-weight:900;text-transform:uppercase;letter-spacing:.1em;margin-bottom:6px">NFCtron cipovy naramek</p>' +
        '<p style="color:rgba(255,255,255,.75);font-size:13px;line-height:1.7">Vsechny platby v arealu probihaji pres NFCtron cipovy naramek. Hotovost lze dobijit u vstupu nebo na dobijenis punktech v arealu. Karty jsou take prijimany.</p>' +
      '</div>' +
      _iBtn('https://www.festivalvtelci.cz','Zpet na web festivalu', true);
  } else if (type === 'telc') {
    body =
      '<h2 style="color:white;font-size:22px;font-weight:900;margin-bottom:4px">Mesto Telc</h2>' +
      '<p style="color:#FF8C1A;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:.1em;margin-bottom:14px">UNESCO od roku 1992</p>' +
      '<div style="background:rgba(255,255,255,.05);border-radius:12px;padding:14px;margin-bottom:12px">' +
        '<p style="color:rgba(255,255,255,.8);font-size:13px;line-height:1.8">Telc je jedno z nejkrasnejsich historickych mest v Ceske republice. Renesancni namesti Zachariase z Hradce, zamek a rybniky jsou od roku 1992 zarazeny na seznam Svetoveho kulturniho dedicstvi UNESCO.</p>' +
      '</div>' +
      '<div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-bottom:16px">' +
      _iCard('Zamek','Telcsky zamek','Renesancni skvost, prohlidky denne') +
      _iCard('Namesti','Namesti UNESCO','Goticky arkady, fontana, historicke domy') +
      _iCard('Rybnik','Rybniky','Koupani, prochazky, rybareni') +
      _iCard('Hrad','Hrad Rostejn','5 km od Telce, goticka vez') +
      '</div>' +
      '<div style="background:rgba(255,255,255,.05);border-radius:12px;padding:12px;margin-bottom:16px">' +
        '<p style="color:rgba(255,255,255,.6);font-size:12px;line-height:1.7">Centrum Telce je vzdalenym cca 2 km od kempu. Doporucujeme navstevu pred nebo po festivalu.</p>' +
      '</div>' +
      '<div style="display:flex;gap:10px;flex-wrap:wrap">' +
      _iBtn('https://www.telc.eu','Web mesta Telc', true) +
      _iBtn('https://www.hrad-rostejn.cz','Hrad Rostejn', false) +
      '</div>';
  } else if (type === 'mapa') {
    body =
      '<h2 style="color:white;font-size:22px;font-weight:900;margin-bottom:4px">Mapa arealu</h2>' +
      '<p style="color:#FF8C1A;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:.1em;margin-bottom:16px">Kemp U Rostenky – Festival v Telci 2026</p>' +
      '<div style="background:rgba(255,140,26,.04);border:2px dashed rgba(255,140,26,.35);border-radius:16px;padding:40px 24px;text-align:center;margin-bottom:16px">' +
        '<div style="font-size:64px;margin-bottom:12px">Map</div>' +
        '<p style="color:white;font-weight:900;font-size:18px;margin-bottom:8px">Mapu arealu pro vas pripravujeme.</p>' +
        '<p style="color:rgba(255,255,255,.55);font-size:13px;line-height:1.7">Detailni schema arealu bude dostupne brzy.<br>Bude obsahovat vsechny stage, kemp, parkoviste, vstupy, food zonu, zazemi a prvni pomoc.</p>' +
      '</div>' +
      '<div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-bottom:16px">' +
      _iCard('Stage 1','Marecek Industries Stage','Hlavni stage – jih arealu') +
      _iCard('Stage 2','NFCtron Stage','Rap stage – stred arealu') +
      _iCard('Stage 3','Mesto Telc Stage','Treti stage – sever arealu') +
      _iCard('Kemp','Kempovaci zona','Vychod arealu – stan, karavan') +
      _iCard('Parkoviste','Parkovani','200 m od vstupu') +
      _iCard('Prvni pomoc','Zdravotni sluzba','Vzdalenost od vstupu') +
      _iCard('Food zona','Jidlo a piti','Stred arealu, bary') +
      _iCard('Zazemi','WC a sprchy','Rozlozene po arealu') +
      '</div>' +
      _iBtn('https://www.festivalvtelci.cz','Sleduj aktualizace na webu', true);
  } else if (type === 'aktivity') {
    body =
      '<h2 style="color:white;font-size:22px;font-weight:900;margin-bottom:16px">Doprovodne aktivity</h2>' +
      '<div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-bottom:16px">' +
      _iCard('Workshop','Tvorci workshopy','Malbani, keramika, tisk') +
      _iCard('Joga','Joga a meditace','Ranni session v kempu') +
      _iCard('Chill','Chill-out zona','Lehatka, zazemi, relax') +
      _iCard('Hry','Herni zona','Stolni hry, foosball, sachy') +
      _iCard('Koupani','Koupani v rybniku','200 m od arealu festivalu') +
      _iCard('Photo','Photo spot FvT','Instagramove misto 2026') +
      _iCard('Priroda','Prochazky prirodou','Rybniky a sady kolem Telce') +
      _iCard('Zabava','Zabavni aktivity','Tercovnice, petanque, slackline') +
      '</div>' +
      '<div style="background:rgba(255,140,26,.08);border:1px solid rgba(255,140,26,.25);border-radius:12px;padding:14px;margin-bottom:16px">' +
        '<p style="color:#FF8C1A;font-size:11px;font-weight:900;text-transform:uppercase;letter-spacing:.1em;margin-bottom:8px">Telc jako bonus</p>' +
        '<p style="color:rgba(255,255,255,.75);font-size:13px;line-height:1.8">Vyuzij cas pred festivalem! Renesancni namesti UNESCO, Telcsky zamek, hrad Rostejn (5 km od kempu) a koupani v mistnich rybnicicich – vse dostupne pesky nebo na kole.</p>' +
      '</div>' +
      '<div style="display:flex;gap:10px;flex-wrap:wrap">' +
      _iBtn('https://www.telc.eu','Turisticke tipy Telc', true) +
      _iBtn('https://www.festivalvtelci.cz','Web festivalu', false) +
      '</div>';
  }
  if (!body) return;
  showModal('<div style="padding:24px 24px 28px">' + body + '</div>');
}

// ─── LIVE PROGRESS HELPERS ─────────────────────────────────
function _toMins(t) {
  var p = t.split(':'); var h = parseInt(p[0],10); var m = parseInt(p[1],10);
  if (h < 6) h += 24; // after-midnight slots (00:xx)
  return h * 60 + m;
}
function _liveProgress(t, e) {
  var now = new Date();
  var cur = now.getHours() * 60 + now.getMinutes();
  if (now.getHours() < 6) cur += 24 * 60;
  var s = _toMins(t), en = _toMins(e);
  if (cur < s)  return {state:'upcoming'};
  if (cur >= en) return {state:'done'};
  return {state:'playing', pct: Math.min(99, Math.round((cur - s) / (en - s) * 100))};
}

// ─── CALENDAR ────────────────────────────────────────────
// Auto-select festival day based on real date
var activeDay = (function() {
  var d = new Date(); var m = d.getMonth()+1; var day = d.getDate();
  if (m === 6 && day === 20) return 'sat';
  return 'fri';
})();

function setDay(day) {
  activeDay = day;
  renderCalendar();
  ['fri','sat'].forEach(function(d) {
    var btn = document.getElementById('day' + d.charAt(0).toUpperCase() + d.slice(1));
    if (d === day) { btn.style.background='#FF8C1A'; btn.style.color='white'; btn.style.borderColor='#FF8C1A'; }
    else { btn.style.background='transparent'; btn.style.color='rgba(255,255,255,.45)'; btn.style.borderColor='rgba(255,255,255,.2)'; }
  });
}
function renderCalendar() {
  var grid = document.getElementById('calendarGrid');
  var data = SCHEDULE[activeDay];
  grid.innerHTML = ['main','rap','third'].map(function(stageId) {
    return '<div>' +
      '<div class="font-black text-xs uppercase tracking-widest mb-4 pb-3 border-b border-white/10" style="color:' + STAGE_COLORS[stageId] + '">' + STAGE_LABELS[stageId] + '</div>' +
      data[stageId].map(function(item) {
        var lv = item.e ? _liveProgress(item.t, item.e) : {state:''};
        var isPlaying = lv.state === 'playing';
        var isDone    = lv.state === 'done';
        var isUpcoming = lv.state === 'upcoming';
        var barHtml = isPlaying
          ? '<div style="position:absolute;inset:0;width:' + lv.pct + '%;background:rgba(0,230,80,.18);border-radius:8px 0 0 8px;z-index:0;pointer-events:none"></div>' : '';
        var liveTag = isPlaying
          ? '<span style="display:inline-block;margin-left:6px;background:rgba(0,190,65,.9);color:white;font-size:9px;font-weight:900;letter-spacing:.08em;padding:2px 6px;border-radius:3px;vertical-align:middle;animation:livePulse 1.4s infinite">● ŽIVĚ</span>' : '';
        var countdownTag = '';
        if (isUpcoming && item.e) {
          var now2 = new Date(); var curM = now2.getHours()*60+now2.getMinutes(); if(now2.getHours()<6) curM+=1440;
          var diff = _toMins(item.t) - curM;
          if (diff > 0 && diff <= 120) {
            var h2 = Math.floor(diff/60); var m2 = diff%60;
            countdownTag = '<span class="countdown-tag">⏱ ' + (h2>0 ? h2+'h ':'' ) + (m2<10?'0':'')+m2+'min</span>';
          }
        }
        var doneStyle = isDone ? 'opacity:.35;' : '';
        var bc = isPlaying ? '#00df60' : STAGE_COLORS[stageId];
        return '<div class="sched-card" style="background:rgba(255,255,255,.04);border-left-color:' + bc + (isPlaying ? ';box-shadow:inset 0 0 0 1px rgba(0,230,80,.2)' : '') + '">' +
          barHtml +
          '<div style="position:relative;z-index:1;' + doneStyle + '">' +
          '<span class="font-black text-xs" style="color:' + bc + '">' + item.t + '</span>' +
          (item.e ? '<span style="color:rgba(255,255,255,.28);font-size:9px;margin-left:3px">→ ' + item.e + '</span>' : '') +
          liveTag + countdownTag +
          '<p class="text-white font-bold text-sm mt-0.5">' + item.name + '</p>' +
          (isDone ? '<p style="color:rgba(255,255,255,.28);font-size:10px;margin-top:1px">Skončeno ✓</p>' : '') +
          '</div></div>';
      }).join('') + '</div>';
  }).join('');
}
setDay(activeDay);
// Refresh every minute so live bars advance automatically
setInterval(renderCalendar, 60000);

// ─── FVT BOOK tab switcher ────────────────────────────────
function fvtSwitchTab(tab) {
  var isLogin = tab === 'login';
  document.getElementById('fvt-login-panel').style.display    = isLogin ? '' : 'none';
  document.getElementById('fvt-register-panel').style.display = isLogin ? 'none' : '';
  var tLogin = document.getElementById('tab-login');
  var tReg   = document.getElementById('tab-register');
  if (isLogin) {
    tLogin.style.background = '#FF8C1A'; tLogin.style.borderColor = '#FF8C1A'; tLogin.style.color = 'white';
    tReg.style.background   = 'transparent'; tReg.style.borderColor = 'rgba(255,255,255,.2)'; tReg.style.color = 'rgba(255,255,255,.5)';
  } else {
    tReg.style.background   = '#FF8C1A'; tReg.style.borderColor = '#FF8C1A'; tReg.style.color = 'white';
    tLogin.style.background = 'transparent'; tLogin.style.borderColor = 'rgba(255,255,255,.2)'; tLogin.style.color = 'rgba(255,255,255,.5)';
  }
}

// ─── SCROLL TO NOW PLAYING ──────────────────────────────────
function scrollToNowPlaying() {
  setTimeout(function() {
    var live = document.querySelector('.sched-card [style*="livePulse"]');
    if (live) live.closest('.sched-card').scrollIntoView({behavior:'smooth',block:'center'});
  }, 300);
}

// ─── NIGHT MODE (after 21:00) ─────────────────────────────
(function() {
  function checkNightMode() {
    var h = new Date().getHours();
    var isNight = (h >= 21 || h < 4);
    document.body.classList.toggle('night-mode', isNight);
  }
  checkNightMode();
  setInterval(checkNightMode, 60000);
})();

// ─── MOBILE MENU ──────────────────────────────────────────
function toggleMobileMenu() {
  document.getElementById('mobileMenu').classList.toggle('hidden');
}

// ─── AUTO-SYNC via artists-data.json ─────────────────────
var _syncHash = '';
var _syncTimer = null;
var _syncIndicator = null;
var SYNC_INTERVAL = 24 * 60 * 60 * 1000; // jednou denně

function _showSyncDot(ok) {
  if (!_syncIndicator) {
    _syncIndicator = document.createElement('div');
    _syncIndicator.title = 'Auto-sync status';
    _syncIndicator.style.cssText = 'position:fixed;bottom:14px;right:14px;z-index:999;width:10px;height:10px;border-radius:50%;transition:background .4s';
    document.body.appendChild(_syncIndicator);
  }
  _syncIndicator.style.background = ok ? '#2ecc71' : '#e74c3c';
  _syncIndicator.style.opacity = '1';
  clearTimeout(_syncIndicator._fade);
  _syncIndicator._fade = setTimeout(function(){ _syncIndicator.style.opacity = '.3'; }, 2000);
}

function loadArtistsData() {
  fetch('./artists-data.json?' + Date.now(), { cache:'no-store' })
    .then(function(r){ return r.ok ? r.json() : Promise.reject('HTTP ' + r.status); })
    .then(function(d) {
      if (!d || !d.artists) return;
      var newHash = JSON.stringify(d);
      if (newHash === _syncHash) return; // nic se nezmenilo
      _syncHash = newHash;
      var changed = false;
      d.artists.forEach(function(patch) {
        var a = ARTISTS.find(function(x){ return x.id === patch.id; });
        if (a) {
          Object.keys(patch).forEach(function(k) {
            if (JSON.stringify(a[k]) !== JSON.stringify(patch[k])) { a[k] = patch[k]; changed = true; }
          });
        } else if (patch.id && patch.name) {
          ARTISTS.push(patch); changed = true;
        }
      });
      if (changed) renderArtists();
      _showSyncDot(true);
    })
    .catch(function(e) {
      // file:// protokol nebo chyba site - zobraz hint jednou
      if (!window._syncWarnShown) {
        window._syncWarnShown = true;
        console.warn('[FvT Auto-sync] Pro automatické aktualizace spusť server: klikni dvakrát na START-SERVER.bat');
      }
      _showSyncDot(false);
    });
}

// Polling jednou denně – při načtení a po 24 hodinách
function _startPolling() {
  loadArtistsData();
  _syncTimer = setInterval(loadArtistsData, SYNC_INTERVAL);
}
// Při návratu do záložky zkontroluj, jestli uběhl den
var _lastVisible = Date.now();
document.addEventListener('visibilitychange', function() {
  if (!document.hidden) {
    if (Date.now() - _lastVisible >= SYNC_INTERVAL) {
      loadArtistsData();
    }
    _lastVisible = Date.now();
  }
});
_startPolling();
