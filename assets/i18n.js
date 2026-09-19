/* ========================================================
   多言語対応(日本語 / Català / Español / English)の仕組み。
   サイト共通の文言(見出し・ボタンなど)はここで管理します。
   商品ごとの説明文・原材料などの翻訳は data/a.js などの
   "translations" の中に書きます。
   ======================================================== */

const SUPPORTED_LANGS = ["ca", "es", "en", "ja"];

const LANG_LABELS = {
  ja: "Japanese",
  ca: "Català",
  es: "Español",
  en: "English",
};

// 言語切り替えメニューに表示する旗。
// 絵文字の国旗は環境(OS・ブラウザ)によって「JP」のような文字表示に
// なってしまうことがあるため、すべての言語で小さなSVGを描いて表示する。
// カタルーニャ(ca)は絵文字の国旗が存在しないため、元々SVGで
// Senyera(4本の赤い縞)を表示しており、他の言語もそれと同じ方式・
// 同じ見た目(サイズ・角丸)にそろえている。
const LANG_FLAG_SVGS = {
  ja:
    '<svg class="lang-flag" viewBox="0 0 30 20" aria-hidden="true" focusable="false">' +
    '<rect width="30" height="20" fill="#FFFFFF"/>' +
    '<circle cx="15" cy="10" r="6" fill="#BC002D"/>' +
    "</svg>",
  ca:
    '<svg class="lang-flag" viewBox="0 0 30 20" aria-hidden="true" focusable="false">' +
    '<rect width="30" height="20" fill="#FCDD09"/>' +
    '<rect y="2.22" width="30" height="2.22" fill="#DA121A"/>' +
    '<rect y="6.67" width="30" height="2.22" fill="#DA121A"/>' +
    '<rect y="11.11" width="30" height="2.22" fill="#DA121A"/>' +
    '<rect y="15.56" width="30" height="2.22" fill="#DA121A"/>' +
    "</svg>",
  es:
    '<svg class="lang-flag" viewBox="0 0 30 20" aria-hidden="true" focusable="false">' +
    '<rect width="30" height="20" fill="#AA151B"/>' +
    '<rect y="5" width="30" height="10" fill="#F1BF00"/>' +
    "</svg>",
  en:
    '<svg class="lang-flag" viewBox="0 0 30 20" aria-hidden="true" focusable="false">' +
    '<rect width="30" height="20" fill="#00247D"/>' +
    '<path d="M0,0 L30,20 M30,0 L0,20" stroke="#FFFFFF" stroke-width="4"/>' +
    '<path d="M0,0 L30,20 M30,0 L0,20" stroke="#CF142B" stroke-width="1.5"/>' +
    '<path d="M15,0 V20 M0,10 H30" stroke="#FFFFFF" stroke-width="6"/>' +
    '<path d="M15,0 V20 M0,10 H30" stroke="#CF142B" stroke-width="3.5"/>' +
    "</svg>",
};

function langFlagHtml(code) {
  return LANG_FLAG_SVGS[code] || "";
}

