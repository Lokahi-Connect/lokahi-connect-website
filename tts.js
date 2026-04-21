/*
 * Lokahi TTS façade.
 *
 * Public API:
 *   lokahiTTS.speak(text, { onWord, onEnd, onError })
 *   lokahiTTS.stop()
 *
 * Today's backend: Web Speech API (SpeechSynthesisUtterance).
 * A future ElevenLabs Rachel backend will replace the internals
 * without changing this surface.
 *
 * A monotonically increasing _playId guards every async callback
 * so a second speak() or stop() cleanly invalidates the first —
 * no race-condition flicker in word-by-word highlighting.
 */
(function () {
  'use strict';

  var lokahiTTS = {
    _playId: 0,
    _utter: null,
    _voice: null,

    _pickVoice: function () {
      if (!('speechSynthesis' in window)) return null;
      var voices = window.speechSynthesis.getVoices();
      if (!voices || !voices.length) return null;
      var en = voices.filter(function (v) { return /^en/i.test(v.lang); });
      var preferred = en.find(function (v) {
        return /samantha|victoria|karen|zira|susan|allison|ava|tessa|serena|female/i.test(v.name);
      });
      return preferred || en[0] || voices[0] || null;
    },

    _ensureVoice: function (cb) {
      var self = this;
      if (self._voice) return cb(self._voice);
      var v = self._pickVoice();
      if (v) { self._voice = v; return cb(v); }
      if ('speechSynthesis' in window) {
        window.speechSynthesis.addEventListener('voiceschanged', function once() {
          window.speechSynthesis.removeEventListener('voiceschanged', once);
          self._voice = self._pickVoice();
          cb(self._voice);
        });
      } else {
        cb(null);
      }
    },

    speak: function (text, opts) {
      opts = opts || {};
      var onWord = opts.onWord;
      var onEnd = opts.onEnd;
      var onError = opts.onError;
      this.stop();
      if (!('speechSynthesis' in window) || !('SpeechSynthesisUtterance' in window)) {
        if (onError) onError(new Error('speechSynthesis not supported'));
        return;
      }
      var id = ++this._playId;
      var self = this;
      this._ensureVoice(function (voice) {
        if (id !== self._playId) return;
        var u = new SpeechSynthesisUtterance(text);
        if (voice) u.voice = voice;
        u.rate = 0.92;
        u.pitch = 1.0;
        u.volume = 1.0;
        u.onboundary = function (e) {
          if (id !== self._playId) return;
          if (e.name && e.name !== 'word') return;
          if (typeof onWord !== 'function') return;
          var upto = text.slice(0, e.charIndex);
          var wordIdx = (upto.match(/\S+/g) || []).length;
          var match = text.slice(e.charIndex).match(/^\S+/);
          onWord(wordIdx, match ? match[0] : '');
        };
        u.onend = function () {
          if (id !== self._playId) return;
          if (typeof onEnd === 'function') onEnd();
        };
        u.onerror = function (e) {
          if (id !== self._playId) return;
          if (typeof onError === 'function') onError(e);
        };
        self._utter = u;
        window.speechSynthesis.speak(u);
      });
    },

    stop: function () {
      this._playId++;
      this._utter = null;
      if ('speechSynthesis' in window) {
        try { window.speechSynthesis.cancel(); } catch (_) { /* noop */ }
      }
    },

    supported: function () {
      return 'speechSynthesis' in window && 'SpeechSynthesisUtterance' in window;
    }
  };

  window.lokahiTTS = lokahiTTS;
})();
