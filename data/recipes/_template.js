// ============================================================
// レシピを追加するときのひな形ファイルです。
// このファイル自体はどこからもリンクされておらず、公開されません。
//
// 【新しいレシピを1件追加する手順】
// 1. このファイルをコピーして、data/recipes/レシピ名.js という
//    名前で保存する(例: data/recipes/miso-soup.js)
// 2. 下の内容を、実際のレシピの内容に書き換える
//    (category.slug は英数字、category.label が画面に出る名前です。
//     既存のカテゴリーと同じ料理ジャンルなら、他のレシピと
//     まったく同じ category.slug / label を使ってください。
//     新しいジャンルなら、新しい slug / label を決めるだけで、
//     レシピ一覧の目次に自動的にそのカテゴリーが増えます)
// 3. recipes/レシピ名/index.html を作る
//    (recipes/_template/index.html をコピーして、
//     読み込むファイルを data/recipes/レシピ名.js に変える)
// 4. recipes/index.html の initRecipeList([...]) に
//    { href: "レシピ名/index.html", data: window.RECIPE_DATA相当 }
//    を1行追加する
//
// 詳しい手順は README.md にも書いてあります。
// ============================================================
window.RECIPE_DATA = {
  // レシピのジャンル。同じジャンルのレシピは同じ slug/label にすると
  // レシピ一覧で自動的にまとめられます。
  category: { slug: "dressing", label: "ドレッシング" },
  images: {
    hero: "images/recipes/レシピ名/main.jpg"
  },
  updatedAt: "2026-09-01",
  translations: {
    ja: {
      // 2. 料理名
      title: "レシピのタイトル",
      // 3. 短い紹介文
      intro: "レシピの一言紹介文",
      heroAlt: "レシピのメイン写真",
      // 4. 材料
      ingredients: ["材料1", "材料2", "材料3"],
      // 5. 作り方
      steps: [
        // 写真が無い手順はこのように text だけでOK(文章だけのシンプル表示)
        { text: "手順1の説明文" },
        // 写真ができたら image を追加すると、自動的に画像つきの表示になる
        { text: "手順2の説明文", image: { src: "images/recipes/レシピ名/step2.jpg", alt: "手順2の写真" } },
        { text: "手順3の説明文" }
      ],
      // 6. アレンジ
      arrange: "アレンジのアイデアをここに書きます。",
      // 7. HAKKODOの味噌を使うポイント
      misoPoint: "この料理でHAKKODOの味噌を使うポイントをここに書きます。"
    }
  }
};
