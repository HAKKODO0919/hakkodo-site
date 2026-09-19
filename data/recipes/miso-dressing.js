// ============================================================
// 味噌ドレッシングのレシピです。
// 写真は確認用の仮画像(images/aka-miso/photo1.pngのコピー)を
// そのまま使用しています。
// 日本語(ja) / Català(ca) / Español(es) / English(en) の4言語分を用意しています。
// ============================================================
window.RECIPE_DATA = {
  category: { slug: "dressing", label: "万能調味料" },
  images: {
    hero: "images/recipes/miso-dressing/main.jpg"
  },
  updatedAt: "2026-09-03",
  translations: {
    ja: {
      title: "味噌ドレッシング",
      intro: "野菜にかけるだけの、簡単な万能ドレッシング。",
      heroAlt: "味噌ドレッシング",
      ingredients: [
        "オリーブオイル 24g",
        "酢 7g",
        "レモン汁 7g",
        "砂糖 3g",
        "味噌 18g",
        "黒こしょう 少々"
      ],
      steps: [
        { text: "オリーブオイル以外の材料をボウルに入れて混ぜ合わせます。" },
        { text: "少しずつオリーブオイルを加えて完成です。" }
      ],
      storage: "密閉できる容器に入れて、冷蔵庫で保存してください。保存期間は2日間です。",
      tips: "オリーブオイルを少しずつ加えて混ぜることで、分離しにくくなります。"
    },
    ca: {
      title: "Vinagreta de miso",
      intro: "Una vinagreta senzilla i versàtil, perfecta per amanir verdures.",
      heroAlt: "Vinagreta de miso",
      ingredients: [
        "Oli d'oliva 24 g",
        "Vinagre 7 g",
        "Suc de llimona 7 g",
        "Sucre 3 g",
        "Miso 18 g",
        "Pebre negre, al gust"
      ],
      steps: [
        { text: "Poseu tots els ingredients excepte l'oli d'oliva en un bol i barregeu-los." },
        { text: "Afegiu l'oli d'oliva a poc a poc fins acabar." }
      ],
      storage: "Conserveu-la en un recipient hermètic a la nevera. Es pot conservar durant 2 dies.",
      tips: "Si afegiu l'oli d'oliva a poc a poc mentre remeneu, costarà menys que es separi."
    },
    es: {
      title: "Vinagreta de miso",
      intro: "Una vinagreta sencilla y versátil, perfecta para aliñar verduras.",
      heroAlt: "Vinagreta de miso",
      ingredients: [
        "Aceite de oliva 24 g",
        "Vinagre 7 g",
        "Zumo de limón 7 g",
        "Azúcar 3 g",
        "Miso 18 g",
        "Pimienta negra, al gusto"
      ],
      steps: [
        { text: "Pon todos los ingredientes excepto el aceite de oliva en un bol y mézclalos." },
        { text: "Añade el aceite de oliva poco a poco hasta terminar." }
      ],
      storage: "Consérvala en un recipiente hermético en el refrigerador. Se conserva durante 2 días.",
      tips: "Si añades el aceite de oliva poco a poco mientras remueves, costará menos que se separe."
    },
    en: {
      title: "Miso Dressing",
      intro: "A simple all-purpose dressing — just drizzle it over vegetables.",
      heroAlt: "Miso dressing",
      ingredients: [
        "Olive oil 24g",
        "Vinegar 7g",
        "Lemon juice 7g",
        "Sugar 3g",
        "Miso 18g",
        "Black pepper, to taste"
      ],
      steps: [
        { text: "Put all the ingredients except the olive oil into a bowl and mix together." },
        { text: "Add the olive oil little by little until done." }
      ],
      storage: "Store in an airtight container in the refrigerator. Keeps for 2 days.",
      tips: "Adding the olive oil little by little while mixing helps prevent it from separating."
    }
  }
};
