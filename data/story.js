// ============================================================
// STORYページ(story/index.html)の文章です。
// ja / ca / es / en の4言語分は、確定原稿をそのまま入れています。
// 文章を直したいときは、このファイルだけを編集してください
// (表示の仕組みは assets/story.js、見た目は assets/style.css の .story-* です)。
//
// paragraphs: 段落の配列。文字列の中の「\n」は、その位置で改行されます。
//   日本語(ja)だけ、折り返してよい位置を「｜」で示しています(意味のまとまりの境目)。
//   「｜」は画面には表示されず、文章は「｜」を取り除いたものがそのまま表示されます
//   (assets/story.js)。「｜」の間の言葉は、途中で折り返されません。
// image: 本文の途中に1枚だけ入れる写真(既存の写真を使用)。
//        afterParagraph = 何番目の段落の直後に入れるか(1始まり)。
// ============================================================
window.STORY_DATA = {
  image: {
    src: "images/about/about-mountains.jpg",
    afterParagraph: 3
  },
  translations: {
    ja: {
      title: "About",
      heading: "HAKKODO ― 発酵道",
      imageAlt: "岩の向こうに広がる、緑の山々と谷。遠くには雪を頂く山並み",
      paragraphs: [
        "HAKKODOは、｜「発酵」と「道」から｜生まれた名前です。",
        "柔道や剣道、｜茶道、｜華道にある｜「道」は、｜技術を｜極めることだけを｜意味するものではなく、｜日々の修練を通して｜自らを磨き、｜成長し続けることに｜あります。｜そこに｜終わりはありません。\nHAKKODOもまた、｜発酵を通して｜学び、｜磨き、｜成長し続ける。\nその歩みを｜重ね続けていくこと。｜それが｜「発酵道」です。",
        "その「道」を｜歩む場所として｜選んだのが｜カタルーニャの｜アルタ・ガロチャです。\n豊かな自然と｜清らかな水に｜恵まれたこの土地で、｜日本の発酵文化を｜背景に｜HAKKODOの味噌を｜育てています。｜この土地の｜自然と水は、｜HAKKODOの味噌を｜育てるうえで｜なくてはならない｜ものです。",
        "日本の発酵文化から｜生まれた味噌が、｜さまざまな料理や｜食文化と出会い、｜互いの魅力が｜交わり合う。｜そこから、｜新しい味や｜可能性が｜生まれていく。\n\nそんなきっかけを｜生み出す｜味噌でありたい。"
      ]
    },
    ca: {
      title: "Sobre",
      heading: "HAKKODO ― 発酵道",
      imageAlt: "Muntanyes verdes i una vall, vistes entre roques, amb cims nevats al fons",
      paragraphs: [
        "HAKKODO és un nom que neix de dues paraules japoneses: “hakkō” (fermentació) i “dō” (camí).",
        "En el judo, el kendo, el chadō (el camí del te) o el kadō (el camí de les flors), el “dō” no es limita a dominar una tècnica: és polir-se un mateix i continuar creixent, dia rere dia, a través de la pràctica. Aquest camí no té final.\nHAKKODO també continua aprenent, perfeccionant-se i creixent a través de la fermentació. Continuar avançant, pas a pas. Això és el “hakkōdō”.",
        "El lloc que HAKKODO ha triat per fer aquest camí és l’Alta Garrotxa, a Catalunya.\nEn aquesta terra, afavorida per una natura generosa i per aigües clares, i amb la cultura japonesa de la fermentació com a rerefons, hi fem madurar el miso de HAKKODO. La natura i l’aigua d’aquí són imprescindibles per al miso de HAKKODO.",
        "El miso, nascut de la cultura japonesa de la fermentació, es troba amb tota mena de plats i cultures culinàries, i les qualitats pròpies d’uns i dels altres s’entrellacen. D’aquí en sorgeixen sabors nous i noves possibilitats.\n\nVoldríem que el nostre miso fos l’espurna de nous lligams amb altres plats i cultures, i de sabors que encara no coneixem."
      ]
    },
    es: {
      title: "Acerca de",
      heading: "HAKKODO ― 発酵道",
      imageAlt: "Montañas verdes y un valle, vistos entre rocas, con cumbres nevadas al fondo",
      paragraphs: [
        "HAKKODO es un nombre que nace de dos palabras japonesas: “hakkō” (fermentación) y “dō” (camino).",
        "En el judo, el kendo, el chadō (el camino del té) o el kadō (el camino de las flores), el “dō” no se limita a dominar una técnica: consiste en pulirse a uno mismo y seguir creciendo, día tras día, a través de la práctica. Este camino no tiene fin.\nHAKKODO también sigue aprendiendo, puliéndose y creciendo a través de la fermentación. Seguir avanzando, paso a paso. Eso es el “hakkōdō”.",
        "El lugar que HAKKODO ha elegido para recorrer este camino es la Alta Garrotxa, en Cataluña. En esta tierra, favorecida por una naturaleza generosa y aguas claras, y con la cultura japonesa de la fermentación como telón de fondo, hacemos madurar el miso de HAKKODO. La naturaleza y el agua de aquí son imprescindibles para el miso de HAKKODO.",
        "El miso, nacido de la cultura japonesa de la fermentación, se encuentra con todo tipo de platos y culturas culinarias, y las cualidades propias de cada uno se entrelazan. De ahí nacen sabores nuevos y nuevas posibilidades.\n\nQuisiéramos que nuestro miso fuera la chispa de nuevos vínculos con otros platos y culturas, y de sabores que aún no conocemos."
      ]
    },
    en: {
      title: "About",
      heading: "HAKKODO ― 発酵道",
      imageAlt: "Green mountains and a valley seen between rocks, with snow-capped peaks in the distance",
      paragraphs: [
        "HAKKODO is a name born from two Japanese words: “hakkō” (fermentation) and “dō” (way).",
        "In judo, kendo, chadō (the way of tea) and kadō (the way of flowers), “dō” is not only about mastering a technique: it is about refining oneself and continuing to grow through daily practice. There is no end to it.\nHAKKODO, too, keeps learning, refining and growing through fermentation.\nTo keep moving forward, step by step. That is “hakkōdō”.",
        "The place HAKKODO chose to walk this path is Alta Garrotxa, in Catalonia.\nIn this land, blessed with rich nature and clear water, and set against the backdrop of Japan's fermentation culture, we nurture HAKKODO's miso. The nature and water of this land are essential to HAKKODO's miso.",
        "Miso, born from Japan's fermentation culture, meets all kinds of dishes and food cultures, and the charms of each come together. From there, new flavors and new possibilities emerge.\n\nWe hope our miso can be the spark for new connections with other dishes and cultures, and for flavors we have yet to discover."
      ]
    }
  }
};
