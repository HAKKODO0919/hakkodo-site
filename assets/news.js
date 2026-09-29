/* ========================================================
   新着情報一覧の土台。
   お知らせが増えるたびに data/news/*.js を1件追加し、
   news/index.html の initNewsList([...]) に登録するだけで
   一覧に追加できます。
   ======================================================== */

// お知らせ1件分のHTMLに変換する
function renderNewsItem(data, lang) {
  const tr = data && data.translations && (data.translations[lang] || data.translations.ja);
  if (!tr) return "";
  return `
    <li class="news-item">
      ${tr.date ? `<p class="news-date">${escapeHtml(tr.date)}</p>` : ""}
      <h2>${escapeHtml(tr.title || "")}</h2>
      ${tr.body ? `<p>${escapeHtml(tr.body)}</p>` : ""}
    </li>`;
}

// 新着情報一覧を描画する。newsItems: [ window.NEWS_DATA相当, ... ]
function renderNewsListContent(newsItems, lang) {
  const root = document.getElementById("news-list-root");
  if (!root) return;

  if (!newsItems || newsItems.length === 0) {
    // お問い合わせ・ワークショップと同じく、枠で囲まず文字だけで表示する。
    // お知らせが追加されたら、この分岐を通らず自動的に一覧表示になる。
    root.innerHTML = `<div class="intro intro-mid"><p style="white-space: pre-line;">${escapeHtml(t("newsEmpty", lang))}</p></div>`;
    return;
  }

  root.innerHTML = `<ul class="news-list">${newsItems.map((data) => renderNewsItem(data, lang)).join("")}</ul>`;
}

// 新着情報ページの初期化。
// 想定外のエラーが起きても画面が真っ白にならないよう、失敗時はエラー表示に切り替える。
function initNewsList(newsItems) {
  const switcherRoot = document.getElementById("lang-switcher-root");

  function render() {
    try {
      const lang = getCurrentLang();
      applyUiStrings(lang);
      document.title = t("newsTitle", lang);
      renderNewsListContent(newsItems, lang);
    } catch (e) {
      console.error(e);
      const root = document.getElementById("news-list-root");
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
