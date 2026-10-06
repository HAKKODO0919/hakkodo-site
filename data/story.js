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
    afterParagraph: 3
  },
  translations: {
    ja: {
      title: "About",
      heading: "HAKKODO ― 発酵道",
      imageAlt: "切り株の上に並んだ、味噌の瓶3つ。背景には緑の山の景色",
      paragraphs: [
        "HAKKODO（発酵道）は、「発酵」と「道」から生まれた名前です。",
        "柔道や剣道、茶道のように、「道」には、技を磨くだけではなく、その過程で自らを見つめ、心身を鍛え、人として成長していくという意味があります。\nそして、「道」に終わりはありません。学び、磨き続けること、その過程そのものに意味があると考えています。",
        "日本の発酵文化を背景に、カタルーニャのアルタ・ガロチャで生まれるHAKKODOの味噌。\n豊かな自然と清らかな水に恵まれたこの土地の環境もまた、その味わいを育む大切なものです。",
        "日本の発酵文化から生まれた味噌が、さまざまな料理や食文化と出会い、互いの魅力が交わり合う。\nその出会いから、新しい味や可能性が生まれていく。そんな出会いを生み出す味噌でありたい。"
      ]
    },
    ca: {
      title: "About",
      heading: "HAKKODO ― 発酵道",
      imageAlt: "Tres pots de miso sobre un tronc tallat, amb un paisatge verd al fons",
      paragraphs: [
        "HAKKODO (発酵道) és un nom que neix de dues paraules japoneses: “hakkō” (fermentació) i “dō” (camí).",
        "En el judo, el kendo o el chadō (el camí del te), el “dō” no consisteix només a perfeccionar una tècnica: al llarg del procés, també s’aprèn a mirar-se un mateix, a enfortir el cos i la ment i a créixer com a persona.\nI aquest camí no s’acaba mai. Continuar aprenent i perfeccionant-se, dia rere dia: HAKKODO creu que el sentit és en aquest procés mateix, i no només en el resultat.",
        "El miso de HAKKODO neix a l’Alta Garrotxa, a Catalunya, amb la cultura japonesa de la fermentació com a rerefons. L’entorn d’aquesta terra, afavorida per una natura generosa i per aigües clares, també és una part essencial que en nodreix el sabor.",
        "El miso, nascut de la cultura japonesa de la fermentació, es troba amb plats i tradicions culinàries de tot el món, i les qualitats pròpies d’uns i dels altres s’entrellacen. D’aquestes trobades en van sorgint sabors i possibilitats noves.\nHAKKODO vol ser un miso que faci possibles aquestes trobades."
      ]
    },
    es: {
      title: "About",
      heading: "HAKKODO ― 発酵道",
      imageAlt: "Tres tarros de miso sobre un tocón, con un paisaje verde al fondo",
      paragraphs: [
        "HAKKODO (発酵道) es un nombre que nace de dos palabras japonesas: “hakkō” (fermentación) y “dō” (camino).",
        "En el judo, el kendo o el chadō (el camino del té), el “dō” no consiste solo en perfeccionar una técnica: a lo largo del proceso, también se aprende a mirarse a uno mismo, a fortalecer el cuerpo y la mente y a crecer como persona.\nY este camino nunca termina. Seguir aprendiendo y perfeccionándose, día tras día: HAKKODO cree que el sentido está en ese proceso mismo, y no solo en el resultado.",
        "El miso de HAKKODO nace en la Alta Garrotxa, en Cataluña, con la cultura japonesa de la fermentación como telón de fondo. El entorno de esta tierra, favorecida por una naturaleza generosa y aguas claras, es también una parte esencial que nutre su sabor.",
        "El miso, nacido de la cultura japonesa de la fermentación, se encuentra con platos y tradiciones culinarias de todo el mundo, y las cualidades propias de unos y otros se entrelazan. De esos encuentros van surgiendo sabores y posibilidades nuevas.\nHAKKODO quiere ser un miso que haga posibles esos encuentros."
      ]
    },
    en: {
      title: "About",
      heading: "HAKKODO ― 発酵道",
      imageAlt: "Three jars of miso on a tree stump, with green hills behind",
      paragraphs: [
        "HAKKODO (発酵道) is a name born from two Japanese words: “hakkō” (fermentation) and “dō” (way).",
        "As in judo, kendo or chadō (the way of tea), “dō” is not only about honing a skill. Along the way, it is also about looking inward, training body and mind, and growing as a person.\nAnd the path never ends. HAKKODO believes its meaning lies in the process itself, in continuing to learn and refine, day after day, and not only in the result.",
        "Set against the backdrop of Japan's fermentation culture, HAKKODO's miso is made in Alta Garrotxa, in Catalonia. The environment of this land, with its rich nature and clear water, is also an essential part of what nurtures the flavor of the miso.",
        "Miso, born from Japan's fermentation culture, meets dishes and food cultures from around the world, and their distinctive qualities come together. From those encounters, new flavors and new possibilities keep emerging.\nHAKKODO is a miso made to bring these encounters to life."
      ]
    }
  }
};
