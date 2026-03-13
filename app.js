// ── FvT Book – Firebase Auth + Firestore logic ───────────
// Requires: firebaseInit.js loaded first (sets window._fbAuth, window._fbDb, window._fbReady)

(function () {
  if (!window._fbReady) {
    var lp = document.getElementById('fvt-posts-loading');
    if (lp) lp.textContent = 'Firebase není nakonfigurovaný. Vyplňte API klíče v firebaseInit.js.';
    return;
  }

  var auth = window._fbAuth;
  var db   = window._fbDb;

  // ── DOM refs ───────────────────────────────────────────
  var authForms     = document.getElementById('fvt-auth-forms');
  var userInfoWrap  = document.getElementById('fvt-user-info');
  var verifyNotice  = document.getElementById('fvt-verify-notice');
  var postFormWrap  = document.getElementById('fvt-post-form');
  var userEmailEl   = document.getElementById('fvt-user-email');
  var postsContainer= document.getElementById('fvt-posts');
  var postsLoading  = document.getElementById('fvt-posts-loading');

  var loginEmailEl  = document.getElementById('login-email');
  var loginPassEl   = document.getElementById('login-password');
  var loginBtn      = document.getElementById('login-btn');
  var loginError    = document.getElementById('login-error');

  var regEmailEl    = document.getElementById('reg-email');
  var regPassEl     = document.getElementById('reg-password');
  var regBtn        = document.getElementById('reg-btn');
  var regError      = document.getElementById('reg-error');

  var logoutBtn     = document.getElementById('logout-btn');
  var resendBtn     = document.getElementById('resend-verification-btn');
  var postContent   = document.getElementById('fvt-msg');
  var postBtn       = document.getElementById('post-submit-btn');
  var postError     = document.getElementById('fvt-post-error');

  var unsubPosts = null;

  // ── Helpers ────────────────────────────────────────────
  function show(el) { if (el) el.style.display = ''; }
  function hide(el) { if (el) el.style.display = 'none'; }
  function esc(s)   { return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;'); }
  function showErr(el, msg, isOk) {
    if (!el) return;
    el.textContent = msg;
    el.style.color = isOk ? '#2ecc71' : '#e74c3c';
    el.style.display = 'block';
  }
  function hideErr(el) { if (el) el.style.display = 'none'; }

  function authErrMsg(code) {
    var m = {
      'auth/email-already-in-use': 'E-mail je již zaregistrován.',
      'auth/invalid-email':        'Neplatný formát e-mailu.',
      'auth/weak-password':        'Heslo musí mít alespoň 6 znaků.',
      'auth/user-not-found':       'Uživatel s tímto e-mailem neexistuje.',
      'auth/wrong-password':       'Nesprávné heslo.',
      'auth/invalid-credential':   'Nesprávný e-mail nebo heslo.',
      'auth/too-many-requests':    'Příliš mnoho pokusů. Zkus to znovu za chvíli.'
    };
    return m[code] || 'Nastala chyba. Zkus to znovu.';
  }

  // ── Auth state listener ────────────────────────────────
  auth.onAuthStateChanged(function (user) {
    if (!user) {
      show(authForms);
      hide(userInfoWrap);
      hide(verifyNotice);
      hide(postFormWrap);
    } else {
      hide(authForms);
      show(userInfoWrap);
      if (userEmailEl) userEmailEl.textContent = user.email;

      if (!user.emailVerified) {
        show(verifyNotice);
        hide(postFormWrap);
      } else {
        hide(verifyNotice);
        show(postFormWrap);
      }
    }
    startPostsListener();
  });

  // ── Register ───────────────────────────────────────────
  if (regBtn) {
    regBtn.addEventListener('click', function () {
      var email = (regEmailEl ? regEmailEl.value.trim() : '');
      var pass  = (regPassEl  ? regPassEl.value.trim()  : '');
      hideErr(regError);
      if (!email || !pass) { showErr(regError, 'Vyplňte e-mail a heslo.', false); return; }

      regBtn.disabled = true;
      auth.createUserWithEmailAndPassword(email, pass)
        .then(function (cred) {
          return cred.user.sendEmailVerification()
            .then(function () {
              return db.collection('users').doc(cred.user.uid).set({
                email:     email,
                createdAt: firebase.firestore.FieldValue.serverTimestamp()
              });
            });
        })
        .then(function () {
          showErr(regError, 'Registrace úspěšná! Zkontroluj svůj e-mail a ověřovací odkaz.', true);
          if (regEmailEl) regEmailEl.value = '';
          if (regPassEl)  regPassEl.value  = '';
          regBtn.disabled = false;
        })
        .catch(function (err) {
          showErr(regError, authErrMsg(err.code), false);
          regBtn.disabled = false;
        });
    });
  }

  // ── Login ──────────────────────────────────────────────
  if (loginBtn) {
    loginBtn.addEventListener('click', function () {
      var email = (loginEmailEl ? loginEmailEl.value.trim() : '');
      var pass  = (loginPassEl  ? loginPassEl.value.trim()  : '');
      hideErr(loginError);
      if (!email || !pass) { showErr(loginError, 'Vyplňte e-mail a heslo.', false); return; }

      loginBtn.disabled = true;
      auth.signInWithEmailAndPassword(email, pass)
        .then(function () { loginBtn.disabled = false; })
        .catch(function (err) {
          showErr(loginError, authErrMsg(err.code), false);
          loginBtn.disabled = false;
        });
    });
  }

  // ── Logout ─────────────────────────────────────────────
  if (logoutBtn) {
    logoutBtn.addEventListener('click', function () { auth.signOut(); });
  }

  // ── Resend verification ────────────────────────────────
  if (resendBtn) {
    resendBtn.addEventListener('click', function () {
      var user = auth.currentUser;
      if (!user) return;
      resendBtn.disabled = true;
      user.sendEmailVerification()
        .then(function () {
          resendBtn.textContent = 'Odesláno!';
          setTimeout(function () {
            resendBtn.textContent = 'Znovu odeslat ověřovací e-mail';
            resendBtn.disabled = false;
          }, 30000);
        })
        .catch(function () {
          resendBtn.disabled = false;
          alert('Nepodařilo se odeslat e-mail. Zkus to za chvíli.');
        });
    });
  }

  // ── Add post ───────────────────────────────────────────
  if (postBtn) {
    postBtn.addEventListener('click', function () {
      var user = auth.currentUser;
      hideErr(postError);
      if (!user || !user.emailVerified) {
        showErr(postError, 'Pro přidání příspěvku musí být tvůj e-mail ověřen.', false);
        return;
      }
      var content = postContent ? postContent.value.trim() : '';
      if (!content) { showErr(postError, 'Napiš zprávu.', false); return; }

      postBtn.disabled = true;
      postBtn.textContent = 'Odesílám...';

      db.collection('posts').add({
        authorUid:   user.uid,
        authorEmail: user.email,
        content:     content,
        timestamp:   firebase.firestore.FieldValue.serverTimestamp()
      })
      .then(function () {
        if (postContent) postContent.value = '';
        postBtn.textContent = 'Přidat příspěvek';
        postBtn.disabled = false;
      })
      .catch(function (err) {
        showErr(postError, 'Chyba: ' + err.message, false);
        postBtn.textContent = 'Přidat příspěvek';
        postBtn.disabled = false;
      });
    });
  }

  // ── Real-time posts listener ───────────────────────────
  function startPostsListener() {
    if (unsubPosts) return;
    var COLORS = ['#FF8C1A','#9B59B6','#1A9E6E','#FF6600','#3498DB','#E74C3C'];
    try {
      unsubPosts = db.collection('posts')
        .orderBy('timestamp', 'desc')
        .onSnapshot(function (snap) {
          if (postsLoading) postsLoading.style.display = 'none';
          if (snap.empty) {
            postsContainer.innerHTML =
              '<p style="color:rgba(255,255,255,.35);font-size:13px;text-align:center;padding:24px 0">' +
              'Zatím žádné příspěvky. Buď první!</p>';
            return;
          }
          postsContainer.innerHTML = snap.docs.map(function (doc) {
            var d     = doc.data();
            var email = d.authorEmail || 'anonym';
            var nick  = email.split('@')[0];
            var color = COLORS[nick.charCodeAt(0) % COLORS.length];
            var ts    = d.timestamp
              ? new Date(d.timestamp.seconds * 1000).toLocaleDateString('cs-CZ')
              : '';
            return '<div class="msg-card">' +
              '<div style="display:flex;align-items:center;gap:10px;margin-bottom:8px">' +
              '<div style="width:32px;height:32px;border-radius:50%;display:flex;align-items:center;' +
              'justify-content:center;font-weight:900;font-size:12px;color:white;background:' + color +
              ';flex-shrink:0">' + nick[0].toUpperCase() + '</div>' +
              '<span style="font-weight:700;font-size:14px;color:white">' + esc(nick) + '</span>' +
              '<span style="color:rgba(255,255,255,.35);font-size:11px;margin-left:auto">' + ts + '</span>' +
              '</div>' +
              '<p style="color:rgba(255,255,255,.8);font-size:14px;line-height:1.5">' +
              esc(d.content) + '</p></div>';
          }).join('');
        }, function (err) {
          if (postsContainer) postsContainer.innerHTML =
            '<p style="color:rgba(255,255,255,.35);font-size:13px;text-align:center;padding:24px 0">' +
            'Nepodařilo se načíst příspěvky.</p>';
          console.warn('[FvT Firestore] posts error:', err);
        });
    } catch (e) {
      if (postsContainer) postsContainer.innerHTML =
        '<p style="color:rgba(255,255,255,.35);font-size:13px;text-align:center;padding:24px 0">' +
        'Firebase není dostupný.</p>';
    }
  }
})();
