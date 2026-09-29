/* ========================================================
   レシピページの土台。商品ページ(product.js)とは完全に独立した
   仕組みなので、レシピを追加・編集しても商品ページのURLや
   QRコードには一切影響しません。

   HAKKODOの味噌を使った小さなレシピ集として、
   カテゴリー別の目次と、レシピごとの共通フォーマット
   (写真・料理名・紹介文・材料・作り方・アレンジ・
   HAKKODOの味噌を使うポイント)で表示します。

   今はレシピの中身が無くても、"手順に写真を追加する" と
   自動的に画像つきのレイアウトに切り替わるように作ってあります。
   ======================================================== */

// 材料を箇条書きで表示する
function renderIngredientList(items) {
  if (!items || items.length === 0) return "";
  return `<ul class="tag-list">${items
    .map((item) => `<li>${escapeHtml(item)}</li>`)
    .join("")}</ul>`;
}

// 作り方の手順を表示する。
// step.image が無ければ文章だけのシンプルな行、
// step.image があれば写真つきのカード表示になる。
function renderSteps(steps, siteRoot, lang) {
  if (!steps || steps.length === 0) return "";

  const items = steps
    .map((step, i) => {
      const number = i + 1;
      if (step.image && step.image.src) {
        const img = imageOrPlaceholder(step.image.src, step.image.alt, "step-img", siteRoot, lang);
        return `
          <li class="step has-image">
            <div class="step-header">
              <span class="step-number">${number}</span>
              <p class="step-text">${escapeHtml(step.text || "")}</p>
            </div>
            <div class="step-image">${img}</div>
          </li>`;
      }
      return `
        <li class="step">
          <span class="step-number">${number}</span>
          <p class="step-text">${escapeHtml(step.text || "")}</p>
        </li>`;
    })
    .join("");

  return `<ol class="step-list">${items}</ol>`;
}

// 個別レシピページの中身を描画する
// 共通フォーマット: 1.料理写真 2.料理名 3.紹介文 4.材料 5.作り方 6.アレンジ
// 7.HAKKODOの味噌を使うポイント の順に表示する。
function renderRecipeContent(data, siteRoot, lang) {
  const root = document.getElementById("recipe-root");
  const tr = data && data.translations && (data.translations[lang] || data.translations.ja);

  if (!tr) {
    root.innerHTML = `<div class="load-error">${escapeHtml(t("productLoadError", lang))}</div>`;
    return;
  }

  const images = data.images || {};
  document.title = tr.title || "";

  // 1. 料理写真(大きくしすぎないよう専用の recipe-hero を使う)
  const heroHtml = images.hero
    ? `<div class="recipe-hero">${imageOrPlaceholder(images.hero, tr.heroAlt, "hero-img", siteRoot, lang)}</div>`
    : "";

  const ingredientsHtml = tr.ingredients && tr.ingredients.length
    ? `<div class="section"><h2>${t("sectionRecipeIngredients", lang)}</h2>${renderIngredientList(tr.ingredients)}</div>`
    : "";

  // 保存期間・ポイントは共通フォーマットの正式なセクションではなく、
  // データにあるレシピだけ「作り方」の下に補足として表示する任意項目。
  const storageNoteHtml = tr.storage
    ? `<p class="recipe-subheading">${escapeHtml(t("recipeStorageLabel", lang))}</p><p class="notes">${escapeHtml(tr.storage)}</p>`
    : "";
  // tipsLabel を指定すると、この位置の見出しをレシピごとに差し替えられる
  // (指定が無ければ従来どおり共通の「ポイント」になる)。
  const tipsLabel = tr.tipsLabel || t("recipeTipsLabel", lang);
  const tipsNoteHtml = tr.tips
    ? `<p class="recipe-subheading">${escapeHtml(tipsLabel)}</p><p class="notes">${escapeHtml(tr.tips)}</p>`
    : "";

  const stepsHtml = tr.steps && tr.steps.length
    ? `<div class="section"><h2>${t("sectionSteps", lang)}</h2>${renderSteps(tr.steps, siteRoot, lang)}${storageNoteHtml}${tipsNoteHtml}</div>`
    : "";

  const arrangeHtml = tr.arrange
    ? `<div class="section"><h2>${t("sectionArrange", lang)}</h2><p>${escapeHtml(tr.arrange)}</p></div>`
    : "";

  const misoPointHtml = tr.misoPoint
    ? `<div class="section"><h2>${t("sectionMisoPoint", lang)}</h2><p>${escapeHtml(tr.misoPoint)}</p></div>`
    : "";

  root.innerHTML = `
    ${heroHtml}
    <div class="product-head">
      <h1>${escapeHtml(tr.title || "")}</h1>
      ${tr.intro ? `<p class="tagline">${escapeHtml(tr.intro)}</p>` : ""}
    </div>
    ${ingredientsHtml}
    ${stepsHtml}
    ${arrangeHtml}
    ${misoPointHtml}
  `;
}

