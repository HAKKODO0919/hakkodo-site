// ============================================================
// STORYページ(story/index.html)の文章です。
// ja / ca / es / en の4言語分は、確定原稿をそのまま入れています。
// 文章を直したいときは、このファイルだけを編集してください
// (表示の仕組みは assets/story.js、見た目は assets/style.css の .story-* です)。
//
// paragraphs: 段落の配列。文字列の中の「\n」は、その位置で改行されます。
// image: 本文の途中に1枚だけ入れる写真(既存の写真を使用)。
//        afterParagraph = 何番目の段落の直後に入れるか(1始まり)。
// ============================================================
window.STORY_DATA = {
  image: {
    src: "images/aka-miso/main-v6.jpg",
    afterParagraph: 4
  },
  translations: {
    ja: {
      title: "About",
      heading: "HAKKODO ― 発酵道",
      imageAlt: "切り株の上に並んだ、味噌の瓶3つ。背景には緑の山の景色",
      paragraphs: [
        "HAKKODO（発酵道）は、「発酵」と「道」から生まれた名前です。",
        "柔道や剣道、茶道、華道にある「道」は、技術を極めることだけを意味するものではなく、日々の修練を通して自らを磨き、成長し続けることにあります。\nそこに終わりはありません。",
        "HAKKODOもまた、発酵を通して学び、磨き、成長し続ける。\nその歩みを重ね続けていくこと。\nそれが「発酵道」です。",
        "その「道」を歩む場所として選んだのがカタルーニャのアルタ・ガロチャです。\n豊かな自然と清らかな水に恵まれたこの土地で、日本の発酵文化を背景にHAKKODOの味噌を育てています。\nこの土地の自然と水は、HAKKODOの味噌を育てるうえでなくてはならないものです。",
        "日本の発酵文化から生まれた味噌が、さまざまな料理や食文化と出会い、互いの魅力が交わり合う。\nそこから、新しい味や可能性が生まれていく。\n\nそんなきっかけを生み出す味噌でありたい。"
      ]
    },
    ca: {
      title: "About",
      heading: "HAKKODO ― 発酵道",
      imageAlt: "Tres pots de miso sobre un tronc tallat, amb un paisatge verd al fons",
      paragraphs: [
        "HAKKODO (発酵道) és un nom que neix de dues paraules japoneses: “hakkō” (fermentació) i “dō” (camí).",
        "En el judo, el kendo, el chadō (el camí del te) o el kadō (el camí de les flors), el “dō” no es limita a dominar una tècnica: és polir-se un mateix i continuar creixent, dia rere dia, a través de la pràctica.\nAquest camí no té final.",
        "HAKKODO també continua aprenent, perfeccionant-se i creixent a través de la fermentació.\nContinuar avançant, pas a pas.\nAixò és el “hakkōdō” (発酵道).",
        "El lloc que HAKKODO ha triat per fer aquest camí és l’Alta Garrotxa, a Catalunya.\nEn aquesta terra, afavorida per una natura generosa i per aigües clares, i amb la cultura japonesa de la fermentació com a rerefons, hi fem madurar el miso de HAKKODO.\nLa natura i l’aigua d’aquí són imprescindibles per al miso de HAKKODO.",
        "El miso, nascut de la cultura japonesa de la fermentació, es troba amb tota mena de plats i cultures culinàries, i les qualitats pròpies d’uns i dels altres s’entrellacen.\nD’aquí en sorgeixen sabors nous i noves possibilitats.\n\nVoldríem que el nostre miso fos l’espurna de nous lligams amb altres plats i cultures, i de sabors que encara no coneixem."
      ]
    },
    es: {
      title: "About",
      heading: "HAKKODO ― 発酵道",
      imageAlt: "Tres tarros de miso sobre un tocón, con un paisaje verde al fondo",
      paragraphs: [
        "HAKKODO (発酵道) es un nombre que nace de dos palabras japonesas: “hakkō” (fermentación) y “dō” (camino).",
        "En el judo, el kendo, el chadō (el camino del té) o el kadō (el camino de las flores), el “dō” no se limita a dominar una técnica: consiste en pulirse a uno mismo y seguir creciendo, día tras día, a través de la práctica.\nEste camino no tiene fin.",
        "HAKKODO también sigue aprendiendo, puliéndose y creciendo a través de la fermentación.\nSeguir avanzando, paso a paso.\nEso es el “hakkōdō” (発酵道).",
        "El lugar que HAKKODO ha elegido para recorrer este camino es la Alta Garrotxa, en Cataluña.\nEn esta tierra, favorecida por una naturaleza generosa y aguas claras, y con la cultura japonesa de la fermentación como telón de fondo, hacemos madurar el miso de HAKKODO.\nLa naturaleza y el agua de aquí son imprescindibles para el miso de HAKKODO.",
        "El miso, nacido de la cultura japonesa de la fermentación, se encuentra con todo tipo de platos y culturas culinarias, y las cualidades propias de cada uno se entrelazan.\nDe ahí nacen sabores nuevos y nuevas posibilidades.\n\nQuisiéramos que nuestro miso fuera la chispa de nuevos vínculos con otros platos y culturas, y de sabores que aún no conocemos."
      ]
    },
    en: {
      title: "About",
      heading: "HAKKODO ― 発酵道",
      imageAlt: "Three jars of miso on a tree stump, with green hills behind",
      paragraphs: [
        "HAKKODO (発酵道) is a name born from two Japanese words: “hakkō” (fermentation) and “dō” (way).",
        "In judo, kendo, chadō (the way of tea) and kadō (the way of flowers), “dō” is not only about mastering a technique: it is about refining oneself and continuing to grow through daily practice.\nThere is no end to it.",
        "HAKKODO, too, keeps learning, refining and growing through fermentation.\nTo keep moving forward, step by step.\nThat is “hakkōdō” (発酵道).",
        "The place HAKKODO chose to walk this path is Alta Garrotxa, in Catalonia.\nIn this land, blessed with rich nature and clear water, and set against the backdrop of Japan's fermentation culture, we nurture HAKKODO's miso.\nThe nature and water of this land are essential to HAKKODO's miso.",
        "Miso, born from Japan's fermentation culture, meets all kinds of dishes and food cultures, and the charms of each come together.\nFrom there, new flavors and new possibilities emerge.\n\nWe hope our miso can be the spark for new connections with other dishes and cultures, and for flavors we have yet to discover."
      ]
    }
  }
};
