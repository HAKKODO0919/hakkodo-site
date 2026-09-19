// 商品Aの内容データ。ここを編集するとページの内容が変わります。
// URL(ページのアドレス)には影響しません。
//
// images … 写真のファイルパス(言語共通)
// translations … 言語ごとの文章(ja=日本語, ca=Català, es=Español, en=English)
//                 4言語すべて用意してください。まだ翻訳がない場合は
//                 とりあえず日本語と同じ内容を仮で入れておいても構いません。
window.PRODUCT_DATA = {
  images: {
    hero: "images/a/main.jpg",
    gallery: ["images/a/photo1.jpg", "images/a/photo2.jpg", "images/a/photo3.jpg"]
  },
  updatedAt: "2026-09-01",
  translations: {
    ja: {
      name: "商品A",
      tagline: "ここに一言キャッチコピーを書きます",
      price: "¥500(税込)",
      heroAlt: "商品Aのメイン写真",
      galleryAlt: ["商品Aの写真1", "商品Aの写真2", "商品Aの写真3"],
      description: "ここに商品Aの説明文を書きます。\n\n空行を入れると段落が分かれます。",
      ingredients: ["原材料1", "原材料2", "原材料3"],
      allergens: ["小麦", "卵", "乳"],
      notes: "その他の注意事項があればここに書きます。"
    },
    ca: {
      name: "Producte A",
      tagline: "Escriviu aquí l'eslògan",
      price: "¥500 (impostos inclosos)",
      heroAlt: "Foto principal del producte A",
      galleryAlt: ["Foto 1 del producte A", "Foto 2 del producte A", "Foto 3 del producte A"],
      description: "Escriviu aquí la descripció del producte A.\n\nUna línia en blanc separa els paràgrafs.",
      ingredients: ["Ingredient 1", "Ingredient 2", "Ingredient 3"],
      allergens: ["Blat", "Ou", "Llet"],
      notes: "Escriviu aquí altres observacions si cal."
    },
    es: {
      name: "Producto A",
      tagline: "Escribe aquí el eslogan",
      price: "¥500 (impuestos incluidos)",
      heroAlt: "Foto principal del producto A",
      galleryAlt: ["Foto 1 del producto A", "Foto 2 del producto A", "Foto 3 del producto A"],
      description: "Escribe aquí la descripción del producto A.\n\nUna línea en blanco separa los párrafos.",
      ingredients: ["Ingrediente 1", "Ingrediente 2", "Ingrediente 3"],
      allergens: ["Trigo", "Huevo", "Leche"],
      notes: "Escribe aquí otras observaciones si es necesario."
    },
    en: {
      name: "Product A",
      tagline: "Write your tagline here",
      price: "¥500 (tax included)",
      heroAlt: "Main photo of Product A",
      galleryAlt: ["Photo 1 of Product A", "Photo 2 of Product A", "Photo 3 of Product A"],
      description: "Write the description of Product A here.\n\nA blank line separates paragraphs.",
      ingredients: ["Ingredient 1", "Ingredient 2", "Ingredient 3"],
      allergens: ["Wheat", "Egg", "Milk"],
      notes: "Write any other notes here if needed."
    }
  }
};
