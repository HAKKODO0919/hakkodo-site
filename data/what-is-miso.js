// ============================================================
// 「味噌とは(What is Miso?)」ページの文章と写真です。【準備中・未公開のページ】
// 表示は assets/what-is-miso.js、見た目は assets/what-is-miso.css です。
//
// ※ このページの冒頭には、大きな写真を置きません(レシピ一覧と同じ、見出しのすぐ下から、内容が始まります)。大きな写真は、「味噌とは」と「HAKKODOの味噌づくり」の2つのセクションにあります。
// ※ 「味噌とは」の見出しと、冒頭のリードが重なるため、1つ目のセクションには、見出しも、番号も、定義の文も、置きません(リードが、定義の文です)。
// ※ 「料理に取り入れる」のセクションと、上の目次は、シンプルにするため、削除しました(レシピへは、ページの最後の「レシピ一覧」のボタンで案内します)。
// 写真: images の値を、写真のファイル名(例: "images/what-is-miso/making.jpg")にすると、その場所に表示されます。
//        null のままなら、「写真は準備中」の枠(既存の、薄い縞の枠)が出ます。alt は、各言語の説明文(photoAlt)に書いてください。
//   miso ………… 「味噌とは」の写真(images/what-is-miso/miso.webp。お皿に盛った味噌)
//   making …… 「HAKKODOの味噌づくり」の写真(images/aka-miso/photo2-v2.jpg。トレーに広げた米。商品ページと同じ写真)
//
// スマホで、見て、わかりやすいよう、アイコンと、強調する短い言葉を使っています(商品ページと同じ、細い線のアイコン)。
//   materials ………… 原料(大豆・米麹・塩)。icon は bean(大豆)/ rice(稲穂)/ salt(塩)。materialsNote は、その下の、小さな一文(米麹の説明)
//   list の icon …… rice / bean / bowl(混ぜる)/ clock(時間)。fact は、強調する短い言葉。
//   phase …… 最初の count 個の工程を、ひとまとまりで見せる(米麹・大豆・仕込みの3工程で5日)。label と fact が、先頭の見出しの行になる
//
// 内容:「味噌づくり」の工程は、作り手が教えてくれた、HAKKODOの実際の作り方だけを書いています(新しい事実は書いていません)。
// 商品ページの「こだわり」(寒仕込み・日本の麹菌・1年以上の熟成・少量生産)とは、重ならないよう、ここでは、作業の流れを、具体的に説明します。
// ca・es・en は、日本語に合わせた私の下書きです(ネイティブの確認が必要)。
// ============================================================
window.WHAT_IS_MISO_DATA = {
  images: {
    miso: "images/what-is-miso/miso.webp",
    making: "images/aka-miso/photo2-v2.jpg"
  },
  translations: {
    ja: {
      docTitle: "味噌とは | HAKKODO",
      label: "Miso",
      heading: "味噌とは",
      lead: "大豆、米麹、塩を混ぜ合わせ、発酵・熟成させて作る、\n日本の伝統的な発酵調味料です。",
      photoAlt: { miso: "お皿に盛った味噌", making: "布を敷いたトレーに広げた米" },
      sections: [
        {
          key: "miso",
          short: "味噌とは",
          heading: "",
          paragraphs: [
            "味噌は、深いうまみと塩味が特徴です。日本ではお味噌汁、煮物や炒め物などに使われてきましたが、最近ではドレッシングやソース、他の食文化とも調和しジャンルを超えた料理にも広がっています。"
          ],
          materials: [
            { icon: "bean", label: "大豆" },
            { icon: "rice", label: "米麹" },
            { icon: "salt", label: "塩" }
          ],
          materialsNote: "米麹は、米に麹菌を繁殖させたものです。",
          links: [
            { label: "レシピを見る", href: "recipes/index.html" }
          ]
        },
        {
          key: "making",
          short: "つくり方",
          heading: "HAKKODOの味噌づくり",
          paragraphs: [],
          phase: { label: "米麹から仕込みまで、すべて手作り", fact: "5日", count: 3 },
          list: [
            { icon: "rice", label: "米麹づくり", text: "蒸した米に麹菌をつけて、米麹をつくる" },
            { icon: "bean", label: "大豆", text: "よく洗い、しっかり浸水。蒸して、すりつぶす。" },
            { icon: "bowl", label: "仕込み", text: "米麹、大豆、塩を混ぜ、水分量を調整し、容器へ。" },
            { icon: "clock", label: "発酵・熟成", fact: "1年以上", text: "室温と湿度をつねに整えながら、じっくり発酵。" }
          ],
          closing: "味噌は、生き物。|毎回『ありがとう』と|声をかけながら|仕込んでいます。\nこの味噌が、|食べた人の次の|『ありがとう』につながりますように。",
          links: [
            { label: "商品の特徴を見る", href: "products/miso/index.html" }
          ]
        }
      ]
    },
    ca: {
      docTitle: "Què és el miso? | HAKKODO",
      label: "Miso",
      heading: "Què és el miso?",
      lead: "Un condiment fermentat tradicional del Japó, elaborat barrejant soja, koji d'arròs i sal, i fermentat i madurat.",
      photoAlt: { miso: "Miso servit en un plat", making: "Arròs estès en safates folrades de tela" },
      sections: [
        {
          key: "miso",
          short: "Què és",
          heading: "",
          paragraphs: [
            "El miso es caracteritza per un umami profund i un gust salat. Al Japó es fa servir en la sopa de miso, en guisats, saltejats i similars. Darrerament, però, també s'ha estès a vinagretes i salses, i a plats que s'harmonitzen amb altres cultures gastronòmiques i van més enllà dels gèneres."
          ],
          materials: [
            { icon: "bean", label: "Soja" },
            { icon: "rice", label: "Koji d'arròs" },
            { icon: "salt", label: "Sal" }
          ],
          materialsNote: "El koji d'arròs és arròs en el qual s'ha fet créixer el fong koji.",
          links: [
            { label: "Veure receptes", href: "recipes/index.html" }
          ]
        },
        {
          key: "making",
          short: "Com es fa",
          heading: "Fer miso a HAKKODO",
          paragraphs: [],
          phase: { label: "Del koji a l'elaboració, tot fet a mà", fact: "5 dies", count: 3 },
          list: [
            { icon: "rice", label: "Koji d'arròs", text: "Es cou l'arròs al vapor i s'hi afegeix el fong koji per fer-ne koji d'arròs." },
            { icon: "bean", label: "Soja", text: "Es renta, es deixa en remull, es cou al vapor i s'esclafa." },
            { icon: "bowl", label: "Elaboració", text: "Es barregen koji, soja i sal, s'ajusta la quantitat d'aigua i es posa en un envàs." },
            { icon: "clock", label: "Fermentació i maduració", fact: "Més d'un any", text: "Ajustem sempre la temperatura i la humitat mentre fermenta lentament." }
          ],
          closing: "El miso és un ésser viu. Cada vegada que l'elaborem, li diem «gràcies».\nQue aquest miso es converteixi en el pròxim «gràcies» de qui el tasti.",
          links: [
            { label: "Veure les característiques", href: "products/miso/index.html" }
          ]
        }
      ]
    },
    es: {
      docTitle: "¿Qué es el miso? | HAKKODO",
      label: "Miso",
      heading: "¿Qué es el miso?",
      lead: "Un condimento fermentado tradicional de Japón, elaborado mezclando soja, koji de arroz y sal, y fermentado y madurado.",
      photoAlt: { miso: "Miso servido en un plato", making: "Arroz extendido en bandejas forradas de tela" },
      sections: [
        {
          key: "miso",
          short: "Qué es",
          heading: "",
          paragraphs: [
            "El miso se caracteriza por un umami profundo y un sabor salado. En Japón se usa en la sopa de miso, en guisos, salteados y similares. Últimamente, sin embargo, también se ha extendido a vinagretas y salsas, y a platos que armonizan con otras culturas gastronómicas y trascienden los géneros."
          ],
          materials: [
            { icon: "bean", label: "Soja" },
            { icon: "rice", label: "Koji de arroz" },
            { icon: "salt", label: "Sal" }
          ],
          materialsNote: "El koji de arroz es arroz en el que se ha cultivado el hongo koji.",
          links: [
            { label: "Ver recetas", href: "recipes/index.html" }
          ]
        },
        {
          key: "making",
          short: "Cómo se hace",
          heading: "Hacer miso en HAKKODO",
          paragraphs: [],
          phase: { label: "Del koji a la elaboración, todo a mano", fact: "5 días", count: 3 },
          list: [
            { icon: "rice", label: "Koji de arroz", text: "Se cuece el arroz al vapor y se le añade el hongo koji para hacer el koji de arroz." },
            { icon: "bean", label: "Soja", text: "Se lava, se deja en remojo, se cuece al vapor y se tritura." },
            { icon: "bowl", label: "Elaboración", text: "Se mezclan koji, soja y sal, se ajusta la cantidad de agua y se pasa a un envase." },
            { icon: "clock", label: "Fermentación y maduración", fact: "Más de un año", text: "Ajustamos siempre la temperatura y la humedad mientras fermenta lentamente." }
          ],
          closing: "El miso es un ser vivo. Cada vez que lo elaboramos, le damos las gracias.\nQue este miso se convierta en el próximo «gracias» de quien lo pruebe.",
          links: [
            { label: "Ver las características", href: "products/miso/index.html" }
          ]
        }
      ]
    },
    en: {
      docTitle: "What is Miso? | HAKKODO",
      label: "Miso",
      heading: "What is Miso?",
      lead: "A traditional Japanese fermented seasoning made by mixing soybeans, rice koji, and salt, then fermenting and aging it.",
      photoAlt: { miso: "Miso served on a small plate", making: "Rice spread out on cloth-lined trays" },
      sections: [
        {
          key: "miso",
          short: "What it is",
          heading: "",
          paragraphs: [
            "Miso is known for its deep umami and salty taste. In Japan, it is used in miso soup, simmered dishes, stir-fries, and the like. Recently, however, it has also spread to dressings and sauces, and to dishes that blend with other food cultures and go beyond genres."
          ],
          materials: [
            { icon: "bean", label: "Soybeans" },
            { icon: "rice", label: "Rice koji" },
            { icon: "salt", label: "Salt" }
          ],
          materialsNote: "Rice koji is rice on which koji mold has been grown.",
          links: [
            { label: "View Recipes", href: "recipes/index.html" }
          ]
        },
        {
          key: "making",
          short: "How it's made",
          heading: "Making miso at HAKKODO",
          paragraphs: [],
          phase: { label: "From koji to preparation, all by hand", fact: "5 days", count: 3 },
          list: [
            { icon: "rice", label: "Rice koji", text: "Steamed rice is inoculated with koji mold to make rice koji." },
            { icon: "bean", label: "Soybeans", text: "Washed, soaked well, steamed, and mashed." },
            { icon: "bowl", label: "Preparation", text: "Koji, soybeans, and salt are mixed, the moisture is adjusted, and the mixture goes into a container." },
            { icon: "clock", label: "Fermentation and aging", fact: "1+ year", text: "We constantly adjust temperature and humidity as it ferments slowly." }
          ],
          closing: "Miso is alive. Every time we make it, we say thank you.\nMay this miso become the next “thank you” of whoever tastes it.",
          links: [
            { label: "See what makes it special", href: "products/miso/index.html" }
          ]
        }
      ]
    }
  }
};
