/* ============================================================
   LYRICA — application
   Vanilla JS, hash routing, localStorage progress, Web Speech API.
   ============================================================ */

(() => {
  "use strict";

  const STORAGE_KEY = "lyrica:state:v1";

  if (window.LYRICA && typeof window.LYRICA.mergeContent === "function") {
    window.LYRICA.mergeContent();
  }

  const { LEVELS, SONGS, ALL_WORDS, LEVEL_BY_ID, SONG_BY_ID, THEORY, THEORY_BY_ID } = window.LYRICA;
  const TOTAL_SONGS = SONGS.length;
  const TOTAL_WORDS = ALL_WORDS.length;
  const TOTAL_QUIZ = SONGS.reduce((sum, song) => sum + song.quiz.length, 0);
  const TOTAL_HOMEWORK = SONGS.reduce((sum, song) => sum + song.homework.length, 0);
  const TOTAL_THEORY = THEORY.length;
  const YOUTUBE_VIDEOS = window.LYRICA_YOUTUBE || {};
  const LEVEL_ORDER = LEVELS.map((level) => level.id);

  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => Array.from(root.querySelectorAll(selector));

  const HTML_ESCAPES = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" };
  const esc = (value) => String(value ?? "").replace(/[&<>"']/g, (char) => HTML_ESCAPES[char]);
  const attr = (value) => esc(value);
  const clamp = (value, min, max) => Math.max(min, Math.min(max, value));

  /* ------------------------------------------------------------
     Icons
     ------------------------------------------------------------ */
  const ICONS = {
    arrow: '<path d="M5 12h14M13 6l6 6-6 6"/>',
    arrowLeft: '<path d="M19 12H5M11 6l-6 6 6 6"/>',
    play: '<path d="M8 5.5 19 12 8 18.5v-13Z"/>',
    pause: '<path d="M8 5v14M16 5v14"/>',
    volume: '<path d="M11 5 6 9H3v6h3l5 4V5Z"/><path d="M15.5 8.5a5 5 0 0 1 0 7M18 6a8.5 8.5 0 0 1 0 12"/>',
    volumeOff: '<path d="M11 5 6 9H3v6h3l5 4V5Z"/><path d="m16 9 5 6M21 9l-5 6"/>',
    bookmark: '<path d="M6 4h12v17l-6-4-6 4V4Z"/>',
    check: '<path d="m5 12 4 4L19 6"/>',
    flame: '<path d="M12 22c4 0 7-2.7 7-6.5 0-2.8-1.6-5.2-3.5-7.1-.4 1.6-1.3 2.7-2.5 3.4.2-3.8-1.6-7.1-4-9.3.1 3.5-1 5.6-2.4 7.4C5.2 11.4 5 12.9 5 14.5 5 19.3 8 22 12 22Z"/>',
    headphones: '<path d="M4 14v-2a8 8 0 0 1 16 0v2"/><rect x="3" y="14" width="4" height="6" rx="2"/><rect x="17" y="14" width="4" height="6" rx="2"/>',
    music: '<path d="M9 18V5l11-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="17" cy="16" r="3"/>',
    clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
    search: '<circle cx="11" cy="11" r="7"/><path d="m20 20-4-4"/>',
    close: '<path d="m6 6 12 12M18 6 6 18"/>',
    chevron: '<path d="m9 18 6-6-6-6"/>',
    layers: '<path d="m12 3 9 4.5-9 4.5-9-4.5L12 3Z"/><path d="m3 12 9 4.5 9-4.5M3 16.5 12 21l9-4.5"/>',
    chart: '<path d="M4 20V10M10 20V4M16 20v-7M22 20H2"/>',
    star: '<path d="m12 3 2.7 5.5 6.1.9-4.4 4.3 1 6.1-5.4-2.9-5.4 2.9 1-6.1-4.4-4.3 6.1-.9L12 3Z"/>',
    trophy: '<path d="M8 4h8v5a4 4 0 0 1-8 0V4Z"/><path d="M8 6H4v2a4 4 0 0 0 4 4M16 6h4v2a4 4 0 0 1-4 4M12 13v5M8 21h8"/>',
    target: '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1"/>',
    pen: '<path d="m4 20 4.3-1 11-11a2.1 2.1 0 0 0-3-3l-11 11L4 20Z"/><path d="m13.5 6.5 3 3"/>',
    download: '<path d="M12 3v12M7 10l5 5 5-5M4 21h16"/>',
    trash: '<path d="M4 7h16M9 7V4h6v3M6 7l1 14h10l1-14M10 11v6M14 11v6"/>',
    rotate: '<path d="M20 11a8 8 0 1 0-2.3 5.7M20 4v7h-7"/>',
    info: '<circle cx="12" cy="12" r="9"/><path d="M12 11v5M12 8h.01"/>',
    eye: '<path d="M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6S2 12 2 12Z"/><circle cx="12" cy="12" r="2.5"/>',
    lock: '<rect x="5" y="10" width="14" height="10" rx="2"/><path d="M8 10V7a4 4 0 0 1 8 0v3"/>',
    spark: '<path d="m12 3 1.6 5.4L19 10l-5.4 1.6L12 17l-1.6-5.4L5 10l5.4-1.6L12 3Z"/>',
    mic: '<rect x="9" y="3" width="6" height="11" rx="3"/><path d="M5 11a7 7 0 0 0 14 0M12 18v3"/>',
    calendar: '<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M8 3v4M16 3v4M3 10h18"/>',
    stop: '<rect x="6" y="6" width="12" height="12" rx="2"/>',
    external: '<path d="M14 4h6v6M20 4l-9 9"/><path d="M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5"/>',
    book: '<path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20V4a1 1 0 0 0-1-1H6.5A2.5 2.5 0 0 0 4 5.5v14Z"/><path d="M4 19.5A2.5 2.5 0 0 0 6.5 22H20v-5M8 7h8M8 11h5"/>'
  };

  function icon(name, extra = "") {
    return `<svg class="${extra}" width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">${ICONS[name] || ICONS.spark}</svg>`;
  }

  /* ------------------------------------------------------------
     State
     ------------------------------------------------------------ */
  function defaultState() {
    return {
      version: 1,
      profile: { name: "Аня", goal: 60 },
      settings: { accent: "en-US", rate: 0.9, theme: "light" },
      xp: 0,
      streak: 0,
      lastActive: null,
      completed: {},
      homework: {},
      vocab: {},
      history: [],
      activity: {},
      daily: null,
      createdAt: new Date().toISOString()
    };
  }

  function loadState() {
    const base = defaultState();
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return base;
      const saved = JSON.parse(raw);
      return {
        ...base,
        ...saved,
        profile: { ...base.profile, ...(saved.profile || {}) },
        settings: { ...base.settings, ...(saved.settings || {}) },
        completed: saved.completed || {},
        homework: saved.homework || {},
        vocab: saved.vocab || {},
        history: Array.isArray(saved.history) ? saved.history : [],
        activity: saved.activity || {},
        daily: saved.daily || null
      };
    } catch (error) {
      return base;
    }
  }

  let state = loadState();
  let storageAvailable = true;
  let storageWarned = false;

  function applyTheme() {
    const theme = state.settings.theme === "dark" ? "dark" : "light";
    document.documentElement.dataset.theme = theme;
    const button = $("[data-action='toggle-theme']");
    if (button) {
      button.setAttribute("aria-label", theme === "dark" ? "Включить светлую тему" : "Включить тёмную тему");
      button.setAttribute("title", theme === "dark" ? "Светлая тема" : "Тёмная тема");
      button.classList.toggle("is-dark", theme === "dark");
    }
    const meta = $("meta[name='theme-color']");
    if (meta) meta.setAttribute("content", theme === "dark" ? "#12100E" : "#F3EBDD");
  }

  function toggleTheme() {
    state.settings.theme = state.settings.theme === "dark" ? "light" : "dark";
    saveState();
    applyTheme();
    toast(state.settings.theme === "dark" ? "Тёмная тема включена" : "Светлая тема включена");
  }

  applyTheme();

  function saveState() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
      storageAvailable = true;
    } catch (error) {
      storageAvailable = false;
      if (!storageWarned) {
        storageWarned = true;
        setTimeout(() => toast("Браузер не сохраняет прогресс. Открой сайт через локальный сервер."), 700);
      }
    }
  }

  function dayKey(date = new Date()) {
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
  }

  function addDays(date, amount) {
    const next = new Date(date);
    next.setDate(next.getDate() + amount);
    return next;
  }

  function currentStreak() {
    if (!state.lastActive) return 0;
    const today = dayKey();
    const yesterday = dayKey(addDays(new Date(), -1));
    return state.lastActive === today || state.lastActive === yesterday ? Number(state.streak) || 0 : 0;
  }

  function recordActivity(xp = 0, minutes = 0) {
    const today = dayKey();
    if (state.lastActive !== today) {
      const yesterday = dayKey(addDays(new Date(), -1));
      state.streak = state.lastActive === yesterday ? (Number(state.streak) || 0) + 1 : 1;
      state.lastActive = today;
    }
    state.xp = Math.max(0, Number(state.xp) || 0) + xp;
    const activity = state.activity[today] || { xp: 0, minutes: 0, actions: 0 };
    activity.xp = (Number(activity.xp) || 0) + xp;
    activity.minutes = (Number(activity.minutes) || 0) + minutes;
    activity.actions = (Number(activity.actions) || 0) + 1;
    state.activity[today] = activity;
    saveState();
  }

  function ensureWord(wordId) {
    if (!state.vocab[wordId]) {
      state.vocab[wordId] = { learned: false, saved: false, reviews: 0, known: 0, updatedAt: null, interval: 0, ease: 2.5, reps: 0, lapses: 0, due: null, lastReviewed: null };
    }
    const current = state.vocab[wordId];
    if (current.interval === undefined) current.interval = 0;
    if (current.ease === undefined) current.ease = 2.5;
    if (current.reps === undefined) current.reps = 0;
    if (current.lapses === undefined) current.lapses = 0;
    if (current.due === undefined) current.due = null;
    if (current.lastReviewed === undefined) current.lastReviewed = null;
    return current;
  }

  function wordState(wordId) {
    return state.vocab[wordId] || { learned: false, saved: false, reviews: 0, known: 0, interval: 0, ease: 2.5, reps: 0, lapses: 0, due: null, lastReviewed: null };
  }

  function completion(songId) {
    return state.completed[songId] || null;
  }

  function songScore(songId) {
    return Number(completion(songId)?.best) || 0;
  }

  function isMastered(songId) {
    return songScore(songId) >= 80;
  }

  function completedCount() {
    return Object.values(state.completed).filter((item) => item && item.attempts > 0).length;
  }

  function masteredCount() {
    return Object.values(state.completed).filter((item) => item && item.best >= 80).length;
  }

  function learnedWords() {
    return ALL_WORDS.filter((word) => wordState(word.id).learned).length;
  }

  function savedWords() {
    return ALL_WORDS.filter((word) => wordState(word.id).saved).length;
  }

  function homeworkDoneCount() {
    return SONGS.reduce((sum, song) => {
      const tasks = state.homework[song.id] || {};
      return sum + Object.values(tasks).filter((task) => task && task.done).length;
    }, 0);
  }

  function levelSongs(levelId) {
    return SONGS.filter((song) => song.level === levelId);
  }

  function levelProgress(levelId) {
    const songs = levelSongs(levelId);
    const words = ALL_WORDS.filter((word) => word.level === levelId);
    const attempted = songs.filter((song) => completion(song.id)).length;
    const mastered = songs.filter((song) => isMastered(song.id)).length;
    const scorePart = songs.reduce((sum, song) => sum + songScore(song.id), 0) / (songs.length * 100);
    const coveragePart = attempted / songs.length;
    const learned = words.filter((word) => wordState(word.id).learned).length;
    const wordPart = words.length ? learned / words.length : 0;
    const pct = Math.round((scorePart * 0.55 + coveragePart * 0.15 + wordPart * 0.3) * 100);
    return {
      pct: clamp(pct, 0, 100),
      attempted,
      mastered,
      total: songs.length,
      words: words.length,
      learned
    };
  }

  function overallMastery() {
    const scorePart = SONGS.reduce((sum, song) => sum + songScore(song.id), 0) / (SONGS.length * 100);
    const wordPart = learnedWords() / ALL_WORDS.length;
    const homeworkPart = TOTAL_HOMEWORK ? homeworkDoneCount() / TOTAL_HOMEWORK : 0;
    return Math.round((scorePart * 0.5 + wordPart * 0.35 + homeworkPart * 0.15) * 100);
  }

  function homeworkTotalFor(song) {
    return song.homework.length;
  }

  function progressForSongHomework(song) {
    const tasks = state.homework[song.id] || {};
    const done = Object.values(tasks).filter((task) => task && task.done).length;
    return { done, total: homeworkTotalFor(song) };
  }

  function estimatedLevel() {
    const attemptedLevels = LEVELS.filter((level) => levelSongs(level.id).some((song) => completion(song.id)));
    if (!attemptedLevels.length) return null;
    const strongLevels = attemptedLevels.filter((level) => levelSongs(level.id).some((song) => isMastered(song.id)));
    return strongLevels.length ? strongLevels[strongLevels.length - 1] : attemptedLevels[0];
  }

  function weekStart() {
    const date = new Date();
    const day = (date.getDay() + 6) % 7;
    date.setDate(date.getDate() - day);
    date.setHours(0, 0, 0, 0);
    return dayKey(date);
  }

  function weekMinutes() {
    const start = weekStart();
    return Object.entries(state.activity).reduce((sum, [key, value]) => {
      return key >= start ? sum + (Number(value.minutes) || 0) : sum;
    }, 0);
  }

  function todayMinutes() {
    return Number(state.activity[dayKey()]?.minutes) || 0;
  }

  function reviewsToday() {
    return Number(state.activity[dayKey()]?.reviews) || 0;
  }

  function recordReviews(count) {
    const key = dayKey();
    const activity = state.activity[key] || { xp: 0, minutes: 0, actions: 0, reviews: 0 };
    activity.reviews = (Number(activity.reviews) || 0) + Math.max(0, Number(count) || 0);
    state.activity[key] = activity;
    saveState();
  }

  function dueWords() {
    const today = dayKey();
    return ALL_WORDS
      .filter((word) => {
        const current = wordState(word.id);
        return Boolean(current.due) && current.due <= today;
      })
      .sort((a, b) => String(wordState(a.id).due).localeCompare(String(wordState(b.id).due)));
  }

  function reviewDeck(limit = 12) {
    const picked = [];
    const seen = new Set();
    const add = (word) => {
      if (!word || seen.has(word.id) || picked.length >= limit) return;
      seen.add(word.id);
      picked.push(word);
    };
    dueWords().forEach(add);
    ALL_WORDS.filter((word) => {
      const current = wordState(word.id);
      return current.saved || current.learned || current.reviews > 0;
    }).forEach(add);
    const nextSong = getNextSong();
    if (nextSong) ALL_WORDS.filter((word) => word.songId === nextSong.id).forEach(add);
    ALL_WORDS.slice(0, 20).forEach(add);
    return picked;
  }

  function srsSchedule(wordId, grade) {
    const current = ensureWord(wordId);
    const value = clamp(Number(grade) || 0, 0, 3);
    let interval = Number(current.interval) || 0;
    let ease = Number(current.ease) || 2.5;
    let reps = Number(current.reps) || 0;
    let lapses = Number(current.lapses) || 0;
    const now = new Date();

    if (value === 0) {
      interval = 0;
      lapses += 1;
      reps = 0;
      current.learned = false;
      current.known = 0;
      ease = clamp(ease - 0.2, 1.3, 3);
    } else {
      if (interval <= 0) interval = value === 1 ? 1 : value === 2 ? 2 : 4;
      else {
        const factor = value === 1 ? 1.15 : value === 2 ? ease : Math.min(3.2, ease * 1.25);
        interval = Math.max(1, Math.round(interval * factor));
      }
      interval = Math.min(180, interval);
      ease = clamp(ease + (value === 1 ? -0.15 : value === 3 ? 0.1 : 0), 1.3, 3);
      reps += 1;
      if (value >= 2) {
        current.learned = true;
        current.known = (Number(current.known) || 0) + 1;
      } else {
        current.learned = false;
      }
    }

    current.reviews = (Number(current.reviews) || 0) + 1;
    current.interval = interval;
    current.ease = Number(ease.toFixed(2));
    current.reps = reps;
    current.lapses = lapses;
    current.due = dayKey(addDays(now, value === 0 ? 0 : interval));
    current.lastReviewed = now.toISOString();
    current.updatedAt = now.toISOString();
    return current;
  }

  const DAILY_STEP_DEFS = [
    { id: "review", title: "Повторить слова", minutes: 4 },
    { id: "listen", title: "Послушать превью", minutes: 2 },
    { id: "quiz", title: "Пройти мини-квиз", minutes: 5 },
    { id: "homework", title: "Сделать задание", minutes: 4 }
  ];

  function dailyPlan() {
    const today = dayKey();
    if (!state.daily || state.daily.date !== today) {
      state.daily = { date: today, steps: {}, completedAt: null };
      saveState();
    }
    return state.daily;
  }

  function dailyDoneCount() {
    const plan = dailyPlan();
    return DAILY_STEP_DEFS.filter((step) => plan.steps[step.id]).length;
  }

  function completeDailyStep(stepId) {
    const plan = dailyPlan();
    if (plan.steps[stepId]) return false;
    plan.steps[stepId] = new Date().toISOString();
    const done = dailyDoneCount();
    if (done === DAILY_STEP_DEFS.length && !plan.completedAt) {
      plan.completedAt = new Date().toISOString();
      recordActivity(25, 0);
      toast("15 минут собраны. +25 XP за сегодняшний план");
    } else {
      saveState();
    }
    refreshDailyPlanUI();
    return true;
  }

  function refreshDailyPlanUI() {
    const done = dailyDoneCount();
    $$("[data-daily-count]").forEach((element) => { element.textContent = String(done); });
    $$("[data-daily-bar]").forEach((element) => { element.style.width = `${(done / DAILY_STEP_DEFS.length) * 100}%`; });
    $$("[data-plan-step]").forEach((element) => {
      const doneStep = Boolean(dailyPlan().steps[element.dataset.planStep]);
      element.classList.toggle("is-done", doneStep);
      const check = $("[data-plan-check]", element);
      if (check) check.innerHTML = doneStep ? icon("check") : "";
    });
  }

  function planSteps() {
    const song = getNextSong();
    return DAILY_STEP_DEFS.map((step) => {
      if (step.id === "review") {
        const due = dueWords().length;
        const deck = reviewDeck(12).length;
        return { ...step, meta: due ? `${due} ${plural(due, "слово", "слова", "слов")} к повторению` : `${deck} ${plural(deck, "слово", "слова", "слов")} в подходе`, href: "#/review", cta: "Повторить" };
      }
      if (step.id === "listen") {
        return { ...step, meta: `${song.title} · ${song.artist}`, action: "play-preview", songId: song.id, cta: "Включить" };
      }
      if (step.id === "quiz") {
        return { ...step, meta: `${song.quiz.length} вопросов · ${song.title}`, action: "start-quiz", songId: song.id, cta: "Начать" };
      }
      return { ...step, meta: `${song.homework.length} заданий · ${song.title}`, href: `#/song/${song.id}/homework`, cta: "Открыть" };
    });
  }

  function getNextSong() {
    if (state.history.length) {
      const lastId = state.history[0].songId;
      const lastSong = SONG_BY_ID[lastId];
      if (lastSong && !isMastered(lastId)) return lastSong;
    }
    const unfinished = SONGS.find((song) => completion(song.id) && !isMastered(song.id));
    if (unfinished) return unfinished;
    const untouched = SONGS.find((song) => !completion(song.id));
    if (untouched) return untouched;
    return SONGS[0];
  }

  function wordOfTheDay() {
    const days = Math.floor(Date.now() / 86400000);
    return ALL_WORDS[days % ALL_WORDS.length];
  }

  /* ------------------------------------------------------------
     Formatting helpers
     ------------------------------------------------------------ */
  const MONTHS = ["янв", "фев", "мар", "апр", "мая", "июн", "июл", "авг", "сен", "окт", "ноя", "дек"];
  const MONTHS_LONG = ["января", "февраля", "марта", "апреля", "мая", "июня", "июля", "августа", "сентября", "октября", "ноября", "декабря"];

  function formatDate(value) {
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return "";
    return `${date.getDate()} ${MONTHS[date.getMonth()]}`;
  }

  function formatFullDate(date) {
    return `${date.getDate()} ${MONTHS_LONG[date.getMonth()]}`;
  }

  function formatNumber(value) {
    return new Intl.NumberFormat("ru-RU").format(Number(value) || 0);
  }

  function plural(count, one, few, many) {
    const mod10 = count % 10;
    const mod100 = count % 100;
    if (mod10 === 1 && mod100 !== 11) return one;
    if (mod10 >= 2 && mod10 <= 4 && (mod100 < 10 || mod100 >= 20)) return few;
    return many;
  }

  function levelVars(level) {
    return `--lv:${level.color};--lv-tint:${level.tint}`;
  }

  function coverMarkup(song, extraClass = "") {
    const level = LEVEL_BY_ID[song.level];
    return `<div class="cover ${extraClass}" data-motif="${song.cover.motif}" style="--c1:${song.cover.bg1};--c2:${song.cover.bg2};--c-ink:${song.cover.ink};--c-accent:${song.cover.accent}" role="img" aria-label="Обложка: ${attr(song.title)} — ${attr(song.artist)}">
      <div class="cover__orb"></div>
      <div class="cover__line"></div>
      <div class="cover__top"><span class="cover__level">${level.code}</span><span class="cover__year">${song.year}</span></div>
      <div class="cover__title">${esc(song.title)}</div>
      <div class="cover__artist">${esc(song.artist)}</div>
    </div>`;
  }

  function songLinks(song) {
    const query = encodeURIComponent(`${song.title} ${song.artist}`);
    return {
      apple: `https://music.apple.com/us/search?term=${query}`,
      spotify: `https://open.spotify.com/search/${query}`
    };
  }

  function previewButtonMarkup(song, className = "btn btn--accent") {
    const current = musicState.songId === song.id;
    const loading = current && musicState.loading;
    const playing = current && musicState.playing;
    return `<button class="${className} ${current ? "is-current" : ""} ${loading ? "is-loading" : ""}" type="button" data-action="play-preview" data-preview-song="${song.id}">
      <span class="preview-button__icon ${loading ? "is-spinning" : ""}" data-preview-icon>${icon(loading ? "clock" : playing ? "pause" : "play")}</span>
      <span data-preview-label>${loading ? "Загружаем превью…" : playing ? "Пауза" : current ? "Продолжить" : "Слушать превью"}</span>
      <small>30 сек</small>
    </button>`;
  }

  function hasFullTrack(songId) {
    return Boolean(YOUTUBE_VIDEOS[songId]);
  }

  function youtubeWatchUrl(songId) {
    const videoId = YOUTUBE_VIDEOS[songId];
    return videoId ? `https://www.youtube.com/watch?v=${videoId}` : "";
  }

  function fullTrackButtonMarkup(song, className = "btn btn--ghost") {
    const url = youtubeWatchUrl(song.id);
    if (!url) return "";
    return `<a class="${className}" href="${attr(url)}" target="_blank" rel="noopener noreferrer">
      <span class="preview-button__icon">${icon("external")}</span>
      <span>Полная песня</span>
      <small>YouTube</small>
    </a>`;
  }

  function levelBadge(level) {
    return `<span class="level-badge" style="--lv:${level.color};--lv-tint:${level.tint}">${level.code}</span>`;
  }

  /* ------------------------------------------------------------
     Speech
     ------------------------------------------------------------ */
  const synth = "speechSynthesis" in window ? window.speechSynthesis : null;
  let voices = [];
  let audioSequence = null;
  let audioToken = 0;
  let spokenButton = null;

  function refreshVoices() {
    if (!synth) return;
    const next = synth.getVoices();
    if (next.length) voices = next;
  }

  if (synth) {
    refreshVoices();
    if (typeof synth.addEventListener === "function") {
      synth.addEventListener("voiceschanged", refreshVoices);
    }
  }

  function pickVoice(lang) {
    if (!voices.length) refreshVoices();
    const exact = voices.filter((voice) => voice.lang && voice.lang.toLowerCase() === lang.toLowerCase());
    const sameLanguage = voices.filter((voice) => voice.lang && voice.lang.toLowerCase().startsWith(lang.slice(0, 2).toLowerCase()));
    const pool = exact.length ? exact : sameLanguage;
    return pool.find((voice) => voice.localService) || pool[0] || null;
  }

  function showAudioDock(label) {
    const dock = $("#audioDock");
    if (!dock) return;
    $("#audioDockLabel").textContent = label;
    dock.hidden = false;
  }

  function hideAudioDock() {
    const dock = $("#audioDock");
    if (dock) dock.hidden = true;
  }

  function clearSpokenButton() {
    if (spokenButton) spokenButton.classList.remove("is-speaking");
    spokenButton = null;
  }

  function stopAudio(showToast = false) {
    audioToken += 1;
    audioSequence = null;
    clearSpokenButton();
    hideAudioDock();
    if (synth) synth.cancel();
    if (showToast) toast("Озвучка остановлена");
  }

  function speak(text, options = {}) {
    if (!synth) {
      toast("В этом браузере нет озвучки. Попробуй Chrome или Edge.");
      return;
    }
    const phrase = String(text || "").trim();
    if (!phrase) return;
    pauseMusicForSpeech();
    audioToken += 1;
    const token = audioToken;
    audioSequence = null;
    clearSpokenButton();
    if (synth.speaking || synth.pending) synth.cancel();

    const utterance = new SpeechSynthesisUtterance(phrase);
    utterance.lang = state.settings.accent;
    utterance.rate = Number(options.rate || state.settings.rate || 0.9);
    utterance.pitch = 1;
    const voice = pickVoice(utterance.lang);
    if (voice) utterance.voice = voice;

    if (options.button) {
      spokenButton = options.button;
      spokenButton.classList.add("is-speaking");
    }
    showAudioDock(phrase);

    utterance.onend = () => {
      if (token !== audioToken) return;
      clearSpokenButton();
      if (!audioSequence) hideAudioDock();
    };
    utterance.onerror = () => {
      if (token !== audioToken) return;
      clearSpokenButton();
      hideAudioDock();
    };
    synth.speak(utterance);
  }

  function speakSequence(items, label = "Озвучка") {
    if (!synth) {
      toast("В этом браузере нет озвучки. Попробуй Chrome или Edge.");
      return;
    }
    const phrases = items.filter(Boolean);
    if (!phrases.length) {
      toast("Здесь пока нет слов для озвучки");
      return;
    }
    pauseMusicForSpeech();
    audioToken += 1;
    const token = audioToken;
    clearSpokenButton();
    if (synth.speaking || synth.pending) synth.cancel();
    audioSequence = { index: 0 };
    showAudioDock(`${label}: ${phrases.length} ${plural(phrases.length, "слово", "слова", "слов")}`);

    const next = () => {
      if (token !== audioToken || !audioSequence) return;
      if (audioSequence.index >= phrases.length) {
        audioSequence = null;
        hideAudioDock();
        return;
      }
      const phrase = phrases[audioSequence.index];
      $("#audioDockLabel").textContent = `${label} · ${audioSequence.index + 1} из ${phrases.length} · ${phrase}`;
      const utterance = new SpeechSynthesisUtterance(phrase);
      utterance.lang = state.settings.accent;
      utterance.rate = Math.max(0.7, Number(state.settings.rate || 0.9) - 0.05);
      const voice = pickVoice(utterance.lang);
      if (voice) utterance.voice = voice;
      utterance.onend = () => {
        if (token !== audioToken) return;
        if (!audioSequence) return;
        audioSequence.index += 1;
        setTimeout(next, 140);
      };
      utterance.onerror = () => {
        if (token !== audioToken) return;
        audioSequence = null;
        hideAudioDock();
      };
      synth.speak(utterance);
    };
    next();
  }

  /* ------------------------------------------------------------
     30-second official previews + persistent player
     ------------------------------------------------------------ */
  const PREVIEW_CACHE_KEY = "lyrica:previews:v1";
  const PREVIEW_CACHE_TTL = 7 * 24 * 60 * 60 * 1000;
  const audioEl = document.getElementById("previewAudio");
  const musicPlayer = document.getElementById("musicPlayer");
  const previewRequests = new Map();
  let previewCache = loadPreviewCache();
  let musicRequestId = 0;
  let musicState = {
    songId: null,
    meta: null,
    loading: false,
    playing: false,
    error: null,
    duration: 30,
    loop: false,
    rate: 1,
    muted: false
  };

  let lab = {
    songId: null,
    targetIndex: 0,
    caught: 0,
    abStart: 0,
    abEnd: 30,
    abActive: false,
    recording: false,
    recorder: null,
    stream: null,
    chunks: [],
    recognition: null,
    transcript: "",
    recordingUrl: null
  };

  function loadPreviewCache() {
    try {
      const parsed = JSON.parse(localStorage.getItem(PREVIEW_CACHE_KEY) || "{}");
      return parsed && typeof parsed === "object" ? parsed : {};
    } catch (error) {
      return {};
    }
  }

  function savePreviewCache() {
    try {
      localStorage.setItem(PREVIEW_CACHE_KEY, JSON.stringify(previewCache));
    } catch (error) {
      // Preview URL caching is optional: playback still works without it.
    }
  }

  function normalizeForMatch(value) {
    return String(value || "")
      .toLowerCase()
      .normalize("NFD")
      .replace(/\p{M}/gu, "")
      .replace(/[’'`]/g, "")
      .replace(/[^a-z0-9]+/g, " ")
      .trim();
  }

  function choosePreviewResult(song, results) {
    const targetTitle = normalizeForMatch(song.title);
    const targetArtist = normalizeForMatch(song.artist);
    let best = null;
    let bestScore = -1;
    (results || []).forEach((result) => {
      if (!result || !result.previewUrl) return;
      const title = normalizeForMatch(result.trackName);
      const artist = normalizeForMatch(result.artistName);
      if (!title) return;
      let score = 0;
      if (title === targetTitle) score += 120;
      else if (title.includes(targetTitle) || targetTitle.includes(title)) score += 70;
      else {
        const targetTokens = targetTitle.split(" ").filter((token) => token.length > 2);
        const hits = targetTokens.filter((token) => title.includes(token)).length;
        if (hits >= Math.min(2, targetTokens.length)) score += 25;
      }
      if (artist === targetArtist) score += 100;
      else if (artist.includes(targetArtist) || targetArtist.includes(artist)) score += 70;
      else if (artist.split(" ")[0] && targetArtist.includes(artist.split(" ")[0])) score += 25;
      if (score > bestScore) {
        best = result;
        bestScore = score;
      }
    });
    if (!best || bestScore < 40) return null;
    return {
      previewUrl: best.previewUrl,
      trackViewUrl: best.trackViewUrl || songLinks(song).apple,
      artworkUrl100: best.artworkUrl100 || "",
      trackName: best.trackName || song.title,
      artistName: best.artistName || song.artist,
      fetchedAt: Date.now()
    };
  }

  function getPreview(song) {
    const cached = previewCache[song.id];
    if (cached && cached.previewUrl && Date.now() - Number(cached.fetchedAt) < PREVIEW_CACHE_TTL) {
      return Promise.resolve(cached);
    }
    if (previewRequests.has(song.id)) return previewRequests.get(song.id);

    const promise = new Promise((resolve, reject) => {
      const callbackName = `lyricaPreview_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
      const script = document.createElement("script");
      let settled = false;
      let timer = null;
      const cleanup = () => {
        if (settled) return;
        settled = true;
        if (timer) clearTimeout(timer);
        script.remove();
        try {
          delete window[callbackName];
        } catch (error) {
          window[callbackName] = undefined;
        }
      };
      window[callbackName] = (payload) => {
        cleanup();
        const picked = choosePreviewResult(song, payload && payload.results);
        if (!picked) {
          reject(new Error("no-preview"));
          return;
        }
        previewCache[song.id] = picked;
        savePreviewCache();
        resolve(picked);
      };
      script.onerror = () => {
        cleanup();
        reject(new Error("network"));
      };
      timer = setTimeout(() => {
        cleanup();
        reject(new Error("timeout"));
      }, 12000);
      const query = encodeURIComponent(`${song.title} ${song.artist}`);
      script.src = `https://itunes.apple.com/search?term=${query}&media=music&entity=song&limit=10&country=US&callback=${callbackName}`;
      document.head.appendChild(script);
    });

    previewRequests.set(song.id, promise);
    promise.catch(() => {}).finally(() => previewRequests.delete(song.id));
    return promise;
  }

  function formatClock(value) {
    const total = Math.max(0, Math.floor(Number(value) || 0));
    const minutes = Math.floor(total / 60);
    const seconds = total % 60;
    return `${minutes}:${String(seconds).padStart(2, "0")}`;
  }

  function previewErrorMessage(error) {
    if (error && error.message === "network") return "Нет связи с Apple Music. Проверь интернет и попробуй ещё раз.";
    if (error && error.message === "timeout") return "Apple Music не ответил вовремя. Попробуй ещё раз.";
    return "Не удалось найти превью этой песни. Попробуй ещё раз или открой полную версию.";
  }

  function renderMusicPlayer() {
    if (!musicPlayer) return;
    if (!musicState.songId) {
      musicPlayer.hidden = true;
      document.body.classList.remove("music-open");
      return;
    }
    const song = SONG_BY_ID[musicState.songId];
    if (!song) return;
    const meta = musicState.meta;
    const youtubeUrl = youtubeWatchUrl(song.id);
    const fullLink = youtubeUrl || meta?.trackViewUrl || songLinks(song).apple;
    const hasError = Boolean(musicState.error);
    const duration = musicState.duration || 30;
    const current = audioEl && Number.isFinite(audioEl.currentTime) ? audioEl.currentTime : 0;
    const progress = duration ? clamp((current / duration) * 1000, 0, 1000) : 0;
    musicPlayer.hidden = false;
    document.body.classList.add("music-open");
    musicPlayer.innerHTML = `<div class="music-player__inner">
      <div class="music-player__cover" aria-hidden="true">${coverMarkup(song)}</div>
      <div class="music-player__copy">
        <div class="music-player__eyebrow">${icon("headphones")} ${hasError ? "Превью недоступно" : musicState.loading ? "Загружаем официальное превью" : "30-секундное превью · Apple Music"}</div>
        <div class="music-player__title"><b>${esc(song.title)}</b><span>${esc(song.artist)}</span></div>
        ${hasError
          ? `<p class="music-player__error">${esc(musicState.error)}</p>`
          : `<div class="music-player__timeline">
              <span id="musicCurrent">${formatClock(current)}</span>
              <input id="musicSeek" class="music-seek" type="range" min="0" max="1000" step="1" value="${progress}" aria-label="Перемотка превью">
              <span id="musicDuration">${musicState.loading ? "0:30" : formatClock(duration)}</span>
            </div>`}
      </div>
      <div class="music-player__controls">
        ${hasError
          ? `<button class="music-control music-control--text" type="button" data-action="music-retry">Повторить</button>
             ${hasFullTrack(song.id) ? `<a class="music-control" href="${attr(fullLink)}" target="_blank" rel="noopener noreferrer" aria-label="Открыть полную песню на YouTube" title="Полная песня на YouTube">${icon("external")}</a>` : `<a class="music-control" href="${attr(fullLink)}" target="_blank" rel="noopener noreferrer" aria-label="Открыть полную версию" title="Полная версия">${icon("external")}</a>`}
             <button class="music-control" type="button" data-action="music-close" aria-label="Закрыть плеер">${icon("close")}</button>`
          : `<button class="music-control" type="button" data-action="music-back" aria-label="Назад на 10 секунд">${icon("arrowLeft")}<small>10</small></button>
             <button class="music-play" type="button" data-action="music-toggle" aria-label="${musicState.playing ? "Пауза" : "Играть"}">
               ${musicState.loading ? '<span class="music-spinner" aria-hidden="true"></span>' : icon(musicState.playing ? "pause" : "play")}
             </button>
             <button class="music-control" type="button" data-action="music-forward" aria-label="Вперёд на 10 секунд">${icon("arrow")}<small>10</small></button>
             <button class="music-control ${musicState.loop ? "is-active" : ""}" type="button" data-action="music-loop" aria-label="Повторять превью" title="Повтор">${icon("rotate")}</button>
             <button class="music-control music-control--rate" type="button" data-action="music-rate" aria-label="Скорость ${musicState.rate === 1 ? "0,8" : "1"}×" title="Скорость">${musicState.rate === 1 ? "1×" : "0,8×"}</button>
             <button class="music-control" type="button" data-action="music-mute" aria-label="${musicState.muted ? "Включить звук" : "Выключить звук"}">${icon(musicState.muted ? "volumeOff" : "volume")}</button>
             <a class="music-control" href="${attr(fullLink)}" target="_blank" rel="noopener noreferrer" aria-label="${youtubeUrl ? "Открыть полную песню на YouTube" : "Открыть полную версию"}" title="${youtubeUrl ? "Полная песня на YouTube" : "Полная версия"}">${icon("external")}</a>
             <button class="music-control" type="button" data-action="music-close" aria-label="Закрыть плеер">${icon("close")}</button>`}
      </div>
    </div>`;
  }

  function syncMusicProgress() {
    if (!musicState.songId || !audioEl) return;
    const duration = audioEl.duration && Number.isFinite(audioEl.duration) ? audioEl.duration : musicState.duration || 30;
    const current = Number.isFinite(audioEl.currentTime) ? audioEl.currentTime : 0;
    const seek = document.getElementById("musicSeek");
    const currentLabel = document.getElementById("musicCurrent");
    const durationLabel = document.getElementById("musicDuration");
    if (seek) seek.value = String(duration ? clamp((current / duration) * 1000, 0, 1000) : 0);
    if (currentLabel) currentLabel.textContent = formatClock(current);
    if (durationLabel) durationLabel.textContent = formatClock(duration);
    syncLabProgress();
  }

  function updatePreviewButtons() {
    $$("[data-preview-song]").forEach((button) => {
      const songId = button.dataset.previewSong;
      const current = musicState.songId === songId;
      const loading = current && musicState.loading;
      const playing = current && musicState.playing;
      const isCover = button.classList.contains("cover-play");
      button.classList.toggle("is-current", current);
      button.classList.toggle("is-loading", loading);
      const iconSlot = button.querySelector("[data-preview-icon]");
      const labelSlot = button.querySelector("[data-preview-label]");
      if (iconSlot) {
        iconSlot.innerHTML = loading ? icon("clock") : icon(playing ? "pause" : "play");
        iconSlot.classList.toggle("is-spinning", loading);
      }
      if (labelSlot) {
        labelSlot.textContent = loading ? "Загрузка…" : playing ? "Пауза" : isCover ? "Превью" : current ? "Продолжить" : "Слушать превью";
      }
      button.setAttribute("aria-label", loading ? "Загружаем превью" : playing ? "Поставить на паузу" : "Слушать 30-секундное превью");
    });
  }

  function pauseMusicForSpeech() {
    if (audioEl && !audioEl.paused && musicState.songId) audioEl.pause();
  }

  function playPreview(songId) {
    if (musicState.songId === songId) {
      if (musicState.error) {
        retryMusic();
        return;
      }
      if (musicState.loading) return;
      toggleMusic();
      return;
    }
    startMusic(songId);
  }

  function startMusic(songId) {
    const song = SONG_BY_ID[songId];
    if (!song) return;
    const token = ++musicRequestId;
    if (audioEl) {
      audioEl.pause();
      audioEl.removeAttribute("src");
    }
    stopAudio();
    musicState = {
      songId,
      meta: null,
      loading: true,
      playing: false,
      error: null,
      duration: 30,
      loop: musicState.loop,
      rate: musicState.rate,
      muted: musicState.muted
    };
    renderMusicPlayer();
    updatePreviewButtons();
    getPreview(song).then((meta) => {
      if (token !== musicRequestId || musicState.songId !== songId) return;
      musicState.meta = meta;
      musicState.loading = false;
      musicState.error = null;
      audioEl.src = meta.previewUrl;
      audioEl.loop = musicState.loop;
      audioEl.playbackRate = musicState.rate;
      audioEl.muted = musicState.muted;
      audioEl.volume = 0.9;
      renderMusicPlayer();
      const playPromise = audioEl.play();
      if (playPromise && typeof playPromise.catch === "function") {
        playPromise.catch(() => {
          if (token !== musicRequestId) return;
          musicState.playing = false;
          renderMusicPlayer();
          updatePreviewButtons();
          toast("Превью готово. Нажми ▶ в плеере, чтобы включить.");
        });
      }
    }).catch((error) => {
      if (token !== musicRequestId || musicState.songId !== songId) return;
      musicState.loading = false;
      musicState.playing = false;
      musicState.error = previewErrorMessage(error);
      renderMusicPlayer();
      updatePreviewButtons();
      toast("Не удалось загрузить превью", "error");
    });
  }

  function toggleMusic() {
    if (!musicState.songId || !audioEl) return;
    if (musicState.loading) return;
    if (!audioEl.src) {
      startMusic(musicState.songId);
      return;
    }
    if (audioEl.paused) {
      const playPromise = audioEl.play();
      if (playPromise && typeof playPromise.catch === "function") {
        playPromise.catch(() => toast("Браузер не дал включить звук. Нажми ▶ ещё раз.", "error"));
      }
    } else {
      audioEl.pause();
    }
  }

  function retryMusic() {
    const songId = musicState.songId;
    if (!songId) return;
    delete previewCache[songId];
    savePreviewCache();
    musicState.songId = null;
    musicState.meta = null;
    musicState.error = null;
    startMusic(songId);
  }

  function closeMusic() {
    musicRequestId += 1;
    if (audioEl) {
      audioEl.pause();
      audioEl.removeAttribute("src");
      audioEl.load();
    }
    musicState = {
      songId: null,
      meta: null,
      loading: false,
      playing: false,
      error: null,
      duration: 30,
      loop: musicState.loop,
      rate: musicState.rate,
      muted: musicState.muted
    };
    updatePreviewButtons();
    renderMusicPlayer();
  }

  /* ------------------------------------------------------------
     Listening Lab
     ------------------------------------------------------------ */
  function ensureLab(songId) {
    if (lab.songId === songId) return lab;
    stopLabRecording(true);
    lab = {
      songId,
      targetIndex: 0,
      caught: 0,
      caughtWords: {},
      abStart: 0,
      abEnd: 30,
      abActive: false,
      recording: false,
      recorder: null,
      stream: null,
      chunks: [],
      recognition: null,
      transcript: "",
      recordingUrl: null,
      recordTimer: null
    };
    return lab;
  }

  function labWords() {
    return ALL_WORDS.filter((word) => word.songId === lab.songId);
  }

  function labTarget() {
    const words = labWords();
    if (!words.length) return null;
    return words[lab.targetIndex % words.length];
  }

  function renderLabSection(song) {
    ensureLab(song.id);
    const target = labTarget();
    const word = target || { word: song.title, ru: "", example: "" };
    const phrase = word.example || word.word;
    const songWords = labWords();
    return `<section class="lesson-block lab-block" id="lab" data-lesson-section="lab" data-lab-root data-song="${song.id}">
      <div class="lesson-head">
        <div><div class="eyebrow">Listening Lab · 30 секунд</div><h2>Слушай внимательнее,<br><em>чем когда-либо</em>.</h2><p>Официальное превью, A/B-луп, игра на внимание и запись голоса. Всё прямо в браузере — без скачивания и переходов.</p></div>
        <div class="lesson-head__aside"><span class="level-badge">${icon("headphones")} практика</span></div>
      </div>
      <div class="lab-grid">
        <article class="lab-player panel">
          <div class="lab-player__head">
            <div class="lab-player__cover">${coverMarkup(song)}</div>
            <div><div class="eyebrow">Превью · Apple Music</div><h3>${esc(song.title)}</h3><p>${esc(song.artist)} · ${esc(song.duration)}</p></div>
            <button class="lab-play" type="button" data-action="play-preview" data-preview-song="${song.id}" aria-label="Включить превью">${icon("play")}</button>
          </div>
          <div class="lab-track">
            <div class="lab-track__line"><i data-lab-progress style="width:0%"></i><span data-lab-marker-a class="lab-marker" style="left:0%">A</span><span data-lab-marker-b class="lab-marker" style="left:100%">B</span></div>
            <div class="lab-track__labels"><span data-lab-current>0:00</span><span data-lab-duration>0:30</span></div>
          </div>
          <div class="lab-controls">
            <div class="lab-ab"><button type="button" data-action="lab-set-a">A</button><button type="button" data-action="lab-set-b">B</button><button type="button" class="is-loop" data-action="lab-loop">${icon("rotate")} Луп</button></div>
            <div class="lab-rates"><span>Скорость</span><button type="button" data-action="lab-rate" data-rate="0.6">0,6×</button><button type="button" data-action="lab-rate" data-rate="0.8">0,8×</button><button type="button" class="is-active" data-action="lab-rate" data-rate="1">1×</button></div>
          </div>
          <p class="lab-hint" data-lab-status>${icon("info")} Поставь A и B на середине превью — и слушай один и тот же отрезок по кругу.</p>
        </article>

        <article class="lab-game panel" data-lab-game>
          <div class="eyebrow">Игра · поймай слово</div>
          <div class="lab-game__target"><b data-lab-word>${esc(word.word)}</b><button class="sound-btn" type="button" data-action="speak-word" data-say="${attr(word.word)}" aria-label="Прослушать слово">${icon("volume")}</button></div>
          <p data-lab-word-ru>${esc(word.ru) || "Слушай превью и лови знакомое слово."}</p>
          <div class="lab-game__score"><span>Поймано</span><b data-lab-caught>${lab.caught}</b></div>
          <div class="lab-game__actions">
            <button class="btn btn--ghost btn--sm" type="button" data-action="lab-new-word">Другое слово</button>
            <button class="btn btn--primary btn--sm" type="button" data-action="lab-catch">${icon("target")} Поймал</button>
          </div>
          <small>Игра на внимание: нажми «Поймал», когда услышишь слово. Не страшно ошибиться — вернись к началу и попробуй ещё.</small>
        </article>

        <article class="lab-speak panel">
          <div class="eyebrow">Говорение · shadowing</div>
          <h3>Повтори как в песне</h3>
          <p class="lab-speak__phrase">${esc(phrase)}</p>
          <div class="lab-speak__target"><span>Слово</span><b>${esc(word.word)}</b><button class="sound-btn" type="button" data-action="speak-word" data-say="${attr(word.word)}" aria-label="Прослушать слово">${icon("volume")}</button></div>
          <div class="lab-speak__actions">
            <button class="btn btn--primary btn--sm" type="button" data-action="lab-record">${icon("mic")} Записать</button>
            <button class="btn btn--ghost btn--sm" type="button" data-action="lab-stop-record" hidden>${icon("stop")} Остановить</button>
          </div>
          <audio id="labRecordingAudio" controls hidden></audio>
          <div class="lab-speech" data-lab-speech><span>Скажи слово вслух — браузер попробует распознать его.</span></div>
          <small>Запись остаётся в браузере и никуда не отправляется. Нужен микрофон и разрешение.</small>
        </article>
      </div>
      </section>`;
  }

  function labStatus(text) {
    const node = $("[data-lab-status]");
    if (node) node.innerHTML = `${icon("info")} ${esc(text)}`;
  }

  function syncLabProgress() {
    const root = $("[data-lab-root]");
    if (!root) return;
    const duration = (audioEl && Number.isFinite(audioEl.duration) && audioEl.duration) || 30;
    const current = (audioEl && Number.isFinite(audioEl.currentTime) && audioEl.currentTime) || 0;
    const pct = clamp((current / duration) * 100, 0, 100);
    const progress = $("[data-lab-progress]", root);
    if (progress) progress.style.width = `${pct}%`;
    const currentLabel = $("[data-lab-current]", root);
    if (currentLabel) currentLabel.textContent = formatClock(current);
    const durationLabel = $("[data-lab-duration]", root);
    if (durationLabel) durationLabel.textContent = formatClock(duration);
    const a = $("[data-lab-marker-a]", root);
    const b = $("[data-lab-marker-b]", root);
    if (a) a.style.left = `${clamp((lab.abStart / duration) * 100, 0, 100)}%`;
    if (b) b.style.left = `${clamp((lab.abEnd / duration) * 100, 0, 100)}%`;
    const play = $(".lab-play", root);
    if (play) {
      const isPlaying = musicState.songId === lab.songId && musicState.playing;
      play.innerHTML = icon(isPlaying ? "pause" : "play");
      play.setAttribute("aria-label", isPlaying ? "Пауза" : "Включить превью");
    }
    $$("[data-action='lab-rate']", root).forEach((button) => button.classList.toggle("is-active", Number(button.dataset.rate) === Number(musicState.rate)));
    $$("[data-action='lab-loop']", root).forEach((button) => button.classList.toggle("is-active", lab.abActive));
    if (!musicState.songId || musicState.songId !== lab.songId || !lab.abActive || lab.abEnd <= lab.abStart) return;
    if (current >= lab.abEnd - 0.03) {
      audioEl.currentTime = lab.abStart;
      if (audioEl.paused) audioEl.play().catch(() => {});
    } else if (current < lab.abStart - 0.25) {
      audioEl.currentTime = lab.abStart;
    }
  }

  function setLabA() {
    if (!audioEl) return;
    const current = Number.isFinite(audioEl.currentTime) ? audioEl.currentTime : 0;
    lab.abStart = clamp(current, 0, Math.max(0, lab.abEnd - 1));
    lab.abActive = false;
    syncLabProgress();
    labStatus(`A = ${formatClock(lab.abStart)}. Теперь поставь B и включи луп.`);
  }

  function setLabB() {
    if (!audioEl) return;
    const current = Number.isFinite(audioEl.currentTime) ? audioEl.currentTime : 30;
    lab.abEnd = clamp(Math.max(current, lab.abStart + 1), 1, 30);
    lab.abActive = false;
    syncLabProgress();
    labStatus(`Границы ${formatClock(lab.abStart)}–${formatClock(lab.abEnd)}. Нажми «Луп», чтобы слушать по кругу.`);
  }

  function toggleLabLoop() {
    if (!audioEl) return;
    if (lab.abStart >= lab.abEnd) {
      lab.abStart = 0;
      lab.abEnd = 30;
    }
    lab.abActive = !lab.abActive;
    if (lab.abActive && audioEl.currentTime < lab.abStart) audioEl.currentTime = lab.abStart;
    syncLabProgress();
    labStatus(lab.abActive ? `Луп ${formatClock(lab.abStart)}–${formatClock(lab.abEnd)} включён.` : "Луп выключен.");
  }

  function setLabRate(rate) {
    const value = clamp(Number(rate) || 1, 0.5, 1);
    musicState.rate = value;
    if (audioEl) audioEl.playbackRate = value;
    syncLabProgress();
    labStatus(`Скорость ${value}×. Слушай фразы медленнее и повторяй.`);
  }

  function newLabWord() {
    const words = labWords();
    if (!words.length) return;
    lab.targetIndex = (lab.targetIndex + 1) % words.length;
    const word = labTarget();
    const wordNode = $("[data-lab-word]");
    const ruNode = $("[data-lab-word-ru]");
    if (wordNode) wordNode.textContent = word.word;
    if (ruNode) ruNode.textContent = word.ru;
    labStatus("Новое слово. Включи превью и слушай.");
  }

  function catchLabWord() {
    const word = labTarget();
    if (!word) return;
    if (lab.caughtWords[word.id]) {
      labStatus("Это слово уже поймано. Попробуй другое.");
      return;
    }
    lab.caughtWords[word.id] = true;
    lab.caught += 1;
    const node = $("[data-lab-caught]");
    if (node) node.textContent = String(lab.caught);
    recordActivity(2, 1);
    labStatus(`Поймал «${word.word}». Ещё одно?`);
    toast(`Поймал: ${word.word}`);
  }

  function updateLabRecordingUI(recording) {
    const record = $("[data-action='lab-record']");
    const stop = $("[data-action='lab-stop-record']");
    if (record) record.hidden = recording;
    if (stop) stop.hidden = !recording;
    const speech = $("[data-lab-speech]");
    if (speech && recording) speech.innerHTML = `<span class="is-recording">${icon("mic")} Слушаю… скажи «${esc(labTarget()?.word || "слово")}».</span>`;
  }

  function labSpeechResult() {
    const node = $("[data-lab-speech]");
    if (!node) return;
    const word = labTarget()?.word || "";
    const heard = normalizeForMatch(lab.transcript);
    const target = normalizeForMatch(word);
    const matched = target && heard.includes(target);
    node.innerHTML = lab.transcript
      ? `${matched ? icon("check") : icon("info")} <b>${matched ? "Совпало" : "Почти"}:</b> «${esc(lab.transcript)}»${matched ? "" : `<span>Цель: «${esc(word)}». Попробуй ещё раз, медленнее.</span>`}`
      : `<span>${icon("info")} Распознавание не дало текста. Попробуй ещё раз или просто послушай запись.</span>`;
    node.classList.toggle("is-match", Boolean(matched));
  }

  async function startLabRecording() {
    if (lab.recording) return;
    if (!navigator.mediaDevices?.getUserMedia || !window.MediaRecorder) {
      const speech = $("[data-lab-speech]");
      if (speech) speech.innerHTML = `<span>${icon("info")} Микрофон недоступен в этом браузере. Открой сайт в Chrome или Edge.</span>`;
      return;
    }
    try {
      if (audioEl) audioEl.pause();
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      lab.stream = stream;
      lab.chunks = [];
      lab.transcript = "";
      const recorder = new MediaRecorder(stream);
      lab.recorder = recorder;
      recorder.ondataavailable = (event) => {
        if (event.data && event.data.size) lab.chunks.push(event.data);
      };
      recorder.onstop = () => {
        if (lab.recordingUrl) URL.revokeObjectURL(lab.recordingUrl);
        const blob = new Blob(lab.chunks, { type: recorder.mimeType || "audio/webm" });
        lab.recordingUrl = URL.createObjectURL(blob);
        const player = $("#labRecordingAudio");
        if (player) {
          player.src = lab.recordingUrl;
          player.hidden = false;
        }
        labSpeechResult();
      };
      recorder.start();
      lab.recording = true;
      updateLabRecordingUI(true);
      startLabRecognition();
      lab.recordTimer = setTimeout(() => stopLabRecording(), 8000);
    } catch (error) {
      lab.recording = false;
      updateLabRecordingUI(false);
      const speech = $("[data-lab-speech]");
      if (speech) speech.innerHTML = `<span>${icon("info")} Не удалось включить микрофон. Разреши доступ в настройках браузера.</span>`;
    }
  }

  function startLabRecognition() {
    const Recognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!Recognition) return;
    try {
      const recognition = new Recognition();
      recognition.lang = state.settings.accent || "en-US";
      recognition.interimResults = true;
      recognition.continuous = false;
      recognition.onresult = (event) => {
        let transcript = "";
        for (let i = event.resultIndex; i < event.results.length; i += 1) {
          transcript += event.results[i][0].transcript;
        }
        lab.transcript = transcript.trim();
        const speech = $("[data-lab-speech]");
        if (speech) speech.innerHTML = `<span class="is-recording">${icon("mic")} «${esc(lab.transcript)}»</span>`;
      };
      recognition.onerror = () => {};
      recognition.start();
      lab.recognition = recognition;
    } catch (error) {
      lab.recognition = null;
    }
  }

  function stopLabRecording(silent = false) {
    if (lab.recordTimer) {
      clearTimeout(lab.recordTimer);
      lab.recordTimer = null;
    }
    if (lab.recognition) {
      try { lab.recognition.stop(); } catch (error) {}
      lab.recognition = null;
    }
    if (lab.recorder && lab.recorder.state !== "inactive") {
      try { lab.recorder.stop(); } catch (error) {}
    }
    if (lab.stream) {
      lab.stream.getTracks().forEach((track) => track.stop());
      lab.stream = null;
    }
    lab.recording = false;
    if (!silent) updateLabRecordingUI(false);
  }


  if (audioEl) {
    audioEl.addEventListener("loadedmetadata", () => {
      if (!musicState.songId) return;
      musicState.duration = audioEl.duration || 30;
      syncMusicProgress();
    });
    audioEl.addEventListener("timeupdate", syncMusicProgress);
    audioEl.addEventListener("play", () => {
      musicState.playing = true;
      renderMusicPlayer();
      updatePreviewButtons();
      syncLabProgress();
      completeDailyStep("listen");
    });
    audioEl.addEventListener("pause", () => {
      if (!musicState.songId) return;
      musicState.playing = false;
      renderMusicPlayer();
      updatePreviewButtons();
      syncLabProgress();
    });
    audioEl.addEventListener("ended", () => {
      if (audioEl.loop) return;
      if (lab.abActive && lab.abEnd > lab.abStart) {
        audioEl.currentTime = lab.abStart;
        audioEl.play().catch(() => {});
        return;
      }
      musicState.playing = false;
      renderMusicPlayer();
      updatePreviewButtons();
    });
    audioEl.addEventListener("error", () => {
      if (!musicState.songId) return;
      musicState.loading = false;
      musicState.playing = false;
      musicState.error = "Не удалось воспроизвести превью. Проверь интернет и попробуй ещё раз.";
      delete previewCache[musicState.songId];
      savePreviewCache();
      renderMusicPlayer();
      updatePreviewButtons();
    });
  }

  /* ------------------------------------------------------------
     Toasts / modal
     ------------------------------------------------------------ */
  function toast(message, type = "ok") {
    const root = $("#toastRoot");
    if (!root) return;
    const element = document.createElement("div");
    element.className = "toast";
    element.innerHTML = `${icon(type === "error" ? "info" : "check")}<span>${esc(message)}</span>`;
    root.appendChild(element);
    setTimeout(() => {
      element.classList.add("is-out");
      setTimeout(() => element.remove(), 260);
    }, 3300);
  }

  const modalRoot = $("#modalRoot");
  let activeModalKind = null;
  let lastFocusedElement = null;

  function openModal(content, options = {}) {
    lastFocusedElement = document.activeElement;
    activeModalKind = options.kind || "generic";
    modalRoot.innerHTML = `<div class="modal-backdrop" data-modal-backdrop>
      <div class="modal ${options.className || ""}" role="dialog" aria-modal="true" aria-label="${attr(options.label || "Окно")}">
        ${content}
      </div>
    </div>`;
    document.body.classList.add("modal-open");
    setTimeout(() => {
      const focusTarget = options.focus ? $(options.focus, modalRoot) : $(".modal__close, button, input, textarea", modalRoot);
      if (focusTarget) focusTarget.focus({ preventScroll: true });
    }, 60);
  }

  function closeModal() {
    modalRoot.innerHTML = "";
    document.body.classList.remove("modal-open");
    activeModalKind = null;
    if (lastFocusedElement && typeof lastFocusedElement.focus === "function") {
      lastFocusedElement.focus({ preventScroll: true });
    }
  }

  /* ------------------------------------------------------------
     Routing
     ------------------------------------------------------------ */
  let currentRoute = "/";
  let activeSectionObserver = null;

  function parseRoute() {
    const raw = (location.hash.replace(/^#/, "") || "/").split("?")[0];
    const path = raw.startsWith("/") ? raw : `/${raw}`;
    const parts = path.split("/").filter(Boolean);
    if (!parts.length) return { name: "home", path: "/" };
    if (parts[0] === "songs") return { name: "songs", path: "/songs" };
    if (parts[0] === "theory") return { name: "theory", id: parts[1] || null, path: "/theory" };
    if (parts[0] === "levels") return { name: "levels", path: "/levels" };
    if (parts[0] === "level" && parts[1]) return { name: "level", id: parts[1], path: `/level/${parts[1]}` };
    if (parts[0] === "song" && parts[1]) {
      return { name: "song", id: parts[1], section: parts[2] || null, path: `/song/${parts[1]}` };
    }
    if (parts[0] === "vocabulary") return { name: "vocabulary", path: "/vocabulary" };
    if (parts[0] === "review") return { name: "review", path: "/review" };
    if (parts[0] === "today") return { name: "today", path: "/today" };
    if (parts[0] === "progress") return { name: "progress", path: "/progress" };
    return { name: "notfound", path: path };
  }

  function setActiveNav(route) {
    let active = route.path;
    if (route.name === "level") active = "/levels";
    if (route.name === "song") active = "/songs";
    $$(".main-nav .nav-link, .mobile-dock a").forEach((link) => {
      const isActive = link.getAttribute("data-route") === active;
      link.classList.toggle("is-active", isActive);
      if (isActive) link.setAttribute("aria-current", "page");
      else link.removeAttribute("aria-current");
    });
  }

  function updateHeader() {
    const streak = $("#streakValue");
    if (streak) streak.textContent = currentStreak();
    const avatar = $("#avatarLetter");
    if (avatar) avatar.textContent = (state.profile.name || "М").trim().charAt(0).toUpperCase();
  }

  function render() {
    const route = parseRoute();
    currentRoute = route.path;
    stopLabRecording(true);
    if (activeModalKind) {
      modalRoot.innerHTML = "";
      document.body.classList.remove("modal-open");
      activeModalKind = null;
      quiz = null;
      flash = null;
    }
    stopAudio();
    if (activeSectionObserver) {
      activeSectionObserver.disconnect();
      activeSectionObserver = null;
    }
    const view = $("#view");
    if (!view) return;
    let html = "";
    let title = "LYRICA — английский по музыке";

    if (route.name === "home") {
      html = renderHome();
    } else if (route.name === "songs") {
      html = renderSongsPage();
      title = "Библиотека песен — LYRICA";
    } else if (route.name === "theory") {
      html = renderTheoryPage(route.id);
      title = "Теория — LYRICA";
    } else if (route.name === "levels") {
      html = renderLevelsPage();
      title = "Уровни — LYRICA";
    } else if (route.name === "level") {
      const level = LEVEL_BY_ID[route.id];
      if (level) {
        html = renderLevelPage(level);
        title = `${level.code} · ${level.name} — LYRICA`;
      } else {
        html = renderNotFound();
      }
    } else if (route.name === "song") {
      const song = SONG_BY_ID[route.id];
      if (song) {
        html = renderSongPage(song);
        title = `${song.title} — ${song.artist} · LYRICA`;
      } else {
        html = renderNotFound();
      }
    } else if (route.name === "vocabulary") {
      html = renderVocabularyPage();
      title = "Мой словарь — LYRICA";
    } else if (route.name === "review") {
      html = renderReviewPage();
      title = "Повторение слов — LYRICA";
    } else if (route.name === "today") {
      html = renderTodayPage();
      title = "Занятие на сегодня — LYRICA";
    } else if (route.name === "progress") {
      html = renderProgressPage();
      title = "Мой прогресс — LYRICA";
    } else {
      html = renderNotFound();
      title = "Страница не найдена — LYRICA";
    }

    view.innerHTML = html;
    document.title = title;
    updatePreviewButtons();
    setActiveNav(route);
    updateHeader();
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });

    if (route.name === "song") setupSongSections(route);
    if (route.name === "vocabulary") syncVocabFilters();
    if (route.name === "songs") syncSongFilters();
    if (route.name === "theory" && !route.id) syncTheoryFilters();
    if (route.name === "theory" && route.id) {
      const target = document.getElementById(`theory-${route.id}`);
      if (target) setTimeout(() => target.scrollIntoView({ behavior: "smooth", block: "start" }), 120);
    }

    if (route.section && route.name === "song") {
      const section = document.getElementById(route.section);
      if (section) {
        setTimeout(() => section.scrollIntoView({ behavior: "smooth", block: "start" }), 120);
      }
    }
  }

  function navigate(path) {
    const nextHash = `#${path}`;
    if (location.hash === nextHash) {
      render();
    } else {
      location.hash = path;
    }
  }

  /* ------------------------------------------------------------
     Home
     ------------------------------------------------------------ */
  function renderHome() {
    const nextSong = getNextSong();
    const nextLevel = LEVEL_BY_ID[nextSong.level];
    const best = songScore(nextSong.id);
    const word = wordOfTheDay();
    const wordSong = SONG_BY_ID[word.songId];
    const wordLv = LEVEL_BY_ID[word.level];
    const currentLevel = estimatedLevel();
    const mastery = overallMastery();
    const completed = completedCount();
    const playlist = LEVELS.map((level) => levelSongs(level.id)[2]).filter(Boolean);
    const fanA = SONGS.find((song) => song.level === "b2") || SONGS[4];
    const fanB = SONGS.find((song) => song.level === "c1") || SONGS[8];
    const spotlight = SONGS.find((song) => song.artistBio && (song.listenNext || []).length) || SONGS[0];
    const theorySpotlight = ["present-simple", "conditionals", "inversion", "metaphor-imagery"]
      .map((id) => THEORY_BY_ID[id])
      .filter(Boolean)
      .concat(THEORY.slice(0, 4))
      .filter((topic, index, list) => list.findIndex((item) => item.id === topic.id) === index)
      .slice(0, 4);

    return `
      <section class="hero shell">
        <div class="hero-copy">
          <div class="eyebrow">Привет, ${esc(state.profile.name || "меломан")} · английский через музыку</div>
          <h1><span class="line">Музыка вместо</span><span class="line"><em>зубрёжки</em>.</span></h1>
          <p class="lead">Учи язык по песням, которые уже любишь: разбирай живую лексику, слушай произношение, проходи теорию и выполняй большие задания. Шесть уровней, ${TOTAL_SONGS} песен — от первых фраз до литературных метафор.</p>
          <div class="hero-actions">
            <a class="btn btn--primary" href="#/today">${completed ? "Занятие на сегодня" : "Начать с плана"}<span class="btn-arrow">${icon("arrow")}</span></a>
            <a class="btn btn--ghost" href="#/songs">Открыть библиотеку ${icon("arrow")}</a>
          </div>
          <div class="hero-meta">
            <span>${TOTAL_SONGS} песен</span><span>${TOTAL_WORDS} слов с озвучкой</span><span>${TOTAL_HOMEWORK} больших заданий</span>
          </div>
        </div>
        <div class="hero-art" aria-hidden="true">
          <div class="album-fan">
            ${coverMarkup(fanA)}
            ${coverMarkup(fanB)}
          </div>
          <div class="vinyl-wrap">
            <div class="vinyl">
              <div class="vinyl-label">
                <b>Lyrica</b>
                <small>English through music</small>
                <span>33⅓ rpm · side a</span>
              </div>
            </div>
          </div>
          <div class="now-card">
            ${coverMarkup(nextSong)}
            <div class="now-card__copy">
              <small>${completed ? "Продолжить" : "Первый трек"} · ${nextLevel.code}</small>
              <b>${esc(nextSong.title)}</b>
              <span>${esc(nextSong.artist)}</span>
            </div>
            <span class="eq"><i></i><i></i><i></i><i></i></span>
          </div>
          <span class="floating-note">${icon("headphones")} произношение в один клик</span>
        </div>
      </section>

      <div class="shell">
        <div class="quick-stats">
          <div class="quick-stat"><b>6</b><span>уровней CEFR</span></div>
          <div class="quick-stat"><b>${TOTAL_SONGS}</b><span>песен для разбора</span></div>
          <div class="quick-stat"><b>${TOTAL_WORDS}</b><span>слов с озвучкой</span></div>
          <div class="quick-stat"><b>${mastery}<small>%</small></b><span>общее освоение</span></div>
        </div>
      </div>

      <div class="shell">
        ${renderDailyPlanCard()}
      </div>

      <section class="section shell">
        <div class="daily-grid">
          <a class="continue-card" href="#/song/${nextSong.id}">
            ${coverMarkup(nextSong)}
            <div class="continue-card__copy">
              <div class="eyebrow">${completed ? "Следующий шаг" : "Начни здесь"} · ${nextLevel.code} ${nextLevel.name}</div>
              <h3>${esc(nextSong.title)}<small>${esc(nextSong.artist)} · ${nextSong.year} · ${esc(nextSong.genre)}</small></h3>
              <p>${esc(nextSong.description)}</p>
              <div class="continue-card__foot">
                <div class="mini-progress">
                  <div class="mini-progress__head"><span>${best ? "Лучший результат" : "Готов к старту"}</span><span>${best}%</span></div>
                  <div class="mini-progress__bar"><i style="width:${best}%"></i></div>
                </div>
                <span class="btn btn--lime btn--sm">${best ? "Продолжить" : "Открыть урок"} ${icon("arrow")}</span>
              </div>
            </div>
          </a>

          <article class="word-card-main">
            <div class="eyebrow">Слово дня · ${wordLv.code}</div>
            <div class="word-card-main__word">
              <h3>${esc(word.word)}</h3>
              <button class="sound-btn" type="button" data-action="speak-word" data-say="${attr(word.word)}" aria-label="Прослушать слово ${attr(word.word)}">${icon("volume")}</button>
            </div>
            <span class="ipa">${esc(word.ipa)}</span>
            <p class="translation">${esc(word.ru)}</p>
            <p class="example">${esc(word.example)}</p>
            <div class="word-card-main__foot">
              <small>${esc(wordSong.title)} · ${esc(wordSong.artist)}</small>
              <a class="link-arrow" href="#/song/${wordSong.id}/vocabulary">В урок ${icon("arrow")}</a>
            </div>
          </article>
        </div>
      </section>

      <section class="section shell">
        <div class="section-head">
          <div class="section-head__copy">
            <div class="eyebrow">Плейлист недели · 6 уровней</div>
            <h2>Одна песня с каждого<br><em>уровня</em>.</h2>
          </div>
          <div class="section-head__aside"><a class="link-arrow" href="#/songs">Вся библиотека · ${TOTAL_SONGS} ${icon("arrow")}</a></div>
        </div>
        <div class="song-library-grid home-song-grid">
          ${playlist.map((song) => renderSongTile(song, LEVEL_BY_ID[song.level])).join("")}
        </div>
      </section>

      <section class="section shell">
        <div class="home-discovery">
          <article class="artist-spotlight">
            <div class="eyebrow">Артист крупным планом</div>
            <div class="artist-spotlight__head">
              ${coverMarkup(spotlight)}
              <div>
                <h2>${esc(spotlight.artist)}</h2>
                <p>${esc(spotlight.artistBio || spotlight.description)}</p>
              </div>
            </div>
            <div class="artist-facts">
              ${(spotlight.facts || []).slice(0, 3).map((fact) => `<span>${esc(fact)}</span>`).join("")}
            </div>
            <div class="artist-next">
              <span>Послушать дальше</span>
              ${(spotlight.listenNext || []).slice(0, 3).map((item) => `<a href="https://music.apple.com/us/search?term=${encodeURIComponent(`${item.title} ${item.artist}`)}" target="_blank" rel="noopener noreferrer"><b>${esc(item.title)}</b><small>${esc(item.artist)}</small></a>`).join("")}
            </div>
            <a class="link-arrow" href="#/song/${spotlight.id}">Открыть урок ${icon("arrow")}</a>
          </article>

          <article class="theory-spotlight">
            <div class="eyebrow">Теория без тумана</div>
            <h2>${TOTAL_THEORY} тем,<br>которые объясняют песни.</h2>
            <p>Present Perfect, инверсия, метафора, словообразование — каждая тема с формулами, примерами и проверкой.</p>
            <div class="theory-spotlight__list">
              ${theorySpotlight.map((topic) => `<a href="#/theory/${topic.id}"><span>${(LEVEL_BY_ID[topic.level] || {}).code || topic.level}</span><b>${esc(topic.title)}</b><small>${esc(topic.ru)}</small></a>`).join("")}
            </div>
            <a class="btn btn--ghost btn--sm" href="#/theory">Открыть теорию ${icon("arrow")}</a>
          </article>
        </div>
      </section>

      <section class="section shell">
        <div class="section-head">
          <div class="section-head__copy">
            <div class="eyebrow">Твой маршрут</div>
            <h2>Шесть уровней.<br><em>Одна любимая музыка.</em></h2>
          </div>
          <div class="section-head__aside"><a class="link-arrow" href="#/levels">Все уровни ${icon("arrow")}</a></div>
        </div>
        <div class="level-grid">
          ${LEVELS.map((level) => renderLevelCard(level)).join("")}
        </div>
      </section>

      <section class="section section--tight shell">
        <div class="section-head">
          <div class="section-head__copy">
            <div class="eyebrow">Как это работает</div>
            <h2>От первого прослушивания<br>до <em>своего мнения</em>.</h2>
          </div>
          <div class="section-head__aside"><span class="muted" style="font-size:11px">${currentLevel ? `Текущая оценка: ${currentLevel.code} · ${currentLevel.name}` : "Начни с любого уровня"}</span></div>
        </div>
        <div class="how-grid">
          <div class="how-step"><b>01</b><h3>Выбери уровень</h3><p>От A1 до C2 — с описанием навыков и понятной целью. В каждом уровне 10 песен.</p></div>
          <div class="how-step"><b>02</b><h3>Слушай и разбирай</h3><p>10–12 ключевых слов, транскрипция, примеры, теория и языковые паттерны.</p></div>
          <div class="how-step"><b>03</b><h3>Проверь себя</h3><p>Мини-квиз по лексике, контексту, аудированию и смыслу. Сразу видно результат.</p></div>
          <div class="how-step"><b>04</b><h3>Закрепи дома</h3><p>Пять больших заданий на прослушивание, письмо, говорение и творчество.</p></div>
        </div>

        <div class="cta-band">
          <div>
            <h2>Одна песня — и ты уже<br>говоришь по-английски.</h2>
            <p>Начни с A1 или выбери тот уровень, который давно хотел разобрать. Прогресс сохраняется автоматически.</p>
          </div>
          <a class="btn btn--paper" href="#/levels">Открыть маршрут <span class="btn-arrow">${icon("arrow")}</span></a>
        </div>
      </section>
    `;
  }

  function renderDailyPlanCard(expanded = false) {
    const plan = dailyPlan();
    const done = dailyDoneCount();
    const steps = planSteps();
    const pct = Math.round((done / DAILY_STEP_DEFS.length) * 100);
    const remaining = steps.filter((step) => !plan.steps[step.id]).reduce((sum, step) => sum + step.minutes, 0);
    return `<section class="daily-plan ${expanded ? "daily-plan--expanded" : ""}">
      <div class="daily-plan__head">
        <div>
          <div class="eyebrow">Занятие на сегодня · 15 минут</div>
          <h2>${expanded ? "Один маленький шаг — <em>и ты в ритме</em>." : "Пятнадцать минут,<br>которые <em>сработают</em>."}</h2>
          <p>${done === DAILY_STEP_DEFS.length ? "План на сегодня собран. Можно повторить слова ещё раз или просто послушать любимую песню." : "Четыре коротких шага: слова, музыка, квиз и одно задание. Не нужно выбирать — просто иди по плану."}</p>
        </div>
        <div class="daily-plan__meter">
          <div class="daily-plan__meter-top"><b><span data-daily-count>${done}</span> / ${DAILY_STEP_DEFS.length}</b><span>${pct}%</span></div>
          <div class="progress-track"><i data-daily-bar style="width:${pct}%"></i></div>
          ${done === DAILY_STEP_DEFS.length ? `<span class="daily-plan__done">${icon("check")} +25 XP за план</span>` : `<span>≈ ${remaining} мин осталось</span>`}
        </div>
      </div>
      <div class="daily-plan__steps">
        ${steps.map((step, index) => {
          const isDone = Boolean(plan.steps[step.id]);
          const actionAttrs = step.href
            ? `href="${step.href}"`
            : step.action === "play-preview"
              ? `type="button" data-action="play-preview" data-preview-song="${step.songId}"`
              : `type="button" data-action="${step.action}" data-song="${step.songId}"`;
          const tag = step.href ? "a" : "button";
          return `<${tag} class="daily-step ${isDone ? "is-done" : ""}" data-plan-step="${step.id}" ${actionAttrs}>
            <span class="daily-step__num">${isDone ? icon("check") : String(index + 1).padStart(2, "0")}</span>
            <span class="daily-step__copy"><b>${step.title}</b><small>${step.meta}</small></span>
            <span class="daily-step__meta"><em>${step.minutes} мин</em><span data-plan-check>${isDone ? icon("check") : ""}</span></span>
          </${tag}>`;
        }).join("")}
      </div>
      <div class="daily-plan__foot">
        <span>${icon("spark")} Прогресс сохраняется автоматически</span>
        ${expanded ? `<a class="btn btn--ghost btn--sm" href="#/vocabulary">${icon("book")} К словарю ${icon("arrow")}</a>` : `<a class="btn btn--ghost btn--sm" href="#/today">Открыть план ${icon("arrow")}</a>`}
      </div>
    </section>`;
  }

  function renderTodayPage() {
    const due = dueWords().length;
    const done = dailyDoneCount();
    const learned = learnedWords();
    const streak = currentStreak();
    return `<div class="shell">
      <section class="today-hero">
        <div>
          <div class="eyebrow">Личный план · ${formatFullDate(new Date())}</div>
          <h1>${done === DAILY_STEP_DEFS.length ? `Сегодня <em>всё собрано</em>.` : `Пятнадцать минут<br>для <em>себя</em>.`}</h1>
          <p>${done === DAILY_STEP_DEFS.length ? "Четыре шага закрыты. Это уже победа на сегодня — возвращайся завтра за новым кругом." : "Не нужно открывать десять вкладок. Слова, музыка, квиз и одно задание уже стоят в очереди."}</p>
          <div class="today-stats">
            <div><b>${due}</b><span>слов к повторению</span></div>
            <div><b>${learned}</b><span>слов в памяти</span></div>
            <div><b>${streak}</b><span>${plural(streak, "день", "дня", "дней")} подряд</span></div>
          </div>
        </div>
        <div class="today-orb" style="--p:${(done / DAILY_STEP_DEFS.length) * 100}">
          <div><b>${done}/${DAILY_STEP_DEFS.length}</b><span>шагов</span></div>
        </div>
      </section>
      ${renderDailyPlanCard(true)}
      <div class="today-links">
        <a href="#/review">${icon("rotate")}<b>Интервальное повторение</b><span>${due ? `${due} ${plural(due, "слово", "слова", "слов")} ждут` : "Поддержать память"}</span>${icon("arrow")}</a>
        <a href="#/progress">${icon("chart")}<b>Мой прогресс</b><span>heatmap и ритм занятий</span>${icon("arrow")}</a>
      </div>
    </div>`;
  }

  function renderReviewPage() {
    const due = dueWords();
    const deck = reviewDeck(12);
    const learned = learnedWords();
    const reviewed = reviewsToday();
    return `<div class="shell">
      <section class="review-hero">
        <div>
          <div class="eyebrow">Интервальное повторение · SRS</div>
          <h1>Слова, которые<br><em>остаются</em>.</h1>
          <p>Алгоритм возвращает слово за день до того, как ты его забудешь. Четыре кнопки — и каждое слово получает свой следующий срок.</p>
          <div class="review-actions">
            <button class="btn btn--primary" type="button" data-action="start-srs">${icon("rotate")} ${due.length ? "Повторить слова" : "Тренировать слова"} <span class="btn-arrow">${icon("arrow")}</span></button>
            <a class="btn btn--ghost" href="#/vocabulary">К словарю ${icon("arrow")}</a>
          </div>
        </div>
        <div class="review-stats">
          <div><b>${due.length}</b><span>к повторению</span></div>
          <div><b>${learned}</b><span>в памяти</span></div>
          <div><b>${reviewed}</b><span>сегодня</span></div>
        </div>
      </section>
      <section class="review-board">
        <div class="review-board__head"><div><div class="eyebrow">Очередь</div><h2>${due.length ? "Пора освежить" : "Пока всё спокойно"}</h2></div><span class="level-badge">${deck.length} карточек</span></div>
        ${due.length ? `<div class="review-list">${due.slice(0, 12).map((word) => `<div class="review-row"><div><b>${esc(word.word)}</b><span class="ipa">${esc(word.ipa)}</span></div><span>${esc(word.ru)}</span><small>${esc(word.songTitle)} · до ${esc(wordState(word.id).due)}</small></div>`).join("")}</div>` : `<div class="review-empty">${icon("check")}<div><h3>На сегодня долгов нет</h3><p>Можно повторить слова из «Моего словаря» или добавить новые из любой песни.</p><a class="link-arrow" href="#/vocabulary">Открыть словарь ${icon("arrow")}</a></div></div>`}
        <div class="review-how">
          <div class="review-how__item"><span>01</span><div><b>Снова</b><p>Вернуть слово в работу и показать его в следующем подходе.</p></div></div>
          <div class="review-how__item"><span>02</span><div><b>Трудно</b><p>Оставить короткий интервал — 1 день.</p></div></div>
          <div class="review-how__item"><span>03</span><div><b>Нормально</b><p>Увеличить интервал по твоему текущему ритму.</p></div></div>
          <div class="review-how__item"><span>04</span><div><b>Легко</b><p>Отпустить слово дальше — до 180 дней.</p></div></div>
        </div>
      </section>
    </div>`;
  }

  function renderLevelCard(level) {
    const progress = levelProgress(level.id);
    const songs = levelSongs(level.id);
    return `<a class="level-card" data-code="${level.code}" href="#/level/${level.id}" style="${levelVars(level)}">
      <div class="level-card__top">
        <span class="level-badge" style="${levelVars(level)}">${level.code}</span>
        <span>${progress.mastered} / ${progress.total} освоено</span>
      </div>
      <h3>${level.name}<small>${level.ru} · ${level.tagline}</small></h3>
      <div class="level-card__songs">
        ${songs.slice(0, 3).map((song) => `<span class="song-pill" title="${attr(song.title)}">${esc(song.title)}</span>`).join("")}
        ${songs.length > 3 ? `<span class="song-pill song-pill--more">+${songs.length - 3} песен</span>` : ""}
      </div>
      <div class="level-card__foot">
        <div class="level-card__progress">
          <span>${progress.pct}% уровня</span>
          <div class="progress-track"><i style="width:${progress.pct}%"></i></div>
        </div>
        <span class="round-arrow">${icon("arrow")}</span>
      </div>
    </a>`;
  }

  /* ------------------------------------------------------------
     Song library
     ------------------------------------------------------------ */
  let songsUI = { q: "", level: "all" };

  function setSongLevel(level) {
    songsUI.level = level;
  }

  function filterSongs() {
    const q = songsUI.q.trim().toLowerCase();
    return SONGS.filter((song) => {
      if (songsUI.level !== "all" && song.level !== songsUI.level) return false;
      if (!q) return true;
      return `${song.title} ${song.artist} ${song.genre} ${song.theme} ${song.year}`.toLowerCase().includes(q);
    });
  }

  function renderSongsPage() {
    songsUI = { q: "", level: "all" };
    return `
      <div class="shell">
        <section class="page-hero library-hero">
          <div class="eyebrow">Библиотека · ${TOTAL_SONGS} песен · 6 уровней</div>
          <h1>Все песни.<br><em>В одном месте.</em></h1>
          <div class="page-hero__foot">
            <p class="lead">От первой фразы до литературной метафоры: полная коллекция LYRICA с фильтрами по уровню и поиском. У каждой песни — словарь, теория, мини-квиз и пять больших заданий.</p>
            <div class="page-hero__aside">${TOTAL_WORDS} слов · ${TOTAL_QUIZ} вопросов<br>${TOTAL_HOMEWORK} заданий на прослушивание</div>
          </div>
        </section>

        <div class="catalog-tools">
          <div class="search-box">
            ${icon("search")}
            <input id="songSearch" type="search" placeholder="Найти песню, артиста или тему..." autocomplete="off" aria-label="Поиск по библиотеке песен">
          </div>
          <div class="filter-chips" role="group" aria-label="Фильтр по уровню">
            <button class="chip is-active" type="button" data-action="song-level" data-level="all">Все</button>
            ${LEVELS.map((level) => `<button class="chip" type="button" data-action="song-level" data-level="${level.id}" style="--chip-color:${level.color}">${level.code}</button>`).join("")}
          </div>
          <button class="btn btn--ghost btn--sm" type="button" data-action="random-song">${icon("spark")} Случайная песня</button>
        </div>

        <div class="catalog-count"><span>Найдено: <b id="songFound">${TOTAL_SONGS}</b></span><span>10 песен на каждом уровне · от A1 до C2</span></div>
        <div id="songsList">${renderSongLibrary(filterSongs())}</div>
      </div>
    `;
  }

  function renderSongLibrary(songs) {
    if (!songs.length) {
      return `<div class="vocab-empty"><h3>Ни одной песни</h3><p>Попробуй другой запрос или сбрось фильтр уровня.</p><button class="btn btn--ghost btn--sm" type="button" data-action="reset-songs" style="margin-top:15px">Показать все песни</button></div>`;
    }
    return LEVELS.map((level) => {
      const items = songs.filter((song) => song.level === level.id);
      if (!items.length) return "";
      return `<section class="catalog-group" id="library-${level.id}">
        <div class="catalog-group__head" style="${levelVars(level)}">
          ${levelBadge(level)}
          <h2>${level.name}</h2>
          <span>${level.ru} · ${items.length} ${plural(items.length, "песня", "песни", "песен")}</span>
          <a class="link-arrow" href="#/level/${level.id}">Уровень ${level.code} ${icon("arrow")}</a>
        </div>
        <div class="song-library-grid">
          ${items.map((song) => renderSongTile(song, level)).join("")}
        </div>
      </section>`;
    }).join("");
  }

  function renderSongTile(song, level) {
    const best = songScore(song.id);
    const learned = song.vocab.filter((word, index) => wordState(`${song.id}-${index}`).learned).length;
    return `<article class="song-tile" style="${levelVars(level)}">
      <a class="song-tile__cover" href="#/song/${song.id}" aria-label="Открыть урок ${attr(song.title)}">${coverMarkup(song)}</a>
      <div class="song-tile__body">
        <div class="song-tile__kicker"><span>${level.code}</span> · ${song.year} · ${esc(song.genre)}</div>
        <h3><a href="#/song/${song.id}">${esc(song.title)}</a></h3>
        <p class="song-tile__artist">${esc(song.artist)}</p>
        <p class="song-tile__theme">${esc(song.theme)}</p>
        <div class="song-tile__meta">
          <span>${icon("book")} ${song.vocab.length} слов</span>
          <span>${icon("layers")} ${song.theory.length} теории</span>
          <span>${icon("pen")} ${song.homework.length} заданий</span>
        </div>
        <div class="song-tile__foot">
          <span class="song-tile__score ${best >= 80 ? "is-good" : ""}">${best ? `${best}%` : "не начато"}</span>
          <span class="song-tile__learned">${learned}/${song.vocab.length} слов</span>
          <span class="round-arrow">${icon("arrow")}</span>
        </div>
      </div>
    </article>`;
  }

  function syncSongFilters() {
    const search = $("#songSearch");
    if (search) songsUI.q = search.value;
    $$("[data-action='song-level']").forEach((chip) => {
      chip.classList.toggle("is-active", chip.dataset.level === songsUI.level);
    });
    const list = $("#songsList");
    const found = $("#songFound");
    const songs = filterSongs();
    if (found) found.textContent = songs.length;
    if (list) list.innerHTML = renderSongLibrary(songs);
  }

  function randomSong() {
    const pool = filterSongs().length ? filterSongs() : SONGS;
    const song = pool[Math.floor(Math.random() * pool.length)];
    if (song) navigate(`/song/${song.id}`);
  }

  /* ------------------------------------------------------------
     Theory library
     ------------------------------------------------------------ */
  let theoryUI = { q: "", level: "all" };
  const theoryAnswers = {};

  function theorySongs(topicId) {
    return SONGS.filter((song) => (song.theory || []).includes(topicId)).slice(0, 3);
  }

  function filterTheory() {
    const q = theoryUI.q.trim().toLowerCase();
    return THEORY.filter((topic) => {
      if (theoryUI.level !== "all" && topic.level !== theoryUI.level) return false;
      if (!q) return true;
      return `${topic.title} ${topic.ru} ${topic.summary}`.toLowerCase().includes(q);
    });
  }

  function renderTheoryPage(focusId = null) {
    theoryUI = { q: "", level: "all" };
    return `
      <div class="shell">
        <section class="page-hero theory-hero">
          <div class="eyebrow">Теория · ${TOTAL_THEORY} тем · A1–C2</div>
          <h1>Грамматика<br><em>без тумана</em>.</h1>
          <div class="page-hero__foot">
            <p class="lead">Каждая конструкция из песен объяснена по-русски: форма, когда использовать, живые примеры, типичные ошибки и быстрый вопрос для самопроверки. Открывай нужную тему прямо из урока.</p>
            <div class="page-hero__aside">${TOTAL_THEORY} карточек теории<br>ко всем языковым темам курса</div>
          </div>
        </section>

        <div class="catalog-tools">
          <div class="search-box">
            ${icon("search")}
            <input id="theorySearch" type="search" placeholder="Найти тему: inversion, Present Perfect..." autocomplete="off" aria-label="Поиск по теории">
          </div>
          <div class="filter-chips" role="group" aria-label="Фильтр теории по уровню">
            <button class="chip is-active" type="button" data-action="theory-level" data-level="all">Все</button>
            ${LEVELS.map((level) => `<button class="chip" type="button" data-action="theory-level" data-level="${level.id}">${level.code}</button>`).join("")}
          </div>
          <button class="btn btn--ghost btn--sm" type="button" data-action="theory-random">${icon("spark")} Случайная тема</button>
        </div>

        <div class="catalog-count"><span>Найдено: <b id="theoryFound">${TOTAL_THEORY}</b></span><span>Нажми на карточку, чтобы раскрыть объяснение</span></div>
        <div id="theoryList">${renderTheoryGroups(filterTheory(), focusId)}</div>
      </div>
    `;
  }

  function renderTheoryGroups(topics, focusId = null) {
    if (!topics.length) {
      return `<div class="vocab-empty"><h3>Тема не найдена</h3><p>Попробуй короче запрос или сбрось фильтр уровня.</p><button class="btn btn--ghost btn--sm" type="button" data-action="reset-theory" style="margin-top:15px">Показать всю теорию</button></div>`;
    }
    return LEVELS.map((level) => {
      const items = topics.filter((topic) => topic.level === level.id);
      if (!items.length) return "";
      return `<section class="theory-group">
        <div class="catalog-group__head" style="${levelVars(level)}">
          ${levelBadge(level)}
          <h2>${level.name}</h2>
          <span>${level.ru} · ${items.length} ${plural(items.length, "тема", "темы", "тем")}</span>
          <a class="link-arrow" href="#/level/${level.id}">Песни уровня ${icon("arrow")}</a>
        </div>
        <div class="theory-grid">
          ${items.map((topic) => renderTheoryCard(topic, focusId === topic.id)).join("")}
        </div>
      </section>`;
    }).join("");
  }

  function renderTheoryCard(topic, open = false) {
    const songs = theorySongs(topic.id);
    const checked = theoryAnswers[topic.id];
    return `<article class="theory-card" id="theory-${topic.id}">
      <details ${open ? "open" : ""}>
        <summary>
          <span class="theory-card__badge">${(LEVEL_BY_ID[topic.level] || {}).code || topic.level}</span>
          <span class="theory-card__title"><b>${esc(topic.title)}</b><small>${esc(topic.ru)}</small></span>
          <span class="theory-card__arrow">${icon("chevron")}</span>
        </summary>
        <div class="theory-card__body">
          <p class="theory-card__summary">${esc(topic.summary)}</p>
          <div class="theory-formula">${(topic.formula || []).map((line) => `<code>${esc(line)}</code>`).join("")}</div>
          <div class="theory-columns">
            <div>
              <h4>Как работает</h4>
              <ul class="theory-rules">${(topic.rules || []).map((rule) => `<li>${esc(rule)}</li>`).join("")}</ul>
            </div>
            <div>
              <h4>Живые примеры</h4>
              <div class="theory-examples">${(topic.examples || []).map((example) => `<div><b>${esc(example.en)}</b><span>${esc(example.ru)}</span></div>`).join("")}</div>
            </div>
          </div>
          <div class="theory-mistakes">
            <h4>Частые ошибки</h4>
            ${(topic.mistakes || []).map((mistake) => `<div><s>${esc(mistake.wrong)}</s><b>${esc(mistake.right)}</b><span>${esc(mistake.why)}</span></div>`).join("")}
          </div>
          ${topic.check ? `<div class="theory-check" data-theory-check="${topic.id}">
            <h4>Проверь себя</h4>
            <p>${esc(topic.check.q)}</p>
            <div class="theory-check__options">
              ${topic.check.options.map((option, index) => {
                const isPicked = checked != null && checked === index;
                const isCorrect = checked != null && topic.check.answer === index;
                const cls = checked != null ? (isCorrect ? "is-correct" : isPicked ? "is-wrong" : "") : "";
                return `<button type="button" class="${cls}" data-action="theory-check" data-topic="${topic.id}" data-index="${index}" ${checked != null ? "disabled" : ""}>${String.fromCharCode(65 + index)}. ${esc(option)}</button>`;
              }).join("")}
            </div>
            ${checked != null ? `<div class="theory-check__feedback ${checked === topic.check.answer ? "is-good" : "is-bad"}">${checked === topic.check.answer ? "Верно. " : "Почти. "}${esc(topic.check.explain)}</div>` : ""}
          </div>` : ""}
          ${songs.length ? `<div class="theory-card__songs"><span>Отработать в песнях:</span>${songs.map((song) => `<a href="#/song/${song.id}">${esc(song.title)}</a>`).join("")}</div>` : ""}
        </div>
      </details>
    </article>`;
  }

  function syncTheoryFilters() {
    const search = $("#theorySearch");
    if (search) theoryUI.q = search.value;
    $$("[data-action='theory-level']").forEach((chip) => {
      chip.classList.toggle("is-active", chip.dataset.level === theoryUI.level);
    });
    const list = $("#theoryList");
    const found = $("#theoryFound");
    const topics = filterTheory();
    if (found) found.textContent = topics.length;
    if (list) list.innerHTML = renderTheoryGroups(topics);
  }

  function answerTheory(button) {
    const topicId = button.dataset.topic;
    const index = Number(button.dataset.index);
    const topic = THEORY_BY_ID[topicId];
    if (!topic || !topic.check) return;
    theoryAnswers[topicId] = index;
    const wrapper = button.closest(".theory-check");
    if (wrapper) {
      const fresh = document.createElement("div");
      fresh.innerHTML = renderTheoryCard(topic);
      const card = fresh.firstElementChild;
      const currentCard = button.closest(".theory-card");
      if (card && currentCard) {
        card.querySelector("details")?.setAttribute("open", "");
        currentCard.replaceWith(card);
        card.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }
  }

  /* ------------------------------------------------------------
     Levels
     ------------------------------------------------------------ */
  function renderLevelsPage() {
    return `
      <div class="shell">
        <section class="page-hero">
          <div class="eyebrow">CEFR · 6 уровней · ${TOTAL_SONGS} песен</div>
          <h1>От A1 до C2.<br><em>По любимым песням.</em></h1>
          <div class="page-hero__foot">
            <p class="lead">Шесть уровней по десять песен. В каждом — большая лексика, теория, мини-квиз, карта прослушивания и пять заданий, которые не дадут просто «пробежать глазами».</p>
            <div class="page-hero__aside">${TOTAL_WORDS} слов · ${TOTAL_HOMEWORK} заданий<br>10 песен на каждом уровне</div>
          </div>
          <div class="level-scale">
            ${LEVELS.map((level) => `<a href="#/level/${level.id}" style="--scale-color:${level.color};--scale-tint:${level.tint}"><span>${level.code}<small>${level.name}</small></span></a>`).join("")}
          </div>
        </section>

        <div class="levels-list">
          ${LEVELS.map((level) => {
            const progress = levelProgress(level.id);
            return `<article class="level-block" data-code="${level.code}" style="${levelVars(level)}">
              <div class="level-block__head">
                <div class="level-block__title">
                  <span class="level-block__badge">${level.code}</span>
                  <h2>${level.name}<small>${level.ru}</small></h2>
                </div>
                <div class="level-block__pct"><b>${progress.pct}%</b><span>освоено</span></div>
              </div>
              <p>${esc(level.description)}</p>
              <div class="level-block__skills">${level.skills.map((skill) => `<span>${esc(skill)}</span>`).join("")}</div>
              <div class="level-block__songs">
                ${levelSongs(level.id).slice(0, 3).map((song) => {
                  const done = isMastered(song.id);
                  return `<a class="mini-song" href="#/song/${song.id}">
                    ${coverMarkup(song)}
                    <span class="mini-song__copy"><b>${esc(song.title)}</b><span>${esc(song.artist)} · ${song.year}</span></span>
                    <span class="mini-song__status ${done ? "is-done" : ""}">${done ? icon("check") + "освоено" : `лучший ${songScore(song.id)}%`}</span>
                  </a>`;
                }).join("")}
                <a class="mini-song mini-song--more" href="#/level/${level.id}">
                  <span class="mini-song__more">+${levelSongs(level.id).length - 3}</span>
                  <span class="mini-song__copy"><b>Ещё ${levelSongs(level.id).length - 3} ${plural(levelSongs(level.id).length - 3, "песня", "песни", "песен")}</b><span>открыть весь плейлист уровня</span></span>
                  <span class="round-arrow">${icon("arrow")}</span>
                </a>
              </div>
              <div class="level-block__foot">
                <a class="link-arrow" href="#/level/${level.id}">Открыть уровень ${icon("arrow")}</a>
                <div class="progress-track"><i style="width:${progress.pct}%"></i></div>
                <span>${progress.learned} / ${progress.words} слов</span>
              </div>
            </article>`;
          }).join("")}
        </div>

        <div class="cta-band">
          <div>
            <h2>Не знаешь, с чего начать?</h2>
            <p>Начни с A1, даже если учил язык раньше: первые уроки дадут уверенность и покажут, как устроен формат. Дальше уровень можно менять в любой момент.</p>
          </div>
          <a class="btn btn--paper" href="#/level/a1">Начать с A1 <span class="btn-arrow">${icon("arrow")}</span></a>
        </div>
      </div>
    `;
  }

  function renderLevelPage(level) {
    const progress = levelProgress(level.id);
    const songs = levelSongs(level.id);
    const index = LEVEL_ORDER.indexOf(level.id);
    const previous = index > 0 ? LEVEL_BY_ID[LEVEL_ORDER[index - 1]] : null;
    const next = index < LEVEL_ORDER.length - 1 ? LEVEL_BY_ID[LEVEL_ORDER[index + 1]] : null;

    return `
      <div class="shell">
        <div class="breadcrumb"><a href="#/">Главная</a>${icon("chevron")}<a href="#/levels">Уровни</a>${icon("chevron")}<span>${level.code}</span></div>

        <section class="level-hero" data-code="${level.code}" style="${levelVars(level)}">
          <div class="level-hero__grid">
            <div>
              <div class="eyebrow">CEFR · ${level.ru}</div>
              <h1><small>${level.name}</small>${level.code}</h1>
              <p class="level-hero__desc">${esc(level.description)}</p>
              <div class="level-hero__skills">${level.skills.map((skill) => `<span>${esc(skill)}</span>`).join("")}</div>
            </div>
            <aside class="level-outcome">
              <div class="eyebrow">После уровня</div>
              <p>${esc(level.outcome)}</p>
              <div class="level-outcome__stat">
                <div><b>${progress.pct}%</b><span>освоено</span></div>
                <div><b>${progress.learned}/${progress.words}</b><span>слов выучено</span></div>
                <div><b>${progress.mastered}/${progress.total}</b><span>песен освоено</span></div>
              </div>
            </aside>
          </div>
        </section>

        ${THEORY.filter((topic) => topic.level === level.id).length ? `<div class="level-theory-strip">
          <span>Теория уровня:</span>
          ${THEORY.filter((topic) => topic.level === level.id).map((topic) => `<a href="#/theory/${topic.id}">${esc(topic.title)}</a>`).join("")}
          <a class="link-arrow" href="#/theory">Вся теория ${icon("arrow")}</a>
        </div>` : ""}

        <div class="level-songs-head">
          <div><div class="eyebrow" style="margin-bottom:8px">Плейлист уровня · ${songs.length} песен</div><h2>${songs.length} песен — ${songs.length} взглядов</h2></div>
          <p>${songs.reduce((sum, song) => sum + song.vocab.length, 0)} слов · ${songs.reduce((sum, song) => sum + song.homework.length, 0)} больших заданий</p>
        </div>

        <div class="level-song-grid">
          ${songs.map((song) => {
            const best = songScore(song.id);
            return `<a class="level-song-card" href="#/song/${song.id}">
              ${coverMarkup(song)}
              <div class="level-song-card__copy">
                <span class="level-song-card__kicker">${icon("music")} ${esc(song.theme)}</span>
                <h3>${esc(song.title)}<small>${esc(song.artist)} · ${song.year}</small></h3>
                <p>${esc(song.description)}</p>
                <span class="level-song-card__foot">
                  <span class="level-song-card__score ${best ? "" : "is-empty"}">${best ? `Лучший результат ${best}%` : "Ещё не проходил"}</span>
                  <span class="link-arrow">Открыть ${icon("arrow")}</span>
                </span>
              </div>
            </a>`;
          }).join("")}
        </div>

        <div class="level-nav">
          ${previous ? `<a href="#/level/${previous.id}"><span class="round-arrow">${icon("arrowLeft")}</span><span><span>Предыдущий уровень</span><b>${previous.code} · ${previous.name}</b></span></a>` : `<a href="#/levels"><span class="round-arrow">${icon("arrowLeft")}</span><span><span>Все уровни</span><b>Выбрать другой маршрут</b></span></a>`}
          ${next ? `<a href="#/level/${next.id}"><span><span>Следующий уровень</span><b>${next.code} · ${next.name}</b></span><span class="round-arrow">${icon("arrow")}</span></a>` : `<a href="#/progress"><span><span>Куда дальше</span><b>Посмотреть прогресс</b></span><span class="round-arrow">${icon("chart")}</span></a>`}
        </div>
      </div>
    `;
  }

  /* ------------------------------------------------------------
     Song page
     ------------------------------------------------------------ */
  function renderSongPage(song) {
    const level = LEVEL_BY_ID[song.level];
    const best = songScore(song.id);
    const learned = song.vocab.filter((word, index) => wordState(`${song.id}-${index}`).learned).length;
    const tasks = state.homework[song.id] || {};
    const hw = progressForSongHomework(song);
    const done = hw.done;
    const theoryTopics = (song.theory || []).map((id) => THEORY_BY_ID[id]).filter(Boolean);
    const songIndex = SONGS.findIndex((item) => item.id === song.id);
    const previous = songIndex > 0 ? SONGS[songIndex - 1] : null;
    const next = songIndex < SONGS.length - 1 ? SONGS[songIndex + 1] : null;

    return `
      <div class="shell">
        <div class="breadcrumb"><a href="#/">Главная</a>${icon("chevron")}<a href="#/songs">Песни</a>${icon("chevron")}<a href="#/level/${level.id}">${level.code}</a>${icon("chevron")}<span>${esc(song.title)}</span></div>

        <section class="song-hero">
          <div class="song-hero__art">
            ${coverMarkup(song, "cover--hero")}
            <button class="cover-play" type="button" data-action="play-preview" data-preview-song="${song.id}" aria-label="Слушать 30-секундное превью песни ${attr(song.title)}">
              <span class="cover-play__icon" data-preview-icon>${icon("play")}</span>
              <span class="cover-play__label" data-preview-label>Превью</span>
            </button>
            <span class="song-hero__sticker">${icon("headphones")} ${song.duration} · ${song.year}</span>
          </div>
          <div class="song-hero__copy">
            <div class="eyebrow">${level.code} · ${level.name} · ${esc(song.genre)}</div>
            <h1>${esc(song.title)}<small>${esc(song.artist)} · ${song.year} · ${esc(song.theme)}</small></h1>
            <div class="song-tags" style="${levelVars(level)}">
              <span>${level.code}</span>
              <span>${esc(song.genre)}</span>
              <span>${esc(song.duration)}</span>
              <span>${esc(song.grammar)}</span>
            </div>
            <p class="song-hero__desc">${esc(song.description)}</p>
            <div class="song-actions">
              ${previewButtonMarkup(song, "btn btn--accent")}
              <button class="btn btn--primary" type="button" data-action="start-quiz" data-song="${song.id}">${best ? "Пройти ещё раз" : "Начать мини-квиз"}<span class="btn-arrow">${icon("arrow")}</span></button>
              ${fullTrackButtonMarkup(song, "btn btn--ghost")}
            </div>
            <div class="song-meta-row">
              <div><b class="${best >= 80 ? "score-good" : ""}">${best}%</b><span>лучший результат</span></div>
              <div><b>${learned}/${song.vocab.length}</b><span>слов изучено</span></div>
              <div><b>${done}/${hw.total}</b><span>домашки</span></div>
              <div><b>${song.quiz.length}</b><span>вопросов</span></div>
            </div>
          </div>
        </section>

        <nav class="song-subnav" aria-label="Разделы урока">
          <button type="button" class="is-active" data-action="scroll-to" data-target="overview">О песне</button>
          <button type="button" data-action="scroll-to" data-target="lab">Лаборатория</button>
          <button type="button" data-action="scroll-to" data-target="theory">Теория · ${theoryTopics.length}</button>
          <button type="button" data-action="scroll-to" data-target="vocabulary">Словарь · ${song.vocab.length}</button>
          <button type="button" data-action="scroll-to" data-target="practice">Квиз · ${song.quiz.length}</button>
          <button type="button" data-action="scroll-to" data-target="homework">Задания · ${hw.total}</button>
        </nav>

        <section class="lesson-block" id="overview" data-lesson-section="overview">
          <div class="lesson-head">
            <div><div class="eyebrow">Разбор</div><h2>Почему именно эта песня</h2><p>Смысл, языковые паттерны и то, что стоит забрать в свою речь.</p></div>
            <div class="lesson-head__aside">${fullTrackButtonMarkup(song, "btn btn--ghost btn--sm")}</div>
          </div>
          <div class="lesson-grid">
            <article class="level-reason">
              <div class="eyebrow">Уровень ${level.code} · зачем слушать</div>
              <p>${esc(song.why)}</p>
              <span class="grammar-chip">${icon("layers")} ${esc(song.grammar)}</span>
              <small>Совет: сначала послушай песню целиком без остановок. Потом вернись к словам — так мозг сначала учится слышать ритм и интонацию, а уже затем смысл.</small>
            </article>
            <article class="panel">
              <div class="eyebrow">Языковые паттерны</div>
              <h3>Забери эти фразы в речь</h3>
              <p>${song.chunks.length} ${plural(song.chunks.length, "конструкция", "конструкции", "конструкций")}, которые встречаются в песне и пригодятся в реальном разговоре.</p>
              <div class="pattern-list">
                ${song.chunks.map((chunk, index) => `<div class="pattern-row"><b>${String(index + 1).padStart(2, "0")}</b><div><strong>${esc(chunk.en)}</strong><span>${esc(chunk.ru)}</span></div></div>`).join("")}
              </div>
              <div class="panel__note">Слова и фразы озвучиваются голосом браузера. Акцент и скорость можно изменить в профиле.</div>
            </article>
          </div>

          <div class="listening-map">
            <div class="listening-map__head">
              <div><div class="eyebrow">Карта прослушивания</div><h3>Как устроена песня</h3></div>
              <span>${icon("headphones")} слушай и отмечай</span>
            </div>
            <div class="listening-timeline">
              ${(song.structure || []).map((point, index) => `<div class="listening-point">
                <span class="listening-point__time">${esc(point.time)}</span>
                <span class="listening-point__dot"></span>
                <div><b>${esc(point.label)}</b><p>${esc(point.focus)}</p></div>
              </div>`).join("")}
            </div>
          </div>

          <div class="artist-panel">
            <div class="artist-panel__head">
              <div><div class="eyebrow">Артист</div><h3>${esc(song.artist)}</h3></div>
              <span class="artist-panel__year">${song.year}</span>
            </div>
            <p class="artist-panel__bio">${esc(song.artistBio || "Биография артиста и контекст песни.")}</p>
            ${(song.facts || []).length ? `<div class="artist-panel__facts">${song.facts.map((fact) => `<span>${esc(fact)}</span>`).join("")}</div>` : ""}
            ${(song.listenNext || []).length ? `<div class="artist-panel__next"><span>Ещё у этого артиста</span>${song.listenNext.map((item) => `<a href="https://music.apple.com/us/search?term=${encodeURIComponent(`${item.title} ${item.artist}`)}" target="_blank" rel="noopener noreferrer"><b>${esc(item.title)}</b><small>${esc(item.why)}</small></a>`).join("")}</div>` : ""}
          </div>
        </section>

        ${renderLabSection(song)}

        <section class="lesson-block" id="theory" data-lesson-section="theory">
          <div class="lesson-head">
            <div><div class="eyebrow">Теория урока</div><h2>Разберись, почему это работает</h2><p>${theoryTopics.length ? "Короткая теория по грамматике и языковым приёмам этой песни — с формулами, примерами и проверкой." : "Для этой песни теория появится позже."}</p></div>
            <div class="lesson-head__aside"><a class="btn btn--ghost btn--sm" href="#/theory">Вся теория ${icon("arrow")}</a></div>
          </div>
          <div class="theory-grid theory-grid--lesson">
            ${theoryTopics.map((topic) => renderTheoryCard(topic)).join("")}
          </div>
        </section>

        <section class="lesson-block" id="vocabulary" data-lesson-section="vocabulary">
          <div class="lesson-head">
            <div><div class="eyebrow">Словарь урока · ${song.vocab.length} единиц</div><h2>${song.vocab.length} слов, которые останутся</h2><p>Нажми на динамик, чтобы услышать слово. Отмечай изученное и сохраняй в личный словарь.</p></div>
            <div class="lesson-head__aside">
              <button class="btn btn--ghost btn--sm" type="button" data-action="speak-list" data-scope="song" data-id="${song.id}">${icon("volume")} Слушать все</button>
              <a class="btn btn--ghost btn--sm" href="#/vocabulary">Мой словарь ${icon("arrow")}</a>
            </div>
          </div>
          <div class="vocab-grid">
            ${song.vocab.map((word, index) => renderWordCard({ ...word, id: `${song.id}-${index}`, songId: song.id, level: song.level, songTitle: song.title, artist: song.artist })).join("")}
          </div>
        </section>

        <section class="lesson-block" id="practice" data-lesson-section="practice">
          <div class="practice-panel">
            <div>
              <div class="eyebrow">Проверка материала</div>
              <h2>${best >= 80 ? "Закрепи результат — пройди ещё раз" : "Проверь, как усвоились слова и смысл"}</h2>
              <p>${song.quiz.length} вопросов: перевод, контекст, аудирование, грамматика и главная идея. Порог освоения — 80%. Результат сохранится в личном прогрессе, а ошибки попадут в словарь для повторения.</p>
              <div class="practice-panel__features">
                <span>${icon("check")} ${song.quiz.length} вопросов</span>
                <span>${icon("clock")} ~${Math.max(5, Math.round(song.quiz.length * 0.8))} минут</span>
                <span>${icon("target")} порог 80%</span>
                <span>${icon("bookmark")} ошибки в словарь</span>
              </div>
            </div>
            <div class="practice-panel__action">
              <div class="score-ring" style="--p:${best}" aria-label="Лучший результат ${best}%">
                <div class="score-ring__copy"><b>${best}%</b><span>лучший</span></div>
              </div>
              <button class="btn btn--lime" type="button" data-action="start-quiz" data-song="${song.id}">${best ? "Пройти ещё раз" : "Начать мини-квиз"} ${icon("arrow")}</button>
            </div>
          </div>
        </section>

        <section class="lesson-block" id="homework" data-lesson-section="homework">
          <div class="lesson-head">
            <div><div class="eyebrow">Большие задания · ${hw.total}</div><h2>${hw.total} заданий, чтобы песня осталась в голове</h2><p>Слушай, разбирай строки на слух, переписывай грамматику, говори и создавай своё. Ответы сохраняются автоматически.</p></div>
            <div class="lesson-head__aside">
              <div class="homework-progress">
                <div class="progress-track"><i data-hw-bar style="width:${(done / hw.total) * 100}%"></i></div>
                <span><b data-hw-count>${done}</b> / ${hw.total}</span>
              </div>
              <div class="homework-toolbar">
                <button class="btn btn--ghost btn--sm" type="button" data-action="download-homework" data-song="${song.id}">${icon("download")} Скачать</button>
                <button class="btn btn--ghost btn--sm" type="button" data-action="print-homework" data-song="${song.id}">${icon("book")} Печать</button>
              </div>
            </div>
          </div>
          <div class="homework-list">
            ${song.homework.map((task, index) => renderHomeworkCard(song, task, index, tasks[index] || {})).join("")}
          </div>
        </section>

        <div class="song-nav">
          ${previous ? `<a href="#/song/${previous.id}">${coverMarkup(previous)}<span><small>Предыдущая песня</small><b>${esc(previous.title)} · ${esc(previous.artist)}</b></span></a>` : `<a href="#/level/${level.id}"><span class="round-arrow">${icon("arrowLeft")}</span><span><small>Вернуться к уровню</small><b>${level.code} · ${level.name}</b></span></a>`}
          ${next ? `<a href="#/song/${next.id}">${coverMarkup(next)}<span><small>Следующая песня</small><b>${esc(next.title)} · ${esc(next.artist)}</b></span></a>` : `<a href="#/progress"><span class="round-arrow">${icon("chart")}</span><span><small>Куда дальше</small><b>Посмотреть прогресс</b></span></a>`}
        </div>
      </div>
    `;
  }

  function renderWordCard(word) {
    const current = wordState(word.id);
    const song = SONG_BY_ID[word.songId];
    return `<article class="word-card ${current.learned ? "is-learned" : ""}">
      <div class="word-card__top">
        <div>
          <div class="word-card__title"><h4>${esc(word.word)}</h4><span class="ipa">${esc(word.ipa)}</span></div>
          <span class="pos">${esc(word.pos)}</span>
        </div>
        <div class="word-card__actions">
          <button class="mini-icon" type="button" data-action="speak-word" data-say="${attr(word.word)}" aria-label="Прослушать ${attr(word.word)}" title="Прослушать">${icon("volume")}</button>
          <button class="mini-icon ${current.learned ? "is-learned" : ""}" type="button" data-action="toggle-learned" data-word="${word.id}" aria-label="${current.learned ? "Отменить изучение" : "Отметить изученным"}" aria-pressed="${current.learned}" title="Изучено">${icon("check")}</button>
          <button class="mini-icon ${current.saved ? "is-active" : ""}" type="button" data-action="toggle-saved" data-word="${word.id}" aria-label="${current.saved ? "Убрать из словаря" : "Сохранить в словарь"}" aria-pressed="${current.saved}" title="В мой словарь">${icon("bookmark")}</button>
        </div>
      </div>
      <p class="translation">${esc(word.ru)}</p>
      <p class="example">${esc(word.example)}</p>
      <div class="word-card__foot">
        <a class="word-card__source" href="#/song/${song.id}">${esc(song.title)} · ${esc(song.artist)}</a>
        <span class="word-status ${current.learned ? "is-done" : ""}">${current.learned ? `${icon("check")} изучено` : "не отмечено"}</span>
      </div>
    </article>`;
  }

  function renderHomeworkCard(song, task, index, saved) {
    const done = Boolean(saved.done);
    const checks = saved.checks || {};
    const steps = Array.isArray(task.steps) ? task.steps : [];
    const selfCheck = Array.isArray(task.selfCheck) ? task.selfCheck : [];
    return `<article class="homework-card ${done ? "is-done" : ""}" data-homework-card="${index}">
      <div class="homework-card__num">${String(index + 1).padStart(2, "0")}</div>
      <div>
        <div class="homework-card__head">
          <div>
            <h3>${esc(task.title)}</h3>
            <div class="homework-card__tags"><span>${esc(task.type)}</span><span>${task.minutes} минут</span></div>
          </div>
          <label class="homework-card__check">
            <input type="checkbox" data-hw-check data-song="${song.id}" data-idx="${index}" ${done ? "checked" : ""}>
            <span>выполнено</span>
          </label>
        </div>
        <p class="homework-card__task">${esc(task.task)}</p>
        ${task.goal ? `<p class="homework-goal">${icon("target")} ${esc(task.goal)}</p>` : ""}
        ${steps.length ? `<ol class="homework-steps">${steps.map((step) => `<li>${esc(step)}</li>`).join("")}</ol>` : ""}
        ${task.deliverable ? `<div class="homework-deliverable"><b>Результат:</b> ${esc(task.deliverable)}</div>` : ""}
        <div class="homework-details">
          ${selfCheck.length ? `<details class="homework-hint" open><summary>Самопроверка · ${Object.values(checks).filter(Boolean).length}/${selfCheck.length}</summary><div class="homework-checks">${selfCheck.map((item, checkIndex) => `<label><input type="checkbox" data-hw-self data-song="${song.id}" data-idx="${index}" data-check="${checkIndex}" ${checks[checkIndex] ? "checked" : ""}><span>${esc(item)}</span></label>`).join("")}</div></details>` : ""}
          ${task.hint ? `<details class="homework-hint"><summary>Подсказка</summary><p>${esc(task.hint)}</p></details>` : ""}
        </div>
        <div class="homework-answer">
          <textarea data-hw-text data-song="${song.id}" data-idx="${index}" placeholder="Твой ответ, план или черновик..." aria-label="Ответ на задание «${attr(task.title)}»">${esc(saved.text || "")}</textarea>
          <div class="homework-save">
            <span class="save-status" data-save-status>${saved.text ? "Сохранено" : "Сохраняется автоматически"}</span>
            <button type="button" data-action="save-homework" data-song="${song.id}" data-idx="${index}">Сохранить</button>
          </div>
        </div>
      </div>
    </article>`;
  }

  function setupSongSections(route) {
    const buttons = $$(".song-subnav button");
    const blocks = $$("[data-lesson-section]");
    if (!blocks.length) return;
    const setActive = (id) => {
      buttons.forEach((button) => button.classList.toggle("is-active", button.dataset.target === id));
    };
    if (route.section) setActive(route.section);
    if (!("IntersectionObserver" in window)) return;
    activeSectionObserver = new IntersectionObserver((entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (visible) setActive(visible.target.dataset.lessonSection);
    }, { rootMargin: "-18% 0px -62% 0px", threshold: [0, 0.15, 0.4] });
    blocks.forEach((block) => activeSectionObserver.observe(block));
  }

  /* ------------------------------------------------------------
     Vocabulary
     ------------------------------------------------------------ */
  let vocabUI = { q: "", level: "all", status: "all", limit: 120 };

  function filteredWords() {
    const q = vocabUI.q.trim().toLowerCase();
    return ALL_WORDS.filter((word) => {
      const current = wordState(word.id);
      if (vocabUI.level !== "all" && word.level !== vocabUI.level) return false;
      if (vocabUI.status === "saved" && !current.saved) return false;
      if (vocabUI.status === "learning" && (!current.saved || current.learned)) return false;
      if (vocabUI.status === "learned" && !current.learned) return false;
      if (q) {
        const haystack = `${word.word} ${word.ru} ${word.example} ${word.artist} ${word.songTitle}`.toLowerCase();
        if (!haystack.includes(q)) return false;
      }
      return true;
    });
  }

  function renderVocabularyPage() {
    const totalLearned = learnedWords();
    const totalSaved = savedWords();
    const coverage = Math.round((totalLearned / ALL_WORDS.length) * 100);
    vocabUI.q = "";
    vocabUI.level = "all";
    vocabUI.status = "all";
    vocabUI.limit = 120;

    return `
      <div class="shell">
        <section class="vocab-page-hero">
          <div>
            <div class="eyebrow">Личный словарь · ${TOTAL_WORDS} слов</div>
            <h1>Слова, которые<br><em>остаются</em>.</h1>
            <p>Вся лексика из ${TOTAL_SONGS} песен в одном месте. Слушай произношение, сохраняй важное, отмечай изученное и повторяй в карточках.</p>
          </div>
          <div class="vocab-stats">
            <div><b>${totalLearned}</b><span>выучено</span></div>
            <div><b>${totalSaved}</b><span>в словаре</span></div>
            <div><b>${dueWords().length}</b><span>к повторению</span></div>
            <div><b>${coverage}%</b><span>покрытие</span></div>
          </div>
        </section>

        <div class="vocab-tools">
          <div class="search-box">
            ${icon("search")}
            <input id="vocabSearch" type="search" placeholder="Найти слово, перевод или песню..." autocomplete="off" aria-label="Поиск по словарю">
          </div>
          <div class="filter-chips" role="group" aria-label="Фильтр слов">
            <button class="chip is-active" type="button" data-action="vocab-status" data-status="all" data-vocab-status>Все</button>
            <button class="chip" type="button" data-action="vocab-status" data-status="saved" data-vocab-status>Мой словарь</button>
            <button class="chip" type="button" data-action="vocab-status" data-status="learning" data-vocab-status>Изучаю</button>
            <button class="chip" type="button" data-action="vocab-status" data-status="learned" data-vocab-status>Выучено</button>
          </div>
          <div class="select-wrap">
            <select id="vocabLevel" aria-label="Фильтр по уровню">
              <option value="all">Все уровни</option>
              ${LEVELS.map((level) => `<option value="${level.id}">${level.code} · ${level.name}</option>`).join("")}
            </select>
          </div>
          <button class="btn btn--ghost btn--sm" type="button" data-action="speak-list" data-scope="vocab">${icon("volume")} Слушать всё</button>
        </div>

        <div class="vocab-list-head"><span>Найдено: <b id="vocabFound">${ALL_WORDS.length}</b></span><span>${totalLearned} из ${ALL_WORDS.length} слов отмечено как изученные · показано <b id="vocabShown">${Math.min(120, ALL_WORDS.length)}</b></span></div>
        <div id="vocabList">${renderVocabGroups(filteredWords().slice(0, vocabUI.limit), filteredWords().length)}</div>

        <div class="vocab-cta">
          <div>
            <h2>Повторить по алгоритму?</h2>
            <p>Интервальное повторение возвращает слово за день до забывания. Четыре оценки — и у каждого слова свой следующий срок.</p>
          </div>
          <div class="vocab-cta__actions">
            <a class="btn btn--ghost" href="#/review">${icon("calendar")} Мой план</a>
            <button class="btn btn--primary" type="button" data-action="start-srs">${icon("rotate")} Начать повторение <span class="btn-arrow">${icon("arrow")}</span></button>
          </div>
        </div>
      </div>
    `;
  }

  function renderVocabGroups(words, total = words.length) {
    if (!words.length) {
      return `<div class="vocab-empty"><h3>Здесь пока тихо</h3><p>Попробуй изменить запрос или сбросить фильтры. А ещё можно сохранить слова из любого урока — они появятся в «Моём словаре».</p><button class="btn btn--ghost btn--sm" type="button" data-action="reset-vocab" style="margin-top:15px">Сбросить фильтры</button></div>`;
    }
    const groups = LEVELS.map((level) => {
      const levelWords = words.filter((word) => word.level === level.id);
      if (!levelWords.length) return "";
      const allLevel = ALL_WORDS.filter((word) => word.level === level.id);
      const learned = allLevel.filter((word) => wordState(word.id).learned).length;
      const pct = allLevel.length ? Math.round((learned / allLevel.length) * 100) : 0;
      return `<section class="vocab-group">
        <div class="vocab-group__head" style="--color:${level.color};--tint:${level.tint}">
          ${levelBadge(level)}
          <h2>${level.name}</h2>
          <span>${levelWords.length} из ${allLevel.length} ${plural(allLevel.length, "слово", "слова", "слов")}</span>
          <div class="progress-track"><i style="width:${pct}%"></i></div>
        </div>
        ${levelWords.map((word) => renderWordRow(word)).join("")}
      </section>`;
    }).join("");
    return groups + (total > words.length ? `<div class="vocab-more"><button class="btn btn--ghost" type="button" data-action="vocab-more">Показать ещё ${Math.min(120, total - words.length)} слов ${icon("arrow")}</button><span>Показано ${words.length} из ${total}</span></div>` : "");
  }

  function renderWordRow(word) {
    const current = wordState(word.id);
    return `<article class="word-row ${current.learned ? "is-learned" : ""}">
      <button class="sound-btn word-row__play" type="button" data-action="speak-word" data-say="${attr(word.word)}" aria-label="Прослушать ${attr(word.word)}">${icon("volume")}</button>
      <div class="word-row__word"><b>${esc(word.word)}</b><span class="ipa">${esc(word.ipa)}</span><span class="pos">${esc(word.pos)}</span></div>
      <div class="word-row__translation">${esc(word.ru)}<span class="word-row__source"> · ${esc(word.songTitle)}</span></div>
      <div class="word-row__example">${esc(word.example)}</div>
      <div class="word-row__actions">
        <button class="mini-icon ${current.learned ? "is-learned" : ""}" type="button" data-action="toggle-learned" data-word="${word.id}" aria-label="${current.learned ? "Отменить изучение" : "Отметить изученным"}" aria-pressed="${current.learned}" title="Изучено">${icon("check")}</button>
        <button class="mini-icon ${current.saved ? "is-active" : ""}" type="button" data-action="toggle-saved" data-word="${word.id}" aria-label="${current.saved ? "Убрать из словаря" : "Сохранить в словарь"}" aria-pressed="${current.saved}" title="В мой словарь">${icon("bookmark")}</button>
      </div>
    </article>`;
  }

  function syncVocabFilters(resetLimit = true) {
    const search = $("#vocabSearch");
    const level = $("#vocabLevel");
    if (search) vocabUI.q = search.value;
    if (level) vocabUI.level = level.value;
    if (resetLimit) vocabUI.limit = 120;
    $$("[data-vocab-status]").forEach((chip) => {
      chip.classList.toggle("is-active", chip.dataset.status === vocabUI.status);
    });
    const list = $("#vocabList");
    const found = $("#vocabFound");
    const shown = $("#vocabShown");
    const words = filteredWords();
    if (found) found.textContent = words.length;
    if (shown) shown.textContent = Math.min(vocabUI.limit, words.length);
    if (list) list.innerHTML = renderVocabGroups(words.slice(0, vocabUI.limit), words.length);
  }

  /* ------------------------------------------------------------
     Progress
     ------------------------------------------------------------ */
  function renderProgressPage() {
    const level = estimatedLevel();
    const mastery = overallMastery();
    const learned = learnedWords();
    const completed = completedCount();
    const mastered = masteredCount();
    const homework = homeworkDoneCount();
    const goal = Math.max(15, Number(state.profile.goal) || 60);
    const minutes = weekMinutes();
    const goalPct = clamp(Math.round((minutes / goal) * 100), 0, 100);
    const streak = currentStreak();
    const nextLevel = level ? LEVELS[Math.min(LEVEL_ORDER.indexOf(level.id) + 1, LEVELS.length - 1)] : LEVELS[0];

    return `
      <div class="shell">
        <section class="progress-hero">
          <div>
            <div class="eyebrow">Личный прогресс</div>
            <h1>${level ? `Уровень — <em>${level.code}</em>.` : `Начало маршрута<br><em>ещё впереди</em>.`}</h1>
            <p>${level ? `Результаты заданий складываются в уровень ${level.code}. ${nextLevel.id !== level.id ? `Следующий шаг — ${nextLevel.code} · ${nextLevel.name}.` : "Можно закрепить результат или перейти к повторению."}` : "Пройди первое задание, отметь несколько слов — и здесь появится твой уровень, ритм занятий и карта роста."}</p>
            <div class="level-estimate">
              <span class="level-estimate__badge">${level ? level.code : "A1"}</span>
              <div><b>${level ? `${level.name} · ${level.ru}` : "Стартовая точка"}</b><span>${mastery}% общего освоения · ${mastered} из ${TOTAL_SONGS} песен освоено</span></div>
            </div>
          </div>
          <div class="goal-card">
            <div class="goal-ring" style="--p:${goalPct}">
              <div class="goal-ring__copy"><b>${goalPct}%</b><span>цели недели</span></div>
            </div>
            <h3>${minutes} из ${goal} минут</h3>
            <p>${goalPct >= 100 ? "Недельная цель выполнена. Отличный ритм!" : "Слушай, разбирай, повторяй — минуты складываются в язык."}</p>
            <button type="button" data-action="open-profile">Изменить цель</button>
          </div>
        </section>

        <div class="stat-grid">
          <div class="stat-card"><div class="stat-card__icon">${icon("spark")}</div><b>${formatNumber(state.xp)}</b><span>опыта всего</span></div>
          <div class="stat-card"><div class="stat-card__icon">${icon("flame")}</div><b>${streak}</b><span>${plural(streak, "день", "дня", "дней")} подряд</span></div>
          <div class="stat-card"><div class="stat-card__icon">${icon("check")}</div><b>${completed}</b><span>${plural(completed, "урок", "урока", "уроков")} ${completed === 1 ? "начат" : "начато"}</span></div>
          <div class="stat-card"><div class="stat-card__icon">${icon("book")}</div><b>${learned}</b><span>слов изучено · ${dueWords().length} к повторению</span></div>
        </div>

        <div class="progress-columns">
          <section class="progress-panel">
            <div class="progress-panel__head"><div><h2>Карта уровней</h2><p>Оценка складывается из результатов заданий, слов и охвата песен.</p></div><span class="level-badge" style="${level ? levelVars(level) : levelVars(LEVELS[0])}">${level ? level.code : "A1"}</span></div>
            <div class="level-bars">
              ${LEVELS.map((item) => {
                const progress = levelProgress(item.id);
                return `<div class="level-bar" style="--color:${item.color}">
                  <div class="level-bar__head"><b>${item.code}</b><span>${item.name}</span><em>${progress.pct}% · ${progress.learned}/${progress.words} слов</em></div>
                  <div class="progress-track"><i style="width:${progress.pct}%"></i></div>
                </div>`;
              }).join("")}
            </div>
          </section>

          <section class="progress-panel">
            <div class="progress-panel__head"><div><h2>Достижения</h2><p>Маленькие поводы продолжать.</p></div><span class="muted" style="font-size:9px">${achievements().filter((item) => item.unlocked).length} из ${achievements().length}</span></div>
            <div class="achievements">
              ${achievements().map((item) => `<div class="achievement ${item.unlocked ? "is-unlocked" : ""}"><span class="achievement__icon">${icon(item.icon)}</span><div><b>${esc(item.title)}</b><span>${esc(item.description)}</span></div></div>`).join("")}
            </div>
          </section>
        </div>

        <section class="progress-panel activity-panel">
          <div class="activity-head"><div><h2>Ритм занятий</h2><span>последние 12 недель · минуты, опыт и повторения</span></div><span>${formatNumber(minutes)} мин · ${reviewsToday()} повторений сегодня</span></div>
          <div class="heatmap-wrap">${renderHeatmap()}</div>
          <div class="heatmap-legend"><span>меньше</span><i style="background:#e8dfd0"></i><i style="background:#d7e8b8"></i><i style="background:#b6db86"></i><i style="background:#7fbd5c"></i><i style="background:#2e8b77"></i><span>больше</span></div>
        </section>

        <section class="progress-panel certificate-panel">
          <div class="progress-panel__head"><div><h2>Сертификаты</h2><p>Уровень открывается, когда 8 из 10 песен пройдены на 80% и выше.</p></div><span class="level-badge">${LEVELS.filter((item) => certificateEligible(item.id)).length} / 6</span></div>
          <div class="certificate-list">
            ${LEVELS.map((item) => {
              const progress = levelProgress(item.id);
              const unlocked = certificateEligible(item.id);
              return `<div class="certificate-row ${unlocked ? "is-unlocked" : ""}" style="--color:${item.color};--tint:${item.tint}">
                <span class="certificate-row__level">${item.code}</span>
                <div><b>${item.name}</b><span>${unlocked ? "Сертификат доступен" : `${progress.mastered} из 8 песен на 80%+`}</span></div>
                ${unlocked ? `<button class="btn btn--ghost btn--sm" type="button" data-action="open-certificate" data-level="${item.id}">${icon("trophy")} Открыть</button>` : `<span class="certificate-row__lock">${icon("lock")} ${progress.pct}%</span>`}
              </div>`;
            }).join("")}
          </div>
        </section>

        <div class="progress-columns">
          <section class="progress-panel">
            <div class="progress-panel__head"><div><h2>История занятий</h2><p>Последние попытки и результаты.</p></div>${completed ? `<a class="link-arrow" href="#/levels">К уровням ${icon("arrow")}</a>` : ""}</div>
            ${renderHistory()}
          </section>
          <section class="progress-panel">
            <div class="progress-panel__head"><div><h2>Домашние работы</h2><p>${homework} из ${TOTAL_HOMEWORK} заданий выполнено.</p></div><span class="level-badge">${Math.round((homework / TOTAL_HOMEWORK) * 100)}%</span></div>
            <div class="progress-track" style="height:6px"><i style="width:${(homework / TOTAL_HOMEWORK) * 100}%;background:var(--teal)"></i></div>
            <div class="homework-summary">
              ${SONGS.map((song) => {
                const tasks = state.homework[song.id] || {};
                const done = Object.values(tasks).filter((task) => task && task.done).length;
                return `<a href="#/song/${song.id}/homework"><b>${esc(song.title)}</b><span>${done}/${song.homework.length}</span><div class="progress-track"><i style="width:${(done / song.homework.length) * 100}%"></i></div></a>`;
              }).slice(0, 5).join("")}
            </div>
            <div class="progress-actions">
              <a class="btn btn--ghost btn--sm" href="#/review">${icon("rotate")} Повторение${dueWords().length ? ` · ${dueWords().length}` : ""}</a>
              <a class="btn btn--ghost btn--sm" href="#/song/${getNextSong().id}/homework">${icon("pen")} Открыть домашку</a>
              <button class="btn btn--ghost btn--sm" type="button" data-action="open-profile">${icon("download")} Данные</button>
            </div>
          </section>
        </div>
      </div>
    `;
  }

  function certificateEligible(levelId) {
    return levelProgress(levelId).mastered >= 8;
  }

  function certificateCode(level) {
    return `LYRICA-${level.code}-${dayKey().replace(/-/g, "")}`;
  }

  function certificateMarkup(level) {
    const progress = levelProgress(level.id);
    return `<div class="certificate">
      <div class="certificate__top"><span class="certificate__brand">LYRICA</span><span class="certificate__stamp">${icon("trophy")}</span></div>
      <div class="certificate__eyebrow">Certificate of completion · CEFR</div>
      <h2>${esc(state.profile.name || "Студент")}</h2>
      <p>успешно завершил(а) уровень <b>${level.code} · ${esc(level.name)}</b><br>в курсе английского языка через музыку.</p>
      <div class="certificate__level">${level.code}</div>
      <div class="certificate__stats">
        <div><b>${progress.mastered}/${progress.total}</b><span>песен на 80%+</span></div>
        <div><b>${progress.learned}/${progress.words}</b><span>слов уровня</span></div>
        <div><b>${formatNumber(state.xp)}</b><span>XP всего</span></div>
      </div>
      <div class="certificate__foot"><span>${formatFullDate(new Date())}</span><b>${certificateCode(level)}</b></div>
    </div>`;
  }

  function certificateDocument(level) {
    const progress = levelProgress(level.id);
    return `<!doctype html><html lang="ru"><head><meta charset="utf-8"><title>LYRICA — сертификат ${level.code}</title><style>
      @page { size: A4 landscape; margin: 0; }
      * { box-sizing: border-box; } body { margin: 0; padding: 24px; background: #f3ebdd; font-family: Georgia, "Times New Roman", serif; color: #17130f; }
      .certificate { width: 100%; max-width: 1050px; min-height: 650px; margin: 0 auto; padding: 55px 65px; border: 2px solid #17130f; border-radius: 28px; background: #fffdf7; position: relative; overflow: hidden; }
      .certificate::before { content: ""; position: absolute; inset: 14px; border: 1px solid rgba(23,19,15,.18); border-radius: 20px; pointer-events: none; }
      .certificate__top { display: flex; justify-content: space-between; align-items: center; font-family: sans-serif; font-weight: 800; letter-spacing: .18em; font-size: 13px; }
      .certificate__stamp { display: grid; place-items: center; width: 58px; height: 58px; border-radius: 50%; background: #c8f26b; }
      .certificate__stamp svg { width: 28px; height: 28px; fill: none; stroke: #17130f; stroke-width: 1.4; }
      .certificate__eyebrow { margin-top: 70px; color: #b93717; font-family: sans-serif; font-size: 10px; font-weight: 800; letter-spacing: .16em; text-transform: uppercase; }
      h2 { margin: 12px 0 0; font-size: 56px; font-weight: 500; letter-spacing: -.04em; }
      p { max-width: 620px; margin: 12px 0 0; color: #51483e; font-size: 16px; line-height: 1.55; }
      p b { color: #17130f; }
      .certificate__level { position: absolute; right: 65px; top: 210px; font-family: Georgia, serif; font-size: 150px; line-height: .8; color: #e8552f; opacity: .2; }
      .certificate__stats { display: flex; gap: 35px; margin-top: 42px; font-family: sans-serif; }
      .certificate__stats div { display: flex; flex-direction: column; gap: 3px; } .certificate__stats b { font-family: Georgia, serif; font-size: 28px; font-weight: 500; } .certificate__stats span { color: #7d7266; font-size: 9px; }
      .certificate__foot { display: flex; justify-content: space-between; align-items: end; margin-top: 45px; padding-top: 14px; border-top: 1px solid rgba(23,19,15,.2); font-family: sans-serif; color: #7d7266; font-size: 10px; }
      .certificate__foot b { color: #17130f; letter-spacing: .08em; }
      @media print { body { background: #fffdf7; padding: 0; } .certificate { border-radius: 0; max-width: none; min-height: 100vh; } }
    </style></head><body><div class="certificate">
      <div class="certificate__top"><span>LYRICA</span><span class="certificate__stamp">★</span></div>
      <div class="certificate__eyebrow">Certificate of completion · CEFR</div>
      <h2>${esc(state.profile.name || "Студент")}</h2>
      <p>успешно завершил(а) уровень <b>${level.code} · ${esc(level.name)}</b><br>в курсе английского языка через музыку.</p>
      <div class="certificate__level">${level.code}</div>
      <div class="certificate__stats"><div><b>${progress.mastered}/${progress.total}</b><span>песен на 80%+</span></div><div><b>${progress.learned}/${progress.words}</b><span>слов уровня</span></div><div><b>${formatNumber(state.xp)}</b><span>XP всего</span></div></div>
      <div class="certificate__foot"><span>${formatFullDate(new Date())}</span><b>${certificateCode(level)}</b></div>
    </div></body></html>`;
  }

  function openCertificate(levelId) {
    const level = LEVEL_BY_ID[levelId];
    if (!level || !certificateEligible(levelId)) {
      toast("Сертификат откроется, когда 8 из 10 песен уровня будут пройдены на 80%+", "error");
      return;
    }
    openModal(`<div class="certificate-modal">
      ${certificateMarkup(level)}
      <div class="certificate-actions">
        <button class="btn btn--primary" type="button" data-action="print-certificate" data-level="${level.id}">${icon("download")} Печать</button>
        <button class="btn btn--ghost" type="button" data-action="download-certificate" data-level="${level.id}">${icon("download")} Скачать HTML</button>
        <button class="btn btn--ghost" type="button" data-action="close-modal">Закрыть</button>
      </div>
    </div>`, { kind: "certificate", className: "modal--certificate", label: `Сертификат ${level.code}`, focus: ".certificate-actions .btn" });
  }

  function printCertificate(levelId) {
    const level = LEVEL_BY_ID[levelId];
    if (!level) return;
    const win = window.open("", "_blank");
    if (!win) {
      toast("Разреши всплывающие окна, чтобы напечатать сертификат", "error");
      return;
    }
    win.document.open();
    win.document.write(certificateDocument(level));
    win.document.close();
    win.focus();
    setTimeout(() => win.print(), 350);
  }

  function downloadCertificate(levelId) {
    const level = LEVEL_BY_ID[levelId];
    if (!level) return;
    try {
      const blob = new Blob([certificateDocument(level)], { type: "text/html;charset=utf-8" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `LYRICA-certificate-${level.code}.html`;
      document.body.appendChild(link);
      link.click();
      link.remove();
      setTimeout(() => URL.revokeObjectURL(url), 1000);
      toast("Сертификат скачан");
    } catch (error) {
      toast("Не удалось скачать сертификат", "error");
    }
  }

  function achievements() {
    const completed = completedCount();
    const learned = learnedWords();
    const homework = homeworkDoneCount();
    const anyLevels = LEVELS.every((level) => levelSongs(level.id).some((song) => completion(song.id)));
    return [
      { id: "first", title: "Первый аккорд", description: "Заверши первый урок", icon: "music", unlocked: completed > 0 },
      { id: "perfect", title: "Идеальный слух", description: "100% в одном уроке", icon: "star", unlocked: SONGS.some((song) => songScore(song.id) === 100) },
      { id: "words10", title: "Коллекционер", description: "25 слов изучено", icon: "book", unlocked: learned >= 25 },
      { id: "words50", title: "Лексический запас", description: "150 слов изучено", icon: "layers", unlocked: learned >= 150 },
      { id: "five", title: "Половина пути", description: "10 песен начато", icon: "headphones", unlocked: completed >= 10 },
      { id: "alllevels", title: "Шесть октав", description: "Урок на каждом уровне", icon: "chart", unlocked: anyLevels },
      { id: "streak7", title: "Неделя в ритме", description: "7 дней подряд", icon: "flame", unlocked: currentStreak() >= 7 },
      { id: "homework10", title: "Домашний герой", description: "25 заданий выполнено", icon: "pen", unlocked: homework >= 25 }
    ];
  }

  function renderHeatmap() {
    const end = new Date();
    end.setHours(0, 0, 0, 0);
    const start = addDays(end, -83);
    const offset = (start.getDay() + 6) % 7;
    let cells = "";
    for (let i = 0; i < offset; i += 1) cells += `<i style="visibility:hidden"></i>`;
    for (let i = 0; i < 84; i += 1) {
      const date = addDays(start, i);
      const key = dayKey(date);
      const activity = state.activity[key];
      const minutes = Number(activity?.minutes) || 0;
      const reviews = Number(activity?.reviews) || 0;
      let level = 0;
      if (minutes > 0) level = 1;
      if (minutes >= 15) level = 2;
      if (minutes >= 30) level = 3;
      if (minutes >= 50) level = 4;
      const title = `${formatFullDate(date)}: ${minutes} мин, ${Number(activity?.xp) || 0} XP${reviews ? `, ${reviews} повторений` : ""}`;
      cells += `<i data-level="${level}" title="${attr(title)}" aria-label="${attr(title)}"></i>`;
    }
    return `<div class="heatmap">${cells}</div>`;
  }

  function renderHistory() {
    if (!state.history.length) {
      return `<div class="progress-empty">История появится после первого задания. Начни с любой песни — результат сохранится автоматически.</div>`;
    }
    return `<table class="history-table">
      <thead><tr><th>Песня</th><th>Дата</th><th>Результат</th><th>XP</th></tr></thead>
      <tbody>
        ${state.history.slice(0, 6).map((item) => {
          const song = SONG_BY_ID[item.songId];
          if (!song) return "";
          return `<tr>
            <td><a class="history-song" href="#/song/${song.id}">${coverMarkup(song)}<span><b>${esc(song.title)}</b><span>${esc(song.artist)}</span></span></a></td>
            <td>${formatDate(item.at)}</td>
            <td><span class="score-badge ${item.percent >= 80 ? "is-good" : ""}">${item.percent}%</span></td>
            <td>+${item.xp || 0}</td>
          </tr>`;
        }).join("")}
      </tbody>
    </table>`;
  }

  /* ------------------------------------------------------------
     Quiz
     ------------------------------------------------------------ */
  let quiz = null;

  function startQuiz(songId) {
    const song = SONG_BY_ID[songId];
    if (!song) return;
    quiz = {
      song,
      index: 0,
      score: 0,
      selected: null,
      answered: false,
      answers: [],
      done: false,
      result: null
    };
    openModal(quizShell(), {
      kind: "quiz",
      className: "modal--quiz",
      label: `Задания по песне ${song.title}`,
      focus: ".modal__close"
    });
    renderQuizQuestion();
  }

  function quizShell() {
    return `<div class="modal__inner">
      <div class="quiz-top" id="quizTop">
        <div class="quiz-top__row">
          <div class="quiz-song">${coverMarkup(quiz.song)}<div><b>${esc(quiz.song.title)}</b><span>${esc(quiz.song.artist)} · ${LEVEL_BY_ID[quiz.song.level].code}</span></div></div>
          <span class="quiz-count" id="quizCount">1 / ${quiz.song.quiz.length}</span>
          <button class="modal__close" type="button" data-action="close-quiz" aria-label="Закрыть задания">${icon("close")}</button>
        </div>
        <div class="quiz-progress"><i id="quizProgress" style="width:0%"></i></div>
      </div>
      <div class="quiz-body" id="quizBody"></div>
      <div class="quiz-foot" id="quizFoot"></div>
    </div>`;
  }

  function questionTypeLabel(question) {
    if (question.type === "listen") return "Аудирование";
    if (question.type === "gap") return "Контекст";
    if (question.prompt.startsWith("Выбери правильн")) return "Грамматика";
    if (/песн|О чём|настроение|главная тема/i.test(question.prompt)) return "Смысл песни";
    return "Лексика";
  }

  function renderQuizQuestion() {
    if (!quiz) return;
    const question = quiz.song.quiz[quiz.index];
    const total = quiz.song.quiz.length;
    const count = $("#quizCount");
    if (count) count.innerHTML = `<b>${quiz.index + 1}</b> / ${total}`;
    const progress = $("#quizProgress");
    if (progress) progress.style.width = `${((quiz.index + 1) / total) * 100}%`;
    const body = $("#quizBody");
    if (!body) return;

    const prompt = esc(question.prompt).replace(/___/g, '<span class="blank">_____</span>');
    const options = question.options.map((option, index) => {
      let stateClass = "";
      let mark = "";
      if (quiz.answered) {
        if (index === question.answer) {
          stateClass = "is-correct";
          mark = icon("check");
        } else if (index === quiz.selected) {
          stateClass = "is-wrong";
          mark = icon("close");
        }
      }
      return `<button class="quiz-option ${stateClass}" type="button" data-action="quiz-option" data-index="${index}" ${quiz.answered ? "disabled" : ""}>
        <span class="quiz-option__letter">${String.fromCharCode(65 + index)}</span>
        <span>${esc(option)}</span>
        <span class="quiz-option__mark">${mark}</span>
      </button>`;
    }).join("");

    const feedback = quiz.answered
      ? `<div class="quiz-feedback ${quiz.selected === question.answer ? "is-good" : "is-bad"}">
          <span class="quiz-feedback__icon">${icon(quiz.selected === question.answer ? "check" : "close")}</span>
          <div><b>${quiz.selected === question.answer ? "Верно" : "Почти"}</b><p>${esc(question.explain)}</p></div>
        </div>`
      : "";

    body.innerHTML = `
      <div class="quiz-kicker">${questionTypeLabel(question)} · вопрос ${quiz.index + 1}</div>
      <h2 class="quiz-question">${prompt}</h2>
      ${question.type === "listen" ? `<div class="quiz-listen">
        <button class="quiz-listen__btn" type="button" data-action="play-audio" data-say="${attr(question.audio)}" aria-label="Прослушать фразу">${icon("play")}</button>
        <div class="quiz-listen__copy"><b>Нажми, чтобы услышать фразу</b><span>Можно слушать сколько угодно раз</span></div>
      </div>` : ""}
      <div class="quiz-options">${options}</div>
      ${feedback}
    `;

    const foot = $("#quizFoot");
    if (foot) {
      foot.innerHTML = `<span class="quiz-foot__hint">${quiz.answered ? "Ответ записан. Читай объяснение и продолжай." : `Выбери один вариант · <kbd>1</kbd>–<kbd>${question.options.length}</kbd>`}</span>
        <button class="btn btn--primary btn--sm" type="button" data-action="quiz-next" ${quiz.answered ? "" : "disabled"}>${quiz.index === total - 1 ? "Результат" : "Дальше"} ${icon("arrow")}</button>`;
    }

    if (quiz.answered) {
      const nextButton = $("[data-action='quiz-next']", foot);
      if (nextButton) nextButton.focus({ preventScroll: true });
    }
  }

  function answerQuiz(index) {
    if (!quiz || quiz.done || quiz.answered) return;
    const question = quiz.song.quiz[quiz.index];
    if (!question.options[index]) return;
    quiz.selected = index;
    quiz.answered = true;
    const correct = index === question.answer;
    if (correct) quiz.score += 1;
    quiz.answers.push({ question, selected: index, correct });
    if (!correct && question.word) {
      const word = ALL_WORDS.find((item) => item.songId === quiz.song.id && item.word.toLowerCase() === question.word.toLowerCase());
      if (word) {
        const current = ensureWord(word.id);
        current.saved = true;
        current.updatedAt = new Date().toISOString();
        saveState();
      }
    }
    renderQuizQuestion();
  }

  function nextQuiz() {
    if (!quiz || !quiz.answered || quiz.done) return;
    if (quiz.index >= quiz.song.quiz.length - 1) {
      finishQuiz();
      return;
    }
    quiz.index += 1;
    quiz.selected = null;
    quiz.answered = false;
    renderQuizQuestion();
  }

  function finishQuiz() {
    if (!quiz) return;
    const total = quiz.song.quiz.length;
    const percent = Math.round((quiz.score / total) * 100);
    const previous = state.completed[quiz.song.id];
    const firstAttempt = !previous;
    const previousBest = Number(previous?.best) || 0;
    let xp = quiz.score * 10;
    if (percent >= 80) xp += 25;
    if (firstAttempt) xp += 10;
    if (percent > previousBest) xp += 5;

    state.completed[quiz.song.id] = {
      best: Math.max(previousBest, percent),
      attempts: (Number(previous?.attempts) || 0) + 1,
      lastAt: new Date().toISOString()
    };
    state.history.unshift({
      songId: quiz.song.id,
      score: quiz.score,
      total,
      percent,
      xp,
      at: new Date().toISOString()
    });
    state.history = state.history.slice(0, 50);

    const mistakes = quiz.answers
      .filter((answer) => !answer.correct)
      .map((answer) => ({
        prompt: answer.question.prompt,
        correct: answer.question.options[answer.question.answer],
        explain: answer.question.explain
      }));

    quiz.done = true;
    quiz.result = { percent, xp, mistakes, total, correct: quiz.score };
    recordActivity(xp, 7);
    completeDailyStep("quiz");
    saveState();
    renderQuizResult();
  }

  function renderQuizResult() {
    if (!quiz || !quiz.result) return;
    const { percent, xp, mistakes, total, correct } = quiz.result;
    const status = percent === 100 ? "Идеальный слух" : percent >= 80 ? "Уровень освоен" : percent >= 60 ? "Хороший старт" : "Есть что повторить";
    const copy = percent >= 80
      ? "Материал урока усвоен. Ошибки, если были, уже добавлены в личный словарь для повторения."
      : "Пока это только начало. Вернись к словарю, послушай произношение и попробуй снова — с каждым разом будет точнее.";
    const count = $("#quizCount");
    if (count) count.innerHTML = `Результат`;
    const progress = $("#quizProgress");
    if (progress) progress.style.width = "100%";
    $("#quizTop").classList.add("is-result");
    const body = $("#quizBody");
    const foot = $("#quizFoot");
    if (foot) foot.hidden = true;
    if (!body) return;

    body.innerHTML = `<div class="quiz-result">
      <div class="quiz-result__eyebrow">${esc(quiz.song.title)} · ${percent}%</div>
      <div class="result-score" style="--p:${percent}"><div class="result-score__copy"><b>${percent}%</b><span>${correct} из ${total}</span></div></div>
      <h2>${status}</h2>
      <p>${copy}</p>
      <div class="result-xp">${icon("spark")} +${xp} XP</div>
      ${mistakes.length ? `<details class="result-mistakes">
        <summary>Разобрать ошибки (${mistakes.length})</summary>
        <div class="result-mistakes__list">
          ${mistakes.map((mistake) => `<div class="mistake-row"><b>${esc(mistake.correct)}</b><span>${esc(mistake.prompt.replace("___", "…"))} — ${esc(mistake.explain)}</span></div>`).join("")}
        </div>
      </details>` : ""}
      <div class="result-actions">
        <button class="btn btn--primary" type="button" data-action="quiz-retry">${icon("rotate")} Ещё раз</button>
        <button class="btn btn--ghost" type="button" data-action="quiz-to-vocab">${icon("book")} В словарь</button>
        <button class="btn btn--ghost" type="button" data-action="close-quiz">К уроку</button>
      </div>
    </div>`;
    if (body) body.scrollTop = 0;
  }

  function closeQuiz() {
    quiz = null;
    closeModal();
    const route = parseRoute();
    if (route.name === "song") render();
  }

  /* ------------------------------------------------------------
     Flashcards
     ------------------------------------------------------------ */
  let flash = null;

  function startFlashcards(words = null) {
    const deck = words || reviewDeck(12);
    if (!deck.length) {
      toast("В этой подборке нет слов. Измени фильтр или сохрани слова из урока.");
      return;
    }
    flash = {
      words: deck.slice(0, 12),
      index: 0,
      revealed: false,
      known: 0,
      again: 0,
      hard: 0,
      done: false
    };
    openModal(`<div class="modal__inner">
      <div class="flash-progress">
        <div class="progress-track"><i id="flashBar" style="width:0%"></i></div>
        <span id="flashCount">1 / ${flash.words.length}</span>
        <button class="modal__close" type="button" data-action="close-flash" aria-label="Закрыть повторение">${icon("close")}</button>
      </div>
      <div class="flash-stage" id="flashStage"></div>
    </div>`, { kind: "flash", label: "Интервальное повторение", focus: ".flash-reveal" });
    renderFlashCard();
  }

  function renderFlashCard() {
    if (!flash) return;
    if (flash.done) {
      renderFlashComplete();
      return;
    }
    const word = flash.words[flash.index];
    const level = LEVEL_BY_ID[word.level] || LEVEL_BY_ID[SONG_BY_ID[word.songId]?.level] || LEVELS[0];
    const song = SONG_BY_ID[word.songId];
    const current = wordState(word.id);
    const bar = $("#flashBar");
    if (bar) bar.style.width = `${(flash.index / flash.words.length) * 100}%`;
    const count = $("#flashCount");
    if (count) count.textContent = `${flash.index + 1} / ${flash.words.length}`;

    const stage = $("#flashStage");
    if (!stage) return;
    stage.innerHTML = `<div class="flash-card">
      <span class="flash-card__level">${level.code} · ${esc(word.pos)} · ${current.due ? `следующий повтор ${esc(current.due)}` : "новое слово"}</span>
      <div class="flash-word">${esc(word.word)}</div>
      <div class="flash-ipa">${esc(word.ipa)}</div>
      <button class="sound-btn flash-speak" type="button" data-action="speak-word" data-say="${attr(word.word)}" aria-label="Прослушать ${attr(word.word)}">${icon("volume")}</button>
      ${flash.revealed ? `<div class="flash-back">
        <div class="flash-translation">${esc(word.ru)}</div>
        <p class="flash-example">${esc(word.example)}</p>
        <a class="flash-source" href="#/song/${song.id}">${esc(song.title)} · ${esc(song.artist)}</a>
        <div class="flash-meta"><span class="pos">${esc(word.pos)}</span><span>${esc(level.name)}</span><span>${current.interval ? `интервал ${current.interval} дн.` : "первый шаг"}</span></div>
      </div>` : `<button class="btn btn--primary flash-reveal" type="button" data-action="flash-reveal">${icon("eye")} Показать перевод</button>`}
      ${flash.revealed ? `<div class="flash-grades">
        <button class="btn btn--ghost" type="button" data-action="flash-rate" data-grade="0">${icon("rotate")} Снова</button>
        <button class="btn btn--ghost" type="button" data-action="flash-rate" data-grade="1">Трудно</button>
        <button class="btn btn--ghost" type="button" data-action="flash-rate" data-grade="2">Нормально</button>
        <button class="btn btn--primary" type="button" data-action="flash-rate" data-grade="3">${icon("check")} Легко</button>
      </div>` : ""}
    </div>`;
  }

  function revealFlash() {
    if (!flash || flash.done) return;
    flash.revealed = true;
    renderFlashCard();
    setTimeout(() => {
      const word = flash?.words[flash.index];
      if (word) speak(word.word, { rate: Math.max(0.7, Number(state.settings.rate) - 0.1) });
    }, 120);
  }

  function rateFlash(grade) {
    if (!flash || flash.done) return;
    const word = flash.words[flash.index];
    const value = clamp(Number(grade) || 0, 0, 3);
    srsSchedule(word.id, value);
    if (value === 0) flash.again += 1;
    else if (value === 1) flash.hard += 1;
    else flash.known += 1;
    saveState();
    flash.index += 1;
    flash.revealed = false;
    if (flash.index >= flash.words.length) {
      flash.done = true;
      recordActivity(15, 5);
      recordReviews(flash.words.length);
      completeDailyStep("review");
      renderFlashComplete();
    } else {
      renderFlashCard();
    }
  }

  function renderFlashComplete() {
    const bar = $("#flashBar");
    if (bar) bar.style.width = "100%";
    const count = $("#flashCount");
    if (count) count.textContent = "Готово";
    const stage = $("#flashStage");
    if (!stage) return;
    stage.innerHTML = `<div class="flash-complete">
      <div class="result-score" style="--p:${Math.round((flash.known / flash.words.length) * 100)}"><div class="result-score__copy"><b>${flash.known}</b><span>из ${flash.words.length}</span></div></div>
      <h2>Повторение завершено</h2>
      <p>${flash.again + flash.hard ? `${flash.again + flash.hard} ${plural(flash.again + flash.hard, "слово", "слова", "слов")} получили короткий интервал и вернутся раньше. ` : "Все слова ушли дальше по интервалам. "}Следующий подход появится в плане автоматически.</p>
      <div class="result-xp">${icon("spark")} +15 XP</div>
      <div class="flash-complete__actions">
        <button class="btn btn--primary" type="button" data-action="flash-retry">${icon("rotate")} Ещё подход</button>
        <a class="btn btn--ghost" href="#/review" data-action="close-flash">К повторению ${icon("arrow")}</a>
      </div>
    </div>`;
  }

  function closeFlash() {
    flash = null;
    closeModal();
    const route = parseRoute();
    if (route.name === "vocabulary" || route.name === "review" || route.name === "today" || route.name === "home") render();
  }

  /* ------------------------------------------------------------
     Profile
     ------------------------------------------------------------ */
  let profileDraft = { goal: 60, accent: "en-US" };

  function openProfile() {
    profileDraft = {
      goal: Number(state.profile.goal) || 60,
      accent: state.settings.accent || "en-US"
    };
    openModal(`<div class="modal__inner">
      <div class="modal__head">
        <div><h2>Настрой свой ритм</h2><p>Имя, цель и звучание — всё можно изменить.</p></div>
        <button class="modal__close" type="button" data-action="close-modal" aria-label="Закрыть настройки">${icon("close")}</button>
      </div>
      <div class="modal__body">
        <div class="form-grid">
          <label class="field">
            <span>Как тебя называть? <small>появится на главной</small></span>
            <input id="profileName" type="text" maxlength="20" value="${attr(state.profile.name || "")}" placeholder="Например, Аня">
          </label>

          <div class="field">
            <span>Недельная цель <small>в минутах практики</small></span>
            <div class="goal-options">
              ${[30, 60, 90, 120].map((goal) => `<button type="button" data-action="goal-option" data-goal="${goal}" class="${profileDraft.goal === goal ? "is-active" : ""}">${goal}<span>мин</span></button>`).join("")}
            </div>
          </div>

          <div class="field">
            <span>Акцент озвучки <small>для слов и фраз</small></span>
            <div class="segmented" id="accentPicker">
              <button type="button" data-action="accent-option" data-accent="en-US" class="${profileDraft.accent === "en-US" ? "is-active" : ""}"><b>US</b> American</button>
              <button type="button" data-action="accent-option" data-accent="en-GB" class="${profileDraft.accent === "en-GB" ? "is-active" : ""}"><b>UK</b> British</button>
            </div>
          </div>

          <div class="field">
            <span>Скорость речи <small>комфортный темп</small></span>
            <div class="range-row">
              <input id="voiceRate" type="range" min="0.7" max="1.1" step="0.05" value="${Number(state.settings.rate) || 0.9}" aria-label="Скорость озвучки">
              <output id="voiceRateValue">${Number(state.settings.rate || 0.9).toFixed(2)}×</output>
            </div>
          </div>

          <div class="profile-note">${icon("info")}<span>Прогресс хранится только в этом браузере, без аккаунта и сервера. Можно скачать резервную копию в JSON.</span></div>
          <div class="danger-zone">
            <button type="button" data-action="export-data">${icon("download")} Скачать прогресс</button>
            <button type="button" class="danger" data-action="reset-progress">${icon("trash")} Сбросить всё</button>
          </div>
        </div>
      </div>
      <div class="modal__foot">
        <button class="btn btn--ghost btn--sm" type="button" data-action="close-modal">Отмена</button>
        <button class="btn btn--primary btn--sm" type="button" data-action="save-profile">Сохранить настройки ${icon("check")}</button>
      </div>
    </div>`, { kind: "profile", label: "Профиль и настройки", focus: "#profileName" });
  }

  function saveProfile() {
    const nameInput = $("#profileName");
    const name = (nameInput?.value || "").trim().slice(0, 20) || "Меломан";
    state.profile.name = name;
    state.profile.goal = profileDraft.goal;
    state.settings.accent = profileDraft.accent;
    const rateInput = $("#voiceRate");
    if (rateInput) state.settings.rate = clamp(Number(rateInput.value) || 0.9, 0.7, 1.1);
    saveState();
    closeModal();
    updateHeader();
    render();
    toast("Настройки сохранены");
  }

  function exportData() {
    try {
      const payload = {
        app: "LYRICA",
        exportedAt: new Date().toISOString(),
        profile: state.profile,
        xp: state.xp,
        streak: state.streak,
        completed: state.completed,
        homework: state.homework,
        vocab: state.vocab,
        history: state.history,
        activity: state.activity,
        daily: state.daily
      };
      const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "lyrica-progress.json";
      document.body.appendChild(link);
      link.click();
      link.remove();
      setTimeout(() => URL.revokeObjectURL(url), 1000);
      toast("Файл с прогрессом скачан");
    } catch (error) {
      toast("Не удалось скачать файл", "error");
    }
  }

  function resetProgress() {
    const confirmed = window.confirm("Сбросить весь прогресс, словарь и домашние работы? Это действие нельзя отменить.");
    if (!confirmed) return;
    state = defaultState();
    saveState();
    closeModal();
    render();
    toast("Прогресс сброшен. Чистый лист!");
  }

  /* ------------------------------------------------------------
     Homework
     ------------------------------------------------------------ */
  const homeworkTimers = new Map();

  function scheduleHomeworkSave(textarea) {
    const songId = textarea.dataset.hwText || textarea.dataset.song;
    const idx = textarea.dataset.idx;
    const key = `${songId}:${idx}`;
    if (homeworkTimers.has(key)) clearTimeout(homeworkTimers.get(key));
    homeworkTimers.set(key, setTimeout(() => {
      saveHomeworkText(songId, Number(idx), textarea.value, false);
      homeworkTimers.delete(key);
    }, 420));
  }

  function saveHomeworkText(songId, idx, text, announce = true) {
    const songTasks = state.homework[songId] || (state.homework[songId] = {});
    const task = songTasks[idx] || (songTasks[idx] = { done: false, text: "" });
    task.text = String(text || "");
    task.updatedAt = new Date().toISOString();
    saveState();
    const status = $(`[data-hw-text][data-song="${songId}"][data-idx="${idx}"]`)?.closest(".homework-answer")?.querySelector("[data-save-status]");
    if (status) {
      status.textContent = "Сохранено";
      status.classList.add("is-saved");
      setTimeout(() => {
        if (status) {
          status.textContent = "Сохраняется автоматически";
          status.classList.remove("is-saved");
        }
      }, 1600);
    }
    if (announce) toast("Ответ сохранён");
  }

  function handleHomeworkCheck(input) {
    const songId = input.dataset.song;
    const idx = Number(input.dataset.idx);
    const songTasks = state.homework[songId] || (state.homework[songId] = {});
    const task = songTasks[idx] || (songTasks[idx] = { text: "", done: false });
    const wasDone = Boolean(task.done);
    task.done = input.checked;
    task.updatedAt = new Date().toISOString();
    if (input.checked && !wasDone) recordActivity(5, 2);
    if (input.checked) completeDailyStep("homework");
    saveState();
    input.closest(".homework-card")?.classList.toggle("is-done", input.checked);
    updateHomeworkProgress(songId);
    if (input.checked) toast("Домашнее задание выполнено. +5 XP");
  }

  function updateHomeworkProgress(songId) {
    const tasks = state.homework[songId] || {};
    const total = SONG_BY_ID[songId]?.homework.length || 1;
    const done = Object.values(tasks).filter((task) => task && task.done).length;
    $$("[data-hw-count]").forEach((element) => {
      if (element.closest("[data-homework-card]")) return;
      element.textContent = done;
    });
    $$("[data-hw-bar]").forEach((element) => {
      element.style.width = `${(done / total) * 100}%`;
    });
  }

  function handleHomeworkSelf(input) {
    const songId = input.dataset.song;
    const idx = Number(input.dataset.idx);
    const checkIndex = Number(input.dataset.check);
    const songTasks = state.homework[songId] || (state.homework[songId] = {});
    const task = songTasks[idx] || (songTasks[idx] = { text: "", done: false });
    task.checks = task.checks || {};
    task.checks[checkIndex] = input.checked;
    task.updatedAt = new Date().toISOString();
    saveState();
    const details = input.closest("details");
    const summary = details?.querySelector("summary");
    const total = details ? details.querySelectorAll("[data-hw-self]").length : 0;
    const checked = details ? details.querySelectorAll("[data-hw-self]:checked").length : 0;
    if (summary) summary.textContent = `Самопроверка · ${checked}/${total}`;
    const status = input.closest(".homework-card")?.querySelector("[data-save-status]");
    if (status) status.textContent = "Самопроверка сохранена";
  }

  function homeworkPlainText(songId) {
    const song = SONG_BY_ID[songId];
    if (!song) return "";
    const tasks = state.homework[songId] || {};
    const lines = [
      `LYRICA — рабочая тетрадь`,
      `${song.title} — ${song.artist}`,
      `Уровень: ${(LEVEL_BY_ID[song.level] || {}).code || song.level}`,
      `Дата: ${formatFullDate(new Date())}`,
      `Ученик: ${state.profile.name || "Студент"}`,
      ""
    ];
    song.homework.forEach((task, index) => {
      const saved = tasks[index] || {};
      lines.push(`${index + 1}. ${task.title} (${task.minutes} мин)`);
      lines.push(`Задача: ${task.task}`);
      if (task.goal) lines.push(`Цель: ${task.goal}`);
      if (Array.isArray(task.steps)) task.steps.forEach((step, stepIndex) => lines.push(`  ${stepIndex + 1}) ${step}`));
      lines.push(`Статус: ${saved.done ? "выполнено" : "не отмечено"}`);
      lines.push("Ответ:");
      lines.push(saved.text ? saved.text : "—");
      if (Array.isArray(task.selfCheck) && task.selfCheck.length) {
        lines.push("Самопроверка:");
        task.selfCheck.forEach((item, checkIndex) => {
          lines.push(`  [${saved.checks?.[checkIndex] ? "x" : " "}] ${item}`);
        });
      }
      lines.push("");
    });
    return lines.join("\n");
  }

  function downloadHomework(songId) {
    const song = SONG_BY_ID[songId];
    if (!song) return;
    try {
      const blob = new Blob([homeworkPlainText(songId)], { type: "text/plain;charset=utf-8" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `LYRICA-${song.id}-workbook.txt`;
      document.body.appendChild(link);
      link.click();
      link.remove();
      setTimeout(() => URL.revokeObjectURL(url), 1000);
      toast("Рабочая тетрадь скачана");
    } catch (error) {
      toast("Не удалось скачать тетрадь", "error");
    }
  }

  function printHomework(songId) {
    const song = SONG_BY_ID[songId];
    if (!song) return;
    const tasks = state.homework[songId] || {};
    const body = song.homework.map((task, index) => {
      const saved = tasks[index] || {};
      return `<section class="sheet-task">
        <h2>${index + 1}. ${esc(task.title)} <small>${esc(task.type)} · ${task.minutes} мин</small></h2>
        <p>${esc(task.task)}</p>
        ${task.goal ? `<p class="muted">Цель: ${esc(task.goal)}</p>` : ""}
        ${Array.isArray(task.steps) ? `<ol>${task.steps.map((step) => `<li>${esc(step)}</li>`).join("")}</ol>` : ""}
        <div class="answer"><b>Ответ</b><p>${esc(saved.text || " ").replace(/\n/g, "<br>") || "&nbsp;"}</p></div>
        ${Array.isArray(task.selfCheck) ? `<div class="checks">${task.selfCheck.map((item, checkIndex) => `<label><input type="checkbox" ${saved.checks?.[checkIndex] ? "checked" : ""}> ${esc(item)}</label>`).join("")}</div>` : ""}
      </section>`;
    }).join("");
    const html = `<!doctype html><html lang="ru"><head><meta charset="utf-8"><title>LYRICA — ${esc(song.title)}</title><style>
      @page { margin: 18mm; }
      body { font-family: Georgia, "Times New Roman", serif; color: #17130f; line-height: 1.55; max-width: 760px; margin: 0 auto; }
      header { border-bottom: 2px solid #17130f; padding-bottom: 14px; margin-bottom: 22px; }
      h1 { font-size: 34px; margin: 0 0 6px; } h2 { font-size: 18px; margin: 22px 0 7px; } h2 small { font-family: sans-serif; font-size: 10px; color: #7d7266; font-weight: 400; }
      p { margin: 0 0 8px; } .muted { color: #7d7266; font-size: 11px; } ol { padding-left: 20px; } li { margin-bottom: 4px; }
      .answer { border: 1px dashed #999; min-height: 95px; padding: 10px; margin-top: 12px; } .answer b { font-family: sans-serif; font-size: 10px; text-transform: uppercase; letter-spacing: .1em; } .answer p { margin-top: 5px; white-space: normal; }
      .checks { display: grid; gap: 4px; margin-top: 10px; font-family: sans-serif; font-size: 11px; } .checks input { margin-right: 6px; }
      .sheet-task { break-inside: avoid; page-break-inside: avoid; } header p { font-family: sans-serif; font-size: 11px; color: #7d7266; }
    </style></head><body><header><h1>LYRICA · рабочая тетрадь</h1><p>${esc(song.title)} — ${esc(song.artist)} · ${(LEVEL_BY_ID[song.level] || {}).code || song.level} · ${formatFullDate(new Date())} · ${esc(state.profile.name || "Студент")}</p></header>${body}</body></html>`;
    const win = window.open("", "_blank");
    if (!win) {
      toast("Браузер заблокировал окно печати. Разреши всплывающие окна.", "error");
      return;
    }
    win.document.open();
    win.document.write(html);
    win.document.close();
    win.focus();
    setTimeout(() => win.print(), 350);
  }

  /* ------------------------------------------------------------
     Not found
     ------------------------------------------------------------ */
  function renderNotFound() {
    return `<div class="shell"><div class="not-found">
      <div class="vinyl-wrap"><div class="vinyl"><div class="vinyl-label"><b>404</b><small>track not found</small></div></div></div>
      <div class="eyebrow">Потерянный трек</div>
      <h1>Такой песни нет</h1>
      <p>Возможно, ссылка устарела. Вернись к маршруту — там точно найдётся что послушать.</p>
      <div class="hero-actions" style="justify-content:center"><a class="btn btn--primary" href="#/levels">К уровням ${icon("arrow")}</a><a class="btn btn--ghost" href="#/">На главную</a></div>
    </div></div>`;
  }

  /* ------------------------------------------------------------
     Events
     ------------------------------------------------------------ */
  document.addEventListener("click", (event) => {
    if (event.target.matches("[data-modal-backdrop]")) {
      if (activeModalKind === "quiz") closeQuiz();
      else if (activeModalKind === "flash") closeFlash();
      else closeModal();
      return;
    }

    const actionTarget = event.target.closest("[data-action]");
    if (!actionTarget) return;
    const action = actionTarget.dataset.action;

    if (action === "scroll-to") {
      const section = document.getElementById(actionTarget.dataset.target);
      if (section) {
        section.scrollIntoView({ behavior: "smooth", block: "start" });
        $$(".song-subnav button").forEach((button) => button.classList.toggle("is-active", button === actionTarget));
      }
      return;
    }

    if (action === "open-profile") {
      openProfile();
      return;
    }
    if (action === "close-modal") {
      closeModal();
      return;
    }
    if (action === "save-profile") {
      saveProfile();
      return;
    }
    if (action === "goal-option") {
      profileDraft.goal = Number(actionTarget.dataset.goal) || 60;
      $$("[data-action='goal-option']").forEach((button) => button.classList.toggle("is-active", button === actionTarget));
      return;
    }
    if (action === "accent-option") {
      profileDraft.accent = actionTarget.dataset.accent === "en-GB" ? "en-GB" : "en-US";
      $$("[data-action='accent-option']").forEach((button) => button.classList.toggle("is-active", button === actionTarget));
      speak("Hello! Let's learn English through music.", { rate: 0.9 });
      return;
    }
    if (action === "export-data") {
      exportData();
      return;
    }
    if (action === "reset-progress") {
      resetProgress();
      return;
    }

    if (action === "song-level") {
      setSongLevel(actionTarget.dataset.level || "all");
      syncSongFilters();
      return;
    }
    if (action === "reset-songs") {
      songsUI = { q: "", level: "all" };
      const search = $("#songSearch");
      if (search) search.value = "";
      syncSongFilters();
      return;
    }
    if (action === "random-song") {
      randomSong();
      return;
    }
    if (action === "theory-level") {
      theoryUI.level = actionTarget.dataset.level || "all";
      syncTheoryFilters();
      return;
    }
    if (action === "reset-theory") {
      theoryUI = { q: "", level: "all" };
      const search = $("#theorySearch");
      if (search) search.value = "";
      syncTheoryFilters();
      return;
    }
    if (action === "theory-random") {
      const pool = filterTheory().length ? filterTheory() : THEORY;
      const topic = pool[Math.floor(Math.random() * pool.length)];
      if (topic) navigate(`/theory/${topic.id}`);
      return;
    }
    if (action === "theory-check") {
      answerTheory(actionTarget);
      return;
    }

    if (action === "open-certificate") {
      openCertificate(actionTarget.dataset.level);
      return;
    }
    if (action === "print-certificate") {
      printCertificate(actionTarget.dataset.level);
      return;
    }
    if (action === "download-certificate") {
      downloadCertificate(actionTarget.dataset.level);
      return;
    }
    if (action === "toggle-theme") {
      toggleTheme();
      return;
    }
    if (action === "play-preview") {
      playPreview(actionTarget.dataset.previewSong);
      return;
    }
    if (action === "lab-set-a") {
      setLabA();
      return;
    }
    if (action === "lab-set-b") {
      setLabB();
      return;
    }
    if (action === "lab-loop") {
      toggleLabLoop();
      return;
    }
    if (action === "lab-rate") {
      setLabRate(actionTarget.dataset.rate);
      return;
    }
    if (action === "lab-new-word") {
      newLabWord();
      return;
    }
    if (action === "lab-catch") {
      catchLabWord();
      return;
    }
    if (action === "lab-record") {
      startLabRecording();
      return;
    }
    if (action === "lab-stop-record") {
      stopLabRecording();
      return;
    }
    if (action === "music-toggle") {
      toggleMusic();
      return;
    }
    if (action === "music-back") {
      if (audioEl) audioEl.currentTime = Math.max(0, audioEl.currentTime - 10);
      syncMusicProgress();
      return;
    }
    if (action === "music-forward") {
      if (audioEl && Number.isFinite(audioEl.duration)) audioEl.currentTime = Math.min(audioEl.duration, audioEl.currentTime + 10);
      syncMusicProgress();
      return;
    }
    if (action === "music-loop") {
      musicState.loop = !musicState.loop;
      if (audioEl) audioEl.loop = musicState.loop;
      renderMusicPlayer();
      return;
    }
    if (action === "music-rate") {
      musicState.rate = musicState.rate === 1 ? 0.8 : 1;
      if (audioEl) audioEl.playbackRate = musicState.rate;
      renderMusicPlayer();
      return;
    }
    if (action === "music-mute") {
      musicState.muted = !musicState.muted;
      if (audioEl) audioEl.muted = musicState.muted;
      renderMusicPlayer();
      return;
    }
    if (action === "music-close") {
      closeMusic();
      return;
    }
    if (action === "music-retry") {
      retryMusic();
      return;
    }

    if (action === "speak-word") {
      speak(actionTarget.dataset.say, { button: actionTarget });
      return;
    }
    if (action === "play-audio") {
      speak(actionTarget.dataset.say, { button: actionTarget });
      return;
    }
    if (action === "stop-audio") {
      stopAudio(true);
      return;
    }
    if (action === "speak-list") {
      const scope = actionTarget.dataset.scope;
      if (scope === "song") {
        const song = SONG_BY_ID[actionTarget.dataset.id];
        if (song) speakSequence(song.vocab.map((word) => word.word), song.title);
      } else if (scope === "level") {
        const level = LEVEL_BY_ID[actionTarget.dataset.id];
        if (level) speakSequence(ALL_WORDS.filter((word) => word.level === level.id).map((word) => word.word), level.code);
      } else {
        const words = filteredWords();
        speakSequence(words.map((word) => word.word), "Мой словарь");
      }
      return;
    }

    if (action === "toggle-learned") {
      const current = ensureWord(actionTarget.dataset.word);
      const next = !current.learned;
      current.learned = next;
      current.known = next ? Math.max(1, Number(current.known) || 0) : 0;
      current.updatedAt = new Date().toISOString();
      if (next) recordActivity(2, 1);
      else saveState();
      actionTarget.classList.toggle("is-learned", next);
      actionTarget.setAttribute("aria-pressed", String(next));
      const card = actionTarget.closest(".word-card");
      if (card) {
        card.classList.toggle("is-learned", next);
        const status = card.querySelector(".word-status");
        if (status) {
          status.classList.toggle("is-done", next);
          status.innerHTML = next ? `${icon("check")} изучено` : "не отмечено";
        }
      }
      const row = actionTarget.closest(".word-row");
      if (row) row.classList.toggle("is-learned", next);
      if (next) toast("Слово отмечено как изученное. +2 XP");
      return;
    }

    if (action === "toggle-saved") {
      const current = ensureWord(actionTarget.dataset.word);
      current.saved = !current.saved;
      current.updatedAt = new Date().toISOString();
      saveState();
      actionTarget.classList.toggle("is-active", current.saved);
      actionTarget.setAttribute("aria-pressed", String(current.saved));
      actionTarget.setAttribute("aria-label", current.saved ? "Убрать из словаря" : "Сохранить в словарь");
      toast(current.saved ? "Слово добавлено в личный словарь" : "Слово убрано из словаря");
      return;
    }

    if (action === "vocab-status") {
      vocabUI.status = actionTarget.dataset.status || "all";
      syncVocabFilters();
      return;
    }
    if (action === "vocab-more") {
      vocabUI.limit += 120;
      const words = filteredWords();
      const list = $("#vocabList");
      const shown = $("#vocabShown");
      if (shown) shown.textContent = Math.min(vocabUI.limit, words.length);
      if (list) list.innerHTML = renderVocabGroups(words.slice(0, vocabUI.limit), words.length);
      return;
    }
    if (action === "reset-vocab") {
      vocabUI = { q: "", level: "all", status: "all" };
      const search = $("#vocabSearch");
      const level = $("#vocabLevel");
      if (search) search.value = "";
      if (level) level.value = "all";
      syncVocabFilters();
      return;
    }
    if (action === "start-srs" || action === "start-flash") {
      startFlashcards(reviewDeck(12));
      return;
    }
    if (action === "close-flash") {
      if (actionTarget.tagName === "A") {
        flash = null;
        closeModal();
        return;
      }
      closeFlash();
      return;
    }
    if (action === "flash-reveal") {
      revealFlash();
      return;
    }
    if (action === "flash-rate") {
      rateFlash(Number(actionTarget.dataset.grade));
      return;
    }
    if (action === "flash-retry") {
      startFlashcards(reviewDeck(12));
      return;
    }

    if (action === "start-quiz") {
      startQuiz(actionTarget.dataset.song);
      return;
    }
    if (action === "quiz-option") {
      answerQuiz(Number(actionTarget.dataset.index));
      return;
    }
    if (action === "quiz-next") {
      nextQuiz();
      return;
    }
    if (action === "quiz-retry") {
      if (quiz) startQuiz(quiz.song.id);
      return;
    }
    if (action === "quiz-to-vocab") {
      quiz = null;
      closeModal();
      navigate("/vocabulary");
      return;
    }
    if (action === "close-quiz") {
      closeQuiz();
      return;
    }

    if (action === "save-homework") {
      const songId = actionTarget.dataset.song;
      const idx = Number(actionTarget.dataset.idx);
      const textarea = $(`[data-hw-text][data-song="${songId}"][data-idx="${idx}"]`);
      if (textarea) saveHomeworkText(songId, idx, textarea.value);
      return;
    }
    if (action === "download-homework") {
      downloadHomework(actionTarget.dataset.song);
      return;
    }
    if (action === "print-homework") {
      printHomework(actionTarget.dataset.song);
      return;
    }
  });

  document.addEventListener("input", (event) => {
    const target = event.target;
    if (target.id === "vocabSearch") {
      vocabUI.q = target.value;
      syncVocabFilters();
      return;
    }
    if (target.id === "songSearch") {
      songsUI.q = target.value;
      syncSongFilters();
      return;
    }
    if (target.id === "theorySearch") {
      theoryUI.q = target.value;
      syncTheoryFilters();
      return;
    }
    if (target.id === "voiceRate") {
      const output = $("#voiceRateValue");
      if (output) output.textContent = `${Number(target.value).toFixed(2)}×`;
      return;
    }
    if (target.id === "musicSeek") {
      if (audioEl && Number.isFinite(audioEl.duration)) {
        audioEl.currentTime = (Number(target.value) / 1000) * audioEl.duration;
        syncMusicProgress();
      }
      return;
    }
    if (target.matches("[data-hw-text]")) {
      scheduleHomeworkSave(target);
    }
  });

  document.addEventListener("change", (event) => {
    const target = event.target;
    if (target.id === "vocabLevel") {
      vocabUI.level = target.value;
      syncVocabFilters();
      return;
    }
    if (target.matches("[data-hw-check]")) {
      handleHomeworkCheck(target);
    }
    if (target.matches("[data-hw-self]")) {
      handleHomeworkSelf(target);
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      if (activeModalKind === "quiz") closeQuiz();
      else if (activeModalKind === "flash") closeFlash();
      else if (activeModalKind) closeModal();
      else if (musicState.songId) closeMusic();
      return;
    }

    if (activeModalKind === "quiz" && quiz && !quiz.done) {
      const question = quiz.song.quiz[quiz.index];
      const number = Number(event.key);
      if (!quiz.answered && number >= 1 && number <= question.options.length) {
        event.preventDefault();
        answerQuiz(number - 1);
      } else if (quiz.answered && (event.key === "Enter" || event.key === " ")) {
        event.preventDefault();
        nextQuiz();
      }
      return;
    }

    if (activeModalKind === "flash" && flash && !flash.done) {
      if (event.key === " " || event.key === "Enter") {
        if (!flash.revealed) {
          event.preventDefault();
          revealFlash();
        } else if (event.key === "Enter") {
          event.preventDefault();
          rateFlash(true);
        }
      }
      if (flash.revealed && event.key === "ArrowLeft") {
        event.preventDefault();
        rateFlash(false);
      }
      if (flash.revealed && event.key === "ArrowRight") {
        event.preventDefault();
        rateFlash(true);
      }
    }
  });

  window.addEventListener("scroll", () => {
    const header = $("#siteHeader");
    if (header) header.classList.toggle("is-scrolled", window.scrollY > 8);
  }, { passive: true });

  /* ------------------------------------------------------------
     Boot
     ------------------------------------------------------------ */
  saveState();
  window.addEventListener("hashchange", render);
  if (!location.hash) {
    history.replaceState(null, "", "#/");
  }
  render();
})();
