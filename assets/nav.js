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
  // 現在は商品が1点(熟成生味噌)だけのため、「商品」の入口は
  // 一覧ページを経由せず商品詳細ページへ直接つなげている。
  // 商品一覧ページ(products/index.html)自体や商品データ・
  // initProductListの仕組みは残してあるので、商品が増えたら
  // ここのhrefを "products/index.html" に戻すだけで一覧が復活する。
  { key: "products", href: "products/miso/index.html", i18nKey: "navProducts" },
  { key: "recipes", href: "recipes/index.html", i18nKey: "navRecipes" },
  // ヘッダーの「ワークショップ」は紹介ページ(workshops/index.html)へ。
  // その中の「開催スケジュールを見る」ボタンからスケジュール
  // (workshops/schedule/index.html)へ進む、2段階の導線にする。
  { key: "workshops", href: "workshops/index.html", i18nKey: "navWorkshops" },
  { key: "news", href: "news/index.html", i18nKey: "navNews" },
  // About(ブランドの考え方。URLは story/ のまま)。「お問い合わせ」の前に置く。
  // fallback: i18n.js が古いキャッシュのままでも、翻訳キー名(navStory)が
  // そのまま画面に出ないようにするための代わりの表示文字。
  { key: "story", href: "story/index.html", i18nKey: "navStory", fallback: "About" },
  { key: "contact", href: "contact/index.html", i18nKey: "navContact" },
];

// ページ上部の共通ナビゲーション(全ページ共通)。
// currentKey に今のページの key を渡すと、そのリンクだけ強調表示される。
function renderGlobalNav(container, siteRoot, currentKey) {
  if (!container) return;
  // ページ同士のリンクだけ linkRoot を使う(画像は siteRoot のまま)。
  // 言語固定ページ(PAGE_LANGあり)では "/es/" など、既存ページでは siteRoot と同じ値になる。
  const linkRoot = pageLinkRoot(siteRoot);
  const itemsHtml = NAV_ITEMS.map((item) => {
    const activeClass = item.key === currentKey ? " active" : "";
    // 翻訳が(古いキャッシュなどで)見つからない項目は、data-i18n を付けず fallback をそのまま出す
    const known = typeof UI_STRINGS === "undefined" || !item.fallback || (UI_STRINGS.ja && UI_STRINGS.ja[item.i18nKey]);
    const labelAttr = known ? ` data-i18n="${item.i18nKey}"` : "";
    const labelText = known ? "" : escapeHtml(item.fallback);
    return `<li><a class="global-nav-link${activeClass}" href="${escapeHtml(linkRoot + item.href)}"${labelAttr}>${labelText}</a></li>`;
  }).join("");

  // ブランド表示(HAKKODOロゴ＋顔ロゴ)は全ページ共通。
  // 以前はトップページ(index.html)だけ、レンダリング後に文字を
  // 画像へ差し替える専用スクリプトを使っていたが、全ページの
  // ヘッダーを統一するため、ここで最初から画像として出力する。
  const brandActive = currentKey === "top" ? " active" : "";
  container.innerHTML = `
    <a class="global-nav-brand${brandActive}" href="${escapeHtml(linkRoot + "index.html")}">
      <img src="${escapeHtml(siteRoot + "images/aka-miso/hakkodo-logo-crop-transparent.png")}" alt="HAKKODO" class="home-header-logo">
      <img src="${escapeHtml(siteRoot + "images/aka-miso/hakkodo-face-logo-transparent.png")}" alt="" class="home-header-face-logo">
    </a>
    <ul class="global-nav-list">${itemsHtml}</ul>
  `;
}

// トップページ本体に出す、大きめのセクション導線(既存の .recipe-btn を流用)。
function renderHomeNav(container, siteRoot) {
  if (!container) return;
  const linkRoot = pageLinkRoot(siteRoot);
  container.innerHTML = NAV_ITEMS.map(
    (item) => `<a class="recipe-btn" href="${escapeHtml(linkRoot + item.href)}" data-i18n="${item.i18nKey}"></a>`
  ).join("");
}

// Instagramアカウントの準備ができたら、ここにURL(例:
// "https://www.instagram.com/hakkodo_arigato/")を入れるだけで、
// 全ページのフッターアイコンがリンクとして有効になる。
// 空文字のままなら、アイコンは表示だけでクリックしても何も起きない。
const instagramUrl = "";

// フッターのInstagramアイコン。公式ロゴの形をモノクロの線画にし、
// サイトの文字色(currentColor)をそのまま使うことで、
// 派手なInstagramカラーにならないようにしている。
const INSTAGRAM_ICON_SVG = `<svg viewBox="0 0 24 24" width="19" height="19" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5"></rect><circle cx="12" cy="12" r="4"></circle><circle cx="17.3" cy="6.7" r="0.9" fill="currentColor" stroke="none"></circle></svg>`;

// サイト全体で共通のフッター。お問い合わせ・メールアドレスは
// ヘッダーのナビゲーション(「お問い合わせ」リンク)にすでにあるため、
// フッターには重ねて置かず、"© HAKKODO" だけの最小限の構成にする
// (背景の山・植物イラストなどの装飾は使わない)。
function renderGlobalFooter(container, siteRoot) {
  if (!container) return;
  const instagramHtml = instagramUrl
    ? `<a class="global-footer-instagram" href="${instagramUrl}" target="_blank" rel="noopener noreferrer" aria-label="Instagram">${INSTAGRAM_ICON_SVG}</a>`
    : `<span class="global-footer-instagram" aria-hidden="true">${INSTAGRAM_ICON_SVG}</span>`;
  container.innerHTML = `
    <div class="global-footer-row">
      <p class="global-footer-copyright"><span class="global-footer-copyright-mark">&copy;</span><span class="global-footer-copyright-name">HAKKODO</span></p>
      <span class="global-footer-divider" aria-hidden="true">|</span>
      ${instagramHtml}
    </div>
  `;
}
