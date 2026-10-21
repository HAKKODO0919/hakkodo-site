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

// テキスト(要素の中身)用のエスケープ。escapeHtml の処理に加えて、ブランド名・商品名を
// <span translate="no"> で囲み、ブラウザの自動翻訳で変換されないようにする。
// 属性値(alt・href・src など)には使わないこと(属性の中に<span>は入れられないため)。
// 長い表記を先に書く: 「HAKKODO ― 発酵道」(Aboutの正式な見出し)→「HAKKODO MISO」→「HAKKODO」。
// 本文中の「発酵道」「味噌」などの一般的な語は保護しない。
const BRAND_NO_TRANSLATE = /HAKKODO ― 発酵道|HAKKODO MISO|HAKKODO/g;
function escapeText(str) {
  return escapeHtml(str).replace(BRAND_NO_TRANSLATE, '<span translate="no">$&</span>');
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
            ? `<p class="creator-emphasis">${escapeText(part.text)}</p>`
            : `<p class="notes">${escapeText(part.text)}</p>`
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
        ? `<p class="notes-strong">${escapeText(part.text)}</p>`
        : `<p class="notes">${escapeText(part.text)}</p>`
    )
    .join("");
}

function renderTagList(items) {
  if (!items || items.length === 0) return "";
  return `<ul class="tag-list">${items
    .map((item) => `<li>${escapeText(item)}</li>`)
    .join("")}</ul>`;
}

// 商品名の見出し用HTML。「HAKKODO MISO｜熟成赤味噌」のように「｜」を含む名前は、
// 「｜」より後ろ(味噌の種類)を1つのまとまり(.product-name-type)にして、
// 幅が足りないスマホでは「HAKKODO MISO｜」と種類の2行に分かれるようにする。
// 「｜」が無い名前は、これまでどおりそのまま出す。
function renderProductNameHtml(name) {
  const text = name || "";
  const sep = text.indexOf("｜");
  if (sep < 0) return escapeText(text);
  // 「HAKKODO MISO｜」は途中で折り返さない(「｜」だけが次の行の先頭に残らないように)。
  // 「｜」だけを別の要素(.product-name-sep)にして、スマホ幅では、CSSで隠せるようにする(商品名と種類が2行に分かれるため、線は要らない)。
  return `<span class="product-name-brand">${escapeText(text.slice(0, sep))}<span class="product-name-sep">${escapeText(text.charAt(sep))}</span></span><span class="product-name-type">${escapeText(text.slice(sep + 1))}</span>`;
}

// 商品ページの中身を、指定した言語で描画する
// data: window.PRODUCT_DATA の中身(images / translations / updatedAt を持つ)
// 「こだわり」の見出しの左に添える、線画アイコン(インラインSVG。画像ファイルは使わない)。
// data の story.blocks[n].icon に、下のキー(snow / rice / clock / jar)を書くと表示される。省略すると、アイコンなし。
// 24×24の図面・塗りなし・線幅1.5・角と線端は丸く。色は currentColor(見出しと同じ色)。
// width / height を SVG 自身に書いてあるので、CSS が古いキャッシュのままでも、巨大には表示されない。
const STORY_ICON_ATTRS =
  'class="story-icon" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" ' +
  'stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"';