// サイト共通の文言。新しい言語を増やす場合はここにキーを追加します。
const UI_STRINGS = {
  ja: {
    titleSuffix: "商品情報",
    topTitle: "商品一覧",
    topIntro: "気になる商品を選んでください",
    backLink: "← 商品一覧にもどる",
    homeLink: "← トップにもどる",
    productFooter: "掲載内容は予告なく更新される場合があります。",
    sectionDescription: "商品説明",
    sectionStory: "こだわり",
    sectionCreator: "作り手について",
    sectionPhotos: "写真",
    sectionIngredients: "原材料",
    sectionAllergens: "アレルギー表示",
    allergensLabel: "アレルギー：",
    listSeparator: "、",
    sectionStorage: "保存方法",
    sectionBestBefore: "賞味期限",
    sectionNotes: "その他",
    netWeightLabel: "内容量: ",
    updatedLabel: "最終更新日: ",
    photoPending: "写真準備中",
    productLoadError: "商品データを読み込めませんでした。",
    viewRecipesLink: "レシピを見る",
    recipesTitle: "レシピ一覧",
    recipesCatchphrase: "日本の味噌をいつもの食事に。",
    recipesIntro: "すぐに実践できる簡単レシピをご用意しました。",
    recipesEmpty: "現在公開しているレシピはありません。近日公開予定です。",
    recipeBackLink: "← レシピ一覧にもどる",
    sectionRecipeIngredients: "材料",
    sectionSteps: "作り方",
    sectionArrange: "アレンジ",
    sectionMisoPoint: "HAKKODOの味噌を使うポイント",
    recipeStorageLabel: "保存期間",
    recipeTipsLabel: "ポイント",
    navProducts: "商品",
    navRecipes: "レシピ",
    navWorkshops: "ワークショップ",
    navNews: "新着情報",
    navAbout: "作り手について",
    navContact: "お問い合わせ",
    homeMisoTitle: "味噌・こだわり",
    homeMisoLink: "商品を見る",
    homeWorkshopLink: "ワークショップを見る",
    homeNewsLink: "新着情報を見る",
    workshopsTitle: "ワークショップ",
    workshopsIntro: "HAKKODOが開催するワークショップをご紹介します。",
    workshopsScheduleLink: "開催スケジュールを見る",
    workshopsScheduleTitle: "ワークショップスケジュール",
    workshopsScheduleEmpty: "現在開催予定のワークショップはありません。近日公開予定です。",
    workshopsBackLink: "← ワークショップにもどる",
    workshopDateLabel: "開催日: ",
    workshopTimeLabel: "時間: ",
    workshopPlaceLabel: "場所: ",
    workshopFeeLabel: "参加費: ",
    workshopCapacityLabel: "定員: ",
    workshopReservationLabel: "予約方法: ",
    newsTitle: "新着情報",
    newsEmpty: "現在お知らせはありません。",
    aboutIntro: "HAKKODOを作っている人について、近日公開予定です。",
    contactTitle: "お問い合わせ",
    contactIntro: "ご質問・お問い合わせは、メールにてお願いいたします。",
    contactProductTitle: "商品について",
    contactProductBody: "商品に関するご質問、購入についてのお問い合わせ",
    contactWorkshopTitle: "ワークショップについて",
    contactWorkshopBody: "開催内容、参加についてのお問い合わせ",
    contactOtherTitle: "その他",
    contactOtherBody: "HAKKODOについてのご質問など",
    contentComingSoon: "詳しい内容は近日公開予定です。",
  },
  ca: {
    titleSuffix: "Informació del producte",
    topTitle: "Llista de productes",
    topIntro: "Un producte per descobrir.",
    backLink: "← Tornar a la llista de productes",
    homeLink: "← Tornar a l'inici",
    productFooter: "El contingut mostrat es pot actualitzar sense previ avís.",
    sectionDescription: "Descripció del producte",
    sectionStory: "El nostre compromís",
    sectionCreator: "Sobre la creadora",
    sectionPhotos: "Fotos",
    sectionIngredients: "Ingredients",
    sectionAllergens: "Al·lèrgens",
    allergensLabel: "Al·lèrgens: ",
    listSeparator: ", ",
    sectionStorage: "Conservació",
    sectionBestBefore: "Data de consum preferent",
    sectionNotes: "Altra informació",
    netWeightLabel: "Contingut net: ",
    updatedLabel: "Darrera actualització: ",
    photoPending: "Foto pendent",
    productLoadError: "No s'han pogut carregar les dades del producte.",
    viewRecipesLink: "Veure receptes",
    recipesTitle: "Llista de receptes",
    recipesCatchphrase: "El miso japonès, per al dia a dia.",
    recipesIntro: "Hem preparat receptes senzilles que es poden fer a l'instant.",
    recipesEmpty: "Encara no hi ha receptes publicades. Properament!",
    recipeBackLink: "← Tornar a la llista de receptes",
    sectionRecipeIngredients: "Ingredients",
    sectionSteps: "Preparació",
    sectionArrange: "Variants",
    sectionMisoPoint: "Per què fer servir el miso HAKKODO",
    recipeStorageLabel: "Conservació",
    recipeTipsLabel: "Consell",
    navProducts: "Productes",
    navRecipes: "Receptes",
    navWorkshops: "Tallers",
    navNews: "Novetats",
    navAbout: "Sobre la creadora",
    navContact: "Contacte",
    homeMisoTitle: "El miso i el nostre compromís",
    homeMisoLink: "Veure el producte",
    homeWorkshopLink: "Veure els tallers",
    homeNewsLink: "Veure les novetats",
    workshopsTitle: "Tallers",
    workshopsIntro: "Presentem els tallers organitzats per HAKKODO.",
    workshopsScheduleLink: "Veure el calendari",
    workshopsScheduleTitle: "Calendari de tallers",
    workshopsScheduleEmpty: "Encara no hi ha tallers programats. Properament!",
    workshopsBackLink: "← Tornar als tallers",
    workshopDateLabel: "Data: ",
    workshopTimeLabel: "Hora: ",
    workshopPlaceLabel: "Lloc: ",
    workshopFeeLabel: "Preu: ",
    workshopCapacityLabel: "Places: ",
    workshopReservationLabel: "Reserves: ",
    newsTitle: "Novetats",
    newsEmpty: "Encara no hi ha novetats.",
    aboutIntro: "Properament, més informació sobre la persona darrere de HAKKODO.",
    contactTitle: "Contacte",
    contactIntro: "Per a consultes, es pot escriure per correu electrònic.",
    contactProductTitle: "Sobre els productes",
    contactProductBody: "Preguntes sobre productes o consultes de compra",
    contactWorkshopTitle: "Sobre els tallers",
    contactWorkshopBody: "Informació sobre els tallers i la participació",
    contactOtherTitle: "Altres consultes",
    contactOtherBody: "Qualsevol altra pregunta sobre HAKKODO",
    contentComingSoon: "El contingut detallat estarà disponible properament.",
  },
  es: {
    titleSuffix: "Información del producto",
    topTitle: "Lista de productos",
    topIntro: "Un producto por descubrir.",
    backLink: "← Volver a la lista de productos",
    homeLink: "← Volver al inicio",
    productFooter: "El contenido mostrado puede actualizarse sin previo aviso.",
    sectionDescription: "Descripción del producto",
    sectionStory: "Nuestro compromiso",
    sectionCreator: "Sobre la creadora",
    sectionPhotos: "Fotos",
    sectionIngredients: "Ingredientes",
    sectionAllergens: "Alérgenos",
    allergensLabel: "Alérgenos: ",
    listSeparator: ", ",
    sectionStorage: "Conservación",
    sectionBestBefore: "Fecha de consumo preferente",
    sectionNotes: "Otra información",
    netWeightLabel: "Contenido neto: ",
    updatedLabel: "Última actualización: ",
    photoPending: "Foto pendiente",
    productLoadError: "No se pudieron cargar los datos del producto.",
    viewRecipesLink: "Ver recetas",
    recipesTitle: "Lista de recetas",
    recipesCatchphrase: "El miso japonés, para el día a día.",
    recipesIntro: "Hemos preparado recetas sencillas que se pueden hacer al instante.",
    recipesEmpty: "Todavía no hay recetas publicadas. ¡Próximamente!",
    recipeBackLink: "← Volver a la lista de recetas",
    sectionRecipeIngredients: "Ingredientes",
    sectionSteps: "Preparación",
    sectionArrange: "Variantes",
    sectionMisoPoint: "Por qué usar el miso HAKKODO",
    recipeStorageLabel: "Conservación",
    recipeTipsLabel: "Consejo",
    navProducts: "Productos",
    navRecipes: "Recetas",
    navWorkshops: "Talleres",
    navNews: "Novedades",
    navAbout: "Sobre la creadora",
    navContact: "Contacto",
    homeMisoTitle: "El miso y nuestro compromiso",
    homeMisoLink: "Ver el producto",
    homeWorkshopLink: "Ver los talleres",
    homeNewsLink: "Ver las novedades",
    workshopsTitle: "Talleres",
    workshopsIntro: "Presentamos los talleres organizados por HAKKODO.",
    workshopsScheduleLink: "Ver el calendario",
    workshopsScheduleTitle: "Calendario de talleres",
    workshopsScheduleEmpty: "Todavía no hay talleres programados. ¡Próximamente!",
    workshopsBackLink: "← Volver a talleres",
    workshopDateLabel: "Fecha: ",
    workshopTimeLabel: "Hora: ",
    workshopPlaceLabel: "Lugar: ",
    workshopFeeLabel: "Precio: ",
    workshopCapacityLabel: "Plazas: ",
    workshopReservationLabel: "Reservas: ",
    newsTitle: "Novedades",
    newsEmpty: "Todavía no hay novedades.",
    aboutIntro: "Próximamente, más información sobre la persona detrás de HAKKODO.",
    contactTitle: "Contacto",
    contactIntro: "Para consultas, se puede escribir por correo electrónico.",
    contactProductTitle: "Sobre los productos",
    contactProductBody: "Preguntas sobre productos o consultas de compra",
    contactWorkshopTitle: "Sobre los talleres",
    contactWorkshopBody: "Información sobre los talleres y la participación",
    contactOtherTitle: "Otras consultas",
    contactOtherBody: "Cualquier otra pregunta sobre HAKKODO",
    contentComingSoon: "El contenido detallado estará disponible próximamente.",
  },
  en: {
    titleSuffix: "Product Information",
    topTitle: "Product List",
    topIntro: "Choose a product you're interested in",
    topFooter: "Each product page has a fixed URL.",
    backLink: "← Back to product list",
    homeLink: "← Back to home",
    productFooter: "Displayed content may be updated without notice.",
    sectionDescription: "Product Description",
    sectionStory: "Our Commitment",
    sectionCreator: "About the Maker",
    sectionPhotos: "Photos",
    sectionIngredients: "Ingredients",
    sectionAllergens: "Allergens",
    allergensLabel: "Allergens: ",
    listSeparator: ", ",
    sectionStorage: "Storage",
    sectionBestBefore: "Best Before",
    sectionNotes: "Other Information",
    netWeightLabel: "Net weight: ",
    updatedLabel: "Last updated: ",
    photoPending: "Photo coming soon",
    productLoadError: "Could not load product data.",
    viewRecipesLink: "View Recipes",
    recipesTitle: "Recipe List",
    recipesCatchphrase: "Japanese miso, for everyday cooking.",
    recipesIntro: "We've prepared simple recipes you can try right away.",
    recipesEmpty: "No recipes published yet. Coming soon.",
    recipeBackLink: "← Back to recipe list",
    sectionRecipeIngredients: "Ingredients",
    sectionSteps: "Instructions",
    sectionArrange: "Variations",
    sectionMisoPoint: "Why HAKKODO Miso",
    recipeStorageLabel: "Storage",
    recipeTipsLabel: "Tip",
    navProducts: "Products",
    navRecipes: "Recipes",
    navWorkshops: "Workshops",
    navNews: "News",
    navAbout: "About the Maker",
    navContact: "Contact",
    homeMisoTitle: "Miso & Our Commitment",
    homeMisoLink: "See the product",
    homeWorkshopLink: "See the workshops",
    homeNewsLink: "See the news",
    workshopsTitle: "Workshops",
    workshopsIntro: "Discover the workshops hosted by HAKKODO.",
    workshopsScheduleLink: "View Schedule",
    workshopsScheduleTitle: "Workshop Schedule",
    workshopsScheduleEmpty: "No workshops are currently scheduled. Coming soon.",
    workshopsBackLink: "← Back to workshops",
    workshopDateLabel: "Date: ",
    workshopTimeLabel: "Time: ",
    workshopPlaceLabel: "Place: ",
    workshopFeeLabel: "Fee: ",
    workshopCapacityLabel: "Capacity: ",
    workshopReservationLabel: "Reservation: ",
    newsTitle: "News",
    newsEmpty: "No news at this time.",
    aboutIntro: "More about the person behind HAKKODO, coming soon.",
    contactTitle: "Contact",
    contactIntro: "For any questions, please contact us by email.",
    contactProductTitle: "About Products",
    contactProductBody: "Questions about products or purchasing",
    contactWorkshopTitle: "About Workshops",
    contactWorkshopBody: "Details and participation inquiries",
    contactOtherTitle: "Other Inquiries",
    contactOtherBody: "Any other questions about HAKKODO",
    contentComingSoon: "Detailed content is coming soon.",
  },
};

