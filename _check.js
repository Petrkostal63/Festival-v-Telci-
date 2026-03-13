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
  {id:20, name:'Vlaďky syn',          genre:'Rap',           stage:'rap',  img:'https://www.festivalvtelci.cz/wp-content/uploads/2026/03/vladky-syn-330x330.png',       isNew:true, rapNew:true},
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
  var ov = document.getElementById('modal-overlay');
  if (!ov) { alert('modal-overlay chybi v DOM'); return; }
  document.getElementById('modal-content').innerHTML = html;
  ov.style.display = 'flex';
  document.body.style.overflow = 'hidden';
}
function closeModal() {
  var ov = document.getElementById('modal-overlay');
  if (ov) ov.style.display = 'none';
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
  if (!grid) return;
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

// ─── LIVE PROGRESS HELPERS ─────────────────────────────────
function _toMins(t) {
  var p = t.split(':'); var h = parseInt(p[0],10); var m = parseInt(p[1],10);
  if (h < 6) h += 24;
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
