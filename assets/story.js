/* ========================================================
   STORYページ(story/index.html)の表示の仕組み。
   文章は data/story.js、見た目は assets/style.css の .story-* です。
   言語別ページ(/ca/story/ など)では、i18n.js の PAGE_LANG により
   そのページの言語が固定されます(他のページと同じ仕組みです)。
   ======================================================== */

// 文章の中の「{br-sm}」は、スマホ幅だけ改行になる印(<br class="story-br-sm">)に置き換える。
// PC・タブレットでは CSS で無効になり、通常の折り返しのままになる。
const STORY_BR_SM = "{br-sm}";

function storyTextHtml(text) {
  return escapeHtml(text).split(STORY_BR_SM).join('<br class="story-br-sm">');
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

  const bodyHtml = (tr.paragraphs || [])
    .map((text, i) => `<p class="home-feature-text">${storyTextHtml(text)}</p>${i + 1 === photoAfter ? photoHtml : ""}`)
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