const LANG_STORAGE_KEY = "siteLang";

function getCurrentLang() {
  try {
    const saved = localStorage.getItem(LANG_STORAGE_KEY);
    if (SUPPORTED_LANGS.includes(saved)) return saved;
  } catch (e) {
    // localStorageが使えない環境ではデフォルト言語にフォールバック
  }
  return "ja";
}

function setCurrentLang(lang) {
  try {
    localStorage.setItem(LANG_STORAGE_KEY, lang);
  } catch (e) {
    // 保存できなくても表示の切り替え自体は継続する
  }
}

function t(key, lang) {
  const l = lang || getCurrentLang();
  return (UI_STRINGS[l] && UI_STRINGS[l][key]) || UI_STRINGS.ja[key] || key;
}

// data-i18n="キー名" が付いた要素の文字を、現在の言語の文言に差し替える
function applyUiStrings(lang) {
  document.documentElement.lang = lang;
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    el.textContent = t(el.getAttribute("data-i18n"), lang);
  });
}

// 言語切り替えメニューを描画する(旗 + 言語名 + ▼ のボタン式)
// container: 描画先の要素、onChange: 言語が変わったときに呼ばれる関数
function renderLangSwitcher(container, onChange) {
  const current = getCurrentLang();

  function currentButtonHtml(code) {
    return `${langFlagHtml(code)}<span class="lang-current-label">${LANG_LABELS[code]}</span><span class="lang-caret" aria-hidden="true">▼</span>`;
  }

  container.innerHTML = `
    <div class="lang-switcher-dropdown">
      <button type="button" class="lang-current" aria-haspopup="listbox" aria-expanded="false" aria-label="Language / 言語 / Idioma">
        ${currentButtonHtml(current)}
      </button>
      <ul class="lang-options" role="listbox" hidden>
        ${SUPPORTED_LANGS.map(
          (code) => `
          <li role="option" aria-selected="${code === current}">
            <button type="button" class="lang-option-btn" data-lang="${code}">
              ${langFlagHtml(code)}<span>${LANG_LABELS[code]}</span>
            </button>
          </li>`
        ).join("")}
      </ul>
    </div>
  `;

  const toggleBtn = container.querySelector(".lang-current");
  const list = container.querySelector(".lang-options");

  function closeList() {
    list.hidden = true;
    toggleBtn.setAttribute("aria-expanded", "false");
  }

  toggleBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    const isOpen = !list.hidden;
    if (isOpen) {
      closeList();
    } else {
      list.hidden = false;
      toggleBtn.setAttribute("aria-expanded", "true");
      document.addEventListener("click", closeList, { once: true });
    }
  });

  container.querySelectorAll(".lang-option-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const code = btn.getAttribute("data-lang");
      setCurrentLang(code);
      toggleBtn.innerHTML = currentButtonHtml(code);
      container.querySelectorAll(".lang-options li").forEach((li) => {
        li.setAttribute("aria-selected", li.querySelector(".lang-option-btn").getAttribute("data-lang") === code ? "true" : "false");
      });
      closeList();
      onChange(code);
    });
  });
}
