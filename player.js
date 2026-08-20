/*  player.js — Read Aloud audio player for Lokahi Connect
 *
 *  Usage: add just before </body> on any page that has the player HTML:
 *    <script src="player.js"></script>
 *    <script>initReadAloud(['audio/file-01.mp3', 'audio/file-02.mp3']);</script>
 *
 *  Requires a <div id="readAloudPlayer"> with the .ra-* child elements
 *  already in the page HTML (see our-approach.html for the template).
 */
(function () {
  'use strict';

  window.initReadAloud = function (files) {
    var wrap     = document.getElementById('readAloudPlayer');
    if (!wrap) return;

    var btnLaunch = wrap.querySelector('.ra-launch');
    var uiPlayer  = wrap.querySelector('.ra-ui');
    var btnPlay   = wrap.querySelector('.ra-playpause');
    var btnStop   = wrap.querySelector('.ra-stop');
    var progBar   = wrap.querySelector('.ra-progress');
    var progFill  = wrap.querySelector('.ra-fill');
    var timeEl    = wrap.querySelector('.ra-time');
    var loadEl    = wrap.querySelector('.ra-loading');

    var chunks  = files.map(function (s) { return { src: s, el: null, dur: 0 }; });
    var ci      = 0;      // current chunk index
    var done    = 0;      // seconds from all completed chunks
    var total   = 0;      // total duration across all chunks (0 = not yet known)
    var active  = false;  // true while audio is playing
    var ticker  = null;   // setInterval handle for progress updates

    // Do not offer a control that can only fail. Enable it after every audio
    // file responds successfully; otherwise leave a clear disabled status.
    function markUnavailable() {
      btnLaunch.disabled = true;
      btnLaunch.setAttribute('aria-label', 'Audio narration is temporarily unavailable');
      btnLaunch.textContent = 'Audio temporarily unavailable';
    }

    function verifyAvailability() {
      if (!window.fetch || !chunks.length) {
        markUnavailable();
        return;
      }

      Promise.all(chunks.map(function (c) {
        return fetch(c.src, { method: 'HEAD', cache: 'no-store' })
          .then(function (response) { return response.ok; })
          .catch(function () { return false; });
      })).then(function (results) {
        if (!results.every(Boolean)) {
          markUnavailable();
          return;
        }
        btnLaunch.disabled = false;
        btnLaunch.setAttribute('aria-label', 'Listen to this page as audio narration');
      });
    }

    // Fetch chunk durations in background via metadata-only preload.
    // On iOS this often won't fire until after first user-initiated play —
    // that's fine; we degrade gracefully to elapsed time in that case.
    function prefetch() {
      var n = 0;
      chunks.forEach(function (c, i) {
        var a = new Audio();
        a.preload = 'metadata';
        a.onloadedmetadata = function () {
          c.dur = a.duration || 0;
          if (++n === chunks.length) recalcTotal();
        };
        a.src = c.src;
      });
    }

    // Only set total once every chunk's duration is known.
    function recalcTotal() {
      var allKnown = chunks.every(function (c) { return c.dur > 0; });
      if (allKnown) {
        total = chunks.reduce(function (s, c) { return s + c.dur; }, 0);
      }
    }

    // Format a number of seconds as M:SS
    function fmt(s) {
      if (!s || isNaN(s) || s < 0) return null;
      var m   = Math.floor(s / 60);
      var sec = Math.floor(s % 60);
      return m + ':' + (sec < 10 ? '0' : '') + sec;
    }

    // Called every 500ms to refresh the progress bar and time label
    function tick() {
      var c = chunks[ci];
      if (!c || !c.el) return;
      var pos = done + (c.el.currentTime || 0);
      if (total > 0) {
        var pct = Math.min(100, (pos / total) * 100);
        progFill.style.width = pct + '%';
        progBar.setAttribute('aria-valuenow', Math.round(pct));
        var t = fmt(total - pos);
        timeEl.textContent = t ? t + '\u00A0remaining' : '';
      } else {
        progFill.style.width = '0%';
        var e = fmt(pos);
        timeEl.textContent = e ? e + '\u00A0elapsed' : '';
      }
    }

    // Load and play chunk[i], then automatically chain to chunk[i+1] when done
    function playChunk(i) {
      if (i >= chunks.length) { finish(); return; }
      ci = i;
      var c = chunks[ci];
      if (!c.el) { c.el = new Audio(); c.el.preload = 'none'; }
      var a = c.el;

      setLoad(true);
      a.src = c.src;

      a.onwaiting = function () { setLoad(true); };
      a.onplaying = function () {
        setLoad(false);
        active = true;
        syncBtn();
        // Capture duration now that audio is actually playing (important on iOS)
        if (!c.dur && a.duration && !isNaN(a.duration)) {
          c.dur = a.duration;
          recalcTotal();
        }
      };
      a.onended = function () {
        var d = a.duration || c.dur || 0;
        if (!c.dur) c.dur = d;
        done += d;
        recalcTotal();
        playChunk(ci + 1);
      };
      a.onerror = function () {
        setLoad(false);
        timeEl.textContent = 'Audio unavailable';
        active = false;
        syncBtn();
      };

      // play() returns a Promise; catch any rejection so the console stays clean.
      // The most common cause would be a policy block, but since we only call
      // play() from a user click (or from onended, which is a trusted browser
      // event), iOS Safari should allow it.
      a.play().catch(function () { setLoad(false); });

      if (!ticker) ticker = setInterval(tick, 500);
    }

    // Called when the last chunk finishes naturally — show 100% briefly then reset
    function finish() {
      clearInterval(ticker); ticker = null;
      active = false;
      progFill.style.width = '100%';
      progBar.setAttribute('aria-valuenow', 100);
      timeEl.textContent = 'Done';
      setTimeout(function () {
        resetState();
        uiPlayer.hidden = true;
        btnLaunch.hidden = false;
        btnLaunch.focus();
      }, 900);
    }

    // Wipe all audio and reset internal state (used by stop and finish)
    function resetState() {
      clearInterval(ticker); ticker = null;
      chunks.forEach(function (c) {
        if (c.el) { c.el.pause(); c.el.src = ''; c.el.onended = null; c.el = null; }
      });
      ci = 0; done = 0; active = false;
      progFill.style.width = '0%';
      progBar.setAttribute('aria-valuenow', 0);
      timeEl.textContent = '';
      setLoad(false);
    }

    function setLoad(on) { loadEl.hidden = !on; }

    // Keep the play/pause button icon and aria-label in sync with `active`
    function syncBtn() {
      btnPlay.setAttribute('data-state', active ? 'playing' : 'paused');
      btnPlay.setAttribute('aria-label', active ? 'Pause narration' : 'Resume narration');
    }

    // ── Event listeners ────────────────────────────────────────────

    btnLaunch.addEventListener('click', function () {
      btnLaunch.hidden = true;
      uiPlayer.hidden = false;
      btnPlay.focus();
      prefetch();
      playChunk(0);
      active = true;
      syncBtn();
    });

    btnPlay.addEventListener('click', function () {
      var a = chunks[ci] && chunks[ci].el;
      if (!a) return;
      if (active) {
        a.pause();
        active = false;
        clearInterval(ticker); ticker = null;
      } else {
        a.play();
        active = true;
        if (!ticker) ticker = setInterval(tick, 500);
      }
      syncBtn();
    });

    btnStop.addEventListener('click', function () {
      resetState();
      uiPlayer.hidden = true;
      btnLaunch.hidden = false;
      btnLaunch.focus();
    });

    // Pause automatically when the visitor switches tabs or minimises the browser
    document.addEventListener('visibilitychange', function () {
      if (document.hidden && active) {
        var a = chunks[ci] && chunks[ci].el;
        if (a) a.pause();
        active = false;
        clearInterval(ticker); ticker = null;
        syncBtn();
      }
    });

    // Release audio resources when the visitor navigates away
    window.addEventListener('pagehide', function () {
      chunks.forEach(function (c) { if (c.el) { c.el.pause(); c.el.src = ''; } });
    });

    verifyAvailability();
  };

}());
