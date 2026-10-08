/* ========================================================
   STORYページ(story/index.html)の表示の仕組み。
   文章は data/story.js、見た目は assets/style.css の .story-* です。
   言語別ページ(/ca/story/ など)では、i18n.js の PAGE_LANG により
   そのページの言語が固定されます(他のページと同じ仕組みです)。
   ======================================================== */

// ---- 日本語本文の折り返し(文節単位) ----
// CSSの word-break: auto-phrase(日本語を文節で折り返す)に対応していないブラウザ
// (iPhone の Safari など)では、「から」「あります」などが途中で切れてしまう。
// そのブラウザの日本語本文だけ、文節ごとに折り返し位置(<wbr>)を入れて補う。
// 対応しているブラウザ(Chrome・Edge など)と、日本語以外の言語では何もしない。
const JA_PHRASE_KEEP = ["発酵道", "もまた"]; // 途中で切らない言葉
const JA_PHRASE_PARTICLES = ["から", "まで", "より", "など", "は", "が", "を", "に", "へ", "で", "と", "も", "の", "や"];
const JA_PHRASE_ATTACH = ["続ける", "続け", "合う", "合い"]; // 前の語とひと続きの動詞(「成長し続ける」など)
const JA_PHRASE_PREFIX = ["この", "その", "あの"]; // 次の語とひと続きの言葉(「この土地」など)

function needsJaPhraseFallback(lang) {
  return lang === "ja"
    && typeof Intl !== "undefined" && typeof Intl.Segmenter === "function"
    && !(window.CSS && CSS.supports && CSS.supports("word-break", "auto-phrase"));
}

// 本文を文節ごとの配列に分ける(「\n」は1つの要素としてそのまま残す)
function splitJaPhrases(text) {
  const segmenter = new Intl.Segmenter("ja", { granularity: "word" });
  const tokens = [];
  text.split(new RegExp("(" + JA_PHRASE_KEEP.join("|") + ")")).forEach((piece) => {
    if (JA_PHRASE_KEEP.includes(piece)) tokens.push(piece);
    else for (const s of segmenter.segment(piece)) tokens.push(s.segment);
  });
  const isHiragana = (s) => /^[ぁ-ゟ]/.test(s);
  const isClosing = (s) => /^[、。，．」』）！？ー・]/.test(s);
  const isOpening = (s) => /[「『（]$/.test(s);
  const phrases = [];
  let cur = "";
  let prev = "";
  for (const tok of tokens) {
    if (tok === "\n") {
      if (cur) phrases.push(cur);
      phrases.push("\n");
      cur = "";
      prev = "";
      continue;
    }
    let breakBefore;
    if (cur === "") breakBefore = false;
    else if (isClosing(tok) || isOpening(prev)) breakBefore = false;
    else if (/[、。]$/.test(prev)) breakBefore = true;
    else if (JA_PHRASE_PREFIX.includes(prev) || JA_PHRASE_ATTACH.includes(tok)) breakBefore = false;
    // ひらがなは前の語にくっつける。ただし助詞のあとの語は新しい文節の始まり
    else if (isHiragana(tok)) breakBefore = JA_PHRASE_PARTICLES.includes(prev) && cur.length >= 3;
    else breakBefore = true;
    if (breakBefore) {
      phrases.push(cur);
      cur = "";
    }
    cur += tok;
    prev = tok;
  }
  if (cur) phrases.push(cur);
  return phrases;
}

function jaPhraseHtml(text) {
  return splitJaPhrases(text)
    .map((p) => (p === "\n" ? "\n" : escapeHtml(p) + "<wbr>"))
    .join("");
}

// STORYの中身(見出し・段落・写真)を、指定した言語で描画する
function renderStoryContent(data, siteRoot, lang) {
  const root = document.getElementById("story-root");
  if (!root) return;
  const tr = data && data.translations && (data.translations[lang] || data.translations.en);
  if (!tr) {
    root.innerHTML = `<div class="load-error">${escapeHtml(t("productLoadError", lang))}</div>`;
    return;
  }

  document.title = `${tr.title} | HAKKODO`;

  // 写真は、指定した段落の直後に1枚だけ入れる(altは各言語の説明文)
  const photoAfter = data.image && data.image.afterParagraph;
  const photoHtml = data.image
    ? `<div class="recipe-hero"><img src="${escapeHtml(siteRoot + data.image.src)}" alt="${escapeHtml(tr.imageAlt || "")}"></div>`
    : "";

  const phraseWrap = needsJaPhraseFallback(lang);
  const bodyHtml = (tr.paragraphs || [])
    .map((text, i) => `<p class="home-feature-text${phraseWrap ? " story-ja-phrases" : ""}">${phraseWrap ? jaPhraseHtml(text) : escapeHtml(text)}</p>${i + 1 === photoAfter ? photoHtml : ""}`)
    .join("");

  // 見出しは他の文章ページと同じ .intro、本文は .home-feature-text を使う
  root.innerHTML = `
    <div class="intro">
      <h1>${escapeHtml(tr.title)}</h1>
      <p>${escapeHtml(tr.heading)}</p>
    </div>
    ${bodyHtml}
  `;
}

// STORYページの初期化。言語切り替えUIを設置し、切り替え時に再描画する。
// 想定外のエラーが起きても画面が真っ白にならないよう、失敗時はエラー表示に切り替える。
function initStoryPage(data, siteRoot) {
  const switcherRoot = document.getElementById("lang-switcher-root");

  function render() {
    try {
      const lang = getCurrentLang();
      applyUiStrings(lang);
      renderStoryContent(data, siteRoot, lang);
    } catch (e) {
      console.error(e);
      const root = document.getElementById("story-root");
      if (root) root.innerHTML = `<div class="load-error">${escapeHtml(t("productLoadError"))}</div>`;
    }
  }

  try {
    renderLangSwitcher(switcherRoot, render);
  } catch (e) {
    console.error(e);
  }
  render();
}
