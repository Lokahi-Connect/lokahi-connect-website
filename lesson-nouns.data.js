/*
 * Lesson data: Nouns — Meaning-First Student Lab.
 *
 * Each section has the shape:
 *   { id, number, title, visual, notice, language, check, reflection }
 *
 * `check.kind` is one of: "tap-to-identify" | "drag-drop" |
 * "multiple-choice" | "true-false".
 *
 * Morpheme notation uses literal angle brackets: <base>, <-suffix>.
 * Feedback language is strengths-based.  Banned words: wrong, incorrect,
 * exception, silent, drop, rule-breaker.
 */
(function () {
  'use strict';

  window.LESSON_NOUNS = {
    meta: {
      id: 'nouns-v1',
      title: 'Nouns — Meaning-First Student Lab',
      subtitle: 'Nine sections. Look, notice, then name.'
    },
    sections: [
      {
        id: 's1-what-is-a-noun',
        number: 1,
        title: 'What is a Noun?',
        visual: {
          kind: 'word-card-grid',
          heading: 'Look at these.',
          cards: [
            { category: 'person', emoji: '👧',   word: 'girl' },
            { category: 'person', emoji: '🧑‍🏫', word: 'teacher' },
            { category: 'place',  emoji: '🏫',   word: 'school' },
            { category: 'place',  emoji: '🏞️',  word: 'park' },
            { category: 'thing',  emoji: '📚',   word: 'book' },
            { category: 'thing',  emoji: '🐱',   word: 'cat' }
          ]
        },
        notice: {
          prompt: 'What do these words have in common?',
          revealed: [
            'Each word names something you can point to.',
            'Some name a person. Some name a place. Some name a thing.',
            'A word scientist calls every one of these a noun.'
          ]
        },
        language: {
          term: 'noun',
          definition: 'A noun names a person, a place, or a thing.',
          wordSums: []
        },
        check: {
          kind: 'tap-to-identify',
          instruction: 'Tap every word that is a noun.',
          items: [
            { word: 'dog',   emoji: '🐶', isTarget: true  },
            { word: 'run',   emoji: '🏃', isTarget: false },
            { word: 'beach', emoji: '🏖️', isTarget: true  },
            { word: 'happy', emoji: '😊', isTarget: false },
            { word: 'boy',   emoji: '👦', isTarget: true  },
            { word: 'house', emoji: '🏠', isTarget: true  },
            { word: 'jump',  emoji: '🤸', isTarget: false },
            { word: 'apple', emoji: '🍎', isTarget: true  }
          ],
          feedback: {
            correct: 'Your evidence is strong. Each one names a person, a place, or a thing.',
            retry:   "Let's look again. Which words name a person, a place, or a thing?"
          }
        },
        reflection: 'A noun names a person, a place, or a thing.'
      }
      /* Sections 2–9 are added in later build steps. */
    ]
  };
})();
