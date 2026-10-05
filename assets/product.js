/* ========================================================
   商品データ(data/*.js が window.PRODUCT_DATA にセットした内容)を
   画面に表示する仕組み。サーバーを使わずファイルを直接開いても
   動くように、fetch は使わず <script> 読み込みのデータを使います。

   言語の切り替え(assets/i18n.js)と組み合わせて動作します。

   このファイルはデザインの仕組みなので、通常は編集不要です。
   商品の説明文・写真・原材料などは data/a.js, data/b.js, data/c.js を
   編集してください。
   ======================================================== */

function escapeHtml(str) {
  return String(str).replace(/[&<>"']/g, (c) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;",
  }[c]));
}

// 写真が用意されていない/読み込めない場合にプレースホルダーを表示する
// src: images.hero や images.gallery[n] の文字列、siteRoot: サイトの一番上の階層への相対パス
function imageOrPlaceholder(src, alt, className, siteRoot, lang) {
  const pendingText = escapeHtml(t("photoPending", lang));
  if (!src) {
    return `<div class="${className} placeholder">${pendingText}</div>`;
  }
  const safeAlt = escapeHtml(alt || "");
  const safeSrc = escapeHtml(siteRoot + src);
  return `<img class="${className}" src="${safeSrc}" alt="${safeAlt}"
    onerror="this.outerHTML = '<div class=&quot;${className} placeholder&quot;>${pendingText}</div>';">`;
}

// 作り手のプロフィール(似顔絵+本文)のHTML。
// 商品ページの「作り手について」と、独立した about ページの両方で
// 同じ内容・同じデザインを使うための共通部品。
function renderCreatorProfile(creator, siteRoot, lang) {
  if (!creator || !creator.body || !creator.body.length) return "";
  return `
    <div class="creator-bio">
      <div class="creator-avatar">${imageOrPlaceholder(creator.image && creator.image.src, creator.image && creator.image.alt, "creator-avatar-img", siteRoot, lang)}</div>
      ${creator.body
        .map((part) =>
          part.bold
            ? `<p class="creator-emphasis">${escapeHtml(part.text)}</p>`
            : `<p class="notes">${escapeHtml(part.text)}</p>`
        )
        .join("")}
    </div>`;
}

// 文章の配列を、太字/通常を切り替えながら段落として表示する。
// 文字列がそのまま渡された場合(旧形式)は、1つの通常段落として表示する。
function renderNotesBlocks(parts) {
  if (!parts) return "";
  const list = Array.isArray(parts) ? parts : [{ text: parts, bold: false }];
  return list
    .map((part) =>
      part.bold
        ? `<p class="notes-strong">${escapeHtml(part.text)}</p>`
        : `<p class="notes">${escapeHtml(part.text)}</p>`
    )
    .join("");
}

function renderTagList(items) {
  if (!items || items.length === 0) return "";
  return `<ul class="tag-list">${items
    .map((item) => `<li>${escapeHtml(item)}</li>`)
    .join("")}</ul>`;
}

// 商品名の見出し用HTML。「HAKKODO MISO｜熟成赤味噌」のように「｜」を含む名前は、
// 「｜」より後ろ(味噌の種類)を1つのまとまり(.product-name-type)にして、
// 幅が足りないスマホでは「HAKKODO MISO｜」と種類の2行に分かれるようにする。
// 「｜」が無い名前は、これまでどおりそのまま出す。
function renderProductNameHtml(name) {
  const text = name || "";
  const sep = text.indexOf("｜");
  if (sep < 0) return escapeHtml(text);
  return `${escapeHtml(text.slice(0, sep + 1))}<span class="product-name-type">${escapeHtml(text.slice(sep + 1))}</span>`;
}

