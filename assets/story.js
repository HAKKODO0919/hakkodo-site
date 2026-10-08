/* ========================================================
   STORYページ(story/index.html)の表示の仕組み。
   文章は data/story.js、見た目は assets/style.css の .story-* です。
   言語別ページ(/ca/story/ など)では、i18n.js の PAGE_LANG により
   そのページの言語が固定されます(他のページと同じ仕組みです)。
   ======================================================== */

// ---- 日本語本文の折り返し(意味のまとまり単位) ----
// 日本語の本文は、data/story.js の中で、折り返してよい位置(意味のまとまりの境目)を
// 「｜」で示してある。画面では「｜」は表示せず、まとまりごとに <span class="story-chunk">
// (CSSで途中の折り返しを禁止)に包み、まとまりの間にだけ折り返しを許す。
// ブラウザ(iPhone の Safari など)ごとの日本語の折り返しの違いに左右されず、
// 「「発酵」と「道」から」のような言葉が途中で切れない。
// 「｜」を含まない行は、これまでどおりの普通の表示のまま。日本語以外の言語は何も変わらない。
const STORY_CHUNK_MARK = "｜";

// 「｜」を取り除いた、実際に表示する文章
function stripChunkMarks(text) {
  return text.split(STORY_CHUNK_MARK).join("");
}

// 「｜」で区切った意味のまとまりを <span> に包んだHTML(改行「\n」はそのまま残す)
function chunkedHtml(text) {
  return text
    .split("\n")
    .map((line) => {
      if (!line.includes(STORY_CHUNK_MARK)) return escapeHtml(line);
      return line
        .split(STORY_CHUNK_MARK)
        .filter((chunk) => chunk !== "")
        .map((chunk) => `<span class="story-chunk">${escapeHtml(chunk)}</span>`)
        .join("<wbr>");
    })
    .join("\n");
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

  const chunked = lang === "ja";
  const bodyHtml = (tr.paragraphs || [])
    .map((text, i) => `<p class="home-feature-text${chunked ? " story-ja-phrases" : ""}">${chunked ? chunkedHtml(text) : escapeHtml(stripChunkMarks(text))}</p>${i + 1 === photoAfter ? photoHtml : ""}`)
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
