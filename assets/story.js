/* ========================================================
   STORYページ(story/index.html)の表示の仕組み。
   文章は data/story.js、見た目は assets/style.css の .story-* です。
   言語別ページ(/ca/story/ など)では、i18n.js の PAGE_LANG により
   そのページの言語が固定されます(他のページと同じ仕組みです)。
   ======================================================== */

// 文章の中の「{br-sm}」は、スマホ幅だけ改行になる印(<br class="story-br-sm">)に置き換える。
// タブレット・PCでは CSS で無効になり、通常の折り返しのままになる。
const STORY_BR_SM = "{br-sm}";

function storyTextHtml(text) {
  return escapeText(text).split(STORY_BR_SM).join('<br class="story-br-sm">');
}

// STORYの中身(見出し・段落・写真)を、指定した言語で描画する
function renderStoryContent(data, siteRoot, lang) {
  const root = document.getElementById("story-root");
  if (!root) return;
  const tr = data && data.translations && (data.translations[lang] || data.translations.en);
  if (!tr) {
    root.innerHTML = `<div class="load-error">${escapeText(t("productLoadError", lang))}</div>`;
    return;
  }

  document.title = `${tr.title} | HAKKODO`;

  // 写真は1枚だけ入れる(altは各言語の説明文)。afterParagraph が 0 のときは、一番上(見出しの前)に大きく置く
  // (商品ページと同じ、下の端が背景に溶けて、見出しが少し重なる形)。1以上のときは、その番号の段落の直後に入れる。
  const photoAfter = data.image && data.image.afterParagraph;
  const photoImg = data.image
    ? `<img src="${escapeHtml(siteRoot + data.image.src)}" alt="${escapeHtml(tr.imageAlt || "")}">`
    : "";
  const heroHtml = data.image && photoAfter === 0 ? `<div class="story-hero">${photoImg}</div>` : "";
  const photoHtml = data.image && photoAfter > 0 ? `<div class="recipe-hero">${photoImg}</div>` : "";

  const bodyHtml = (tr.paragraphs || [])
    .map((text, i) => `<p class="home-feature-text">${storyTextHtml(text)}</p>${i + 1 === photoAfter ? photoHtml : ""}`)
    .join("");

  // 見出しは他の文章ページと同じ .intro、本文は .home-feature-text を使う
  root.innerHTML = `
    ${heroHtml}
    <div class="intro">
      <h1>${escapeText(tr.title)}</h1>
      <p>${escapeText(tr.heading)}</p>
    </div>
    ${bodyHtml}
  `;

  // トップページ・商品ページと同じ、スクロールに合わせた控えめなフェードイン(assets/reveal.js)。
  // 最初から画面に見えている部分(写真・見出し)は動かさず、下の段落だけが、画面に入るときに現れる。
  // reveal.js を読み込んでいないページでは何もしない(言語を切り替えて描き直したときも、ここで仕掛け直す)。
  if (typeof initReveal === "function") {
    initReveal(".story-page .home-feature-text");
  }
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
      if (root) root.innerHTML = `<div class="load-error">${escapeText(t("productLoadError"))}</div>`;
    }
  }

  try {
    renderLangSwitcher(switcherRoot, render);
  } catch (e) {
    console.error(e);
  }
  render();
}