// 商品ページの中身を、指定した言語で描画する
// data: window.PRODUCT_DATA の中身(images / translations / updatedAt を持つ)
// siteRoot: サイトの一番上の階層への相対パス、lang: 表示する言語コード
function renderProductContent(data, siteRoot, lang) {
  const root = document.getElementById("product-root");
  const tr = data && data.translations && (data.translations[lang] || data.translations.ja);

  if (!tr) {
    root.innerHTML = `<div class="load-error">${escapeHtml(t("productLoadError", lang))}</div>`;
    return;
  }

  const images = data.images || {};

  document.title = `${tr.name} | ${t("titleSuffix", lang)}`;

  const storyHtml = (tr.story && tr.story.blocks && tr.story.blocks.length)
    ? `<div class="section story-section">
        <h2>${t("sectionStory", lang)}</h2>
        ${tr.story.blocks
          .map(
            (block) => `
          <div class="story-block">
            <h3>${escapeHtml(block.heading || "")}</h3>
            ${(block.body || [])
              .map((part) => {
                // runs があれば、1つの文の中で太字にする部分だけを指定できる
                if (part.runs) {
                  const inner = part.runs
                    .map((run) =>
                      run.bold ? `<strong>${escapeHtml(run.text)}</strong>` : escapeHtml(run.text)
                    )
                    .join("");
                  return `<p>${inner}</p>`;
                }
                return part.bold
                  ? `<p class="story-emphasis">${escapeHtml(part.text)}</p>`
                  : `<p>${escapeHtml(part.text)}</p>`;
              })
              .join("")}
          </div>`
          )
          .join("")}
      </div>`
    : "";

  const creatorHtml = (tr.creator && tr.creator.body && tr.creator.body.length)
    ? `<div class="section creator-outer">
        <div class="creator-card">
          <h2>${t("sectionCreator", lang)}</h2>
          ${renderCreatorProfile(tr.creator, siteRoot, lang)}
        </div>
      </div>`
    : "";

  const galleryImages = images.gallery || [];
  const galleryAlts = tr.galleryAlt || [];
  const galleryHtml = galleryImages.length
    ? `<div class="section gallery-section">
        <div class="gallery">
          ${galleryImages
            .map((src, i) => `<div class="thumb">${imageOrPlaceholder(src, galleryAlts[i], "thumb-img", siteRoot, lang)}</div>`)
            .join("")}
        </div>
      </div>`
    : "";

  const allergensLineHtml = (tr.allergens && tr.allergens.length)
    ? `<p class="allergens">${escapeHtml(t("allergensLabel", lang))}${escapeHtml(tr.allergens.join(t("listSeparator", lang)))}</p>`
    : "";

  const ingredientsHtml = (tr.ingredients && tr.ingredients.length)
    ? `<div class="section ingredients-section">
        <h2>${t("sectionIngredients", lang)}</h2>
        ${renderTagList(tr.ingredients)}
        ${tr.ingredientsNote ? `<p class="notes">${escapeHtml(tr.ingredientsNote)}</p>` : ""}
        ${allergensLineHtml}
      </div>`
    : "";

  const storageHtml = tr.storageWarning
    ? `<div class="section storage-info">
        <h2>${t("sectionStorage", lang)}</h2>
        ${renderNotesBlocks(tr.storageWarning)}
        ${tr.storageMethod ? `<p class="notes">${escapeHtml(tr.storageMethod)}</p>` : ""}
      </div>`
    : "";

  const bestBeforeHtml = tr.bestBefore
    ? `<div class="section best-before">
        <h2>${t("sectionBestBefore", lang)}</h2>
        ${renderNotesBlocks(tr.bestBefore)}
      </div>`
    : "";

  const notesHtml = tr.notes
    ? `<div class="section">
        <h2>${t("sectionNotes", lang)}</h2>
        <p class="notes">${escapeHtml(tr.notes)}</p>
      </div>`
    : "";

  const priceHtml = tr.price
    ? `<span class="price">${escapeHtml(tr.price)}</span>`
    : "";

  const netWeightHtml = tr.netWeight
    ? `<span class="net-weight">${escapeHtml(t("netWeightLabel", lang))}${escapeHtml(tr.netWeight)}</span>`
    : "";

  root.innerHTML = `
    <div class="product-hero-frame">
      <div class="hero">${imageOrPlaceholder(images.hero, tr.heroAlt, "hero-img", siteRoot, lang)}</div>
    </div>
    <div class="product-head product-detail-head">
      <h1>${renderProductNameHtml(tr.name)}</h1>
      ${tr.descriptionLine1 || tr.descriptionLine2
        ? `${tr.descriptionLine1 ? `<p class="product-catchphrase">${escapeHtml(tr.descriptionLine1)}</p>` : ""}${tr.descriptionLine2 ? `<p class="tagline">${escapeHtml(tr.descriptionLine2)}</p>` : ""}`
        : tr.tagline ? `<p class="tagline">${escapeHtml(tr.tagline)}</p>` : ""}
      ${(priceHtml || netWeightHtml) ? `<div class="price-row">${priceHtml}${netWeightHtml}</div>` : ""}
      <p class="recipe-link"><a href="${escapeHtml(pageLinkRoot(siteRoot))}recipes/index.html" class="home-feature-link">${escapeHtml(t("viewRecipesLink", lang))}</a></p>
    </div>
    ${tr.description ? `<div class="section description"><h2>${t("sectionDescription", lang)}</h2><p>${escapeHtml(tr.description)}</p></div>` : ""}
    ${storyHtml}
    ${galleryHtml}
    ${ingredientsHtml}
    ${storageHtml}
    ${bestBeforeHtml}
    ${creatorHtml}
    ${notesHtml}
  `;
}

