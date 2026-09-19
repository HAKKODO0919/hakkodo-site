// ============================================================
// クラッカーと味噌のレシピです。
// 写真は仮画像です。images/recipes/cracker-miso/main.jpg を
// 実際の写真に差し替えるだけで、コードを変更せず更新できます。
// 日本語(ja) / Català(ca) / Español(es) / English(en) の4言語分を用意しています。
// ============================================================
window.RECIPE_DATA = {
  category: { slug: "appetizer", label: "アペタイザー" },
  images: {
    hero: "images/recipes/cracker-miso/main.jpg"
  },
  updatedAt: "2026-09-15",
  translations: {
    ja: {
      title: "クラッカーと味噌",
      heroAlt: "クラッカーと味噌",
      ingredients: [
        "クラッカー",
        "カマンベールチーズ",
        "味噌",
        "ローズマリー"
      ],
      steps: [
        { text: "クラッカーにカマンベールチーズと味噌をのせ、飾りのローズマリーをのせて完成です。" }
      ],
      tipsLabel: "アレンジ",
      tips: "・チーズはお好みのものに変えても楽しめます。\n・はちみつをかけてもおいしいです。"
    },
    ca: {
      title: "Galetes salades amb miso",
      heroAlt: "Galetes salades amb miso",
      ingredients: [
        "Galetes salades",
        "Formatge Camembert",
        "Miso",
        "Romaní"
      ],
      steps: [
        { text: "Poseu formatge Camembert i miso sobre la galeta salada, i acabeu-ho amb una branca de romaní per decorar." }
      ],
      tipsLabel: "Variants",
      tips: "・També és deliciós si canvieu el formatge pel que més us agradi.\n・Un raig de mel per sobre també hi queda molt bé."
    },
    es: {
      title: "Galletas saladas con miso",
      heroAlt: "Galletas saladas con miso",
      ingredients: [
        "Galletas saladas",
        "Queso Camembert",
        "Miso",
        "Romero"
      ],
      steps: [
        { text: "Coloca queso Camembert y miso sobre la galleta salada, y termina con una ramita de romero para decorar." }
      ],
      tipsLabel: "Variantes",
      tips: "・También está delicioso si cambias el queso por el que más te guste.\n・Un chorrito de miel por encima también queda muy bien."
    },
    en: {
      title: "Crackers with Miso",
      heroAlt: "Crackers with miso",
      ingredients: [
        "Crackers",
        "Camembert cheese",
        "Miso",
        "Rosemary"
      ],
      steps: [
        { text: "Top a cracker with Camembert cheese and miso, then finish with a sprig of rosemary for garnish." }
      ],
      tipsLabel: "Variations",
      tips: "・Feel free to swap in your favorite cheese.\n・A drizzle of honey on top is delicious too."
    }
  }
};