const STORY_ICONS = {
  // 雪の結晶(寒仕込み): 3本の軸と、先の小さな枝
  snow:
    '<path d="M12 3v18M9.8 5.2 12 7.4l2.2-2.2M9.8 18.8 12 16.6l2.2 2.2"/>' +
    '<path d="M12 3v18M9.8 5.2 12 7.4l2.2-2.2M9.8 18.8 12 16.6l2.2 2.2" transform="rotate(60 12 12)"/>' +
    '<path d="M12 3v18M9.8 5.2 12 7.4l2.2-2.2M9.8 18.8 12 16.6l2.2 2.2" transform="rotate(120 12 12)"/>',
  // 稲穂(手作り米麹)
  rice:
    '<path d="M12 21.5V8"/>' +
    '<path d="M12 2.5c1.5 1.3 1.9 3 0 4.8-1.9-1.8-1.5-3.5 0-4.8z"/>' +
    '<path d="M12 11c-2.7 0-4.4-1.5-4.7-4 2.7.1 4.5 1.5 4.7 4z"/><path d="M12 11c2.7 0 4.4-1.5 4.7-4-2.7.1-4.5 1.5-4.7 4z"/>' +
    '<path d="M12 16c-2.7 0-4.4-1.5-4.7-4 2.7.1 4.5 1.5 4.7 4z"/><path d="M12 16c2.7 0 4.4-1.5 4.7-4-2.7.1-4.5 1.5-4.7 4z"/>',
  // 時計(1年以上の発酵・熟成: 時間をかけて熟成する)
  clock:
    '<circle cx="12" cy="12" r="9"/><path d="M12 7v5.2l3.3 2"/>',
  // 蓋つきの瓶(少量生産: 瓶に詰めた、限られた数の味噌)
  jar:
    '<rect x="7" y="3" width="10" height="3" rx="1"/>' +
    '<path d="M8.2 6v1.2C6.6 8.2 5.8 9.4 5.8 11v8a2 2 0 0 0 2 2h8.4a2 2 0 0 0 2-2v-8c0-1.6-.8-2.8-2.4-3.8V6"/>' +
    '<path d="M9.5 13.5h5M9.5 16.5h3.2"/>',
};

// 「保存方法」「賞味期限」に添える、線画アイコン。線の太さ・形式は、上の「こだわり」のアイコンと同じ。
// data の storage.items[n].icon に sun / fridge / jarOpen を書く。calendar は賞味期限の表示で使う。
const INFO_ICONS = {
  // 日なた(直射日光を避ける): 太陽に、斜めの線を重ねる
  sun:
    '<circle cx="12" cy="12" r="3.6"/>' +
    '<path d="M12 3v2M12 19v2M3 12h2M19 12h2M5.6 5.6 7 7M17 17l1.4 1.4M5.6 18.4 7 17M17 7l1.4-1.4"/>' +
    '<path d="M3.5 20.5 20.5 3.5"/>',
  // 冷蔵庫
  fridge:
    '<rect x="6" y="2.5" width="12" height="19" rx="2"/><path d="M6 10h12M9 5.8v1.6M9 13v3"/>',
  // 蓋をあけた瓶(開封後)
  jarOpen:
    '<rect x="7" y="2.5" width="10" height="3" rx="1" transform="rotate(-10 12 4)"/>' +
    '<path d="M8.2 8.5v.7C6.6 10.2 5.8 11.4 5.8 13v6a2 2 0 0 0 2 2h8.4a2 2 0 0 0 2-2v-6c0-1.6-.8-2.8-2.4-3.8v-.7z"/>' +
    '<path d="M9.5 15.5h5"/>',
  // カレンダー(賞味期限)
  calendar:
    '<rect x="3.5" y="5" width="17" height="15.5" rx="2"/><path d="M3.5 10h17M8 3v3.5M16 3v3.5"/>',
};

// 文中の「|」を、折り返してよい文節の切れ目にする(各文節は途中で折り返さない)。日本語で「ならでは」の途中や、行頭に「。」だけが残るのを防ぐ。
// 「|」が無い文(ca・es・en)は、そのまま普通に折り返す。
function phrasesHtml(text) {
  const s = String(text || "");
  if (s.indexOf("|") < 0) return escapeText(s);
  return s
    .split("|")
    .map((part) => `<span class="ph">${escapeText(part)}</span>`)
    .join("");
}

function infoIconHtml(name, size) {
  const icon = INFO_ICONS[name];
  if (!icon) return "";
  return (
    `<svg class="info-icon" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" ` +
    `stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">${icon}</svg>`
  );
}

// 「こだわり」の見出し(h3)。icon があれば、見出しの上に、アイコンを置く(アイコン → 見出し → 説明文の順)。
// アイコンは、見出し(h3)の外に置く(見出しの文字は、そのまま。読み上げにも含めない)。
function storyHeadingHtml(block) {
  const text = escapeText(block.heading || "");
  const icon = block.icon && STORY_ICONS[block.icon];
  if (!icon) return `<h3>${text}</h3>`;
  return `<svg ${STORY_ICON_ATTRS}>${icon}</svg><h3>${text}</h3>`;
}