// 個別レシピページの初期化
// 想定外のエラーが起きても画面が真っ白にならないよう、失敗時はエラー表示に切り替える。
function initRecipePage(data, siteRoot) {
  const switcherRoot = document.getElementById("lang-switcher-root");

  function render() {
    try {
      const lang = getCurrentLang();
      applyUiStrings(lang);
      renderRecipeContent(data, siteRoot, lang);
    } catch (e) {
      console.error(e);
      const root = document.getElementById("recipe-root");
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

// レシピを1件分のカードHTMLに変換する。index は一覧内の並び順(0始まり)で、
// 雑誌のような小さな通し番号(01, 02...)の表示に使う。
function renderRecipeCard(href, data, siteRoot, lang, index) {
  const tr = data && data.translations && (data.translations[lang] || data.translations.ja);
  if (!tr) return "";
  const images = (data && data.images) || {};
  // listIntro を指定すると、詳細ページのタグライン(intro)は変えずに
  // 一覧カードの説明文だけを差し替えられる。
  const cardIntro = tr.listIntro || tr.intro || "";
  const number = String(index + 1).padStart(2, "0");
  return `
    <a class="card recipe-card" href="${escapeHtml(href)}">
      <div class="thumb">${imageOrPlaceholder(images.hero, tr.heroAlt, "thumb-img", siteRoot, lang)}</div>
      <div class="card-body">
        <p class="recipe-card-number">${number}</p>
        <h2>${escapeHtml(tr.title || "")}</h2>
        <p>${escapeHtml(cardIntro)}</p>
        <span class="home-feature-link">${escapeHtml(t("viewRecipesLink", lang))}</span>
      </div>
    </a>`;
}

// レシピ一覧(カテゴリー分けをせず、登録された順に1つの一覧として)を描画する。
// recipes: [{ href, data }, ...]
function renderRecipeListContent(recipes, siteRoot, lang) {
  const tocRoot = document.getElementById("recipe-toc");
  const listRoot = document.getElementById("recipe-list-root");

  if (tocRoot) tocRoot.innerHTML = "";

  if (!recipes || recipes.length === 0) {
    listRoot.innerHTML = `<div class="empty-state">${escapeHtml(t("recipesEmpty", lang))}</div>`;
    return;
  }

  listRoot.innerHTML = `
    <div class="card-list">
      ${recipes.map(({ href, data }, i) => renderRecipeCard(href, data, siteRoot, lang, i)).join("")}
    </div>`;
}

// レシピ一覧ページの初期化
// 想定外のエラーが起きても画面が真っ白にならないよう、失敗時はエラー表示に切り替える。
function initRecipeList(recipes, siteRoot) {
  const switcherRoot = document.getElementById("lang-switcher-root");

  function render() {
    try {
      const lang = getCurrentLang();
      applyUiStrings(lang);
      document.title = t("recipesTitle", lang);
      renderRecipeListContent(recipes, siteRoot, lang);
    } catch (e) {
      console.error(e);
      const root = document.getElementById("recipe-list-root");
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