// 商品ページの初期化。言語切り替えUIを設置し、切り替え時に再描画する。
// 想定外のエラーが起きても画面が真っ白にならないよう、失敗時はエラー表示に切り替える。
function initProductPage(data, siteRoot) {
  const switcherRoot = document.getElementById("lang-switcher-root");

  function render() {
    try {
      const lang = getCurrentLang();
      applyUiStrings(lang);
      renderProductContent(data, siteRoot, lang);
    } catch (e) {
      console.error(e);
      const root = document.getElementById("product-root");
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

// トップページのカード一覧を、指定した言語で描画する
// items: [{ href: "products/a/index.html", data: window.PRODUCT_DATA相当 }, ...]
function renderProductListContent(items, siteRoot, lang) {
  const root = document.getElementById("product-list-root");

  root.innerHTML = items
    .map(({ href, data }) => {
      const tr = data && data.translations && (data.translations[lang] || data.translations.ja);
      if (!tr) {
        return `
          <a class="card recipe-card" href="${escapeHtml(href)}">
            <div class="thumb"><div class="thumb-img placeholder">${escapeHtml(t("photoPending", lang))}</div></div>
            <div class="card-body">
              <h2>${escapeHtml(t("productLoadError", lang))}</h2>
            </div>
          </a>`;
      }
      const images = data.images || {};
      return `
        <a class="card recipe-card" href="${escapeHtml(href)}">
          <div class="thumb">${imageOrPlaceholder(images.hero, tr.heroAlt, "thumb-img", siteRoot, lang)}</div>
          <div class="card-body">
            <h2>${escapeHtml(tr.name || "")}</h2>
            <p>${escapeHtml(tr.tagline || "")}</p>
            <span class="home-feature-link">${escapeHtml(t("homeMisoLink", lang))}</span>
          </div>
        </a>`;
    })
    .join("");
}

// トップページの初期化。言語切り替えUIを設置し、切り替え時に再描画する。
// 想定外のエラーが起きても画面が真っ白にならないよう、失敗時はエラー表示に切り替える。
function initProductList(items, siteRoot) {
  const switcherRoot = document.getElementById("lang-switcher-root");

  function render() {
    try {
      const lang = getCurrentLang();
      applyUiStrings(lang);
      document.title = t("topTitle", lang);
      renderProductListContent(items, siteRoot, lang);
    } catch (e) {
      console.error(e);
      const root = document.getElementById("product-list-root");
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
