/* ========================================================
   「味噌とは(What is Miso?)」ページの表示の仕組み。【準備中・未公開のページ】
   文章・写真は data/what-is-miso.js、見た目は assets/what-is-miso.css です。
   言語固定ページ(/ca/what-is-miso/ など)では、i18n.js の PAGE_LANG により、そのページの言語が固定されます(Aboutと同じ仕組み)。
   ======================================================== */

// スマホでも、見て、すぐわかるよう、文章に、細い線のアイコンを添える。商品ページ(assets/product.js)のアイコンと同じ作り方:
// 24×24の図面・塗りなし・線幅1.5・角と線端は丸く・色は currentColor(アクセント色)・SVG自身に大きさを書く・飾りなので読み上げの対象外。
// rice(稲穂)と clock(時計)は、商品ページの STORY_ICONS を、そのまま使う。ほかの3つは、同じ線の太さ・形式で、ここに足している。
const MISO_ICONS = {
  // 大豆: 1粒の豆(上の方に段のある、ふっくらした豆の形)と、中の小さな曲線
  bean:
    '<path d="M12.6 4.6C13.4 3.2 15.2 2.8 16.9 3.4 19.4 4.3 20.6 6.8 20.3 9.8 20 13.8 17.8 16.8 14.6 19.3 12.7 20.8 10.5 21.5 8.2 21 5 20.4 2.8 18 2.7 15 2.7 13 3.6 11.7 5.3 10.6L9 9.8 12.6 4.6z"/>' +
    '<path d="M11.7 7.8C11.6 10 11.8 11.4 10.7 12.7 9.9 13.5 8.7 13.2 8.1 12.3"/>',
  // 塩: ふたに穴のある、塩の容器
  salt:
    '<path d="M9 3.5h6l.9 3.5H8.1L9 3.5z"/>' +
    '<path d="M8 7h8v11.5a2 2 0 0 1-2 2h-4a2 2 0 0 1-2-2V7z"/>' +
    '<path d="M11 11h.01M13.2 13.6h.01M11 15.8h.01"/>',
  // 混ぜる: 器と、へら
  bowl:
    '<path d="M3.5 11.5h17a8.5 8.5 0 0 1-17 0z"/>' +
    '<path d="M14 3.5 10.2 11M16.4 6l-2.2 4.4"/>'
};

function misoIconHtml(name, size) {
  const own = MISO_ICONS[name];
  const shared = typeof STORY_ICONS !== "undefined" ? STORY_ICONS[name] : null;
  const body = own || shared;
  if (!body) return "";
  return (
    `<svg class="mp-icon" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" ` +
    `stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">${body}</svg>`
  );
}

// 内部リンク(ボタン)。サイトの一番上の階層からの相対パスを、言語ごとのページ(/ca/ など)につなぐ。
function misoLinkHtml(link, linkRoot) {
  return `<a class="home-feature-link" href="${escapeHtml(linkRoot + link.href)}">${escapeText(link.label)}</a>`;
}

