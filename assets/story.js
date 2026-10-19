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

  // 最後の段落(締めの言葉)には story-closing を付けて、中央・明朝体・少し大きくする(assets/style.css)
  const paragraphs = tr.paragraphs || [];
  const bodyHtml = paragraphs
    .map((text, i) => `<p class="home-feature-text${i === paragraphs.length - 1 ? " story-closing" : ""}">${storyTextHtml(text)}</p>${i + 1 === photoAfter ? photoHtml : ""}`)
    .join("");

  // 最後に、印(トップページの写真の上にある印と同じ画像)を、締めの言葉のあとに押す。飾りなので、読み上げの対象にしない。
  const sealHtml = `<div class="story-seal" aria-hidden="true"><img src="${escapeHtml(siteRoot + "images/brand/hakkodo-seal.png")}" alt=""></div>`;

  // 見出しは他の文章ページと同じ .intro、本文は .home-feature-text を使う
  root.innerHTML = `
    ${heroHtml}
    <div class="intro">
      <h1>${escapeText(tr.title)}</h1>
      <p>${escapeText(tr.heading)}</p>
    </div>
    ${bodyHtml}
    ${sealHtml}
  `;

  // トップページ・商品ページと同じ、スクロールに合わせた控えめなフェードイン(assets/reveal.js)。
  // 最初から画面に見えている部分(見出し・最初の段落)は、ページを開いて0.25秒後から、上から順に、0.15秒ずつ遅れて現れ(includeVisible・startDelay・stagger。動きの長さ(0.9秒)・距離(12px)・最初の遅れ(0.25秒)は、トップページの「旨味の世界へようこそ。」と同じで、読みやすさのため、次の要素との間隔だけ、トップ(0.2秒)より少し短くした。
  // 以前は、0.1秒後から0.12秒ずつで、最初の描画の前後に動きが終わり、気づきにくかった)、
  // 下の段落・写真は、画面に入るときに現れる。
  // reveal.js を読み込んでいないページでは何もしない(言語を切り替えて描き直したときも、ここで仕掛け直す)。
  if (typeof initReveal === "function") {
    initReveal(".story-page .intro, .story-page .home-feature-text, .story-page .recipe-hero, .story-page .story-hero, .story-page .story-seal", { includeVisible: true, startDelay: 0.25, stagger: 0.15 });

    // 印は、締めの言葉の「次に」現れるようにする。印が、画面に入った瞬間に動き始める仕組み(.reveal)だと、
    // 締めの言葉が順に現れている最中(ページを開いた直後)に、先に出てしまうため、締めの言葉の動きが終わるころ(0.7秒後)に始める。
    const closing = root.querySelector(".story-closing");
    const seal = root.querySelector(".story-seal");
    if (closing && seal) {
      const closingDelay = closing.classList.contains("reveal-load") ? parseFloat(closing.style.animationDelay) || 0 : 0;
      const sealDelay = closingDelay + 0.7;
      if (seal.classList.contains("reveal-load")) seal.style.animationDelay = sealDelay + "s";
      else if (seal.classList.contains("reveal")) seal.style.transitionDelay = sealDelay + "s";
    }
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