// siteRoot: サイトの一番上の階層への相対パス、lang: 表示する言語コード
function renderProductContent(data, siteRoot, lang) {
  const root = document.getElementById("product-root");
  const tr = data && data.translations && (data.translations[lang] || data.translations.ja);

  if (!tr) {
    root.innerHTML = `<div class="load-error">${escapeText(t("productLoadError", lang))}</div>`;
    return;
  }

  const images = data.images || {};

  document.title = `${tr.docName || tr.name} | ${t("titleSuffix", lang)}`;

  const storyHtml = (tr.story && tr.story.blocks && tr.story.blocks.length)
    ? `<div class="section story-section">
        <h2>${t("sectionStory", lang)}</h2>
        <div class="story-grid">
        ${tr.story.blocks
          .map(
            (block) => `
          <div class="story-block">
            ${storyHeadingHtml(block)}
            ${(block.body || [])
              .map((part) => {
                // runs があれば、1つの文の中で太字にする部分だけを指定できる
                if (part.runs) {
                  const inner = part.runs
                    .map((run) =>
                      run.bold ? `<strong>${escapeText(run.text)}</strong>` : escapeText(run.text)
                    )
                    .join("");
                  return `<p>${inner}</p>`;
                }
                return part.bold
                  ? `<p class="story-emphasis">${escapeText(part.text)}</p>`
                  : `<p>${escapeText(part.text)}</p>`;
              })
              .join("")}
          </div>`
          )
          .join("")}
        </div>
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
    ? `<p class="allergens">${escapeText(t("allergensLabel", lang))}${escapeText(tr.allergens.join(t("listSeparator", lang)))}</p>`
    : "";

  const ingredientsHtml = (tr.ingredients && tr.ingredients.length)
    ? `<div class="section ingredients-section">
        <h2>${t("sectionIngredients", lang)}</h2>
        ${renderTagList(tr.ingredients)}
        ${tr.ingredientsNote ? `<p class="notes">${escapeText(tr.ingredientsNote)}</p>` : ""}
        ${allergensLineHtml}
      </div>`
    : "";

  // 保存方法: 導入文 + アイコン付きの3項目(アイコンは飾り。見出しと説明は、普通のHTMLの文字)
  const storageHtml = tr.storage
    ? `<div class="section storage-info">
        <h2>${t("sectionStorage", lang)}</h2>
        ${tr.storage.intro ? `<p class="storage-intro">${phrasesHtml(tr.storage.intro)}</p>` : ""}
        <ul class="storage-list">
          ${(tr.storage.items || [])
            .map(
              (item) => `
          <li>
            ${infoIconHtml(item.icon, 26)}
            <div class="storage-item-body">
              <p class="storage-label">${escapeText(item.label)}</p>
              <p class="storage-text">${phrasesHtml(item.text)}</p>
            </div>
          </li>`
            )
            .join("")}
        </ul>
      </div>`
    : "";

  // 賞味期限: 期間を大きく見せ、その下に補足
  const bestBeforeHtml = tr.bestBeforeInfo
    ? `<div class="section best-before">
        <h2>${t("sectionBestBefore", lang)}</h2>
        <div class="best-before-main">
          ${infoIconHtml("calendar", 26)}
          <p class="best-before-value">${escapeText(tr.bestBeforeInfo.value)}</p>
        </div>
        ${(tr.bestBeforeInfo.note || []).length
          ? `<p class="best-before-note">${tr.bestBeforeInfo.note.map((line) => `<span>${phrasesHtml(line)}</span>`).join("")}</p>`
          : ""}
      </div>`
    : "";

  // ページの終わりの「次の行き先」。読み終えた人が、作り手の話(About)へ進めるようにする。
  const aboutHtml = `<div class="section product-about">
        <p class="recipe-link"><a href="${escapeHtml(pageLinkRoot(siteRoot))}story/index.html" class="home-feature-link">${escapeText(t("viewAboutLink", lang))}</a></p>
      </div>`;

  const notesHtml = tr.notes
    ? `<div class="section">
        <h2>${t("sectionNotes", lang)}</h2>
        <p class="notes">${escapeText(tr.notes)}</p>
      </div>`
    : "";

  const priceHtml = tr.price
    ? `<span class="price">${escapeText(tr.price)}</span>`
    : "";

  const netWeightHtml = tr.netWeight
    ? `<span class="net-weight">${escapeText(t("netWeightLabel", lang))}${escapeText(tr.netWeight)}</span>`
    : "";

  root.innerHTML = `
    <div class="product-hero-frame">
      <div class="hero">${imageOrPlaceholder(images.hero, tr.heroAlt, "hero-img", siteRoot, lang)}</div>
    </div>
    <div class="product-head product-detail-head">
      <h1>${renderProductNameHtml(tr.name)}</h1>
      ${tr.descriptionLine1 || tr.descriptionLine2
        ? `${tr.descriptionLine1 ? `<p class="product-catchphrase" lang="${lang}">${escapeText(tr.descriptionLine1)}</p>` : ""}${tr.descriptionLine2 ? `<p class="tagline" lang="${lang}">${escapeText(tr.descriptionLine2)}</p>` : ""}`
        : tr.tagline ? `<p class="tagline">${escapeText(tr.tagline)}</p>` : ""}
      ${(priceHtml || netWeightHtml) ? `<div class="price-row">${priceHtml}${netWeightHtml}</div>` : ""}
      <p class="recipe-link"><a href="${escapeHtml(pageLinkRoot(siteRoot))}recipes/index.html" class="home-feature-link">${escapeHtml(t("viewRecipesLink", lang))}</a></p>
    </div>
    ${tr.description ? `<div class="section description"><h2>${t("sectionDescription", lang)}</h2><p>${escapeText(tr.description)}</p></div>` : ""}
    ${storyHtml}
    ${creatorHtml}
    ${ingredientsHtml}
    ${galleryHtml}
    ${storageHtml}
    ${bestBeforeHtml}
    ${notesHtml}
    ${aboutHtml}
  `;
  // トップページと同じ、スクロールに合わせた控えめなフェードイン(assets/reveal.js)。
  // 最初から画面に見えている部分(写真・商品名)は動かさず、下の欄だけが、画面に入るときに現れる。
  // reveal.js を読み込んでいないページでは何もしない(言語を切り替えて描き直したときも、ここで仕掛け直す)。
  if (typeof initReveal === "function") {
    // スマホ・タブレット(幅799px以下、または指で操作する端末)では、最初の画面に「こだわり」の最初の箱(と、場合によっては2つ目)が入る。
    // それらは「最初から見えている」ので、これまでは、動かされず(または、順番を待たずに、ページを開いた瞬間に)出ていた。
    // PCでは、「こだわり」は最初の画面の下にあり、スクロールで画面に入るときに現れる。そこで、スマホ・タブレットでは、「こだわり」の箱だけ、
    // Aboutページと同じ、ページを開いて、上から順に(0.15秒ずつ遅れて)現れるようにする(includeVisible・visibleRatio: 1。assets/reveal.js)。
    // 写真・商品名は、これまでどおり動かさない。下にある箱や欄は、画面に入るときに現れる(これまでどおり)。PCは変えない。
    const compactView = !!(window.matchMedia && matchMedia("(max-width: 799px), (pointer: coarse)").matches);
    initReveal(".story-block", compactView ? { includeVisible: true, startDelay: 0.25, stagger: 0.15, visibleRatio: 1 } : undefined);
    initReveal(".product-detail-head, .gallery-section, .ingredients-section, .storage-info, .best-before, .creator-outer, .product-about");
  }
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
            <div class="thumb"><div class="thumb-img placeholder">${escapeText(t("photoPending", lang))}</div></div>
            <div class="card-body">
              <h2>${escapeText(t("productLoadError", lang))}</h2>
            </div>
          </a>`;
      }
      const images = data.images || {};
      return `
        <a class="card recipe-card" href="${escapeHtml(href)}">
          <div class="thumb">${imageOrPlaceholder(images.hero, tr.heroAlt, "thumb-img", siteRoot, lang)}</div>
          <div class="card-body">
            <h2>${escapeText(tr.name || "")}</h2>
            <p>${escapeText(tr.tagline || "")}</p>
            <span class="home-feature-link">${escapeText(t("homeMisoLink", lang))}</span>
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
