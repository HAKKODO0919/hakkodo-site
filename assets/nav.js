/* ========================================================
   サイト全体の共通ナビゲーション。
   新しいページ(セクション)を追加したいときは、この
   NAV_ITEMS に1行足すだけで、全ページのヘッダーと
   トップページの導線に自動的に反映されます。

   表示文字は data-i18n 属性で出しているので、翻訳は
   i18n.js の UI_STRINGS に navXxx キーを足すだけです。
   (applyUiStrings が言語切り替えのたびに文字を差し替えるため、
   ここでは文字列を直接組み立てず data-i18n を付けるだけにする)
   ======================================================== */

const NAV_ITEMS = [
  { key: "products", href: "products/index.html", i18nKey: "navProducts" },
  { key: "recipes", href: "recipes/index.html", i18nKey: "navRecipes" },
  // ワークショップは現在、紹介ページを経由せずスケジュールに直接入る導線。
  // 紹介ページ(workshops/index.html)自体は削除しておらず、
  // その中の「開催スケジュールを見る」ボタンもそのまま残っているので、
  // 将来また紹介ページを挟みたくなったら、ここを "workshops/index.html" に
  // 戻すだけで元の2段階の導線に戻せます。
  { key: "workshops", href: "workshops/schedule/index.html", i18nKey: "navWorkshops" },
  { key: "news", href: "news/index.html", i18nKey: "navNews" },
  { key: "about", href: "about/index.html", i18nKey: "navAbout" },
  { key: "contact", href: "contact/index.html", i18nKey: "navContact" },
];

// ページ上部の共通ナビゲーション(全ページ共通)。
// currentKey に今のページの key を渡すと、そのリンクだけ強調表示される。
function renderGlobalNav(container, siteRoot, currentKey) {
  if (!container) return;
  const itemsHtml = NAV_ITEMS.map((item) => {
    const activeClass = item.key === currentKey ? " active" : "";
    // 「作り手について」だけ、リンク先ページが途中までスクロールされた
    // 状態で開くことがあるため、遷移直前にも念のためスクロール位置を
    // リセットしておく(他のリンクの動作には影響しない)。
    const scrollFixAttr = item.key === "about" ? ' onclick="window.scrollTo(0,0)"' : "";
    return `<li><a class="global-nav-link${activeClass}" href="${escapeHtml(siteRoot + item.href)}" data-i18n="${item.i18nKey}"${scrollFixAttr}></a></li>`;
  }).join("");

  const brandActive = currentKey === "top" ? " active" : "";
  container.innerHTML = `
    <a class="global-nav-brand${brandActive}" href="${escapeHtml(siteRoot + "index.html")}">HAKKODO</a>
    <ul class="global-nav-list">${itemsHtml}</ul>
  `;
}

// トップページ本体に出す、大きめのセクション導線(既存の .recipe-btn を流用)。
function renderHomeNav(container, siteRoot) {
  if (!container) return;
  container.innerHTML = NAV_ITEMS.map(
    (item) => `<a class="recipe-btn" href="${escapeHtml(siteRoot + item.href)}" data-i18n="${item.i18nKey}"></a>`
  ).join("");
}