function renderMisoSection(section, index, tr, images, siteRoot, linkRoot, lang) {
  const alt = (tr.photoAlt && tr.photoAlt[section.key]) || "";
  const paragraphs = (section.paragraphs || []).map((text) => `<p>${escapeText(text)}</p>`).join("");

  // 原料(大豆・米麹・塩): アイコン+名前の3つを、細い罫線で区切って横に並べる
  const materials = (section.materials && section.materials.length)
    ? `<ul class="mp-materials">${section.materials
        .map((m) => `<li>${misoIconHtml(m.icon, 30)}<span>${escapeText(m.label)}</span></li>`)
        .join("")}</ul>`
    : "";

  // 原料の下の、小さな一文(米麹の説明)
  const materialsNote = section.materialsNote ? `<p class="mp-note">${escapeText(section.materialsNote)}</p>` : "";

  // 工程: アイコン+見出し(+強調する短い言葉)+説明。アイコンどうしを細い縦線でつなぐ。
  // section.phase は、最初の何工程かを、ひとまとまりで見せる(例: 米麹から仕込みまでの3工程で4日)。
  //   { label: "米麹から仕込みまで", fact: "4日", count: 3 } → 先頭に見出しの行を足し、最初の count 個の線と丸を、ブラウンで描く
  const phase = section.phase && section.phase.count > 0 ? section.phase : null;
  const phaseHead = phase
    ? `<li class="mp-phase-head"><span class="mp-phase-label">${escapeText(phase.label)}</span><span class="mp-fact">${escapeText(phase.fact)}</span></li>`
    : "";
  const list = (section.list && section.list.length)
    ? `<ul class="mp-list">${phaseHead}${section.list
        .map((item, i) => {
          const icon = item.icon ? `<div class="mp-list-icon">${misoIconHtml(item.icon, 28)}</div>` : "";
          const fact = item.fact ? `<span class="mp-fact">${escapeText(item.fact)}</span>` : "";
          const cls = phase && i < phase.count ? ` class="in-phase${i === phase.count - 1 ? " phase-end" : ""}"` : "";
          return `<li${cls}>${icon}<div class="mp-list-body"><p class="mp-list-label"><span>${escapeText(item.label)}</span>${fact}</p><p class="mp-list-text">${escapeText(item.text)}</p></div></li>`;
        })
        .join("")}</ul>`
    : "";

  // まとめの一文(任意)。セクションの外、ボタンの上に置く。スマホ・タブレットは、工程のすぐ下に左そろえ、PC(幅1000px以上)は、ページのまん中に置く
  const closing = section.closing ? `<p class="mp-closing">${section.closing.split("\n").map(phrasesHtml).join("\n")}</p>` : "";

  const links = (section.links && section.links.length)
    ? `<div class="mp-actions">${section.links.map((l) => misoLinkHtml(l, linkRoot)).join("")}</div>`
    : "";

  // 写真の枠は、data の images にキーがあるセクション(いまは「味噌とは」と「味噌づくり」)。
  const hasPhoto = Object.prototype.hasOwnProperty.call(images, section.key);
  const photo = hasPhoto ? `<div class="mp-photo">${imageOrPlaceholder(images[section.key], alt, "mp-img", siteRoot, lang)}</div>` : "";

  // 偶数番目の(写真のある)セクションは、PC幅で、写真を左・文章を右に入れ替える(見た目だけ。HTMLの順番は同じ)
  // 見出しが空のセクション(1つ目。冒頭のリードと重なるため)は、見出しの部分を出さない
  const head = section.heading ? `<div class="mp-head"><h2>${escapeText(section.heading)}</h2></div>` : "";
  const cls = ["mp-section", head ? "" : "no-head", hasPhoto ? "" : "no-photo", hasPhoto && index % 2 === 1 ? "is-rev" : ""].filter(Boolean).join(" ");
  return `
    <section class="${cls}" id="mp-${escapeHtml(section.key)}">
      ${head}
      ${photo}
      <div class="mp-body">
        ${materials}
        ${materialsNote}
        ${paragraphs}
        ${list}
      </div>
    </section>
    ${closing}
    ${links}`;
}
function renderMisoPage(data, siteRoot, lang) {
  const root = document.getElementById("miso-root");
  if (!root) return;
  const tr = data && data.translations && (data.translations[lang] || data.translations.en);
  if (!tr) {
    root.innerHTML = `<div class="load-error">${escapeText(t("productLoadError", lang))}</div>`;
    return;
  }
  document.title = tr.docTitle;
  const images = data.images || {};
  const linkRoot = pageLinkRoot(siteRoot);
  root.innerHTML = `
    <header class="mp-intro">
      <p class="mp-label">${escapeText(tr.label)}</p>
      <h1>${escapeText(tr.heading)}</h1>
      <p class="mp-lead">${escapeText(tr.lead)}</p>
    </header>
    ${(tr.sections || []).map((s, i) => renderMisoSection(s, i, tr, images, siteRoot, linkRoot, lang)).join("")}
  `;

  // Aboutと同じ、ページを開いたときの、控えめなフェードイン(assets/reveal.js)。写真(.mp-photo)も、文章と一緒に動かす(Aboutのヒーロー写真と同じ)。
  if (typeof initReveal === "function") {
    initReveal(".mp-intro, .mp-section .mp-head, .mp-section .mp-photo, .mp-section .mp-body, .mp-closing", { includeVisible: true, startDelay: 0.25, stagger: 0.15, visibleRatio: 1 });
  }
}

// ページの初期化。言語切り替えUIを設置し、切り替え時に再描画する。
function initMisoPage(data, siteRoot) {
  const switcherRoot = document.getElementById("lang-switcher-root");

  function render() {
    try {
      const lang = getCurrentLang();
      applyUiStrings(lang);
      renderMisoPage(data, siteRoot, lang);
    } catch (e) {
      console.error(e);
      const root = document.getElementById("miso-root");
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
